// Range Sum Query - Immutable
//
// Given an integer array nums, handle multiple queries to calculate the sum
// of elements between indices left and right (inclusive).
//
// Time Complexity:
//   - Initialization: O(n)
//   - Each query: O(1)
//
// Space Complexity: O(n)

package main

import (
	"fmt"
	"strings"
)

// NumArray is a range sum query class using prefix sums for O(1) queries.
type NumArray struct {
	prefix []int
}

// NewNumArray initializes the NumArray with the given array.
func NewNumArray(nums []int) *NumArray {
	n := len(nums)
	// prefix[i] = sum of nums[0] to nums[i-1]
	// prefix[0] = 0 (sum of no elements)
	prefix := make([]int, n+1)

	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + nums[i]
	}

	return &NumArray{prefix: prefix}
}

// SumRange returns the sum of elements from index left to right (inclusive).
func (na *NumArray) SumRange(left, right int) int {
	return na.prefix[right+1] - na.prefix[left]
}

// NumArrayNaive is a naive implementation that computes sum for each query.
// O(n) per query - included for comparison.
type NumArrayNaive struct {
	nums []int
}

// NewNumArrayNaive creates a naive NumArray.
func NewNumArrayNaive(nums []int) *NumArrayNaive {
	return &NumArrayNaive{nums: nums}
}

// SumRange computes the sum naively.
func (na *NumArrayNaive) SumRange(left, right int) int {
	sum := 0
	for i := left; i <= right; i++ {
		sum += na.nums[i]
	}
	return sum
}

// Query represents a range sum query
type Query struct {
	left     int
	right    int
	expected int
}

func runTests() bool {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("RANGE SUM QUERY - TEST RESULTS")
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	// Test Case 1
	fmt.Println("\nTest Case 1:")
	nums1 := []int{-2, 0, 3, -5, 2, -1}
	fmt.Printf("  nums = %v\n", nums1)

	numArray1 := NewNumArray(nums1)
	numArrayNaive1 := NewNumArrayNaive(nums1)

	queries1 := []Query{{0, 2, 1}, {2, 5, -1}, {0, 5, -3}}

	for _, q := range queries1 {
		result := numArray1.SumRange(q.left, q.right)
		naiveResult := numArrayNaive1.SumRange(q.left, q.right)
		status := "PASS"
		if result != q.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("  sumRange(%d, %d): %s\n", q.left, q.right, status)
		fmt.Printf("    Expected: %d, Got: %d, Naive: %d\n", q.expected, result, naiveResult)
	}

	// Test Case 2
	fmt.Println("\nTest Case 2:")
	nums2 := []int{1, 2, 3, 4, 5}
	fmt.Printf("  nums = %v\n", nums2)

	numArray2 := NewNumArray(nums2)
	numArrayNaive2 := NewNumArrayNaive(nums2)

	queries2 := []Query{{0, 4, 15}, {1, 3, 9}, {2, 2, 3}}

	for _, q := range queries2 {
		result := numArray2.SumRange(q.left, q.right)
		naiveResult := numArrayNaive2.SumRange(q.left, q.right)
		status := "PASS"
		if result != q.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("  sumRange(%d, %d): %s\n", q.left, q.right, status)
		fmt.Printf("    Expected: %d, Got: %d, Naive: %d\n", q.expected, result, naiveResult)
	}

	// Test Case 3 - Single element
	fmt.Println("\nTest Case 3 (Single element queries):")
	nums3 := []int{10, -5, 3, 8, -2, 7}
	fmt.Printf("  nums = %v\n", nums3)

	numArray3 := NewNumArray(nums3)
	numArrayNaive3 := NewNumArrayNaive(nums3)

	queries3 := []Query{{0, 0, 10}, {5, 5, 7}, {0, 5, 21}, {1, 4, 4}}

	for _, q := range queries3 {
		result := numArray3.SumRange(q.left, q.right)
		naiveResult := numArrayNaive3.SumRange(q.left, q.right)
		status := "PASS"
		if result != q.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("  sumRange(%d, %d): %s\n", q.left, q.right, status)
		fmt.Printf("    Expected: %d, Got: %d, Naive: %d\n", q.expected, result, naiveResult)
	}

	// Test Case 4 - All same elements
	fmt.Println("\nTest Case 4 (All same elements):")
	nums4 := []int{5, 5, 5, 5, 5}
	fmt.Printf("  nums = %v\n", nums4)

	numArray4 := NewNumArray(nums4)

	queries4 := []Query{{0, 0, 5}, {0, 4, 25}, {2, 3, 10}}

	for _, q := range queries4 {
		result := numArray4.SumRange(q.left, q.right)
		status := "PASS"
		if result != q.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("  sumRange(%d, %d): %s\n", q.left, q.right, status)
		fmt.Printf("    Expected: %d, Got: %d\n", q.expected, result)
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
	nums := []int{-2, 0, 3, -5, 2, -1}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALGORITHM DEMONSTRATION")
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("Input: nums = %v\n", nums)

	fmt.Println()
	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("Building Prefix Sum Array")
	fmt.Println(strings.Repeat("-", 40))

	n := len(nums)
	prefix := make([]int, n+1)

	fmt.Printf("\nInitial prefix array: %v\n", prefix)
	fmt.Println("\nBuilding prefix sums:")

	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + nums[i]
		fmt.Printf("  prefix[%d] = prefix[%d] + nums[%d]\n", i+1, i, i)
		fmt.Printf("         = %d + (%d) = %d\n", prefix[i], nums[i], prefix[i+1])
	}

	fmt.Printf("\nFinal prefix array: %v\n", prefix)

	fmt.Println()
	fmt.Println(strings.Repeat("-", 40))
	fmt.Println("Answering Queries")
	fmt.Println(strings.Repeat("-", 40))

	queries := []struct{ left, right int }{
		{0, 2}, {2, 5}, {0, 5},
	}

	for _, q := range queries {
		result := prefix[q.right+1] - prefix[q.left]
		fmt.Printf("\nsumRange(%d, %d):\n", q.left, q.right)
		fmt.Printf("  = prefix[%d] - prefix[%d]\n", q.right+1, q.left)
		fmt.Printf("  = %d - %d\n", prefix[q.right+1], prefix[q.left])
		fmt.Printf("  = %d\n", result)

		// Verify with actual sum
		actual := 0
		elements := make([]string, 0)
		for i := q.left; i <= q.right; i++ {
			actual += nums[i]
			elements = append(elements, fmt.Sprintf("%d", nums[i]))
		}
		fmt.Printf("  Verify: %s = %d\n", strings.Join(elements, " + "), actual)
	}
}

func main() {
	runTests()
	demonstrateAlgorithm()
}
