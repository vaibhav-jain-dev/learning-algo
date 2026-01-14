/*
Two Sum II - Input Array Is Sorted
Using Two Pointers Approach
*/

package main

import "fmt"

// twoSum finds two numbers in sorted array that sum to target
// Returns 1-indexed positions
func twoSum(numbers []int, target int) []int {
	left := 0
	right := len(numbers) - 1

	for left < right {
		currentSum := numbers[left] + numbers[right]

		if currentSum == target {
			// Return 1-indexed positions
			return []int{left + 1, right + 1}
		} else if currentSum < target {
			// Sum too small, need larger number
			left++
		} else {
			// Sum too large, need smaller number
			right--
		}
	}

	return []int{} // No solution found
}

func main() {
	// Test cases
	testCases := []struct {
		numbers []int
		target  int
	}{
		{[]int{2, 7, 11, 15}, 9},
		{[]int{2, 3, 4}, 6},
		{[]int{-1, 0}, -1},
		{[]int{1, 2, 3, 4, 5, 6}, 11},
		{[]int{-5, -3, 0, 2, 4, 6, 8}, 5},
	}

	fmt.Println("Two Sum II - Sorted Array")
	fmt.Println("==================================================")

	for _, tc := range testCases {
		result := twoSum(tc.numbers, tc.target)
		fmt.Printf("\nArray: %v\n", tc.numbers)
		fmt.Printf("Target: %d\n", tc.target)
		fmt.Printf("Result indices: %v\n", result)
		if len(result) == 2 {
			fmt.Printf("Values: %d + %d = %d\n",
				tc.numbers[result[0]-1],
				tc.numbers[result[1]-1],
				tc.target)
		}
		fmt.Println("------------------------------")
	}
}
