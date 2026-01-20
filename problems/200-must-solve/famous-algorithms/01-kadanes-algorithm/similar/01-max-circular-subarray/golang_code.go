/*
Maximum Sum Circular Subarray - Go Solution

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

func maxSubarraySumCircular(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	total := 0
	maxSum := nums[0]
	minSum := nums[0]
	currentMax := 0
	currentMin := 0

	for _, num := range nums {
		// Standard Kadane's for max
		currentMax = max(num, currentMax+num)
		maxSum = max(maxSum, currentMax)

		// Modified Kadane's for min
		currentMin = min(num, currentMin+num)
		minSum = min(minSum, currentMin)

		total += num
	}

	// If all elements negative, maxSum is the answer
	if maxSum < 0 {
		return maxSum
	}

	return max(maxSum, total-minSum)
}

func main() {
	fmt.Printf("Test 1: %d\n", maxSubarraySumCircular([]int{1, -2, 3, -2})) // Expected: 3
	fmt.Printf("Test 2: %d\n", maxSubarraySumCircular([]int{5, -3, 5}))     // Expected: 10
	fmt.Printf("Test 3: %d\n", maxSubarraySumCircular([]int{-3, -2, -1}))   // Expected: -1
	fmt.Printf("Test 4: %d\n", maxSubarraySumCircular([]int{3, -1, 2, -1})) // Expected: 4
	fmt.Println("\nAll tests completed!")
}
