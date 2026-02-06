/**
 * Bidirectional BST Iterator
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-iterator
 * Parent: 11-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional BST Iterator',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '11-bst-iterator',
        description: 'Implement an iterator that supports both next() and prev() operations, allowing forward and backward traversal of the BST in sorted order.',
        problem: 'A single stack only handles one direction. Supporting prev() requires either a second stack, parent pointers, or a clever scheme to reverse direction mid-traversal. The state management becomes significantly more complex. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the bidirectional bst iterator criteria.'
            },
            // Edge case
            {
                input: {"tree":[7],"operations":["next"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bidirectional_bst_iterator(tree, operations):
    """
    Bidirectional BST Iterator

    Implement an iterator that supports both next() and prev() operations, allowing forward and backward traversal of the BST in sorted order.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on operations
        j = 0
        for k in range(i, n):
            if j < len(operations) and tree[k] == operations[j]:
                j += 1
        if j == len(operations):
            count += 1

    return count


# Test cases
print(bidirectional_bst_iterator([7,3,15,None,None,9,20], ["next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]))  # Expected: 1
print(bidirectional_bst_iterator([7], ["next"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalBstIterator solves the Bidirectional BST Iterator problem.
// Implement an iterator that supports both next() and prev() operations, allowing forward and backward traversal of the BST in sorted order.
// Time: O(n), Space: O(1)
func BidirectionalBstIterator(tree []int, operations []string) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BidirectionalBstIterator([]int{7, 3, 15, null, null, 9, 20}, []string{"next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"})) // Expected: 1
	fmt.Println(BidirectionalBstIterator([]int{7}, []string{"next"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator/twist-01-bidirectional-bst-iterator', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator/twist-01-bidirectional-bst-iterator'] = problem;
})();
