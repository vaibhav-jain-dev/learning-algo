/**
 * Kth Permutation of Subset
 * Category: recursion
 * Difficulty: Hard
 * Parent: 03-permutations/03-kth-permutation
 */
(function() {
    'use strict';
    const problem = {
        name: 'Kth Permutation of Subset',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/03-kth-permutation',
        description: 'Find the kth permutation of length r chosen from n elements (r < n), listed in lexicographic order.',
        problem: 'The factorial decomposition changes from n! to P(n,r) = n!/(n-r)!, requiring adjusted group sizes at each digit selection step.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=4, r=2, k=5: permutations of length 2 from [1,2,3,4] in order are 12,13,14,21,23,24,... so k=5 gives "23".' },
                output: 'See example',
                explanation: 'For n=4, r=2, k=5: permutations of length 2 from [1,2,3,4] in order are 12,13,14,21,23,24,... so k=5 gives "23".'
            }
        ],
        solutions: {
            python: `# Kth Permutation of Subset
# Category: recursion
# Difficulty: Hard
# Parent: 03-permutations/03-kth-permutation

def solve():
    """
    Find the kth permutation of length r chosen from n elements (r < n), listed in lexicographic order.

    Key insight: The factorial decomposition changes from n! to P(n,r) = n!/(n-r)!, requiring adjusted group sizes at each digit selection step.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Kth Permutation of Subset problem.
// Find the kth permutation of length r chosen from n elements (r < n), listed in lexicographic order.
// Key insight: The factorial decomposition changes from n! to P(n,r) = n!/(n-r)!, requiring adjusted group sizes at each digit selection step.
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
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation/twist-05-kth-permutation-of-subset', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation/twist-05-kth-permutation-of-subset'] = problem;
})();
