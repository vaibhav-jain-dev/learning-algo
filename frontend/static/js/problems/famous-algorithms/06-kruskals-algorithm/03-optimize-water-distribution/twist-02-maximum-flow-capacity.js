/**
 * Maximum Flow Capacity
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm/03-optimize-water-distribution
 */
(function() {
    'use strict';
    const problem = {
        name: 'Maximum Flow Capacity',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/03-optimize-water-distribution',
        description: 'Each pipe has both a cost and a capacity. Find the minimum cost to supply water to all houses where each house needs at least 1 unit of water.',
        problem: 'Adds a capacity dimension -- simple MST may not provide sufficient flow, requiring min-cost max-flow analysis instead of pure MST.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'If a pipe has capacity 2 but connects to 3 houses downstream, additional pipes are needed even if the MST includes this pipe.' },
                output: 'See example',
                explanation: 'If a pipe has capacity 2 but connects to 3 houses downstream, additional pipes are needed even if the MST includes this pipe.'
            }
        ],
        solutions: {
            python: `# Maximum Flow Capacity
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm/03-optimize-water-distribution

def solve():
    """
    Each pipe has both a cost and a capacity. Find the minimum cost to supply water to all houses where each house needs at least 1 unit of water.

    Key insight: Adds a capacity dimension -- simple MST may not provide sufficient flow, requiring min-cost max-flow analysis instead of pure MST.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Maximum Flow Capacity problem.
// Each pipe has both a cost and a capacity. Find the minimum cost to supply water to all houses where each house needs at least 1 unit of water.
// Key insight: Adds a capacity dimension -- simple MST may not provide sufficient flow, requiring min-cost max-flow analysis instead of pure MST.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/03-optimize-water-distribution/twist-02-maximum-flow-capacity', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/03-optimize-water-distribution/twist-02-maximum-flow-capacity'] = problem;
})();
