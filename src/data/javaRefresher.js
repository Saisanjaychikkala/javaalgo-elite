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
    id: 'interview-traps',
    title: '6 Java Interview Gotchas & Traps',
    category: 'Critical Nuances',
    icon: 'sparkles',
    summary: 'The 6 silent bugs that fail test cases in technical rounds.',
    description: 'These are the subtle Java language traps that cost candidates offers even when their algorithm is correct.',
    tips: [
      'Never compare object wrappers (`Integer`, `Long`, `String`) with `==`. Always use `.equals()`.',
      'Always calculate mid in binary search using `low + (high - low) / 2` to prevent 32-bit signed integer overflow.'
    ],
    code: `// TRAP 1: Integer Object Cache Trap (-128 to 127)
Integer a = 127, b = 127;
System.out.println(a == b); // TRUE (cached in JVM)
Integer c = 128, d = 128;
System.out.println(c == d); // FALSE! (Different heap objects)
// FIX: ALWAYS use .equals():
System.out.println(c.equals(d)); // TRUE!

// TRAP 2: Arrays.asList with Primitives
int[] arr = {1, 2, 3};
// List<int[]> badList = Arrays.asList(arr); // Has size 1 containing the array itself!
// FIX: Use Boxed stream or standard loop for primitives:
List<Integer> goodList = Arrays.stream(arr).boxed().collect(Collectors.toList());

// TRAP 3: Negative Modulo in Java
int mod = -7 % 3; // Returns -1, NOT 2!
// FIX: To get standard mathematical positive modulo:
int positiveMod = (val % m + m) % m;

// TRAP 4: Binary Search Midpoint Overflow
int badMid = (low + high) / 2; // Overflows if low + high > 2,147,483,647
// FIX:
int safeMid = low + (high - low) / 2;
// Or bitwise:
int safeMid2 = (low + high) >>> 1;

// TRAP 5: Comparator Subtraction Overflow
// Bad: (a, b) -> a - b (Fails when a = Integer.MIN_VALUE, b = 10)
// FIX: Always use Integer.compare(a, b);

// TRAP 6: Pass-by-Value with Object References in Recursion
// Modifying a primitive in recursion doesn't persist:
// void dfs(int count) { count++; } // Caller's count does NOT change!
// FIX: Pass an array of size 1 or return the value:
// void dfs(int[] count) { count[0]++; }`
  }
];
