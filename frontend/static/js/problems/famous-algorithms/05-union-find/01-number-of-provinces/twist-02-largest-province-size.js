/**
 * Largest Province Size
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 05-union-find/01-number-of-provinces
 */
(function() {
    'use strict';
    const problem = {
        name: 'Largest Province Size',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find/01-number-of-provinces',
        description: 'Instead of counting provinces, find the size of the largest province (most cities in a single connected group).',
        problem: 'Requires tracking component sizes during union operations, maintaining a size array that updates when sets merge.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For 5 cities in 2 provinces of sizes 3 and 2, return 3 as the largest province size.' },
                output: 'See example',
                explanation: 'For 5 cities in 2 provinces of sizes 3 and 2, return 3 as the largest province size.'
            }
        ],
        solutions: {
            python: `# Largest Province Size
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 05-union-find/01-number-of-provinces

def solve():
    """
    Instead of counting provinces, find the size of the largest province (most cities in a single connected group).

    Key insight: Requires tracking component sizes during union operations, maintaining a size array that updates when sets merge.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Largest Province Size problem.
// Instead of counting provinces, find the size of the largest province (most cities in a single connected group).
// Key insight: Requires tracking component sizes during union operations, maintaining a size array that updates when sets merge.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/01-number-of-provinces/twist-02-largest-province-size', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/01-number-of-provinces/twist-02-largest-province-size'] = problem;
})();
