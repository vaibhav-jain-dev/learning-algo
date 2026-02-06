/**
 * Conceptual Trap: Multiple Edges Between Nodes
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 02-dijkstras-algorithm/01-network-delay-time
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: Multiple Edges Between Nodes',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/01-network-delay-time',
        description: 'What if there are multiple flights between the same pair of nodes with different times? Does Dijkstra\'s handle this correctly without modification? What about self-loops?',
        problem: 'Some implementations assume unique edges between node pairs. Multiple edges are handled naturally by the adjacency list, but self-loops (times=[[1,1,5]]) add unnecessary heap entries. Forces careful analysis of edge cases.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'times=[[1,2,10],[1,2,5],[2,3,1]], n=3, k=1. Both edges 1->2 are in adjacency list. Dijkstra correctly finds dist[2]=5 via the cheaper edge. Self-loop [1,1,5] is harmless but wasteful.' },
                output: 'See example',
                explanation: 'times=[[1,2,10],[1,2,5],[2,3,1]], n=3, k=1. Both edges 1->2 are in adjacency list. Dijkstra correctly finds dist[2]=5 via the cheaper edge. Self-loop [1,1,5] is harmless but wasteful.'
            }
        ],
        solutions: {
            python: `# Conceptual Trap: Multiple Edges Between Nodes
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 02-dijkstras-algorithm/01-network-delay-time

def solve():
    """
    What if there are multiple flights between the same pair of nodes with different times? Does Dijkstra's handle this correctly without modification? What about self-loops?

    Key insight: Some implementations assume unique edges between node pairs. Multiple edges are handled naturally by the adjacency list, but self-loops (times=[[1,1,5]]) add unnecessary heap entries. Forces careful analysis of edge cases.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Conceptual Trap: Multiple Edges Between Nodes problem.
// What if there are multiple flights between the same pair of nodes with different times? Does Dijkstra's handle this correctly without modification? What about self-loops?
// Key insight: Some implementations assume unique edges between node pairs. Multiple edges are handled naturally by the adjacency list, but self-loops (times=[[1,1,5]]) add unnecessary heap entries. Forces careful analysis of edge cases.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/01-network-delay-time/twist-05-conceptual-trap-multiple-edges-between-nodes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/01-network-delay-time/twist-05-conceptual-trap-multiple-edges-between-nodes'] = problem;
})();
