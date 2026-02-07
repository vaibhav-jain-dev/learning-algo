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
        problem: 'Preprocess the pattern to build a failure/prefix function that tells you how far to shift on a mismatch, avoiding re-comparison of characters. This achieves O(n + m) time with O(m) space.',
        hints: [
            'Naive string matching is O(n*m). Pattern preprocessing can reduce this to O(n+m).',
            'Think about what information from failed matches can help avoid re-comparing characters.',
            'The failure/prefix function tells you the longest proper prefix that is also a suffix.',
            'Consider edge cases: pattern longer than text, repeated characters, empty strings.'
        ],

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
        explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
    },
    {
        input: {
        "text": "AAAAAA",
        "pattern": "AA"
},
        output: [0, 1, 2, 3, 4],
        explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
    }
        ],
        twists: [
            { id: '04-knuth-morris-pratt/twist-01-build-lps-array-only', name: 'Build LPS Array Only', difficulty: 'Medium' },
            { id: '04-knuth-morris-pratt/twist-02-count-non-overlapping-matches', name: 'Count Non-Overlapping Matches', difficulty: 'Medium' },
            { id: '04-knuth-morris-pratt/twist-03-multiple-pattern-search', name: 'Multiple Pattern Search', difficulty: 'Hard' },
            { id: '04-knuth-morris-pratt/twist-04-wildcard-pattern-matching', name: 'Wildcard Pattern Matching', difficulty: 'Hard' },
            { id: '04-knuth-morris-pratt/twist-05-z-algorithm-alternative', name: 'Z-Algorithm Alternative', difficulty: 'Medium' }
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
