/**
 * Four Number Sum
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: hash-pair-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Number Sum',
        difficulty: 'Hard',
        algorithm: 'hash-pair-sum',
        description: 'Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all quadruplets in the array that sum up to the target sum and return a two-dimensional array of all these quadruplets in no particular order. If no four numbers sum up to the target sum, the function should return an empty array.',
        complexity: {
            time: 'O(n²)',
            space: 'O(n²)'
        },
        examples: [
    {
        input: {
        "array": [
                7,
                6,
                4,
                -1,
                1,
                2
        ],
        "targetSum": 16
},
        output: [[7, 6, 4, -1], [7, 6, 1, 2]],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[7, 6, ..., 2] (length 6), targetSum=16, the result is [[7, 6, 4, -1], [7, 6, 1, 2]].'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5,
                6,
                7
        ],
        "targetSum": 10
},
        output: [[1, 2, 3, 4]],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[1, 2, ..., 7] (length 7), targetSum=10, the result is [[1, 2, 3, 4]].'
    }
        ],
        similar: [
    { id: '01-k-sum-generalized', name: '01 K Sum Generalized', difficulty: 'Hard' },
    { id: '02-four-sum-with-repetition', name: '02 Four Sum With Repetition', difficulty: 'Hard' },
    { id: '03-count-quadruplets', name: '03 Count Quadruplets', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '17-four-number-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/17-four-number-sum'] = problem;

})();
