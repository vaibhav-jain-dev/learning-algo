/*
Largest Range - Go Solution

Find the largest range of consecutive integers in an array.

Time Complexity: O(n)
Space Complexity: O(n)
*/

package main

import "fmt"

// LargestRange finds largest range of consecutive integers
func LargestRange(array []int) []int {
	nums := make(map[int]bool) // num -> visited
	for _, num := range array {
		nums[num] = false
	}

	bestRange := []int{0, 0}
	longestLength := 0

	for _, num := range array {
		if nums[num] { // Already visited as part of another range
			continue
		}

		nums[num] = true
		currentLength := 1
		left := num - 1
		right := num + 1

		// Expand left
		for {
			if _, exists := nums[left]; exists {
				nums[left] = true
				currentLength++
				left--
			} else {
				break
			}
		}

		// Expand right
		for {
			if _, exists := nums[right]; exists {
				nums[right] = true
				currentLength++
				right++
			} else {
				break
			}
		}

		if currentLength > longestLength {
			longestLength = currentLength
			bestRange = []int{left + 1, right - 1}
		}
	}

	return bestRange
}

// LargestRangeSimple alternative using set approach
func LargestRangeSimple(array []int) []int {
	numSet := make(map[int]bool)
	for _, num := range array {
		numSet[num] = true
	}

	longest := 0
	bestRange := []int{0, 0}

	for num := range numSet {
		// Only start counting from the beginning of a sequence
		if !numSet[num-1] {
			current := num
			length := 1

			for numSet[current+1] {
				current++
				length++
			}

			if length > longest {
				longest = length
				bestRange = []int{num, current}
			}
		}
	}

	return bestRange
}

func main() {
	// Test 1: Complex case
	arr1 := []int{1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6}
	result1 := LargestRange(arr1)
	fmt.Printf("Test 1: %v\n", result1) // Expected: [0, 7]

	// Test 2: Consecutive elements
	arr2 := []int{4, 2, 1, 3}
	result2 := LargestRange(arr2)
	fmt.Printf("Test 2: %v\n", result2) // Expected: [1, 4]

	// Test 3: Multiple ranges
	arr3 := []int{8, 4, 2, 10, 3, 6, 7, 9, 1}
	result3 := LargestRange(arr3)
	fmt.Printf("Test 3: %v\n", result3) // Expected: [6, 10]

	// Test 4: Single element
	arr4 := []int{5}
	result4 := LargestRange(arr4)
	fmt.Printf("Test 4: %v\n", result4) // Expected: [5, 5]

	// Test 5: With duplicates
	arr5 := []int{1, 1, 2, 2, 3, 3, 4, 4}
	result5 := LargestRange(arr5)
	fmt.Printf("Test 5: %v\n", result5) // Expected: [1, 4]

	// Test 6: Negative numbers
	arr6 := []int{-5, -4, -3, 0, 1, 2, 5, 6, 7, 8}
	result6 := LargestRange(arr6)
	fmt.Printf("Test 6: %v\n", result6) // Expected: [5, 8] or [-5, -3]

	// Test 7: Two equal ranges
	arr7 := []int{1, 2, 3, 10, 11, 12}
	result7 := LargestRange(arr7)
	fmt.Printf("Test 7: %v\n", result7) // Expected: [1, 3] or [10, 12]

	// Test 8: Compare methods
	arr8 := []int{19, 13, 15, 12, 18, 14, 17, 11}
	result8a := LargestRange(arr8)
	result8b := LargestRangeSimple(arr8)
	fmt.Printf("\nTest 8 - Comparison:\n")
	fmt.Printf("  Hash map: %v\n", result8a)
	fmt.Printf("  Set method: %v\n", result8b)

	// Verification
	fmt.Printf("\nVerification for Test 1:\n")
	start, end := result1[0], result1[1]
	fmt.Printf("  Range: [%d, %d]\n", start, end)
	fmt.Printf("  Length: %d\n", end-start+1)
	elements := make([]int, end-start+1)
	for i := start; i <= end; i++ {
		elements[i-start] = i
	}
	fmt.Printf("  Elements: %v\n", elements)

	fmt.Println("\nAll tests completed!")
}
