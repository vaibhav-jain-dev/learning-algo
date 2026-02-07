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
        twists: [
            { name: 'Longest Arithmetic Subsequence', difficulty: 'Hard', description: 'Find the longest subsequence (not necessarily contiguous) with a constant difference K between consecutive elements.', whyDifferent: 'Non-contiguous subsequence requires DP: for each element, extend the longest chain ending at (value - K).', example: 'nums = [3, 6, 9, 12, 1, 4], K = 3. Subsequence [3, 6, 9, 12] length 4.' },
            { name: 'Any Gap Longest Sequence', difficulty: 'Hard', description: 'Find the longest arithmetic sequence for any gap value. Return both the length and the gap.', whyDifferent: 'Must try all possible gaps, which can be found from pairwise differences. DP over all possible K values.', example: 'nums = [1, 3, 5, 7, 2, 4]. Gap 2: [1,3,5,7] len 4. Gap 1: [1,2] len 2. Best: gap=2, len=4.' },
            { name: 'Gap K with Duplicates Counting', difficulty: 'Hard', description: 'When duplicates exist, count the number of distinct start points for sequences of length >= L with gap K.', whyDifferent: 'Duplicates create multiple valid starting points for the same value, requiring careful counting.', example: 'nums = [1, 1, 3, 3, 5], K = 2, L = 3. Sequences: [1,3,5]. Two start points for 1. Count = 2.' },
            { name: 'Cyclic Gap K Sequence', difficulty: 'Hard', description: 'Numbers wrap around modulo M. Find the longest sequence where each next element is (prev + K) mod M.', whyDifferent: 'Modular arithmetic means the sequence can wrap around, changing the expansion and termination logic.', example: 'nums = [1, 3, 5, 7, 9, 1], K = 2, M = 10. Sequence: [1,3,5,7,9,1] length 6 (wraps).' },
            { name: 'Minimum Additions for Gap K Length L', difficulty: 'Hard', description: 'Find the minimum elements to add to achieve a sequence of length L with gap K.', whyDifferent: 'Optimization problem: find the best starting point and compute how many gaps are unfilled, minimizing additions needed.', example: 'nums = [1, 5, 9], K = 2, L = 5. Sequence [1,3,5,7,9] needs adding 3 and 7. Min additions = 2.' }
        ],
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
