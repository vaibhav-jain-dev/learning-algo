/*
Smallest Difference - Go Solution

Find pair from two arrays with smallest absolute difference.
Uses sorting and two-pointer technique.

Time Complexity: O(n log n + m log m)
Space Complexity: O(1)
*/

package main

import (
	"fmt"
	"math"
	"sort"
)

// SmallestDifference finds pair with smallest absolute difference
func SmallestDifference(arrayOne, arrayTwo []int) []int {
	sort.Ints(arrayOne)
	sort.Ints(arrayTwo)

	i, j := 0, 0
	smallest := math.MaxInt64
	result := []int{0, 0}

	for i < len(arrayOne) && j < len(arrayTwo) {
		first := arrayOne[i]
		second := arrayTwo[j]
		currentDiff := abs(first - second)

		if currentDiff < smallest {
			smallest = currentDiff
			result = []int{first, second}
		}

		// Optimal case
		if first == second {
			return []int{first, second}
		}

		// Move pointer of smaller element to try to reduce difference
		if first < second {
			i++
		} else {
			j++
		}
	}

	return result
}

// SmallestDifferenceBrute brute force O(n*m) solution for comparison
func SmallestDifferenceBrute(arrayOne, arrayTwo []int) []int {
	smallest := math.MaxInt64
	result := []int{0, 0}

	for _, num1 := range arrayOne {
		for _, num2 := range arrayTwo {
			diff := abs(num1 - num2)
			if diff < smallest {
				smallest = diff
				result = []int{num1, num2}
			}
		}
	}

	return result
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	// Test 1: Standard case
	arr1_1 := []int{-1, 5, 10, 20, 28, 3}
	arr2_1 := []int{26, 134, 135, 15, 17}
	result1 := SmallestDifference(append([]int{}, arr1_1...), append([]int{}, arr2_1...))
	fmt.Printf("Test 1: %v\n", result1) // Expected: [28, 26]

	// Test 2: Close large numbers
	arr1_2 := []int{10, 1000}
	arr2_2 := []int{1001, 11}
	result2 := SmallestDifference(append([]int{}, arr1_2...), append([]int{}, arr2_2...))
	fmt.Printf("Test 2: %v\n", result2) // Expected: [1000, 1001]

	// Test 3: Exact match exists
	arr1_3 := []int{1, 3, 5, 7}
	arr2_3 := []int{2, 4, 5, 8}
	result3 := SmallestDifference(append([]int{}, arr1_3...), append([]int{}, arr2_3...))
	fmt.Printf("Test 3: %v\n", result3) // Expected: [5, 5]

	// Test 4: Negative numbers
	arr1_4 := []int{-10, -5, 0, 5}
	arr2_4 := []int{-8, -3, 2, 7}
	result4 := SmallestDifference(append([]int{}, arr1_4...), append([]int{}, arr2_4...))
	fmt.Printf("Test 4: %v\n", result4)

	// Test 5: Single element arrays
	arr1_5 := []int{1}
	arr2_5 := []int{100}
	result5 := SmallestDifference(append([]int{}, arr1_5...), append([]int{}, arr2_5...))
	fmt.Printf("Test 5: %v\n", result5) // Expected: [1, 100]

	// Test 6: Verify both methods give same result
	arr1_6 := []int{10, 5, 40, 79, 90}
	arr2_6 := []int{7, 62, 25, 80, 12}
	result6a := SmallestDifference(append([]int{}, arr1_6...), append([]int{}, arr2_6...))
	result6b := SmallestDifferenceBrute(arr1_6, arr2_6)
	fmt.Printf("Test 6:\n")
	fmt.Printf("  Two-pointer: %v\n", result6a)
	fmt.Printf("  Brute force: %v\n", result6b)

	fmt.Println("\nAll tests completed!")
}
