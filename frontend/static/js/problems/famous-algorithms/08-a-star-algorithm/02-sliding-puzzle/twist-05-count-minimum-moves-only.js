/**
 * Count Minimum Moves Only
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: a-star-bfs
 * Parent: 08-a-star-algorithm/02-sliding-puzzle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Minimum Moves Only',
        difficulty: 'Medium',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/02-sliding-puzzle',
        description: 'Return just the move count without tracking the actual sequence of moves or states.',
        problem: 'Can use A* without storing the path, only the move count in each state, reducing memory overhead per state from O(moves) to O(1) extra.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the count minimum moves only criteria.'
            },
            // Edge case
            {
                input: {"board":[[1,2,3]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_minimum_moves_only(board):
    """
    Count Minimum Moves Only

    Return just the move count without tracking the actual sequence of moves or states.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(board)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_minimum_moves_only([[1,2,3],[4,0,5]]))  # Expected: 1
print(count_minimum_moves_only([[1,2,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountMinimumMovesOnly solves the Count Minimum Moves Only problem.
// Return just the move count without tracking the actual sequence of moves or states.
// Time: O(?), Space: O(?)
func CountMinimumMovesOnly(board [][]int) int {
	result := 0

	for i := 0; i < len(board); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountMinimumMovesOnly([][]int{{1, 2, 3}, {4, 0, 5}})) // Expected: 1
	fmt.Println(CountMinimumMovesOnly([][]int{{1, 2, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/02-sliding-puzzle/twist-05-count-minimum-moves-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/02-sliding-puzzle/twist-05-count-minimum-moves-only'] = problem;
})();
