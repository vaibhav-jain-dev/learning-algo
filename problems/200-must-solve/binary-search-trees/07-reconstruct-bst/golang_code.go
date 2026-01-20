/*
Reconstruct BST - Go Solution

Reconstruct a BST from its preorder traversal.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
*/

package main

import (
	"fmt"
	"math"
	"strings"
)

// BST represents a node in Binary Search Tree
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// ReconstructBST reconstructs BST from preorder traversal using bounds
func ReconstructBST(preorderValues []int) *BST {
	if len(preorderValues) == 0 {
		return nil
	}

	idx := 0
	return buildTree(preorderValues, &idx, math.MinInt64, math.MaxInt64)
}

// buildTree builds tree recursively with bounds
func buildTree(preorder []int, idx *int, minVal, maxVal int) *BST {
	// Base case: all elements processed
	if *idx >= len(preorder) {
		return nil
	}

	currentVal := preorder[*idx]

	// If current value is out of bounds, it belongs to different subtree
	if currentVal < minVal || currentVal >= maxVal {
		return nil
	}

	// Create node and advance index
	node := &BST{Value: currentVal}
	*idx++

	// Build left subtree (values must be < current)
	node.Left = buildTree(preorder, idx, minVal, currentVal)

	// Build right subtree (values must be >= current)
	node.Right = buildTree(preorder, idx, currentVal, maxVal)

	return node
}

// ReconstructBSTNaive naive approach: find split point for each subtree
// Time Complexity: O(n^2) in worst case
func ReconstructBSTNaive(preorderValues []int) *BST {
	if len(preorderValues) == 0 {
		return nil
	}

	rootVal := preorderValues[0]
	root := &BST{Value: rootVal}

	// Find first element greater than root (start of right subtree)
	rightStart := len(preorderValues)
	for i := 1; i < len(preorderValues); i++ {
		if preorderValues[i] >= rootVal {
			rightStart = i
			break
		}
	}

	// Recursively build subtrees
	root.Left = ReconstructBSTNaive(preorderValues[1:rightStart])
	if rightStart < len(preorderValues) {
		root.Right = ReconstructBSTNaive(preorderValues[rightStart:])
	}

	return root
}

// PreorderTraversal returns preorder traversal of BST
func PreorderTraversal(node *BST) []int {
	if node == nil {
		return []int{}
	}
	result := []int{node.Value}
	result = append(result, PreorderTraversal(node.Left)...)
	result = append(result, PreorderTraversal(node.Right)...)
	return result
}

// InorderTraversal returns inorder traversal of BST
func InorderTraversal(node *BST) []int {
	if node == nil {
		return []int{}
	}
	result := InorderTraversal(node.Left)
	result = append(result, node.Value)
	result = append(result, InorderTraversal(node.Right)...)
	return result
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

// slicesEqual checks if two int slices are equal
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
	// Test 1: Standard case from problem
	preorder1 := []int{10, 4, 2, 1, 5, 17, 19, 18}
	result1 := ReconstructBST(preorder1)
	fmt.Println("Test 1: preorder = [10, 4, 2, 1, 5, 17, 19, 18]")
	PrintTree(result1, 0, "Root: ")
	fmt.Printf("Reconstructed preorder: %v\n", PreorderTraversal(result1))
	fmt.Printf("Inorder (should be sorted): %v\n", InorderTraversal(result1))
	fmt.Println()

	// Test 2: Balanced tree
	preorder2 := []int{5, 3, 1, 4, 7, 6, 8}
	result2 := ReconstructBST(preorder2)
	fmt.Println("Test 2: preorder = [5, 3, 1, 4, 7, 6, 8]")
	PrintTree(result2, 0, "Root: ")
	fmt.Printf("Reconstructed preorder: %v\n", PreorderTraversal(result2))
	fmt.Println()

	// Test 3: Single node
	preorder3 := []int{10}
	result3 := ReconstructBST(preorder3)
	fmt.Println("Test 3: preorder = [10]")
	PrintTree(result3, 0, "Root: ")
	fmt.Println()

	// Test 4: Left skewed tree
	preorder4 := []int{5, 4, 3, 2, 1}
	result4 := ReconstructBST(preorder4)
	fmt.Println("Test 4: preorder = [5, 4, 3, 2, 1] (left skewed)")
	PrintTree(result4, 0, "Root: ")
	fmt.Println()

	// Test 5: Right skewed tree
	preorder5 := []int{1, 2, 3, 4, 5}
	result5 := ReconstructBST(preorder5)
	fmt.Println("Test 5: preorder = [1, 2, 3, 4, 5] (right skewed)")
	PrintTree(result5, 0, "Root: ")
	fmt.Println()

	// Test 6: Two nodes
	preorder6 := []int{2, 1}
	result6 := ReconstructBST(preorder6)
	fmt.Println("Test 6: preorder = [2, 1]")
	PrintTree(result6, 0, "Root: ")
	fmt.Println()

	// Test 7: Compare optimal vs naive
	preorder7 := []int{10, 4, 2, 1, 5, 17, 19, 18}
	result7a := ReconstructBST(preorder7)
	result7b := ReconstructBSTNaive(preorder7)
	fmt.Println("Test 7: Comparing optimal vs naive")
	fmt.Printf("Optimal preorder:  %v\n", PreorderTraversal(result7a))
	fmt.Printf("Naive preorder:    %v\n", PreorderTraversal(result7b))
	fmt.Printf("Match: %v\n", slicesEqual(PreorderTraversal(result7a), PreorderTraversal(result7b)))

	fmt.Println("\nAll tests completed!")
}
