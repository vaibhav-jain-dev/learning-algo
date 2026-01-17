/*
Sorted Squared Array - Go Solution

Given a sorted array, return a new sorted array of the squares.
The challenge is handling negative numbers efficiently.

Time Complexity: O(n)
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"sort"
)

// SortedSquaredArray returns sorted array of squares using two-pointer technique
func SortedSquaredArray(array []int) []int {
	n := len(array)
	result := make([]int, n)
	left := 0
	right := n - 1

	// Fill from the end (largest values first)
	for i := n - 1; i >= 0; i-- {
		leftVal := abs(array[left])
		rightVal := abs(array[right])

		if leftVal > rightVal {
			result[i] = leftVal * leftVal
			left++
		} else {
			result[i] = rightVal * rightVal
			right--
		}
	}

	return result
}

// SortedSquaredArraySimple is a simple solution using built-in sort - O(n log n)
func SortedSquaredArraySimple(array []int) []int {
	result := make([]int, len(array))
	for i, v := range array {
		result[i] = v * v
	}
	sort.Ints(result)
	return result
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	// Test 1: All positive
	array1 := []int{1, 2, 3, 5, 6, 8, 9}
	result1 := SortedSquaredArray(array1)
	fmt.Printf("Test 1: %v\n", result1)
	// Expected: [1, 4, 9, 25, 36, 64, 81]

	// Test 2: All negative
	array2 := []int{-5, -4, -3, -2, -1}
	result2 := SortedSquaredArray(array2)
	fmt.Printf("Test 2: %v\n", result2)
	// Expected: [1, 4, 9, 16, 25]

	// Test 3: Mixed positive and negative
	array3 := []int{-7, -3, 1, 9, 22, 30}
	result3 := SortedSquaredArray(array3)
	fmt.Printf("Test 3: %v\n", result3)
	// Expected: [1, 9, 49, 81, 484, 900]

	// Test 4: Including zero
	array4 := []int{-4, -2, 0, 1, 3}
	result4 := SortedSquaredArray(array4)
	fmt.Printf("Test 4: %v\n", result4)
	// Expected: [0, 1, 4, 9, 16]

	// Test 5: Single element
	array5 := []int{-5}
	result5 := SortedSquaredArray(array5)
	fmt.Printf("Test 5: %v\n", result5)
	// Expected: [25]

	// Test 6: Symmetric around zero
	array6 := []int{-3, -2, -1, 0, 1, 2, 3}
	result6 := SortedSquaredArray(array6)
	fmt.Printf("Test 6: %v\n", result6)
	// Expected: [0, 1, 1, 4, 4, 9, 9]

	fmt.Println("\nAll tests completed!")
}
