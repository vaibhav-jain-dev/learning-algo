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
        similar: [
    { id: '01-implement-strstr', name: 'Implement strStr()', difficulty: 'Easy' },
    { id: '02-repeated-substring', name: 'Repeated Substring Pattern', difficulty: 'Easy' },
    { id: '03-longest-happy-prefix', name: 'Longest Happy Prefix', difficulty: 'Hard' }
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
