/**
 * Sum of Linked Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum of Linked Lists',
        difficulty: 'Medium',
        algorithm: 'll-sum',
        description: 'You\'re given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Write a function that adds the two numbers and returns the sum as a linked list. The linked list representation means that the number 123 would be represented as 3 -> 2 -> 1 (least significant digit first).',
        complexity: {
            time: 'O(max(n,m))',
            space: 'O(max(n,m))'
        },
        examples: [
    {
        input: {
        "list1": [
                2,
                4,
                7,
                1
        ],
        "list2": [
                9,
                4,
                5
        ]
},
        output: [1, 9, 2, 2],
        explanation: 'Processing the input data produces the output. For input list1=[2, 4, 7, 1], list2=[9, 4, 5], the result is [1, 9, 2, 2].'
    },
    {
        input: {
        "list1": [
                9,
                9,
                9
        ],
        "list2": [
                1
        ]
},
        output: [0, 0, 0, 1],
        explanation: 'Processing the input data produces the output. For input list1=[9, 9, 9], list2=[1], the result is [0, 0, 0, 1].'
    },
    {
        input: {
        "list1": [
                5,
                6,
                3
        ],
        "list2": [
                8,
                4,
                2
        ]
},
        output: [3, 1, 6],
        explanation: 'Processing the input data produces the output. For input list1=[5, 6, 3], list2=[8, 4, 2], the result is [3, 1, 6].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists'] = problem;

})();
