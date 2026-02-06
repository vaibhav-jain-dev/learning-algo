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
            { title: 'Unbounded Knapsack', difficulty: 'Medium', description: 'Each item can be selected an unlimited number of times instead of at most once. Find the maximum value achievable within the weight capacity.', whyDifferent: 'Changes the DP iteration order fundamentally. Instead of iterating items in the outer loop to prevent reuse, you allow revisiting the same item, simplifying to a 1D DP.', example: 'items=[[60,10],[100,20],[120,30]], capacity=50: with unlimited use, take item 0 five times for value 300 (weight 50).' },
            { title: 'Fractional Knapsack', difficulty: 'Easy', description: 'You can take fractions of items (not just whole items). Find the maximum value achievable within the weight capacity.', whyDifferent: 'Completely changes the approach from DP to greedy. Sort by value-to-weight ratio and greedily fill the knapsack, taking a fraction of the last item if needed.', example: 'items=[[60,10],[100,20],[120,30]], capacity=50: take all of items 0 and 1 (weight 30, value 160), then 20/30 of item 2 for 80, total=240.' },
            { title: 'Knapsack With Exact Capacity', difficulty: 'Hard', description: 'Find the maximum value when you must fill the knapsack to exactly the given capacity (not just at most). Return -1 if impossible.', whyDifferent: 'Changes the DP initialization: instead of all zeros, use negative infinity for unreachable states. Only the final cell dp[capacity] gives a valid answer.', example: 'items=[[10,5],[40,4],[30,6],[50,3]], capacity=10: must use items totaling exactly weight 10, like items 1+3 (weight 7) does not work, need exact fit.' },
            { title: 'Two-Knapsack Problem', difficulty: 'Very Hard', description: 'You have two knapsacks with different capacities. Each item can go into at most one knapsack. Maximize the total value across both knapsacks.', whyDifferent: 'Adds a second capacity dimension, turning the 2D DP into 3D. For each item, you must decide: skip it, put it in knapsack 1, or put it in knapsack 2.', example: 'items=[[60,10],[100,20],[120,30]], cap1=30, cap2=20: put item 2 in knapsack 1 (value 120, weight 30), item 1 in knapsack 2 (value 100, weight 20), total=220.' },
            { title: 'Knapsack With Item Dependencies', difficulty: 'Very Hard', description: 'Some items depend on others: you can only select item B if you have also selected item A. Find the maximum value respecting all dependencies.', whyDifferent: 'Introduces a dependency DAG on items, requiring topological ordering or tree DP. Standard knapsack independent-item assumption no longer holds.', example: 'items=[[10,5],[40,4],[30,6]], dependencies: item 1 requires item 0. To take item 1 (value 40), you must also take item 0 (value 10, weight 5), total weight 9.' }
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
