/**
 * Anti-Spiral Clockwise
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti-Spiral Clockwise',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Traverse a matrix from the center outward in clockwise direction (right first, then down, left, up). This is center-outward like anti-spiral but clockwise instead of counterclockwise.',
        problem: 'Start at the center cell and use clockwise direction vectors (right, down, left, up) with expanding step sizes.',
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
            python: `def anti_spiral_clockwise(matrix):
    """
    Anti-Spiral Clockwise

    Traverse a matrix from the center outward in clockwise direction (right first, then down, left, up). This is center-outward like anti-spiral but clockwise instead of counterclockwise.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for item in matrix:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(anti_spiral_clockwise(["\\\\n    [1",2,"3]","\\\\n    [4",5,"6]","\\\\n    [7",8,"9]\\\\n"]))  # Expected: "result"
print(anti_spiral_clockwise(["\\\\n    [1",2,3,"4]","\\\\n    [5",6,7,"8]","\\\\n    [9",10,11,"12]\\\\n"]))  # Expected: "output"
print(anti_spiral_clockwise(["\\\\n    [1"]))  # Expected: ""
`,
            go: `package main

import "fmt"

// AntiSpiralClockwise solves the Anti-Spiral Clockwise problem.
// Traverse a matrix from the center outward in clockwise direction (right first, then down, left, up). This is center-outward like anti-spiral but clockwise instead of counterclockwise.
// Time: O(m*n), Space: O(m*n)
func AntiSpiralClockwise(matrix []string) string {
	result := ""

	for _, v := range matrix {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(AntiSpiralClockwise([]string{"\\n    [1", 2, "3]", "\\n    [4", 5, "6]", "\\n    [7", 8, "9]\\n"})) // Expected: "result"
	fmt.Println(AntiSpiralClockwise([]string{"\\n    [1", 2, 3, "4]", "\\n    [5", 6, 7, "8]", "\\n    [9", 10, 11, "12]\\n"})) // Expected: "output"
	fmt.Println(AntiSpiralClockwise([]string{"\\n    [1"})) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-01-anti-spiral-clockwise', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-01-anti-spiral-clockwise'] = problem;
})();
