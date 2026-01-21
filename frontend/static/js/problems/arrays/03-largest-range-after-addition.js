/**
 * Largest Range After Addition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: hash-set
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Range After Addition',
        difficulty: 'Hard',
        algorithm: 'hash-set',
        description: 'Given an array of integers nums and an integer k representing the number of elements you can add to the array, find the length of the largest consecutive range possible after adding at most k elements. You can add any integer to the array to fill gaps in consecutive sequences.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                3,
                5,
                7
        ],
        "additions": 1
},
        output: 4,
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input nums=[1, 3, 5, 7], additions=1, the result is 4.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-largest-range-after-addition', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-largest-range-after-addition'] = problem;

})();
