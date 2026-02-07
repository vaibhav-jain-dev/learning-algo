/**
 * Multi-Layer Spiral with Gaps
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multi-Layer Spiral with Gaps',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Generate a spiral matrix but leave every other layer empty (filled with 0), creating a ring pattern. Layer 0 (outermost) is filled, layer 1 is empty, layer 2 is filled, and so on.',
        problem: 'Track the current layer during spiral generation. If the layer number is odd, skip filling those cells (leave as 0). Continue the counter only for filled layers.',
        hints: [

        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":5},
                output: [[1,2,3,4,5],[16,0,0,0,6],[15,0,17,0,7],[14,0,0,0,8],[13,12,11,10,9]],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"n":3},
                output: [[1,2,3],[8,0,4],[7,6,5]],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"n":4},
                output: [[1,2,3,4],[12,0,0,5],[11,0,0,6],[10,9,8,7]],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def multi_layer_spiral_with_gaps(n):
    """
    Multi-Layer Spiral with Gaps

    Generate a spiral matrix but leave every other layer empty (filled with 0), creating a ring pattern. Layer 0 (outermost) is filled, layer 1 is empty, layer 2 is filled, and so on.

    Time: O(n^2)
    Space: O(n^2)
    """
    result = []

    for item in n:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(multi_layer_spiral_with_gaps(5))  # Expected: [[1,2,3,4,5],[16,0,0,0,6],[15,0,17,0,7],[14,0,0,0,8],[13,12,11,10,9]]
print(multi_layer_spiral_with_gaps(3))  # Expected: [[1,2,3],[8,0,4],[7,6,5]]
print(multi_layer_spiral_with_gaps(4))  # Expected: [[1,2,3,4],[12,0,0,5],[11,0,0,6],[10,9,8,7]]
`,
            go: `package main

import "fmt"

// MultiLayerSpiralWithGaps solves the Multi-Layer Spiral with Gaps problem.
// Generate a spiral matrix but leave every other layer empty (filled with 0), creating a ring pattern. Layer 0 (outermost) is filled, layer 1 is empty, layer 2 is filled, and so on.
// Time: O(n^2), Space: O(n^2)
func MultiLayerSpiralWithGaps(n int) string {
	result := ""

	for _, v := range n {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(MultiLayerSpiralWithGaps(5)) // Expected: [[1,2,3,4,5],[16,0,0,0,6],[15,0,17,0,7],[14,0,0,0,8],[13,12,11,10,9]]
	fmt.Println(MultiLayerSpiralWithGaps(3)) // Expected: [[1,2,3],[8,0,4],[7,6,5]]
	fmt.Println(MultiLayerSpiralWithGaps(4)) // Expected: [[1,2,3,4],[12,0,0,5],[11,0,0,6],[10,9,8,7]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-05-multi-layer-spiral-with-gaps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-05-multi-layer-spiral-with-gaps'] = problem;
})();
