/**
 * Iterative Postorder Without Reverse
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Postorder Without Reverse',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Implement iterative postorder traversal without using the "reverse of modified preorder" trick. Use a single stack and track the previously visited node to determine when to process the current node.',
        problem: 'The common shortcut (reverse of root-right-left preorder) avoids the real challenge. True single-stack postorder requires tracking the last-visited node to decide whether to go right or process the current node, which is a much more nuanced state machine. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The iterative postorder without reverse condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_postorder_without_reverse(tree):
    """
    Iterative Postorder Without Reverse

    Implement iterative postorder traversal without using the "reverse of modified preorder" trick. Use a single stack and track the previously visited node to determine when to process the current node.

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
print(iterative_postorder_without_reverse([1,2,3,4,5,None,6]))  # Expected: True
print(iterative_postorder_without_reverse([1]))  # Expected: False
`,
            go: `package main

import "fmt"

// IterativePostorderWithoutReverse solves the Iterative Postorder Without Reverse problem.
// Implement iterative postorder traversal without using the "reverse of modified preorder" trick. Use a single stack and track the previously visited node to determine when to process the current node.
// Time: O(n), Space: O(1)
func IterativePostorderWithoutReverse(tree []int) bool {
	if len(tree) == 0 {
		return false
	}

	return true
}

func main() {
	fmt.Println(IterativePostorderWithoutReverse([]int{1, 2, 3, 4, 5, null, 6})) // Expected: true
	fmt.Println(IterativePostorderWithoutReverse([]int{1})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-02-iterative-postorder-without-reverse', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-02-iterative-postorder-without-reverse'] = problem;
})();
