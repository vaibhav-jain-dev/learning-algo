/**
 * Catalan by Matrix Exponentiation
 * Category: recursion
 * Difficulty: Hard
 * Parent: 11-number-of-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Catalan by Matrix Exponentiation',
        difficulty: 'Hard',
        algorithm: 'recursion-count-bst',
        parent: '11-number-of-bst',
        description: 'Compute the nth Catalan number in O(log n) time using matrix exponentiation instead of the O(n^2) DP approach.',
        problem: 'Requires expressing the Catalan recurrence in matrix form and applying fast exponentiation, a completely different algorithmic technique from iterative DP.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=100, compute C(100) in O(log 100) matrix multiplications rather than filling a table of size 100.' },
                output: 'See example',
                explanation: 'For n=100, compute C(100) in O(log 100) matrix multiplications rather than filling a table of size 100.'
            }
        ],
        solutions: {
            python: `# Catalan by Matrix Exponentiation
# Category: recursion
# Difficulty: Hard
# Parent: 11-number-of-bst

def solve():
    """
    Compute the nth Catalan number in O(log n) time using matrix exponentiation instead of the O(n^2) DP approach.

    Key insight: Requires expressing the Catalan recurrence in matrix form and applying fast exponentiation, a completely different algorithmic technique from iterative DP.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Catalan by Matrix Exponentiation problem.
// Compute the nth Catalan number in O(log n) time using matrix exponentiation instead of the O(n^2) DP approach.
// Key insight: Requires expressing the Catalan recurrence in matrix form and applying fast exponentiation, a completely different algorithmic technique from iterative DP.
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
        window.ProblemRenderer.register('recursion', '11-number-of-bst/twist-05-catalan-by-matrix-exponentiation', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst/twist-05-catalan-by-matrix-exponentiation'] = problem;
})();
