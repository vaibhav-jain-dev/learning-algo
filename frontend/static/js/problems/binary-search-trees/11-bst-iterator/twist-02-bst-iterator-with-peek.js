/**
 * BST Iterator with Peek
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-iterator
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Iterator with Peek',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Add a peek() method that returns the next value without advancing the iterator. The peek() call should not affect subsequent next() calls.',
        problem: 'You must separate the "look ahead" from the "advance" operation. This requires caching the next value or ensuring the stack state is preserved during peek, adding a layer of state management. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[7,3,15,null,null,9,20],"operations":["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]},
                output: [7,3,15],
                explanation: 'The bst iterator with peek for this input yields [7, 3, 15].'
            },
            // Edge case
            {
                input: {"tree":[7],"operations":["next"]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bst_iterator_with_peek(tree, operations):
    """
    BST Iterator with Peek

    Add a peek() method that returns the next value without advancing the iterator. The peek() call should not affect subsequent next() calls.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bst_iterator_with_peek([7,3,15,None,None,9,20], ["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]))  # Expected: [7,3,15]
print(bst_iterator_with_peek([7], ["next"]))  # Expected: []
`,
            go: `package main

import "fmt"

// BstIteratorWithPeek solves the BST Iterator with Peek problem.
// Add a peek() method that returns the next value without advancing the iterator. The peek() call should not affect subsequent next() calls.
// Time: O(n), Space: O(1)
func BstIteratorWithPeek(tree []int, operations []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BstIteratorWithPeek([]int{7, 3, 15, null, null, 9, 20}, []string{"next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"})) // Expected: [7,3,15]
	fmt.Println(BstIteratorWithPeek([]int{7}, []string{"next"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-02-bst-iterator-with-peek', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-02-bst-iterator-with-peek'] = problem;
})();
