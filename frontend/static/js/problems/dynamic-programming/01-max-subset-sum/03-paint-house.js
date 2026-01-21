/**
 * Paint House
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Paint House',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        description: 'There is a row of n houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that **no two adjacent houses have the same color**. Given a 2D array costs where costs[i][j] is the cost of painting house i with color j: - costs[i][0] = cost to paint house i red - costs[i][1] = cost to paint house i blue - costs[i][2] = cost to paint house i green Return the **minimum cos',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "costs": [
                [
                        17,
                        2,
                        17
                ],
                [
                        16,
                        16,
                        5
                ],
                [
                        14,
                        3,
                        19
                ]
        ]
},
        output: 10,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input costs=[[17, 2, 17], [16, 16, 5], [14, 3, 19]], the result is 10.'
    },
    {
        input: {
        "costs": [
                [
                        7,
                        6,
                        2
                ]
        ]
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input costs=[[7, 6, 2]], the result is 2.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/03-paint-house', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/03-paint-house'] = problem;

})();
