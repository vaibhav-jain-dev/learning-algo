// Fruit Into Baskets
//
// You are visiting a farm with fruit trees. Find the maximum number of fruits
// you can pick with 2 baskets (each basket holds one type of fruit).
//
// This is equivalent to: longest subarray with at most 2 distinct elements.
//
// Time Complexity: O(n)
// Space Complexity: O(1) - at most 3 distinct elements in the map

package main

import (
	"fmt"
)

// totalFruit finds maximum fruits that can be picked with 2 baskets.
func totalFruit(fruits []int) int {
	if len(fruits) == 0 {
		return 0
	}

	// Count of each fruit type in current window
	fruitCount := make(map[int]int)
	maxFruits := 0
	left := 0

	for right := 0; right < len(fruits); right++ {
		// Add fruit at right to the basket
		fruitCount[fruits[right]]++

		// If we have more than 2 types, shrink window from left
		for len(fruitCount) > 2 {
			fruitCount[fruits[left]]--
			if fruitCount[fruits[left]] == 0 {
				delete(fruitCount, fruits[left])
			}
			left++
		}

		// Update maximum
		currentLength := right - left + 1
		if currentLength > maxFruits {
			maxFruits = currentLength
		}
	}

	return maxFruits
}

// totalFruitKDistinct is the generalized version: longest subarray with at most k distinct elements.
func totalFruitKDistinct(fruits []int, k int) int {
	if len(fruits) == 0 || k <= 0 {
		return 0
	}

	fruitCount := make(map[int]int)
	maxFruits := 0
	left := 0

	for right := 0; right < len(fruits); right++ {
		fruitCount[fruits[right]]++

		for len(fruitCount) > k {
			fruitCount[fruits[left]]--
			if fruitCount[fruits[left]] == 0 {
				delete(fruitCount, fruits[left])
			}
			left++
		}

		currentLength := right - left + 1
		if currentLength > maxFruits {
			maxFruits = currentLength
		}
	}

	return maxFruits
}

// findLongestSubarray finds and returns the actual longest subarray (not just length).
func findLongestSubarray(fruits []int) []int {
	if len(fruits) == 0 {
		return []int{}
	}

	fruitCount := make(map[int]int)
	maxLength := 0
	maxStart := 0
	left := 0

	for right := 0; right < len(fruits); right++ {
		fruitCount[fruits[right]]++

		for len(fruitCount) > 2 {
			fruitCount[fruits[left]]--
			if fruitCount[fruits[left]] == 0 {
				delete(fruitCount, fruits[left])
			}
			left++
		}

		currentLength := right - left + 1
		if currentLength > maxLength {
			maxLength = currentLength
			maxStart = left
		}
	}

	return fruits[maxStart : maxStart+maxLength]
}

func runTests() bool {
	type testCase struct {
		fruits   []int
		expected int
	}

	testCases := []testCase{
		{[]int{1, 2, 1}, 3},
		{[]int{0, 1, 2, 2}, 3},
		{[]int{1, 2, 3, 2, 2}, 4},
		{[]int{3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4}, 5},
		{[]int{1}, 1},
		{[]int{1, 1, 1, 1}, 4},
		{[]int{1, 2, 1, 2, 1, 2, 1}, 7},
		{[]int{1, 0, 1, 4, 1, 4, 1, 2, 3}, 5},
		{[]int{0}, 1},
		{[]int{1, 2}, 2},
		{[]int{1, 2, 3, 4, 5}, 2},
	}

	fmt.Println("Testing Fruit Into Baskets")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := totalFruit(tc.fruits)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("Test %d: %s\n", i+1, status)
		fmt.Printf("  Input: fruits=%v\n", tc.fruits)
		fmt.Printf("  Expected: %d, Got: %d\n", tc.expected, result)

		// Show the actual subarray found
		subarray := findLongestSubarray(tc.fruits)
		fmt.Printf("  Longest subarray: %v\n\n", subarray)
	}

	// Verify generalized version gives same results when k=2
	fmt.Println("Verifying generalized k-distinct solution matches...")
	for _, tc := range testCases {
		result1 := totalFruit(tc.fruits)
		result2 := totalFruitKDistinct(tc.fruits, 2)
		if result1 != result2 {
			fmt.Printf("  Mismatch for %v! Regular=%d, K-Distinct=%d\n", tc.fruits, result1, result2)
			allPassed = false
		}
	}
	fmt.Println("  All approaches give matching results!")
	fmt.Println()

	// Test with different k values
	fmt.Println("Testing with different k values:")
	testArr := []int{1, 2, 3, 4, 1, 2, 3, 4, 5}
	for k := 1; k <= 4; k++ {
		result := totalFruitKDistinct(testArr, k)
		fmt.Printf("  k=%d: max length = %d\n", k, result)
	}
	fmt.Println()

	if allPassed {
		fmt.Println("All tests PASSED!")
	} else {
		fmt.Println("Some tests FAILED!")
	}

	return allPassed
}

func main() {
	runTests()
}
