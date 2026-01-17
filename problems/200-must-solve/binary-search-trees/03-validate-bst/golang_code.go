/*
Validate BST - Go Solution

Check if a binary tree is a valid Binary Search Tree.

Time Complexity: O(n)
Space Complexity: O(d) where d is tree depth
*/

package main

import (
	"fmt"
	"math"
)

// BST represents a node in Binary Search Tree
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// ValidateBST validates if tree is a valid BST
func ValidateBST(tree *BST) bool {
	return validateBSTHelper(tree, math.MinInt64, math.MaxInt64)
}

func validateBSTHelper(tree *BST, minValue, maxValue int) bool {
	if tree == nil {
		return true
	}

	// Check if current node is within valid range
	if tree.Value < minValue || tree.Value >= maxValue {
		return false
	}

	// Validate left and right subtrees with updated constraints
	leftValid := validateBSTHelper(tree.Left, minValue, tree.Value)
	rightValid := validateBSTHelper(tree.Right, tree.Value, maxValue)

	return leftValid && rightValid
}

// ValidateBSTInorder alternative: Check if inorder traversal is sorted
func ValidateBSTInorder(tree *BST) bool {
	prev := math.MinInt64
	return inorder(tree, &prev)
}

func inorder(node *BST, prev *int) bool {
	if node == nil {
		return true
	}

	// Visit left
	if !inorder(node.Left, prev) {
		return false
	}

	// Check current node
	if node.Value < *prev {
		return false
	}
	*prev = node.Value

	// Visit right
	return inorder(node.Right, prev)
}

func main() {
	// Test 1: Valid BST
	//        10
	//       /  \
	//      5    15
	//     / \   / \
	//    2   5 13  22
	//   /       \
	//  1         14

	root1 := &BST{Value: 10}
	root1.Left = &BST{Value: 5}
	root1.Right = &BST{Value: 15}
	root1.Left.Left = &BST{Value: 2}
	root1.Left.Right = &BST{Value: 5}
	root1.Left.Left.Left = &BST{Value: 1}
	root1.Right.Left = &BST{Value: 13}
	root1.Right.Right = &BST{Value: 22}
	root1.Right.Left.Right = &BST{Value: 14}

	result1 := ValidateBST(root1)
	fmt.Printf("Test 1 (valid BST): %v\n", result1) // Expected: true

	// Test 2: Invalid BST (right child = 10)
	root2 := &BST{Value: 10}
	root2.Left = &BST{Value: 5}
	root2.Right = &BST{Value: 15}
	root2.Right.Left = &BST{Value: 10} // Invalid: should be > 10

	result2 := ValidateBST(root2)
	fmt.Printf("Test 2 (invalid - right child = 10): %v\n", result2) // Expected: false

	// Test 3: Invalid BST (value in wrong subtree)
	root3 := &BST{Value: 10}
	root3.Left = &BST{Value: 5}
	root3.Right = &BST{Value: 15}
	root3.Left.Right = &BST{Value: 11} // Invalid: 11 > 10 but in left subtree

	result3 := ValidateBST(root3)
	fmt.Printf("Test 3 (invalid - 11 in left subtree): %v\n", result3) // Expected: false

	// Test 4: Single node (valid)
	root4 := &BST{Value: 5}
	result4 := ValidateBST(root4)
	fmt.Printf("Test 4 (single node): %v\n", result4) // Expected: true

	// Test 5: nil (valid)
	result5 := ValidateBST(nil)
	fmt.Printf("Test 5 (nil): %v\n", result5) // Expected: true

	// Test 6: Two nodes valid
	root6 := &BST{Value: 10}
	root6.Left = &BST{Value: 5}
	result6 := ValidateBST(root6)
	fmt.Printf("Test 6 (two nodes valid): %v\n", result6) // Expected: true

	// Test 7: Two nodes invalid
	root7 := &BST{Value: 10}
	root7.Left = &BST{Value: 15} // Invalid: left should be < 10
	result7 := ValidateBST(root7)
	fmt.Printf("Test 7 (two nodes invalid): %v\n", result7) // Expected: false

	// Test 8: Compare methods
	fmt.Println("\n--- Method Comparison ---")
	fmt.Printf("Range method on valid BST: %v\n", ValidateBST(root1))
	fmt.Printf("Inorder method on valid BST: %v\n", ValidateBSTInorder(root1))
	fmt.Printf("Range method on invalid BST: %v\n", ValidateBST(root2))
	fmt.Printf("Inorder method on invalid BST: %v\n", ValidateBSTInorder(root2))

	fmt.Println("\nAll tests completed!")
}
