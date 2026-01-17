/*
Minimum Matches to Guarantee Winner - Go Solutions

Given n teams and current scores, find minimum remaining matches
to guarantee a single winner.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Greedy Elimination ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n log n)
// Space Complexity: O(n)
// ============================================================================

// MinMatchesToGuaranteeWinner finds minimum matches needed.
func MinMatchesToGuaranteeWinner(scores []int, pointsPerWin int) int {
	if len(scores) <= 1 {
		return 0
	}

	// Sort descending
	sorted := make([]int, len(scores))
	copy(sorted, scores)
	sort.Sort(sort.Reverse(sort.IntSlice(sorted)))

	matches := 0
	leader := sorted[0]

	// Keep playing until leader can't be caught
	for {
		maxOther := sorted[1]
		if leader > maxOther+pointsPerWin*(len(sorted)-1) {
			break
		}

		// Leader needs to play and win
		matches++
		leader += pointsPerWin

		// Someone else might also win
		if len(sorted) > 2 {
			sorted[1] += pointsPerWin
			matches++
		}

		// Re-sort to maintain order
		sort.Sort(sort.Reverse(sort.IntSlice(sorted)))
		leader = sorted[0]
	}

	return matches
}

// MinMatchesSimple: simpler version assuming 3 points per win
func MinMatchesSimple(scores []int) int {
	if len(scores) <= 1 {
		return 0
	}

	sorted := make([]int, len(scores))
	copy(sorted, scores)
	sort.Sort(sort.Reverse(sort.IntSlice(sorted)))

	maxScore := sorted[0]
	matches := 0

	// Check if anyone can catch the leader
	for i := 1; i < len(sorted); i++ {
		if sorted[i]+3 >= maxScore {
			// This team can still potentially tie/win
			// Leader must win against them
			matches++
			maxScore += 3
		}
	}

	return matches
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("MINIMUM MATCHES TO GUARANTEE WINNER - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		scores   []int
		expected int
		desc     string
	}{
		{[]int{10, 7, 5}, 1, "Leader just needs 1 win"},
		{[]int{6, 6, 6}, 2, "Three-way tie"},
		{[]int{10, 3, 2}, 0, "Already guaranteed"},
		{[]int{5}, 0, "Single team"},
	}

	for _, tc := range testCases {
		result := MinMatchesSimple(tc.scores)
		status := "✓"
		if result != tc.expected {
			status = "✗"
		}
		fmt.Printf("%s %s: scores=%v → %d matches\n", status, tc.desc, tc.scores, result)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	scores := []int{10, 7, 5}
	fmt.Printf("\nInput: scores = %v\n", scores)
	fmt.Printf("Output: %d\n", MinMatchesSimple(scores))
}
