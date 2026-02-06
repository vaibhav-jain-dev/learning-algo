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
            { id: '01-nth-fibonacci/01-tribonacci/twist-01-iterative-with-constant-space', name: 'Iterative with Constant Space', difficulty: 'Easy' },
            { id: '01-nth-fibonacci/01-tribonacci/twist-02-generalize-to-n-bonacci', name: 'Generalize to N-bonacci', difficulty: 'Medium' },
            { id: '01-nth-fibonacci/01-tribonacci/twist-03-memoized-recursive-vs-iterative-comparison', name: 'Memoized Recursive vs Iterative Comparison', difficulty: 'Easy' },
            { id: '01-nth-fibonacci/01-tribonacci/twist-04-matrix-exponentiation-for-tribonacci', name: 'Matrix Exponentiation for Tribonacci', difficulty: 'Hard' },
            { id: '01-nth-fibonacci/01-tribonacci/twist-05-tail-recursion-with-three-accumulators', name: 'Tail Recursion with Three Accumulators', difficulty: 'Medium' }
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
