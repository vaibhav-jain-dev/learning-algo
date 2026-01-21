/**
 * Remove Nodes With Greater Value on Right
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Nodes With Greater Value on Right',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        description: 'Given the head of a singly linked list, remove all nodes that have a node with a **strictly greater value** anywhere to their right side. Return the head of the modified linked list.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [
                5,
                2,
                13,
                3,
                8
        ]
},
        output: [13, 8],
        explanation: 'Processing the input data produces the output. For input list=[5, 2, 13, 3, 8], the result is [13, 8].'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                1
        ]
},
        output: [1, 1, 1, 1],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 1, 1], the result is [1, 1, 1, 1].'
    },
    {
        input: {
        "list": [
                5,
                4,
                3,
                2,
                1
        ]
},
        output: [5, 4, 3, 2, 1],
        explanation: 'Processing the input data produces the output. For input list=[5, 4, 3, 2, 1], the result is [5, 4, 3, 2, 1].'
    },
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
        output: [5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], the result is [5].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-nodes-greater-right', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-nodes-greater-right'] = problem;

})();
