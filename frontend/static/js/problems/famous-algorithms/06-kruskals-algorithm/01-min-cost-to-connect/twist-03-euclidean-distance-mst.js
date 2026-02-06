/**
 * Euclidean Distance MST
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 06-kruskals-algorithm/01-min-cost-to-connect
 */
(function() {
    'use strict';
    const problem = {
        name: 'Euclidean Distance MST',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/01-min-cost-to-connect',
        description: 'Use Euclidean (straight-line) distance instead of Manhattan distance to compute the minimum spanning tree.',
        problem: 'Changes the distance metric, producing different edge weights and potentially a different MST structure. Euclidean MST has special properties exploitable by Delaunay triangulation.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For points [0,0] and [3,4], Manhattan distance is 7 but Euclidean distance is 5. The MST may differ between metrics.' },
                output: 'See example',
                explanation: 'For points [0,0] and [3,4], Manhattan distance is 7 but Euclidean distance is 5. The MST may differ between metrics.'
            }
        ],
        solutions: {
            python: `# Euclidean Distance MST
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 06-kruskals-algorithm/01-min-cost-to-connect

def solve():
    """
    Use Euclidean (straight-line) distance instead of Manhattan distance to compute the minimum spanning tree.

    Key insight: Changes the distance metric, producing different edge weights and potentially a different MST structure. Euclidean MST has special properties exploitable by Delaunay triangulation.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Euclidean Distance MST problem.
// Use Euclidean (straight-line) distance instead of Manhattan distance to compute the minimum spanning tree.
// Key insight: Changes the distance metric, producing different edge weights and potentially a different MST structure. Euclidean MST has special properties exploitable by Delaunay triangulation.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/01-min-cost-to-connect/twist-03-euclidean-distance-mst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/01-min-cost-to-connect/twist-03-euclidean-distance-mst'] = problem;
})();
