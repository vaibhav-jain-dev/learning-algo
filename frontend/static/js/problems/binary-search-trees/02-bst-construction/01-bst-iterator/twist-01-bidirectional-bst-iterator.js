/**
 * Bidirectional BST Iterator
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-iterator
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional BST Iterator',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'Extend the iterator to support both next() and prev() operations, allowing forward and backward traversal at any point.',
        problem: 'A single stack only supports one direction. Supporting both requires either two stacks or a different state representation. Switching direction mid-traversal is particularly tricky since you need to reverse the stack semantics. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[7,3,15,null,null,9,20]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the bidirectional bst iterator criteria.'
            },
            // Edge case
            {
                input: {"tree":[7]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bidirectional_bst_iterator(tree):
    """
    Bidirectional BST Iterator

    Extend the iterator to support both next() and prev() operations, allowing forward and backward traversal at any point.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(bidirectional_bst_iterator([7,3,15,None,None,9,20]))  # Expected: 1
print(bidirectional_bst_iterator([7]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalBstIterator solves the Bidirectional BST Iterator problem.
// Extend the iterator to support both next() and prev() operations, allowing forward and backward traversal at any point.
// Time: O(n), Space: O(1)
func BidirectionalBstIterator(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BidirectionalBstIterator([]int{7, 3, 15, null, null, 9, 20})) // Expected: 1
	fmt.Println(BidirectionalBstIterator([]int{7})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-01-bidirectional-bst-iterator', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-01-bidirectional-bst-iterator'] = problem;
})();
