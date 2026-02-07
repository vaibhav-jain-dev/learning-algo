/**
 * BST Iterator with Peek
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-iterator
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Iterator with Peek',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'Add a peek() operation that returns the next value without advancing the iterator. It must be O(1) time.',
        problem: 'While conceptually simple, peek() must not modify the stack state. You need to think about caching the top-of-stack value and handling the case where peek is called multiple times vs. interleaved with next(). Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: [7,3,15],
                explanation: 'The bst iterator with peek for this input yields [7, 3, 15].'
            },
            // Edge case
            {
                input: {"tree":[7]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def bst_iterator_with_peek(tree):
    """
    BST Iterator with Peek

    Add a peek() operation that returns the next value without advancing the iterator. It must be O(1) time.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bst_iterator_with_peek([7,3,15,None,None,9,20]))  # Expected: [7,3,15]
print(bst_iterator_with_peek([7]))  # Expected: []
`,
            go: `package main

import "fmt"

// BstIteratorWithPeek solves the BST Iterator with Peek problem.
// Add a peek() operation that returns the next value without advancing the iterator. It must be O(1) time.
// Time: O(n), Space: O(1)
func BstIteratorWithPeek(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BstIteratorWithPeek([]int{7, 3, 15, null, null, 9, 20})) // Expected: [7,3,15]
	fmt.Println(BstIteratorWithPeek([]int{7})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-02-bst-iterator-with-peek', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-02-bst-iterator-with-peek'] = problem;
})();
