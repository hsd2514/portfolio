---
title: "Rate Limiting: The Wall That Protects Your System from Abuse"
publishedAt: "2026-02-04"
summary: "An in-depth look at what rate limiters are, how they work, common algorithms like Fixed Window, Sliding Window, and Token Bucket, and advanced strategies for efficiency and security."
author: "Harsh Dange"
image: "/media/blog/rate-limiting/rate-limiter.png"
---

# Rate Limiting: The Wall That Protects Your System from Abuse

In this blog, we will discuss what a rate limiter is, how it works, common algorithms, and how we can make it more efficient and secure.

## What is a Rate Limiter?

Let's start with the basics. A common question is: why do we need a rate limiter?

Consider a scenario where a user is continuously sending requests to our service and consuming system resources. At this point, we may not know whether the user has malicious intent or is simply facing an issue such as a buggy client or a network retry loop. Regardless of the intent, uncontrolled requests can degrade system performance and affect other users.

This is where a rate limiter helps by restricting the number of requests allowed within a specific time frame.

## How Does a Rate Limiter Work?

Now that we know what a rate limiter is, let's understand how it works using a simple example.

Consider a theme park ride. The ride has limited seats, so visitors must stand in a queue. The ride operator allows only a fixed number of people to enter at a time. Once the ride is full, others must wait until seats become available.

Similarly, a server also has limited resources such as CPU, memory, and database connections. If too many requests arrive at the same time, the server can become overloaded.

A rate limiter acts like the ride operator:

- It allows only a certain number of requests within a specific time window
- Extra requests are either delayed or rejected
- This ensures fair usage and system stability

![Rate Limiter Overview](/media/blog/rate-limiting/rate-limiter.png)

## Basic Implementation

Before we dive into its types, let's first look at how a rate limiter is implemented.

A rate limiter is usually implemented as middleware that is invoked as soon as a request reaches the server, but before it is processed.

To implement a rate limiter, we commonly use Redis. Redis is an in-memory cache and key-value store, which is sufficient for this use case. We don't need anything more complex.

The basic implementation works by identifying a user using an identifier, which can be a user ID if the user is authenticated or an IP address otherwise. A key is then created using this identifier.

Example key format:

```python
# Key format
rate:user:{user_id}:{endpoint}
rate:ip:{ip}:{endpoint}
```

As requests are made, the counter for this key is incremented. If the user exceeds the allowed limit, the request is dropped. Once the time window expires, the key is automatically removed.

```python
# Identifier logic
if user_id:
    identifier = f"user:{user_id}"
else:
    identifier = f"ip:{ip}"

key = f"rate:{identifier}:{endpoint}"
```

## Types of Rate Limiters

In this section, we will look at three types of rate limiters: Fixed Window, Sliding Window, and Token Bucket.

## Fixed Window Algorithm

The Fixed Window algorithm is one of the most basic rate-limiting techniques. It works using a fixed time window (for example, 1 minute). When a request comes in, a counter for that window is incremented. Once the window expires, the counter is reset and a new window starts.

For example, if a user is allowed 100 requests per minute, the counter starts at zero at the beginning of the minute and increases with each request. When the minute ends, the counter is reset to zero regardless of how many requests were made previously.

### Implementation

```python
def is_rate_limited(user_id, ip, endpoint):
    identifier = f"user:{user_id}" if user_id else f"ip:{ip}"
    key = f"rate:{identifier}:{endpoint}"
    
    max_requests, window_seconds = RATE_LIMITS[endpoint]
    
    # Increment counter
    count = redis_client.incrby(key, 1)
    
    # Set expiry on first request
    if count == 1:
        redis_client.expire(key, window_seconds)
    
    # Check if over limit
    if count > max_requests:
        return True  # Blocked
    
    return False  # Allowed
```

### Pros

- Simple and easy to implement
- Low memory and computational overhead
- Works well for basic use cases

### Cons

- Allows request bursts at window boundaries
- Can cause uneven traffic spikes
- Not very accurate for smoothing request rates

### Visualization

![Fixed Window Diagram](/media/blog/rate-limiting/Fixed-window.png)

![Fixed Window Animation](/media/blog/rate-limiting/FixedWindowAnimation.mp4)


## Sliding Window Algorithm

In this approach, instead of using a fixed window (like 12:01-12:02), we use a sliding window that keeps moving with time. Every request is checked against the last N seconds from the current moment, not against strict clock boundaries.

To implement this efficiently, the system looks at the current window and the previous window together. Requests from the previous window are counted with a time-based weight, which gradually decreases as time moves forward.

The final request count is calculated by combining the current window count and the weighted previous window count. If adding the new request exceeds the allowed limit, the request is blocked; otherwise, it is allowed.

### Implementation

```python
def is_rate_limited_sliding_window(user_id, ip, endpoint):
    identifier = f"user:{user_id}" if user_id else f"ip:{ip}"
    max_requests, window_seconds = RATE_LIMITS[endpoint]
    
    now = time.time()
    current_window = int(now // window_seconds)
    previous_window = current_window - 1
    
    current_key = f"rate:{identifier}:{endpoint}:{current_window}"
    previous_key = f"rate:{identifier}:{endpoint}:{previous_window}"
    
    # Get counts from both windows
    current_count = int(redis_client.get(current_key) or 0)
    previous_count = int(redis_client.get(previous_key) or 0)
    
    # Calculate weight for previous window
    elapsed = now % window_seconds
    weight = (window_seconds - elapsed) / window_seconds
    
    # Weighted count
    effective_count = current_count + (previous_count * weight)
    
    if effective_count + 1 > max_requests:
        return True  # Blocked
    
    # Allow and increment current window
    redis_client.incr(current_key)
    redis_client.expire(current_key, window_seconds * 2)
    return False  # Allowed
```

### Pros

- Prevents sudden bursts at window boundaries
- Provides smoother and more accurate rate limiting

### Cons

- Slightly more complex than fixed window
- Requires extra computation

### Visualization

![Sliding Window Diagram](/media/blog/rate-limiting/sliding-window.png)

![Sliding Window Animation](/media/blog/rate-limiting/SlidingWindowAnimation.mp4)

## Token Bucket Algorithm

In this algorithm, requests are controlled using a bucket of tokens. The bucket has a fixed number of tokens, and tokens are refilled over time.

Each request has a cost, and that many tokens are deducted from the bucket. If enough tokens are available, the request is allowed. If the bucket does not have sufficient tokens, the request is blocked.

Tokens are refilled continuously based on time, not in fixed intervals. This allows short bursts of traffic while still enforcing an overall rate limit.

### Implementation (Lua Script for Atomicity)

```lua
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local cost = tonumber(ARGV[4])

-- Get current state
local data = redis.call('HMGET', key, 'tokens', 'last_refill')
local tokens = tonumber(data[1]) or capacity
local last_refill = tonumber(data[2]) or now

-- Refill tokens based on elapsed time
local elapsed = now - last_refill
local refill = elapsed * refill_rate
tokens = math.min(capacity, tokens + refill)

-- Check if enough tokens
if tokens >= cost then
    tokens = tokens - cost
    redis.call('HMSET', key, 'tokens', tokens, 'last_refill', now)
    redis.call('EXPIRE', key, 3600)
    return 1  -- Allowed
else
    redis.call('HMSET', key, 'tokens', tokens, 'last_refill', now)
    redis.call('EXPIRE', key, 3600)
    return 0  -- Blocked
end
```

### Python Caller

```python
def is_rate_limited_token_bucket(user_id, ip, endpoint):
    identifier = f"user:{user_id}" if user_id else f"ip:{ip}"
    key = f"rate:{identifier}:{endpoint}"
    
    max_requests, window_seconds = RATE_LIMITS[endpoint]
    capacity = max_requests
    refill_rate = max_requests / window_seconds
    now = int(time.time())
    cost = 1
    
    allowed = redis_client.eval(token_bucket_lua, 1, key, capacity, refill_rate, now, cost)
    
    return allowed == 0  # 0 = blocked, 1 = allowed
```

### Pros

- Allows controlled bursts of traffic
- Smooth and consistent rate limiting
- Well suited for APIs and real-time systems

### Cons

- More complex to implement
- Requires precise time-based calculations
- Needs atomic operations in distributed systems

### Visualization

![Token Bucket Diagram](/media/blog/rate-limiting/token-bucket.png)

![Token Bucket Animation](/media/blog/rate-limiting/TokenBucketAnimation.mp4)

## Enhancing the Rate Limiter for Real-World Use

Now that we have discussed the three algorithms, we can go beyond the basics and make the system more robust and efficient by implementing **tier multipliers**, **endpoint costing**, **penalties**, and a **trust score**.

### Tier Multipliers

Not all users should have the same limits. Anonymous and free users follow the base limits, while pro users are allowed higher capacity using a multiplier.

```python
TIER_MULTIPLIERS = {
    'anonymous': 1,
    'free': 1,
    'pro': 5  # Pro users get 5x the limit
}

# Usage
tier_multiplier = TIER_MULTIPLIERS.get(tier, 1)
effective_limit = base_limit * tier_multiplier
```

### Endpoint Costing

Some endpoints are more expensive than others. For example, `/login` and `/search` consume more resources than `/read`, so each request has a different cost depending on the endpoint.

```python
ENDPOINT_COST = {
    '/login': 2,   # Expensive - auth + DB lookup
    '/search': 5,  # Very expensive - DB query
    '/read': 1,    # Cheap - simple read
}

# Usage
request_cost = ENDPOINT_COST.get(endpoint, 1)
count = redis_client.incrby(key, request_cost)  # Increment by cost, not 1
```

### Penalty Mechanism

When a user repeatedly exceeds the limit, a penalty is applied. This temporarily reduces the allowed capacity instead of blocking the user permanently. Over time, the penalty can expire so that well-behaving users recover.

```python
PENALTY_STEP = 5
PENALTY_TTL_SECONDS = 60

# When user is blocked
penalty_key = f"penalty:{identifier}:{endpoint}"
redis_client.incr(penalty_key)
redis_client.expire(penalty_key, PENALTY_TTL_SECONDS)

# When checking limit
penalty = int(redis_client.get(penalty_key) or 0)
effective_limit = max(1, base_limit - (penalty * PENALTY_STEP))
```

### Trust Score

A trust score is maintained based on user behavior. Users who stay within limits slowly gain trust, while users who frequently exceed limits lose trust. The trust score acts as a multiplier on the user's capacity.

```python
DEFAULT_TRUST_SCORE = 1.0
TRUST_SCORE_MIN = 0.5   # Worst case: 50% of limit
TRUST_SCORE_MAX = 1.5   # Best case: 150% of limit
TRUST_SCORE_INCREMENT = 0.01
TRUST_SCORE_DECREMENT = 0.02

# Get trust score
trust_score_key = f"trust_score:{identifier}"
trust_score = float(redis_client.get(trust_score_key) or DEFAULT_TRUST_SCORE)
trust_score = max(TRUST_SCORE_MIN, min(TRUST_SCORE_MAX, trust_score))

# Apply to limit
final_limit = int(effective_limit * trust_score)

# On good behavior (under threshold)
redis_client.incrbyfloat(trust_score_key, TRUST_SCORE_INCREMENT)

# On bad behavior (blocked)
redis_client.incrbyfloat(trust_score_key, -TRUST_SCORE_DECREMENT)
```

### Final Capacity Calculation

Putting it all together:

```python
def compute_final_capacity(base_limit, tier, penalty, trust_score):
    # Apply tier multiplier
    tier_multiplier = TIER_MULTIPLIERS.get(tier, 1)
    limit = int(base_limit * tier_multiplier)
    
    # Apply penalty
    limit -= penalty * PENALTY_STEP
    limit = max(1, limit)
    
    # Apply trust score
    limit = int(limit * trust_score)
    return max(1, limit)  # Always at least 1
```

## Conclusion

By adding these features, the rate limiter becomes more adaptive, fair, and better suited for real-world systems:

- **Fixed Window**: Simple, fast, good for basic use cases
- **Sliding Window**: Smoother, prevents boundary bursts
- **Token Bucket**: Best for APIs, allows controlled bursts
- **Tier Multipliers**: Different limits for different user types
- **Endpoint Costing**: Heavy endpoints cost more
- **Penalties**: Temporary reduction for abusers
- **Trust Score**: Reward good behavior, punish bad behavior

The complete implementation is available in the repository [Rate Limiter](https://github.com/hsd2514/rate-limit).
