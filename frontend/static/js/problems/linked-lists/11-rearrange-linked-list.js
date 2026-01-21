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
        description: 'Write a function that takes in the head of a Singly Linked List and an integer k, rearranges the list in place (i.e., doesn\'t create a brand new list) around nodes with value k, and returns its new head. Rearranging a Linked List around nodes with value k means: 1. All nodes with a value smaller than k come before nodes with value k 2. All nodes with a value equal to k come in the middle 3. All nodes with a value greater than k come after nodes with value k The relative order of nodes within eac',
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
        explanation: 'Processing the input data produces the output. For input list=[3, 0, ..., 4] (length 6), k=3, the result is [0, ..., 4] (length 6).'
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
        explanation: 'Processing the input data produces the output. For input list=[1, 4, ..., 2] (length 6), k=3, the result is [1, ..., 5] (length 6).'
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
        explanation: 'Processing the input data produces the output. For input list=[5, 1, 8, 0, 3], k=3, the result is [1, 0, 3, 5, 8].'
    }
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
