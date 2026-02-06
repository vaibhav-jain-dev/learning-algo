/**
 * Iterative vs Recursive Matrix Power
 * Category: recursion
 * Difficulty: Medium
 * Parent: 01-nth-fibonacci/03-matrix-fibonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative vs Recursive Matrix Power',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/03-matrix-fibonacci',
        description: 'Implement matrix exponentiation using both iterative binary exponentiation and recursive divide-and-conquer. Compare stack usage for n=10^18.',
        problem: 'The recursive version uses O(log n) stack frames while the iterative version uses O(1) extra space. For n=10^18, log2(n)~60 frames, which is fine, but understanding the trade-off matters.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Recursive: matPow(M, n) = matPow(M, n/2) * matPow(M, n/2). Iterative: bit-by-bit processing of n, squaring M at each step. Both O(log n) time.' },
                output: 'See example',
                explanation: 'Recursive: matPow(M, n) = matPow(M, n/2) * matPow(M, n/2). Iterative: bit-by-bit processing of n, squaring M at each step. Both O(log n) time.'
            }
        ],
        solutions: {
            python: `# Iterative vs Recursive Matrix Power
# Category: recursion
# Difficulty: Medium
# Parent: 01-nth-fibonacci/03-matrix-fibonacci

def solve():
    """
    Implement matrix exponentiation using both iterative binary exponentiation and recursive divide-and-conquer. Compare stack usage for n=10^18.

    Key insight: The recursive version uses O(log n) stack frames while the iterative version uses O(1) extra space. For n=10^18, log2(n)~60 frames, which is fine, but understanding the trade-off matters.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Iterative vs Recursive Matrix Power problem.
// Implement matrix exponentiation using both iterative binary exponentiation and recursive divide-and-conquer. Compare stack usage for n=10^18.
// Key insight: The recursive version uses O(log n) stack frames while the iterative version uses O(1) extra space. For n=10^18, log2(n)~60 frames, which is fine, but understanding the trade-off matters.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/03-matrix-fibonacci/twist-02-iterative-vs-recursive-matrix-power', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/03-matrix-fibonacci/twist-02-iterative-vs-recursive-matrix-power'] = problem;
})();
