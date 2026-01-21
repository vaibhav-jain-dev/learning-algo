/**
 * Next Permutation
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Next Permutation',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        description: 'A permutation of an array of integers is an arrangement of its members into a sequence or linear order. The **next permutation** of an array of integers is the next lexicographically greater permutation of its integer. If the array is already at its largest permutation, rearrange it to the smallest permutation (sorted in ascending order). The replacement must be in place and use only constant extra memory.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                2,
                3
        ]
},
        output: [1, 3, 2],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input nums=[1, 2, 3], the result is [1, 3, 2].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation'] = problem;

})();
