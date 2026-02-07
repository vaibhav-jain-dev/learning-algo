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
        problem: 'Break the problem into smaller subproblems recursively. Define clear base cases and recursive cases. At each step, assume the recursive call returns the correct result for smaller inputs, and combine them. This achieves O(n * 2^n) time with O(n) space.',
        hints: [
            'Define your base case clearly. When should the recursion stop?',
            'For the recursive case, assume the function works for smaller inputs. How do you use that?',
            'Think about whether you need to pass additional state through parameters.',
            'Consider memoization if the same subproblems are being computed multiple times.'
        ],

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
        twists: [
            { id: '04-powerset/twist-01-powerset-with-duplicates', name: 'Powerset with Duplicates', difficulty: 'Medium' },
            { id: '04-powerset/twist-02-subsets-of-fixed-size-k', name: 'Subsets of Fixed Size k', difficulty: 'Medium' },
            { id: '04-powerset/twist-03-powerset-as-bitmask', name: 'Powerset as Bitmask', difficulty: 'Medium' },
            { id: '04-powerset/twist-04-powerset-sum-target', name: 'Powerset Sum Target', difficulty: 'Hard' },
            { id: '04-powerset/twist-05-iterative-powerset', name: 'Iterative Powerset', difficulty: 'Easy' }
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
