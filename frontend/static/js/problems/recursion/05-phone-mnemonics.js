/**
 * Phone Number Mnemonics
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-phone
 */
(function() {
    'use strict';

    const problem = {
        name: 'Phone Number Mnemonics',
        difficulty: 'Medium',
        algorithm: 'recursion-phone',
        description: 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent on a phone keypad. The mapping of digits to letters (just like on telephone buttons) is: `` 2 -> "abc" 3 -> "def" 4 -> "ghi" 5 -> "jkl" 6 -> "mno" 7 -> "pqrs" 8 -> "tuv" 9 -> "wxyz" `` Note that 1 does not map to any letters.',
        complexity: {
            time: 'O(4^n * n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "phoneNumber": "23"
},
        output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input phoneNumber=23, the result is [ad, ..., cf] (length 9).'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics'] = problem;

})();
