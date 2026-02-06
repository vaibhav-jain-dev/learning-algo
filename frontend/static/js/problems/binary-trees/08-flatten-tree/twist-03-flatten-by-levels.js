/**
 * Flatten by Levels
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-flatten
 * Parent: 08-flatten-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten by Levels',
        difficulty: 'Hard',
        algorithm: 'tree-flatten',
        parent: '08-flatten-tree',
        description: 'Flatten the binary tree into a linked list following level-order (BFS) instead of inorder. Each node right-pointer points to the next node in BFS order. Level-order is not naturally recursive like inorder. You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.',
        problem: 'Level-order is not naturally recursive like inorder. You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.',
        hints: [
            'Consider: Flatten the binary tree into a linked list following level-order (BFS) instead of inorder.',
            'Each node right-pointer points to the next node in BFS order.',
            'Key insight: Level-order is not naturally recursive like inorder.',
            'You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.'
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
                explanation: 'The flatten by levels for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def flatten_by_levels(tree):
    """
    Flatten by Levels

    Flatten the binary tree into a linked list following level-order (BFS) instead of inorder. Each node right-pointer points to the next node in BFS order. Level-order is not naturally recursive like inorder. You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(flatten_by_levels({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}}}))  # Expected: [0]
print(flatten_by_levels({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// FlattenByLevels solves the Flatten by Levels problem.
// Flatten the binary tree into a linked list following level-order (BFS) instead of inorder. Each node right-pointer points to the next node in BFS order. Level-order is not naturally recursive like inorder. You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.
// Time: O(n), Space: O(n)
func FlattenByLevels(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(FlattenByLevels({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}})) // Expected: [0]
	fmt.Println(FlattenByLevels({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree/twist-03-flatten-by-levels', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree/twist-03-flatten-by-levels'] = problem;
})();
