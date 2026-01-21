/**
 * Longest Consecutive with Gap K
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: hash-set
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Consecutive with Gap K',
        difficulty: 'Medium',
        algorithm: 'hash-set',
        parent: '19-largest-range',
        description: 'Given an unsorted array of integers nums and a positive integer k, find the length of the longest sequence where consecutive elements differ by exactly k. Unlike the classic longest consecutive sequence problem (where the gap is 1), this variant requires finding sequences with a custom gap value.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
        "nums": [
                1,
                3,
                5,
                7,
                9,
                2,
                4
        ],
        "k": 2
},
        output: 5,
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input nums=[1, 3, ..., 4] (length 7), k=2, the result is 5.'
    }
        ],
        solutions: {
            python: `def longestConsecutiveWithGapK(nums, k):
    """
    Longest Consecutive with Gap K

    Find the length of the longest sequence where consecutive
    elements differ by exactly k.

    Time: O(n)
    Space: O(n)
    """
    if not nums:
        return 0

    num_set = set(nums)
    max_length = 1

    for num in nums:
        # Only start counting if num - k is not in set
        # (this is the start of a sequence)
        if num - k not in num_set:
            current = num
            length = 1

            # Keep extending while next element exists
            while current + k in num_set:
                current += k
                length += 1

            max_length = max(max_length, length)

    return max_length


# Test
if __name__ == "__main__":
    print(longestConsecutiveWithGapK([1, 3, 5, 7, 9, 2, 4], 2))  # 5
    print(longestConsecutiveWithGapK([1, 2, 3, 4, 5], 1))  # 5`,
            go: `package main

import "fmt"

// LongestConsecutiveWithGapK finds longest sequence with gap k.
// Time: O(n), Space: O(n)
func LongestConsecutiveWithGapK(nums []int, k int) int {
    if len(nums) == 0 {
        return 0
    }

    numSet := make(map[int]bool)
    for _, num := range nums {
        numSet[num] = true
    }

    maxLength := 1

    for _, num := range nums {
        // Only start if this is the beginning of a sequence
        if !numSet[num-k] {
            current := num
            length := 1

            // Keep extending while next element exists
            for numSet[current+k] {
                current += k
                length++
            }

            if length > maxLength {
                maxLength = length
            }
        }
    }

    return maxLength
}

func main() {
    fmt.Println(LongestConsecutiveWithGapK([]int{1, 3, 5, 7, 9, 2, 4}, 2))  // 5
    fmt.Println(LongestConsecutiveWithGapK([]int{1, 2, 3, 4, 5}, 1))  // 5
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 19-largest-range
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '19-largest-range/01-longest-consecutive-gap-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/19-largest-range/01-longest-consecutive-gap-k'] = problem;

})();
