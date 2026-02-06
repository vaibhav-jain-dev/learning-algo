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
            {
                title: 'Extend to Tribonacci Matrix',
                difficulty: 'Hard',
                description: 'Apply matrix exponentiation to compute the n-th Tribonacci number in O(log n) time. Construct the appropriate 3x3 transition matrix.',
                whyDifferent: 'Going from 2x2 to 3x3 matrices is not just a size change. You must understand how to generalize the transition matrix, and the 3x3 multiplication has 27 multiply-add operations instead of 8.',
                example: 'Matrix [[1,1,1],[1,0,0],[0,1,0]]^n. For n=10: T(10)=149. The 3x3 power uses the same binary exponentiation but each multiplication step is more complex.'
            },
            {
                title: 'Iterative vs Recursive Matrix Power',
                difficulty: 'Medium',
                description: 'Implement matrix exponentiation using both iterative binary exponentiation and recursive divide-and-conquer. Compare stack usage for n=10^18.',
                whyDifferent: 'The recursive version uses O(log n) stack frames while the iterative version uses O(1) extra space. For n=10^18, log2(n)~60 frames, which is fine, but understanding the trade-off matters.',
                example: 'Recursive: matPow(M, n) = matPow(M, n/2) * matPow(M, n/2). Iterative: bit-by-bit processing of n, squaring M at each step. Both O(log n) time.'
            },
            {
                title: 'Modular Arithmetic Pitfalls',
                difficulty: 'Medium',
                description: 'When computing Fibonacci mod 10^9+7 for very large n, identify and fix subtle overflow bugs. What happens if you multiply two numbers each close to 10^9+7 in a 64-bit integer?',
                whyDifferent: 'This is a conceptual trap about numerical overflow. (10^9+7)^2 exceeds 2^63, causing overflow in languages with fixed-width integers. You must apply mod after each multiplication, not just at the end.',
                example: '(10^9+6) * (10^9+6) = ~10^18, which fits in int64. But if intermediate sums of products exceed 2^63 ~= 9.2*10^18, overflow occurs. Solution: mod after each multiply-add.'
            },
            {
                title: 'Pisano Period Discovery',
                difficulty: 'Very Hard',
                description: 'Instead of matrix exponentiation, discover that Fibonacci mod m is periodic (Pisano period). Find the period for a given m and use it to reduce fib(n) mod m to fib(n mod period) mod m.',
                whyDifferent: 'A completely different mathematical approach to the same problem. Instead of fast exponentiation, you exploit periodicity. Requires understanding number theory rather than linear algebra.',
                example: 'Pisano period for m=10 is 60. So fib(1000000) mod 10 = fib(1000000 mod 60) mod 10 = fib(40) mod 10 = 0.'
            },
            {
                title: 'Eigenvalue Decomposition Approach',
                difficulty: 'Very Hard',
                description: 'Derive the closed-form Binet formula F(n) = (phi^n - psi^n) / sqrt(5) from the matrix eigenvalues. Explain why this formula has floating-point precision issues for large n.',
                whyDifferent: 'Connects linear algebra (eigenvalues/eigenvectors of the Fibonacci matrix) to the closed-form solution. Reveals why the matrix approach is numerically superior to the analytical formula for computation.',
                example: 'phi=(1+sqrt(5))/2, psi=(1-sqrt(5))/2. F(10) = (phi^10 - psi^10)/sqrt(5) = 55. But for n>70, floating-point errors make this inaccurate without arbitrary precision.'
            }
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
