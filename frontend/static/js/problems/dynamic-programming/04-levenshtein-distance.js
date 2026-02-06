/**
 * Levenshtein Distance
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-edit-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Levenshtein Distance',
        difficulty: 'Medium',
        algorithm: 'dp-edit-distance',
        description: 'Write a function that takes in two strings and returns the minimum number of edit operations needed to transform the first string into the second string. There are three operations permitted on a string: 1. Insert a character 2. Delete a character 3. Replace a character This is also known as the Edit Distance or the Levenshtein Distance problem.',
        complexity: {
            time: 'O(m * n)',
            space: 'O(m * n)'
        },
        examples: [
    {
        input: {
        "str1": "abc",
        "str2": "yabd"
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=abc, str2=yabd, the result is 2.'
    },
    {
        input: {
        "str1": "horse",
        "str2": "ros"
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=horse, str2=ros, the result is 3.'
    },
    {
        input: {
        "str1": "",
        "str2": "abc"
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=, str2=abc, the result is 3.'
    }
        ],
        twists: [
            { title: 'Weighted Edit Operations', difficulty: 'Hard', description: 'Each edit operation has a different cost: insert costs w_i, delete costs w_d, and replace costs w_r. Find the minimum total cost to transform str1 into str2.', whyDifferent: 'Breaks the uniform-cost assumption. The DP recurrence must use different weights for each operation, and the optimal path changes based on the relative costs.', example: 'str1="abc", str2="yabd", insert=1, delete=2, replace=3. Now deleting is expensive so you prefer inserting, changing the optimal edit sequence.' },
            { title: 'Recover Edit Sequence', difficulty: 'Medium', description: 'Return not just the minimum edit distance, but the actual sequence of operations (insert, delete, replace) to transform str1 into str2.', whyDifferent: 'Requires backtracking through the DP table to reconstruct the path, turning a value-only problem into a path-recovery problem.', example: 'str1="horse", str2="ros": operations are [replace h->r, delete o (keep o), delete r (keep r->keep?), keep s]. The sequence is replace(0,r), delete(1), delete(3).' },
            { title: 'Edit Distance With Transposition', difficulty: 'Hard', description: 'Add a fourth allowed operation: transposition (swap two adjacent characters). This is the Damerau-Levenshtein distance. Find the minimum operations needed.', whyDifferent: 'Adds a new transition to the DP that looks back two characters, requiring careful handling to avoid double-counting with other operations.', example: 'str1="ab", str2="ba": standard Levenshtein=2 (replace both), but with transposition=1 (swap a and b).' },
            { title: 'Edit Distance With Only Insert and Delete', difficulty: 'Medium', description: 'Find the minimum number of edit operations when only insertions and deletions are allowed (no replacements).', whyDifferent: 'Removing replace forces a fundamentally different approach. A replacement must now be simulated as delete+insert, linking this problem to Longest Common Subsequence.', example: 'str1="abc", str2="yabd": without replace, distance is 3 (delete c, insert y at start, insert d at end). Related to 2*(n - LCS length).' },
            { title: 'K-Edit Distance Filter', difficulty: 'Hard', description: 'Given a list of words and a target string, return all words whose edit distance to the target is at most k. Optimize to avoid computing full DP for every word.', whyDifferent: 'Requires early termination and trie-based optimization rather than naively running Levenshtein for each word, shifting focus to algorithmic efficiency across multiple queries.', example: 'words=["abc","ab","abcd","xyz"], target="abc", k=1: returns ["abc","ab","abcd"] since their edit distances are 0, 1, and 1 respectively.' },
            { title: 'Substring Edit Distance', difficulty: 'Medium', description: 'Find the minimum edit distance between str1 and any substring of str2. The first row of the DP table is initialized to zeroes since str1 can match starting at any position in str2.', whyDifferent: 'Changes the initialization of the DP table, allowing the pattern to float within the text. This is a fundamentally different setup from full-string-to-full-string comparison.', example: 'str1="abc", str2="xxabcxx": minimum substring edit distance is 0 since "abc" appears as a substring.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance'] = problem;

})();
