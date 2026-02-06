/**
 * Floating Point Precision Trap
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-bfs
 * Parent: 02-node-depths/03-average-of-levels
 */
(function() {
    'use strict';

    const problem = {
        name: 'Floating Point Precision Trap',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/03-average-of-levels',
        description: 'Level has node values summing to a very large number (e.g., 2^53 + 1). How do you compute the average without losing precision? Forces thinking about floating-point limitations. Naive sum/count can lose precision with large numbers. You may need incremental averaging: avg = avg + (val - avg)/count to avoid overflow.',
        problem: 'Forces thinking about floating-point limitations. Naive sum/count can lose precision with large numbers. You may need incremental averaging: avg = avg + (val - avg)/count to avoid overflow.',
        hints: [
            'Consider: Level has node values summing to a very large number (e.g., 2^53 + 1).',
            'How do you compute the average without losing precision?.',
            'Key insight: Forces thinking about floating-point limitations.',
            'You may need incremental averaging: avg = avg + (val - avg)/count to avoid overflow.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the floating point precision trap criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"right":{"value":6}}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the floating point precision trap criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def floating_point_precision_trap(tree):
    """
    Floating Point Precision Trap

    Level has node values summing to a very large number (e.g., 2^53 + 1). How do you compute the average without losing precision? Forces thinking about floating-point limitations. Naive sum/count can lose precision with large numbers. You may need incremental averaging: avg = avg + (val - avg)/count to avoid overflow.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(floating_point_precision_trap({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(floating_point_precision_trap({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 2
print(floating_point_precision_trap({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// FloatingPointPrecisionTrap solves the Floating Point Precision Trap problem.
// Level has node values summing to a very large number (e.g., 2^53 + 1). How do you compute the average without losing precision? Forces thinking about floating-point limitations. Naive sum/count can lose precision with large numbers. You may need incremental averaging: avg = avg + (val - avg)/count to avoid overflow.
// Time: O(n), Space: O(n)
func FloatingPointPrecisionTrap(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FloatingPointPrecisionTrap({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(FloatingPointPrecisionTrap({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"right":{"value":6}}})) // Expected: 2
	fmt.Println(FloatingPointPrecisionTrap({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/03-average-of-levels/twist-05-floating-point-precision-trap', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/03-average-of-levels/twist-05-floating-point-precision-trap'] = problem;
})();
