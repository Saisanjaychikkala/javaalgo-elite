// Interactive Flashcards & Quizzes for Java DSA Mastery
// Covers Java Core, Collections, DSA Patterns, System Design, AWS CLF-C02

export const quizQuestions = [
  {
    id: 1,
    category: "Java Imports & Syntax",
    question: "What is the recommended import to include all standard Java Collections in one line?",
    options: [
      "import java.collections.*;",
      "import java.util.*;",
      "import java.data.*;",
      "import java.lang.collections.*;"
    ],
    correctAnswerIndex: 1,
    explanation: "`import java.util.*;` imports `List`, `ArrayList`, `Map`, `HashMap`, `Set`, `Queue`, `Deque`, `PriorityQueue`, `Arrays`, and `Collections`."
  },
  {
    id: 2,
    category: "Java Collections",
    question: "Why should you prefer `Deque<Integer> stack = new ArrayDeque<>();` over `Stack<Integer>`?",
    options: [
      "`Stack` does not support LIFO push and pop.",
      "`Stack` is synchronized (inherits from Vector), introducing locking overhead.",
      "`ArrayDeque` automatically sorts elements.",
      "`Stack` cannot store `Integer` values."
    ],
    correctAnswerIndex: 1,
    explanation: "`java.util.Stack` extends `Vector` and synchronizes every single method, which causes thread locking overhead and is considered legacy."
  },
  {
    id: 3,
    category: "Interview Gotchas",
    question: "What is the output of `Integer a = 200, b = 200; System.out.println(a == b);`?",
    options: [
      "true",
      "false",
      "Compile error",
      "Throws NullPointerException"
    ],
    correctAnswerIndex: 1,
    explanation: "JVM only caches `Integer` instances between -128 and 127. Beyond 127, new objects are instantiated on the heap, so `==` compares references and evaluates to `false`. Always use `.equals()`!"
  },
  {
    id: 4,
    category: "Time Complexity",
    question: "What is the average time complexity of `map.getOrDefault(key, 0)` in a `HashMap`?",
    options: [
      "O(log N)",
      "O(N)",
      "O(1)",
      "O(N log N)"
    ],
    correctAnswerIndex: 2,
    explanation: "`HashMap` provides average O(1) time complexity for insertions, updates, and lookups via hash bucket distribution."
  },
  {
    id: 5,
    category: "Java Collections",
    question: "By default, what type of heap does `new PriorityQueue<Integer>()` implement in Java?",
    options: [
      "Max-Heap (largest item at head)",
      "Min-Heap (smallest item at head)",
      "Fibonacci Heap",
      "Randomized Heap"
    ],
    correctAnswerIndex: 1,
    explanation: "In Java, `PriorityQueue` is a Min-Heap by default. To make it a Max-Heap, pass `Collections.reverseOrder()` or `(a, b) -> Integer.compare(b, a)`."
  },
  {
    id: 6,
    category: "Sorting & Arrays",
    question: "How do you safely sort a 2D array `int[][] intervals` by its start time `intervals[i][0]` ascending?",
    options: [
      "Arrays.sort(intervals, (a, b) -> a[0] - b[0]);",
      "Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));",
      "intervals.sort();",
      "Collections.sort(intervals);"
    ],
    correctAnswerIndex: 1,
    explanation: "Using `(a, b) -> a[0] - b[0]` is dangerous because integer subtraction can overflow if values are close to `Integer.MIN_VALUE`. `Integer.compare(a[0], b[0])` is 100% overflow-safe."
  },
  {
    id: 7,
    category: "Strings & Primitives",
    question: "Why should you use `StringBuilder` instead of repeated `+` concatenation inside a loop?",
    options: [
      "String concatenation with `+` is immutable and creates a new object each time, leading to O(N^2) complexity.",
      "The `+` operator throws an exception on long strings.",
      "`StringBuilder` can only store numbers.",
      "`String` cannot be indexed."
    ],
    correctAnswerIndex: 0,
    explanation: "Because `String` is immutable, appending `N` characters with `+` creates `N` intermediate String objects and copies characters repeatedly, taking O(N^2) time. `StringBuilder` uses an internal resizing buffer in O(N) total time."
  },
  {
    id: 8,
    category: "Binary Search",
    question: "Why is `int mid = low + (high - low) / 2;` preferred over `(low + high) / 2`?",
    options: [
      "It executes in O(1) instead of O(log N).",
      "It prevents signed 32-bit integer overflow when `low + high > Integer.MAX_VALUE`.",
      "Java does not support addition inside parentheses.",
      "It rounds to the ceiling instead of floor."
    ],
    correctAnswerIndex: 1,
    explanation: "If `low` and `high` are both large positive integers (e.g. `2 * 10^9`), their sum exceeds `2,147,483,647` and rolls over to negative numbers. `low + (high - low) / 2` avoids overflow completely."
  },
  {
    id: 9,
    category: "Java Streams (Java 8+)",
    question: "What is the difference between `map()` and `flatMap()` in Java Streams?",
    options: [
      "`map()` transforms each element 1-to-1; `flatMap()` transforms each element into a Stream and then flattens all streams into one.",
      "`flatMap()` filters elements; `map()` collects them.",
      "`map()` works only on Strings; `flatMap()` works on any object.",
      "There is no difference — they are interchangeable."
    ],
    correctAnswerIndex: 0,
    explanation: "`map(f)` applies function `f` to each element and returns a `Stream<R>`. If `f` returns a `Stream`, you get `Stream<Stream<R>>`. `flatMap(f)` applies `f` then FLATTENS the result, giving `Stream<R>`. Use `flatMap` when each element maps to a list/stream of results (e.g., splitting sentences into words)."
  },
  {
    id: 10,
    category: "Java Streams (Java 8+)",
    question: "Which terminal operation DOES NOT process the full stream before returning?",
    options: [
      "`collect(Collectors.toList())`",
      "`findFirst()`",
      "`count()`",
      "`forEach()`"
    ],
    correctAnswerIndex: 1,
    explanation: "`findFirst()` is a short-circuit terminal operation. It stops processing as soon as the first element is found. `collect()`, `count()`, and `forEach()` must process EVERY element before they can return."
  },
  {
    id: 11,
    category: "Java OOP",
    question: "What is the output of: `System.out.println(10 + 20 + \"Java\" + 10 + 20);`?",
    options: [
      "1020Java1020",
      "30Java1020",
      "30Java30",
      "Compilation Error"
    ],
    correctAnswerIndex: 1,
    explanation: "Java evaluates left-to-right. `10 + 20` = `30` (int + int = int). Then `30 + \"Java\"` = `\"30Java\"` (int + String = String concatenation). Then `\"30Java\" + 10` = `\"30Java10\"` (String). Then `\"30Java10\" + 20` = `\"30Java1020\"`. Operator precedence gotcha!"
  },
  {
    id: 12,
    category: "Java Concurrency",
    question: "What does the `volatile` keyword guarantee in Java?",
    options: [
      "Mutual exclusion — only one thread can execute at a time.",
      "Visibility — writes to a volatile variable are immediately visible to ALL other threads without caching in CPU registers.",
      "Atomicity — compound operations like `i++` are executed without interruption.",
      "Both visibility and atomicity."
    ],
    correctAnswerIndex: 1,
    explanation: "`volatile` guarantees VISIBILITY only — changes are flushed to main memory and NOT cached in thread-local CPU registers. It does NOT guarantee atomicity! `i++` is still a 3-step read-increment-write operation that can race. Use `AtomicInteger` for atomic compound operations, or `synchronized` for both visibility + atomicity."
  },
  {
    id: 13,
    category: "Java Concurrency",
    question: "Which Java class provides thread-safe HashMap operations without synchronizing the entire map?",
    options: [
      "`Hashtable`",
      "`Collections.synchronizedMap(new HashMap<>())`",
      "`ConcurrentHashMap`",
      "`TreeMap`"
    ],
    correctAnswerIndex: 2,
    explanation: "`Hashtable` and `synchronizedMap` lock the ENTIRE map on every operation, which is a bottleneck. `ConcurrentHashMap` uses segment-level or bucket-level locking (CAS operations in Java 8+), allowing concurrent reads and fine-grained writes with dramatically higher throughput in multi-threaded code."
  },
  {
    id: 14,
    category: "Java OOP",
    question: "What is the Liskov Substitution Principle (LSP)?",
    options: [
      "A class should have only one reason to change.",
      "Objects of a subclass should be usable wherever objects of the parent class are expected, without breaking program correctness.",
      "Depend on abstractions, not concrete implementations.",
      "High-level modules should not depend on low-level modules."
    ],
    correctAnswerIndex: 1,
    explanation: "LSP (the 'L' in SOLID) states: if `Bird` can `fly()`, and `Penguin extends Bird` but can't fly, then `Penguin` VIOLATES LSP. Every subclass must honor ALL behaviors of the parent contract. Solution: create a `FlyingBird` subinterface — only birds that actually fly implement it."
  },
  {
    id: 15,
    category: "DSA Patterns",
    question: "You need to find the K-th largest element in an unsorted array in O(N log K) time with O(K) space. Which data structure is best?",
    options: [
      "Max-Heap of size N",
      "Min-Heap of size K",
      "Stack of size K",
      "Sort the array and index from the end"
    ],
    correctAnswerIndex: 1,
    explanation: "Maintain a **Min-Heap of size K** (smallest of the top-K at the top). For each element: if it's larger than the heap's min, poll the min and push the new element. After all N elements, the heap root is the K-th largest. O(N log K) time, O(K) space. Sorting takes O(N log N) — worse when K is small."
  },
  {
    id: 16,
    category: "DSA Patterns",
    question: "Which algorithmic pattern solves 'Find the longest subarray with sum ≤ K' optimally?",
    options: [
      "Divide and Conquer",
      "Dynamic Sliding Window (Variable-size window with two pointers)",
      "Binary Search on the answer",
      "Prefix Sum with HashMap"
    ],
    correctAnswerIndex: 1,
    explanation: "Dynamic Sliding Window: expand the right pointer to grow the window, and shrink from the left when the constraint (sum > K) is violated. This avoids re-examining elements and processes each element at most twice, achieving O(N) time. Prefix Sum + HashMap is best for 'exact sum equals K' problems."
  },
  {
    id: 17,
    category: "DSA Patterns",
    question: "What is the time complexity of DFS and BFS on a graph with V vertices and E edges?",
    options: [
      "O(V) for both",
      "O(E) for both",
      "O(V + E) for both — vertices and edges each visited once",
      "O(V * E) for both"
    ],
    correctAnswerIndex: 2,
    explanation: "Both DFS and BFS visit each vertex once (V operations) and traverse each edge once (E operations), giving O(V + E). For a dense graph where E ≈ V², this becomes O(V²). For a sparse graph where E ≈ V, it's O(V). Always state complexity in terms of both V and E."
  },
  {
    id: 18,
    category: "Time Complexity",
    question: "What is the time complexity of `HashMap.put()` in the WORST case?",
    options: [
      "O(1) always",
      "O(log N) due to tree balancing",
      "O(N) due to all keys hashing to the same bucket (worst case hash collision)",
      "O(N log N) due to re-hashing"
    ],
    correctAnswerIndex: 2,
    explanation: "Average case: O(1). Worst case: O(N) if a poor hash function causes all N keys to land in the same bucket (forming a linked list). Java 8+ mitigates this by converting long chains (≥8 nodes) into Red-Black Trees, making the *practical* worst case O(log N). But the theoretical worst case is O(N)."
  },
  {
    id: 19,
    category: "System Design",
    question: "A URL shortener needs to redirect 100K requests/second with < 10ms latency. What is the PRIMARY optimization?",
    options: [
      "Add more database read replicas",
      "Cache the URL mappings in Redis — most requests hit a tiny set of popular URLs",
      "Use a faster programming language",
      "Increase server CPU cores"
    ],
    correctAnswerIndex: 1,
    explanation: "80/20 rule: 20% of short URLs account for 80% of traffic. These popular URLs can be cached in Redis (1-5ms response vs 10-50ms DB query). With a Redis cache, 95%+ of requests never touch the database. This is a **Cache-Aside** pattern — the most impactful optimization in distributed systems."
  },
  {
    id: 20,
    category: "System Design",
    question: "What is the fundamental difference between Horizontal Scaling and Vertical Scaling?",
    options: [
      "Horizontal = more RAM on same machine. Vertical = add more machines.",
      "Horizontal = add more machines (scale out). Vertical = upgrade the single machine (scale up).",
      "They are the same thing with different naming conventions.",
      "Horizontal scaling applies only to databases; Vertical applies only to web servers."
    ],
    correctAnswerIndex: 1,
    explanation: "**Vertical Scaling** = make the existing server bigger (more CPU, RAM). Simple but has a hardware ceiling and is a single point of failure. **Horizontal Scaling** = add more servers and distribute load with a Load Balancer. Used by every major tech company. Requires stateless servers (sessions in Redis, not in-memory)."
  },
  {
    id: 21,
    category: "System Design",
    question: "Which consistency model does Amazon DynamoDB use by default for reads?",
    options: [
      "Strong Consistency — always reads the latest write",
      "Eventual Consistency — may read stale data but is faster and cheaper",
      "Linearizability — global ordering of operations",
      "Sequential Consistency — preserves program order"
    ],
    correctAnswerIndex: 1,
    explanation: "DynamoDB defaults to **Eventual Consistency** for reads, which means you might read data that is slightly stale (milliseconds old). This is cheaper and faster (50% less read capacity units). You can explicitly request **Strongly Consistent Reads** for operations that require the absolute latest data (costs 2x more read units)."
  },
  {
    id: 22,
    category: "AWS CLF-C02",
    question: "A company needs to protect their web application against SQL Injection attacks and block specific malicious IP ranges. Which AWS service should they use?",
    options: [
      "AWS Shield Standard",
      "Amazon GuardDuty",
      "AWS WAF (Web Application Firewall)",
      "VPC Security Groups"
    ],
    correctAnswerIndex: 2,
    explanation: "AWS WAF operates at Layer 7 (HTTP/HTTPS) and allows you to create rules that block SQL Injection, Cross-Site Scripting (XSS), malicious bot patterns, and specific IP ranges. Shield protects against volumetric DDoS. GuardDuty is threat detection via ML. Security Groups operate at Layer 4 (TCP/IP) — they can't inspect HTTP request content."
  },
  {
    id: 23,
    category: "AWS CLF-C02",
    question: "What is the key difference between Amazon S3 Multi-AZ (Standard) and S3 One Zone-IA?",
    options: [
      "S3 Standard is slower; S3 One Zone-IA is faster.",
      "S3 Standard replicates data across ≥3 Availability Zones (11 9s durability); S3 One Zone-IA stores in a single AZ (lower cost, but vulnerable to AZ failure).",
      "S3 One Zone-IA is suitable for frequently accessed data; S3 Standard for archival.",
      "S3 Standard requires a 1-year commitment; S3 One Zone-IA is pay-as-you-go."
    ],
    correctAnswerIndex: 1,
    explanation: "S3 Standard replicates objects across a minimum of 3 Availability Zones providing 11 9s (99.999999999%) durability. S3 One Zone-IA stores data in only ONE AZ — if that AZ suffers a physical disaster, you LOSE the data. It costs ~20% less but is only suitable for re-creatable or non-critical data."
  },
  {
    id: 24,
    category: "AWS CLF-C02",
    question: "Which AWS compute option is BEST for a nightly data processing job that takes 2 hours and can tolerate interruption?",
    options: [
      "On-Demand EC2 Instance",
      "Reserved Instance (3-year term)",
      "Spot Instance",
      "AWS Lambda"
    ],
    correctAnswerIndex: 2,
    explanation: "Spot Instances use AWS spare compute capacity at up to 90% discount. AWS can reclaim them with 2-minute notice. For batch jobs that are fault-tolerant and can checkpoint progress, Spot Instances are perfect. On-Demand costs full price. Reserved requires long commitment for predictable workloads. Lambda has a 15-minute max execution timeout — too short for 2-hour jobs."
  },
  {
    id: 25,
    category: "AWS CLF-C02",
    question: "Under the AWS Shared Responsibility Model, which task is ALWAYS the customer's responsibility — regardless of whether they use EC2, RDS, or Lambda?",
    options: [
      "Patching the underlying server operating system",
      "Securing the network hypervisor infrastructure",
      "Managing IAM policies, user access, and data encryption",
      "Disposing of decommissioned physical storage media"
    ],
    correctAnswerIndex: 2,
    explanation: "Customer data, IAM permissions, and encryption choices are ALWAYS the customer's responsibility — even on fully managed services. On EC2 (IaaS) you also manage the OS. On RDS, AWS patches the DB engine OS. On Lambda, AWS manages everything below the code. But IAM (who can access what) and data encryption are universally YOUR responsibility."
  },
  {
    id: 26,
    category: "Java Collections",
    question: "You need a `Map` that maintains entries in INSERTION ORDER and allows you to access entries from front or back in O(1). Which class should you use?",
    options: [
      "`HashMap` — O(1) access",
      "`LinkedHashMap` — maintains insertion order, O(1) access",
      "`TreeMap` — sorted by key, O(log N) access",
      "`ArrayDeque` — deque interface"
    ],
    correctAnswerIndex: 1,
    explanation: "`LinkedHashMap` is a `HashMap` with a doubly-linked list running through all entries maintaining insertion order (or access-order if configured). It's the backbone of an LRU Cache. The `eldest` entry can be evicted by overriding `removeEldestEntry()`. `TreeMap` is sorted by key value (O(log N)), not insertion order."
  },
  {
    id: 27,
    category: "Java Collections",
    question: "What happens when you call `iterator.remove()` directly on a collection while iterating with a for-each loop?",
    options: [
      "The element is removed safely.",
      "It throws `ConcurrentModificationException`.",
      "It silently ignores the removal.",
      "It removes the element and resets the iterator."
    ],
    correctAnswerIndex: 1,
    explanation: "Modifying a collection (add/remove) during a for-each loop triggers `ConcurrentModificationException`. The for-each loop uses an implicit `Iterator` that checks `modCount`. Any structural change outside the iterator's own `remove()` method increments `modCount` and causes the exception. Safe patterns: use `iterator.remove()`, `removeIf()`, or collect items to remove then remove after the loop."
  },
  {
    id: 28,
    category: "DSA Patterns",
    question: "Which pattern should you use to detect if a Linked List has a cycle?",
    options: [
      "Use a HashSet to track visited nodes — O(N) time, O(N) space",
      "Floyd's Cycle Detection — Slow and Fast pointer — O(N) time, O(1) space",
      "Reverse the linked list and check if the head changes — O(N) time, O(1) space",
      "Sort the linked list by value — O(N log N) time"
    ],
    correctAnswerIndex: 1,
    explanation: "**Floyd's Cycle Detection (Tortoise and Hare):** `slow` moves 1 step; `fast` moves 2 steps. If there's a cycle, `fast` laps `slow` inside the cycle and they meet. If `fast` reaches null, no cycle. HashSet solution works but uses O(N) extra space. Floyd's is the gold standard: O(N) time, O(1) space."
  },
  {
    id: 29,
    category: "Java OOP",
    question: "What is the difference between `Comparable<T>` and `Comparator<T>` in Java?",
    options: [
      "`Comparable` is for primitive types; `Comparator` is for objects.",
      "`Comparable` defines the NATURAL ordering inside the class (single, fixed order); `Comparator` is an external strategy that defines custom orderings (multiple orderings, doesn't modify the class).",
      "`Comparator` can only compare two objects of different types.",
      "Both are the same — `Comparator` is just the functional interface version of `Comparable`."
    ],
    correctAnswerIndex: 1,
    explanation: "`Comparable<T>` → implement `compareTo(T o)` INSIDE the class (natural ordering). A class can only have one natural order. `Comparator<T>` → external class/lambda that implements `compare(T a, T b)`. You can have multiple comparators for the same class (e.g., sort `Employee` by salary, by name, by ID). `TreeMap` and `PriorityQueue` accept a `Comparator` in their constructor."
  },
  {
    id: 30,
    category: "Java Streams (Java 8+)",
    question: "What does `Optional<T>` solve in Java?",
    options: [
      "It wraps primitive types to avoid boxing overhead.",
      "It represents a value that may or may not be present, forcing callers to explicitly handle the null case and avoiding NullPointerExceptions.",
      "It provides lazy evaluation of computations.",
      "It is a thread-safe container for shared mutable state."
    ],
    correctAnswerIndex: 1,
    explanation: "`Optional<T>` is a container object that either contains a non-null value (`Optional.of(value)`) or is empty (`Optional.empty()`). Instead of returning `null` (which causes silent NPEs), return `Optional`. Callers must explicitly handle the empty case via `orElse()`, `orElseThrow()`, `ifPresent()`, or `map()`. It's a design signal: 'this value might not exist, please check.'"
  }
];
