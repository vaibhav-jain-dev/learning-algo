/**
 * Remove Duplicates from Unsorted Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Duplicates from Unsorted Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Given the head of an **unsorted** singly linked list, remove all duplicate values, keeping only the first occurrence of each value. Return the head of the modified linked list.',
        problem: 'Reverse links by maintaining three pointers: prev, curr, next. For each node, save next, point curr to prev, then advance. Handle edge cases for empty or single-node lists.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        hints: [
            'Use three pointers: previous, current, and next.',
            'Save the next node before changing the current link.',
            'Move all pointers forward after reversing each link.',
            'The new head is the last non-null current pointer.',
            'Consider recursive approach for cleaner code.'
        ],
        examples: [
    {
        input: {
        "list": [
                3,
                2,
                2,
                1,
                3,
                2,
                4
        ]
},
        output: [3, 2, 1, 4],
        explanation: 'Processing the input data produces the output. For input list=[3, 2, ..., 4] (length 7), the result is [3, 2, 1, 4].'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                1
        ]
},
        output: [1],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 1, 1], the result is [1].'
    },
    {
        input: {
        "list": [
                5,
                4,
                3,
                2,
                1
        ]
},
        output: [5, 4, 3, 2, 1],
        explanation: 'Processing the input data produces the output. For input list=[5, 4, 3, 2, 1], the result is [5, 4, 3, 2, 1].'
    }
        ],
        solutions: {
            python: `def removeDuplicatesFromUnsortedLinkedList(data):
    """
    Remove Duplicates from Unsorted Linked List

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// RemoveDuplicatesFromUnsortedLinkedList solves the Remove Duplicates from Unsorted Linked List problem.
// Time: O(n), Space: O(n)
func RemoveDuplicatesFromUnsortedLinkedList(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted'] = problem;

})();
