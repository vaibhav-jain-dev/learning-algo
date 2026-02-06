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
        twists: [
            { title: 'Four Sum Unique Absolute Values', difficulty: 'Hard', description: 'Find quadruplets where all four elements have different absolute values. Sum must still equal target.', whyDifferent: 'Adds an extra uniqueness constraint beyond just distinct indices, requiring filtering during pair generation.', example: 'array = [1, -1, 2, -2, 3], target = 3. [1, -1, 2, 3] invalid (|1|==|-1|). Must find others.' },
            { title: 'Four Sum Streaming', difficulty: 'Very Hard', description: 'Elements arrive one at a time. After each new element, report any new quadruplets that can be formed.', whyDifferent: 'Incremental algorithm: must efficiently update pair sums table and check for new quadruplets with each insertion.', example: 'Stream: 7, 6, 4, -1, 1, 2. After 4th element arrive, first quadruplet may form.' },
            { title: 'Closest Four Sum', difficulty: 'Hard', description: 'Find the quadruplet whose sum is closest to the target, even if no exact match exists.', whyDifferent: 'Cannot just check for exact complement. Must track minimum absolute difference across all quadruplet combinations.', example: 'array = [1, 2, 3, 4, 5], target = 20. Closest: 2+3+4+5 = 14 (diff 6).' },
            { title: 'Four Sum with Ordered Elements', difficulty: 'Hard', description: 'Find quadruplets where the four values are in non-decreasing order within the quadruplet: a <= b <= c <= d.', whyDifferent: 'The ordering constraint limits which combinations are valid, requiring sorted enumeration or post-filtering.', example: 'array = [7, 6, 4, -1, 1, 2], target = 16. Only quadruplets in sorted order count.' },
            { title: 'Maximum Product Four Sum', difficulty: 'Hard', description: 'Among all quadruplets that sum to target, find the one with the maximum product of its four elements.', whyDifferent: 'Dual objective: match the sum exactly while maximizing the product, requiring exhaustive search with pruning.', example: 'array = [1, 2, 3, 4, 6, -1], target = 10. Valid quads: [1,2,3,4] prod=24, [1,3,6,-1+...] etc. Max product wins.' }
        ],
        similar: [
    { id: '17-four-number-sum/01-k-sum-generalized', name: '01 K Sum Generalized', difficulty: 'Hard' },
    { id: '17-four-number-sum/02-four-sum-with-repetition', name: '02 Four Sum With Repetition', difficulty: 'Hard' },
    { id: '17-four-number-sum/03-count-quadruplets', name: '03 Count Quadruplets', difficulty: 'Hard' }
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
