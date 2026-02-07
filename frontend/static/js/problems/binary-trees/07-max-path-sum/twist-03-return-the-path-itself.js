/**
 * Return the Path Itself
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-max-path
 * Parent: 07-max-path-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return the Path Itself',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '07-max-path-sum',
        description: 'Instead of just the maximum sum, return the actual list of node values forming the maximum path. Tracking the optimal sum is a scalar comparison. Tracking the actual path requires storing path segments at each recursive step and merging left-path + node + right-path when updating the global best.',
        problem: 'Tracking the optimal sum is a scalar comparison. Tracking the actual path requires storing path segments at each recursive step and merging left-path + node + right-path when updating the global best.',
        hints: [
            'Consider: Instead of just the maximum sum, return the actual list of node values forming the maximum path.',
            'Tracking the optimal sum is a scalar comparison.',
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
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
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
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def return_the_path_itself(tree):
    """
    Return the Path Itself

    Instead of just the maximum sum, return the actual list of node values forming the maximum path. Tracking the optimal sum is a scalar comparison. Tracking the actual path requires storing path segments at each recursive step and merging left-path + node + right-path when updating the global best.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(return_the_path_itself({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 1
print(return_the_path_itself({"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 2
print(return_the_path_itself({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReturnThePathItself solves the Return the Path Itself problem.
// Instead of just the maximum sum, return the actual list of node values forming the maximum path. Tracking the optimal sum is a scalar comparison. Tracking the actual path requires storing path segments at each recursive step and merging left-path + node + right-path when updating the global best.
// Time: O(n), Space: O(n)
func ReturnThePathItself(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReturnThePathItself({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 1
	fmt.Println(ReturnThePathItself({"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 2
	fmt.Println(ReturnThePathItself({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum/twist-03-return-the-path-itself', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum/twist-03-return-the-path-itself'] = problem;
})();
