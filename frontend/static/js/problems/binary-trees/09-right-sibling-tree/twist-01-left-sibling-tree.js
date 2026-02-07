/**
 * Left Sibling Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-sibling
 * Parent: 09-right-sibling-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Left Sibling Tree',
        difficulty: 'Medium',
        algorithm: 'tree-sibling',
        parent: '09-right-sibling-tree',
        description: 'Transform the tree so each node.',
        problem: 'The mirror transformation requires connecting nodes to their left sibling, meaning you process right-to-left at each level. The original right pointers must remain, so you lose left children instead of right children.',
        hints: [
            'Think about how a BFS level-order traversal processes nodes from left to right, and how you might reverse this.',
            'Instead of connecting each node to its right sibling, connect each node to its left sibling at the same level.',
            'Process children right-to-left at each level so that you always have the left sibling available when visiting a node.',
            'Use a queue-based traversal but track the previous node at each level to set left sibling pointers.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},
                output: "result",
                explanation: 'The resulting string is "result".'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},
                output: "",
                explanation: 'Small tree edge case verifying left sibling assignment for minimal input.'
            }
        ],
        solutions: {
            python: `def left_sibling_tree(tree):
    """
    Left Sibling Tree

    Transform the tree so each node\\

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in tree:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(left_sibling_tree({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: "result"
print(left_sibling_tree({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: ""
`,
            go: `package main

import "fmt"

// LeftSiblingTree solves the Left Sibling Tree problem.
// Transform the tree so each node\\
// Time: O(n), Space: O(n)
func LeftSiblingTree(tree *TreeNode) string {
	result := ""

	for _, v := range tree {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(LeftSiblingTree({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: "result"
	fmt.Println(LeftSiblingTree({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree/twist-01-left-sibling-tree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree/twist-01-left-sibling-tree'] = problem;
})();
