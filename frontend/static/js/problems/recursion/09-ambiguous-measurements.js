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
        problem: 'Break the problem into smaller subproblems recursively. Define clear base cases and recursive cases. At each step, assume the recursive call returns the correct result for smaller inputs, and combine them. This achieves O(target * maxRange * numCups) time with O(target * maxRange) space.',
        hints: [
            'Define your base case clearly. When should the recursion stop?',
            'For the recursive case, assume the function works for smaller inputs. How do you use that?',
            'Think about whether you need to pass additional state through parameters.',
            'Consider memoization if the same subproblems are being computed multiple times.'
        ],

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
        twists: [
            { id: '09-ambiguous-measurements/twist-01-minimum-cups-used', name: 'Minimum Cups Used', difficulty: 'Hard' },
            { id: '09-ambiguous-measurements/twist-02-exact-measurement-only', name: 'Exact Measurement Only', difficulty: 'Medium' },
            { id: '09-ambiguous-measurements/twist-03-limited-cup-uses', name: 'Limited Cup Uses', difficulty: 'Hard' },
            { id: '09-ambiguous-measurements/twist-04-all-achievable-targets', name: 'All Achievable Targets', difficulty: 'Hard' },
            { id: '09-ambiguous-measurements/twist-05-track-pour-sequence', name: 'Track Pour Sequence', difficulty: 'Medium' }
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
