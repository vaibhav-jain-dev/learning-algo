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
        description: 'Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all triplets in the array that sum up to the target sum and return a two-dimensional array of all these triplets. The numbers in each triplet should be ordered in ascending order, and the triplets themselves should be ordered in ascending order with respect to the numbers they hold. If no three numbers sum up to the target sum, the function should return an emp.',
        problem: 'Sort the input first, then leverage the sorted order to efficiently find the answer. Sorting takes O(n log n) and the subsequent scan is linear, giving overall O(n²) time with O(n) space.',
        hints: [
            'Sorting the input first may simplify the problem significantly.',
            'After sorting, consider how adjacent elements relate to each other.',
            'Think about whether you need a stable sort or if any ordering will work.',
            'Can you take advantage of the sorted order to avoid redundant comparisons?'
        ],

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
        explanation: 'After sorting, process elements in order. Adjacent elements with overlapping or matching properties are grouped together. The sorted order guarantees no valid groupings are missed.'
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
        explanation: 'The sorted arrangement reveals the structure of the solution. Scan from left to right, maintaining a running state that captures the current group or interval.'
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
        explanation: 'Sorting reduces the problem to a linear scan. Compare each element with the current running state and decide whether to extend, merge, or start a new group.'
    }
        ],
        similar: [
            { id: '07-three-number-sum/03-four-number-sum', name: 'Four Number Sum', difficulty: 'Hard' }
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
