/*
Blackjack Probability - Go Solution

Calculate the probability of busting in a simplified blackjack game.
*/

package main

import (
	"fmt"
	"math"
)

// BlackjackProbability calculates the probability of busting.
// You draw cards (values 1-10, each with 1/10 probability) until
// hand value >= target. Returns probability of exceeding target.
func BlackjackProbability(target, startingHand int) float64 {
	memo := make(map[int]float64)
	return calculateBustProb(target, startingHand, memo)
}

// calculateBustProb recursively calculates bust probability with memoization
func calculateBustProb(target, currentHand int, memo map[int]float64) float64 {
	// Base case: we've stopped drawing
	if currentHand >= target {
		if currentHand > target {
			return 1.0 // Busted
		}
		return 0.0 // Stopped at exactly target
	}

	// Check memo
	if prob, exists := memo[currentHand]; exists {
		return prob
	}

	// Recursive case: try each card (1-10)
	totalProb := 0.0
	for card := 1; card <= 10; card++ {
		totalProb += calculateBustProb(target, currentHand+card, memo)
	}

	bustProb := totalProb / 10.0
	memo[currentHand] = bustProb
	return bustProb
}

// BlackjackProbabilityIterative uses bottom-up dynamic programming.
func BlackjackProbabilityIterative(target, startingHand int) float64 {
	// dp[h] = probability of busting from hand value h
	maxHand := target + 10
	dp := make([]float64, maxHand+1)

	// Initialize: hands > target have busted (prob = 1)
	for h := target + 1; h <= maxHand; h++ {
		dp[h] = 1.0
	}
	// dp[target] = 0.0 (stopped at exactly target)

	// Fill backwards from target - 1 to startingHand
	for h := target - 1; h >= startingHand; h-- {
		total := 0.0
		for card := 1; card <= 10; card++ {
			nextHand := h + card
			if nextHand > maxHand {
				total += 1.0 // Would bust
			} else {
				total += dp[nextHand]
			}
		}
		dp[h] = total / 10.0
	}

	return dp[startingHand]
}

// BlackjackProbabilityFunctional uses a closure for cleaner recursion
func BlackjackProbabilityFunctional(target, startingHand int) float64 {
	memo := make(map[int]float64)

	var calc func(hand int) float64
	calc = func(hand int) float64 {
		if hand >= target {
			if hand > target {
				return 1.0
			}
			return 0.0
		}

		if prob, ok := memo[hand]; ok {
			return prob
		}

		total := 0.0
		for card := 1; card <= 10; card++ {
			total += calc(hand + card)
		}

		memo[hand] = total / 10.0
		return memo[hand]
	}

	return calc(startingHand)
}

// printProbabilityTable prints bust probabilities for different starting hands
func printProbabilityTable(target int) {
	fmt.Printf("\nBust probabilities for target = %d:\n", target)
	fmt.Println("----------------------------------------")
	fmt.Printf("%-15s %-15s\n", "Starting Hand", "Bust Probability")
	fmt.Println("----------------------------------------")

	for hand := 1; hand <= target; hand++ {
		prob := BlackjackProbability(target, hand)
		fmt.Printf("%-15d %-15.6f\n", hand, prob)
	}
}

func main() {
	// Test cases
	testCases := []struct {
		target       int
		startingHand int
	}{
		{21, 15},
		{21, 21},
		{21, 22},
		{17, 12},
		{21, 10},
		{21, 1},
	}

	fmt.Println("Blackjack Probability Tests")
	fmt.Println("==================================================")

	for _, tc := range testCases {
		probMemo := BlackjackProbability(tc.target, tc.startingHand)
		probIter := BlackjackProbabilityIterative(tc.target, tc.startingHand)
		probFunc := BlackjackProbabilityFunctional(tc.target, tc.startingHand)

		fmt.Printf("\nTarget: %d, Starting Hand: %d\n", tc.target, tc.startingHand)
		fmt.Printf("  Memoization:  %.6f\n", probMemo)
		fmt.Printf("  Iterative:    %.6f\n", probIter)
		fmt.Printf("  Functional:   %.6f\n", probFunc)

		// Verify all methods give same result
		if math.Abs(probMemo-probIter) > 1e-9 || math.Abs(probMemo-probFunc) > 1e-9 {
			fmt.Println("  ERROR: Results don't match!")
		}
	}

	fmt.Println("\n==================================================")
	fmt.Println("All tests passed!")

	// Print probability table for target = 21
	printProbabilityTable(21)
}
