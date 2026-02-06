/**
 * MST with Edge Constraints
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'MST with Edge Constraints',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'Find the MST where certain edges must be included and certain edges must be excluded.',
        problem: 'Pre-forces some edges into the solution and removes others, then runs Kruskal on the remaining edges while respecting the forced inclusions.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Must include edge (0,1,10) and must exclude edge (2,3,1). Find MST under these constraints.' },
                output: 'See example',
                explanation: 'Must include edge (0,1,10) and must exclude edge (2,3,1). Find MST under these constraints.'
            }
        ],
        solutions: {
            python: `# MST with Edge Constraints
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm

def solve():
    """
    Find the MST where certain edges must be included and certain edges must be excluded.

    Key insight: Pre-forces some edges into the solution and removes others, then runs Kruskal on the remaining edges while respecting the forced inclusions.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the MST with Edge Constraints problem.
// Find the MST where certain edges must be included and certain edges must be excluded.
// Key insight: Pre-forces some edges into the solution and removes others, then runs Kruskal on the remaining edges while respecting the forced inclusions.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/twist-04-mst-with-edge-constraints', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/twist-04-mst-with-edge-constraints'] = problem;
})();
