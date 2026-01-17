/*
Three Number Sum - Go Solution

Find all triplets that sum to a target value.
Uses sorting and two-pointer technique.

Time Complexity: O(n²)
Space Complexity: O(n) for output
*/

package main

import (
	"fmt"
	"sort"
)

// ThreeNumberSum finds all triplets that sum to targetSum
func ThreeNumberSum(array []int, targetSum int) [][]int {
	sort.Ints(array)
	triplets := [][]int{}

	for i := 0; i < len(array)-2; i++ {
		left := i + 1
		right := len(array) - 1

		for left < right {
			currentSum := array[i] + array[left] + array[right]

			if currentSum == targetSum {
				triplets = append(triplets, []int{array[i], array[left], array[right]})
				left++
				right--
			} else if currentSum < targetSum {
				left++
			} else {
				right--
			}
		}
	}

	return triplets
}

// ThreeNumberSumHash alternative solution using hash set
func ThreeNumberSumHash(array []int, targetSum int) [][]int {
	sort.Ints(array)
	triplets := [][]int{}

	for i := 0; i < len(array)-2; i++ {
		seen := make(map[int]bool)
		target := targetSum - array[i]

		for j := i + 1; j < len(array); j++ {
			complement := target - array[j]
			if seen[complement] {
				triplets = append(triplets, []int{array[i], complement, array[j]})
			}
			seen[array[j]] = true
		}
	}

	return triplets
}

func main() {
	// Test 1: Multiple triplets
	array1 := []int{12, 3, 1, 2, -6, 5, -8, 6}
	target1 := 0
	result1 := ThreeNumberSum(array1, target1)
	fmt.Printf("Test 1: %v\n", result1)
	// Expected: [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]

	// Test 2: Single triplet
	array2 := []int{1, 2, 3}
	target2 := 6
	result2 := ThreeNumberSum(array2, target2)
	fmt.Printf("Test 2: %v\n", result2)
	// Expected: [[1, 2, 3]]

	// Test 3: No triplets
	array3 := []int{1, 2, 3, 4, 5}
	target3 := 100
	result3 := ThreeNumberSum(array3, target3)
	fmt.Printf("Test 3: %v\n", result3)
	// Expected: []

	// Test 4: Negative numbers
	array4 := []int{-5, -3, -1, 0, 1, 3, 5}
	target4 := 0
	result4 := ThreeNumberSum(array4, target4)
	fmt.Printf("Test 4: %v\n", result4)

	// Test 5: Two methods comparison
	array5 := []int{8, 10, -2, 49, 14}
	target5 := 57
	result5a := ThreeNumberSum(array5, target5)
	result5b := ThreeNumberSumHash(array5, target5)
	fmt.Printf("Test 5:\n")
	fmt.Printf("  Two-pointer: %v\n", result5a)
	fmt.Printf("  Hash method: %v\n", result5b)

	// Test 6: Larger array
	array6 := []int{-1, 0, 1, 2, -1, -4, 3, 5}
	target6 := 4
	result6 := ThreeNumberSum(array6, target6)
	fmt.Printf("Test 6: %v\n", result6)

	fmt.Println("\nAll tests completed!")
}
