/**
 * Delete the Middle Node of a Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete the Middle Node of a Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        description: 'Given the head of a singly linked list, delete the **middle node** and return the head of the modified list. The middle node of a linked list of size n is the floor(n/2)-th node from the start (0-indexed). For a list with n nodes: - If n is odd: delete the exact middle node - If n is even: delete the second of the two middle nodes',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [
                1,
                3,
                4,
                7,
                1,
                2,
                6
        ]
},
        output: [1, 3, 4, 1, 2, 6],
        explanation: 'Processing the input data produces the output. For input list=[1, 3, ..., 6] (length 7), the result is [1, ..., 6] (length 6).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4
        ]
},
        output: [1, 2, 4],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4], the result is [1, 2, 4].'
    },
    {
        input: {
        "list": [
                2,
                1
        ]
},
        output: [2],
        explanation: 'Processing the input data produces the output. For input list=[2, 1], the result is [2].'
    },
    {
        input: {
        "list": [
                1
        ]
},
        output: [],
        explanation: 'Processing the input data produces the output. For input list=[1], the result is [].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node'] = problem;

})();
