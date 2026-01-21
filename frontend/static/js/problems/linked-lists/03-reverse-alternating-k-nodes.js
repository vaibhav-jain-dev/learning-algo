/**
 * Reverse Alternating K Nodes
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Alternating K Nodes',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        description: 'Given the head of a linked list and an integer k, reverse the first k nodes, then skip the next k nodes, then reverse the next k nodes, and so on. If there are fewer than k nodes remaining (either for reversing or skipping), handle them accordingly: - If reversing: reverse all remaining nodes - If skipping: skip all remaining nodes',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
        ],
        "k": 2
},
        output: [2, 1, 3, 4, 6, 5, 7, 8],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 8] (length 8), k=2, the result is [2, ..., 8] (length 8).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
        ],
        "k": 3
},
        output: [3, 2, 1, 4, 5, 6, 9, 8, 7, 10],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 10] (length 10), k=3, the result is [3, ..., 10] (length 10).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "k": 3
},
        output: [3, 2, 1, 4, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], k=3, the result is [3, 2, 1, 4, 5].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-reverse-alternating-k-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-reverse-alternating-k-nodes'] = problem;

})();
