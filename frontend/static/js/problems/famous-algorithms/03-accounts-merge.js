/**
 * Accounts Merge
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Accounts Merge',
        difficulty: 'Medium',
        algorithm: 'union-find',
        description: 'Given a list of accounts where each element is a list of strings, where the first element is a name and the rest are emails. Merge accounts that share at least one email. Return accounts in sorted order.',
        complexity: {
            time: 'O(NK log NK)',
            space: 'O(NK)'
        },
        examples: [
    {
        input: {
        "accounts": [
                [
                        "John",
                        "a@m.co",
                        "b@m.co"
                ],
                [
                        "John",
                        "c@m.co"
                ],
                [
                        "John",
                        "a@m.co",
                        "d@m.co"
                ]
        ]
},
        output: [["John", "a@m.co", "b@m.co", "d@m.co"], ["John", "c@m.co"]],
        explanation: 'Processing the input data produces the output. For input accounts=[[\'John\', \'a@m.co\', \'b@m.co\'], [\'John\', \'c@m.co\'], [\'John\', \'a@m.co\', \'d@m.co\']], the result is [[\'John\', \'a@m.co\', \'b@m.co\', \'d@m.co\'], [\'John\', \'c@m.co\']].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-accounts-merge', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-accounts-merge'] = problem;

})();
