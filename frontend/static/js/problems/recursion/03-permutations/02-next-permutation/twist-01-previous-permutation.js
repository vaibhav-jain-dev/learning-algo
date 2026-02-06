/**
 * Previous Permutation
 * Category: recursion
 * Difficulty: Medium
 * Parent: 03-permutations/02-next-permutation
 */
(function() {
    'use strict';
    const problem = {
        name: 'Previous Permutation',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/02-next-permutation',
        description: 'Instead of finding the next lexicographically greater permutation, find the previous lexicographically smaller permutation.',
        problem: 'Reverses the scanning direction logic -- you must find the first increasing pair from the right and swap with the largest smaller element, then reverse.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,3,2], the previous permutation is [1,2,3]. For [3,2,1] (smallest), wrap to [3,2,1] -> already smallest, so no change or wrap to largest.' },
                output: 'See example',
                explanation: 'For [1,3,2], the previous permutation is [1,2,3]. For [3,2,1] (smallest), wrap to [3,2,1] -> already smallest, so no change or wrap to largest.'
            }
        ],
        solutions: {
            python: `# Previous Permutation
# Category: recursion
# Difficulty: Medium
# Parent: 03-permutations/02-next-permutation

def solve():
    """
    Instead of finding the next lexicographically greater permutation, find the previous lexicographically smaller permutation.

    Key insight: Reverses the scanning direction logic -- you must find the first increasing pair from the right and swap with the largest smaller element, then reverse.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Previous Permutation problem.
// Instead of finding the next lexicographically greater permutation, find the previous lexicographically smaller permutation.
// Key insight: Reverses the scanning direction logic -- you must find the first increasing pair from the right and swap with the largest smaller element, then reverse.
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
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation/twist-01-previous-permutation', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation/twist-01-previous-permutation'] = problem;
})();
