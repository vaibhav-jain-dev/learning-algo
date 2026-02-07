/**
 * Rearrange Linked List
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-rearrange
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rearrange Linked List',
        difficulty: 'Hard',
        algorithm: 'll-rearrange',
        description: 'Write a function that takes in the head of a Singly Linked List and an integer k, rearranges the list in place (i.e., doesn\'t create a brand new list) around nodes with value k, and returns its new head. Rearranging a Linked List around nodes with value k means: 1. All nodes with a value smaller than k come before nodes with value k 2. All nodes with a value equal to k come in the middle 3. All nodes with a value greater than k come after nodes with value k The relative order of nodes within eac.',
        problem: 'Traverse the linked list with appropriate pointer management. Keep track of previous, current, and next nodes as needed. Be careful to update pointers in the correct order to avoid losing references. This achieves O(n) time with O(1) space.',
        hints: [
            'Think about what pointers you need to maintain as you traverse the list.',
            'The runner technique (slow and fast pointers) solves many linked list problems.',
            'Be careful about edge cases: empty list, single node, and the head/tail nodes.',
            'Draw out the pointer changes step by step before coding to avoid losing references.'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [
                3,
                0,
                5,
                2,
                1,
                4
        ],
        "k": 3
},
        output: [0, 2, 1, 3, 5, 4],
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list": [
                1,
                4,
                3,
                2,
                5,
                2
        ],
        "k": 3
},
        output: [1, 2, 2, 3, 4, 5],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    },
    {
        input: {
        "list": [
                5,
                1,
                8,
                0,
                3
        ],
        "k": 3
},
        output: [1, 0, 3, 5, 8],
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
    }
        ],
        twists: [
            { id: '11-rearrange-linked-list/twist-01-four-way-partition', name: 'Four-Way Partition', difficulty: 'Hard' },
            { id: '11-rearrange-linked-list/twist-02-partition-preserving-absolute-order', name: 'Partition Preserving Absolute Order', difficulty: 'Medium' },
            { id: '11-rearrange-linked-list/twist-03-partition-around-median', name: 'Partition Around Median', difficulty: 'Hard' },
            { id: '11-rearrange-linked-list/twist-04-dutch-national-flag-on-linked-list', name: 'Dutch National Flag on Linked List', difficulty: 'Medium' },
            { id: '11-rearrange-linked-list/twist-05-stable-partition-with-multiple-pivots', name: 'Stable Partition With Multiple Pivots', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list'] = problem;

})();
