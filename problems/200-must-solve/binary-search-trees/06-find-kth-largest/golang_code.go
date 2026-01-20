/*
Find Kth Largest Value in BST - Go Solution

Find the kth largest value in a Binary Search Tree.

Time Complexity: O(h + k) where h is height
Space Complexity: O(h) for recursion stack
*/

package main

import "fmt"

// BST represents a node in Binary Search Tree
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// FindKthLargestValueInBST finds kth largest value using reverse inorder
func FindKthLargestValueInBST(tree *BST, k int) int {
	result := -1
	count := 0
	reverseInorder(tree, k, &count, &result)
	return result
}

// reverseInorder performs right -> node -> left traversal
func reverseInorder(node *BST, k int, count *int, result *int) {
	if node == nil || *result != -1 {
		return
	}

	// Visit right subtree first (larger values)
	reverseInorder(node.Right, k, count, result)

	// Process current node
	if *result == -1 {
		*count++
		if *count == k {
			*result = node.Value
			return
		}
	}

	// Visit left subtree (smaller values)
	reverseInorder(node.Left, k, count, result)
}

// FindKthLargestIterative uses stack for iterative reverse inorder
func FindKthLargestIterative(tree *BST, k int) int {
	stack := []*BST{}
	current := tree
	count := 0

	for len(stack) > 0 || current != nil {
		// Go to rightmost node
		for current != nil {
			stack = append(stack, current)
			current = current.Right
		}

		// Process node
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		count++

		if count == k {
			return current.Value
		}

		// Move to left subtree
		current = current.Left
	}

	return -1 // Should not reach if k is valid
}

// FindKthLargestWithCount uses node count to determine which subtree to search
func FindKthLargestWithCount(tree *BST, k int) int {
	return findKth(tree, k)
}

func countNodes(node *BST) int {
	if node == nil {
		return 0
	}
	return 1 + countNodes(node.Left) + countNodes(node.Right)
}

func findKth(node *BST, k int) int {
	// Count nodes in right subtree
	rightCount := countNodes(node.Right)

	if k <= rightCount {
		// kth largest is in right subtree
		return findKth(node.Right, k)
	} else if k == rightCount+1 {
		// Current node is kth largest
		return node.Value
	}
	// kth largest is in left subtree
	return findKth(node.Left, k-rightCount-1)
}

func main() {
	// Build test tree:
	//        15
	//       /  \
	//      5    20
	//     / \   / \
	//    2   5 17  22
	//   /
	//  1

	root := &BST{Value: 15}
	root.Left = &BST{Value: 5}
	root.Right = &BST{Value: 20}
	root.Left.Left = &BST{Value: 2}
	root.Left.Right = &BST{Value: 5}
	root.Left.Left.Left = &BST{Value: 1}
	root.Right.Left = &BST{Value: 17}
	root.Right.Right = &BST{Value: 22}

	// Values in descending order: [22, 20, 17, 15, 5, 5, 2, 1]

	// Test 1: k = 3
	result1 := FindKthLargestValueInBST(root, 3)
	fmt.Printf("Test 1 (k=3): %d\n", result1) // Expected: 17

	// Test 2: k = 1 (largest)
	result2 := FindKthLargestValueInBST(root, 1)
	fmt.Printf("Test 2 (k=1): %d\n", result2) // Expected: 22

	// Test 3: k = 5 (first 5)
	result3 := FindKthLargestValueInBST(root, 5)
	fmt.Printf("Test 3 (k=5): %d\n", result3) // Expected: 5

	// Test 4: k = 6 (second 5)
	result4 := FindKthLargestValueInBST(root, 6)
	fmt.Printf("Test 4 (k=6): %d\n", result4) // Expected: 5

	// Test 5: k = 8 (smallest)
	result5 := FindKthLargestValueInBST(root, 8)
	fmt.Printf("Test 5 (k=8): %d\n", result5) // Expected: 1

	// Test 6: Single node
	single := &BST{Value: 10}
	result6 := FindKthLargestValueInBST(single, 1)
	fmt.Printf("Test 6 (single node, k=1): %d\n", result6) // Expected: 10

	// Test 7: Compare methods
	fmt.Println("\n--- Method Comparison ---")
	for k := 1; k <= 8; k++ {
		recursive := FindKthLargestValueInBST(root, k)
		iterative := FindKthLargestIterative(root, k)
		withCount := FindKthLargestWithCount(root, k)
		fmt.Printf("k=%d: recursive=%d, iterative=%d, with_count=%d\n",
			k, recursive, iterative, withCount)
	}

	fmt.Println("\nAll tests completed!")
}
