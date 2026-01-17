/*
Non-Constructible Change - Go Solution

Find the minimum amount of change that cannot be created from given coins.

Time Complexity: O(n log n) for sorting
Space Complexity: O(1) - sorting in place
*/

package main

import (
	"fmt"
	"sort"
)

// NonConstructibleChange finds minimum change that cannot be created
func NonConstructibleChange(coins []int) int {
	if len(coins) == 0 {
		return 1
	}

	sort.Ints(coins)
	currentChange := 0

	for _, coin := range coins {
		// If current coin is larger than currentChange + 1,
		// we cannot make currentChange + 1
		if coin > currentChange+1 {
			return currentChange + 1
		}

		// We can extend our range by adding this coin
		currentChange += coin
	}

	// We can make all values from 1 to currentChange
	// So the answer is currentChange + 1
	return currentChange + 1
}

// NonConstructibleChangeExplained same algorithm with detailed explanation
func NonConstructibleChangeExplained(coins []int) int {
	if len(coins) == 0 {
		return 1
	}

	sort.Ints(coins)
	fmt.Printf("Sorted coins: %v\n", coins)

	currentChange := 0
	fmt.Printf("Initially can make: 0\n")

	for _, coin := range coins {
		if coin > currentChange+1 {
			fmt.Printf("Coin %d > %d, cannot make %d\n", coin, currentChange+1, currentChange+1)
			return currentChange + 1
		}

		currentChange += coin
		fmt.Printf("Added coin %d, can now make 1 to %d\n", coin, currentChange)
	}

	return currentChange + 1
}

func main() {
	// Test 1: Example from problem
	coins1 := []int{5, 7, 1, 1, 2, 3, 22}
	result1 := NonConstructibleChange(coins1)
	fmt.Printf("Test 1: %d\n", result1) // Expected: 20

	// Test 2: All ones
	coins2 := []int{1, 1, 1, 1, 1}
	result2 := NonConstructibleChange(coins2)
	fmt.Printf("Test 2: %d\n", result2) // Expected: 6

	// Test 3: Mixed coins
	coins3 := []int{1, 5, 1, 1, 1, 10, 15, 20, 100}
	result3 := NonConstructibleChange(coins3)
	fmt.Printf("Test 3: %d\n", result3) // Expected: 55

	// Test 4: Empty array
	coins4 := []int{}
	result4 := NonConstructibleChange(coins4)
	fmt.Printf("Test 4: %d\n", result4) // Expected: 1

	// Test 5: No coin of value 1
	coins5 := []int{2, 3, 5}
	result5 := NonConstructibleChange(coins5)
	fmt.Printf("Test 5: %d\n", result5) // Expected: 1

	// Test 6: Single coin
	coins6 := []int{1}
	result6 := NonConstructibleChange(coins6)
	fmt.Printf("Test 6: %d\n", result6) // Expected: 2

	// Test 7: Perfect sequence
	coins7 := []int{1, 2, 4}
	result7 := NonConstructibleChange(coins7)
	fmt.Printf("Test 7: %d\n", result7) // Expected: 8 (can make 1-7)

	fmt.Println("\n--- Detailed walkthrough ---")
	NonConstructibleChangeExplained([]int{1, 1, 2, 3, 5, 7, 22})

	fmt.Println("\nAll tests completed!")
}
