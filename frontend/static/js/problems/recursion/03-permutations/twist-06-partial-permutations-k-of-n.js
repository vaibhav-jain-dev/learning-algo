/**
 * Partial Permutations (k of n)
 * Category: recursion
 * Difficulty: Medium
 * Parent: 03-permutations
 */
(function() {
    'use strict';
    const problem = {
        name: 'Partial Permutations (k of n)',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Generate all k-length permutations from an n-element array (k <= n). This is P(n,k) = n!/(n-k)! permutations. Modify the backtracking to stop at depth k.',
        problem: 'The base case changes from "all elements used" to "k elements chosen". This seemingly small change affects the recursion tree depth and count significantly, requiring adjustment of the termination condition.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,2,3,4], k=2: output is [1,2],[1,3],[1,4],[2,1],[2,3],[2,4],[3,1],[3,2],[3,4],[4,1],[4,2],[4,3]. That is P(4,2) = 12 permutations.' },
                output: 'See example',
                explanation: 'For [1,2,3,4], k=2: output is [1,2],[1,3],[1,4],[2,1],[2,3],[2,4],[3,1],[3,2],[3,4],[4,1],[4,2],[4,3]. That is P(4,2) = 12 permutations.'
            }
        ],
        solutions: {
            python: `# Partial Permutations (k of n)
# Category: recursion
# Difficulty: Medium
# Parent: 03-permutations

def solve():
    """
    Generate all k-length permutations from an n-element array (k <= n). This is P(n,k) = n!/(n-k)! permutations. Modify the backtracking to stop at depth k.

    Key insight: The base case changes from "all elements used" to "k elements chosen". This seemingly small change affects the recursion tree depth and count significantly, requiring adjustment of the termination condition.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Partial Permutations (k of n) problem.
// Generate all k-length permutations from an n-element array (k <= n). This is P(n,k) = n!/(n-k)! permutations. Modify the backtracking to stop at depth k.
// Key insight: The base case changes from "all elements used" to "k elements chosen". This seemingly small change affects the recursion tree depth and count significantly, requiring adjustment of the termination condition.
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
        window.ProblemRenderer.register('recursion', '03-permutations/twist-06-partial-permutations-k-of-n', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-06-partial-permutations-k-of-n'] = problem;
})();
