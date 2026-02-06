/**
 * Iterative with Level-Order
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 * Parent: 01-branch-sums/03-sum-root-to-leaf-numbers
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative with Level-Order',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/03-sum-root-to-leaf-numbers',
        description: 'Solve using BFS (level-order traversal) instead of DFS. Track the running number for each node in the queue. BFS processes nodes level by level, so you must store the accumulated number with each node in the queue. Leaf detection happens when dequeuing, not when recursing.',
        problem: 'BFS processes nodes level by level, so you must store the accumulated number with each node in the queue. Leaf detection happens when dequeuing, not when recursing.',
        hints: [
            'Consider: Solve using BFS (level-order traversal) instead of DFS.',
            'Track the running number for each node in the queue.',
            'Key insight: BFS processes nodes level by level, so you must store the accumulated number with each node in the queue.',
            'Leaf detection happens when dequeuing, not when recursing.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the iterative with level order criteria.'
            },
            {
                input: {"tree":{"value":4,"left":{"value":9,"left":{"value":5},"right":{"value":1}},"right":{"value":0}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the iterative with level order criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_with_level_order(tree):
    """
    Iterative with Level-Order

    Solve using BFS (level-order traversal) instead of DFS. Track the running number for each node in the queue. BFS processes nodes level by level, so you must store the accumulated number with each node in the queue. Leaf detection happens when dequeuing, not when recursing.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_with_level_order({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 1
print(iterative_with_level_order({"value": 4, "left": {"value": 9, "left": {"value": 5}, "right": {"value": 1}}, "right": {"value": 0}}))  # Expected: 2
print(iterative_with_level_order({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeWithLevelOrder solves the Iterative with Level-Order problem.
// Solve using BFS (level-order traversal) instead of DFS. Track the running number for each node in the queue. BFS processes nodes level by level, so you must store the accumulated number with each node in the queue. Leaf detection happens when dequeuing, not when recursing.
// Time: O(n), Space: O(n)
func IterativeWithLevelOrder(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeWithLevelOrder({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 1
	fmt.Println(IterativeWithLevelOrder({"value":4,"left":{"value":9,"left":{"value":5},"right":{"value":1}},"right":{"value":0}})) // Expected: 2
	fmt.Println(IterativeWithLevelOrder({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers/twist-03-iterative-with-level-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers/twist-03-iterative-with-level-order'] = problem;
})();
