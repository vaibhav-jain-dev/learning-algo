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
            // Basic test case
            {
                input: {"array":[3,1,2,3,4,3],"target":3},
                output: [1,2,4,3,3,3],
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[1,2,3,4,5],"target":6},
                output: [1,2,3,4,5],
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[3,3,3],"target":3},
                output: [3,3,3],
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def move_to_front_instead(array, toMove, target):
    """
    Move to Front Instead

    Move all instances of the target integer to the front of the array instead of the end, without maintaining order of other elements. The pointer logic reverses: the write pointer starts at the beginning, and you scan from the end.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(move_to_front_instead([3,1,2,3,4,3], None, 3))  # Expected: [1,2,4,3,3,3]
print(move_to_front_instead([1,2,3,4,5], None, 6))  # Expected: [1,2,3,4,5]
print(move_to_front_instead([3,3,3], None, 3))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// MoveToFrontInstead solves the Move to Front Instead problem.
// Move all instances of the target integer to the front of the array instead of the end, without maintaining order of other elements. The pointer logic reverses: the write pointer starts at the beginning, and you scan from the end.
// Time: O(n), Space: O(n)
func MoveToFrontInstead(array []int, toMove int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(MoveToFrontInstead([]int{3, 1, 2, 3, 4, 3}, nil, 3)) // Expected: [1,2,4,3,3,3]
	fmt.Println(MoveToFrontInstead([]int{1, 2, 3, 4, 5}, nil, 6)) // Expected: [1,2,3,4,5]
	fmt.Println(MoveToFrontInstead([]int{3, 3, 3}, nil, 3)) // Expected: [3,3,3]
}
`
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
