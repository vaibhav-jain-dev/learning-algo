/**
 * Linked List Cycle
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: floyd-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Linked List Cycle',
        difficulty: 'Easy',
        algorithm: 'floyd-cycle-detection',
        description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. A cycle exists if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail\'s next pointer is connected to. Note that pos is not passed as a parameter. Return true if there is a cycle in the linked list. Otherwise, return false.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "head": [
                3,
                2,
                0,
                -4
        ],
        "pos": 1
},
        output: true,
        explanation: 'Processing the input data produces the output. For input head=[3, 2, 0, -4], pos=1, the result is true.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle'] = problem;

})();
