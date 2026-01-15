/*
Merge Sort Implementation with Step-by-Step Visualization

Merge Sort is a divide-and-conquer algorithm that:
1. Divides the array into two halves
2. Recursively sorts each half
3. Merges the two sorted halves

Time Complexity: O(n log n) - all cases
Space Complexity: O(n) - for temporary array
*/

package main

import (
	"fmt"
	"strings"
)

// MergeSortVisualizer provides merge sort with step tracking
type MergeSortVisualizer struct {
	steps []string
	depth int
}

// NewMergeSortVisualizer creates a new visualizer
func NewMergeSortVisualizer() *MergeSortVisualizer {
	return &MergeSortVisualizer{
		steps: make([]string, 0),
		depth: 0,
	}
}

// Sort performs merge sort with visualization
func (v *MergeSortVisualizer) Sort(arr []int) []int {
	if len(arr) <= 1 {
		result := make([]int, len(arr))
		copy(result, arr)
		return result
	}

	result := make([]int, len(arr))
	copy(result, arr)
	v.steps = make([]string, 0)
	v.depth = 0
	v.mergeSort(result, 0, len(result)-1)
	return result
}

func (v *MergeSortVisualizer) mergeSort(arr []int, left, right int) {
	indent := strings.Repeat("  ", v.depth)

	if left < right {
		mid := (left + right) / 2

		v.steps = append(v.steps, fmt.Sprintf("%sDividing: %v into %v and %v",
			indent, arr[left:right+1], arr[left:mid+1], arr[mid+1:right+1]))

		v.depth++
		v.mergeSort(arr, left, mid)
		v.mergeSort(arr, mid+1, right)
		v.depth--

		v.merge(arr, left, mid, right)
		v.steps = append(v.steps, fmt.Sprintf("%sMerged: %v", indent, arr[left:right+1]))
	}
}

func (v *MergeSortVisualizer) merge(arr []int, left, mid, right int) {
	// Create temporary slices
	leftArr := make([]int, mid-left+1)
	rightArr := make([]int, right-mid)

	copy(leftArr, arr[left:mid+1])
	copy(rightArr, arr[mid+1:right+1])

	i, j, k := 0, 0, left

	for i < len(leftArr) && j < len(rightArr) {
		if leftArr[i] <= rightArr[j] {
			arr[k] = leftArr[i]
			i++
		} else {
			arr[k] = rightArr[j]
			j++
		}
		k++
	}

	for i < len(leftArr) {
		arr[k] = leftArr[i]
		i++
		k++
	}

	for j < len(rightArr) {
		arr[k] = rightArr[j]
		j++
		k++
	}
}

// PrintSteps prints all recorded steps
func (v *MergeSortVisualizer) PrintSteps() {
	fmt.Println("\n=== Merge Sort Steps ===")
	for _, step := range v.steps {
		fmt.Println(step)
	}
}

// MergeSort performs basic merge sort (returns new sorted slice)
func MergeSort(arr []int) []int {
	if len(arr) <= 1 {
		result := make([]int, len(arr))
		copy(result, arr)
		return result
	}

	mid := len(arr) / 2
	leftHalf := MergeSort(arr[:mid])
	rightHalf := MergeSort(arr[mid:])

	return Merge(leftHalf, rightHalf)
}

// Merge merges two sorted slices into one sorted slice
func Merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	result = append(result, left[i:]...)
	result = append(result, right[j:]...)

	return result
}

// MergeSortInPlace sorts the array in place
func MergeSortInPlace(arr []int) {
	if len(arr) <= 1 {
		return
	}
	mergeSortHelper(arr, 0, len(arr)-1)
}

func mergeSortHelper(arr []int, left, right int) {
	if left < right {
		mid := (left + right) / 2
		mergeSortHelper(arr, left, mid)
		mergeSortHelper(arr, mid+1, right)
		mergeInPlace(arr, left, mid, right)
	}
}

func mergeInPlace(arr []int, left, mid, right int) {
	leftArr := make([]int, mid-left+1)
	rightArr := make([]int, right-mid)

	copy(leftArr, arr[left:mid+1])
	copy(rightArr, arr[mid+1:right+1])

	i, j, k := 0, 0, left

	for i < len(leftArr) && j < len(rightArr) {
		if leftArr[i] <= rightArr[j] {
			arr[k] = leftArr[i]
			i++
		} else {
			arr[k] = rightArr[j]
			j++
		}
		k++
	}

	for i < len(leftArr) {
		arr[k] = leftArr[i]
		i++
		k++
	}

	for j < len(rightArr) {
		arr[k] = rightArr[j]
		j++
		k++
	}
}

// VisualizeMergeStep shows a detailed merge operation
func VisualizeMergeStep(left, right []int) {
	fmt.Printf("\nMerging: %v and %v\n", left, right)
	fmt.Println(strings.Repeat("-", 40))

	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0
	step := 1

	for i < len(left) && j < len(right) {
		fmt.Printf("Step %d: Compare %d vs %d\n", step, left[i], right[j])

		// Display arrays with current position marked
		leftDisplay := formatWithPointer(left, i)
		rightDisplay := formatWithPointer(right, j)
		fmt.Printf("  Left:  %s\n", leftDisplay)
		fmt.Printf("  Right: %s\n", rightDisplay)

		if left[i] <= right[j] {
			result = append(result, left[i])
			fmt.Printf("  Pick %d from left\n", left[i])
			i++
		} else {
			result = append(result, right[j])
			fmt.Printf("  Pick %d from right\n", right[j])
			j++
		}

		fmt.Printf("  Result so far: %v\n", result)
		step++
	}

	if i < len(left) {
		fmt.Printf("\nCopy remaining from left: %v\n", left[i:])
		result = append(result, left[i:]...)
	}
	if j < len(right) {
		fmt.Printf("\nCopy remaining from right: %v\n", right[j:])
		result = append(result, right[j:]...)
	}

	fmt.Printf("\nFinal merged result: %v\n", result)
}

func formatWithPointer(arr []int, pos int) string {
	parts := make([]string, len(arr))
	for i, v := range arr {
		if i == pos {
			parts[i] = fmt.Sprintf("[%d]", v)
		} else {
			parts[i] = fmt.Sprintf("%d", v)
		}
	}
	return strings.Join(parts, " ")
}

// sliceEqual checks if two slices are equal
func sliceEqual(a, b []int) bool {
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

// copySlice creates a copy of a slice
func copySlice(arr []int) []int {
	result := make([]int, len(arr))
	copy(result, arr)
	return result
}

// ==================== Test Cases ====================

func testMergeSort() bool {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("MERGE SORT TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	testCases := []struct {
		input       []int
		expected    []int
		description string
	}{
		{[]int{38, 27, 43, 3, 9, 82, 10}, []int{3, 9, 10, 27, 38, 43, 82}, "Example 1"},
		{[]int{5, 2, 8, 12, 1, 6}, []int{1, 2, 5, 6, 8, 12}, "Example 2"},
		{[]int{1}, []int{1}, "Single element"},
		{[]int{3, 3, 3, 1, 1, 2, 2}, []int{1, 1, 2, 2, 3, 3, 3}, "Duplicates"},
		{[]int{}, []int{}, "Empty array"},
		{[]int{5, 4, 3, 2, 1}, []int{1, 2, 3, 4, 5}, "Reverse sorted"},
		{[]int{1, 2, 3, 4, 5}, []int{1, 2, 3, 4, 5}, "Already sorted"},
		{[]int{-5, 3, -2, 8, -1, 0}, []int{-5, -2, -1, 0, 3, 8}, "Negative numbers"},
		{[]int{1000000, -1000000, 0}, []int{-1000000, 0, 1000000}, "Large values"},
	}

	allPassed := true

	for _, tc := range testCases {
		// Test functional version
		result := MergeSort(tc.input)
		passed := sliceEqual(result, tc.expected)
		allPassed = allPassed && passed

		status := "PASS"
		if !passed {
			status = "FAIL"
		}

		fmt.Printf("\n%s: %s\n", status, tc.description)
		fmt.Printf("  Input:    %v\n", tc.input)
		fmt.Printf("  Expected: %v\n", tc.expected)
		fmt.Printf("  Got:      %v\n", result)

		// Also test in-place version
		arrCopy := copySlice(tc.input)
		MergeSortInPlace(arrCopy)
		if !sliceEqual(arrCopy, tc.expected) {
			fmt.Printf("  WARNING: In-place version got: %v\n", arrCopy)
			allPassed = false
		}
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	if allPassed {
		fmt.Println("Overall: ALL TESTS PASSED")
	} else {
		fmt.Println("Overall: SOME TESTS FAILED")
	}
	fmt.Println(strings.Repeat("=", 60))

	return allPassed
}

func demoVisualization() {
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("MERGE SORT VISUALIZATION DEMO")
	fmt.Println(strings.Repeat("=", 60))

	// Demo 1: Full sort visualization
	arr := []int{38, 27, 43, 3, 9, 82, 10}
	fmt.Printf("\nSorting array: %v\n", arr)

	visualizer := NewMergeSortVisualizer()
	result := visualizer.Sort(arr)
	visualizer.PrintSteps()

	fmt.Printf("\nFinal result: %v\n", result)

	// Demo 2: Single merge step visualization
	fmt.Println()
	fmt.Println(strings.Repeat("-", 60))
	fmt.Println("DETAILED MERGE OPERATION")
	fmt.Println(strings.Repeat("-", 60))

	VisualizeMergeStep([]int{3, 27, 38, 43}, []int{9, 10, 82})
}

func demoStability() {
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("STABILITY DEMONSTRATION")
	fmt.Println(strings.Repeat("=", 60))

	// Using a struct to show stability
	type Item struct {
		value int
		label string
	}

	arr := []Item{
		{3, "a"}, {1, "b"}, {3, "c"}, {1, "d"}, {2, "e"},
	}

	fmt.Printf("\nOriginal: %v\n", arr)
	fmt.Println("(Sorting by value only)")

	// Stable merge sort for Items
	var mergeSortStable func([]Item) []Item
	mergeSortStable = func(arr []Item) []Item {
		if len(arr) <= 1 {
			result := make([]Item, len(arr))
			copy(result, arr)
			return result
		}

		mid := len(arr) / 2
		left := mergeSortStable(arr[:mid])
		right := mergeSortStable(arr[mid:])

		result := make([]Item, 0, len(arr))
		i, j := 0, 0

		for i < len(left) && j < len(right) {
			if left[i].value <= right[j].value {
				result = append(result, left[i])
				i++
			} else {
				result = append(result, right[j])
				j++
			}
		}

		result = append(result, left[i:]...)
		result = append(result, right[j:]...)
		return result
	}

	result := mergeSortStable(arr)
	fmt.Printf("Sorted:   %v\n", result)
	fmt.Println("\nNotice: Elements with equal values maintain their relative order")
	fmt.Println("  - {1, b} comes before {1, d} - original order preserved")
	fmt.Println("  - {3, a} comes before {3, c} - original order preserved")
}

func main() {
	testMergeSort()
	demoVisualization()
	demoStability()
}
