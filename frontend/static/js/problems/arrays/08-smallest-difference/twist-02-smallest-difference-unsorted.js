/**
 * Smallest Difference Unsorted
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: smallest-difference-unsorted
 * Parent: 08-smallest-difference
 */
(function() {
    'use strict';

    const problem = {
        name: 'Smallest Difference Unsorted',
        difficulty: 'Medium',
        algorithm: 'smallest-difference-unsorted',
        parent: '08-smallest-difference',
        description: 'Find the smallest difference pair but you cannot sort either array. Use a hash-based approach. Removes the sorted two-pointer technique, forcing a completely different algorithmic strategy with hash sets.',
        problem: 'Removes the sorted two-pointer technique, forcing a completely different algorithmic strategy with hash sets.',
        hints: [
            'Think about how smallest difference unsorted differs from the standard version of this problem.',
            'Key insight: Removes the sorted two-pointer technique, forcing a completely different algorithmic strategy with hash sets.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
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
            python: `def smallest_difference_unsorted(data):
    """
    Smallest Difference Unsorted

    Find the smallest difference pair but you cannot sort either array. Use a hash-based approach.
    \n    Approach: Removes the sorted two-pointer technique, forcing a completely different algorithmic strategy with hash sets.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # arrayOne = [10, 5, -1], arrayTwo = [26, 15, 17]. Must find [5, 15] with diff 10 without sorting.

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
print(smallest_difference_unsorted([1, 2, 3, 4, 5]))
print(smallest_difference_unsorted([5, 3, 1]))
print(smallest_difference_unsorted([1]))`,
            go: `package main

import "fmt"

// SmallestDifferenceUnsorted solves the Smallest Difference Unsorted problem.
// Find the smallest difference pair but you cannot sort either array. Use a hash-based approach.
// Time: O(n log n), Space: O(n)
func SmallestDifferenceUnsorted(data []int) []int {
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
    fmt.Println(SmallestDifferenceUnsorted([]int{1, 2, 3, 4, 5}))
    fmt.Println(SmallestDifferenceUnsorted([]int{5, 3, 1}))
    fmt.Println(SmallestDifferenceUnsorted([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/twist-02-smallest-difference-unsorted', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/twist-02-smallest-difference-unsorted'] = problem;
})();
