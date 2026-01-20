/*
Find Eventual Safe States - Go Solutions

Find all nodes that don't lead to cycles (safe nodes).
A node is safe if all paths from it lead to terminal nodes.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: DFS with Three-State Coloring
// ============================================================================
// Time Complexity:  O(V + E) - visit each node and edge once
// Space Complexity: O(V) for state array and recursion stack
//
// WHY THIS IS BEST:
// - Same pattern as cycle detection
// - Nodes that complete DFS without hitting GRAY are safe
// - Clean classification of safe vs unsafe nodes
// ============================================================================

// EventualSafeNodesDFS finds safe nodes using DFS with three-state coloring.
//
// States:
// - WHITE (0): Unvisited
// - GRAY (1): In current DFS path (potentially in cycle)
// - BLACK (2): Verified safe
func EventualSafeNodesDFS(graph [][]int) []int {
	n := len(graph)
	const (
		WHITE = 0
		GRAY  = 1
		BLACK = 2
	)
	state := make([]int, n)

	var isSafe func(node int) bool
	isSafe = func(node int) bool {
		if state[node] == GRAY {
			return false // Currently in path - cycle!
		}
		if state[node] == BLACK {
			return true // Already verified safe
		}

		// Mark as being processed
		state[node] = GRAY

		// Check all neighbors
		for _, neighbor := range graph[node] {
			if !isSafe(neighbor) {
				return false // Unsafe neighbor means we're unsafe
			}
		}

		// All neighbors safe, mark as safe
		state[node] = BLACK
		return true
	}

	// Find all safe nodes
	result := []int{}
	for node := 0; node < n; node++ {
		if isSafe(node) {
			result = append(result, node)
		}
	}
	return result
}

// ============================================================================
// APPROACH 2: Reverse Graph + BFS (Topological Sort)
// ============================================================================
// Time Complexity:  O(V + E)
// Space Complexity: O(V + E) for reverse graph
//
// WHEN TO USE:
// - Want to build from terminal nodes outward
// - Prefer BFS/iterative approach
// - Need to track safe nodes incrementally
// ============================================================================

// EventualSafeNodesBFS finds safe nodes using reverse graph and BFS.
//
// Key insight:
// - Terminal nodes (out-degree 0) are definitely safe
// - A node is safe if ALL its outgoing edges lead to safe nodes
// - Build reverse graph, start from terminals, propagate backwards
func EventualSafeNodesBFS(graph [][]int) []int {
	n := len(graph)

	// Build reverse graph and track out-degrees
	reverseGraph := make([][]int, n)
	outDegree := make([]int, n)

	for i := range reverseGraph {
		reverseGraph[i] = []int{}
	}

	for node := 0; node < n; node++ {
		outDegree[node] = len(graph[node])
		for _, neighbor := range graph[node] {
			reverseGraph[neighbor] = append(reverseGraph[neighbor], node)
		}
	}

	// Start with terminal nodes (out-degree 0)
	queue := []int{}
	for node := 0; node < n; node++ {
		if outDegree[node] == 0 {
			queue = append(queue, node)
		}
	}

	safe := make([]bool, n)

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		safe[node] = true

		// Check all nodes that point TO this node
		for _, prevNode := range reverseGraph[node] {
			outDegree[prevNode]--
			// If all outgoing edges now lead to safe nodes
			if outDegree[prevNode] == 0 {
				queue = append(queue, prevNode)
			}
		}
	}

	result := []int{}
	for node := 0; node < n; node++ {
		if safe[node] {
			result = append(result, node)
		}
	}
	return result
}

// ============================================================================
// APPROACH 3: DFS with Explicit Safe/Unsafe Tracking
// ============================================================================
// Time Complexity:  O(V + E)
// Space Complexity: O(V)
//
// CLEANER CODE:
// - Uses explicit safe/unsafe tracking with pointers
// - More readable logic
// ============================================================================

// EventualSafeNodesMemo finds safe nodes using DFS with explicit memoization.
func EventualSafeNodesMemo(graph [][]int) []int {
	n := len(graph)
	safe := make([]*bool, n)    // nil = unknown, true = safe, false = unsafe
	visiting := make([]bool, n) // Currently in DFS path

	var dfs func(node int) bool
	dfs = func(node int) bool {
		if safe[node] != nil {
			return *safe[node]
		}
		if visiting[node] {
			return false // Cycle detected
		}

		visiting[node] = true

		// Check all neighbors
		for _, neighbor := range graph[node] {
			if !dfs(neighbor) {
				f := false
				safe[node] = &f
				return false
			}
		}

		visiting[node] = false
		t := true
		safe[node] = &t
		return true
	}

	result := []int{}
	for node := 0; node < n; node++ {
		if dfs(node) {
			result = append(result, node)
		}
	}
	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		graph    [][]int
		expected []int
		desc     string
	}{
		{[][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}}, []int{2, 4, 5, 6}, "Mixed safe/unsafe"},
		{[][]int{{1, 2, 3, 4}, {1, 2}, {3, 4}, {0, 4}, {}}, []int{4}, "Mostly cycles"},
		{[][]int{{}, {0}, {1}, {2}}, []int{0, 1, 2, 3}, "Linear chain to terminal"},
		{[][]int{{1}, {2}, {0}}, []int{}, "Pure cycle - no safe nodes"},
		{[][]int{{}, {}, {}}, []int{0, 1, 2}, "All terminals"},
		{[][]int{{1}, {2}, {}}, []int{0, 1, 2}, "Simple chain"},
		{[][]int{{0}}, []int{}, "Self-loop"},
	}

	fmt.Println("======================================================================")
	fmt.Println("FIND EVENTUAL SAFE STATES - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test DFS approach
	fmt.Println("\nApproach 1: DFS Three-State")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		graph := copyGraph(tc.graph)
		result := EventualSafeNodesDFS(graph)
		status := "PASS"
		if !sliceEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	// Test BFS approach
	fmt.Println("\nApproach 2: BFS Reverse Graph")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		graph := copyGraph(tc.graph)
		result := EventualSafeNodesBFS(graph)
		status := "PASS"
		if !sliceEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	// Test Memo approach
	fmt.Println("\nApproach 3: DFS with Memo")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		graph := copyGraph(tc.graph)
		result := EventualSafeNodesMemo(graph)
		status := "PASS"
		if !sliceEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLES")
	fmt.Println("======================================================================")

	// Example 1
	fmt.Println("\nExample 1:")
	graph1 := [][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}}
	fmt.Printf("  Input: graph = %v\n", graph1)
	result := EventualSafeNodesDFS(graph1)
	fmt.Printf("  Output: %v\n", result)
	fmt.Println("  Explanation: 5,6 are terminals; 2,4 only reach terminals")

	// Example 2
	fmt.Println("\nExample 2:")
	graph2 := [][]int{{1, 2, 3, 4}, {1, 2}, {3, 4}, {0, 4}, {}}
	fmt.Printf("  Input: graph = %v\n", graph2)
	result = EventualSafeNodesDFS(graph2)
	fmt.Printf("  Output: %v\n", result)
	fmt.Println("  Explanation: Only node 4 is terminal and safe")

	fmt.Println("\nAll tests completed!")
}

// Helper functions
func copyGraph(graph [][]int) [][]int {
	result := make([][]int, len(graph))
	for i, row := range graph {
		result[i] = make([]int, len(row))
		copy(result[i], row)
	}
	return result
}

func sliceEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}
