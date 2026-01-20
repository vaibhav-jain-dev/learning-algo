/*
Longest Bitonic Subsequence - Go Solutions

Find longest subsequence that first increases then decreases.
*/

package main

import "fmt"

// LongestBitonicSubsequence finds length of longest bitonic subsequence.
func LongestBitonicSubsequence(array []int) int {
	if len(array) == 0 {
		return 0
	}

	n := len(array)

	// LIS ending at each index
	lis := make([]int, n)
	for i := range lis {
		lis[i] = 1
	}
	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if array[i] > array[j] && lis[j]+1 > lis[i] {
				lis[i] = lis[j] + 1
			}
		}
	}

	// LDS starting at each index
	lds := make([]int, n)
	for i := range lds {
		lds[i] = 1
	}
	for i := n - 2; i >= 0; i-- {
		for j := i + 1; j < n; j++ {
			if array[i] > array[j] && lds[j]+1 > lds[i] {
				lds[i] = lds[j] + 1
			}
		}
	}

	// Find maximum bitonic length
	maxLen := 0
	for i := 0; i < n; i++ {
		if lis[i]+lds[i]-1 > maxLen {
			maxLen = lis[i] + lds[i] - 1
		}
	}

	return maxLen
}

func main() {
	testCases := []struct {
		array    []int
		expected int
		desc     string
	}{
		{[]int{1, 11, 2, 10, 4, 5, 2, 1}, 6, "Standard case"},
		{[]int{1, 2, 3, 4, 5}, 5, "Only increasing"},
		{[]int{5, 4, 3, 2, 1}, 5, "Only decreasing"},
		{[]int{1, 3, 2}, 3, "Simple bitonic"},
		{[]int{1}, 1, "Single element"},
	}

	fmt.Println("============================================================")
	fmt.Println("LONGEST BITONIC SUBSEQUENCE - TEST RESULTS")
	fmt.Println("============================================================")

	for _, tc := range testCases {
		result := LongestBitonicSubsequence(tc.array)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  %s: %s: %d (expected %d)\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n--- Sample Input ---")
	array := []int{1, 11, 2, 10, 4, 5, 2, 1}
	fmt.Printf("Array: %v\n", array)
	fmt.Printf("Longest bitonic length: %d\n", LongestBitonicSubsequence(array))
}
