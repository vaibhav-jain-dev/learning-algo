/*
Four Number Sum - Go Solutions

Find all unique quadruplets that sum to a target value.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Two Pointers with Two Loops ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n³)
// Space Complexity: O(n) for result
// ============================================================================

// FourNumberSum finds all quadruplets summing to target.
func FourNumberSum(array []int, targetSum int) [][]int {
	sort.Ints(array)
	result := [][]int{}
	n := len(array)

	for i := 0; i < n-3; i++ {
		// Skip duplicates for first number
		if i > 0 && array[i] == array[i-1] {
			continue
		}

		for j := i + 1; j < n-2; j++ {
			// Skip duplicates for second number
			if j > i+1 && array[j] == array[j-1] {
				continue
			}

			left, right := j+1, n-1
			target := targetSum - array[i] - array[j]

			for left < right {
				sum := array[left] + array[right]

				if sum == target {
					result = append(result, []int{array[i], array[j], array[left], array[right]})

					// Skip duplicates
					for left < right && array[left] == array[left+1] {
						left++
					}
					for left < right && array[right] == array[right-1] {
						right--
					}
					left++
					right--
				} else if sum < target {
					left++
				} else {
					right--
				}
			}
		}
	}

	return result
}

// ============================================================================
// APPROACH 2: HashMap for Pairs
// ============================================================================
// Time Complexity:  O(n²) average
// Space Complexity: O(n²) for pair sums
// ============================================================================

// FourNumberSumHash uses hashmap to store pair sums.
func FourNumberSumHash(array []int, targetSum int) [][]int {
	pairSums := make(map[int][][]int)
	result := [][]int{}
	seen := make(map[[4]int]bool)

	for i := 1; i < len(array); i++ {
		// Check for complements from previous pairs
		for j := i + 1; j < len(array); j++ {
			currentSum := array[i] + array[j]
			complement := targetSum - currentSum

			if pairs, ok := pairSums[complement]; ok {
				for _, pair := range pairs {
					quad := []int{pair[0], pair[1], array[i], array[j]}
					sort.Ints(quad)
					key := [4]int{quad[0], quad[1], quad[2], quad[3]}
					if !seen[key] {
						result = append(result, quad)
						seen[key] = true
					}
				}
			}
		}

		// Add pairs ending at i
		for k := 0; k < i; k++ {
			sum := array[k] + array[i]
			pairSums[sum] = append(pairSums[sum], []int{array[k], array[i]})
		}
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("FOUR NUMBER SUM - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		array  []int
		target int
		desc   string
	}{
		{[]int{7, 6, 4, -1, 1, 2}, 16, "Standard case"},
		{[]int{1, 2, 3, 4, 5, 6, 7}, 10, "Consecutive"},
		{[]int{1, 0, -1, 0, -2, 2}, 0, "With zeros"},
		{[]int{2, 2, 2, 2, 2}, 8, "All same"},
	}

	for _, tc := range testCases {
		result := FourNumberSum(tc.array, tc.target)
		fmt.Printf("\n%s:\n", tc.desc)
		fmt.Printf("  Input: array=%v, target=%d\n", tc.array, tc.target)
		fmt.Printf("  Output: %v\n", result)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	array := []int{7, 6, 4, -1, 1, 2}
	target := 16
	fmt.Printf("\nInput: array = %v, target = %d\n", array, target)
	fmt.Printf("Output: %v\n", FourNumberSum(array, target))
}
