/**
 * Partition Array By Predicate
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition Array By Predicate',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an array of integers and a predicate function, rearrange the array so that all elements satisfying the predicate come before all elements that don\'t satisfy it. Return the partitioned array. The relative order within each partition does not need to be preserved.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 4, 2, 5, 3, 6], predicate = isEven"
},
        output: "[6, 4, 2, 5, 3, 1] (or any arrangement with evens first)",
        explanation: 'Given the input, the algorithm processes it to produce [6, 4, 2, 5, 3, 1] (or any arrangement with evens first)'
    },
    {
        input: {
        "raw": "array = [3, 1, 4, 1, 5, 9, 2, 6], predicate = x > 3"
},
        output: "[6, 9, 4, 5, 1, 1, 2, 3] (elements > 3 first)",
        explanation: 'Given the input, the algorithm processes it to produce [6, 9, 4, 5, 1, 1, 2, 3] (elements > 3 first)'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5], predicate = isOdd"
},
        output: "[5, 3, 1, 2, 4] (odds first)",
        explanation: 'Given the input, the algorithm processes it to produce [5, 3, 1, 2, 4] (odds first)'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-partition-array-by-predicate', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-partition-array-by-predicate'] = problem;

})();
