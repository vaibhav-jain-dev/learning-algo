// Contiguous Array (Longest Subarray with Equal 0s and 1s)
//
// Given a binary array nums, return the maximum length of a contiguous
// subarray with an equal number of 0s and 1s.
//
// Time Complexity: O(n)
// Space Complexity: O(n)

package main

import (
	"fmt"
	"strings"
)

// findMaxLength finds the maximum length of contiguous subarray with equal 0s and 1s.
// Approach: Replace 0 with -1, then find longest subarray with sum = 0.
func findMaxLength(nums []int) int {
	// Map to store first occurrence of each prefix sum
	// Initialize with {0: -1} to handle subarrays starting from index 0
	sumIndex := make(map[int]int)
	sumIndex[0] = -1

	maxLength := 0
	runningSum := 0

	for i, num := range nums {
		// Treat 0 as -1
		if num == 1 {
			runningSum++
		} else {
			runningSum--
		}

		if idx, exists := sumIndex[runningSum]; exists {
			// Found a subarray with sum 0 (equal 0s and 1s)
			length := i - idx
			if length > maxLength {
				maxLength = length
			}
		} else {
			// Store first occurrence of this sum
			sumIndex[runningSum] = i
		}
	}

	return maxLength
}

// findMaxLengthBruteForce is a brute force approach - O(n^2) time complexity.
// Included for verification.
func findMaxLengthBruteForce(nums []int) int {
	n := len(nums)
	maxLength := 0

	for i := 0; i < n; i++ {
		zeros := 0
		ones := 0
		for j := i; j < n; j++ {
			if nums[j] == 0 {
				zeros++
			} else {
				ones++
			}

			if zeros == ones {
				length := j - i + 1
				if length > maxLength {
					maxLength = length
				}
			}
		}
	}

	return maxLength
}

// TestCase represents a test case
type TestCase struct {
	nums     []int
	expected int
}

func runTests() bool {
	testCases := []TestCase{
		{[]int{0, 1}, 2},
		{[]int{0, 1, 0}, 2},
		{[]int{0, 0, 1, 0, 0, 0, 1, 1}, 6},
		{[]int{0, 1, 1, 0, 1, 1, 1, 0}, 4},
		{[]int{0}, 0},
		{[]int{1}, 0},
		{[]int{0, 0, 0, 1, 1, 1}, 6},
		{[]int{1, 1, 1, 1}, 0},
		{[]int{0, 0, 0, 0}, 0},
		{[]int{0, 1, 0, 1}, 4},
		{[]int{1, 0, 1, 0, 1, 0}, 6},
		{[]int{0, 0, 1, 1, 0, 0, 1, 1}, 8},
		{[]int{1, 1, 0, 1, 0, 0, 1}, 6},
	}

	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("CONTIGUOUS ARRAY - TEST RESULTS")
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	for i, tc := range testCases {
		result := findMaxLength(tc.nums)
		bruteResult := findMaxLengthBruteForce(tc.nums)
		status := "PASS"

		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums = %v\n", tc.nums)
		fmt.Printf("  Expected: %d\n", tc.expected)
		fmt.Printf("  Got (optimal): %d\n", result)
		fmt.Printf("  Got (brute force): %d\n", bruteResult)

		if result != bruteResult {
			fmt.Println("  WARNING: Solutions differ!")
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
	nums := []int{0, 1, 0, 0, 1, 1}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALGORITHM DEMONSTRATION")
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("Input: nums = %v\n", nums)
	fmt.Println("\nKey insight: Replace 0 with -1, find longest subarray with sum = 0")

	fmt.Println()
	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("Step-by-step execution")
	fmt.Println(strings.Repeat("-", 40))

	sumIndex := make(map[int]int)
	sumIndex[0] = -1
	maxLength := 0
	runningSum := 0

	fmt.Printf("\nInitial state: sumIndex = %v, maxLength = 0\n", sumIndex)
	fmt.Println("\nProcessing each element:")

	for i, num := range nums {
		contribution := 1
		if num == 0 {
			contribution = -1
		}
		oldSum := runningSum
		runningSum += contribution

		fmt.Printf("\nIndex %d, value = %d (treated as %d):\n", i, num, contribution)
		fmt.Printf("  runningSum = %d + (%d) = %d\n", oldSum, contribution, runningSum)

		if idx, exists := sumIndex[runningSum]; exists {
			length := i - idx
			fmt.Printf("  Found runningSum = %d at index %d\n", runningSum, idx)
			fmt.Printf("  Subarray length = %d - (%d) = %d\n", i, idx, length)
			if length > maxLength {
				maxLength = length
				fmt.Printf("  -> New maxLength = %d\n", maxLength)
			} else {
				fmt.Printf("  -> maxLength unchanged = %d\n", maxLength)
			}
		} else {
			sumIndex[runningSum] = i
			fmt.Printf("  First occurrence of sum = %d, storing index %d\n", runningSum, i)
			fmt.Printf("  sumIndex = %v\n", sumIndex)
		}
	}

	fmt.Printf("\nFinal result: maxLength = %d\n", maxLength)

	// Verification
	if maxLength > 0 {
		fmt.Println()
		fmt.Println(strings.Repeat("-", 40))
		fmt.Println("Verification")
		fmt.Println(strings.Repeat("-", 40))

		// Find the actual subarray
		sumIndex = make(map[int]int)
		sumIndex[0] = -1
		runningSum = 0
		bestStart := 0
		bestEnd := 0

		for i, num := range nums {
			if num == 1 {
				runningSum++
			} else {
				runningSum--
			}
			if idx, exists := sumIndex[runningSum]; exists {
				length := i - idx
				if length == maxLength {
					bestStart = idx + 1
					bestEnd = i
				}
			} else {
				sumIndex[runningSum] = i
			}
		}

		subarray := nums[bestStart : bestEnd+1]
		zeros := 0
		ones := 0
		for _, v := range subarray {
			if v == 0 {
				zeros++
			} else {
				ones++
			}
		}

		fmt.Printf("\nLongest subarray: %v\n", subarray)
		fmt.Printf("Indices: %d to %d\n", bestStart, bestEnd)
		fmt.Printf("Count: %d zeros, %d ones\n", zeros, ones)
		fmt.Printf("Equal? %v\n", zeros == ones)
	}
}

func main() {
	runTests()
	demonstrateAlgorithm()
}
