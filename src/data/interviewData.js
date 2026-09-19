// ============================================================
// MOCK INTERVIEW ROOM DATA — JavaAlgo Elite
// Interactive scenario-based interview drills for FAANG & Tier-1 tech
// Covers DSA Coding, System Design Whiteboarding, and STAR Behavioral
// ============================================================

export const mockInterviewData = {
  title: "Interactive Mock Interview Room",
  subtitle: "Practice real FAANG interview scenarios with interactive dialogue, architecture debates, and evaluation rubrics",
  
  tracks: [
    // ── TRACK 1: DSA CODING INTERVIEW ─────────────────────
    {
      id: "coding",
      name: "DSA Coding Interview",
      icon: "💻",
      color: "#38bdf8",
      summary: "Step into the hot seat for real Google, Meta, and Amazon live coding rounds. Learn to think aloud, ask clarifying questions, and present optimal code.",
      scenarios: [
        {
          id: "lru-cache",
          company: "Amazon / Google",
          level: "Senior SDE",
          title: "Design an In-Memory LRU Cache",
          problemPrompt: "The interviewer says: 'We need you to design a Least Recently Used (LRU) Cache that supports `get(key)` and `put(key, value)` operations. Both operations MUST execute in strictly O(1) time complexity.'",
          
          steps: [
            {
              stepNumber: 1,
              title: "Clarifying Questions & Constraint Discovery",
              interviewerSays: "Good candidates never start coding immediately. What questions do you have before writing code?",
              options: [
                {
                  text: "Can I assume capacity is always greater than zero, and what should get() return if the key doesn't exist?",
                  rating: "EXCELLENT",
                  interviewerReply: "Great question. Capacity will be positive (>= 1). If the key doesn't exist, return -1. Also, consider that put() on an existing key should update its value AND mark it as most recently used.",
                  points: 25
                },
                {
                  text: "Can I just use Java's LinkedHashMap and write 2 lines of code?",
                  rating: "POOR",
                  interviewerReply: "In a real production system, yes. But in this interview, I want to see you implement the underlying data structure from scratch using primitive building blocks.",
                  points: 5
                },
                {
                  text: "Will this cache be accessed by multiple threads simultaneously?",
                  rating: "EXCELLENT",
                  interviewerReply: "For the first 30 minutes, let's write a correct single-threaded implementation. If we have time at the end, we will discuss concurrency using ReentrantReadWriteLock.",
                  points: 25
                }
              ]
            },
            {
              stepNumber: 2,
              title: "Proposing the Optimal Data Structure",
              interviewerSays: "How will you achieve O(1) for both lookup and eviction/reordering?",
              options: [
                {
                  text: "Use a single ArrayList. get() is O(1) and when we evict, remove index 0.",
                  rating: "POOR",
                  interviewerReply: "Removing index 0 from an ArrayList shifts all N elements left, which is O(N) time complexity. That fails the strict O(1) constraint.",
                  points: 5
                },
                {
                  text: "Combine a HashMap<Integer, Node> for O(1) lookup with a custom Doubly Linked List (DLL) for O(1) node removal and insertion at head.",
                  rating: "OPTIMAL",
                  interviewerReply: "Spot on! The HashMap gives instant O(1) access to any node in the list, and a Doubly Linked List lets us detach and move that node to the front in O(1) without shifting any other nodes.",
                  points: 35
                }
              ]
            },
            {
              stepNumber: 3,
              title: "Optimal Implementation & Pseudo-Code",
              code: `class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    
    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail; // Dummy sentinel nodes
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        moveToHead(node); // Mark as most recently used
        return node.val;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.val = value;
            moveToHead(node);
        } else {
            if (map.size() >= capacity) {
                // Evict least recently used (node right before dummy tail)
                Node lru = tail.prev;
                removeNode(lru);
                map.remove(lru.key);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            addToHead(newNode);
        }
    }
    
    private void addToHead(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
    
    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }
}`
            }
          ],

          rubric: [
            { category: "Communication & Clarification", score: "5/5", notes: "Asked about capacity, return values for misses, and concurrency before jumping to code." },
            { category: "Data Structure Selection", score: "5/5", notes: "Identified the classic HashMap + Doubly Linked List synergy with dummy head/tail sentinels." },
            { category: "Code Hygiene & Modularity", score: "5/5", notes: "Extracted helper methods (addToHead, removeNode, moveToHead) keeping get/put clean and bug-free." }
          ]
        },

        {
          id: "median-stream",
          company: "Meta / Microsoft",
          level: "Mid-Senior SDE",
          title: "Find Median from Data Stream",
          problemPrompt: "The interviewer says: 'Numbers are continuously streaming into our system one by one. Design a class that supports `addNum(num)` and `findMedian()`. findMedian() must run in O(1) time.'",
          
          steps: [
            {
              stepNumber: 1,
              title: "Clarifying Questions",
              interviewerSays: "What edge cases and constraints are you thinking about?",
              options: [
                {
                  text: "Can the stream have negative numbers, duplicates, and what if findMedian() is called before any numbers are added?",
                  rating: "EXCELLENT",
                  interviewerReply: "Negative numbers and duplicates are totally valid. If called when empty, you can return 0.0 or throw an exception. Most importantly, we want fast O(log N) insertion and instant O(1) median lookup.",
                  points: 25
                }
              ]
            },
            {
              stepNumber: 2,
              title: "The Breakthrough: The Two-Heap Pattern",
              interviewerSays: "How do you avoid re-sorting the whole array on every incoming number?",
              options: [
                {
                  text: "Split the numbers into two halves: A Max-Heap for the smaller half, and a Min-Heap for the larger half. The median is always right at the tops of the two heaps!",
                  rating: "OPTIMAL",
                  interviewerReply: "Brilliant! Max-heap holds the lower 50%, Min-heap holds the upper 50%. The tops of the heaps give you the exact middle numbers in O(1) time, while insertion is just O(log N).",
                  points: 40
                }
              ]
            }
          ],
          rubric: [
            { category: "Algorithmic Intuition", score: "5/5", notes: "Quickly recognized the Two-Heap partition pattern." }
          ]
        }
      ]
    },

    // ── TRACK 2: SYSTEM DESIGN WHITEBOARD ─────────────────
    {
      id: "system-design",
      name: "System Design Whiteboard",
      icon: "🏛️",
      color: "#fbbf24",
      summary: "Simulate a 45-minute architectural interview: requirements gathering, back-of-the-envelope capacity estimations, high-level diagrams, and bottleneck mitigation.",
      scenarios: [
        {
          id: "rate-limiter",
          company: "Stripe / Cloudflare",
          level: "Staff Engineer",
          title: "Design an API Rate Limiter",
          problemPrompt: "The interviewer says: 'Our payment APIs are getting hammered by malicious scraping bots and accidental customer retry storms. Design an enterprise-grade Rate Limiting system that protects our backend services from overload.'",
          
          steps: [
            {
              stepNumber: 1,
              title: "Step 1: Functional & Non-Functional Requirements",
              interviewerSays: "What requirements are we targeting?",
              options: [
                {
                  text: "Functional: Limit users to e.g. 100 requests/minute. Return HTTP 429 Too Many Requests when exceeded. Non-Functional: Ultra-low latency (< 2ms overhead), high availability, and horizontally scalable across distributed servers.",
                  rating: "EXCELLENT",
                  interviewerReply: "Exactly. The rate limiter is in the critical request path, so latency overhead must be virtually unnoticeable.",
                  points: 30
                }
              ]
            },
            {
              stepNumber: 2,
              title: "Step 2: Algorithm Comparison (Token Bucket vs Sliding Window)",
              interviewerSays: "Which rate limiting algorithm would you pick and why?",
              options: [
                {
                  text: "Token Bucket implemented in Redis with Lua scripts. It allows traffic bursts up to bucket capacity, is memory-efficient (2 numbers per user: token count & last refill timestamp), and Lua scripts ensure atomic execution.",
                  rating: "OPTIMAL",
                  interviewerReply: "Perfect choice. Token Bucket handles bursts gracefully, and Redis Lua scripts prevent race conditions in multi-threaded distributed environments without heavy distributed locks.",
                  points: 40
                }
              ]
            }
          ],

          rubric: [
            { category: "Requirements Discovery", score: "5/5", notes: "Identified HTTP 429 status code and sub-2ms latency constraint." },
            { category: "Algorithm Tradeoffs", score: "5/5", notes: "Correctly contrasted Token Bucket against Sliding Window Log." },
            { category: "Concurrency & Race Conditions", score: "5/5", notes: "Utilized Redis Lua scripts to eliminate check-then-act race conditions." }
          ]
        }
      ]
    },

    // ── TRACK 3: BEHAVIORAL & LEADERSHIP (STAR METHOD) ────
    {
      id: "behavioral",
      name: "Behavioral & Leadership (STAR)",
      icon: "🎯",
      color: "#10b981",
      summary: "Master the STAR method (Situation, Task, Action, Result) for Amazon Leadership Principles and Google 'Googliness' behavioral rounds.",
      scenarios: [
        {
          id: "technical-disagreement",
          company: "Amazon / Google",
          level: "All Engineering Levels",
          title: "A Difficult Technical Disagreement",
          problemPrompt: "The interviewer asks: 'Tell me about a time when you strongly disagreed with a senior teammate or team lead about an architectural decision. How did you handle it and what was the outcome?'",
          
          steps: [
            {
              stepNumber: 1,
              title: "Structuring Your Answer with the STAR Framework",
              interviewerSays: "Which of these responses demonstrates true leadership and engineering maturity?",
              options: [
                {
                  text: "Situation: My lead wanted a monolithic relational DB, but I wanted microservices. I refused to write the code until he escalated to the Director, and the Director agreed with me.",
                  rating: "NO HIRE ✕",
                  interviewerReply: "This shows poor collaboration, refusal to compromise, and unnecessary escalation without data.",
                  points: 0
                },
                {
                  text: "Situation: We were choosing between MongoDB and PostgreSQL for an order tracking system. My lead wanted Mongo for fast schema changes, but our transactions required strict ACID compliance. Action: Instead of arguing opinions, I built a quick 2-day benchmark showing financial reconciliation edge cases with sample loads. We reviewed the data together, agreed on PostgreSQL with JSONB columns for flexibility, and shipped on time with zero ledger corruption.",
                  rating: "STRONG HIRE ✓",
                  interviewerReply: "Outstanding! You focused on data and benchmarks over ego, found a creative compromise (PostgreSQL JSONB), and prioritized the customer.",
                  points: 50
                }
              ]
            }
          ],

          rubric: [
            { category: "Data-Driven Disagreement", score: "5/5", notes: "Used concrete prototypes and latency benchmarks rather than personal opinions." },
            { category: "Disagree and Commit", score: "5/5", notes: "Demonstrated respect, ownership, and commitment to the team's shared goal." }
          ]
        }
      ]
    }
  ]
};
