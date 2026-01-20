/*
Longest Increasing Subsequence - Go Solution

Find the longest strictly increasing subsequence in an array.

Time Complexity: O(n^2) for DP, O(n log n) for binary search
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"sort"
)

// LongestIncreasingSubsequence finds LIS using bottom-up DP (O(n^2))
func LongestIncreasingSubsequence(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	n := len(array)

	// dp[i] = length of LIS ending at index i
	dp := make([]int, n)
	for i := range dp {
		dp[i] = 1
	}

	// prev[i] = index of previous element in LIS ending at i
	prev := make([]int, n)
	for i := range prev {
		prev[i] = -1
	}

	// Fill DP table
	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if array[j] < array[i] && dp[j]+1 > dp[i] {
				dp[i] = dp[j] + 1
				prev[i] = j
			}
		}
	}

	// Find index with maximum LIS length
	maxLength := dp[0]
	maxIdx := 0
	for i := 1; i < n; i++ {
		if dp[i] > maxLength {
			maxLength = dp[i]
			maxIdx = i
		}
	}

	// Reconstruct LIS
	lis := []int{}
	current := maxIdx
	for current != -1 {
		lis = append(lis, array[current])
		current = prev[current]
	}

	// Reverse lis
	for left, right := 0, len(lis)-1; left < right; left, right = left+1, right-1 {
		lis[left], lis[right] = lis[right], lis[left]
	}

	return lis
}

// LongestIncreasingSubsequenceBinary finds LIS using binary search (O(n log n))
func LongestIncreasingSubsequenceBinary(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	n := len(array)

	// tails[i] = smallest ending element of all LIS of length i+1
	tails := []int{}

	// For reconstruction
	prev := make([]int, n)
	for i := range prev {
		prev[i] = -1
	}
	indices := []int{} // indices[i] = index in array for tails[i]

	for i := 0; i < n; i++ {
		// Binary search for position
		pos := sort.SearchInts(tails, array[i])

		if pos == len(tails) {
			tails = append(tails, array[i])
			indices = append(indices, i)
		} else {
			tails[pos] = array[i]
			indices[pos] = i
		}

		// Update previous pointer
		if pos > 0 {
			prev[i] = indices[pos-1]
		}
	}

	// Reconstruct LIS
	lis := []int{}
	current := indices[len(indices)-1]
	for current != -1 {
		lis = append(lis, array[current])
		current = prev[current]
	}

	// Reverse lis
	for left, right := 0, len(lis)-1; left < right; left, right = left+1, right-1 {
		lis[left], lis[right] = lis[right], lis[left]
	}

	return lis
}

// LISLength returns only the length of LIS (O(n log n))
func LISLength(array []int) int {
	if len(array) == 0 {
		return 0
	}

	tails := []int{}

	for _, num := range array {
		pos := sort.SearchInts(tails, num)
		if pos == len(tails) {
			tails = append(tails, num)
		} else {
			tails[pos] = num
		}
	}

	return len(tails)
}

// LISRecursive uses top-down approach with memoization
func LISRecursive(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	n := len(array)
	memo := make(map[int]int)

	var dp func(i int) int
	dp = func(i int) int {
		if val, exists := memo[i]; exists {
			return val
		}

		result := 1

		for j := 0; j < i; j++ {
			if array[j] < array[i] {
				if dp(j)+1 > result {
					result = dp(j) + 1
				}
			}
		}

		memo[i] = result
		return result
	}

	// Compute dp for all indices
	maxLength := 0
	maxIdx := 0
	for i := 0; i < n; i++ {
		length := dp(i)
		if length > maxLength {
			maxLength = length
			maxIdx = i
		}
	}

	// Reconstruct LIS
	lis := []int{}
	currentLength := maxLength
	currentIdx := maxIdx

	for currentIdx >= 0 && currentLength > 0 {
		if memo[currentIdx] == currentLength {
			lis = append(lis, array[currentIdx])
			currentLength--
			// Find previous element
			found := false
			for j := currentIdx - 1; j >= 0; j-- {
				if array[j] < array[currentIdx] && memo[j] == currentLength {
					currentIdx = j
					found = true
					break
				}
			}
			if !found {
				break
			}
		} else {
			currentIdx--
		}
	}

	// Reverse lis
	for left, right := 0, len(lis)-1; left < right; left, right = left+1, right-1 {
		lis[left], lis[right] = lis[right], lis[left]
	}

	return lis
}

// CountLIS counts the number of longest increasing subsequences
func CountLIS(array []int) int {
	if len(array) == 0 {
		return 0
	}

	n := len(array)

	// dp[i] = length of LIS ending at i
	dp := make([]int, n)
	for i := range dp {
		dp[i] = 1
	}

	// count[i] = number of LIS of length dp[i] ending at i
	count := make([]int, n)
	for i := range count {
		count[i] = 1
	}

	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if array[j] < array[i] {
				if dp[j]+1 > dp[i] {
					dp[i] = dp[j] + 1
					count[i] = count[j]
				} else if dp[j]+1 == dp[i] {
					count[i] += count[j]
				}
			}
		}
	}

	maxLength := dp[0]
	for _, l := range dp {
		if l > maxLength {
			maxLength = l
		}
	}

	total := 0
	for i := 0; i < n; i++ {
		if dp[i] == maxLength {
			total += count[i]
		}
	}

	return total
}

func main() {
	// Test 1: Standard case
	arr1 := []int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35}
	result1 := LongestIncreasingSubsequence(arr1)
	fmt.Printf("Test 1: %v\n", arr1)
	fmt.Printf("  LIS: %v (length %d)\n", result1, len(result1))
	// Expected: [-24, 2, 3, 5, 6, 35] or similar

	// Test 2: Another case
	arr2 := []int{10, 9, 2, 5, 3, 7, 101, 18}
	result2 := LongestIncreasingSubsequence(arr2)
	fmt.Printf("\nTest 2: %v\n", arr2)
	fmt.Printf("  LIS: %v (length %d)\n", result2, len(result2))
	// Expected: [2, 3, 7, 101] or [2, 3, 7, 18] or similar

	// Test 3: With zeros
	arr3 := []int{0, 1, 0, 3, 2, 3}
	result3 := LongestIncreasingSubsequence(arr3)
	fmt.Printf("\nTest 3: %v\n", arr3)
	fmt.Printf("  LIS: %v (length %d)\n", result3, len(result3))
	// Expected: [0, 1, 2, 3]

	// Test 4: All same
	arr4 := []int{5, 5, 5, 5}
	result4 := LongestIncreasingSubsequence(arr4)
	fmt.Printf("\nTest 4: %v\n", arr4)
	fmt.Printf("  LIS: %v (length %d)\n", result4, len(result4))
	// Expected: [5] (length 1)

	// Test 5: Decreasing
	arr5 := []int{5, 4, 3, 2, 1}
	result5 := LongestIncreasingSubsequence(arr5)
	fmt.Printf("\nTest 5: %v\n", arr5)
	fmt.Printf("  LIS: %v (length %d)\n", result5, len(result5))
	// Expected: any single element

	// Test 6: Compare methods
	arr6 := []int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35}
	fmt.Printf("\nTest 6 - Method comparison for %v:\n", arr6)
	fmt.Printf("  DP (O(n^2)): %v\n", LongestIncreasingSubsequence(arr6))
	fmt.Printf("  Binary (O(n log n)): %v\n", LongestIncreasingSubsequenceBinary(arr6))
	fmt.Printf("  Recursive: %v\n", LISRecursive(arr6))
	fmt.Printf("  Length only: %d\n", LISLength(arr6))

	// Test 7: Count LIS
	arr7 := []int{1, 3, 5, 4, 7}
	count := CountLIS(arr7)
	fmt.Printf("\nTest 7 - Count LIS for %v:\n", arr7)
	fmt.Printf("  Number of LIS: %d\n", count)
	// Expected: 2 ([1, 3, 5, 7] and [1, 3, 4, 7])

	// Test 8: Single element
	arr8 := []int{42}
	result8 := LongestIncreasingSubsequence(arr8)
	fmt.Printf("\nTest 8: %v\n", arr8)
	fmt.Printf("  LIS: %v\n", result8)
	// Expected: [42]

	// Test 9: Empty
	arr9 := []int{}
	result9 := LongestIncreasingSubsequence(arr9)
	fmt.Printf("\nTest 9: %v\n", arr9)
	fmt.Printf("  LIS: %v\n", result9)
	// Expected: []

	// Test 10: Longer example
	arr10 := []int{3, 1, 8, 2, 5, 6, 4, 7}
	result10 := LongestIncreasingSubsequence(arr10)
	fmt.Printf("\nTest 10: %v\n", arr10)
	fmt.Printf("  LIS: %v (length %d)\n", result10, len(result10))

	fmt.Println("\nAll tests completed!")
}
