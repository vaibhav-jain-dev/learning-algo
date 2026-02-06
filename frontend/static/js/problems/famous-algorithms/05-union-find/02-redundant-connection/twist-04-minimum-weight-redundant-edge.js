/**
 * Minimum Weight Redundant Edge
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 05-union-find/02-redundant-connection
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Weight Redundant Edge',
        difficulty: 'Hard',
        algorithm: 'union-find',
        parent: '05-union-find/02-redundant-connection',
        description: 'Edges have weights. Among all edges that could be removed to restore a tree, find the one with minimum weight.',
        problem: 'Cannot simply return the first cycle-creating edge. Must identify all edges in the cycle, then return the minimum-weight one from that cycle.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For weighted edges [[1,2,5],[2,3,1],[3,1,3]], the cycle is 1-2-3-1. Removing edge [2,3,1] (weight 1) is cheapest.' },
                output: 'See example',
                explanation: 'For weighted edges [[1,2,5],[2,3,1],[3,1,3]], the cycle is 1-2-3-1. Removing edge [2,3,1] (weight 1) is cheapest.'
            }
        ],
        solutions: {
            python: `# Minimum Weight Redundant Edge
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 05-union-find/02-redundant-connection

def solve():
    """
    Edges have weights. Among all edges that could be removed to restore a tree, find the one with minimum weight.

    Key insight: Cannot simply return the first cycle-creating edge. Must identify all edges in the cycle, then return the minimum-weight one from that cycle.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Minimum Weight Redundant Edge problem.
// Edges have weights. Among all edges that could be removed to restore a tree, find the one with minimum weight.
// Key insight: Cannot simply return the first cycle-creating edge. Must identify all edges in the cycle, then return the minimum-weight one from that cycle.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/02-redundant-connection/twist-04-minimum-weight-redundant-edge', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/02-redundant-connection/twist-04-minimum-weight-redundant-edge'] = problem;
})();
