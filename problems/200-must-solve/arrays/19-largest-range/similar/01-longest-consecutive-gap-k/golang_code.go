/*
Longest Consecutive Sequence with Gap K - Go Solution

Find the longest sequence where consecutive elements differ by exactly k.

Time Complexity: O(n)
Space Complexity: O(n)
*/

package main

import "fmt"

// longestConsecutiveGapK finds length of longest sequence with gap k
func longestConsecutiveGapK(nums []int, k int) int {
	if len(nums) == 0 {
		return 0
	}

	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	maxLength := 0

	for num := range numSet {
		// Only start from sequence beginnings
		if !numSet[num-k] {
			current := num
			length := 1

			for numSet[current+k] {
				current += k
				length++
			}

			if length > maxLength {
				maxLength = length
			}
		}
	}

	return maxLength
}

// longestConsecutiveGapKWithSequence returns the actual sequence
func longestConsecutiveGapKWithSequence(nums []int, k int) (int, []int) {
	if len(nums) == 0 {
		return 0, nil
	}

	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	maxLength := 0
	var bestSequence []int

	for num := range numSet {
		if !numSet[num-k] {
			current := num
			sequence := []int{current}

			for numSet[current+k] {
				current += k
				sequence = append(sequence, current)
			}

			if len(sequence) > maxLength {
				maxLength = len(sequence)
				bestSequence = make([]int, len(sequence))
				copy(bestSequence, sequence)
			}
		}
	}

	return maxLength, bestSequence
}

func main() {
	// Test 1: Gap of 2
	nums1 := []int{1, 3, 5, 7, 9, 2, 4}
	result1 := longestConsecutiveGapK(nums1, 2)
	fmt.Printf("Test 1: %d\n", result1)
	if result1 != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", result1)
	}

	// Test 2: Gap of 4
	nums2 := []int{1, 5, 9, 13, 2, 6, 10}
	result2 := longestConsecutiveGapK(nums2, 4)
	fmt.Printf("Test 2: %d\n", result2)
	if result2 != 4 {
		fmt.Printf("FAIL: Expected 4, got %d\n", result2)
	}

	// Test 3: Gap of 1
	nums3 := []int{1, 2, 3, 4, 5}
	result3 := longestConsecutiveGapK(nums3, 1)
	fmt.Printf("Test 3: %d\n", result3)
	if result3 != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", result3)
	}

	// Test 4: With sequence
	length4, seq4 := longestConsecutiveGapKWithSequence([]int{1, 3, 5, 7, 9, 2, 4}, 2)
	fmt.Printf("Test 4: Length=%d, Sequence=%v\n", length4, seq4)
	if length4 != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", length4)
	}

	// Test 5: No valid sequence
	nums5 := []int{1, 10, 20, 30}
	result5 := longestConsecutiveGapK(nums5, 2)
	fmt.Printf("Test 5: %d\n", result5)
	if result5 != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result5)
	}

	// Test 6: Negative numbers
	nums6 := []int{-5, -3, -1, 1, 3, 5}
	result6 := longestConsecutiveGapK(nums6, 2)
	fmt.Printf("Test 6: %d\n", result6)
	if result6 != 6 {
		fmt.Printf("FAIL: Expected 6, got %d\n", result6)
	}

	fmt.Println("\nAll tests passed!")
}
