/*
Max Sum Increasing Subsequence - Go Solution

Find the greatest sum from a strictly increasing subsequence and return
the indices of elements in that subsequence.

Time Complexity: O(n^2)
Space Complexity: O(n)
*/

package main

import "fmt"

// MaxSumIncreasingSubsequence finds the maximum sum increasing subsequence
// Returns (maxSum, indices)
func MaxSumIncreasingSubsequence(array []int) (int, []int) {
	if len(array) == 0 {
		return 0, []int{}
	}

	n := len(array)

	// dp[i] = maximum sum of increasing subsequence ending at index i
	dp := make([]int, n)
	copy(dp, array) // Initialize with each element as its own subsequence

	// prev[i] = index of previous element in the optimal subsequence ending at i
	// Use -1 to indicate no previous element
	prev := make([]int, n)
	for i := range prev {
		prev[i] = -1
	}

	// Build the DP table
	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			// If array[j] < array[i], we can extend the subsequence
			if array[j] < array[i] {
				if dp[j]+array[i] > dp[i] {
					dp[i] = dp[j] + array[i]
					prev[i] = j
				}
			}
		}
	}

	// Find the index with maximum sum
	maxSum := dp[0]
	maxIdx := 0
	for i := 1; i < n; i++ {
		if dp[i] > maxSum {
			maxSum = dp[i]
			maxIdx = i
		}
	}

	// Backtrack to reconstruct the subsequence
	indices := []int{}
	current := maxIdx
	for current != -1 {
		indices = append(indices, current)
		current = prev[current]
	}

	// Reverse indices
	for left, right := 0, len(indices)-1; left < right; left, right = left+1, right-1 {
		indices[left], indices[right] = indices[right], indices[left]
	}

	return maxSum, indices
}

// MaxSumIncreasingSubsequenceValues returns actual values instead of indices
func MaxSumIncreasingSubsequenceValues(array []int) (int, []int) {
	maxSum, indices := MaxSumIncreasingSubsequence(array)
	values := make([]int, len(indices))
	for i, idx := range indices {
		values[i] = array[idx]
	}
	return maxSum, values
}

// MaxSumIncreasingDPOnly returns only the maximum sum
func MaxSumIncreasingDPOnly(array []int) int {
	if len(array) == 0 {
		return 0
	}

	n := len(array)
	dp := make([]int, n)
	copy(dp, array)

	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if array[j] < array[i] {
				if dp[j]+array[i] > dp[i] {
					dp[i] = dp[j] + array[i]
				}
			}
		}
	}

	maxSum := dp[0]
	for _, v := range dp[1:] {
		if v > maxSum {
			maxSum = v
		}
	}
	return maxSum
}

// MaxSumIncreasingRecursive uses top-down approach with memoization
func MaxSumIncreasingRecursive(array []int) (int, []int) {
	if len(array) == 0 {
		return 0, []int{}
	}

	n := len(array)
	memo := make(map[int]int)

	var dp func(idx int) int
	dp = func(idx int) int {
		if val, exists := memo[idx]; exists {
			return val
		}

		result := array[idx]

		for j := 0; j < idx; j++ {
			if array[j] < array[idx] {
				if dp(j)+array[idx] > result {
					result = dp(j) + array[idx]
				}
			}
		}

		memo[idx] = result
		return result
	}

	// Compute dp values for all indices
	maxSum := dp(0)
	maxIdx := 0
	for i := 1; i < n; i++ {
		val := dp(i)
		if val > maxSum {
			maxSum = val
			maxIdx = i
		}
	}

	// Reconstruct the subsequence
	indices := []int{}
	currentVal := maxSum
	currentIdx := maxIdx

	for currentIdx >= 0 {
		if memo[currentIdx] == currentVal {
			indices = append(indices, currentIdx)
			currentVal -= array[currentIdx]
			// Find previous element
			found := false
			for j := currentIdx - 1; j >= 0; j-- {
				if array[j] < array[currentIdx] && memo[j] == currentVal {
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

	// Reverse indices
	for left, right := 0, len(indices)-1; left < right; left, right = left+1, right-1 {
		indices[left], indices[right] = indices[right], indices[left]
	}

	return maxSum, indices
}

func main() {
	// Test 1: Standard case
	arr1 := []int{10, 70, 20, 30, 50, 11, 30}
	sum1, indices1 := MaxSumIncreasingSubsequence(arr1)
	values1 := make([]int, len(indices1))
	for i, idx := range indices1 {
		values1[i] = arr1[idx]
	}
	fmt.Printf("Test 1: %v\n", arr1)
	fmt.Printf("  Result: sum=%d, indices=%v\n", sum1, indices1)
	fmt.Printf("  Values: %v\n", values1)
	// Expected: sum=110, indices=[0, 2, 3, 4] (10+20+30+50)

	// Test 2: Another case
	arr2 := []int{8, 12, 2, 3, 15, 5, 7}
	sum2, indices2 := MaxSumIncreasingSubsequence(arr2)
	values2 := make([]int, len(indices2))
	for i, idx := range indices2 {
		values2[i] = arr2[idx]
	}
	fmt.Printf("\nTest 2: %v\n", arr2)
	fmt.Printf("  Result: sum=%d, indices=%v\n", sum2, indices2)
	fmt.Printf("  Values: %v\n", values2)
	// Expected: sum=35, indices=[0, 1, 4] (8+12+15)

	// Test 3: All increasing
	arr3 := []int{1, 2, 3, 4, 5}
	sum3, indices3 := MaxSumIncreasingSubsequence(arr3)
	fmt.Printf("\nTest 3: %v\n", arr3)
	fmt.Printf("  Result: sum=%d, indices=%v\n", sum3, indices3)
	// Expected: sum=15, indices=[0, 1, 2, 3, 4]

	// Test 4: All decreasing
	arr4 := []int{5, 4, 3, 2, 1}
	sum4, indices4 := MaxSumIncreasingSubsequence(arr4)
	fmt.Printf("\nTest 4: %v\n", arr4)
	fmt.Printf("  Result: sum=%d, indices=%v\n", sum4, indices4)
	// Expected: sum=5, indices=[0]

	// Test 5: Single element
	arr5 := []int{10}
	sum5, indices5 := MaxSumIncreasingSubsequence(arr5)
	fmt.Printf("\nTest 5: %v\n", arr5)
	fmt.Printf("  Result: sum=%d, indices=%v\n", sum5, indices5)
	// Expected: sum=10, indices=[0]

	// Test 6: With negative numbers
	arr6 := []int{-1, 5, 2, 3, 10, 4}
	sum6, indices6 := MaxSumIncreasingSubsequence(arr6)
	values6 := make([]int, len(indices6))
	for i, idx := range indices6 {
		values6[i] = arr6[idx]
	}
	fmt.Printf("\nTest 6: %v\n", arr6)
	fmt.Printf("  Result: sum=%d, indices=%v\n", sum6, indices6)
	fmt.Printf("  Values: %v\n", values6)

	// Test 7: Compare methods
	arr7 := []int{10, 70, 20, 30, 50, 11, 30}
	fmt.Printf("\nTest 7 - Method comparison for %v:\n", arr7)
	sum7a, idx7a := MaxSumIncreasingSubsequence(arr7)
	fmt.Printf("  DP: sum=%d, indices=%v\n", sum7a, idx7a)
	sum7b, val7b := MaxSumIncreasingSubsequenceValues(arr7)
	fmt.Printf("  Values: sum=%d, values=%v\n", sum7b, val7b)
	fmt.Printf("  Sum only: %d\n", MaxSumIncreasingDPOnly(arr7))

	// Test 8: Recursive method
	arr8 := []int{8, 12, 2, 3, 15, 5, 7}
	sum8, indices8 := MaxSumIncreasingRecursive(arr8)
	fmt.Printf("\nTest 8 - Recursive for %v:\n", arr8)
	fmt.Printf("  Result: sum=%d, indices=%v\n", sum8, indices8)

	fmt.Println("\nAll tests completed!")
}
