// Remove Duplicates from Sorted Array
//
// Problem: Given a sorted array, remove duplicates in-place and return the new length.
// Technique: Two-pointer (slow-fast pointer) approach.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

package main

import (
	"fmt"
	"reflect"
)

// removeDuplicates removes duplicates from a sorted slice in-place
// and returns the number of unique elements.
func removeDuplicates(nums []int) int {
	// Edge case: empty slice
	if len(nums) == 0 {
		return 0
	}

	// Slow pointer - tracks position of last unique element
	slow := 0

	// Fast pointer - scans through the slice
	for fast := 1; fast < len(nums); fast++ {
		// Found a new unique element
		if nums[fast] != nums[slow] {
			slow++
			nums[slow] = nums[fast]
		}
	}

	// Return count of unique elements (slow is index, so add 1)
	return slow + 1
}

// removeDuplicatesVerbose is the same algorithm with detailed output for learning
func removeDuplicatesVerbose(nums []int) int {
	if len(nums) == 0 {
		fmt.Println("Empty slice, returning 0")
		return 0
	}

	fmt.Printf("Initial slice: %v\n", nums)
	fmt.Printf("Length: %d\n", len(nums))
	fmt.Println(strings(50, '-'))

	slow := 0

	for fast := 1; fast < len(nums); fast++ {
		fmt.Printf("fast=%d, slow=%d\n", fast, slow)
		fmt.Printf("Comparing nums[%d]=%d with nums[%d]=%d\n", fast, nums[fast], slow, nums[slow])

		if nums[fast] != nums[slow] {
			slow++
			nums[slow] = nums[fast]
			fmt.Printf("  -> Found unique! Moved to position %d\n", slow)
			fmt.Printf("  -> Slice now: %v\n", nums)
		} else {
			fmt.Println("  -> Duplicate, skipping")
		}
		fmt.Println()
	}

	fmt.Println(strings(50, '-'))
	fmt.Printf("Final slice: %v\n", nums)
	fmt.Printf("Unique elements (first %d): %v\n", slow+1, nums[:slow+1])

	return slow + 1
}

// strings creates a string of n copies of the character c
func strings(n int, c rune) string {
	result := make([]rune, n)
	for i := range result {
		result[i] = c
	}
	return string(result)
}

// TestCase represents a single test case
type TestCase struct {
	input          []int
	expectedLen    int
	expectedPrefix []int
	description    string
}

// runTests executes all test cases
func runTests() bool {
	fmt.Println(strings(60, '='))
	fmt.Println("REMOVE DUPLICATES FROM SORTED ARRAY - TEST CASES")
	fmt.Println(strings(60, '='))

	testCases := []TestCase{
		{
			input:          []int{1, 1, 2},
			expectedLen:    2,
			expectedPrefix: []int{1, 2},
			description:    "Basic case with one duplicate",
		},
		{
			input:          []int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4},
			expectedLen:    5,
			expectedPrefix: []int{0, 1, 2, 3, 4},
			description:    "Multiple duplicates",
		},
		{
			input:          []int{1, 2, 3},
			expectedLen:    3,
			expectedPrefix: []int{1, 2, 3},
			description:    "No duplicates",
		},
		{
			input:          []int{},
			expectedLen:    0,
			expectedPrefix: []int{},
			description:    "Empty slice",
		},
		{
			input:          []int{1},
			expectedLen:    1,
			expectedPrefix: []int{1},
			description:    "Single element",
		},
		{
			input:          []int{1, 1, 1, 1, 1},
			expectedLen:    1,
			expectedPrefix: []int{1},
			description:    "All same elements",
		},
		{
			input:          []int{-3, -1, -1, 0, 0, 0, 1, 2, 2},
			expectedLen:    5,
			expectedPrefix: []int{-3, -1, 0, 1, 2},
			description:    "Negative numbers",
		},
		{
			input:          []int{1, 2},
			expectedLen:    2,
			expectedPrefix: []int{1, 2},
			description:    "Two different elements",
		},
	}

	allPassed := true

	for i, tc := range testCases {
		// Make a copy since we modify in-place
		nums := make([]int, len(tc.input))
		copy(nums, tc.input)

		resultLen := removeDuplicates(nums)

		var resultPrefix []int
		if resultLen > 0 {
			resultPrefix = nums[:resultLen]
		} else {
			resultPrefix = []int{}
		}

		passed := resultLen == tc.expectedLen && reflect.DeepEqual(resultPrefix, tc.expectedPrefix)

		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s - %s\n", i+1, status, tc.description)
		fmt.Printf("  Input:    %v\n", tc.input)
		fmt.Printf("  Expected: length=%d, prefix=%v\n", tc.expectedLen, tc.expectedPrefix)
		fmt.Printf("  Got:      length=%d, prefix=%v\n", resultLen, resultPrefix)
	}

	fmt.Println()
	fmt.Println(strings(60, '='))
	if allPassed {
		fmt.Println("ALL TESTS PASSED!")
	} else {
		fmt.Println("SOME TESTS FAILED!")
	}
	fmt.Println(strings(60, '='))

	return allPassed
}

// demonstrateVerbose shows the algorithm step by step
func demonstrateVerbose() {
	fmt.Println()
	fmt.Println(strings(60, '='))
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println(strings(60, '='))
	fmt.Println()

	nums := []int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4}
	result := removeDuplicatesVerbose(nums)
	fmt.Printf("\nReturned length: %d\n", result)
}

func main() {
	// Run test cases
	runTests()

	// Show verbose demonstration
	demonstrateVerbose()
}
