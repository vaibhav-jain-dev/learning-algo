/*
Array of Products - Go Solutions

Return array where each element is product of all other elements (without division).

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
	"reflect"
)

// ============================================================================
// APPROACH 1: Two Arrays (Left and Right Products)
// ============================================================================
// Time Complexity:  O(n) - three passes through array
// Space Complexity: O(n) - two extra arrays
//
// WHY THIS APPROACH:
// - Easy to understand
// - Clear separation of prefix and suffix products
// - Good for learning the concept
// ============================================================================

// ArrayOfProductsTwoArrays calculates product using left and right arrays.
//
// How it works:
//  1. left[i] = product of all elements before index i
//  2. right[i] = product of all elements after index i
//  3. result[i] = left[i] * right[i]
//
// Visual:
//
//	array = [5, 1, 4, 2]
//
//	left  = [1, 5, 5, 20]     (products from left)
//	right = [8, 8, 2, 1]     (products from right)
//	result = [8, 40, 10, 20] (left * right)
func ArrayOfProductsTwoArrays(array []int) []int {
	n := len(array)

	// Build left products: left[i] = product of array[0..i-1]
	left := make([]int, n)
	left[0] = 1
	for i := 1; i < n; i++ {
		left[i] = left[i-1] * array[i-1]
	}

	// Build right products: right[i] = product of array[i+1..n-1]
	right := make([]int, n)
	right[n-1] = 1
	for i := n - 2; i >= 0; i-- {
		right[i] = right[i+1] * array[i+1]
	}

	// Combine: result[i] = left[i] * right[i]
	result := make([]int, n)
	for i := 0; i < n; i++ {
		result[i] = left[i] * right[i]
	}

	return result
}

// ============================================================================
// APPROACH 2: Optimized Space (Single Array) - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - two passes through array
// Space Complexity: O(1) - only constant extra space
//
// WHY THIS IS BEST:
// - Optimal space complexity
// - Same time complexity as two-array approach
// - Shows optimization skill in interviews
// ============================================================================

// ArrayOfProducts calculates product of all other elements with O(1) extra space.
//
// How it works:
//  1. First pass (left to right): Fill result with left products
//  2. Second pass (right to left): Multiply by right products using running variable
//
// Visual:
//
//	array = [5, 1, 4, 2]
//
//	Pass 1 (left products in result):
//	result = [1, 5, 5, 20]
//
//	Pass 2 (multiply by right products):
//	i=3: result[3] = 20 * 1 = 20, rightProduct = 2
//	i=2: result[2] = 5 * 2 = 10, rightProduct = 8
//	i=1: result[1] = 5 * 8 = 40, rightProduct = 8
//	i=0: result[0] = 1 * 8 = 8
//
//	Final: [8, 40, 10, 20]
func ArrayOfProducts(array []int) []int {
	n := len(array)
	result := make([]int, n)

	// Pass 1: Fill result with left products
	leftProduct := 1
	for i := 0; i < n; i++ {
		result[i] = leftProduct
		leftProduct *= array[i]
	}

	// Pass 2: Multiply by right products
	rightProduct := 1
	for i := n - 1; i >= 0; i-- {
		result[i] *= rightProduct
		rightProduct *= array[i]
	}

	return result
}

// ============================================================================
// APPROACH 3: Brute Force
// ============================================================================
// Time Complexity:  O(n^2) - for each element, multiply n-1 others
// Space Complexity: O(1) - no extra space
//
// EDUCATIONAL VALUE:
// - Direct translation of problem statement
// - Shows why optimization is needed
// ============================================================================

// ArrayOfProductsBruteForce calculates product using brute force.
//
// How it works:
//
//	For each position i:
//	    Multiply all elements except array[i]
//
// Why it's slow:
//
//	n positions * (n-1) multiplications = O(n^2)
func ArrayOfProductsBruteForce(array []int) []int {
	n := len(array)
	result := make([]int, n)

	for i := 0; i < n; i++ {
		product := 1
		for j := 0; j < n; j++ {
			if i != j {
				product *= array[j]
			}
		}
		result[i] = product
	}

	return result
}

// ============================================================================
// TEST CASES AND COMPARISON
// ============================================================================

func main() {
	testCases := []struct {
		array    []int
		expected []int
		desc     string
	}{
		{[]int{5, 1, 4, 2}, []int{8, 40, 10, 20}, "Standard case"},
		{[]int{1, 2, 3, 4, 5}, []int{120, 60, 40, 30, 24}, "Sequential numbers"},
		{[]int{-5, 2, -4, 14, -6}, []int{672, -1680, 840, -240, 560}, "Negative numbers"},
		{[]int{1, 1, 1, 1}, []int{1, 1, 1, 1}, "All ones"},
		{[]int{0, 1, 2, 3}, []int{6, 0, 0, 0}, "Contains zero"},
		{[]int{0, 0, 1, 2}, []int{0, 0, 0, 0}, "Multiple zeros"},
		{[]int{2, 3}, []int{3, 2}, "Two elements"},
		{[]int{10, 0, 5}, []int{0, 50, 0}, "Zero in middle"},
	}

	approaches := []struct {
		name string
		fn   func([]int) []int
	}{
		{"Two Arrays", ArrayOfProductsTwoArrays},
		{"Optimized (Recommended)", ArrayOfProducts},
		{"Brute Force", ArrayOfProductsBruteForce},
	}

	fmt.Println("======================================================================")
	fmt.Println("ARRAY OF PRODUCTS - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Copy array to avoid modification
			arr := make([]int, len(tc.array))
			copy(arr, tc.array)

			result := approach.fn(arr)
			status := "PASS"
			if !reflect.DeepEqual(result, tc.expected) {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s\n", status, tc.desc)
			if status == "FAIL" {
				fmt.Printf("         Expected: %v\n", tc.expected)
				fmt.Printf("         Got:      %v\n", result)
			}
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    +---------------------+----------+----------+------------------+
    |      Approach       |   Time   |  Space   |  Recommendation  |
    +---------------------+----------+----------+------------------+
    | 1. Two Arrays       |   O(n)   |   O(n)   |  Good for learn  |
    | 2. Single Array     |   O(n)   |   O(1)   |  BEST CHOICE     |
    | 3. Brute Force      |  O(n^2)  |   O(1)   |  Not recommended |
    +---------------------+----------+----------+------------------+
    `)
}
