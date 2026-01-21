/**
 * Min Matches Guarantee
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Matches Guarantee',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given n teams and their current scores, find the minimum number of remaining matches needed to guarantee a single winner.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "scores = [10, 7, 5]"
},
        output: "1\nExplanation: Leader needs 1 more win to be uncatchable.",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Leader needs 1 more win to be uncatchable.'
    },
    {
        input: {
        "raw": "scores = [6, 6, 6]"
},
        output: "2\nExplanation: Two matches needed to break the tie.",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Two matches needed to break the tie.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 04-tournament-winner
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '04-tournament-winner/03-min-matches-guarantee', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/04-tournament-winner/03-min-matches-guarantee'] = problem;

})();
