// ============================================================
// COMPLEXITY CHALLENGE GAME DATA — JavaAlgo Elite v3.0
// Big-O Guessing Game: see code → pick complexity → learn why
// ============================================================

export const complexityOptions = ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)', 'O(N²)', 'O(N³)', 'O(2^N)'];

export const complexityChallenges = [
  {
    id: 1,
    difficulty: 'Easy',
    code: `int x = arr[0];
return x * 2 + 1;`,
    answer: 'O(1)',
    explanation: 'Direct array access and arithmetic are constant-time operations. No loops, no recursion — the input size N doesn\'t affect execution time at all.'
  },
  {
    id: 2,
    difficulty: 'Easy',
    code: `for (int i = 0; i < n; i++) {
    sum += arr[i];
}`,
    answer: 'O(N)',
    explanation: 'Single loop iterating N times. Each iteration does O(1) work (addition). Total: N × O(1) = O(N).'
  },
  {
    id: 3,
    difficulty: 'Easy',
    code: `for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        matrix[i][j] = i + j;
    }
}`,
    answer: 'O(N²)',
    explanation: 'Nested loops, both running N times. Inner body is O(1). Total: N × N × O(1) = O(N²). This is the classic "nested loop → multiply" rule.'
  },
  {
    id: 4,
    difficulty: 'Easy',
    code: `while (n > 1) {
    n = n / 2;
}`,
    answer: 'O(log N)',
    explanation: 'Each iteration halves N. Starting from N, we halve log₂(N) times before reaching 1. This is the classic "halving → O(log N)" pattern — same as binary search.'
  },
  {
    id: 5,
    difficulty: 'Medium',
    code: `for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
        // process pair (i, j)
    }
}`,
    answer: 'O(N²)',
    explanation: 'The inner loop starts at i, not 0. Total iterations: N + (N-1) + (N-2) + ... + 1 = N(N+1)/2 = O(N²). The "j = i" trick halves the constant but doesn\'t change the Big-O class.'
  },
  {
    id: 6,
    difficulty: 'Medium',
    code: `Arrays.sort(arr);           // O(N log N)
for (int x : arr) {         // O(N)
    System.out.println(x);
}`,
    answer: 'O(N log N)',
    explanation: 'Sort is O(N log N), loop is O(N). Total: O(N log N) + O(N) = O(N log N). When adding complexities, the dominant (larger) term wins.'
  },
  {
    id: 7,
    difficulty: 'Medium',
    code: `HashMap<Integer, Integer> map = new HashMap<>();
for (int x : arr) {
    map.put(x, map.getOrDefault(x, 0) + 1);
}
return map.get(target);`,
    answer: 'O(N)',
    explanation: 'HashMap.put() and get() are O(1) average. The loop runs N times doing O(1) work per iteration. Total: O(N). This is why HashMaps are so powerful — they turn O(N) lookups into O(1).'
  },
  {
    id: 8,
    difficulty: 'Medium',
    code: `for (int i = 1; i < n; i *= 2) {
    for (int j = 0; j < n; j++) {
        // process
    }
}`,
    answer: 'O(N log N)',
    explanation: 'Outer loop: i doubles each time (1, 2, 4, 8...) → runs log₂(N) times. Inner loop: runs N times for each outer iteration. Total: log(N) × N = O(N log N). This is the pattern behind efficient divide-and-conquer algorithms.'
  },
  {
    id: 9,
    difficulty: 'Medium',
    code: `// Binary search
int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}`,
    answer: 'O(log N)',
    explanation: 'Each iteration eliminates half the search space. Starting with N elements: N → N/2 → N/4 → ... → 1. Takes log₂(N) steps. This is the "halving the problem" pattern.'
  },
  {
    id: 10,
    difficulty: 'Medium',
    code: `for (int i = 0; i < n; i++) {
    if (map.containsKey(target - arr[i])) {
        return new int[]{map.get(target - arr[i]), i};
    }
    map.put(arr[i], i);
}`,
    answer: 'O(N)',
    explanation: 'This is the classic Two Sum solution. One pass through the array (O(N)), each iteration does O(1) HashMap lookups and inserts. The HashMap trades O(N) space for reducing a brute-force O(N²) to O(N).'
  },
  {
    id: 11,
    difficulty: 'Hard',
    code: `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    answer: 'O(2^N)',
    explanation: 'Each call branches into TWO recursive calls. The recursion tree has depth N and roughly 2^N nodes. This is exponential! Adding memoization (DP) reduces it to O(N) — that\'s the entire point of Dynamic Programming.'
  },
  {
    id: 12,
    difficulty: 'Hard',
    code: `for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        for (int k = 0; k < n; k++) {
            // process triple
        }
    }
}`,
    answer: 'O(N³)',
    explanation: 'Three nested loops, each running N times. Total: N × N × N = O(N³). This appears in naive matrix multiplication, 3Sum brute force, and Floyd-Warshall shortest paths.'
  },
  {
    id: 13,
    difficulty: 'Hard',
    code: `// TreeSet operations
TreeSet<Integer> set = new TreeSet<>();
for (int x : arr) {
    set.add(x);        // O(log N) per operation
}
for (int x : set) {
    System.out.println(x);  // Sorted output
}`,
    answer: 'O(N log N)',
    explanation: 'TreeSet uses a Red-Black Tree internally. Each add() is O(log N). N insertions = O(N log N). Iteration over the sorted set is O(N). Total: O(N log N) + O(N) = O(N log N). This is essentially sorting via a balanced BST.'
  },
  {
    id: 14,
    difficulty: 'Hard',
    code: `void permute(int[] arr, int l, int r) {
    if (l == r) { print(arr); return; }
    for (int i = l; i <= r; i++) {
        swap(arr, l, i);
        permute(arr, l + 1, r);
        swap(arr, l, i);
    }
}`,
    answer: 'O(N!)',
    explanation: 'Generating all permutations: first position has N choices, second has N-1, third has N-2... Total: N × (N-1) × (N-2) × ... × 1 = N! This is factorial growth — even N=20 produces 2.4 quintillion permutations. Appears in brute-force TSP and some backtracking problems.'
  },
  {
    id: 15,
    difficulty: 'Hard',
    code: `// Amortized analysis trick
ArrayList<Integer> list = new ArrayList<>();
for (int i = 0; i < n; i++) {
    list.add(arr[i]);  // Usually O(1), occasionally O(N) when resizing
}`,
    answer: 'O(N)',
    explanation: 'ArrayList.add() is AMORTIZED O(1). Most calls are O(1) (just set the next slot). Occasionally, the internal array doubles in size, copying all N elements — but this happens so rarely (at sizes 1, 2, 4, 8, 16...) that the total cost across ALL N operations is still O(N). This is amortized analysis — a key interview concept!'
  },
  {
    id: 16,
    difficulty: 'Tricky',
    code: `for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        // process
    }
}`,
    answer: 'O(N)',
    explanation: 'TRICK: This is O(N × M), NOT O(N²)! If N and M are independent variables, you can\'t simplify further. But if the question says M is a constant (e.g., M = 26 for alphabet), then it\'s O(26N) = O(N). Always ask: are the loop bounds independent or related?'
  },
  {
    id: 17,
    difficulty: 'Tricky',
    code: `Set<String> seen = new HashSet<>();
for (String s : strings) {      // N strings
    seen.add(s);                 // Each string has length L
}`,
    answer: 'O(N)',
    explanation: 'TRICK: HashSet.add(String) computes the hash of the string, which is O(L) where L is the string length. If L is bounded by a constant, it\'s O(N). If L can grow with input, it\'s O(N × L). In interviews, always clarify: are string lengths bounded or variable?'
  },
  {
    id: 18,
    difficulty: 'Tricky',
    code: `int i = 0, j = 0;
while (i < n && j < m) {
    if (arr1[i] < arr2[j]) i++;
    else j++;
}`,
    answer: 'O(N)',
    explanation: 'Two-pointer merge of two sorted arrays. Each iteration advances either i or j. Total iterations ≤ N + M. If M ≈ N, this is O(N). Key insight: even though there are two variables, each pointer only moves forward — so total work is bounded by N + M, not N × M.'
  },
  {
    id: 19,
    difficulty: 'Easy',
    code: `Stack<Integer> stack = new Stack<>();
stack.push(42);
stack.pop();
stack.peek();`,
    answer: 'O(1)',
    explanation: 'Stack push, pop, and peek are all O(1) operations. They operate on the top of the stack only — no iteration needed regardless of how many elements are in the stack.'
  },
  {
    id: 20,
    difficulty: 'Medium',
    code: `// Sliding window: find max sum subarray of size K
int windowSum = 0;
for (int i = 0; i < k; i++) windowSum += arr[i];
int maxSum = windowSum;
for (int i = k; i < n; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
}`,
    answer: 'O(N)',
    explanation: 'The sliding window technique: first loop runs K times, second loop runs N-K times. Total: K + (N-K) = N = O(N). Each window position is computed in O(1) by adding the new element and subtracting the old one — no re-summing the entire window.'
  },
  {
    id: 21,
    difficulty: 'Hard',
    code: `// Sieve of Eratosthenes
boolean[] isPrime = new boolean[n + 1];
Arrays.fill(isPrime, true);
for (int i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
        for (int j = i * i; j <= n; j += i) {
            isPrime[j] = false;
        }
    }
}`,
    answer: 'O(N log N)',
    explanation: 'The Sieve of Eratosthenes is actually O(N log log N) — but that\'s close to O(N log N) for interview purposes. The outer loop runs √N times. The inner loop for each prime p crosses out N/p numbers. By the prime harmonic series, total work ≈ N × ln(ln(N)). Interviewers accept O(N log N) as the answer.'
  },
  {
    id: 22,
    difficulty: 'Tricky',
    code: `// String concatenation in a loop
String result = "";
for (int i = 0; i < n; i++) {
    result += arr[i];  // String is immutable!
}`,
    answer: 'O(N²)',
    explanation: 'TRAP! Strings are IMMUTABLE in Java. Each += creates a NEW String object and copies all previous characters. Iteration 1 copies 1 char, iteration 2 copies 2 chars... Total: 1 + 2 + 3 + ... + N = N(N+1)/2 = O(N²). FIX: Use StringBuilder.append() which is amortized O(1) per append, making the loop O(N).'
  },
  {
    id: 23,
    difficulty: 'Medium',
    code: `// BFS on a graph
Queue<Integer> queue = new LinkedList<>();
boolean[] visited = new boolean[V];
queue.add(start);
visited[start] = true;
while (!queue.isEmpty()) {
    int node = queue.poll();
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.add(neighbor);
        }
    }
}`,
    answer: 'O(N)',
    explanation: 'BFS visits each vertex once (V operations) and traverses each edge once (E operations). Total: O(V + E). Since the question uses N generically, it\'s O(N) where N represents the total graph size. For a connected graph, E ≥ V-1, so the edge traversals usually dominate.'
  },
  {
    id: 24,
    difficulty: 'Hard',
    code: `// Kadane's algorithm: max subarray sum
int maxSoFar = arr[0], maxEndingHere = arr[0];
for (int i = 1; i < n; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
}`,
    answer: 'O(N)',
    explanation: 'Kadane\'s Algorithm solves Maximum Subarray Sum in a single pass. One loop, N iterations, O(1) work per iteration. The brute force approach (check all subarrays) is O(N²) or O(N³). Kadane\'s uses dynamic programming insight: the max ending at position i either extends the previous subarray or starts fresh.'
  },
  {
    id: 25,
    difficulty: 'Tricky',
    code: `// What's the complexity of this recursive function?
void mystery(int n) {
    if (n <= 0) return;
    System.out.println(n);
    mystery(n / 3);
    mystery(n / 3);
}`,
    answer: 'O(N)',
    explanation: 'Apply the Master Theorem: T(N) = 2T(N/3) + O(1). Here a=2, b=3, so log_b(a) = log₃(2) ≈ 0.63. Since the work at each level is O(1) (case 1 of Master Theorem), T(N) = O(N^log₃(2)) ≈ O(N^0.63) which is sub-linear. For interview purposes, this is closer to O(N) than O(N log N). The key insight: two recursive calls on N/3 grows slower than you might think!'
  }
];
