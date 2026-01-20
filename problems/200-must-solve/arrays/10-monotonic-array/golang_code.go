/*
Monotonic Array - Go Solution

Check if array is entirely non-increasing or non-decreasing.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// IsMonotonic checks if array is monotonic
func IsMonotonic(array []int) bool {
	if len(array) <= 2 {
		return true
	}

	isNonIncreasing := true
	isNonDecreasing := true

	for i := 0; i < len(array)-1; i++ {
		if array[i] > array[i+1] {
			isNonDecreasing = false
		}
		if array[i] < array[i+1] {
			isNonIncreasing = false
		}
	}

	return isNonIncreasing || isNonDecreasing
}

// IsMonotonicDirection alternative: determine direction first, then verify
func IsMonotonicDirection(array []int) bool {
	if len(array) <= 2 {
		return true
	}

	// Find first non-equal pair to determine direction
	direction := 0
	for i := 0; i < len(array)-1; i++ {
		if array[i] != array[i+1] {
			if array[i] < array[i+1] {
				direction = 1
			} else {
				direction = -1
			}
			break
		}
	}

	if direction == 0 { // All equal
		return true
	}

	// Verify direction holds throughout
	for i := 0; i < len(array)-1; i++ {
		if direction == 1 && array[i] > array[i+1] {
			return false
		}
		if direction == -1 && array[i] < array[i+1] {
			return false
		}
	}

	return true
}

// IsMonotonicBothChecks explicit check for both directions
func IsMonotonicBothChecks(array []int) bool {
	return isNonDecreasing(array) || isNonIncreasing(array)
}

func isNonDecreasing(array []int) bool {
	for i := 0; i < len(array)-1; i++ {
		if array[i] > array[i+1] {
			return false
		}
	}
	return true
}

func isNonIncreasing(array []int) bool {
	for i := 0; i < len(array)-1; i++ {
		if array[i] < array[i+1] {
			return false
		}
	}
	return true
}

func main() {
	// Test 1: Non-increasing with duplicates
	arr1 := []int{-1, -5, -10, -1100, -1100, -1101, -1102, -9001}
	result1 := IsMonotonic(arr1)
	fmt.Printf("Test 1: %v\n", result1) // Expected: true

	// Test 2: Non-decreasing with duplicates
	arr2 := []int{1, 2, 3, 3, 4, 5}
	result2 := IsMonotonic(arr2)
	fmt.Printf("Test 2: %v\n", result2) // Expected: true

	// Test 3: Not monotonic
	arr3 := []int{1, 2, 1}
	result3 := IsMonotonic(arr3)
	fmt.Printf("Test 3: %v\n", result3) // Expected: false

	// Test 4: Strictly increasing
	arr4 := []int{1, 2, 3, 4, 5}
	result4 := IsMonotonic(arr4)
	fmt.Printf("Test 4: %v\n", result4) // Expected: true

	// Test 5: Strictly decreasing
	arr5 := []int{5, 4, 3, 2, 1}
	result5 := IsMonotonic(arr5)
	fmt.Printf("Test 5: %v\n", result5) // Expected: true

	// Test 6: All same elements
	arr6 := []int{7, 7, 7, 7}
	result6 := IsMonotonic(arr6)
	fmt.Printf("Test 6: %v\n", result6) // Expected: true

	// Test 7: Empty array
	arr7 := []int{}
	result7 := IsMonotonic(arr7)
	fmt.Printf("Test 7: %v\n", result7) // Expected: true

	// Test 8: Single element
	arr8 := []int{42}
	result8 := IsMonotonic(arr8)
	fmt.Printf("Test 8: %v\n", result8) // Expected: true

	// Test 9: Two elements
	arr9 := []int{1, 2}
	result9 := IsMonotonic(arr9)
	fmt.Printf("Test 9: %v\n", result9) // Expected: true

	// Test 10: Comparison of methods
	arr10 := []int{1, 1, 2, 3, 4, 5, 5, 5, 6}
	fmt.Printf("\nTest 10 - Methods comparison:\n")
	fmt.Printf("  Standard: %v\n", IsMonotonic(arr10))
	fmt.Printf("  Direction: %v\n", IsMonotonicDirection(arr10))
	fmt.Printf("  BothChecks: %v\n", IsMonotonicBothChecks(arr10))

	fmt.Println("\nAll tests completed!")
}
