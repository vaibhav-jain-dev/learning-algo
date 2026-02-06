/**
 * 0/1 Knapsack Problem
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-knapsack
 */
(function() {
    'use strict';

    const problem = {
        name: '0/1 Knapsack Problem',
        difficulty: 'Hard',
        algorithm: 'dp-knapsack',
        description: 'You are given an array of items where each item has a weight and a value, and a knapsack with a maximum weight capacity. Write a function that returns the maximum value that can be obtained by selecting items to put in the knapsack without exceeding its capacity. Each item can only be selected once (0/1 property). Also return the indices of the items that achieve this maximum value.',
        complexity: {
            time: 'O(n * capacity)',
            space: 'O(n * capacity)'
        },
        examples: [
    {
        input: {
        "items": [
                [
                        1,
                        2
                ],
                [
                        4,
                        3
                ],
                [
                        5,
                        6
                ],
                [
                        6,
                        7
                ]
        ],
        "capacity": 10
},
        output: [10, [1, 3]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input items=[[1, 2], [4, 3], [5, 6], [6, 7]], capacity=10, the result is [10, [1, 3]].'
    },
    {
        input: {
        "items": [
                [
                        60,
                        10
                ],
                [
                        100,
                        20
                ],
                [
                        120,
                        30
                ]
        ],
        "capacity": 50
},
        output: [220, [1, 2]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input items=[[60, 10], [100, 20], [120, 30]], capacity=50, the result is [220, [1, 2]].'
    },
    {
        input: {
        "items": [
                [
                        10,
                        5
                ],
                [
                        40,
                        4
                ],
                [
                        30,
                        6
                ],
                [
                        50,
                        3
                ]
        ],
        "capacity": 10
},
        output: [90, [1, 3]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input items=[[10, 5], [40, 4], [30, 6], [50, 3]], capacity=10, the result is [90, [1, 3]].'
    }
        ],
        twists: [
            { id: '07-knapsack/twist-01-unbounded-knapsack', title: 'Unbounded Knapsack', difficulty: 'Medium' },
            { id: '07-knapsack/twist-02-fractional-knapsack', title: 'Fractional Knapsack', difficulty: 'Easy' },
            { id: '07-knapsack/twist-03-knapsack-with-exact-capacity', title: 'Knapsack With Exact Capacity', difficulty: 'Hard' },
            { id: '07-knapsack/twist-04-two-knapsack-problem', title: 'Two-Knapsack Problem', difficulty: 'Very Hard' },
            { id: '07-knapsack/twist-05-knapsack-with-item-dependencies', title: 'Knapsack With Item Dependencies', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '07-knapsack', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/07-knapsack'] = problem;

})();
