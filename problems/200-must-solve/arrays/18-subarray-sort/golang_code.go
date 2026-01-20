/*
Subarray Sort - Go Solution

Find the smallest subarray that needs to be sorted for entire array to be sorted.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import (
	"fmt"
	"math"
	"sort"
)

// SubarraySort finds indices of smallest subarray to sort
func SubarraySort(array []int) []int {
	minOutOfOrder := math.MaxInt64
	maxOutOfOrder := math.MinInt64

	// Find all out-of-order elements and track min/max
	for i := range array {
		if isOutOfOrder(i, array) {
			if array[i] < minOutOfOrder {
				minOutOfOrder = array[i]
			}
			if array[i] > maxOutOfOrder {
				maxOutOfOrder = array[i]
			}
		}
	}

	// If no out-of-order elements, array is sorted
	if minOutOfOrder == math.MaxInt64 {
		return []int{-1, -1}
	}

	// Find correct position for min (left boundary)
	left := 0
	for array[left] <= minOutOfOrder {
		left++
	}

	// Find correct position for max (right boundary)
	right := len(array) - 1
	for array[right] >= maxOutOfOrder {
		right--
	}

	return []int{left, right}
}

func isOutOfOrder(i int, array []int) bool {
	num := array[i]

	if i == 0 {
		return num > array[i+1]
	}
	if i == len(array)-1 {
		return num < array[i-1]
	}

	return num > array[i+1] || num < array[i-1]
}

// SubarraySortAlt alternative approach using sorting comparison
func SubarraySortAlt(array []int) []int {
	sortedArray := make([]int, len(array))
	copy(sortedArray, array)
	sort.Ints(sortedArray)

	left := -1
	right := -1

	for i := range array {
		if array[i] != sortedArray[i] {
			if left == -1 {
				left = i
			}
			right = i
		}
	}

	if left == -1 {
		return []int{-1, -1}
	}

	return []int{left, right}
}

func main() {
	// Test 1: Complex case
	arr1 := []int{1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19}
	result1 := SubarraySort(arr1)
	fmt.Printf("Test 1: %v\n", result1) // Expected: [3, 9]

	// Test 2: Already sorted
	arr2 := []int{1, 2, 3, 4, 5}
	result2 := SubarraySort(arr2)
	fmt.Printf("Test 2: %v\n", result2) // Expected: [-1, -1]

	// Test 3: Reversed pair
	arr3 := []int{2, 1}
	result3 := SubarraySort(arr3)
	fmt.Printf("Test 3: %v\n", result3) // Expected: [0, 1]

	// Test 4: All same elements
	arr4 := []int{5, 5, 5, 5}
	result4 := SubarraySort(arr4)
	fmt.Printf("Test 4: %v\n", result4) // Expected: [-1, -1]

	// Test 5: Completely reversed
	arr5 := []int{5, 4, 3, 2, 1}
	result5 := SubarraySort(arr5)
	fmt.Printf("Test 5: %v\n", result5) // Expected: [0, 4]

	// Test 6: One element out of place
	arr6 := []int{1, 2, 3, 5, 4, 6, 7}
	result6 := SubarraySort(arr6)
	fmt.Printf("Test 6: %v\n", result6) // Expected: [3, 4]

	// Test 7: With negative numbers
	arr7 := []int{-5, -3, 0, -1, 2, 4, 6}
	result7 := SubarraySort(arr7)
	fmt.Printf("Test 7: %v\n", result7)

	// Test 8: Compare methods
	arr8 := []int{1, 3, 2, 2, 2}
	result8a := SubarraySort(arr8)
	result8b := SubarraySortAlt(arr8)
	fmt.Printf("\nTest 8 - Comparison:\n")
	fmt.Printf("  O(n) method: %v\n", result8a)
	fmt.Printf("  Sort method: %v\n", result8b)

	// Verification for Test 1
	fmt.Printf("\nVerification for Test 1:\n")
	arrTest := []int{1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19}
	start, end := result1[0], result1[1]
	fmt.Printf("  Subarray to sort: %v\n", arrTest[start:end+1])
	subArray := make([]int, end-start+1)
	copy(subArray, arrTest[start:end+1])
	sort.Ints(subArray)
	copy(arrTest[start:end+1], subArray)
	fmt.Printf("  After sorting subarray: %v\n", arrTest)
	isSorted := sort.IntsAreSorted(arrTest)
	fmt.Printf("  Is sorted: %v\n", isSorted)

	fmt.Println("\nAll tests completed!")
}
