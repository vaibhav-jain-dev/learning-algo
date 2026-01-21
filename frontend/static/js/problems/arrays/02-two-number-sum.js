/**
 * Two Number Sum
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: hash-table-two-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Number Sum',
        difficulty: 'Easy',
        algorithm: 'hash-table-two-sum',
        description: 'Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum up to the target sum, the function should return them in an array, in any order. If no two numbers sum up to the target sum, the function should return an empty array. Note that the target sum has to be obtained by summing two different integers in the array; you can\'t add a single integer to itself in order to obtain the target sum. You can as',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                3,
                5,
                -4,
                8,
                11,
                1,
                -1,
                6
        ],
        "targetSum": 10
},
        output: [-1, 11],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[3, 5, ..., 6] (length 8), targetSum=10, the result is [-1, 11].'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5
        ],
        "targetSum": 10
},
        output: [],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[1, 2, 3, 4, 5], targetSum=10, the result is [].'
    },
    {
        input: {
        "array": [
                4,
                6
        ],
        "targetSum": 10
},
        output: [4, 6],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[4, 6], targetSum=10, the result is [4, 6].'
    },
    {
        input: {
        "array": [
                4,
                6,
                1,
                -3
        ],
        "targetSum": 3
},
        output: [6, -3],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[4, 6, 1, -3], targetSum=3, the result is [6, -3].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum'] = problem;

})();
