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
        interviewPrompt: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
          {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1]."
          },
          {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]",
            explanation: "nums[1] + nums[2] == 2 + 4 == 6, so indices [1, 2] are returned."
          },
          {
            input: "nums = [3,3], target = 6",
            output: "[0,1]",
            explanation: "Both elements have value 3. We cannot reuse the same index, but two distinct elements with value 3 form the valid pair."
          }
        ],
        constraints: [
          "2 <= nums.length <= 10^4 (Rules out O(N^3); O(N^2) brute force executes 10^8 ops and runs dangerously close to 1.0s limit; optimal must be O(N))",
          "-10^9 <= nums[i] <= 10^9 (Values fit in standard 32-bit signed int; values can be negative)",
          "-10^9 <= target <= 10^9 (Target can be negative, zero, or positive)",
          "Only one valid answer exists."
        ],
        memoryHook: {
          triggerKeywords: ["Find pair summing to target", "Unsorted array", "Return original indices", "Exact one solution"],
          mnemonic: "The Complement Ledger: Don't look forward with nested loops; look backward into your ledger for (Target - Current)!",
          mentalFormula: "Map<Value, Index> -> For each x: if map.containsKey(target - x) return [map.get(target-x), i]; map.put(x, i);"
        },
        howToKnow: [
          {
            step: "1. The Naive Trap (Why Brute Force Fails)",
            desc: "Beginners immediately reach for nested loops: `for i: for j: if nums[i] + nums[j] == target`. At N = 10^4, N(N-1)/2 = 50 million operations. In multi-tenant cloud judges or heavy suites, this risks a Time Limit Exceeded (TLE) and signals lack of algorithmic maturity."
          },
          {
            step: "2. The Mathematical Invariant & Clue",
            desc: "For any number x, there is only ONE possible partner in the entire universe that can make the sum target: `complement = target - x`. Finding that complement is an EQUALITY SEARCH."
          },
          {
            step: "3. 4-Stage Decision Logic Gate",
            desc: "Q1: Is the array sorted? -> NO. Q2: Can we sort it? -> Sorting costs O(N log N) AND destroys original indices. Q3: What data structure gives O(1) equality lookup? -> A HashMap. Q4: Trade O(N) space for O(N) linear time."
          },
          {
            step: "4. The 'Aha!' Single-Pass Breakthrough",
            desc: "You do NOT need two passes! As you iterate left to right, check if the complement was already seen in the map. If not, record the current number. When the second partner is reached, its complement is already waiting in the map."
          }
        ],
        realWorldScenario: "E-Commerce Checkout & FinTech Order Matching: Matching buyer bid and seller ask orders at exact clearing prices in electronic stock exchanges, and gift card / coupon balance exhaustion engines.",
        disguisedVariants: [
          {
            title: "Elevator Safe Capacity Interlock",
            prompt: "An industrial elevator has maximum weight limit W. Given a queue of incoming crates of various weights, determine if any two crates can be loaded together to hit exactly 100% capacity.",
            howItMaps: "Crate weights are nums and limit W is target. Return true or crate indices using the identical HashMap complement check."
          },
          {
            title: "Flight Duration Entertainment Matcher",
            prompt: "You are designing an in-flight movie recommendation engine for a flight of duration D minutes. Find two distinct movies whose runtimes add up to exactly D - 30 minutes.",
            howItMaps: "Target is D - 30. Movie runtimes are nums. We find the two movie IDs that sum to target in O(N) time."
          }
        ],
        transferableProblems: [
          "Two Sum II - Input Array Is Sorted (LeetCode 167 - Converging Two Pointers)",
          "3Sum (LeetCode 15 - Sorting + Two Pointers)",
          "Subarray Sum Equals K (LeetCode 560 - Prefix Sums + HashMap)"
        ],
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
        interviewPrompt: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
        examples: [
          {
            input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
            output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
            explanation: '"bat" has no anagrams in the list. "nat" and "tan" both have {a:1, n:1, t:1}. "ate", "eat", and "tea" share {a:1, e:1, t:1}.'
          },
          {
            input: 'strs = [""]',
            output: '[[""]]',
            explanation: 'An array with a single empty string returns a list containing that single empty string.'
          },
          {
            input: 'strs = ["a"]',
            output: '[["a"]]',
            explanation: 'Single-character words form single-element anagram clusters.'
          }
        ],
        constraints: [
          "1 <= strs.length <= 10^4 (Total words; quadratic pairwise comparison O(N^2 * K) = 10^8 ops is too slow)",
          "0 <= strs[i].length <= 100 (Max word length K; K is small, making K log K sort fast)",
          "strs[i] consists of lowercase English letters only.",
          "Words can be completely identical."
        ],
        memoryHook: {
          triggerKeywords: ["Group words with same letters", "Anagram clusters", "Order-independent character counts"],
          mnemonic: "The Canonical Fingerprint Rule: Two anagrams appear completely different, but once sorted or frequency-counted, they share the exact same canonical fingerprint key!",
          mentalFormula: "Map<Fingerprint, List<String>> -> For each word: key = sort(word) -> map.computeIfAbsent(key, k -> new ArrayList<>()).add(word); return new ArrayList<>(map.values());"
        },
        howToKnow: [
          {
            step: "1. The Naive Trap (Pairwise Comparison)",
            desc: "Testing every pair of words with `isAnagram(s1, s2)` requires N(N-1)/2 comparisons. For 10,000 words, that is 50,000,000 checks, leading to severe slowdowns or TLE."
          },
          {
            step: "2. Equivalence Class Mathematical Property",
            desc: "Anagrams form a mathematical equivalence class: transitive, symmetric, and reflexive. Every equivalence class has a unique canonical representation."
          },
          {
            step: "3. Choosing the Canonical Key",
            desc: "Either sort characters in O(K log K) (fast for K <= 100) or count character frequencies in an int[26] array in O(K) time. Use the sorted string as a HashMap key."
          },
          {
            step: "4. Single-Pass Grouping",
            desc: "Map canonical key -> List of original words. In Java, `map.computeIfAbsent(key, k -> new ArrayList<>()).add(word)` groups everything in a single linear pass!"
          }
        ],
        realWorldScenario: "Search Engine Spell-Correction & Bio-Informatics: Grouping typo variations in Google Search queries, detecting plagiarized paragraphs with rearranged words, and classifying genomic k-mer nucleotide sequences in DNA analysis.",
        disguisedVariants: [
          {
            title: "Genomic Codon Isomer Clustering",
            prompt: "Given an array of gene sequences where mutations can permute base pairs, group all sequences that contain the identical nucleotide composition.",
            howItMaps: "Nucleotide sequence letters map to characters. Find the canonical sorted sequence and group via HashMap."
          },
          {
            title: "Social Media Duplicate Bot Ring Identification",
            prompt: "Identify groups of automated bot accounts that generate usernames by permuting a fixed set of dictionary syllables.",
            howItMaps: "Sort each username's syllables/characters and cluster bot accounts under identical hash buckets."
          }
        ],
        transferableProblems: [
          "Valid Anagram (LeetCode 242 - Frequency count equality)",
          "Find All Anagrams in a String (LeetCode 438 - Sliding Window + Frequency Array)",
          "Group Shifted Strings (LeetCode 249 - Normalized difference key)"
        ],
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
        timeComplexity: "O(N * K log K) where N = words and K = max word length",
        spaceComplexity: "O(N * K) to store clustered lists in the HashMap",
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
        interviewPrompt: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets. You can return the answer in any order.`,
        examples: [
          {
            input: "nums = [-1,0,1,2,-1,-4]",
            output: "[[-1,-1,2],[-1,0,1]]",
            explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. Distinct unique triplets are [-1,0,1] and [-1,-1,2]."
          },
          {
            input: "nums = [0,1,1]",
            output: "[]",
            explanation: "The only possible triplet does not sum up to 0."
          },
          {
            input: "nums = [0,0,0]",
            output: "[[0,0,0]]",
            explanation: "The only possible triplet sums up to 0."
          }
        ],
        constraints: [
          "3 <= nums.length <= 3000 (O(N^3) triple loops = 27 billion operations -> massive TLE! O(N^2) = 9 million operations -> easily passes in ~20ms)",
          "-10^5 <= nums[i] <= 10^5 (Sum can be negative or positive; 3 * 10^5 fits comfortably in 32-bit signed int)",
          "No duplicate triplets in output list"
        ],
        memoryHook: {
          triggerKeywords: ["Sum of 3 numbers equals 0", "Unique triplets", "Avoid duplicate combinations"],
          mnemonic: "Fix One, Two-Pointer the Rest: Sort first! Freeze nums[i], then converge left & right like a pincer. Skip duplicates at every move!",
          mentalFormula: "Arrays.sort(nums); for i in 0..n-3: if (nums[i] > 0) break; if (i > 0 && nums[i] == nums[i-1]) continue; left = i+1, right = n-1; while (left < right): check sum vs -nums[i]; skip duplicates on both ends!"
        },
        howToKnow: [
          {
            step: "1. The O(N^3) Brute Force Trap",
            desc: "3 nested loops checking every i, j, k takes O(N^3). With N = 3000, 3000^3 / 6 = 4.5 billion operations. It will freeze the judge and instantly fail your interview."
          },
          {
            step: "2. The Sort-First Insight",
            desc: "The problem does NOT ask for original indices! It asks for values. This means we can SORT the array in O(N log N) without losing anything."
          },
          {
            step: "3. Reducing 3Sum to Two Pointers",
            desc: "Once sorted, iterate i from 0 to N-1. Now the problem becomes: find two numbers in `nums[i+1...N-1]` that sum to `-nums[i]`. Because the sub-array is sorted, two converging pointers (left & right) solve this in linear O(N) time."
          },
          {
            step: "4. The Duplicate Trap",
            desc: "The most common bug is returning duplicate triplets. Because the array is sorted, duplicates are adjacent! Simply skip `while (nums[i] == nums[i-1])` and `while (nums[left] == nums[left+1])`."
          }
        ],
        realWorldScenario: "FinTech Triangle Arbitrage & Ledger Reconciliation: Detecting currency exchange cycles across 3 pairs (e.g. USD -> EUR -> GBP -> USD) where the net exchange differential settles to zero, and balancing 3-legged accounting transactions.",
        disguisedVariants: [
          {
            title: "Triangular Structural Load Nullification",
            prompt: "In a civil engineering truss, find all combinations of three force vectors along an axial strut that sum to zero to guarantee structural equilibrium.",
            howItMaps: "Force scalars represent nums. Find unique triplets summing to 0 using Sort + Converging Two Pointers."
          },
          {
            title: "Triple Trade Settlement Offset",
            prompt: "Given an exchange with multiple customer debt and credit positions, find all triplets of parties whose balances net out to exactly zero for peer-to-peer clearing.",
            howItMaps: "Balances are nums. Finding 3 parties that cancel out is standard 3Sum."
          }
        ],
        transferableProblems: [
          "Two Sum (LeetCode 1 - Complement Lookup)",
          "3Sum Closest (LeetCode 16 - Min absolute difference tracking)",
          "4Sum (LeetCode 18 - K-Sum general recursive template)"
        ],
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
        timeComplexity: "O(N^2) dominated by N outer iterations * O(N) two-pointer scan",
        spaceComplexity: "O(1) extra space (ignoring the memory used for output list)",
        edgeCases: ["Fewer than 3 elements", "All zeros [0,0,0,0]", "No valid triplet exists", "Multiple identical values requiring duplicate skipping"],
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
        interviewPrompt: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store. Notice that you may not slant the container.`,
        examples: [
          {
            input: "height = [1,8,6,2,5,4,8,3,7]",
            output: "49",
            explanation: "The vertical lines are at indices 1 (height 8) and 8 (height 7). The width is 8 - 1 = 7. The container height is limited by min(8, 7) = 7. Total water = 7 * 7 = 49."
          },
          {
            input: "height = [1,1]",
            output: "1",
            explanation: "Width is 1, min height is 1. Max area is 1 * 1 = 1."
          }
        ],
        constraints: [
          "n == height.length",
          "2 <= n <= 10^5 (Optimal solution must run in linear O(N); O(N^2) double loop = 10^10 ops -> instant TLE)",
          "0 <= height[i] <= 10^4",
          "Container width is index distance (right - left)"
        ],
        memoryHook: {
          triggerKeywords: ["Maximize container area", "Two vertical lines", "min(height[l], height[r]) * width", "Non-slanted water barrier"],
          mnemonic: "The Shorter Bar Bottleneck: Width starts at its absolute maximum at the boundaries. Moving inward decreases width! The ONLY way a smaller width can beat the max is if we find a TALLER bar. Therefore, always discard the shorter bar!",
          mentalFormula: "left = 0, right = n - 1; while (left < right): area = (right - left) * min(h[l], h[r]); maxArea = max(maxArea, area); if (h[left] < h[right]) left++; else right--;"
        },
        howToKnow: [
          {
            step: "1. The O(N^2) Nested Loop Instinct",
            desc: "The naive instinct checks all N(N-1)/2 pairs of lines. For N = 100,000, that is 5,000,000,000 comparisons, crashing on the 1-second timeout."
          },
          {
            step: "2. The Mathematical Constraint & Invariant",
            desc: "Area = (right - left) * min(h[left], h[right]). At the start (left=0, right=n-1), width is as wide as possible. As pointers converge, width strictly decreases."
          },
          {
            step: "3. The Greedy Contraction Logic",
            desc: "If height[left] < height[right], height[left] is the bottleneck for all containers formed with 'right', 'right-1', 'right-2'... Keeping 'left' while moving 'right' inward can NEVER produce a larger area because width decreases and height is still capped at height[left]. Thus, 'left' can be permanently eliminated."
          },
          {
            step: "4. The Guaranteed O(N) Convergence",
            desc: "Every comparison moves either left or right inward by 1 step. Total steps = N - 1. Strict O(N) time with O(1) auxiliary memory."
          }
        ],
        realWorldScenario: "Solar Panel & Antenna Array Optimization: Maximizing optical aperture or radio reception angles across pairs of communication masts over varying terrain elevations, and warehouse cargo buffer containment volume optimization.",
        disguisedVariants: [
          {
            title: "Highway Billboard Viewing Angle",
            prompt: "Given billboard heights along a straight highway, find two billboards that maximize the visible advertising corridor area between them.",
            howItMaps: "Highway distance is width, billboard heights are lines. Apply identical Two-Pointer Greedy Contraction."
          },
          {
            title: "Hydraulic Dam Sluice Gate Spacing",
            prompt: "Determine the placement of two movable floodgates along a riverbank to hold the maximum volume of emergency storm run-off.",
            howItMaps: "Water volume is constrained by the shorter gate height multiplied by distance. Solved with Container With Most Water."
          }
        ],
        transferableProblems: [
          "Trapping Rain Water (LeetCode 42 - Two pointers with prefix/suffix max)",
          "Two Sum II (LeetCode 167 - Two pointers on sorted array)"
        ],
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
        interviewPrompt: `Given a string s, find the length of the longest substring without repeating characters.`,
        examples: [
          {
            input: 's = "abcabcbb"',
            output: "3",
            explanation: 'The answer is "abc", with the length of 3.'
          },
          {
            input: 's = "bbbbb"',
            output: "1",
            explanation: 'The answer is "b", with the length of 1.'
          },
          {
            input: 's = "pwwkew"',
            output: "3",
            explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
          }
        ],
        constraints: [
          "0 <= s.length <= 5 * 10^4 (Requires O(N) sliding window; O(N^3) all substrings = 1.25 * 10^14 ops -> TLE)",
          "s consists of English letters, digits, symbols and spaces.",
          "Empty string input is valid and should return 0."
        ],
        memoryHook: {
          triggerKeywords: ["Longest substring", "Without repeating characters", "Contiguous unique segment", "Window expansion"],
          mnemonic: "The Sliding Rubber Band & Fast-Forward Pin: Expand the right edge. If you hit a duplicate that is inside your current window, snap the left edge directly past its previous position!",
          mentalFormula: "int[128] lastSeen = -1; left = 0; for (right = 0..n-1): char c = s.charAt(right); if (lastSeen[c] >= left) left = lastSeen[c] + 1; lastSeen[c] = right; maxLen = max(maxLen, right - left + 1);"
        },
        howToKnow: [
          {
            step: "1. Substring vs Subsequence Clue",
            desc: "The problem asks for a SUBSTRING (contiguous characters). Contiguous intervals over a sequence strongly signal a Sliding Window."
          },
          {
            step: "2. The Duplicate Detection Invariant",
            desc: "As the right pointer expands, we only need to know: has this character appeared inside the current window [left, right]? Instead of scanning the window in O(W), store each character's last seen index."
          },
          {
            step: "3. Direct Jump vs Slow Left Increments",
            desc: "Many candidates do `while (set.contains(c)) set.remove(s[left++])`. While O(N) amortized, jumping directly with `left = Math.max(left, lastSeen[c] + 1)` performs only 1 operation per duplicate."
          },
          {
            step: "4. Array vs HashMap JVM Optimization",
            desc: "For ASCII text, an `int[128]` array eliminates object allocation, boxing, and hash table collisions, making execution 50x faster."
          }
        ],
        realWorldScenario: "Network Protocol Framing & Telemetry: Finding the longest uninterrupted transmission segment with distinct packet headers in high-throughput gRPC connections, and LZW / Deflate stream compression.",
        disguisedVariants: [
          {
            title: "Longest Session of Unique Website Visitors",
            prompt: "Given a stream of incoming visitor IDs, find the maximum consecutive duration where no single user ID appeared more than once.",
            howItMaps: "Visitor IDs map to characters. Maintain a sliding window with a HashMap of last-seen timestamps."
          },
          {
            title: "Audio Frequency Non-Harmonic Window",
            prompt: "Analyze a digital audio track to find the longest time window where every frequency bin has an amplitude detected at most once.",
            howItMaps: "Frequency bins represent characters. Sliding window with last-seen array."
          }
        ],
        transferableProblems: [
          "Longest Substring with At Most K Distinct Characters (LeetCode 340)",
          "Max Consecutive Ones III (LeetCode 1004 - Sliding window flip count)",
          "Minimum Window Substring (LeetCode 76 - Two-pointer sliding window)"
        ],
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
        interviewPrompt: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
        examples: [
          {
            input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
            output: "6",
            explanation: "The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are trapped in the valleys between bars."
          },
          {
            input: "height = [4,2,0,3,2,5]",
            output: "9",
            explanation: "Between bar 4 at index 0 and bar 5 at index 5, total trapped water across indices 1, 2, 3, 4 is 2 + 4 + 1 + 2 = 9 units."
          }
        ],
        constraints: [
          "n == height.length",
          "1 <= n <= 2 * 10^4 (Requires linear O(N) time)",
          "0 <= height[i] <= 10^5 (Heights are non-negative)",
          "Water trapped is non-negative at every column"
        ],
        memoryHook: {
          triggerKeywords: ["Elevation map", "Trap rain water", "Bars with width 1", "Puddles between peaks"],
          mnemonic: "The Two-Sided Dam Bottleneck: Water at any column is bounded by min(maxLeft, maxRight) - height[i]. Always advance the pointer on the LOWER side, because that side is the true limiting barrier!",
          mentalFormula: "l = 0, r = n - 1, maxL = 0, maxR = 0; while (l < r): if (h[l] <= h[r]) { if (h[l] >= maxL) maxL = h[l]; else ans += maxL - h[l]; l++; } else { if (h[r] >= maxR) maxR = h[r]; else ans += maxR - h[r]; r--; }"
        },
        howToKnow: [
          {
            step: "1. The Column-by-Column Invariant",
            desc: "Instead of trying to calculate puddles horizontally, think vertically: how much water rests on top of column i? Column i can hold `min(maxLeft, maxRight) - height[i]` units of water."
          },
          {
            step: "2. The O(N) Space Solution (Prefix/Suffix Arrays)",
            desc: "You can precompute `leftMax[i]` from left to right and `rightMax[i]` from right to left in two passes. Then calculate water in a third pass. This is O(N) time and O(N) space."
          },
          {
            step: "3. The Two-Pointer O(1) Space Optimization",
            desc: "Notice: if `height[left] <= height[right]`, we know with 100% mathematical certainty that the water at `left` is trapped by `maxLeft`, because whatever `maxRight` is, it is at least `height[right] >= height[left] >= maxLeft`. The bottleneck at `left` is completely determined!"
          },
          {
            step: "4. Closing the Pincer",
            desc: "Move inward from the lower side. This gives a single pass, strict O(N) time and true O(1) auxiliary space, which delights FAANG interviewers."
          }
        ],
        realWorldScenario: "GIS Flood Plain Modeling & Civil Drainage: Predicting storm run-off containment volumes in topographical digital elevation models (DEMs) for urban flood prevention, and microfluidic reservoir capacity calculations.",
        disguisedVariants: [
          {
            title: "CNC Component Fluid Retention",
            prompt: "Given a 1D cross-section of a machined mechanical valve with varying structural rib heights, calculate the total cooling lubricant trapped when submerged.",
            howItMaps: "Rib heights correspond to elevation bars. Trapped lubricant volume is Trapping Rain Water."
          },
          {
            title: "Thermal Energy Heat Sink Trapping",
            prompt: "Calculate trapped thermal air pockets between cooling fins of varying heights on a server motherboard heat sink.",
            howItMaps: "Fins are elevation bars. Trapped pockets calculated via min(leftMax, rightMax) - height."
          }
        ],
        transferableProblems: [
          "Container With Most Water (LeetCode 11 - Two pointers boundary contraction)",
          "Product of Array Except Self (LeetCode 238 - Prefix and suffix array accumulation)",
          "Largest Rectangle in Histogram (LeetCode 84 - Monotonic stack)"
        ],
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
      },
      {
        id: "merge-intervals",
        title: "Merge Overlapping Intervals",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Google", "Microsoft", "Bloomberg"],
        leetcodeNumber: 56,
        pattern: "Interval Sorting & Greedy Merge",
        authorTag: "FAANG Standard",
        summary: "Given an array of intervals [start, end], merge all overlapping intervals into non-overlapping intervals.",
        interviewPrompt: `Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
        examples: [
          {
            input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
            output: "[[1,6],[8,10],[15,18]]",
            explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
          },
          {
            input: "intervals = [[1,4],[4,5]]",
            output: "[[1,5]]",
            explanation: "Intervals [1,4] and [4,5] are considered overlapping because they touch at border point 4."
          }
        ],
        constraints: [
          "1 <= intervals.length <= 10^4 (Sorting takes O(N log N) which executes in ~15ms; quadratic interval comparison would be too slow)",
          "intervals[i].length == 2",
          "0 <= start_i <= end_i <= 10^4",
          "Intervals are not necessarily sorted upon arrival"
        ],
        memoryHook: {
          triggerKeywords: ["Merge overlapping intervals", "Start and end times", "Non-overlapping intervals", "Temporal ranges"],
          mnemonic: "Sort Starts, Stretch Ends: Sort by start time ascending. If next starts before current ends (next[0] <= curr[1]), stretch curr[1] = max(curr[1], next[1]); else seal current and start new!",
          mentalFormula: "Arrays.sort(intervals, (a,b) -> Integer.compare(a[0], b[0])); for each next: if (next[0] <= curr[1]) curr[1] = Math.max(curr[1], next[1]); else add next to merged;"
        },
        disguisedVariants: [
          {
            title: "AWS EC2 Reserved Instance Billing Consolidation",
            prompt: "Given start and end timestamps of cloud server reservations across multiple accounts, combine overlapping reservation windows into minimal billable blocks.",
            howItMaps: "Server reservation blocks represent intervals. Sort by start timestamp and merge overlapping active windows."
          },
          {
            title: "Google Calendar Unified Busy-Time Generator",
            prompt: "A user syncs multiple personal and corporate calendars. Generate a single consolidated schedule of busy time intervals to present to clients.",
            howItMaps: "Calendar event start and end times represent intervals. Merging overlapping meetings yields the busy blocks."
          }
        ],
        intuition: "Sort intervals by their start times. Iterate through them: if the current interval starts before or when the previous interval ends (`curr[0] <= prev[1]`), they overlap! Merge them by stretching `prev[1] = Math.max(prev[1], curr[1])`. Otherwise, push `curr` as a new disjoint interval.",
        howToThink: [
          {
            step: "1. Recognize the Spatial / Temporal Invariant",
            desc: "When dealing with intervals, timestamps, or ranges, elements are unordered by default. Sorting by start time immediately transforms a 2D constraint into a linear 1D sweep."
          },
          {
            step: "2. The Overlap Condition",
            desc: "Once sorted, if interval B starts after interval A finishes (B.start > A.end), no future interval can ever overlap with A either. You can safely seal A and move to B."
          },
          {
            step: "3. Greedy In-Place Merging",
            desc: "Keep a pointer or active list of merged intervals. If overlap occurs, update the merged interval's end to `Math.max(merged.end, next.end)`."
          },
          {
            step: "4. Java Return Type Trap",
            desc: "The problem returns `int[][]`. Collect results into a `List<int[]>` first, then convert with `result.toArray(new int[result.size()][])`."
          }
        ],
        realWorldScenario: "Calendar scheduling in Google Calendar or Outlook to compute busy meeting room windows, and AWS EC2 reserved instance consolidation where overlapping server reservation blocks are grouped for billing.",
        transferableProblems: [
          "Non-overlapping Intervals (LeetCode 435 - Greedy min removals)",
          "Meeting Rooms II (LeetCode 253 - Min rooms required using Min-Heap)",
          "Insert Interval (LeetCode 57 - Inserting into already sorted intervals)"
        ],
        code: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals == null || intervals.length <= 1) {
            return intervals;
        }

        // 1. Sort intervals by start time ascending
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];
        merged.add(current);

        for (int i = 1; i < intervals.length; i++) {
            int[] next = intervals[i];

            if (next[0] <= current[1]) {
                // Overlap exists: stretch current interval's end time
                current[1] = Math.max(current[1], next[1]);
            } else {
                // Disjoint interval: start tracking new current
                current = next;
                merged.add(current);
            }
        }

        // 2. Convert List<int[]> back to int[][]
        return merged.toArray(new int[merged.size()][]);
    }
}`,
        timeComplexity: "O(N log N) dominated by sorting",
        spaceComplexity: "O(N) for the merged output list",
        edgeCases: ["Single interval [[1,4]]", "Completely nested intervals [[1,10],[2,5]]", "Already disjoint intervals [[1,2],[3,4]]", "Identical intervals [[1,4],[1,4]]"],
        javaTip: "Always use `merged.toArray(new int[merged.size()][])` instead of manually iterating to build the 2D primitive array."
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
        interviewPrompt: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.`,
        examples: [
          {
            input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
            output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
            explanation: "LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1, makes 1 MRU\nlRUCache.put(3, 3); // LRU key 2 is evicted, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key 1 is evicted, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4"
          }
        ],
        constraints: [
          "1 <= capacity <= 3000",
          "0 <= key <= 10^4",
          "0 <= value <= 10^5",
          "At most 2 * 10^5 calls will be made to get and put",
          "Strict O(1) time complexity requirement for both operations"
        ],
        memoryHook: {
          triggerKeywords: ["Least Recently Used", "O(1) get and put", "Evict oldest on capacity breach", "Cache hit ordering"],
          mnemonic: "The VIP Red Carpet & Back Door: HashMap gives instant O(1) seat lookup. Doubly Linked List lets you pull any guest out and move them to the VIP head in O(1), or kick out the tail guest when full!",
          mentalFormula: "Map<Integer, Node> + DoublyLinkedList with dummy head & tail; get(key): if present moveToHead(node), return node.val; put(key, val): if present update & moveToHead; else if full remove tail & map.remove; add new to head & map.put;"
        },
        howToKnow: [
          {
            step: "1. The Conflicting Requirements",
            desc: "Requirement 1: O(1) key lookup -> only a Hash Table can do this. Requirement 2: O(1) ordering & eviction -> queues/arrays take O(N) to remove an item from the middle. What data structure allows O(1) deletion from anywhere? A Doubly Linked List with direct node pointers!"
          },
          {
            step: "2. The Node Pointer Map Pairing",
            desc: "Instead of storing primitives in the map, store references to the DLL nodes: `Map<Integer, Node>`. When `get(key)` is called, the map hands you the node directly in O(1), allowing you to rewire pointers in O(1)."
          },
          {
            step: "3. Sentinel Dummy Head & Tail",
            desc: "Boundary null-checks cause 90% of interview bugs. Create `head = new Node(0,0)` and `tail = new Node(0,0)` wired together. All real elements live between them. Never check for null!"
          },
          {
            step: "4. Bidirectional Key Link",
            desc: "The node must store BOTH key and value: `class Node { int key, value; Node prev, next; }`. Why? When evicting `tail.prev`, you need its key to remove it from the HashMap in O(1)!"
          }
        ],
        realWorldScenario: "Redis in-memory caching engine, Linux OS virtual memory page table eviction, and MySQL InnoDB buffer pool management.",
        disguisedVariants: [
          {
            title: "Browser Tab History Memory Saver",
            prompt: "Design Chrome's tab discarding mechanism: when memory exceeds threshold, discard the tab that was least recently focused.",
            howItMaps: "Focusing a tab is get/put (mark MRU). Discarding is tail eviction. Solved with LRU Cache."
          },
          {
            title: "CDN Edge Asset Cache",
            prompt: "A content delivery network edge server has 500GB SSD cache. Keep popular video chunks hot; purge the least recently accessed chunks when full.",
            howItMaps: "Direct production implementation of an LRU Cache with TTL extensions."
          }
        ],
        transferableProblems: [
          "LFU Cache (LeetCode 460 - Least Frequently Used with double frequency lists)",
          "Design In-Memory File System (LeetCode 588 - Trie + HashMap)"
        ],
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
        interviewPrompt: `Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.`,
        examples: [
          {
            input: "temperatures = [73,74,75,71,69,72,76,73]",
            output: "[1,1,4,2,1,1,0,0]",
            explanation: "Day 0 (73) -> Day 1 (74 is warmer) -> 1 day. Day 2 (75) -> Day 6 (76 is warmer) -> 4 days."
          },
          {
            input: "temperatures = [30,40,50,60]",
            output: "[1,1,1,0]",
            explanation: "Every day is warmer than the previous day until the last day."
          }
        ],
        constraints: [
          "1 <= temperatures.length <= 10^5 (Must be solved in O(N); O(N^2) brute force nested loops = 10^10 ops -> TLE)",
          "30 <= temperatures[i] <= 100",
          "Default value for non-existent warmer day is 0"
        ],
        memoryHook: {
          triggerKeywords: ["Next warmer day", "Next greater element", "Days to wait", "Monotonic order"],
          mnemonic: "The Decreasing Waiting Room: Keep a stack of indices waiting for someone warmer. As soon as a warmer temperature arrives, it answers and resolves everyone cooler on top of the stack!",
          mentalFormula: "Deque<Integer> stack = new ArrayDeque<>(); for i in 0..n-1: while (!stack.isEmpty() && temp[i] > temp[stack.peek()]): int prev = stack.pop(); result[prev] = i - prev; stack.push(i);"
        },
        howToKnow: [
          {
            step: "1. The Quadratic Brute Force",
            desc: "For each day i, scanning days i+1...n-1 takes O(N^2). For N = 100,000, that is 5 billion operations."
          },
          {
            step: "2. The 'Next Greater Element' Signal",
            desc: "Whenever a problem asks for the 'next greater', 'previous smaller', or 'span until higher' value, this is the classic textbook MONOTONIC STACK signature."
          },
          {
            step: "3. Store Indices, Not Values",
            desc: "The output requires day differences `i - prevDay`. Therefore, the stack must store array INDICES, allowing you to compute both the span and look up the temperature `temperatures[stack.peek()]`."
          },
          {
            step: "4. Linear Amortized Analysis",
            desc: "Although there is a while loop inside the for loop, every single index is pushed onto the stack exactly once and popped at most once. Total operations = 2N, giving strict O(N) linear time."
          }
        ],
        realWorldScenario: "Stock market breakout indicator (calculating days until a stock price breaks above resistance), and seismic tremor anomaly monitoring.",
        disguisedVariants: [
          {
            title: "Stock Resistance Breakout Calculator",
            prompt: "Given closing prices of a stock, calculate for each day how many trading sessions elapsed before the price breached a new high.",
            howItMaps: "Stock prices map to temperatures. Solved using a monotonic decreasing stack."
          }
        ],
        transferableProblems: [
          "Next Greater Element I (LeetCode 496 - Monotonic stack + map)",
          "Largest Rectangle in Histogram (LeetCode 84 - Monotonic increasing stack)",
          "Online Stock Span (LeetCode 901 - Monotonic stack streaming)"
        ],
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
      },
      {
        id: "sliding-window-maximum",
        title: "Sliding Window Maximum (Monotonic Deque)",
        difficulty: "Hard",
        companies: ["Google", "Meta", "Amazon", "Citadel", "Bloomberg"],
        leetcodeNumber: 239,
        pattern: "Monotonic Decreasing Deque",
        authorTag: "Sonnet Elite Masterpiece",
        summary: "Given an array of integers nums and a sliding window of size k, return the max sliding window value at each step.",
        interviewPrompt: `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.`,
        examples: [
          {
            input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
            output: "[3,3,5,5,6,7]",
            explanation: "Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7"
          },
          {
            input: "nums = [1], k = 1",
            output: "[1]",
            explanation: "Window of size 1 returns the array element itself."
          }
        ],
        constraints: [
          "1 <= nums.length <= 10^5 (Must be strictly O(N); O(N * k) = 10^10 ops -> TLE)",
          "-10^4 <= nums[i] <= 10^4",
          "1 <= k <= nums.length"
        ],
        memoryHook: {
          triggerKeywords: ["Sliding window of size k", "Max in each window", "Monotonic double-ended queue", "Continuous rolling maximum"],
          mnemonic: "The Greedy Bouncer Rule: If an incoming element is BIGGER than previous elements, those previous elements are older AND smaller. They will NEVER be the window max again! Kick them out from the back!",
          mentalFormula: "Deque<Integer> dq = new ArrayDeque<>(); for (int i = 0; i < n; i++): while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst(); while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast(); dq.offerLast(i); if (i >= k - 1) res[idx++] = nums[dq.peekFirst()];"
        },
        disguisedVariants: [
          {
            title: "Spotify Peak Loudness Normalizer",
            prompt: "In a real-time audio compressor, maintain the peak loudness level over a sliding 2-second audio frame window to adjust dynamic gain without clipping.",
            howItMaps: "Audio frame amplitudes map to nums and frame duration maps to k. Solved via Monotonic Deque."
          },
          {
            title: "AWS CloudWatch Peak Metric Throttling",
            prompt: "Given per-second API request rates, track the maximum burst rate in any rolling 60-second window to trigger auto-scaling alerts.",
            howItMaps: "Rolling window maximum solved with Monotonic Deque in O(N) time."
          }
        ],
        intuition: "Maintain a Deque storing array indices in strictly decreasing order of their corresponding values (`nums[deque.peekFirst()]` is always the window max). When adding `nums[i]`, pop all elements from the back that are smaller than `nums[i]`, because they can never be the maximum again. Remove elements from the front that have expired out of the k-window (`deque.peekFirst() <= i - k`).",
        howToThink: [
          {
            step: "1. Why Brute Force & Max-Heap Fail",
            desc: "Brute force scanning every window takes O(N * k) = 10^10 ops -> TLE! A PriorityQueue / Max-Heap takes O(N log k), but in Java, removing the element sliding out of the window takes O(k) linear time inside PriorityQueue.remove(Object), which degrades to O(N * k). We need strict O(N) linear time."
          },
          {
            step: "2. The 'Useless Element' Principle",
            desc: "If you have an element at index j that is smaller than an incoming element at index i (where j < i), element j is older AND smaller. It will NEVER be the window maximum again! We can permanently purge it."
          },
          {
            step: "3. Monotonic Deque Invariant",
            desc: "By popping smaller elements from the tail, the Deque values are strictly decreasing from head to tail. The front element `deque.peekFirst()` is guaranteed to be the maximum of the current window."
          },
          {
            step: "4. Window Eviction & Output Timing",
            desc: "Pop from head if `deque.peekFirst() <= i - k`. Only record results once the initial window has filled (`i >= k - 1`)."
          }
        ],
        realWorldScenario: "Streaming price anomaly detection in high-frequency trading (recording the max trade price in the last 10 seconds), and real-time audio volume compression in Spotify to normalize peak loudness without distortion.",
        transferableProblems: [
          "Daily Temperatures (LeetCode 739 - Next greater index)",
          "Constrained Subsequence Sum (LeetCode 1425 - DP + Monotonic Deque)",
          "Shortest Subarray with Sum at Least K (LeetCode 862 - Prefix sum + Deque)",
          "Longest Continuous Subarray With Absolute Diff <= Limit (LeetCode 1438)"
        ],
        code: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        int n = nums.length;
        int[] result = new int[n - k + 1];
        int resultIndex = 0;

        // Deque stores INDICES, maintaining values in strictly decreasing order
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Remove indices that are outside the current sliding window [i - k + 1, i]
            while (!deque.isEmpty() && deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }

            // 2. Monotonic maintenance: remove all indices whose values are <= nums[i]
            // They are older AND smaller, so they can never be the maximum!
            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();
            }

            // 3. Add current element index to the back
            deque.offerLast(i);

            // 4. Once the first window of size k is formed, record the maximum
            if (i >= k - 1) {
                result[resultIndex++] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}`,
        timeComplexity: "O(N) - Every index is pushed and popped from the deque at most once",
        spaceComplexity: "O(k) auxiliary memory stored inside the Deque",
        edgeCases: ["k = 1 (result is the identical array)", "k = nums.length (single maximum element)", "All negative numbers (e.g. [-7,-8,-7], k=2)", "Monotonically increasing or decreasing arrays"],
        javaTip: "Store indices, NOT values, in the Deque. Storing indices lets you verify window expiration (`deque.peekFirst() <= i - k`) in O(1) time without extra variables."
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
      },
      {
        id: "agentic-dag-scheduler",
        title: "Agentic DAG Parallel Wave Scheduler",
        difficulty: "Hard",
        companies: ["Google Antigravity", "Anthropic", "OpenAI", "Meta AI"],
        leetcodeNumber: 0,
        pattern: "Kahn's Topological BFS Wave Leveling",
        authorTag: "Sonnet Elite Original",
        summary: "Given N autonomous agent subtasks (0 to N-1) and an array of prerequisite dependencies [taskA, taskB] (meaning taskB must finish before taskA can execute), calculate the minimum number of parallel execution waves required to complete all tasks, or return -1 if an agent circular deadlock exists.",
        interviewPrompt: `You are building an autonomous multi-agent orchestration engine. You are given an integer numTasks representing N subagent tasks numbered from 0 to numTasks - 1.

You are also given a 2D array dependencies where dependencies[i] = [taskA, taskB], indicating that taskB must complete execution before taskA can begin.

Tasks with zero unmet dependencies can run concurrently in parallel during the same execution wave.

Return the minimum number of parallel execution waves required to execute all tasks. If there is a circular deadlock dependency such that not all tasks can complete, return -1.`,
        examples: [
          {
            input: "numTasks = 4, dependencies = [[1,0],[2,0],[3,1],[3,2]]",
            output: "3",
            explanation: "Wave 1: Task 0 executes (no prereqs).\nWave 2: Tasks 1 and 2 execute in parallel (prereq Task 0 complete).\nWave 3: Task 3 executes (prereqs Tasks 1 and 2 complete).\nTotal waves = 3."
          },
          {
            input: "numTasks = 2, dependencies = [[0,1],[1,0]]",
            output: "-1",
            explanation: "Task 0 waits on Task 1 and Task 1 waits on Task 0. Circular deadlock detected -> return -1."
          }
        ],
        constraints: [
          "1 <= numTasks <= 10^5",
          "0 <= dependencies.length <= 2 * 10^5",
          "dependencies[i].length == 2",
          "0 <= taskA, taskB < numTasks and taskA != taskB"
        ],
        memoryHook: {
          triggerKeywords: ["Multi-agent parallel execution", "Prerequisite graph", "Minimum parallel waves", "Deadlock detection"],
          mnemonic: "The Level-Order Kahn's Wave: Queue all nodes with in-degree 0. Each wave pops the ENTIRE queue snapshot (waveSize), decrements neighbors, and increments waveCount! If completedTasks < N, it's a deadlock!",
          mentalFormula: "Build adj & inDegree; queue inDegree==0; while (!queue.isEmpty()) { int sz = queue.size(); waves++; for (sz) { pop, decr neighbors, push if inDegree==0; } } return (done == N) ? waves : -1;"
        },
        disguisedVariants: [
          {
            title: "Distributed Build System Compilation Stage Planner",
            prompt: "Given C++ compilation target files and #include dependencies, determine the minimum parallel compilation stages required for Bazel/Make.",
            howItMaps: "Compile targets are tasks, #include links are dependencies. Waves are parallel compilation stages."
          },
          {
            title: "Microservice Startup Dependency Coordinator",
            prompt: "In a Kubernetes cluster, microservices have boot dependencies on databases and auth providers. Calculate the minimum startup waves.",
            howItMaps: "Direct isomorphic problem to DAG wave leveling."
          }
        ],
        intuition: "Model the agent workflow as a Directed Graph. In each execution 'wave', all agents whose current in-degree is 0 can run concurrently in parallel! Track waves using BFS level-order traversal (queue size per wave). Decrement dependent agents' in-degrees. If total tasks scheduled equals N, return wave count; otherwise a deadlock cycle exists.",
        howToThink: [
          {
            step: "1. Real Agent Engineering Problem",
            desc: "In agentic frameworks (Google Antigravity / LangGraph), subagents depend on tools and previous agent outputs. Running everything sequentially is too slow (wastes 10x latency). Running everything simultaneously crashes due to missing data. We must partition tasks into parallel execution waves."
          },
          {
            step: "2. DAG Topological Invariant",
            desc: "Any agent with in-degree == 0 has ZERO unmet dependencies. It is immediately ready to fire. All zero in-degree tasks at the same level can execute concurrently on separate GPU/CPU worker threads."
          },
          {
            step: "3. Level-Order Wave Counter",
            desc: "At each wave, record `int waveSize = queue.size()`. Loop `waveSize` times to pop and decrement neighbor in-degrees. Increment `waveCount++` after each level completes."
          },
          {
            step: "4. Deadlock / Circular Dependency Detection",
            desc: "If `processedTasks < totalTasks`, at least two subagents are waiting on each other in an infinite deadlock loop! Return -1."
          }
        ],
        realWorldScenario: "The core orchestration loop inside Google Antigravity and Claude Multi-Agent teams: executing parallel web search, code compilation, and database queries in minimum round trips.",
        transferableProblems: [
          "Course Schedule (LeetCode 207 - Kahn's cycle detection)",
          "Course Schedule II (LeetCode 210 - Linear topological order)",
          "Minimum Height Trees (LeetCode 310 - Inward topological trimming)",
          "Parallel Courses (LeetCode 1136 - Parallel semester scheduling)"
        ],
        code: `class Solution {
    public int minParallelExecutionWaves(int numTasks, int[][] dependencies) {
        // 1. Build adjacency graph and in-degree counter
        List<List<Integer>> adj = new ArrayList<>(numTasks);
        for (int i = 0; i < numTasks; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numTasks];

        // dependencies[i] = {dependentTask, prerequisiteTask}
        for (int[] dep : dependencies) {
            int task = dep[0];
            int prereq = dep[1];
            adj.get(prereq).add(task); // prereq -> task
            inDegree[task]++;
        }

        // 2. Queue all agents ready for Wave 1 (in-degree == 0)
        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numTasks; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        int waves = 0;
        int completedTasks = 0;

        // 3. Process each wave in parallel batches
        while (!queue.isEmpty()) {
            int currentWaveSize = queue.size();
            waves++; // Starting a new parallel wave

            for (int i = 0; i < currentWaveSize; i++) {
                int currentTask = queue.poll();
                completedTasks++;

                for (int nextTask : adj.get(currentTask)) {
                    inDegree[nextTask]--;
                    // When all prerequisites are satisfied, queue for next wave
                    if (inDegree[nextTask] == 0) {
                        queue.offer(nextTask);
                    }
                }
            }
        }

        // 4. If all tasks completed, return wave count; otherwise deadlock cycle detected
        return (completedTasks == numTasks) ? waves : -1;
    }
}`,
        timeComplexity: "O(V + E) where V is agent tasks and E is dependency edges",
        spaceComplexity: "O(V + E) for the adjacency list and in-degree tracking",
        edgeCases: ["Zero dependencies (all tasks run in 1 wave)", "Mutual circular deadlock [[0,1],[1,0]] returns -1", "Linear chain of 5 tasks runs in 5 separate waves"],
        javaTip: "Processing the queue in batches using `int waveSize = queue.size()` is the standard pattern for level-order BFS across both trees and DAGs."
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
        id: "word-break",
        title: "Word Break (Dynamic Programming)",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Google", "Bloomberg", "Apple"],
        leetcodeNumber: 139,
        pattern: "1D State Reachability DP",
        authorTag: "FAANG Standard",
        summary: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        interviewPrompt: `Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.`,
        examples: [
          {
            input: 's = "leetcode", wordDict = ["leet","code"]',
            output: "true",
            explanation: 'Return true because "leetcode" can be segmented as "leet code".'
          },
          {
            input: 's = "applepenapple", wordDict = ["apple","pen"]',
            output: "true",
            explanation: 'Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.'
          },
          {
            input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
            output: "false",
            explanation: 'No valid combination of dictionary words segments "catsandog" cleanly.'
          }
        ],
        constraints: [
          "1 <= s.length <= 300",
          "1 <= wordDict.length <= 1000",
          "1 <= wordDict[i].length <= 20",
          "s and wordDict[i] consist of only lowercase English letters.",
          "All the strings of wordDict are unique."
        ],
        memoryHook: {
          triggerKeywords: ["Segment string into dictionary words", "Word break", "Dictionary lookups", "Subproblem reachability"],
          mnemonic: "The Stepping Stone DP: dp[i] is true if prefix length i can be reached. To reach stone i, you need a previous stone dp[j] == true AND substring(j, i) in the dictionary!",
          mentalFormula: "dp = boolean[n+1]; dp[0] = true; for i in 1..n: for j in i-1 down to max(0, i-maxLen): if (dp[j] && set.contains(s.substring(j, i))) { dp[i] = true; break; } return dp[n];"
        },
        disguisedVariants: [
          {
            title: "Google Search Missing-Space Query Segmenter",
            prompt: "When users enter URLs or queries without spaces (e.g. 'newyorktimesbookreview'), segment the query into recognized dictionary terms.",
            howItMaps: "String s is the combined query, wordDict is the search lexicon. Solved via Word Break DP."
          },
          {
            title: "LLM Subword Tokenizer Partitioning",
            prompt: "Verify if a source code snippet can be tokenized into valid vocabulary tokens in a Byte-Pair Encoding (BPE) vocabulary.",
            howItMaps: "Tokens form wordDict; code is s. Reachability DP verifies tokenizability."
          }
        ],
        intuition: "Define `dp[i]` as a boolean indicating whether the prefix `s[0...i-1]` of length `i` can be completely formed using words from the dictionary. Base case: `dp[0] = true` (empty string). For each end index `i`, check all split points `j`: if `dp[j] == true` AND `wordSet.contains(s.substring(j, i))`, then `dp[i] = true`! Break early as soon as any valid split is found.",
        howToThink: [
          {
            step: "1. Convert List to HashSet",
            desc: "In Java, `wordDict` is passed as a `List<String>`. Checking `contains()` on a List takes O(W * L) linear scan. Convert it immediately: `Set<String> wordSet = new HashSet<>(wordDict);` for O(1) average lookup."
          },
          {
            step: "2. The Subproblem Decomposition",
            desc: "A string of length i is valid if there exists some split point j (0 <= j < i) where: (1) prefix s[0..j-1] is already valid (dp[j] == true), AND (2) suffix s[j..i-1] is a word in our dictionary."
          },
          {
            step: "3. Max Word Length Pruning",
            desc: "You do not need to check all j from 0 to i! Find the longest word in the dictionary `maxLen`. Only check `j >= Math.max(0, i - maxLen)`. This slashes execution time by 90%."
          },
          {
            step: "4. Edge Case Guarding",
            desc: "Single characters, dictionary with words longer than s, and words with identical repeating characters ('aaaaaaa', ['aaaa', 'aaa'])."
          }
        ],
        realWorldScenario: "Search query parsing in Google Search (breaking 'newyorktimes' into 'new york times' when users forget spaces), and text tokenization in NLP & LLM pipelines (BPE/WordPiece).",
        transferableProblems: [
          "Word Break II (LeetCode 140 - DP with Backtracking result generation)",
          "Palindrome Partitioning (LeetCode 131 - Substring partitioning)",
          "Decode Ways (LeetCode 91 - Numerical mapping DP)"
        ],
        code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        if (s == null || s.length() == 0) return true;

        // 1. Convert dictionary list to HashSet for O(1) lookups
        Set<String> wordSet = new HashSet<>(wordDict);

        // Find max word length to prune inner loop
        int maxWordLen = 0;
        for (String word : wordDict) {
            maxWordLen = Math.max(maxWordLen, word.length());
        }

        int n = s.length();
        // dp[i] represents if prefix of length i can be segmented
        boolean[] dp = new boolean[n + 1];
        dp[0] = true; // Base case: empty string is valid

        for (int i = 1; i <= n; i++) {
            // Prune: only examine split points within maxWordLen reach
            int minJ = Math.max(0, i - maxWordLen);

            for (int j = i - 1; j >= minJ; j--) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break; // Early exit once any valid split point is confirmed!
                }
            }
        }

        return dp[n];
    }
}`,
        timeComplexity: "O(N * M * L) where N is string length, M is maxWordLength, and L is substring hashing",
        spaceComplexity: "O(N + D) for the DP boolean array and dictionary HashSet",
        edgeCases: ["Single character string matching word", "Entire string is one word in dictionary", "Impossible partitioning (e.g. 'catsandog')", "Overlapping repeating letters"],
        javaTip: "Pruning with `maxWordLen` prevents substring allocations on huge inputs and eliminates TLE on LeetCode test cases."
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
