/*
Maximum Product Subarray - Go Solution

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

func maxProduct(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	maxProd := nums[0]
	minProd := nums[0]
	result := nums[0]

	for i := 1; i < len(nums); i++ {
		num := nums[i]

		// If negative, max becomes min and vice versa
		if num < 0 {
			maxProd, minProd = minProd, maxProd
		}

		maxProd = max(num, maxProd*num)
		minProd = min(num, minProd*num)

		result = max(result, maxProd)
	}

	return result
}

func main() {
	fmt.Printf("Test 1: %d\n", maxProduct([]int{2, 3, -2, 4})) // Expected: 6
	fmt.Printf("Test 2: %d\n", maxProduct([]int{-2, 0, -1}))   // Expected: 0
	fmt.Printf("Test 3: %d\n", maxProduct([]int{-2, 3, -4}))   // Expected: 24
	fmt.Printf("Test 4: %d\n", maxProduct([]int{0, 2}))        // Expected: 2
	fmt.Println("\nAll tests completed!")
}
