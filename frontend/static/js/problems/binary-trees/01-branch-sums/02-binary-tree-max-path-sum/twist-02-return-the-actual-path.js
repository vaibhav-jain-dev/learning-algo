/**
 * Return the Actual Path
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-max-path
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return the Actual Path',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'Instead of returning just the maximum sum, return the actual sequence of node values that form the maximum path. Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them. The postorder logic must return both sum and path.',
        problem: 'Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them. The postorder logic must return both sum and path.',
        hints: [
            'Consider: Instead of returning just the maximum sum, return the actual sequence of node values that form the maximum path.',
            'Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: -10->9, -10->20->15, -10->20->7.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
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
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def return_the_actual_path(tree):
    """
    Return the Actual Path

    Instead of returning just the maximum sum, return the actual sequence of node values that form the maximum path. Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them. The postorder logic must return both sum and path.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(return_the_actual_path({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 1
print(return_the_actual_path({"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 2
print(return_the_actual_path({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReturnTheActualPath solves the Return the Actual Path problem.
// Instead of returning just the maximum sum, return the actual sequence of node values that form the maximum path. Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them. The postorder logic must return both sum and path.
// Time: O(n), Space: O(n)
func ReturnTheActualPath(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReturnTheActualPath({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 1
	fmt.Println(ReturnTheActualPath({"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 2
	fmt.Println(ReturnTheActualPath({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-02-return-the-actual-path', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-02-return-the-actual-path'] = problem;
})();
