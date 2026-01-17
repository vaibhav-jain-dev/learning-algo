/*
Branch Sums - Go Solution

Calculate the sum of each branch (root to leaf path) in a binary tree.

Time Complexity: O(n)
Space Complexity: O(n) for result, O(h) for call stack
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// BranchSums calculates branch sums from leftmost to rightmost
func BranchSums(root *BinaryTree) []int {
	sums := []int{}
	calculateBranchSums(root, 0, &sums)
	return sums
}

func calculateBranchSums(node *BinaryTree, runningSum int, sums *[]int) {
	if node == nil {
		return
	}

	newRunningSum := runningSum + node.Value

	// If leaf node, add sum to result
	if node.Left == nil && node.Right == nil {
		*sums = append(*sums, newRunningSum)
		return
	}

	// Recurse on children (left first for correct order)
	calculateBranchSums(node.Left, newRunningSum, sums)
	calculateBranchSums(node.Right, newRunningSum, sums)
}

// BranchSumsIterative uses stack for iterative approach
func BranchSumsIterative(root *BinaryTree) []int {
	if root == nil {
		return []int{}
	}

	type stackItem struct {
		node       *BinaryTree
		runningSum int
	}

	sums := []int{}
	stack := []stackItem{{root, 0}}

	for len(stack) > 0 {
		// Pop from stack
		item := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		newSum := item.runningSum + item.node.Value

		// Leaf node
		if item.node.Left == nil && item.node.Right == nil {
			sums = append(sums, newSum)
		} else {
			// Add right first so left is processed first (LIFO)
			if item.node.Right != nil {
				stack = append(stack, stackItem{item.node.Right, newSum})
			}
			if item.node.Left != nil {
				stack = append(stack, stackItem{item.node.Left, newSum})
			}
		}
	}

	return sums
}

func main() {
	// Build test tree:
	//        1
	//      /   \
	//     2     3
	//    / \   / \
	//   4   5 6   7
	//  / \   \
	// 8   9  10

	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2}
	root.Right = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right.Left = &BinaryTree{Value: 6}
	root.Right.Right = &BinaryTree{Value: 7}
	root.Left.Left.Left = &BinaryTree{Value: 8}
	root.Left.Left.Right = &BinaryTree{Value: 9}
	root.Left.Right.Right = &BinaryTree{Value: 10}

	// Test 1: Standard tree
	result1 := BranchSums(root)
	fmt.Printf("Test 1: %v\n", result1)
	// Expected: [15, 16, 18, 10, 11]

	// Test 2: Iterative approach
	result2 := BranchSumsIterative(root)
	fmt.Printf("Test 2 (iterative): %v\n", result2)

	// Test 3: Single node
	single := &BinaryTree{Value: 5}
	result3 := BranchSums(single)
	fmt.Printf("Test 3 (single node): %v\n", result3)
	// Expected: [5]

	// Test 4: Linear tree (all left)
	linear := &BinaryTree{Value: 1}
	linear.Left = &BinaryTree{Value: 2}
	linear.Left.Left = &BinaryTree{Value: 3}
	result4 := BranchSums(linear)
	fmt.Printf("Test 4 (linear left): %v\n", result4)
	// Expected: [6]

	// Test 5: Complete small tree
	small := &BinaryTree{Value: 1}
	small.Left = &BinaryTree{Value: 2}
	small.Right = &BinaryTree{Value: 3}
	result5 := BranchSums(small)
	fmt.Printf("Test 5 (small tree): %v\n", result5)
	// Expected: [3, 4]

	// Test 6: Empty tree
	result6 := BranchSums(nil)
	fmt.Printf("Test 6 (empty): %v\n", result6)
	// Expected: []

	// Test 7: Verify sums
	fmt.Println("\nVerification of Test 1:")
	fmt.Printf("  1+2+4+8 = %d\n", 1+2+4+8)
	fmt.Printf("  1+2+4+9 = %d\n", 1+2+4+9)
	fmt.Printf("  1+2+5+10 = %d\n", 1+2+5+10)
	fmt.Printf("  1+3+6 = %d\n", 1+3+6)
	fmt.Printf("  1+3+7 = %d\n", 1+3+7)

	fmt.Println("\nAll tests completed!")
}
