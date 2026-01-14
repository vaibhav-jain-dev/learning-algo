// Find Pivot Index
//
// Given an array of integers nums, calculate the pivot index of this array.
// The pivot index is the index where the sum of all the numbers strictly
// to the left equals the sum of all the numbers strictly to the right.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

package main

import (
	"fmt"
	"strconv"
	"strings"
)

// pivotIndex finds the leftmost pivot index where left sum equals right sum.
func pivotIndex(nums []int) int {
	totalSum := 0
	for _, num := range nums {
		totalSum += num
	}

	leftSum := 0
	for i, num := range nums {
		// Check if current index is the pivot
		// leftSum == rightSum
		// leftSum == totalSum - leftSum - nums[i]
		// 2 * leftSum + nums[i] == totalSum
		if 2*leftSum+num == totalSum {
			return i
		}
		leftSum += num
	}

	return -1
}

// pivotIndexWithPrefixArray is an alternative solution using prefix sum array.
// Uses O(n) extra space but is more intuitive.
func pivotIndexWithPrefixArray(nums []int) int {
	n := len(nums)
	prefix := make([]int, n+1)

	// Build prefix sum array
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + nums[i]
	}

	total := prefix[n]

	for i := 0; i < n; i++ {
		leftSum := prefix[i]
		rightSum := total - prefix[i+1]

		if leftSum == rightSum {
			return i
		}
	}

	return -1
}

// pivotIndexBruteForce is a brute force approach - O(n^2) time complexity.
// Included for verification.
func pivotIndexBruteForce(nums []int) int {
	n := len(nums)

	for i := 0; i < n; i++ {
		leftSum := 0
		for j := 0; j < i; j++ {
			leftSum += nums[j]
		}

		rightSum := 0
		for j := i + 1; j < n; j++ {
			rightSum += nums[j]
		}

		if leftSum == rightSum {
			return i
		}
	}

	return -1
}

// TestCase represents a test case
type TestCase struct {
	nums     []int
	expected int
}

func runTests() bool {
	testCases := []TestCase{
		{[]int{1, 7, 3, 6, 5, 6}, 3},
		{[]int{1, 2, 3}, -1},
		{[]int{2, 1, -1}, 0},
		{[]int{-1, -1, -1, -1, -1, 0}, 2},
		{[]int{1}, 0},               // Single element: left = 0, right = 0
		{[]int{1, 0}, 0},            // left = 0, right = 0
		{[]int{0, 1}, 1},            // left = 0, right = 0
		{[]int{1, -1, 2}, 2},        // left = 0, right = 0 at index 2
		{[]int{-1, -1, 0, 1, 1, 0}, 0},
		{[]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, -1},
		{[]int{10, 5, 5}, 0},
		{[]int{5, 10, 5}, 1},
		{[]int{5, 5, 10}, 2},
	}

	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("FIND PIVOT INDEX - TEST RESULTS")
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	for i, tc := range testCases {
		result := pivotIndex(tc.nums)
		prefixResult := pivotIndexWithPrefixArray(tc.nums)
		bruteResult := pivotIndexBruteForce(tc.nums)
		status := "PASS"

		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums = %v\n", tc.nums)
		fmt.Printf("  Expected: %d\n", tc.expected)
		fmt.Printf("  Got (optimal): %d\n", result)
		fmt.Printf("  Got (prefix array): %d\n", prefixResult)
		fmt.Printf("  Got (brute force): %d\n", bruteResult)

		// Verify all solutions match
		if !(result == prefixResult && prefixResult == bruteResult) {
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

// intSliceToString converts a slice of ints to a string with a separator
func intSliceToString(nums []int, sep string) string {
	if len(nums) == 0 {
		return "0"
	}
	strs := make([]string, len(nums))
	for i, n := range nums {
		strs[i] = strconv.Itoa(n)
	}
	return strings.Join(strs, sep)
}

// sumSlice returns the sum of a slice
func sumSlice(nums []int) int {
	sum := 0
	for _, n := range nums {
		sum += n
	}
	return sum
}

func demonstrateAlgorithm() {
	nums := []int{1, 7, 3, 6, 5, 6}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALGORITHM DEMONSTRATION")
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("Input: nums = %v\n", nums)

	fmt.Println()
	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("Step 1: Calculate total sum")
	fmt.Println(strings.Repeat("-", 40))

	totalSum := sumSlice(nums)
	fmt.Printf("totalSum = %s = %d\n", intSliceToString(nums, " + "), totalSum)

	fmt.Println()
	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("Step 2: Find pivot index")
	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("\nFor each index, check if 2*leftSum + nums[i] == totalSum")

	leftSum := 0
	pivot := -1

	for i, num := range nums {
		check := 2*leftSum + num
		isPivot := check == totalSum

		fmt.Printf("\nIndex %d, nums[%d] = %d:\n", i, i, num)
		fmt.Printf("  leftSum = %d\n", leftSum)
		fmt.Printf("  Check: 2*%d + %d = %d\n", leftSum, num, check)
		fmt.Printf("  totalSum = %d\n", totalSum)
		fmt.Printf("  Equal? %v\n", isPivot)

		if isPivot {
			pivot = i
			fmt.Printf("  -> PIVOT FOUND at index %d!\n", i)
			break
		}

		leftSum += num
		fmt.Printf("  Update leftSum = %d\n", leftSum)
	}

	fmt.Printf("\nResult: pivot index = %d\n", pivot)

	if pivot != -1 {
		fmt.Println()
		fmt.Println(strings.Repeat("-", 40))
		fmt.Println("Verification")
		fmt.Println(strings.Repeat("-", 40))

		left := nums[:pivot]
		right := nums[pivot+1:]
		leftSumVal := sumSlice(left)
		rightSumVal := sumSlice(right)

		fmt.Printf("\nAt pivot index %d:\n", pivot)
		fmt.Printf("  Element at pivot: %d\n", nums[pivot])
		fmt.Printf("  Left elements: %v\n", left)
		leftStr := intSliceToString(left, " + ")
		if len(left) == 0 {
			leftStr = "0"
		}
		fmt.Printf("  Left sum: %s = %d\n", leftStr, leftSumVal)
		fmt.Printf("  Right elements: %v\n", right)
		rightStr := intSliceToString(right, " + ")
		if len(right) == 0 {
			rightStr = "0"
		}
		fmt.Printf("  Right sum: %s = %d\n", rightStr, rightSumVal)
		fmt.Printf("  Left sum == Right sum? %v\n", leftSumVal == rightSumVal)
	}
}

func main() {
	runTests()
	demonstrateAlgorithm()
}
