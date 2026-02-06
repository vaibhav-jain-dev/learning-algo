/**
 * N-ary Tree Minimum Depth
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-bfs
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'N-ary Tree Minimum Depth',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Find the minimum depth of an N-ary tree where each node can have any number of children. Leaf detection becomes checking for an empty children array. With BFS, the approach is similar, but with DFS you must take the min over all children, not just left/right.',
        problem: 'Leaf detection becomes checking for an empty children array. With BFS, the approach is similar, but with DFS you must take the min over all children, not just left/right.',
        hints: [
            'Consider: Find the minimum depth of an N-ary tree where each node can have any number of children.',
            'Leaf detection becomes checking for an empty children array.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[Node(2), Node(3, children=[Node(4)])]).'
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
                explanation: 'For this input, there is 1 valid position that satisfy the n ary tree minimum depth criteria.'
            },
            {
                input: {"tree":{"value":2,"right":{"value":3,"right":{"value":4,"right":{"value":5,"right":{"value":6}}}}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the n ary tree minimum depth criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_minimum_depth(tree):
    """
    N-ary Tree Minimum Depth

    Find the minimum depth of an N-ary tree where each node can have any number of children. Leaf detection becomes checking for an empty children array. With BFS, the approach is similar, but with DFS you must take the min over all children, not just left/right.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(n_ary_tree_minimum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(n_ary_tree_minimum_depth({"value": 2, "right": {"value": 3, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}}))  # Expected: 2
print(n_ary_tree_minimum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// NAryTreeMinimumDepth solves the N-ary Tree Minimum Depth problem.
// Find the minimum depth of an N-ary tree where each node can have any number of children. Leaf detection becomes checking for an empty children array. With BFS, the approach is similar, but with DFS you must take the min over all children, not just left/right.
// Time: O(n), Space: O(n)
func NAryTreeMinimumDepth(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NAryTreeMinimumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(NAryTreeMinimumDepth({"value":2,"right":{"value":3,"right":{"value":4,"right":{"value":5,"right":{"value":6}}}}})) // Expected: 2
	fmt.Println(NAryTreeMinimumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-02-n-ary-tree-minimum-depth', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-02-n-ary-tree-minimum-depth'] = problem;
})();
