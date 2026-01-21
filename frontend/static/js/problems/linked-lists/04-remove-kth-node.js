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
        explanation: 'Processing the input data produces the output. For input list=[0, 1, ..., 9] (length 10), k=4, the result is [0, ..., 9] (length 9).'
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
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3], k=3, the result is [2, 3].'
    }
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
