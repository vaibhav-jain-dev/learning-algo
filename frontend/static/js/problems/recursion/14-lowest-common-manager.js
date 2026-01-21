/**
 * Lowest Common Manager
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-manager
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lowest Common Manager',
        difficulty: 'Hard',
        algorithm: 'recursion-manager',
        description: 'You\'re given three inputs: the top manager of an organization (the root of an organizational chart), and two employees that are guaranteed to be in the organization. Write a function that returns the lowest common manager of the two employees. The "lowest common manager" is the deepest manager (furthest from the top) that has both employees as subordinates (directly or indirectly through other managers). Each employee has: - A name (unique identifier) - A list of direct reports (subordinates) An',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "topManager": "A",
        "employee1": "E",
        "employee2": "G"
},
        output: "A",
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input topManager=A, employee1=E, employee2=G, the result is A.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '14-lowest-common-manager', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/14-lowest-common-manager'] = problem;

})();
