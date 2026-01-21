/**
 * Kth Permutation Sequence
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Permutation Sequence',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        description: 'The set [1, 2, 3, ..., n] contains a total of n! unique permutations. By listing and labeling all of the permutations in order, we get the following sequence for n = 3: 1. "123" 2. "132" 3. "213" 4. "231" 5. "312" 6. "321" Given n and k, return the kth permutation sequence (1-indexed).',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 3,
        "k": 3
},
        output: "213",
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=3, k=3, the result is 213.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation'] = problem;

})();
