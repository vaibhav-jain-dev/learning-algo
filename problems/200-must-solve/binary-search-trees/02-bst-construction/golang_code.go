/*
BST Construction - Go Solution

Implement a Binary Search Tree with insert, contains, and remove operations.

Time Complexity: O(log n) average, O(n) worst case
Space Complexity: O(1)
*/

package main

import "fmt"

// BST represents a node in Binary Search Tree
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// Insert adds a value to the BST
func (tree *BST) Insert(value int) *BST {
	current := tree
	for {
		if value < current.Value {
			if current.Left == nil {
				current.Left = &BST{Value: value}
				break
			}
			current = current.Left
		} else {
			if current.Right == nil {
				current.Right = &BST{Value: value}
				break
			}
			current = current.Right
		}
	}
	return tree
}

// Contains checks if value exists in BST
func (tree *BST) Contains(value int) bool {
	current := tree
	for current != nil {
		if value < current.Value {
			current = current.Left
		} else if value > current.Value {
			current = current.Right
		} else {
			return true
		}
	}
	return false
}

// Remove removes a value from BST
func (tree *BST) Remove(value int, parent *BST) *BST {
	current := tree
	for current != nil {
		if value < current.Value {
			parent = current
			current = current.Left
		} else if value > current.Value {
			parent = current
			current = current.Right
		} else {
			// Found the node to remove
			// Case 1: Two children
			if current.Left != nil && current.Right != nil {
				current.Value = current.Right.getMinValue()
				current.Right.Remove(current.Value, current)
			} else if parent == nil {
				// Case 2: Root node
				if current.Left != nil {
					current.Value = current.Left.Value
					current.Right = current.Left.Right
					current.Left = current.Left.Left
				} else if current.Right != nil {
					current.Value = current.Right.Value
					current.Left = current.Right.Left
					current.Right = current.Right.Right
				}
				// else: single node tree
			} else if parent.Left == current {
				// Case 3: One child or no children
				if current.Left != nil {
					parent.Left = current.Left
				} else {
					parent.Left = current.Right
				}
			} else if parent.Right == current {
				if current.Left != nil {
					parent.Right = current.Left
				} else {
					parent.Right = current.Right
				}
			}
			break
		}
	}
	return tree
}

func (tree *BST) getMinValue() int {
	current := tree
	for current.Left != nil {
		current = current.Left
	}
	return current.Value
}

// InorderTraversal returns inorder traversal as slice
func (tree *BST) InorderTraversal() []int {
	result := []int{}
	tree.inorderHelper(&result)
	return result
}

func (tree *BST) inorderHelper(result *[]int) {
	if tree.Left != nil {
		tree.Left.inorderHelper(result)
	}
	*result = append(*result, tree.Value)
	if tree.Right != nil {
		tree.Right.inorderHelper(result)
	}
}

func main() {
	// Test 1: Build BST
	bst := &BST{Value: 10}
	bst.Insert(5).Insert(15).Insert(2).Insert(5).Insert(1).Insert(22)
	fmt.Printf("Test 1 - Initial tree (inorder): %v\n", bst.InorderTraversal())
	// Expected: [1, 2, 5, 5, 10, 15, 22]

	// Test 2: Contains
	fmt.Printf("\nTest 2 - Contains:\n")
	fmt.Printf("  contains(15): %v\n", bst.Contains(15)) // true
	fmt.Printf("  contains(5): %v\n", bst.Contains(5))   // true
	fmt.Printf("  contains(100): %v\n", bst.Contains(100)) // false

	// Test 3: Insert new value
	bst.Insert(12)
	fmt.Printf("\nTest 3 - After insert(12): %v\n", bst.InorderTraversal())
	// Expected: [1, 2, 5, 5, 10, 12, 15, 22]

	// Test 4: Remove leaf node
	bst.Remove(1, nil)
	fmt.Printf("\nTest 4 - After remove(1): %v\n", bst.InorderTraversal())
	// Expected: [2, 5, 5, 10, 12, 15, 22]

	// Test 5: Remove node with one child
	bst.Remove(2, nil)
	fmt.Printf("\nTest 5 - After remove(2): %v\n", bst.InorderTraversal())

	// Test 6: Remove node with two children
	bstTest := &BST{Value: 10}
	bstTest.Insert(5).Insert(15).Insert(12).Insert(20).Insert(11).Insert(14)
	fmt.Printf("\nTest 6 - Before remove(15): %v\n", bstTest.InorderTraversal())
	bstTest.Remove(15, nil)
	fmt.Printf("After remove(15): %v\n", bstTest.InorderTraversal())

	// Test 7: Remove root
	bstRoot := &BST{Value: 10}
	bstRoot.Insert(5).Insert(15)
	fmt.Printf("\nTest 7 - Before remove(10): %v\n", bstRoot.InorderTraversal())
	bstRoot.Remove(10, nil)
	fmt.Printf("After remove(10): %v\n", bstRoot.InorderTraversal())

	// Test 8: Comprehensive test
	fmt.Println("\n--- Comprehensive Test ---")
	tree := &BST{Value: 50}
	for _, val := range []int{25, 75, 10, 30, 60, 90, 5, 20, 80} {
		tree.Insert(val)
	}
	fmt.Printf("Built tree: %v\n", tree.InorderTraversal())
	fmt.Printf("Contains 30: %v\n", tree.Contains(30))
	fmt.Printf("Contains 55: %v\n", tree.Contains(55))
	tree.Remove(25, nil)
	fmt.Printf("After removing 25: %v\n", tree.InorderTraversal())

	fmt.Println("\nAll tests completed!")
}
