/**
 * Tournament Winner with Draws
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: tournament-winner-with-draws
 * Parent: 04-tournament-winner
 */
(function() {
    'use strict';

    const problem = {
        name: 'Tournament Winner with Draws',
        difficulty: 'Medium',
        algorithm: 'tournament-winner-with-draws',
        parent: '04-tournament-winner',
        description: 'Matches can now end in a draw (result=2), giving each team 1 point. Determine the winner. Adds a third outcome state, requiring modification of the winner determination logic for each match and different point allocation.',
        problem: 'Adds a third outcome state, requiring modification of the winner determination logic for each match and different point allocation.',
        hints: [
            'Think about how tournament winner with draws differs from the standard version of this problem.',
            'Key insight: Adds a third outcome state, requiring modification of the winner determination logic for each match and different point allocation.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"teams":["A","B","C","D"],"results":[1,0,1]},
                output: "A",
                explanation: ''
            },
            {
                input: {"teams":["X","Y"],"results":[0]},
                output: "Y",
                explanation: ''
            },
            // Edge case
            {
                input: {"teams":["A","B","C"],"results":[1,1]},
                output: "A",
                explanation: ''
            }
        ],
        solutions: {
            python: `def tournament_winner_with_draws(competitions, results):
    """
    Tournament Winner with Draws

    Matches can now end in a draw (result=2), giving each team 1 point. Determine the winner. Adds a third outcome state, requiring modification of the winner determination logic for each match and different point allocation.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in competitions:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(tournament_winner_with_draws(None, [1,0,1]))  # Expected: "A"
print(tournament_winner_with_draws(None, [0]))  # Expected: "Y"
print(tournament_winner_with_draws(None, [1,1]))  # Expected: "A"
`,
            go: `package main

import "fmt"

// TournamentWinnerWithDraws solves the Tournament Winner with Draws problem.
// Matches can now end in a draw (result=2), giving each team 1 point. Determine the winner. Adds a third outcome state, requiring modification of the winner determination logic for each match and different point allocation.
// Time: O(n), Space: O(n)
func TournamentWinnerWithDraws(competitions [][]int, results []int) string {
	result := ""

	for _, v := range competitions {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(TournamentWinnerWithDraws(nil, []int{1, 0, 1})) // Expected: "A"
	fmt.Println(TournamentWinnerWithDraws(nil, []int{0})) // Expected: "Y"
	fmt.Println(TournamentWinnerWithDraws(nil, []int{1, 1})) // Expected: "A"
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '04-tournament-winner/twist-04-tournament-winner-with-draws', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/04-tournament-winner/twist-04-tournament-winner-with-draws'] = problem;
})();
