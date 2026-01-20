/*
Min Height BST - Go Solution

Construct a BST with minimum height from a sorted array.

Time Complexity: O(n)
Space Complexity: O(n) for tree, O(log n) for recursion stack
*/

package main

import (
	"fmt"
	"strings"
)

// BST represents a node in Binary Search Tree
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// MinHeightBST constructs BST with minimum height from sorted array
func MinHeightBST(array []int) *BST {
	return constructMinHeightBST(array, 0, len(array)-1)
}

// constructMinHeightBST is a helper function using divide and conquer
func constructMinHeightBST(array []int, left, right int) *BST {
	// Base case: invalid range
	if left > right {
		return nil
	}

	// Find middle element - this becomes the root
	mid := (left + right) / 2
	node := &BST{Value: array[mid]}

	// Recursively build left and right subtrees
	node.Left = constructMinHeightBST(array, left, mid-1)
	node.Right = constructMinHeightBST(array, mid+1, right)

	return node
}

// stackItem represents an item for iterative construction
type stackItem struct {
	left, right int
	parent      *BST
	isLeft      bool
}

// MinHeightBSTIterative constructs BST using iterative approach
func MinHeightBSTIterative(array []int) *BST {
	if len(array) == 0 {
		return nil
	}

	mid := len(array) / 2
	root := &BST{Value: array[mid]}

	// Stack for iterative processing
	stack := []stackItem{
		{0, mid - 1, root, true},             // Left subtree
		{mid + 1, len(array) - 1, root, false}, // Right subtree
	}

	for len(stack) > 0 {
		// Pop from stack
		item := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if item.left > item.right {
			continue
		}

		mid := (item.left + item.right) / 2
		node := &BST{Value: array[mid]}

		if item.isLeft {
			item.parent.Left = node
		} else {
			item.parent.Right = node
		}

		// Push children to stack
		stack = append(stack, stackItem{item.left, mid - 1, node, true})
		stack = append(stack, stackItem{mid + 1, item.right, node, false})
	}

	return root
}

// GetTreeHeight calculates height of BST
func GetTreeHeight(node *BST) int {
	if node == nil {
		return 0
	}
	leftHeight := GetTreeHeight(node.Left)
	rightHeight := GetTreeHeight(node.Right)
	if leftHeight > rightHeight {
		return 1 + leftHeight
	}
	return 1 + rightHeight
}

// InorderTraversal returns inorder traversal of BST
func InorderTraversal(node *BST) []int {
	result := []int{}
	inorderHelper(node, &result)
	return result
}

func inorderHelper(node *BST, result *[]int) {
	if node == nil {
		return
	}
	inorderHelper(node.Left, result)
	*result = append(*result, node.Value)
	inorderHelper(node.Right, result)
}

// PrintTree prints tree structure
func PrintTree(node *BST, level int, prefix string) {
	if node == nil {
		return
	}
	fmt.Printf("%s%s%d\n", strings.Repeat("    ", level), prefix, node.Value)
	if node.Left != nil || node.Right != nil {
		if node.Left != nil {
			PrintTree(node.Left, level+1, "L--- ")
		} else {
			fmt.Printf("%sL--- nil\n", strings.Repeat("    ", level+1))
		}
		if node.Right != nil {
			PrintTree(node.Right, level+1, "R--- ")
		} else {
			fmt.Printf("%sR--- nil\n", strings.Repeat("    ", level+1))
		}
	}
}

func main() {
	// Test 1: Standard case from problem
	array1 := []int{1, 2, 5, 7, 10, 13, 14, 15, 22}
	result1 := MinHeightBST(array1)
	fmt.Println("Test 1: array = [1, 2, 5, 7, 10, 13, 14, 15, 22]")
	PrintTree(result1, 0, "Root: ")
	fmt.Printf("Height: %d\n", GetTreeHeight(result1)) // Expected: 4
	fmt.Printf("Inorder: %v\n", InorderTraversal(result1))
	fmt.Println()

	// Test 2: Small array
	array2 := []int{1, 2, 3}
	result2 := MinHeightBST(array2)
	fmt.Println("Test 2: array = [1, 2, 3]")
	PrintTree(result2, 0, "Root: ")
	fmt.Printf("Height: %d\n", GetTreeHeight(result2)) // Expected: 2
	fmt.Println()

	// Test 3: Single element
	array3 := []int{5}
	result3 := MinHeightBST(array3)
	fmt.Println("Test 3: array = [5]")
	PrintTree(result3, 0, "Root: ")
	fmt.Printf("Height: %d\n", GetTreeHeight(result3)) // Expected: 1
	fmt.Println()

	// Test 4: Two elements
	array4 := []int{1, 2}
	result4 := MinHeightBST(array4)
	fmt.Println("Test 4: array = [1, 2]")
	PrintTree(result4, 0, "Root: ")
	fmt.Printf("Height: %d\n", GetTreeHeight(result4)) // Expected: 2
	fmt.Println()

	// Test 5: Power of 2 minus 1 elements (perfect binary tree)
	array5 := []int{1, 2, 3, 4, 5, 6, 7}
	result5 := MinHeightBST(array5)
	fmt.Println("Test 5: array = [1, 2, 3, 4, 5, 6, 7] (perfect tree)")
	PrintTree(result5, 0, "Root: ")
	fmt.Printf("Height: %d\n", GetTreeHeight(result5)) // Expected: 3
	fmt.Println()

	// Test 6: Compare recursive and iterative
	array6 := []int{1, 2, 5, 7, 10, 13, 14, 15, 22}
	result6a := MinHeightBST(array6)
	result6b := MinHeightBSTIterative(array6)
	fmt.Println("Test 6: Comparing recursive vs iterative")
	fmt.Printf("Recursive inorder: %v\n", InorderTraversal(result6a))
	fmt.Printf("Iterative inorder: %v\n", InorderTraversal(result6b))
	fmt.Printf("Heights equal: %v\n", GetTreeHeight(result6a) == GetTreeHeight(result6b))

	fmt.Println("\nAll tests completed!")
}
