// Maximum Sum Subarray of Size K
//
// Given an array of integers and a positive integer k, find the maximum sum
// of any contiguous subarray of size k.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

package main

import (
	"fmt"
)

// maxSumSubarrayK finds the maximum sum of any contiguous subarray of size k.
func maxSumSubarrayK(arr []int, k int) int {
	if len(arr) == 0 || k <= 0 || k > len(arr) {
		return 0
	}

	n := len(arr)

	// Calculate sum of first window
	windowSum := 0
	for i := 0; i < k; i++ {
		windowSum += arr[i]
	}
	maxSum := windowSum

	// Slide the window from left to right
	for i := k; i < n; i++ {
		// Add the new element entering the window
		// Subtract the element leaving the window
		windowSum = windowSum + arr[i] - arr[i-k]
		if windowSum > maxSum {
			maxSum = windowSum
		}
	}

	return maxSum
}

// maxSumSubarrayKBruteForce is the brute force approach - O(n*k) time complexity.
func maxSumSubarrayKBruteForce(arr []int, k int) int {
	if len(arr) == 0 || k <= 0 || k > len(arr) {
		return 0
	}

	n := len(arr)
	maxSum := arr[0] // Initialize with first element

	// Calculate sum starting at first position for initial maxSum
	firstSum := 0
	for i := 0; i < k; i++ {
		firstSum += arr[i]
	}
	maxSum = firstSum

	for i := 1; i <= n-k; i++ {
		currentSum := 0
		for j := i; j < i+k; j++ {
			currentSum += arr[j]
		}
		if currentSum > maxSum {
			maxSum = currentSum
		}
	}

	return maxSum
}

func runTests() bool {
	type testCase struct {
		arr      []int
		k        int
		expected int
	}

	testCases := []testCase{
		{[]int{2, 1, 5, 1, 3, 2}, 3, 9},
		{[]int{2, 3, 4, 1, 5}, 2, 7},
		{[]int{1, 1, 1, 1, 1}, 3, 3},
		{[]int{5}, 1, 5},
		{[]int{1, 2, 3, 4, 5}, 5, 15},
		{[]int{-1, -2, -3, -4}, 2, -3},
		{[]int{4, -1, 2, 1, 6}, 3, 9},
		{[]int{1, 4, 2, 10, 23, 3, 1, 0, 20}, 4, 39},
	}

	fmt.Println("Testing Maximum Sum Subarray of Size K")
	fmt.Println("==================================================")

	allPassed := true

	for i, tc := range testCases {
		result := maxSumSubarrayK(tc.arr, tc.k)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("Test %d: %s\n", i+1, status)
		fmt.Printf("  Input: arr=%v, k=%d\n", tc.arr, tc.k)
		fmt.Printf("  Expected: %d, Got: %d\n\n", tc.expected, result)
	}

	// Verify brute force gives same results
	fmt.Println("Verifying brute force approach matches...")
	for _, tc := range testCases {
		bfResult := maxSumSubarrayKBruteForce(tc.arr, tc.k)
		optResult := maxSumSubarrayK(tc.arr, tc.k)
		if bfResult != optResult {
			fmt.Printf("  Mismatch! BF=%d, Optimal=%d\n", bfResult, optResult)
			allPassed = false
		}
	}
	fmt.Println("  All brute force results match optimal solution!")
	fmt.Println()

	if allPassed {
		fmt.Println("All tests PASSED!")
	} else {
		fmt.Println("Some tests FAILED!")
	}

	return allPassed
}

func main() {
	runTests()
}
