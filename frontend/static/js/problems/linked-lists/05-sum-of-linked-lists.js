/**
 * Sum of Linked Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum of Linked Lists',
        difficulty: 'Medium',
        algorithm: 'll-sum',
        description: 'You\'re given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Write a function that adds the two numbers and returns the sum as a linked list. The linked list representation means that the number 123 would be represented as 3 -> 2 -> 1 (least significant digit first).',
        problem: 'Traverse the linked list with appropriate pointer management. Keep track of previous, current, and next nodes as needed. Be careful to update pointers in the correct order to avoid losing references. This achieves O(max(n,m)) time with O(max(n,m)) space.',
        hints: [
            'Think about what pointers you need to maintain as you traverse the list.',
            'The runner technique (slow and fast pointers) solves many linked list problems.',
            'Be careful about edge cases: empty list, single node, and the head/tail nodes.',
            'Draw out the pointer changes step by step before coding to avoid losing references.'
        ],

        complexity: {
            time: 'O(max(n,m))',
            space: 'O(max(n,m))'
        },
        examples: [
    {
        input: {
        "list1": [
                2,
                4,
                7,
                1
        ],
        "list2": [
                9,
                4,
                5
        ]
},
        output: [1, 9, 2, 2],
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list1": [
                9,
                9,
                9
        ],
        "list2": [
                1
        ]
},
        output: [0, 0, 0, 1],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    },
    {
        input: {
        "list1": [
                5,
                6,
                3
        ],
        "list2": [
                8,
                4,
                2
        ]
},
        output: [3, 1, 6],
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
    }
        ],
        twists: [
            { id: '05-sum-of-linked-lists/twist-01-most-significant-digit-first', name: 'Most Significant Digit First', difficulty: 'Medium' },
            { id: '05-sum-of-linked-lists/twist-02-subtract-linked-lists', name: 'Subtract Linked Lists', difficulty: 'Hard' },
            { id: '05-sum-of-linked-lists/twist-03-multiply-linked-lists', name: 'Multiply Linked Lists', difficulty: 'Hard' },
            { id: '05-sum-of-linked-lists/twist-04-sum-of-k-linked-lists', name: 'Sum of K Linked Lists', difficulty: 'Medium' },
            { id: '05-sum-of-linked-lists/twist-05-sum-with-decimal-points', name: 'Sum With Decimal Points', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists'] = problem;

})();
