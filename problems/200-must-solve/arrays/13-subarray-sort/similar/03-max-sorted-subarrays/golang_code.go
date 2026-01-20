/*
Maximum Sorted Subarrays (Max Chunks) - Go Solutions
*/

package main

import "fmt"

// MaxChunksToSorted finds max chunks to sort array independently.
func MaxChunksToSorted(arr []int) int {
	if len(arr) == 0 {
		return 0
	}

	n := len(arr)

	// Prefix maximum
	prefixMax := make([]int, n)
	prefixMax[0] = arr[0]
	for i := 1; i < n; i++ {
		prefixMax[i] = max(prefixMax[i-1], arr[i])
	}

	// Suffix minimum
	suffixMin := make([]int, n)
	suffixMin[n-1] = arr[n-1]
	for i := n - 2; i >= 0; i-- {
		suffixMin[i] = min(suffixMin[i+1], arr[i])
	}

	// Count valid split points
	chunks := 1
	for i := 0; i < n-1; i++ {
		if prefixMax[i] <= suffixMin[i+1] {
			chunks++
		}
	}

	return chunks
}

func main() {
	testCases := []struct {
		arr      []int
		expected int
		desc     string
	}{
		{[]int{1, 0, 2, 3, 4}, 4, "Multiple chunks"},
		{[]int{4, 3, 2, 1, 0}, 1, "Single chunk"},
		{[]int{0, 1, 2, 3, 4}, 5, "All separate"},
	}

	fmt.Println("============================================================")
	fmt.Println("MAX CHUNKS TO SORTED - TEST RESULTS")
	fmt.Println("============================================================")

	for _, tc := range testCases {
		result := MaxChunksToSorted(tc.arr)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  %s: %s: %d (expected %d)\n", status, tc.desc, result, tc.expected)
	}
}
