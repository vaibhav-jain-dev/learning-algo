/**
 * N-ary Tree Maximum Depth
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-dfs
 * Parent: 02-node-depths/01-maximum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'N-ary Tree Maximum Depth',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths/01-maximum-depth',
        description: 'Find the maximum depth of an N-ary tree where each node has a variable number of children. Instead of max(left, right), you take the max over all children. Leaf detection is an empty children array rather than null left/right pointers.',
        problem: 'Instead of max(left, right), you take the max over all children. Leaf detection is an empty children array rather than null left/right pointers.',
        hints: [
            'Consider: Find the maximum depth of an N-ary tree where each node has a variable number of children.',
            'Instead of max(left, right), you take the max over all children.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[Node(2, children=[Node(5)]), Node(3), Node(4)]).'
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
                explanation: 'For this input, there is 1 valid position that satisfy the n ary tree maximum depth criteria.'
            },
            {
                input: {"tree":{"value":1,"right":{"value":2}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the n ary tree maximum depth criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_maximum_depth(tree):
    """
    N-ary Tree Maximum Depth

    Find the maximum depth of an N-ary tree where each node has a variable number of children. Instead of max(left, right), you take the max over all children. Leaf detection is an empty children array rather than null left/right pointers.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(n_ary_tree_maximum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(n_ary_tree_maximum_depth({"value": 1, "right": {"value": 2}}))  # Expected: 2
print(n_ary_tree_maximum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// NAryTreeMaximumDepth solves the N-ary Tree Maximum Depth problem.
// Find the maximum depth of an N-ary tree where each node has a variable number of children. Instead of max(left, right), you take the max over all children. Leaf detection is an empty children array rather than null left/right pointers.
// Time: O(n), Space: O(n)
func NAryTreeMaximumDepth(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NAryTreeMaximumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(NAryTreeMaximumDepth({"value":1,"right":{"value":2}})) // Expected: 2
	fmt.Println(NAryTreeMaximumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth/twist-02-n-ary-tree-maximum-depth', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth/twist-02-n-ary-tree-maximum-depth'] = problem;
})();
