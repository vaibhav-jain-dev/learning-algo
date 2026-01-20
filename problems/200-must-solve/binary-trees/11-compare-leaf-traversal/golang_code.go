/*
Compare Leaf Traversal - Go Solution

Compare the left-to-right leaf sequences of two binary trees.

Time Complexity: O(n + m)
Space Complexity: O(h1 + h2) for optimal stack approach
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// CompareLeafTraversal compares leaf traversals of two binary trees
func CompareLeafTraversal(tree1, tree2 *BinaryTree) bool {
	// Use stacks for iterative traversal
	var stack1, stack2 []*BinaryTree

	if tree1 != nil {
		stack1 = []*BinaryTree{tree1}
	}
	if tree2 != nil {
		stack2 = []*BinaryTree{tree2}
	}

	for len(stack1) > 0 && len(stack2) > 0 {
		leaf1 := getNextLeaf(&stack1)
		leaf2 := getNextLeaf(&stack2)

		// Both exhausted at same time
		if leaf1 == nil && leaf2 == nil {
			return true
		}

		// One exhausted before other, or values differ
		if leaf1 == nil || leaf2 == nil {
			return false
		}

		if leaf1.Value != leaf2.Value {
			return false
		}
	}

	// Check if both stacks are empty (and no more leaves)
	leaf1 := getNextLeaf(&stack1)
	leaf2 := getNextLeaf(&stack2)
	return leaf1 == nil && leaf2 == nil
}

// getNextLeaf advances stack to next leaf and returns it
func getNextLeaf(stack *[]*BinaryTree) *BinaryTree {
	for len(*stack) > 0 {
		// Pop from stack
		node := (*stack)[len(*stack)-1]
		*stack = (*stack)[:len(*stack)-1]

		// Check if leaf
		if node.Left == nil && node.Right == nil {
			return node
		}

		// Add children (right first so left is processed first)
		if node.Right != nil {
			*stack = append(*stack, node.Right)
		}
		if node.Left != nil {
			*stack = append(*stack, node.Left)
		}
	}

	return nil
}

// CompareLeafTraversalSimple uses simple approach with leaf collection
func CompareLeafTraversalSimple(tree1, tree2 *BinaryTree) bool {
	leaves1 := GetLeaves(tree1)
	leaves2 := GetLeaves(tree2)

	if len(leaves1) != len(leaves2) {
		return false
	}

	for i := range leaves1 {
		if leaves1[i] != leaves2[i] {
			return false
		}
	}

	return true
}

// GetLeaves collects all leaf values in left-to-right order
func GetLeaves(node *BinaryTree) []int {
	leaves := []int{}
	collectLeaves(node, &leaves)
	return leaves
}

// collectLeaves is a helper to collect leaves recursively
func collectLeaves(node *BinaryTree, leaves *[]int) {
	if node == nil {
		return
	}

	// If leaf, add to list
	if node.Left == nil && node.Right == nil {
		*leaves = append(*leaves, node.Value)
		return
	}

	// Recurse left then right
	collectLeaves(node.Left, leaves)
	collectLeaves(node.Right, leaves)
}

func main() {
	// Build Tree 1:
	//        1
	//      /   \
	//     2     3
	//    / \     \
	//   4   5     6
	//      / \
	//     7   8

	tree1 := &BinaryTree{Value: 1}
	tree1.Left = &BinaryTree{Value: 2}
	tree1.Right = &BinaryTree{Value: 3}
	tree1.Left.Left = &BinaryTree{Value: 4}
	tree1.Left.Right = &BinaryTree{Value: 5}
	tree1.Right.Right = &BinaryTree{Value: 6}
	tree1.Left.Right.Left = &BinaryTree{Value: 7}
	tree1.Left.Right.Right = &BinaryTree{Value: 8}

	// Build Tree 2 (same leaves, different structure):
	//        1
	//      /   \
	//     2     3
	//    / \   /
	//   4   7 8
	//        \
	//         5
	//          \
	//           6

	tree2 := &BinaryTree{Value: 1}
	tree2.Left = &BinaryTree{Value: 2}
	tree2.Right = &BinaryTree{Value: 3}
	tree2.Left.Left = &BinaryTree{Value: 4}
	tree2.Left.Right = &BinaryTree{Value: 7}
	tree2.Right.Left = &BinaryTree{Value: 8}
	tree2.Left.Right.Right = &BinaryTree{Value: 5}
	tree2.Left.Right.Right.Right = &BinaryTree{Value: 6}

	fmt.Println("Tree 1 leaves:", GetLeaves(tree1))
	fmt.Println("Tree 2 leaves:", GetLeaves(tree2))

	// Test 1: Same leaf traversal
	result1 := CompareLeafTraversal(tree1, tree2)
	fmt.Printf("\nTest 1 (same leaves): %v\n", result1)
	// Expected: true

	// Test 2: Simple approach
	result2 := CompareLeafTraversalSimple(tree1, tree2)
	fmt.Printf("Test 2 (simple approach): %v\n", result2)

	// Test 3: Different leaves
	tree3 := &BinaryTree{Value: 1}
	tree3.Left = &BinaryTree{Value: 2}
	tree3.Right = &BinaryTree{Value: 3}

	tree4 := &BinaryTree{Value: 1}
	tree4.Left = &BinaryTree{Value: 3}
	tree4.Right = &BinaryTree{Value: 2}

	fmt.Printf("\nTree 3 leaves: %v\n", GetLeaves(tree3)) // [2 3]
	fmt.Printf("Tree 4 leaves: %v\n", GetLeaves(tree4))   // [3 2]

	result3 := CompareLeafTraversal(tree3, tree4)
	fmt.Printf("Test 3 (different order): %v\n", result3)
	// Expected: false

	// Test 4: Same single node trees
	single1 := &BinaryTree{Value: 5}
	single2 := &BinaryTree{Value: 5}
	result4 := CompareLeafTraversal(single1, single2)
	fmt.Printf("\nTest 4 (same single nodes): %v\n", result4)
	// Expected: true

	// Test 5: Different single node trees
	single3 := &BinaryTree{Value: 5}
	single4 := &BinaryTree{Value: 6}
	result5 := CompareLeafTraversal(single3, single4)
	fmt.Printf("Test 5 (different single nodes): %v\n", result5)
	// Expected: false

	// Test 6: Empty trees
	result6 := CompareLeafTraversal(nil, nil)
	fmt.Printf("\nTest 6 (both empty): %v\n", result6)
	// Expected: true

	// Test 7: One empty, one not
	result7 := CompareLeafTraversal(tree1, nil)
	fmt.Printf("Test 7 (one empty): %v\n", result7)
	// Expected: false

	// Test 8: Different number of leaves
	tree5 := &BinaryTree{Value: 1}
	tree5.Left = &BinaryTree{Value: 2}
	tree5.Right = &BinaryTree{Value: 3}
	tree5.Left.Left = &BinaryTree{Value: 4} // Extra leaf

	result8 := CompareLeafTraversal(tree3, tree5)
	fmt.Printf("\nTest 8 (different leaf count): %v\n", result8)
	fmt.Printf("  Tree 3 leaves: %v\n", GetLeaves(tree3))
	fmt.Printf("  Tree 5 leaves: %v\n", GetLeaves(tree5))
	// Expected: false

	fmt.Println("\nAll tests completed!")
}
