/**
 * Invert N-ary Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-invert
 * Parent: 03-invert-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Invert N-ary Tree',
        difficulty: 'Medium',
        algorithm: 'tree-invert',
        parent: '03-invert-tree',
        description: 'Invert an N-ary tree by reversing the order of children at every node. Instead of swapping left/right, you must reverse an entire children array at each node. The recursive structure changes from swap(left,right) to children.reverse().',
        problem: 'Instead of swapping left/right, you must reverse an entire children array at each node. The recursive structure changes from swap(left,right) to children.reverse().',
        hints: [
            'Consider: Invert an N-ary tree by reversing the order of children at every node.',
            'Instead of swapping left/right, you must reverse an entire children array at each node.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[A, B, C]) becomes Node(1, children=[C, B, A]), applied recursively.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: [0],
                explanation: 'The invert n ary tree for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def invert_n_ary_tree(tree):
    """
    Invert N-ary Tree

    Invert an N-ary tree by reversing the order of children at every node. Instead of swapping left/right, you must reverse an entire children array at each node. The recursive structure changes from swap(left,right) to children.reverse().

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(invert_n_ary_tree({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: [0]
print(invert_n_ary_tree({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// InvertNAryTree solves the Invert N-ary Tree problem.
// Invert an N-ary tree by reversing the order of children at every node. Instead of swapping left/right, you must reverse an entire children array at each node. The recursive structure changes from swap(left,right) to children.reverse().
// Time: O(n), Space: O(n)
func InvertNAryTree(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(InvertNAryTree({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(InvertNAryTree({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree/twist-02-invert-n-ary-tree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree/twist-02-invert-n-ary-tree'] = problem;
})();
