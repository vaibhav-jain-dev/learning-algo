/*
0/1 Knapsack Problem - Go Solution

Find the maximum value that can fit in a knapsack with limited capacity.
Each item can only be selected once.

Time Complexity: O(n * capacity)
Space Complexity: O(n * capacity)
*/

package main

import "fmt"

// Item represents a knapsack item with value and weight
type Item struct {
	Value  int
	Weight int
}

// Knapsack solves 0/1 knapsack problem using bottom-up DP
// Returns (maxValue, selectedIndices)
func Knapsack(items []Item, capacity int) (int, []int) {
	if len(items) == 0 || capacity <= 0 {
		return 0, []int{}
	}

	n := len(items)

	// dp[i][w] = max value using first i items with capacity w
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, capacity+1)
	}

	// Fill the DP table
	for i := 1; i <= n; i++ {
		value := items[i-1].Value
		weight := items[i-1].Weight

		for w := 0; w <= capacity; w++ {
			// Don't include current item
			dp[i][w] = dp[i-1][w]

			// Include current item if it fits
			if weight <= w {
				dp[i][w] = max(dp[i][w], dp[i-1][w-weight]+value)
			}
		}
	}

	// Backtrack to find selected items
	indices := []int{}
	w := capacity

	for i := n; i > 0; i-- {
		if dp[i][w] != dp[i-1][w] {
			// Item i-1 was included
			indices = append(indices, i-1)
			w -= items[i-1].Weight
		}
	}

	// Reverse indices
	for left, right := 0, len(indices)-1; left < right; left, right = left+1, right-1 {
		indices[left], indices[right] = indices[right], indices[left]
	}

	return dp[n][capacity], indices
}

// KnapsackOptimized is a space-optimized version (returns only max value)
func KnapsackOptimized(items []Item, capacity int) int {
	if len(items) == 0 || capacity <= 0 {
		return 0
	}

	// Only need one row, process from right to left
	dp := make([]int, capacity+1)

	for _, item := range items {
		// Process from right to left to avoid using same item twice
		for w := capacity; w >= item.Weight; w-- {
			dp[w] = max(dp[w], dp[w-item.Weight]+item.Value)
		}
	}

	return dp[capacity]
}

// KnapsackRecursive uses top-down approach with memoization
func KnapsackRecursive(items []Item, capacity int) (int, []int) {
	if len(items) == 0 || capacity <= 0 {
		return 0, []int{}
	}

	n := len(items)
	memo := make(map[[2]int]int)

	var dp func(i, w int) int
	dp = func(i, w int) int {
		if i >= n || w <= 0 {
			return 0
		}

		key := [2]int{i, w}
		if val, exists := memo[key]; exists {
			return val
		}

		// Don't include current item
		result := dp(i+1, w)

		// Include current item if it fits
		if items[i].Weight <= w {
			result = max(result, items[i].Value+dp(i+1, w-items[i].Weight))
		}

		memo[key] = result
		return result
	}

	maxValue := dp(0, capacity)

	// Reconstruct solution
	indices := []int{}
	w := capacity

	for i := 0; i < n; i++ {
		key := [2]int{i, w}
		if _, exists := memo[key]; !exists {
			continue
		}

		// Check if this item was included
		without := 0
		if nextKey := ([2]int{i + 1, w}); true {
			without = memo[nextKey]
		}

		withItem := 0
		if items[i].Weight <= w {
			withItem = items[i].Value
			if nextKey := ([2]int{i + 1, w - items[i].Weight}); true {
				withItem += memo[nextKey]
			}
		}

		if withItem > without {
			indices = append(indices, i)
			w -= items[i].Weight
		}
	}

	return maxValue, indices
}

// KnapsackWithArrayInput accepts items as [][]int for convenience
func KnapsackWithArrayInput(items [][]int, capacity int) (int, []int) {
	converted := make([]Item, len(items))
	for i, item := range items {
		converted[i] = Item{Value: item[0], Weight: item[1]}
	}
	return Knapsack(converted, capacity)
}

// KnapsackDetail returns detailed information about the solution
type KnapsackResult struct {
	MaxValue          int
	Indices           []int
	SelectedItems     []Item
	TotalWeight       int
	RemainingCapacity int
}

func KnapsackWithDetail(items []Item, capacity int) KnapsackResult {
	maxValue, indices := Knapsack(items, capacity)

	selectedItems := make([]Item, len(indices))
	totalWeight := 0
	for i, idx := range indices {
		selectedItems[i] = items[idx]
		totalWeight += items[idx].Weight
	}

	return KnapsackResult{
		MaxValue:          maxValue,
		Indices:           indices,
		SelectedItems:     selectedItems,
		TotalWeight:       totalWeight,
		RemainingCapacity: capacity - totalWeight,
	}
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	// Test 1: Standard case
	items1 := []Item{{60, 10}, {100, 20}, {120, 30}}
	capacity1 := 50
	maxVal1, indices1 := Knapsack(items1, capacity1)
	fmt.Printf("Test 1: items=%v, capacity=%d\n", items1, capacity1)
	fmt.Printf("  Result: max_value=%d, indices=%v\n", maxVal1, indices1)
	selected1 := make([]Item, len(indices1))
	for i, idx := range indices1 {
		selected1[i] = items1[idx]
	}
	fmt.Printf("  Selected items: %v\n", selected1)
	// Expected: 220, [1, 2]

	// Test 2: Another case
	items2 := []Item{{10, 5}, {40, 4}, {30, 6}, {50, 3}}
	capacity2 := 10
	maxVal2, indices2 := Knapsack(items2, capacity2)
	fmt.Printf("\nTest 2: items=%v, capacity=%d\n", items2, capacity2)
	fmt.Printf("  Result: max_value=%d, indices=%v\n", maxVal2, indices2)
	// Expected: 90, [1, 3]

	// Test 3: Item too heavy
	items3 := []Item{{100, 50}}
	capacity3 := 10
	maxVal3, indices3 := Knapsack(items3, capacity3)
	fmt.Printf("\nTest 3: items=%v, capacity=%d\n", items3, capacity3)
	fmt.Printf("  Result: max_value=%d, indices=%v\n", maxVal3, indices3)
	// Expected: 0, []

	// Test 4: Empty items
	items4 := []Item{}
	capacity4 := 10
	maxVal4, indices4 := Knapsack(items4, capacity4)
	fmt.Printf("\nTest 4: items=%v, capacity=%d\n", items4, capacity4)
	fmt.Printf("  Result: max_value=%d, indices=%v\n", maxVal4, indices4)
	// Expected: 0, []

	// Test 5: All items fit
	items5 := []Item{{10, 2}, {20, 3}, {30, 4}}
	capacity5 := 10
	maxVal5, indices5 := Knapsack(items5, capacity5)
	fmt.Printf("\nTest 5: items=%v, capacity=%d\n", items5, capacity5)
	fmt.Printf("  Result: max_value=%d, indices=%v\n", maxVal5, indices5)
	// Expected: 60, [0, 1, 2]

	// Test 6: Compare methods
	items6 := []Item{{60, 10}, {100, 20}, {120, 30}}
	capacity6 := 50
	fmt.Printf("\nTest 6 - Method comparison for capacity=%d:\n", capacity6)
	val6a, idx6a := Knapsack(items6, capacity6)
	fmt.Printf("  Bottom-up: value=%d, indices=%v\n", val6a, idx6a)
	fmt.Printf("  Optimized (value only): %d\n", KnapsackOptimized(items6, capacity6))
	val6c, idx6c := KnapsackRecursive(items6, capacity6)
	fmt.Printf("  Recursive: value=%d, indices=%v\n", val6c, idx6c)

	// Test 7: Detailed output
	items7 := []Item{{60, 10}, {100, 20}, {120, 30}}
	capacity7 := 50
	detail := KnapsackWithDetail(items7, capacity7)
	fmt.Printf("\nTest 7 - Detailed output:\n")
	fmt.Printf("  MaxValue: %d\n", detail.MaxValue)
	fmt.Printf("  Indices: %v\n", detail.Indices)
	fmt.Printf("  SelectedItems: %v\n", detail.SelectedItems)
	fmt.Printf("  TotalWeight: %d\n", detail.TotalWeight)
	fmt.Printf("  RemainingCapacity: %d\n", detail.RemainingCapacity)

	// Test 8: Using array input
	items8 := [][]int{{60, 10}, {100, 20}, {120, 30}}
	capacity8 := 50
	val8, idx8 := KnapsackWithArrayInput(items8, capacity8)
	fmt.Printf("\nTest 8 - Array input: value=%d, indices=%v\n", val8, idx8)

	fmt.Println("\nAll tests completed!")
}
