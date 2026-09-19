// System Design Track Data

export const systemDesignData = {
  fundamentals: [
    {
      id: 'scalability',
      title: 'Scalability 101',
      icon: '📈',
      content: `When your app has 10 users, anything works. When it has 10 million? Everything breaks. **Scalability** is the ability of a system to handle growing amounts of work by adding resources.

**Vertical Scaling ("Scale Up")**
Make the single machine BIGGER. More RAM, faster CPU, more storage.
- ✅ Simple — no code changes needed
- ❌ Hardware limits exist (you can't scale infinitely)
- ❌ Single Point of Failure — if this machine dies, everything is down
- 💰 Gets very expensive very fast

**Horizontal Scaling ("Scale Out")**
Add MORE machines and distribute the load across them.
- ✅ Nearly infinite scale (add as many servers as you need)
- ✅ No single point of failure (if one server dies, others handle requests)
- ✅ More cost-effective (use cheap commodity hardware)
- ❌ Requires a Load Balancer to distribute traffic
- ❌ Sessions/State must be shared (need a centralized cache like Redis)
- ❌ More complex architecture

**In interviews: ALWAYS design for horizontal scalability. Never say "we can just get a bigger server."**`,
      keyPoints: [
        'Vertical scaling = better hardware. Horizontal scaling = more machines.',
        'Real production systems (Google, Facebook, Netflix) all use horizontal scaling.',
        'Stateless servers scale easier — move session state to Redis or a DB.',
        '"Stateless" means any server can handle any request (no user session memory on the server).'
      ]
    },
    {
      id: 'load-balancers',
      title: 'Load Balancers',
      icon: '⚖️',
      content: `A **Load Balancer** sits in front of your server fleet and distributes incoming requests across multiple servers so no single server is overwhelmed.

Think of it as a **traffic cop at a highway toll plaza**. Instead of all cars going through booth #1 while booths 2-10 sit empty, the traffic cop sends cars to the booth with the shortest queue.

**Load Balancing Algorithms:**

1. **Round Robin**: Send request 1 to Server A, request 2 to Server B, request 3 to Server C, request 4 back to Server A...
   - Simple, fair distribution
   - Problem: Doesn't account for server load. A slow request on A doesn't matter — next request still goes to A.

2. **Least Connections**: Always send to the server with FEWEST active connections.
   - Better than Round Robin for long-running requests (WebSockets, file uploads)
   - Problem: Requires tracking connection count.

3. **IP Hash**: Hash the client's IP address to always route them to the SAME server.
   - Ensures session persistence (user always hits the same server)
   - Problem: If that server goes down, the user's session is lost.

4. **Weighted Round Robin**: Some servers are more powerful — give them more traffic.

**Layer 4 vs Layer 7:**
- **L4 Load Balancer**: Routes by TCP/IP (fast, but can't see HTTP content)
- **L7 Load Balancer**: Routes by HTTP URL, headers, cookies (smarter, can route /api to one cluster and /static to another)`,
      keyPoints: [
        'Load balancers enable horizontal scaling by distributing traffic.',
        'They also provide health checking — if a server dies, stop sending it traffic.',
        'Popular tools: AWS ALB/NLB, Nginx, HAProxy.',
        'Round Robin is the default; Least Connections for variable-length requests.'
      ]
    },
    {
      id: 'caching',
      title: 'Caching',
      icon: '⚡',
      content: `**The single most impactful optimization in distributed systems.** A cache stores the result of expensive computations or DB queries in fast memory so you don't have to recompute them.

Think of your **brain as a cache**. You don't look up your home address in a phonebook every time someone asks — you've cached it in memory. Only if you forget (cache miss) do you look it up (database query).

**Cache Hit**: Data found in cache → return in microseconds. ✅
**Cache Miss**: Data NOT in cache → fetch from DB, store in cache, return. ❌ (but only once!)

**Cache Strategies:**

1. **Cache-Aside (Lazy Loading)**: Application checks cache first. On miss, fetch from DB and populate cache.
   - Most common pattern. Simple to implement.
   - Risk: Cache stampede when many users request the same uncached key simultaneously.

2. **Write-Through**: Write to BOTH cache AND database simultaneously.
   - Cache is always consistent with DB.
   - Slower writes, but reads are always fresh.
   - Risk: Write amplification.

3. **Write-Back**: Write to cache ONLY first, persist to DB asynchronously later.
   - Fastest writes.
   - Risk: Data loss if cache fails before persistence.

**Cache Eviction Policies (when cache is full, what to remove?):**
- **LRU (Least Recently Used)**: Remove what hasn't been used longest. Most common.
- **LFU (Least Frequently Used)**: Remove what's been used fewest times.
- **FIFO**: Remove the oldest entry regardless of usage.

**Redis vs Memcached:**
| | Redis | Memcached |
|---|---|---|
| Data Types | Strings, Lists, Sets, Sorted Sets, Hashes | Strings only |
| Persistence | Can persist to disk | Memory only |
| Replication | Supported | No built-in |
| Best For | Complex caching, Leaderboards, Sessions | Simple high-speed key-value |`,
      keyPoints: [
        'Cache everything expensive: DB queries, API calls, computed results.',
        'TTL (Time To Live) — always set an expiry so stale data gets refreshed.',
        'Redis is the industry standard for distributed caching.',
        'Cache invalidation is famously hard: "There are only 2 hard problems in CS: cache invalidation and naming things."'
      ]
    },
    {
      id: 'databases',
      title: 'SQL vs NoSQL',
      icon: '🗄️',
      content: `**The most common system design decision: Which database should I use?**

**SQL (Relational Databases: MySQL, PostgreSQL, Aurora)**
Data is structured in tables with rows and columns. Relationships between tables are enforced via foreign keys. Follows ACID properties.

- ✅ **ACID guarantees**: Atomicity, Consistency, Isolation, Durability — your money won't disappear in a bank transfer
- ✅ **Complex queries**: JOINs, aggregations, transactions
- ✅ **Strong consistency**: Read after write always returns the written data
- ❌ Harder to scale horizontally (sharding SQL is complex)
- ❌ Schema changes are expensive on large tables

**ACID Deep Dive:**
- **Atomicity**: Either ALL operations in a transaction succeed, or NONE do. (No half-completed transfers)
- **Consistency**: The database always moves from one valid state to another.
- **Isolation**: Concurrent transactions don't interfere with each other.
- **Durability**: Once committed, data persists even after crashes.

**NoSQL Databases:**

1. **Document Stores (MongoDB, DynamoDB)**: Store JSON-like documents. Great for user profiles, product catalogs, content that varies per item.

2. **Key-Value Stores (Redis, DynamoDB)**: Ultra-fast lookups by key. Great for sessions, caches, shopping carts.

3. **Wide-Column Stores (Cassandra, HBase)**: Massively scalable, optimized for writes. Great for time-series data, IoT sensor data, activity logs.

4. **Graph Databases (Neo4j)**: Optimized for traversing relationships. Great for social networks, recommendation engines.

**CAP Theorem** (You can only guarantee 2 of 3 in a distributed system):
- **C**onsistency: Every read gets the most recent write
- **A**vailability: Every request gets a response
- **P**artition Tolerance: System works even when network partitions occur

Since network partitions WILL happen, you choose CP (SQL, HBase) or AP (Cassandra, DynamoDB).`,
      keyPoints: [
        'Default answer: SQL. Switch to NoSQL when you have specific scale/flexibility needs.',
        'NoSQL ≠ better. NoSQL = different trade-offs. Both are used in production together.',
        'Most large companies use BOTH: SQL for transactions, NoSQL for fast lookups.',
        'Know CAP theorem — it comes up in every system design interview.'
      ]
    },
    {
      id: 'message-queues',
      title: 'Message Queues & Event Streaming',
      icon: '📨',
      content: `**The secret to building decoupled, resilient systems.** Instead of Service A calling Service B directly (tight coupling), A publishes a message to a queue, and B consumes it when ready (loose coupling).

**Problem message queues solve:** When your email service is slow, should the entire checkout process wait? No! Accept the order, publish an "order_placed" event, and let the email service process it independently.

**Key Benefits:**
- **Asynchronous Processing**: Caller doesn't block waiting for slow downstream services
- **Load Leveling**: Queue absorbs traffic spikes. Workers process at their own pace.
- **Durability**: Messages persist even if the consumer is temporarily down.
- **Decoupling**: Producer doesn't need to know who consumes its messages.

**Queue vs Pub/Sub:**
- **Queue**: One producer, one consumer. Each message processed by exactly ONE consumer. (Job queues, task distribution)
- **Pub/Sub**: One publisher, MANY subscribers. Same message delivered to ALL subscribers. (Event notifications, real-time updates)

**Apache Kafka (The industry standard for high-throughput event streaming):**
- Messages organized into **Topics** (like channels)
- Topics split into **Partitions** for parallelism
- Messages within a partition are ordered and have an **Offset** (cursor position)
- Consumers track their own offset — replay messages from any point!
- Retention: Messages can be kept for days/months (not deleted after consumption like RabbitMQ)
- Use cases: User activity logs, financial transactions, real-time analytics

**RabbitMQ:** Traditional message broker. Better for task queues, complex routing, and when you need the queue to manage delivery guarantees.`,
      keyPoints: [
        'Always ask in interviews: does this operation need to be synchronous?',
        'Kafka is for high-throughput event streams. RabbitMQ is for task queues.',
        '"At-least-once delivery" means consumers must be idempotent (processing same message twice is safe).',
        'Dead Letter Queue (DLQ) — where failed messages go after max retry attempts.'
      ]
    },
    {
      id: 'consistent-hashing',
      title: 'Consistent Hashing',
      icon: '🔄',
      content: `**The algorithm that makes distributed caches and databases possible.**

**The Problem:** You have 3 cache servers (A, B, C) and you use \`key % 3\` to determine which server stores each key. This works perfectly until... you add a 4th server. Now \`key % 4\` remaps EVERY key to a different server. You just invalidated your entire cache!

**Consistent Hashing Solution:**
1. Imagine a circle with positions 0 to 360°.
2. Hash each SERVER to a position on the circle (e.g., Server A → 45°, Server B → 150°, Server C → 270°).
3. To store key K: hash K to a position on the circle, then walk CLOCKWISE until you hit a server. That's where K lives.

**What happens when you add Server D at 200°?**
Only keys between 150° and 200° (previously going to Server B) now go to Server D. All other keys are UNAFFECTED! On average, only K/N keys are remapped (K = total keys, N = number of servers).

**Virtual Nodes:** To avoid uneven distribution (what if all servers cluster in one arc?), each physical server gets MULTIPLE positions (virtual nodes) on the circle. Standard Kafka, Cassandra, and DynamoDB all use this.

**Where it's used:**
- Distributed caches (CDN, Redis Cluster)
- Database sharding (Cassandra, DynamoDB)
- Load balancing with session affinity`,
      keyPoints: [
        'Consistent hashing minimizes key remapping when servers are added/removed.',
        'Virtual nodes ensure even distribution across physical servers.',
        'Cassandra uses consistent hashing with virtual nodes internally.',
        'When a server dies, only its arc of keys needs to be redistributed.'
      ]
    },
    {
      id: 'api-design',
      title: 'API Design: REST vs GraphQL vs gRPC',
      icon: '🔌',
      content: `**Every service communicates through APIs. Knowing when to use which protocol is a core engineering skill.**

**REST (Representational State Transfer)** — The standard for web APIs
- Resources identified by URLs: \`GET /users/123\`, \`POST /orders\`, \`DELETE /posts/456\`
- Stateless: Each request carries all needed information
- HTTP verbs have meaning: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)
- Returns JSON (usually)
- ✅ Universal — any language, any client can call it
- ❌ Over-fetching: You get ALL user fields even if you only needed the name
- ❌ Under-fetching: One endpoint isn't enough, so you make 3 calls

**GraphQL** — Query exactly what you need
- Client sends a query describing EXACTLY what fields it wants
- Server returns exactly those fields — no more, no less
- \`{ user(id: 123) { name, email, posts { title } } }\`
- ✅ No over/under-fetching
- ✅ Single endpoint (/graphql)
- ✅ Great for complex UIs with many components needing different data
- ❌ Caching is harder (queries are dynamic)
- ❌ N+1 problem: Resolving nested data naively makes many DB calls

**gRPC (Google Remote Procedure Call)** — For service-to-service communication
- Uses Protocol Buffers (binary format, 3-10x smaller than JSON)
- Strongly typed contracts defined in .proto files
- Bidirectional streaming
- ✅ Ultra-fast (binary protocol, HTTP/2 multiplexing)
- ✅ Auto-generated client code in any language
- ❌ Not human-readable. Hard to debug with curl/Postman.
- ❌ Poor browser support (gRPC-Web required)
- **Use for**: Internal microservice communication, high-throughput systems

**When to use what:**
- Public API → REST
- Complex data requirements, mobile app, multiple clients → GraphQL  
- Internal microservices, high performance → gRPC`,
      keyPoints: [
        'REST is the default choice for public APIs.',
        'GraphQL shines for mobile apps (reduce data over cellular networks).',
        'gRPC is the backbone of most internal microservice communication (Uber, Netflix).',
        'Always design idempotent APIs: calling PUT twice should have the same result as once.'
      ]
    },
    {
      id: 'latency-numbers',
      title: '⏱️ Latency Numbers Every Engineer Must Know',
      icon: '🕐',
      content: `These numbers are the foundation of "back-of-the-envelope" estimation in system design interviews. Knowing the ORDER OF MAGNITUDE of each operation separates great engineers from good ones.

| Operation | Latency | Analogy |
|-----------|---------|---------|
| L1 cache reference | 1 ns | 1 second |
| L2 cache reference | 4 ns | 4 seconds |
| L3 cache reference | 30 ns | 30 seconds |
| Main memory (RAM) access | 100 ns | 2 minutes |
| SSD random read (4KB) | 100 µs | 3 hours |
| HDD seek + read | 10 ms | 2 weeks |
| Network: same datacenter | 0.5 ms | 12 hours |
| Network: coast to coast | 40 ms | 40 days |
| Network: across the world | 150 ms | 150 days |

**Key Takeaways:**
- RAM is 100,000x faster than HDD. Cache is 1,000x faster than RAM.
- SSD is 100x faster than HDD. Always prefer SSD-backed storage for databases.
- A round-trip to a far server (150ms) is like 150 days compared to L1 cache (1 second). This is why CDNs exist!
- Database query (index hit on SSD): ~1ms. Database full table scan: can be seconds.

**Rules of thumb:**
- Cache: Single-digit milliseconds (Redis: 1-5ms)
- Database query: 10-100ms (with indexes)
- External API call: 100-500ms  
- User perceives delays > 100ms as "slow"
- Users abandon pages that take > 3 seconds to load`,
      keyPoints: [
        'L1 cache ~ 1ns. RAM ~ 100ns. SSD ~ 100µs. HDD ~ 10ms.',
        'Network same datacenter ~ 0.5ms. Across world ~ 150ms.',
        'This is WHY caching exists: replace 10ms DB calls with 0.1ms cache hits.',
        'In interviews, use these to justify architectural decisions.'
      ]
    }
  ],

  problems: [
    {
      id: 'url-shortener',
      title: 'Design a URL Shortener (like bit.ly)',
      icon: '🔗',
      difficulty: 'Medium',
      timeToDesign: '45 min',
      companies: ['Amazon', 'Google', 'Microsoft', 'Meta'],
      overview: 'Build a system that takes a long URL (https://www.google.com/search?q=...) and produces a short URL (bit.ly/abc123). When visited, the short URL redirects to the original.',
      requirements: {
        functional: [
          'Given a long URL, generate a unique short URL (6-8 characters)',
          'Redirect short URL to original long URL',
          'Short links expire after 5 years (optional: custom expiry)',
          'Track click analytics (optional: count, location, device)'
        ],
        nonFunctional: [
          '100M URLs created per day (~1200 writes/sec)',
          '10B redirects per day (~115K reads/sec) — READ heavy!',
          'Low latency redirect < 10ms',
          '99.9% availability (maximum 8.7 hours downtime/year)'
        ]
      },
      estimation: {
        storage: 'Each URL entry: ~500 bytes. 100M/day × 365 × 5 years = 182.5B URLs × 500 bytes = ~91 TB (need ~100 TB)',
        bandwidth: '115K reads/sec × 500 bytes = 57.5 MB/s read bandwidth',
        cache: '80/20 rule: 20% of URLs handle 80% of traffic. Cache top 20%: 20M URLs × 500 bytes = 10 GB fits in RAM!'
      },
      architecture: `**High-Level Architecture:**

1. **Client** → hits short URL (bit.ly/abc123)
2. **Load Balancer** → distributes request to any App Server
3. **App Server** → looks up "abc123" in **Cache (Redis)**
4. **Cache Hit** → return 301/302 redirect to original URL ✅ (fast path, <1ms)
5. **Cache Miss** → query **Database** for mapping, store in cache, return redirect

**URL Generation Strategy:**

Option A: **Base62 Encoding** (Best choice)
- Generate auto-incrementing ID (1, 2, 3, 4...)
- Convert to Base62 (digits 0-9, a-z, A-Z = 62 characters)
- ID 1 → "0000001", ID 125 → "0000002", ID 3521614606207 → "aaaaaab"
- 6-character Base62 = 62^6 = 56 billion unique URLs ✅

Option B: **MD5/SHA-1 Hash** 
- Hash the long URL → take first 6 chars
- Risk: hash collisions! Two different URLs could produce same short code.

**Database Schema:**
\`\`\`sql
CREATE TABLE url_mappings (
  id           BIGINT PRIMARY KEY AUTO_INCREMENT,
  short_code   VARCHAR(8) UNIQUE NOT NULL,  -- The "abc123"
  original_url TEXT NOT NULL,
  user_id      BIGINT,
  created_at   TIMESTAMP,
  expires_at   TIMESTAMP,
  click_count  BIGINT DEFAULT 0
);
CREATE INDEX idx_short_code ON url_mappings(short_code);
\`\`\`

**Redirect Status Codes:**
- 301 Permanent Redirect: Browser caches the redirect. Reduces server load. Bad for analytics (can't track repeat visits).
- 302 Temporary Redirect: Browser always hits your server. Good for analytics. Higher server load.`,
      deepDive: [
        { q: 'How do you scale to 115K reads/second?', a: 'Cache (Redis) + Read Replicas. 99% of reads hit cache. DB only for cache misses.' },
        { q: 'How do you prevent ID counter from becoming a bottleneck?', a: 'Range allocation: Service A gets IDs 1-1000, Service B gets 1001-2000. Each server uses its range independently.' },
        { q: 'How do you handle analytics without slowing down redirects?', a: 'Async: Write click event to Kafka, redirect immediately. Analytics pipeline consumes Kafka async.' },
        { q: 'What database to use?', a: 'Either SQL (MySQL) or NoSQL (Cassandra/DynamoDB). Read pattern is simple key-value (short_code → url), so NoSQL works great. But MySQL with proper indexing and replication handles 115K reads/sec comfortably too.' }
      ]
    },
    {
      id: 'instagram',
      title: 'Design Instagram / Photo Sharing',
      icon: '📸',
      difficulty: 'Hard',
      timeToDesign: '45 min',
      companies: ['Meta', 'Instagram', 'Pinterest', 'Google'],
      overview: 'Build a system where users can upload photos/videos, follow other users, and see a feed of recent posts from people they follow.',
      requirements: {
        functional: [
          'Users can upload photos/videos',
          'Users can follow/unfollow other users',
          'Users can see a news feed of followed users\' posts',
          'Users can like and comment on posts'
        ],
        nonFunctional: [
          '500M daily active users, 100M photos uploaded per day',
          'Read-heavy: 20:1 reads to writes ratio',
          'Photos served globally with low latency',
          '99.99% availability for feed generation'
        ]
      },
      architecture: `**Key Components:**

**1. Photo Upload Flow:**
Client → Load Balancer → Upload Service → **Object Storage (S3)**
                                        → Metadata DB (Post details, user, timestamp)
                                        → **CDN** (S3 data replicated to edge locations)

**2. Photo Serving:**
Client → CDN Edge (if cached, ~5ms) → S3 origin (if not cached, ~100ms)
Never serve photos directly from your app servers! S3 + CDN handles this.

**3. News Feed Generation (The Hard Problem):**

**Option A: Fanout on Write (Push Model)**
- When User A posts, IMMEDIATELY push to all A's followers' feed caches
- Feed read is O(1) — just read your pre-built feed cache
- Problem: User with 10M followers = write to 10M feed caches! (Celebrity Problem)

**Option B: Fanout on Read (Pull Model)**
- When User X opens the app, dynamically query all X's followed users' recent posts
- Problem: Slow for users who follow 1000 people (1000 DB queries!)

**Option C: Hybrid (Instagram's actual approach)**
- Regular users (< 10K followers) → Fanout on Write
- Celebrities (> 1M followers) → Fanout on Read (pull their posts when feed is generated)
- Combine celebrity posts with pre-built feed at read time

**Database Schema (simplified):**
\`\`\`
Users: user_id, username, email, profile_pic_url
Posts: post_id, user_id, photo_s3_url, caption, created_at
Follows: follower_id, followee_id, created_at
Likes: post_id, user_id, created_at
Feed: user_id → [list of post_ids] (stored in Redis Sorted Set, score = timestamp)
\`\`\``,
      deepDive: [
        { q: 'How do you store photos efficiently?', a: 'Amazon S3 (or equivalent object storage). Cheap, durable (11 nines), infinitely scalable. Never store photos in a database.' },
        { q: 'Why a CDN for photos?', a: 'A user in Mumbai gets photos from a Mumbai CDN edge node (5ms) instead of a US origin server (200ms). CDN caches popular photos worldwide.' },
        { q: 'How do you paginate the feed?', a: 'Cursor-based pagination with "after" timestamp. Return 20 posts, with a cursor pointing to the last post\'s timestamp. Next page fetches posts created before that cursor.' },
        { q: 'How to handle simultaneous writes to follower feeds?', a: 'Write to Redis async via message queue (Kafka). Publisher posts → Kafka → feed update workers → Redis. Async keeps upload fast.' }
      ]
    },
    {
      id: 'whatsapp',
      title: 'Design WhatsApp / Messaging System',
      icon: '💬',
      difficulty: 'Hard',
      timeToDesign: '45 min',
      companies: ['Meta', 'Google', 'Slack', 'Discord'],
      overview: 'Build a real-time messaging system supporting 1-to-1 and group chats, message delivery receipts, and offline message storage.',
      requirements: {
        functional: [
          'Real-time 1:1 messaging between users',
          'Group messaging (up to 256 members)',
          'Message delivery receipts (Sent, Delivered, Read — WhatsApp\'s blue ticks)',
          'Offline support: messages stored until recipient comes online',
          'Message encryption (end-to-end encrypted)'
        ],
        nonFunctional: [
          '2 billion users, 100 billion messages/day',
          'Message latency < 100ms',
          'Messages must be delivered at-least-once',
          'Infinite message history (never delete)'
        ]
      },
      architecture: `**The Core Challenge: Real-time messaging**

HTTP is request-response — the client must initiate. How does the server PUSH new messages to the client?

**Solution: WebSockets**
WebSocket is a persistent, full-duplex TCP connection. Once established, either side can send data anytime. Perfect for chat!

**Message Flow:**
1. User A sends message to User B
2. App Server A receives message
3. App Server A writes message to **Database** (Cassandra — great for time-series messages)
4. App Server A looks up which **Chat Server** User B is connected to (via **Presence Service** backed by ZooKeeper/Redis)
5. Message forwarded to User B's Chat Server → delivered via WebSocket to User B

**The Presence Service Problem:**
With millions of concurrent connections across thousands of chat servers, how does Server A know that "User B is connected to Server 47"?
- When User B connects: Chat Server 47 registers "User B → Server 47" in Redis
- When User B disconnects: Registration is removed
- Server A checks Redis to find User B's server

**Offline Message Delivery:**
- If User B is offline, store message in the database
- When B comes online: B's Chat Server fetches pending messages from DB
- Database: Cassandra (excellent for "get all messages for user B after timestamp T")

**Message Receipts (Blue Ticks):**
- **Sent** (✓): Message received by server and written to DB
- **Delivered** (✓✓): User B's device received the message
- **Read** (✓✓ blue): User B opened the conversation
- Each state is a separate event sent back to the original sender via the same WebSocket infrastructure

**Database Choice: Cassandra**
- Write-heavy (100B messages/day!)
- Access pattern: "Get messages for conversation X, sorted by timestamp"
- Cassandra partition key: conversation_id, clustering key: timestamp
- Naturally handles time-series data with high write throughput`,
      deepDive: [
        { q: 'Why not use a relational database for messages?', a: '100 billion writes per day is extreme. Cassandra is built for this — linear horizontal scaling, tunable consistency, optimized for write throughput. PostgreSQL would require massive sharding complexity.' },
        { q: 'How does end-to-end encryption work?', a: 'Signal Protocol. Each device generates a public/private key pair. The server only stores public keys. Messages are encrypted with recipient\'s public key on the SENDER\'s device. Server never sees plaintext.' },
        { q: 'How to handle group messages efficiently?', a: 'Store the message once with group_id. Fan out delivery to group members asynchronously via message queue. Members fetch messages via their "last_seen_message_id" cursor.' },
        { q: 'What happens when the Chat Server hosting User B crashes?', a: 'Load balancer detects the crash, stops routing there. User B\'s client reconnects (WebSocket auto-reconnect). Pending messages fetched from DB on reconnect.' }
      ]
    },
    {
      id: 'youtube',
      title: 'Design YouTube / Video Streaming',
      icon: '▶️',
      difficulty: 'Hard',
      timeToDesign: '45 min',
      companies: ['Google', 'Netflix', 'TikTok', 'Meta'],
      overview: 'Build a system for video upload, transcoding, storage, and streaming with recommendations.',
      requirements: {
        functional: [
          'Users can upload videos',
          'Videos are available in multiple resolutions (360p, 720p, 1080p, 4K)',
          'Users can search, watch, like, comment on videos',
          'Subscription notifications when followed channels upload'
        ],
        nonFunctional: [
          '2B MAU, 500 hours of video uploaded per minute',
          'Video playback latency < 2 seconds',
          'Smooth playback (adaptive bitrate streaming)',
          'Global availability with CDN'
        ]
      },
      architecture: `**Two Completely Different Flows:**

**WRITE PATH (Upload):**
User uploads → Object Storage (S3) → Transcoding Pipeline → CDN

1. **Upload Service**: Accept raw video file, store in S3 (raw bucket). Return upload_id.
2. **Transcoding Queue (Kafka)**: "New video uploaded" event triggers workers.
3. **Transcoding Workers (GPU servers)**: Convert raw video to multiple formats (H.264, VP9) and resolutions (360p, 720p, 1080p, 4K). Also generates thumbnails.
4. **Processed Storage**: Transcoded versions stored in S3 (processed bucket).
5. **CDN Replication**: Popular video chunks cached at CDN edge nodes globally.
6. **Database Update**: Video metadata marked as "ready". Notification sent to subscribers.

**READ PATH (Watch):**
1. Client requests video → gets back a **manifest file** (HLS .m3u8 or DASH .mpd)
2. Manifest describes all available chunks and their URLs (CDN URLs!)
3. Client's video player downloads chunks from **CDN edge nodes**
4. **Adaptive Bitrate Streaming (ABR)**: Player monitors network speed. On slow connection → switch to 360p chunks. Speed improves → switch back to 1080p. Seamless!

**Transcoding is the most complex part:**
- 1 hour of 4K raw footage → 4 different resolutions + multiple formats = ~40 GB of processing
- Must be distributed across many GPU machines
- Apache Spark or custom pipeline coordinates workers
- YouTube uses a DAG-based workflow (like Apache Airflow) for transcoding steps

**Database Choices:**
- Video metadata: MySQL (structured, moderate scale)
- User watch history: Cassandra (time-series, high write)
- Comments: MySQL or Firestore
- Search index: Elasticsearch`,
      deepDive: [
        { q: 'Why transcode to multiple resolutions?', a: 'Not everyone has 100Mbps internet. Mobile users on 4G need 360p (1 Mbps) while desktop users on fiber want 4K (20+ Mbps). Pre-transcoding avoids real-time conversion.' },
        { q: 'How does CDN caching work for videos?', a: 'Videos are split into 2-10 second chunks. Popular chunks (trending videos) are cached at all CDN edges. Long-tail videos (rarely watched) stay at origin and are fetched on demand.' },
        { q: 'How to handle the top 1% of viral videos?', a: 'Predictive pre-warming: detect viral trajectory early, pro-actively push chunks to all CDN regions before global demand hits. Real YouTube does this.' },
        { q: 'How does YouTube recommendation work (simplified)?', a: 'Collaborative filtering: users who watched A and B also watched C → recommend C. Two-stage: candidate generation (ML model, billions → thousands) → ranking (another ML model, thousands → 20 suggestions).' }
      ]
    },
    {
      id: 'twitter-feed',
      title: 'Design Twitter Feed',
      icon: '🐦',
      difficulty: 'Hard',
      timeToDesign: '45 min',
      companies: ['Twitter/X', 'Meta', 'LinkedIn', 'Reddit'],
      overview: 'Design a news feed system where users see tweets from accounts they follow, in reverse chronological order (or ranked by relevance).',
      requirements: {
        functional: [
          'Post tweets (text, images, videos)',
          'See personalized feed of followed accounts\' tweets',
          'Like, retweet, reply to tweets',
          'Search tweets by keyword'
        ],
        nonFunctional: [
          '300M DAU, 600 tweets per second',
          'Feed generation < 200ms',
          'Eventually consistent (showing a tweet 1 second late is OK)',
          '99.9% availability'
        ]
      },
      architecture: `**The Fundamental Problem: Fanout**

User A follows 500 people. Each posts 10 tweets/day = 5,000 new tweets per day for User A's feed. How to generate A's personalized feed in < 200ms?

**Approach 1: Pull (Fanout on Read)**
When A opens the app, query all 500 followees' recent tweets and merge.
- 500 DB queries (one per followee) = too slow!
- Or: JOIN query with followers table — works but heavy on DB

**Approach 2: Push (Fanout on Write)**
When User B posts a tweet, immediately write that tweet ID to ALL of B's followers' feed caches (Redis Sorted Set, sorted by timestamp).
- When A opens app: just read A's pre-built feed from Redis. O(1)!
- Problem: Elon Musk has 150M followers. One tweet = 150M Redis writes. 
  That's a "celebrity problem" / "hotspot" — the system can't keep up.

**Twitter's Actual Hybrid Approach:**
- Regular users (< 1M followers): Fanout on Write
- Celebrities (> 1M followers): Fanout on Read
- When building A's feed:
  1. Read A's pre-built feed from Redis (from regular users)
  2. Fetch recent tweets from celebrities A follows (from their tweet stores)
  3. Merge and sort by timestamp
  4. Return to A

**Redis Sorted Set for Feed:**
\`\`\`
Key: "feed:user_a_id"
Members: tweet_ids
Score: tweet_timestamp (UNIX timestamp)
\`\`\`
\`ZADD feed:user_a_id 1690000000 tweet_123\` → adds tweet to feed
\`ZREVRANGE feed:user_a_id 0 19\` → get latest 20 tweets

**Search:**
Ingest all tweets into **Elasticsearch** in real-time (Kafka → Elasticsearch consumer).
Full-text search queries hit Elasticsearch cluster, not the main DB.`,
      deepDive: [
        { q: 'How do you handle the 150M follower celebrity problem?', a: 'Celebrities\' tweets aren\'t pushed to all followers\' feeds. Instead, a "celebrity list" per user is maintained. At feed generation time, query each celebrity\'s tweet cache and merge.' },
        { q: 'What\'s the Read vs Write ratio?', a: 'Twitter is extremely read-heavy. For every tweet written (600/sec), there are millions of reads. Design optimizes for reads: Redis cache for feeds, CDN for media, read replicas for DB.' },
        { q: 'How to count likes efficiently?', a: 'Async counter service: Likes write to Kafka → counter service batches and updates DB periodically. Don\'t do atomic DB increment for every like — can\'t handle millions of concurrent likes.' },
        { q: 'How to handle trending topics?', a: 'Count keyword occurrences in a rolling 1-hour window using a stream processor (Kafka Streams/Flink). Top N by count = trending. Precision matters less than speed here.' }
      ]
    },
    {
      id: 'distributed-cache',
      title: 'Design a Distributed Cache (like Redis)',
      icon: '⚡',
      difficulty: 'Hard',
      timeToDesign: '45 min',
      companies: ['Google', 'Amazon', 'Microsoft', 'Meta'],
      overview: 'Design a distributed in-memory key-value cache supporting GET, PUT, DELETE with TTL expiration, LRU eviction, and horizontal scaling.',
      requirements: {
        functional: [
          'GET(key): Return value or null',
          'PUT(key, value, ttl): Store with optional expiry',
          'DELETE(key): Remove entry',
          'LRU eviction when memory is full',
          'TTL-based expiry'
        ],
        nonFunctional: [
          'P99 latency < 1ms for cache hits',
          'Horizontal scalability to petabytes',
          'High availability (no single point of failure)',
          '99.99% uptime'
        ]
      },
      architecture: `**Single Node Architecture (Start Here):**

The cache is just a HashMap + eviction policy.

**LRU Cache Implementation (LinkedHashMap trick):**
\`\`\`java
class LRUCache extends LinkedHashMap<Integer, Integer> {
    private final int capacity;
    
    LRUCache(int capacity) {
        super(capacity, 0.75f, true); // access-ordered = true!
        this.capacity = capacity;
    }
    
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity; // Auto-evict when full
    }
}
\`\`\`

Or build it with Doubly Linked List + HashMap for O(1) get, put.

**Distributed Scaling:**

**1. Sharding (Partitioning)**
Split keys across multiple cache nodes using **consistent hashing**.
- Key "user_123" → hash → cache node 3
- Key "product_456" → hash → cache node 7
- Adding a new node only remaps ~1/N of keys (consistent hashing magic!)

**2. Replication**
Each shard has a PRIMARY and 1-2 REPLICAS.
- Reads can hit any replica (read scaling)
- Writes go to primary, replicated async to replicas
- If primary dies, replica is promoted (automated failover)

**3. The Cache Cluster (Redis Cluster Architecture):**
- 16384 hash slots divided among nodes
- Key → CRC16 hash → slot number → find which node owns that slot
- Redis Cluster handles this automatically

**Cache Warming Strategies:**
- Cold start problem: New cache node starts empty. All requests miss → DB overloaded!
- Solution 1: Lazy loading (cache populates naturally over time)
- Solution 2: Pre-warming (load popular keys from DB before going live)

**Cache Stampede (Thundering Herd) Problem:**
A popular key expires. 10,000 requests simultaneously miss the cache → all hit the DB!
Solutions:
1. **Mutex Lock**: First thread to miss acquires a lock, fetches from DB, populates cache. Other threads wait.
2. **Probabilistic Early Expiration**: Slightly before TTL expires, randomly refresh in background.
3. **Redundant caching**: Keep stale value until fresh value is ready (serve stale while refreshing).`,
      deepDive: [
        { q: 'How does LRU eviction work at O(1)?', a: 'Doubly Linked List tracks access order (most recent at head, least recent at tail). HashMap stores key → node pointer. GET moves node to head. PUT adds at head. Eviction removes from tail. All O(1).' },
        { q: 'How to handle TTL expiration efficiently?', a: 'Two strategies: 1) Passive (check expiry on GET, return null and delete if expired). 2) Active background sweeper scans keys and deletes expired ones. Redis uses both.' },
        { q: 'What happens if a cache node crashes?', a: 'If using replication: replica is promoted to primary automatically. Consistent hashing ensures only that node\'s key range needs to be reconstructed. Other nodes unaffected.' },
        { q: 'How to prevent cache from becoming stale?', a: 'TTL is the primary mechanism. For critical data, use write-through (update cache and DB together) or cache invalidation (delete cache key when DB is updated, next read re-populates).' }
      ]
    }
  ],

  interviewFramework: {
    name: 'RADIO Framework for System Design Interviews',
    steps: [
      {
        letter: 'R',
        name: 'Requirements',
        timeAllocation: '5 minutes',
        description: 'Clarify what you\'re actually building before touching architecture.',
        questions: [
          'Who are the users? (consumers, businesses, other services?)',
          'What are the CORE features? (Scope to 2-3 must-haves)',
          'What scale are we designing for? (100 users vs 100 million?)',
          'Is this read-heavy or write-heavy?',
          'What are the SLA requirements? (99.9% uptime? < 100ms latency?)',
          'Mobile or web or both?',
          'Any special constraints? (budget, compliance, geographic)'
        ],
        tip: 'Interviewers intentionally give vague requirements. Asking smart clarifying questions demonstrates seniority!'
      },
      {
        letter: 'A',
        name: 'Architecture',
        timeAllocation: '10 minutes',
        description: 'Draw the high-level system diagram with boxes and arrows.',
        questions: [
          'What are the main components? (Client, Load Balancer, App Servers, Cache, DB, CDN)',
          'How do they communicate? (REST, gRPC, message queue, WebSocket?)',
          'What data flows where? (Trace a request from client to DB and back)',
          'Where are the likely bottlenecks?'
        ],
        tip: 'Start simple (monolith if appropriate), then explain how to scale out. Draw as you talk. Use boxes and arrows.'
      },
      {
        letter: 'D',
        name: 'Data Model',
        timeAllocation: '8 minutes',
        description: 'Design the database schema and storage strategy.',
        questions: [
          'What entities/tables do we need?',
          'What are the access patterns? (Read by ID? Range query? Full text search?)',
          'SQL vs NoSQL? (ACID needs? Scale needs? Query complexity?)',
          'What needs indexing?',
          'How will we partition/shard the data?'
        ],
        tip: 'Write out your schema! Even simplified: "Users table: user_id, email, username, created_at"'
      },
      {
        letter: 'I',
        name: 'Interface (API Design)',
        timeAllocation: '5 minutes',
        description: 'Define the public API contracts.',
        questions: [
          'What endpoints / methods are needed?',
          'Request/response format?',
          'Authentication? (JWT, OAuth2, API keys?)',
          'Rate limiting?',
          'Error codes and handling?'
        ],
        tip: 'Keep it concise: "POST /tweets {content, media_urls} → {tweet_id, created_at}"'
      },
      {
        letter: 'O',
        name: 'Optimizations',
        timeAllocation: '10 minutes',
        description: 'Deep dive into bottlenecks and optimizations.',
        questions: [
          'Where will this system struggle under load?',
          'What should we cache and how?',
          'How do we scale the database? (Read replicas, sharding)',
          'How do we handle failures? (Circuit breakers, retry logic)',
          'How do we monitor? (metrics, alerts, logging)',
          'What are the failure modes and how do we recover?'
        ],
        tip: 'This is where great candidates shine. "The fan-out problem for celebrity users can be solved by..."'
      }
    ]
  }
};
