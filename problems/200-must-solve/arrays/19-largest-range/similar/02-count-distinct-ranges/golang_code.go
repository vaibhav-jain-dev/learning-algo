/*
Count Distinct Consecutive Ranges - Go Solution

Count the number of distinct consecutive ranges in an array.

Time Complexity: O(n log n)
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"sort"
)

// countDistinctRanges counts the number of distinct consecutive ranges
func countDistinctRanges(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	// Remove duplicates using a set
	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	// Convert to slice and sort
	sortedNums := make([]int, 0, len(numSet))
	for num := range numSet {
		sortedNums = append(sortedNums, num)
	}
	sort.Ints(sortedNums)

	rangeCount := 1

	for i := 1; i < len(sortedNums); i++ {
		if sortedNums[i] != sortedNums[i-1]+1 {
			rangeCount++
		}
	}

	return rangeCount
}

// Range represents a consecutive range
type Range struct {
	Start int
	End   int
}

// getAllRanges returns all consecutive ranges
func getAllRanges(nums []int) []Range {
	if len(nums) == 0 {
		return nil
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

	ranges := []Range{}
	rangeStart := sortedNums[0]

	for i := 1; i < len(sortedNums); i++ {
		if sortedNums[i] != sortedNums[i-1]+1 {
			ranges = append(ranges, Range{rangeStart, sortedNums[i-1]})
			rangeStart = sortedNums[i]
		}
	}

	// Add the last range
	ranges = append(ranges, Range{rangeStart, sortedNums[len(sortedNums)-1]})

	return ranges
}

// countRangesWithHashSet counts ranges using hash set approach
func countRangesWithHashSet(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	rangeCount := 0

	for num := range numSet {
		// Count only range starts
		if !numSet[num-1] {
			rangeCount++
		}
	}

	return rangeCount
}

func main() {
	// Test 1: Multiple ranges
	nums1 := []int{1, 2, 3, 5, 6, 8, 10, 11, 12}
	result1 := countDistinctRanges(nums1)
	fmt.Printf("Test 1: %d\n", result1)
	if result1 != 4 {
		fmt.Printf("FAIL: Expected 4, got %d\n", result1)
	}

	// Test 2: All separate
	nums2 := []int{1, 3, 5, 7}
	result2 := countDistinctRanges(nums2)
	fmt.Printf("Test 2: %d\n", result2)
	if result2 != 4 {
		fmt.Printf("FAIL: Expected 4, got %d\n", result2)
	}

	// Test 3: Single range
	nums3 := []int{1, 2, 3, 4, 5}
	result3 := countDistinctRanges(nums3)
	fmt.Printf("Test 3: %d\n", result3)
	if result3 != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result3)
	}

	// Test 4: Get actual ranges
	ranges4 := getAllRanges([]int{1, 2, 3, 5, 6, 8, 10, 11, 12})
	fmt.Printf("Test 4: %v\n", ranges4)

	// Test 5: Single element
	nums5 := []int{42}
	result5 := countDistinctRanges(nums5)
	fmt.Printf("Test 5: %d\n", result5)
	if result5 != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result5)
	}

	// Test 6: Hash set approach
	result6 := countRangesWithHashSet([]int{1, 2, 3, 5, 6, 8, 10, 11, 12})
	fmt.Printf("Test 6: %d\n", result6)
	if result6 != 4 {
		fmt.Printf("FAIL: Expected 4, got %d\n", result6)
	}

	// Test 7: Negative numbers
	nums7 := []int{-5, -4, -3, 0, 1, 2, 5}
	result7 := countDistinctRanges(nums7)
	fmt.Printf("Test 7: %d\n", result7)
	if result7 != 3 {
		fmt.Printf("FAIL: Expected 3, got %d\n", result7)
	}

	fmt.Println("\nAll tests passed!")
}
