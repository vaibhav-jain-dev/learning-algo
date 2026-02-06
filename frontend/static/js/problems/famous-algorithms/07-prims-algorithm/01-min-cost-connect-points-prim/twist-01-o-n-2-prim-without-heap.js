/**
 * O(n^2) Prim Without Heap
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 07-prims-algorithm/01-min-cost-connect-points-prim
 */
(function() {
    'use strict';
    const problem = {
        name: 'O(n^2) Prim Without Heap',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/01-min-cost-connect-points-prim',
        description: 'Since this is a dense graph (every point connects to every other), implement Prim\'s with a simple array scan instead of a heap for better constant factors.',
        problem: 'For complete graphs with n^2 edges, maintaining a heap of n^2 entries is wasteful. An O(n^2) approach with a minDist array avoids heap overhead entirely.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Maintain minDist[i] = min cost to connect point i to the MST. Each iteration, scan the array for the minimum, add that point, then update distances.' },
                output: 'See example',
                explanation: 'Maintain minDist[i] = min cost to connect point i to the MST. Each iteration, scan the array for the minimum, add that point, then update distances.'
            }
        ],
        solutions: {
            python: `# O(n^2) Prim Without Heap
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 07-prims-algorithm/01-min-cost-connect-points-prim

def solve():
    """
    Since this is a dense graph (every point connects to every other), implement Prim's with a simple array scan instead of a heap for better constant factors.

    Key insight: For complete graphs with n^2 edges, maintaining a heap of n^2 entries is wasteful. An O(n^2) approach with a minDist array avoids heap overhead entirely.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the O(n^2) Prim Without Heap problem.
// Since this is a dense graph (every point connects to every other), implement Prim's with a simple array scan instead of a heap for better constant factors.
// Key insight: For complete graphs with n^2 edges, maintaining a heap of n^2 entries is wasteful. An O(n^2) approach with a minDist array avoids heap overhead entirely.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim/twist-01-o-n-2-prim-without-heap', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim/twist-01-o-n-2-prim-without-heap'] = problem;
})();
