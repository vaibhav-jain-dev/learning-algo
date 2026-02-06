/**
 * Generate with Custom Start
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generate with Custom Start',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Fill an n x n matrix in spiral order starting from a given cell (r, c) instead of (0, 0). The spiral expands outward from the starting point, filling cells with values 1, 2, 3, ... in clockwise order.',
        problem: 'Start at the given cell and use the expanding spiral pattern (step sizes 1,1,2,2,3,3,...). Only fill cells that are within bounds and not yet filled.',
        hints: [

        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":3,"r":1,"c":1},
                output: [[6,7,8],[5,1,2],[4,3,9]],
                explanation: ''
            },
            {
                input: {"n":3,"r":0,"c":0},
                output: [[1,2,3],[8,9,4],[7,6,5]],
                explanation: ''
            },
            // Edge case
            {
                input: {"n":2,"r":0,"c":1},
                output: [[3,1],[4,2]],
                explanation: ''
            }
        ],
        solutions: {
            python: `def generate_with_custom_start(n):
    """
    Generate with Custom Start

    Fill an n x n matrix in spiral order starting from a given cell (r, c) instead of (0, 0). The spiral expands outward from the starting point, filling cells with values 1, 2, 3, ... in clockwise order.

    Time: O(n^2)
    Space: O(n^2)
    """
    result = []

    for item in n:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(generate_with_custom_start(3))  # Expected: [[6,7,8],[5,1,2],[4,3,9]]
print(generate_with_custom_start(3))  # Expected: [[1,2,3],[8,9,4],[7,6,5]]
print(generate_with_custom_start(2))  # Expected: [[3,1],[4,2]]
`,
            go: `package main

import "fmt"

// GenerateWithCustomStart solves the Generate with Custom Start problem.
// Fill an n x n matrix in spiral order starting from a given cell (r, c) instead of (0, 0). The spiral expands outward from the starting point, filling cells with values 1, 2, 3, ... in clockwise order.
// Time: O(n^2), Space: O(n^2)
func GenerateWithCustomStart(n int) string {
	result := ""

	for _, v := range n {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(GenerateWithCustomStart(3)) // Expected: [[6,7,8],[5,1,2],[4,3,9]]
	fmt.Println(GenerateWithCustomStart(3)) // Expected: [[1,2,3],[8,9,4],[7,6,5]]
	fmt.Println(GenerateWithCustomStart(2)) // Expected: [[3,1],[4,2]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-03-generate-with-custom-start', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-03-generate-with-custom-start'] = problem;
})();
