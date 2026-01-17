/*
Min Number Of Coins For Change - Go Solution

Find minimum coins needed to make a target amount.

Time Complexity: O(n * d) where d is number of denominations
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"math"
)

// MinNumberOfCoinsForChange finds minimum coins to make target amount
func MinNumberOfCoinsForChange(n int, denoms []int) int {
	// dp[i] = min coins to make amount i
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = math.MaxInt32
	}
	dp[0] = 0 // Base case: 0 coins for amount 0

	for amount := 1; amount <= n; amount++ {
		for _, coin := range denoms {
			if coin <= amount && dp[amount-coin] != math.MaxInt32 {
				if dp[amount-coin]+1 < dp[amount] {
					dp[amount] = dp[amount-coin] + 1
				}
			}
		}
	}

	if dp[n] == math.MaxInt32 {
		return -1
	}
	return dp[n]
}

// MinCoinsWithSolution returns both min coins and the actual coins used
func MinCoinsWithSolution(n int, denoms []int) (int, []int) {
	dp := make([]int, n+1)
	parent := make([]int, n+1)
	for i := range dp {
		dp[i] = math.MaxInt32
		parent[i] = -1
	}
	dp[0] = 0

	for amount := 1; amount <= n; amount++ {
		for _, coin := range denoms {
			if coin <= amount && dp[amount-coin] != math.MaxInt32 {
				if dp[amount-coin]+1 < dp[amount] {
					dp[amount] = dp[amount-coin] + 1
					parent[amount] = coin
				}
			}
		}
	}

	if dp[n] == math.MaxInt32 {
		return -1, []int{}
	}

	// Reconstruct solution
	coinsUsed := []int{}
	current := n
	for current > 0 {
		coin := parent[current]
		coinsUsed = append(coinsUsed, coin)
		current -= coin
	}

	return dp[n], coinsUsed
}

func main() {
	// Test 1: Standard case
	result1 := MinNumberOfCoinsForChange(7, []int{1, 5, 10})
	fmt.Printf("Test 1 (n=7, [1,5,10]): %d\n", result1) // Expected: 3 (5+1+1)

	// Test 2: Optimal uses larger coins
	result2 := MinNumberOfCoinsForChange(6, []int{1, 2, 4})
	fmt.Printf("Test 2 (n=6, [1,2,4]): %d\n", result2) // Expected: 2 (4+2)

	// Test 3: Impossible
	result3 := MinNumberOfCoinsForChange(3, []int{2})
	fmt.Printf("Test 3 (n=3, [2]): %d\n", result3) // Expected: -1

	// Test 4: Zero amount
	result4 := MinNumberOfCoinsForChange(0, []int{1, 2, 3})
	fmt.Printf("Test 4 (n=0, [1,2,3]): %d\n", result4) // Expected: 0

	// Test 5: Exact match with one coin
	result5 := MinNumberOfCoinsForChange(10, []int{1, 5, 10})
	fmt.Printf("Test 5 (n=10, [1,5,10]): %d\n", result5) // Expected: 1

	// Test 6: Only single denomination
	result6 := MinNumberOfCoinsForChange(12, []int{3})
	fmt.Printf("Test 6 (n=12, [3]): %d\n", result6) // Expected: 4

	// Test 7: Classic coin change
	result7 := MinNumberOfCoinsForChange(11, []int{1, 5, 6, 9})
	fmt.Printf("Test 7 (n=11, [1,5,6,9]): %d\n", result7) // Expected: 2 (5+6)

	// Test 8: With solution reconstruction
	n8 := 15
	denoms8 := []int{1, 5, 10, 25}
	count, coins := MinCoinsWithSolution(n8, denoms8)
	fmt.Printf("\nTest 8 (n=%d, %v):\n", n8, denoms8)
	fmt.Printf("  Min coins: %d\n", count)
	fmt.Printf("  Coins used: %v\n", coins)
	sum := 0
	for _, c := range coins {
		sum += c
	}
	fmt.Printf("  Sum: %d\n", sum)

	// Test 9: Greedy doesn't work
	result9 := MinNumberOfCoinsForChange(6, []int{1, 3, 4})
	fmt.Printf("\nTest 9 (n=6, [1,3,4]): %d\n", result9) // Expected: 2 (3+3)
	// Note: Greedy would give 3 (4+1+1)

	fmt.Println("\nAll tests completed!")
}
