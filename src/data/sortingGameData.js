// ============================================================
// SORTING GAME DATA — JavaAlgo Elite v3.0
// Interactive Sorting Algorithm Race Visualization
// Algorithms yield step arrays for animation playback
// ============================================================

export const sortingAlgorithms = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    icon: '🫧',
    color: '#f472b6',
    complexity: { best: 'O(N)', avg: 'O(N²)', worst: 'O(N²)', space: 'O(1)' },
    stable: true,
    description: 'Repeatedly swaps adjacent elements if they are in the wrong order. Like bubbles rising to the surface — largest elements "bubble up" to the end each pass.',
    bestFor: 'Nearly sorted arrays (best case O(N) with early termination). Educational — easiest to understand.',
    worstFor: 'Large random or reverse-sorted arrays. Quadratic time makes it impractical for N > 1000.',
    funFact: 'Obama once said in an interview: "I don\'t think the bubble sort is the way to go." He was right.'
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    icon: '👆',
    color: '#fb923c',
    complexity: { best: 'O(N²)', avg: 'O(N²)', worst: 'O(N²)', space: 'O(1)' },
    stable: false,
    description: 'Find the minimum element, put it at the front. Repeat for the remaining unsorted portion. Always makes exactly N swaps — minimum possible.',
    bestFor: 'When memory writes are expensive (only N swaps total). When you need simplicity.',
    worstFor: 'Everything else — always O(N²) regardless of input order. No early termination.',
    funFact: 'Selection Sort always performs exactly N-1 swaps — the theoretical minimum. It minimizes writes but maximizes comparisons.'
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    icon: '🃏',
    color: '#34d399',
    complexity: { best: 'O(N)', avg: 'O(N²)', worst: 'O(N²)', space: 'O(1)' },
    stable: true,
    description: 'Build the sorted array one element at a time — like sorting a hand of playing cards. Pick the next card, slide it into its correct position among the already-sorted cards.',
    bestFor: 'Small arrays (N < 20), nearly sorted data, online algorithms (sorting as data arrives).',
    worstFor: 'Large reverse-sorted arrays — every element must shift all the way to the front.',
    funFact: 'Java\'s Arrays.sort() uses Insertion Sort for arrays smaller than 47 elements because the constant factor is so low that it beats O(N log N) algorithms on small inputs!'
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    icon: '🔀',
    color: '#818cf8',
    complexity: { best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)' },
    stable: true,
    description: 'Divide the array in half, recursively sort each half, then merge the two sorted halves. The "merge" step is the key — two sorted arrays can be merged in O(N).',
    bestFor: 'Guaranteed O(N log N) worst case. Linked lists (no random access needed). External sorting (sorting data that doesn\'t fit in RAM).',
    worstFor: 'When memory is tight — requires O(N) extra space for the merge step.',
    funFact: 'Merge Sort is the algorithm used by Python\'s sorted() (TimSort is a hybrid of Merge Sort + Insertion Sort). It\'s also the go-to for sorting linked lists because it doesn\'t need random access.'
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    icon: '⚡',
    color: '#fbbf24',
    complexity: { best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N²)', space: 'O(log N)' },
    stable: false,
    description: 'Pick a "pivot" element, partition the array so everything smaller is left and everything larger is right, then recursively sort the two partitions.',
    bestFor: 'General-purpose in-place sorting. Cache-friendly (sequential memory access). Arrays.',
    worstFor: 'Already-sorted arrays with poor pivot selection (degrades to O(N²)). Use randomized pivot or median-of-three to avoid this.',
    funFact: 'Quick Sort is the default in Java\'s Arrays.sort() for primitives (Dual-Pivot QuickSort). Its cache performance is 2-3x better than Merge Sort in practice due to sequential memory access patterns.'
  }
];

export const dataDistributions = [
  { id: 'random', name: 'Random', icon: '🎲', generate: (n) => Array.from({length: n}, () => Math.floor(Math.random() * n) + 1) },
  { id: 'nearly-sorted', name: 'Nearly Sorted', icon: '📈', generate: (n) => {
    const arr = Array.from({length: n}, (_, i) => i + 1);
    // Swap ~10% of elements
    for (let i = 0; i < Math.floor(n * 0.1); i++) {
      const a = Math.floor(Math.random() * n);
      const b = Math.min(a + Math.floor(Math.random() * 3) + 1, n - 1);
      [arr[a], arr[b]] = [arr[b], arr[a]];
    }
    return arr;
  }},
  { id: 'reversed', name: 'Reverse Sorted', icon: '📉', generate: (n) => Array.from({length: n}, (_, i) => n - i) },
  { id: 'few-unique', name: 'Few Unique Values', icon: '🔢', generate: (n) => Array.from({length: n}, () => Math.floor(Math.random() * 5) + 1) },
];

// Step generators — each yields { array: [...], comparing: [i,j], swapping: [i,j]|null, sorted: [...] }
export function generateBubbleSortSteps(inputArr) {
  const arr = [...inputArr];
  const steps = [{ array: [...arr], comparing: [], swapping: null, sorted: [], comparisons: 0, swaps: 0 }];
  let comparisons = 0, swaps = 0;
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({ array: [...arr], comparing: [j, j+1], swapping: null, sorted: Array.from({length: i}, (_, k) => n - 1 - k), comparisons, swaps });
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swaps++;
        swapped = true;
        steps.push({ array: [...arr], comparing: [], swapping: [j, j+1], sorted: Array.from({length: i}, (_, k) => n - 1 - k), comparisons, swaps });
      }
    }
    if (!swapped) break;
  }
  steps.push({ array: [...arr], comparing: [], swapping: null, sorted: Array.from({length: n}, (_, i) => i), comparisons, swaps });
  return steps;
}

export function generateSelectionSortSteps(inputArr) {
  const arr = [...inputArr];
  const steps = [{ array: [...arr], comparing: [], swapping: null, sorted: [], comparisons: 0, swaps: 0 }];
  let comparisons = 0, swaps = 0;
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({ array: [...arr], comparing: [minIdx, j], swapping: null, sorted: Array.from({length: i}, (_, k) => k), comparisons, swaps });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      steps.push({ array: [...arr], comparing: [], swapping: [i, minIdx], sorted: Array.from({length: i}, (_, k) => k), comparisons, swaps });
    }
  }
  steps.push({ array: [...arr], comparing: [], swapping: null, sorted: Array.from({length: n}, (_, i) => i), comparisons, swaps });
  return steps;
}

export function generateInsertionSortSteps(inputArr) {
  const arr = [...inputArr];
  const steps = [{ array: [...arr], comparing: [], swapping: null, sorted: [0], comparisons: 0, swaps: 0 }];
  let comparisons = 0, swaps = 0;
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      comparisons++;
      steps.push({ array: [...arr], comparing: [j-1, j], swapping: null, sorted: Array.from({length: i}, (_, k) => k), comparisons, swaps });
      if (arr[j-1] > arr[j]) {
        [arr[j-1], arr[j]] = [arr[j-1], arr[j]];
        swaps++;
        steps.push({ array: [...arr], comparing: [], swapping: [j-1, j], sorted: Array.from({length: i}, (_, k) => k), comparisons, swaps });
        j--;
      } else {
        break;
      }
    }
  }
  steps.push({ array: [...arr], comparing: [], swapping: null, sorted: Array.from({length: n}, (_, i) => i), comparisons, swaps });
  return steps;
}

export function generateMergeSortSteps(inputArr) {
  const arr = [...inputArr];
  const steps = [{ array: [...arr], comparing: [], swapping: null, sorted: [], comparisons: 0, swaps: 0 }];
  let comparisons = 0, swaps = 0;

  function mergeSort(a, l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
  }

  function merge(a, l, m, r) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      comparisons++;
      steps.push({ array: [...a], comparing: [l + i, m + 1 + j], swapping: null, sorted: [], comparisons, swaps });
      if (left[i] <= right[j]) {
        a[k] = left[i]; i++;
      } else {
        a[k] = right[j]; j++;
      }
      swaps++;
      steps.push({ array: [...a], comparing: [], swapping: [k], sorted: [], comparisons, swaps });
      k++;
    }
    while (i < left.length) { a[k] = left[i]; i++; k++; swaps++; }
    while (j < right.length) { a[k] = right[j]; j++; k++; swaps++; }
    steps.push({ array: [...a], comparing: [], swapping: null, sorted: [], comparisons, swaps });
  }

  mergeSort(arr, 0, arr.length - 1);
  steps.push({ array: [...arr], comparing: [], swapping: null, sorted: Array.from({length: arr.length}, (_, i) => i), comparisons, swaps });
  return steps;
}

export function generateQuickSortSteps(inputArr) {
  const arr = [...inputArr];
  const steps = [{ array: [...arr], comparing: [], swapping: null, sorted: [], comparisons: 0, swaps: 0 }];
  let comparisons = 0, swaps = 0;

  function quickSort(a, lo, hi) {
    if (lo >= hi) return;
    const pivotIdx = partition(a, lo, hi);
    quickSort(a, lo, pivotIdx - 1);
    quickSort(a, pivotIdx + 1, hi);
  }

  function partition(a, lo, hi) {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      comparisons++;
      steps.push({ array: [...a], comparing: [j, hi], swapping: null, sorted: [], comparisons, swaps });
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
        steps.push({ array: [...a], comparing: [], swapping: [i, j], sorted: [], comparisons, swaps });
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    swaps++;
    steps.push({ array: [...a], comparing: [], swapping: [i, hi], sorted: [], comparisons, swaps });
    return i;
  }

  quickSort(arr, 0, arr.length - 1);
  steps.push({ array: [...arr], comparing: [], swapping: null, sorted: Array.from({length: arr.length}, (_, i) => i), comparisons, swaps });
  return steps;
}

export const stepGenerators = {
  bubble: generateBubbleSortSteps,
  selection: generateSelectionSortSteps,
  insertion: generateInsertionSortSteps,
  merge: generateMergeSortSteps,
  quick: generateQuickSortSteps,
};
