/**
 * Reverse Linked List II (Reverse Portion)
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Linked List II (Reverse Portion)',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        description: 'Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list. Positions are 1-indexed.',
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
        "left": 2,
        "right": 4
},
        output: [1, 4, 3, 2, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=2, right=4, the result is [1, 4, 3, 2, 5].'
    },
    {
        input: {
        "list": [
                5
        ],
        "left": 1,
        "right": 1
},
        output: [5],
        explanation: 'Processing the input data produces the output. For input list=[5], left=1, right=1, the result is [5].'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "left": 1,
        "right": 5
},
        output: [5, 4, 3, 2, 1],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=1, right=5, the result is [5, 4, 3, 2, 1].'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "left": 3,
        "right": 4
},
        output: [1, 2, 4, 3, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=3, right=4, the result is [1, 2, 4, 3, 5].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-reverse-portion-of-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-reverse-portion-of-list'] = problem;

})();
