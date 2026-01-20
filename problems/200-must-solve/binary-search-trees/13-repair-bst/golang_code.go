/*
Repair BST - Go Solution

Two nodes in a BST are swapped by mistake. Find and repair them.
Includes O(1) space Morris Traversal solution.

Time Complexity: O(n)
Space Complexity: O(1) for Morris Traversal, O(h) for recursive/iterative
*/

package main

import "fmt"

// TreeNode represents a node in the binary tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// RepairBSTRecursive repairs BST using recursive inorder traversal.
// Time: O(n), Space: O(h) for recursion stack
func RepairBSTRecursive(root *TreeNode) {
	var firstBad, secondBad, prev *TreeNode

	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}

		// Traverse left subtree
		inorder(node.Left)

		// Process current node - check for inversion
		if prev != nil && prev.Val > node.Val {
			if firstBad == nil {
				// First inversion: both nodes are candidates
				firstBad = prev
				secondBad = node
			} else {
				// Second inversion: update secondBad only
				secondBad = node
			}
		}

		prev = node

		// Traverse right subtree
		inorder(node.Right)
	}

	inorder(root)

	// Swap values of the two bad nodes
	if firstBad != nil && secondBad != nil {
		firstBad.Val, secondBad.Val = secondBad.Val, firstBad.Val
	}
}

// RepairBSTIterative repairs BST using iterative inorder with explicit stack.
// Time: O(n), Space: O(h) for stack
func RepairBSTIterative(root *TreeNode) {
	stack := []*TreeNode{}
	current := root
	var prev, firstBad, secondBad *TreeNode

	for len(stack) > 0 || current != nil {
		// Go to leftmost node
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}

		// Process current node
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		// Check for inversion
		if prev != nil && prev.Val > current.Val {
			if firstBad == nil {
				firstBad = prev
				secondBad = current
			} else {
				secondBad = current
			}
		}

		prev = current
		current = current.Right
	}

	// Swap values
	if firstBad != nil && secondBad != nil {
		firstBad.Val, secondBad.Val = secondBad.Val, firstBad.Val
	}
}

// RepairBSTMorris repairs BST using Morris Traversal - O(1) space!
//
// Morris Traversal creates temporary "threads" (links from inorder predecessor
// to current node) to traverse without stack/recursion.
//
// Time: O(n), Space: O(1)
//
// Morris Traversal Steps:
// 1. If no left child: visit node, go right
// 2. If left child exists:
//    a. Find inorder predecessor (rightmost node in left subtree)
//    b. If predecessor.right is nil: create thread, go left
//    c. If predecessor.right is current: remove thread, visit node, go right
func RepairBSTMorris(root *TreeNode) {
	current := root
	var prev, firstBad, secondBad *TreeNode

	for current != nil {
		if current.Left == nil {
			// No left subtree - visit current node
			if prev != nil && prev.Val > current.Val {
				if firstBad == nil {
					firstBad = prev
					secondBad = current
				} else {
					secondBad = current
				}
			}

			prev = current
			current = current.Right
		} else {
			// Has left subtree - find inorder predecessor
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				// Create thread: predecessor points back to current
				predecessor.Right = current
				current = current.Left
			} else {
				// Thread exists - remove it and visit current
				predecessor.Right = nil

				// Visit current node (check for inversion)
				if prev != nil && prev.Val > current.Val {
					if firstBad == nil {
						firstBad = prev
						secondBad = current
					} else {
						secondBad = current
					}
				}

				prev = current
				current = current.Right
			}
		}
	}

	// Swap values of the two bad nodes
	if firstBad != nil && secondBad != nil {
		firstBad.Val, secondBad.Val = secondBad.Val, firstBad.Val
	}
}

// getInorder returns the inorder traversal of the tree as a slice
func getInorder(root *TreeNode) []int {
	result := []int{}
	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node != nil {
			inorder(node.Left)
			result = append(result, node.Val)
			inorder(node.Right)
		}
	}
	inorder(root)
	return result
}

// isValidBST checks if tree is a valid BST
func isValidBST(root *TreeNode) bool {
	values := getInorder(root)
	for i := 1; i < len(values); i++ {
		if values[i] <= values[i-1] {
			return false
		}
	}
	return true
}

// cloneTree creates a deep copy of a tree
func cloneTree(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	newNode := &TreeNode{Val: root.Val}
	newNode.Left = cloneTree(root.Left)
	newNode.Right = cloneTree(root.Right)
	return newNode
}

func main() {
	fmt.Println("=== Repair BST Tests ===")
	fmt.Println()

	// Test 1: Adjacent swap (nodes 1 and 3)
	// Original (broken):  1        Correct:    3
	//                    /                    /
	//                   3          ->        1
	//                    \                    \
	//                     2                    2
	fmt.Println("Test 1: Adjacent swap")
	root1 := &TreeNode{Val: 1}
	root1.Left = &TreeNode{Val: 3}
	root1.Left.Right = &TreeNode{Val: 2}

	fmt.Printf("  Before: %v\n", getInorder(root1))
	fmt.Printf("  Is valid BST: %v\n", isValidBST(root1))

	RepairBSTMorris(root1)

	fmt.Printf("  After:  %v\n", getInorder(root1))
	fmt.Printf("  Is valid BST: %v\n", isValidBST(root1))
	fmt.Println()

	// Test 2: Non-adjacent swap (nodes 2 and 3)
	// Original (broken):  3        Correct:    2
	//                    / \                  / \
	//                   1   4      ->        1   4
	//                      /                    /
	//                     2                    3
	fmt.Println("Test 2: Non-adjacent swap")
	root2 := &TreeNode{Val: 3}
	root2.Left = &TreeNode{Val: 1}
	root2.Right = &TreeNode{Val: 4}
	root2.Right.Left = &TreeNode{Val: 2}

	fmt.Printf("  Before: %v\n", getInorder(root2))
	fmt.Printf("  Is valid BST: %v\n", isValidBST(root2))

	RepairBSTMorris(root2)

	fmt.Printf("  After:  %v\n", getInorder(root2))
	fmt.Printf("  Is valid BST: %v\n", isValidBST(root2))
	fmt.Println()

	// Test 3: Larger tree with swap
	fmt.Println("Test 3: Larger tree with adjacent-in-inorder swap")
	root3 := &TreeNode{Val: 6}
	root3.Left = &TreeNode{Val: 2}
	root3.Right = &TreeNode{Val: 8}
	root3.Left.Left = &TreeNode{Val: 1}
	root3.Left.Right = &TreeNode{Val: 4}
	root3.Left.Right.Left = &TreeNode{Val: 5}  // Should be 3
	root3.Left.Right.Right = &TreeNode{Val: 3} // Should be 5
	root3.Right.Left = &TreeNode{Val: 7}
	root3.Right.Right = &TreeNode{Val: 9}

	fmt.Printf("  Before: %v\n", getInorder(root3))
	fmt.Printf("  Is valid BST: %v\n", isValidBST(root3))

	RepairBSTMorris(root3)

	fmt.Printf("  After:  %v\n", getInorder(root3))
	fmt.Printf("  Is valid BST: %v\n", isValidBST(root3))
	fmt.Println()

	// Test 4: Compare all three methods
	fmt.Println("Test 4: Comparing all three methods")

	// Create a broken BST: swap 2 and 6
	createBrokenTree := func() *TreeNode {
		root := &TreeNode{Val: 4}
		root.Left = &TreeNode{Val: 6} // Should be 2
		root.Right = &TreeNode{Val: 7}
		root.Left.Left = &TreeNode{Val: 1}
		root.Left.Right = &TreeNode{Val: 3}
		return root
	}

	rootRec := createBrokenTree()
	fmt.Printf("  Broken tree inorder: %v\n", getInorder(rootRec))

	// Test recursive
	rootRecCopy := cloneTree(rootRec)
	RepairBSTRecursive(rootRecCopy)
	fmt.Printf("  After recursive repair: %v, valid: %v\n",
		getInorder(rootRecCopy), isValidBST(rootRecCopy))

	// Test iterative
	rootIterCopy := cloneTree(rootRec)
	RepairBSTIterative(rootIterCopy)
	fmt.Printf("  After iterative repair: %v, valid: %v\n",
		getInorder(rootIterCopy), isValidBST(rootIterCopy))

	// Test Morris
	rootMorrisCopy := cloneTree(rootRec)
	RepairBSTMorris(rootMorrisCopy)
	fmt.Printf("  After Morris repair:    %v, valid: %v\n",
		getInorder(rootMorrisCopy), isValidBST(rootMorrisCopy))
	fmt.Println()

	// Test 5: Root is one of the swapped nodes
	fmt.Println("Test 5: Root is swapped")
	root5 := &TreeNode{Val: 1}
	root5.Left = &TreeNode{Val: 2}
	root5.Right = &TreeNode{Val: 6}
	root5.Right.Left = &TreeNode{Val: 5}
	root5.Right.Right = &TreeNode{Val: 7}

	fmt.Printf("  Before: %v\n", getInorder(root5))
	fmt.Printf("  Is valid BST: %v\n", isValidBST(root5))

	RepairBSTMorris(root5)

	fmt.Printf("  After:  %v\n", getInorder(root5))
	fmt.Printf("  Is valid BST: %v\n", isValidBST(root5))

	fmt.Println()
	fmt.Println("All tests completed!")
}
