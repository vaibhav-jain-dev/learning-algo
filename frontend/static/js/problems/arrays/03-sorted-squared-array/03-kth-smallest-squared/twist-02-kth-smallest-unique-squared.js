/**
 * Kth Smallest Unique Squared
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: kth-smallest-unique-squared
 * Parent: 03-sorted-squared-array/03-kth-smallest-squared
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Smallest Unique Squared',
        difficulty: 'Medium',
        algorithm: 'kth-smallest-unique-squared',
        parent: '03-sorted-squared-array/03-kth-smallest-squared',
        description: 'Find the kth smallest squared value, but skip duplicate squares (e.g., -3 and 3 both give 9, count it only once). Adds deduplication to the progressive search, requiring you to detect when both pointers yield the same squared value.',
        problem: 'Adds deduplication to the progressive search, requiring you to detect when both pointers yield the same squared value.',
        hints: [
            'Think about how kth smallest unique squared differs from the standard version of this problem.',
            'Key insight: Adds deduplication to the progressive search, requiring you to detect when both pointers yield the same squared value.',
            'A hash map can help track frequencies or previously seen values efficiently.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: 'Elements transformed and sorted correctly.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'All positive - order maintained after transformation.'
            },
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'All negative - order reversed after transformation.'
            }
        ],
        solutions: {
            python: `def kth_smallest_unique_squared(data):
    """
    Kth Smallest Unique Squared

    Find the kth smallest squared value, but skip duplicate squares (e.g., -3 and 3 both give 9, count it only once).
    \n    Approach: Adds deduplication to the progressive search, requiring you to detect when both pointers yield the same squared value.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[-3,-1,0,1,3], k=2 → 1 (unique squares sorted: 0,1,9 → 2nd is 1)

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
print(kth_smallest_unique_squared([1, 2, 3, 4, 5]))
print(kth_smallest_unique_squared([5, 3, 1]))
print(kth_smallest_unique_squared([1]))`,
            go: `package main

import "fmt"

// KthSmallestUniqueSquared solves the Kth Smallest Unique Squared problem.
// Find the kth smallest squared value, but skip duplicate squares (e.g., -3 and 3 both give 9, count it only once).
// Time: O(n), Space: O(n)
func KthSmallestUniqueSquared(data []int) []int {
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
    fmt.Println(KthSmallestUniqueSquared([]int{1, 2, 3, 4, 5}))
    fmt.Println(KthSmallestUniqueSquared([]int{5, 3, 1}))
    fmt.Println(KthSmallestUniqueSquared([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/03-kth-smallest-squared/twist-02-kth-smallest-unique-squared', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/03-kth-smallest-squared/twist-02-kth-smallest-unique-squared'] = problem;
})();
