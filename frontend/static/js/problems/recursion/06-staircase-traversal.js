/**
 * Staircase Traversal
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-staircase
 */
(function() {
    'use strict';

    const problem = {
        name: 'Staircase Traversal',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        description: 'You\'re given two positive integers representing the height of a staircase and the maximum number of steps you can advance up the staircase at a time. Write a function that returns the number of distinct ways to climb the staircase. For example, if you were given a staircase of height = 3 and maxSteps = 2, you could climb the staircase in 3 ways: - 1 step, 1 step, 1 step - 1 step, 2 steps - 2 steps, 1 step',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "height": 4,
        "maxSteps": 2
},
        output: 5,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input height=4, maxSteps=2, the result is 5.'
    }
        ],
        twists: [
            { id: '06-staircase-traversal/twist-01-weighted-steps', name: 'Weighted Steps', difficulty: 'Hard' },
            { id: '06-staircase-traversal/twist-02-list-all-paths', name: 'List All Paths', difficulty: 'Medium' },
            { id: '06-staircase-traversal/twist-03-variable-step-sizes', name: 'Variable Step Sizes', difficulty: 'Medium' },
            { id: '06-staircase-traversal/twist-04-circular-staircase', name: 'Circular Staircase', difficulty: 'Hard' },
            { id: '06-staircase-traversal/twist-05-minimum-steps-to-top', name: 'Minimum Steps to Top', difficulty: 'Easy' },
            { id: '06-staircase-traversal/twist-06-probability-of-reaching-top', name: 'Probability of Reaching Top', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '06-staircase-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal'] = problem;

})();
