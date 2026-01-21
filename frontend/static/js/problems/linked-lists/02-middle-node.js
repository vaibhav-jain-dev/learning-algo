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
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], the result is 3.'
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
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 6] (length 6), the result is 4.'
    },
    {
        input: {
        "list": [
                1
        ]
},
        output: 1,
        explanation: 'Processing the input data produces the output. For input list=[1], the result is 1.'
    }
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
