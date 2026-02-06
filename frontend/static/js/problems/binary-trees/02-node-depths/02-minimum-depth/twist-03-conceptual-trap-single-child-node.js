/**
 * Conceptual Trap: Single-Child Node
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-bfs
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Conceptual Trap: Single-Child Node',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Predict the output: Tree has root=1 with only a right child=2 which has only a right child=3. What is the minimum depth? Many people incorrectly answer 1, thinking the null left child of the root makes depth 1. But a leaf must have NO children. Node 1 has a right child, so it is not a leaf. The minimum depth is 3.',
        problem: 'Many people incorrectly answer 1, thinking the null left child of the root makes depth 1. But a leaf must have NO children. Node 1 has a right child, so it is not a leaf. The minimum depth is 3.',
        hints: [
            'Consider: Predict the output: Tree has root=1 with only a right child=2 which has only a right child=3.',
            'What is the minimum depth?.',
            'Key insight: But a leaf must have NO children.',
            'The minimum depth is 3.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the conceptual trap single child node criteria.'
            },
            {
                input: {"tree":{"value":2,"right":{"value":3,"right":{"value":4,"right":{"value":5,"right":{"value":6}}}}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the conceptual trap single child node criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_single_child_node(tree):
    """
    Conceptual Trap: Single-Child Node

    Predict the output: Tree has root=1 with only a right child=2 which has only a right child=3. What is the minimum depth? Many people incorrectly answer 1, thinking the null left child of the root makes depth 1. But a leaf must have NO children. Node 1 has a right child, so it is not a leaf. The minimum depth is 3.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(conceptual_trap_single_child_node({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(conceptual_trap_single_child_node({"value": 2, "right": {"value": 3, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}}))  # Expected: 2
print(conceptual_trap_single_child_node({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConceptualTrapSingleChildNode solves the Conceptual Trap: Single-Child Node problem.
// Predict the output: Tree has root=1 with only a right child=2 which has only a right child=3. What is the minimum depth? Many people incorrectly answer 1, thinking the null left child of the root makes depth 1. But a leaf must have NO children. Node 1 has a right child, so it is not a leaf. The minimum depth is 3.
// Time: O(n), Space: O(n)
func ConceptualTrapSingleChildNode(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConceptualTrapSingleChildNode({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(ConceptualTrapSingleChildNode({"value":2,"right":{"value":3,"right":{"value":4,"right":{"value":5,"right":{"value":6}}}}})) // Expected: 2
	fmt.Println(ConceptualTrapSingleChildNode({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-03-conceptual-trap-single-child-node', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-03-conceptual-trap-single-child-node'] = problem;
})();
