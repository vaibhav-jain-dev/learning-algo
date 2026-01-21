/**
 * Count Distinct Ranges
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorting
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Distinct Ranges',
        difficulty: 'Medium',
        algorithm: 'sorting',
        description: 'Given an unsorted array of integers, count the number of distinct consecutive ranges. A consecutive range is a sequence of consecutive integers. For example, [1, 2, 3] forms one range, [5, 6] forms another range.',
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                2,
                3,
                5,
                6,
                8,
                10,
                11,
                12
        ]
},
        output: 4,
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input nums=[1, 2, ..., 12] (length 9), the result is 4.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-count-distinct-ranges', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-count-distinct-ranges'] = problem;

})();
