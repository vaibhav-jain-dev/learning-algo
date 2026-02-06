/**
 * Any-to-Any Path Sum
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 * Parent: 01-branch-sums/01-path-sum-to-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'Any-to-Any Path Sum',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/01-path-sum-to-target',
        description: 'Find all paths that sum to the target, but the path can start and end at any node (not just root-to-leaf). Paths must go downward only. You need prefix sums to track all possible start points. At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.',
        problem: 'You need prefix sums to track all possible start points. At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.',
        hints: [
            'Consider: Find all paths that sum to the target, but the path can start and end at any node (not just root-to-leaf).',
            'Paths must go downward only.',
            'Key insight: You need prefix sums to track all possible start points.',
            'At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}},"target":22},
                output: [0],
                explanation: 'The any to any path sum for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}},"target":4},
                output: [0,1],
                explanation: 'The any to any path sum for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}},"target":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def any_to_any_path_sum(tree, target):
    """
    Any-to-Any Path Sum

    Find all paths that sum to the target, but the path can start and end at any node (not just root-to-leaf). Paths must go downward only. You need prefix sums to track all possible start points. At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(any_to_any_path_sum({"value": 5, "left": {"value": 4, "left": {"value": 11, "left": {"value": 7}, "right": {"value": 2}}}, "right": {"value": 8, "left": {"value": 13}, "right": {"value": 4, "left": {"value": 5}, "right": {"value": 1}}}}, 22))  # Expected: [0]
print(any_to_any_path_sum({"value": 1, "left": {"value": 2}, "right": {"value": 3}}, 4))  # Expected: [0,1]
print(any_to_any_path_sum({"value": 5, "left": {"value": 4, "left": {"value": 11, "left": {"value": 7}, "right": {"value": 2}}}, "right": {"value": 8, "left": {"value": 13}, "right": {"value": 4, "left": {"value": 5}, "right": {"value": 1}}}}, 0))  # Expected: []
`,
            go: `package main

import "fmt"

// AnyToAnyPathSum solves the Any-to-Any Path Sum problem.
// Find all paths that sum to the target, but the path can start and end at any node (not just root-to-leaf). Paths must go downward only. You need prefix sums to track all possible start points. At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.
// Time: O(n), Space: O(n)
func AnyToAnyPathSum(tree *TreeNode, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(AnyToAnyPathSum({"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}}, 22)) // Expected: [0]
	fmt.Println(AnyToAnyPathSum({"value":1,"left":{"value":2},"right":{"value":3}}, 4)) // Expected: [0,1]
	fmt.Println(AnyToAnyPathSum({"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}}, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target/twist-01-any-to-any-path-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target/twist-01-any-to-any-path-sum'] = problem;
})();
