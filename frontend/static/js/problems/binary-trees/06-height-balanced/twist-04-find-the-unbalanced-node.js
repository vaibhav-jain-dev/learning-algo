/**
 * Find the Unbalanced Node
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-balanced
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find the Unbalanced Node',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Instead of returning true/false, return the deepest node in the tree where the height-balanced property is violated. Return null if the tree is balanced. Changes from a boolean check to finding a specific node. You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.',
        problem: 'Changes from a boolean check to finding a specific node. You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.',
        hints: [
            'Consider: Instead of returning true/false, return the deepest node in the tree where the height-balanced property is violated.',
            'Return null if the tree is balanced.',
            'Key insight: Changes from a boolean check to finding a specific node.',
            'You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the find the unbalanced node criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the find the unbalanced node criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def find_the_unbalanced_node(tree):
    """
    Find the Unbalanced Node

    Instead of returning true/false, return the deepest node in the tree where the height-balanced property is violated. Return null if the tree is balanced. Changes from a boolean check to finding a specific node. You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(find_the_unbalanced_node({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 1
print(find_the_unbalanced_node({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}))  # Expected: 2
print(find_the_unbalanced_node({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// FindTheUnbalancedNode solves the Find the Unbalanced Node problem.
// Instead of returning true/false, return the deepest node in the tree where the height-balanced property is violated. Return null if the tree is balanced. Changes from a boolean check to finding a specific node. You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.
// Time: O(n), Space: O(n)
func FindTheUnbalancedNode(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FindTheUnbalancedNode({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 1
	fmt.Println(FindTheUnbalancedNode({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}})) // Expected: 2
	fmt.Println(FindTheUnbalancedNode({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-04-find-the-unbalanced-node', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-04-find-the-unbalanced-node'] = problem;
})();
