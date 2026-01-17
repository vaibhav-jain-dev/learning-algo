/*
Merge Sorted Arrays with Squares - Go Solutions

Square elements of two sorted arrays and merge them into one sorted array.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"container/heap"
	"fmt"
)

// ============================================================================
// APPROACH 1: Two Pointers on Squared Arrays ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(m + n) - single pass through both arrays
// Space Complexity: O(m + n) - for the result array
//
// WHY THIS IS BEST:
// - Optimal time complexity
// - Uses two-pointer merge technique
// - Clean and intuitive
// ============================================================================

// MergeSortedSquares merges squared arrays using two-pointer technique.
func MergeSortedSquares(arr1, arr2 []int) []int {
	// Helper to square a sorted array while maintaining sorted order
	squareSorted := func(arr []int) []int {
		if len(arr) == 0 {
			return []int{}
		}

		n := len(arr)
		result := make([]int, n)
		left, right := 0, n-1
		pos := n - 1

		for left <= right {
			leftSq := arr[left] * arr[left]
			rightSq := arr[right] * arr[right]

			if leftSq > rightSq {
				result[pos] = leftSq
				left++
			} else {
				result[pos] = rightSq
				right--
			}
			pos--
		}

		return result
	}

	// Square both arrays
	sq1 := squareSorted(arr1)
	sq2 := squareSorted(arr2)

	// Merge two sorted arrays
	result := make([]int, 0, len(sq1)+len(sq2))
	i, j := 0, 0

	for i < len(sq1) && j < len(sq2) {
		if sq1[i] <= sq2[j] {
			result = append(result, sq1[i])
			i++
		} else {
			result = append(result, sq2[j])
			j++
		}
	}

	// Add remaining elements
	result = append(result, sq1[i:]...)
	result = append(result, sq2[j:]...)

	return result
}

// ============================================================================
// APPROACH 2: Four Pointers - All at Once
// ============================================================================
// Time Complexity:  O(m + n)
// Space Complexity: O(m + n)
// ============================================================================

// MergeSortedSquaresFourPointers processes both arrays simultaneously.
func MergeSortedSquaresFourPointers(arr1, arr2 []int) []int {
	m, n := len(arr1), len(arr2)
	result := make([]int, m+n)
	pos := m + n - 1

	l1, r1 := 0, m-1
	l2, r2 := 0, n-1

	for l1 <= r1 || l2 <= r2 {
		maxVal := -1
		pointer := ""

		// Check all four candidates
		if l1 <= r1 {
			if sq := arr1[l1] * arr1[l1]; sq > maxVal {
				maxVal, pointer = sq, "l1"
			}
			if sq := arr1[r1] * arr1[r1]; sq > maxVal {
				maxVal, pointer = sq, "r1"
			}
		}
		if l2 <= r2 {
			if sq := arr2[l2] * arr2[l2]; sq > maxVal {
				maxVal, pointer = sq, "l2"
			}
			if sq := arr2[r2] * arr2[r2]; sq > maxVal {
				maxVal, pointer = sq, "r2"
			}
		}

		result[pos] = maxVal
		pos--

		switch pointer {
		case "l1":
			l1++
		case "r1":
			r1--
		case "l2":
			l2++
		case "r2":
			r2--
		}
	}

	return result
}

// ============================================================================
// APPROACH 3: Heap-Based Merge
// ============================================================================

// HeapItem for min-heap
type HeapItem struct {
	value    int
	arrIndex int
	pos      int
}

// MinHeap implements heap.Interface
type MinHeap []HeapItem

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i].value < h[j].value }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MinHeap) Push(x interface{}) {
	*h = append(*h, x.(HeapItem))
}

func (h *MinHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// MergeSortedSquaresHeap uses a min-heap to merge.
func MergeSortedSquaresHeap(arr1, arr2 []int) []int {
	squareSorted := func(arr []int) []int {
		if len(arr) == 0 {
			return []int{}
		}
		n := len(arr)
		result := make([]int, n)
		left, right := 0, n-1
		pos := n - 1

		for left <= right {
			leftSq := arr[left] * arr[left]
			rightSq := arr[right] * arr[right]
			if leftSq > rightSq {
				result[pos] = leftSq
				left++
			} else {
				result[pos] = rightSq
				right--
			}
			pos--
		}
		return result
	}

	sq1 := squareSorted(arr1)
	sq2 := squareSorted(arr2)
	arrays := [][]int{sq1, sq2}

	h := &MinHeap{}
	heap.Init(h)

	// Push first element of each non-empty array
	for i, arr := range arrays {
		if len(arr) > 0 {
			heap.Push(h, HeapItem{arr[0], i, 0})
		}
	}

	result := make([]int, 0, len(sq1)+len(sq2))

	for h.Len() > 0 {
		item := heap.Pop(h).(HeapItem)
		result = append(result, item.value)

		if item.pos+1 < len(arrays[item.arrIndex]) {
			heap.Push(h, HeapItem{
				arrays[item.arrIndex][item.pos+1],
				item.arrIndex,
				item.pos + 1,
			})
		}
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		arr1     []int
		arr2     []int
		expected []int
		desc     string
	}{
		{[]int{-3, -1, 2}, []int{-2, 4}, []int{1, 4, 4, 9, 16}, "Mixed signs"},
		{[]int{-5, 0, 3}, []int{1, 2, 6}, []int{0, 1, 4, 9, 25, 36}, "With zero"},
		{[]int{1, 2, 3}, []int{4, 5, 6}, []int{1, 4, 9, 16, 25, 36}, "All positive"},
		{[]int{}, []int{1, 2, 3}, []int{1, 4, 9}, "One empty"},
	}

	fmt.Println("======================================================================")
	fmt.Println("MERGE SORTED ARRAYS WITH SQUARES - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, tc := range testCases {
		result := MergeSortedSquares(tc.arr1, tc.arr2)
		status := "✓"
		if !slicesEqual(result, tc.expected) {
			status = "✗"
		}
		fmt.Printf("%s %s: %v\n", status, tc.desc, result)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	arr1 := []int{-3, -1, 2}
	arr2 := []int{-2, 4}
	fmt.Printf("\nInput: arr1 = %v, arr2 = %v\n", arr1, arr2)
	fmt.Printf("Output: %v\n", MergeSortedSquares(arr1, arr2))
}

func slicesEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}
