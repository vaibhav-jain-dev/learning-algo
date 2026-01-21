/**
 * Powerset
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-powerset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Powerset',
        difficulty: 'Medium',
        algorithm: 'recursion-powerset',
        description: 'Write a function that takes in an array of unique integers and returns its powerset. The powerset P(X) of a set X is the set of all subsets of X. For example, the powerset of [1, 2] is [[], [1], [2], [1, 2]]. Note that the sets in the powerset do not need to be in any particular order.',
        complexity: {
            time: 'O(n * 2^n)',
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
        output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[1, 2, 3], the result is [[], ..., [1, 2, 3]] (length 8).'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '04-powerset', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/04-powerset'] = problem;

})();
