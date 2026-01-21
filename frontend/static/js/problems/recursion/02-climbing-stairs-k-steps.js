/**
 * Climbing Stairs with K Steps
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-staircase
 */
(function() {
    'use strict';

    const problem = {
        name: 'Climbing Stairs with K Steps',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 to k steps. In how many distinct ways can you climb to the top? This is a generalization of the classic "Climbing Stairs" problem where you can take 1 or 2 steps.',
        complexity: {
            time: 'O(n)',
            space: 'O(k)'
        },
        examples: [
    {
        input: {
        "n": 4,
        "k": 2
},
        output: 5,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=4, k=2, the result is 5.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-climbing-stairs-k-steps', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-climbing-stairs-k-steps'] = problem;

})();
