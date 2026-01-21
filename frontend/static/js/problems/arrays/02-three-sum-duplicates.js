/**
 * Three Sum Duplicates
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Duplicates',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an array of integers that may contain duplicates, find all unique triplets in the array which give the sum of the target value. **Important:** The solution set must not contain duplicate triplets.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 1, 1, 2, 2, 3], target = 6"
},
        output: "[[1, 2, 3]]\nExplanation: Only one unique triplet sums to 6. Although there are multiple 1s and 2s,\n             we only report [1, 2, 3] once.",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 2, 3]]\nExplanation: Only one unique triplet sums to 6. Although there are multiple 1s and 2s,\n             we only report [1, 2, 3] once.'
    },
    {
        input: {
        "raw": "array = [-1, 0, 1, 2, -1, -4], target = 0"
},
        output: "[[-1, -1, 2], [-1, 0, 1]]\nExplanation: Two unique triplets sum to 0.",
        explanation: 'Given the input, the algorithm processes it to produce [[-1, -1, 2], [-1, 0, 1]]\nExplanation: Two unique triplets sum to 0.'
    },
    {
        input: {
        "raw": "array = [0, 0, 0, 0], target = 0"
},
        output: "[[0, 0, 0]]\nExplanation: Only one unique triplet possible.",
        explanation: 'Given the input, the algorithm processes it to produce [[0, 0, 0]]\nExplanation: Only one unique triplet possible.'
    },
    {
        input: {
        "raw": "array = [1, 2, -2, -1], target = 0"
},
        output: "[]\nExplanation: No triplet sums to 0.",
        explanation: 'Given the input, the algorithm processes it to produce []\nExplanation: No triplet sums to 0.'
    },
    {
        input: {
        "raw": "array = [-2, 0, 0, 2, 2], target = 0"
},
        output: "[[-2, 0, 2]]\nExplanation: Although there are multiple 0s and 2s, only one unique triplet.",
        explanation: 'Given the input, the algorithm processes it to produce [[-2, 0, 2]]\nExplanation: Although there are multiple 0s and 2s, only one unique triplet.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-three-sum-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-three-sum-duplicates'] = problem;

})();
