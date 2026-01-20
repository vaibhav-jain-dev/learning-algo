/*
Iterative In-Order Traversal (Morris Traversal) - Go Solution

Perform in-order traversal without recursion or stack using Morris Traversal.
This achieves O(1) space complexity by temporarily modifying tree structure.

Time Complexity: O(n)
Space Complexity: O(1) excluding output array
*/

package main

import (
	"fmt"
	"reflect"
)

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// IterativeInorderTraversal performs Morris Traversal for in-order traversal
// without using recursion or a stack.
//
// The key insight is using "threads" - temporary links from a node's
// inorder predecessor back to the node itself. This allows us to
// return to a node after processing its left subtree.
func IterativeInorderTraversal(tree *BinaryTree) []int {
	result := []int{}
	current := tree

	for current != nil {
		if current.Left == nil {
			// No left child: visit current and go right
			result = append(result, current.Value)
			current = current.Right
		} else {
			// Has left child: find inorder predecessor
			predecessor := findPredecessor(current)

			if predecessor.Right == nil {
				// First visit: create thread and go left
				predecessor.Right = current
				current = current.Left
			} else {
				// Second visit (via thread): remove thread, visit, go right
				predecessor.Right = nil // Restore tree structure
				result = append(result, current.Value)
				current = current.Right
			}
		}
	}

	return result
}

// findPredecessor finds the inorder predecessor of a node.
// The predecessor is the rightmost node in the left subtree,
// but we stop if we hit a thread back to the original node.
func findPredecessor(node *BinaryTree) *BinaryTree {
	predecessor := node.Left

	// Go right until we hit null or a thread back to node
	for predecessor.Right != nil && predecessor.Right != node {
		predecessor = predecessor.Right
	}

	return predecessor
}

// InorderWithStack is the standard iterative in-order traversal using stack
// Time: O(n), Space: O(h)
func InorderWithStack(tree *BinaryTree) []int {
	result := []int{}
	stack := []*BinaryTree{}
	current := tree

	for current != nil || len(stack) > 0 {
		// Go left as far as possible
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}

		// Process current node
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, current.Value)

		// Go right
		current = current.Right
	}

	return result
}

// InorderRecursive is the recursive in-order traversal (for comparison)
// Time: O(n), Space: O(h) for call stack
func InorderRecursive(tree *BinaryTree) []int {
	result := []int{}
	inorderHelper(tree, &result)
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

// verifyTreeStructure checks if tree matches expected structure
// Structure format: [value, leftSubtree, rightSubtree]
func verifyTreeStructure(tree *BinaryTree, expected []interface{}) bool {
	if tree == nil && expected == nil {
		return true
	}
	if tree == nil || expected == nil {
		return false
	}
	if len(expected) == 0 {
		return false
	}

	// Check value
	if tree.Value != expected[0].(int) {
		return false
	}

	// Check left
	var leftExpected []interface{}
	if len(expected) > 1 && expected[1] != nil {
		leftExpected = expected[1].([]interface{})
	}
	if !verifyTreeStructure(tree.Left, leftExpected) {
		return false
	}

	// Check right
	var rightExpected []interface{}
	if len(expected) > 2 && expected[2] != nil {
		rightExpected = expected[2].([]interface{})
	}
	return verifyTreeStructure(tree.Right, rightExpected)
}

func main() {
	// Test 1: Balanced tree
	//         4
	//       /   \
	//      2     6
	//     / \   / \
	//    1   3 5   7
	// Expected in-order: [1, 2, 3, 4, 5, 6, 7]

	root1 := &BinaryTree{Value: 4}
	root1.Left = &BinaryTree{Value: 2}
	root1.Right = &BinaryTree{Value: 6}
	root1.Left.Left = &BinaryTree{Value: 1}
	root1.Left.Right = &BinaryTree{Value: 3}
	root1.Right.Left = &BinaryTree{Value: 5}
	root1.Right.Right = &BinaryTree{Value: 7}

	result1 := IterativeInorderTraversal(root1)
	expected1 := InorderRecursive(root1)
	fmt.Printf("Test 1 (Morris): %v\n", result1)
	fmt.Printf("Test 1 (Recursive verification): %v\n", expected1)
	fmt.Printf("Test 1 Match: %v\n", reflect.DeepEqual(result1, expected1))

	// Test 2: Right-skewed tree
	//    1
	//     \
	//      2
	//       \
	//        3
	// Expected: [1, 2, 3]

	root2 := &BinaryTree{Value: 1}
	root2.Right = &BinaryTree{Value: 2}
	root2.Right.Right = &BinaryTree{Value: 3}

	result2 := IterativeInorderTraversal(root2)
	fmt.Printf("\nTest 2 (right-skewed): %v\n", result2)
	// Expected: [1, 2, 3]

	// Test 3: Left-skewed tree
	//        3
	//       /
	//      2
	//     /
	//    1
	// Expected: [1, 2, 3]

	root3 := &BinaryTree{Value: 3}
	root3.Left = &BinaryTree{Value: 2}
	root3.Left.Left = &BinaryTree{Value: 1}

	result3 := IterativeInorderTraversal(root3)
	fmt.Printf("Test 3 (left-skewed): %v\n", result3)
	// Expected: [1, 2, 3]

	// Test 4: Single node
	root4 := &BinaryTree{Value: 42}
	result4 := IterativeInorderTraversal(root4)
	fmt.Printf("Test 4 (single node): %v\n", result4)
	// Expected: [42]

	// Test 5: Empty tree
	result5 := IterativeInorderTraversal(nil)
	fmt.Printf("Test 5 (empty): %v\n", result5)
	// Expected: []

	// Test 6: Complex tree
	//         1
	//          \
	//           2
	//          /
	//         3
	// Expected: [1, 3, 2]

	root6 := &BinaryTree{Value: 1}
	root6.Right = &BinaryTree{Value: 2}
	root6.Right.Left = &BinaryTree{Value: 3}

	result6 := IterativeInorderTraversal(root6)
	fmt.Printf("Test 6 (zigzag): %v\n", result6)
	// Expected: [1, 3, 2]

	// Test 7: Verify tree structure is restored after Morris traversal
	root7 := &BinaryTree{Value: 4}
	root7.Left = &BinaryTree{Value: 2}
	root7.Right = &BinaryTree{Value: 6}
	root7.Left.Left = &BinaryTree{Value: 1}
	root7.Left.Right = &BinaryTree{Value: 3}

	// Perform Morris traversal
	_ = IterativeInorderTraversal(root7)

	// Verify structure - check manually
	structureOK := root7.Value == 4 &&
		root7.Left != nil && root7.Left.Value == 2 &&
		root7.Right != nil && root7.Right.Value == 6 &&
		root7.Left.Left != nil && root7.Left.Left.Value == 1 &&
		root7.Left.Right != nil && root7.Left.Right.Value == 3 &&
		root7.Left.Left.Right == nil && // No lingering thread
		root7.Left.Right.Right == nil // No lingering thread

	fmt.Printf("\nTest 7 (structure preserved): %v\n", structureOK)

	// Test 8: Compare all three methods on larger tree
	root8 := &BinaryTree{Value: 10}
	root8.Left = &BinaryTree{Value: 5}
	root8.Right = &BinaryTree{Value: 15}
	root8.Left.Left = &BinaryTree{Value: 3}
	root8.Left.Right = &BinaryTree{Value: 7}
	root8.Right.Left = &BinaryTree{Value: 12}
	root8.Right.Right = &BinaryTree{Value: 20}
	root8.Left.Left.Left = &BinaryTree{Value: 1}
	root8.Left.Right.Left = &BinaryTree{Value: 6}
	root8.Right.Right.Right = &BinaryTree{Value: 25}

	morrisResult := IterativeInorderTraversal(root8)
	stackResult := InorderWithStack(root8)
	recursiveResult := InorderRecursive(root8)

	fmt.Printf("\nTest 8 (comparison):\n")
	fmt.Printf("  Morris:    %v\n", morrisResult)
	fmt.Printf("  Stack:     %v\n", stackResult)
	fmt.Printf("  Recursive: %v\n", recursiveResult)
	allMatch := reflect.DeepEqual(morrisResult, stackResult) &&
		reflect.DeepEqual(stackResult, recursiveResult)
	fmt.Printf("  All match: %v\n", allMatch)

	// Test 9: Full binary tree
	//              8
	//           /     \
	//          4       12
	//         / \     /  \
	//        2   6   10   14
	//       /\ / \  / \   / \
	//      1 3 5 7 9 11 13 15

	root9 := &BinaryTree{Value: 8}
	root9.Left = &BinaryTree{Value: 4}
	root9.Right = &BinaryTree{Value: 12}
	root9.Left.Left = &BinaryTree{Value: 2}
	root9.Left.Right = &BinaryTree{Value: 6}
	root9.Right.Left = &BinaryTree{Value: 10}
	root9.Right.Right = &BinaryTree{Value: 14}
	root9.Left.Left.Left = &BinaryTree{Value: 1}
	root9.Left.Left.Right = &BinaryTree{Value: 3}
	root9.Left.Right.Left = &BinaryTree{Value: 5}
	root9.Left.Right.Right = &BinaryTree{Value: 7}
	root9.Right.Left.Left = &BinaryTree{Value: 9}
	root9.Right.Left.Right = &BinaryTree{Value: 11}
	root9.Right.Right.Left = &BinaryTree{Value: 13}
	root9.Right.Right.Right = &BinaryTree{Value: 15}

	result9 := IterativeInorderTraversal(root9)
	fmt.Printf("\nTest 9 (full tree): %v\n", result9)
	// Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

	fmt.Println("\nAll tests completed!")
}
