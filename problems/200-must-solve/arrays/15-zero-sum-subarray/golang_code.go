package main

import "fmt"

// ZeroSumSubarray determines if there exists a contiguous subarray that sums to zero.
// Time: O(n) | Space: O(n)
//
// Key insight: If prefix sum repeats, the subarray between those positions equals 0.
func ZeroSumSubarray(nums []int) bool {
	// Start with 0 in set to handle subarray starting at index 0
	prefixSums := map[int]bool{0: true}
	currentSum := 0

	for _, num := range nums {
		currentSum += num
		// If we've seen this prefix sum before, found zero sum subarray
		if prefixSums[currentSum] {
			return true
		}
		prefixSums[currentSum] = true
	}

	return false
}

// ZeroSumSubarrayWithIndices returns the start and end indices of a zero-sum subarray.
// Returns (-1, -1) if no such subarray exists.
func ZeroSumSubarrayWithIndices(nums []int) (int, int) {
	// Maps prefix sum to its first occurrence index
	prefixSums := map[int]int{0: -1}
	currentSum := 0

	for i, num := range nums {
		currentSum += num
		if prevIdx, exists := prefixSums[currentSum]; exists {
			// Found! Subarray is from prevIdx+1 to i
			return prevIdx + 1, i
		}
		prefixSums[currentSum] = i
	}

	return -1, -1
}

func main() {
	// Test 1: Has zero sum subarray
	fmt.Println(ZeroSumSubarray([]int{1, 2, -2, 3})) // true

	// Test 2: No zero sum subarray
	fmt.Println(ZeroSumSubarray([]int{1, 2, 3, 4, 5})) // false

	// Test 3: Zero sum from start
	fmt.Println(ZeroSumSubarray([]int{-5, 5, 2, -3, 1})) // true

	// Test 4: Single zero
	fmt.Println(ZeroSumSubarray([]int{1, 0, 3})) // true

	// Test with indices
	start, end := ZeroSumSubarrayWithIndices([]int{1, 2, -2, 3})
	fmt.Printf("Zero sum subarray indices: (%d, %d)\n", start, end) // (1, 2)
}
