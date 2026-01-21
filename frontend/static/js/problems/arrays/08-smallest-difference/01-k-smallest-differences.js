/**
 * K Smallest Differences
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Smallest Differences',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '08-smallest-difference',
        description: 'Given two sorted arrays of integers arr1 and arr2, and an integer k, find the K pairs with the smallest absolute differences between them. Each pair should consist of one element from arr1 and one element from arr2. Return the pairs sorted by their absolute difference in ascending order. If there are multiple pairs with the same difference, they can be returned in any order.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "raw": "arr1 = [1, 3, 5], arr2 = [2, 4], k = 3"
},
        output: "[[1, 2], [3, 2], [3, 4]]\nExplanation:\n  - |1 - 2| = 1\n  - |3 - 2| = 1\n  - |3 - 4| = 1\n  All three pairs have difference 1.",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 2], [3, 2], [3, 4]]\nExplanation:\n  - |1 - 2| = 1\n  - |3 - 2| = 1\n  - |3 - 4| = 1\n  All three pairs have difference 1.'
    },
    {
        input: {
        "raw": "arr1 = [1, 7, 11], arr2 = [2, 4, 6], k = 4"
},
        output: "[[1, 2], [1, 4], [7, 6], [1, 6]]\nExplanation:\n  - |1 - 2| = 1\n  - |1 - 4| = 3\n  - |7 - 6| = 1\n  - |1 - 6| = 5\n  Sorted by difference: [[1, 2], [7, 6], [1, 4], [1, 6]]",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 2], [1, 4], [7, 6], [1, 6]]\nExplanation:\n  - |1 - 2| = 1\n  - |1 - 4| = 3\n  - |7 - 6| = 1\n  - |1 - 6| = 5\n  Sorted by difference: [[1, 2], [7, 6], [1, 4], [1, 6]]'
    },
    {
        input: {
        "raw": "arr1 = [1, 2], arr2 = [3], k = 2"
},
        output: "[[2, 3], [1, 3]]\nExplanation:\n  - |2 - 3| = 1\n  - |1 - 3| = 2",
        explanation: 'Given the input, the algorithm processes it to produce [[2, 3], [1, 3]]\nExplanation:\n  - |2 - 3| = 1\n  - |1 - 3| = 2'
    }
        ],
        solutions: {
            python: `import heapq

def kSmallestDifferences(arr1, arr2, k):
    """
    K Smallest Differences - Find K pairs with smallest absolute differences.

    Time: O(k * log(min(k, m, n))) where m, n are array lengths
    Space: O(min(k, m, n)) for the heap
    """
    if not arr1 or not arr2 or k <= 0:
        return []

    # Use a min-heap: (diff, idx1, idx2)
    heap = []
    result = []

    # Initialize with first element of arr1 paired with all of arr2
    # or first element of arr2 paired with all of arr1 (whichever is smaller)
    for i in range(min(len(arr1), k)):
        heapq.heappush(heap, (abs(arr1[i] - arr2[0]), i, 0))

    visited = set()

    while heap and len(result) < k:
        diff, i, j = heapq.heappop(heap)

        if (i, j) in visited:
            continue
        visited.add((i, j))

        result.append([arr1[i], arr2[j]])

        # Add next pair from arr2 for same arr1 element
        if j + 1 < len(arr2):
            heapq.heappush(heap, (abs(arr1[i] - arr2[j + 1]), i, j + 1))

        # Add next pair from arr1 for same arr2 element
        if i + 1 < len(arr1) and (i + 1, j) not in visited:
            heapq.heappush(heap, (abs(arr1[i + 1] - arr2[j]), i + 1, j))

    return result


# Test
if __name__ == "__main__":
    print(kSmallestDifferences([1, 3, 5], [2, 4], 3))
    # Output: [[1, 2], [3, 2], [3, 4]]
    print(kSmallestDifferences([1, 7, 11], [2, 4, 6], 4))
    # Output: [[1, 2], [7, 6], [1, 4], [1, 6]]`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

type PairHeap [][]int // [diff, i, j]

func (h PairHeap) Len() int           { return len(h) }
func (h PairHeap) Less(i, j int) bool { return h[i][0] < h[j][0] }
func (h PairHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *PairHeap) Push(x any)        { *h = append(*h, x.([]int)) }
func (h *PairHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

// KSmallestDifferences finds K pairs with smallest absolute differences.
// Time: O(k * log(min(k, m, n))), Space: O(min(k, m, n))
func KSmallestDifferences(arr1, arr2 []int, k int) [][]int {
    if len(arr1) == 0 || len(arr2) == 0 || k <= 0 {
        return [][]int{}
    }

    h := &PairHeap{}
    heap.Init(h)
    result := [][]int{}
    visited := make(map[[2]int]bool)

    // Initialize heap
    for i := 0; i < len(arr1) && i < k; i++ {
        heap.Push(h, []int{abs(arr1[i] - arr2[0]), i, 0})
    }

    for h.Len() > 0 && len(result) < k {
        item := heap.Pop(h).([]int)
        i, j := item[1], item[2]

        key := [2]int{i, j}
        if visited[key] {
            continue
        }
        visited[key] = true

        result = append(result, []int{arr1[i], arr2[j]})

        if j+1 < len(arr2) {
            heap.Push(h, []int{abs(arr1[i] - arr2[j+1]), i, j + 1})
        }
        if i+1 < len(arr1) {
            nextKey := [2]int{i + 1, j}
            if !visited[nextKey] {
                heap.Push(h, []int{abs(arr1[i+1] - arr2[j]), i + 1, j})
            }
        }
    }

    return result
}

func main() {
    fmt.Println(KSmallestDifferences([]int{1, 3, 5}, []int{2, 4}, 3))
    fmt.Println(KSmallestDifferences([]int{1, 7, 11}, []int{2, 4, 6}, 4))
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 08-smallest-difference
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/01-k-smallest-differences', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/01-k-smallest-differences'] = problem;

})();
