/**
 * Ambiguous Measurements
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-measurements
 */
(function() {
    'use strict';

    const problem = {
        name: 'Ambiguous Measurements',
        difficulty: 'Hard',
        algorithm: 'recursion-measurements',
        description: 'You have a measuring cup that can measure exactly low to high milliliters of liquid inclusively (the measuring lines are ambiguous between low and high). Given a list of such measuring cups and a target amount of liquid, write a function that returns whether it\'s possible to measure exactly the target amount. Each measuring cup can be used any number of times. Note that you can pour liquid into a larger container and can freely discard liquid (but you can\'t pour part of a cup measurement).',
        complexity: {
            time: 'O(target * maxRange * numCups)',
            space: 'O(target * maxRange)'
        },
        examples: [
    {
        input: {
        "cups": [
                [
                        200,
                        210
                ],
                [
                        450,
                        465
                ],
                [
                        800,
                        850
                ]
        ],
        "target": 2100
},
        output: true,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input cups=[[200, 210], [450, 465], [800, 850]], target=2100, the result is true.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '09-ambiguous-measurements', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/09-ambiguous-measurements'] = problem;

})();
