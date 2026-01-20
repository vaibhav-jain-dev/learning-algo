/*
Largest Range After K Additions - Go Solution

Find the largest consecutive range possible after adding at most k elements.

Time Complexity: O(n log n)
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"sort"
)

// largestRangeAfterAddition finds largest consecutive range after adding k elements
func largestRangeAfterAddition(nums []int, k int) int {
	if len(nums) == 0 {
		return k
	}

	// Remove duplicates and sort
	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	sortedNums := make([]int, 0, len(numSet))
	for num := range numSet {
		sortedNums = append(sortedNums, num)
	}
	sort.Ints(sortedNums)

	n := len(sortedNums)

	if n == 1 {
		return 1 + k
	}

	maxLength := 0
	left := 0

	for right := 0; right < n; right++ {
		// Calculate additions needed
		for left <= right {
			totalNeeded := sortedNums[right] - sortedNums[left] + 1
			have := right - left + 1
			additionsNeeded := totalNeeded - have

			if additionsNeeded <= k {
				break
			}
			left++
		}

		currentLength := sortedNums[right] - sortedNums[left] + 1
		if currentLength > maxLength {
			maxLength = currentLength
		}
	}

	// Consider extending beyond bounds
	beyondBounds := n + k
	if sortedNums[n-1]-sortedNums[0]+1 < beyondBounds {
		beyondBounds = sortedNums[n-1] - sortedNums[0] + 1
	}
	if beyondBounds > maxLength {
		maxLength = beyondBounds
	}

	return maxLength
}

// largestRangeAfterAdditionV2 is an alternative implementation
func largestRangeAfterAdditionV2(nums []int, k int) int {
	if len(nums) == 0 {
		return k
	}

	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	sortedNums := make([]int, 0, len(numSet))
	for num := range numSet {
		sortedNums = append(sortedNums, num)
	}
	sort.Ints(sortedNums)

	n := len(sortedNums)
	maxLength := 1
	left := 0

	for right := 0; right < n; right++ {
		// Shrink window if too many gaps
		for sortedNums[right]-sortedNums[left] > (right-left)+k {
			left++
		}

		rangeSize := sortedNums[right] - sortedNums[left] + 1
		maxPossible := (right - left + 1) + k

		actualLength := rangeSize
		if maxPossible < actualLength {
			actualLength = maxPossible
		}

		if actualLength > maxLength {
			maxLength = actualLength
		}
	}

	return maxLength
}

func main() {
	// Test 1: Simple gap fill
	nums1 := []int{1, 2, 4, 5, 8}
	result1 := largestRangeAfterAddition(nums1, 1)
	fmt.Printf("Test 1: %d\n", result1)
	if result1 != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", result1)
	}

	// Test 2: Multiple gaps
	nums2 := []int{1, 3, 5, 7}
	result2 := largestRangeAfterAddition(nums2, 1)
	fmt.Printf("Test 2: %d\n", result2)
	if result2 != 3 {
		fmt.Printf("FAIL: Expected 3, got %d\n", result2)
	}

	// Test 3: k = 0
	nums3 := []int{1, 2, 3, 5, 6}
	result3 := largestRangeAfterAddition(nums3, 0)
	fmt.Printf("Test 3: %d\n", result3)
	if result3 != 3 {
		fmt.Printf("FAIL: Expected 3, got %d\n", result3)
	}

	// Test 4: Large k
	nums4 := []int{1, 10, 20}
	result4 := largestRangeAfterAddition(nums4, 5)
	fmt.Printf("Test 4: %d\n", result4)
	if result4 != 6 {
		fmt.Printf("FAIL: Expected 6, got %d\n", result4)
	}

	// Test 5: Already consecutive
	nums5 := []int{1, 2, 3, 4, 5}
	result5 := largestRangeAfterAddition(nums5, 2)
	fmt.Printf("Test 5: %d\n", result5)
	if result5 != 7 {
		fmt.Printf("FAIL: Expected 7, got %d\n", result5)
	}

	// Test 6: Single element
	nums6 := []int{5}
	result6 := largestRangeAfterAddition(nums6, 3)
	fmt.Printf("Test 6: %d\n", result6)
	if result6 != 4 {
		fmt.Printf("FAIL: Expected 4, got %d\n", result6)
	}

	// Test 7: Empty array
	nums7 := []int{}
	result7 := largestRangeAfterAddition(nums7, 3)
	fmt.Printf("Test 7: %d\n", result7)
	if result7 != 3 {
		fmt.Printf("FAIL: Expected 3, got %d\n", result7)
	}

	fmt.Println("\nAll tests passed!")
}
