/**
 * Rank of Permutation
 * Category: recursion
 * Difficulty: Very Hard
 * Parent: 03-permutations/02-next-permutation
 */
(function() {
    'use strict';
    const problem = {
        name: 'Rank of Permutation',
        difficulty: 'Very Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/02-next-permutation',
        description: 'Given a permutation, determine its rank (1-indexed position) among all permutations of its elements in lexicographic order.',
        problem: 'Inverts the problem from generating to counting. Requires computing how many permutations come before the given one using factorial arithmetic.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [2,1,3], rank is 3 because the order is: [1,2,3]=1, [1,3,2]=2, [2,1,3]=3.' },
                output: 'See example',
                explanation: 'For [2,1,3], rank is 3 because the order is: [1,2,3]=1, [1,3,2]=2, [2,1,3]=3.'
            }
        ],
        solutions: {
            python: `# Rank of Permutation
# Category: recursion
# Difficulty: Very Hard
# Parent: 03-permutations/02-next-permutation

def solve():
    """
    Given a permutation, determine its rank (1-indexed position) among all permutations of its elements in lexicographic order.

    Key insight: Inverts the problem from generating to counting. Requires computing how many permutations come before the given one using factorial arithmetic.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Rank of Permutation problem.
// Given a permutation, determine its rank (1-indexed position) among all permutations of its elements in lexicographic order.
// Key insight: Inverts the problem from generating to counting. Requires computing how many permutations come before the given one using factorial arithmetic.
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
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation/twist-05-rank-of-permutation', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation/twist-05-rank-of-permutation'] = problem;
})();
