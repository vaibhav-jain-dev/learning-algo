/**
 * Pisano Period Discovery
 * Category: recursion
 * Difficulty: Very Hard
 * Parent: 01-nth-fibonacci/03-matrix-fibonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Pisano Period Discovery',
        difficulty: 'Very Hard',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/03-matrix-fibonacci',
        description: 'Instead of matrix exponentiation, discover that Fibonacci mod m is periodic (Pisano period). Find the period for a given m and use it to reduce fib(n) mod m to fib(n mod period) mod m.',
        problem: 'A completely different mathematical approach to the same problem. Instead of fast exponentiation, you exploit periodicity. Requires understanding number theory rather than linear algebra.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Pisano period for m=10 is 60. So fib(1000000) mod 10 = fib(1000000 mod 60) mod 10 = fib(40) mod 10 = 0.' },
                output: 'See example',
                explanation: 'Pisano period for m=10 is 60. So fib(1000000) mod 10 = fib(1000000 mod 60) mod 10 = fib(40) mod 10 = 0.'
            }
        ],
        solutions: {
            python: `# Pisano Period Discovery
# Category: recursion
# Difficulty: Very Hard
# Parent: 01-nth-fibonacci/03-matrix-fibonacci

def solve():
    """
    Instead of matrix exponentiation, discover that Fibonacci mod m is periodic (Pisano period). Find the period for a given m and use it to reduce fib(n) mod m to fib(n mod period) mod m.

    Key insight: A completely different mathematical approach to the same problem. Instead of fast exponentiation, you exploit periodicity. Requires understanding number theory rather than linear algebra.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Pisano Period Discovery problem.
// Instead of matrix exponentiation, discover that Fibonacci mod m is periodic (Pisano period). Find the period for a given m and use it to reduce fib(n) mod m to fib(n mod period) mod m.
// Key insight: A completely different mathematical approach to the same problem. Instead of fast exponentiation, you exploit periodicity. Requires understanding number theory rather than linear algebra.
func Solve() interface{} {
    // TODO: Implement solution
    return nil
}

func main() {
    fmt.Println(Solve())
}
`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/03-matrix-fibonacci/twist-04-pisano-period-discovery', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/03-matrix-fibonacci/twist-04-pisano-period-discovery'] = problem;
})();
