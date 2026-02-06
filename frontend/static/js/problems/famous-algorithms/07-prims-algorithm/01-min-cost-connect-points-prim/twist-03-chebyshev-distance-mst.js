/**
 * Chebyshev Distance MST
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 07-prims-algorithm/01-min-cost-connect-points-prim
 */
(function() {
    'use strict';
    const problem = {
        name: 'Chebyshev Distance MST',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/01-min-cost-connect-points-prim',
        description: 'Use Chebyshev distance (max of absolute differences in each coordinate) instead of Manhattan distance.',
        problem: 'Changes the distance metric which affects edge weights and potentially the MST structure. Chebyshev distance allows diagonal movement at the same cost as horizontal/vertical.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For points [0,0] and [3,4], Manhattan=7 but Chebyshev=4 (max of 3,4). This can change which edges are in the MST.' },
                output: 'See example',
                explanation: 'For points [0,0] and [3,4], Manhattan=7 but Chebyshev=4 (max of 3,4). This can change which edges are in the MST.'
            }
        ],
        solutions: {
            python: `# Chebyshev Distance MST
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 07-prims-algorithm/01-min-cost-connect-points-prim

def solve():
    """
    Use Chebyshev distance (max of absolute differences in each coordinate) instead of Manhattan distance.

    Key insight: Changes the distance metric which affects edge weights and potentially the MST structure. Chebyshev distance allows diagonal movement at the same cost as horizontal/vertical.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Chebyshev Distance MST problem.
// Use Chebyshev distance (max of absolute differences in each coordinate) instead of Manhattan distance.
// Key insight: Changes the distance metric which affects edge weights and potentially the MST structure. Chebyshev distance allows diagonal movement at the same cost as horizontal/vertical.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim/twist-03-chebyshev-distance-mst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim/twist-03-chebyshev-distance-mst'] = problem;
})();
