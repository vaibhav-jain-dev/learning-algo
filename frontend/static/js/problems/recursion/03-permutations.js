/**
 * Permutations
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Permutations',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        description: 'Write a function that takes in an array of unique integers and returns an array of all permutations of those integers in no particular order. If the input array is empty, the function should return an empty array.',
        complexity: {
            time: 'O(n! * n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                2,
                3
        ]
},
        output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[1, 2, 3], the result is [[1, 2, 3], ..., [3, 2, 1]] (length 6).'
    }
        ],
        similar: [
    { id: '03-permutations/03-permutations/01-permutations-with-duplicates', name: 'Permutations with Duplicates', difficulty: 'Medium' },
    { id: '03-permutations/03-permutations/02-next-permutation', name: 'Next Permutation', difficulty: 'Medium' },
    { id: '03-permutations/03-kth-permutation', name: 'Kth Permutation Sequence', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations'] = problem;

})();
