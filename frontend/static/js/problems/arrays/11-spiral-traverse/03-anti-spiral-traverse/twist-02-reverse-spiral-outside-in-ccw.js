/**
 * Reverse Spiral Outside-In CCW
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Spiral Outside-In CCW',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Traverse the matrix counterclockwise starting from the outside (top-left, going down first) spiraling inward. Combines counterclockwise direction with outside-in progression.',
        problem: 'Use boundary variables and traverse in CCW order: down the left, right along bottom, up the right, left along top. Shrink boundaries inward.',
        hints: [

        ],
        complexity: {
            time: 'O(m*n)',
            space: 'O(m*n)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":["\\n    [1",2,"3]","\\n    [4",5,"6]","\\n    [7",8,"9]\\n"]},
                output: "result",
                explanation: 'The resulting string is "result".'
            },
            {
                input: {"matrix":["\\n    [1",2,3,"4]","\\n    [5",6,7,"8]","\\n    [9",10,11,"12]\\n"]},
                output: "output",
                explanation: 'The resulting string is "output".'
            },
            // Edge case
            {
                input: {"matrix":["\\n    [1"]},
                output: "",
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def reverse_spiral_outside_in_ccw(matrix):
    """
    Reverse Spiral Outside-In CCW

    Traverse the matrix counterclockwise starting from the outside (top-left, going down first) spiraling inward. Combines counterclockwise direction with outside-in progression.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for item in matrix:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(reverse_spiral_outside_in_ccw(["\\\\n    [1",2,"3]","\\\\n    [4",5,"6]","\\\\n    [7",8,"9]\\\\n"]))  # Expected: "result"
print(reverse_spiral_outside_in_ccw(["\\\\n    [1",2,3,"4]","\\\\n    [5",6,7,"8]","\\\\n    [9",10,11,"12]\\\\n"]))  # Expected: "output"
print(reverse_spiral_outside_in_ccw(["\\\\n    [1"]))  # Expected: ""
`,
            go: `package main

import "fmt"

// ReverseSpiralOutsideInCcw solves the Reverse Spiral Outside-In CCW problem.
// Traverse the matrix counterclockwise starting from the outside (top-left, going down first) spiraling inward. Combines counterclockwise direction with outside-in progression.
// Time: O(m*n), Space: O(m*n)
func ReverseSpiralOutsideInCcw(matrix []string) string {
	result := ""

	for _, v := range matrix {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(ReverseSpiralOutsideInCcw([]string{"\\n    [1", 2, "3]", "\\n    [4", 5, "6]", "\\n    [7", 8, "9]\\n"})) // Expected: "result"
	fmt.Println(ReverseSpiralOutsideInCcw([]string{"\\n    [1", 2, 3, "4]", "\\n    [5", 6, 7, "8]", "\\n    [9", 10, 11, "12]\\n"})) // Expected: "output"
	fmt.Println(ReverseSpiralOutsideInCcw([]string{"\\n    [1"})) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-02-reverse-spiral-outside-in-ccw', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-02-reverse-spiral-outside-in-ccw'] = problem;
})();
