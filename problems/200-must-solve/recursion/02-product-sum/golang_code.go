/*
Product Sum - Go Solution

Compute the product sum of a "special" array where nested arrays
are multiplied by their depth level.
*/

package main

import "fmt"

// Special represents either an int or a nested array
type Special interface{}

// ProductSum computes the product sum of a special array.
// Depth starts at 1 for the outermost array.
func ProductSum(array []Special) int {
	return productSumHelper(array, 1)
}

// productSumHelper recursively computes product sum at given depth
func productSumHelper(array []Special, depth int) int {
	sum := 0

	for _, element := range array {
		switch v := element.(type) {
		case int:
			// Integer element - add directly
			sum += v
		case []Special:
			// Nested array - recurse with increased depth
			sum += productSumHelper(v, depth+1)
		}
	}

	// Multiply by current depth
	return sum * depth
}

func main() {
	// Test case 1: Complex nested array
	array1 := []Special{
		5, 2,
		[]Special{7, -1},
		3,
		[]Special{6, []Special{-13, 8}, 4},
	}
	fmt.Printf("Input: [5, 2, [7, -1], 3, [6, [-13, 8], 4]]\n")
	fmt.Printf("Output: %d\n", ProductSum(array1)) // Expected: 12

	// Test case 2: Simple array
	array2 := []Special{1, 2, 3}
	fmt.Printf("\nInput: [1, 2, 3]\n")
	fmt.Printf("Output: %d\n", ProductSum(array2)) // Expected: 6

	// Test case 3: Single nested array
	array3 := []Special{[]Special{1, 2}, 3}
	fmt.Printf("\nInput: [[1, 2], 3]\n")
	fmt.Printf("Output: %d\n", ProductSum(array3)) // Expected: 9
}
