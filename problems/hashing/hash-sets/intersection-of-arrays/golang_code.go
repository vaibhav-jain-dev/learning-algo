// Intersection of Two Arrays
//
// This solution uses hash sets to find common elements efficiently.
package main

import (
	"fmt"
	"sort"
)

// intersection finds unique elements present in both arrays.
// Time Complexity: O(n + m)
// Space Complexity: O(n + m)
func intersection(nums1 []int, nums2 []int) []int {
	// Convert to sets
	set1 := make(map[int]bool)
	for _, num := range nums1 {
		set1[num] = true
	}

	// Find intersection
	resultSet := make(map[int]bool)
	for _, num := range nums2 {
		if set1[num] {
			resultSet[num] = true
		}
	}

	// Convert to slice
	result := make([]int, 0, len(resultSet))
	for num := range resultSet {
		result = append(result, num)
	}

	return result
}

// intersectionOptimized iterates through smaller set
func intersectionOptimized(nums1 []int, nums2 []int) []int {
	set1 := make(map[int]bool)
	set2 := make(map[int]bool)

	for _, num := range nums1 {
		set1[num] = true
	}
	for _, num := range nums2 {
		set2[num] = true
	}

	// Iterate through smaller set
	var smaller, larger map[int]bool
	if len(set1) <= len(set2) {
		smaller, larger = set1, set2
	} else {
		smaller, larger = set2, set1
	}

	result := make([]int, 0)
	for num := range smaller {
		if larger[num] {
			result = append(result, num)
		}
	}

	return result
}

// intersectionSorted uses two pointers for sorted arrays
func intersectionSorted(nums1 []int, nums2 []int) []int {
	sort.Ints(nums1)
	sort.Ints(nums2)

	result := make([]int, 0)
	i, j := 0, 0

	for i < len(nums1) && j < len(nums2) {
		if nums1[i] == nums2[j] {
			// Avoid duplicates
			if len(result) == 0 || result[len(result)-1] != nums1[i] {
				result = append(result, nums1[i])
			}
			i++
			j++
		} else if nums1[i] < nums2[j] {
			i++
		} else {
			j++
		}
	}

	return result
}

func runTests() {
	testCases := []struct {
		nums1    []int
		nums2    []int
		expected []int
	}{
		{[]int{1, 2, 2, 1}, []int{2, 2}, []int{2}},
		{[]int{4, 9, 5}, []int{9, 4, 9, 8, 4}, []int{4, 9}},
		{[]int{1, 2, 3}, []int{4, 5, 6}, []int{}},
		{[]int{1}, []int{1}, []int{1}},
		{[]int{1, 2}, []int{1, 2}, []int{1, 2}},
		{[]int{}, []int{1, 2, 3}, []int{}},
		{[]int{1, 1, 1}, []int{1, 1, 1}, []int{1}},
		{[]int{1, 2, 3, 4, 5}, []int{3, 4, 5, 6, 7}, []int{3, 4, 5}},
	}

	fmt.Println("============================================================")
	fmt.Println("INTERSECTION OF TWO ARRAYS - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		// Make copies to avoid modification
		nums1Copy := make([]int, len(tc.nums1))
		nums2Copy := make([]int, len(tc.nums2))
		copy(nums1Copy, tc.nums1)
		copy(nums2Copy, tc.nums2)

		result := intersection(nums1Copy, nums2Copy)

		// Sort both for comparison
		sort.Ints(result)
		expectedSorted := make([]int, len(tc.expected))
		copy(expectedSorted, tc.expected)
		sort.Ints(expectedSorted)

		passed := len(result) == len(expectedSorted)
		if passed {
			for j := range result {
				if result[j] != expectedSorted[j] {
					passed = false
					break
				}
			}
		}

		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  nums1 = %v\n", tc.nums1)
		fmt.Printf("  nums2 = %v\n", tc.nums2)
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
	nums1 := []int{4, 9, 5}
	nums2 := []int{9, 4, 9, 8, 4}

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")
	fmt.Printf("nums1 = %v\n", nums1)
	fmt.Printf("nums2 = %v\n", nums2)

	// Step 1: Convert nums1 to set
	fmt.Println("\n--- Step 1: Convert nums1 to Set ---")
	set1 := make(map[int]bool)
	for _, num := range nums1 {
		set1[num] = true
	}
	fmt.Printf("set1 = %v\n", getKeys(set1))

	// Step 2: Find intersection
	fmt.Println("\n--- Step 2: Find Intersection ---")
	resultSet := make(map[int]bool)
	for _, num := range nums2 {
		inSet1 := set1[num]
		fmt.Printf("  Checking %d: in set1? %v", num, inSet1)
		if inSet1 {
			if !resultSet[num] {
				fmt.Printf(" -> Adding to result")
			} else {
				fmt.Printf(" -> Already in result")
			}
			resultSet[num] = true
		}
		fmt.Println()
	}

	result := getKeys(resultSet)
	fmt.Printf("\nResult: %v\n", result)
}

func getKeys(m map[int]bool) []int {
	keys := make([]int, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	return keys
}

func demonstrateSortedApproach() {
	nums1 := []int{1, 2, 2, 3, 4}
	nums2 := []int{2, 2, 3, 5}

	fmt.Println("\n============================================================")
	fmt.Println("TWO POINTERS DEMONSTRATION (Sorted Arrays)")
	fmt.Println("============================================================")
	fmt.Printf("nums1 (sorted) = %v\n", nums1)
	fmt.Printf("nums2 (sorted) = %v\n", nums2)
	fmt.Println()

	result := make([]int, 0)
	i, j := 0, 0

	for i < len(nums1) && j < len(nums2) {
		fmt.Printf("i=%d (nums1[i]=%d), j=%d (nums2[j]=%d)", i, nums1[i], j, nums2[j])

		if nums1[i] == nums2[j] {
			if len(result) == 0 || result[len(result)-1] != nums1[i] {
				result = append(result, nums1[i])
				fmt.Printf(" -> EQUAL, add %d to result\n", nums1[i])
			} else {
				fmt.Printf(" -> EQUAL but %d already in result, skip\n", nums1[i])
			}
			i++
			j++
		} else if nums1[i] < nums2[j] {
			fmt.Println(" -> nums1[i] < nums2[j], i++")
			i++
		} else {
			fmt.Println(" -> nums1[i] > nums2[j], j++")
			j++
		}
	}

	fmt.Printf("\nFinal result: %v\n", result)
}

func main() {
	runTests()
	demonstrateApproach()
	demonstrateSortedApproach()
}
