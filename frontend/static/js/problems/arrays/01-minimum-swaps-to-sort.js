/**
 * Minimum Swaps To Sort
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Swaps To Sort',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Find the minimum number of swaps needed to sort an array of distinct integers.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [4, 3, 2, 1]"
},
        output: "2\nExplanation: Swap 4<->1, then 3<->2",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Swap 4<->1, then 3<->2'
    },
    {
        input: {
        "raw": "array = [1, 5, 4, 3, 2]"
},
        output: "2\nExplanation: Swap 5<->2, then 4<->3",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Swap 5<->2, then 4<->3'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-minimum-swaps-to-sort', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-minimum-swaps-to-sort'] = problem;

})();
