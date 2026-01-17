/*
BST Traversal - Go Solution

Implement in-order, pre-order, and post-order BST traversals.

Time Complexity: O(n)
Space Complexity: O(n) for result, O(d) for call stack
*/

package main

import "fmt"

// BST represents a node in Binary Search Tree
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// InOrderTraverse performs in-order traversal: Left -> Node -> Right
func InOrderTraverse(tree *BST, array []int) []int {
	if tree != nil {
		array = InOrderTraverse(tree.Left, array)
		array = append(array, tree.Value)
		array = InOrderTraverse(tree.Right, array)
	}
	return array
}

// PreOrderTraverse performs pre-order traversal: Node -> Left -> Right
func PreOrderTraverse(tree *BST, array []int) []int {
	if tree != nil {
		array = append(array, tree.Value)
		array = PreOrderTraverse(tree.Left, array)
		array = PreOrderTraverse(tree.Right, array)
	}
	return array
}

// PostOrderTraverse performs post-order traversal: Left -> Right -> Node
func PostOrderTraverse(tree *BST, array []int) []int {
	if tree != nil {
		array = PostOrderTraverse(tree.Left, array)
		array = PostOrderTraverse(tree.Right, array)
		array = append(array, tree.Value)
	}
	return array
}

// InOrderIterative performs iterative in-order traversal using stack
func InOrderIterative(tree *BST) []int {
	result := []int{}
	stack := []*BST{}
	current := tree

	for current != nil || len(stack) > 0 {
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, current.Value)
		current = current.Right
	}

	return result
}

// PreOrderIterative performs iterative pre-order traversal using stack
func PreOrderIterative(tree *BST) []int {
	if tree == nil {
		return []int{}
	}

	result := []int{}
	stack := []*BST{tree}

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, node.Value)
		// Push right first so left is processed first
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}

	return result
}

// PostOrderIterative performs iterative post-order traversal using two stacks
func PostOrderIterative(tree *BST) []int {
	if tree == nil {
		return []int{}
	}

	result := []int{}
	stack1 := []*BST{tree}
	stack2 := []*BST{}

	for len(stack1) > 0 {
		node := stack1[len(stack1)-1]
		stack1 = stack1[:len(stack1)-1]
		stack2 = append(stack2, node)
		if node.Left != nil {
			stack1 = append(stack1, node.Left)
		}
		if node.Right != nil {
			stack1 = append(stack1, node.Right)
		}
	}

	for len(stack2) > 0 {
		result = append(result, stack2[len(stack2)-1].Value)
		stack2 = stack2[:len(stack2)-1]
	}

	return result
}

func main() {
	// Build test tree:
	//        10
	//       /  \
	//      5    15
	//     / \     \
	//    2   5    22
	//   /
	//  1

	root := &BST{Value: 10}
	root.Left = &BST{Value: 5}
	root.Right = &BST{Value: 15}
	root.Left.Left = &BST{Value: 2}
	root.Left.Right = &BST{Value: 5}
	root.Left.Left.Left = &BST{Value: 1}
	root.Right.Right = &BST{Value: 22}

	// Test recursive traversals
	fmt.Println("Recursive Traversals:")
	fmt.Printf("In-order:   %v\n", InOrderTraverse(root, []int{}))
	// Expected: [1, 2, 5, 5, 10, 15, 22]

	fmt.Printf("Pre-order:  %v\n", PreOrderTraverse(root, []int{}))
	// Expected: [10, 5, 2, 1, 5, 15, 22]

	fmt.Printf("Post-order: %v\n", PostOrderTraverse(root, []int{}))
	// Expected: [1, 2, 5, 5, 22, 15, 10]

	// Test iterative traversals
	fmt.Println("\nIterative Traversals:")
	fmt.Printf("In-order:   %v\n", InOrderIterative(root))
	fmt.Printf("Pre-order:  %v\n", PreOrderIterative(root))
	fmt.Printf("Post-order: %v\n", PostOrderIterative(root))

	// Test empty tree
	fmt.Println("\nEmpty tree tests:")
	fmt.Printf("In-order of nil:   %v\n", InOrderTraverse(nil, []int{}))
	fmt.Printf("Pre-order of nil:  %v\n", PreOrderTraverse(nil, []int{}))
	fmt.Printf("Post-order of nil: %v\n", PostOrderTraverse(nil, []int{}))

	// Test single node
	single := &BST{Value: 42}
	fmt.Println("\nSingle node tests:")
	fmt.Printf("In-order:   %v\n", InOrderTraverse(single, []int{}))
	fmt.Printf("Pre-order:  %v\n", PreOrderTraverse(single, []int{}))
	fmt.Printf("Post-order: %v\n", PostOrderTraverse(single, []int{}))

	fmt.Println("\nAll tests completed!")
}
