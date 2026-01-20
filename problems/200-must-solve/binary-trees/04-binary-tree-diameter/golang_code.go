/*
Binary Tree Diameter - Go Solution

Find the length of the longest path between any two nodes in a binary tree.

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

// BinaryTreeDiameter calculates the diameter of a binary tree
func BinaryTreeDiameter(root *BinaryTree) int {
	maxDiameter := 0
	getHeight(root, &maxDiameter)
	return maxDiameter
}

// getHeight returns the height while updating maxDiameter
func getHeight(node *BinaryTree, maxDiameter *int) int {
	if node == nil {
		return 0
	}

	leftHeight := getHeight(node.Left, maxDiameter)
	rightHeight := getHeight(node.Right, maxDiameter)

	// Diameter through this node
	currentDiameter := leftHeight + rightHeight
	if currentDiameter > *maxDiameter {
		*maxDiameter = currentDiameter
	}

	// Return height + 1 for current edge
	return 1 + max(leftHeight, rightHeight)
}

// TreeInfo stores diameter and height information
type TreeInfo struct {
	Diameter int
	Height   int
}

// BinaryTreeDiameterV2 is an alternative implementation
func BinaryTreeDiameterV2(root *BinaryTree) int {
	return getTreeInfo(root).Diameter
}

func getTreeInfo(node *BinaryTree) TreeInfo {
	if node == nil {
		return TreeInfo{0, 0}
	}

	leftInfo := getTreeInfo(node.Left)
	rightInfo := getTreeInfo(node.Right)

	// Diameter through this node
	longestPathThroughRoot := leftInfo.Height + rightInfo.Height

	// Maximum diameter
	maxDiameterSoFar := max(leftInfo.Diameter, rightInfo.Diameter)
	currentDiameter := max(longestPathThroughRoot, maxDiameterSoFar)

	// Height of current subtree
	currentHeight := 1 + max(leftInfo.Height, rightInfo.Height)

	return TreeInfo{currentDiameter, currentHeight}
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	// Build test tree:
	//        1
	//      /   \
	//     3     2
	//    / \
	//   7   4
	//  /     \
	// 8       5
	//          \
	//           6

	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 3}
	root.Right = &BinaryTree{Value: 2}
	root.Left.Left = &BinaryTree{Value: 7}
	root.Left.Right = &BinaryTree{Value: 4}
	root.Left.Left.Left = &BinaryTree{Value: 8}
	root.Left.Right.Right = &BinaryTree{Value: 5}
	root.Left.Right.Right.Right = &BinaryTree{Value: 6}

	// Test 1: Main example
	result1 := BinaryTreeDiameter(root)
	fmt.Printf("Test 1 (main example): %d\n", result1)
	// Expected: 6

	// Test 2: Alternative implementation
	result2 := BinaryTreeDiameterV2(root)
	fmt.Printf("Test 2 (v2 implementation): %d\n", result2)
	// Expected: 6

	// Test 3: Single node
	single := &BinaryTree{Value: 1}
	result3 := BinaryTreeDiameter(single)
	fmt.Printf("Test 3 (single node): %d\n", result3)
	// Expected: 0

	// Test 4: Empty tree
	result4 := BinaryTreeDiameter(nil)
	fmt.Printf("Test 4 (empty tree): %d\n", result4)
	// Expected: 0

	// Test 5: Linear tree
	linear := &BinaryTree{Value: 1}
	linear.Left = &BinaryTree{Value: 2}
	linear.Left.Left = &BinaryTree{Value: 3}
	linear.Left.Left.Left = &BinaryTree{Value: 4}
	result5 := BinaryTreeDiameter(linear)
	fmt.Printf("Test 5 (linear tree): %d\n", result5)
	// Expected: 3

	// Test 6: Balanced tree
	balanced := &BinaryTree{Value: 1}
	balanced.Left = &BinaryTree{Value: 2}
	balanced.Right = &BinaryTree{Value: 3}
	balanced.Left.Left = &BinaryTree{Value: 4}
	balanced.Left.Right = &BinaryTree{Value: 5}
	result6 := BinaryTreeDiameter(balanced)
	fmt.Printf("Test 6 (balanced tree): %d\n", result6)
	// Expected: 3

	// Test 7: Diameter not through root
	notThroughRoot := &BinaryTree{Value: 1}
	notThroughRoot.Left = &BinaryTree{Value: 2}
	notThroughRoot.Left.Left = &BinaryTree{Value: 3}
	notThroughRoot.Left.Right = &BinaryTree{Value: 4}
	notThroughRoot.Left.Left.Left = &BinaryTree{Value: 5}
	notThroughRoot.Left.Right.Right = &BinaryTree{Value: 6}
	result7 := BinaryTreeDiameter(notThroughRoot)
	fmt.Printf("Test 7 (diameter not through root): %d\n", result7)
	// Expected: 4

	fmt.Println("\nAll tests completed!")
}
