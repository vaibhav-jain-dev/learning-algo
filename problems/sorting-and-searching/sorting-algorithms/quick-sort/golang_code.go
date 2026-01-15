/*
Quick Sort Implementation with Step-by-Step Visualization

Quick Sort is a divide-and-conquer algorithm that:
1. Selects a pivot element
2. Partitions array around the pivot
3. Recursively sorts sub-arrays

Time Complexity: O(n log n) average, O(n^2) worst
Space Complexity: O(log n) for recursion stack
*/

package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

// QuickSortVisualizer provides quick sort with step tracking
type QuickSortVisualizer struct {
	steps []string
	depth int
}

// NewQuickSortVisualizer creates a new visualizer
func NewQuickSortVisualizer() *QuickSortVisualizer {
	return &QuickSortVisualizer{
		steps: make([]string, 0),
		depth: 0,
	}
}

// Sort performs quick sort with visualization
func (v *QuickSortVisualizer) Sort(arr []int) []int {
	result := make([]int, len(arr))
	copy(result, arr)
	v.steps = make([]string, 0)
	v.depth = 0
	v.quickSort(result, 0, len(result)-1)
	return result
}

func (v *QuickSortVisualizer) quickSort(arr []int, low, high int) {
	indent := strings.Repeat("  ", v.depth)

	if low < high {
		v.steps = append(v.steps, fmt.Sprintf("%sSorting range [%d:%d]: %v",
			indent, low, high, arr[low:high+1]))

		pivotIdx := v.partition(arr, low, high)

		v.steps = append(v.steps, fmt.Sprintf("%sAfter partition: %v",
			indent, arr[low:high+1]))
		v.steps = append(v.steps, fmt.Sprintf("%sPivot %d is at final position %d",
			indent, arr[pivotIdx], pivotIdx))

		v.depth++
		v.quickSort(arr, low, pivotIdx-1)
		v.quickSort(arr, pivotIdx+1, high)
		v.depth--
	}
}

func (v *QuickSortVisualizer) partition(arr []int, low, high int) int {
	pivot := arr[high]
	i := low - 1

	for j := low; j < high; j++ {
		if arr[j] <= pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}

	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}

// PrintSteps prints all recorded steps
func (v *QuickSortVisualizer) PrintSteps() {
	fmt.Println("\n=== Quick Sort Steps ===")
	for _, step := range v.steps {
		fmt.Println(step)
	}
}

// QuickSort performs basic quick sort (Lomuto partition)
func QuickSort(arr []int) []int {
	if len(arr) <= 1 {
		result := make([]int, len(arr))
		copy(result, arr)
		return result
	}

	result := make([]int, len(arr))
	copy(result, arr)
	quickSortHelper(result, 0, len(result)-1)
	return result
}

func quickSortHelper(arr []int, low, high int) {
	if low < high {
		pivotIdx := partitionLomuto(arr, low, high)
		quickSortHelper(arr, low, pivotIdx-1)
		quickSortHelper(arr, pivotIdx+1, high)
	}
}

func partitionLomuto(arr []int, low, high int) int {
	pivot := arr[high]
	i := low - 1

	for j := low; j < high; j++ {
		if arr[j] <= pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}

	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}

// QuickSortHoare uses Hoare partition scheme
func QuickSortHoare(arr []int) []int {
	result := make([]int, len(arr))
	copy(result, arr)
	quickSortHoareHelper(result, 0, len(result)-1)
	return result
}

func quickSortHoareHelper(arr []int, low, high int) {
	if low < high {
		pivotIdx := partitionHoare(arr, low, high)
		quickSortHoareHelper(arr, low, pivotIdx)
		quickSortHoareHelper(arr, pivotIdx+1, high)
	}
}

func partitionHoare(arr []int, low, high int) int {
	pivot := arr[low]
	i := low - 1
	j := high + 1

	for {
		i++
		for arr[i] < pivot {
			i++
		}

		j--
		for arr[j] > pivot {
			j--
		}

		if i >= j {
			return j
		}

		arr[i], arr[j] = arr[j], arr[i]
	}
}

// QuickSort3Way uses three-way partition (Dutch National Flag)
func QuickSort3Way(arr []int) []int {
	result := make([]int, len(arr))
	copy(result, arr)
	quickSort3WayHelper(result, 0, len(result)-1)
	return result
}

func quickSort3WayHelper(arr []int, low, high int) {
	if low >= high {
		return
	}

	lt, gt := partition3Way(arr, low, high)
	quickSort3WayHelper(arr, low, lt-1)
	quickSort3WayHelper(arr, gt+1, high)
}

func partition3Way(arr []int, low, high int) (int, int) {
	pivot := arr[low]
	lt := low
	gt := high
	i := low + 1

	for i <= gt {
		if arr[i] < pivot {
			arr[lt], arr[i] = arr[i], arr[lt]
			lt++
			i++
		} else if arr[i] > pivot {
			arr[gt], arr[i] = arr[i], arr[gt]
			gt--
		} else {
			i++
		}
	}

	return lt, gt
}

// QuickSortRandom uses random pivot selection
func QuickSortRandom(arr []int) []int {
	result := make([]int, len(arr))
	copy(result, arr)
	quickSortRandomHelper(result, 0, len(result)-1)
	return result
}

func quickSortRandomHelper(arr []int, low, high int) {
	if low < high {
		// Random pivot selection
		pivotIdx := low + rand.Intn(high-low+1)
		arr[pivotIdx], arr[high] = arr[high], arr[pivotIdx]

		pivotIdx = partitionLomuto(arr, low, high)
		quickSortRandomHelper(arr, low, pivotIdx-1)
		quickSortRandomHelper(arr, pivotIdx+1, high)
	}
}

// VisualizePartition shows partition process step by step
func VisualizePartition(arr []int) {
	fmt.Println("\n=== Partition Visualization ===")
	fmt.Printf("Input: %v\n", arr)

	arrCopy := make([]int, len(arr))
	copy(arrCopy, arr)

	low, high := 0, len(arrCopy)-1
	pivot := arrCopy[high]
	fmt.Printf("Pivot: %d (last element)\n", pivot)
	fmt.Println(strings.Repeat("-", 50))

	i := low - 1
	step := 1

	for j := low; j < high; j++ {
		fmt.Printf("\nStep %d: j=%d, examining arr[%d]=%d\n", step, j, j, arrCopy[j])

		// Visual representation
		var visual []string
		for k, val := range arrCopy {
			if k == j {
				visual = append(visual, fmt.Sprintf("[%d]", val))
			} else if k <= i && i >= 0 {
				visual = append(visual, fmt.Sprintf("(%d)", val))
			} else if k == high {
				visual = append(visual, fmt.Sprintf("<%d>", val))
			} else {
				visual = append(visual, fmt.Sprintf("%d", val))
			}
		}

		fmt.Printf("  Array: %s\n", strings.Join(visual, " "))
		fmt.Printf("  i=%d (boundary), j=%d (scanner)\n", i, j)

		if arrCopy[j] <= pivot {
			i++
			if i != j {
				arrCopy[i], arrCopy[j] = arrCopy[j], arrCopy[i]
				fmt.Printf("  %d <= %d: Swap arr[%d] and arr[%d]\n", arrCopy[i], pivot, i, j)
				fmt.Printf("  After swap: %v\n", arrCopy)
			} else {
				fmt.Printf("  %d <= %d: Increment i (no swap needed)\n", arrCopy[j], pivot)
			}
		} else {
			fmt.Printf("  %d > %d: Skip\n", arrCopy[j], pivot)
		}

		step++
	}

	fmt.Printf("\nFinal: Swap pivot with arr[%d]\n", i+1)
	arrCopy[i+1], arrCopy[high] = arrCopy[high], arrCopy[i+1]
	fmt.Printf("Result: %v\n", arrCopy)
	fmt.Printf("Pivot %d is now at index %d\n", pivot, i+1)
}

// Helper functions
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

// ==================== Test Cases ====================

func testQuickSort() bool {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("QUICK SORT TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	testCases := []struct {
		input       []int
		expected    []int
		description string
	}{
		{[]int{10, 7, 8, 9, 1, 5}, []int{1, 5, 7, 8, 9, 10}, "Example 1"},
		{[]int{64, 34, 25, 12, 22, 11, 90}, []int{11, 12, 22, 25, 34, 64, 90}, "Example 2"},
		{[]int{3, 2, 1}, []int{1, 2, 3}, "Reverse sorted"},
		{[]int{5, 5, 5, 5}, []int{5, 5, 5, 5}, "All same"},
		{[]int{1}, []int{1}, "Single element"},
		{[]int{}, []int{}, "Empty array"},
		{[]int{1, 2, 3, 4, 5}, []int{1, 2, 3, 4, 5}, "Already sorted"},
		{[]int{-5, 3, -2, 8, -1, 0}, []int{-5, -2, -1, 0, 3, 8}, "Negative numbers"},
		{[]int{3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5}, []int{1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9}, "Many duplicates"},
	}

	allPassed := true

	for _, tc := range testCases {
		results := map[string][]int{
			"Lomuto": QuickSort(tc.input),
			"Hoare":  QuickSortHoare(tc.input),
			"3-Way":  QuickSort3Way(tc.input),
			"Random": QuickSortRandom(tc.input),
		}

		passed := true
		for _, r := range results {
			if !sliceEqual(r, tc.expected) {
				passed = false
				break
			}
		}
		allPassed = allPassed && passed

		status := "PASS"
		if !passed {
			status = "FAIL"
		}

		fmt.Printf("\n%s: %s\n", status, tc.description)
		fmt.Printf("  Input:    %v\n", tc.input)
		fmt.Printf("  Expected: %v\n", tc.expected)

		for name, result := range results {
			if sliceEqual(result, tc.expected) {
				fmt.Printf("  %s: OK\n", name)
			} else {
				fmt.Printf("  %s: FAIL - got %v\n", name, result)
			}
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
	fmt.Println("QUICK SORT VISUALIZATION DEMO")
	fmt.Println(strings.Repeat("=", 60))

	arr := []int{10, 7, 8, 9, 1, 5}
	fmt.Printf("\nSorting array: %v\n", arr)

	visualizer := NewQuickSortVisualizer()
	result := visualizer.Sort(arr)
	visualizer.PrintSteps()

	fmt.Printf("\nFinal result: %v\n", result)

	fmt.Println()
	fmt.Println(strings.Repeat("-", 60))
	fmt.Println("DETAILED PARTITION OPERATION")
	fmt.Println(strings.Repeat("-", 60))

	VisualizePartition([]int{10, 7, 8, 9, 1, 5})
}

func demo3WayPartition() {
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("THREE-WAY PARTITION DEMO (Dutch National Flag)")
	fmt.Println(strings.Repeat("=", 60))

	arr := []int{3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5}
	fmt.Printf("\nOriginal: %v\n", arr)
	fmt.Println("This array has many duplicates (multiple 1s, 3s, 5s)")

	result := QuickSort3Way(arr)
	fmt.Printf("Sorted:   %v\n", result)

	fmt.Println("\nThree-way partition is efficient here because:")
	fmt.Println("- Elements equal to pivot don't need further sorting")
	fmt.Println("- Reduces number of recursive calls significantly")
}

func demoWorstCase() {
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("WORST CASE DEMONSTRATION")
	fmt.Println(strings.Repeat("=", 60))

	arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	fmt.Printf("\nAlready sorted array: %v\n", arr)
	fmt.Println("With last-element pivot, each partition only removes 1 element")
	fmt.Println("This gives O(n^2) time complexity!")

	fmt.Println("\nSolution: Use random pivot selection")
	result := QuickSortRandom(arr)
	fmt.Printf("Result with random pivot: %v\n", result)
	fmt.Println("Random pivot gives expected O(n log n) even for sorted input")
}

func main() {
	rand.Seed(time.Now().UnixNano())

	testQuickSort()
	demoVisualization()
	demo3WayPartition()
	demoWorstCase()
}
