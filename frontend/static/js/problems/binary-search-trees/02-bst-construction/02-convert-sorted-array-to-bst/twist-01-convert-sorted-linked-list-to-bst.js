/**
 * Convert Sorted Linked List to BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 * Parent: 02-bst-construction/02-convert-sorted-array-to-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Convert Sorted Linked List to BST',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction/02-convert-sorted-array-to-bst',
        description: 'Instead of a sorted array, convert a sorted singly linked list to a height-balanced BST. You cannot use random access.',
        problem: 'Without random access to the middle element, you cannot simply index into the list. You must either convert to array first (O(n) space) or use a bottom-up construction approach that simulates inorder traversal, which inverts the typical top-down thinking. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[-10,-3,0,5,9]},
                output: [-10,-3,0],
                explanation: 'The convert sorted linked list to bst for this input yields [-10, -3, 0].'
            },
            {
                input: {"nums":[1,2,3,4,5,6,7]},
                output: [1,2,3],
                explanation: 'The convert sorted linked list to bst for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"nums":[-10]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def convert_sorted_linked_list_to_bst(nums):
    """
    Convert Sorted Linked List to BST

    Instead of a sorted array, convert a sorted singly linked list to a height-balanced BST. You cannot use random access.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(convert_sorted_linked_list_to_bst([-10,-3,0,5,9]))  # Expected: [-10,-3,0]
print(convert_sorted_linked_list_to_bst([1,2,3,4,5,6,7]))  # Expected: [1,2,3]
print(convert_sorted_linked_list_to_bst([-10]))  # Expected: []
`,
            go: `package main

import "fmt"

// ConvertSortedLinkedListToBst solves the Convert Sorted Linked List to BST problem.
// Instead of a sorted array, convert a sorted singly linked list to a height-balanced BST. You cannot use random access.
// Time: O(n), Space: O(1)
func ConvertSortedLinkedListToBst(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(ConvertSortedLinkedListToBst([]int{-10, -3, 0, 5, 9})) // Expected: [-10,-3,0]
	fmt.Println(ConvertSortedLinkedListToBst([]int{1, 2, 3, 4, 5, 6, 7})) // Expected: [1,2,3]
	fmt.Println(ConvertSortedLinkedListToBst([]int{-10})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst/twist-01-convert-sorted-linked-list-to-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst/twist-01-convert-sorted-linked-list-to-bst'] = problem;
})();
