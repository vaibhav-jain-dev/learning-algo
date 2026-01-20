/*
Clone Graph - Go Solutions

Given a reference to a node in a connected undirected graph, return a deep copy (clone).

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// Node represents a node in an undirected graph
type Node struct {
	Val       int
	Neighbors []*Node
}

// ============================================================================
// APPROACH 1: DFS with HashMap - RECOMMENDED
// ============================================================================
// Time Complexity:  O(N + E) - visit each node and edge once
// Space Complexity: O(N) - hash map stores all cloned nodes
//
// WHY THIS IS BEST:
// - Natural recursive structure matches graph traversal
// - HashMap ensures each node is cloned exactly once
// - Clean and easy to understand
// ============================================================================

// CloneGraphDFS clones graph using DFS with memoization.
//
// Key Insight: Use hash map to track cloned nodes, avoiding cycles.
//
// Visual:
//
//	Original:     Cloned:
//	1 -- 2        1' -- 2'
//	|    |   =>   |     |
//	4 -- 3        4' -- 3'
func CloneGraphDFS(node *Node) *Node {
	if node == nil {
		return nil
	}

	// Maps original node -> cloned node
	cloned := make(map[*Node]*Node)

	var dfs func(original *Node) *Node
	dfs = func(original *Node) *Node {
		// If already cloned, return the clone
		if clone, exists := cloned[original]; exists {
			return clone
		}

		// Create clone (without neighbors initially)
		clone := &Node{Val: original.Val}
		cloned[original] = clone

		// Recursively clone all neighbors
		for _, neighbor := range original.Neighbors {
			clone.Neighbors = append(clone.Neighbors, dfs(neighbor))
		}

		return clone
	}

	return dfs(node)
}

// ============================================================================
// APPROACH 2: BFS with HashMap
// ============================================================================
// Time Complexity:  O(N + E) - visit each node and edge once
// Space Complexity: O(N) - hash map + queue
//
// WHEN TO USE:
// - Prefer iterative over recursive
// - Very deep graphs (avoid stack overflow)
// ============================================================================

// CloneGraphBFS clones graph using BFS (iterative).
//
// Process nodes level by level, cloning as we go.
func CloneGraphBFS(node *Node) *Node {
	if node == nil {
		return nil
	}

	// Maps original node -> cloned node
	cloned := make(map[*Node]*Node)
	cloned[node] = &Node{Val: node.Val}

	// Queue for BFS
	queue := []*Node{node}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		for _, neighbor := range current.Neighbors {
			if _, exists := cloned[neighbor]; !exists {
				// Clone neighbor and add to queue
				cloned[neighbor] = &Node{Val: neighbor.Val}
				queue = append(queue, neighbor)
			}

			// Connect clone to its neighbor's clone
			cloned[current].Neighbors = append(cloned[current].Neighbors, cloned[neighbor])
		}
	}

	return cloned[node]
}

// ============================================================================
// APPROACH 3: DFS Iterative with Stack
// ============================================================================
// Time Complexity:  O(N + E)
// Space Complexity: O(N)
//
// WHEN TO USE:
// - Want iterative DFS (different traversal order than BFS)
// ============================================================================

// CloneGraphIterativeDFS clones graph using iterative DFS with explicit stack.
func CloneGraphIterativeDFS(node *Node) *Node {
	if node == nil {
		return nil
	}

	cloned := make(map[*Node]*Node)
	cloned[node] = &Node{Val: node.Val}

	stack := []*Node{node}

	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		for _, neighbor := range current.Neighbors {
			if _, exists := cloned[neighbor]; !exists {
				cloned[neighbor] = &Node{Val: neighbor.Val}
				stack = append(stack, neighbor)
			}

			cloned[current].Neighbors = append(cloned[current].Neighbors, cloned[neighbor])
		}
	}

	return cloned[node]
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// buildGraph creates a graph from an adjacency list.
// adjList[i] contains neighbors of node (i+1).
func buildGraph(adjList [][]int) *Node {
	if len(adjList) == 0 {
		return nil
	}

	n := len(adjList)
	nodes := make(map[int]*Node)

	// Create all nodes
	for i := 1; i <= n; i++ {
		nodes[i] = &Node{Val: i}
	}

	// Connect neighbors
	for i, neighbors := range adjList {
		nodeVal := i + 1
		for _, neighborVal := range neighbors {
			nodes[nodeVal].Neighbors = append(nodes[nodeVal].Neighbors, nodes[neighborVal])
		}
	}

	return nodes[1]
}

// graphToAdjList converts graph back to adjacency list for testing.
func graphToAdjList(node *Node) [][]int {
	if node == nil {
		return [][]int{}
	}

	visited := make(map[*Node]bool)
	nodes := make(map[int]*Node)
	queue := []*Node{node}

	// Collect all nodes
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if visited[current] {
			continue
		}
		visited[current] = true
		nodes[current.Val] = current

		for _, neighbor := range current.Neighbors {
			if !visited[neighbor] {
				queue = append(queue, neighbor)
			}
		}
	}

	if len(nodes) == 0 {
		return [][]int{}
	}

	// Find max value
	maxVal := 0
	for val := range nodes {
		if val > maxVal {
			maxVal = val
		}
	}

	result := make([][]int, maxVal)
	for i := range result {
		result[i] = []int{}
	}

	for val := 1; val <= maxVal; val++ {
		if node, exists := nodes[val]; exists {
			for _, neighbor := range node.Neighbors {
				result[val-1] = append(result[val-1], neighbor.Val)
			}
		}
	}

	return result
}

// verifyDeepCopy checks if clone is a true deep copy (no shared references).
func verifyDeepCopy(original, clone *Node) bool {
	if original == nil && clone == nil {
		return true
	}
	if original == nil || clone == nil {
		return false
	}

	origNodes := make(map[*Node]bool)
	cloneNodes := make(map[*Node]bool)

	// Collect original node pointers
	queue := []*Node{original}
	visited := make(map[*Node]bool)
	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]
		if visited[curr] {
			continue
		}
		visited[curr] = true
		origNodes[curr] = true
		for _, n := range curr.Neighbors {
			if !visited[n] {
				queue = append(queue, n)
			}
		}
	}

	// Collect clone node pointers
	queue = []*Node{clone}
	visited = make(map[*Node]bool)
	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]
		if visited[curr] {
			continue
		}
		visited[curr] = true
		cloneNodes[curr] = true
		for _, n := range curr.Neighbors {
			if !visited[n] {
				queue = append(queue, n)
			}
		}
	}

	// Check no shared pointers
	for node := range origNodes {
		if cloneNodes[node] {
			return false
		}
	}

	return true
}

// printGraph prints the graph structure.
func printGraph(node *Node, name string) {
	adjList := graphToAdjList(node)
	fmt.Printf("%s:\n", name)
	if len(adjList) == 0 {
		fmt.Println("  (empty)")
		return
	}
	for i, neighbors := range adjList {
		fmt.Printf("  Node %d -> %v\n", i+1, neighbors)
	}
}

// adjListEqual checks if two adjacency lists are equal.
func adjListEqual(a, b [][]int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if len(a[i]) != len(b[i]) {
			return false
		}
		for j := range a[i] {
			if a[i][j] != b[i][j] {
				return false
			}
		}
	}
	return true
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		adjList [][]int
		desc    string
	}{
		{[][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}}, "Square graph"},
		{[][]int{{}}, "Single node, no neighbors"},
		{[][]int{}, "Empty graph"},
		{[][]int{{2}, {1}}, "Two connected nodes"},
		{[][]int{{2, 3, 4}, {1}, {1}, {1}}, "Star graph"},
	}

	approaches := []struct {
		name string
		fn   func(*Node) *Node
	}{
		{"DFS Recursive (Recommended)", CloneGraphDFS},
		{"BFS Iterative", CloneGraphBFS},
		{"DFS Iterative", CloneGraphIterativeDFS},
	}

	fmt.Println("======================================================================")
	fmt.Println("CLONE GRAPH - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Build original graph
			original := buildGraph(tc.adjList)

			// Clone it
			clone := approach.fn(original)

			// Verify structure matches
			originalAdj := graphToAdjList(original)
			cloneAdj := graphToAdjList(clone)

			structureMatch := adjListEqual(originalAdj, cloneAdj)
			isDeepCopy := verifyDeepCopy(original, clone)

			passed := structureMatch && isDeepCopy
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}

			fmt.Printf("  [%s] %s\n", status, tc.desc)
			fmt.Printf("         Input:      %v\n", tc.adjList)
			fmt.Printf("         Clone adj:  %v\n", cloneAdj)
			fmt.Printf("         Deep copy:  %v\n", isDeepCopy)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Visual demonstration
	fmt.Println("\n======================================================================")
	fmt.Println("VISUAL DEMONSTRATION")
	fmt.Println("======================================================================")

	adjList := [][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}}
	fmt.Printf("\nAdjacency list: %v\n", adjList)

	original := buildGraph(adjList)
	printGraph(original, "\nOriginal Graph")

	clone := CloneGraphDFS(original)
	printGraph(clone, "\nCloned Graph")

	fmt.Printf("\nOriginal and Clone are independent: %v\n", verifyDeepCopy(original, clone))
}
