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
        twists: [
            { title: 'Filter Dictionary Words', difficulty: 'Hard', description: 'Instead of returning all letter combinations, return only those that form valid English dictionary words.', whyDifferent: 'Requires integrating a trie or set lookup into the recursion, pruning branches early when no dictionary word starts with the current prefix.', example: 'For "228", instead of all 27 combinations, return only valid words like ["bat","cat","act"] from a dictionary.' },
            { title: 'Phone Number to Words with 0 and 1', difficulty: 'Medium', description: 'Extend the mapping so that 0 maps to a space and 1 maps to nothing (skip), then generate all combinations.', whyDifferent: 'Introduces variable-length branching -- some digits produce 0 characters while others produce 3-4, complicating the recursion structure.', example: 'For "201", output includes ["a ","b ","c "] where the space comes from 0 and 1 contributes nothing.' },
            { title: 'Count Combinations Only', difficulty: 'Easy', description: 'Return just the total count of possible letter combinations without generating them.', whyDifferent: 'Transforms from a generation problem to a pure multiplication problem -- multiply the number of letters mapped to each digit.', example: 'For "23", digit 2 has 3 letters, digit 3 has 3 letters, so answer is 3*3=9.' },
            { title: 'T9 Predictive Text', difficulty: 'Hard', description: 'Given a phone number and a dictionary, return all possible words for each possible segmentation of the number into word-forming groups.', whyDifferent: 'Adds a segmentation/partitioning dimension on top of letter mapping -- you must decide where word boundaries are while also mapping digits to letters.', example: 'For "4663" with dictionary containing "good","gone","home","hood", return matching words for different segmentations.' },
            { title: 'Iterative BFS Approach', difficulty: 'Medium', description: 'Generate all phone mnemonics using an iterative BFS approach with a queue instead of recursion.', whyDifferent: 'Replaces the recursive DFS pattern with level-by-level expansion, building partial results in a queue and extending them one digit at a time.', example: 'For "23": start with [""], process 2 to get ["a","b","c"], then process 3 to get ["ad","ae","af","bd",...].' }
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
