// Interactive Flashcards & Quizzes for Java DSA Mastery

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
  }
];
