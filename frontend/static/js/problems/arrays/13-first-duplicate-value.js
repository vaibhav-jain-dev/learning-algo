/**
 * First Duplicate Value
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 */
(function() {
    'use strict';

    const problem = {
        name: 'First Duplicate Value',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        description: 'Given an array of integers between 1 and n (inclusive), where n is the length of the array, write a function that returns the first integer that appears more than once (when the array is read from left to right). In other words, out of all the integers that might occur more than once in the input array, your function should return the one whose second occurrence has the minimum index. If no integer appears more than once, your function should return -1. **Note:** You\'re allowed to mutate the inp',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                2,
                1,
                5,
                2,
                3,
                3,
                4
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input array=[2, 1, ..., 4] (length 7), the result is 2.'
    },
    {
        input: {
        "array": [
                2,
                1,
                5,
                3,
                3,
                2,
                4
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input array=[2, 1, ..., 4] (length 7), the result is 3.'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: -1,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is -1.'
    },
    {
        input: {
        "array": [
                1,
                1,
                2,
                3,
                3,
                2,
                2
        ]
},
        output: 1,
        explanation: 'Processing the input data produces the output. For input array=[1, 1, ..., 2] (length 7), the result is 1.'
    }
        ],
        twists: [
            { title: 'First Duplicate Without Mutation', difficulty: 'Medium', description: 'Find the first duplicate value but you cannot modify the input array. Achieve O(1) extra space using Floyd cycle detection.', whyDifferent: 'Index-marking mutates the array. Without mutation, you need a cycle detection approach treating values as next-pointers.', example: 'array = [2, 1, 5, 2, 3, 3, 4]. First duplicate is 2, found without modifying the array.' },
            { title: 'Last Duplicate Value', difficulty: 'Medium', description: 'Find the integer whose last occurrence (rightmost second appearance) comes latest in the array.', whyDifferent: 'Scanning direction and tracking logic reverses: you track the latest second occurrence rather than the earliest.', example: 'array = [2, 1, 5, 2, 3, 3, 4]. Last duplicate occurrence: 3 (at index 5).' },
            { title: 'K-th Duplicate Value', difficulty: 'Hard', description: 'Find the K-th value to appear as a duplicate when scanning left to right. K=1 is the original problem.', whyDifferent: 'Must count duplicate discoveries and return the K-th one, requiring tracking of how many duplicates have been found so far.', example: 'array = [2, 1, 5, 2, 3, 3, 4], K = 2. First dup = 2, second dup = 3. Return 3.' },
            { title: 'First Triplicate Value', difficulty: 'Medium', description: 'Find the first value that appears at least three times (third occurrence has minimum index).', whyDifferent: 'Cannot use simple negation marking. Need a counter per value, either via array encoding or different marking scheme.', example: 'array = [2, 1, 2, 3, 2, 1, 1]. First triplicate: 2 (third occurrence at index 4).' },
            { title: 'All First Duplicates', difficulty: 'Medium', description: 'Return all values that are duplicates, in the order their second occurrence appears.', whyDifferent: 'Must collect all duplicates rather than stopping at the first one, but still maintaining discovery order.', example: 'array = [2, 1, 5, 2, 3, 3, 4]. Duplicates in order: [2, 3].' }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value'] = problem;

})();
