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
        twists: [
            { title: 'Minimum Cups Used', difficulty: 'Hard', description: 'Instead of just determining if the target is achievable, find the minimum number of cup pours needed to reach exactly the target amount.', whyDifferent: 'Transforms from a boolean feasibility problem to an optimization problem, requiring BFS or DP with cost tracking instead of simple memoized recursion.', example: 'For cups [[200,210],[450,465]] and target 850, minimum pours might be 2 (one of each) rather than just returning true.' },
            { title: 'Exact Measurement Only', difficulty: 'Medium', description: 'Each cup measures exactly one value (low equals high). Determine if the target can be reached using these exact measurements with unlimited uses.', whyDifferent: 'Simplifies to the classic unbounded knapsack / coin change problem, removing the range complexity but requiring standard DP techniques.', example: 'For cups [200,450,800] and target 1100, return true because 200+200+200+200+200+100... wait, no -- need exactly 200*k + 450*j + 800*m = 1100.' },
            { title: 'Limited Cup Uses', difficulty: 'Hard', description: 'Each measuring cup can only be used a maximum of k times. Determine if the target is still achievable under this constraint.', whyDifferent: 'Adds a usage-count dimension to the state space, changing from unbounded to bounded knapsack-style reasoning with per-cup limits.', example: 'For cups [[200,210],[450,465]] with k=2 and target 850, check if 2 uses of each cup type can reach 850.' },
            { title: 'All Achievable Targets', difficulty: 'Hard', description: 'Given the set of cups, enumerate all possible target values that can be measured within a given range [0, maxTarget].', whyDifferent: 'Inverts the problem from checking one target to discovering all reachable values, requiring interval arithmetic and range merging across all pour combinations.', example: 'For cups [[1,3],[5,7]], all achievable ranges after 1 pour are [1,3] and [5,7]; after 2 pours, [2,6], [6,10], [10,14], etc.' },
            { title: 'Track Pour Sequence', difficulty: 'Medium', description: 'Return not just whether the target is achievable, but also the sequence of cup pours (and their actual measured amounts) that achieve it.', whyDifferent: 'Requires path reconstruction through the memoized recursion, storing which cup was used at each step and within what range.', example: 'For cups [[200,210],[450,465]] and target 660, return something like: pour cup 1 (measuring 205) + pour cup 2 (measuring 455) = 660.' }
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
