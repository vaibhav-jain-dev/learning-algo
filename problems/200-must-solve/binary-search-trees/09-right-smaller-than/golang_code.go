/*
Right Smaller Than - Go Solution

For each element, count how many elements to its right are smaller.

Time Complexity: O(n log n) average, O(n^2) worst case
Space Complexity: O(n)
*/

package main

import "fmt"

// SpecialBST is an augmented BST node that tracks left subtree size
type SpecialBST struct {
	Value           int
	LeftSubtreeSize int
	Left            *SpecialBST
	Right           *SpecialBST
}

// RightSmallerThan counts elements smaller than each element to its right
// Uses augmented BST to efficiently count smaller elements
// by processing array from right to left
func RightSmallerThan(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	result := make([]int, len(array))

	// Process from right to left, building BST
	// Last element has no elements to its right
	root := &SpecialBST{Value: array[len(array)-1]}
	result[len(array)-1] = 0

	for i := len(array) - 2; i >= 0; i-- {
		result[i] = insertAndCount(root, array[i])
	}

	return result
}

// insertAndCount inserts value into augmented BST and returns count of smaller elements
// As we traverse:
// - Going left: don't add to count (those values are larger)
// - Going right: add current node's left_subtree_size + 1 (node itself if smaller)
func insertAndCount(root *SpecialBST, value int) int {
	smallerCount := 0
	current := root

	for {
		if value < current.Value {
			// Going left - update current node's left subtree size
			current.LeftSubtreeSize++

			if current.Left == nil {
				current.Left = &SpecialBST{Value: value}
				break
			}
			current = current.Left
		} else {
			// Going right - count all smaller elements
			// (left subtree + current node if strictly smaller)
			smallerCount += current.LeftSubtreeSize
			if value > current.Value {
				smallerCount++ // Current node is also smaller
			}

			if current.Right == nil {
				current.Right = &SpecialBST{Value: value}
				break
			}
			current = current.Right
		}
	}

	return smallerCount
}

// RightSmallerThanNaive is a naive O(n^2) solution for comparison
func RightSmallerThanNaive(array []int) []int {
	result := make([]int, len(array))
	for i, val := range array {
		count := 0
		for j := i + 1; j < len(array); j++ {
			if array[j] < val {
				count++
			}
		}
		result[i] = count
	}
	return result
}

// indexedValue pairs a value with its original index
type indexedValue struct {
	value int
	index int
}

// RightSmallerThanMergeSort uses modified merge sort for O(n log n)
func RightSmallerThanMergeSort(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	n := len(array)
	result := make([]int, n)

	// Create array of (value, original_index)
	indexed := make([]indexedValue, n)
	for i, val := range array {
		indexed[i] = indexedValue{val, i}
	}

	mergeSort(indexed, result)
	return result
}

func mergeSort(arr []indexedValue, result []int) []indexedValue {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	left := mergeSort(append([]indexedValue{}, arr[:mid]...), result)
	right := mergeSort(append([]indexedValue{}, arr[mid:]...), result)

	return merge(left, right, result)
}

func merge(left, right []indexedValue, result []int) []indexedValue {
	merged := make([]indexedValue, 0, len(left)+len(right))
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i].value <= right[j].value {
			// Left element is not greater than right element
			// Count how many right elements we've already processed
			result[left[i].index] += j
			merged = append(merged, left[i])
			i++
		} else {
			merged = append(merged, right[j])
			j++
		}
	}

	// Remaining left elements - all right elements are smaller
	for i < len(left) {
		result[left[i].index] += j
		merged = append(merged, left[i])
		i++
	}

	for j < len(right) {
		merged = append(merged, right[j])
		j++
	}

	return merged
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

func main() {
	// Test 1: Standard case from problem
	array1 := []int{8, 5, 11, -1, 3, 4, 2}
	result1 := RightSmallerThan(array1)
	expected1 := []int{5, 4, 4, 0, 1, 1, 0}
	fmt.Printf("Test 1: %v\n", result1)
	fmt.Printf("Expected: %v\n", expected1)
	fmt.Printf("Match: %v\n\n", slicesEqual(result1, expected1))

	// Test 2: Ascending order (no smaller to right)
	array2 := []int{1, 2, 3, 4, 5}
	result2 := RightSmallerThan(array2)
	expected2 := []int{0, 0, 0, 0, 0}
	fmt.Printf("Test 2 (ascending): %v\n", result2)
	fmt.Printf("Expected: %v\n\n", expected2)

	// Test 3: Descending order (maximum inversions)
	array3 := []int{5, 4, 3, 2, 1}
	result3 := RightSmallerThan(array3)
	expected3 := []int{4, 3, 2, 1, 0}
	fmt.Printf("Test 3 (descending): %v\n", result3)
	fmt.Printf("Expected: %v\n\n", expected3)

	// Test 4: Single element
	array4 := []int{10}
	result4 := RightSmallerThan(array4)
	expected4 := []int{0}
	fmt.Printf("Test 4 (single): %v\n", result4)
	fmt.Printf("Expected: %v\n\n", expected4)

	// Test 5: Empty array
	array5 := []int{}
	result5 := RightSmallerThan(array5)
	expected5 := []int{}
	fmt.Printf("Test 5 (empty): %v\n", result5)
	fmt.Printf("Expected: %v\n\n", expected5)

	// Test 6: With duplicates
	array6 := []int{5, 5, 5, 5}
	result6 := RightSmallerThan(array6)
	expected6 := []int{0, 0, 0, 0}
	fmt.Printf("Test 6 (duplicates): %v\n", result6)
	fmt.Printf("Expected: %v\n\n", expected6)

	// Test 7: Compare all methods
	array7 := []int{8, 5, 11, -1, 3, 4, 2}
	fmt.Println("--- Method Comparison ---")
	bstResult := RightSmallerThan(array7)
	naiveResult := RightSmallerThanNaive(array7)
	mergeResult := RightSmallerThanMergeSort(array7)
	fmt.Printf("BST method:        %v\n", bstResult)
	fmt.Printf("Naive method:      %v\n", naiveResult)
	fmt.Printf("Merge sort method: %v\n", mergeResult)
	fmt.Printf("All match: %v\n", slicesEqual(bstResult, naiveResult) && slicesEqual(naiveResult, mergeResult))

	fmt.Println("\nAll tests completed!")
}
