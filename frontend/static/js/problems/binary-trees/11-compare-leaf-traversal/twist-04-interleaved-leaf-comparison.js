/**
 * Interleaved Leaf Comparison
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 * Parent: 11-compare-leaf-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Interleaved Leaf Comparison',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '11-compare-leaf-traversal',
        description: 'Compare leaf traversals of two trees one leaf at a time using iterators (generators), stopping as soon as a mismatch is found, without collecting all leaves first. Collecting all leaves uses O(n) space. Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily. This is an exercise in generator-based thinking and early termination.',
        problem: 'Collecting all leaves uses O(n) space. Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily. This is an exercise in generator-based thinking and early termination.',
        hints: [
            'Consider: Compare leaf traversals of two trees one leaf at a time using iterators (generators), stopping as soon as a mismatch is found, without collecting all leaves first.',
            'Collecting all leaves uses O(n) space.',
            'Key insight: Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily.',
            'This is an exercise in generator-based thinking and early termination.'
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
                explanation: 'The interleaved leaf comparison condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree1":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"tree2":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}}},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def interleaved_leaf_comparison(tree1, tree2):
    """
    Interleaved Leaf Comparison

    Compare leaf traversals of two trees one leaf at a time using iterators (generators), stopping as soon as a mismatch is found, without collecting all leaves first. Collecting all leaves uses O(n) space. Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily. This is an exercise in generator-based thinking and early termination.

    Time: O(n)
    Space: O(n)
    """
    j = 0

    for i in range(len(tree1)):
        if j < len(tree2) and tree1[i] == tree2[j]:
            j += 1

    return j == len(tree2)


# Test cases
print(interleaved_leaf_comparison({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 7, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 3, "left": {"value": 8}}}))  # Expected: True
print(interleaved_leaf_comparison({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 7, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 3, "left": {"value": 8}}}))  # Expected: False
`,
            go: `package main

import "fmt"

// InterleavedLeafComparison solves the Interleaved Leaf Comparison problem.
// Compare leaf traversals of two trees one leaf at a time using iterators (generators), stopping as soon as a mismatch is found, without collecting all leaves first. Collecting all leaves uses O(n) space. Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily. This is an exercise in generator-based thinking and early termination.
// Time: O(n), Space: O(n)
func InterleavedLeafComparison(tree1 *TreeNode, tree2 *TreeNode) bool {
	j := 0

	for i := 0; i < len(tree1) && j < len(tree2); i++ {
		if tree1[i] == tree2[j] {
			j++
		}
	}

	return j == len(tree2)
}

func main() {
	fmt.Println(InterleavedLeafComparison({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, {"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}})) // Expected: true
	fmt.Println(InterleavedLeafComparison({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, {"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal/twist-04-interleaved-leaf-comparison', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal/twist-04-interleaved-leaf-comparison'] = problem;
})();
