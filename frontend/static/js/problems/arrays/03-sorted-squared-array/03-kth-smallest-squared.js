/**
 * Kth Smallest Squared
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Smallest Squared',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given a sorted array of integers and an integer k, find the k-th smallest element after squaring all elements, without fully sorting the squared array.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [-4, -2, 0, 1, 3], k = 3"
},
        output: "1\nExplanation: Squared array sorted: [0, 1, 4, 9, 16], 3rd element is 1",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Squared array sorted: [0, 1, 4, 9, 16], 3rd element is 1'
    },
    {
        input: {
        "raw": "array = [-3, -1, 2, 4], k = 2"
},
        output: "1\nExplanation: Squared array sorted: [1, 4, 9, 16], 2nd element is 1",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Squared array sorted: [1, 4, 9, 16], 2nd element is 1'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 03-sorted-squared-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/03-kth-smallest-squared', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/03-kth-smallest-squared'] = problem;

})();
