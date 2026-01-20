/*
Permutations with Duplicates - Go Solutions

Given an array that may contain duplicates, return all unique permutations.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Sort + Used Array (Recommended)
// ============================================================================
// Time Complexity:  O(n! * n) - generate up to n! permutations, each of length n
// Space Complexity: O(n) - recursion stack and used array
//
// WHY THIS IS BEST:
// - Clean and intuitive deduplication logic
// - Sorting brings duplicates together
// - Skip rule: use duplicates in left-to-right order
// ============================================================================

// PermuteUnique generates all unique permutations of an array with duplicates.
//
// Key insight: Sort the array, then skip duplicates at the same recursion
// level by only using a duplicate if its predecessor is already used.
func PermuteUnique(nums []int) [][]int {
	result := [][]int{}

	// Sort to bring duplicates together
	sorted := make([]int, len(nums))
	copy(sorted, nums)
	sort.Ints(sorted)

	used := make([]bool, len(sorted))
	current := []int{}

	var backtrack func()
	backtrack = func() {
		// Base case: permutation is complete
		if len(current) == len(sorted) {
			// Make a copy before appending
			perm := make([]int, len(current))
			copy(perm, current)
			result = append(result, perm)
			return
		}

		for i := 0; i < len(sorted); i++ {
			// Skip if already used
			if used[i] {
				continue
			}

			// Skip duplicates: only use nums[i] if nums[i-1] is already used
			if i > 0 && sorted[i] == sorted[i-1] && !used[i-1] {
				continue
			}

			// Choose
			used[i] = true
			current = append(current, sorted[i])

			// Explore
			backtrack()

			// Unchoose (backtrack)
			current = current[:len(current)-1]
			used[i] = false
		}
	}

	backtrack()
	return result
}

// ============================================================================
// APPROACH 2: Counter/Frequency Map
// ============================================================================
// Time Complexity:  O(n! * n)
// Space Complexity: O(n) for recursion and counter
//
// WHEN TO USE:
// - When you want to avoid sorting
// - More natural for frequency-based thinking
// ============================================================================

// PermuteUniqueCounter uses a frequency counter instead of sorting.
func PermuteUniqueCounter(nums []int) [][]int {
	result := [][]int{}

	// Build frequency counter
	counter := make(map[int]int)
	for _, num := range nums {
		counter[num]++
	}

	// Get unique values for deterministic iteration
	uniqueVals := make([]int, 0, len(counter))
	for val := range counter {
		uniqueVals = append(uniqueVals, val)
	}
	sort.Ints(uniqueVals) // Sort for consistent output

	current := []int{}

	var backtrack func()
	backtrack = func() {
		if len(current) == len(nums) {
			perm := make([]int, len(current))
			copy(perm, current)
			result = append(result, perm)
			return
		}

		// Try each unique value with remaining count
		for _, num := range uniqueVals {
			if counter[num] > 0 {
				// Choose
				counter[num]--
				current = append(current, num)

				// Explore
				backtrack()

				// Unchoose
				current = current[:len(current)-1]
				counter[num]++
			}
		}
	}

	backtrack()
	return result
}

// ============================================================================
// APPROACH 3: Swap-based with Set Deduplication
// ============================================================================
// Time Complexity:  O(n! * n)
// Space Complexity: O(n) for recursion, O(n) for set at each level
//
// WHEN TO USE:
// - When you prefer the swap-based approach
// - Note: uses map as set for deduplication
// ============================================================================

// PermuteUniqueSwap uses swapping with set-based deduplication.
func PermuteUniqueSwap(nums []int) [][]int {
	result := [][]int{}

	// Work on a copy
	arr := make([]int, len(nums))
	copy(arr, nums)

	var backtrack func(start int)
	backtrack = func(start int) {
		if start == len(arr) {
			perm := make([]int, len(arr))
			copy(perm, arr)
			result = append(result, perm)
			return
		}

		// Track values placed at position 'start'
		seen := make(map[int]bool)

		for i := start; i < len(arr); i++ {
			if seen[arr[i]] {
				continue // Skip if we already placed this value here
			}
			seen[arr[i]] = true

			// Swap
			arr[start], arr[i] = arr[i], arr[start]

			// Recurse
			backtrack(start + 1)

			// Swap back
			arr[start], arr[i] = arr[i], arr[start]
		}
	}

	backtrack(0)
	return result
}

// ============================================================================
// TEST HELPERS
// ============================================================================

// sortPerms sorts each permutation and the list of permutations for comparison
func sortPerms(perms [][]int) [][]int {
	// Sort each permutation (for comparison purposes)
	result := make([][]int, len(perms))
	for i, p := range perms {
		result[i] = make([]int, len(p))
		copy(result[i], p)
	}

	// Sort the list of permutations lexicographically
	sort.Slice(result, func(i, j int) bool {
		for k := 0; k < len(result[i]) && k < len(result[j]); k++ {
			if result[i][k] != result[j][k] {
				return result[i][k] < result[j][k]
			}
		}
		return len(result[i]) < len(result[j])
	})

	return result
}

// permsEqual checks if two sets of permutations are equal
func permsEqual(a, b [][]int) bool {
	if len(a) != len(b) {
		return false
	}
	sortedA := sortPerms(a)
	sortedB := sortPerms(b)

	for i := range sortedA {
		if len(sortedA[i]) != len(sortedB[i]) {
			return false
		}
		for j := range sortedA[i] {
			if sortedA[i][j] != sortedB[i][j] {
				return false
			}
		}
	}
	return true
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	type testCase struct {
		nums     []int
		expected [][]int
		desc     string
	}

	testCases := []testCase{
		{
			[]int{1, 1, 2},
			[][]int{{1, 1, 2}, {1, 2, 1}, {2, 1, 1}},
			"Basic duplicates",
		},
		{
			[]int{1, 2, 3},
			[][]int{{1, 2, 3}, {1, 3, 2}, {2, 1, 3}, {2, 3, 1}, {3, 1, 2}, {3, 2, 1}},
			"No duplicates",
		},
		{
			[]int{1, 1, 1},
			[][]int{{1, 1, 1}},
			"All same",
		},
		{
			[]int{1},
			[][]int{{1}},
			"Single element",
		},
		{
			[]int{2, 2},
			[][]int{{2, 2}},
			"Two same elements",
		},
	}

	type approach struct {
		name string
		fn   func([]int) [][]int
	}

	approaches := []approach{
		{"Sort + Used Array", PermuteUnique},
		{"Counter/Frequency Map", PermuteUniqueCounter},
		{"Swap with Set", PermuteUniqueSwap},
	}

	fmt.Println("======================================================================")
	fmt.Println("PERMUTATIONS WITH DUPLICATES - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, appr := range approaches {
		fmt.Printf("\n%s:\n", appr.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Make a copy of input since some approaches modify it
			input := make([]int, len(tc.nums))
			copy(input, tc.nums)

			result := appr.fn(input)
			passed := permsEqual(result, tc.expected)

			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: nums=%v, count=%d\n", status, tc.desc, tc.nums, len(result))
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: nums = [1, 1, 2]")
	result := PermuteUnique([]int{1, 1, 2})
	fmt.Printf("Output: %v\n", result)

	fmt.Println("\nInput: nums = [1, 2, 3]")
	result = PermuteUnique([]int{1, 2, 3})
	fmt.Printf("Output: %v\n", result)

	fmt.Println("\nInput: nums = [1, 1, 1]")
	result = PermuteUnique([]int{1, 1, 1})
	fmt.Printf("Output: %v\n", result)

	// Demonstrate why deduplication matters
	fmt.Println("\n======================================================================")
	fmt.Println("DEMONSTRATION: Deduplication Comparison")
	fmt.Println("======================================================================")

	nums := []int{1, 1, 2}
	uniqueResult := PermuteUnique(nums)
	fmt.Printf("\nInput: %v\n", nums)
	fmt.Printf("Unique permutations: %d\n", len(uniqueResult))
	for _, p := range uniqueResult {
		fmt.Printf("  %v\n", p)
	}
	fmt.Println("\nWithout deduplication, we would get 6 permutations (3! = 6)")
	fmt.Println("With deduplication, we correctly get 3 unique permutations (3!/(2!) = 3)")
}
