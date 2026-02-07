/**
 * Flatten with Separator Nodes
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-flatten
 * Parent: 08-flatten-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten with Separator Nodes',
        difficulty: 'Medium',
        algorithm: 'tree-flatten',
        parent: '08-flatten-tree',
        description: 'Flatten the tree inorder but insert a sentinel node with value -1 between each original node in the resulting linked list. You must create and insert new nodes during the flattening process. This means the output structure has more nodes than the input, requiring memory allocation decisions and careful pointer management.',
        problem: 'You must create and insert new nodes during the flattening process. This means the output structure has more nodes than the input, requiring memory allocation decisions and careful pointer management.',
        hints: [
            'Consider: Flatten the tree inorder but insert a sentinel node with value -1 between each original node in the resulting linked list.',
            'You must create and insert new nodes during the flattening process.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [2, 1, 3].'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}}},
                output: [0],
                explanation: 'The flatten with separator nodes for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}}},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def flatten_with_separator_nodes(tree):
    """
    Flatten with Separator Nodes

    Flatten the tree inorder but insert a sentinel node with value -1 between each original node in the resulting linked list. You must create and insert new nodes during the flattening process. This means the output structure has more nodes than the input, requiring memory allocation decisions and careful pointer management.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(flatten_with_separator_nodes({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}}}))  # Expected: [0]
print(flatten_with_separator_nodes({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// FlattenWithSeparatorNodes solves the Flatten with Separator Nodes problem.
// Flatten the tree inorder but insert a sentinel node with value -1 between each original node in the resulting linked list. You must create and insert new nodes during the flattening process. This means the output structure has more nodes than the input, requiring memory allocation decisions and careful pointer management.
// Time: O(n), Space: O(n)
func FlattenWithSeparatorNodes(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(FlattenWithSeparatorNodes({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}})) // Expected: [0]
	fmt.Println(FlattenWithSeparatorNodes({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree/twist-04-flatten-with-separator-nodes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree/twist-04-flatten-with-separator-nodes'] = problem;
})();
