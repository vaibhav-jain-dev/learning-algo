/**
 * Proof: Why State Must Include Stops
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 02-dijkstras-algorithm/02-cheapest-flights
 */
(function() {
    'use strict';
    const problem = {
        name: 'Proof: Why State Must Include Stops',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/02-cheapest-flights',
        description: 'Prove that the state space for this problem must include (node, stops_used) rather than just (node). Show that without stops in the state, the algorithm can produce incorrect results even with the modified visited check.',
        problem: 'Forces formal reasoning about state space design. The standard Dijkstra state (node, distance) is insufficient because two paths to the same node with different stop counts represent fundamentally different states.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Node X reached via 2 stops (cost 10) and 4 stops (cost 5). If K=3, only the 2-stop path can continue. The cheaper 4-stop path is useless despite lower cost.' },
                output: 'See example',
                explanation: 'Node X reached via 2 stops (cost 10) and 4 stops (cost 5). If K=3, only the 2-stop path can continue. The cheaper 4-stop path is useless despite lower cost.'
            }
        ],
        solutions: {
            python: `# Proof: Why State Must Include Stops
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 02-dijkstras-algorithm/02-cheapest-flights

def solve():
    """
    Prove that the state space for this problem must include (node, stops_used) rather than just (node). Show that without stops in the state, the algorithm can produce incorrect results even with the modified visited check.

    Key insight: Forces formal reasoning about state space design. The standard Dijkstra state (node, distance) is insufficient because two paths to the same node with different stop counts represent fundamentally different states.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Proof: Why State Must Include Stops problem.
// Prove that the state space for this problem must include (node, stops_used) rather than just (node). Show that without stops in the state, the algorithm can produce incorrect results even with the modified visited check.
// Key insight: Forces formal reasoning about state space design. The standard Dijkstra state (node, distance) is insufficient because two paths to the same node with different stop counts represent fundamentally different states.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/02-cheapest-flights/twist-03-proof-why-state-must-include-stops', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/02-cheapest-flights/twist-03-proof-why-state-must-include-stops'] = problem;
})();
