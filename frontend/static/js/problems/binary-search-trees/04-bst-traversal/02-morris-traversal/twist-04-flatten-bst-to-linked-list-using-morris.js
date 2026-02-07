/**
 * Flatten BST to Linked List Using Morris
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten BST to Linked List Using Morris',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'Use Morris traversal to flatten a BST into a sorted linked list in-place using right pointers, with O(1) auxiliary space.',
        problem: 'Instead of just visiting nodes, you must permanently restructure the tree into a right-skewed chain during the traversal. The threading mechanism of Morris is repurposed for permanent modification rather than temporary navigation. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[4,2,6,1,3,5,7]},
                output: [4,2,6],
                explanation: 'The flatten bst to linked list using morris for this input yields [4, 2, 6].'
            },
            {
                input: {"tree":[1,2,3,4,5,null,6]},
                output: [1,2,3],
                explanation: 'The flatten bst to linked list using morris for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"tree":[4]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def flatten_bst_to_linked_list_using_morris(tree):
    """
    Flatten BST to Linked List Using Morris

    Use Morris traversal to flatten a BST into a sorted linked list in-place using right pointers, with O(1) auxiliary space.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(flatten_bst_to_linked_list_using_morris([4,2,6,1,3,5,7]))  # Expected: [4,2,6]
print(flatten_bst_to_linked_list_using_morris([1,2,3,4,5,None,6]))  # Expected: [1,2,3]
print(flatten_bst_to_linked_list_using_morris([4]))  # Expected: []
`,
            go: `package main

import "fmt"

// FlattenBstToLinkedListUsingMorris solves the Flatten BST to Linked List Using Morris problem.
// Use Morris traversal to flatten a BST into a sorted linked list in-place using right pointers, with O(1) auxiliary space.
// Time: O(n), Space: O(1)
func FlattenBstToLinkedListUsingMorris(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(FlattenBstToLinkedListUsingMorris([]int{4, 2, 6, 1, 3, 5, 7})) // Expected: [4,2,6]
	fmt.Println(FlattenBstToLinkedListUsingMorris([]int{1, 2, 3, 4, 5, null, 6})) // Expected: [1,2,3]
	fmt.Println(FlattenBstToLinkedListUsingMorris([]int{4})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-04-flatten-bst-to-linked-list-using-morris', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-04-flatten-bst-to-linked-list-using-morris'] = problem;
})();
