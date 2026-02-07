/**
 * Anti-Spiral by Layers
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti-Spiral by Layers',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Return the anti-spiral traversal grouped by layers. Each layer is a separate sub-array in the result. Layer 0 is the center, layer 1 is the ring around it, and so on.',
        problem: 'Perform center-outward anti-spiral traversal but track which layer each element belongs to based on its distance from the center. Group elements by layer.',
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
                output: ["\\n    [1",2,"3]"],
                explanation: 'The anti spiral by layers for this input yields [\n    [1, 2, 3]].'
            },
            {
                input: {"matrix":["\\n    [1",2,3,"4]","\\n    [5",6,7,"8]","\\n    [9",10,11,"12]\\n"]},
                output: ["\\n    [1",2,3],
                explanation: 'The anti spiral by layers for this input yields [\n    [1, 2, 3].'
            },
            // Edge case
            {
                input: {"matrix":["\\n    [1"]},
                output: [],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            }
        ],
        solutions: {
            python: `def anti_spiral_by_layers(matrix):
    """
    Anti-Spiral by Layers

    Return the anti-spiral traversal grouped by layers. Each layer is a separate sub-array in the result. Layer 0 is the center, layer 1 is the ring around it, and so on.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(anti_spiral_by_layers(["\\\\n    [1",2,"3]","\\\\n    [4",5,"6]","\\\\n    [7",8,"9]\\\\n"]))  # Expected: ["\\\\n    [1",2,"3]"]
print(anti_spiral_by_layers(["\\\\n    [1",2,3,"4]","\\\\n    [5",6,7,"8]","\\\\n    [9",10,11,"12]\\\\n"]))  # Expected: ["\\\\n    [1",2,3]
print(anti_spiral_by_layers(["\\\\n    [1"]))  # Expected: []
`,
            go: `package main

import "fmt"

// AntiSpiralByLayers solves the Anti-Spiral by Layers problem.
// Return the anti-spiral traversal grouped by layers. Each layer is a separate sub-array in the result. Layer 0 is the center, layer 1 is the ring around it, and so on.
// Time: O(m*n), Space: O(m*n)
func AntiSpiralByLayers(matrix []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(AntiSpiralByLayers([]string{"\\n    [1", 2, "3]", "\\n    [4", 5, "6]", "\\n    [7", 8, "9]\\n"})) // Expected: ["\\\\n    [1",2,"3]"]
	fmt.Println(AntiSpiralByLayers([]string{"\\n    [1", 2, 3, "4]", "\\n    [5", 6, 7, "8]", "\\n    [9", 10, 11, "12]\\n"})) // Expected: ["\\\\n    [1",2,3]
	fmt.Println(AntiSpiralByLayers([]string{"\\n    [1"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-03-anti-spiral-by-layers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-03-anti-spiral-by-layers'] = problem;
})();
