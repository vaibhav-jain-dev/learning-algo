/**
 * Remove All Nodes with Duplicate Values
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove All Nodes with Duplicate Values',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        description: 'Given the head of a **sorted** linked list, delete all nodes that have duplicate values, leaving only **distinct** values from the original list. Return the linked list sorted as well. **Key Difference:** Remove ALL occurrences of duplicated values, not just the extras.',
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
                3,
                4,
                4,
                5
        ]
},
        output: [1, 2, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 5] (length 7), the result is [1, 2, 5].'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                2,
                3
        ]
},
        output: [2, 3],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 1, 2, 3], the result is [2, 3].'
    },
    {
        input: {
        "list": [
                1,
                1,
                2,
                2
        ]
},
        output: [],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 2, 2], the result is [].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes'] = problem;

})();
