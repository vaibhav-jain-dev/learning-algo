/*
Powerset - Go Solution

Generate all subsets (powerset) of an array of unique integers.
*/

package main

import "fmt"

// Powerset returns all subsets of the input array using iterative approach.
// For each element, we add it to all existing subsets to create new subsets.
func Powerset(array []int) [][]int {
	// Start with empty subset
	subsets := [][]int{{}}

	for _, element := range array {
		// For each existing subset, create a new subset with this element
		currentLen := len(subsets)
		for i := 0; i < currentLen; i++ {
			// Create new subset = existing subset + current element
			newSubset := make([]int, len(subsets[i]), len(subsets[i])+1)
			copy(newSubset, subsets[i])
			newSubset = append(newSubset, element)
			subsets = append(subsets, newSubset)
		}
	}

	return subsets
}

// PowersetRecursive generates powerset using include/exclude recursion.
// For each element, we branch into including it or excluding it.
func PowersetRecursive(array []int) [][]int {
	result := [][]int{}
	current := []int{}
	generate(array, 0, current, &result)
	return result
}

// generate recursively builds subsets
func generate(array []int, index int, current []int, result *[][]int) {
	if index == len(array) {
		// Make a copy of current subset and add to result
		subset := make([]int, len(current))
		copy(subset, current)
		*result = append(*result, subset)
		return
	}

	// Option 1: Include current element
	current = append(current, array[index])
	generate(array, index+1, current, result)

	// Option 2: Exclude current element (backtrack)
	current = current[:len(current)-1]
	generate(array, index+1, current, result)
}

// PowersetBitmask generates powerset using bitmask approach.
// Each number from 0 to 2^n-1 represents a subset.
func PowersetBitmask(array []int) [][]int {
	n := len(array)
	totalSubsets := 1 << n // 2^n
	result := make([][]int, 0, totalSubsets)

	for mask := 0; mask < totalSubsets; mask++ {
		subset := []int{}
		for i := 0; i < n; i++ {
			// Check if bit i is set
			if mask&(1<<i) != 0 {
				subset = append(subset, array[i])
			}
		}
		result = append(result, subset)
	}

	return result
}

func main() {
	// Test case 1
	array1 := []int{1, 2, 3}
	fmt.Printf("Input: %v\n", array1)
	fmt.Printf("Iterative: %v\n", Powerset(array1))
	fmt.Printf("Recursive: %v\n", PowersetRecursive(array1))
	fmt.Printf("Bitmask:   %v\n", PowersetBitmask(array1))

	// Test case 2
	array2 := []int{1, 2}
	fmt.Printf("\nInput: %v\n", array2)
	fmt.Printf("Output: %v\n", Powerset(array2))

	// Test case 3: Empty array
	array3 := []int{}
	fmt.Printf("\nInput: %v\n", array3)
	fmt.Printf("Output: %v\n", Powerset(array3))
}
