/**
 * Kth Permutation in Reverse Order
 * Category: recursion
 * Difficulty: Medium
 * Parent: 03-permutations/03-kth-permutation
 */
(function() {
    'use strict';
    const problem = {
        name: 'Kth Permutation in Reverse Order',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/03-kth-permutation',
        description: 'Find the kth permutation when permutations are listed in reverse lexicographic order (largest first).',
        problem: 'Requires flipping the selection logic -- instead of picking the smallest available digit, you pick from the largest, or equivalently compute the (total-k+1)th forward permutation.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=3, reverse order is 321,312,231,213,132,123. The k=2 result is "312".' },
                output: 'See example',
                explanation: 'For n=3, reverse order is 321,312,231,213,132,123. The k=2 result is "312".'
            }
        ],
        solutions: {
            python: `# Kth Permutation in Reverse Order
# Category: recursion
# Difficulty: Medium
# Parent: 03-permutations/03-kth-permutation

def solve():
    """
    Find the kth permutation when permutations are listed in reverse lexicographic order (largest first).

    Key insight: Requires flipping the selection logic -- instead of picking the smallest available digit, you pick from the largest, or equivalently compute the (total-k+1)th forward permutation.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Kth Permutation in Reverse Order problem.
// Find the kth permutation when permutations are listed in reverse lexicographic order (largest first).
// Key insight: Requires flipping the selection logic -- instead of picking the smallest available digit, you pick from the largest, or equivalently compute the (total-k+1)th forward permutation.
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
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation/twist-03-kth-permutation-in-reverse-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation/twist-03-kth-permutation-in-reverse-order'] = problem;
})();
