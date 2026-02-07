/**
 * Right Sibling with O(1) Space
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-sibling
 * Parent: 09-right-sibling-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Sibling with O(1) Space',
        difficulty: 'Hard',
        algorithm: 'tree-sibling',
        parent: '09-right-sibling-tree',
        description: 'Perform the right sibling transformation using only O(1) extra space (no queue, no recursion). Use the already-established sibling pointers from the previous level to traverse the current level. The standard BFS approach uses O(w) space for the queue. The O(1) approach uses previously linked levels as a "virtual linked list" to iterate and connect the next level, requiring a fundamentally different traversal pattern.',
        problem: 'The standard BFS approach uses O(w) space for the queue. The O(1) approach uses previously linked levels as a "virtual linked list" to iterate and connect the next level, requiring a fundamentally different traversal pattern.',
        hints: [
            'Consider: Perform the right sibling transformation using only O(1) extra space (no queue, no recursion).',
            'Use the already-established sibling pointers from the previous level to traverse the current level.',
            'Key insight: The standard BFS approach uses O(w) space for the queue.',
            'The O(1) approach uses previously linked levels as a "virtual linked list" to iterate and connect the next level, requiring a fundamentally different traversal pattern.'
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
                explanation: 'The right sibling with o1 space for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def right_sibling_with_o1_space(tree):
    """
    Right Sibling with O(1) Space

    Perform the right sibling transformation using only O(1) extra space (no queue, no recursion). Use the already-established sibling pointers from the previous level to traverse the current level. The standard BFS approach uses O(w) space for the queue. The O(1) approach uses previously linked levels as a "virtual linked list" to iterate and connect the next level, requiring a fundamentally different traversal pattern.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(right_sibling_with_o1_space({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: [0]
print(right_sibling_with_o1_space({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// RightSiblingWithO1Space solves the Right Sibling with O(1) Space problem.
// Perform the right sibling transformation using only O(1) extra space (no queue, no recursion). Use the already-established sibling pointers from the previous level to traverse the current level. The standard BFS approach uses O(w) space for the queue. The O(1) approach uses previously linked levels as a "virtual linked list" to iterate and connect the next level, requiring a fundamentally different traversal pattern.
// Time: O(n), Space: O(n)
func RightSiblingWithO1Space(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(RightSiblingWithO1Space({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(RightSiblingWithO1Space({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree/twist-04-right-sibling-with-o1-space', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree/twist-04-right-sibling-with-o1-space'] = problem;
})();
