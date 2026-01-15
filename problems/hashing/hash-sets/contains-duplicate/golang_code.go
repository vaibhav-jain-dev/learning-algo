// Contains Duplicate
//
// This solution uses a hash set to detect duplicates in O(n) time.
package main

import (
	"fmt"
	"sort"
	"time"
)

// containsDuplicate checks if any value appears at least twice.
// Time Complexity: O(n)
// Space Complexity: O(n)
func containsDuplicate(nums []int) bool {
	seen := make(map[int]bool)

	for _, num := range nums {
		if seen[num] {
			return true
		}
		seen[num] = true
	}

	return false
}

// containsDuplicateStruct uses empty struct for memory efficiency
func containsDuplicateStruct(nums []int) bool {
	seen := make(map[int]struct{})

	for _, num := range nums {
		if _, exists := seen[num]; exists {
			return true
		}
		seen[num] = struct{}{}
	}

	return false
}

// containsDuplicateSorting uses sorting approach
// Time Complexity: O(n log n)
// Space Complexity: O(1) if in-place sort
func containsDuplicateSorting(nums []int) bool {
	sorted := make([]int, len(nums))
	copy(sorted, nums)
	sort.Ints(sorted)

	for i := 1; i < len(sorted); i++ {
		if sorted[i] == sorted[i-1] {
			return true
		}
	}
	return false
}

func runTests() {
	testCases := []struct {
		nums     []int
		expected bool
	}{
		{[]int{1, 2, 3, 1}, true},
		{[]int{1, 2, 3, 4}, false},
		{[]int{1, 1, 1, 3, 3, 4, 3, 2, 4, 2}, true},
		{[]int{1}, false},                          // Single element
		{[]int{1, 1}, true},                        // Two same elements
		{[]int{1, 2}, false},                       // Two different elements
		{[]int{}, false},                           // Empty array
		{[]int{-1, -2, -3, -1}, true},              // Negative numbers
		{[]int{0, 0, 0, 0}, true},                  // All same
	}

	fmt.Println("============================================================")
	fmt.Println("CONTAINS DUPLICATE - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := containsDuplicate(tc.nums)
		passed := result == tc.expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		displayNums := fmt.Sprintf("%v", tc.nums)
		if len(tc.nums) > 10 {
			displayNums = fmt.Sprintf("%v...(%d elements)", tc.nums[:5], len(tc.nums))
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums = %s\n", displayNums)
		fmt.Printf("  Output: %v\n", result)
		fmt.Printf("  Expected: %v\n", tc.expected)
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
	examples := [][]int{
		{1, 2, 3, 1},  // Has duplicate
		{1, 2, 3, 4},  // No duplicate
	}

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")

	for _, nums := range examples {
		fmt.Printf("\nChecking: nums = %v\n", nums)
		fmt.Println("----------------------------------------")

		seen := make(map[int]bool)
		foundDuplicate := false

		for i, num := range nums {
			fmt.Printf("Step %d: Processing nums[%d] = %d\n", i+1, i, num)

			// Convert map to slice for display
			keys := make([]int, 0, len(seen))
			for k := range seen {
				keys = append(keys, k)
			}
			fmt.Printf("  Current set: %v\n", keys)

			if seen[num] {
				fmt.Printf("  %d is in the set -> DUPLICATE FOUND!\n", num)
				foundDuplicate = true
				break
			} else {
				seen[num] = true
				fmt.Printf("  %d not in set, adding it\n", num)
			}
		}

		if !foundDuplicate {
			keys := make([]int, 0, len(seen))
			for k := range seen {
				keys = append(keys, k)
			}
			fmt.Printf("\nProcessed all elements. Final set: %v\n", keys)
			fmt.Println("No duplicates found.")
		}

		fmt.Printf("\nResult: %v\n", foundDuplicate)
	}
}

func compareApproaches() {
	// Create test array
	testArray := make([]int, 10001)
	for i := 0; i < 10000; i++ {
		testArray[i] = i
	}
	testArray[10000] = 5000 // Duplicate

	fmt.Println("\n============================================================")
	fmt.Println("PERFORMANCE COMPARISON")
	fmt.Println("============================================================")
	fmt.Printf("Array size: %d\n", len(testArray))

	// Hash Set approach
	arr1 := make([]int, len(testArray))
	copy(arr1, testArray)
	start := time.Now()
	result1 := containsDuplicate(arr1)
	duration1 := time.Since(start)
	fmt.Printf("Hash Set: %v, Result: %v\n", duration1, result1)

	// Sorting approach
	arr2 := make([]int, len(testArray))
	copy(arr2, testArray)
	start = time.Now()
	result2 := containsDuplicateSorting(arr2)
	duration2 := time.Since(start)
	fmt.Printf("Sorting: %v, Result: %v\n", duration2, result2)
}

func main() {
	runTests()
	demonstrateApproach()
	compareApproaches()
}
