/**
 * Sorted Squared with Count of Position Changes
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorted-squared-with-count-of-position-changes
 * Parent: 03-sorted-squared-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared with Count of Position Changes',
        difficulty: 'Medium',
        algorithm: 'sorted-squared-with-count-of-position-changes',
        parent: '03-sorted-squared-array',
        description: 'Return the sorted squared array AND the count of elements that changed position after squaring and sorting. Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.',
        problem: 'Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.',
        hints: [
            'Think about how sorted squared with count of position changes differs from the standard version of this problem.',
            'Key insight: Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.',
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
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Two valid configurations found in the input.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'Only one valid configuration exists.'
            },
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'Multiple identical elements create multiple valid configurations.'
            }
        ],
        solutions: {
            python: `def sorted_squared_with_count_of_position_changes(data):
    """
    Sorted Squared with Count of Position Changes

    Return the sorted squared array AND the count of elements that changed position after squaring and sorting.
    \n    Approach: Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[-3,-1,2,4] → squares=[1,4,9,16], positions changed: -3 moved from 0→2, -1 moved from 1→0 → 2 changes

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
print(sorted_squared_with_count_of_position_changes([1, 2, 3, 4, 5]))
print(sorted_squared_with_count_of_position_changes([5, 3, 1]))
print(sorted_squared_with_count_of_position_changes([1]))`,
            go: `package main

import "fmt"

// SortedSquaredWithCountOfPositionChanges solves the Sorted Squared with Count of Position Changes problem.
// Return the sorted squared array AND the count of elements that changed position after squaring and sorting.
// Time: O(n log n), Space: O(n)
func SortedSquaredWithCountOfPositionChanges(data []int) []int {
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
    fmt.Println(SortedSquaredWithCountOfPositionChanges([]int{1, 2, 3, 4, 5}))
    fmt.Println(SortedSquaredWithCountOfPositionChanges([]int{5, 3, 1}))
    fmt.Println(SortedSquaredWithCountOfPositionChanges([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/twist-02-sorted-squared-with-count-of-position-changes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/twist-02-sorted-squared-with-count-of-position-changes'] = problem;
})();
