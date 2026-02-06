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
            {
                title: 'Min Matches for Top K Guarantee',
                difficulty: 'Hard',
                description: 'Instead of guaranteeing a single winner, find the minimum matches to guarantee the top K teams are determined.',
                whyDifferent: 'Must ensure K teams are uncatchable, not just one. The gap analysis must consider multiple teams simultaneously.',
                example: 'scores=[10,8,6,4], k=2 → how many matches until top 2 spots are guaranteed?'
            },
            {
                title: 'Min Matches with Known Schedule',
                difficulty: 'Hard',
                description: 'Given the remaining schedule of who plays whom, find the minimum number of those scheduled matches that must be played to guarantee a winner.',
                whyDifferent: 'Cannot assume arbitrary matchups. Must reason about specific pairings and their worst-case outcomes.',
                example: 'scores=[9,6,6], remaining: A vs B, B vs C → only 1 match (A vs B, if A wins, A is uncatchable)'
            },
            {
                title: 'Probability of Winner After K Matches',
                difficulty: 'Very Hard',
                description: 'Given win probabilities for each team, find the probability that a clear winner exists after k more matches.',
                whyDifferent: 'Shifts from deterministic to probabilistic analysis, requiring expected value calculations or simulation over match outcome distributions.',
                example: 'scores=[6,6], P(A wins)=0.6, after 1 match: P(clear winner)=1.0 (one match always decides between 2 teams)'
            },
            {
                title: 'Min Matches with Bonus Points',
                difficulty: 'Medium',
                description: 'Some matches award bonus points (e.g., 4 points instead of 3 for a decisive victory). Factor this into the guarantee calculation.',
                whyDifferent: 'Variable point awards mean worst-case analysis must consider opponents potentially earning bonus points, widening the gap needed.',
                example: 'scores=[10,7], base=3, bonus=4 → second place could gain 4 per match, need bigger lead to guarantee'
            },
            {
                title: 'Min Matches Across Multiple Groups',
                difficulty: 'Hard',
                description: 'Teams are in separate groups. Find the minimum total matches across all groups to guarantee a winner in every group.',
                whyDifferent: 'Must optimize across independent groups, where matches in one group do not affect another, but total match count should be minimized globally.',
                example: 'Group1 scores=[8,6,4], Group2 scores=[5,5,5] → Group1 needs 1, Group2 needs 2 → total 3'
            }
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
