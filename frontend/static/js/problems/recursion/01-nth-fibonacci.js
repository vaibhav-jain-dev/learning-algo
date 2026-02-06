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
            {
                title: 'Iterative Conversion',
                difficulty: 'Easy',
                description: 'Rewrite the naive recursive Fibonacci using a simple loop with two variables. No recursion allowed.',
                whyDifferent: 'Forces you to think about how recursive state maps to loop variables and how the call stack is replaced by explicit variable updates.',
                example: 'fib(6) using only a for-loop and two variables prev=0, curr=1, iterating and swapping until reaching n.'
            },
            {
                title: 'Tail Recursion Refactor',
                difficulty: 'Medium',
                description: 'Convert the recursive Fibonacci into a tail-recursive version by passing accumulator parameters. The recursive call must be the very last operation.',
                whyDifferent: 'Requires rethinking the function signature to carry forward partial results, turning tree recursion into linear recursion that compilers can optimize into a loop.',
                example: 'fibTail(n, prev=0, curr=1) where fibTail(6, 0, 1) chains through fibTail(5, 1, 1) -> fibTail(4, 1, 2) -> ... -> 5.'
            },
            {
                title: 'Memoization with Cache Analysis',
                difficulty: 'Easy',
                description: 'Add memoization to the naive recursive solution and then trace exactly which cache lookups occur for fib(7). Count how many recursive calls are saved.',
                whyDifferent: 'Shifts thinking from writing code to analyzing execution flow. You must mentally simulate the call tree and identify which branches are pruned by the cache.',
                example: 'For fib(7): without memo ~25 calls, with memo exactly 7 unique computations. Trace the order: fib(7)->fib(6)->fib(5)->...->fib(1), then fib(2) is cached on the way back up.'
            },
            {
                title: 'Stack Overflow Prevention',
                difficulty: 'Medium',
                description: 'Given that the naive recursive Fibonacci will overflow the call stack around n=10000 in most languages, design a solution that handles n=1,000,000 without stack overflow.',
                whyDifferent: 'Forces consideration of practical system limits. You cannot simply recurse; you must either iterate or use techniques like trampolining to avoid deep call stacks.',
                example: 'For n=1000000, an iterative or trampoline-based approach returns the result without crashing, while naive recursion would hit maximum call stack size.'
            },
            {
                title: 'Output Prediction Trap',
                difficulty: 'Medium',
                description: 'Without running code, predict the exact number of function calls made by the naive recursive fib(10). Then explain why fib(n) itself appears in the count formula.',
                whyDifferent: 'This is a conceptual analysis twist. You must understand that the number of calls to compute fib(n) is 2*fib(n+1)-1, connecting the recursion structure to the Fibonacci sequence itself.',
                example: 'fib(10)=55, and the total number of calls is 2*fib(11)-1 = 2*89-1 = 177. The call tree has a self-similar structure matching the Fibonacci recurrence.'
            },
            {
                title: 'Time Complexity Proof',
                difficulty: 'Hard',
                description: 'Prove that the naive recursive Fibonacci is O(2^n) but more precisely O(phi^n) where phi is the golden ratio. Why is 2^n an overestimate?',
                whyDifferent: 'Requires mathematical reasoning about the recursion tree rather than coding. You must analyze the asymmetric branching where fib(n-1) and fib(n-2) create an unbalanced tree.',
                example: 'The exact base of the exponential is phi=(1+sqrt(5))/2 ~= 1.618, not 2. This is because each call branches into fib(n-1) and fib(n-2), and the characteristic equation x^2=x+1 gives x=phi.'
            }
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
