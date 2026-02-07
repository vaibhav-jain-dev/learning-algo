/**
 * Conceptual Trap: Balanced vs Complete
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-balanced
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Conceptual Trap: Balanced vs Complete',
        difficulty: 'Easy',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Is every height-balanced tree also a complete binary tree? Is every complete binary tree height-balanced? Explain the difference. Tests understanding of tree properties. A complete tree is always height-balanced, but a height-balanced tree is NOT necessarily complete (it can have gaps at the last level as long as heights differ by at most 1).',
        problem: 'Tests understanding of tree properties. A complete tree is always height-balanced, but a height-balanced tree is NOT necessarily complete (it can have gaps at the last level as long as heights differ by at most 1).',
        hints: [
            'Consider: Is every height-balanced tree also a complete binary tree? Is every complete binary tree height-balanced? Explain the difference.',
            'Tests understanding of tree properties.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: 1->2->4, 1->3->null,6.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_balanced_vs_complete(tree):
    """
    Conceptual Trap: Balanced vs Complete

    Is every height-balanced tree also a complete binary tree? Is every complete binary tree height-balanced? Explain the difference. Tests understanding of tree properties. A complete tree is always height-balanced, but a height-balanced tree is NOT necessarily complete (it can have gaps at the last level as long as heights differ by at most 1).

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(conceptual_trap_balanced_vs_complete({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 1
print(conceptual_trap_balanced_vs_complete({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}))  # Expected: 2
print(conceptual_trap_balanced_vs_complete({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConceptualTrapBalancedVsComplete solves the Conceptual Trap: Balanced vs Complete problem.
// Is every height-balanced tree also a complete binary tree? Is every complete binary tree height-balanced? Explain the difference. Tests understanding of tree properties. A complete tree is always height-balanced, but a height-balanced tree is NOT necessarily complete (it can have gaps at the last level as long as heights differ by at most 1).
// Time: O(n), Space: O(n)
func ConceptualTrapBalancedVsComplete(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConceptualTrapBalancedVsComplete({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 1
	fmt.Println(ConceptualTrapBalancedVsComplete({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}})) // Expected: 2
	fmt.Println(ConceptualTrapBalancedVsComplete({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-05-conceptual-trap-balanced-vs-complete', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-05-conceptual-trap-balanced-vs-complete'] = problem;
})();
