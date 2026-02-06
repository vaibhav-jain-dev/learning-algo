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
        problem: 'The naive recursive solution has O(2^n) time complexity due to redundant calculations. Optimize using memoization (top-down DP) to cache results, achieving O(n) time. Even better: use iterative approach with two variables tracking the previous two Fibonacci numbers, achieving O(n) time and O(1) space.',
        hints: [
            'Start with the base cases: F(1) = 0, F(2) = 1.',
            'The recursive relation is F(n) = F(n-1) + F(n-2). Can you see why naive recursion is inefficient?',
            'Memoization avoids recalculating the same values. Store computed Fibonacci numbers in a hash table or array.',
            'For O(1) space: you only need the previous two values. Use two variables and update them iteratively.'
        ],
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
        explanation: 'Fibonacci sequence (1-indexed): F(1)=0, F(2)=1, F(3)=1, F(4)=2, F(5)=3, F(6)=5. Each number is the sum of the two preceding ones: 3+2=5.'
    }
        ],
        twists: [
            { id: '01-nth-fibonacci/twist-01-iterative-conversion', name: 'Iterative Conversion', difficulty: 'Easy' },
            { id: '01-nth-fibonacci/twist-02-tail-recursion-refactor', name: 'Tail Recursion Refactor', difficulty: 'Medium' },
            { id: '01-nth-fibonacci/twist-03-memoization-with-cache-analysis', name: 'Memoization with Cache Analysis', difficulty: 'Easy' },
            { id: '01-nth-fibonacci/twist-04-stack-overflow-prevention', name: 'Stack Overflow Prevention', difficulty: 'Medium' },
            { id: '01-nth-fibonacci/twist-05-output-prediction-trap', name: 'Output Prediction Trap', difficulty: 'Medium' },
            { id: '01-nth-fibonacci/twist-06-time-complexity-proof', name: 'Time Complexity Proof', difficulty: 'Hard' }
        ],
        similar: [
    { id: '01-nth-fibonacci/01-tribonacci', name: 'N-th Tribonacci Number', difficulty: 'Medium' },
    { id: '01-nth-fibonacci/02-climbing-stairs-k-steps', name: 'Climbing Stairs with K Steps', difficulty: 'Medium' },
    { id: '01-nth-fibonacci/03-matrix-fibonacci', name: 'Fibonacci with Matrix Exponentiation', difficulty: 'Hard' }
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
