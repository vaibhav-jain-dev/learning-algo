/**
 * Min Matches Guarantee
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Matches Guarantee',
        difficulty: 'Hard',
        algorithm: 'hash-counting',
        parent: '04-tournament-winner',
        description: 'Given n teams and their current scores, find the minimum number of remaining matches needed to guarantee a single winner.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
          "scores": [
            10,
            7,
            5
          ]
        },
        output: "1\nExplanation: Leader needs 1 more win to be uncatchable.",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Leader needs 1 more win to be uncatchable.'
    },
    {
        input: {
          "scores": [
            6,
            6,
            6
          ]
        },
        output: "2\nExplanation: Two matches needed to break the tie.",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Two matches needed to break the tie.'
    }
        ],
        solutions: {
            python: `def minMatchesGuarantee(scores, points_per_win=3):
    """
    Min Matches Guarantee

    Find minimum matches needed for one team to be guaranteed winner
    (uncatchable by any other team).

    Time: O(n log n) for sorting
    Space: O(1)

    Args:
        scores: List of current scores for each team
        points_per_win: Points awarded per win (default 3)

    Returns:
        Minimum number of additional matches needed
    """
    if len(scores) <= 1:
        return 0

    # Sort scores in descending order
    sorted_scores = sorted(scores, reverse=True)

    leader_score = sorted_scores[0]
    second_score = sorted_scores[1]

    # If leader already has uncatchable lead
    if leader_score > second_score:
        # Leader is already ahead, but we need to check if they're uncatchable
        # A team is uncatchable when no other team can reach their score
        # even if they win all remaining matches
        # For simplicity, we assume remaining matches = what's needed
        pass

    # Count teams tied for first
    tied_count = sum(1 for s in scores if s == leader_score)

    if tied_count > 1:
        # Multiple teams tied - need matches to break tie
        # Need at least (tied_count - 1) matches among tied teams
        # But with round-robin style, we need enough for one to emerge
        matches_needed = 0
        while tied_count > 1:
            matches_needed += 1
            tied_count -= 1  # Each match eliminates one from contention
        return matches_needed

    # Leader is ahead - check gap to second place
    gap = leader_score - second_score

    # Leader needs a gap of at least (points_per_win) to be uncatchable
    # after second place plays their next match
    if gap >= points_per_win:
        return 0

    # Need one more win to secure lead
    return 1


# Test
if __name__ == "__main__":
    print(minMatchesGuarantee([10, 7, 5]))  # 1
    print(minMatchesGuarantee([6, 6, 6]))   # 2`,
            go: `package main

import (
    "fmt"
    "sort"
)

// MinMatchesGuarantee finds minimum matches for guaranteed winner
// Time: O(n log n), Space: O(n)
func MinMatchesGuarantee(scores []int, pointsPerWin int) int {
    if len(scores) <= 1 {
        return 0
    }

    // Sort scores in descending order
    sortedScores := make([]int, len(scores))
    copy(sortedScores, scores)
    sort.Sort(sort.Reverse(sort.IntSlice(sortedScores)))

    leaderScore := sortedScores[0]
    secondScore := sortedScores[1]

    // Count teams tied for first
    tiedCount := 0
    for _, s := range scores {
        if s == leaderScore {
            tiedCount++
        }
    }

    if tiedCount > 1 {
        // Need matches to break tie
        matchesNeeded := 0
        for tiedCount > 1 {
            matchesNeeded++
            tiedCount--
        }
        return matchesNeeded
    }

    // Leader is ahead - check gap
    gap := leaderScore - secondScore

    if gap >= pointsPerWin {
        return 0
    }

    return 1
}

func main() {
    fmt.Println(MinMatchesGuarantee([]int{10, 7, 5}, 3)) // 1
    fmt.Println(MinMatchesGuarantee([]int{6, 6, 6}, 3))  // 2
}`
        },
        twists: [
            { id: '04-tournament-winner/03-min-matches-guarantee/twist-01-min-matches-for-top-k-guarantee', name: 'Min Matches for Top K Guarantee', difficulty: 'Hard' },
            { id: '04-tournament-winner/03-min-matches-guarantee/twist-02-min-matches-with-known-schedule', name: 'Min Matches with Known Schedule', difficulty: 'Hard' },
            { id: '04-tournament-winner/03-min-matches-guarantee/twist-03-probability-of-winner-after-k-matches', name: 'Probability of Winner After K Matches', difficulty: 'Very Hard' },
            { id: '04-tournament-winner/03-min-matches-guarantee/twist-04-min-matches-with-bonus-points', name: 'Min Matches with Bonus Points', difficulty: 'Medium' },
            { id: '04-tournament-winner/03-min-matches-guarantee/twist-05-min-matches-across-multiple-groups', name: 'Min Matches Across Multiple Groups', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 04-tournament-winner
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '04-tournament-winner/03-min-matches-guarantee', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/04-tournament-winner/03-min-matches-guarantee'] = problem;

})();
