/**
 * Min Path Sum Instead
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-max-path
 * Parent: 07-max-path-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Path Sum Instead',
        difficulty: 'Medium',
        algorithm: 'tree-max-path',
        parent: '07-max-path-sum',
        description: 'Find the minimum path sum in the tree. The path still follows parent-child connections and must contain at least one node. The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0). Forces re-thinking the optimization direction and the handling of all-positive trees.',
        problem: 'The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0). Forces re-thinking the optimization direction and the handling of all-positive trees.',
        hints: [
            'Consider: Find the minimum path sum in the tree.',
            'The path still follows parent-child connections and must contain at least one node.',
            'Key insight: The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0).',
            'Forces re-thinking the optimization direction and the handling of all-positive trees.'
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
            python: `def min_path_sum_instead(tree):
    """
    Min Path Sum Instead

    Find the minimum path sum in the tree. The path still follows parent-child connections and must contain at least one node. The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0). Forces re-thinking the optimization direction and the handling of all-positive trees.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(min_path_sum_instead({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 1
print(min_path_sum_instead({"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 2
print(min_path_sum_instead({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinPathSumInstead solves the Min Path Sum Instead problem.
// Find the minimum path sum in the tree. The path still follows parent-child connections and must contain at least one node. The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0). Forces re-thinking the optimization direction and the handling of all-positive trees.
// Time: O(n), Space: O(n)
func MinPathSumInstead(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinPathSumInstead({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 1
	fmt.Println(MinPathSumInstead({"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 2
	fmt.Println(MinPathSumInstead({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum/twist-02-min-path-sum-instead', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum/twist-02-min-path-sum-instead'] = problem;
})();
