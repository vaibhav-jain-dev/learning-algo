/**
 * Merge Linked Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-merge
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Linked Lists',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        description: 'Write a function that takes in the heads of two Singly Linked Lists that are in sorted order, respectively. The function should merge the lists in place (i.e., it shouldn\'t create a brand new list) and return the head of the merged list; the merged list should be in sorted order. Each LinkedList node has an integer value as well as a next node pointing to the next node in the list or to None/null if it\'s the tail of the list.',
        problem: 'Traverse the linked list with appropriate pointer management. Keep track of previous, current, and next nodes as needed. Be careful to update pointers in the correct order to avoid losing references. This achieves O(n+m) time with O(1) space.',
        hints: [
            'Think about what pointers you need to maintain as you traverse the list.',
            'The runner technique (slow and fast pointers) solves many linked list problems.',
            'Be careful about edge cases: empty list, single node, and the head/tail nodes.',
            'Draw out the pointer changes step by step before coding to avoid losing references.'
        ],

        complexity: {
            time: 'O(n+m)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list1": [
                2,
                6,
                7,
                8
        ],
        "list2": [
                1,
                3,
                4,
                5,
                9,
                10
        ]
},
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list1": [
                1,
                2,
                3
        ],
        "list2": [
                4,
                5,
                6
        ]
},
        output: [1, 2, 3, 4, 5, 6],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    },
    {
        input: {
        "list1": [
                5
        ],
        "list2": [
                1,
                2,
                3
        ]
},
        output: [1, 2, 3, 5],
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
    }
        ],
        twists: [
            { id: '08-merge-linked-lists/twist-01-merge-k-sorted-lists', name: 'Merge K Sorted Lists', difficulty: 'Hard' },
            { id: '08-merge-linked-lists/twist-02-merge-two-unsorted-lists-into-sorted', name: 'Merge Two Unsorted Lists Into Sorted', difficulty: 'Medium' },
            { id: '08-merge-linked-lists/twist-03-merge-by-alternating-nodes', name: 'Merge by Alternating Nodes', difficulty: 'Medium' },
            { id: '08-merge-linked-lists/twist-04-merge-in-descending-order', name: 'Merge In Descending Order', difficulty: 'Medium' },
            { id: '08-merge-linked-lists/twist-05-intersection-of-sorted-lists', name: 'Intersection of Sorted Lists', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists'] = problem;

})();
