/**
 * Middle Node of Linked List
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-middle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Middle Node of Linked List',
        difficulty: 'Easy',
        algorithm: 'll-middle',
        description: 'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes (i.e., the list has an even number of nodes), return the second middle node.',
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
                1,
                2,
                3,
                4,
                5
        ]
},
        output: 3,
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5,
                6
        ]
},
        output: 4,
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    },
    {
        input: {
        "list": [
                1
        ]
},
        output: 1,
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
    }
        ],
        twists: [
            { id: '02-middle-node/twist-01-circular-linked-list-middle', name: 'Circular Linked List Middle', difficulty: 'Medium' },
            { id: '02-middle-node/twist-02-return-first-middle-for-even-length', name: 'Return First Middle for Even Length', difficulty: 'Easy' },
            { id: '02-middle-node/twist-03-delete-middle-in-place-no-return', name: 'Delete Middle In-Place (No Return)', difficulty: 'Medium' },
            { id: '02-middle-node/twist-04-doubly-linked-list-middle-from-ends', name: 'Doubly Linked List Middle from Ends', difficulty: 'Easy' },
            { id: '02-middle-node/twist-05-streaming-middle-unknown-length', name: 'Streaming Middle (Unknown Length)', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node'] = problem;

})();
