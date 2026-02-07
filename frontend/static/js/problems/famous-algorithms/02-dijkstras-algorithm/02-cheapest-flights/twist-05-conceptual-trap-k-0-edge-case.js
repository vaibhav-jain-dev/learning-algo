/**
 * Conceptual Trap: K=0 Edge Case
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: dijkstras-algorithm
 * Parent: 02-dijkstras-algorithm/02-cheapest-flights
 */
(function() {
    'use strict';

    const problem = {
        name: 'Conceptual Trap: K=0 Edge Case',
        difficulty: 'Easy',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/02-cheapest-flights',
        description: 'What happens when k=0? You can take at most 0 stops, meaning only direct flights from src to dst are valid. Trace through the algorithm with k=0 and verify it handles this correctly.',
        problem: 'With k=0, the priority queue immediately limits exploration depth. Many implementations have off-by-one errors here: is k the number of stops (intermediate nodes) or the number of flights?',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"flights":[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],"src":0,"dst":3,"k":3},
                output: true,
                explanation: 'The conceptual trap k 0 edge case condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"n":0,"flights":[[0,1,100]],"src":0,"dst":0,"k":3},
                output: false,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_k_0_edge_case(n, flights, src, dst, k):
    """
    Conceptual Trap: K=0 Edge Case

    What happens when k=0? You can take at most 0 stops, meaning only direct flights from src to dst are valid. Trace through the algorithm with k=0 and verify it handles this correctly.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(n)):
        if j < len(flights) and n[i] == flights[j]:
            j += 1

    return j == len(flights)


# Test cases
print(conceptual_trap_k_0_edge_case(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 3))  # Expected: True
print(conceptual_trap_k_0_edge_case(0, [[0,1,100]], 0, 0, 3))  # Expected: False
`,
            go: `package main

import "fmt"

// ConceptualTrapK0EdgeCase solves the Conceptual Trap: K=0 Edge Case problem.
// What happens when k=0? You can take at most 0 stops, meaning only direct flights from src to dst are valid. Trace through the algorithm with k=0 and verify it handles this correctly.
// Time: O(?), Space: O(?)
func ConceptualTrapK0EdgeCase(n int, flights [][]int, src int, dst int, k int) bool {
	j := 0

	for i := 0; i < len(n) && j < len(flights); i++ {
		if n[i] == flights[j] {
			j++
		}
	}

	return j == len(flights)
}

func main() {
	fmt.Println(ConceptualTrapK0EdgeCase(4, [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}, 0, 3, 3)) // Expected: true
	fmt.Println(ConceptualTrapK0EdgeCase(0, [][]int{{0, 1, 100}}, 0, 0, 3)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/02-cheapest-flights/twist-05-conceptual-trap-k-0-edge-case', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/02-cheapest-flights/twist-05-conceptual-trap-k-0-edge-case'] = problem;
})();
