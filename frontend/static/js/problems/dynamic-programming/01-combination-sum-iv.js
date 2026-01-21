/**
 * Combination Sum IV
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Combination Sum IV',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'Given an array of **distinct** integers nums and a target integer target, return the number of possible combinations that add up to target. **Note:** The different sequences are counted as different combinations (this is counting **permutations**, not combinations).',
        complexity: {
            time: 'O(target * n)',
            space: 'O(target)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                2,
                3
        ],
        "target": 4
},
        output: 7,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3], target=4, the result is 7.'
    },
    {
        input: {
        "nums": [
                9
        ],
        "target": 3
},
        output: 0,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[9], target=3, the result is 0.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-combination-sum-iv', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-combination-sum-iv'] = problem;

})();
