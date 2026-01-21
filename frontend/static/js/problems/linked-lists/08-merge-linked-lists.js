/**
 * Merge Linked Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-merge
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Linked Lists',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        description: 'Write a function that takes in the heads of two Singly Linked Lists that are in sorted order, respectively. The function should merge the lists in place (i.e., it shouldn\'t create a brand new list) and return the head of the merged list; the merged list should be in sorted order. Each LinkedList node has an integer value as well as a next node pointing to the next node in the list or to None/null if it\'s the tail of the list.',
        complexity: {
            time: 'O(n+m)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list1": [
                2,
                6,
                7,
                8
        ],
        "list2": [
                1,
                3,
                4,
                5,
                9,
                10
        ]
},
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        explanation: 'Processing the input data produces the output. For input list1=[2, 6, 7, 8], list2=[1, 3, ..., 10] (length 6), the result is [1, ..., 10] (length 10).'
    },
    {
        input: {
        "list1": [
                1,
                2,
                3
        ],
        "list2": [
                4,
                5,
                6
        ]
},
        output: [1, 2, 3, 4, 5, 6],
        explanation: 'Processing the input data produces the output. For input list1=[1, 2, 3], list2=[4, 5, 6], the result is [1, ..., 6] (length 6).'
    },
    {
        input: {
        "list1": [
                5
        ],
        "list2": [
                1,
                2,
                3
        ]
},
        output: [1, 2, 3, 5],
        explanation: 'Processing the input data produces the output. For input list1=[5], list2=[1, 2, 3], the result is [1, 2, 3, 5].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists'] = problem;

})();
