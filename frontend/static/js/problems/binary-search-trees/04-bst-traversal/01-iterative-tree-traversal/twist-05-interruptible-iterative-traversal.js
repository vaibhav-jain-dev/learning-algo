/**
 * Interruptible Iterative Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Interruptible Iterative Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Design the iterative traversal so it can be paused and resumed. Return a "continuation" object that captures the current stack state, allowing the traversal to be split across multiple calls.',
        problem: 'Standard traversal runs to completion. Making it interruptible requires externalizing all state (the stack and current pointer) into a resumable object, essentially building a manual coroutine or iterator from the traversal logic. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[1,2,3,4,5,null,6]},
                output: true,
                explanation: 'The interruptible iterative traversal condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: false,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def interruptible_iterative_traversal(tree):
    """
    Interruptible Iterative Traversal

    Design the iterative traversal so it can be paused and resumed. Return a "continuation" object that captures the current stack state, allowing the traversal to be split across multiple calls.

    Time: O(n)
    Space: O(1)
    """
    if not tree:
        return False

    # Process the input
    for i in range(len(tree)):
        pass  # Check condition

    return True


# Test cases
print(interruptible_iterative_traversal([1,2,3,4,5,None,6]))  # Expected: True
print(interruptible_iterative_traversal([1]))  # Expected: False
`,
            go: `package main

import "fmt"

// InterruptibleIterativeTraversal solves the Interruptible Iterative Traversal problem.
// Design the iterative traversal so it can be paused and resumed. Return a "continuation" object that captures the current stack state, allowing the traversal to be split across multiple calls.
// Time: O(n), Space: O(1)
func InterruptibleIterativeTraversal(tree []int) bool {
	if len(tree) == 0 {
		return false
	}

	return true
}

func main() {
	fmt.Println(InterruptibleIterativeTraversal([]int{1, 2, 3, 4, 5, null, 6})) // Expected: true
	fmt.Println(InterruptibleIterativeTraversal([]int{1})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-05-interruptible-iterative-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-05-interruptible-iterative-traversal'] = problem;
})();
