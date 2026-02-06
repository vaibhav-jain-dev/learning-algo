/**
 * Shift Linked List
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-shift
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shift Linked List',
        difficulty: 'Hard',
        algorithm: 'll-shift',
        description: 'Write a function that takes in the head of a Singly Linked List and an integer k, shifts the list in place (i.e., doesn\'t create a brand new list) by k positions, and returns its new head. Shifting a Linked List means moving its nodes forward or backward and wrapping them around the list where appropriate. For example, shifting a Linked List forward by one position would make its tail become the new head of the linked list. - If k is positive, shift the list forward (tail nodes move to head) - I',
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
                5
        ],
        "k": 2
},
        output: [4, 5, 0, 1, 2, 3],
        explanation: 'Processing the input data produces the output. For input list=[0, 1, ..., 5] (length 6), k=2, the result is [4, ..., 3] (length 6).'
    },
    {
        input: {
        "list": [
                0,
                1,
                2,
                3,
                4,
                5
        ],
        "k": -2
},
        output: [2, 3, 4, 5, 0, 1],
        explanation: 'Processing the input data produces the output. For input list=[0, 1, ..., 5] (length 6), k=-2, the result is [2, ..., 1] (length 6).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3
        ],
        "k": 4
},
        output: [3, 1, 2],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3], k=4, the result is [3, 1, 2].'
    }
        ],
        twists: [
            { id: '09-shift-linked-list/twist-01-shift-by-splitting-at-value', name: 'Shift by Splitting at Value', difficulty: 'Medium' },
            { id: '09-shift-linked-list/twist-02-shift-doubly-linked-list', name: 'Shift Doubly Linked List', difficulty: 'Medium' },
            { id: '09-shift-linked-list/twist-03-shift-circular-linked-list', name: 'Shift Circular Linked List', difficulty: 'Medium' },
            { id: '09-shift-linked-list/twist-04-minimum-shifts-to-sort', name: 'Minimum Shifts to Sort', difficulty: 'Hard' },
            { id: '09-shift-linked-list/twist-05-shift-every-kth-node', name: 'Shift Every Kth Node', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list'] = problem;

})();
