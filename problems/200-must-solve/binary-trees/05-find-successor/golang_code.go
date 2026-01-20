/*
Find Successor - Go Solution

Find the in-order successor of a node in a binary tree with parent pointers.

Time Complexity: O(h) where h is the height of the tree
Space Complexity: O(1)
*/

package main

import "fmt"

// BinaryTree represents a node with parent pointer
type BinaryTree struct {
	Value  int
	Left   *BinaryTree
	Right  *BinaryTree
	Parent *BinaryTree
}

// FindSuccessor finds the in-order successor of a given node
func FindSuccessor(tree, node *BinaryTree) *BinaryTree {
	if node == nil {
		return nil
	}

	// Case 1: Node has a right subtree
	// Successor is the leftmost node in the right subtree
	if node.Right != nil {
		return getLeftmostChild(node.Right)
	}

	// Case 2: Node has no right subtree
	// Go up until we find a node that is a left child of its parent
	return getRightmostParent(node)
}

// getLeftmostChild returns the leftmost node in a subtree
func getLeftmostChild(node *BinaryTree) *BinaryTree {
	current := node
	for current.Left != nil {
		current = current.Left
	}
	return current
}

// getRightmostParent goes up until finding a parent where node is in left subtree
func getRightmostParent(node *BinaryTree) *BinaryTree {
	current := node
	for current.Parent != nil && current.Parent.Right == current {
		current = current.Parent
	}
	return current.Parent
}

// InorderTraversal returns in-order traversal values
func InorderTraversal(node *BinaryTree) []int {
	result := []int{}
	inorderHelper(node, &result)
	return result
}

func inorderHelper(node *BinaryTree, result *[]int) {
	if node == nil {
		return
	}
	inorderHelper(node.Left, result)
	*result = append(*result, node.Value)
	inorderHelper(node.Right, result)
}

func main() {
	// Build test tree with parent pointers:
	//        1
	//      /   \
	//     2     3
	//    / \
	//   4   5
	//  /
	// 6

	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2, Parent: root}
	root.Right = &BinaryTree{Value: 3, Parent: root}
	root.Left.Left = &BinaryTree{Value: 4, Parent: root.Left}
	root.Left.Right = &BinaryTree{Value: 5, Parent: root.Left}
	root.Left.Left.Left = &BinaryTree{Value: 6, Parent: root.Left.Left}

	// Show in-order traversal
	fmt.Println("In-order traversal:", InorderTraversal(root))
	// Expected: [6 4 2 5 1 3]

	// Test 1: Successor of node 5 (should be 1)
	node5 := root.Left.Right
	result1 := FindSuccessor(root, node5)
	printResult("Test 1 - Successor of 5", result1)
	// Expected: 1

	// Test 2: Successor of node 6 (should be 4)
	node6 := root.Left.Left.Left
	result2 := FindSuccessor(root, node6)
	printResult("Test 2 - Successor of 6", result2)
	// Expected: 4

	// Test 3: Successor of node 4 (should be 2)
	node4 := root.Left.Left
	result3 := FindSuccessor(root, node4)
	printResult("Test 3 - Successor of 4", result3)
	// Expected: 2

	// Test 4: Successor of node 2 (should be 5)
	node2 := root.Left
	result4 := FindSuccessor(root, node2)
	printResult("Test 4 - Successor of 2", result4)
	// Expected: 5

	// Test 5: Successor of node 1 (should be 3)
	result5 := FindSuccessor(root, root)
	printResult("Test 5 - Successor of 1", result5)
	// Expected: 3

	// Test 6: Successor of node 3 (should be nil - last in traversal)
	node3 := root.Right
	result6 := FindSuccessor(root, node3)
	printResult("Test 6 - Successor of 3", result6)
	// Expected: <nil>

	// Test 7: Single node tree
	single := &BinaryTree{Value: 42}
	result7 := FindSuccessor(single, single)
	printResult("\nTest 7 - Single node successor", result7)
	// Expected: <nil>

	// Test 8: Complete binary tree
	//      10
	//     /  \
	//    5   15
	//   / \  / \
	//  3  7 12 20

	complete := &BinaryTree{Value: 10}
	complete.Left = &BinaryTree{Value: 5, Parent: complete}
	complete.Right = &BinaryTree{Value: 15, Parent: complete}
	complete.Left.Left = &BinaryTree{Value: 3, Parent: complete.Left}
	complete.Left.Right = &BinaryTree{Value: 7, Parent: complete.Left}
	complete.Right.Left = &BinaryTree{Value: 12, Parent: complete.Right}
	complete.Right.Right = &BinaryTree{Value: 20, Parent: complete.Right}

	fmt.Println("\nComplete tree in-order:", InorderTraversal(complete))
	// Expected: [3 5 7 10 12 15 20]

	// Successor of 7 should be 10
	result8 := FindSuccessor(complete, complete.Left.Right)
	printResult("Test 8 - Successor of 7", result8)
	// Expected: 10

	// Successor of 10 should be 12
	result9 := FindSuccessor(complete, complete)
	printResult("Test 9 - Successor of 10", result9)
	// Expected: 12

	fmt.Println("\nAll tests completed!")
}

func printResult(testName string, node *BinaryTree) {
	if node != nil {
		fmt.Printf("%s: %d\n", testName, node.Value)
	} else {
		fmt.Printf("%s: <nil>\n", testName)
	}
}
