/**
 * Non-Constructible Change
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: greedy-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Non-Constructible Change',
        difficulty: 'Easy',
        algorithm: 'greedy-change',
        description: 'Given an array of positive integers representing the values of coins in your possession, write a function that returns the minimum amount of change (the minimum sum of money) that you cannot create. The given coins can have any positive integer value and aren\'t necessarily unique (i.e., you can have multiple coins of the same value).',
        complexity: {
            time: 'O(n log n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "coins": [
                5,
                7,
                1,
                1,
                2,
                3,
                22
        ]
},
        output: 20,
        explanation: 'Using a greedy approach, we make locally optimal choices at each step. For input coins=[5, 7, ..., 22] (length 7), the result is 20.'
    },
    {
        input: {
        "coins": [
                1,
                1,
                1,
                1,
                1
        ]
},
        output: 6,
        explanation: 'Using a greedy approach, we make locally optimal choices at each step. For input coins=[1, 1, 1, 1, 1], the result is 6.'
    },
    {
        input: {
        "coins": [
                1,
                5,
                1,
                1,
                1,
                10,
                15,
                20,
                100
        ]
},
        output: 55,
        explanation: 'Using a greedy approach, we make locally optimal choices at each step. For input coins=[1, 5, ..., 100] (length 9), the result is 55.'
    }
        ],
        similar: [
    { id: '01-min-coins-to-add', name: '01 Min Coins To Add', difficulty: 'Medium' },
    { id: '02-max-constructible', name: '02 Max Constructible', difficulty: 'Medium' },
    { id: '03-all-non-constructible', name: '03 All Non Constructible', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change'] = problem;

})();
