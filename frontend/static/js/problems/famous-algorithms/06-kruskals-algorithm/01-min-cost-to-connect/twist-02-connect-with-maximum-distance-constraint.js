/**
 * Connect with Maximum Distance Constraint
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm/01-min-cost-to-connect
 */
(function() {
    'use strict';
    const problem = {
        name: 'Connect with Maximum Distance Constraint',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/01-min-cost-to-connect',
        description: 'Connect all points but no single connection can exceed a maximum distance d. Return minimum cost or -1 if impossible.',
        problem: 'Adds edge filtering before running MST -- edges exceeding distance d are removed, and the problem may become infeasible if the graph becomes disconnected.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For points [[0,0],[10,10],[20,20]] with maxDist=15, point pairs beyond distance 15 cannot be connected directly.' },
                output: 'See example',
                explanation: 'For points [[0,0],[10,10],[20,20]] with maxDist=15, point pairs beyond distance 15 cannot be connected directly.'
            }
        ],
        solutions: {
            python: `# Connect with Maximum Distance Constraint
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm/01-min-cost-to-connect

def solve():
    """
    Connect all points but no single connection can exceed a maximum distance d. Return minimum cost or -1 if impossible.

    Key insight: Adds edge filtering before running MST -- edges exceeding distance d are removed, and the problem may become infeasible if the graph becomes disconnected.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Connect with Maximum Distance Constraint problem.
// Connect all points but no single connection can exceed a maximum distance d. Return minimum cost or -1 if impossible.
// Key insight: Adds edge filtering before running MST -- edges exceeding distance d are removed, and the problem may become infeasible if the graph becomes disconnected.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/01-min-cost-to-connect/twist-02-connect-with-maximum-distance-constraint', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/01-min-cost-to-connect/twist-02-connect-with-maximum-distance-constraint'] = problem;
})();
