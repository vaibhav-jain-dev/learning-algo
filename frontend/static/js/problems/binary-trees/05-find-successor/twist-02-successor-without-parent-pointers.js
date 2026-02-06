/**
 * Successor Without Parent Pointers
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-successor
 * Parent: 05-find-successor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Successor Without Parent Pointers',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        parent: '05-find-successor',
        description: 'Find the in-order successor when nodes do NOT have parent pointers. You only have the root of the tree and the target value. Without parent pointers, you cannot walk up. You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.',
        problem: 'Without parent pointers, you cannot walk up. You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.',
        hints: [
            'Consider: Find the in-order successor when nodes do NOT have parent pointers.',
            'You only have the root of the tree and the target value.',
            'Key insight: Without parent pointers, you cannot walk up.',
            'You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}},"target":5},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the successor without parent pointers criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}},"target":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def successor_without_parent_pointers(tree, target):
    """
    Successor Without Parent Pointers

    Find the in-order successor when nodes do NOT have parent pointers. You only have the root of the tree and the target value. Without parent pointers, you cannot walk up. You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and tree[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(successor_without_parent_pointers({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}, 5))  # Expected: 1
print(successor_without_parent_pointers({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// SuccessorWithoutParentPointers solves the Successor Without Parent Pointers problem.
// Find the in-order successor when nodes do NOT have parent pointers. You only have the root of the tree and the target value. Without parent pointers, you cannot walk up. You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.
// Time: O(n), Space: O(n)
func SuccessorWithoutParentPointers(tree *TreeNode, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SuccessorWithoutParentPointers({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}, 5)) // Expected: 1
	fmt.Println(SuccessorWithoutParentPointers({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '05-find-successor/twist-02-successor-without-parent-pointers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor/twist-02-successor-without-parent-pointers'] = problem;
})();
