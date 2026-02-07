/**
 * Remove Kth Node From End
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Kth Node From End',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        description: 'Write a function that takes in the head of a singly linked list and an integer k, and removes the kth node from the end of the list. The removal should be done in place, meaning that the original data structure should be mutated. The function doesn\'t need to return anything. Each LinkedList node has an integer value and a next node pointer. You can assume that the input linked list will always have at least two nodes and, more specifically, at least k nodes.',
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
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
        ],
        "k": 4
},
        output: [0, 1, 2, 3, 4, 5, 7, 8, 9],
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list": [
                1,
                2,
                3
        ],
        "k": 3
},
        output: [2, 3],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    }
        ],
        twists: [
            { id: '04-remove-kth-node/twist-01-remove-kth-node-from-beginning', name: 'Remove Kth Node From Beginning', difficulty: 'Easy' },
            { id: '04-remove-kth-node/twist-02-remove-all-kth-nodes-from-end', name: 'Remove All Kth Nodes From End', difficulty: 'Medium' },
            { id: '04-remove-kth-node/twist-03-remove-kth-node-in-doubly-linked-list', name: 'Remove Kth Node in Doubly Linked List', difficulty: 'Medium' },
            { id: '04-remove-kth-node/twist-04-return-the-removed-node-value', name: 'Return the Removed Node Value', difficulty: 'Easy' },
            { id: '04-remove-kth-node/twist-05-remove-kth-from-end-in-circular-list', name: 'Remove Kth From End in Circular List', difficulty: 'Hard' }
        ],
        similar: [
    { id: '04-remove-kth-node/01-remove-nodes-greater-right', name: 'Remove Nodes With Greater Value on Right', difficulty: 'Medium' },
    { id: '04-remove-kth-node/02-delete-middle-node', name: 'Delete the Middle Node of a Linked List', difficulty: 'Medium' },
    { id: '04-remove-kth-node/03-swapping-nodes', name: 'Swapping Nodes in a Linked List', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node'] = problem;

})();
