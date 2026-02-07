/**
 * Numbers in Pi
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-pi-numbers
 */
(function() {
    'use strict';

    const problem = {
        name: 'Numbers in Pi',
        difficulty: 'Hard',
        algorithm: 'dp-pi-numbers',
        description: 'Given a string representation of the first n digits of Pi and a list of positive integers (as strings), write a function that returns the smallest number of spaces that can be added to the Pi string such that all resulting numbers are found in the list of integers. If there is no way to split Pi such that all numbers are in the list, return -1. Note that a single digit from Pi can only be used once in a number.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n^2 * m) time with O(n + k) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(n^2 * m)',
            space: 'O(n + k)'
        },
        examples: [
    {
        input: {
        "pi": "3141592653589793238462643383279",
        "numbers": [
                "314159265358979323846",
                "26433",
                "8",
                "3279",
                "314159265",
                "35897932384626433832",
                "79"
        ]
},
        output: 2,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "pi": "314159",
        "numbers": [
                "314",
                "159",
                "3141",
                "59"
        ]
},
        output: 1,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    },
    {
        input: {
        "pi": "123456",
        "numbers": [
                "12",
                "34",
                "56"
        ]
},
        output: 2,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '09-numbers-in-pi/twist-01-return-the-actual-partition', name: 'Return the Actual Partition', difficulty: 'Medium' },
            { id: '09-numbers-in-pi/twist-02-maximum-coverage-partition', name: 'Maximum Coverage Partition', difficulty: 'Hard' },
            { id: '09-numbers-in-pi/twist-03-numbers-in-pi-with-overlaps', name: 'Numbers in Pi With Overlaps', difficulty: 'Hard' },
            { id: '09-numbers-in-pi/twist-04-weighted-number-selection', name: 'Weighted Number Selection', difficulty: 'Hard' },
            { id: '09-numbers-in-pi/twist-05-longest-prefix-coverable', name: 'Longest Prefix Coverable', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '09-numbers-in-pi', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/09-numbers-in-pi'] = problem;

})();
