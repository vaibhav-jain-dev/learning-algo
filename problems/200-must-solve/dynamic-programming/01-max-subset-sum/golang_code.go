/*
Max Subset Sum No Adjacent - Go Solution

Find maximum sum of non-adjacent elements.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// MaxSubsetSumNoAdjacent finds maximum sum of non-adjacent elements
func MaxSubsetSumNoAdjacent(array []int) int {
	if len(array) == 0 {
		return 0
	}
	if len(array) == 1 {
		return array[0]
	}

	// prevPrev: max sum ending 2 positions back
	// prev: max sum ending 1 position back
	prevPrev := array[0]
	prev := max(array[0], array[1])

	for i := 2; i < len(array); i++ {
		current := max(prev, prevPrev+array[i])
		prevPrev = prev
		prev = current
	}

	return prev
}

// MaxSubsetSumDPArray alternative with full DP array for clarity
func MaxSubsetSumDPArray(array []int) int {
	if len(array) == 0 {
		return 0
	}
	if len(array) == 1 {
		return array[0]
	}

	dp := make([]int, len(array))
	dp[0] = array[0]
	dp[1] = max(array[0], array[1])

	for i := 2; i < len(array); i++ {
		dp[i] = max(dp[i-1], dp[i-2]+array[i])
	}

	return dp[len(dp)-1]
}

// MaxSubsetWithIndices returns both max sum and the indices used
func MaxSubsetWithIndices(array []int) (int, []int) {
	if len(array) == 0 {
		return 0, []int{}
	}
	if len(array) == 1 {
		return array[0], []int{0}
	}

	n := len(array)
	dp := make([]int, n)
	dp[0] = array[0]
	dp[1] = max(array[0], array[1])

	for i := 2; i < n; i++ {
		dp[i] = max(dp[i-1], dp[i-2]+array[i])
	}

	// Backtrack to find indices
	indices := []int{}
	i := n - 1
	for i >= 0 {
		if i == 0 {
			indices = append(indices, 0)
			break
		} else if i == 1 {
			if dp[1] == array[1] {
				indices = append(indices, 1)
			} else {
				indices = append(indices, 0)
			}
			break
		} else if dp[i] == dp[i-2]+array[i] {
			indices = append(indices, i)
			i -= 2
		} else {
			i--
		}
	}

	// Reverse indices
	for left, right := 0, len(indices)-1; left < right; left, right = left+1, right-1 {
		indices[left], indices[right] = indices[right], indices[left]
	}

	return dp[n-1], indices
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	// Test 1: Standard case
	arr1 := []int{75, 105, 120, 75, 90, 135}
	result1 := MaxSubsetSumNoAdjacent(arr1)
	fmt.Printf("Test 1: %d\n", result1) // Expected: 330 (75 + 120 + 135)

	// Test 2: Another case
	arr2 := []int{7, 10, 12, 7, 9, 14}
	result2 := MaxSubsetSumNoAdjacent(arr2)
	fmt.Printf("Test 2: %d\n", result2) // Expected: 33 (7 + 12 + 14)

	// Test 3: Empty array
	arr3 := []int{}
	result3 := MaxSubsetSumNoAdjacent(arr3)
	fmt.Printf("Test 3: %d\n", result3) // Expected: 0

	// Test 4: Single element
	arr4 := []int{5}
	result4 := MaxSubsetSumNoAdjacent(arr4)
	fmt.Printf("Test 4: %d\n", result4) // Expected: 5

	// Test 5: Two elements
	arr5 := []int{5, 10}
	result5 := MaxSubsetSumNoAdjacent(arr5)
	fmt.Printf("Test 5: %d\n", result5) // Expected: 10

	// Test 6: All same values
	arr6 := []int{10, 10, 10, 10}
	result6 := MaxSubsetSumNoAdjacent(arr6)
	fmt.Printf("Test 6: %d\n", result6) // Expected: 20 (10 + 10)

	// Test 7: With indices
	arr7 := []int{75, 105, 120, 75, 90, 135}
	maxSum, indices := MaxSubsetWithIndices(arr7)
	fmt.Printf("\nTest 7 - With indices:\n")
	fmt.Printf("  Array: %v\n", arr7)
	fmt.Printf("  Max sum: %d\n", maxSum)
	fmt.Printf("  Indices: %v\n", indices)
	values := make([]int, len(indices))
	for j, idx := range indices {
		values[j] = arr7[idx]
	}
	fmt.Printf("  Values: %v\n", values)

	// Test 8: Compare methods
	arr8 := []int{4, 1, 1, 4, 2, 1}
	result8a := MaxSubsetSumNoAdjacent(arr8)
	result8b := MaxSubsetSumDPArray(arr8)
	fmt.Printf("\nTest 8 - Method comparison:\n")
	fmt.Printf("  Optimized: %d\n", result8a)
	fmt.Printf("  Full DP: %d\n", result8b)

	fmt.Println("\nAll tests completed!")
}
