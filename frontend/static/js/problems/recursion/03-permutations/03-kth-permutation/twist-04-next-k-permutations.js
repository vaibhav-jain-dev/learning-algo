/**
 * Next k Permutations
 * Category: recursion
 * Difficulty: Hard
 * Parent: 03-permutations/03-kth-permutation
 */
(function() {
    'use strict';
    const problem = {
        name: 'Next k Permutations',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/03-kth-permutation',
        description: 'Given a starting permutation and integer k, return the list of the next k permutations in lexicographic order.',
        problem: 'Combines the next-permutation iterative approach with the mathematical jump approach, choosing the most efficient strategy based on k relative to n!.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Starting from [2,1,3] with k=3, return [[2,3,1],[3,1,2],[3,2,1]].' },
                output: 'See example',
                explanation: 'Starting from [2,1,3] with k=3, return [[2,3,1],[3,1,2],[3,2,1]].'
            }
        ],
        solutions: {
            python: `# Next k Permutations
# Category: recursion
# Difficulty: Hard
# Parent: 03-permutations/03-kth-permutation

def solve():
    """
    Given a starting permutation and integer k, return the list of the next k permutations in lexicographic order.

    Key insight: Combines the next-permutation iterative approach with the mathematical jump approach, choosing the most efficient strategy based on k relative to n!.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Next k Permutations problem.
// Given a starting permutation and integer k, return the list of the next k permutations in lexicographic order.
// Key insight: Combines the next-permutation iterative approach with the mathematical jump approach, choosing the most efficient strategy based on k relative to n!.
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
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation/twist-04-next-k-permutations', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation/twist-04-next-k-permutations'] = problem;
})();
