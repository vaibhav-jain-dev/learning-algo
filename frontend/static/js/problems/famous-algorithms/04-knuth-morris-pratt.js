/**
 * String Pattern Matching
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'String Pattern Matching',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        description: 'Given a text string and a pattern string, find all occurrences of the pattern in the text using the KMP algorithm. The KMP algorithm improves upon the naive O(n*m) approach by preprocessing the pattern to build a "failure function" (also called LPS - Longest Proper Prefix which is also Suffix). This allows us to skip characters that we know will match, achieving O(n + m) time complexity.',
        complexity: {
            time: 'O(n + m)',
            space: 'O(m)'
        },
        examples: [
    {
        input: {
        "text": "ABABDABACDABABCABAB",
        "pattern": "ABABCABAB"
},
        output: [10],
        explanation: 'Processing the input data produces the output. For input text=ABABDABACDABABCABAB, pattern=ABABCABAB, the result is [10].'
    },
    {
        input: {
        "text": "AAAAAA",
        "pattern": "AA"
},
        output: [0, 1, 2, 3, 4],
        explanation: 'Processing the input data produces the output. For input text=AAAAAA, pattern=AA, the result is [0, 1, 2, 3, 4].'
    }
        ],
        twists: [
            { title: 'Build LPS Array Only', difficulty: 'Medium', description: 'Given a pattern, build and return just the LPS (Longest Proper Prefix which is also Suffix) failure function array.', whyDifferent: 'Focuses on understanding the preprocessing step in isolation, which is the core insight of KMP and often the hardest part to understand.', example: 'For pattern "ABABCABAB", the LPS array is [0,0,1,2,0,1,2,3,4].' },
            { title: 'Count Non-Overlapping Matches', difficulty: 'Medium', description: 'Find all non-overlapping occurrences of the pattern in the text, where after a match, the search continues from the end of the match.', whyDifferent: 'After finding a match, instead of using the LPS to find overlapping matches, you reset the pattern pointer to 0 and continue from position i, changing the match counting logic.', example: 'For text "AAAA" and pattern "AA", overlapping gives [0,1,2] but non-overlapping gives only [0,2].' },
            { title: 'Multiple Pattern Search', difficulty: 'Hard', description: 'Search for multiple patterns simultaneously in a single pass through the text using Aho-Corasick instead of running KMP for each pattern.', whyDifferent: 'Extends the single-pattern automaton idea to a trie-based automaton with failure links, enabling multi-pattern matching in one traversal.', example: 'Find all occurrences of patterns ["he","she","his","hers"] in text "ahishers" in a single O(n+m) pass.' },
            { title: 'Wildcard Pattern Matching', difficulty: 'Hard', description: 'Modify KMP to handle patterns containing wildcard characters (?) that match any single character.', whyDifferent: 'Wildcards break the standard LPS computation since a ? matches anything, requiring modified failure function logic that accounts for flexible matching.', example: 'Pattern "A?B" matches "AXB", "A1B", "AAB" etc. Finding this in "AABAXB" should return positions [0,3] (if A?B matches at those positions).' },
            { title: 'Z-Algorithm Alternative', difficulty: 'Medium', description: 'Solve the same pattern matching problem using the Z-algorithm instead of KMP, and compare the approaches.', whyDifferent: 'The Z-array provides a different perspective -- Z[i] gives the length of the longest substring starting at i that matches a prefix of the string, offering an alternative to KMP.', example: 'For "aabxaa", Z-array is [6,1,0,0,2,1]. Use this to find pattern occurrences by concatenating pattern + "$" + text.' }
        ],
        similar: [
    { id: '04-knuth-morris-pratt/01-implement-strstr', name: 'Implement strStr()', difficulty: 'Easy' },
    { id: '04-knuth-morris-pratt/02-repeated-substring', name: 'Repeated Substring Pattern', difficulty: 'Easy' },
    { id: '04-knuth-morris-pratt/03-longest-happy-prefix', name: 'Longest Happy Prefix', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt'] = problem;

})();
