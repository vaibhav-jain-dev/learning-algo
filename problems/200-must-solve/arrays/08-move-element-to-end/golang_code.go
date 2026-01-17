/*
Move Element To End - Go Solution

Move all instances of a target value to the end of the array in-place.
Uses two-pointer technique.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// MoveElementToEnd moves all instances of toMove to the end in-place
func MoveElementToEnd(array []int, toMove int) []int {
	left := 0
	right := len(array) - 1

	for left < right {
		// Move right pointer until it points to non-target
		for left < right && array[right] == toMove {
			right--
		}

		// If left points to target, swap with right
		if array[left] == toMove {
			array[left], array[right] = array[right], array[left]
		}

		left++
	}

	return array
}

// MoveElementToEndAlt alternative approach using write pointer
func MoveElementToEndAlt(array []int, toMove int) []int {
	writeIdx := 0

	// First pass: move non-target elements to front
	for i := 0; i < len(array); i++ {
		if array[i] != toMove {
			array[writeIdx] = array[i]
			writeIdx++
		}
	}

	// Fill remaining positions with target
	for writeIdx < len(array) {
		array[writeIdx] = toMove
		writeIdx++
	}

	return array
}

// MoveElementPreserveOrder preserves relative order of non-target elements
func MoveElementPreserveOrder(array []int, toMove int) []int {
	writeIdx := 0

	// Move non-target elements forward, preserving order
	for i := 0; i < len(array); i++ {
		if array[i] != toMove {
			array[writeIdx] = array[i]
			writeIdx++
		}
	}

	// Fill rest with target
	for i := writeIdx; i < len(array); i++ {
		array[i] = toMove
	}

	return array
}

func copySlice(arr []int) []int {
	result := make([]int, len(arr))
	copy(result, arr)
	return result
}

func main() {
	// Test 1: Standard case
	arr1 := []int{2, 1, 2, 2, 2, 3, 4, 2}
	result1 := MoveElementToEnd(copySlice(arr1), 2)
	fmt.Printf("Test 1: %v\n", result1)

	// Test 2: Target not at edges
	arr2 := []int{1, 2, 3, 4, 5}
	result2 := MoveElementToEnd(copySlice(arr2), 3)
	fmt.Printf("Test 2: %v\n", result2)

	// Test 3: All elements are target
	arr3 := []int{2, 2, 2, 2}
	result3 := MoveElementToEnd(copySlice(arr3), 2)
	fmt.Printf("Test 3: %v\n", result3)

	// Test 4: No target elements
	arr4 := []int{1, 3, 5, 7}
	result4 := MoveElementToEnd(copySlice(arr4), 2)
	fmt.Printf("Test 4: %v\n", result4)

	// Test 5: Empty array
	arr5 := []int{}
	result5 := MoveElementToEnd(copySlice(arr5), 5)
	fmt.Printf("Test 5: %v\n", result5)

	// Test 6: Single element
	arr6 := []int{5}
	result6 := MoveElementToEnd(copySlice(arr6), 5)
	fmt.Printf("Test 6: %v\n", result6)

	// Test 7: Order-preserving version
	arr7 := []int{2, 1, 2, 3, 2, 4}
	result7 := MoveElementPreserveOrder(copySlice(arr7), 2)
	fmt.Printf("Test 7 (order preserved): %v\n", result7)
	// Expected: [1, 3, 4, 2, 2, 2]

	fmt.Println("\nAll tests completed!")
}
