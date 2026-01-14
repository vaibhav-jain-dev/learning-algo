// Two Sum - Find two numbers that add up to target
//
// This solution uses a hash map to achieve O(n) time complexity.
package main

import (
	"fmt"
)

// twoSum finds indices of two numbers that add up to target.
// Time Complexity: O(n)
// Space Complexity: O(n)
func twoSum(nums []int, target int) []int {
	// Hash map to store number -> index mapping
	numToIndex := make(map[int]int)

	for i, num := range nums {
		// Calculate what number we need to find
		complement := target - num

		// Check if complement exists in our map
		if idx, exists := numToIndex[complement]; exists {
			return []int{idx, i}
		}

		// Store current number and its index
		numToIndex[num] = i
	}

	// No solution found (problem guarantees one exists)
	return []int{}
}

// twoSumBruteForce is the brute force approach - O(n^2) time complexity.
// Included for comparison.
func twoSumBruteForce(nums []int, target int) []int {
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				return []int{i, j}
			}
		}
	}
	return []int{}
}

// TestCase represents a test case for the two sum problem
type TestCase struct {
	nums     []int
	target   int
	expected []int
}

func runTests() {
	testCases := []TestCase{
		{[]int{2, 7, 11, 15}, 9, []int{0, 1}},
		{[]int{3, 2, 4}, 6, []int{1, 2}},
		{[]int{3, 3}, 6, []int{0, 1}},
		{[]int{1, 5, 3, 7, 8, 2, 4}, 9, []int{1, 5}},     // 5 + 4 = 9
		{[]int{-1, -2, -3, -4, -5}, -8, []int{2, 4}},     // -3 + -5 = -8
		{[]int{0, 4, 3, 0}, 0, []int{0, 3}},              // 0 + 0 = 0
		{[]int{1, 2}, 3, []int{0, 1}},                    // Minimum size array
	}

	fmt.Println("============================================================")
	fmt.Println("TWO SUM - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		// Make a copy of nums to avoid modification
		numsCopy := make([]int, len(tc.nums))
		copy(numsCopy, tc.nums)

		result := twoSum(numsCopy, tc.target)

		// Verify the result is valid (sums to target)
		isValid := len(result) == 2 &&
			tc.nums[result[0]]+tc.nums[result[1]] == tc.target &&
			result[0] != result[1]

		passed := isValid
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums = %v, target = %d\n", tc.nums, tc.target)
		fmt.Printf("  Output: %v\n", result)
		fmt.Printf("  Expected: %v\n", tc.expected)
		if isValid {
			fmt.Printf("  Verification: nums[%d] + nums[%d] = %d + %d = %d\n",
				result[0], result[1],
				tc.nums[result[0]], tc.nums[result[1]], tc.target)
		}
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("Overall: ALL TESTS PASSED")
	} else {
		fmt.Println("Overall: SOME TESTS FAILED")
	}
	fmt.Println("============================================================")
}

func demonstrateApproach() {
	nums := []int{2, 7, 11, 15}
	target := 9

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")
	fmt.Printf("Input: nums = %v, target = %d\n", nums, target)
	fmt.Println("\nProcess:")

	numToIndex := make(map[int]int)

	for i, num := range nums {
		complement := target - num
		fmt.Printf("\nStep %d: Processing nums[%d] = %d\n", i+1, i, num)
		fmt.Printf("  Complement needed: %d - %d = %d\n", target, num, complement)
		fmt.Printf("  Current hash map: %v\n", numToIndex)

		if idx, exists := numToIndex[complement]; exists {
			fmt.Printf("  Found! %d exists at index %d\n", complement, idx)
			fmt.Printf("  Return [%d, %d]\n", idx, i)
			break
		} else {
			fmt.Printf("  %d not found, adding %d -> %d to map\n", complement, num, i)
			numToIndex[num] = i
		}
	}
}

func main() {
	runTests()
	demonstrateApproach()
}
