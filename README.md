# 🚀 JavaAlgo Elite v2.0

> **The Definitive Data Structures, Algorithms & System Design Masterclass in Java — Tailored for FAANG / MAANG Interview Cracking.**

[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📖 Overview

**JavaAlgo Elite** is a modern, interactive web application engineered to take Java developers from fundamentals to cracking Tier-1 tech interviews. It bridges the gap between raw Java language mechanics and deep algorithmic problem-solving + large-scale distributed system design.

---

## ✨ Features

### 1. 🏗️ Interactive Data Structure Visualizers
- **Array Visualizer**: Contiguous memory layout, $O(1)$ random access math, insert, delete, and binary search step-by-step.
- **Linked List Visualizer**: Singly linked list nodes, head/tail pointers, dynamic node insertion/deletion with pointer rewiring.
- **Stack Visualizer**: LIFO call-stack simulator, push, pop, and top inspection.
- **Queue Visualizer**: FIFO ring buffer simulator with enqueue/dequeue operations and BFS queue walkthrough.
- **HashMap Visualizer**: Hash function modulo calculation, collision resolution with chaining (linked buckets), dynamic load factor gauge.
- **Binary Tree Visualizer**: SVG-rendered tree with animated Pre-order, In-order, Post-order, and BFS level-order traversals.
- **Min/Max Heap Visualizer**: Dual representation (interactive tree + backing array indices), live Heapify-up and Heapify-down animations.
- **Graph Visualizer**: 7-node network with live BFS (shortest path) and DFS (backtracking) step-by-step state tracking.

### 2. 📚 Complete DS Foundations (Java Deep Dive)
- Step-by-step theory, internal memory architecture, common pitfalls, and production Java snippets for:
  - Dynamic Arrays (`ArrayList`)
  - Singly & Doubly Linked Lists
  - Stacks (`ArrayDeque` vs `Stack`)
  - Queues & Deques
  - Hash Maps & Hash Sets (Internal hashing, buckets, collision resolution)
  - Binary Trees & Binary Search Trees
  - Heaps & Priority Queues
  - Graphs (Adjacency Matrix vs Adjacency List)

### 3. ☕ Java Refresher for Interviews
- Java Collections Framework Cheat Sheet (`List`, `Set`, `Map`, `Queue`, `Deque`, `PriorityQueue`)
- Common imports, syntax refresher, and built-in methods
- Big-O Time & Space Complexity Reference Matrix
- Idiomatic Java best practices for competitive programming

### 4. 🧠 15+ Core LeetCode Patterns
- Two Pointers & Fast/Slow Pointers
- Sliding Window (Fixed & Dynamic)
- Monotonic Stack
- Binary Search & Search on Answer
- Top-K Elements / Merge K Lists (Heap)
- Tree DFS & BFS
- Backtracking (Subsets, Permutations)
- Dynamic Programming (1D, 2D, 0/1 Knapsack)
- Disjoint Set Union (Union-Find)
- Topological Sort (Kahn's Algorithm)

### 5. 🌐 Complete System Design Track
- **RADIO Framework**: Requirements, Architecture, Data Model, Interface/APIs, Optimizations & Deep Dives
- **System Design Core Building Blocks**:
  - Load Balancers (L4 vs L7, Algorithms)
  - Caching Strategies (Read-through, Write-through, Eviction policies)
  - Database Sharding & Partitioning
  - Message Queues & Event-Driven Architecture (Kafka vs RabbitMQ)
  - CAP Theorem & Consistency Models
- **6 Production Case Studies**:
  - TinyURL / URL Shortener (Base62 encoding, KGS)
  - Instagram / Photo Sharing (CDN, Sharding, Fan-out)
  - WhatsApp / Real-time Chat (WebSockets, Epoll, Erlang/BEAM pattern)
  - YouTube / Video Streaming (Chunking, HLS/DASH, CDN caching)
  - Twitter / Microblogging News Feed (Fan-out on write vs read, Hybrid)
  - Distributed Cache / In-memory Key-Value Store (Consistent Hashing, LRU)

### 6. 🎙️ FAANG Mock Interview Room (NEW in Phase 3)
- Multi-turn interactive technical interview simulation under real time pressure.
- **Coding Drills**: LRU Cache implementation with concurrency follow-ups, Streaming Median with two heaps.
- **System Design Drills**: Distributed API Rate Limiter (Token Bucket vs Sliding Window Counter, Redis multi-datacenter sync).
- **Behavioral Drills**: Navigating technical disagreements using the Amazon STAR method (Situation, Task, Action, Result).
- Live senior engineer evaluation, feedback scores, and copyable production Java templates.

### 7. 🧠 AI & ML Universe + Interactive Canvas (NEW in Phase 3)
- **Interactive HTML5 Canvas**: Click-to-add data points for Linear Regression with live Gradient Descent animation adjusting weights $w$, bias $b$, and MSE loss.
- 20 in-depth topics: ML from Scratch, Perceptrons, ReLU, Backpropagation, Transformers (Self-Attention, QKV), LLM Prompt Engineering, RAG architectures, Agentic Frameworks (MCP, Gemini ADK, LangChain), and the Road to AGI.

### 8. ☁️ AWS Cloud Practitioner (CLF-C02) + 65-Q Timed Mock Exam (NEW in Phase 3)
- Full 4 Domain guides aligned with official AWS CLF-C02 exam blueprints.
- Interactive Service Matcher game.
- **90-Minute 65-Question Timed Mock Exam**: Real-time countdown timer, question navigator grid, review & flag mode, scaled 100-1000 score calculator, and 4-domain competency diagnostic report.

### 9. 🎯 Adaptive Quiz & Assessment
- Timed practice quizzes categorized by difficulty and topic
- Instant evaluation with in-depth technical explanations

---

## 🛠️ Tech Stack

- **Frontend Core**: Vanilla Modern JavaScript (ES6+ Modules), HTML5, CSS3
- **Design System**: Glassmorphism, CSS Custom Properties, Responsive Grid & Flexbox layouts
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: Lucide SVG Vector Icons

---

## 🏁 Quick Start (Local Setup)

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/javaalgo-elite.git
   cd javaalgo-elite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser!

4. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in `dist/`.

---

## 📂 Project Structure

```
javaalgo-elite/
├── index.html                 # Entry HTML with modern fonts & viewport config
├── package.json               # Project manifest and scripts
├── vite.config.js             # Vite configuration
├── README.md                  # Project documentation
├── src/
│   ├── main.js                # App bootstrapping & navigation controller
│   ├── components/            # UI components
│   │   ├── Navbar.js          # Navigation bar with responsive tabs & theme toggle
│   │   ├── HomeView.js        # Dashboard, 10-week study roadmap & tier trackers
│   │   ├── DSFoundationsView.js # Comprehensive DS lessons & guides
│   │   ├── SystemDesignView.js  # Distributed systems concepts & case studies
│   │   ├── RoadmapView.js     # Topic-by-topic curriculum tracker
│   │   ├── JavaRefresherView.js # Quick syntax, imports & collections cheatsheet
│   │   ├── PatternsView.js    # 15+ LeetCode patterns with Java code
│   │   ├── VisualizerView.js  # Algorithm visualizers
│   │   ├── QuizView.js        # Self-assessment test engine
│   │   ├── ProblemModal.js    # Detailed code modal
│   │   ├── QuickSearchModal.js # Global command palette (Ctrl+K)
│   │   └── InteractiveDS/     # 8 Live Data Structure Interactive Visualizers
│   │       ├── ArrayVisualizer.js
│   │       ├── LinkedListVisualizer.js
│   │       ├── StackVisualizer.js
│   │       ├── QueueVisualizer.js
│   │       ├── HashMapVisualizer.js
│   │       ├── TreeVisualizer.js
│   │       ├── HeapVisualizer.js
│   │       └── GraphVisualizer.js
│   ├── data/                  # Curated study content & curriculum data
│   │   ├── dsFoundations.js
│   │   ├── systemDesign.js
│   │   ├── curriculumData.js
│   │   ├── patternsData.js
│   │   ├── refresherData.js
│   │   └── quizData.js
│   ├── styles/                # CSS design system
│   │   ├── main.css
│   │   └── components.css
│   └── utils/                 # Storage, toast notifications, syntax highlighter
└── public/                    # Static assets
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
