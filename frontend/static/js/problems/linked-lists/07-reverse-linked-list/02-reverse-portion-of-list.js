/**
 * Reverse Linked List II (Reverse Portion)
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Linked List II (Reverse Portion)',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list. Positions are 1-indexed.',
        problem: 'Reverse links by maintaining three pointers: prev, curr, next. For each node, save next, point curr to prev, then advance. Handle edge cases for empty or single-node lists.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
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
                1,
                2,
                3,
                4,
                5
        ],
        "left": 2,
        "right": 4
},
        output: [1, 4, 3, 2, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=2, right=4, the result is [1, 4, 3, 2, 5].'
    },
    {
        input: {
        "list": [
                5
        ],
        "left": 1,
        "right": 1
},
        output: [5],
        explanation: 'Processing the input data produces the output. For input list=[5], left=1, right=1, the result is [5].'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "left": 1,
        "right": 5
},
        output: [5, 4, 3, 2, 1],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=1, right=5, the result is [5, 4, 3, 2, 1].'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "left": 3,
        "right": 4
},
        output: [1, 2, 4, 3, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=3, right=4, the result is [1, 2, 4, 3, 5].'
    }
        ],
        solutions: {
            python: `def reverseLinkedListIiReversePortion(data):
    """
    Reverse Linked List II (Reverse Portion)

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Maintain prev, curr, next pointers while reversing

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

// ReverseLinkedListIiReversePortion solves the Reverse Linked List II (Reverse Portion) problem.
// Time: O(n), Space: O(n)
func ReverseLinkedListIiReversePortion(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Maintain prev, curr, next pointers while reversing

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
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list'] = problem;

})();
