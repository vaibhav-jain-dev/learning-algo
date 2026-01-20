/*
Count Number of Peaks - Go Solutions

Count total valid peaks in an array.
*/

package main

import "fmt"

// CountPeaks counts number of peaks in array.
// A peak is an element strictly greater than both neighbors.
func CountPeaks(array []int) int {
	if len(array) < 3 {
		return 0
	}

	count := 0
	for i := 1; i < len(array)-1; i++ {
		if array[i] > array[i-1] && array[i] > array[i+1] {
			count++
		}
	}

	return count
}

// CountPeaksWithIndices returns count and indices of all peaks.
func CountPeaksWithIndices(array []int) (int, []int) {
	if len(array) < 3 {
		return 0, []int{}
	}

	peaks := make([]int, 0)
	for i := 1; i < len(array)-1; i++ {
		if array[i] > array[i-1] && array[i] > array[i+1] {
			peaks = append(peaks, i)
		}
	}

	return len(peaks), peaks
}

func main() {
	testCases := []struct {
		array    []int
		expected int
		desc     string
	}{
		{[]int{1, 3, 2, 4, 1, 5, 2}, 3, "Standard case"},
		{[]int{1, 2, 3, 4, 5}, 0, "No peaks"},
		{[]int{5, 4, 3, 4, 5}, 0, "Valley not peak"},
		{[]int{1, 3, 1}, 1, "Single peak"},
		{[]int{1, 2}, 0, "Too short"},
		{[]int{}, 0, "Empty array"},
	}

	fmt.Println("============================================================")
	fmt.Println("COUNT NUMBER OF PEAKS - TEST RESULTS")
	fmt.Println("============================================================")

	for _, tc := range testCases {
		result := CountPeaks(tc.array)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  %s: %s: %d (expected %d)\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n--- Sample Input ---")
	array := []int{1, 3, 2, 4, 1, 5, 2}
	count, indices := CountPeaksWithIndices(array)
	fmt.Printf("Array: %v\n", array)
	fmt.Printf("Peak count: %d\n", count)
	fmt.Printf("Peak indices: %v\n", indices)
}
