/**
 * MST Edge Classification
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'MST Edge Classification',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'For each edge in the graph, determine if it is always in every MST, never in any MST, or sometimes in an MST.',
        problem: 'Requires understanding the cut and cycle properties deeply -- an edge is mandatory if it is the unique lightest in some cut, impossible if it is the unique heaviest in some cycle.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Edge (0,1,weight=1) might be the only lightest cross-cut edge (always in MST). Edge (2,3,weight=100) might be heaviest in a cycle (never in MST).' },
                output: 'See example',
                explanation: 'Edge (0,1,weight=1) might be the only lightest cross-cut edge (always in MST). Edge (2,3,weight=100) might be heaviest in a cycle (never in MST).'
            }
        ],
        solutions: {
            python: `# MST Edge Classification
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm

def solve():
    """
    For each edge in the graph, determine if it is always in every MST, never in any MST, or sometimes in an MST.

    Key insight: Requires understanding the cut and cycle properties deeply -- an edge is mandatory if it is the unique lightest in some cut, impossible if it is the unique heaviest in some cycle.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the MST Edge Classification problem.
// For each edge in the graph, determine if it is always in every MST, never in any MST, or sometimes in an MST.
// Key insight: Requires understanding the cut and cycle properties deeply -- an edge is mandatory if it is the unique lightest in some cut, impossible if it is the unique heaviest in some cycle.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/twist-03-mst-edge-classification', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/twist-03-mst-edge-classification'] = problem;
})();
