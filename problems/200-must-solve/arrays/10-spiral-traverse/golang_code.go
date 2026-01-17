/*
Spiral Traverse - Go Solution

Traverse a 2D matrix in spiral order and return elements as 1D array.

Time Complexity: O(n * m)
Space Complexity: O(n * m) for output
*/

package main

import "fmt"

// SpiralTraverse traverses matrix in spiral order
func SpiralTraverse(array [][]int) []int {
	if len(array) == 0 || len(array[0]) == 0 {
		return []int{}
	}

	result := []int{}
	startRow, endRow := 0, len(array)-1
	startCol, endCol := 0, len(array[0])-1

	for startRow <= endRow && startCol <= endCol {
		// Traverse right
		for col := startCol; col <= endCol; col++ {
			result = append(result, array[startRow][col])
		}

		// Traverse down
		for row := startRow + 1; row <= endRow; row++ {
			result = append(result, array[row][endCol])
		}

		// Traverse left (if there's still a row to traverse)
		if startRow < endRow {
			for col := endCol - 1; col >= startCol; col-- {
				result = append(result, array[endRow][col])
			}
		}

		// Traverse up (if there's still a column to traverse)
		if startCol < endCol {
			for row := endRow - 1; row > startRow; row-- {
				result = append(result, array[row][startCol])
			}
		}

		// Shrink boundaries
		startRow++
		endRow--
		startCol++
		endCol--
	}

	return result
}

// SpiralTraverseRecursive recursive approach
func SpiralTraverseRecursive(array [][]int) []int {
	result := []int{}
	spiralHelper(array, 0, len(array)-1, 0, len(array[0])-1, &result)
	return result
}

func spiralHelper(array [][]int, startRow, endRow, startCol, endCol int, result *[]int) {
	if startRow > endRow || startCol > endCol {
		return
	}

	// Traverse right
	for col := startCol; col <= endCol; col++ {
		*result = append(*result, array[startRow][col])
	}

	// Traverse down
	for row := startRow + 1; row <= endRow; row++ {
		*result = append(*result, array[row][endCol])
	}

	// Traverse left
	if startRow < endRow {
		for col := endCol - 1; col >= startCol; col-- {
			*result = append(*result, array[endRow][col])
		}
	}

	// Traverse up
	if startCol < endCol {
		for row := endRow - 1; row > startRow; row-- {
			*result = append(*result, array[row][startCol])
		}
	}

	spiralHelper(array, startRow+1, endRow-1, startCol+1, endCol-1, result)
}

func main() {
	// Test 1: 4x4 matrix
	matrix1 := [][]int{
		{1, 2, 3, 4},
		{12, 13, 14, 5},
		{11, 16, 15, 6},
		{10, 9, 8, 7},
	}
	result1 := SpiralTraverse(matrix1)
	fmt.Printf("Test 1: %v\n", result1)
	// Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

	// Test 2: 3x3 matrix
	matrix2 := [][]int{
		{1, 2, 3},
		{8, 9, 4},
		{7, 6, 5},
	}
	result2 := SpiralTraverse(matrix2)
	fmt.Printf("Test 2: %v\n", result2)
	// Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]

	// Test 3: Single row
	matrix3 := [][]int{{1, 2, 3, 4, 5}}
	result3 := SpiralTraverse(matrix3)
	fmt.Printf("Test 3: %v\n", result3)
	// Expected: [1, 2, 3, 4, 5]

	// Test 4: Single column
	matrix4 := [][]int{{1}, {2}, {3}, {4}}
	result4 := SpiralTraverse(matrix4)
	fmt.Printf("Test 4: %v\n", result4)
	// Expected: [1, 2, 3, 4]

	// Test 5: 2x3 rectangle
	matrix5 := [][]int{
		{1, 2, 3},
		{6, 5, 4},
	}
	result5 := SpiralTraverse(matrix5)
	fmt.Printf("Test 5: %v\n", result5)
	// Expected: [1, 2, 3, 4, 5, 6]

	// Test 6: 3x2 rectangle
	matrix6 := [][]int{
		{1, 2},
		{6, 3},
		{5, 4},
	}
	result6 := SpiralTraverse(matrix6)
	fmt.Printf("Test 6: %v\n", result6)
	// Expected: [1, 2, 3, 4, 5, 6]

	// Test 7: Single element
	matrix7 := [][]int{{42}}
	result7 := SpiralTraverse(matrix7)
	fmt.Printf("Test 7: %v\n", result7)
	// Expected: [42]

	// Test 8: Compare iterative and recursive
	matrix8 := [][]int{
		{1, 2, 3, 4},
		{10, 11, 12, 5},
		{9, 8, 7, 6},
	}
	result8a := SpiralTraverse(matrix8)
	result8b := SpiralTraverseRecursive(matrix8)
	fmt.Printf("\nTest 8 - Comparison:\n")
	fmt.Printf("  Iterative: %v\n", result8a)
	fmt.Printf("  Recursive: %v\n", result8b)

	fmt.Println("\nAll tests completed!")
}
