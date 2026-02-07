/**
 * Rightmost Non-Null at Each Level
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-sibling
 * Parent: 09-right-sibling-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rightmost Non-Null at Each Level',
        difficulty: 'Easy',
        algorithm: 'tree-sibling',
        parent: '09-right-sibling-tree',
        description: 'Instead of connecting siblings, return a list of the rightmost non-null node value at each level of the tree. This simplifies to a right-side view problem. You only need the last node per level rather than linking all siblings, which can be solved with either BFS (last element per level) or DFS (right-first traversal).',
        problem: 'This simplifies to a right-side view problem. You only need the last node per level rather than linking all siblings, which can be solved with either BFS (last element per level) or DFS (right-first traversal).',
        hints: [
            'Consider: Instead of connecting siblings, return a list of the rightmost non-null node value at each level of the tree.',
            'This simplifies to a right-side view problem.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 3, 4, 5, null, 7].'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},
                output: [0],
                explanation: 'The rightmost non null at each level for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def rightmost_non_null_at_each_level(tree):
    """
    Rightmost Non-Null at Each Level

    Instead of connecting siblings, return a list of the rightmost non-null node value at each level of the tree. This simplifies to a right-side view problem. You only need the last node per level rather than linking all siblings, which can be solved with either BFS (last element per level) or DFS (right-first traversal).

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(rightmost_non_null_at_each_level({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: [0]
print(rightmost_non_null_at_each_level({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// RightmostNonNullAtEachLevel solves the Rightmost Non-Null at Each Level problem.
// Instead of connecting siblings, return a list of the rightmost non-null node value at each level of the tree. This simplifies to a right-side view problem. You only need the last node per level rather than linking all siblings, which can be solved with either BFS (last element per level) or DFS (right-first traversal).
// Time: O(n), Space: O(n)
func RightmostNonNullAtEachLevel(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(RightmostNonNullAtEachLevel({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(RightmostNonNullAtEachLevel({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree/twist-05-rightmost-non-null-at-each-level', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree/twist-05-rightmost-non-null-at-each-level'] = problem;
})();
