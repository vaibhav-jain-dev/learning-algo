/*
Permutations - Go Solution

Generate all permutations of an array of unique integers.
*/

package main

import "fmt"

// Permutations returns all permutations of the input array.
// Uses backtracking with a swap-based approach.
func Permutations(array []int) [][]int {
	if len(array) == 0 {
		return [][]int{}
	}

	result := [][]int{}
	backtrack(array, 0, &result)
	return result
}

// backtrack generates permutations by swapping elements
func backtrack(array []int, start int, result *[][]int) {
	if start == len(array) {
		// Make a copy of current permutation
		perm := make([]int, len(array))
		copy(perm, array)
		*result = append(*result, perm)
		return
	}

	for i := start; i < len(array); i++ {
		// Swap current with each element from start to end
		array[start], array[i] = array[i], array[start]

		// Recurse with next position
		backtrack(array, start+1, result)

		// Backtrack: swap back
		array[start], array[i] = array[i], array[start]
	}
}

// PermutationsWithUsed uses a boolean array to track used elements
func PermutationsWithUsed(array []int) [][]int {
	if len(array) == 0 {
		return [][]int{}
	}

	result := [][]int{}
	used := make([]bool, len(array))
	current := []int{}

	var generate func()
	generate = func() {
		if len(current) == len(array) {
			perm := make([]int, len(current))
			copy(perm, current)
			result = append(result, perm)
			return
		}

		for i := 0; i < len(array); i++ {
			if used[i] {
				continue
			}

			used[i] = true
			current = append(current, array[i])

			generate()

			current = current[:len(current)-1]
			used[i] = false
		}
	}

	generate()
	return result
}

func main() {
	// Test case 1
	array1 := []int{1, 2, 3}
	fmt.Printf("Input: %v\n", array1)
	fmt.Printf("Output: %v\n", Permutations(array1))

	// Test case 2
	array2 := []int{1}
	fmt.Printf("\nInput: %v\n", array2)
	fmt.Printf("Output: %v\n", Permutations(array2))

	// Test case 3
	array3 := []int{}
	fmt.Printf("\nInput: %v\n", array3)
	fmt.Printf("Output: %v\n", Permutations(array3))
}
