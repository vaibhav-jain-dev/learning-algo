/*
Clone Graph - Go Solutions

Given a reference to a node in a connected undirected graph,
return a deep copy (clone) of the graph.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// Node represents a graph node
type Node struct {
	Val       int
	Neighbors []*Node
}

// NewNode creates a new graph node
func NewNode(val int) *Node {
	return &Node{Val: val, Neighbors: []*Node{}}
}

// ============================================================================
// APPROACH 1: DFS with HashMap
// ============================================================================
// Time Complexity:  O(N + E) where N is nodes, E is edges
// Space Complexity: O(N) for the HashMap and recursion stack
//
// WHY THIS IS BEST:
// - Natural recursive structure for graph traversal
// - HashMap prevents infinite loops in cyclic graphs
// - Clean and intuitive implementation
// ============================================================================

// CloneGraphDFS clones graph using recursive DFS with memoization.
//
// Key Insight: Use HashMap to track which nodes have been cloned.
// If a node is already in the map, return its clone (avoid duplicates).
//
// Visual:
//
//	Original: 1 -- 2       Clone: 1' -- 2'
//	          |    |              |     |
//	          4 -- 3              4' -- 3'
//
//	HashMap tracks: {1->1', 2->2', 3->3', 4->4'}
func CloneGraphDFS(node *Node) *Node {
	if node == nil {
		return nil
	}

	// Map from original node to its clone
	visited := make(map[*Node]*Node)

	var dfs func(*Node) *Node
	dfs = func(n *Node) *Node {
		// If already cloned, return the clone
		if clone, exists := visited[n]; exists {
			return clone
		}

		// Create clone of current node
		clone := NewNode(n.Val)
		visited[n] = clone

		// Recursively clone all neighbors
		for _, neighbor := range n.Neighbors {
			clone.Neighbors = append(clone.Neighbors, dfs(neighbor))
		}

		return clone
	}

	return dfs(node)
}

// ============================================================================
// APPROACH 2: BFS with HashMap
// ============================================================================
// Time Complexity:  O(N + E)
// Space Complexity: O(N) for HashMap and queue
//
// WHEN TO USE:
// - Prefer iterative solutions
// - Avoid potential stack overflow
// - Level-by-level processing
// ============================================================================

// CloneGraphBFS clones graph using iterative BFS.
func CloneGraphBFS(node *Node) *Node {
	if node == nil {
		return nil
	}

	// Map from original node to its clone
	visited := make(map[*Node]*Node)

	// Create clone of starting node
	visited[node] = NewNode(node.Val)

	// BFS queue
	queue := []*Node{node}

	for len(queue) > 0 {
		// Dequeue
		current := queue[0]
		queue = queue[1:]

		// Process all neighbors
		for _, neighbor := range current.Neighbors {
			// If neighbor hasn't been cloned yet
			if _, exists := visited[neighbor]; !exists {
				// Create clone and add to queue
				visited[neighbor] = NewNode(neighbor.Val)
				queue = append(queue, neighbor)
			}

			// Add cloned neighbor to current clone's neighbors
			visited[current].Neighbors = append(
				visited[current].Neighbors,
				visited[neighbor],
			)
		}
	}

	return visited[node]
}

// ============================================================================
// APPROACH 3: Array-based (when node values are 1 to N)
// ============================================================================
// Time Complexity:  O(N + E)
// Space Complexity: O(N) for the clone array
//
// WHEN TO USE:
// - Node values are guaranteed to be 1 to N
// - Slightly more memory efficient than HashMap
// ============================================================================

// CloneGraphArray clones graph using array indexing.
// Assumes node values are 1-indexed and unique.
func CloneGraphArray(node *Node) *Node {
	if node == nil {
		return nil
	}

	// First, find max node value to size our array
	maxVal := 0
	visited := make(map[*Node]bool)
	var findMax func(*Node)
	findMax = func(n *Node) {
		if n == nil || visited[n] {
			return
		}
		visited[n] = true
		if n.Val > maxVal {
			maxVal = n.Val
		}
		for _, neighbor := range n.Neighbors {
			findMax(neighbor)
		}
	}
	findMax(node)

	// Array to store clones (1-indexed)
	clones := make([]*Node, maxVal+1)

	var dfs func(*Node) *Node
	dfs = func(n *Node) *Node {
		if n == nil {
			return nil
		}

		// Already cloned
		if clones[n.Val] != nil {
			return clones[n.Val]
		}

		// Create clone
		clone := NewNode(n.Val)
		clones[n.Val] = clone

		// Clone neighbors
		for _, neighbor := range n.Neighbors {
			clone.Neighbors = append(clone.Neighbors, dfs(neighbor))
		}

		return clone
	}

	return dfs(node)
}

// ============================================================================
// HELPER: Build graph from adjacency list
// ============================================================================

// BuildGraph creates a graph from adjacency list representation.
// adjList[i] contains neighbors of node i+1 (1-indexed nodes)
func BuildGraph(adjList [][]int) *Node {
	if len(adjList) == 0 {
		return nil
	}

	// Create all nodes first
	nodes := make([]*Node, len(adjList)+1) // 1-indexed
	for i := 1; i <= len(adjList); i++ {
		nodes[i] = NewNode(i)
	}

	// Add neighbors
	for i, neighbors := range adjList {
		nodeIdx := i + 1 // 1-indexed
		for _, neighborVal := range neighbors {
			nodes[nodeIdx].Neighbors = append(nodes[nodeIdx].Neighbors, nodes[neighborVal])
		}
	}

	return nodes[1]
}

// ============================================================================
// HELPER: Convert graph to adjacency list (for verification)
// ============================================================================

func GraphToAdjList(node *Node) [][]int {
	if node == nil {
		return [][]int{}
	}

	visited := make(map[*Node]bool)
	result := make(map[int][]int)
	maxNode := 0

	var dfs func(*Node)
	dfs = func(n *Node) {
		if n == nil || visited[n] {
			return
		}
		visited[n] = true

		if n.Val > maxNode {
			maxNode = n.Val
		}

		result[n.Val] = []int{}
		for _, neighbor := range n.Neighbors {
			result[n.Val] = append(result[n.Val], neighbor.Val)
			dfs(neighbor)
		}
	}
	dfs(node)

	// Convert map to slice
	adjList := make([][]int, maxNode)
	for i := 1; i <= maxNode; i++ {
		adjList[i-1] = result[i]
	}

	return adjList
}

// ============================================================================
// HELPER: Verify clone is deep copy (no shared references)
// ============================================================================

func IsDeepCopy(original, clone *Node) bool {
	if original == nil && clone == nil {
		return true
	}
	if original == nil || clone == nil {
		return false
	}

	origNodes := make(map[*Node]bool)
	cloneNodes := make(map[*Node]bool)

	var collectNodes func(*Node, map[*Node]bool)
	collectNodes = func(n *Node, nodes map[*Node]bool) {
		if n == nil || nodes[n] {
			return
		}
		nodes[n] = true
		for _, neighbor := range n.Neighbors {
			collectNodes(neighbor, nodes)
		}
	}

	collectNodes(original, origNodes)
	collectNodes(clone, cloneNodes)

	// Check no shared references
	for node := range origNodes {
		if cloneNodes[node] {
			return false // Shared reference found!
		}
	}

	return true
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("CLONE GRAPH - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		adjList [][]int
		desc    string
	}{
		{
			[][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}},
			"4-node cycle",
		},
		{
			[][]int{{}},
			"Single node, no neighbors",
		},
		{
			[][]int{{2}, {1, 3}, {2}},
			"Linear 3-node graph",
		},
		{
			[][]int{{2, 3}, {1, 3}, {1, 2}},
			"Triangle graph",
		},
	}

	approaches := []struct {
		name string
		fn   func(*Node) *Node
	}{
		{"DFS with HashMap", CloneGraphDFS},
		{"BFS with HashMap", CloneGraphBFS},
		{"Array-based", CloneGraphArray},
	}

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")

		for _, tc := range testCases {
			original := BuildGraph(tc.adjList)
			clone := approach.fn(original)

			// Verify structure matches
			origAdj := GraphToAdjList(original)
			cloneAdj := GraphToAdjList(clone)

			structureMatch := fmt.Sprintf("%v", origAdj) == fmt.Sprintf("%v", cloneAdj)
			isDeep := IsDeepCopy(original, clone)

			status := "PASS"
			if !structureMatch || !isDeep {
				status = "FAIL"
			}

			fmt.Printf("  [%s] %s: structure=%v, deep_copy=%v\n",
				status, tc.desc, structureMatch, isDeep)
		}
	}

	// Test nil case
	fmt.Println("\nEdge Case - nil input:")
	fmt.Println("--------------------------------------------------")
	nilClone := CloneGraphDFS(nil)
	status := "PASS"
	if nilClone != nil {
		status = "FAIL"
	}
	fmt.Printf("  [%s] nil input returns nil: %v\n", status, nilClone == nil)

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLE")
	fmt.Println("======================================================================")

	// Example from problem
	adjList := [][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}}
	fmt.Println("\nInput adjacency list: [[2,4],[1,3],[2,4],[1,3]]")
	fmt.Println("This represents a 4-node graph:")
	fmt.Println("  Node 1 connects to: 2, 4")
	fmt.Println("  Node 2 connects to: 1, 3")
	fmt.Println("  Node 3 connects to: 2, 4")
	fmt.Println("  Node 4 connects to: 1, 3")

	original := BuildGraph(adjList)
	clone := CloneGraphDFS(original)

	fmt.Printf("\nCloned adjacency list: %v\n", GraphToAdjList(clone))
	fmt.Printf("Is deep copy (no shared refs): %v\n", IsDeepCopy(original, clone))

	fmt.Println("\nAll tests completed!")
}
