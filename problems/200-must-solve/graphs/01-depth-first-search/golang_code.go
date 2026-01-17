/*
Depth First Search - Go Solution

Traverse a graph/tree using DFS and collect node names.

Time Complexity: O(v + e) where v is vertices, e is edges
Space Complexity: O(v) for the result and call stack
*/

package main

import "fmt"

// Node represents a node in the tree/graph
type Node struct {
	Name     string
	Children []*Node
}

// NewNode creates a new node with given name
func NewNode(name string) *Node {
	return &Node{Name: name, Children: []*Node{}}
}

// AddChild adds a child node and returns the parent for chaining
func (n *Node) AddChild(name string) *Node {
	n.Children = append(n.Children, NewNode(name))
	return n
}

// DepthFirstSearch traverses tree using DFS, collecting node names
func (n *Node) DepthFirstSearch(array []string) []string {
	array = append(array, n.Name)
	for _, child := range n.Children {
		array = child.DepthFirstSearch(array)
	}
	return array
}

// DFSIterative performs iterative DFS using explicit stack
func DFSIterative(root *Node) []string {
	if root == nil {
		return []string{}
	}

	result := []string{}
	stack := []*Node{root}

	for len(stack) > 0 {
		// Pop from stack
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		result = append(result, node.Name)

		// Add children in reverse order so leftmost is processed first
		for i := len(node.Children) - 1; i >= 0; i-- {
			stack = append(stack, node.Children[i])
		}
	}

	return result
}

func main() {
	// Build test tree:
	//        A
	//      / | \
	//     B  C  D
	//    / \   / \
	//   E   F G   H
	//      / \  \
	//     I   J  K

	root := NewNode("A")
	root.AddChild("B").AddChild("C").AddChild("D")
	root.Children[0].AddChild("E").AddChild("F")
	root.Children[0].Children[1].AddChild("I").AddChild("J")
	root.Children[2].AddChild("G").AddChild("H")
	root.Children[2].Children[0].AddChild("K")

	// Test 1: Recursive DFS
	result1 := root.DepthFirstSearch([]string{})
	fmt.Printf("Test 1 (Recursive DFS): %v\n", result1)
	// Expected: ["A", "B", "E", "F", "I", "J", "C", "D", "G", "K", "H"]

	// Test 2: Iterative DFS
	result2 := DFSIterative(root)
	fmt.Printf("Test 2 (Iterative DFS): %v\n", result2)

	// Test 3: Single node
	single := NewNode("X")
	result3 := single.DepthFirstSearch([]string{})
	fmt.Printf("Test 3 (Single node): %v\n", result3)
	// Expected: ["X"]

	// Test 4: Linear tree
	linear := NewNode("1")
	current := linear
	for i := 2; i < 6; i++ {
		child := NewNode(fmt.Sprintf("%d", i))
		current.Children = append(current.Children, child)
		current = child
	}
	result4 := linear.DepthFirstSearch([]string{})
	fmt.Printf("Test 4 (Linear tree): %v\n", result4)
	// Expected: ["1", "2", "3", "4", "5"]

	// Test 5: Wide tree
	wide := NewNode("ROOT")
	for i := 0; i < 5; i++ {
		wide.AddChild(fmt.Sprintf("CHILD_%d", i))
	}
	result5 := wide.DepthFirstSearch([]string{})
	fmt.Printf("Test 5 (Wide tree): %v\n", result5)
	// Expected: ["ROOT", "CHILD_0", "CHILD_1", "CHILD_2", "CHILD_3", "CHILD_4"]

	fmt.Println("\nAll tests completed!")
}
