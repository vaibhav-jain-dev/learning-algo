/**
 * Remove Duplicates From Linked List
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Duplicates From Linked List',
        difficulty: 'Easy',
        algorithm: 'll-remove-duplicates',
        description: 'You\'re given the head of a Singly Linked List whose nodes are in sorted order with respect to their values. Write a function that returns a modified version of the Linked List that doesn\'t contain any nodes with duplicate values. The Linked List should be modified in place (i.e., you shouldn\'t create a brand new list), and the modified Linked List should still have its nodes sorted with respect to their values.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [
                1,
                1,
                3,
                4,
                4,
                4,
                5,
                6,
                6
        ]
},
        output: [1, 3, 4, 5, 6],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, ..., 6] (length 9), the result is [1, 3, 4, 5, 6].'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                1,
                1
        ]
},
        output: [1],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 1, 1, 1], the result is [1].'
    }
        ],
        similar: [
    { id: '01-remove-duplicates-unsorted', name: 'Remove Duplicates from Unsorted Linked List', difficulty: 'Medium' },
    { id: '02-remove-all-duplicate-nodes', name: 'Remove All Nodes with Duplicate Values', difficulty: 'Medium' },
    { id: '03-remove-duplicates-keep-k', name: 'Remove Duplicates Keeping At Most K Occurrences', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates'] = problem;

})();
