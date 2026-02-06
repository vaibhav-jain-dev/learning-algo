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
        twists: [
            { title: 'Most Significant Digit First', difficulty: 'Medium', description: 'The digits are stored in forward order (most significant digit first) instead of reverse order. Add the two numbers and return the result in the same format.', whyDifferent: 'You cannot process digits left-to-right for addition since carries propagate from right-to-left. Requires either reversing both lists first, using a stack, or recursion.', example: 'list1=[1,7,4,2] (1742), list2=[5,4,9] (549): sum=2291, result=[2,2,9,1].' },
            { title: 'Subtract Linked Lists', difficulty: 'Hard', description: 'Subtract the smaller number from the larger number (both represented as reversed linked lists). Return the absolute difference as a linked list.', whyDifferent: 'Subtraction introduces borrowing instead of carrying, and you must first determine which number is larger to know the subtraction direction.', example: 'list1=[2,4,7,1] (1742), list2=[9,4,5] (549): |1742-549|=1193, result=[3,9,1,1].' },
            { title: 'Multiply Linked Lists', difficulty: 'Hard', description: 'Multiply two numbers represented as reversed linked lists and return the product as a linked list.', whyDifferent: 'Multiplication is fundamentally more complex than addition. Requires implementing long multiplication with partial products and managing carries across multiple digits.', example: 'list1=[3,2,1] (123), list2=[6,5] (56): 123*56=6888, result=[8,8,8,6].' },
            { title: 'Sum of K Linked Lists', difficulty: 'Medium', description: 'Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.', whyDifferent: 'Extends from two lists to k lists, requiring simultaneous traversal of multiple lists and accumulating carries that can exceed single digits when k is large.', example: 'lists=[[9,9],[9,9],[9,9]]: 99+99+99=297, result=[7,9,2].' },
            { title: 'Sum With Decimal Points', difficulty: 'Hard', description: 'Each linked list includes a special marker node indicating the decimal point position. Add the two decimal numbers and return the result with the decimal point.', whyDifferent: 'Requires aligning the decimal points before adding, handling different-length fractional and integer parts, and preserving the decimal marker in the output.', example: 'list1 represents 12.34, list2 represents 5.678: sum=18.018. Must align at decimal point before digit-by-digit addition.' }
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
