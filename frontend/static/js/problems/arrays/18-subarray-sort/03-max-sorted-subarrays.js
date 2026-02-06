/**
 * Max Sorted Subarrays
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Sorted Subarrays',
        difficulty: 'Hard',
        algorithm: 'linear-scan',
        parent: '18-subarray-sort',
        description: 'Given an array, find the maximum number of chunks we can make to sort the array. Each chunk can be sorted independently, and after sorting all chunks and concatenating them, the result should be a sorted array.',
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
          "array": [
            1,
            0,
            2,
            3,
            4
          ]
        },
        output: "4\nExplanation: Chunks: [1, 0], [2], [3], [4]",
        explanation: 'Given the input, the algorithm processes it to produce 4\nExplanation: Chunks: [1, 0], [2], [3], [4]'
    },
    {
        input: {
          "array": [
            4,
            3,
            2,
            1,
            0
          ]
        },
        output: "1\nExplanation: Only one chunk (entire array)",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Only one chunk (entire array)'
    }
        ],
        solutions: {
            python: `def maxSortedSubarrays(array):
    """
    Max Sorted Subarrays (Max Chunks To Make Sorted)

    Find maximum number of chunks that can be independently
    sorted to produce a sorted array.

    Key insight: We can make a cut after index i if max(arr[0..i]) <= min(arr[i+1..n-1])

    Time: O(n)
    Space: O(n)
    """
    n = len(array)
    if n == 0:
        return 0

    # Precompute prefix max and suffix min
    prefix_max = [0] * n
    suffix_min = [0] * n

    prefix_max[0] = array[0]
    for i in range(1, n):
        prefix_max[i] = max(prefix_max[i - 1], array[i])

    suffix_min[n - 1] = array[n - 1]
    for i in range(n - 2, -1, -1):
        suffix_min[i] = min(suffix_min[i + 1], array[i])

    # Count chunks: we can cut after i if prefix_max[i] <= suffix_min[i+1]
    chunks = 1  # At least one chunk (the whole array)
    for i in range(n - 1):
        if prefix_max[i] <= suffix_min[i + 1]:
            chunks += 1

    return chunks


# Test
if __name__ == "__main__":
    print(maxSortedSubarrays([1, 0, 2, 3, 4]))  # 4
    print(maxSortedSubarrays([4, 3, 2, 1, 0]))  # 1`,
            go: `package main

import "fmt"

// MaxSortedSubarrays finds max chunks to make sorted.
// Time: O(n), Space: O(n)
func MaxSortedSubarrays(array []int) int {
    n := len(array)
    if n == 0 {
        return 0
    }

    // Precompute prefix max and suffix min
    prefixMax := make([]int, n)
    suffixMin := make([]int, n)

    prefixMax[0] = array[0]
    for i := 1; i < n; i++ {
        if array[i] > prefixMax[i-1] {
            prefixMax[i] = array[i]
        } else {
            prefixMax[i] = prefixMax[i-1]
        }
    }

    suffixMin[n-1] = array[n-1]
    for i := n - 2; i >= 0; i-- {
        if array[i] < suffixMin[i+1] {
            suffixMin[i] = array[i]
        } else {
            suffixMin[i] = suffixMin[i+1]
        }
    }

    // Count chunks
    chunks := 1
    for i := 0; i < n-1; i++ {
        if prefixMax[i] <= suffixMin[i+1] {
            chunks++
        }
    }

    return chunks
}

func main() {
    fmt.Println(MaxSortedSubarrays([]int{1, 0, 2, 3, 4}))  // 4
    fmt.Println(MaxSortedSubarrays([]int{4, 3, 2, 1, 0}))  // 1
}`
        },
        twists: [
            { title: 'Max Chunks with Arbitrary Values', difficulty: 'Hard', description: 'The array values are arbitrary (not a permutation of 0 to n-1). Find the maximum chunks to sort independently.', whyDifferent: 'Cannot rely on index-value correspondence. Must use prefix max and suffix min comparison across arbitrary values.', example: 'array = [2, 1, 3, 4, 4]. Chunks: [2,1], [3], [4], [4]. Max = 4.' },
            { title: 'Min Chunks to Sort', difficulty: 'Medium', description: 'Find the minimum number of chunks. The answer is always 1 (sort the whole array), but what about with a constraint that each chunk has max size K?', whyDifferent: 'Size constraint forces more chunks. Must find boundaries respecting both sortability and size limit.', example: 'array = [1, 0, 2, 3, 4], K = 3. Chunk [1,0] size 2, then [2,3,4] size 3. Min = 2.' },
            { title: 'Chunks with Equal Sums', difficulty: 'Very Hard', description: 'Find the maximum number of chunks such that each chunk has the same sum after sorting.', whyDifferent: 'Dual constraint: chunks must be independently sortable AND have equal sums, requiring careful boundary selection.', example: 'array = [1, 0, 2, 3]. Chunks [1,0] sum=1, [2] sum=2, [3] sum=3. Unequal. Max equal-sum chunks = 1.' },
            { title: 'Verify Chunk Split', difficulty: 'Medium', description: 'Given a proposed list of chunk boundaries, verify if sorting each chunk independently results in a fully sorted array.', whyDifferent: 'Verification is easier than optimization: check that max of each chunk <= min of next chunk, plus each chunk is sortable.', example: 'array = [1, 0, 2, 3, 4], chunks = [[0,1], [2,4]]. Check: max([1,0])=1 <= min([2,3,4])=2. Valid!' },
            { title: 'Max Chunks for Descending Sort', difficulty: 'Hard', description: 'Find maximum chunks that can be independently sorted in descending order, and when concatenated, give a fully descending array.', whyDifferent: 'All comparisons reverse: prefix min and suffix max instead of prefix max and suffix min.', example: 'array = [4, 3, 2, 1, 0]. Each element is its own chunk for descending. Max = 5.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 18-subarray-sort
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '18-subarray-sort/03-max-sorted-subarrays', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/18-subarray-sort/03-max-sorted-subarrays'] = problem;

})();
