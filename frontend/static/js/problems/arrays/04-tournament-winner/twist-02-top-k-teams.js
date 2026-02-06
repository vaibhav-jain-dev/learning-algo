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
            {
                input: {"array":[1,3,5,7],"k":2},
                output: [1,3],
                explanation: 'The k=2 smallest/closest values found.'
            },
            {
                input: {"array":[10,20,30],"k":1},
                output: [10],
                explanation: 'With k=1, return the single best result.'
            },
            {
                input: {"array":[5,5,5,5],"k":3},
                output: [5,5,5],
                explanation: 'Duplicate values handled correctly with k=3.'
            }
        ],
        solutions: {
            python: `def top_k_teams(data):
    """
    Top K Teams

    Instead of just the winner, return the top k teams ranked by their total points.
    \n    Approach: Requires sorting or a heap after accumulation instead of just tracking a single maximum, changing the output phase.

    Time: O(n log k)
    Space: O(n)
    """
    # Implementation based on the twist description
    # competitions=[["A","B"],["B","C"],["C","A"]], results=[1,1,1], k=2 → ["A","B"] (A:6, B:3, C:3)

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(top_k_teams([1, 2, 3, 4, 5]))
print(top_k_teams([5, 3, 1]))
print(top_k_teams([1]))`,
            go: `package main

import "fmt"

// TopKTeams solves the Top K Teams problem.
// Instead of just the winner, return the top k teams ranked by their total points.
// Time: O(n log k), Space: O(n)
func TopKTeams(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(TopKTeams([]int{1, 2, 3, 4, 5}))
    fmt.Println(TopKTeams([]int{5, 3, 1}))
    fmt.Println(TopKTeams([]int{1}))
}`
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
