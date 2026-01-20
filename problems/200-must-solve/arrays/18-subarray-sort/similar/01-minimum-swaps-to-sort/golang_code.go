/*
Minimum Swaps to Sort Array - Go Solutions
*/

package main

import (
	"fmt"
	"sort"
)

// MinSwapsToSort finds minimum swaps to sort array.
func MinSwapsToSort(array []int) int {
	n := len(array)
	if n <= 1 {
		return 0
	}

	// Create pairs of (value, original_index)
	type pair struct {
		val, idx int
	}
	indexed := make([]pair, n)
	for i, v := range array {
		indexed[i] = pair{v, i}
	}

	sort.Slice(indexed, func(i, j int) bool {
		return indexed[i].val < indexed[j].val
	})

	visited := make([]bool, n)
	swaps := 0

	for i := 0; i < n; i++ {
		if visited[i] || indexed[i].idx == i {
			continue
		}

		cycleLength := 0
		j := i

		for !visited[j] {
			visited[j] = true
			j = indexed[j].idx
			cycleLength++
		}

		if cycleLength > 1 {
			swaps += cycleLength - 1
		}
	}

	return swaps
}

func main() {
	testCases := []struct {
		array    []int
		expected int
		desc     string
	}{
		{[]int{4, 3, 2, 1}, 2, "Reverse order"},
		{[]int{1, 5, 4, 3, 2}, 2, "Partial disorder"},
		{[]int{1, 2, 3, 4}, 0, "Already sorted"},
		{[]int{2, 1}, 1, "Simple swap"},
	}

	fmt.Println("============================================================")
	fmt.Println("MINIMUM SWAPS TO SORT - TEST RESULTS")
	fmt.Println("============================================================")

	for _, tc := range testCases {
		result := MinSwapsToSort(tc.array)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  %s: %s: %d (expected %d)\n", status, tc.desc, result, tc.expected)
	}
}
