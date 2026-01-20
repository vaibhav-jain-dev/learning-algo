/*
Maximum Peak Sum - Go Solutions

Find the peak with maximum sum of elements.
*/

package main

import "fmt"

// MaxPeakSum finds peak with maximum sum.
func MaxPeakSum(array []int) int {
	if len(array) < 3 {
		return 0
	}

	maxSum := 0
	i := 1

	for i < len(array)-1 {
		// Check if tip
		isTip := array[i] > array[i-1] && array[i] > array[i+1]

		if !isTip {
			i++
			continue
		}

		// Expand left
		left := i - 1
		for left > 0 && array[left] > array[left-1] {
			left--
		}

		// Expand right
		right := i + 1
		for right < len(array)-1 && array[right] > array[right+1] {
			right++
		}

		// Calculate sum
		peakSum := 0
		for j := left; j <= right; j++ {
			peakSum += array[j]
		}

		if peakSum > maxSum {
			maxSum = peakSum
		}

		i = right + 1
	}

	return maxSum
}

// MaxPeakSumWithDetails returns max sum and peak elements.
func MaxPeakSumWithDetails(array []int) (int, []int) {
	if len(array) < 3 {
		return 0, []int{}
	}

	maxSum := 0
	var bestPeak []int
	i := 1

	for i < len(array)-1 {
		isTip := array[i] > array[i-1] && array[i] > array[i+1]

		if !isTip {
			i++
			continue
		}

		left := i - 1
		for left > 0 && array[left] > array[left-1] {
			left--
		}

		right := i + 1
		for right < len(array)-1 && array[right] > array[right+1] {
			right++
		}

		peak := make([]int, right-left+1)
		peakSum := 0
		for j := left; j <= right; j++ {
			peak[j-left] = array[j]
			peakSum += array[j]
		}

		if peakSum > maxSum {
			maxSum = peakSum
			bestPeak = peak
		}

		i = right + 1
	}

	return maxSum, bestPeak
}

func main() {
	testCases := []struct {
		array    []int
		expected int
		desc     string
	}{
		{[]int{1, 10, 2, 100, 50, 1}, 153, "Two peaks"},
		{[]int{1, 3, 2}, 6, "Single peak"},
		{[]int{1, 2, 3, 4, 5}, 0, "No peak"},
		{[]int{5, 4, 3, 2, 1}, 0, "No peak"},
	}

	fmt.Println("============================================================")
	fmt.Println("MAXIMUM PEAK SUM - TEST RESULTS")
	fmt.Println("============================================================")

	for _, tc := range testCases {
		result := MaxPeakSum(tc.array)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  %s: %s: %d (expected %d)\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n--- Sample Input ---")
	array := []int{1, 10, 2, 100, 50, 1}
	maxS, peak := MaxPeakSumWithDetails(array)
	fmt.Printf("Array: %v\n", array)
	fmt.Printf("Maximum peak sum: %d\n", maxS)
	fmt.Printf("Peak elements: %v\n", peak)
}
