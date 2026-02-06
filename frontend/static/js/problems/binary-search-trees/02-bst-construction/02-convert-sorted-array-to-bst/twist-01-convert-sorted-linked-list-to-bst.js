/**
 * Convert Sorted Linked List to BST
 * Category: binary-search-trees
 * Difficulty: Medium
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
                  "Start with the base problem solution and identify what changes: convert sorted linked list to bst.",
                  "Consider how without random access to the middle element, you cannot simply index into the list affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'LinkedList: 1->2->3->4->5 -> BST: [3,2,5,1,null,4] (height-balanced).'
            }
        ],
        solutions: {
            python: `# Convert Sorted Linked List to BST
# Difficulty: Medium
# Parent: 02-bst-construction/02-convert-sorted-array-to-bst
#
# Instead of a sorted array, convert a sorted singly linked list to a height-balanced BST. You cannot use random access.

def convertSortedLinkedListToBst(data):
    """
    Convert Sorted Linked List to BST

    Approach: Without random access to the middle element, you cannot simply index into the list.
    """
    # TODO: Implement solution
    # Key insight: Without random access to the middle element, you cannot simply index into the list
    pass


# Test
if __name__ == "__main__":
    # Example: LinkedList: 1->2->3->4->5 -> BST: [3,2,5,1,null,4] (height-balanced)
    print(convertSortedLinkedListToBst({}))`,
            go: `package main

import "fmt"

// Convert Sorted Linked List to BST
// Difficulty: Medium
// Parent: 02-bst-construction/02-convert-sorted-array-to-bst
//
// Instead of a sorted array, convert a sorted singly linked list to a height-balanced BST. You cannot use random access.

func ConvertSortedLinkedListToBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Without random access to the middle element, you cannot simply index into the list
    return nil
}

func main() {
    // Example: LinkedList: 1->2->3->4->5 -> BST: [3,2,5,1,null,4] (height-balanced)
    fmt.Println(ConvertSortedLinkedListToBst(map[string]interface{}{}))
}`
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
