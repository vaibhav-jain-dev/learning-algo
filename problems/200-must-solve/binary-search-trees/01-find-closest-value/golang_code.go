/*
Find Closest Value in BST - Go Solution

Find the value in a BST closest to a given target.

Time Complexity: O(log n) average, O(n) worst case
Space Complexity: O(1) iterative
*/

package main

import (
	"fmt"
	"math"
)

// BST represents a node in Binary Search Tree
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// FindClosestValueInBST finds closest value to target in BST
func FindClosestValueInBST(tree *BST, target int) int {
	return findClosestHelper(tree, target, tree.Value)
}

func findClosestHelper(tree *BST, target, closest int) int {
	if tree == nil {
		return closest
	}

	if abs(target-closest) > abs(target-tree.Value) {
		closest = tree.Value
	}

	if target < tree.Value {
		return findClosestHelper(tree.Left, target, closest)
	} else if target > tree.Value {
		return findClosestHelper(tree.Right, target, closest)
	}
	return closest // Exact match
}

// FindClosestValueIterative iterative solution with O(1) space
func FindClosestValueIterative(tree *BST, target int) int {
	closest := tree.Value
	current := tree

	for current != nil {
		if abs(target-closest) > abs(target-current.Value) {
			closest = current.Value
		}

		if target < current.Value {
			current = current.Left
		} else if target > current.Value {
			current = current.Right
		} else {
			break // Exact match
		}
	}

	return closest
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// Insert inserts a value into BST
func (tree *BST) Insert(value int) *BST {
	if value < tree.Value {
		if tree.Left == nil {
			tree.Left = &BST{Value: value}
		} else {
			tree.Left.Insert(value)
		}
	} else {
		if tree.Right == nil {
			tree.Right = &BST{Value: value}
		} else {
			tree.Right.Insert(value)
		}
	}
	return tree
}

func main() {
	// Build test tree:
	//        10
	//       /  \
	//      5    15
	//     / \   / \
	//    2   5 13  22
	//   /       \
	//  1         14

	root := &BST{Value: 10}
	root.Left = &BST{Value: 5}
	root.Right = &BST{Value: 15}
	root.Left.Left = &BST{Value: 2}
	root.Left.Right = &BST{Value: 5}
	root.Left.Left.Left = &BST{Value: 1}
	root.Right.Left = &BST{Value: 13}
	root.Right.Right = &BST{Value: 22}
	root.Right.Left.Right = &BST{Value: 14}

	// Test 1: Target between nodes
	result1 := FindClosestValueInBST(root, 12)
	fmt.Printf("Test 1 (target=12): %d\n", result1) // Expected: 13

	// Test 2: Target at node
	result2 := FindClosestValueInBST(root, 10)
	fmt.Printf("Test 2 (target=10): %d\n", result2) // Expected: 10

	// Test 3: Target at leaf
	result3 := FindClosestValueInBST(root, 14)
	fmt.Printf("Test 3 (target=14): %d\n", result3) // Expected: 14

	// Test 4: Target less than all
	result4 := FindClosestValueInBST(root, 0)
	fmt.Printf("Test 4 (target=0): %d\n", result4) // Expected: 1

	// Test 5: Target greater than all
	result5 := FindClosestValueInBST(root, 100)
	fmt.Printf("Test 5 (target=100): %d\n", result5) // Expected: 22

	// Test 6: Compare iterative vs recursive
	result6a := FindClosestValueInBST(root, 4)
	result6b := FindClosestValueIterative(root, 4)
	fmt.Printf("\nTest 6 (target=4):\n")
	fmt.Printf("  Recursive: %d\n", result6a)
	fmt.Printf("  Iterative: %d\n", result6b)
	// Expected: 5

	// Test 7: Simple BST
	simpleBST := &BST{Value: 5}
	simpleBST.Insert(3).Insert(7).Insert(2).Insert(4).Insert(6).Insert(8)
	result7 := FindClosestValueInBST(simpleBST, 4)
	fmt.Printf("\nTest 7 (target=4): %d\n", result7) // Expected: 4

	// Test 8: Float target simulation (use closest integer logic)
	fmt.Printf("\nTest 8: Finding closest to 4.5\n")
	diff4 := math.Abs(4.5 - 4)
	diff5 := math.Abs(4.5 - 5)
	fmt.Printf("  Distance to 4: %.1f, Distance to 5: %.1f\n", diff4, diff5)

	fmt.Println("\nAll tests completed!")
}
