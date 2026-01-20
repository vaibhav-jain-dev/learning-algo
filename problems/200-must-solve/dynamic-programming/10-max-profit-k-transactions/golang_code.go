/*
Max Profit With K Transactions - Go Solution

Find the maximum profit from at most k stock buy-sell transactions.

Time Complexity: O(n * k)
Space Complexity: O(n * k), can be optimized to O(n)
*/

package main

import (
	"fmt"
	"math"
)

// MaxProfitWithKTransactions finds maximum profit with at most k transactions
func MaxProfitWithKTransactions(prices []int, k int) int {
	if len(prices) == 0 || k <= 0 {
		return 0
	}

	n := len(prices)

	// If k >= n/2, we can make as many transactions as we want
	// Use greedy approach - capture all positive differences
	if k >= n/2 {
		profit := 0
		for i := 0; i < n-1; i++ {
			if prices[i+1] > prices[i] {
				profit += prices[i+1] - prices[i]
			}
		}
		return profit
	}

	// dp[t][d] = max profit with at most t transactions by end of day d
	dp := make([][]int, k+1)
	for t := range dp {
		dp[t] = make([]int, n)
	}

	for t := 1; t <= k; t++ {
		// maxSoFar tracks max(dp[t-1][j] - prices[j]) for optimization
		maxSoFar := dp[t-1][0] - prices[0]

		for d := 1; d < n; d++ {
			// Either don't trade on day d, or sell on day d
			dp[t][d] = max(dp[t][d-1], prices[d]+maxSoFar)

			// Update maxSoFar for next iteration
			maxSoFar = max(maxSoFar, dp[t-1][d]-prices[d])
		}
	}

	return dp[k][n-1]
}

// MaxProfitBasic is the basic O(n^2 * k) version without optimization
func MaxProfitBasic(prices []int, k int) int {
	if len(prices) == 0 || k <= 0 {
		return 0
	}

	n := len(prices)
	dp := make([][]int, k+1)
	for t := range dp {
		dp[t] = make([]int, n)
	}

	for t := 1; t <= k; t++ {
		for d := 1; d < n; d++ {
			// Option 1: Don't trade on day d
			dp[t][d] = dp[t][d-1]

			// Option 2: Sell on day d, having bought on some day j
			for j := 0; j < d; j++ {
				profitIfBuyOnJ := prices[d] - prices[j]
				profitBefore := 0
				if j > 0 {
					profitBefore = dp[t-1][j-1]
				}
				dp[t][d] = max(dp[t][d], profitIfBuyOnJ+profitBefore)
			}
		}
	}

	return dp[k][n-1]
}

// MaxProfitRecursive uses top-down approach with memoization
func MaxProfitRecursive(prices []int, k int) int {
	if len(prices) == 0 || k <= 0 {
		return 0
	}

	n := len(prices)
	memo := make(map[[3]int]int)

	var dp func(day, transactionsLeft int, holding bool) int
	dp = func(day, transactionsLeft int, holding bool) int {
		if day >= n || transactionsLeft <= 0 {
			return 0
		}

		holdingInt := 0
		if holding {
			holdingInt = 1
		}
		key := [3]int{day, transactionsLeft, holdingInt}
		if val, exists := memo[key]; exists {
			return val
		}

		// Option 1: Do nothing
		result := dp(day+1, transactionsLeft, holding)

		if holding {
			// Option 2: Sell
			result = max(result, prices[day]+dp(day+1, transactionsLeft-1, false))
		} else {
			// Option 2: Buy
			result = max(result, -prices[day]+dp(day+1, transactionsLeft, true))
		}

		memo[key] = result
		return result
	}

	return dp(0, k, false)
}

// Transaction represents a buy-sell pair
type Transaction struct {
	BuyDay  int
	SellDay int
}

// MaxProfitWithTransactions returns both max profit and the buy-sell day pairs
func MaxProfitWithTransactions(prices []int, k int) (int, []Transaction) {
	if len(prices) == 0 || k <= 0 {
		return 0, []Transaction{}
	}

	n := len(prices)

	// For unlimited transactions case
	if k >= n/2 {
		var transactions []Transaction
		profit := 0
		i := 0
		for i < n-1 {
			// Find local minimum (buy point)
			for i < n-1 && prices[i+1] <= prices[i] {
				i++
			}
			buy := i

			// Find local maximum (sell point)
			for i < n-1 && prices[i+1] >= prices[i] {
				i++
			}
			sell := i

			if buy < sell {
				profit += prices[sell] - prices[buy]
				transactions = append(transactions, Transaction{buy, sell})
			}
		}
		return profit, transactions
	}

	// Track the decision for reconstruction
	dp := make([][]int, k+1)
	type decision struct {
		action  string
		buyDay  int
	}
	decisions := make([][]*decision, k+1)

	for t := range dp {
		dp[t] = make([]int, n)
		decisions[t] = make([]*decision, n)
	}

	for t := 1; t <= k; t++ {
		maxSoFar := -prices[0]
		bestBuyDay := 0

		for d := 1; d < n; d++ {
			if dp[t][d-1] >= prices[d]+maxSoFar {
				dp[t][d] = dp[t][d-1]
				decisions[t][d] = &decision{"hold", -1}
			} else {
				dp[t][d] = prices[d] + maxSoFar
				decisions[t][d] = &decision{"sell", bestBuyDay}
			}

			if dp[t-1][d]-prices[d] > maxSoFar {
				maxSoFar = dp[t-1][d] - prices[d]
				bestBuyDay = d
			}
		}
	}

	// Reconstruct transactions
	var transactions []Transaction
	t := k
	d := n - 1

	for t > 0 && d > 0 {
		if decisions[t][d] != nil && decisions[t][d].action == "sell" {
			buyDay := decisions[t][d].buyDay
			transactions = append(transactions, Transaction{buyDay, d})
			d = buyDay - 1
			t--
		} else {
			d--
		}
	}

	// Reverse transactions
	for left, right := 0, len(transactions)-1; left < right; left, right = left+1, right-1 {
		transactions[left], transactions[right] = transactions[right], transactions[left]
	}

	return dp[k][n-1], transactions
}

// MaxProfitSpaceOptimized uses O(k) space
func MaxProfitSpaceOptimized(prices []int, k int) int {
	if len(prices) == 0 || k <= 0 {
		return 0
	}

	n := len(prices)

	if k >= n/2 {
		profit := 0
		for i := 0; i < n-1; i++ {
			if prices[i+1] > prices[i] {
				profit += prices[i+1] - prices[i]
			}
		}
		return profit
	}

	// buy[t] = max profit after buying for transaction t
	// sell[t] = max profit after selling for transaction t
	buy := make([]int, k+1)
	sell := make([]int, k+1)

	for t := range buy {
		buy[t] = math.MinInt32
	}

	for _, price := range prices {
		for t := 1; t <= k; t++ {
			buy[t] = max(buy[t], sell[t-1]-price)
			sell[t] = max(sell[t], buy[t]+price)
		}
	}

	return sell[k]
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	// Test 1: Standard case
	prices1 := []int{5, 11, 3, 50, 60, 90}
	k1 := 2
	result1 := MaxProfitWithKTransactions(prices1, k1)
	fmt.Printf("Test 1: prices=%v, k=%d\n", prices1, k1)
	fmt.Printf("  Max profit: %d\n", result1)
	// Expected: 93 (buy at 5, sell at 11, buy at 3, sell at 90)

	// Test 2: Single transaction
	prices2 := []int{3, 2, 5, 7, 1, 3}
	k2 := 1
	result2 := MaxProfitWithKTransactions(prices2, k2)
	fmt.Printf("\nTest 2: prices=%v, k=%d\n", prices2, k2)
	fmt.Printf("  Max profit: %d\n", result2)
	// Expected: 5 (buy at 2, sell at 7)

	// Test 3: Increasing prices
	prices3 := []int{1, 2, 3, 4, 5}
	k3 := 2
	result3 := MaxProfitWithKTransactions(prices3, k3)
	fmt.Printf("\nTest 3: prices=%v, k=%d\n", prices3, k3)
	fmt.Printf("  Max profit: %d\n", result3)
	// Expected: 4 (buy at 1, sell at 5)

	// Test 4: Decreasing prices (no profit)
	prices4 := []int{5, 4, 3, 2, 1}
	k4 := 2
	result4 := MaxProfitWithKTransactions(prices4, k4)
	fmt.Printf("\nTest 4: prices=%v, k=%d\n", prices4, k4)
	fmt.Printf("  Max profit: %d\n", result4)
	// Expected: 0

	// Test 5: Compare methods
	prices5 := []int{5, 11, 3, 50, 60, 90}
	k5 := 2
	fmt.Printf("\nTest 5 - Method comparison for prices=%v, k=%d:\n", prices5, k5)
	fmt.Printf("  Optimized: %d\n", MaxProfitWithKTransactions(prices5, k5))
	fmt.Printf("  Basic: %d\n", MaxProfitBasic(prices5, k5))
	fmt.Printf("  Recursive: %d\n", MaxProfitRecursive(prices5, k5))
	fmt.Printf("  Space optimized: %d\n", MaxProfitSpaceOptimized(prices5, k5))

	// Test 6: Get actual transactions
	prices6 := []int{5, 11, 3, 50, 60, 90}
	k6 := 2
	profit, transactions := MaxProfitWithTransactions(prices6, k6)
	fmt.Printf("\nTest 6 - With transactions for prices=%v, k=%d:\n", prices6, k6)
	fmt.Printf("  Max profit: %d\n", profit)
	fmt.Printf("  Transactions: %v\n", transactions)
	for _, t := range transactions {
		fmt.Printf("    Buy on day %d at $%d, sell on day %d at $%d\n",
			t.BuyDay, prices6[t.BuyDay], t.SellDay, prices6[t.SellDay])
	}

	// Test 7: Large k (unlimited transactions)
	prices7 := []int{1, 5, 2, 8, 3, 10}
	k7 := 100
	result7 := MaxProfitWithKTransactions(prices7, k7)
	fmt.Printf("\nTest 7: prices=%v, k=%d\n", prices7, k7)
	fmt.Printf("  Max profit: %d\n", result7)
	// Expected: (5-1) + (8-2) + (10-3) = 4 + 6 + 7 = 17

	// Test 8: Edge cases
	fmt.Printf("\nTest 8 - Edge cases:\n")
	fmt.Printf("  Empty prices: %d\n", MaxProfitWithKTransactions([]int{}, 2))
	fmt.Printf("  k=0: %d\n", MaxProfitWithKTransactions([]int{1, 2, 3}, 0))
	fmt.Printf("  Single price: %d\n", MaxProfitWithKTransactions([]int{5}, 2))

	fmt.Println("\nAll tests completed!")
}
