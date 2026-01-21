/**
 * Tournament Tiebreakers
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Tournament Tiebreakers',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Same as tournament winner but with tiebreaker rules: if points are equal, the team with more head-to-head wins against tied opponents wins.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "competitions = [[\"A\",\"B\"],[\"B\",\"C\"],[\"C\",\"A\"]], results = [1,1,0]"
},
        output: "\"A\" (A beats B, B beats C, A beats C - A has best record)",
        explanation: 'Given the input, the algorithm processes it to produce "A" (A beats B, B beats C, A beats C - A has best record)'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-tournament-tiebreakers', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-tournament-tiebreakers'] = problem;

})();
