// Build Min Heap
//
// Build a min heap from an array in-place using bottom-up heapify.

package main

import (
	"container/heap"
	"fmt"
)

// buildMinHeap transforms the array into a min heap in-place
func buildMinHeap(arr []int) []int {
	n := len(arr)

	// Start from the last non-leaf node and heapify each node
	// Last non-leaf node is at index (n / 2) - 1
	for i := n/2 - 1; i >= 0; i-- {
		heapifyDown(arr, n, i)
	}

	return arr
}

// heapifyDown performs the heapify down operation for min heap
func heapifyDown(arr []int, n, i int) {
	for {
		smallest := i
		left := 2*i + 1
		right := 2*i + 2

		// Check if left child exists and is smaller than current smallest
		if left < n && arr[left] < arr[smallest] {
			smallest = left
		}

		// Check if right child exists and is smaller than current smallest
		if right < n && arr[right] < arr[smallest] {
			smallest = right
		}

		// If smallest is the current node, we're done
		if smallest == i {
			break
		}

		// Swap and continue
		arr[i], arr[smallest] = arr[smallest], arr[i]
		i = smallest
	}
}

// isValidMinHeap verifies if the array represents a valid min heap
func isValidMinHeap(arr []int) bool {
	n := len(arr)
	for i := 0; i < n/2; i++ {
		left := 2*i + 1
		right := 2*i + 2

		if left < n && arr[i] > arr[left] {
			return false
		}
		if right < n && arr[i] > arr[right] {
			return false
		}
	}
	return true
}

// MinHeap implements heap.Interface for a min heap
type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MinHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}

func (h *MinHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// Peek returns the minimum element without removing it
func (h MinHeap) Peek() int {
	return h[0]
}

func min(arr []int) int {
	if len(arr) == 0 {
		return 0
	}
	m := arr[0]
	for _, v := range arr[1:] {
		if v < m {
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
	fmt.Println("=== Build Min Heap Tests ===")
	fmt.Println()

	// Test case 1: Basic example
	arr1 := []int{4, 10, 3, 5, 1}
	original1 := copySlice(arr1)
	result1 := buildMinHeap(arr1)
	fmt.Printf("Test 1: %v\n", original1)
	fmt.Printf("Result: %v\n", result1)
	fmt.Printf("Is valid min heap: %v\n", isValidMinHeap(result1))
	fmt.Printf("Min element at root: %v\n", result1[0] == min(original1))
	fmt.Println()

	// Test case 2: Another example
	arr2 := []int{9, 6, 5, 2, 3}
	original2 := copySlice(arr2)
	result2 := buildMinHeap(arr2)
	fmt.Printf("Test 2: %v\n", original2)
	fmt.Printf("Result: %v\n", result2)
	fmt.Printf("Is valid min heap: %v\n", isValidMinHeap(result2))
	fmt.Printf("Min element at root: %v\n", result2[0] == min(original2))
	fmt.Println()

	// Test case 3: Already sorted ascending (already a min heap)
	arr3 := []int{1, 2, 3, 4, 5}
	original3 := copySlice(arr3)
	result3 := buildMinHeap(arr3)
	fmt.Printf("Test 3: %v\n", original3)
	fmt.Printf("Result: %v\n", result3)
	fmt.Printf("Is valid min heap: %v\n", isValidMinHeap(result3))
	fmt.Println()

	// Test case 4: Sorted descending (worst case)
	arr4 := []int{5, 4, 3, 2, 1}
	original4 := copySlice(arr4)
	result4 := buildMinHeap(arr4)
	fmt.Printf("Test 4: %v\n", original4)
	fmt.Printf("Result: %v\n", result4)
	fmt.Printf("Is valid min heap: %v\n", isValidMinHeap(result4))
	fmt.Printf("Min element at root: %v\n", result4[0] == min(original4))
	fmt.Println()

	// Test case 5: Single element
	arr5 := []int{42}
	result5 := buildMinHeap(arr5)
	fmt.Printf("Test 5: %v\n", []int{42})
	fmt.Printf("Result: %v\n", result5)
	fmt.Printf("Is valid min heap: %v\n", isValidMinHeap(result5))
	fmt.Println()

	// Test case 6: Two elements
	arr6 := []int{10, 5}
	original6 := copySlice(arr6)
	result6 := buildMinHeap(arr6)
	fmt.Printf("Test 6: %v\n", original6)
	fmt.Printf("Result: %v\n", result6)
	fmt.Printf("Is valid min heap: %v\n", isValidMinHeap(result6))
	fmt.Println()

	// Test case 7: With negative numbers
	arr7 := []int{3, -1, 4, -5, 9, -2, 6}
	original7 := copySlice(arr7)
	result7 := buildMinHeap(arr7)
	fmt.Printf("Test 7: %v\n", original7)
	fmt.Printf("Result: %v\n", result7)
	fmt.Printf("Is valid min heap: %v\n", isValidMinHeap(result7))
	fmt.Printf("Min element at root: %v\n", result7[0] == min(original7))
	fmt.Println()

	// Test case 8: With duplicates
	arr8 := []int{5, 3, 5, 3, 5, 3}
	original8 := copySlice(arr8)
	result8 := buildMinHeap(arr8)
	fmt.Printf("Test 8: %v\n", original8)
	fmt.Printf("Result: %v\n", result8)
	fmt.Printf("Is valid min heap: %v\n", isValidMinHeap(result8))
	fmt.Println()

	// Test case 9: Using container/heap package
	fmt.Println("Test 9: Using container/heap package")
	h := &MinHeap{}
	heap.Init(h)

	values := []int{5, 3, 8, 1, 9, 2}
	for _, v := range values {
		heap.Push(h, v)
		fmt.Printf("  After inserting %d: %v\n", v, *h)
	}

	fmt.Println("  Extracting mins:")
	for h.Len() > 0 {
		minVal := heap.Pop(h).(int)
		fmt.Printf("    Extracted %d, heap: %v\n", minVal, *h)
	}
	fmt.Println()

	fmt.Println("All tests completed!")
}
