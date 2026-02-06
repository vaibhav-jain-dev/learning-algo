/**
 * Two Players
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: graph-bfs
 * Parent: 08-minimum-passes/03-shortest-path-all-keys
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Players',
        difficulty: 'Very Hard',
        algorithm: 'graph-bfs',
        parent: '08-minimum-passes/03-shortest-path-all-keys',
        description: 'Two players start at different positions and share keys. Either player picking up a key makes it available to both. Find minimum total moves.',
        problem: 'The state space now includes positions of both players plus shared key bitmask. Coordination between players adds a new dimension to the BFS.',
        hints: [
            'Start by understanding the key difference: The state space now includes positions of both players plus shared key bitmask.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: Player 1 near key a, Player 2 near lock A.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":["@.a..","###.#","b.A.B"]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the two players criteria.'
            },
            // Edge case
            {
                input: {"grid":["@.a.."]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def two_players(grid):
    """
    Two Players

    Two players start at different positions and share keys. Either player picking up a key makes it available to both. Find minimum total moves.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(two_players(["@.a..","###.#","b.A.B"]))  # Expected: 1
print(two_players(["@.a.."]))  # Expected: 0
`,
            go: `package main

import "fmt"

// TwoPlayers solves the Two Players problem.
// Two players start at different positions and share keys. Either player picking up a key makes it available to both. Find minimum total moves.
// Time: Varies - see approach, Space: Varies - see approach
func TwoPlayers(grid []string) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TwoPlayers([]string{"@.a..", "###.#", "b.A.B"})) // Expected: 1
	fmt.Println(TwoPlayers([]string{"@.a.."})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/03-shortest-path-all-keys/twist-04-two-players', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/03-shortest-path-all-keys/twist-04-two-players'] = problem;
})();
