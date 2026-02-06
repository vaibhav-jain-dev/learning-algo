/**
 * N-th Tribonacci Number
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'N-th Tribonacci Number',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'The Tribonacci sequence Tn is defined as follows: T0 = 0, T1 = 1, T2 = 1, and Tn = Tn-1 + Tn-2 + Tn-3 for n >= 3. Given n, return the value of Tn.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "n": 4
},
        output: 4,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=4, the result is 4.'
    }
        ],
        solutions: {
            python: `def nthTribonacciNumber(data):
    """
    N-th Tribonacci Number

    The Tribonacci sequence: T0=0, T1=1, T2=1
    Tn = Tn-1 + Tn-2 + Tn-3 for n >= 3

    Time: O(n)
    Space: O(1)
    """
    n = data.get("n", data) if isinstance(data, dict) else data

    if n == 0:
        return 0
    if n <= 2:
        return 1

    # Use three variables to track the last three values
    t0, t1, t2 = 0, 1, 1

    for _ in range(3, n + 1):
        t0, t1, t2 = t1, t2, t0 + t1 + t2

    return t2


# Test
if __name__ == "__main__":
    print(nthTribonacciNumber({"n": 4}))   # Output: 4
    print(nthTribonacciNumber({"n": 25}))  # Output: 1389537`,
            go: `package main

import "fmt"

// NthTribonacciNumber solves the N-th Tribonacci Number problem.
// The Tribonacci sequence: T0=0, T1=1, T2=1
// Tn = Tn-1 + Tn-2 + Tn-3 for n >= 3
// Time: O(n), Space: O(1)
func NthTribonacciNumber(data interface{}) interface{} {
    // Extract n from input
    var n int
    switch v := data.(type) {
    case map[string]interface{}:
        n = int(v["n"].(float64))
    case int:
        n = v
    }

    if n == 0 {
        return 0
    }
    if n <= 2 {
        return 1
    }

    // Use three variables to track the last three values
    t0, t1, t2 := 0, 1, 1

    for i := 3; i <= n; i++ {
        t0, t1, t2 = t1, t2, t0+t1+t2
    }

    return t2
}

func main() {
    fmt.Println(NthTribonacciNumber(map[string]interface{}{"n": float64(4)}))  // Output: 4
    fmt.Println(NthTribonacciNumber(map[string]interface{}{"n": float64(25)})) // Output: 1389537
}`
        },
        twists: [
            {
                title: 'Iterative with Constant Space',
                difficulty: 'Easy',
                description: 'Solve Tribonacci iteratively using exactly three variables. No array or hash map allowed.',
                whyDifferent: 'While conceptually similar to iterative Fibonacci with two variables, managing three rotating variables requires more careful bookkeeping of which variable to overwrite next.',
                example: 'For n=4: start with t0=0, t1=1, t2=1. Step 3: new = 0+1+1=2, rotate to t0=1, t1=1, t2=2. Step 4: new = 1+1+2=4. Return 4.'
            },
            {
                title: 'Generalize to N-bonacci',
                difficulty: 'Medium',
                description: 'Extend the solution to compute the k-th element of an N-bonacci sequence, where each term is the sum of the previous N terms. Tribonacci is the special case N=3.',
                whyDifferent: 'Requires parameterizing the number of tracked previous values, using a sliding window or circular buffer instead of fixed variables. The generalization reveals the pattern behind Fibonacci/Tribonacci.',
                example: 'For N=4 (Tetranacci): T(0)=0, T(1)=T(2)=T(3)=1. T(4)=0+1+1+1=3, T(5)=1+1+1+3=6.'
            },
            {
                title: 'Memoized Recursive vs Iterative Comparison',
                difficulty: 'Easy',
                description: 'Implement both a memoized recursive solution and the iterative solution. Compare the actual number of operations and memory usage for n=30.',
                whyDifferent: 'Forces you to reason about the hidden costs of recursion (call stack frames, hash map overhead) versus the simplicity of iteration, even when both are O(n) time.',
                example: 'Memoized recursive: 31 cache entries + up to 30 stack frames. Iterative: 3 variables, 0 stack frames. Both O(n) time but vastly different constant factors.'
            },
            {
                title: 'Matrix Exponentiation for Tribonacci',
                difficulty: 'Hard',
                description: 'Compute the n-th Tribonacci in O(log n) time using 3x3 matrix exponentiation, analogous to the 2x2 matrix approach for Fibonacci.',
                whyDifferent: 'Requires constructing the correct 3x3 transition matrix [[1,1,1],[1,0,0],[0,1,0]] and applying fast matrix power. The jump from 2x2 to 3x3 introduces new complexity in matrix multiplication.',
                example: 'The matrix [[1,1,1],[1,0,0],[0,1,0]]^n gives Tribonacci values. For n=4, matrix^4 yields T(4)=4 in the appropriate cell.'
            },
            {
                title: 'Tail Recursion with Three Accumulators',
                difficulty: 'Medium',
                description: 'Write a tail-recursive Tribonacci that passes three accumulator values as parameters. The recursive call must be the last operation.',
                whyDifferent: 'Managing three accumulators instead of two makes the parameter passing more complex. You must carefully track which accumulator maps to which position in the sequence.',
                example: 'tribTail(n, a=0, b=1, c=1) -> tribTail(n-1, b, c, a+b+c). For n=4: tribTail(4,0,1,1) -> tribTail(3,1,1,2) -> tribTail(2,1,2,4) -> return 4.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/01-tribonacci', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/01-tribonacci'] = problem;

})();
