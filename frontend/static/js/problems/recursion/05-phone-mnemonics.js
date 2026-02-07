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
        problem: 'Break the problem into smaller subproblems recursively. Define clear base cases and recursive cases. At each step, assume the recursive call returns the correct result for smaller inputs, and combine them. This achieves O(4^n * n) time with O(n) space.',
        hints: [
            'Define your base case clearly. When should the recursion stop?',
            'For the recursive case, assume the function works for smaller inputs. How do you use that?',
            'Think about whether you need to pass additional state through parameters.',
            'Consider memoization if the same subproblems are being computed multiple times.'
        ],

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
        twists: [
            { id: '05-phone-mnemonics/twist-01-filter-dictionary-words', name: 'Filter Dictionary Words', difficulty: 'Hard' },
            { id: '05-phone-mnemonics/twist-02-phone-number-to-words-with-0-and-1', name: 'Phone Number to Words with 0 and 1', difficulty: 'Medium' },
            { id: '05-phone-mnemonics/twist-03-count-combinations-only', name: 'Count Combinations Only', difficulty: 'Easy' },
            { id: '05-phone-mnemonics/twist-04-t9-predictive-text', name: 'T9 Predictive Text', difficulty: 'Hard' },
            { id: '05-phone-mnemonics/twist-05-iterative-bfs-approach', name: 'Iterative BFS Approach', difficulty: 'Medium' }
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
