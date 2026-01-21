/**
 * Nth Fibonacci
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nth Fibonacci',
        difficulty: 'Easy',
        algorithm: 'recursion-fibonacci',
        description: 'The Fibonacci sequence is defined as follows: the first number of the sequence is 0, the second number is 1, and the nth number is the sum of the (n - 1)th and (n - 2)th numbers. Write a function that takes in an integer n and returns the nth Fibonacci number. Important note: the Fibonacci sequence is often defined with its first two numbers as F0 = 0 and F1 = 1. For the purpose of this question, the first Fibonacci number is F1 = 0. So for n = 1, output 0; for n = 2, output 1.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "n": 6
},
        output: 5,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=6, the result is 5.'
    }
        ],
        similar: [
    { id: '01-tribonacci', name: 'N-th Tribonacci Number', difficulty: 'Medium' },
    { id: '02-climbing-stairs-k-steps', name: 'Climbing Stairs with K Steps', difficulty: 'Medium' },
    { id: '03-matrix-fibonacci', name: 'Fibonacci with Matrix Exponentiation', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci'] = problem;

})();
