// Build Max Heap
//
// Build a max heap from an array in-place using bottom-up heapify.

package main

import (
	"container/heap"
	"fmt"
)

// buildMaxHeap transforms the array into a max heap in-place
func buildMaxHeap(arr []int) []int {
	n := len(arr)

	// Start from the last non-leaf node and heapify each node
	// Last non-leaf node is at index (n / 2) - 1
	for i := n/2 - 1; i >= 0; i-- {
		heapifyDown(arr, n, i)
	}

	return arr
}

// heapifyDown performs the heapify down operation for max heap
func heapifyDown(arr []int, n, i int) {
	for {
		largest := i
		left := 2*i + 1
		right := 2*i + 2

		// Check if left child exists and is larger than current largest
		if left < n && arr[left] > arr[largest] {
			largest = left
		}

		// Check if right child exists and is larger than current largest
		if right < n && arr[right] > arr[largest] {
			largest = right
		}

		// If largest is the current node, we're done
		if largest == i {
			break
		}

		// Swap and continue
		arr[i], arr[largest] = arr[largest], arr[i]
		i = largest
	}
}

// isValidMaxHeap verifies if the array represents a valid max heap
func isValidMaxHeap(arr []int) bool {
	n := len(arr)
	for i := 0; i < n/2; i++ {
		left := 2*i + 1
		right := 2*i + 2

		if left < n && arr[i] < arr[left] {
			return false
		}
		if right < n && arr[i] < arr[right] {
			return false
		}
	}
	return true
}

// MaxHeap implements heap.Interface for a max heap
type MaxHeap []int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] } // Note: > for max heap
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MaxHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}

func (h *MaxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// Peek returns the maximum element without removing it
func (h MaxHeap) Peek() int {
	return h[0]
}

func max(arr []int) int {
	if len(arr) == 0 {
		return 0
	}
	m := arr[0]
	for _, v := range arr[1:] {
		if v > m {
			m = v
		}
	}
	return m
}

func copySlice(arr []int) []int {
	result := make([]int, len(arr))
	copy(result, arr)
	return result
}

func main() {
	fmt.Println("=== Build Max Heap Tests ===")
	fmt.Println()

	// Test case 1: Basic example
	arr1 := []int{4, 10, 3, 5, 1}
	original1 := copySlice(arr1)
	result1 := buildMaxHeap(arr1)
	fmt.Printf("Test 1: %v\n", original1)
	fmt.Printf("Result: %v\n", result1)
	fmt.Printf("Is valid max heap: %v\n", isValidMaxHeap(result1))
	fmt.Printf("Max element at root: %v\n", result1[0] == max(original1))
	fmt.Println()

	// Test case 2: Larger example
	arr2 := []int{1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17}
	original2 := copySlice(arr2)
	result2 := buildMaxHeap(arr2)
	fmt.Printf("Test 2: %v\n", original2)
	fmt.Printf("Result: %v\n", result2)
	fmt.Printf("Is valid max heap: %v\n", isValidMaxHeap(result2))
	fmt.Printf("Max element at root: %v\n", result2[0] == max(original2))
	fmt.Println()

	// Test case 3: Already a max heap
	arr3 := []int{5, 4, 3, 2, 1}
	original3 := copySlice(arr3)
	result3 := buildMaxHeap(arr3)
	fmt.Printf("Test 3: %v\n", original3)
	fmt.Printf("Result: %v\n", result3)
	fmt.Printf("Is valid max heap: %v\n", isValidMaxHeap(result3))
	fmt.Println()

	// Test case 4: Sorted ascending (worst case)
	arr4 := []int{1, 2, 3, 4, 5}
	original4 := copySlice(arr4)
	result4 := buildMaxHeap(arr4)
	fmt.Printf("Test 4: %v\n", original4)
	fmt.Printf("Result: %v\n", result4)
	fmt.Printf("Is valid max heap: %v\n", isValidMaxHeap(result4))
	fmt.Printf("Max element at root: %v\n", result4[0] == max(original4))
	fmt.Println()

	// Test case 5: Single element
	arr5 := []int{42}
	result5 := buildMaxHeap(arr5)
	fmt.Printf("Test 5: %v\n", []int{42})
	fmt.Printf("Result: %v\n", result5)
	fmt.Printf("Is valid max heap: %v\n", isValidMaxHeap(result5))
	fmt.Println()

	// Test case 6: Two elements
	arr6 := []int{5, 10}
	original6 := copySlice(arr6)
	result6 := buildMaxHeap(arr6)
	fmt.Printf("Test 6: %v\n", original6)
	fmt.Printf("Result: %v\n", result6)
	fmt.Printf("Is valid max heap: %v\n", isValidMaxHeap(result6))
	fmt.Println()

	// Test case 7: With negative numbers
	arr7 := []int{-3, -1, -4, -5, -9, -2, -6}
	original7 := copySlice(arr7)
	result7 := buildMaxHeap(arr7)
	fmt.Printf("Test 7: %v\n", original7)
	fmt.Printf("Result: %v\n", result7)
	fmt.Printf("Is valid max heap: %v\n", isValidMaxHeap(result7))
	fmt.Printf("Max element at root: %v\n", result7[0] == max(original7))
	fmt.Println()

	// Test case 8: With duplicates
	arr8 := []int{5, 3, 5, 3, 5, 3}
	original8 := copySlice(arr8)
	result8 := buildMaxHeap(arr8)
	fmt.Printf("Test 8: %v\n", original8)
	fmt.Printf("Result: %v\n", result8)
	fmt.Printf("Is valid max heap: %v\n", isValidMaxHeap(result8))
	fmt.Println()

	// Test case 9: Using container/heap package
	fmt.Println("Test 9: Using container/heap package")
	h := &MaxHeap{}
	heap.Init(h)

	values := []int{5, 3, 8, 1, 9, 2}
	for _, v := range values {
		heap.Push(h, v)
		fmt.Printf("  After inserting %d: %v\n", v, *h)
	}

	fmt.Println("  Extracting maxes:")
	for h.Len() > 0 {
		maxVal := heap.Pop(h).(int)
		fmt.Printf("    Extracted %d, heap: %v\n", maxVal, *h)
	}
	fmt.Println()

	fmt.Println("All tests completed!")
}
