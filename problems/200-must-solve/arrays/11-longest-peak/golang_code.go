/*
Longest Peak - Go Solution

Find the length of the longest peak in an array.
A peak is strictly increasing then strictly decreasing with at least 3 elements.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// LongestPeak finds length of longest peak in array
func LongestPeak(array []int) int {
	longestPeakLength := 0
	i := 1 // Start from index 1 (need left neighbor)

	for i < len(array)-1 { // Stop before last (need right neighbor)
		// Check if this is a tip (peak point)
		isPeak := array[i-1] < array[i] && array[i] > array[i+1]

		if !isPeak {
			i++
			continue
		}

		// Found a tip, expand left
		leftIdx := i - 2
		for leftIdx >= 0 && array[leftIdx] < array[leftIdx+1] {
			leftIdx--
		}

		// Expand right
		rightIdx := i + 2
		for rightIdx < len(array) && array[rightIdx] < array[rightIdx-1] {
			rightIdx++
		}

		// Calculate peak length
		currentPeakLength := rightIdx - leftIdx - 1
		if currentPeakLength > longestPeakLength {
			longestPeakLength = currentPeakLength
		}

		// Move i to end of current peak to avoid recounting
		i = rightIdx
	}

	return longestPeakLength
}

// LongestPeakSimple alternative approach: check each potential tip
func LongestPeakSimple(array []int) int {
	if len(array) < 3 {
		return 0
	}

	maxLength := 0

	for i := 1; i < len(array)-1; i++ {
		// Check if tip
		if array[i-1] < array[i] && array[i] > array[i+1] {
			// Expand and count
			left := i - 1
			right := i + 1

			for left > 0 && array[left-1] < array[left] {
				left--
			}
			for right < len(array)-1 && array[right+1] < array[right] {
				right++
			}

			length := right - left + 1
			if length > maxLength {
				maxLength = length
			}
		}
	}

	return maxLength
}

func main() {
	// Test 1: Multiple peaks
	arr1 := []int{1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3}
	result1 := LongestPeak(arr1)
	fmt.Printf("Test 1: %d\n", result1) // Expected: 6

	// Test 2: Simple peak
	arr2 := []int{1, 3, 2}
	result2 := LongestPeak(arr2)
	fmt.Printf("Test 2: %d\n", result2) // Expected: 3

	// Test 3: No peak (only increasing)
	arr3 := []int{1, 2, 3, 4, 5}
	result3 := LongestPeak(arr3)
	fmt.Printf("Test 3: %d\n", result3) // Expected: 0

	// Test 4: No peak (only decreasing)
	arr4 := []int{5, 4, 3, 2, 1}
	result4 := LongestPeak(arr4)
	fmt.Printf("Test 4: %d\n", result4) // Expected: 0

	// Test 5: Plateau breaks peak
	arr5 := []int{1, 2, 3, 3, 2, 1}
	result5 := LongestPeak(arr5)
	fmt.Printf("Test 5: %d\n", result5) // Expected: 0

	// Test 6: Multiple valid peaks
	arr6 := []int{1, 3, 2, 5, 4, 3, 2, 6, 1}
	result6 := LongestPeak(arr6)
	fmt.Printf("Test 6: %d\n", result6) // Expected: 5

	// Test 7: Single peak spanning array
	arr7 := []int{1, 2, 3, 4, 5, 4, 3, 2, 1}
	result7 := LongestPeak(arr7)
	fmt.Printf("Test 7: %d\n", result7) // Expected: 9

	// Test 8: Short array
	arr8 := []int{1, 2}
	result8 := LongestPeak(arr8)
	fmt.Printf("Test 8: %d\n", result8) // Expected: 0

	// Test 9: Compare methods
	arr9 := []int{5, 4, 3, 2, 1, 2, 10, 12, 11, 13, 12}
	result9a := LongestPeak(arr9)
	result9b := LongestPeakSimple(arr9)
	fmt.Printf("\nTest 9 - Comparison:\n")
	fmt.Printf("  Optimized: %d\n", result9a)
	fmt.Printf("  Simple: %d\n", result9b)

	fmt.Println("\nAll tests completed!")
}
