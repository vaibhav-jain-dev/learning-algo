/*
Three Sum Closest - Go Solution

Find three numbers whose sum is closest to the target.

Time Complexity: O(n^2)
Space Complexity: O(1) excluding sorting
*/

package main

import (
	"fmt"
	"math"
	"sort"
)

// ThreeSumClosestBrute checks all possible triplets - O(n^3)
func ThreeSumClosestBrute(array []int, target int) int {
	n := len(array)
	closestSum := array[0] + array[1] + array[2]

	for i := 0; i < n-2; i++ {
		for j := i + 1; j < n-1; j++ {
			for k := j + 1; k < n; k++ {
				currentSum := array[i] + array[j] + array[k]
				if abs(currentSum-target) < abs(closestSum-target) {
					closestSum = currentSum
				}
			}
		}
	}

	return closestSum
}

// ThreeSumClosest finds three numbers whose sum is closest to target
// RECOMMENDED: Sort + Two Pointers approach
// Time: O(n^2), Space: O(1)
func ThreeSumClosest(array []int, target int) int {
	// Sort to enable two-pointer technique
	sort.Ints(array)
	n := len(array)
	closestSum := array[0] + array[1] + array[2]

	for i := 0; i < n-2; i++ {
		left, right := i+1, n-1

		for left < right {
			currentSum := array[i] + array[left] + array[right]

			// Update closest if this sum is better
			if abs(currentSum-target) < abs(closestSum-target) {
				closestSum = currentSum
			}

			// Early termination: exact match found
			if currentSum == target {
				return currentSum
			}

			// Move pointers based on comparison
			if currentSum < target {
				left++ // Need larger sum
			} else {
				right-- // Need smaller sum
			}
		}
	}

	return closestSum
}

// ThreeSumClosestOptimized includes duplicate skipping optimization
func ThreeSumClosestOptimized(array []int, target int) int {
	sort.Ints(array)
	n := len(array)
	closestSum := array[0] + array[1] + array[2]

	for i := 0; i < n-2; i++ {
		// Skip duplicates for outer loop (optional optimization)
		if i > 0 && array[i] == array[i-1] {
			continue
		}

		left, right := i+1, n-1

		for left < right {
			currentSum := array[i] + array[left] + array[right]

			// Exact match - can't get closer
			if currentSum == target {
				return target
			}

			// Update closest
			if abs(currentSum-target) < abs(closestSum-target) {
				closestSum = currentSum
			}

			if currentSum < target {
				left++
			} else {
				right--
			}
		}
	}

	return closestSum
}

// ThreeSumClosestWithDetails returns both the sum and the triplet
func ThreeSumClosestWithDetails(array []int, target int) (int, []int) {
	sorted := make([]int, len(array))
	copy(sorted, array)
	sort.Ints(sorted)

	n := len(sorted)
	closestSum := sorted[0] + sorted[1] + sorted[2]
	closestTriplet := []int{sorted[0], sorted[1], sorted[2]}

	for i := 0; i < n-2; i++ {
		left, right := i+1, n-1

		for left < right {
			currentSum := sorted[i] + sorted[left] + sorted[right]

			if abs(currentSum-target) < abs(closestSum-target) {
				closestSum = currentSum
				closestTriplet = []int{sorted[i], sorted[left], sorted[right]}
			}

			if currentSum == target {
				return currentSum, closestTriplet
			} else if currentSum < target {
				left++
			} else {
				right--
			}
		}
	}

	return closestSum, closestTriplet
}

// Helper function for absolute value
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	// Test 1: Basic case
	array1 := []int{-1, 2, 1, -4}
	target1 := 1
	result1 := ThreeSumClosest(array1, target1)
	fmt.Printf("Test 1: array=%v, target=%d\n", array1, target1)
	fmt.Printf("  Result: %d\n", result1)
	fmt.Printf("  Expected: 2 (sum of -1 + 2 + 1)\n")

	// Test 2: All zeros
	array2 := []int{0, 0, 0}
	target2 := 1
	result2 := ThreeSumClosest(array2, target2)
	fmt.Printf("\nTest 2: array=%v, target=%d\n", array2, target2)
	fmt.Printf("  Result: %d\n", result2)
	fmt.Printf("  Expected: 0\n")

	// Test 3: Exact match exists
	array3 := []int{1, 2, 3, 4, 5}
	target3 := 9
	result3 := ThreeSumClosest(array3, target3)
	fmt.Printf("\nTest 3: array=%v, target=%d\n", array3, target3)
	fmt.Printf("  Result: %d\n", result3)
	fmt.Printf("  Expected: 9\n")

	// Test 4: Negative target
	array4 := []int{1, 1, 1, 0}
	target4 := -100
	result4 := ThreeSumClosest(array4, target4)
	fmt.Printf("\nTest 4: array=%v, target=%d\n", array4, target4)
	fmt.Printf("  Result: %d\n", result4)
	fmt.Printf("  Expected: 2 (closest possible)\n")

	// Test 5: Mixed positive and negative
	array5 := []int{4, 0, 5, -5, 3, 3, 0, -4, -5}
	target5 := -2
	result5 := ThreeSumClosest(array5, target5)
	fmt.Printf("\nTest 5: array=%v, target=%d\n", array5, target5)
	fmt.Printf("  Result: %d\n", result5)
	fmt.Printf("  Expected: -2 (exact match)\n")

	// Test 6: With details
	array6 := []int{-1, 2, 1, -4}
	target6 := 1
	sum6, triplet6 := ThreeSumClosestWithDetails(array6, target6)
	fmt.Printf("\nTest 6 (with details): array=%v, target=%d\n", array6, target6)
	fmt.Printf("  Closest sum: %d, Triplet: %v\n", sum6, triplet6)

	// Test 7: Compare all approaches
	array7 := []int{1, 2, 4, 8, 16, 32, 64, 128}
	target7 := 82
	result7Brute := ThreeSumClosestBrute(array7, target7)
	result7TwoPtr := ThreeSumClosest(array7, target7)
	result7Opt := ThreeSumClosestOptimized(array7, target7)
	fmt.Printf("\nTest 7 (compare approaches): array=%v, target=%d\n", array7, target7)
	fmt.Printf("  Brute force: %d\n", result7Brute)
	fmt.Printf("  Two-pointer: %d\n", result7TwoPtr)
	fmt.Printf("  Optimized:   %d\n", result7Opt)

	// Test 8: Large difference
	array8 := []int{-1, 0, 1, 1, 55}
	target8 := 3
	result8 := ThreeSumClosest(array8, target8)
	fmt.Printf("\nTest 8: array=%v, target=%d\n", array8, target8)
	fmt.Printf("  Result: %d\n", result8)

	fmt.Println("\nAll tests completed!")

	// Verify with math package (just for demonstration)
	_ = math.Abs(1.0)
}
