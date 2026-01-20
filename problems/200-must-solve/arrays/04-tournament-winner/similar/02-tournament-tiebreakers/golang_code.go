/*
Tournament with Tiebreakers - Go Solutions

Same as tournament winner but with tiebreaker rules: if points are equal,
the team with more head-to-head wins against tied opponents wins.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: HashMap with Head-to-Head Tracking ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n + k log k) where k is unique teams
// Space Complexity: O(k) for team data
// ============================================================================

// TournamentWinnerWithTiebreakers finds winner using head-to-head tiebreaker.
func TournamentWinnerWithTiebreakers(competitions [][]string, results []int) string {
	type TeamStats struct {
		points    int
		headToHead map[string]int // wins against each opponent
	}

	stats := make(map[string]*TeamStats)

	// Initialize stats for each team
	getStats := func(team string) *TeamStats {
		if stats[team] == nil {
			stats[team] = &TeamStats{headToHead: make(map[string]int)}
		}
		return stats[team]
	}

	// Process all competitions
	for i, comp := range competitions {
		homeTeam, awayTeam := comp[0], comp[1]
		var winner, loser string

		if results[i] == 1 {
			winner, loser = homeTeam, awayTeam
		} else {
			winner, loser = awayTeam, homeTeam
		}

		getStats(winner).points += 3
		getStats(winner).headToHead[loser]++
		getStats(loser) // Ensure loser exists
	}

	// Find teams with max points
	maxPoints := 0
	for _, s := range stats {
		if s.points > maxPoints {
			maxPoints = s.points
		}
	}

	var tiedTeams []string
	for team, s := range stats {
		if s.points == maxPoints {
			tiedTeams = append(tiedTeams, team)
		}
	}

	if len(tiedTeams) == 1 {
		return tiedTeams[0]
	}

	// Head-to-head tiebreaker among tied teams
	tiedSet := make(map[string]bool)
	for _, t := range tiedTeams {
		tiedSet[t] = true
	}

	headToHeadWins := make(map[string]int)
	for _, team := range tiedTeams {
		for opponent, wins := range stats[team].headToHead {
			if tiedSet[opponent] {
				headToHeadWins[team] += wins
			}
		}
	}

	// Find best head-to-head record
	sort.Slice(tiedTeams, func(i, j int) bool {
		return headToHeadWins[tiedTeams[i]] > headToHeadWins[tiedTeams[j]]
	})

	return tiedTeams[0]
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	// Test case: A, B, C all have 6 points, but A beat both B and C
	competitions := [][]string{
		{"A", "B"}, {"B", "C"}, {"C", "A"},
		{"A", "B"}, {"B", "C"}, {"C", "A"},
	}
	results := []int{1, 1, 0, 1, 1, 0} // A beats B twice, B beats C twice, A beats C twice

	fmt.Println("======================================================================")
	fmt.Println("TOURNAMENT WITH TIEBREAKERS - TEST RESULTS")
	fmt.Println("======================================================================")

	fmt.Printf("\nCompetitions: %v\n", competitions)
	fmt.Printf("Results: %v\n", results)
	fmt.Printf("Winner: %s\n", TournamentWinnerWithTiebreakers(competitions, results))

	// Sample Input
	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	competitions = [][]string{{"A", "B"}, {"B", "C"}, {"A", "C"}}
	results = []int{1, 1, 1}
	fmt.Printf("\nInput: competitions = %v, results = %v\n", competitions, results)
	fmt.Printf("Output: %s\n", TournamentWinnerWithTiebreakers(competitions, results))
}
