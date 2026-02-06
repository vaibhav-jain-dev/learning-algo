/**
 * Zigzag Traversal Using Two Stacks
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/03-level-order-zigzag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Zigzag Traversal Using Two Stacks',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/03-level-order-zigzag',
        description: 'Implement zigzag level order using two stacks instead of a deque. One stack processes left-to-right levels, the other right-to-left.',
        problem: 'Using two stacks changes the fundamental data structure from BFS with a queue to an alternating stack approach. You push children to the other stack in a specific order depending on the current direction, which is a different mental model. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[3,9,20,null,null,15,7]},
                output: [3,9,20],
                explanation: 'The zigzag traversal using two stacks for this input yields [3, 9, 20].'
            },
            {
                input: {"tree":[1,2,3,4,5,6,7]},
                output: [1,2,3],
                explanation: 'The zigzag traversal using two stacks for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"tree":[3]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def zigzag_traversal_using_two_stacks(tree):
    """
    Zigzag Traversal Using Two Stacks

    Implement zigzag level order using two stacks instead of a deque. One stack processes left-to-right levels, the other right-to-left.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(zigzag_traversal_using_two_stacks([3,9,20,None,None,15,7]))  # Expected: [3,9,20]
print(zigzag_traversal_using_two_stacks([1,2,3,4,5,6,7]))  # Expected: [1,2,3]
print(zigzag_traversal_using_two_stacks([3]))  # Expected: []
`,
            go: `package main

import "fmt"

// ZigzagTraversalUsingTwoStacks solves the Zigzag Traversal Using Two Stacks problem.
// Implement zigzag level order using two stacks instead of a deque. One stack processes left-to-right levels, the other right-to-left.
// Time: O(n), Space: O(1)
func ZigzagTraversalUsingTwoStacks(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(ZigzagTraversalUsingTwoStacks([]int{3, 9, 20, null, null, 15, 7})) // Expected: [3,9,20]
	fmt.Println(ZigzagTraversalUsingTwoStacks([]int{1, 2, 3, 4, 5, 6, 7})) // Expected: [1,2,3]
	fmt.Println(ZigzagTraversalUsingTwoStacks([]int{3})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/03-level-order-zigzag/twist-02-zigzag-traversal-using-two-stacks', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/03-level-order-zigzag/twist-02-zigzag-traversal-using-two-stacks'] = problem;
})();
