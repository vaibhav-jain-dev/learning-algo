/**
 * Swapping Nodes in a Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Swapping Nodes in a Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        description: 'Given the head of a linked list and an integer k, return the head of the linked list after swapping the **values** of the k-th node from the beginning and the k-th node from the end (the list is 1-indexed).',
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
        ],
        "k": 2
},
        output: [1, 4, 3, 2, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], k=2, the result is [1, 4, 3, 2, 5].'
    },
    {
        input: {
        "list": [
                7,
                9,
                6,
                6,
                7,
                8,
                3,
                0,
                9,
                5
        ],
        "k": 5
},
        output: [7, 9, 6, 6, 8, 7, 3, 0, 9, 5],
        explanation: 'Processing the input data produces the output. For input list=[7, 9, ..., 5] (length 10), k=5, the result is [7, ..., 5] (length 10).'
    },
    {
        input: {
        "list": [
                1
        ],
        "k": 1
},
        output: [1],
        explanation: 'Processing the input data produces the output. For input list=[1], k=1, the result is [1].'
    },
    {
        input: {
        "list": [
                1,
                2
        ],
        "k": 1
},
        output: [2, 1],
        explanation: 'Processing the input data produces the output. For input list=[1, 2], k=1, the result is [2, 1].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes'] = problem;

})();
