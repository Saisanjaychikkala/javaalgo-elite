// The 14 Universal Algorithmic Patterns for FAANG Technical Interviews

export const patternMatrix = [
  {
    id: "two-pointers",
    name: "1. Two Pointers (Converging or Parallel)",
    icon: "layers",
    whenToUse: "Input is a sorted array or string, and you need to search for pairs, triplets, or compare opposite ends without extra space.",
    indicators: [
      "Find two numbers that add up to target in sorted array",
      "Check if string is palindrome",
      "Partition array (like quicksort or Dutch National Flag)",
      "Trapping rain water / Container with most water"
    ],
    javaTemplate: `public int twoPointersTemplate(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    
    while (left < right) {
        int current = nums[left] + nums[right];
        if (current == target) {
            return 1; // Found match
        } else if (current < target) {
            left++;   // Need larger sum
        } else {
            right--;  // Need smaller sum
        }
    }
    return -1;
}`,
    topProblems: ["Two Sum II", "3Sum", "Container With Most Water", "Trapping Rain Water", "Valid Palindrome"]
  },
  {
    id: "sliding-window",
    name: "2. Sliding Window (Fixed or Dynamic)",
    icon: "sparkles",
    whenToUse: "Finding the longest, shortest, or target contiguous subarray or substring matching a condition.",
    indicators: [
      "Contiguous subarray with sum >= S",
      "Longest substring with at most K distinct characters",
      "Anagrams or substring permutation search",
      "Fixed window: maximum sum subarray of size K"
    ],
    javaTemplate: `public int dynamicSlidingWindow(String s) {
    int left = 0, maxLength = 0;
    Map<Character, Integer> windowCounts = new HashMap<>();
    
    for (int right = 0; right < s.length(); right++) {
        char inChar = s.charAt(right);
        windowCounts.put(inChar, windowCounts.getOrDefault(inChar, 0) + 1);
        
        // Contract window from left while invalid
        while (/* window is invalid condition */ false) {
            char outChar = s.charAt(left);
            windowCounts.put(outChar, windowCounts.get(outChar) - 1);
            if (windowCounts.get(outChar) == 0) windowCounts.remove(outChar);
            left++;
        }
        
        // Update answer with valid window length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}`,
    topProblems: ["Longest Substring Without Repeating Characters", "Minimum Window Substring", "Sliding Window Maximum", "Find All Anagrams in a String"]
  },
  {
    id: "fast-slow-pointers",
    name: "3. Fast & Slow Pointers (Hare & Tortoise)",
    icon: "cpu",
    whenToUse: "Detecting cycles, finding the midpoint of a linked list, or finding circular loop lengths.",
    indicators: [
      "Linked List Cycle detection",
      "Find middle of Linked List in one pass",
      "Palindrome Linked List",
      "Happy Number calculation"
    ],
    javaTemplate: `public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) return false;
    
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;        // 1 step
        fast = fast.next.next;   // 2 steps
        
        if (slow == fast) {
            return true; // Cycle detected!
        }
    }
    return false;
}`,
    topProblems: ["Linked List Cycle I & II", "Middle of the Linked List", "Happy Number", "Find the Duplicate Number"]
  },
  {
    id: "merge-intervals",
    name: "4. Merge Intervals & Overlap Detection",
    icon: "layers",
    whenToUse: "Dealing with time intervals, meeting rooms, or overlapping ranges.",
    indicators: [
      "Merge overlapping intervals",
      "Insert interval into sorted list",
      "Meeting Rooms I & II (minimum conference rooms required)",
      "Employee free time"
    ],
    javaTemplate: `public int[][] mergeIntervals(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    
    // 1. Sort by start time
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    
    List<int[]> merged = new ArrayList<>();
    int[] current = intervals[0];
    merged.add(current);
    
    for (int[] interval : intervals) {
        if (interval[0] <= current[1]) { // Overlap detected!
            current[1] = Math.max(current[1], interval[1]);
        } else {
            current = interval;
            merged.add(current);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}`,
    topProblems: ["Merge Intervals", "Insert Interval", "Non-overlapping Intervals", "Meeting Rooms II"]
  },
  {
    id: "monotonic-stack",
    name: "5. Monotonic Stack & Queue",
    icon: "cpu",
    whenToUse: "Finding the Next Greater Element, Next Smaller Element, or computing areas under histograms.",
    indicators: [
      "Next greater / smaller element for each index in O(N)",
      "Daily temperatures",
      "Largest rectangle in histogram",
      "Stock span problem"
    ],
    javaTemplate: `public int[] nextGreaterElement(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    Arrays.fill(res, -1);
    
    // Decreasing stack of indices
    Deque<Integer> stack = new ArrayDeque<>();
    
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
            int prevIdx = stack.pop();
            res[prevIdx] = nums[i]; // Found next greater element
        }
        stack.push(i);
    }
    return res;
}`,
    topProblems: ["Daily Temperatures", "Next Greater Element I & II", "Largest Rectangle in Histogram", "Trapping Rain Water"]
  },
  {
    id: "tree-bfs",
    name: "6. Tree & Graph BFS (Level-by-Level)",
    icon: "sparkles",
    whenToUse: "Level-order traversal, shortest path in unweighted graphs, finding closest nodes.",
    indicators: [
      "Binary tree level order traversal / zigzag",
      "Shortest transformation sequence (Word Ladder)",
      "Rotting oranges (multisource BFS)",
      "Minimum depth of binary tree"
    ],
    javaTemplate: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size(); // Freeze current level size!
        List<Integer> currentLevel = new ArrayList<>();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(currentLevel);
    }
    return result;
}`,
    topProblems: ["Binary Tree Level Order Traversal", "Word Ladder", "Rotting Oranges", "Binary Tree Zigzag Level Order"]
  },
  {
    id: "two-heaps",
    name: "7. Two Heaps Pattern",
    icon: "cpu",
    whenToUse: "Tracking the median or dynamic percentile of a changing number stream.",
    indicators: [
      "Find median from data stream",
      "Sliding window median",
      "IPO / maximizing capital"
    ],
    javaTemplate: `// Max-Heap for lower 50%, Min-Heap for upper 50%
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

public void addNum(int num) {
    maxHeap.offer(num);
    minHeap.offer(maxHeap.poll());
    if (maxHeap.size() < minHeap.size()) {
        maxHeap.offer(minHeap.poll());
    }
}`,
    topProblems: ["Find Median from Data Stream", "Sliding Window Median", "IPO"]
  },
  {
    id: "binary-search-answer",
    name: "8. Binary Search on Answer Space",
    icon: "layers",
    whenToUse: "When asking for the 'minimum of the maximum' or 'maximum of the minimum' and the answer has a monotonic condition.",
    indicators: [
      "Can we finish in X time? If yes, can we finish in < X time?",
      "Capacity to ship packages within D days",
      "Split array largest sum",
      "Koko eating bananas"
    ],
    javaTemplate: `public int searchOnAnswer(int[] arr, int target) {
    int low = getMinPossibleAnswer(arr);
    int high = getMaxPossibleAnswer(arr);
    int ans = high;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isValid(arr, mid, target)) {
            ans = mid;
            high = mid - 1; // Try smaller answer
        } else {
            low = mid + 1;  // Must increase answer
        }
    }
    return ans;
}`,
    topProblems: ["Koko Eating Bananas", "Capacity To Ship Packages Within D Days", "Split Array Largest Sum", "Find Peak Element"]
  }
];
