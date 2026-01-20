/*
Height Balanced Binary Tree - Go Solution

Check if a binary tree is height-balanced (height difference of subtrees <= 1 for all nodes).

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// TreeInfo holds balance status and height
type TreeInfo struct {
	IsBalanced bool
	Height     int
}

// HeightBalancedBinaryTree checks if a binary tree is height-balanced
func HeightBalancedBinaryTree(root *BinaryTree) bool {
	return getTreeInfo(root).IsBalanced
}

// getTreeInfo returns balance status and height for a subtree
func getTreeInfo(node *BinaryTree) TreeInfo {
	// Base case: empty tree is balanced with height -1
	if node == nil {
		return TreeInfo{true, -1}
	}

	// Get info for left and right subtrees
	leftInfo := getTreeInfo(node.Left)
	rightInfo := getTreeInfo(node.Right)

	// Check if current node is balanced
	isBalanced := leftInfo.IsBalanced &&
		rightInfo.IsBalanced &&
		abs(leftInfo.Height-rightInfo.Height) <= 1

	// Height is max of children + 1
	height := max(leftInfo.Height, rightInfo.Height) + 1

	return TreeInfo{isBalanced, height}
}

// HeightBalancedEarlyExit uses early termination for unbalanced subtrees
func HeightBalancedEarlyExit(root *BinaryTree) bool {
	return checkHeight(root) != -1
}

func checkHeight(node *BinaryTree) int {
	if node == nil {
		return 0
	}

	leftHeight := checkHeight(node.Left)
	if leftHeight == -1 {
		return -1 // Left subtree is unbalanced
	}

	rightHeight := checkHeight(node.Right)
	if rightHeight == -1 {
		return -1 // Right subtree is unbalanced
	}

	if abs(leftHeight-rightHeight) > 1 {
		return -1 // Current node is unbalanced
	}

	return max(leftHeight, rightHeight) + 1
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	// Build balanced test tree:
	//        1
	//      /   \
	//     2     3
	//    / \     \
	//   4   5     6
	//      / \
	//     7   8

	balanced := &BinaryTree{Value: 1}
	balanced.Left = &BinaryTree{Value: 2}
	balanced.Right = &BinaryTree{Value: 3}
	balanced.Left.Left = &BinaryTree{Value: 4}
	balanced.Left.Right = &BinaryTree{Value: 5}
	balanced.Right.Right = &BinaryTree{Value: 6}
	balanced.Left.Right.Left = &BinaryTree{Value: 7}
	balanced.Left.Right.Right = &BinaryTree{Value: 8}

	// Test 1: Balanced tree
	result1 := HeightBalancedBinaryTree(balanced)
	fmt.Printf("Test 1 (balanced tree): %v\n", result1)
	// Expected: true

	// Build unbalanced test tree:
	//        1
	//      /   \
	//     2     3
	//    / \
	//   4   5
	//  /
	// 6

	unbalanced := &BinaryTree{Value: 1}
	unbalanced.Left = &BinaryTree{Value: 2}
	unbalanced.Right = &BinaryTree{Value: 3}
	unbalanced.Left.Left = &BinaryTree{Value: 4}
	unbalanced.Left.Right = &BinaryTree{Value: 5}
	unbalanced.Left.Left.Left = &BinaryTree{Value: 6}

	// Test 2: Unbalanced tree
	result2 := HeightBalancedBinaryTree(unbalanced)
	fmt.Printf("Test 2 (unbalanced tree): %v\n", result2)
	// Expected: false

	// Test 3: Empty tree
	result3 := HeightBalancedBinaryTree(nil)
	fmt.Printf("Test 3 (empty tree): %v\n", result3)
	// Expected: true

	// Test 4: Single node
	single := &BinaryTree{Value: 1}
	result4 := HeightBalancedBinaryTree(single)
	fmt.Printf("Test 4 (single node): %v\n", result4)
	// Expected: true

	// Test 5: Two-level perfect tree
	perfect := &BinaryTree{Value: 1}
	perfect.Left = &BinaryTree{Value: 2}
	perfect.Right = &BinaryTree{Value: 3}
	result5 := HeightBalancedBinaryTree(perfect)
	fmt.Printf("Test 5 (perfect two-level): %v\n", result5)
	// Expected: true

	// Test 6: Linear tree (worst case)
	linear := &BinaryTree{Value: 1}
	linear.Left = &BinaryTree{Value: 2}
	linear.Left.Left = &BinaryTree{Value: 3}
	result6 := HeightBalancedBinaryTree(linear)
	fmt.Printf("Test 6 (linear tree): %v\n", result6)
	// Expected: false

	// Test 7: Alternative implementation
	result7 := HeightBalancedEarlyExit(balanced)
	result8 := HeightBalancedEarlyExit(unbalanced)
	fmt.Printf("\nTest 7 (early exit - balanced): %v\n", result7)
	fmt.Printf("Test 8 (early exit - unbalanced): %v\n", result8)

	// Test 9: Edge case - only right children
	rightOnly := &BinaryTree{Value: 1}
	rightOnly.Right = &BinaryTree{Value: 2}
	result9 := HeightBalancedBinaryTree(rightOnly)
	fmt.Printf("\nTest 9 (only right child): %v\n", result9)
	// Expected: true (height diff = 1)

	// Test 10: One level deeper on one side (still balanced)
	almost := &BinaryTree{Value: 1}
	almost.Left = &BinaryTree{Value: 2}
	almost.Right = &BinaryTree{Value: 3}
	almost.Left.Left = &BinaryTree{Value: 4}
	result10 := HeightBalancedBinaryTree(almost)
	fmt.Printf("Test 10 (one extra level, still balanced): %v\n", result10)
	// Expected: true

	fmt.Println("\nAll tests completed!")
}
