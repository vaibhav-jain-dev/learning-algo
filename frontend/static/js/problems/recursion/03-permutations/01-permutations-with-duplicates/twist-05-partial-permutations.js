/**
 * Partial Permutations
 * Category: recursion
 * Difficulty: Medium
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Partial Permutations',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Given an array with duplicates and an integer k, generate all unique permutations of length k (not necessarily using all elements).',
        problem: 'Changes the base case from full-length to partial-length, requiring different termination logic while still handling duplicates correctly.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1,1,2] with k=2, return [[1,1],[1,2],[2,1]] -- all unique 2-length arrangements.' },
                output: 'See example',
                explanation: 'For [1,1,2] with k=2, return [[1,1],[1,2],[2,1]] -- all unique 2-length arrangements.'
            }
        ],
        solutions: {
            python: `# Partial Permutations
# Category: recursion
# Difficulty: Medium
# Parent: 03-permutations/01-permutations-with-duplicates

def solve():
    """
    Given an array with duplicates and an integer k, generate all unique permutations of length k (not necessarily using all elements).

    Key insight: Changes the base case from full-length to partial-length, requiring different termination logic while still handling duplicates correctly.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Partial Permutations problem.
// Given an array with duplicates and an integer k, generate all unique permutations of length k (not necessarily using all elements).
// Key insight: Changes the base case from full-length to partial-length, requiring different termination logic while still handling duplicates correctly.
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
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-05-partial-permutations', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-05-partial-permutations'] = problem;
})();
