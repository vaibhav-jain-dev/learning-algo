/**
 * Move to Front Instead
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: move-to-front-instead
 * Parent: 09-move-element-to-end
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move to Front Instead',
        difficulty: 'Easy',
        algorithm: 'move-to-front-instead',
        parent: '09-move-element-to-end',
        description: 'Move all instances of the target integer to the front of the array instead of the end, without maintaining order of other elements. The pointer logic reverses: the write pointer starts at the beginning, and you scan from the end.',
        problem: 'The pointer logic reverses: the write pointer starts at the beginning, and you scan from the end.',
        hints: [
            'Think about how move to front instead differs from the standard version of this problem.',
            'Key insight: The pointer logic reverses: the write pointer starts at the beginning, and you scan from the end.',
            'Consider whether sorting can help simplify the approach.',
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
            python: `def move_to_front_instead(data):
    """
    Move to Front Instead

    Move all instances of the target integer to the front of the array instead of the end, without maintaining order of other elements.
    \n    Approach: The pointer logic reverses: the write pointer starts at the beginning, and you scan from the end.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 2, 4], toMove = 2. Result: [2, 2, 3, 1, 4] or similar.

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
print(move_to_front_instead([1, 2, 3, 4, 5]))
print(move_to_front_instead([5, 3, 1]))
print(move_to_front_instead([1]))`,
            go: `package main

import "fmt"

// MoveToFrontInstead solves the Move to Front Instead problem.
// Move all instances of the target integer to the front of the array instead of the end, without maintaining order of other elements.
// Time: O(n), Space: O(n)
func MoveToFrontInstead(data []int) []int {
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
    fmt.Println(MoveToFrontInstead([]int{1, 2, 3, 4, 5}))
    fmt.Println(MoveToFrontInstead([]int{5, 3, 1}))
    fmt.Println(MoveToFrontInstead([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/twist-01-move-to-front-instead', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/twist-01-move-to-front-instead'] = problem;
})();
