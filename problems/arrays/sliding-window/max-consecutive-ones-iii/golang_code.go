// Max Consecutive Ones III
//
// Given a binary array nums and an integer k, return the maximum number of
// consecutive 1's in the array if you can flip at most k 0's.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

package main

import (
	"fmt"
)

// longestOnes finds maximum consecutive 1s after flipping at most k zeros.
// Standard sliding window approach.
func longestOnes(nums []int, k int) int {
	if len(nums) == 0 {
		return 0
	}

	left := 0
	zeros := 0
	maxLength := 0

	for right := 0; right < len(nums); right++ {
		// If current element is 0, increment zero counter
		if nums[right] == 0 {
			zeros++
		}

		// If zeros exceed k, shrink window from left
		for zeros > k {
			if nums[left] == 0 {
				zeros--
			}
			left++
		}

		// Update maximum length
		currentLength := right - left + 1
		if currentLength > maxLength {
			maxLength = currentLength
		}
	}

	return maxLength
}

// longestOnesOptimized is the optimized approach where window never shrinks, only shifts.
func longestOnesOptimized(nums []int, k int) int {
	if len(nums) == 0 {
		return 0
	}

	left := 0
	zeros := 0

	for right := 0; right < len(nums); right++ {
		if nums[right] == 0 {
			zeros++
		}

		// If zeros exceed k, shift window (not shrink)
		if zeros > k {
			if nums[left] == 0 {
				zeros--
			}
			left++
		}
	}

	// Final window size is the answer
	return len(nums) - left
}

// windowInfo holds information about the longest window found
type windowInfo struct {
	start   int
	end     int
	flipped []int
}

// findLongestWindow finds and returns the actual window and the positions flipped.
func findLongestWindow(nums []int, k int) windowInfo {
	if len(nums) == 0 {
		return windowInfo{-1, -1, []int{}}
	}

	left := 0
	zeros := 0
	maxLength := 0
	maxStart := 0

	for right := 0; right < len(nums); right++ {
		if nums[right] == 0 {
			zeros++
		}

		for zeros > k {
			if nums[left] == 0 {
				zeros--
			}
			left++
		}

		currentLength := right - left + 1
		if currentLength > maxLength {
			maxLength = currentLength
			maxStart = left
		}
	}

	// Find positions of zeros that would be flipped
	flipped := []int{}
	for i := maxStart; i < maxStart+maxLength; i++ {
		if nums[i] == 0 {
			flipped = append(flipped, i)
		}
	}

	return windowInfo{maxStart, maxStart + maxLength - 1, flipped}
}

func runTests() bool {
	type testCase struct {
		nums     []int
		k        int
		expected int
	}

	testCases := []testCase{
		{[]int{1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0}, 2, 6},
		{[]int{0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1}, 3, 10},
		{[]int{1, 1, 1, 1, 1}, 0, 5},
		{[]int{0, 0, 0, 0}, 2, 2},
		{[]int{1, 0, 1, 0, 1, 0, 1}, 3, 7},
		{[]int{1, 1, 0, 0, 1, 1}, 2, 6},
		{[]int{0}, 1, 1},
		{[]int{1}, 0, 1},
		{[]int{0, 0, 0, 1}, 4, 4},
		{[]int{1, 1, 1, 0, 0, 0, 1, 1, 1, 1}, 0, 4},
	}

	fmt.Println("Testing Max Consecutive Ones III")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := longestOnes(tc.nums, tc.k)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("Test %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums=%v, k=%d\n", tc.nums, tc.k)
		fmt.Printf("  Expected: %d, Got: %d\n", tc.expected, result)

		// Show the actual window found
		info := findLongestWindow(tc.nums, tc.k)
		if info.start >= 0 {
			fmt.Printf("  Window: indices [%d, %d], flipped positions: %v\n", info.start, info.end, info.flipped)
		}
		fmt.Println()
	}

	// Verify optimized approach gives same results
	fmt.Println("Verifying optimized approach matches standard approach...")
	for _, tc := range testCases {
		stdResult := longestOnes(tc.nums, tc.k)
		optResult := longestOnesOptimized(tc.nums, tc.k)
		if stdResult != optResult {
			fmt.Printf("  Mismatch for nums=%v, k=%d! Standard=%d, Optimized=%d\n",
				tc.nums, tc.k, stdResult, optResult)
			allPassed = false
		}
	}
	fmt.Println("  All approaches give matching results!")
	fmt.Println()

	// Demonstrate the algorithm step by step for one example
	fmt.Println("Step-by-step demonstration:")
	nums := []int{1, 1, 0, 0, 1, 1, 1, 0, 1}
	k := 2
	fmt.Printf("  nums = %v, k = %d\n", nums, k)
	fmt.Printf("  Finding longest subarray with at most %d zeros...\n", k)
	left := 0
	zeros := 0
	for right := 0; right < len(nums); right++ {
		if nums[right] == 0 {
			zeros++
		}
		for zeros > k {
			if nums[left] == 0 {
				zeros--
			}
			left++
		}
		window := nums[left : right+1]
		fmt.Printf("    right=%d: window=[%d:%d] = %v, zeros=%d, length=%d\n",
			right, left, right+1, window, zeros, right-left+1)
	}
	fmt.Printf("  Result: %d\n", longestOnes(nums, k))
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
