/*
Same BSTs - Go Solution

Determine if two arrays produce the same BST without building the trees.

Time Complexity: O(n^2)
Space Complexity: O(n^2) for subarray approach, O(d) for index approach
*/

package main

import (
	"fmt"
	"math"
)

// SameBSTs checks if two arrays produce the same BST without building trees
func SameBSTs(arrayOne, arrayTwo []int) bool {
	// Base case: both empty means same BST
	if len(arrayOne) == 0 && len(arrayTwo) == 0 {
		return true
	}

	// Arrays must have same length
	if len(arrayOne) != len(arrayTwo) {
		return false
	}

	// Root values must match (first element becomes root)
	if arrayOne[0] != arrayTwo[0] {
		return false
	}

	// Partition arrays into left (smaller) and right (greater or equal) subtrees
	root := arrayOne[0]

	leftOne := getSmaller(arrayOne[1:], root)
	rightOne := getGreaterOrEqual(arrayOne[1:], root)

	leftTwo := getSmaller(arrayTwo[1:], root)
	rightTwo := getGreaterOrEqual(arrayTwo[1:], root)

	// Recursively check both subtrees
	return SameBSTs(leftOne, leftTwo) && SameBSTs(rightOne, rightTwo)
}

func getSmaller(arr []int, val int) []int {
	result := []int{}
	for _, x := range arr {
		if x < val {
			result = append(result, x)
		}
	}
	return result
}

func getGreaterOrEqual(arr []int, val int) []int {
	result := []int{}
	for _, x := range arr {
		if x >= val {
			result = append(result, x)
		}
	}
	return result
}

// SameBSTsOptimized uses indices instead of creating new arrays
// Space Complexity: O(d) where d is depth of BST
func SameBSTsOptimized(arrayOne, arrayTwo []int) bool {
	return areSameBSTs(
		arrayOne, arrayTwo,
		0, 0,
		math.MinInt64, math.MaxInt64,
	)
}

// areSameBSTs helper function using indices and bounds
func areSameBSTs(arr1, arr2 []int, rootIdx1, rootIdx2 int, minVal, maxVal int) bool {
	// Find first valid index in each array (value within bounds)
	idx1 := getFirstValidIdx(arr1, rootIdx1, minVal, maxVal)
	idx2 := getFirstValidIdx(arr2, rootIdx2, minVal, maxVal)

	// Both found nothing - same empty subtree
	if idx1 == -1 && idx2 == -1 {
		return true
	}

	// Only one found something - different structure
	if idx1 == -1 || idx2 == -1 {
		return false
	}

	// Root values must match
	if arr1[idx1] != arr2[idx2] {
		return false
	}

	rootVal := arr1[idx1]

	// Recursively check left subtree (values < root)
	leftSame := areSameBSTs(
		arr1, arr2,
		idx1+1, idx2+1,
		minVal, rootVal,
	)

	// Recursively check right subtree (values >= root)
	rightSame := areSameBSTs(
		arr1, arr2,
		idx1+1, idx2+1,
		rootVal, maxVal,
	)

	return leftSame && rightSame
}

func getFirstValidIdx(arr []int, startIdx, minVal, maxVal int) int {
	for i := startIdx; i < len(arr); i++ {
		if arr[i] >= minVal && arr[i] < maxVal {
			return i
		}
	}
	return -1
}

// BST struct for verification purposes
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// BuildBSTFromArray builds BST by inserting elements in order
func BuildBSTFromArray(arr []int) *BST {
	if len(arr) == 0 {
		return nil
	}

	root := &BST{Value: arr[0]}
	for _, val := range arr[1:] {
		insertIntoBST(root, val)
	}
	return root
}

func insertIntoBST(node *BST, value int) {
	if value < node.Value {
		if node.Left == nil {
			node.Left = &BST{Value: value}
		} else {
			insertIntoBST(node.Left, value)
		}
	} else {
		if node.Right == nil {
			node.Right = &BST{Value: value}
		} else {
			insertIntoBST(node.Right, value)
		}
	}
}

// PreorderTraversal gets preorder traversal for comparison
func PreorderTraversal(node *BST) []int {
	if node == nil {
		return []int{}
	}
	result := []int{node.Value}
	result = append(result, PreorderTraversal(node.Left)...)
	result = append(result, PreorderTraversal(node.Right)...)
	return result
}

func slicesEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func main() {
	// Test 1: Same BST
	array1a := []int{10, 15, 8, 12, 94, 81, 5, 2, 11}
	array1b := []int{10, 8, 5, 15, 2, 12, 11, 94, 81}
	result1 := SameBSTs(array1a, array1b)
	fmt.Printf("Test 1: %v\n", result1) // Expected: true

	// Verify by building actual BSTs
	bst1a := BuildBSTFromArray(array1a)
	bst1b := BuildBSTFromArray(array1b)
	fmt.Printf("  Verification: %v\n", slicesEqual(PreorderTraversal(bst1a), PreorderTraversal(bst1b)))

	// Test 2: Different BST
	array2a := []int{10, 15, 8, 12, 94, 81, 5, 2, 11}
	array2b := []int{10, 8, 5, 15, 2, 12, 94, 81, 11}
	result2 := SameBSTs(array2a, array2b)
	fmt.Printf("Test 2: %v\n", result2) // Expected: false

	// Test 3: Single element
	array3a := []int{1}
	array3b := []int{1}
	result3 := SameBSTs(array3a, array3b)
	fmt.Printf("Test 3 (single element): %v\n", result3) // Expected: true

	// Test 4: Two elements, same order
	array4a := []int{5, 3}
	array4b := []int{5, 3}
	result4 := SameBSTs(array4a, array4b)
	fmt.Printf("Test 4: %v\n", result4) // Expected: true

	// Test 5: Two elements, different sides
	array5a := []int{5, 3}
	array5b := []int{5, 7}
	result5 := SameBSTs(array5a, array5b)
	fmt.Printf("Test 5: %v\n", result5) // Expected: false

	// Test 6: Same elements, different structure
	array6a := []int{5, 3, 7}
	array6b := []int{5, 7, 3}
	result6 := SameBSTs(array6a, array6b)
	fmt.Printf("Test 6: %v\n", result6) // Expected: true (both children exist)

	// Test 7: Larger example
	array7a := []int{50, 76, 81, 23, 35, 29, 89, 38, 12}
	array7b := []int{50, 23, 76, 12, 35, 81, 29, 89, 38}
	result7 := SameBSTs(array7a, array7b)
	fmt.Printf("Test 7: %v\n", result7) // Expected: true

	// Verify with actual BST construction
	bst7a := BuildBSTFromArray(array7a)
	bst7b := BuildBSTFromArray(array7b)
	fmt.Printf("  Verification: %v\n", slicesEqual(PreorderTraversal(bst7a), PreorderTraversal(bst7b)))

	// Test 8: Compare methods
	fmt.Println("\n--- Method Comparison ---")
	testArrays := [][]int{
		{10, 15, 8, 12, 94, 81, 5, 2, 11},
		{10, 8, 5, 15, 2, 12, 11, 94, 81},
	}
	basic := SameBSTs(testArrays[0], testArrays[1])
	optimized := SameBSTsOptimized(testArrays[0], testArrays[1])
	fmt.Printf("Same arrays: basic=%v, optimized=%v, match=%v\n", basic, optimized, basic == optimized)

	testArrays2 := [][]int{
		{10, 15, 8, 12, 94, 81, 5, 2, 11},
		{10, 8, 5, 15, 2, 12, 94, 81, 11},
	}
	basic2 := SameBSTs(testArrays2[0], testArrays2[1])
	optimized2 := SameBSTsOptimized(testArrays2[0], testArrays2[1])
	fmt.Printf("Different arrays: basic=%v, optimized=%v, match=%v\n", basic2, optimized2, basic2 == optimized2)

	fmt.Println("\nAll tests completed!")
}
