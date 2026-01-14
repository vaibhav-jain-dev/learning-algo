// Subarray Sum Equals K
//
// Given an array of integers nums and an integer k, return the total number
// of subarrays whose sum equals to k.
//
// Time Complexity: O(n)
// Space Complexity: O(n)

package main

import (
	"fmt"
	"strings"
)

// subarraySum counts subarrays with sum equal to k using prefix sum and hash map.
func subarraySum(nums []int, k int) int {
	count := 0
	prefixSum := 0

	// Map to store frequency of prefix sums
	// Initialize with {0: 1} to handle subarrays starting from index 0
	prefixCount := make(map[int]int)
	prefixCount[0] = 1

	for _, num := range nums {
		prefixSum += num

		// If (prefixSum - k) exists in map, we found subarrays ending here
		// that sum to k
		if freq, exists := prefixCount[prefixSum-k]; exists {
			count += freq
		}

		// Add current prefixSum to the map
		prefixCount[prefixSum]++
	}

	return count
}

// subarraySumBruteForce is a brute force approach - O(n^2) time complexity.
// Included for comparison and understanding.
func subarraySumBruteForce(nums []int, k int) int {
	count := 0
	n := len(nums)

	for i := 0; i < n; i++ {
		currentSum := 0
		for j := i; j < n; j++ {
			currentSum += nums[j]
			if currentSum == k {
				count++
			}
		}
	}

	return count
}

// TestCase represents a test case for the algorithm
type TestCase struct {
	nums     []int
	k        int
	expected int
}

func runTests() bool {
	testCases := []TestCase{
		{[]int{1, 1, 1}, 2, 2},
		{[]int{1, 2, 3}, 3, 2},
		{[]int{1, -1, 0}, 0, 3},
		{[]int{3, 4, 7, 2, -3, 1, 4, 2}, 7, 4},
		{[]int{1}, 1, 1},
		{[]int{1}, 0, 0},
		{[]int{-1, -1, 1}, 0, 1},
		{[]int{0, 0, 0, 0, 0}, 0, 15}, // All subarrays sum to 0
		{[]int{1, 2, 1, 2, 1}, 3, 4},
		{[]int{100, -100, 100, -100}, 0, 4},
	}

	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("SUBARRAY SUM EQUALS K - TEST RESULTS")
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	for i, tc := range testCases {
		result := subarraySum(tc.nums, tc.k)
		bruteResult := subarraySumBruteForce(tc.nums, tc.k)

		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums = %v, k = %d\n", tc.nums, tc.k)
		fmt.Printf("  Expected: %d\n", tc.expected)
		fmt.Printf("  Got (optimal): %d\n", result)
		fmt.Printf("  Got (brute force): %d\n", bruteResult)

		if result != bruteResult {
			fmt.Println("  WARNING: Brute force and optimal solutions differ!")
		}
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	if allPassed {
		fmt.Println("ALL TESTS PASSED!")
	} else {
		fmt.Println("SOME TESTS FAILED!")
	}
	fmt.Println(strings.Repeat("=", 60))

	return allPassed
}

func demonstrateAlgorithm() {
	nums := []int{1, 2, 3}
	k := 3

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALGORITHM DEMONSTRATION")
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("Input: nums = %v, k = %d\n", nums, k)
	fmt.Println("\nStep-by-step execution:")
	fmt.Println(strings.Repeat("-", 40))

	prefixSum := 0
	prefixCount := make(map[int]int)
	prefixCount[0] = 1
	count := 0

	fmt.Println("Initial state: prefixCount = {0: 1}, count = 0")

	for i, num := range nums {
		prefixSum += num
		found := prefixCount[prefixSum-k]

		fmt.Printf("\nIndex %d, value = %d:\n", i, num)
		fmt.Printf("  prefixSum = %d\n", prefixSum)
		fmt.Printf("  Looking for prefixSum - k = %d - %d = %d\n", prefixSum, k, prefixSum-k)
		fmt.Printf("  Found %d times in prefixCount\n", found)

		if found > 0 {
			count += found
			fmt.Printf("  -> Adding %d to count, count = %d\n", found, count)
		}

		prefixCount[prefixSum]++
		fmt.Printf("  Updated prefixCount = %v\n", prefixCount)
	}

	fmt.Printf("\nFinal count: %d\n", count)
}

func main() {
	runTests()
	demonstrateAlgorithm()
}
