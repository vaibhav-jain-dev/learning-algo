// Heap Sort Implementation
//
// Implement heap sort to sort an array in ascending order.

package main

import (
	"fmt"
	"sort"
)

// heapSort sorts the array using heap sort algorithm
func heapSort(arr []int) []int {
	n := len(arr)

	// Step 1: Build a max heap
	for i := n/2 - 1; i >= 0; i-- {
		heapify(arr, n, i)
	}

	// Step 2: Extract elements one by one
	for i := n - 1; i > 0; i-- {
		// Move current root (maximum) to the end
		arr[0], arr[i] = arr[i], arr[0]

		// Heapify the reduced heap
		heapify(arr, i, 0)
	}

	return arr
}

// heapify maintains the max heap property for subtree rooted at index i
func heapify(arr []int, n, i int) {
	for {
		largest := i
		left := 2*i + 1
		right := 2*i + 2

		// Check if left child exists and is larger than root
		if left < n && arr[left] > arr[largest] {
			largest = left
		}

		// Check if right child exists and is larger than current largest
		if right < n && arr[right] > arr[largest] {
			largest = right
		}

		// If largest is root, we're done
		if largest == i {
			break
		}

		// Swap and continue
		arr[i], arr[largest] = arr[largest], arr[i]
		i = largest
	}
}

// heapSortDescending sorts the array in descending order using min heap
func heapSortDescending(arr []int) []int {
	n := len(arr)

	// Build min heap
	for i := n/2 - 1; i >= 0; i-- {
		minHeapify(arr, n, i)
	}

	// Extract elements
	for i := n - 1; i > 0; i-- {
		arr[0], arr[i] = arr[i], arr[0]
		minHeapify(arr, i, 0)
	}

	return arr
}

// minHeapify maintains the min heap property
func minHeapify(arr []int, n, i int) {
	for {
		smallest := i
		left := 2*i + 1
		right := 2*i + 2

		if left < n && arr[left] < arr[smallest] {
			smallest = left
		}

		if right < n && arr[right] < arr[smallest] {
			smallest = right
		}

		if smallest == i {
			break
		}

		arr[i], arr[smallest] = arr[smallest], arr[i]
		i = smallest
	}
}

// visualizeHeapSort shows the heap sort process step by step
func visualizeHeapSort(original []int) {
	arr := make([]int, len(original))
	copy(arr, original)

	fmt.Printf("Original array: %v\n", arr)
	n := len(arr)

	// Build heap phase
	fmt.Println("\n--- Building Max Heap ---")
	for i := n/2 - 1; i >= 0; i-- {
		heapify(arr, n, i)
		fmt.Printf("After heapifying index %d: %v\n", i, arr)
	}

	fmt.Printf("\nMax heap built: %v\n", arr)

	// Extraction phase
	fmt.Println("\n--- Extraction Phase ---")
	for i := n - 1; i > 0; i-- {
		arr[0], arr[i] = arr[i], arr[0]
		fmt.Printf("Swapped root with index %d: %v | sorted: %v\n", i, arr[:i], arr[i:])
		heapify(arr, i, 0)
		fmt.Printf("After heapify: %v | sorted: %v\n", arr[:i], arr[i:])
	}

	fmt.Printf("\nFinal sorted array: %v\n", arr)
}

func copySlice(arr []int) []int {
	result := make([]int, len(arr))
	copy(result, arr)
	return result
}

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

func sortedCopy(arr []int) []int {
	result := copySlice(arr)
	sort.Ints(result)
	return result
}

func reverseSortedCopy(arr []int) []int {
	result := copySlice(arr)
	sort.Sort(sort.Reverse(sort.IntSlice(result)))
	return result
}

func main() {
	fmt.Println("=== Heap Sort Tests ===")
	fmt.Println()

	// Test case 1: Basic example
	arr1 := []int{12, 11, 13, 5, 6, 7}
	original1 := copySlice(arr1)
	result1 := heapSort(copySlice(arr1))
	expected1 := sortedCopy(arr1)
	fmt.Printf("Test 1: %v\n", original1)
	fmt.Printf("Result: %v\n", result1)
	fmt.Printf("Expected: %v\n", expected1)
	fmt.Printf("Pass: %v\n", sliceEqual(result1, expected1))
	fmt.Println()

	// Test case 2: Another example
	arr2 := []int{4, 10, 3, 5, 1}
	original2 := copySlice(arr2)
	result2 := heapSort(copySlice(arr2))
	expected2 := sortedCopy(arr2)
	fmt.Printf("Test 2: %v\n", original2)
	fmt.Printf("Result: %v\n", result2)
	fmt.Printf("Expected: %v\n", expected2)
	fmt.Printf("Pass: %v\n", sliceEqual(result2, expected2))
	fmt.Println()

	// Test case 3: Single element
	arr3 := []int{1}
	result3 := heapSort(copySlice(arr3))
	fmt.Printf("Test 3: %v\n", arr3)
	fmt.Printf("Result: %v\n", result3)
	fmt.Printf("Pass: %v\n", sliceEqual(result3, []int{1}))
	fmt.Println()

	// Test case 4: Already sorted
	arr4 := []int{1, 2, 3, 4, 5}
	original4 := copySlice(arr4)
	result4 := heapSort(copySlice(arr4))
	expected4 := sortedCopy(arr4)
	fmt.Printf("Test 4: %v\n", original4)
	fmt.Printf("Result: %v\n", result4)
	fmt.Printf("Pass: %v\n", sliceEqual(result4, expected4))
	fmt.Println()

	// Test case 5: Reverse sorted
	arr5 := []int{5, 4, 3, 2, 1}
	original5 := copySlice(arr5)
	result5 := heapSort(copySlice(arr5))
	expected5 := sortedCopy(arr5)
	fmt.Printf("Test 5: %v\n", original5)
	fmt.Printf("Result: %v\n", result5)
	fmt.Printf("Pass: %v\n", sliceEqual(result5, expected5))
	fmt.Println()

	// Test case 6: With duplicates
	arr6 := []int{3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5}
	original6 := copySlice(arr6)
	result6 := heapSort(copySlice(arr6))
	expected6 := sortedCopy(arr6)
	fmt.Printf("Test 6: %v\n", original6)
	fmt.Printf("Result: %v\n", result6)
	fmt.Printf("Pass: %v\n", sliceEqual(result6, expected6))
	fmt.Println()

	// Test case 7: With negative numbers
	arr7 := []int{-3, 5, -1, 0, 2, -4, 1}
	original7 := copySlice(arr7)
	result7 := heapSort(copySlice(arr7))
	expected7 := sortedCopy(arr7)
	fmt.Printf("Test 7: %v\n", original7)
	fmt.Printf("Result: %v\n", result7)
	fmt.Printf("Pass: %v\n", sliceEqual(result7, expected7))
	fmt.Println()

	// Test case 8: All same elements
	arr8 := []int{5, 5, 5, 5, 5}
	result8 := heapSort(copySlice(arr8))
	fmt.Printf("Test 8: %v\n", arr8)
	fmt.Printf("Result: %v\n", result8)
	fmt.Printf("Pass: %v\n", sliceEqual(result8, []int{5, 5, 5, 5, 5}))
	fmt.Println()

	// Test case 9: Descending order
	arr9 := []int{4, 10, 3, 5, 1}
	original9 := copySlice(arr9)
	result9 := heapSortDescending(copySlice(arr9))
	expected9 := reverseSortedCopy(arr9)
	fmt.Printf("Test 9 (descending): %v\n", original9)
	fmt.Printf("Result: %v\n", result9)
	fmt.Printf("Expected: %v\n", expected9)
	fmt.Printf("Pass: %v\n", sliceEqual(result9, expected9))
	fmt.Println()

	// Test case 10: Large random array
	arr10 := []int{64, 34, 25, 12, 22, 11, 90, 45, 33, 77, 15, 88, 5, 67}
	original10 := copySlice(arr10)
	result10 := heapSort(copySlice(arr10))
	expected10 := sortedCopy(arr10)
	fmt.Printf("Test 10: %v\n", original10)
	fmt.Printf("Result: %v\n", result10)
	fmt.Printf("Pass: %v\n", sliceEqual(result10, expected10))
	fmt.Println()

	// Visualization
	fmt.Println("==================================================")
	fmt.Println("Visualization of Heap Sort:")
	fmt.Println("==================================================")
	visualizeHeapSort([]int{4, 10, 3, 5, 1})

	fmt.Println("\nAll tests completed!")
}
