/**
 * Anti-Spiral Non-Square
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti-Spiral Non-Square',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Perform anti-spiral traversal (center outward, counterclockwise) on a non-square rectangular matrix where the center may be a row segment or column segment rather than a single cell.',
        problem: 'For non-square matrices, the center region is the innermost row or column segment. Start the anti-spiral from this center region and expand outward.',
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
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"matrix":["\\n    [1",2,3,"4]","\\n    [5",6,7,"8]","\\n    [9",10,11,"12]\\n"]},
                output: "output",
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            },
            // Edge case
            {
                input: {"matrix":["\\n    [1"]},
                output: "",
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            }
        ],
        solutions: {
            python: `def anti_spiral_non_square(matrix):
    """
    Anti-Spiral Non-Square

    Perform anti-spiral traversal (center outward, counterclockwise) on a non-square rectangular matrix where the center may be a row segment or column segment rather than a single cell.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for item in matrix:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(anti_spiral_non_square(["\\\\n    [1",2,"3]","\\\\n    [4",5,"6]","\\\\n    [7",8,"9]\\\\n"]))  # Expected: "result"
print(anti_spiral_non_square(["\\\\n    [1",2,3,"4]","\\\\n    [5",6,7,"8]","\\\\n    [9",10,11,"12]\\\\n"]))  # Expected: "output"
print(anti_spiral_non_square(["\\\\n    [1"]))  # Expected: ""
`,
            go: `package main

import "fmt"

// AntiSpiralNonSquare solves the Anti-Spiral Non-Square problem.
// Perform anti-spiral traversal (center outward, counterclockwise) on a non-square rectangular matrix where the center may be a row segment or column segment rather than a single cell.
// Time: O(m*n), Space: O(m*n)
func AntiSpiralNonSquare(matrix []string) string {
	result := ""

	for _, v := range matrix {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(AntiSpiralNonSquare([]string{"\\n    [1", 2, "3]", "\\n    [4", 5, "6]", "\\n    [7", 8, "9]\\n"})) // Expected: "result"
	fmt.Println(AntiSpiralNonSquare([]string{"\\n    [1", 2, 3, "4]", "\\n    [5", 6, 7, "8]", "\\n    [9", 10, 11, "12]\\n"})) // Expected: "output"
	fmt.Println(AntiSpiralNonSquare([]string{"\\n    [1"})) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-04-anti-spiral-non-square', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-04-anti-spiral-non-square'] = problem;
})();
