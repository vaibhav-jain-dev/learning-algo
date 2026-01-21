/**
 * Remove Duplicates from Unsorted Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Duplicates from Unsorted Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        description: 'Given the head of an **unsorted** singly linked list, remove all duplicate values, keeping only the first occurrence of each value. Return the head of the modified linked list.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "list": [
                3,
                2,
                2,
                1,
                3,
                2,
                4
        ]
},
        output: [3, 2, 1, 4],
        explanation: 'Processing the input data produces the output. For input list=[3, 2, ..., 4] (length 7), the result is [3, 2, 1, 4].'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                1
        ]
},
        output: [1],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 1, 1], the result is [1].'
    },
    {
        input: {
        "list": [
                5,
                4,
                3,
                2,
                1
        ]
},
        output: [5, 4, 3, 2, 1],
        explanation: 'Processing the input data produces the output. For input list=[5, 4, 3, 2, 1], the result is [5, 4, 3, 2, 1].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted'] = problem;

})();
