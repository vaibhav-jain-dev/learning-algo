/**
 * Tournament Tiebreakers
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Tournament Tiebreakers',
        difficulty: 'Medium',
        algorithm: 'hash-counting',
        parent: '04-tournament-winner',
        description: 'Same as tournament winner but with tiebreaker rules: if points are equal, the team with more head-to-head wins against tied opponents wins.',
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
        "raw": "competitions = [[\"A\",\"B\"],[\"B\",\"C\"],[\"C\",\"A\"]], results = [1,1,0]"
},
        output: "\"A\" (A beats B, B beats C, A beats C - A has best record)",
        explanation: 'Given the input, the algorithm processes it to produce "A" (A beats B, B beats C, A beats C - A has best record)'
    }
        ],
        solutions: {
            python: `def tournamentTiebreakers(competitions, results):
    """
    Tournament Winner with Tiebreakers

    If points are equal, the team with more head-to-head wins
    against tied opponents wins.

    Time: O(n^2) for tiebreaker resolution
    Space: O(n) for storing scores and head-to-head records

    Args:
        competitions: List of [home_team, away_team] pairs
        results: List of 1 (home wins) or 0 (away wins)

    Returns:
        Name of the tournament winner
    """
    # Track points (3 for a win)
    points = {}
    # Track head-to-head results: head_to_head[winner][loser] = count
    head_to_head = {}

    for i, competition in enumerate(competitions):
        home_team, away_team = competition

        # Initialize if needed
        for team in [home_team, away_team]:
            if team not in points:
                points[team] = 0
                head_to_head[team] = {}

        # Determine winner
        if results[i] == 1:
            winner, loser = home_team, away_team
        else:
            winner, loser = away_team, home_team

        # Award points
        points[winner] += 3

        # Record head-to-head
        if loser not in head_to_head[winner]:
            head_to_head[winner][loser] = 0
        head_to_head[winner][loser] += 1

    # Find max points
    max_points = max(points.values())

    # Get all teams with max points (tied teams)
    tied_teams = [team for team, pts in points.items() if pts == max_points]

    if len(tied_teams) == 1:
        return tied_teams[0]

    # Resolve tiebreaker: count head-to-head wins against other tied teams
    def head_to_head_wins(team):
        wins = 0
        for opponent in tied_teams:
            if opponent != team and opponent in head_to_head[team]:
                wins += head_to_head[team][opponent]
        return wins

    # Find team with most head-to-head wins against tied opponents
    best_team = max(tied_teams, key=head_to_head_wins)
    return best_team


# Test
if __name__ == "__main__":
    competitions = [["A", "B"], ["B", "C"], ["C", "A"]]
    results = [1, 1, 0]  # A beats B, B beats C, A beats C
    print(tournamentTiebreakers(competitions, results))  # "A"`,
            go: `package main

import "fmt"

// TournamentTiebreakers finds tournament winner with head-to-head tiebreakers
// Time: O(n^2), Space: O(n)
func TournamentTiebreakers(competitions [][]string, results []int) string {
    // Track points
    points := make(map[string]int)
    // Track head-to-head: headToHead[winner][loser] = count
    headToHead := make(map[string]map[string]int)

    for i, competition := range competitions {
        homeTeam, awayTeam := competition[0], competition[1]

        // Initialize if needed
        for _, team := range []string{homeTeam, awayTeam} {
            if _, exists := points[team]; !exists {
                points[team] = 0
                headToHead[team] = make(map[string]int)
            }
        }

        // Determine winner
        var winner, loser string
        if results[i] == 1 {
            winner, loser = homeTeam, awayTeam
        } else {
            winner, loser = awayTeam, homeTeam
        }

        // Award points
        points[winner] += 3

        // Record head-to-head
        headToHead[winner][loser]++
    }

    // Find max points
    maxPoints := 0
    for _, pts := range points {
        if pts > maxPoints {
            maxPoints = pts
        }
    }

    // Get tied teams
    var tiedTeams []string
    for team, pts := range points {
        if pts == maxPoints {
            tiedTeams = append(tiedTeams, team)
        }
    }

    if len(tiedTeams) == 1 {
        return tiedTeams[0]
    }

    // Resolve tiebreaker
    headToHeadWins := func(team string) int {
        wins := 0
        for _, opponent := range tiedTeams {
            if opponent != team {
                wins += headToHead[team][opponent]
            }
        }
        return wins
    }

    bestTeam := tiedTeams[0]
    bestWins := headToHeadWins(bestTeam)
    for _, team := range tiedTeams[1:] {
        wins := headToHeadWins(team)
        if wins > bestWins {
            bestTeam = team
            bestWins = wins
        }
    }

    return bestTeam
}

func main() {
    competitions := [][]string{{"A", "B"}, {"B", "C"}, {"C", "A"}}
    results := []int{1, 1, 0}
    fmt.Println(TournamentTiebreakers(competitions, results)) // "A"
}`
        },
        twists: [
            {
                title: 'Multi-Level Tiebreakers',
                difficulty: 'Hard',
                description: 'Use cascading tiebreakers: first by points, then head-to-head, then goal difference, then alphabetical order.',
                whyDifferent: 'Requires implementing a multi-criteria comparator that falls through to the next criterion only when the previous one is tied.',
                example: 'A and B tied on points and head-to-head → compare goal difference → if still tied, alphabetical'
            },
            {
                title: 'Circular Head-to-Head Resolution',
                difficulty: 'Hard',
                description: 'What if head-to-head among tied teams is also circular (A beat B, B beat C, C beat A)? Apply a secondary tiebreaker.',
                whyDifferent: 'Circular head-to-head means no single winner exists from direct comparison, requiring a fallback strategy like most total wins or fewest losses.',
                example: 'A beats B, B beats C, C beats A (all tied on points) → use total goal difference as fallback'
            },
            {
                title: 'Tournament with Group Stages',
                difficulty: 'Medium',
                description: 'Teams are divided into groups. Apply tiebreakers within each group to determine who advances to knockout rounds.',
                whyDifferent: 'Requires partitioning teams into groups and applying tiebreaker logic independently per group before combining results.',
                example: 'Group 1: [A,B,C], Group 2: [D,E,F] → top 2 from each group advance using tiebreakers'
            },
            {
                title: 'Weighted Tiebreaker Points',
                difficulty: 'Medium',
                description: 'In head-to-head tiebreaker, wins against higher-ranked opponents count more than wins against lower-ranked ones.',
                whyDifferent: 'Adds positional awareness to the tiebreaker calculation, requiring ranking information during the head-to-head evaluation.',
                example: 'A and B tied, but A beat the #1 team while B beat the #5 team → A wins tiebreaker'
            },
            {
                title: 'Retroactive Tiebreaker After Disqualification',
                difficulty: 'Hard',
                description: 'A team is disqualified mid-tournament. Recompute all standings and tiebreakers as if that team never participated.',
                whyDifferent: 'Requires removing all matches involving the disqualified team and recomputing everything, testing incremental update capabilities.',
                example: 'Team C disqualified → remove all C matches → recompute points and head-to-head for remaining teams'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 04-tournament-winner
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '04-tournament-winner/02-tournament-tiebreakers', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/04-tournament-winner/02-tournament-tiebreakers'] = problem;

})();
