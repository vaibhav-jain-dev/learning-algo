/**
 * Negative Weight Edge Added
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 02-dijkstras-algorithm/01-network-delay-time
 */
(function() {
    'use strict';
    const problem = {
        name: 'Negative Weight Edge Added',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/01-network-delay-time',
        description: 'What if some network links have negative delay (time travel shortcuts)? Dijkstra\'s will fail. Modify the solution to handle negative edge weights correctly. What algorithm would you use instead?',
        problem: 'Dijkstra\'s greedy assumption breaks with negative edges. You need Bellman-Ford which relaxes all edges V-1 times, or detect negative cycles that would make the delay unbounded.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'times=[[1,2,5],[2,3,-3],[1,3,4]], n=3, k=1. Dijkstra might finalize node 3 with dist=4 (direct), missing path 1->2->3 with dist=5+(-3)=2.' },
                output: 'See example',
                explanation: 'times=[[1,2,5],[2,3,-3],[1,3,4]], n=3, k=1. Dijkstra might finalize node 3 with dist=4 (direct), missing path 1->2->3 with dist=5+(-3)=2.'
            }
        ],
        solutions: {
            python: `# Negative Weight Edge Added
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 02-dijkstras-algorithm/01-network-delay-time

def solve():
    """
    What if some network links have negative delay (time travel shortcuts)? Dijkstra's will fail. Modify the solution to handle negative edge weights correctly. What algorithm would you use instead?

    Key insight: Dijkstra's greedy assumption breaks with negative edges. You need Bellman-Ford which relaxes all edges V-1 times, or detect negative cycles that would make the delay unbounded.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Negative Weight Edge Added problem.
// What if some network links have negative delay (time travel shortcuts)? Dijkstra's will fail. Modify the solution to handle negative edge weights correctly. What algorithm would you use instead?
// Key insight: Dijkstra's greedy assumption breaks with negative edges. You need Bellman-Ford which relaxes all edges V-1 times, or detect negative cycles that would make the delay unbounded.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/01-network-delay-time/twist-01-negative-weight-edge-added', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/01-network-delay-time/twist-01-negative-weight-edge-added'] = problem;
})();
