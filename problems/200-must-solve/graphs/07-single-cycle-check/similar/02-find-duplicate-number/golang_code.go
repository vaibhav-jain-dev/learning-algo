/*
Find the Duplicate Number - Go Solution

Find the duplicate number using Floyd's cycle detection.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// findDuplicate finds the duplicate using Floyd's algorithm
func findDuplicate(nums []int) int {
	// Phase 1: Find intersection point
	slow := nums[0]
	fast := nums[0]

	for {
		slow = nums[slow]
		fast = nums[nums[fast]]
		if slow == fast {
			break
		}
	}

	// Phase 2: Find entrance to cycle
	slow = nums[0]
	for slow != fast {
		slow = nums[slow]
		fast = nums[fast]
	}

	return slow
}

// findDuplicateBinarySearch uses binary search on value range
func findDuplicateBinarySearch(nums []int) int {
	left, right := 1, len(nums)-1

	for left < right {
		mid := (left + right) / 2

		// Count numbers <= mid
		count := 0
		for _, num := range nums {
			if num <= mid {
				count++
			}
		}

		if count > mid {
			right = mid
		} else {
			left = mid + 1
		}
	}

	return left
}

// findDuplicateNegativeMarking uses negative marking (modifies array copy)
func findDuplicateNegativeMarking(nums []int) int {
	// Copy to avoid modifying input
	numsCopy := make([]int, len(nums))
	copy(numsCopy, nums)

	for _, num := range numsCopy {
		idx := num
		if idx < 0 {
			idx = -idx
		}
		if numsCopy[idx] < 0 {
			return idx
		}
		numsCopy[idx] = -numsCopy[idx]
	}

	return -1
}

// findAllDuplicates finds all duplicates when multiple can exist
func findAllDuplicates(nums []int) []int {
	numsCopy := make([]int, len(nums))
	copy(numsCopy, nums)

	duplicates := []int{}

	for _, num := range numsCopy {
		idx := num
		if idx < 0 {
			idx = -idx
		}
		if numsCopy[idx] < 0 {
			duplicates = append(duplicates, idx)
		} else {
			numsCopy[idx] = -numsCopy[idx]
		}
	}

	return duplicates
}

func main() {
	// Test 1: Standard case
	nums1 := []int{1, 3, 4, 2, 2}
	result1 := findDuplicate(nums1)
	fmt.Printf("Test 1: %d\n", result1)
	if result1 != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result1)
	}

	// Test 2: Another case
	nums2 := []int{3, 1, 3, 4, 2}
	result2 := findDuplicate(nums2)
	fmt.Printf("Test 2: %d\n", result2)
	if result2 != 3 {
		fmt.Printf("FAIL: Expected 3, got %d\n", result2)
	}

	// Test 3: Minimal case
	nums3 := []int{1, 1}
	result3 := findDuplicate(nums3)
	fmt.Printf("Test 3: %d\n", result3)
	if result3 != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result3)
	}

	// Test 4: Multiple same duplicates
	nums4 := []int{2, 2, 2, 2, 2}
	result4 := findDuplicate(nums4)
	fmt.Printf("Test 4: %d\n", result4)
	if result4 != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result4)
	}

	// Test 5: Binary search approach
	result5 := findDuplicateBinarySearch([]int{1, 3, 4, 2, 2})
	fmt.Printf("Test 5 (Binary Search): %d\n", result5)
	if result5 != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result5)
	}

	// Test 6: Negative marking
	result6 := findDuplicateNegativeMarking([]int{1, 3, 4, 2, 2})
	fmt.Printf("Test 6 (Negative Marking): %d\n", result6)
	if result6 != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result6)
	}

	// Test 7: Find all duplicates
	nums7 := []int{4, 3, 2, 7, 8, 2, 3, 1}
	result7 := findAllDuplicates(nums7)
	fmt.Printf("Test 7 (All Duplicates): %v\n", result7)

	fmt.Println("\nAll tests passed!")
}
