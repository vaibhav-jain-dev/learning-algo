/**
 * Inverse: Permutation to Rank
 * Category: recursion
 * Difficulty: Hard
 * Parent: 03-permutations/03-kth-permutation
 */
(function() {
    'use strict';
    const problem = {
        name: 'Inverse: Permutation to Rank',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/03-kth-permutation',
        description: 'Given a specific permutation of [1..n], compute its 1-indexed rank in lexicographic order without enumerating all permutations.',
        problem: 'Reverses the original problem. Instead of mapping rank to permutation, you map permutation to rank, requiring counting smaller permutations using factorials.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For permutation [3,1,2] of n=3, rank is 5 because order is 123,132,213,231,312,321.' },
                output: 'See example',
                explanation: 'For permutation [3,1,2] of n=3, rank is 5 because order is 123,132,213,231,312,321.'
            }
        ],
        solutions: {
            python: `# Inverse: Permutation to Rank
# Category: recursion
# Difficulty: Hard
# Parent: 03-permutations/03-kth-permutation

def solve():
    """
    Given a specific permutation of [1..n], compute its 1-indexed rank in lexicographic order without enumerating all permutations.

    Key insight: Reverses the original problem. Instead of mapping rank to permutation, you map permutation to rank, requiring counting smaller permutations using factorials.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Inverse: Permutation to Rank problem.
// Given a specific permutation of [1..n], compute its 1-indexed rank in lexicographic order without enumerating all permutations.
// Key insight: Reverses the original problem. Instead of mapping rank to permutation, you map permutation to rank, requiring counting smaller permutations using factorials.
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
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation/twist-02-inverse-permutation-to-rank', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation/twist-02-inverse-permutation-to-rank'] = problem;
})();
