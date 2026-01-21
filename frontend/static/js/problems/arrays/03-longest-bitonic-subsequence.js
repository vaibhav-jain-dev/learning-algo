/**
 * Longest Bitonic Subsequence
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Bitonic Subsequence',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given an array of integers, find the length of the longest bitonic subsequence. A bitonic subsequence first increases then decreases (not necessarily contiguous).',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 11, 2, 10, 4, 5, 2, 1]"
},
        output: "6\nExplanation: [1, 2, 10, 4, 2, 1] or [1, 2, 4, 5, 2, 1]",
        explanation: 'Given the input, the algorithm processes it to produce 6\nExplanation: [1, 2, 10, 4, 2, 1] or [1, 2, 4, 5, 2, 1]'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5]"
},
        output: "5\nExplanation: Entire array is increasing (degenerate bitonic)",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: Entire array is increasing (degenerate bitonic)'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-longest-bitonic-subsequence', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-longest-bitonic-subsequence'] = problem;

})();
