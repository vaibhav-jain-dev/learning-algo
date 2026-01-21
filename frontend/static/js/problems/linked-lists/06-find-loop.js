/**
 * Find Loop
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-find-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Loop',
        difficulty: 'Hard',
        algorithm: 'll-find-loop',
        description: 'Write a function that takes in the head of a Singly Linked List that contains a loop (i.e., the list\'s tail node points to some node in the list instead of None/null). The function should return the node (the actual node, not just its value) from which the loop originates in constant space. Each LinkedList node has an integer value as well as a next node pointing to the next node in the list.',
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
                6
        ],
        "loopStart": 3
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input list=[0, 1, ..., 6] (length 7), loopStart=3, the result is 3.'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4
        ],
        "loopStart": 1
},
        output: 1,
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4], loopStart=1, the result is 1.'
    },
    {
        input: {
        "list": [
                5,
                6,
                7
        ],
        "loopStart": 6
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input list=[5, 6, 7], loopStart=6, the result is 6.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop'] = problem;

})();
