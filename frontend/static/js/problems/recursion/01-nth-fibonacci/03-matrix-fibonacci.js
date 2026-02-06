/**
 * Fibonacci with Matrix Exponentiation
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Fibonacci with Matrix Exponentiation',
        difficulty: 'Hard',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'Given a very large number n (up to 10^18), compute the n-th Fibonacci number modulo 10^9 + 7. The standard O(n) approach is too slow for such large n. Use matrix exponentiation to achieve O(log n) time complexity.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(log n)',
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
        "n": 10
},
        output: 55,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=10, the result is 55.'
    }
        ],
        solutions: {
            python: `def fibonacciWithMatrixExponentiation(data):
    """
    Fibonacci with Matrix Exponentiation

    Uses the property: [[1,1],[1,0]]^n = [[F(n+1),F(n)],[F(n),F(n-1)]]
    Matrix exponentiation allows O(log n) computation.

    Time: O(log n)
    Space: O(1)
    """
    MOD = 10**9 + 7
    n = data.get("n", data) if isinstance(data, dict) else data

    if n == 0:
        return 0
    if n <= 2:
        return 1

    def matrix_mult(A, B):
        """Multiply two 2x2 matrices with modulo"""
        return [
            [(A[0][0] * B[0][0] + A[0][1] * B[1][0]) % MOD,
             (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % MOD],
            [(A[1][0] * B[0][0] + A[1][1] * B[1][0]) % MOD,
             (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % MOD]
        ]

    def matrix_pow(M, power):
        """Compute M^power using binary exponentiation"""
        result = [[1, 0], [0, 1]]  # Identity matrix

        while power > 0:
            if power % 2 == 1:
                result = matrix_mult(result, M)
            M = matrix_mult(M, M)
            power //= 2

        return result

    # Base matrix for Fibonacci
    base = [[1, 1], [1, 0]]
    result_matrix = matrix_pow(base, n)

    # F(n) is at position [0][1] or [1][0]
    return result_matrix[0][1]


# Test
if __name__ == "__main__":
    print(fibonacciWithMatrixExponentiation({"n": 10}))  # Output: 55
    print(fibonacciWithMatrixExponentiation({"n": 50}))  # Output: 12586269025`,
            go: `package main

import "fmt"

const MOD = 1000000007

// matrixMult multiplies two 2x2 matrices with modulo
func matrixMult(A, B [2][2]int64) [2][2]int64 {
    return [2][2]int64{
        {(A[0][0]*B[0][0] + A[0][1]*B[1][0]) % MOD,
         (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % MOD},
        {(A[1][0]*B[0][0] + A[1][1]*B[1][0]) % MOD,
         (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % MOD},
    }
}

// matrixPow computes M^power using binary exponentiation
func matrixPow(M [2][2]int64, power int64) [2][2]int64 {
    result := [2][2]int64{{1, 0}, {0, 1}} // Identity matrix

    for power > 0 {
        if power%2 == 1 {
            result = matrixMult(result, M)
        }
        M = matrixMult(M, M)
        power /= 2
    }

    return result
}

// FibonacciWithMatrixExponentiation solves the Fibonacci problem.
// Uses matrix exponentiation for O(log n) time complexity.
// Time: O(log n), Space: O(1)
func FibonacciWithMatrixExponentiation(data interface{}) interface{} {
    var n int64
    switch v := data.(type) {
    case map[string]interface{}:
        n = int64(v["n"].(float64))
    case int:
        n = int64(v)
    }

    if n == 0 {
        return int64(0)
    }
    if n <= 2 {
        return int64(1)
    }

    // Base matrix for Fibonacci
    base := [2][2]int64{{1, 1}, {1, 0}}
    resultMatrix := matrixPow(base, n)

    // F(n) is at position [0][1] or [1][0]
    return resultMatrix[0][1]
}

func main() {
    fmt.Println(FibonacciWithMatrixExponentiation(map[string]interface{}{"n": float64(10)})) // Output: 55
    fmt.Println(FibonacciWithMatrixExponentiation(map[string]interface{}{"n": float64(50)})) // Output: 12586269025
}`
        },
        twists: [
            { id: '01-nth-fibonacci/03-matrix-fibonacci/twist-01-extend-to-tribonacci-matrix', name: 'Extend to Tribonacci Matrix', difficulty: 'Hard' },
            { id: '01-nth-fibonacci/03-matrix-fibonacci/twist-02-iterative-vs-recursive-matrix-power', name: 'Iterative vs Recursive Matrix Power', difficulty: 'Medium' },
            { id: '01-nth-fibonacci/03-matrix-fibonacci/twist-03-modular-arithmetic-pitfalls', name: 'Modular Arithmetic Pitfalls', difficulty: 'Medium' },
            { id: '01-nth-fibonacci/03-matrix-fibonacci/twist-04-pisano-period-discovery', name: 'Pisano Period Discovery', difficulty: 'Very Hard' },
            { id: '01-nth-fibonacci/03-matrix-fibonacci/twist-05-eigenvalue-decomposition-approach', name: 'Eigenvalue Decomposition Approach', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/03-matrix-fibonacci', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/03-matrix-fibonacci'] = problem;

})();
