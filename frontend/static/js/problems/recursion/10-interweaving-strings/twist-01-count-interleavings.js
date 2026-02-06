/**
 * Count Interleavings
 * Category: recursion
 * Difficulty: Hard
 * Parent: 10-interweaving-strings
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Interleavings',
        difficulty: 'Hard',
        algorithm: 'recursion-interweaving',
        parent: '10-interweaving-strings',
        description: 'Instead of returning true/false, count the total number of distinct ways to interleave the two strings to form the third string.',
        problem: 'Changes from boolean DP to counting DP, where each cell accumulates the number of paths rather than just feasibility.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For one="ab", two="cd", three="acbd", there is exactly 1 way. For one="ab", two="ab", three="aabb", there are 2+ways.' },
                output: 'See example',
                explanation: 'For one="ab", two="cd", three="acbd", there is exactly 1 way. For one="ab", two="ab", three="aabb", there are 2+ways.'
            }
        ],
        solutions: {
            python: `# Count Interleavings
# Category: recursion
# Difficulty: Hard
# Parent: 10-interweaving-strings

def solve():
    """
    Instead of returning true/false, count the total number of distinct ways to interleave the two strings to form the third string.

    Key insight: Changes from boolean DP to counting DP, where each cell accumulates the number of paths rather than just feasibility.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Interleavings problem.
// Instead of returning true/false, count the total number of distinct ways to interleave the two strings to form the third string.
// Key insight: Changes from boolean DP to counting DP, where each cell accumulates the number of paths rather than just feasibility.
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
        window.ProblemRenderer.register('recursion', '10-interweaving-strings/twist-01-count-interleavings', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/10-interweaving-strings/twist-01-count-interleavings'] = problem;
})();
