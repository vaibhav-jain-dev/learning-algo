/**
 * Compare Boundary Traversal
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 * Parent: 11-compare-leaf-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Compare Boundary Traversal',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '11-compare-leaf-traversal',
        description: 'Compare the full boundary traversals of two trees. The boundary includes left edge (top-down), leaves (left-to-right), and right edge (bottom-up), without duplicates. Boundary traversal combines three different traversal patterns into one sequence. You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).',
        problem: 'Boundary traversal combines three different traversal patterns into one sequence. You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).',
        hints: [
            'Consider: Compare the full boundary traversals of two trees.',
            'The boundary includes left edge (top-down), leaves (left-to-right), and right edge (bottom-up), without duplicates.',
            'Key insight: Boundary traversal combines three different traversal patterns into one sequence.',
            'You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree1":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"tree2":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}}},
                output: true,
                explanation: 'The compare boundary traversal condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree1":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"tree2":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}}},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def compare_boundary_traversal(tree1, tree2):
    """
    Compare Boundary Traversal

    Compare the full boundary traversals of two trees. The boundary includes left edge (top-down), leaves (left-to-right), and right edge (bottom-up), without duplicates. Boundary traversal combines three different traversal patterns into one sequence. You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).

    Time: O(n)
    Space: O(n)
    """
    j = 0

    for i in range(len(tree1)):
        if j < len(tree2) and tree1[i] == tree2[j]:
            j += 1

    return j == len(tree2)


# Test cases
print(compare_boundary_traversal({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 7, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 3, "left": {"value": 8}}}))  # Expected: True
print(compare_boundary_traversal({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 7, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 3, "left": {"value": 8}}}))  # Expected: False
`,
            go: `package main

import "fmt"

// CompareBoundaryTraversal solves the Compare Boundary Traversal problem.
// Compare the full boundary traversals of two trees. The boundary includes left edge (top-down), leaves (left-to-right), and right edge (bottom-up), without duplicates. Boundary traversal combines three different traversal patterns into one sequence. You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).
// Time: O(n), Space: O(n)
func CompareBoundaryTraversal(tree1 *TreeNode, tree2 *TreeNode) bool {
	j := 0

	for i := 0; i < len(tree1) && j < len(tree2); i++ {
		if tree1[i] == tree2[j] {
			j++
		}
	}

	return j == len(tree2)
}

func main() {
	fmt.Println(CompareBoundaryTraversal({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, {"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}})) // Expected: true
	fmt.Println(CompareBoundaryTraversal({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, {"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal/twist-02-compare-boundary-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal/twist-02-compare-boundary-traversal'] = problem;
})();
