/**
 * Iterative Symmetry Check
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-symmetry
 * Parent: 13-symmetrical-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Symmetry Check',
        difficulty: 'Medium',
        algorithm: 'tree-symmetry',
        parent: '13-symmetrical-tree',
        description: 'Check if the tree is symmetric using an iterative approach with a queue or stack, without any recursion. The recursive solution naturally mirrors the two-pointer comparison. Iteratively, you must enqueue pairs of nodes in the correct mirror order, which requires careful bookkeeping of which nodes to compare.',
        problem: 'The recursive solution naturally mirrors the two-pointer comparison. Iteratively, you must enqueue pairs of nodes in the correct mirror order, which requires careful bookkeeping of which nodes to compare.',
        hints: [
            'Consider: Check if the tree is symmetric using an iterative approach with a queue or stack, without any recursion.',
            'The recursive solution naturally mirrors the two-pointer comparison.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 2, 3, 4, 4, 3].'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":3},"right":{"value":4}},"right":{"value":2,"left":{"value":4},"right":{"value":3}}}},
                output: [[0,1]],
                explanation: 'Found 1 group(s) matching the criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"right":{"value":3}},"right":{"value":2,"right":{"value":3}}}},
                output: [[0,1],[2,3]],
                explanation: 'Found 2 group(s) matching the criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":3},"right":{"value":4}},"right":{"value":2,"left":{"value":4},"right":{"value":3}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_symmetry_check(tree):
    """
    Iterative Symmetry Check

    Check if the tree is symmetric using an iterative approach with a queue or stack, without any recursion. The recursive solution naturally mirrors the two-pointer comparison. Iteratively, you must enqueue pairs of nodes in the correct mirror order, which requires careful bookkeeping of which nodes to compare.

    Time: O(n)
    Space: O(n)
    """
    result = []
    n = len(tree)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([tree[i], tree[j]])

    return result


# Test cases
print(iterative_symmetry_check({"value": 1, "left": {"value": 2, "left": {"value": 3}, "right": {"value": 4}}, "right": {"value": 2, "left": {"value": 4}, "right": {"value": 3}}}))  # Expected: [[0,1]]
print(iterative_symmetry_check({"value": 1, "left": {"value": 2, "right": {"value": 3}}, "right": {"value": 2, "right": {"value": 3}}}))  # Expected: [[0,1],[2,3]]
print(iterative_symmetry_check({"value": 1, "left": {"value": 2, "left": {"value": 3}, "right": {"value": 4}}, "right": {"value": 2, "left": {"value": 4}, "right": {"value": 3}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeSymmetryCheck solves the Iterative Symmetry Check problem.
// Check if the tree is symmetric using an iterative approach with a queue or stack, without any recursion. The recursive solution naturally mirrors the two-pointer comparison. Iteratively, you must enqueue pairs of nodes in the correct mirror order, which requires careful bookkeeping of which nodes to compare.
// Time: O(n), Space: O(n)
func IterativeSymmetryCheck(tree *TreeNode) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(tree); i++ {
		for j := i + 1; j < len(tree); j++ {
			result = append(result, []int{tree[i], tree[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(IterativeSymmetryCheck({"value":1,"left":{"value":2,"left":{"value":3},"right":{"value":4}},"right":{"value":2,"left":{"value":4},"right":{"value":3}}})) // Expected: [[0,1]]
	fmt.Println(IterativeSymmetryCheck({"value":1,"left":{"value":2,"right":{"value":3}},"right":{"value":2,"right":{"value":3}}})) // Expected: [[0,1],[2,3]]
	fmt.Println(IterativeSymmetryCheck({"value":1,"left":{"value":2,"left":{"value":3},"right":{"value":4}},"right":{"value":2,"left":{"value":4},"right":{"value":3}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '13-symmetrical-tree/twist-04-iterative-symmetry-check', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/13-symmetrical-tree/twist-04-iterative-symmetry-check'] = problem;
})();
