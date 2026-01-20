/*
Merge Binary Trees - Go Solution

Merge two binary trees by summing overlapping nodes.

Time Complexity: O(min(n, m))
Space Complexity: O(min(h1, h2)) for recursion stack
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// MergeBinaryTrees merges two trees by adding overlapping nodes (modifies tree1)
func MergeBinaryTrees(tree1, tree2 *BinaryTree) *BinaryTree {
	// Base cases
	if tree1 == nil {
		return tree2
	}
	if tree2 == nil {
		return tree1
	}

	// Merge values
	tree1.Value += tree2.Value

	// Recursively merge children
	tree1.Left = MergeBinaryTrees(tree1.Left, tree2.Left)
	tree1.Right = MergeBinaryTrees(tree1.Right, tree2.Right)

	return tree1
}

// MergeBinaryTreesNew creates a new merged tree (non-destructive)
func MergeBinaryTreesNew(tree1, tree2 *BinaryTree) *BinaryTree {
	if tree1 == nil && tree2 == nil {
		return nil
	}
	if tree1 == nil {
		return CopyTree(tree2)
	}
	if tree2 == nil {
		return CopyTree(tree1)
	}

	// Create new node with sum
	merged := &BinaryTree{Value: tree1.Value + tree2.Value}

	// Recursively merge children
	merged.Left = MergeBinaryTreesNew(tree1.Left, tree2.Left)
	merged.Right = MergeBinaryTreesNew(tree1.Right, tree2.Right)

	return merged
}

// CopyTree creates a deep copy of a tree
func CopyTree(node *BinaryTree) *BinaryTree {
	if node == nil {
		return nil
	}

	newNode := &BinaryTree{Value: node.Value}
	newNode.Left = CopyTree(node.Left)
	newNode.Right = CopyTree(node.Right)
	return newNode
}

// MergeBinaryTreesIterative uses iterative approach with stack
func MergeBinaryTreesIterative(tree1, tree2 *BinaryTree) *BinaryTree {
	if tree1 == nil {
		return tree2
	}
	if tree2 == nil {
		return tree1
	}

	type pair struct {
		node1 *BinaryTree
		node2 *BinaryTree
	}

	stack := []pair{{tree1, tree2}}

	for len(stack) > 0 {
		// Pop from stack
		p := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		node1, node2 := p.node1, p.node2

		// node2 is nil means nothing to merge
		if node2 == nil {
			continue
		}

		// Add values
		node1.Value += node2.Value

		// Handle left children
		if node1.Left == nil {
			node1.Left = node2.Left
		} else {
			stack = append(stack, pair{node1.Left, node2.Left})
		}

		// Handle right children
		if node1.Right == nil {
			node1.Right = node2.Right
		} else {
			stack = append(stack, pair{node1.Right, node2.Right})
		}
	}

	return tree1
}

// PrintTreeLevelOrder prints tree in level order
func PrintTreeLevelOrder(root *BinaryTree) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	queue := []*BinaryTree{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		level := []int{}

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]

			level = append(level, node.Value)

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		result = append(result, level)
	}

	return result
}

func main() {
	// Build Tree 1:
	//      1
	//     / \
	//    3   2
	//   /
	//  5

	tree1 := &BinaryTree{Value: 1}
	tree1.Left = &BinaryTree{Value: 3}
	tree1.Right = &BinaryTree{Value: 2}
	tree1.Left.Left = &BinaryTree{Value: 5}

	// Build Tree 2:
	//      2
	//     / \
	//    1   3
	//     \   \
	//      4   7

	tree2 := &BinaryTree{Value: 2}
	tree2.Left = &BinaryTree{Value: 1}
	tree2.Right = &BinaryTree{Value: 3}
	tree2.Left.Right = &BinaryTree{Value: 4}
	tree2.Right.Right = &BinaryTree{Value: 7}

	fmt.Println("Tree 1:", PrintTreeLevelOrder(tree1))
	fmt.Println("Tree 2:", PrintTreeLevelOrder(tree2))

	// Test 1: Create new merged tree (non-destructive)
	merged := MergeBinaryTreesNew(tree1, tree2)
	fmt.Printf("\nTest 1 - Merged (new tree): %v\n", PrintTreeLevelOrder(merged))
	// Expected: [[3] [4 5] [5 4 7]]

	// Rebuild trees for destructive test
	tree1Copy := &BinaryTree{Value: 1}
	tree1Copy.Left = &BinaryTree{Value: 3}
	tree1Copy.Right = &BinaryTree{Value: 2}
	tree1Copy.Left.Left = &BinaryTree{Value: 5}

	tree2Copy := &BinaryTree{Value: 2}
	tree2Copy.Left = &BinaryTree{Value: 1}
	tree2Copy.Right = &BinaryTree{Value: 3}
	tree2Copy.Left.Right = &BinaryTree{Value: 4}
	tree2Copy.Right.Right = &BinaryTree{Value: 7}

	// Test 2: In-place merge (recursive)
	result2 := MergeBinaryTrees(tree1Copy, tree2Copy)
	fmt.Printf("Test 2 - Merged (in-place): %v\n", PrintTreeLevelOrder(result2))

	// Test 3: Empty trees
	result3 := MergeBinaryTrees(nil, nil)
	fmt.Printf("\nTest 3 - Both empty: %v\n", result3)
	// Expected: <nil>

	// Test 4: One empty tree
	single := &BinaryTree{Value: 5}
	result4 := MergeBinaryTrees(nil, single)
	fmt.Printf("Test 4 - One empty: %v\n", PrintTreeLevelOrder(result4))
	// Expected: [[5]]

	// Test 5: Iterative approach
	tree3 := &BinaryTree{Value: 1}
	tree3.Left = &BinaryTree{Value: 2}
	tree3.Right = &BinaryTree{Value: 3}

	tree4 := &BinaryTree{Value: 1}
	tree4.Left = &BinaryTree{Value: 2}
	tree4.Right = &BinaryTree{Value: 3}

	result5 := MergeBinaryTreesIterative(tree3, tree4)
	fmt.Printf("\nTest 5 - Iterative: %v\n", PrintTreeLevelOrder(result5))
	// Expected: [[2] [4 6]]

	// Test 6: Different depths
	deep := &BinaryTree{Value: 1}
	deep.Left = &BinaryTree{Value: 2}
	deep.Left.Left = &BinaryTree{Value: 3}
	deep.Left.Left.Left = &BinaryTree{Value: 4}

	shallow := &BinaryTree{Value: 10}
	shallow.Right = &BinaryTree{Value: 20}

	result6 := MergeBinaryTreesNew(deep, shallow)
	fmt.Printf("\nTest 6 - Different depths: %v\n", PrintTreeLevelOrder(result6))
	// Expected: [[11] [2 20] [3] [4]]

	fmt.Println("\nAll tests completed!")
}
