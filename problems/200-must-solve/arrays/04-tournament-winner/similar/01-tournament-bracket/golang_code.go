/*
Tournament Bracket Winner - Go Solutions

Determine the winner of a single-elimination tournament bracket.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
)

// ============================================================================
// APPROACH 1: Round-by-Round Simulation - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - process all n teams across all rounds
// Space Complexity: O(n) - store current round participants
//
// WHY THIS IS BEST:
// - Follows natural tournament structure
// - Easy to understand and implement
// - Handles any power-of-2 number of teams
// - Clear separation of rounds
// ============================================================================

// TournamentBracketWinner finds the tournament champion using round-by-round simulation.
//
// How it works:
//  1. Start with initial bracket pairs as current participants
//  2. For each round in results:
//     - Process matches using that round's results
//     - Collect winners as next round's participants
//  3. Final two remaining teams play finals
//  4. Return finals winner based on finalsResult
//
// Visual:
//
//	bracket = [["A","B"], ["C","D"]]
//	results = [[1, 0]]  // A wins, D wins
//	finalsResult = 1    // First finalist wins
//
//	Round 1: A vs B (1->A wins), C vs D (0->D wins)
//	Participants after R1: [A, D]
//	Finals: A vs D (1->A wins)
//	Return: "A"
func TournamentBracketWinner(bracket [][]string, results [][]int, finalsResult int) string {
	// Flatten initial bracket to get participants
	participants := make([]string, 0)
	for _, pair := range bracket {
		participants = append(participants, pair...)
	}

	// If only 2 teams, go directly to finals
	if len(participants) == 2 {
		if finalsResult == 1 {
			return participants[0]
		}
		return participants[1]
	}

	// Process each round
	for _, roundResults := range results {
		winners := make([]string, 0, len(participants)/2)
		for matchIdx, result := range roundResults {
			team1 := participants[matchIdx*2]
			team2 := participants[matchIdx*2+1]
			var winner string
			if result == 1 {
				winner = team1
			} else {
				winner = team2
			}
			winners = append(winners, winner)
		}
		participants = winners
	}

	// Finals between last two participants
	if finalsResult == 1 {
		return participants[0]
	}
	return participants[1]
}

// ============================================================================
// APPROACH 2: Recursive Tree Simulation
// ============================================================================
// Time Complexity:  O(n) - visit each team once
// Space Complexity: O(log n) - recursion depth equals rounds
//
// WHEN TO USE:
// - When thinking of bracket as a binary tree
// - When you need to find winner of any sub-bracket
// - Elegant recursive solution
// ============================================================================

// TournamentBracketWinnerRecursive finds the champion using recursive simulation.
func TournamentBracketWinnerRecursive(bracket [][]string, results [][]int, finalsResult int) string {
	// Flatten initial bracket
	participants := make([]string, 0)
	for _, pair := range bracket {
		participants = append(participants, pair...)
	}

	// Combine all results including finals
	allResults := make([][]int, len(results)+1)
	copy(allResults, results)
	allResults[len(results)] = []int{finalsResult}

	return advanceRound(participants, allResults, 0)
}

// advanceRound recursively processes tournament rounds.
func advanceRound(teams []string, allResults [][]int, roundIdx int) string {
	if len(teams) == 1 {
		return teams[0]
	}

	winners := make([]string, 0, len(teams)/2)
	for i := 0; i < len(teams); i += 2 {
		matchIdx := i / 2
		result := allResults[roundIdx][matchIdx]
		var winner string
		if result == 1 {
			winner = teams[i]
		} else {
			winner = teams[i+1]
		}
		winners = append(winners, winner)
	}

	return advanceRound(winners, allResults, roundIdx+1)
}

// ============================================================================
// APPROACH 3: Single Pass with Match Tracking
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - When you want to track full tournament history
// - When you need to record all match results
// ============================================================================

// MatchResult represents the outcome of a single match.
type MatchResult struct {
	Winner string
	Loser  string
}

// TournamentBracketWinnerWithHistory finds the champion and returns full match history.
func TournamentBracketWinnerWithHistory(bracket [][]string, results [][]int, finalsResult int) (string, []MatchResult) {
	// Flatten initial bracket
	participants := make([]string, 0)
	for _, pair := range bracket {
		participants = append(participants, pair...)
	}

	matchHistory := make([]MatchResult, 0)

	// Process preliminary rounds
	for _, roundResults := range results {
		winners := make([]string, 0, len(participants)/2)
		for matchIdx, result := range roundResults {
			team1 := participants[matchIdx*2]
			team2 := participants[matchIdx*2+1]
			var match MatchResult
			if result == 1 {
				match = MatchResult{Winner: team1, Loser: team2}
				winners = append(winners, team1)
			} else {
				match = MatchResult{Winner: team2, Loser: team1}
				winners = append(winners, team2)
			}
			matchHistory = append(matchHistory, match)
		}
		participants = winners
	}

	// Finals
	finalist1, finalist2 := participants[0], participants[1]
	var champion string
	if finalsResult == 1 {
		champion = finalist1
		matchHistory = append(matchHistory, MatchResult{Winner: finalist1, Loser: finalist2})
	} else {
		champion = finalist2
		matchHistory = append(matchHistory, MatchResult{Winner: finalist2, Loser: finalist1})
	}

	return champion, matchHistory
}

// ============================================================================
// APPROACH 4: Queue-based Processing
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - When you prefer queue-based processing
// - Simulates actual tournament flow
// ============================================================================

// TournamentBracketWinnerQueue finds the champion using queue-based processing.
func TournamentBracketWinnerQueue(bracket [][]string, results [][]int, finalsResult int) string {
	// Flatten initial bracket into queue
	queue := make([]string, 0)
	for _, pair := range bracket {
		queue = append(queue, pair...)
	}

	// Flatten all results including finals
	allResults := make([]int, 0)
	for _, roundResults := range results {
		allResults = append(allResults, roundResults...)
	}
	allResults = append(allResults, finalsResult)

	resultIdx := 0

	// Process until one winner remains
	for len(queue) > 1 {
		// Pop first two teams
		team1 := queue[0]
		team2 := queue[1]
		queue = queue[2:]

		// Determine winner
		result := allResults[resultIdx]
		resultIdx++

		var winner string
		if result == 1 {
			winner = team1
		} else {
			winner = team2
		}

		// Add winner to end of queue
		queue = append(queue, winner)
	}

	return queue[0]
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		bracket      [][]string
		results      [][]int
		finalsResult int
		expected     string
		desc         string
	}{
		{
			[][]string{{"A", "B"}, {"C", "D"}},
			[][]int{{1, 0}},
			1,
			"A",
			"4 teams - A beats B, D beats C, A beats D",
		},
		{
			[][]string{{"A", "B"}, {"C", "D"}},
			[][]int{{1, 0}},
			0,
			"D",
			"4 teams - A beats B, D beats C, D beats A",
		},
		{
			[][]string{{"Team1", "Team2"}},
			[][]int{},
			1,
			"Team1",
			"2 teams - direct finals, Team1 wins",
		},
		{
			[][]string{{"Team1", "Team2"}},
			[][]int{},
			0,
			"Team2",
			"2 teams - direct finals, Team2 wins",
		},
		{
			[][]string{{"A", "B"}, {"C", "D"}, {"E", "F"}, {"G", "H"}},
			[][]int{{1, 1, 0, 0}, {1, 0}},
			1,
			"A",
			"8 teams - A wins tournament",
		},
		{
			[][]string{{"Alpha", "Beta"}, {"Gamma", "Delta"}, {"Epsilon", "Zeta"}, {"Eta", "Theta"}},
			[][]int{{1, 0, 1, 0}, {0, 1}},
			1,
			"Delta",
			"8 teams with names - Delta wins",
		},
		{
			[][]string{{"X", "Y"}, {"Z", "W"}, {"P", "Q"}, {"R", "S"}},
			[][]int{{0, 0, 0, 0}, {0, 0}},
			0,
			"S",
			"8 teams - all second teams win",
		},
	}

	approaches := []struct {
		name string
		fn   func([][]string, [][]int, int) string
	}{
		{"Round-by-Round Simulation (Recommended)", TournamentBracketWinner},
		{"Recursive Tree Simulation", TournamentBracketWinnerRecursive},
		{"Queue-based Processing", TournamentBracketWinnerQueue},
	}

	fmt.Println("======================================================================")
	fmt.Println("TOURNAMENT BRACKET WINNER - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.bracket, tc.results, tc.finalsResult)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s\n", status, tc.desc)
			if result != tc.expected {
				fmt.Printf("         Expected: %s, Got: %s\n", tc.expected, result)
			}
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	// Test with history approach
	fmt.Println("\n\nWith History Approach:")
	fmt.Println("--------------------------------------------------")
	champion, history := TournamentBracketWinnerWithHistory(
		[][]string{{"A", "B"}, {"C", "D"}, {"E", "F"}, {"G", "H"}},
		[][]int{{1, 1, 0, 0}, {1, 0}},
		1,
	)
	fmt.Printf("  Champion: %s\n", champion)
	fmt.Println("  Match History:")
	for i, match := range history {
		fmt.Printf("    Match %d: %s defeated %s\n", i+1, match.Winner, match.Loser)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    +-------------------------------+----------+----------+------------------+
    |          Approach             |   Time   |  Space   |  Recommendation  |
    +-------------------------------+----------+----------+------------------+
    | 1. Round-by-Round Simulation  |   O(n)   |   O(n)   |  BEST CHOICE     |
    | 2. Recursive Tree Simulation  |   O(n)   | O(log n) |  Good for trees  |
    | 3. With History Tracking      |   O(n)   |   O(n)   |  For full record |
    | 4. Queue-based Processing     |   O(n)   |   O(n)   |  Queue style     |
    +-------------------------------+----------+----------+------------------+

    Where: n = number of teams
    `)
}
