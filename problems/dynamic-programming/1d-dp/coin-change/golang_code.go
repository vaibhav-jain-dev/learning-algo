/*
Coin Change - Dynamic Programming Solution

Problem: Find the minimum number of coins needed to make up a given amount.
Return -1 if it's not possible.
*/

package main

import "fmt"

// coinChangeDP uses bottom-up dynamic programming.
// Time Complexity: O(amount * len(coins))
// Space Complexity: O(amount)
func coinChangeDP(coins []int, amount int) int {
	// dp[i] = minimum coins needed for amount i
	// Initialize with amount + 1 (impossible value)
	dp := make([]int, amount+1)
	for i := range dp {
		dp[i] = amount + 1
	}
	dp[0] = 0 // 0 coins needed for amount 0

	for i := 1; i <= amount; i++ {
		for _, coin := range coins {
			if coin <= i && dp[i-coin]+1 < dp[i] {
				dp[i] = dp[i-coin] + 1
			}
		}
	}

	if dp[amount] > amount {
		return -1
	}
	return dp[amount]
}

// coinChangeMemo uses top-down DP with memoization.
// Time Complexity: O(amount * len(coins))
// Space Complexity: O(amount)
func coinChangeMemo(coins []int, amount int) int {
	memo := make(map[int]int)

	var helper func(remaining int) int
	helper = func(remaining int) int {
		if remaining == 0 {
			return 0
		}
		if remaining < 0 {
			return -1
		}

		if val, exists := memo[remaining]; exists {
			return val
		}

		minCoins := -1
		for _, coin := range coins {
			result := helper(remaining - coin)
			if result >= 0 {
				if minCoins == -1 || result+1 < minCoins {
					minCoins = result + 1
				}
			}
		}

		memo[remaining] = minCoins
		return minCoins
	}

	return helper(amount)
}

// coinChangeBFS uses BFS to find minimum coins as shortest path.
// Time Complexity: O(amount * len(coins))
// Space Complexity: O(amount)
func coinChangeBFS(coins []int, amount int) int {
	if amount == 0 {
		return 0
	}

	visited := make(map[int]bool)
	visited[0] = true

	// Queue: each element is (current_amount, num_coins)
	type state struct {
		amount   int
		numCoins int
	}

	queue := []state{{0, 0}}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		for _, coin := range coins {
			newAmount := current.amount + coin

			if newAmount == amount {
				return current.numCoins + 1
			}

			if newAmount < amount && !visited[newAmount] {
				visited[newAmount] = true
				queue = append(queue, state{newAmount, current.numCoins + 1})
			}
		}
	}

	return -1
}

func main() {
	testCases := []struct {
		coins    []int
		amount   int
		expected int
	}{
		{[]int{1, 2, 5}, 11, 3},
		{[]int{2}, 3, -1},
		{[]int{1}, 0, 0},
		{[]int{1, 5, 10, 25}, 30, 2},
		{[]int{1}, 1, 1},
		{[]int{1}, 2, 2},
		{[]int{2, 5, 10, 1}, 27, 4},
		{[]int{186, 419, 83, 408}, 6249, 20},
		{[]int{1, 2, 5}, 100, 20},
		{[]int{3, 7}, 11, -1},
	}

	fmt.Println("============================================================")
	fmt.Println("COIN CHANGE - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for _, tc := range testCases {
		resultDP := coinChangeDP(tc.coins, tc.amount)
		resultMemo := coinChangeMemo(tc.coins, tc.amount)
		resultBFS := coinChangeBFS(tc.coins, tc.amount)

		status := "PASS"
		if resultDP != tc.expected || resultMemo != tc.expected || resultBFS != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\ncoins = %v, amount = %d\n", tc.coins, tc.amount)
		fmt.Printf("  Expected:  %d\n", tc.expected)
		fmt.Printf("  DP:        %d\n", resultDP)
		fmt.Printf("  Memoized:  %d\n", resultMemo)
		fmt.Printf("  BFS:       %d\n", resultBFS)
		fmt.Printf("  Status:    %s\n", status)
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("All tests passed!")
	} else {
		fmt.Println("Some tests failed!")
	}
	fmt.Println("============================================================")
}
