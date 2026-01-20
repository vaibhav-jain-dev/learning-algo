/*
K-Sum (Generalized) - Go Solutions

Find all unique k numbers that sum to target.
*/

package main

import (
	"fmt"
	"sort"
)

// KSum finds all unique combinations of k numbers that sum to target.
func KSum(nums []int, k int, target int) [][]int {
	sort.Ints(nums)
	return kSumHelper(nums, 0, k, target)
}

func kSumHelper(nums []int, start, k, target int) [][]int {
	if k == 2 {
		return twoSum(nums, start, target)
	}

	result := make([][]int, 0)

	for i := start; i <= len(nums)-k; i++ {
		// Skip duplicates
		if i > start && nums[i] == nums[i-1] {
			continue
		}

		// Recursively solve (k-1)-sum
		for _, subset := range kSumHelper(nums, i+1, k-1, target-nums[i]) {
			combo := append([]int{nums[i]}, subset...)
			result = append(result, combo)
		}
	}

	return result
}

func twoSum(nums []int, start, target int) [][]int {
	result := make([][]int, 0)
	left, right := start, len(nums)-1

	for left < right {
		sum := nums[left] + nums[right]
		if sum < target {
			left++
		} else if sum > target {
			right--
		} else {
			result = append(result, []int{nums[left], nums[right]})
			left++
			right--
			// Skip duplicates
			for left < right && nums[left] == nums[left-1] {
				left++
			}
		}
	}

	return result
}

func main() {
	fmt.Println("============================================================")
	fmt.Println("K-SUM (GENERALIZED) - TEST RESULTS")
	fmt.Println("============================================================")

	// Test 3-sum
	nums := []int{1, 2, 3, 4, 5}
	k, target := 3, 9
	result := KSum(nums, k, target)
	fmt.Printf("3-sum: array=%v, k=%d, target=%d\n", nums, k, target)
	fmt.Printf("Result: %v\n", result)

	// Test 4-sum
	nums = []int{1, 0, -1, 0, -2, 2}
	k, target = 4, 0
	result = KSum(nums, k, target)
	fmt.Printf("\n4-sum: array=%v, k=%d, target=%d\n", nums, k, target)
	fmt.Printf("Result: %v\n", result)
}
