// Package main implements the Three Sum problem solution.
//
// Find all unique triplets in the array that sum to zero.
// Uses the two-pointer technique after sorting the array.
//
// Time Complexity: O(n^2)
// Space Complexity: O(1) excluding the output slice
package main

import (
	"fmt"
	"sort"
)

// threeSum finds all unique triplets that sum to zero.
func threeSum(nums []int) [][]int {
	result := [][]int{}
	n := len(nums)

	// Edge case: need at least 3 numbers
	if n < 3 {
		return result
	}

	// Sort the array to enable two-pointer technique
	sort.Ints(nums)

	for i := 0; i < n-2; i++ {
		// Early termination: if smallest number is positive, no solution possible
		if nums[i] > 0 {
			break
		}

		// Skip duplicate values for the first element
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}

		// Two-pointer search for the remaining two elements
		left := i + 1
		right := n - 1
		target := -nums[i]

		for left < right {
			currentSum := nums[left] + nums[right]

			if currentSum < target {
				// Sum too small, need larger values
				left++
			} else if currentSum > target {
				// Sum too large, need smaller values
				right--
			} else {
				// Found a valid triplet
				result = append(result, []int{nums[i], nums[left], nums[right]})

				// Skip duplicates for left pointer
				for left < right && nums[left] == nums[left+1] {
					left++
				}

				// Skip duplicates for right pointer
				for left < right && nums[right] == nums[right-1] {
					right--
				}

				// Move both pointers inward
				left++
				right--
			}
		}
	}

	return result
}

// threeSumWithDetails is the same as threeSum but with detailed step-by-step output.
func threeSumWithDetails(nums []int) [][]int {
	result := [][]int{}
	n := len(nums)

	if n < 3 {
		fmt.Println("Array too small, need at least 3 elements")
		return result
	}

	// Make a copy to avoid modifying the original
	numsSorted := make([]int, n)
	copy(numsSorted, nums)
	sort.Ints(numsSorted)

	fmt.Printf("Original array: %v\n", nums)
	fmt.Printf("Sorted array: %v\n", numsSorted)
	fmt.Println("--------------------------------------------------")

	for i := 0; i < n-2; i++ {
		if numsSorted[i] > 0 {
			fmt.Printf("i=%d: nums[i]=%d > 0, breaking early\n", i, numsSorted[i])
			break
		}

		if i > 0 && numsSorted[i] == numsSorted[i-1] {
			fmt.Printf("i=%d: Skipping duplicate value %d\n", i, numsSorted[i])
			continue
		}

		fmt.Printf("\ni=%d, fixed element: %d, looking for pairs summing to %d\n",
			i, numsSorted[i], -numsSorted[i])

		left := i + 1
		right := n - 1
		target := -numsSorted[i]

		for left < right {
			currentSum := numsSorted[left] + numsSorted[right]
			fmt.Printf("  left=%d (%d), right=%d (%d), sum=%d\n",
				left, numsSorted[left], right, numsSorted[right], currentSum)

			if currentSum < target {
				fmt.Printf("    Sum %d < target %d, moving left pointer right\n", currentSum, target)
				left++
			} else if currentSum > target {
				fmt.Printf("    Sum %d > target %d, moving right pointer left\n", currentSum, target)
				right--
			} else {
				triplet := []int{numsSorted[i], numsSorted[left], numsSorted[right]}
				fmt.Printf("    Found triplet: %v\n", triplet)
				result = append(result, triplet)

				for left < right && numsSorted[left] == numsSorted[left+1] {
					left++
					fmt.Println("    Skipping duplicate left value")
				}

				for left < right && numsSorted[right] == numsSorted[right-1] {
					right--
					fmt.Println("    Skipping duplicate right value")
				}

				left++
				right--
			}
		}
	}

	fmt.Println("--------------------------------------------------")
	fmt.Printf("Final result: %v\n", result)
	return result
}

// TestCase represents a single test case
type TestCase struct {
	nums     []int
	expected [][]int
}

// sortTriplets sorts triplets for comparison
func sortTriplets(triplets [][]int) [][]int {
	// Sort each individual triplet
	for _, t := range triplets {
		sort.Ints(t)
	}

	// Sort the list of triplets
	sort.Slice(triplets, func(i, j int) bool {
		for k := 0; k < 3; k++ {
			if triplets[i][k] != triplets[j][k] {
				return triplets[i][k] < triplets[j][k]
			}
		}
		return false
	})

	return triplets
}

// compareTriplets checks if two triplet slices are equal
func compareTriplets(a, b [][]int) bool {
	if len(a) != len(b) {
		return false
	}

	aSorted := sortTriplets(a)
	bSorted := sortTriplets(b)

	for i := range aSorted {
		for j := 0; j < 3; j++ {
			if aSorted[i][j] != bSorted[i][j] {
				return false
			}
		}
	}
	return true
}

// copySlice creates a deep copy of a slice
func copySlice(nums []int) []int {
	result := make([]int, len(nums))
	copy(result, nums)
	return result
}

// copyTriplets creates a deep copy of triplets
func copyTriplets(triplets [][]int) [][]int {
	result := make([][]int, len(triplets))
	for i, t := range triplets {
		result[i] = make([]int, len(t))
		copy(result[i], t)
	}
	return result
}

// runTests runs all test cases
func runTests() bool {
	fmt.Println("============================================================")
	fmt.Println("Running Three Sum Tests")
	fmt.Println("============================================================")

	testCases := []TestCase{
		{
			nums:     []int{-1, 0, 1, 2, -1, -4},
			expected: [][]int{{-1, -1, 2}, {-1, 0, 1}},
		},
		{
			nums:     []int{0, 1, 1},
			expected: [][]int{},
		},
		{
			nums:     []int{0, 0, 0},
			expected: [][]int{{0, 0, 0}},
		},
		{
			nums:     []int{0, 0, 0, 0},
			expected: [][]int{{0, 0, 0}},
		},
		{
			nums:     []int{-2, 0, 1, 1, 2},
			expected: [][]int{{-2, 0, 2}, {-2, 1, 1}},
		},
		{
			nums:     []int{1, 2, -2, -1},
			expected: [][]int{},
		},
		{
			nums:     []int{-1, 0, 1, 0},
			expected: [][]int{{-1, 0, 1}},
		},
		{
			nums:     []int{-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6},
			expected: [][]int{{-4, -2, 6}, {-4, 0, 4}, {-4, 1, 3}, {-4, 2, 2}, {-2, -2, 4}, {-2, 0, 2}},
		},
	}

	allPassed := true

	for i, tc := range testCases {
		// Make a copy since the function sorts in place
		numsCopy := copySlice(tc.nums)
		result := threeSum(numsCopy)

		// Make copies for comparison (to avoid modifying originals)
		resultCopy := copyTriplets(result)
		expectedCopy := copyTriplets(tc.expected)

		passed := compareTriplets(resultCopy, expectedCopy)

		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: %v\n", tc.nums)
		fmt.Printf("  Expected: %v\n", tc.expected)
		fmt.Printf("  Got: %v\n", result)
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("All tests passed!")
	} else {
		fmt.Println("Some tests failed!")
	}
	fmt.Println("============================================================")

	return allPassed
}

// demoWithDetails demonstrates the algorithm with detailed output
func demoWithDetails() {
	fmt.Println("\n============================================================")
	fmt.Println("Detailed Walkthrough Demo")
	fmt.Println("============================================================")

	// Example with multiple triplets
	fmt.Println("\nExample 1: [-1, 0, 1, 2, -1, -4]")
	fmt.Println("--------------------------------------------------")
	threeSumWithDetails([]int{-1, 0, 1, 2, -1, -4})

	fmt.Println("\n\nExample 2: [-2, 0, 1, 1, 2]")
	fmt.Println("--------------------------------------------------")
	threeSumWithDetails([]int{-2, 0, 1, 1, 2})
}

func main() {
	// Run the test suite
	runTests()

	// Show detailed walkthrough
	demoWithDetails()
}
