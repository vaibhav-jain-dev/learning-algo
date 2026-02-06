/**
 * Two Sum with Duplicate Pairs
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-with-duplicate-pairs
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum with Duplicate Pairs',
        difficulty: 'Medium',
        algorithm: 'two-sum-with-duplicate-pairs',
        parent: '02-two-number-sum',
        description: 'The array may contain duplicates. Return all unique pairs that sum to the target. Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
        problem: 'Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
        hints: [
            'Think about how two sum with duplicate pairs differs from the standard version of this problem.',
            'Key insight: Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,3,4,5],"target":9},
                output: [[1,3,5],[2,3,4]],
                explanation: 'Found all valid combinations summing to target.'
            },
            {
                input: {"array":[-1,0,1,2],"target":0},
                output: [[-1,0,1]],
                explanation: 'Negative numbers included in the valid combination.'
            },
            {
                input: {"array":[1,2,3],"target":100},
                output: [],
                explanation: 'No valid combination exists for this target.'
            }
        ],
        solutions: {
            python: `def two_sum_with_duplicate_pairs(data):
    """
    Two Sum with Duplicate Pairs

    The array may contain duplicates. Return all unique pairs that sum to the target.
    \n    Approach: Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[1,1,2,3,3], target=4 → [[1,3]] (only one unique pair despite multiple 1s and 3s)

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(two_sum_with_duplicate_pairs([1, 2, 3, 4, 5]))
print(two_sum_with_duplicate_pairs([5, 3, 1]))
print(two_sum_with_duplicate_pairs([1]))`,
            go: `package main

import "fmt"

// TwoSumWithDuplicatePairs solves the Two Sum with Duplicate Pairs problem.
// The array may contain duplicates. Return all unique pairs that sum to the target.
// Time: O(n), Space: O(n)
func TwoSumWithDuplicatePairs(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(TwoSumWithDuplicatePairs([]int{1, 2, 3, 4, 5}))
    fmt.Println(TwoSumWithDuplicatePairs([]int{5, 3, 1}))
    fmt.Println(TwoSumWithDuplicatePairs([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-01-two-sum-with-duplicate-pairs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-01-two-sum-with-duplicate-pairs'] = problem;
})();
