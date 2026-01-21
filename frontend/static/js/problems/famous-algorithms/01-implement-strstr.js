/**
 * Implement strStr()
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Implement strStr()',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        description: 'Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
        complexity: {
            time: 'O(n + m)',
            space: 'O(m)'
        },
        examples: [
    {
        input: {
        "haystack": "sadbutsad",
        "needle": "sad"
},
        output: 0,
        explanation: 'Processing the input data produces the output. For input haystack=sadbutsad, needle=sad, the result is 0.'
    },
    {
        input: {
        "haystack": "leetcode",
        "needle": "leeto"
},
        output: -1,
        explanation: 'Processing the input data produces the output. For input haystack=leetcode, needle=leeto, the result is -1.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-implement-strstr', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-implement-strstr'] = problem;

})();
