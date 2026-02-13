---
title: "PulseStream"
description: "A high-performance, real-time personalized content feed engine."
date: "2026-02-13"
tags: ["Python", "FastAPI", "Redis", "React", "Docker", "Azure"]
image: "/media/projects/feedstream/architecture.png"
---

# PulseStream - Portfolio Functionality

**Project Overview**

PulseStream is a high-performance, real-time personalized content feed engine. It reimagines the social media feed by combining global popularity trends with individual user preferences into a single, cohesive stream. Unlike traditional feeds that rely on stale data or complex batch processing, PulseStream leverages **Redis** and **Server-Sent Events (SSE)** to deliver instant, adaptive updates.

## Key Features

### 1. Hybrid Recommendation Engine
PulseStream solves the "cold start" problem by blending two powerful signals:
*   **Global Score:** What's popular right now across the platform? (Votes * Weight)
*   **Personal Affinity:** What specific tags does this user interact with?
*   **Result:** New users see engaging content immediately, while the feed morphs to their unique taste with every interaction.

### 2. Real-Time Feedback Loop (The "Instant" Feel)
Most feeds require a refresh to update. PulseStream pushes updates instantly.
1.  **User Action:** User likes a "Cyberpunk" image.
2.  **System Reaction:**
    *   Updates global popularity score.
    *   Boosts user's "Cyberpunk" affinity.
    *   Instantly recalculates the next batch of images.
    *   Pushes the new feed via SSE to the client.

### 3. High-Performance Design
*   **0ms Database Latency:** The entire feed generation loop runs in-memory using **Redis Sorted Sets and Hashes**.
*   **Stateless API:** Built with **FastAPI**, creating a lightweight, scalable backend that handles thousands of concurrent connections.

## Tech Stack

*   **Backend:** Python 3.12, FastAPI, Uvicorn
*   **Data Structure Store:** Redis (Upstash) - Used for ranking, session state, and caching
*   **Real-Time:** Server-Sent Events (SSE)
*   **Frontend:** React, TailwindCSS
*   **DevOps:** Docker, Azure App Service

## The "Secret Sauce" (Algorithm)

The core of FeedStream is its scoring algorithm, which runs in real-time for every request:

```python
def calculate_score(user, image):
    # 1. Popularity Signal
    global_score = (image.likes * 2) - (image.dislikes * 1)
    
    # 2. Personalization Signal
    personal_boost = sum(
        user.tag_scores.get(tag, 0) for tag in image.tags
    )
    
    # 3. Final Rank
    return global_score + personal_boost
```

This ensures that even a niche image (low global score) can appear at the top of a user's feed if it perfectly matches their varied interests.
