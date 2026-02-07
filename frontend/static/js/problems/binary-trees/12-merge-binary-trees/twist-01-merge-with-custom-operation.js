/**
 * Merge with Custom Operation
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-merge
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge with Custom Operation',
        difficulty: 'Medium',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Instead of summing overlapping node values, apply a custom operation: take the maximum of the two values when both nodes exist. The traversal structure is identical but the merge operation changes. This tests whether you can parameterize the merge function and highlights that the tree-merging pattern is independent of the value combination strategy.',
        problem: 'The traversal structure is identical but the merge operation changes. This tests whether you can parameterize the merge function and highlights that the tree-merging pattern is independent of the value combination strategy.',
        hints: [
            'Consider: Instead of summing overlapping node values, apply a custom operation: take the maximum of the two values when both nodes exist.',
            'The traversal structure is identical but the merge operation changes.',
            'Think about how the base case differs from the original problem.'
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
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree1":{"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}},"tree2":{"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def merge_with_custom_operation(tree1, tree2):
    """
    Merge with Custom Operation

    Instead of summing overlapping node values, apply a custom operation: take the maximum of the two values when both nodes exist. The traversal structure is identical but the merge operation changes. This tests whether you can parameterize the merge function and highlights that the tree-merging pattern is independent of the value combination strategy.

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
print(merge_with_custom_operation({"value": 1, "left": {"value": 3, "left": {"value": 5}}, "right": {"value": 2}}, {"value": 2, "left": {"value": 1, "right": {"value": 4}}, "right": {"value": 3, "right": {"value": 7}}}))  # Expected: 1
print(merge_with_custom_operation({"value": 1, "left": {"value": 3, "left": {"value": 5}}, "right": {"value": 2}}, {"value": 2, "left": {"value": 1, "right": {"value": 4}}, "right": {"value": 3, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// MergeWithCustomOperation solves the Merge with Custom Operation problem.
// Instead of summing overlapping node values, apply a custom operation: take the maximum of the two values when both nodes exist. The traversal structure is identical but the merge operation changes. This tests whether you can parameterize the merge function and highlights that the tree-merging pattern is independent of the value combination strategy.
// Time: O(n), Space: O(n)
func MergeWithCustomOperation(tree1 *TreeNode, tree2 *TreeNode) int {
	result := 0

	for i := 0; i < len(tree1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MergeWithCustomOperation({"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}}, {"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}})) // Expected: 1
	fmt.Println(MergeWithCustomOperation({"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}}, {"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-01-merge-with-custom-operation', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-01-merge-with-custom-operation'] = problem;
})();
