/**
 * Streaming Depth Updates
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 * Parent: 02-node-depths/01-maximum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Streaming Depth Updates',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '02-node-depths/01-maximum-depth',
        description: 'Nodes are inserted into a BST one at a time. After each insertion, report the current maximum depth without full re-traversal. You track the current max depth incrementally. Each insertion follows a path whose length might exceed the current max, so you simply compare the insertion depth against the running maximum.',
        problem: 'You track the current max depth incrementally. Each insertion follows a path whose length might exceed the current max, so you simply compare the insertion depth against the running maximum.',
        hints: [
            'Consider: Nodes are inserted into a BST one at a time.',
            'After each insertion, report the current maximum depth without full re-traversal.',
            'Key insight: You track the current max depth incrementally.',
            'Each insertion follows a path whose length might exceed the current max, so you simply compare the insertion depth against the running maximum.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the streaming depth updates criteria.'
            },
            {
                input: {"tree":{"value":1,"right":{"value":2}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the streaming depth updates criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def streaming_depth_updates(tree):
    """
    Streaming Depth Updates

    Nodes are inserted into a BST one at a time. After each insertion, report the current maximum depth without full re-traversal. You track the current max depth incrementally. Each insertion follows a path whose length might exceed the current max, so you simply compare the insertion depth against the running maximum.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(streaming_depth_updates({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(streaming_depth_updates({"value": 1, "right": {"value": 2}}))  # Expected: 2
print(streaming_depth_updates({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// StreamingDepthUpdates solves the Streaming Depth Updates problem.
// Nodes are inserted into a BST one at a time. After each insertion, report the current maximum depth without full re-traversal. You track the current max depth incrementally. Each insertion follows a path whose length might exceed the current max, so you simply compare the insertion depth against the running maximum.
// Time: O(n), Space: O(n)
func StreamingDepthUpdates(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(StreamingDepthUpdates({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(StreamingDepthUpdates({"value":1,"right":{"value":2}})) // Expected: 2
	fmt.Println(StreamingDepthUpdates({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth/twist-05-streaming-depth-updates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth/twist-05-streaming-depth-updates'] = problem;
})();
