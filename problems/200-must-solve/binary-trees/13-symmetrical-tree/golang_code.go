/*
Symmetrical Tree - Go Solution

Check if a binary tree is symmetric (mirror of itself).

Time Complexity: O(n)
Space Complexity: O(h) for recursive, O(n) for iterative
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// SymmetricalTree checks if a binary tree is symmetric
func SymmetricalTree(root *BinaryTree) bool {
	if root == nil {
		return true
	}

	return isMirror(root.Left, root.Right)
}

// isMirror checks if two subtrees are mirror images
func isMirror(left, right *BinaryTree) bool {
	// Both nil - symmetric
	if left == nil && right == nil {
		return true
	}

	// One nil, one not - not symmetric
	if left == nil || right == nil {
		return false
	}

	// Values must match, and children must be mirrored
	return left.Value == right.Value &&
		isMirror(left.Left, right.Right) &&
		isMirror(left.Right, right.Left)
}

// SymmetricalTreeIterative uses a queue for iterative approach
func SymmetricalTreeIterative(root *BinaryTree) bool {
	if root == nil {
		return true
	}

	type pair struct {
		left  *BinaryTree
		right *BinaryTree
	}

	queue := []pair{{root.Left, root.Right}}

	for len(queue) > 0 {
		// Dequeue
		p := queue[0]
		queue = queue[1:]

		left, right := p.left, p.right

		// Both nil - continue
		if left == nil && right == nil {
			continue
		}

		// One nil or values differ - not symmetric
		if left == nil || right == nil {
			return false
		}

		if left.Value != right.Value {
			return false
		}

		// Add children in mirrored order
		queue = append(queue, pair{left.Left, right.Right})
		queue = append(queue, pair{left.Right, right.Left})
	}

	return true
}

// SymmetricalTreeLevelCheck uses level-by-level palindrome checking
func SymmetricalTreeLevelCheck(root *BinaryTree) bool {
	if root == nil {
		return true
	}

	// Use pointers to distinguish nil from actual nodes
	type nodePtr struct {
		node *BinaryTree
	}

	queue := []nodePtr{{root}}

	for len(queue) > 0 {
		levelSize := len(queue)
		levelValues := make([]*int, levelSize)

		for i := 0; i < levelSize; i++ {
			np := queue[0]
			queue = queue[1:]

			if np.node == nil {
				levelValues[i] = nil
			} else {
				val := np.node.Value
				levelValues[i] = &val
				queue = append(queue, nodePtr{np.node.Left})
				queue = append(queue, nodePtr{np.node.Right})
			}
		}

		// Check if level is palindrome
		for i := 0; i < len(levelValues)/2; i++ {
			left := levelValues[i]
			right := levelValues[len(levelValues)-1-i]

			if left == nil && right == nil {
				continue
			}
			if left == nil || right == nil {
				return false
			}
			if *left != *right {
				return false
			}
		}

		// Check if all nil (we're done)
		allNil := true
		for _, v := range levelValues {
			if v != nil {
				allNil = false
				break
			}
		}
		if allNil {
			break
		}
	}

	return true
}

func main() {
	// Build symmetric tree:
	//        1
	//      /   \
	//     2     2
	//    / \   / \
	//   3   4 4   3

	symmetric := &BinaryTree{Value: 1}
	symmetric.Left = &BinaryTree{Value: 2}
	symmetric.Right = &BinaryTree{Value: 2}
	symmetric.Left.Left = &BinaryTree{Value: 3}
	symmetric.Left.Right = &BinaryTree{Value: 4}
	symmetric.Right.Left = &BinaryTree{Value: 4}
	symmetric.Right.Right = &BinaryTree{Value: 3}

	// Test 1: Symmetric tree (recursive)
	result1 := SymmetricalTree(symmetric)
	fmt.Printf("Test 1 (symmetric tree, recursive): %v\n", result1)
	// Expected: true

	// Test 2: Symmetric tree (iterative)
	result2 := SymmetricalTreeIterative(symmetric)
	fmt.Printf("Test 2 (symmetric tree, iterative): %v\n", result2)
	// Expected: true

	// Build non-symmetric tree:
	//        1
	//      /   \
	//     2     2
	//      \     \
	//       3     3

	nonSymmetric := &BinaryTree{Value: 1}
	nonSymmetric.Left = &BinaryTree{Value: 2}
	nonSymmetric.Right = &BinaryTree{Value: 2}
	nonSymmetric.Left.Right = &BinaryTree{Value: 3}
	nonSymmetric.Right.Right = &BinaryTree{Value: 3}

	// Test 3: Non-symmetric tree
	result3 := SymmetricalTree(nonSymmetric)
	fmt.Printf("\nTest 3 (non-symmetric tree): %v\n", result3)
	// Expected: false

	// Test 4: Single node
	single := &BinaryTree{Value: 1}
	result4 := SymmetricalTree(single)
	fmt.Printf("\nTest 4 (single node): %v\n", result4)
	// Expected: true

	// Test 5: Empty tree
	result5 := SymmetricalTree(nil)
	fmt.Printf("Test 5 (empty tree): %v\n", result5)
	// Expected: true

	// Test 6: Two-level symmetric
	twoLevel := &BinaryTree{Value: 1}
	twoLevel.Left = &BinaryTree{Value: 2}
	twoLevel.Right = &BinaryTree{Value: 2}
	result6 := SymmetricalTree(twoLevel)
	fmt.Printf("\nTest 6 (two-level symmetric): %v\n", result6)
	// Expected: true

	// Test 7: Different values
	diffValues := &BinaryTree{Value: 1}
	diffValues.Left = &BinaryTree{Value: 2}
	diffValues.Right = &BinaryTree{Value: 3}
	result7 := SymmetricalTree(diffValues)
	fmt.Printf("Test 7 (different values): %v\n", result7)
	// Expected: false

	// Test 8: Level check approach
	result8 := SymmetricalTreeLevelCheck(symmetric)
	result9 := SymmetricalTreeLevelCheck(nonSymmetric)
	fmt.Printf("\nTest 8 (level check - symmetric): %v\n", result8)
	fmt.Printf("Test 9 (level check - non-symmetric): %v\n", result9)

	// Test 10: Deeper symmetric tree
	deeper := &BinaryTree{Value: 1}
	deeper.Left = &BinaryTree{Value: 2}
	deeper.Right = &BinaryTree{Value: 2}
	deeper.Left.Left = &BinaryTree{Value: 3}
	deeper.Left.Right = &BinaryTree{Value: 4}
	deeper.Right.Left = &BinaryTree{Value: 4}
	deeper.Right.Right = &BinaryTree{Value: 3}
	deeper.Left.Left.Left = &BinaryTree{Value: 5}
	deeper.Right.Right.Right = &BinaryTree{Value: 5}

	result10 := SymmetricalTree(deeper)
	fmt.Printf("\nTest 10 (deeper symmetric): %v\n", result10)
	// Expected: true

	// Test 11: Only left subtree
	leftOnly := &BinaryTree{Value: 1}
	leftOnly.Left = &BinaryTree{Value: 2}
	result11 := SymmetricalTree(leftOnly)
	fmt.Printf("Test 11 (only left subtree): %v\n", result11)
	// Expected: false

	fmt.Println("\nAll tests completed!")
}
