/**
 * Max Subset Sum No Adjacent
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Subset Sum No Adjacent',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        description: 'Write a function that takes in an array of positive integers and returns the maximum sum of non-adjacent elements in the array. If the input array is empty, the function should return 0.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                75,
                105,
                120,
                75,
                90,
                135
        ]
},
        output: 330,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[75, 105, ..., 135] (length 6), the result is 330.'
    },
    {
        input: {
        "array": [
                7,
                10,
                12,
                7,
                9,
                14
        ]
},
        output: 33,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[7, 10, ..., 14] (length 6), the result is 33.'
    }
        ],
        similar: [
    { id: '01-house-robber-ii', name: 'House Robber II', difficulty: 'Medium' },
    { id: '02-delete-and-earn', name: 'Delete and Earn', difficulty: 'Medium' },
    { id: '03-paint-house', name: 'Paint House', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum'] = problem;

})();
