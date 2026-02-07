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
        description: 'Given an array of integers between 1 and n (inclusive), where n is the length of the array, write a function that returns the first integer that appears more than once (when the array is read from left to right). In other words, out of all the integers that might occur more than once in the input array, your function should return the one whose second occurrence has the minimum index. If no integer appears more than once, your function should return -1. **Note:** You\'re allowed to mutate the inp.',
        problem: 'Analyze the problem structure to identify the right approach. Consider the constraints to determine the target complexity. Implement the algorithm step by step, handling edge cases carefully. This achieves O(n) time with O(1) space.',
        hints: [
            'Break down the problem into smaller subproblems. What is the simplest case you can solve?',
            'Consider what data structure would help you efficiently track the information you need.',
            'Think about the time-space tradeoff. Can you trade extra memory for better time complexity?',
            'Walk through a small example by hand. What steps do you take? Can you formalize that into an algorithm?'
        ],

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
        explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
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
        explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
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
        explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
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
        explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
    }
        ],
        twists: [
            { name: 'First Duplicate Without Mutation', difficulty: 'Medium', description: 'Find the first duplicate value but you cannot modify the input array. Achieve O(1) extra space using Floyd cycle detection.', whyDifferent: 'Index-marking mutates the array. Without mutation, you need a cycle detection approach treating values as next-pointers.', example: 'array = [2, 1, 5, 2, 3, 3, 4]. First duplicate is 2, found without modifying the array.' },
            { name: 'Last Duplicate Value', difficulty: 'Medium', description: 'Find the integer whose last occurrence (rightmost second appearance) comes latest in the array.', whyDifferent: 'Scanning direction and tracking logic reverses: you track the latest second occurrence rather than the earliest.', example: 'array = [2, 1, 5, 2, 3, 3, 4]. Last duplicate occurrence: 3 (at index 5).' },
            { name: 'K-th Duplicate Value', difficulty: 'Hard', description: 'Find the K-th value to appear as a duplicate when scanning left to right. K=1 is the original problem.', whyDifferent: 'Must count duplicate discoveries and return the K-th one, requiring tracking of how many duplicates have been found so far.', example: 'array = [2, 1, 5, 2, 3, 3, 4], K = 2. First dup = 2, second dup = 3. Return 3.' },
            { name: 'First Triplicate Value', difficulty: 'Medium', description: 'Find the first value that appears at least three times (third occurrence has minimum index).', whyDifferent: 'Cannot use simple negation marking. Need a counter per value, either via array encoding or different marking scheme.', example: 'array = [2, 1, 2, 3, 2, 1, 1]. First triplicate: 2 (third occurrence at index 4).' },
            { name: 'All First Duplicates', difficulty: 'Medium', description: 'Return all values that are duplicates, in the order their second occurrence appears.', whyDifferent: 'Must collect all duplicates rather than stopping at the first one, but still maintaining discovery order.', example: 'array = [2, 1, 5, 2, 3, 3, 4]. Duplicates in order: [2, 3].' }
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
