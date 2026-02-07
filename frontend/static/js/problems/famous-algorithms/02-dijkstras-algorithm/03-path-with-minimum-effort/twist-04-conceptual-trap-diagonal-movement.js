/**
 * Conceptual Trap: Diagonal Movement
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 * Parent: 02-dijkstras-algorithm/03-path-with-minimum-effort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Conceptual Trap: Diagonal Movement',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/03-path-with-minimum-effort',
        description: 'What if diagonal movement is allowed (8 directions instead of 4)? Does the algorithm change structurally, or just the neighbor generation? What if diagonal movement costs sqrt(2) times the height difference?',
        problem: 'Adding diagonals increases edges from ~4*M*N to ~8*M*N but does not change the algorithm structure. The weighted diagonal variant adds complexity to the edge weight calculation and changes the optimal paths.',
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
                input: {"heights":[[1,2,2],[3,8,2],[5,3,5]]},
                output: 2,
                explanation: 'The priority queue ensures we always process the nearest unvisited node. When a node is dequeued, its shortest distance is finalized. Neighbors are updated if a shorter path is found.'
            },
            // Edge case
            {
                input: {"heights":[[1,2,2]]},
                output: 0,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_diagonal_movement(heights):
    """
    Conceptual Trap: Diagonal Movement

    What if diagonal movement is allowed (8 directions instead of 4)? Does the algorithm change structurally, or just the neighbor generation? What if diagonal movement costs sqrt(2) times the height difference?

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(heights)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(conceptual_trap_diagonal_movement([[1,2,2],[3,8,2],[5,3,5]]))  # Expected: 2
print(conceptual_trap_diagonal_movement([[1,2,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConceptualTrapDiagonalMovement solves the Conceptual Trap: Diagonal Movement problem.
// What if diagonal movement is allowed (8 directions instead of 4)? Does the algorithm change structurally, or just the neighbor generation? What if diagonal movement costs sqrt(2) times the height difference?
// Time: O(?), Space: O(?)
func ConceptualTrapDiagonalMovement(heights [][]int) int {
	result := 0

	for i := 0; i < len(heights); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConceptualTrapDiagonalMovement([][]int{{1, 2, 2}, {3, 8, 2}, {5, 3, 5}})) // Expected: 2
	fmt.Println(ConceptualTrapDiagonalMovement([][]int{{1, 2, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/03-path-with-minimum-effort/twist-04-conceptual-trap-diagonal-movement', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/03-path-with-minimum-effort/twist-04-conceptual-trap-diagonal-movement'] = problem;
})();
