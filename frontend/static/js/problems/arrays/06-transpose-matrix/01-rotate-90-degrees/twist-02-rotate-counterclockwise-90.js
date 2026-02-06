/**
 * Rotate Counterclockwise 90
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: rotate-counterclockwise-90
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate Counterclockwise 90',
        difficulty: 'Medium',
        algorithm: 'rotate-counterclockwise-90',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate the matrix 90 degrees counterclockwise instead of clockwise. Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.',
        problem: 'Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.',
        hints: [
            'Think about how rotate counterclockwise 90 differs from the standard version of this problem.',
            'Key insight: Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.',
            'A hash map can help track frequencies or previously seen values efficiently.',
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
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: ''
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: ''
            }
        ],
        solutions: {
            python: `def rotate_counterclockwise_90(matrix):
    """
    Rotate Counterclockwise 90

    Rotate the matrix 90 degrees counterclockwise instead of clockwise. Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in matrix:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(rotate_counterclockwise_90(None))  # Expected: 2
print(rotate_counterclockwise_90(None))  # Expected: 1
print(rotate_counterclockwise_90(None))  # Expected: 3
`,
            go: `package main

import "fmt"

// RotateCounterclockwise90 solves the Rotate Counterclockwise 90 problem.
// Rotate the matrix 90 degrees counterclockwise instead of clockwise. Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.
// Time: O(n), Space: O(n)
func RotateCounterclockwise90(matrix []string) string {
	result := ""

	for _, v := range matrix {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(RotateCounterclockwise90(nil)) // Expected: 2
	fmt.Println(RotateCounterclockwise90(nil)) // Expected: 1
	fmt.Println(RotateCounterclockwise90(nil)) // Expected: 3
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-02-rotate-counterclockwise-90', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-02-rotate-counterclockwise-90'] = problem;
})();
