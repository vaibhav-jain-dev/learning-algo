/**
 * Bottleneck Spanning Tree
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bottleneck Spanning Tree',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'Find the spanning tree that minimizes the maximum edge weight (bottleneck) rather than the total weight.',
        problem: 'The MST actually IS the bottleneck spanning tree (a non-obvious theorem), but proving this requires different reasoning than the standard greedy argument.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For a graph where MST has max edge weight 5, no other spanning tree can have all edges with weight < 5.' },
                output: 'See example',
                explanation: 'For a graph where MST has max edge weight 5, no other spanning tree can have all edges with weight < 5.'
            }
        ],
        solutions: {
            python: `# Bottleneck Spanning Tree
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm

def solve():
    """
    Find the spanning tree that minimizes the maximum edge weight (bottleneck) rather than the total weight.

    Key insight: The MST actually IS the bottleneck spanning tree (a non-obvious theorem), but proving this requires different reasoning than the standard greedy argument.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Bottleneck Spanning Tree problem.
// Find the spanning tree that minimizes the maximum edge weight (bottleneck) rather than the total weight.
// Key insight: The MST actually IS the bottleneck spanning tree (a non-obvious theorem), but proving this requires different reasoning than the standard greedy argument.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/twist-05-bottleneck-spanning-tree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/twist-05-bottleneck-spanning-tree'] = problem;
})();
