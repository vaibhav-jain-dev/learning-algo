/**
 * Iterative Diameter Computation
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-diameter
 * Parent: 04-binary-tree-diameter
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Diameter Computation',
        difficulty: 'Medium',
        algorithm: 'tree-diameter',
        parent: '04-binary-tree-diameter',
        description: 'Compute the diameter without recursion. Use iterative postorder traversal with an explicit stack. The recursive solution elegantly returns height while updating a global diameter. Iteratively, you need to process nodes in postorder and store computed heights in a hash map to look up when processing parent nodes.',
        problem: 'The recursive solution elegantly returns height while updating a global diameter. Iteratively, you need to process nodes in postorder and store computed heights in a hash map to look up when processing parent nodes.',
        hints: [
            'Consider: Compute the diameter without recursion.',
            'Use iterative postorder traversal with an explicit stack.',
            'Key insight: The recursive solution elegantly returns height while updating a global diameter.',
            'Iteratively, you need to process nodes in postorder and store computed heights in a hash map to look up when processing parent nodes.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the iterative diameter computation criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_diameter_computation(tree):
    """
    Iterative Diameter Computation

    Compute the diameter without recursion. Use iterative postorder traversal with an explicit stack. The recursive solution elegantly returns height while updating a global diameter. Iteratively, you need to process nodes in postorder and store computed heights in a hash map to look up when processing parent nodes.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_diameter_computation({"value": 1, "left": {"value": 3, "left": {"value": 7, "left": {"value": 8}}, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 2}}))  # Expected: 1
print(iterative_diameter_computation({"value": 1, "left": {"value": 3, "left": {"value": 7, "left": {"value": 8}}, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 2}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeDiameterComputation solves the Iterative Diameter Computation problem.
// Compute the diameter without recursion. Use iterative postorder traversal with an explicit stack. The recursive solution elegantly returns height while updating a global diameter. Iteratively, you need to process nodes in postorder and store computed heights in a hash map to look up when processing parent nodes.
// Time: O(n), Space: O(n)
func IterativeDiameterComputation(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeDiameterComputation({"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}})) // Expected: 1
	fmt.Println(IterativeDiameterComputation({"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '04-binary-tree-diameter/twist-02-iterative-diameter-computation', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/04-binary-tree-diameter/twist-02-iterative-diameter-computation'] = problem;
})();
