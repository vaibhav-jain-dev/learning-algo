/*
Three Sum with Duplicates - Go Solution

Find all unique triplets that sum to target in an array with duplicates.

Time Complexity: O(n^2)
Space Complexity: O(1) excluding output
*/

package main

import (
	"fmt"
	"sort"
)

// ThreeSumDuplicatesBrute uses brute force with map for deduplication
// Time: O(n^3), Space: O(k)
func ThreeSumDuplicatesBrute(array []int, target int) [][]int {
	n := len(array)
	seen := make(map[[3]int]bool)
	var result [][]int

	for i := 0; i < n-2; i++ {
		for j := i + 1; j < n-1; j++ {
			for k := j + 1; k < n; k++ {
				if array[i]+array[j]+array[k] == target {
					triplet := []int{array[i], array[j], array[k]}
					sort.Ints(triplet)
					key := [3]int{triplet[0], triplet[1], triplet[2]}
					if !seen[key] {
						seen[key] = true
						result = append(result, triplet)
					}
				}
			}
		}
	}

	return result
}

// ThreeSumDuplicates finds all unique triplets summing to target
// RECOMMENDED: Sort + Two Pointers with Skip Duplicates
// Time: O(n^2), Space: O(1) excluding output
func ThreeSumDuplicates(array []int, target int) [][]int {
	sort.Ints(array)
	n := len(array)
	var triplets [][]int

	for i := 0; i < n-2; i++ {
		// Skip duplicate first elements
		if i > 0 && array[i] == array[i-1] {
			continue
		}

		left, right := i+1, n-1

		for left < right {
			currentSum := array[i] + array[left] + array[right]

			if currentSum == target {
				triplets = append(triplets, []int{array[i], array[left], array[right]})

				// Move pointers
				left++
				right--

				// Skip duplicate second elements
				for left < right && array[left] == array[left-1] {
					left++
				}

				// Skip duplicate third elements
				for left < right && array[right] == array[right+1] {
					right--
				}

			} else if currentSum < target {
				left++
			} else {
				right--
			}
		}
	}

	return triplets
}

// ThreeSumDuplicatesHash uses hash set approach
// Time: O(n^2), Space: O(n)
func ThreeSumDuplicatesHash(array []int, target int) [][]int {
	sort.Ints(array)
	n := len(array)
	resultSet := make(map[[3]int]bool)

	for i := 0; i < n-2; i++ {
		// Skip duplicate first elements
		if i > 0 && array[i] == array[i-1] {
			continue
		}

		seen := make(map[int]bool)
		complement := target - array[i]

		for j := i + 1; j < n; j++ {
			needed := complement - array[j]
			if seen[needed] {
				key := [3]int{array[i], needed, array[j]}
				resultSet[key] = true
			}
			seen[array[j]] = true
		}
	}

	var result [][]int
	for key := range resultSet {
		result = append(result, []int{key[0], key[1], key[2]})
	}
	return result
}

// ThreeSumDuplicatesComprehensive with optimizations and detailed skip logic
func ThreeSumDuplicatesComprehensive(array []int, target int) [][]int {
	if len(array) < 3 {
		return [][]int{}
	}

	sort.Ints(array)
	n := len(array)
	var result [][]int

	for i := 0; i < n-2; i++ {
		// Optimization: if smallest possible sum > target, no solution
		if array[i]+array[i+1]+array[i+2] > target {
			break
		}

		// Optimization: if largest possible sum with current i < target, skip
		if array[i]+array[n-2]+array[n-1] < target {
			continue
		}

		// Skip duplicate first elements
		if i > 0 && array[i] == array[i-1] {
			continue
		}

		left, right := i+1, n-1

		for left < right {
			total := array[i] + array[left] + array[right]

			if total == target {
				result = append(result, []int{array[i], array[left], array[right]})

				// Skip all duplicates from left
				valLeft := array[left]
				for left < right && array[left] == valLeft {
					left++
				}

				// Skip all duplicates from right
				valRight := array[right]
				for left < right && array[right] == valRight {
					right--
				}

			} else if total < target {
				left++
			} else {
				right--
			}
		}
	}

	return result
}

// ThreeSumZero is the classic LeetCode 3Sum variant (target = 0)
func ThreeSumZero(array []int) [][]int {
	return ThreeSumDuplicates(array, 0)
}

func main() {
	// Test 1: Basic case with duplicates
	array1 := []int{1, 1, 1, 2, 2, 3}
	target1 := 6
	result1 := ThreeSumDuplicates(array1, target1)
	fmt.Printf("Test 1: array=%v, target=%d\n", array1, target1)
	fmt.Printf("  Result: %v\n", result1)
	fmt.Printf("  Expected: [[1, 2, 3]]\n")

	// Test 2: Classic 3Sum example
	array2 := []int{-1, 0, 1, 2, -1, -4}
	target2 := 0
	result2 := ThreeSumDuplicates(array2, target2)
	fmt.Printf("\nTest 2: array=%v, target=%d\n", array2, target2)
	fmt.Printf("  Result: %v\n", result2)
	fmt.Printf("  Expected: [[-1, -1, 2], [-1, 0, 1]]\n")

	// Test 3: All zeros
	array3 := []int{0, 0, 0, 0}
	target3 := 0
	result3 := ThreeSumDuplicates(array3, target3)
	fmt.Printf("\nTest 3: array=%v, target=%d\n", array3, target3)
	fmt.Printf("  Result: %v\n", result3)
	fmt.Printf("  Expected: [[0, 0, 0]]\n")

	// Test 4: No valid triplets
	array4 := []int{1, 2, -2, -1}
	target4 := 0
	result4 := ThreeSumDuplicates(array4, target4)
	fmt.Printf("\nTest 4: array=%v, target=%d\n", array4, target4)
	fmt.Printf("  Result: %v\n", result4)
	fmt.Printf("  Expected: []\n")

	// Test 5: Multiple duplicates
	array5 := []int{-2, 0, 0, 2, 2}
	target5 := 0
	result5 := ThreeSumDuplicates(array5, target5)
	fmt.Printf("\nTest 5: array=%v, target=%d\n", array5, target5)
	fmt.Printf("  Result: %v\n", result5)
	fmt.Printf("  Expected: [[-2, 0, 2]]\n")

	// Test 6: Larger array with many duplicates
	array6 := []int{-4, -1, -1, 0, 1, 2, 2, 2}
	target6 := 1
	result6 := ThreeSumDuplicates(array6, target6)
	fmt.Printf("\nTest 6: array=%v, target=%d\n", array6, target6)
	fmt.Printf("  Result: %v\n", result6)
	fmt.Printf("  Expected: [[-1, 0, 2]]\n")

	// Test 7: Compare approaches
	array7 := []int{-2, -1, -1, 0, 1, 1, 2, 2}
	target7 := 0
	result7Brute := ThreeSumDuplicatesBrute(array7, target7)
	result7TwoPtr := ThreeSumDuplicates(array7, target7)
	result7Hash := ThreeSumDuplicatesHash(array7, target7)
	result7Comp := ThreeSumDuplicatesComprehensive(array7, target7)
	fmt.Printf("\nTest 7 (compare approaches): array=%v, target=%d\n", array7, target7)
	fmt.Printf("  Brute force:   %v\n", result7Brute)
	fmt.Printf("  Two-pointer:   %v\n", result7TwoPtr)
	fmt.Printf("  Hash method:   %v\n", result7Hash)
	fmt.Printf("  Comprehensive: %v\n", result7Comp)

	// Test 8: Edge cases
	fmt.Printf("\nTest 8: Edge cases\n")
	fmt.Printf("  Empty array: %v\n", ThreeSumDuplicates([]int{}, 0))
	fmt.Printf("  Single element: %v\n", ThreeSumDuplicates([]int{1}, 1))
	fmt.Printf("  Two elements: %v\n", ThreeSumDuplicates([]int{1, 2}, 3))
	fmt.Printf("  Three elements match: %v\n", ThreeSumDuplicates([]int{1, 2, 3}, 6))
	fmt.Printf("  Three elements no match: %v\n", ThreeSumDuplicates([]int{1, 2, 3}, 10))

	// Test 9: All same elements
	array9 := []int{3, 3, 3, 3, 3}
	target9 := 9
	result9 := ThreeSumDuplicates(array9, target9)
	fmt.Printf("\nTest 9: array=%v, target=%d\n", array9, target9)
	fmt.Printf("  Result: %v\n", result9)
	fmt.Printf("  Expected: [[3, 3, 3]]\n")

	// Test 10: Using ThreeSumZero convenience function
	array10 := []int{-1, 0, 1, 2, -1, -4}
	result10 := ThreeSumZero(array10)
	fmt.Printf("\nTest 10 (ThreeSumZero): array=%v\n", array10)
	fmt.Printf("  Result: %v\n", result10)

	fmt.Println("\nAll tests completed!")
}
