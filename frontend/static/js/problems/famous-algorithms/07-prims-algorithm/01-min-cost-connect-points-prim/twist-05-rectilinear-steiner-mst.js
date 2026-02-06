/**
 * Rectilinear Steiner MST
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Parent: 07-prims-algorithm/01-min-cost-connect-points-prim
 */
(function() {
    'use strict';
    const problem = {
        name: 'Rectilinear Steiner MST',
        difficulty: 'Very Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/01-min-cost-connect-points-prim',
        description: 'Find the minimum connection cost allowing intermediate relay points on the grid (not just the given points).',
        problem: 'Adding intermediate points can reduce total connection cost by creating junctions, making this NP-hard and fundamentally different from standard MST.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Three points forming an L-shape might benefit from a relay point at the corner, reducing total wiring vs connecting directly.' },
                output: 'See example',
                explanation: 'Three points forming an L-shape might benefit from a relay point at the corner, reducing total wiring vs connecting directly.'
            }
        ],
        solutions: {
            python: `# Rectilinear Steiner MST
# Category: famous-algorithms
# Difficulty: Very Hard
# Parent: 07-prims-algorithm/01-min-cost-connect-points-prim

def solve():
    """
    Find the minimum connection cost allowing intermediate relay points on the grid (not just the given points).

    Key insight: Adding intermediate points can reduce total connection cost by creating junctions, making this NP-hard and fundamentally different from standard MST.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Rectilinear Steiner MST problem.
// Find the minimum connection cost allowing intermediate relay points on the grid (not just the given points).
// Key insight: Adding intermediate points can reduce total connection cost by creating junctions, making this NP-hard and fundamentally different from standard MST.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim/twist-05-rectilinear-steiner-mst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim/twist-05-rectilinear-steiner-mst'] = problem;
})();
