/**
 * Permutations with Duplicates
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Permutations with Duplicates',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        description: 'Given an array of numbers that may contain duplicates, return all possible unique permutations in any order. Unlike the basic permutations problem where all elements are unique, this problem requires handling duplicate elements to avoid generating duplicate permutations.',
        complexity: {
            time: 'O(n! * n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                1,
                2
        ]
},
        output: [[1, 1, 2], [1, 2, 1], [2, 1, 1]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input nums=[1, 1, 2], the result is [[1, 1, 2], [1, 2, 1], [2, 1, 1]].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-permutations-with-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-permutations-with-duplicates'] = problem;

})();
