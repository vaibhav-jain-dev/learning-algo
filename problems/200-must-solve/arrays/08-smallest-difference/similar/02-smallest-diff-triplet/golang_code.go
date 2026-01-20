/*
Smallest Difference Triplet - Go Solutions

Given three arrays, find one element from each such that max - min is minimized.
*/

package main

import (
	"fmt"
	"math"
	"sort"
)

// ============================================================================
// APPROACH 1: Three Pointers ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(p log p + q log q + r log r)
// Space Complexity: O(1)
// ============================================================================

// SmallestDiffTriplet finds triplet minimizing max-min.
func SmallestDiffTriplet(arr1, arr2, arr3 []int) []int {
	sort.Ints(arr1)
	sort.Ints(arr2)
	sort.Ints(arr3)

	i, j, k := 0, 0, 0
	minRange := math.MaxInt32
	result := []int{arr1[0], arr2[0], arr3[0]}

	for i < len(arr1) && j < len(arr2) && k < len(arr3) {
		a, b, c := arr1[i], arr2[j], arr3[k]

		minVal := min(a, min(b, c))
		maxVal := max(a, max(b, c))
		rangeVal := maxVal - minVal

		if rangeVal < minRange {
			minRange = rangeVal
			result = []int{a, b, c}
		}

		if minRange == 0 {
			break
		}

		// Move pointer of minimum element
		if a == minVal {
			i++
		} else if b == minVal {
			j++
		} else {
			k++
		}
	}

	return result
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("SMALLEST DIFFERENCE TRIPLET - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		arr1, arr2, arr3 []int
		desc             string
	}{
		{[]int{1, 4, 5}, []int{10, 20}, []int{14, 19}, "Standard case"},
		{[]int{1, 2, 3}, []int{2, 3, 4}, []int{3, 4, 5}, "Overlapping"},
		{[]int{5}, []int{5}, []int{5}, "All same"},
		{[]int{1, 10, 100}, []int{2, 20, 200}, []int{3, 30, 300}, "Spread"},
	}

	for _, tc := range testCases {
		result := SmallestDiffTriplet(tc.arr1, tc.arr2, tc.arr3)
		rangeVal := max(result[0], max(result[1], result[2])) - min(result[0], min(result[1], result[2]))
		fmt.Printf("\n%s:\n", tc.desc)
		fmt.Printf("  arr1=%v, arr2=%v, arr3=%v\n", tc.arr1, tc.arr2, tc.arr3)
		fmt.Printf("  Result: %v (range=%d)\n", result, rangeVal)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	arr1 := []int{1, 4, 5}
	arr2 := []int{10, 20}
	arr3 := []int{14, 19}
	fmt.Printf("\nInput: arr1=%v, arr2=%v, arr3=%v\n", arr1, arr2, arr3)
	result := SmallestDiffTriplet(arr1, arr2, arr3)
	fmt.Printf("Output: %v (range=%d)\n", result, max(result[0], max(result[1], result[2]))-min(result[0], min(result[1], result[2])))
}
