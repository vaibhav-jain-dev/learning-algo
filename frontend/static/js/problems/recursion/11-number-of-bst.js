/**
 * Number of Binary Search Trees
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-count-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Binary Search Trees',
        difficulty: 'Hard',
        algorithm: 'recursion-count-bst',
        description: 'Write a function that takes in a positive integer n and returns the number of structurally unique Binary Search Trees (BSTs) that can store values 1 to n. Two BSTs are structurally different if they have different structures regardless of their node values.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 3
},
        output: 5,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=3, the result is 5.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '11-number-of-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst'] = problem;

})();
