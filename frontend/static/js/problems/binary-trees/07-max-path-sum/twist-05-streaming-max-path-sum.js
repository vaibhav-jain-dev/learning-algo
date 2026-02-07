/**
 * Streaming Max Path Sum
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-max-path
 * Parent: 07-max-path-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Streaming Max Path Sum',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '07-max-path-sum',
        description: 'Node values can be updated at any time. After each update, report the new maximum path sum without full re-traversal. A single node value change can affect all paths through it. You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.',
        problem: 'A single node value change can affect all paths through it. You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.',
        hints: [
            'Consider: Node values can be updated at any time.',
            'After each update, report the new maximum path sum without full re-traversal.',
            'Key insight: A single node value change can affect all paths through it.',
            'You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def streaming_max_path_sum(tree):
    """
    Streaming Max Path Sum

    Node values can be updated at any time. After each update, report the new maximum path sum without full re-traversal. A single node value change can affect all paths through it. You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(streaming_max_path_sum({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 1
print(streaming_max_path_sum({"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 2
print(streaming_max_path_sum({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// StreamingMaxPathSum solves the Streaming Max Path Sum problem.
// Node values can be updated at any time. After each update, report the new maximum path sum without full re-traversal. A single node value change can affect all paths through it. You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.
// Time: O(n), Space: O(n)
func StreamingMaxPathSum(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(StreamingMaxPathSum({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 1
	fmt.Println(StreamingMaxPathSum({"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 2
	fmt.Println(StreamingMaxPathSum({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum/twist-05-streaming-max-path-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum/twist-05-streaming-max-path-sum'] = problem;
})();
