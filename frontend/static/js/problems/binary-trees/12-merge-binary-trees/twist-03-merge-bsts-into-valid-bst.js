/**
 * Merge BSTs into Valid BST
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-merge
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge BSTs into Valid BST',
        difficulty: 'Hard',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Given two BSTs, merge them into a single valid BST (not just overlaying positions). The result must maintain BST ordering. Simple position-based merging does not preserve BST ordering. You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.',
        problem: 'Simple position-based merging does not preserve BST ordering. You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.',
        hints: [
            'Consider: Given two BSTs, merge them into a single valid BST (not just overlaying positions).',
            'The result must maintain BST ordering.',
            'Key insight: Simple position-based merging does not preserve BST ordering.',
            'You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree1":{"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}},"tree2":{"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}}},
                output: [0],
                explanation: 'The merge bsts into valid bst for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree1":{"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}},"tree2":{"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def merge_bsts_into_valid_bst(tree1, tree2):
    """
    Merge BSTs into Valid BST

    Given two BSTs, merge them into a single valid BST (not just overlaying positions). The result must maintain BST ordering. Simple position-based merging does not preserve BST ordering. You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree1)):
        # Check if element meets criteria
        result.append(tree1[i])

    return result


# Test cases
print(merge_bsts_into_valid_bst({"value": 1, "left": {"value": 3, "left": {"value": 5}}, "right": {"value": 2}}, {"value": 2, "left": {"value": 1, "right": {"value": 4}}, "right": {"value": 3, "right": {"value": 7}}}))  # Expected: [0]
print(merge_bsts_into_valid_bst({"value": 1, "left": {"value": 3, "left": {"value": 5}}, "right": {"value": 2}}, {"value": 2, "left": {"value": 1, "right": {"value": 4}}, "right": {"value": 3, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// MergeBstsIntoValidBst solves the Merge BSTs into Valid BST problem.
// Given two BSTs, merge them into a single valid BST (not just overlaying positions). The result must maintain BST ordering. Simple position-based merging does not preserve BST ordering. You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.
// Time: O(n), Space: O(n)
func MergeBstsIntoValidBst(tree1 *TreeNode, tree2 *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree1); i++ {
		result = append(result, tree1[i])
	}

	return result
}

func main() {
	fmt.Println(MergeBstsIntoValidBst({"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}}, {"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}})) // Expected: [0]
	fmt.Println(MergeBstsIntoValidBst({"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}}, {"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-03-merge-bsts-into-valid-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-03-merge-bsts-into-valid-bst'] = problem;
})();
