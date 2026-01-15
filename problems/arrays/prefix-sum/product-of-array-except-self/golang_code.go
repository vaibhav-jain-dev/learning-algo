// Product of Array Except Self
//
// Given an integer array nums, return an array answer such that answer[i]
// is equal to the product of all the elements of nums except nums[i].
//
// Must run in O(n) time without using division.
//
// Time Complexity: O(n)
// Space Complexity: O(1) extra space (output array doesn't count)

package main

import (
	"fmt"
	"strings"
)

// productExceptSelf computes product of array except self using O(1) extra space.
func productExceptSelf(nums []int) []int {
	n := len(nums)
	result := make([]int, n)

	// Initialize result array with 1s
	for i := range result {
		result[i] = 1
	}

	// First pass: compute left products
	// result[i] = product of all elements to the left of i
	leftProduct := 1
	for i := 0; i < n; i++ {
		result[i] = leftProduct
		leftProduct *= nums[i]
	}

	// Second pass: multiply by right products
	// Compute right product on the fly and multiply with result
	rightProduct := 1
	for i := n - 1; i >= 0; i-- {
		result[i] *= rightProduct
		rightProduct *= nums[i]
	}

	return result
}

// productExceptSelfTwoArrays is an alternative solution using two separate arrays for clarity.
// Uses O(n) extra space.
func productExceptSelfTwoArrays(nums []int) []int {
	n := len(nums)
	left := make([]int, n)
	right := make([]int, n)

	// Initialize with 1s
	for i := 0; i < n; i++ {
		left[i] = 1
		right[i] = 1
	}

	// Build left products array
	for i := 1; i < n; i++ {
		left[i] = left[i-1] * nums[i-1]
	}

	// Build right products array
	for i := n - 2; i >= 0; i-- {
		right[i] = right[i+1] * nums[i+1]
	}

	// Combine left and right products
	result := make([]int, n)
	for i := 0; i < n; i++ {
		result[i] = left[i] * right[i]
	}
	return result
}

// TestCase represents a test case for the algorithm
type TestCase struct {
	nums     []int
	expected []int
}

// slicesEqual checks if two integer slices are equal
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

func runTests() bool {
	testCases := []TestCase{
		{[]int{1, 2, 3, 4}, []int{24, 12, 8, 6}},
		{[]int{-1, 1, 0, -3, 3}, []int{0, 0, 9, 0, 0}},
		{[]int{2, 3, 4, 5}, []int{60, 40, 30, 24}},
		{[]int{1, 1, 1, 1}, []int{1, 1, 1, 1}},
		{[]int{2, 2}, []int{2, 2}},
		{[]int{0, 0}, []int{0, 0}},
		{[]int{1, 0}, []int{0, 1}},
		{[]int{-1, -1, -1, -1}, []int{-1, -1, -1, -1}},
		{[]int{1, 2, 0, 4}, []int{0, 0, 8, 0}},
		{[]int{5, 2, 3, 4}, []int{24, 60, 40, 30}},
	}

	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("PRODUCT OF ARRAY EXCEPT SELF - TEST RESULTS")
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	for i, tc := range testCases {
		result := productExceptSelf(tc.nums)
		resultTwoArrays := productExceptSelfTwoArrays(tc.nums)

		status := "PASS"
		if !slicesEqual(result, tc.expected) {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums = %v\n", tc.nums)
		fmt.Printf("  Expected: %v\n", tc.expected)
		fmt.Printf("  Got (O(1) space): %v\n", result)
		fmt.Printf("  Got (two arrays): %v\n", resultTwoArrays)

		if !slicesEqual(result, resultTwoArrays) {
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
	nums := []int{1, 2, 3, 4}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALGORITHM DEMONSTRATION")
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("Input: nums = %v\n", nums)
	fmt.Println()
	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("PASS 1: Building left products")
	fmt.Println(strings.Repeat("-", 40))

	n := len(nums)
	result := make([]int, n)
	for i := range result {
		result[i] = 1
	}
	leftProduct := 1

	for i := 0; i < n; i++ {
		fmt.Printf("\nIndex %d:\n", i)
		fmt.Printf("  result[%d] = leftProduct = %d\n", i, leftProduct)
		result[i] = leftProduct
		leftProduct *= nums[i]
		fmt.Printf("  leftProduct *= nums[%d] = %d\n", i, leftProduct)
		fmt.Printf("  Current result: %v\n", result)
	}

	fmt.Println()
	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("PASS 2: Multiplying by right products")
	fmt.Println(strings.Repeat("-", 40))

	rightProduct := 1
	for i := n - 1; i >= 0; i-- {
		fmt.Printf("\nIndex %d:\n", i)
		fmt.Printf("  result[%d] = %d * rightProduct(%d) = ", i, result[i], rightProduct)
		result[i] *= rightProduct
		fmt.Printf("%d\n", result[i])
		rightProduct *= nums[i]
		fmt.Printf("  rightProduct *= nums[%d] = %d\n", i, rightProduct)
		fmt.Printf("  Current result: %v\n", result)
	}

	fmt.Printf("\nFinal result: %v\n", result)
}

func main() {
	runTests()
	demonstrateAlgorithm()
}
