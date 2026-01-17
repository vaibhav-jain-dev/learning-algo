/*
Closest BST Value II (Inorder Predecessor & Successor) - Go Solutions

Given a BST and a target value, find the inorder predecessor and successor.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// TreeNode represents a node in a binary search tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: Single Pass Traversal (Iterative)
// ============================================================================
// Time Complexity:  O(h) where h is the height of the tree
// Space Complexity: O(1) - only using constant extra space
//
// WHY THIS IS OPTIMAL:
// - Uses BST property to navigate directly to answer
// - No need for full tree traversal
// - Updates predecessor/successor as we traverse
// ============================================================================

// FindPredecessorSuccessor finds both predecessor and successor in one pass.
//
// Key insight:
// - When current < target: current could be predecessor, go right
// - When current > target: current could be successor, go left
// - When current == target: predecessor is in left subtree (rightmost),
//   successor is in right subtree (leftmost)
func FindPredecessorSuccessor(root *TreeNode, target float64) (int, int) {
	var predecessor, successor *int
	current := root

	// First pass: find potential predecessor and successor
	for current != nil {
		if float64(current.Val) < target {
			// Current is less than target - could be predecessor
			predecessor = &current.Val
			current = current.Right // Look for larger values still < target
		} else if float64(current.Val) > target {
			// Current is greater than target - could be successor
			successor = &current.Val
			current = current.Left // Look for smaller values still > target
		} else {
			// Found exact match - need to find actual pred/succ
			// Predecessor: rightmost in left subtree
			if current.Left != nil {
				pred := current.Left
				for pred.Right != nil {
					pred = pred.Right
				}
				predecessor = &pred.Val
			}
			// Successor: leftmost in right subtree
			if current.Right != nil {
				succ := current.Right
				for succ.Left != nil {
					succ = succ.Left
				}
				successor = &succ.Val
			}
			break
		}
	}

	// Return results (-1 if not found)
	predVal, succVal := -1, -1
	if predecessor != nil {
		predVal = *predecessor
	}
	if successor != nil {
		succVal = *successor
	}

	return predVal, succVal
}

// ============================================================================
// APPROACH 2: Recursive with Cleaner Logic
// ============================================================================
// Time Complexity:  O(h) where h is the height
// Space Complexity: O(h) due to recursion stack
//
// WHY THIS APPROACH:
// - More readable recursive structure
// - Separates predecessor and successor finding
// - Easy to understand and maintain
// ============================================================================

// FindPredecessorSuccessorRecursive finds both using recursive traversal.
func FindPredecessorSuccessorRecursive(root *TreeNode, target float64) (int, int) {
	pred := findPredecessor(root, target)
	succ := findSuccessor(root, target)
	return pred, succ
}

// findPredecessor finds the largest value less than target
func findPredecessor(root *TreeNode, target float64) int {
	var predecessor *TreeNode
	current := root

	for current != nil {
		if float64(current.Val) < target {
			predecessor = current // Candidate found
			current = current.Right
		} else {
			current = current.Left
		}
	}

	if predecessor == nil {
		return -1
	}
	return predecessor.Val
}

// findSuccessor finds the smallest value greater than target
func findSuccessor(root *TreeNode, target float64) int {
	var successor *TreeNode
	current := root

	for current != nil {
		if float64(current.Val) > target {
			successor = current // Candidate found
			current = current.Left
		} else {
			current = current.Right
		}
	}

	if successor == nil {
		return -1
	}
	return successor.Val
}

// ============================================================================
// APPROACH 3: Inorder Traversal with Array
// ============================================================================
// Time Complexity:  O(n) - visit all nodes
// Space Complexity: O(n) - store all values
//
// WHEN TO USE:
// - When you need full sorted order for other operations
// - Simpler to understand and debug
// - When tree is small and performance is not critical
// ============================================================================

// FindPredecessorSuccessorInorder uses inorder traversal to find both.
func FindPredecessorSuccessorInorder(root *TreeNode, target float64) (int, int) {
	// Get sorted array via inorder traversal
	var values []int
	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		inorder(node.Left)
		values = append(values, node.Val)
		inorder(node.Right)
	}
	inorder(root)

	// Find predecessor and successor in sorted array
	predecessor, successor := -1, -1

	for _, val := range values {
		if float64(val) < target {
			predecessor = val // Keep updating - last one will be largest < target
		} else if float64(val) > target && successor == -1 {
			successor = val // First one > target is the smallest
			break
		}
	}

	return predecessor, successor
}

// ============================================================================
// APPROACH 4: Find Closest with Both Neighbors
// ============================================================================
// Time Complexity:  O(h)
// Space Complexity: O(1)
//
// BONUS FUNCTIONALITY:
// - Returns predecessor, successor, AND the closest value
// - Useful when you need to pick one or compare
// ============================================================================

// Result holds predecessor, successor, and closest value
type Result struct {
	Predecessor int
	Successor   int
	Closest     int
}

// FindClosestWithNeighbors returns predecessor, successor, and closest value.
func FindClosestWithNeighbors(root *TreeNode, target float64) Result {
	result := Result{
		Predecessor: -1,
		Successor:   -1,
		Closest:     root.Val,
	}

	current := root
	minDiff := math.Abs(target - float64(root.Val))

	for current != nil {
		// Update closest if current is closer
		currDiff := math.Abs(target - float64(current.Val))
		if currDiff < minDiff {
			minDiff = currDiff
			result.Closest = current.Val
		}

		if float64(current.Val) < target {
			result.Predecessor = current.Val
			current = current.Right
		} else if float64(current.Val) > target {
			result.Successor = current.Val
			current = current.Left
		} else {
			// Exact match
			result.Closest = current.Val

			// Find predecessor in left subtree
			if current.Left != nil {
				pred := current.Left
				for pred.Right != nil {
					pred = pred.Right
				}
				result.Predecessor = pred.Val
			}

			// Find successor in right subtree
			if current.Right != nil {
				succ := current.Right
				for succ.Left != nil {
					succ = succ.Left
				}
				result.Successor = succ.Val
			}
			break
		}
	}

	return result
}

// ============================================================================
// HELPER: Build BST from array (for testing)
// ============================================================================

func buildBST(values []int) *TreeNode {
	if len(values) == 0 {
		return nil
	}

	root := &TreeNode{Val: values[0]}

	for i := 1; i < len(values); i++ {
		insertBST(root, values[i])
	}

	return root
}

func insertBST(root *TreeNode, val int) {
	current := root
	for {
		if val < current.Val {
			if current.Left == nil {
				current.Left = &TreeNode{Val: val}
				return
			}
			current = current.Left
		} else {
			if current.Right == nil {
				current.Right = &TreeNode{Val: val}
				return
			}
			current = current.Right
		}
	}
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("CLOSEST BST VALUE II (PREDECESSOR & SUCCESSOR) - TEST RESULTS")
	fmt.Println("======================================================================")

	//        5
	//       / \
	//      3   7
	//     / \ / \
	//    2  4 6  8
	root := buildBST([]int{5, 3, 7, 2, 4, 6, 8})

	testCases := []struct {
		target   float64
		expPred  int
		expSucc  int
		desc     string
	}{
		{4.0, 3, 5, "Target exists in tree"},
		{4.5, 4, 5, "Target between two nodes"},
		{1.0, -1, 2, "Target smaller than all"},
		{9.0, 8, -1, "Target larger than all"},
		{5.0, 4, 6, "Target is root"},
		{2.5, 2, 3, "Target in left subtree"},
		{7.5, 7, 8, "Target in right subtree"},
	}

	fmt.Println("\nUsing BST: [5, 3, 7, 2, 4, 6, 8]")
	fmt.Println("        5")
	fmt.Println("       / \\")
	fmt.Println("      3   7")
	fmt.Println("     / \\ / \\")
	fmt.Println("    2  4 6  8")
	fmt.Println()

	for _, tc := range testCases {
		fmt.Printf("\n--- Test: %s (target = %.1f) ---\n", tc.desc, tc.target)
		fmt.Printf("Expected: pred=%d, succ=%d\n", tc.expPred, tc.expSucc)

		pred1, succ1 := FindPredecessorSuccessor(root, tc.target)
		fmt.Printf("Single Pass:   pred=%d, succ=%d", pred1, succ1)
		if pred1 == tc.expPred && succ1 == tc.expSucc {
			fmt.Println(" ✓")
		} else {
			fmt.Println(" ✗")
		}

		pred2, succ2 := FindPredecessorSuccessorRecursive(root, tc.target)
		fmt.Printf("Recursive:     pred=%d, succ=%d", pred2, succ2)
		if pred2 == tc.expPred && succ2 == tc.expSucc {
			fmt.Println(" ✓")
		} else {
			fmt.Println(" ✗")
		}

		pred3, succ3 := FindPredecessorSuccessorInorder(root, tc.target)
		fmt.Printf("Inorder:       pred=%d, succ=%d", pred3, succ3)
		if pred3 == tc.expPred && succ3 == tc.expSucc {
			fmt.Println(" ✓")
		} else {
			fmt.Println(" ✗")
		}
	}

	// Bonus: Show closest with neighbors
	fmt.Println("\n======================================================================")
	fmt.Println("BONUS: Find Closest with Both Neighbors")
	fmt.Println("======================================================================")

	target := 4.3
	result := FindClosestWithNeighbors(root, target)
	fmt.Printf("\nTarget: %.1f\n", target)
	fmt.Printf("Predecessor: %d\n", result.Predecessor)
	fmt.Printf("Successor:   %d\n", result.Successor)
	fmt.Printf("Closest:     %d\n", result.Closest)

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
