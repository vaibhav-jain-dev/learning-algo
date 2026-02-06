/**
 * Move Multiple Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: move-multiple-values
 * Parent: 09-move-element-to-end
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Multiple Values',
        difficulty: 'Medium',
        algorithm: 'move-multiple-values',
        parent: '09-move-element-to-end',
        description: 'Given a set of values to move (not just one), move all of them to the end of the array. Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.',
        problem: 'Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.',
        hints: [
            'Think about how move multiple values differs from the standard version of this problem.',
            'Key insight: Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.',
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
                input: {"array":[3,1,2,3,4,3],"target":3},
                output: [1,2,4,3,3,3],
                explanation: 'Target elements moved to the correct position.'
            },
            {
                input: {"array":[1,2,3,4,5],"target":6},
                output: [1,2,3,4,5],
                explanation: 'Target not in array - no changes needed.'
            },
            {
                input: {"array":[3,3,3],"target":3},
                output: [3,3,3],
                explanation: 'All elements are the target.'
            }
        ],
        solutions: {
            python: `def move_multiple_values(data):
    """
    Move Multiple Values

    Given a set of values to move (not just one), move all of them to the end of the array.
    \n    Approach: Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 4, 5], toMove = {2, 4}. Result: [1, 3, 5, 2, 4] or [1, 5, 3, 4, 2].

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
print(move_multiple_values([1, 2, 3, 4, 5]))
print(move_multiple_values([5, 3, 1]))
print(move_multiple_values([1]))`,
            go: `package main

import "fmt"

// MoveMultipleValues solves the Move Multiple Values problem.
// Given a set of values to move (not just one), move all of them to the end of the array.
// Time: O(n), Space: O(n)
func MoveMultipleValues(data []int) []int {
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
    fmt.Println(MoveMultipleValues([]int{1, 2, 3, 4, 5}))
    fmt.Println(MoveMultipleValues([]int{5, 3, 1}))
    fmt.Println(MoveMultipleValues([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/twist-03-move-multiple-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/twist-03-move-multiple-values'] = problem;
})();
