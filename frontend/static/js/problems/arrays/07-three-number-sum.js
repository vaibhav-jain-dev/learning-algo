/**
 * Three Number Sum
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sort-three-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Number Sum',
        difficulty: 'Medium',
        algorithm: 'sort-three-sum',
        description: 'Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all triplets in the array that sum up to the target sum and return a two-dimensional array of all these triplets. The numbers in each triplet should be ordered in ascending order, and the triplets themselves should be ordered in ascending order with respect to the numbers they hold. If no three numbers sum up to the target sum, the function should return an emp',
        complexity: {
            time: 'O(n²)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                12,
                3,
                1,
                2,
                -6,
                5,
                -8,
                6
        ],
        "targetSum": 0
},
        output: [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input array=[12, 3, ..., 6] (length 8), targetSum=0, the result is [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]].'
    },
    {
        input: {
        "array": [
                1,
                2,
                3
        ],
        "targetSum": 6
},
        output: [[1, 2, 3]],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input array=[1, 2, 3], targetSum=6, the result is [[1, 2, 3]].'
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
        "targetSum": 100
},
        output: [],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input array=[1, 2, 3, 4, 5], targetSum=100, the result is [].'
    }
        ],
        similar: [
    { id: '01-three-sum-closest', name: '01 Three Sum Closest', difficulty: 'Medium' },
    { id: '02-three-sum-duplicates', name: '02 Three Sum Duplicates', difficulty: 'Medium' },
    { id: '03-four-number-sum', name: '03 Four Number Sum', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum'] = problem;

})();
