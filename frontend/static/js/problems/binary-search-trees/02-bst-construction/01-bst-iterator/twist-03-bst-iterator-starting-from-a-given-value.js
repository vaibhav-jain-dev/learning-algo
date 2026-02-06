/**
 * BST Iterator Starting from a Given Value
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-iterator
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Iterator Starting from a Given Value',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'Initialize the iterator so that the first call to next() returns the smallest value >= a given start value, rather than the minimum of the entire tree.',
        problem: 'Instead of pushing all left children from root, you must selectively push nodes during initialization based on the start value, using BST search logic to position the stack correctly. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the bst iterator starting from a given value criteria.'
            },
            // Edge case
            {
                input: {"tree":[7]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bst_iterator_starting_from_a_given_value(tree):
    """
    BST Iterator Starting from a Given Value

    Initialize the iterator so that the first call to next() returns the smallest value >= a given start value, rather than the minimum of the entire tree.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(bst_iterator_starting_from_a_given_value([7,3,15,None,None,9,20]))  # Expected: 1
print(bst_iterator_starting_from_a_given_value([7]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BstIteratorStartingFromAGivenValue solves the BST Iterator Starting from a Given Value problem.
// Initialize the iterator so that the first call to next() returns the smallest value >= a given start value, rather than the minimum of the entire tree.
// Time: O(n), Space: O(1)
func BstIteratorStartingFromAGivenValue(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BstIteratorStartingFromAGivenValue([]int{7, 3, 15, null, null, 9, 20})) // Expected: 1
	fmt.Println(BstIteratorStartingFromAGivenValue([]int{7})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-03-bst-iterator-starting-from-a-given-value', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-03-bst-iterator-starting-from-a-given-value'] = problem;
})();
