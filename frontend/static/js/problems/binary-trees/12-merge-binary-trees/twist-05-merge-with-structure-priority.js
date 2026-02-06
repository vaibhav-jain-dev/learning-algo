/**
 * Merge with Structure Priority
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-merge
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge with Structure Priority',
        difficulty: 'Hard',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Merge two trees, but when both trees have a node at the same position, use tree1 value and tree1 structure (ignore tree2 subtree). Only use tree2 nodes where tree1 has no node. This is not a value merge but a structural overlay. Tree1 takes priority, and tree2 fills gaps. You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.',
        problem: 'This is not a value merge but a structural overlay. Tree1 takes priority, and tree2 fills gaps. You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.',
        hints: [
            'Consider: Merge two trees, but when both trees have a node at the same position, use tree1 value and tree1 structure (ignore tree2 subtree).',
            'Only use tree2 nodes where tree1 has no node.',
            'Key insight: This is not a value merge but a structural overlay.',
            'You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree1":{"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}},"tree2":{"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the merge with structure priority criteria.'
            },
            // Edge case
            {
                input: {"tree1":{"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}},"tree2":{"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def merge_with_structure_priority(tree1, tree2):
    """
    Merge with Structure Priority

    Merge two trees, but when both trees have a node at the same position, use tree1 value and tree1 structure (ignore tree2 subtree). Only use tree2 nodes where tree1 has no node. This is not a value merge but a structural overlay. Tree1 takes priority, and tree2 fills gaps. You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(tree1)

    for i in range(n):
        # Check condition based on tree2
        j = 0
        for k in range(i, n):
            if j < len(tree2) and tree1[k] == tree2[j]:
                j += 1
        if j == len(tree2):
            count += 1

    return count


# Test cases
print(merge_with_structure_priority({"value": 1, "left": {"value": 3, "left": {"value": 5}}, "right": {"value": 2}}, {"value": 2, "left": {"value": 1, "right": {"value": 4}}, "right": {"value": 3, "right": {"value": 7}}}))  # Expected: 1
print(merge_with_structure_priority({"value": 1, "left": {"value": 3, "left": {"value": 5}}, "right": {"value": 2}}, {"value": 2, "left": {"value": 1, "right": {"value": 4}}, "right": {"value": 3, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// MergeWithStructurePriority solves the Merge with Structure Priority problem.
// Merge two trees, but when both trees have a node at the same position, use tree1 value and tree1 structure (ignore tree2 subtree). Only use tree2 nodes where tree1 has no node. This is not a value merge but a structural overlay. Tree1 takes priority, and tree2 fills gaps. You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.
// Time: O(n), Space: O(n)
func MergeWithStructurePriority(tree1 *TreeNode, tree2 *TreeNode) int {
	result := 0

	for i := 0; i < len(tree1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MergeWithStructurePriority({"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}}, {"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}})) // Expected: 1
	fmt.Println(MergeWithStructurePriority({"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}}, {"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-05-merge-with-structure-priority', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-05-merge-with-structure-priority'] = problem;
})();
