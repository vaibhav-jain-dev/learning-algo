/*
Four Number Sum - Go Solution

Find all quadruplets that sum to a target value.
Uses hash table to store pair sums.

Time Complexity: O(n²) average, O(n³) worst case
Space Complexity: O(n²)
*/

package main

import (
	"fmt"
	"sort"
)

// FourNumberSum finds all quadruplets summing to targetSum
func FourNumberSum(array []int, targetSum int) [][]int {
	pairSums := make(map[int][][]int) // sum -> list of [num1, num2] pairs
	quadruplets := [][]int{}

	for i := 1; i < len(array)-1; i++ {
		// First: look for complementary pairs in hash table
		for j := i + 1; j < len(array); j++ {
			currentSum := array[i] + array[j]
			difference := targetSum - currentSum

			if pairs, exists := pairSums[difference]; exists {
				for _, pair := range pairs {
					quadruplet := []int{pair[0], pair[1], array[i], array[j]}
					quadruplets = append(quadruplets, quadruplet)
				}
			}
		}

		// Then: add all pairs ending at i to hash table
		for k := 0; k < i; k++ {
			currentSum := array[k] + array[i]
			pairSums[currentSum] = append(pairSums[currentSum], []int{array[k], array[i]})
		}
	}

	return quadruplets
}

// FourNumberSumTwoPointer two-pointer approach with sorted array
func FourNumberSumTwoPointer(array []int, targetSum int) [][]int {
	sort.Ints(array)
	quadruplets := [][]int{}
	n := len(array)

	for i := 0; i < n-3; i++ {
		for j := i + 1; j < n-2; j++ {
			left := j + 1
			right := n - 1

			for left < right {
				currentSum := array[i] + array[j] + array[left] + array[right]

				if currentSum == targetSum {
					quadruplets = append(quadruplets, []int{array[i], array[j], array[left], array[right]})
					left++
					right--
				} else if currentSum < targetSum {
					left++
				} else {
					right--
				}
			}
		}
	}

	return quadruplets
}

// FourNumberSumBrute brute force O(n⁴) solution for verification
func FourNumberSumBrute(array []int, targetSum int) [][]int {
	n := len(array)
	quadruplets := [][]int{}

	for i := 0; i < n-3; i++ {
		for j := i + 1; j < n-2; j++ {
			for k := j + 1; k < n-1; k++ {
				for l := k + 1; l < n; l++ {
					if array[i]+array[j]+array[k]+array[l] == targetSum {
						quadruplets = append(quadruplets, []int{array[i], array[j], array[k], array[l]})
					}
				}
			}
		}
	}

	return quadruplets
}

func main() {
	// Test 1: Multiple quadruplets
	arr1 := []int{7, 6, 4, -1, 1, 2}
	target1 := 16
	result1 := FourNumberSum(arr1, target1)
	fmt.Printf("Test 1: %v\n", result1)
	// Expected: [[7, 6, 4, -1], [7, 6, 1, 2]]

	// Test 2: Single quadruplet
	arr2 := []int{1, 2, 3, 4, 5, 6, 7}
	target2 := 10
	result2 := FourNumberSum(arr2, target2)
	fmt.Printf("Test 2: %v\n", result2)
	// Expected: [[1, 2, 3, 4]]

	// Test 3: No quadruplets
	arr3 := []int{1, 2, 3, 4}
	target3 := 100
	result3 := FourNumberSum(arr3, target3)
	fmt.Printf("Test 3: %v\n", result3)
	// Expected: []

	// Test 4: With negative numbers
	arr4 := []int{-2, -1, 1, 2, 3, 4, 5, 6}
	target4 := 10
	result4 := FourNumberSum(arr4, target4)
	fmt.Printf("Test 4: %v\n", result4)

	// Test 5: Compare methods
	arr5 := []int{1, 2, 3, 4, 5, -5, 6, -6}
	target5 := 5
	result5a := FourNumberSum(arr5, target5)
	arr5Sorted := make([]int, len(arr5))
	copy(arr5Sorted, arr5)
	result5b := FourNumberSumTwoPointer(arr5Sorted, target5)
	fmt.Printf("\nTest 5 - Comparison:\n")
	fmt.Printf("  Hash table: %v\n", result5a)
	fmt.Printf("  Two pointer: %v\n", result5b)

	// Test 6: Larger test
	arr6 := []int{5, 3, -2, 10, 7, 1, 4, -5, 8}
	target6 := 12
	result6 := FourNumberSum(arr6, target6)
	fmt.Printf("\nTest 6: Found %d quadruplets\n", len(result6))
	for _, q := range result6 {
		sum := q[0] + q[1] + q[2] + q[3]
		fmt.Printf("  %v = %d\n", q, sum)
	}

	fmt.Println("\nAll tests completed!")
}
