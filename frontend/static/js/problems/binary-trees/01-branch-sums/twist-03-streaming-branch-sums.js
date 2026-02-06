/**
 * Streaming Branch Sums
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 * Parent: 01-branch-sums
 */
(function() {
    'use strict';

    const problem = {
        name: 'Streaming Branch Sums',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'Nodes are added to the tree one at a time via an insert stream. After each insertion, output the current list of branch sums without re-traversing the entire tree. Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.',
        problem: 'Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.',
        hints: [
            'Consider: Nodes are added to the tree one at a time via an insert stream.',
            'Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Insert 1 (root) => [1].'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: [0],
                explanation: 'The streaming branch sums for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def streaming_branch_sums(tree):
    """
    Streaming Branch Sums

    Nodes are added to the tree one at a time via an insert stream. After each insertion, output the current list of branch sums without re-traversing the entire tree. Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(streaming_branch_sums({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: [0]
print(streaming_branch_sums({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// StreamingBranchSums solves the Streaming Branch Sums problem.
// Nodes are added to the tree one at a time via an insert stream. After each insertion, output the current list of branch sums without re-traversing the entire tree. Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.
// Time: O(n), Space: O(n)
func StreamingBranchSums(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(StreamingBranchSums({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(StreamingBranchSums({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/twist-03-streaming-branch-sums', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/twist-03-streaming-branch-sums'] = problem;
})();
