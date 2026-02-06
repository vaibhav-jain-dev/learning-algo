/**
 * Streaming Node Insertions
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 * Parent: 02-node-depths
 */
(function() {
    'use strict';

    const problem = {
        name: 'Streaming Node Insertions',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '02-node-depths',
        description: 'Nodes are inserted one at a time into a BST. After each insertion, report the current sum of all node depths without re-traversing. Each insertion changes the depth of zero existing nodes (BST insertion adds a leaf). You need to incrementally update the total by adding the depth of the new leaf, computed during the insertion path.',
        problem: 'Each insertion changes the depth of zero existing nodes (BST insertion adds a leaf). You need to incrementally update the total by adding the depth of the new leaf, computed during the insertion path.',
        hints: [
            'Consider: Nodes are inserted one at a time into a BST.',
            'After each insertion, report the current sum of all node depths without re-traversing.',
            'Key insight: Each insertion changes the depth of zero existing nodes (BST insertion adds a leaf).',
            'You need to incrementally update the total by adding the depth of the new leaf, computed during the insertion path.'
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
                explanation: 'The streaming node insertions for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def streaming_node_insertions(tree):
    """
    Streaming Node Insertions

    Nodes are inserted one at a time into a BST. After each insertion, report the current sum of all node depths without re-traversing. Each insertion changes the depth of zero existing nodes (BST insertion adds a leaf). You need to incrementally update the total by adding the depth of the new leaf, computed during the insertion path.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(streaming_node_insertions({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: [0]
print(streaming_node_insertions({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// StreamingNodeInsertions solves the Streaming Node Insertions problem.
// Nodes are inserted one at a time into a BST. After each insertion, report the current sum of all node depths without re-traversing. Each insertion changes the depth of zero existing nodes (BST insertion adds a leaf). You need to incrementally update the total by adding the depth of the new leaf, computed during the insertion path.
// Time: O(n), Space: O(n)
func StreamingNodeInsertions(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(StreamingNodeInsertions({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(StreamingNodeInsertions({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/twist-05-streaming-node-insertions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/twist-05-streaming-node-insertions'] = problem;
})();
