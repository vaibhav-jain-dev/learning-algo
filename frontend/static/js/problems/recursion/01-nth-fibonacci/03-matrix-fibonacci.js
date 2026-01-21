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

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// FibonacciWithMatrixExponentiation solves the Fibonacci with Matrix Exponentiation problem.
// Time: O(n), Space: O(n)
func FibonacciWithMatrixExponentiation(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
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
