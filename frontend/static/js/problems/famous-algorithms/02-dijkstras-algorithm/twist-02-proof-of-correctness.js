/**
 * Proof of Correctness
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 02-dijkstras-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Proof of Correctness',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'Prove by induction that when Dijkstra\'s extracts a node from the priority queue, the distance recorded for that node is the true shortest path distance. Identify exactly where the non-negative weight assumption is used.',
        problem: 'Requires formal reasoning about the greedy invariant. The key insight: if all edges are non-negative, any path through unvisited nodes can only be longer than the current best, so the minimum in the queue is optimal.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Inductive step: assume all extracted nodes have correct distances. The next extracted node u has dist d. Any alternative path to u goes through some unvisited node v with dist[v] >= d (since d was minimum in queue) plus non-negative edges, so >= d.' },
                output: 'See example',
                explanation: 'Inductive step: assume all extracted nodes have correct distances. The next extracted node u has dist d. Any alternative path to u goes through some unvisited node v with dist[v] >= d (since d was minimum in queue) plus non-negative edges, so >= d.'
            }
        ],
        solutions: {
            python: `# Proof of Correctness
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 02-dijkstras-algorithm

def solve():
    """
    Prove by induction that when Dijkstra's extracts a node from the priority queue, the distance recorded for that node is the true shortest path distance. Identify exactly where the non-negative weight assumption is used.

    Key insight: Requires formal reasoning about the greedy invariant. The key insight: if all edges are non-negative, any path through unvisited nodes can only be longer than the current best, so the minimum in the queue is optimal.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Proof of Correctness problem.
// Prove by induction that when Dijkstra's extracts a node from the priority queue, the distance recorded for that node is the true shortest path distance. Identify exactly where the non-negative weight assumption is used.
// Key insight: Requires formal reasoning about the greedy invariant. The key insight: if all edges are non-negative, any path through unvisited nodes can only be longer than the current best, so the minimum in the queue is optimal.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/twist-02-proof-of-correctness', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/twist-02-proof-of-correctness'] = problem;
})();
