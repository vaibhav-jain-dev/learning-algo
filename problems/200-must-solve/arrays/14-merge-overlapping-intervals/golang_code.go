/*
Merge Overlapping Intervals - Go Solutions

Merge overlapping intervals and return non-overlapping intervals.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
	"reflect"
	"sort"
)

// ============================================================================
// APPROACH 1: Sort and Merge - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n log n) - dominated by sorting
// Space Complexity: O(n) - result array
//
// WHY THIS IS BEST:
// - Optimal time complexity (can't do better than O(n log n))
// - Simple and clean implementation
// - Standard technique for interval problems
// ============================================================================

// MergeOverlappingIntervals merges overlapping intervals using sort and merge.
//
// How it works:
//  1. Sort intervals by start time
//  2. Initialize result with first interval
//  3. For each subsequent interval:
//     - If overlaps with last in result: merge (update end)
//     - If no overlap: add as new interval
//
// Visual:
//
//	intervals = [[1,2], [3,5], [4,7], [6,8], [9,10]]
//
//	sorted = [[1,2], [3,5], [4,7], [6,8], [9,10]]
//
//	result = [[1,2]]
//	[3,5]: 3 > 2, no overlap -> result = [[1,2], [3,5]]
//	[4,7]: 4 <= 5, overlap -> merge to [3,7], result = [[1,2], [3,7]]
//	[6,8]: 6 <= 7, overlap -> merge to [3,8], result = [[1,2], [3,8]]
//	[9,10]: 9 > 8, no overlap -> result = [[1,2], [3,8], [9,10]]
func MergeOverlappingIntervals(intervals [][]int) [][]int {
	if len(intervals) == 0 {
		return intervals
	}

	// Sort by start time
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})

	// Initialize result with first interval
	merged := [][]int{intervals[0]}

	for i := 1; i < len(intervals); i++ {
		currentStart := intervals[i][0]
		currentEnd := intervals[i][1]
		lastIdx := len(merged) - 1
		lastEnd := merged[lastIdx][1]

		// Check if current interval overlaps with last merged interval
		if currentStart <= lastEnd {
			// Overlap: merge by extending the end
			if currentEnd > lastEnd {
				merged[lastIdx][1] = currentEnd
			}
		} else {
			// No overlap: add as new interval
			merged = append(merged, []int{currentStart, currentEnd})
		}
	}

	return merged
}

// ============================================================================
// APPROACH 2: In-Place Sort and Merge
// ============================================================================
// Time Complexity:  O(n log n) - dominated by sorting
// Space Complexity: O(1) - modifies input in place (not counting output)
//
// WHEN TO USE:
// - When you can modify input array
// - When minimizing memory allocation matters
// ============================================================================

// MergeOverlappingIntervalsInPlace merges intervals modifying input in place.
func MergeOverlappingIntervalsInPlace(intervals [][]int) [][]int {
	if len(intervals) <= 1 {
		return intervals
	}

	// Sort in place by start time
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})

	// Use a write pointer to track merged position
	writeIdx := 0

	for i := 1; i < len(intervals); i++ {
		// Check if current interval overlaps with last merged
		if intervals[i][0] <= intervals[writeIdx][1] {
			// Overlap: extend the end of merged interval
			if intervals[i][1] > intervals[writeIdx][1] {
				intervals[writeIdx][1] = intervals[i][1]
			}
		} else {
			// No overlap: move to next position
			writeIdx++
			intervals[writeIdx] = intervals[i]
		}
	}

	// Return only the merged portion
	return intervals[:writeIdx+1]
}

// ============================================================================
// APPROACH 3: Brute Force (Educational)
// ============================================================================
// Time Complexity:  O(n^2) - repeated scanning
// Space Complexity: O(n) - result array
//
// EDUCATIONAL VALUE:
// - Shows iterative merging approach
// - Demonstrates why sorting helps
// ============================================================================

// MergeOverlappingIntervalsBruteForce merges using brute force.
//
// How it works:
//  1. Copy intervals to result
//  2. Repeatedly scan for overlapping pairs
//  3. When found, merge them and restart scan
//  4. Stop when no overlaps found
func MergeOverlappingIntervalsBruteForce(intervals [][]int) [][]int {
	// Copy intervals
	result := make([][]int, len(intervals))
	for i, interval := range intervals {
		result[i] = []int{interval[0], interval[1]}
	}

	// Helper to check if two intervals overlap
	overlaps := func(int1, int2 []int) bool {
		return max(int1[0], int2[0]) <= min(int1[1], int2[1])
	}

	// Helper to merge two intervals
	mergeTwo := func(int1, int2 []int) []int {
		return []int{min(int1[0], int2[0]), max(int1[1], int2[1])}
	}

	// Keep merging until no changes
	changed := true
	for changed {
		changed = false
		i := 0
		for i < len(result) {
			j := i + 1
			for j < len(result) {
				if overlaps(result[i], result[j]) {
					// Merge and remove one
					result[i] = mergeTwo(result[i], result[j])
					result = append(result[:j], result[j+1:]...)
					changed = true
				} else {
					j++
				}
			}
			i++
		}
	}

	return result
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// ============================================================================
// TEST CASES AND COMPARISON
// ============================================================================

func main() {
	testCases := []struct {
		intervals [][]int
		expected  [][]int
		desc      string
	}{
		{[][]int{{1, 2}, {3, 5}, {4, 7}, {6, 8}, {9, 10}},
			[][]int{{1, 2}, {3, 8}, {9, 10}}, "Standard case"},
		{[][]int{{1, 3}, {2, 8}, {9, 10}},
			[][]int{{1, 8}, {9, 10}}, "Two overlapping"},
		{[][]int{{1, 10}, {2, 3}, {4, 5}, {6, 7}},
			[][]int{{1, 10}}, "One contains all"},
		{[][]int{{1, 2}, {3, 4}, {5, 6}},
			[][]int{{1, 2}, {3, 4}, {5, 6}}, "No overlaps"},
		{[][]int{{1, 3}, {2, 4}, {3, 5}},
			[][]int{{1, 5}}, "Chain overlap"},
		{[][]int{{6, 8}, {1, 9}, {2, 4}, {4, 7}},
			[][]int{{1, 9}}, "Unsorted, all merge"},
		{[][]int{{1, 2}},
			[][]int{{1, 2}}, "Single interval"},
		{[][]int{{1, 4}, {4, 5}},
			[][]int{{1, 5}}, "Touching intervals"},
		{[][]int{{1, 5}, {6, 10}},
			[][]int{{1, 5}, {6, 10}}, "Adjacent but not touching"},
	}

	// Helper to compare interval lists (order independent)
	intervalsEqual := func(a, b [][]int) bool {
		if len(a) != len(b) {
			return false
		}
		// Sort both for comparison
		sort.Slice(a, func(i, j int) bool { return a[i][0] < a[j][0] })
		sort.Slice(b, func(i, j int) bool { return b[i][0] < b[j][0] })
		return reflect.DeepEqual(a, b)
	}

	// Deep copy helper
	deepCopy := func(intervals [][]int) [][]int {
		result := make([][]int, len(intervals))
		for i, interval := range intervals {
			result[i] = []int{interval[0], interval[1]}
		}
		return result
	}

	fmt.Println("======================================================================")
	fmt.Println("MERGE OVERLAPPING INTERVALS - TEST RESULTS")
	fmt.Println("======================================================================")

	approaches := []struct {
		name string
		fn   func([][]int) [][]int
	}{
		{"Sort and Merge (Recommended)", MergeOverlappingIntervals},
		{"In-Place Sort and Merge", MergeOverlappingIntervalsInPlace},
		{"Brute Force", MergeOverlappingIntervalsBruteForce},
	}

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Deep copy input
			inputCopy := deepCopy(tc.intervals)
			expectedCopy := deepCopy(tc.expected)
			result := approach.fn(inputCopy)

			status := "PASS"
			if !intervalsEqual(result, expectedCopy) {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s\n", status, tc.desc)
			if status == "FAIL" {
				fmt.Printf("         Expected: %v\n", tc.expected)
				fmt.Printf("         Got:      %v\n", result)
			}
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    +---------------------+------------+----------+------------------+
    |      Approach       |    Time    |  Space   |  Recommendation  |
    +---------------------+------------+----------+------------------+
    | 1. Sort and Merge   | O(n log n) |   O(n)   |  BEST CHOICE     |
    | 2. In-Place         | O(n log n) |   O(1)   |  If can mutate   |
    | 3. Brute Force      |   O(n^2)   |   O(n)   |  Not recommended |
    +---------------------+------------+----------+------------------+
    `)
}
