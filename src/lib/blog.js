// Static blog data - no fs module needed
// Add your blog posts here

export const posts = [
  {
    slug: "building-rag-chatbot",
    title: "Building a RAG Chatbot with Gemini API",
    date: "2024-12-15",
    description: "A step-by-step guide on how I built a legal AI chatbot using Retrieval-Augmented Generation (RAG) and Google's Gemini API.",
    tags: ["AI", "RAG", "Python", "Gemini API"],
    readTime: "5 min read",
    content: `# Introduction

When I set out to build a legal AI chatbot, I knew that accuracy was paramount. Legal queries require precise, contextual answers that a generic LLM might struggle with. That's where **Retrieval-Augmented Generation (RAG)** comes in.

## What is RAG?

RAG combines the power of large language models with a retrieval system. Instead of relying solely on the model's training data, RAG:

1. **Retrieves** relevant documents from a knowledge base
2. **Augments** the prompt with this context
3. **Generates** a response based on both the query and retrieved information

## The Tech Stack

For this project, I used:

- **Python** - Core language
- **Faiss** - Vector similarity search
- **Google Gemini API** - LLM for generation
- **Streamlit** - Web interface
- **Kaggle Datasets** - Legal document corpus

## Implementation Steps

### 1. Document Processing

First, I processed the legal documents and created embeddings using sentence transformers.

### 2. Building the Vector Index

Using Faiss for efficient similarity search, I built an index that allows for fast nearest-neighbor lookups.

### 3. Query Processing

When a user asks a question, we encode the query, find similar documents, and pass context to Gemini.

## Results

The chatbot achieved approximately **95% accuracy** on legal queries, significantly reducing manual research time.

## Key Learnings

1. **Context window management** - Be mindful of token limits
2. **Chunk sizing** - Smaller chunks = more precise retrieval
3. **Prompt engineering** - Clear instructions improve accuracy

## Conclusion

RAG is a powerful technique for building domain-specific AI applications. By combining retrieval with generation, you get the best of both worlds: up-to-date, contextual information with natural language generation.`,
  },
  {
    slug: "webrtc-video-chat-guide",
    title: "WebRTC Video Chat: A Practical Guide",
    date: "2024-11-20",
    description: "How I implemented real-time video communication using WebRTC for a collaborative whiteboard application.",
    tags: ["WebRTC", "Real-time", "JavaScript", "React"],
    readTime: "4 min read",
    content: `# Building Real-Time Video with WebRTC

When building my Digital Whiteboard application, I needed a way for users to communicate while collaborating. WebRTC was the perfect solution for peer-to-peer video communication.

## Why WebRTC?

- **Real-time** - No server bottleneck for media
- **Peer-to-peer** - Direct connection between users
- **Free** - No media server costs

## The Architecture

The basic flow is:
1. User A and B connect to a signaling server
2. They exchange connection information
3. Direct WebRTC connection is established

## Key Concepts

### 1. Signaling

Before peers can connect, they need to exchange connection information through a signaling server.

### 2. ICE Candidates

ICE (Interactive Connectivity Establishment) helps find the best path between peers, handling NAT traversal and firewall issues.

### 3. Media Streams

Accessing camera and microphone is straightforward with the getUserMedia API.

## Challenges Faced

1. **NAT Traversal** - Used TURN servers for fallback
2. **Echo Cancellation** - Enabled audio constraints
3. **Mobile Compatibility** - Tested across devices

## Result

The implementation allows seamless video chat while users collaborate on the whiteboard. Floating video feeds keep communication visible without blocking the canvas.`,
  },
];

export function getAllPosts() {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllPostSlugs() {
  return posts.map((post) => post.slug);
}
