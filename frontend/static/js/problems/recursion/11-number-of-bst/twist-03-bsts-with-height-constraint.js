/**
 * BSTs with Height Constraint
 * Category: recursion
 * Difficulty: Very Hard
 * Parent: 11-number-of-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'BSTs with Height Constraint',
        difficulty: 'Very Hard',
        algorithm: 'recursion-count-bst',
        parent: '11-number-of-bst',
        description: 'Count the number of structurally unique BSTs with n nodes whose height does not exceed a given value h.',
        problem: 'Adds a height constraint that breaks the simple Catalan recurrence, requiring a 2D DP indexed by both node count and maximum allowed height.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=4, h=3: count BSTs with 4 nodes that are at most height 3 (exclude the degenerate linked-list shape which has height 4).' },
                output: 'See example',
                explanation: 'For n=4, h=3: count BSTs with 4 nodes that are at most height 3 (exclude the degenerate linked-list shape which has height 4).'
            }
        ],
        solutions: {
            python: `# BSTs with Height Constraint
# Category: recursion
# Difficulty: Very Hard
# Parent: 11-number-of-bst

def solve():
    """
    Count the number of structurally unique BSTs with n nodes whose height does not exceed a given value h.

    Key insight: Adds a height constraint that breaks the simple Catalan recurrence, requiring a 2D DP indexed by both node count and maximum allowed height.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the BSTs with Height Constraint problem.
// Count the number of structurally unique BSTs with n nodes whose height does not exceed a given value h.
// Key insight: Adds a height constraint that breaks the simple Catalan recurrence, requiring a 2D DP indexed by both node count and maximum allowed height.
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
        window.ProblemRenderer.register('recursion', '11-number-of-bst/twist-03-bsts-with-height-constraint', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst/twist-03-bsts-with-height-constraint'] = problem;
})();
