/*
Tournament Winner - Go Solutions

Determine the winner of a round-robin tournament based on competition results.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: HashMap with Running Best ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass through competitions
// Space Complexity: O(k) - k unique teams in hashmap
//
// WHY THIS IS BEST:
// - Single pass through data
// - No need to iterate hashmap at the end
// - Clean and efficient
// - Optimal time complexity
// ============================================================================

// TournamentWinner finds the tournament winner using hashmap with running best tracking.
//
// How it works:
//  1. Maintain a hashmap of team -> score
//  2. For each competition, determine winner and add 3 points
//  3. After each update, check if this team is now the best
//  4. Return best team (no second pass needed!)
//
// Visual:
//
//	competitions = [["A","B"], ["A","C"], ["B","C"]]
//	results      = [   1,         1,         0    ]
//
//	Process:
//	A wins vs B → scores={A:3}, best=A(3)
//	A wins vs C → scores={A:6}, best=A(6)
//	C wins vs B → scores={A:6,C:3}, best=A(6)  ← A still best
//
//	Return: "A"
func TournamentWinner(competitions [][]string, results []int) string {
	const homeTeamWon = 1
	const pointsForWin = 3

	scores := make(map[string]int)
	bestTeam := ""
	bestScore := 0

	for i, competition := range competitions {
		homeTeam := competition[0]
		awayTeam := competition[1]
		result := results[i]

		// Determine winner based on result
		var winner string
		if result == homeTeamWon {
			winner = homeTeam
		} else {
			winner = awayTeam
		}

		// Update winner's score
		scores[winner] += pointsForWin

		// Update best team if this winner now has the highest score
		if scores[winner] > bestScore {
			bestScore = scores[winner]
			bestTeam = winner
		}
	}

	return bestTeam
}

// ============================================================================
// APPROACH 2: HashMap + Max at End
// ============================================================================
// Time Complexity:  O(n + k) - process competitions + find max in hashmap
// Space Complexity: O(k) - k unique teams
//
// WHEN TO USE:
// - When you need full standings, not just winner
// - When processing and aggregation are separate steps
// - Conceptually simpler for some people
// ============================================================================

// TournamentWinnerTwoPass finds winner by building hashmap first, then finding max.
//
// How it works:
// Phase 1: Process all competitions, build complete scores hashmap
// Phase 2: Iterate through hashmap to find team with maximum score
//
// This is slightly less efficient but conceptually clearer:
// - First loop: focus only on counting points
// - Second loop: focus only on finding maximum
func TournamentWinnerTwoPass(competitions [][]string, results []int) string {
	scores := make(map[string]int)

	// Phase 1: Build scores hashmap
	for i, competition := range competitions {
		var winner string
		if results[i] == 1 {
			winner = competition[0] // home wins
		} else {
			winner = competition[1] // away wins
		}
		scores[winner] += 3
	}

	// Phase 2: Find team with maximum score
	bestTeam := ""
	bestScore := 0
	for team, score := range scores {
		if score > bestScore {
			bestScore = score
			bestTeam = team
		}
	}

	return bestTeam
}

// ============================================================================
// APPROACH 3: With Full Standings (Sorting-Based)
// ============================================================================
// Time Complexity:  O(n + k log k) - process + sort all teams
// Space Complexity: O(k)
//
// WHEN TO USE:
// - When you need ranked standings, not just winner
// - When displaying leaderboard
// - When there are tiebreakers
// ============================================================================

// TeamScore represents a team and their score for standings
type TeamScore struct {
	Team  string
	Score int
}

// TournamentWinnerWithStandings finds winner AND returns full standings sorted by score.
//
// Use case: When you need to display a leaderboard, not just the winner.
func TournamentWinnerWithStandings(competitions [][]string, results []int) (string, []TeamScore) {
	scores := make(map[string]int)

	// Initialize all teams with 0 points (to include losers in standings)
	for _, comp := range competitions {
		if _, exists := scores[comp[0]]; !exists {
			scores[comp[0]] = 0
		}
		if _, exists := scores[comp[1]]; !exists {
			scores[comp[1]] = 0
		}
	}

	// Process competitions
	for i, comp := range competitions {
		var winner string
		if results[i] == 1 {
			winner = comp[0]
		} else {
			winner = comp[1]
		}
		scores[winner] += 3
	}

	// Convert to slice for sorting
	standings := make([]TeamScore, 0, len(scores))
	for team, score := range scores {
		standings = append(standings, TeamScore{Team: team, Score: score})
	}

	// Sort by score descending, then by name for stability
	sort.Slice(standings, func(i, j int) bool {
		if standings[i].Score != standings[j].Score {
			return standings[i].Score > standings[j].Score
		}
		return standings[i].Team < standings[j].Team
	})

	return standings[0].Team, standings
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		competitions [][]string
		results      []int
		expected     string
		desc         string
	}{
		{
			[][]string{{"HTML", "C#"}, {"C#", "Python"}, {"Python", "HTML"}},
			[]int{0, 0, 1},
			"Python",
			"Basic tournament",
		},
		{
			[][]string{{"A", "B"}, {"A", "C"}, {"A", "D"}},
			[]int{1, 1, 1},
			"A",
			"Clear winner - all wins",
		},
		{
			[][]string{{"Bulls", "Eagles"}, {"Bulls", "Bears"}, {"Bears", "Eagles"}},
			[]int{0, 0, 0},
			"Eagles",
			"Away team dominance",
		},
		{
			[][]string{{"Team1", "Team2"}},
			[]int{1},
			"Team1",
			"Single competition",
		},
		{
			[][]string{{"X", "Y"}, {"Y", "Z"}, {"Z", "X"}},
			[]int{1, 1, 1},
			"X",
			"Circular results",
		},
	}

	approaches := []struct {
		name string
		fn   func([][]string, []int) string
	}{
		{"HashMap + Running Best (Recommended)", TournamentWinner},
		{"HashMap + Max at End", TournamentWinnerTwoPass},
	}

	fmt.Println("======================================================================")
	fmt.Println("TOURNAMENT WINNER - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.competitions, tc.results)
			status := "✓"
			if result != tc.expected {
				status = "✗"
				allPassed = false
			}
			fmt.Printf("  %s %s: %s\n", status, tc.desc, result)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	// Test standings approach
	fmt.Println("\n\nWith Standings Approach:")
	fmt.Println("--------------------------------------------------")
	winner, standings := TournamentWinnerWithStandings(
		[][]string{{"HTML", "C#"}, {"C#", "Python"}, {"Python", "HTML"}},
		[]int{0, 0, 1},
	)
	fmt.Printf("  Winner: %s\n", winner)
	fmt.Printf("  Standings: %v\n", standings)

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    ┌───────────────────────────┬──────────┬──────────┬──────────────────┐
    │         Approach          │   Time   │  Space   │  Recommendation  │
    ├───────────────────────────┼──────────┼──────────┼──────────────────┤
    │ 1. HashMap + Running Best │   O(n)   │   O(k)   │  ⭐ BEST CHOICE  │
    │ 2. HashMap + Max at End   │  O(n+k)  │   O(k)   │  ✓ Also good     │
    │ 3. Sorting-Based          │O(n+klogk)│   O(k)   │  ⚠️ For standings │
    └───────────────────────────┴──────────┴──────────┴──────────────────┘

    Where: n = competitions, k = unique teams
    `)
}
