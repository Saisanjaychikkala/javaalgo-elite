// Data Structure Foundations - Complete Teaching Content

export const dsFoundations = [
  {
    id: 'arrays',
    title: 'Arrays',
    emoji: '📦',
    tagline: 'The simplest, fastest, and most important data structure you will ever use.',
    difficulty: 'Beginner',
    category: 'Linear',
    color: '#38bdf8',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Even IS an Array?',
        content: `Imagine you go to a parking lot. Every parking spot has a **number** (0, 1, 2, 3...) painted on it. They are arranged in a **straight line**, one after another. You can drive straight to spot #5 without checking spots 0-4. That's an array.

In a computer's memory, an array is a **block of contiguous (back-to-back) memory slots**, each holding one value, each slot identified by its **index** starting at 0.

When you write \`int[] nums = {10, 20, 30, 40, 50};\` in Java, the computer finds 5 empty memory slots sitting next to each other and puts your numbers in them.

**Key insight:** Because all slots are the same size and next to each other, the computer can calculate exactly where element #4 is using simple math: \`start_address + (4 × size_of_int)\`. No searching needed!`
      },
      {
        type: 'memory-model',
        title: '🧠 How Arrays Look in Memory',
        items: [
          { label: 'Index', values: ['0', '1', '2', '3', '4'] },
          { label: 'Value', values: ['10', '20', '30', '40', '50'] },
          { label: 'Address', values: ['1000', '1004', '1008', '1012', '1016'] }
        ],
        note: 'Each `int` takes 4 bytes, so addresses jump by 4. Finding index 3 = 1000 + (3 × 4) = 1012. Instant O(1) access!'
      },
      {
        type: 'operations',
        title: '⚡ Operations & Their Time Complexity',
        operations: [
          { op: 'Access by index (arr[i])', time: 'O(1)', space: 'O(1)', why: 'Direct address calculation. The FASTEST possible operation.' },
          { op: 'Search (find value X)', time: 'O(N)', space: 'O(1)', why: 'Worst case: check every element before finding X at the last slot.' },
          { op: 'Insert at END', time: 'O(1) amortized*', space: 'O(1)', why: 'ArrayList doubles its size when full. Amortized O(1) per insert.' },
          { op: 'Insert at MIDDLE / START', time: 'O(N)', space: 'O(1)', why: 'All elements to the right must SHIFT one slot. Imagine moving 1000 parking cars.' },
          { op: 'Delete at END', time: 'O(1)', space: 'O(1)', why: 'Just decrement the size counter. No shifting needed.' },
          { op: 'Delete at MIDDLE / START', time: 'O(N)', space: 'O(1)', why: 'All elements to the right must shift LEFT to fill the gap.' }
        ]
      },
      {
        type: 'when-to-use',
        title: '✅ When Should You Use an Array?',
        use: [
          'You need to ACCESS elements by position (index lookup) frequently.',
          'Your data is of FIXED size or you primarily add/remove from the END.',
          'You need MAXIMUM SPEED and cache performance (arrays are cache-friendly because values are contiguous in memory).',
          'You need to SORT data and use binary search.'
        ],
        avoid: [
          'You need frequent insertions at the MIDDLE or BEGINNING.',
          'You need dynamic size changes that aren\'t at the end.',
          'You need fast lookup by VALUE (not index) — use HashMap instead.'
        ]
      },
      {
        type: 'java-code',
        title: '☕ Java Implementation',
        code: `// === PRIMITIVE ARRAYS (Fastest, no objects) ===
int[] fixedArray = new int[5];        // [0, 0, 0, 0, 0] - zero initialized
int[] initializedArray = {10, 20, 30}; // Literal syntax

// Access is O(1):
int val = initializedArray[1]; // val = 20

// === DYNAMIC ARRAY (ArrayList) ===
import java.util.*;

List<Integer> list = new ArrayList<>(); // Starts empty

list.add(10);          // O(1) amortized - adds to END
list.add(20);
list.add(30);
list.add(1, 99);       // O(N) - insert at index 1, shifts others right
list.remove(0);        // O(N) - removes index 0, shifts left
list.remove(Integer.valueOf(99)); // Remove by VALUE (not index!)
int element = list.get(2);    // O(1) - index access
int size = list.size();       // O(1)

// Sorting:
Collections.sort(list);       // Ascending
list.sort((a, b) -> b - a);   // Descending with lambda

// Convert between array and list:
int[] arr = {1, 2, 3};
List<Integer> fromArr = new ArrayList<>(Arrays.asList(1, 2, 3)); // Mutable!
int[] backToArr = list.stream().mapToInt(i -> i).toArray();

// Useful Array utilities:
Arrays.fill(arr, -1);         // Fill with -1
Arrays.sort(arr);             // Sort in place O(N log N)
int[] copy = Arrays.copyOf(arr, arr.length);`
      },
      {
        type: 'gotchas',
        title: '⚠️ Common Mistakes & Traps',
        items: [
          { title: 'ArrayIndexOutOfBoundsException', desc: 'Accessing arr[arr.length] throws an exception. Valid indices: 0 to arr.length - 1.' },
          { title: 'list.remove(1) vs list.remove(Integer.valueOf(1))', desc: 'list.remove(1) removes at INDEX 1. list.remove(Integer.valueOf(1)) removes the VALUE 1. This is a notorious interview bug.' },
          { title: 'Arrays.asList() returns FIXED-SIZE list', desc: 'Arrays.asList(1,2,3) returns a list that does NOT support add() or remove(). Wrap in new ArrayList<>() to make it mutable.' },
          { title: 'int[] cannot be used with generics', desc: 'Arrays.asList(new int[]{1,2,3}) gives List<int[]> (a list with ONE element - the array). Use Integer[] or stream instead.' }
        ]
      },
      {
        type: 'interview-patterns',
        title: '🎯 Interview Patterns That Use Arrays',
        patterns: [
          'Two Pointers on sorted array (3Sum, Container With Most Water)',
          'Sliding Window (Longest Substring, Max Subarray Sum)',
          'Prefix/Suffix sums (Subarray Sum Equals K)',
          'In-place modification (Move Zeroes, Remove Duplicates)',
          'Binary Search on sorted array (Search in Rotated Sorted Array)',
          'Kadane\'s Algorithm (Maximum Subarray - O(N) DP)'
        ]
      }
    ]
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    emoji: '🔗',
    tagline: 'A chain of nodes where each one points to the next. Great for dynamic insertion — but watch out for cache misses!',
    difficulty: 'Beginner',
    category: 'Linear',
    color: '#a855f7',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Even IS a Linked List?',
        content: `Imagine a **treasure hunt** where each clue tells you where to find the NEXT clue. You start at clue #1, it says "go to the library", the library has clue #2 which says "go to the park", etc. You CANNOT skip to clue #5 without following the chain from the start. That's a linked list.

Each "clue location" is a **Node**. Every Node contains two things:
1. **Data** — the actual value (the clue itself)
2. **Next Pointer** — the address of the next node (where to go next)

Unlike arrays where elements sit next to each other in memory, linked list nodes can be **scattered anywhere in memory**. The pointer chain is the ONLY thing connecting them.

**Singly Linked List:** Each node points to the NEXT node only. You can only travel FORWARD.
**Doubly Linked List:** Each node has TWO pointers: one to next, one to previous. You can travel BOTH directions.`
      },
      {
        type: 'operations',
        title: '⚡ Operations & Their Time Complexity',
        operations: [
          { op: 'Access by index (get node #5)', time: 'O(N)', space: 'O(1)', why: 'Must traverse from HEAD, following pointers. No direct jump like arrays.' },
          { op: 'Insert at HEAD', time: 'O(1)', space: 'O(1)', why: 'Just create a new node and point it to current head. Update head reference.' },
          { op: 'Insert at TAIL', time: 'O(1) with tail pointer', space: 'O(1)', why: 'If you maintain a tail pointer, just update tail.next and move tail.' },
          { op: 'Insert in MIDDLE', time: 'O(N) to find + O(1) to insert', space: 'O(1)', why: 'Finding the position requires traversal. The actual pointer-swap is O(1).' },
          { op: 'Delete at HEAD', time: 'O(1)', space: 'O(1)', why: 'Move head to head.next. Old head gets garbage collected.' },
          { op: 'Delete by VALUE', time: 'O(N)', space: 'O(1)', why: 'Must scan the list to find the target node.' },
          { op: 'Search', time: 'O(N)', space: 'O(1)', why: 'No index-based math. Must walk the entire chain.' }
        ]
      },
      {
        type: 'concept',
        title: '🧠 The Real Truth: Why Arrays Usually Beat Linked Lists',
        content: `This seems counterintuitive — linked lists have O(1) insert/delete while arrays are O(N). So why do developers prefer arrays 90% of the time?

**The answer is CPU cache.**

Modern CPUs load memory in 64-byte "cache lines". When you access \`arr[0]\`, the CPU also loads \`arr[1]\` through \`arr[15]\` into its ultra-fast L1 cache. The NEXT 15 accesses are essentially FREE.

With a linked list, each node.next points to a RANDOM location in memory. Every pointer chase is a "cache miss" — the CPU must fetch from RAM, which is ~100x slower than cache.

**Rule of thumb:**
- **Need fast index access + sequential scan?** → ArrayList wins
- **Need O(1) insert/delete at known position + DON'T need random access?** → LinkedList wins (e.g., implementing LRU Cache with a doubly linked list + HashMap)

In Java: \`LinkedList<Integer>\` implements both List and Deque. But \`ArrayDeque\` (array-backed) is faster for most Stack/Queue use cases!`
      },
      {
        type: 'java-code',
        title: '☕ Building LinkedList from Scratch (What Interviewers Want)',
        code: `// === NODE DEFINITION (Know this by heart) ===
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

// === CORE OPERATIONS ===

// Insert at HEAD: O(1)
ListNode insertAtHead(ListNode head, int val) {
    ListNode newNode = new ListNode(val);
    newNode.next = head;  // New node points to old head
    return newNode;        // New node IS the new head
}

// Insert at TAIL: O(N) if no tail pointer
ListNode insertAtTail(ListNode head, int val) {
    ListNode newNode = new ListNode(val);
    if (head == null) return newNode;
    
    ListNode curr = head;
    while (curr.next != null) curr = curr.next; // Walk to end
    curr.next = newNode;
    return head;
}

// Delete node with given value: O(N)
ListNode deleteNode(ListNode head, int target) {
    if (head == null) return null;
    if (head.val == target) return head.next; // Delete head
    
    ListNode curr = head;
    while (curr.next != null) {
        if (curr.next.val == target) {
            curr.next = curr.next.next; // Skip over deleted node
            return head;
        }
        curr = curr.next;
    }
    return head; // Not found
}

// Reverse a linked list (CLASSIC interview problem)
ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    
    while (curr != null) {
        ListNode nextTemp = curr.next; // Save next
        curr.next = prev;              // Reverse the arrow!
        prev = curr;                   // Move prev forward
        curr = nextTemp;               // Move curr forward
    }
    
    return prev; // prev is now the new head
}`
      },
      {
        type: 'gotchas',
        title: '⚠️ Common Mistakes & Traps',
        items: [
          { title: 'NullPointerException when traversing', desc: 'Always check `curr != null` AND `curr.next != null` before accessing `curr.next.val`. The most common linked list bug.' },
          { title: 'Losing track of head', desc: 'Never move your `head` reference while traversing. Create a separate `curr = head` variable to walk with.' },
          { title: 'Not handling empty list (null head)', desc: 'All linked list functions must handle `head == null` as the first check.' },
          { title: 'Off-by-one in "find N-th from end"', desc: 'Use the two-pointer technique: advance first pointer N steps, then move both until first hits null.' }
        ]
      },
      {
        type: 'interview-patterns',
        title: '🎯 Interview Patterns That Use Linked Lists',
        patterns: [
          'Fast & Slow Pointers: Detect cycle (Floyd\'s algorithm), find middle node',
          'Reverse the list (in-place with prev/curr/next pointers)',
          'Merge two sorted lists (like merge sort merge step)',
          'Find N-th node from end (two pointers, N apart)',
          'Palindrome check (find mid, reverse second half, compare)',
          'LRU Cache (Doubly Linked List + HashMap = O(1) get and put)'
        ]
      }
    ]
  },
  {
    id: 'stack',
    title: 'Stack',
    emoji: '📚',
    tagline: 'Last In, First Out (LIFO). Think of a stack of plates — you always take from the top.',
    difficulty: 'Beginner',
    category: 'Linear',
    color: '#34d399',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Even IS a Stack?',
        content: `Think of a **stack of pancakes**. When you make pancakes, you put the newest one ON TOP. When you eat, you take from the TOP first. The pancake at the BOTTOM was made first but eaten LAST.

That's the LIFO (Last In, First Out) principle.

**Real-world examples:**
- 🔙 **Browser Back Button**: Each page you visit is "pushed" onto a history stack. Clicking Back "pops" the most recent page.
- ↩️ **Ctrl + Z (Undo)**: Every action is pushed onto an undo stack. Pressing Undo pops the last action.
- 📞 **Function Call Stack**: When main() calls foo(), which calls bar(), the calls stack up. bar() must return BEFORE foo() can finish.
- 🔤 **Balanced Parentheses**: Checking if \`({[]})\` is valid uses a stack (push open brackets, pop when seeing close).

**Only 3 operations matter:**
1. **push(x)** — Add x to the top
2. **pop()** — Remove and return the top element  
3. **peek()** — Look at the top WITHOUT removing it`
      },
      {
        type: 'operations',
        title: '⚡ Operations (ALL O(1)!)',
        operations: [
          { op: 'push(x)', time: 'O(1)', space: 'O(1)', why: 'Add to top. No shifting. Just update the top pointer.' },
          { op: 'pop()', time: 'O(1)', space: 'O(1)', why: 'Remove top. No searching. Just move top pointer down.' },
          { op: 'peek()', time: 'O(1)', space: 'O(1)', why: 'Just look at top value. No modification.' },
          { op: 'isEmpty()', time: 'O(1)', space: 'O(1)', why: 'Check if top pointer is null or size is 0.' }
        ]
      },
      {
        type: 'java-code',
        title: '☕ Java Implementation',
        code: `// === MODERN JAVA WAY (DO THIS IN INTERVIEWS) ===
// Use ArrayDeque, NOT the legacy java.util.Stack class!
// Stack<Integer> is synchronized via Vector = slow!

Deque<Integer> stack = new ArrayDeque<>();

// Push (add to top)
stack.push(10);
stack.push(20);
stack.push(30); // Stack: [10, 20, 30] -- 30 is on top

// Peek (look at top without removing)
int top = stack.peek(); // top = 30. Stack still: [10, 20, 30]

// Pop (remove and return top)
int popped = stack.pop(); // popped = 30. Stack: [10, 20]

// Check empty
boolean empty = stack.isEmpty(); // false

// Stack size
int size = stack.size(); // 2

// === CLASSIC INTERVIEW PROBLEM: Balanced Parentheses ===
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);  // Push open brackets
        } else {
            if (stack.isEmpty()) return false; // Nothing to match!
            char top = stack.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    
    return stack.isEmpty(); // Must have matched ALL open brackets
}`
      },
      {
        type: 'interview-patterns',
        title: '🎯 Interview Patterns That Use Stacks',
        patterns: [
          'Balanced Parentheses / Valid Brackets',
          'Monotonic Stack (Next Greater Element, Daily Temperatures)',
          'Evaluate Reverse Polish Notation',
          'Implement Min Stack (O(1) getMin with auxiliary stack)',
          'DFS Iterative Implementation',
          'Largest Rectangle in Histogram'
        ]
      }
    ]
  },
  {
    id: 'queue',
    title: 'Queue',
    emoji: '🚶',
    tagline: 'First In, First Out (FIFO). Think of a line at a bank — whoever arrives first gets served first.',
    difficulty: 'Beginner',
    category: 'Linear',
    color: '#fbbf24',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Even IS a Queue?',
        content: `Imagine you\'re in a **queue at a movie ticket counter**. People join at the BACK of the line and leave from the FRONT when served. Whoever arrived FIRST gets served FIRST. That's FIFO: First In, First Out.

**Real-world examples:**
- 🖨️ **Print Queue**: Documents print in the order they were submitted. First submitted = first printed.
- 📱 **WhatsApp Messages**: Messages are delivered in the order they were sent.
- 🚦 **CPU Task Scheduling**: Operating systems put tasks in a queue and execute them in order.
- 🌊 **BFS (Breadth-First Search)**: The most important use in DSA! Visit all neighbors at distance 1, then distance 2, then distance 3... Queue ensures level-by-level order.

**Variants you MUST know:**
- **Simple Queue**: Basic FIFO (add at back, remove from front)
- **Deque (Double-ended Queue)**: Can add/remove from BOTH ends. Use \`ArrayDeque\` in Java.
- **Priority Queue**: Elements leave in PRIORITY ORDER (smallest first = Min-Heap). The most interview-relevant variant!`
      },
      {
        type: 'operations',
        title: '⚡ Operations (ALL O(1) for simple Queue)',
        operations: [
          { op: 'offer(x) / enqueue', time: 'O(1)', space: 'O(1)', why: 'Add to back of queue. Use offer() not add() — returns false instead of throwing.' },
          { op: 'poll() / dequeue', time: 'O(1)', space: 'O(1)', why: 'Remove and return front element. Returns null if empty (use poll not remove).' },
          { op: 'peek()', time: 'O(1)', space: 'O(1)', why: 'Look at front element without removing it.' },
          { op: 'offer (PriorityQueue)', time: 'O(log N)', space: 'O(1)', why: 'Must heapify up to maintain heap property.' },
          { op: 'poll (PriorityQueue)', time: 'O(log N)', space: 'O(1)', why: 'Must heapify down after removing root.' }
        ]
      },
      {
        type: 'java-code',
        title: '☕ Java Implementation',
        code: `// === SIMPLE QUEUE ===
Queue<Integer> queue = new ArrayDeque<>(); // ArrayDeque is faster than LinkedList

queue.offer(10); // Add to BACK
queue.offer(20);
queue.offer(30); // Queue: front [10, 20, 30] back

int front = queue.peek();  // 10 -- peek front without removing
int served = queue.poll(); // 10 -- removes and returns front
// Queue is now: [20, 30]

// === DEQUE (Double-ended) ===
Deque<Integer> deque = new ArrayDeque<>();
deque.offerFirst(5);  // Add to FRONT
deque.offerLast(10);  // Add to BACK
int fromFront = deque.pollFirst(); // Remove from FRONT
int fromBack = deque.pollLast();   // Remove from BACK

// === PRIORITY QUEUE (Min-Heap by default) ===
PriorityQueue<Integer> minPQ = new PriorityQueue<>();
minPQ.offer(30);
minPQ.offer(10);
minPQ.offer(20);
int smallest = minPQ.poll(); // Always returns SMALLEST = 10

// Max-Heap:
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
maxPQ.offer(30);
int largest = maxPQ.poll(); // 30

// === BFS TEMPLATE (Most important Queue use case!) ===
public void bfs(TreeNode root) {
    if (root == null) return;
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size(); // FREEZE current level count!
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            System.out.print(node.val + " "); // Process node
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        // After inner loop: all nodes at THIS level are processed
    }
}`
      },
      {
        type: 'interview-patterns',
        title: '🎯 Interview Patterns That Use Queues',
        patterns: [
          'BFS on Trees (Level Order Traversal, Zigzag, Right Side View)',
          'BFS on Graphs (Shortest Path in Unweighted Graph, Rotting Oranges)',
          'Multisource BFS (start BFS from multiple nodes simultaneously)',
          'Top K Elements with PriorityQueue (Top K Frequent, Kth Largest)',
          'Sliding Window Maximum with Deque (O(N))',
          'Find Median from Data Stream (Two PriorityQueues)'
        ]
      }
    ]
  },
  {
    id: 'hashmap',
    title: 'HashMap',
    emoji: '🗺️',
    tagline: 'The most powerful interview tool. O(1) lookup by key. Used in 60% of optimal solutions.',
    difficulty: 'Beginner',
    category: 'Hash-Based',
    color: '#f97316',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Even IS a HashMap?',
        content: `Imagine a **library with a magical index card system**. Instead of searching shelf by shelf (O(N)), you hand the librarian a book title. She runs it through a secret formula that INSTANTLY tells her exactly which shelf and position the book is at. That formula is called a **hash function**.

A HashMap stores **key-value pairs**. You give it a KEY and it gives you the VALUE — in O(1) time on average.

**How does hashing actually work?**
1. You call \`map.put("apple", 5)\`
2. Java runs \`"apple".hashCode()\` → produces some number like \`92599723\`
3. That number is mapped to a **bucket index**: \`92599723 % 16 = 11\` (16 default buckets)
4. The pair ("apple", 5) is stored in bucket 11

When you call \`map.get("apple")\`:
1. Hash "apple" → same number → same bucket 11
2. Look in bucket 11 → found! → return 5

**What about collisions?** (Two different keys mapping to same bucket)
Java's HashMap uses "chaining" — each bucket holds a linked list. If "orange" also hashes to bucket 11, it goes into the same bucket and Java searches the small list within.
When load factor > 0.75, the map DOUBLES its buckets and rehashes everything.`
      },
      {
        type: 'operations',
        title: '⚡ Operations',
        operations: [
          { op: 'put(key, value)', time: 'O(1) avg', space: 'O(1)', why: 'Hash the key, go to bucket, insert. O(N) worst case if all keys collide (rare).' },
          { op: 'get(key)', time: 'O(1) avg', space: 'O(1)', why: 'Hash the key, go to bucket, return value.' },
          { op: 'containsKey(key)', time: 'O(1) avg', space: 'O(1)', why: 'Same as get but returns boolean.' },
          { op: 'remove(key)', time: 'O(1) avg', space: 'O(1)', why: 'Hash key, find bucket, remove entry.' },
          { op: 'Iterate all entries', time: 'O(N)', space: 'O(1)', why: 'Must visit every bucket and every entry.' },
          { op: 'TreeMap get/put', time: 'O(log N)', space: 'O(1)', why: 'Red-Black tree. Slower than HashMap but SORTED by key.' }
        ]
      },
      {
        type: 'concept',
        title: '🧠 The 5 HashMap Idioms Every Interviewee Needs',
        content: `**1. Frequency Counter (used everywhere)**
\`\`\`java
map.put(key, map.getOrDefault(key, 0) + 1);
\`\`\`
Count occurrences of each character, number, word. Foundation of Anagram, Top K, and Sliding Window problems.

**2. Check-and-Add Pattern**
\`\`\`java
map.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
\`\`\`
Group items by key. Foundation of Group Anagrams, Bucket Sort.

**3. Two-Pass Lookup (e.g., Two Sum)**
Build map in first pass, query in second pass. Turns O(N²) brute force into O(N).

**4. Sliding Window with Character Counts**
Use a HashMap or int[128] array to track characters in current window. Expand right, contract left when window becomes invalid.

**5. Memoization in Dynamic Programming**
\`\`\`java
Map<String, Integer> memo = new HashMap<>();
// Cache expensive subproblem results by encoding state as a String key
\`\`\``
      },
      {
        type: 'java-code',
        title: '☕ Java Implementation',
        code: `Map<String, Integer> map = new HashMap<>();

// === CORE OPERATIONS ===
map.put("apple", 5);
map.put("banana", 3);
int count = map.get("apple");          // 5
int defVal = map.getOrDefault("kiwi", 0); // 0 (not null!)
boolean exists = map.containsKey("apple"); // true
map.remove("banana");

// === ITERATION (Three ways) ===
// 1. Key-value pairs (most common):
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    String k = entry.getKey();
    int v = entry.getValue();
}
// 2. Keys only:
for (String key : map.keySet()) { ... }
// 3. Values only:
for (int val : map.values()) { ... }

// === FREQUENCY COUNTER (Classic idiom) ===
String s = "aabbbcc";
Map<Character, Integer> freq = new HashMap<>();
for (char c : s.toCharArray()) {
    freq.put(c, freq.getOrDefault(c, 0) + 1);
}
// freq = {a:2, b:3, c:2}

// === GROUP BY KEY (computeIfAbsent) ===
List<String> words = List.of("eat", "tea", "tan", "ate", "nat", "bat");
Map<String, List<String>> groups = new HashMap<>();
for (String word : words) {
    char[] chars = word.toCharArray();
    Arrays.sort(chars);
    String key = new String(chars); // "aet" for both "eat" and "tea"
    groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
}
// Result: {aet=[eat, tea, ate], ant=[tan, nat], abt=[bat]}

// === TREEMAP (sorted keys) ===
TreeMap<Integer, String> treeMap = new TreeMap<>();
treeMap.put(5, "five");
treeMap.put(1, "one");
treeMap.firstKey();          // 1 (smallest key)
treeMap.lastKey();           // 5 (largest key)
treeMap.floorKey(3);         // 1 (largest key <= 3)
treeMap.ceilingKey(3);       // 5 (smallest key >= 3)`
      },
      {
        type: 'interview-patterns',
        title: '🎯 Interview Patterns That Use HashMaps',
        patterns: [
          'Two Sum / Four Sum (O(N) with complement lookup)',
          'Frequency Counter (Top K Frequent, Group Anagrams, Valid Anagram)',
          'Sliding Window with Character Counts (Minimum Window Substring)',
          'Prefix Sum with HashMap (Subarray Sum Equals K)',
          'Graph Adjacency List (adjacency mapping)',
          'Memoization for DP (Top-Down Recursion caching)'
        ]
      }
    ]
  },
  {
    id: 'binary-tree',
    title: 'Binary Tree',
    emoji: '🌳',
    tagline: 'The most tested data structure in FAANG interviews. Recursive thinking is the key.',
    difficulty: 'Intermediate',
    category: 'Tree',
    color: '#34d399',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Even IS a Binary Tree?',
        content: `Think of a **company org chart**. At the top is the CEO (the root). The CEO has two direct reports (left and right children). Each of them has two more reports. And so on. Everyone has at most ONE boss (parent) and at most TWO direct reports (children).

**Key terminology you MUST know:**
- **Root**: The topmost node (no parent). The entry point.
- **Leaf**: A node with NO children. The bottom of the tree.
- **Height**: The longest path from root to any leaf. An empty tree has height -1. A single node has height 0.
- **Depth**: How far a node is from the root. Root has depth 0.
- **Balanced Tree**: For every node, the difference in height between left and right subtrees is ≤ 1.

**Why do trees exist?** Because they enable O(log N) operations! A balanced binary tree with 1 million nodes has height ≈ 20. Searching takes at most 20 steps instead of 1,000,000.

**3 traversal orders (MUST know all 3):**
- **Pre-order** (Root → Left → Right): Good for COPYING a tree, prefix expression evaluation
- **In-order** (Left → Root → Right): On BST, gives elements in SORTED order!
- **Post-order** (Left → Right → Root): Good for DELETING a tree, postfix evaluation
- **Level-order** (BFS level by level): Good for finding depth, right-side view`
      },
      {
        type: 'operations',
        title: '⚡ Operations',
        operations: [
          { op: 'Pre/In/Post-order traversal', time: 'O(N)', space: 'O(H) recursion stack', why: 'Visit every node once. H = height (O(log N) balanced, O(N) skewed).' },
          { op: 'Level-order (BFS)', time: 'O(N)', space: 'O(W)', why: 'W = max width of tree. Can be O(N) for the last level.' },
          { op: 'Find height/depth', time: 'O(N)', space: 'O(H)', why: 'Must visit all nodes to find deepest leaf.' },
          { op: 'Check if balanced', time: 'O(N)', space: 'O(H)', why: 'Post-order: compute height of subtrees and compare difference.' }
        ]
      },
      {
        type: 'java-code',
        title: '☕ Java Implementation',
        code: `// === NODE DEFINITION ===
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

// === 3 DFS TRAVERSALS ===
void preOrder(TreeNode root) {   // ROOT → Left → Right
    if (root == null) return;
    System.out.print(root.val + " ");
    preOrder(root.left);
    preOrder(root.right);
}

void inOrder(TreeNode root) {    // Left → ROOT → Right
    if (root == null) return;
    inOrder(root.left);
    System.out.print(root.val + " "); // On BST: prints SORTED!
    inOrder(root.right);
}

void postOrder(TreeNode root) {  // Left → Right → ROOT
    if (root == null) return;
    postOrder(root.left);
    postOrder(root.right);
    System.out.print(root.val + " ");
}

// === LEVEL ORDER (BFS) ===
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}

// === COMPUTE HEIGHT ===
int height(TreeNode root) {
    if (root == null) return -1; // Base case: empty tree
    int leftH = height(root.left);
    int rightH = height(root.right);
    return 1 + Math.max(leftH, rightH); // Post-order processing!
}

// === LOWEST COMMON ANCESTOR (Classic Hard Problem) ===
TreeNode lca(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lca(root.left, p, q);
    TreeNode right = lca(root.right, p, q);
    return (left != null && right != null) ? root : (left != null ? left : right);
}`
      },
      {
        type: 'interview-patterns',
        title: '🎯 Interview Patterns That Use Trees',
        patterns: [
          'Path Sum problems (root-to-leaf sums, max path sum)',
          'Lowest Common Ancestor (post-order DFS)',
          'Serialize and Deserialize Binary Tree',
          'Count complete tree nodes efficiently',
          'Maximum Depth / Diameter of Binary Tree',
          'Check if Symmetric, Same, or Subtree of another tree'
        ]
      }
    ]
  },
  {
    id: 'bst',
    title: 'Binary Search Tree',
    emoji: '🔍',
    tagline: 'A Binary Tree with a superpower: left < root < right. Enables O(log N) search, insert, and delete.',
    difficulty: 'Intermediate',
    category: 'Tree',
    color: '#818cf8',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Makes a BST Special?',
        content: `A Binary Search Tree is a Binary Tree with one critical rule: **For EVERY node, all values in the LEFT subtree are SMALLER, and all values in the RIGHT subtree are LARGER.**

This one rule makes BSTs incredibly powerful. Searching for a value is like a "hot or cold" game:
- Is the target EQUAL to current node? Found! Return it.
- Is the target SMALLER? The answer can ONLY be in the left subtree. Ignore the entire right side.
- Is the target LARGER? The answer can ONLY be in the right subtree. Ignore the entire left side.

Each step ELIMINATES half the remaining nodes (in a balanced tree). That's why search is O(log N).

**⚠️ Critical Warning: BSTs can degenerate!**
If you insert already-sorted data [1, 2, 3, 4, 5] into a BST:
- 1 becomes root
- 2 goes to 1's right
- 3 goes to 2's right
- ...it becomes a straight line (linked list shape)
- Height becomes O(N), search becomes O(N). BST's advantage is GONE!

**Self-balancing BSTs** (AVL Tree, Red-Black Tree) automatically restructure on insert/delete to maintain O(log N) height. Java's \`TreeMap\` and \`TreeSet\` use Red-Black Trees internally.`
      },
      {
        type: 'operations',
        title: '⚡ Operations (BALANCED BST)',
        operations: [
          { op: 'Search', time: 'O(log N)', space: 'O(log N)', why: 'Binary decision at each node: go left or right. Height = log N for balanced tree.' },
          { op: 'Insert', time: 'O(log N)', space: 'O(log N)', why: 'Find correct position by searching, then insert at leaf.' },
          { op: 'Delete', time: 'O(log N)', space: 'O(log N)', why: 'Three cases: leaf (simple), one child, two children (replace with in-order successor).' },
          { op: 'In-order traversal', time: 'O(N)', space: 'O(log N)', why: 'Produces SORTED sequence! This is the "killer app" of BSTs.' },
          { op: 'Find Min/Max', time: 'O(log N)', space: 'O(1)', why: 'Min = leftmost node. Max = rightmost node.' }
        ]
      },
      {
        type: 'java-code',
        title: '☕ Java Implementation',
        code: `// Using Java's built-in balanced BST (TreeMap/TreeSet)
// These are Red-Black trees internally — O(log N) guaranteed!

// === TREESET (BST of unique values) ===
TreeSet<Integer> bst = new TreeSet<>();
bst.add(5);
bst.add(3);
bst.add(7);
bst.add(1);

int min = bst.first();         // 1 (leftmost = minimum)
int max = bst.last();          // 7 (rightmost = maximum)
int floor = bst.floor(4);      // 3 (largest element <= 4)
int ceiling = bst.ceiling(4);  // 5 (smallest element >= 4)

// In-order traversal = sorted iteration!
for (int val : bst) {
    System.out.print(val + " "); // 1 3 5 7
}

// === BUILD BST FROM SCRATCH (Interview) ===
class BST {
    TreeNode root;
    
    void insert(int val) {
        root = insertRec(root, val);
    }
    
    TreeNode insertRec(TreeNode node, int val) {
        if (node == null) return new TreeNode(val); // Found empty spot
        if (val < node.val) node.left = insertRec(node.left, val);
        else if (val > node.val) node.right = insertRec(node.right, val);
        // val == node.val: duplicate, ignore (or update)
        return node;
    }
    
    boolean search(int val) {
        return searchRec(root, val);
    }
    
    boolean searchRec(TreeNode node, int val) {
        if (node == null) return false;   // Not found
        if (val == node.val) return true; // Found!
        if (val < node.val) return searchRec(node.left, val);
        return searchRec(node.right, val);
    }
}

// === VALIDATE BST (Classic Interview Problem) ===
public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false; // Violation!
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
}`
      }
    ]
  },
  {
    id: 'heap',
    title: 'Heap (Priority Queue)',
    emoji: '⛰️',
    tagline: 'A nearly-complete binary tree that always keeps the smallest (or largest) element at the top.',
    difficulty: 'Intermediate',
    category: 'Tree',
    color: '#f43f5e',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Even IS a Heap?',
        content: `Imagine a **hospital emergency room**. Patients don't get served in the order they arrive (that would be a Queue). Instead, the patient in the most CRITICAL condition gets seen FIRST, regardless of arrival time. That's a Priority Queue — and the Heap is the data structure that makes it work in O(log N).

A **Min-Heap** is a complete binary tree where every parent is SMALLER than its children. The MINIMUM value is always at the root. Think of it as "the most urgent patient is always at the front."

A **Max-Heap** is the opposite: every parent is LARGER than its children. Maximum value at root.

**The Heap Property:**
- Root = smallest element (Min-Heap)
- For every node N: N.value ≤ N.left.value AND N.value ≤ N.right.value
- This property applies at EVERY level, not just the root!

**The magic trick: Heaps are stored in arrays!**
For a node at index \`i\`:
- Left child: index \`2i + 1\`
- Right child: index \`2i + 2\`  
- Parent: index \`(i - 1) / 2\`

No need for actual tree node objects. The entire heap is just a flat array with mathematical relationships.`
      },
      {
        type: 'operations',
        title: '⚡ Operations',
        operations: [
          { op: 'peek() / getMin()', time: 'O(1)', space: 'O(1)', why: 'Minimum is always at index 0 (root). Direct access.' },
          { op: 'offer(x) / insert', time: 'O(log N)', space: 'O(1)', why: 'Add to end, then "bubble up" (heapify-up) to fix heap property.' },
          { op: 'poll() / extractMin()', time: 'O(log N)', space: 'O(1)', why: 'Remove root, put last element at root, "bubble down" (heapify-down).' },
          { op: 'Build heap from array', time: 'O(N)', space: 'O(1)', why: 'Start from last non-leaf, heapify-down each. Surprisingly O(N) not O(N log N).' }
        ]
      },
      {
        type: 'java-code',
        title: '☕ Java Implementation',
        code: `// === MIN-HEAP (Default in Java) ===
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(1);
minHeap.offer(3);
int min = minHeap.peek();  // 1 (always minimum at top!)
int removed = minHeap.poll(); // 1, then heap adjusts: peek() now returns 3

// === MAX-HEAP ===
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
// OR: new PriorityQueue<>((a, b) -> Integer.compare(b, a));
maxHeap.offer(5);
maxHeap.offer(1);
maxHeap.offer(3);
int max = maxHeap.poll(); // 5

// === CUSTOM OBJECT HEAP (Very common in interviews) ===
// Dijkstra: Min-Heap of [node, distance] pairs sorted by distance
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
pq.offer(new int[]{0, 0}); // [node=0, distance=0]
pq.offer(new int[]{1, 5}); // [node=1, distance=5]
int[] curr = pq.poll();    // {0, 0} -- closest node first

// === TOP K ELEMENTS (Classic interview pattern) ===
// Find K largest elements from N numbers using Min-Heap of size K
public int[] findKLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // Size-K min-heap
    
    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll(); // Remove smallest — keeps only K largest!
        }
    }
    
    return minHeap.stream().mapToInt(i -> i).toArray();
}

// === TWO HEAPS: MEDIAN FINDER ===
PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder()); // Max-heap
PriorityQueue<Integer> large = new PriorityQueue<>();                           // Min-heap
// Invariant: small has lower half, large has upper half
// Median = small.peek() or avg(small.peek(), large.peek())`
      },
      {
        type: 'interview-patterns',
        title: '🎯 Interview Patterns That Use Heaps',
        patterns: [
          'Top K Frequent Elements (Min-Heap of size K)',
          'K Closest Points to Origin',
          'Merge K Sorted Lists (Min-Heap of ListNodes)',
          'Find Median from Data Stream (Two Heaps)',
          'Dijkstra\'s Shortest Path (Min-Heap by distance)',
          'Task Scheduler / CPU Scheduling (Max-Heap by frequency)',
          'Sliding Window Maximum (Monotonic Deque — not heap, but related)'
        ]
      }
    ]
  },
  {
    id: 'graph',
    title: 'Graphs',
    emoji: '🕸️',
    tagline: 'The most general data structure. Everything is a graph: roads, social networks, dependencies, states.',
    difficulty: 'Advanced',
    category: 'Graph',
    color: '#38bdf8',
    sections: [
      {
        type: 'concept',
        title: '🤔 What Even IS a Graph?',
        content: `Everything around you is a graph. **Road networks** (cities are nodes, roads are edges). **Social networks** (people are nodes, friendships are edges). **Web pages** (pages are nodes, hyperlinks are edges). **Course prerequisites** (courses are nodes, "A requires B" is a directed edge).

A graph has just two things:
- **Vertices (Nodes)**: The entities (cities, people, courses, etc.)
- **Edges**: The connections between entities

**Types of Graphs (you MUST distinguish these):**
- **Directed vs Undirected**: Can you travel in both directions? Twitter = directed (you follow someone, they don't follow back). Facebook = undirected (friendship is mutual).
- **Weighted vs Unweighted**: Do edges have costs? Road networks = weighted (miles between cities). Friend networks = unweighted.
- **Cyclic vs Acyclic**: Can you return to a node by following edges? Course prerequisite graphs CANNOT have cycles (you can't need A to take B, and B to take A).
- **Connected vs Disconnected**: Can you reach every node from every other node? If an island has no roads to the mainland, the graph is disconnected.

**3 Ways to Represent Graphs in Java:**
1. **Adjacency List** (most common, O(V+E) space, interview standard)
2. **Adjacency Matrix** (O(V²) space, good when checking edge existence in O(1))
3. **Edge List** (just a list of [u, v] pairs, used in Kruskal's MST)`
      },
      {
        type: 'concept',
        title: '🧠 BFS vs DFS — When to Use Which',
        content: `**BFS (Breadth-First Search) — Use when:**
- Finding the SHORTEST PATH in an unweighted graph
- Level-by-level exploration (closest friends, nearest cities)
- Checking if two nodes are connected and HOW FAR they are
- Problems like "minimum steps to reach target", "rotting oranges"
- Implementation: **Queue**

**DFS (Depth-First Search) — Use when:**
- Exploring ALL possible paths (finding if a path EXISTS)
- Topological Sort (detecting cycles in directed graphs)
- Finding connected components
- Backtracking problems (maze solving, N-Queens)
- Implementation: **Recursion (implicit stack)** or **explicit Stack**

**Key insight:** Trees are just a special case of graphs (connected, undirected, no cycles). All tree traversals (pre-order, post-order, level-order) are just DFS and BFS applied to graphs with a special structure.`
      },
      {
        type: 'operations',
        title: '⚡ Operations',
        operations: [
          { op: 'BFS traversal', time: 'O(V + E)', space: 'O(V)', why: 'Visit every vertex and edge once. Queue holds frontier nodes.' },
          { op: 'DFS traversal', time: 'O(V + E)', space: 'O(V)', why: 'Visit every vertex and edge once. Recursion stack = O(V) worst case.' },
          { op: 'Shortest path (unweighted)', time: 'O(V + E)', space: 'O(V)', why: 'BFS level-by-level guarantees first-reach = shortest path.' },
          { op: 'Shortest path (weighted, Dijkstra)', time: 'O((V+E) log V)', space: 'O(V)', why: 'Use Min-Heap to always expand lowest-cost frontier node.' },
          { op: 'Topological Sort (Kahn\'s)', time: 'O(V + E)', space: 'O(V)', why: 'Track in-degrees, process zero-in-degree nodes first.' }
        ]
      },
      {
        type: 'java-code',
        title: '☕ Java Implementation',
        code: `// === GRAPH REPRESENTATION (Adjacency List) ===
int n = 5; // Number of vertices (0 to n-1)
List<List<Integer>> adj = new ArrayList<>();
for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

// Add edges (undirected):
adj.get(0).add(1); adj.get(1).add(0); // 0 -- 1
adj.get(0).add(2); adj.get(2).add(0); // 0 -- 2
adj.get(1).add(3); adj.get(3).add(1); // 1 -- 3

// === BFS (Shortest Path / Connected Components) ===
void bfs(List<List<Integer>> adj, int start, int n) {
    boolean[] visited = new boolean[n];
    Queue<Integer> queue = new ArrayDeque<>();
    
    queue.offer(start);
    visited[start] = true;
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}

// === DFS (Connected Components / Cycle Detection) ===
void dfs(List<List<Integer>> adj, int node, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");
    
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor]) {
            dfs(adj, neighbor, visited);
        }
    }
}

// Count connected components:
int countComponents(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) {
        adj.get(e[0]).add(e[1]);
        adj.get(e[1]).add(e[0]);
    }
    boolean[] visited = new boolean[n];
    int components = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(adj, i, visited);
            components++;
        }
    }
    return components;
}`
      },
      {
        type: 'interview-patterns',
        title: '🎯 Interview Patterns That Use Graphs',
        patterns: [
          'BFS for Shortest Path: Word Ladder, Rotting Oranges, 01 Matrix',
          'DFS for Component Detection: Number of Islands, Provinces',
          'Topological Sort: Course Schedule I & II, Alien Dictionary',
          'Union-Find / DSU: Redundant Connection, Number of Operations to Make Connected',
          'Dijkstra: Network Delay Time, Path With Minimum Effort',
          'Bipartite Check: Is Graph Bipartite? (two-coloring with BFS/DFS)'
        ]
      }
    ]
  }
];
