/*
Tournament Winner - Go Solution

Determine the winner of a round-robin tournament based on competition results.

Time Complexity: O(n) where n is number of competitions
Space Complexity: O(k) where k is number of teams
*/

package main

import "fmt"

// TournamentWinner finds the tournament winner based on competition results
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

		// Determine winner
		var winner string
		if result == homeTeamWon {
			winner = homeTeam
		} else {
			winner = awayTeam
		}

		// Update score
		scores[winner] += pointsForWin

		// Update best team if needed
		if scores[winner] > bestScore {
			bestScore = scores[winner]
			bestTeam = winner
		}
	}

	return bestTeam
}

// TournamentWinnerWithStandings returns winner and full standings
func TournamentWinnerWithStandings(competitions [][]string, results []int) (string, map[string]int) {
	scores := make(map[string]int)

	for i, competition := range competitions {
		var winner string
		if results[i] == 1 {
			winner = competition[0]
		} else {
			winner = competition[1]
		}
		scores[winner] += 3
	}

	// Find best team
	bestTeam := ""
	bestScore := 0
	for team, score := range scores {
		if score > bestScore {
			bestScore = score
			bestTeam = team
		}
	}

	return bestTeam, scores
}

func main() {
	// Test 1: Basic tournament
	competitions1 := [][]string{
		{"HTML", "C#"},
		{"C#", "Python"},
		{"Python", "HTML"},
	}
	results1 := []int{0, 0, 1}
	winner1 := TournamentWinner(competitions1, results1)
	fmt.Printf("Test 1: %s\n", winner1) // Expected: Python

	// Test 2: Clear winner with all wins
	competitions2 := [][]string{
		{"A", "B"},
		{"A", "C"},
		{"A", "D"},
	}
	results2 := []int{1, 1, 1}
	winner2 := TournamentWinner(competitions2, results2)
	fmt.Printf("Test 2: %s\n", winner2) // Expected: A

	// Test 3: Away team dominance
	competitions3 := [][]string{
		{"Bulls", "Eagles"},
		{"Bulls", "Bears"},
		{"Bears", "Eagles"},
	}
	results3 := []int{0, 0, 0}
	winner3 := TournamentWinner(competitions3, results3)
	fmt.Printf("Test 3: %s\n", winner3) // Expected: Eagles

	// Test 4: Single competition
	competitions4 := [][]string{{"Team1", "Team2"}}
	results4 := []int{1}
	winner4 := TournamentWinner(competitions4, results4)
	fmt.Printf("Test 4: %s\n", winner4) // Expected: Team1

	// Test 5: With standings
	competitions5 := [][]string{
		{"A", "B"}, {"C", "D"}, {"E", "F"},
		{"A", "C"}, {"B", "D"}, {"E", "A"},
		{"F", "B"}, {"C", "E"}, {"D", "F"},
	}
	results5 := []int{1, 1, 1, 0, 1, 0, 1, 1, 0}
	winner5, standings := TournamentWinnerWithStandings(competitions5, results5)
	fmt.Printf("Test 5: %s\n", winner5)
	fmt.Printf("Standings: %v\n", standings)

	fmt.Println("\nAll tests completed!")
}
