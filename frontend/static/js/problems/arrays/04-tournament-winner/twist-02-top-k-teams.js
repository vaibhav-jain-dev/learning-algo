/**
 * Top K Teams
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: top-k-teams
 * Parent: 04-tournament-winner
 */
(function() {
    'use strict';

    const problem = {
        name: 'Top K Teams',
        difficulty: 'Medium',
        algorithm: 'top-k-teams',
        parent: '04-tournament-winner',
        description: 'Instead of just the winner, return the top k teams ranked by their total points. Requires sorting or a heap after accumulation instead of just tracking a single maximum, changing the output phase.',
        problem: 'Requires sorting or a heap after accumulation instead of just tracking a single maximum, changing the output phase.',
        hints: [
            'Think about how top k teams differs from the standard version of this problem.',
            'Key insight: Requires sorting or a heap after accumulation instead of just tracking a single maximum, changing the output phase.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,3,5,7],"k":2},
                output: [1,3],
                explanation: ''
            },
            {
                input: {"array":[10,20,30],"k":1},
                output: [10],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[5,5,5,5],"k":3},
                output: [5,5,5],
                explanation: ''
            }
        ],
        solutions: {
            python: `def top_k_teams(competitions, results, k):
    """
    Top K Teams

    Instead of just the winner, return the top k teams ranked by their total points. Requires sorting or a heap after accumulation instead of just tracking a single maximum, changing the output phase.

    Time: O(n log k)
    Space: O(n)
    """
    count = 0
    n = len(competitions)

    for i in range(n):
        # Check condition based on results
        j = 0
        for k in range(i, n):
            if j < len(results) and competitions[k] == results[j]:
                j += 1
        if j == len(results):
            count += 1

    return count


# Test cases
print(top_k_teams(None, None, 2))  # Expected: [1,3]
print(top_k_teams(None, None, 1))  # Expected: [10]
print(top_k_teams(None, None, 3))  # Expected: [5,5,5]
`,
            go: `package main

import "fmt"

// TopKTeams solves the Top K Teams problem.
// Instead of just the winner, return the top k teams ranked by their total points. Requires sorting or a heap after accumulation instead of just tracking a single maximum, changing the output phase.
// Time: O(n log k), Space: O(n)
func TopKTeams(competitions [][]int, results []int, k int) int {
	result := 0

	for i := 0; i < len(competitions); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TopKTeams(nil, nil, 2)) // Expected: [1,3]
	fmt.Println(TopKTeams(nil, nil, 1)) // Expected: [10]
	fmt.Println(TopKTeams(nil, nil, 3)) // Expected: [5,5,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '04-tournament-winner/twist-02-top-k-teams', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/04-tournament-winner/twist-02-top-k-teams'] = problem;
})();
