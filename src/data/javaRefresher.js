// Complete Java Refresher for DSA & Interviews

export const javaRefresherData = [
  {
    id: 'imports',
    title: 'Essential Imports & Packages',
    category: 'Basics & Setup',
    icon: 'code',
    summary: 'The essential imports you need in 99% of DSA coding interviews.',
    description: 'In engineering exams or IDEs, auto-import did the work. In technical interviews (CoderPad, HackerRank, Google Doc, whiteboard), you must know what package each structure lives in, or use the interview-approved wildcard import.',
    tips: [
      'In LeetCode and most online coding platforms, `java.util.*`, `java.io.*`, and `java.lang.*` are pre-imported automatically.',
      'If writing from scratch in CoderPad or a plain text editor, `import java.util.*;` gives you all Collections, Arrays, and Random in a single line.'
    ],
    code: `// THE GOLDEN ONE-LINER (Interviews & Competitive):
import java.util.*;

// SPECIFIC IMPORTS (If interviewer requests explicit imports):
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;

import java.util.Map;
import java.util.HashMap;
import java.util.TreeMap;
import java.util.LinkedHashMap;

import java.util.Set;
import java.util.HashSet;
import java.util.TreeSet;

import java.util.Queue;
import java.util.Deque;
import java.util.ArrayDeque;
import java.util.PriorityQueue;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

// For BigInteger, BigDecimal (rare, but useful for overflow questions):
import java.math.BigInteger;`
  },
  {
    id: 'lists',
    title: 'List & ArrayList Mastery',
    category: 'Collections Framework',
    icon: 'layers',
    summary: 'Creation, dynamic sizing, manipulation, sorting, and array conversions.',
    description: '`ArrayList` is backed by a dynamically resizing array. Always prefer `ArrayList` over `LinkedList` for DSA because CPU cache lines make `ArrayList` lookups and linear scans significantly faster.',
    tips: [
      'Always program to the interface: `List<Integer> list = new ArrayList<>();` NOT `ArrayList<Integer> list = ...`',
      '`list.remove(1)` removes index 1! To remove the integer value 1: `list.remove(Integer.valueOf(1));`'
    ],
    code: `// 1. Initialization
List<Integer> list = new ArrayList<>();
List<String> words = new ArrayList<>(100); // Pre-allocate initial capacity for performance

// Immutable quick lists (Java 9+):
List<Integer> fixedList = List.of(1, 2, 3); // Unmodifiable!

// Mutable list from array:
List<Integer> mutableList = new ArrayList<>(Arrays.asList(1, 2, 3, 4));

// 2. Fundamental Operations
list.add(10);                // O(1) amortized
list.add(0, 5);              // O(N) insert at index 0
int val = list.get(0);       // O(1)
list.set(0, 99);             // O(1) update index 0
list.remove(list.size() - 1);// O(1) remove last element
list.remove(0);              // O(N) remove first element
boolean exists = list.contains(99); // O(N)
int size = list.size();      // O(1)
boolean empty = list.isEmpty(); // O(1)

// 3. Sorting Lists
Collections.sort(list); // Ascending O(N log N)
Collections.sort(list, Collections.reverseOrder()); // Descending
list.sort((a, b) -> Integer.compare(b, a)); // Lambda descending

// 4. Convert List<Integer> to int[]
int[] arr = list.stream().mapToInt(i -> i).toArray(); // Modern Java
// Or simple interview-friendly loop (faster):
int[] primitiveArr = new int[list.size()];
for (int i = 0; i < list.size(); i++) {
    primitiveArr[i] = list.get(i);
}`
  },
  {
    id: 'maps',
    title: 'HashMap & TreeMap Superpowers',
    category: 'Collections Framework',
    icon: 'cpu',
    summary: 'O(1) lookups, getOrDefault, frequency counters, and O(log N) TreeMap.',
    description: 'HashMaps are the #1 most used data structure in FAANG interviews. Mastering helper methods like `getOrDefault` and `putIfAbsent` saves lines of code and eliminates null pointer bugs.',
    tips: [
      'Frequency counter in 1 line: `map.put(key, map.getOrDefault(key, 0) + 1);`',
      'Use `TreeMap` when you need sorted keys or predecessor/successor queries (`floorKey`, `ceilingKey`).'
    ],
    code: `// 1. Declaration
Map<String, Integer> map = new HashMap<>();

// 2. Essential Methods
map.put("apple", 3);
map.put("banana", 2);

int count = map.getOrDefault("orange", 0); // Returns 0 instead of null!
boolean hasKey = map.containsKey("apple");   // O(1)
boolean hasVal = map.containsValue(3);       // O(N) - Avoid in tight loops!

// 3. The Classic Frequency Counter Idiom
int[] nums = {1, 2, 2, 3, 3, 3};
Map<Integer, Integer> freq = new HashMap<>();
for (int num : nums) {
    freq.put(num, freq.getOrDefault(num, 0) + 1);
}

// 4. Iterating Map (Three idiomatic ways)
// Way A: Entries (Preferred for both key & value)
for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
    int key = entry.getKey();
    int value = entry.getValue();
}
// Way B: Keys only
for (int key : freq.keySet()) { ... }
// Way C: Values only
for (int val : freq.values()) { ... }

// 5. TreeMap (Red-Black Tree: O(log N) operations)
TreeMap<Integer, String> treeMap = new TreeMap<>();
treeMap.put(10, "ten");
treeMap.put(20, "twenty");
treeMap.put(5, "five");

int smallest = treeMap.firstKey();       // 5
int largest = treeMap.lastKey();         // 20
Integer floor = treeMap.floorKey(15);    // 10 (largest <= 15)
Integer ceiling = treeMap.ceilingKey(15);// 20 (smallest >= 15)`
  },
  {
    id: 'sets',
    title: 'HashSet & TreeSet Essentials',
    category: 'Collections Framework',
    icon: 'sparkles',
    summary: 'Unique element filtering, graph visited sets, and logarithmic ordered sets.',
    description: '`HashSet` provides average O(1) `add`, `remove`, and `contains`. `TreeSet` maintains natural or custom sorted order in O(log N).',
    tips: [
      'When doing graph BFS/DFS with string keys or coordinate hashes, use `Set<String> visited = new HashSet<>();` with `"r,c"`.',
      '`set.add(x)` returns a `boolean`! Returns `false` if `x` was already present. Great for duplicate detection in one pass.'
    ],
    code: `// 1. HashSet (O(1) average)
Set<Integer> visited = new HashSet<>();

boolean isNew = visited.add(10); // true
boolean duplicate = visited.add(10); // false! (Super useful for detecting duplicates)

visited.contains(10); // O(1)
visited.remove(10);   // O(1)
visited.size();

// 2. Quick initialization with elements
Set<Character> vowels = new HashSet<>(Arrays.asList('a', 'e', 'i', 'o', 'u'));

// 3. TreeSet (Balanced BST: O(log N))
TreeSet<Integer> tset = new TreeSet<>();
tset.add(10);
tset.add(30);
tset.add(20);

int first = tset.first();          // 10
int last = tset.last();            // 30
Integer floor = tset.floor(25);    // 20 (greatest element <= 25)
Integer ceiling = tset.ceiling(25);// 30 (least element >= 25)`
  },
  {
    id: 'queues-stacks',
    title: 'Queues & Modern Stacks (ArrayDeque)',
    category: 'Collections Framework',
    icon: 'layers',
    summary: 'Why you should NEVER use java.util.Stack, and how to use ArrayDeque for BFS & DFS.',
    description: 'In modern Java, `java.util.Stack` is officially considered legacy/obsolete because it inherits from `Vector` and synchronizes every single operation. For both Stacks (LIFO) and Queues (FIFO), the optimal class is `ArrayDeque`.',
    tips: [
      'Stack rule: `Deque<Integer> stack = new ArrayDeque<>();` and use `push()`, `pop()`, `peek()`.',
      'Queue rule: `Queue<Integer> q = new ArrayDeque<>();` and use `offer()`, `poll()`, `peek()`.'
    ],
    code: `// ==========================================
// 1. MODERN STACK (LIFO - Last In, First Out)
// ==========================================
Deque<Integer> stack = new ArrayDeque<>();

stack.push(10);       // Push to top (O(1))
stack.push(20);
int top = stack.peek();// Inspect top (20) without removing (O(1))
int popped = stack.pop(); // Remove and return top (20) (O(1))
boolean hasItems = !stack.isEmpty();

// ==========================================
// 2. BREADTH-FIRST QUEUE (FIFO - First In, First Out)
// ==========================================
Queue<Integer> q = new ArrayDeque<>(); // Or new LinkedList<>()

q.offer(10);          // Add to back (O(1))
q.offer(20);
int front = q.peek();  // Inspect front (10) (O(1))
int served = q.poll(); // Remove and return front (10) (O(1))
int size = q.size();

// Why offer/poll instead of add/remove?
// offer/poll return false/null on failure instead of throwing exceptions!`
  },
  {
    id: 'priority-queues',
    title: 'PriorityQueue: Min-Heap & Max-Heap',
    category: 'Advanced Collections',
    icon: 'cpu',
    summary: 'Top-K problems, Dijkstra, custom Comparators, and overflow-proof sorting.',
    description: 'In Java, `PriorityQueue` is a Min-Heap by default (smallest item at root). Knowing how to write lambda comparators for Max-Heaps and custom objects is tested in 80% of Google and Meta interviews.',
    tips: [
      'NEVER do `(a, b) -> a - b` for comparators! If `a = -2147483648` and `b = 1`, subtraction causes integer underflow. Always use `Integer.compare(a, b)`.',
      'To build a Max-Heap: `new PriorityQueue<>(Collections.reverseOrder())` or `(a, b) -> Integer.compare(b, a)`.'
    ],
    code: `// 1. Default Min-Heap (Smallest value popped first)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(1);
minHeap.offer(10);
int minVal = minHeap.poll(); // Returns 1!

// 2. Max-Heap (Largest value popped first)
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
// Or with lambda:
PriorityQueue<Integer> maxHeapLambda = new PriorityQueue<>((a, b) -> Integer.compare(b, a));

// 3. Custom Class / Pair Heap (e.g. Dijkstra or Coordinate pairs)
// Heap of int[]: int[] = {node, distance}. Min-heap by distance:
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));

// Tie-breaker: sort by dist asc, then node id asc:
PriorityQueue<int[]> pqWithTieBreak = new PriorityQueue<>((a, b) -> {
    if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
    return Integer.compare(a[0], b[0]);
});

// 4. Frequency Heap (Top K Frequent Elements)
Map<Integer, Integer> countMap = new HashMap<>();
// Min-heap of size K keeping most frequent items:
PriorityQueue<Integer> kHeap = new PriorityQueue<>(
    (n1, n2) -> Integer.compare(countMap.get(n1), countMap.get(n2))
);`
  },
  {
    id: 'strings-chars',
    title: 'Strings, Chars & StringBuilder',
    category: 'Core Java',
    icon: 'code',
    summary: 'Immutability traps, StringBuilder efficiency, palindrome checks, and char methods.',
    description: 'Java `String` objects are immutable. Concatenating strings in a loop with `+` runs in O(N^2) time because a new String is created on every turn. Always use `StringBuilder` for O(1) amortized appends.',
    tips: [
      'Fast character conversion: `s.charAt(i) - \'0\'` gives the `int` digit value; `s.charAt(i) - \'a\'` gives 0-25 alphabet index.',
      'Check alphanumeric: `Character.isLetterOrDigit(c)`, lowercase: `Character.toLowerCase(c)`.'
    ],
    code: `// 1. String Fundamentals
String s = "Hello, World!";
int len = s.length();                 // Note the ()
char c = s.charAt(0);                 // 'H'
String sub = s.substring(0, 5);       // "Hello" [start, end)
char[] charArr = s.toCharArray();     // Convert to mutable array
String backToStr = new String(charArr);

// 2. Fast Frequency Array for Alphabet (lowercase a-z)
int[] charCounts = new int[26];
for (char ch : s.toCharArray()) {
    if (Character.isLetter(ch)) {
        charCounts[Character.toLowerCase(ch) - 'a']++;
    }
}

// 3. StringBuilder (Mutable, High Performance)
StringBuilder sb = new StringBuilder();
sb.append("abc");
sb.append(123);
sb.setCharAt(0, 'z');            // O(1) replace character
sb.deleteCharAt(sb.length() - 1);// O(1) backtrack / pop last char
sb.reverse();                    // In-place reverse
String result = sb.toString();

// 4. Splitting & Joining
String csv = "cat,dog,bird";
String[] parts = csv.split(","); // ["cat", "dog", "bird"]
String joined = String.join("-", parts); // "cat-dog-bird"`
  },
  {
    id: 'arrays-sorting',
    title: 'Arrays & Custom Sorting (1D & 2D)',
    category: 'Core Java',
    icon: 'sparkles',
    summary: 'Sorting 2D interval arrays, Arrays utility methods, binarySearch, and fills.',
    description: 'Handling intervals (e.g. `[[1,3],[2,6],[8,10]]`) is a top staple of Meta and Amazon interviews. Knowing how to sort a 2D array by start time or end time in one clean line is mandatory.',
    tips: [
      '`Arrays.sort(arr)` uses Dual-Pivot Quicksort (O(N log N)) for primitive arrays, and TimSort for Object arrays.',
      'When binary searching with `Arrays.binarySearch`, a negative return value `-(insertion_point + 1)` indicates the element was not found.'
    ],
    code: `// 1. Primitive 1D Array Sorting
int[] nums = {5, 2, 8, 1, 9};
Arrays.sort(nums); // Ascending O(N log N)

// Fill array with default value:
int[] dp = new int[100];
Arrays.fill(dp, -1);

// Copy array:
int[] clone = Arrays.copyOf(nums, nums.length);
int[] subArray = Arrays.copyOfRange(nums, 1, 4); // [from, to)

// 2. Sorting 2D Arrays (Crucial for Intervals / Geometry!)
int[][] intervals = {{1, 4}, {2, 3}, {1, 2}, {5, 8}};

// Sort by start time ascending:
Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

// Sort by start time ascending; if tied, sort by end time descending:
Arrays.sort(intervals, (a, b) -> {
    if (a[0] != b[0]) {
        return Integer.compare(a[0], b[0]);
    }
    return Integer.compare(b[1], a[1]); // Descending for ties
});

// 3. Binary Search
int index = Arrays.binarySearch(nums, 8); // Returns index if found
if (index < 0) {
    int insertPoint = -(index + 1); // Where it belongs!
}`
  },
  {
    id: 'bitwise-cheatsheet',
    title: 'Bitwise Manipulation Cheatsheet',
    category: 'Advanced Tricks',
    icon: 'cpu',
    summary: 'Bitwise operations, single number tricks, bit counting, and masking.',
    description: 'Bit manipulation questions test precision and computer architecture basics. Java provides great built-ins in the `Integer` class.',
    tips: [
      'In Java, `>>` is arithmetic right shift (preserves sign bit), while `>>>` is logical unsigned right shift (fills with 0).',
      '`x & (x - 1)` drops the lowest set bit. Repeat until `x == 0` to count set bits!'
    ],
    code: `// 1. The Core Bitwise Operators
int and = a & b;  // Both bits 1
int or  = a | b;  // Either bit 1
int xor = a ^ b;  // Different bits (1 ^ 1 = 0, 0 ^ 0 = 0, 1 ^ 0 = 1)
int not = ~a;     // Invert all bits
int shl = a << 1; // Multiply by 2
int shr = a >> 1; // Divide by 2 (keeps sign)
int usr = a >>> 1;// Unsigned right shift (fills 0)

// 2. Interview Golden Tricks:
// A. Clear lowest set bit:
int cleared = x & (x - 1); 

// B. Extract lowest set bit:
int lowestBit = x & (-x);

// C. Check if power of 2:
boolean isPowerOfTwo = (x > 0) && ((x & (x - 1)) == 0);

// D. Single Number trick (find element appearing once where others appear twice):
int unique = 0;
for (int num : nums) unique ^= num;

// 3. Java Built-in Power Functions
int setBits = Integer.bitCount(n); // O(1) hardware popcount!
String binaryStr = Integer.toBinaryString(n); // "1011"
int highestOneBit = Integer.highestOneBit(n); // Largest power of 2 <= n`
  },
  {
    id: 'why-deque-stack',
    title: 'Why Deque & ArrayDeque Instead of Stack? (The Vector Legacy)',
    category: 'Architecture & "Why?"',
    icon: 'layers',
    summary: 'The technical reason java.util.Stack is obsolete and ArrayDeque is the gold standard for LIFO.',
    description: 'In technical interviews, writing `Stack<Integer> s = new Stack<>();` tells the interviewer you learned Java in 1998. Oracle and senior engineers unanimously recommend `Deque<Integer> s = new ArrayDeque<>();`. Here is the exact architectural reason why.',
    tips: [
      'Stack extends Vector: Every method in Vector is `synchronized`. Even in single-threaded interview code, you are acquiring and releasing monitor locks on every push/pop, causing a 3x CPU performance penalty.',
      'Breaks LIFO Invariant: Because Stack extends Vector, `stack.get(0)` or `stack.add(2, 99)` compiles and runs! A true stack must NEVER allow random index access.',
      'ArrayDeque vs LinkedList: ArrayDeque is backed by a circular array (cache-friendly, continuous memory, no node allocation). LinkedList allocates a 24-byte Node object per element, causing GC pauses.'
    ],
    code: `// ❌ THE OBSOLETE WAY (Avoid in interviews):
// Stack<Integer> stack = new Stack<>(); // Extends Vector, synchronized, slow, exposes get(index)!

// ✅ THE MODERN GOLD STANDARD:
Deque<Integer> stack = new ArrayDeque<>();

// LIFO (Last-In, First-Out) operations:
stack.push(10);          // O(1) amortized
stack.push(20);
stack.push(30);

int top = stack.peek();  // 30 (inspect without removing)
int popped = stack.pop();// 30 (removes top)
boolean empty = stack.isEmpty(); // true if empty

// WHY ArrayDeque OVER LinkedList FOR STACK/QUEUE?
// 1. Memory: ArrayDeque uses a contiguous int[]/Object[] buffer.
//    LinkedList allocates a new Node(prev, next, item) for EVERY element (24-32 bytes overhead).
// 2. Cache Locality: Modern CPUs prefetch contiguous arrays into L1/L2 cache.
//    LinkedList nodes are scattered across the heap, causing constant CPU cache misses.`
  },
  {
    id: 'programming-to-interfaces',
    title: 'Why `List<T> = new ArrayList<>()`? (Polymorphism & LSP)',
    category: 'Architecture & "Why?"',
    icon: 'sparkles',
    summary: 'Why we declare variables using the Interface type rather than the concrete implementation class.',
    description: 'Why do we write `List<Integer> list = new ArrayList<>();` instead of `ArrayList<Integer> list = new ArrayList<>();`? This embodies the foundational Object-Oriented principle: "Program to an interface, not an implementation."',
    tips: [
      'Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering program correctness.',
      'Loose Coupling: The consuming code only cares about the methods defined in `List` (add, get, size, remove), not how `ArrayList` resizes internally.',
      'Swapability: If profiling shows `LinkedList` is better for lots of arbitrary insertions, you only change the right side without rewriting 50 downstream methods.'
    ],
    code: `// ❌ Tightly Coupled (Anti-pattern):
// ArrayList<String> names = new ArrayList<>();
// public void process(ArrayList<String> list) { ... } // Cannot accept LinkedList or List.of()!

// ✅ Program to the Interface (Clean Architecture):
List<String> names = new ArrayList<>();

// Methods accept the Interface, making them infinitely flexible:
public void process(List<String> items) {
    for (String item : items) {
        System.out.println(item);
    }
}
// Now this method works with:
process(new ArrayList<>());
process(new LinkedList<>());
process(List.of("A", "B", "C")); // Immutable list
process(Arrays.asList("X", "Y"));

// Same rule applies across all Collections:
Map<String, Integer> map = new HashMap<>();   // NOT HashMap<String, Integer>
Set<Integer> set = new HashSet<>();          // NOT HashSet<Integer>
Queue<Integer> queue = new ArrayDeque<>();    // NOT ArrayDeque<Integer>
Deque<Integer> stack = new ArrayDeque<>();    // NOT ArrayDeque<Integer>`
  },
  {
    id: 'collections-internals',
    title: 'HashMap vs TreeMap vs LinkedHashMap Internals & Trade-offs',
    category: 'Architecture & "Why?"',
    icon: 'cpu',
    summary: 'Buckets, Treeification threshold (8), Red-Black trees, and building an O(1) LRU Cache.',
    description: 'A deep look under the hood of Java’s primary Map implementations. This is the exact knowledge FAANG system design and coding interviewers test to distinguish senior engineers from juniors.',
    tips: [
      'HashMap Bucket Treeification: In Java 8+, when a single bucket exceeds 8 elements (TREEIFY_THRESHOLD) and the array capacity is >= 64, the linked list converts to a Red-Black Balanced Tree (TreeNode), reducing collision lookup from O(N) to O(log N).',
      'LinkedHashMap LRU Cache: Pass `accessOrder = true` to `new LinkedHashMap<>(16, 0.75f, true)` and override `removeEldestEntry()` for an instant production LRU Cache in 5 lines of code!'
    ],
    code: `// 1. HashMap: O(1) average lookup, unsorted
// Internal structure: Node<K,V>[] table;
// Index calculation: index = (n - 1) & (hash ^ (hash >>> 16))
Map<String, Integer> hashMap = new HashMap<>();

// 2. TreeMap: O(log N) lookup, keys strictly sorted
// Internal structure: Red-Black Balanced Binary Search Tree
TreeMap<Integer, String> treeMap = new TreeMap<>();
treeMap.put(10, "Ten");
treeMap.put(30, "Thirty");
treeMap.put(20, "Twenty");

int first = treeMap.firstKey();       // 10
int last = treeMap.lastKey();         // 30
Integer floor = treeMap.floorKey(25); // 20 (greatest key <= 25)
Integer ceil = treeMap.ceilingKey(25);// 30 (smallest key >= 25)

// 3. LinkedHashMap: O(1) lookup + preserves iteration order
// Maintains a doubly-linked list running through all of its entries.
// By default: Insertion-order.
// With accessOrder = true: Access-order (Least Recently Used at head)!

// ⚡ FAANG SHORTCUT: Instant O(1) LRU Cache using LinkedHashMap:
class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true); // true = access order!
        this.capacity = capacity;
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity; // Automatically evicts oldest accessed!
    }
}`
  },
  {
    id: 'comparable-vs-comparator',
    title: 'Comparable vs Comparator: Natural vs Dynamic Strategy Ordering',
    category: 'Architecture & "Why?"',
    icon: 'sparkles',
    summary: 'The difference between internal natural order and external custom sorting lambdas.',
    description: 'When should a class implement `Comparable<T>` vs using a `Comparator<T>`? Learn how to combine multiple sorting keys and avoid the famous integer subtraction overflow bug.',
    tips: [
      'Comparable defines the SINGLE default natural order for an object (e.g. Integer natural order is 1, 2, 3). Implemented inside the class via `compareTo(T o)`.',
      'Comparator defines EXTERNAL sorting strategies. You can define 100 different comparators for the same class without modifying the class itself.',
      'Always use `Comparator.comparingInt(...)` or `Integer.compare(a, b)` instead of `a - b` to prevent 32-bit integer underflow.'
    ],
    code: `// 1. Comparable: Natural Ordering (Inside the class)
class Student implements Comparable<Student> {
    String name;
    int rollNumber;

    public Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }

    @Override
    public int compareTo(Student other) {
        // Natural order: ascending by rollNumber
        return Integer.compare(this.rollNumber, other.rollNumber);
    }
}

// 2. Comparator: Dynamic External Strategies (Lambdas / Modern Java)
List<Student> students = new ArrayList<>();

// Strategy A: Sort by name alphabetically:
students.sort((s1, s2) -> s1.name.compareTo(s2.name));

// Strategy B: Modern fluent Comparator (by name length, then name alphabetically):
students.sort(
    Comparator.comparingInt((Student s) -> s.name.length())
              .thenComparing(s -> s.name)
);

// Strategy C: PriorityQueue with 2D array coordinates (Min-heap by distance):
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));`
  },
  {
    id: 'modern-java-syntax',
    title: 'Modern Java Cheat Sheet: Streams, Records & Lambdas',
    category: 'Modern Java',
    icon: 'code',
    summary: 'High-productivity features from Java 8 through Java 21 for interviews and clean code.',
    description: 'Modern Java is expressive and concise. Using Java Records for coordinate pairs or Streams for grouping shows you write up-to-date, production-grade code.',
    tips: [
      'Java Records (Java 16+): One-line immutable data carrier! Automatically generates constructor, equals(), hashCode(), and toString(). Perfect for BFS states or Dijkstra nodes.',
      'Streams for Frequency Map: `nums.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))`.',
      'List.of() & Set.of(): Immutable, zero-allocation collections for quick test inputs.'
    ],
    code: `// 1. Java Records (Zero Boilerplate State Objects):
// Replaces 50 lines of getters, equals(), hashCode(), and constructors!
record State(int row, int col, int dist) {}

// Use immediately in Queue or PriorityQueue:
Queue<State> queue = new ArrayDeque<>();
queue.offer(new State(0, 0, 0));
State curr = queue.poll();
System.out.println(curr.row() + ", " + curr.col()); // Auto-generated getters!

// 2. Streams Cheat Sheet:
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);

// Filter & Map to new list:
List<Integer> evensSquared = nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList()); // [4, 16, 36]

// Sum of array:
int sum = nums.stream().mapToInt(Integer::intValue).sum();

// Find max or default:
int max = nums.stream().mapToInt(v -> v).max().orElse(-1);

// Group by frequency:
List<String> words = List.of("apple", "banana", "apple", "cherry");
Map<String, Long> wordCounts = words.stream()
    .collect(Collectors.groupingBy(w -> w, Collectors.counting()));

// 3. Modern Switch Expression (Java 14+):
String typeOfDay = switch (day) {
    case "MONDAY", "FRIDAY" -> "Busy";
    case "SATURDAY", "SUNDAY" -> "Weekend";
    default -> "Regular";
};`
  },
  {
    id: 'interview-traps',
    title: 'Top 10 Java Interview Gotchas (The Bug Hall of Fame)',
    category: 'Critical Nuances',
    icon: 'sparkles',
    summary: 'The 10 silent bugs that trip candidates up in FAANG coding interviews.',
    description: 'These are the exact Java language traps that cause code to fail edge-case test suites even when the core algorithmic logic is correct.',
    tips: [
      'Never compare object wrappers (`Integer`, `Long`, `String`) with `==`. Always use `.equals()`.',
      'Always calculate mid in binary search using `low + (high - low) / 2` to prevent 32-bit signed integer overflow.',
      'Never remove items in an enhanced `for` loop; use `iterator.remove()` or `list.removeIf()` to prevent ConcurrentModificationException.'
    ],
    code: `// GOTCHA 1: Integer Object Cache Trap (-128 to 127)
Integer a = 127, b = 127;
System.out.println(a == b); // TRUE (Cached by JVM)
Integer c = 128, d = 128;
System.out.println(c == d); // FALSE! (Different heap objects)
System.out.println(c.equals(d)); // TRUE (Always use .equals()!)

// GOTCHA 2: list.remove(int index) vs list.remove(Object o)
List<Integer> list = new ArrayList<>(List.of(10, 20, 30));
list.remove(1); // REMOVES INDEX 1 (value 20), NOT the number 1!
// FIX to remove the value 10:
list.remove(Integer.valueOf(10));

// GOTCHA 3: Arrays.asList with Primitive Arrays
int[] primArr = {1, 2, 3};
List<int[]> wrapped = Arrays.asList(primArr); // Size is 1! It boxed the entire array as 1 element!
// FIX:
List<Integer> proper = Arrays.stream(primArr).boxed().collect(Collectors.toList());

// GOTCHA 4: Negative Modulo in Java
int mod = -7 % 3; // Returns -1, NOT 2!
// FIX for circular arrays or hash table indexing:
int positiveMod = (val % m + m) % m;

// GOTCHA 5: Binary Search Midpoint Overflow
int badMid = (low + high) / 2; // Overflows if low + high > 2,147,483,647!
int safeMid = low + (high - low) / 2; // SAFE

// GOTCHA 6: Comparator Subtraction Underflow
// Bad: (a, b) -> a - b (Overlows if a = Integer.MIN_VALUE, b = 1)
// FIX: Always use:
Comparator<Integer> safe = (a, b) -> Integer.compare(a, b);

// GOTCHA 7: ConcurrentModificationException in For-Each
List<String> items = new ArrayList<>(List.of("a", "b", "c"));
// for (String s : items) { if (s.equals("b")) items.remove(s); } // CRASH!
// FIX: Use removeIf:
items.removeIf(s -> s.equals("b"));

// GOTCHA 8: String Literal Pool vs 'new String()'
String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");
// s1 == s2 is TRUE (interned string pool)
// s1 == s3 is FALSE (s3 is a new heap allocation!)
// FIX: Always use s1.equals(s3)

// GOTCHA 9: Generic Arrays are Illegal in Java
// List<Integer>[] arr = new ArrayList<Integer>[10]; // COMPILE ERROR (Type erasure)
// FIX: Use List of Lists:
List<List<Integer>> adjList = new ArrayList<>();
for (int i = 0; i < 10; i++) adjList.add(new ArrayList<>());

// GOTCHA 10: Mutating an Object Used as a HashMap Key
// If you modify an object's fields after putting it into a HashMap, its hashCode changes.
// The next map.get(key) will search the wrong bucket and return NULL!
// RULE: HashMap keys should ALWAYS be immutable (e.g. String, Integer, Record).`
  }
];

