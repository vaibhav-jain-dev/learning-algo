/*
Next Permutation - Go Solutions

Find the next lexicographically greater permutation of an array.
If already at maximum, return the smallest permutation.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: In-Place Algorithm (Optimal)
// ============================================================================
// Time Complexity:  O(n) - single pass to find pivot, another for successor
// Space Complexity: O(1) - all operations in-place
//
// WHY THIS IS BEST:
// - Optimal time and space complexity
// - Works directly on the slice
// - Clean, well-understood algorithm
// ============================================================================

// NextPermutation modifies nums in-place to be the next lexicographically
// greater permutation.
//
// Algorithm:
// 1. Find the largest index i such that nums[i] < nums[i + 1] (pivot)
// 2. Find the largest index j such that nums[j] > nums[i] (successor)
// 3. Swap nums[i] and nums[j]
// 4. Reverse the suffix starting at nums[i + 1]
func NextPermutation(nums []int) {
	n := len(nums)
	if n <= 1 {
		return
	}

	// Step 1: Find the pivot (rightmost element that can be increased)
	pivot := -1
	for i := n - 2; i >= 0; i-- {
		if nums[i] < nums[i+1] {
			pivot = i
			break
		}
	}

	// If no pivot found, array is in descending order (max permutation)
	// Just reverse to get the smallest permutation
	if pivot == -1 {
		reverse(nums, 0)
		return
	}

	// Step 2: Find the successor (smallest element greater than pivot in suffix)
	// Since suffix is descending, search from right
	for j := n - 1; j > pivot; j-- {
		if nums[j] > nums[pivot] {
			// Step 3: Swap pivot and successor
			nums[pivot], nums[j] = nums[j], nums[pivot]
			break
		}
	}

	// Step 4: Reverse the suffix to make it smallest
	reverse(nums, pivot+1)
}

// reverse reverses the slice in-place starting from index start
func reverse(nums []int, start int) {
	left, right := start, len(nums)-1
	for left < right {
		nums[left], nums[right] = nums[right], nums[left]
		left++
		right--
	}
}

// ============================================================================
// APPROACH 2: Using Helper Functions (More Readable)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When you want more modular, readable code
// - Same algorithm, just broken into helper functions
// ============================================================================

// NextPermutationModular is the same algorithm with helper functions.
func NextPermutationModular(nums []int) {
	pivot := findPivot(nums)

	if pivot == -1 {
		// Already at max permutation, wrap to smallest
		reverseSuffix(nums, 0)
		return
	}

	successor := findSuccessor(nums, pivot)
	nums[pivot], nums[successor] = nums[successor], nums[pivot]
	reverseSuffix(nums, pivot+1)
}

// findPivot finds rightmost index where nums[i] < nums[i+1], or -1 if not found.
func findPivot(nums []int) int {
	for i := len(nums) - 2; i >= 0; i-- {
		if nums[i] < nums[i+1] {
			return i
		}
	}
	return -1
}

// findSuccessor finds rightmost index j > pivot where nums[j] > nums[pivot].
func findSuccessor(nums []int, pivot int) int {
	for j := len(nums) - 1; j > pivot; j-- {
		if nums[j] > nums[pivot] {
			return j
		}
	}
	return -1 // Should never happen if pivot is valid
}

// reverseSuffix reverses nums[start:] in-place.
func reverseSuffix(nums []int, start int) {
	end := len(nums) - 1
	for start < end {
		nums[start], nums[end] = nums[end], nums[start]
		start++
		end--
	}
}

// ============================================================================
// UTILITY: Generate All Permutations in Order
// ============================================================================

// GenerateAllPermutationsInOrder generates all permutations in lexicographic
// order using NextPermutation.
func GenerateAllPermutationsInOrder(nums []int) [][]int {
	// Start with smallest permutation
	arr := make([]int, len(nums))
	copy(arr, nums)
	sort.Ints(arr)

	result := [][]int{}

	// Add first permutation
	first := make([]int, len(arr))
	copy(first, arr)
	result = append(result, first)

	// Keep getting next permutation until we wrap around
	for {
		prev := make([]int, len(arr))
		copy(prev, arr)

		NextPermutation(arr)

		// Check if we wrapped around (arr <= prev lexicographically)
		wrapped := true
		for i := 0; i < len(arr); i++ {
			if arr[i] > prev[i] {
				wrapped = false
				break
			} else if arr[i] < prev[i] {
				break
			}
		}

		if wrapped {
			break
		}

		perm := make([]int, len(arr))
		copy(perm, arr)
		result = append(result, perm)
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	type testCase struct {
		nums     []int
		expected []int
		desc     string
	}

	testCases := []testCase{
		{[]int{1, 2, 3}, []int{1, 3, 2}, "Basic ascending"},
		{[]int{3, 2, 1}, []int{1, 2, 3}, "Descending (wrap around)"},
		{[]int{1, 1, 5}, []int{1, 5, 1}, "With duplicates"},
		{[]int{1, 3, 2}, []int{2, 1, 3}, "Mixed"},
		{[]int{1}, []int{1}, "Single element"},
		{[]int{1, 2}, []int{2, 1}, "Two elements"},
		{[]int{2, 1}, []int{1, 2}, "Two elements (wrap)"},
		{[]int{1, 5, 8, 4, 7, 6, 5, 3, 1}, []int{1, 5, 8, 5, 1, 3, 4, 6, 7}, "Long example"},
		{[]int{2, 3, 1}, []int{3, 1, 2}, "Another mixed"},
	}

	type approach struct {
		name string
		fn   func([]int)
	}

	approaches := []approach{
		{"In-Place (Optimal)", NextPermutation},
		{"Modular", NextPermutationModular},
	}

	fmt.Println("======================================================================")
	fmt.Println("NEXT PERMUTATION - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, appr := range approaches {
		fmt.Printf("\n%s:\n", appr.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Make a copy of input
			testNums := make([]int, len(tc.nums))
			copy(testNums, tc.nums)

			appr.fn(testNums)

			passed := slicesEqual(testNums, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: %v -> %v\n", status, tc.desc, tc.nums, testNums)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Demonstration
	fmt.Println("\n======================================================================")
	fmt.Println("ALGORITHM DEMONSTRATION")
	fmt.Println("======================================================================")

	demonstrateAlgorithm()

	// All permutations
	fmt.Println("\n======================================================================")
	fmt.Println("ALL PERMUTATIONS IN LEXICOGRAPHIC ORDER")
	fmt.Println("======================================================================")

	nums := []int{1, 2, 3}
	fmt.Printf("\nInput: %v\n", nums)
	fmt.Println("\nAll permutations:")
	allPerms := GenerateAllPermutationsInOrder(nums)
	for i, perm := range allPerms {
		fmt.Printf("  %d. %v\n", i+1, perm)
	}

	// Sample output
	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: nums = [1, 2, 3]")
	sample1 := []int{1, 2, 3}
	NextPermutation(sample1)
	fmt.Printf("Output: %v\n", sample1)

	fmt.Println("\nInput: nums = [3, 2, 1]")
	sample2 := []int{3, 2, 1}
	NextPermutation(sample2)
	fmt.Printf("Output: %v\n", sample2)

	fmt.Println("\nInput: nums = [1, 1, 5]")
	sample3 := []int{1, 1, 5}
	NextPermutation(sample3)
	fmt.Printf("Output: %v\n", sample3)
}

// slicesEqual checks if two slices are equal
func slicesEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

// demonstrateAlgorithm shows the algorithm step by step
func demonstrateAlgorithm() {
	nums := []int{1, 5, 8, 4, 7, 6, 5, 3, 1}
	fmt.Printf("\nInput: %v\n", nums)

	// Step 1: Find pivot
	pivot := -1
	for i := len(nums) - 2; i >= 0; i-- {
		if nums[i] < nums[i+1] {
			pivot = i
			break
		}
	}
	fmt.Println("\nStep 1: Find pivot")
	fmt.Printf("  Pivot found at index %d, value = %d\n", pivot, nums[pivot])
	fmt.Printf("  Suffix %v is descending\n", nums[pivot+1:])

	// Step 2: Find successor
	successor := -1
	for j := len(nums) - 1; j > pivot; j-- {
		if nums[j] > nums[pivot] {
			successor = j
			break
		}
	}
	fmt.Println("\nStep 2: Find successor")
	fmt.Printf("  Successor found at index %d, value = %d\n", successor, nums[successor])
	fmt.Printf("  (Smallest value in suffix greater than %d)\n", nums[pivot])

	// Step 3: Swap
	nums[pivot], nums[successor] = nums[successor], nums[pivot]
	fmt.Println("\nStep 3: Swap pivot and successor")
	fmt.Printf("  After swap: %v\n", nums)

	// Step 4: Reverse suffix
	left, right := pivot+1, len(nums)-1
	for left < right {
		nums[left], nums[right] = nums[right], nums[left]
		left++
		right--
	}
	fmt.Println("\nStep 4: Reverse suffix")
	fmt.Printf("  Final result: %v\n", nums)
}
