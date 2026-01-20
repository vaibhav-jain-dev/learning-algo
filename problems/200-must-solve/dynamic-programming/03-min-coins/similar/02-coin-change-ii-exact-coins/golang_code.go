/*
Coin Change II - Exact Coins - Go Solutions

Given coins, amount, and k, determine if we can make amount using exactly k coins.
Variation of coin change where we must use a specific number of coins.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: 2D Dynamic Programming (Bottom-Up)
// ============================================================================
// Time Complexity:  O(amount * k * len(coins))
// Space Complexity: O(amount * k)
//
// WHY THIS IS BEST:
// - Clear state representation: dp[amt][coins_used]
// - Easy to understand transitions
// - Supports reconstruction of solution
// ============================================================================

// CanMakeExactCoins determines if amount can be made using exactly k coins.
//
// Key Insight: Need 2D DP - track both amount AND coin count.
//
// Visual for amount=11, coins=[1,2,5], k=3:
//
//	dp[11][3] = dp[10][2] OR dp[9][2] OR dp[6][2]
//	Since dp[10][2] = True (5+5), answer is True
//	Solution: 5 + 5 + 1 = 11
func CanMakeExactCoins(amount int, coins []int, k int) bool {
	// dp[i][j] = true if we can make amount i using exactly j coins
	dp := make([][]bool, amount+1)
	for i := range dp {
		dp[i] = make([]bool, k+1)
	}

	// Base case: 0 amount with 0 coins is achievable
	dp[0][0] = true

	// Fill the DP table
	for amt := 1; amt <= amount; amt++ {
		for numCoins := 1; numCoins <= k; numCoins++ {
			for _, coin := range coins {
				if coin <= amt && dp[amt-coin][numCoins-1] {
					dp[amt][numCoins] = true
					break // Found one way, no need to continue
				}
			}
		}
	}

	return dp[amount][k]
}

// ============================================================================
// APPROACH 2: 2D DP with Solution Reconstruction
// ============================================================================
// Time Complexity:  O(amount * k * len(coins))
// Space Complexity: O(amount * k)
//
// WHEN TO USE:
// - When you need to return the actual coins used
// - Interview follow-up question
// ============================================================================

// ParentInfo stores reconstruction information
type ParentInfo struct {
	prevAmt   int
	prevCoins int
	coinUsed  int
}

// MakeExactCoinsWithSolution returns (is_possible, coins_used).
func MakeExactCoinsWithSolution(amount int, coins []int, k int) (bool, []int) {
	// dp[i][j] = true if we can make amount i using exactly j coins
	dp := make([][]bool, amount+1)
	// parent[i][j] = info about coin used to reach state (i, j)
	parent := make([][]ParentInfo, amount+1)

	for i := range dp {
		dp[i] = make([]bool, k+1)
		parent[i] = make([]ParentInfo, k+1)
		for j := range parent[i] {
			parent[i][j] = ParentInfo{-1, -1, -1}
		}
	}

	dp[0][0] = true

	for amt := 1; amt <= amount; amt++ {
		for numCoins := 1; numCoins <= k; numCoins++ {
			for _, coin := range coins {
				if coin <= amt && dp[amt-coin][numCoins-1] {
					dp[amt][numCoins] = true
					parent[amt][numCoins] = ParentInfo{amt - coin, numCoins - 1, coin}
					break
				}
			}
		}
	}

	if !dp[amount][k] {
		return false, nil
	}

	// Reconstruct the solution
	result := []int{}
	currAmt, currCoins := amount, k
	for currCoins > 0 {
		info := parent[currAmt][currCoins]
		result = append(result, info.coinUsed)
		currAmt, currCoins = info.prevAmt, info.prevCoins
	}

	return true, result
}

// ============================================================================
// APPROACH 3: Memoization (Top-Down)
// ============================================================================
// Time Complexity:  O(amount * k * len(coins))
// Space Complexity: O(amount * k)
//
// WHEN TO USE:
// - More intuitive recursive thinking
// - When only subset of states are needed
// ============================================================================

// CanMakeExactCoinsMemo uses top-down DP with memoization.
func CanMakeExactCoinsMemo(amount int, coins []int, k int) bool {
	// Memo: -1 = unvisited, 0 = false, 1 = true
	memo := make([][]int, amount+1)
	for i := range memo {
		memo[i] = make([]int, k+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}

	var dp func(remaining, coinsLeft int) bool
	dp = func(remaining, coinsLeft int) bool {
		// Base cases
		if remaining == 0 && coinsLeft == 0 {
			return true
		}
		if remaining <= 0 || coinsLeft <= 0 {
			return false
		}

		// Check memo
		if memo[remaining][coinsLeft] != -1 {
			return memo[remaining][coinsLeft] == 1
		}

		// Try each coin
		result := false
		for _, coin := range coins {
			if coin <= remaining && dp(remaining-coin, coinsLeft-1) {
				result = true
				break
			}
		}

		// Store in memo
		if result {
			memo[remaining][coinsLeft] = 1
		} else {
			memo[remaining][coinsLeft] = 0
		}

		return result
	}

	return dp(amount, k)
}

// ============================================================================
// APPROACH 4: Space-Optimized DP
// ============================================================================
// Time Complexity:  O(amount * k * len(coins))
// Space Complexity: O(amount)
//
// WHEN TO USE:
// - When memory is constrained
// - When only feasibility check needed (no reconstruction)
// ============================================================================

// CanMakeExactCoinsOptimized uses space-optimized rolling arrays.
func CanMakeExactCoinsOptimized(amount int, coins []int, k int) bool {
	// prev[amt] = true if amt reachable with (j-1) coins
	prev := make([]bool, amount+1)
	prev[0] = true

	for i := 0; i < k; i++ {
		curr := make([]bool, amount+1)
		for amt := 0; amt <= amount; amt++ {
			if !prev[amt] {
				continue
			}
			for _, coin := range coins {
				if amt+coin <= amount {
					curr[amt+coin] = true
				}
			}
		}
		prev = curr
	}

	return prev[amount]
}

// ============================================================================
// APPROACH 5: Count All Solutions
// ============================================================================
// Time Complexity:  O(amount * k * len(coins))
// Space Complexity: O(amount * k)
//
// WHEN TO USE:
// - When you need to count the number of ways
// ============================================================================

// CountExactCoinWays counts the number of ways to make amount with exactly k coins.
// Note: This counts permutations (order matters) since we can reuse positions.
func CountExactCoinWays(amount int, coins []int, k int) int {
	// dp[i][j] = number of ways to make amount i using exactly j coins
	dp := make([][]int, amount+1)
	for i := range dp {
		dp[i] = make([]int, k+1)
	}
	dp[0][0] = 1

	for amt := 1; amt <= amount; amt++ {
		for numCoins := 1; numCoins <= k; numCoins++ {
			for _, coin := range coins {
				if coin <= amt {
					dp[amt][numCoins] += dp[amt-coin][numCoins-1]
				}
			}
		}
	}

	return dp[amount][k]
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		amount   int
		coins    []int
		k        int
		expected bool
		desc     string
	}{
		{11, []int{1, 2, 5}, 3, true, "Example 1: 5+5+1"},
		{10, []int{2, 5}, 2, true, "Example 2: 5+5"},
		{7, []int{2, 4}, 3, false, "Example 3: Impossible"},
		{6, []int{1, 2, 3}, 3, true, "Example 4: Multiple solutions"},
		{0, []int{1, 2}, 0, true, "Edge: 0 amount, 0 coins"},
		{5, []int{1, 2}, 0, false, "Edge: positive amount, 0 coins"},
		{0, []int{1}, 1, false, "Edge: 0 amount, 1 coin"},
		{3, []int{1}, 3, true, "All ones: 1+1+1"},
		{4, []int{2}, 2, true, "Single coin: 2+2"},
		{5, []int{2}, 2, false, "Single coin: impossible"},
	}

	approaches := []struct {
		name string
		fn   func(int, []int, int) bool
	}{
		{"2D DP", CanMakeExactCoins},
		{"Memoization", CanMakeExactCoinsMemo},
		{"Space-Optimized", CanMakeExactCoinsOptimized},
	}

	fmt.Println("======================================================================")
	fmt.Println("COIN CHANGE II (EXACT COINS) - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.amount, tc.coins, tc.k)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Show solutions with reconstruction
	fmt.Println("\n======================================================================")
	fmt.Println("SOLUTION RECONSTRUCTION")
	fmt.Println("======================================================================")

	examples := []struct {
		amount int
		coins  []int
		k      int
	}{
		{11, []int{1, 2, 5}, 3},
		{10, []int{2, 5}, 2},
		{6, []int{1, 2, 3}, 3},
	}

	for _, ex := range examples {
		possible, solution := MakeExactCoinsWithSolution(ex.amount, ex.coins, ex.k)
		fmt.Printf("\namount=%d, coins=%v, k=%d\n", ex.amount, ex.coins, ex.k)
		if possible {
			sum := 0
			expr := ""
			for i, coin := range solution {
				sum += coin
				if i > 0 {
					expr += " + "
				}
				expr += fmt.Sprintf("%d", coin)
			}
			fmt.Printf("Solution: %s = %d\n", expr, sum)
		} else {
			fmt.Println("No solution exists")
		}
	}

	// Show counting
	fmt.Println("\n======================================================================")
	fmt.Println("COUNTING SOLUTIONS")
	fmt.Println("======================================================================")

	countExamples := []struct {
		amount int
		coins  []int
		k      int
	}{
		{6, []int{1, 2, 3}, 3},
		{4, []int{1, 2}, 2},
	}

	for _, ex := range countExamples {
		count := CountExactCoinWays(ex.amount, ex.coins, ex.k)
		fmt.Printf("\namount=%d, coins=%v, k=%d\n", ex.amount, ex.coins, ex.k)
		fmt.Printf("Number of ways (permutations): %d\n", count)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	amount, coins, k := 11, []int{1, 2, 5}, 3
	fmt.Printf("\nInput: amount=%d, coins=%v, k=%d\n", amount, coins, k)
	fmt.Printf("Output: %v\n", CanMakeExactCoins(amount, coins, k))

	// Sample Input 2
	amount, coins, k = 7, []int{2, 4}, 3
	fmt.Printf("\nInput: amount=%d, coins=%v, k=%d\n", amount, coins, k)
	fmt.Printf("Output: %v\n", CanMakeExactCoins(amount, coins, k))
}
