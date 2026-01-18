/*
Breadth First Search - Go Solution

Traverse a graph/tree using BFS and collect node names.

Time Complexity: O(v + e) where v is vertices, e is edges
Space Complexity: O(v) for the queue and result
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

// BreadthFirstSearch traverses tree using BFS, collecting node names
func (n *Node) BreadthFirstSearch(array []string) []string {
	queue := []*Node{n}

	for len(queue) > 0 {
		// Dequeue
		current := queue[0]
		queue = queue[1:]

		// Add name to result
		array = append(array, current.Name)

		// Enqueue all children
		for _, child := range current.Children {
			queue = append(queue, child)
		}
	}

	return array
}

// BFSLevelOrder returns nodes grouped by level
func BFSLevelOrder(root *Node) [][]string {
	if root == nil {
		return [][]string{}
	}

	result := [][]string{}
	queue := []*Node{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		level := []string{}

		for i := 0; i < levelSize; i++ {
			// Dequeue
			current := queue[0]
			queue = queue[1:]

			level = append(level, current.Name)

			// Enqueue children
			for _, child := range current.Children {
				queue = append(queue, child)
			}
		}

		result = append(result, level)
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

	// Test 1: BFS
	result1 := root.BreadthFirstSearch([]string{})
	fmt.Printf("Test 1 (BFS): %v\n", result1)
	// Expected: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]

	// Test 2: Level Order
	result2 := BFSLevelOrder(root)
	fmt.Printf("Test 2 (Level Order): %v\n", result2)
	// Expected: [["A"], ["B", "C", "D"], ["E", "F", "G", "H"], ["I", "J", "K"]]

	// Test 3: Single node
	single := NewNode("X")
	result3 := single.BreadthFirstSearch([]string{})
	fmt.Printf("Test 3 (Single node): %v\n", result3)
	// Expected: ["X"]

	// Test 4: Wide tree
	wide := NewNode("ROOT")
	for i := 0; i < 5; i++ {
		wide.AddChild(fmt.Sprintf("CHILD_%d", i))
	}
	result4 := wide.BreadthFirstSearch([]string{})
	fmt.Printf("Test 4 (Wide tree): %v\n", result4)
	// Expected: ["ROOT", "CHILD_0", "CHILD_1", "CHILD_2", "CHILD_3", "CHILD_4"]

	fmt.Println("\nAll tests completed!")
}
