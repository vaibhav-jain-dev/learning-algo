/**
 * Lexicographic Order
 * Category: recursion
 * Difficulty: Hard
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Lexicographic Order',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Generate all unique permutations in strict lexicographic (sorted) order, but without sorting the final result.',
        problem: 'Requires building permutations in order during generation rather than sorting afterward, demanding careful control of the recursion tree traversal.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [2,1,1], output must be [[1,1,2],[1,2,1],[2,1,1]] generated in this exact order without a post-sort step.' },
                output: 'See example',
                explanation: 'For [2,1,1], output must be [[1,1,2],[1,2,1],[2,1,1]] generated in this exact order without a post-sort step.'
            }
        ],
        solutions: {
            python: `# Lexicographic Order
# Category: recursion
# Difficulty: Hard
# Parent: 03-permutations/01-permutations-with-duplicates

def solve():
    """
    Generate all unique permutations in strict lexicographic (sorted) order, but without sorting the final result.

    Key insight: Requires building permutations in order during generation rather than sorting afterward, demanding careful control of the recursion tree traversal.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Lexicographic Order problem.
// Generate all unique permutations in strict lexicographic (sorted) order, but without sorting the final result.
// Key insight: Requires building permutations in order during generation rather than sorting afterward, demanding careful control of the recursion tree traversal.
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
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-02-lexicographic-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-02-lexicographic-order'] = problem;
})();
