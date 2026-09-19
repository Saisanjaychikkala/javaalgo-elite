// Master DSA Curriculum Data: Tiers 1 through 7 for Java Developers

export const curriculumTiers = [
  {
    tier: 1,
    name: "Tier 1: Foundations, Hashing & Two Pointers",
    summary: "The building blocks of 40% of tech interviews: fast O(1) hash lookups, converging pointers, and dynamic sliding windows.",
    problems: [
      {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft"],
        leetcodeNumber: 1,
        pattern: "Hash Map / Complement Lookup",
        summary: "Given an array of integers and a target, return indices of the two numbers such that they add up to target.",
        intuition: "Instead of quadratic nested loops O(N^2), iterate through the array once while storing each number's value and index in a HashMap. For every number `x`, check if `target - x` is already in the map. If yes, you found the pair in O(1) time!",
        code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Map from number value -> index in array
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            // Check if complement already exists in map
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            // Store current number and its index
            map.put(nums[i], i);
        }
        
        // Return empty array if no pair found
        return new int[0];
    }
}`,
        timeComplexity: "O(N)",
        spaceComplexity: "O(N)",
        edgeCases: ["No solution exists", "Duplicate values that sum to target (e.g., [3,3], target=6)", "Negative integers"],
        javaTip: "Always use `map.containsKey()` or `map.get()` on boxed types. Returning `new int[]{}` saves allocating a named variable."
      },
      {
        id: "group-anagrams",
        title: "Group Anagrams",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Microsoft"],
        leetcodeNumber: 49,
        pattern: "Hash Map / Frequency Array Canonical Key",
        summary: "Given an array of strings, group the anagrams together in any order.",
        intuition: "Two words are anagrams if and only if their character counts or sorted characters are identical. Sort each word to use as a canonical key in a HashMap: `Map<String, List<String>>`. Group all words with the same sorted key together.",
        code: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) return new ArrayList<>();
        
        Map<String, List<String>> map = new HashMap<>();
        
        for (String s : strs) {
            // Convert to char array and sort to form canonical key
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            
            // Modern Java idiom: computeIfAbsent creates the list if missing
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        
        return new ArrayList<>(map.values());
    }
}`,
        timeComplexity: "O(N * K log K)",
        spaceComplexity: "O(N * K)",
        edgeCases: ["Empty array", "Array of single character strings", "Empty strings \"\""],
        javaTip: "`map.computeIfAbsent(key, k -> new ArrayList<>())` replaces 4 lines of `if (!map.containsKey)` boilerplate!"
      },
      {
        id: "three-sum",
        title: "3Sum",
        difficulty: "Medium",
        companies: ["Meta", "Google", "Amazon", "Apple"],
        leetcodeNumber: 15,
        pattern: "Sorting + Two Pointers",
        summary: "Find all unique triplets [nums[i], nums[j], nums[k]] such that i != j != k and the sum is zero.",
        intuition: "Sort the array first O(N log N). Fix the first element `nums[i]`. Then use two pointers `left = i + 1` and `right = n - 1` to find pairs adding up to `-nums[i]`. Skip duplicate numbers at every stage to ensure triplets are unique.",
        code: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        
        for (int i = 0; i < n - 2; i++) {
            // Optimization: if current number is > 0, sum of 3 positive nums can't be 0
            if (nums[i] > 0) break;
            
            // Skip duplicate fixed numbers
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            int left = i + 1, right = n - 1;
            int target = -nums[i];
            
            while (left < right) {
                int sum = nums[left] + nums[right];
                
                if (sum == target) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;
                    
                    // Skip duplicates for left & right
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
}`,
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1) extra space (excluding result)",
        edgeCases: ["Fewer than 3 elements", "All zeros [0,0,0,0]", "No valid triplet exists"],
        javaTip: "`Arrays.asList(a, b, c)` creates a fast fixed-size list. Make sure to skip duplicates *after* moving pointers!"
      },
      {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        companies: ["Meta", "Google", "Amazon"],
        leetcodeNumber: 11,
        pattern: "Two Pointers / Greedy Contraction",
        summary: "Find two lines that together with the x-axis form a container that holds the most water.",
        intuition: "Start with maximum width: `left = 0`, `right = n - 1`. The area is constrained by `min(height[left], height[right]) * (right - left)`. To potentially find a taller line, always advance the pointer pointing to the shorter line.",
        code: `class Solution {
    public int maxArea(int[] height) {
        int maxWater = 0;
        int left = 0, right = height.length - 1;
        
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, width * h);
            
            // Move the smaller pointer inward
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxWater;
    }
}`,
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        edgeCases: ["Only 2 elements", "All heights equal", "Strictly descending or ascending heights"],
        javaTip: "`Math.min()` and `Math.max()` are inlined by the JVM JIT compiler into hardware branchless instructions."
      },
      {
        id: "longest-substring-without-repeating",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Meta", "Microsoft"],
        leetcodeNumber: 3,
        pattern: "Sliding Window / Last Seen Index",
        summary: "Find the length of the longest substring without repeating characters.",
        intuition: "Maintain a sliding window `[left, right]`. Store the last seen index of each character in a Map or 128-element ASCII array. When you encounter a character already in the current window, instantly jump `left = Math.max(left, lastSeen[c] + 1)`.",
        code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int maxLength = 0;
        // Fast index lookup for ASCII characters (replaces HashMap for speed)
        int[] lastSeen = new int[128];
        Arrays.fill(lastSeen, -1);
        
        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            
            // If character seen inside current window, jump left pointer
            if (lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            
            lastSeen[c] = right; // Update last seen index
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
}`,
        timeComplexity: "O(N)",
        spaceComplexity: "O(1) (fixed 128-byte array)",
        edgeCases: ["Empty string \"\"", "Single character \"a\"", "All unique \"abcdef\"", "All repeated \"bbbbb\""],
        javaTip: "An `int[128]` array is 50x faster than `HashMap<Character, Integer>` because it avoids autoboxing and hash collisions."
      },
      {
        id: "trapping-rain-water",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        companies: ["Google", "Meta", "Amazon", "Apple"],
        leetcodeNumber: 42,
        pattern: "Two Pointers / Prefix & Suffix Maxima",
        summary: "Given n non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap.",
        intuition: "Water above any bar `i` is determined by `min(maxLeft, maxRight) - height[i]`. With two pointers starting at both ends, track `maxLeft` and `maxRight`. Advance the side with the smaller max, because that side is the true bottleneck.",
        code: `class Solution {
    public int trap(int[] height) {
        if (height == null || height.length <= 2) return 0;
        
        int left = 0, right = height.length - 1;
        int maxLeft = 0, maxRight = 0;
        int totalWater = 0;
        
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= maxLeft) {
                    maxLeft = height[left];
                } else {
                    totalWater += maxLeft - height[left];
                }
                left++;
            } else {
                if (height[right] >= maxRight) {
                    maxRight = height[right];
                } else {
                    totalWater += maxRight - height[right];
                }
                right--;
            }
        }
        
        return totalWater;
    }
}`,
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        edgeCases: ["Array length < 3", "Monotonically increasing or decreasing heights (no water trapped)", "All 0s"],
        javaTip: "Two pointers reduces the auxiliary space from O(N) (prefix/suffix arrays) to strict O(1)."
      }
    ]
  },
  {
    tier: 2,
    name: "Tier 2: Linear Structures & Search Mastery",
    summary: "Monotonic stacks, binary search on solution space, and robust linked list manipulation.",
    problems: [
      {
        id: "binary-search",
        title: "Binary Search & Search on Answer",
        difficulty: "Easy",
        companies: ["Google", "Meta", "Amazon", "Microsoft"],
        leetcodeNumber: 704,
        pattern: "Binary Search Template",
        summary: "Search for a target value in a sorted array in O(log N) time.",
        intuition: "Halve the search space on each iteration. In interviews, beware of integer overflow in calculating `mid`. Always use `mid = low + (high - low) / 2`.",
        code: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        
        while (low <= high) {
            // Prevent integer overflow
            int mid = low + (high - low) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1; // Discard left half
            } else {
                high = mid - 1; // Discard right half
            }
        }
        
        return -1; // Target not found
    }
}`,
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)",
        edgeCases: ["Target smaller than nums[0]", "Target larger than nums[n-1]", "Array of size 1"],
        javaTip: "`mid = (low + high) >>> 1` is also an interview-favorite unsigned bitshift trick to avoid overflow."
      },
      {
        id: "koko-eating-bananas",
        title: "Koko Eating Bananas (Search on Answer)",
        difficulty: "Medium",
        companies: ["Google", "Meta", "Airbnb"],
        leetcodeNumber: 875,
        pattern: "Binary Search on Answer Range",
        summary: "Find the minimum integer speed k to eat all bananas within h hours.",
        intuition: "Instead of searching in the array, binary search on the possible speeds `[1, max(piles)]`. If speed `k` allows Koko to finish in `<= h` hours, any speed `> k` is also valid (monotonicity). Try smaller speed `high = mid`; otherwise `low = mid + 1`.",
        code: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1;
        int high = 0;
        for (int pile : piles) {
            high = Math.max(high, pile);
        }
        
        int bestSpeed = high;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (canFinish(piles, h, mid)) {
                bestSpeed = mid;
                high = mid - 1; // Try to find an even slower speed
            } else {
                low = mid + 1;  // Too slow, must speed up
            }
        }
        
        return bestSpeed;
    }
    
    private boolean canFinish(int[] piles, int h, int speed) {
        long totalHours = 0;
        for (int pile : piles) {
            // Ceiling division: (pile + speed - 1) / speed
            totalHours += (pile + speed - 1) / speed;
        }
        return totalHours <= h;
    }
}`,
        timeComplexity: "O(N log(max(P)))",
        spaceComplexity: "O(1)",
        edgeCases: ["h == piles.length (must eat at max pile speed)", "Very large pile sizes causing integer overflow in hour count"],
        javaTip: "Use `long totalHours` to prevent 32-bit overflow when accumulating hours!"
      },
      {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        difficulty: "Easy",
        companies: ["Amazon", "Google", "Meta", "Apple"],
        leetcodeNumber: 206,
        pattern: "In-Place Pointer Reversal",
        summary: "Reverse a singly linked list in-place and return the new head.",
        intuition: "Maintain three pointers: `prev = null`, `curr = head`, and `next`. At each node, save `curr.next`, point `curr.next = prev`, then shift `prev` and `curr` forward.",
        code: `/**
 * Definition for singly-linked list:
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int val) { this.val = val; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        
        while (curr != null) {
            ListNode nextTemp = curr.next; // Store next node
            curr.next = prev;              // Reverse pointer
            prev = curr;                   // Move prev forward
            curr = nextTemp;               // Move curr forward
        }
        
        return prev; // New head of reversed list
    }
}`,
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        edgeCases: ["Empty list (`head == null`)", "Single node list"],
        javaTip: "In interviews, draw the pointers out loud. You can also write it recursively, but iterative O(1) space is preferred."
      },
      {
        id: "lru-cache",
        title: "LRU Cache (Least Recently Used)",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
        leetcodeNumber: 146,
        pattern: "Doubly Linked List + HashMap",
        summary: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put.",
        intuition: "A HashMap gives O(1) key lookups, while a Doubly Linked List gives O(1) node insertion and deletion. Keep dummy `head` (most recently used) and dummy `tail` (least recently used) nodes to eliminate boundary null-checks.",
        code: `class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }
    
    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail; // Dummy sentinel nodes
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        moveToHead(node); // Accessed, so mark most recently used
        return node.value;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.value = value;
            moveToHead(node);
        } else {
            if (map.size() >= capacity) {
                // Remove LRU node right before dummy tail
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
}`,
        timeComplexity: "O(1) for both get and put",
        spaceComplexity: "O(capacity)",
        edgeCases: ["Capacity = 1", "Updating an existing key with new value", "Eviction trigger when full"],
        javaTip: "In Java, you can also extend `LinkedHashMap<K, V>` and override `removeEldestEntry()`, but writing the Doubly Linked List by hand is what FAANG interviewers look for!"
      },
      {
        id: "daily-temperatures",
        title: "Daily Temperatures (Monotonic Stack)",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Google"],
        leetcodeNumber: 739,
        pattern: "Monotonic Decreasing Stack",
        summary: "Given an array of temperatures, return an array such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
        intuition: "Maintain a monotonic decreasing stack storing indices. When the current temperature is higher than the temperature at the index on top of the stack, pop that index and calculate the day difference `i - poppedIndex`.",
        code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        
        // Stack stores indices of temperatures in decreasing order
        Deque<Integer> stack = new ArrayDeque<>();
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevDay = stack.pop();
                result[prevDay] = i - prevDay; // Days waited
            }
            stack.push(i);
        }
        
        return result;
    }
}`,
        timeComplexity: "O(N) (each index pushed and popped at most once)",
        spaceComplexity: "O(N)",
        edgeCases: ["Temperatures never increase (all 0s in result)", "Strictly increasing temperatures"],
        javaTip: "Use `Deque<Integer> stack = new ArrayDeque<>()` instead of `Stack<Integer>` for zero synchronization overhead."
      }
    ]
  },
  {
    tier: 3,
    name: "Tier 3: Trees, Heaps & Tries",
    summary: "Recursive tree traversals, lowest common ancestor, min/max heaps for streaming medians, and prefix trees.",
    problems: [
      {
        id: "lowest-common-ancestor",
        title: "Lowest Common Ancestor of Binary Tree",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Microsoft", "Google"],
        leetcodeNumber: 236,
        pattern: "Post-Order Tree DFS",
        summary: "Find the lowest common ancestor (LCA) node of two given nodes p and q in a binary tree.",
        intuition: "Recursively search left and right subtrees. If the current root matches `p` or `q`, return `root`. If both left and right recursive calls return non-null, `root` is the LCA. If only one returns non-null, propagate that node upward.",
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Base case: null or found target node
        if (root == null || root == p || root == q) {
            return root;
        }
        
        // Post-order DFS
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        // If p and q found in separate subtrees, root is the LCA
        if (left != null && right != null) {
            return root;
        }
        
        // Otherwise, return whichever subtree found a target
        return left != null ? left : right;
    }
}`,
        timeComplexity: "O(N)",
        spaceComplexity: "O(H) where H is tree height",
        edgeCases: ["One target node is direct ancestor of the other", "Target nodes at bottom leaves"],
        javaTip: "Post-order traversal (`left`, `right`, then process `root`) is the key pattern for tree bottom-up aggregation."
      },
      {
        id: "top-k-frequent-elements",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Google"],
        leetcodeNumber: 347,
        pattern: "Min-Heap / Bucket Sort",
        summary: "Given an integer array nums and an integer k, return the k most frequent elements.",
        intuition: "First count frequencies with a HashMap. Then maintain a Min-Heap of size `k` ordered by frequency. If heap size exceeds `k`, pop the least frequent element. When done, the heap holds the top `k` elements.",
        code: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // 1. Build frequency map
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int num : nums) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }
        
        // 2. Min-Heap of size k comparing frequency
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(
            (a, b) -> Integer.compare(countMap.get(a), countMap.get(b))
        );
        
        for (int num : countMap.keySet()) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll(); // Evict lowest frequency
            }
        }
        
        // 3. Extract results
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = minHeap.poll();
        }
        return result;
    }
}`,
        timeComplexity: "O(N log K)",
        spaceComplexity: "O(N)",
        edgeCases: ["k equals number of unique elements", "All elements have frequency 1", "Single element array"],
        javaTip: "For true O(N) time in an interview, mention Bucket Sort as an optimization: an array of lists indexed by frequency!"
      },
      {
        id: "find-median-from-data-stream",
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        companies: ["Google", "Amazon", "Meta", "Microsoft"],
        leetcodeNumber: 295,
        pattern: "Two Heaps (Max-Heap + Min-Heap)",
        summary: "Design a data structure that supports adding numbers from a data stream and finding the running median in O(1).",
        intuition: "Divide numbers into two halves: lower half in a Max-Heap (`small`), upper half in a Min-Heap (`large`). Keep heaps balanced such that `small.size() == large.size()` or `small.size() == large.size() + 1`. The median is either the top of `small`, or average of both tops.",
        code: `class MedianFinder {
    private PriorityQueue<Integer> small; // Max-heap: holds smaller half
    private PriorityQueue<Integer> large; // Min-heap: holds larger half
    
    public MedianFinder() {
        // Max-heap using reverse order comparator
        small = new PriorityQueue<>(Collections.reverseOrder());
        // Min-heap default
        large = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        // Step 1: Push to small heap
        small.offer(num);
        
        // Step 2: Ensure small's largest <= large's smallest
        large.offer(small.poll());
        
        // Step 3: Maintain size balance (small can have at most 1 more element than large)
        if (small.size() < large.size()) {
            small.offer(large.poll());
        }
    }
    
    public double findMedian() {
        if (small.size() > large.size()) {
            return small.peek();
        }
        return (small.peek() + large.peek()) / 2.0;
    }
}`,
        timeComplexity: "O(log N) addNum, O(1) findMedian",
        spaceComplexity: "O(N)",
        edgeCases: ["Even count of elements vs odd count", "Duplicate values", "Negative numbers"],
        javaTip: "Notice `2.0` in division to enforce floating-point arithmetic rather than integer truncation!"
      },
      {
        id: "implement-trie",
        title: "Implement Trie (Prefix Tree)",
        difficulty: "Medium",
        companies: ["Google", "Amazon", "Twitter", "Microsoft"],
        leetcodeNumber: 208,
        pattern: "Prefix Tree Node Array",
        summary: "Implement a trie with insert, search, and startsWith methods.",
        intuition: "Each TrieNode has an array `children = new TrieNode[26]` and a boolean `isEndOfWord`. Characters map to indices via `c - 'a'`. Enables prefix queries in O(L) time where L is word length.",
        code: `class Trie {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEndOfWord = false;
    }
    
    private final TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isEndOfWord = true;
    }
    
    public boolean search(String word) {
        TrieNode node = findNode(word);
        return node != null && node.isEndOfWord;
    }
    
    public boolean startsWith(String prefix) {
        return findNode(prefix) != null;
    }
    
    private TrieNode findNode(String str) {
        TrieNode curr = root;
        for (char c : str.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return null;
            curr = curr.children[idx];
        }
        return curr;
    }
}`,
        timeComplexity: "O(L) for insert, search, startsWith (L = word length)",
        spaceComplexity: "O(Total characters inserted * 26)",
        edgeCases: ["Empty string insertion", "Searching for prefix that is not a complete word", "Words sharing common prefixes"],
        javaTip: "Use `static class TrieNode` to avoid inner-class reference overhead to the parent `Trie` instance."
      }
    ]
  },
  {
    tier: 4,
    name: "Tier 4: Graph Algorithms Mastery",
    summary: "Graph representations, BFS/DFS, cycle detection, Topological Sort (Kahn's algorithm), Disjoint Set Union (DSU), and Dijkstra.",
    problems: [
      {
        id: "number-of-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg"],
        leetcodeNumber: 200,
        pattern: "2D Grid DFS / Connected Components",
        summary: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
        intuition: "Iterate through the grid. When a `'1'` is found, increment island count and trigger a DFS to sink all connected land cells by marking them `'0'`. This avoids using extra visited memory.",
        code: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;
        
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    sinkIsland(grid, r, c, rows, cols); // Sink connected component
                }
            }
        }
        
        return islands;
    }
    
    private void sinkIsland(char[][] grid, int r, int c, int rows, int cols) {
        // Boundary checks and water check
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') {
            return;
        }
        
        grid[r][c] = '0'; // Sink current cell (mark visited)
        
        // Explore 4 cardinal directions
        sinkIsland(grid, r + 1, c, rows, cols); // Down
        sinkIsland(grid, r - 1, c, rows, cols); // Up
        sinkIsland(grid, r, c + 1, rows, cols); // Right
        sinkIsland(grid, r, c - 1, rows, cols); // Left
    }
}`,
        timeComplexity: "O(M * N)",
        spaceComplexity: "O(M * N) recursion stack in worst case (grid full of land)",
        edgeCases: ["Grid with only water ('0')", "Grid with only land ('1')", "1x1 grid"],
        javaTip: "Modifying the input grid directly saves an O(M*N) visited boolean matrix, which interviewers love. Always ask first: 'May I modify the input matrix in-place?'"
      },
      {
        id: "course-schedule",
        title: "Course Schedule (Topological Sort / Cycle Detection)",
        difficulty: "Medium",
        companies: ["Google", "Amazon", "Meta", "Microsoft"],
        leetcodeNumber: 207,
        pattern: "Kahn's BFS In-Degree Algorithm",
        summary: "Given numCourses and prerequisite pairs, determine if it is possible to finish all courses (detect DAG cycle).",
        intuition: "Model as a Directed Acyclic Graph (DAG). Calculate in-degrees for all nodes. Push nodes with `inDegree == 0` into a Queue. Repeatedly poll from queue and decrement neighbors' in-degrees. If total courses processed equals `numCourses`, no cycle exists.",
        code: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // 1. Build adjacency list and in-degree array
        List<List<Integer>> adj = new ArrayList<>(numCourses);
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        
        int[] inDegree = new int[numCourses];
        
        for (int[] pair : prerequisites) {
            int course = pair[0];
            int prereq = pair[1];
            adj.get(prereq).add(course); // prereq -> course
            inDegree[course]++;
        }
        
        // 2. Queue all courses with zero prerequisites
        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        // 3. Process BFS
        int processedCourses = 0;
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            processedCourses++;
            
            for (int neighbor : adj.get(curr)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        return processedCourses == numCourses;
    }
}`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
        edgeCases: ["Mutual cycle: [[0, 1], [1, 0]]", "Self dependency: [[0, 0]]", "No prerequisites: prerequisites.length == 0"],
        javaTip: "Using `List<List<Integer>>` or `List<Integer>[]` is much faster than `Map<Integer, List<Integer>>` when vertex IDs are 0 to N-1."
      },
      {
        id: "redundant-connection-dsu",
        title: "Redundant Connection (Disjoint Set Union - DSU)",
        difficulty: "Medium",
        companies: ["Google", "Amazon", "Meta"],
        leetcodeNumber: 684,
        pattern: "Disjoint Set Union (Union-Find) with Path Compression",
        summary: "Given an undirected graph that started as a tree plus one extra edge, find and return the edge that created a cycle.",
        intuition: "Iterate through edges. For each edge (u, v), find roots of u and v using DSU. If they already share the same root, adding this edge creates a cycle! Otherwise, union them together.",
        code: `class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        DSU dsu = new DSU(n + 1);
        
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            
            // If already in same set, edge is redundant!
            if (!dsu.union(u, v)) {
                return edge;
            }
        }
        
        return new int[0];
    }
    
    static class DSU {
        int[] parent;
        int[] rank;
        
        DSU(int size) {
            parent = new int[size];
            rank = new int[size];
            for (int i = 0; i < size; i++) parent[i] = i;
        }
        
        int find(int x) {
            // Path compression
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }
        
        boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX == rootY) return false; // Cycle detected
            
            // Union by rank
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            return true;
        }
    }
}`,
        timeComplexity: "O(N * α(N)) ≈ O(N) practically constant time using Inverse Ackermann",
        spaceComplexity: "O(N)",
        edgeCases: ["Tree with single loop", "Linear graph with cycle at end"],
        javaTip: "Memorize this DSU template: path compression in `find()` and union by rank in `union()`. It solves 20+ interview problems effortlessly!"
      },
      {
        id: "network-delay-time-dijkstra",
        title: "Network Delay Time (Dijkstra's Algorithm)",
        difficulty: "Medium",
        companies: ["Google", "Amazon", "Microsoft"],
        leetcodeNumber: 743,
        pattern: "Single-Source Shortest Path / Min-Heap Dijkstra",
        summary: "Find how long it will take for all n nodes to receive a signal from node k.",
        intuition: "Dijkstra's algorithm greedily expands the shortest known distance node using a Min-Heap `PriorityQueue<int[]>`. Update distances to neighbors and push `(neighbor, newDist)`. At the end, the answer is the maximum distance in the distance array.",
        code: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        // 1. Adjacency list: u -> List of {v, weight}
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] time : times) {
            adj.get(time[0]).add(new int[]{time[1], time[2]});
        }
        
        // 2. Distance array initialized to infinity
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;
        
        // Min-heap ordered by distance: {node, currentDistance}
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
        pq.offer(new int[]{k, 0});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];
            int d = curr[1];
            
            // Skip stale entries
            if (d > dist[u]) continue;
            
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int weight = edge[1];
                
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.offer(new int[]{v, dist[v]});
                }
            }
        }
        
        // Find max distance across all 1..n nodes
        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Integer.MAX_VALUE) return -1; // Unreachable node
            maxTime = Math.max(maxTime, dist[i]);
        }
        
        return maxTime;
    }
}`,
        timeComplexity: "O(E log V)",
        spaceComplexity: "O(V + E)",
        edgeCases: ["Disconnected graph (returns -1)", "Source node has no outgoing edges", "Cycles with positive weights"],
        javaTip: "Always include `if (d > dist[u]) continue;` to discard duplicate queue entries inserted before a shorter path was discovered."
      }
    ]
  },
  {
    tier: 5,
    name: "Tier 5: Dynamic Programming Zero to Hero",
    summary: "From 1D state recurrence to 2D grids, 0/1 Knapsack, and Longest Common Subsequence.",
    problems: [
      {
        id: "coin-change",
        title: "Coin Change (Unbounded Knapsack)",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
        leetcodeNumber: 322,
        pattern: "Bottom-Up 1D Tabulation",
        summary: "Find the fewest number of coins that you need to make up a given amount.",
        intuition: "Define `dp[i]` as the minimum coins needed to make amount `i`. For each amount from 1 to `amount`, test every coin: `dp[i] = min(dp[i], 1 + dp[i - coin])`. Fill array with `amount + 1` as infinity sentinel.",
        code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        if (amount < 0) return -1;
        if (amount == 0) return 0;
        
        // dp[i] = min coins to make amount i
        int[] dp = new int[amount + 1];
        // Initialize with sentinel value larger than any possible answer
        Arrays.fill(dp, amount + 1);
        dp[0] = 0; // Base case: 0 amount requires 0 coins
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        timeComplexity: "O(amount * coins.length)",
        spaceComplexity: "O(amount)",
        edgeCases: ["Amount = 0 (returns 0)", "Cannot make change (returns -1)", "Coins larger than amount"],
        javaTip: "Using `amount + 1` instead of `Integer.MAX_VALUE` avoids integer overflow when doing `1 + dp[i - coin]`."
      },
      {
        id: "longest-increasing-subsequence",
        title: "Longest Increasing Subsequence (O(N log N))",
        difficulty: "Medium",
        companies: ["Google", "Meta", "Amazon", "Microsoft"],
        leetcodeNumber: 300,
        pattern: "Patience Sorting / Binary Search",
        summary: "Find the length of the longest strictly increasing subsequence in an array.",
        intuition: "Maintain an array `tails` where `tails[i]` stores the smallest tail of all increasing subsequences of length `i + 1`. For each number, use binary search (`Arrays.binarySearch`) to find where it fits. If it extends the sequence, append it; otherwise replace the existing tail.",
        code: `class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int[] tails = new int[nums.length];
        int size = 0;
        
        for (int x : nums) {
            // Binary search for x in tails[0 ... size-1]
            int i = 0, j = size;
            while (i < j) {
                int mid = (i + j) / 2;
                if (tails[mid] < x) {
                    i = mid + 1;
                } else {
                    j = mid;
                }
            }
            
            tails[i] = x;
            if (i == size) size++;
        }
        
        return size;
    }
}`,
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        edgeCases: ["All elements identical", "Strictly descending array", "Already sorted array"],
        javaTip: "Mentioning the O(N^2) DP solution first and then upgrading to O(N log N) Patience Sorting shows mastery in FAANG interviews."
      },
      {
        id: "edit-distance",
        title: "Edit Distance (2D DP)",
        difficulty: "Medium",
        companies: ["Google", "Amazon", "Microsoft"],
        leetcodeNumber: 72,
        pattern: "2D Grid DP String Matching",
        summary: "Given two strings word1 and word2, return the minimum operations (insert, delete, replace) to convert word1 to word2.",
        intuition: "Let `dp[i][j]` be minimum operations to convert `word1[0..i-1]` to `word2[0..j-1]`. If `word1[i-1] == word2[j-1]`, `dp[i][j] = dp[i-1][j-1]`. Otherwise, take `1 + min(delete: dp[i-1][j], insert: dp[i][j-1], replace: dp[i-1][j-1])`.",
        code: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        
        int[][] dp = new int[m + 1][n + 1];
        
        // Base cases: converting string to empty string takes deletions
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1]; // No op needed
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j - 1], // Replace
                        Math.min(
                            dp[i - 1][j], // Delete
                            dp[i][j - 1]  // Insert
                        )
                    );
                }
            }
        }
        
        return dp[m][n];
    }
}`,
        timeComplexity: "O(M * N)",
        spaceComplexity: "O(M * N) (can be optimized to O(N) space using 2 rows)",
        edgeCases: ["One or both strings empty", "Strings already identical"],
        javaTip: "Remember that `dp` array indices are 1-based (`m+1`, `n+1`), while string character indices are 0-based (`i-1`, `j-1`)."
      }
    ]
  },
  {
    tier: 6,
    name: "Tier 6: Advanced & Elite Structures",
    summary: "Segment trees for dynamic range queries, sliding window maximum with monotonic deques, and string matching.",
    problems: [
      {
        id: "sliding-window-maximum",
        title: "Sliding Window Maximum (Monotonic Deque)",
        difficulty: "Hard",
        companies: ["Google", "Amazon", "Meta", "Citadel"],
        leetcodeNumber: 239,
        pattern: "Monotonic Decreasing Deque",
        summary: "Given an array nums and sliding window of size k, return the max element in each window as it slides.",
        intuition: "Maintain a double-ended queue `ArrayDeque<Integer>` storing indices. Ensure elements in the deque are monotonically decreasing. Discard indices outside the current window from the front, and discard elements smaller than `nums[i]` from the back.",
        code: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        int ri = 0;
        
        // Deque stores indices of candidate elements in decreasing order
        Deque<Integer> deque = new ArrayDeque<>();
        
        for (int i = 0; i < n; i++) {
            // 1. Remove indices that are out of current window [i - k + 1, i]
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            
            // 2. Remove smaller values from back because they will never be max
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            
            // 3. Add current index to back
            deque.offerLast(i);
            
            // 4. Window is valid once i >= k - 1; front is always current window max
            if (i >= k - 1) {
                result[ri++] = nums[deque.peekFirst()];
            }
        }
        
        return result;
    }
}`,
        timeComplexity: "O(N) (each index pushed and polled at most once)",
        spaceComplexity: "O(K)",
        edgeCases: ["k = 1 (result is copy of nums)", "k = nums.length (single maximum)", "Decreasing array"],
        javaTip: "Use `ArrayDeque` with `peekFirst()`, `pollFirst()`, and `pollLast()` for O(1) double-ended operations."
      },
      {
        id: "segment-tree-range-sum",
        title: "Range Sum Query - Mutable (Segment Tree)",
        difficulty: "Medium",
        companies: ["Google", "Uber", "Citadel"],
        leetcodeNumber: 307,
        pattern: "Segment Tree Point Update & Range Query",
        summary: "Implement array with O(log N) point update and O(log N) range sum queries.",
        intuition: "A balanced binary tree where each node stores the sum of a segment `[L, R]`. Leaf nodes represent single array elements. Point updates and range sum queries take O(log N) by traversing matching branches.",
        code: `class NumArray {
    int[] tree;
    int n;
    
    public NumArray(int[] nums) {
        if (nums.length > 0) {
            n = nums.length;
            tree = new int[n * 4]; // 4 * N is safe upper bound for segment tree
            buildTree(nums, 0, 0, n - 1);
        }
    }
    
    private void buildTree(int[] nums, int node, int start, int end) {
        if (start == end) {
            tree[node] = nums[start];
            return;
        }
        int mid = (start + end) / 2;
        int leftChild = 2 * node + 1;
        int rightChild = 2 * node + 2;
        buildTree(nums, leftChild, start, mid);
        buildTree(nums, rightChild, mid + 1, end);
        tree[node] = tree[leftChild] + tree[rightChild];
    }
    
    public void update(int index, int val) {
        updateTree(0, 0, n - 1, index, val);
    }
    
    private void updateTree(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
            return;
        }
        int mid = (start + end) / 2;
        int leftChild = 2 * node + 1;
        int rightChild = 2 * node + 2;
        if (idx <= mid) {
            updateTree(leftChild, start, mid, idx, val);
        } else {
            updateTree(rightChild, mid + 1, end, idx, val);
        }
        tree[node] = tree[leftChild] + tree[rightChild];
    }
    
    public int sumRange(int left, int right) {
        return queryTree(0, 0, n - 1, left, right);
    }
    
    private int queryTree(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0; // Outside segment
        if (l <= start && end <= r) return tree[node]; // Completely inside
        
        int mid = (start + end) / 2;
        int leftSum = queryTree(2 * node + 1, start, mid, l, r);
        int rightSum = queryTree(2 * node + 2, mid + 1, end, l, r);
        return leftSum + rightSum;
    }
}`,
        timeComplexity: "O(N) build, O(log N) update, O(log N) query",
        spaceComplexity: "O(N)",
        edgeCases: ["Single element array", "Querying exact range [0, n-1]", "Updating same index multiple times"],
        javaTip: "Allocating `new int[4 * n]` provides sufficient space for complete binary tree node indices."
      }
    ]
  },
  {
    tier: 7,
    name: "Tier 7: Top-Company Playbook & Interview Blueprint",
    summary: "The 45-minute live interview execution formula, edge-case checklist, and mental clarity guides.",
    problems: [
      {
        id: "interview-strategy",
        title: "The 45-Minute Coding Interview Blueprint",
        difficulty: "Easy",
        companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft"],
        leetcodeNumber: 0,
        pattern: "Interview Communication Framework",
        summary: "Step-by-step timeline to guarantee you demonstrate Senior-level coding behavior under pressure.",
        intuition: "Interviews test communication, problem formulation, edge-case anticipation, and clean Java coding. Never jump straight to code without speaking!",
        code: `/*
THE 5-PHASE 45-MINUTE FORMULA:

00:00 - 05:00 -> Clarify & Constrain:
- What are the input sizes (N <= 10^5 vs N <= 20)?
- Can values be negative? Are there duplicates?
- What are expected return types on empty inputs?

05:00 - 15:00 -> Algorithm Formulation & Complexity:
- Propose brute force first ("O(N^2) is trivial with nested loops...").
- Propose optimized algorithm ("Using a HashMap / Two Pointers reduces this to O(N)").
- State Time & Space Complexity upfront and gain buy-in.

15:00 - 32:00 -> Clean, Modular Java Implementation:
- Use standard Java idioms (ArrayDeque for stacks, getOrDefault).
- Meaningful variable names: left, right, maxWater, not x, y, z.
- Separate helper methods for modularity.

32:00 - 40:00 -> Dry Run on Concrete Example:
- Trace through code step-by-step with a small sample input.
- Test edge cases: empty array, single element, negative numbers.

40:00 - 45:00 -> Wrap Up & Questions.
*/`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        edgeCases: ["Silent interviewer (prompt them: 'Does this approach sound good before I start typing?')", "Getting stuck (ask for a small hint or re-examine assumptions)"],
        javaTip: "Always explain your Big-O space complexity explicitly, noting auxiliary memory vs the memory used by the output."
      }
    ]
  }
];
