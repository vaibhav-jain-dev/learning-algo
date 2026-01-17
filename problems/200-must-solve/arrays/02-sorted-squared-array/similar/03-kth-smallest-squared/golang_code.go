/*
K-th Smallest Squared Element - Go Solutions

Find the k-th smallest element after squaring a sorted array.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
	"sort"
)

// ============================================================================
// APPROACH 1: Two Pointers with Counter ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(k) - stop when we find k-th element
// Space Complexity: O(1) - no extra space needed
//
// WHY THIS IS BEST:
// - Optimal for small k
// - Early termination
// ============================================================================

// KthSmallestSquared finds k-th smallest using two pointers.
func KthSmallestSquared(array []int, k int) int {
	if len(array) == 0 {
		return -1
	}

	n := len(array)

	// Find position closest to 0 using binary search
	left := 0
	right := n - 1

	for left < right {
		mid := (left + right) / 2
		if array[mid] < 0 {
			left = mid + 1
		} else {
			right = mid
		}
	}

	// 'left' points to first non-negative
	right = left
	left = right - 1

	count := 0
	result := 0

	for count < k {
		var leftSq, rightSq int

		if left >= 0 {
			leftSq = array[left] * array[left]
		} else {
			leftSq = math.MaxInt32
		}

		if right < n {
			rightSq = array[right] * array[right]
		} else {
			rightSq = math.MaxInt32
		}

		if leftSq <= rightSq {
			result = leftSq
			left--
		} else {
			result = rightSq
			right++
		}

		count++
	}

	return result
}

// ============================================================================
// APPROACH 2: Min-Heap (Priority Queue)
// ============================================================================
// Time Complexity:  O(n + k log n)
// Space Complexity: O(n)
// ============================================================================

// IntHeap is a min-heap of ints
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// KthSmallestSquaredHeap uses a min-heap.
func KthSmallestSquaredHeap(array []int, k int) int {
	// Create squared array
	squared := make(IntHeap, len(array))
	for i, x := range array {
		squared[i] = x * x
	}

	heap.Init(&squared)

	// Extract k elements
	var result int
	for i := 0; i < k; i++ {
		result = heap.Pop(&squared).(int)
	}

	return result
}

// ============================================================================
// APPROACH 3: Sort and Index
// ============================================================================
// Time Complexity:  O(n log n)
// Space Complexity: O(n)
// ============================================================================

// KthSmallestSquaredSort sorts squared array and returns k-th.
func KthSmallestSquaredSort(array []int, k int) int {
	squared := make([]int, len(array))
	for i, x := range array {
		squared[i] = x * x
	}

	sort.Ints(squared)
	return squared[k-1]
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		array    []int
		k        int
		expected int
		desc     string
	}{
		{[]int{-4, -2, 0, 1, 3}, 1, 0, "k=1, smallest is 0"},
		{[]int{-4, -2, 0, 1, 3}, 2, 1, "k=2"},
		{[]int{-4, -2, 0, 1, 3}, 3, 4, "k=3"},
		{[]int{-3, -1, 2, 4}, 1, 1, "No zero"},
		{[]int{-3, -1, 2, 4}, 4, 16, "k=n"},
		{[]int{1, 2, 3, 4, 5}, 3, 9, "All positive"},
		{[]int{-5, -4, -3, -2, -1}, 1, 1, "All negative"},
	}

	approaches := []struct {
		name string
		fn   func([]int, int) int
	}{
		{"Two Pointers (Recommended)", KthSmallestSquared},
		{"Min-Heap", KthSmallestSquaredHeap},
		{"Sort", KthSmallestSquaredSort},
	}

	fmt.Println("======================================================================")
	fmt.Println("K-TH SMALLEST SQUARED ELEMENT - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Make a copy of the array
			arr := make([]int, len(tc.array))
			copy(arr, tc.array)

			result := approach.fn(arr, tc.k)
			status := "✓"
			if result != tc.expected {
				status = "✗"
				allPassed = false
			}
			fmt.Printf("  %s %s: k=%d → %d (expected %d)\n",
				status, tc.desc, tc.k, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	array := []int{-4, -2, 0, 1, 3}
	k := 3
	fmt.Printf("\nInput: array = %v, k = %d\n", array, k)
	fmt.Printf("Output: %d\n", KthSmallestSquared(array, k))

	array = []int{-3, -1, 2, 4}
	k = 2
	fmt.Printf("\nInput: array = %v, k = %d\n", array, k)
	fmt.Printf("Output: %d\n", KthSmallestSquared(array, k))
}
