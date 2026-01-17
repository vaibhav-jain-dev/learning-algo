/*
Validate Subsequence - Go Solution

Given two arrays, determine if the second is a subsequence of the first.
A subsequence maintains relative order but doesn't need to be contiguous.

Time Complexity: O(n) where n is length of main array
Space Complexity: O(1)
*/

package main

import "fmt"

// ValidateSubsequence checks if sequence is a valid subsequence of array
func ValidateSubsequence(array []int, sequence []int) bool {
	seqIdx := 0

	for _, num := range array {
		if seqIdx == len(sequence) {
			break
		}
		if num == sequence[seqIdx] {
			seqIdx++
		}
	}

	return seqIdx == len(sequence)
}

// ValidateSubsequenceWhile is an alternative solution using while-style loop
func ValidateSubsequenceWhile(array []int, sequence []int) bool {
	arrIdx := 0
	seqIdx := 0

	for arrIdx < len(array) && seqIdx < len(sequence) {
		if array[arrIdx] == sequence[seqIdx] {
			seqIdx++
		}
		arrIdx++
	}

	return seqIdx == len(sequence)
}

func main() {
	// Test 1: Basic subsequence
	array1 := []int{5, 1, 22, 25, 6, -1, 8, 10}
	sequence1 := []int{1, 6, -1, 10}
	result1 := ValidateSubsequence(array1, sequence1)
	fmt.Printf("Test 1: %v\n", result1) // Expected: true

	// Test 2: Full array as subsequence
	array2 := []int{5, 1, 22, 25, 6, -1, 8, 10}
	sequence2 := []int{5, 1, 22, 25, 6, -1, 8, 10}
	result2 := ValidateSubsequence(array2, sequence2)
	fmt.Printf("Test 2: %v\n", result2) // Expected: true

	// Test 3: Partial subsequence
	array3 := []int{5, 1, 22, 25, 6, -1, 8, 10}
	sequence3 := []int{5, 1, 22, 6, -1, 8, 10}
	result3 := ValidateSubsequence(array3, sequence3)
	fmt.Printf("Test 3: %v\n", result3) // Expected: true

	// Test 4: Wrong order - not a subsequence
	array4 := []int{5, 1, 22, 25, 6, -1, 8, 10}
	sequence4 := []int{1, 6, 10, -1} // -1 comes before 10 in original
	result4 := ValidateSubsequence(array4, sequence4)
	fmt.Printf("Test 4: %v\n", result4) // Expected: false

	// Test 5: Single element
	array5 := []int{1, 2, 3}
	sequence5 := []int{2}
	result5 := ValidateSubsequence(array5, sequence5)
	fmt.Printf("Test 5: %v\n", result5) // Expected: true

	// Test 6: Not present
	array6 := []int{1, 2, 3}
	sequence6 := []int{4}
	result6 := ValidateSubsequence(array6, sequence6)
	fmt.Printf("Test 6: %v\n", result6) // Expected: false

	fmt.Println("\nAll tests completed!")
}
