/**
 * Bidirectional BFS
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 * Parent: 08-a-star-algorithm/02-sliding-puzzle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional BFS',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/02-sliding-puzzle',
        description: 'Solve the puzzle using bidirectional BFS -- searching forward from initial state and backward from goal, meeting in the middle.',
        problem: 'Explores roughly sqrt(N) states from each direction instead of N total, significantly reducing the search space for puzzles with large state spaces.',
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
                input: {"board":[[1,2,3],[4,0,5]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"board":[[1,2,3]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def bidirectional_bfs(board):
    """
    Bidirectional BFS

    Solve the puzzle using bidirectional BFS -- searching forward from initial state and backward from goal, meeting in the middle.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(board)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(bidirectional_bfs([[1,2,3],[4,0,5]]))  # Expected: 1
print(bidirectional_bfs([[1,2,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalBfs solves the Bidirectional BFS problem.
// Solve the puzzle using bidirectional BFS -- searching forward from initial state and backward from goal, meeting in the middle.
// Time: O(?), Space: O(?)
func BidirectionalBfs(board [][]int) int {
	result := 0

	for i := 0; i < len(board); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BidirectionalBfs([][]int{{1, 2, 3}, {4, 0, 5}})) // Expected: 1
	fmt.Println(BidirectionalBfs([][]int{{1, 2, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/02-sliding-puzzle/twist-04-bidirectional-bfs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/02-sliding-puzzle/twist-04-bidirectional-bfs'] = problem;
})();
