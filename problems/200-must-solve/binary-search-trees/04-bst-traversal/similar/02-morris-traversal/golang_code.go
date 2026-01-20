/*
Morris Traversal - Go Solutions

Implement Morris Traversal for O(1) space inorder and preorder traversals.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// TreeNode represents a node in a binary tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// MORRIS INORDER TRAVERSAL
// ============================================================================
// Time Complexity:  O(n) - each edge traversed at most twice
// Space Complexity: O(1) - no stack or recursion
//
// HOW IT WORKS:
// 1. If no left child: output current, go right
// 2. If left child exists:
//    - Find inorder predecessor (rightmost in left subtree)
//    - If predecessor.right is null: create thread to current, go left
//    - If predecessor.right is current: remove thread, output current, go right
// ============================================================================

// MorrisInorder performs Morris inorder traversal: O(n) time, O(1) space
func MorrisInorder(root *TreeNode) []int {
	var result []int
	current := root

	for current != nil {
		if current.Left == nil {
			// No left subtree: output current and go right
			result = append(result, current.Val)
			current = current.Right
		} else {
			// Find inorder predecessor (rightmost node in left subtree)
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				// Create thread: predecessor points back to current
				predecessor.Right = current
				current = current.Left
			} else {
				// Thread exists: we've returned from left subtree
				// Remove thread, output current, go right
				predecessor.Right = nil
				result = append(result, current.Val)
				current = current.Right
			}
		}
	}

	return result
}

// ============================================================================
// MORRIS PREORDER TRAVERSAL
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// KEY DIFFERENCE FROM INORDER:
// - Output current BEFORE going left (when creating thread)
// - Output current when no left child exists
// ============================================================================

// MorrisPreorder performs Morris preorder traversal: O(n) time, O(1) space
func MorrisPreorder(root *TreeNode) []int {
	var result []int
	current := root

	for current != nil {
		if current.Left == nil {
			// No left subtree: output current and go right
			result = append(result, current.Val)
			current = current.Right
		} else {
			// Find inorder predecessor
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				// Create thread and OUTPUT before going left
				result = append(result, current.Val)
				predecessor.Right = current
				current = current.Left
			} else {
				// Thread exists: we've returned, just remove and go right
				predecessor.Right = nil
				current = current.Right
			}
		}
	}

	return result
}

// ============================================================================
// MORRIS TRAVERSAL WITH CALLBACK (Functional Style)
// ============================================================================

// MorrisInorderWithCallback performs Morris inorder with callback function
func MorrisInorderWithCallback(root *TreeNode, callback func(int)) {
	current := root

	for current != nil {
		if current.Left == nil {
			callback(current.Val)
			current = current.Right
		} else {
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				predecessor.Right = current
				current = current.Left
			} else {
				predecessor.Right = nil
				callback(current.Val)
				current = current.Right
			}
		}
	}
}

// ============================================================================
// MORRIS TRAVERSAL WITH CHANNEL (Go Idiomatic Iterator)
// ============================================================================

// MorrisInorderChannel returns a channel that yields inorder values
func MorrisInorderChannel(root *TreeNode) <-chan int {
	ch := make(chan int)

	go func() {
		defer close(ch)

		current := root
		for current != nil {
			if current.Left == nil {
				ch <- current.Val
				current = current.Right
			} else {
				predecessor := current.Left
				for predecessor.Right != nil && predecessor.Right != current {
					predecessor = predecessor.Right
				}

				if predecessor.Right == nil {
					predecessor.Right = current
					current = current.Left
				} else {
					predecessor.Right = nil
					ch <- current.Val
					current = current.Right
				}
			}
		}
	}()

	return ch
}

// ============================================================================
// PRACTICAL APPLICATION: Find kth Smallest in BST using Morris
// ============================================================================
// Time: O(n) worst case, O(k) average
// Space: O(1)
// ============================================================================

// KthSmallestMorris finds kth smallest element in BST using Morris traversal
func KthSmallestMorris(root *TreeNode, k int) int {
	current := root
	count := 0

	for current != nil {
		if current.Left == nil {
			count++
			if count == k {
				return current.Val
			}
			current = current.Right
		} else {
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				predecessor.Right = current
				current = current.Left
			} else {
				predecessor.Right = nil
				count++
				if count == k {
					return current.Val
				}
				current = current.Right
			}
		}
	}

	return -1 // k is larger than tree size
}

// ============================================================================
// PRACTICAL APPLICATION: Validate BST using Morris
// ============================================================================
// Time: O(n)
// Space: O(1)
// ============================================================================

// IsValidBSTMorris validates BST using Morris traversal
func IsValidBSTMorris(root *TreeNode) bool {
	current := root
	prevVal := -1 << 63 // math.MinInt64

	for current != nil {
		if current.Left == nil {
			if current.Val <= prevVal {
				return false
			}
			prevVal = current.Val
			current = current.Right
		} else {
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				predecessor.Right = current
				current = current.Left
			} else {
				predecessor.Right = nil
				if current.Val <= prevVal {
					return false
				}
				prevVal = current.Val
				current = current.Right
			}
		}
	}

	return true
}

// ============================================================================
// PRACTICAL APPLICATION: Count Nodes in Range using Morris
// ============================================================================

// CountNodesInRangeMorris counts nodes in [low, high] using Morris traversal
func CountNodesInRangeMorris(root *TreeNode, low, high int) int {
	count := 0
	current := root

	for current != nil {
		if current.Left == nil {
			if current.Val >= low && current.Val <= high {
				count++
			}
			current = current.Right
		} else {
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				predecessor.Right = current
				current = current.Left
			} else {
				predecessor.Right = nil
				if current.Val >= low && current.Val <= high {
					count++
				}
				current = current.Right
			}
		}
	}

	return count
}

// ============================================================================
// HELPER: Build tree from slice for testing
// ============================================================================

func buildTree(values []interface{}) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}

	root := &TreeNode{Val: values[0].(int)}
	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Left)
		}
		i++

		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

// treeToSlice converts tree back to level-order slice for verification
func treeToSlice(root *TreeNode) []interface{} {
	if root == nil {
		return []interface{}{}
	}

	var result []interface{}
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]

		if node != nil {
			result = append(result, node.Val)
			queue = append(queue, node.Left)
			queue = append(queue, node.Right)
		} else {
			result = append(result, nil)
		}
	}

	// Remove trailing nils
	for len(result) > 0 && result[len(result)-1] == nil {
		result = result[:len(result)-1]
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("MORRIS TRAVERSAL - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		values      []interface{}
		description string
	}{
		{[]interface{}{4, 2, 6, 1, 3, 5, 7}, "Complete BST"},
		{[]interface{}{1, 2, 3, 4, 5, nil, 6}, "General tree"},
		{[]interface{}{1}, "Single node"},
		{[]interface{}{1, 2, nil, 3, nil, 4}, "Left-skewed"},
		{[]interface{}{1, nil, 2, nil, 3, nil, 4}, "Right-skewed"},
	}

	for _, tc := range testCases {
		fmt.Printf("\n%s\n", tc.description)
		fmt.Printf("Tree (level-order): %v\n", tc.values)

		root := buildTree(tc.values)

		// Morris Inorder
		inorder := MorrisInorder(root)
		fmt.Printf("  Morris Inorder:  %v\n", inorder)

		// Verify tree is restored
		restored := treeToSlice(root)
		treeOK := "OK"
		if fmt.Sprintf("%v", restored) != fmt.Sprintf("%v", tc.values) {
			treeOK = fmt.Sprintf("MODIFIED: %v", restored)
		}
		fmt.Printf("  Tree restored: %s\n", treeOK)

		// Morris Preorder
		root = buildTree(tc.values) // Rebuild for safety
		preorder := MorrisPreorder(root)
		fmt.Printf("  Morris Preorder: %v\n", preorder)

		// Test callback
		root = buildTree(tc.values)
		var collected []int
		MorrisInorderWithCallback(root, func(val int) {
			collected = append(collected, val)
		})
		fmt.Printf("  Callback Inorder: %v\n", collected)

		// Test channel
		root = buildTree(tc.values)
		var chanResult []int
		for val := range MorrisInorderChannel(root) {
			chanResult = append(chanResult, val)
		}
		fmt.Printf("  Channel Inorder:  %v\n", chanResult)
	}

	// Test practical applications
	fmt.Println("\n----------------------------------------------------------------------")
	fmt.Println("Practical Applications")
	fmt.Println("----------------------------------------------------------------------")

	// kth smallest
	bst := buildTree([]interface{}{5, 3, 7, 2, 4, 6, 8})
	fmt.Printf("\nBST: [5, 3, 7, 2, 4, 6, 8]\n")
	for k := 1; k <= 7; k++ {
		result := KthSmallestMorris(bst, k)
		fmt.Printf("  %dth smallest: %d\n", k, result)
	}

	// Validate BST
	fmt.Println("\nBST Validation:")
	validBST := buildTree([]interface{}{4, 2, 6, 1, 3, 5, 7})
	fmt.Printf("  [4, 2, 6, 1, 3, 5, 7] is valid BST: %v\n", IsValidBSTMorris(validBST))

	invalidBST := buildTree([]interface{}{4, 2, 6, 1, 8, 5, 7}) // 8 > 4 in left subtree
	fmt.Printf("  [4, 2, 6, 1, 8, 5, 7] is valid BST: %v\n", IsValidBSTMorris(invalidBST))

	// Count nodes in range
	fmt.Println("\nCount Nodes in Range:")
	bst = buildTree([]interface{}{10, 5, 15, 3, 7, 12, 18})
	fmt.Printf("  BST: [10, 5, 15, 3, 7, 12, 18]\n")
	fmt.Printf("  Count in [5, 12]: %d\n", CountNodesInRangeMorris(bst, 5, 12))
	fmt.Printf("  Count in [1, 20]: %d\n", CountNodesInRangeMorris(bst, 1, 20))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
