/*
Course Schedule - Go Solutions

Determine if you can finish all courses given prerequisites.
This is a cycle detection problem in directed graphs.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: DFS with Three-State Coloring
// ============================================================================
// Time Complexity:  O(V + E) - visit each node and edge once
// Space Complexity: O(V + E) - adjacency list and recursion stack
//
// WHY THIS IS BEST:
// - Clean implementation of cycle detection
// - Three states clearly track node status
// - Easy to understand the back-edge detection
// ============================================================================

// CanFinishDFS detects if courses can be completed using DFS cycle detection.
//
// Three states:
// - WHITE (0): Not visited
// - GRAY (1): Currently in DFS path
// - BLACK (2): Completely processed
//
// Cycle exists if we encounter a GRAY node during DFS.
func CanFinishDFS(numCourses int, prerequisites [][]int) bool {
	// Build adjacency list
	graph := make([][]int, numCourses)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, prereq := range prerequisites {
		course, pre := prereq[0], prereq[1]
		graph[pre] = append(graph[pre], course)
	}

	// State constants
	const (
		WHITE = 0
		GRAY  = 1
		BLACK = 2
	)
	state := make([]int, numCourses)

	var hasCycle func(node int) bool
	hasCycle = func(node int) bool {
		if state[node] == GRAY {
			return true // Back edge - cycle detected!
		}
		if state[node] == BLACK {
			return false // Already fully processed
		}

		// Mark as being processed
		state[node] = GRAY

		// Explore neighbors
		for _, neighbor := range graph[node] {
			if hasCycle(neighbor) {
				return true
			}
		}

		// Mark as fully processed
		state[node] = BLACK
		return false
	}

	// Check each node (graph might be disconnected)
	for course := 0; course < numCourses; course++ {
		if hasCycle(course) {
			return false
		}
	}

	return true
}

// ============================================================================
// APPROACH 2: Kahn's Algorithm (BFS Topological Sort)
// ============================================================================
// Time Complexity:  O(V + E)
// Space Complexity: O(V + E)
//
// WHEN TO USE:
// - Need to find valid ordering (not just detect cycle)
// - Prefer iterative over recursive
// - Want to process nodes in dependency order
// ============================================================================

// CanFinishBFS detects if courses can be completed using Kahn's algorithm.
//
// Key insight: If topological sort processes all nodes, no cycle exists.
func CanFinishBFS(numCourses int, prerequisites [][]int) bool {
	// Build adjacency list and in-degree count
	graph := make([][]int, numCourses)
	inDegree := make([]int, numCourses)

	for i := range graph {
		graph[i] = []int{}
	}

	for _, prereq := range prerequisites {
		course, pre := prereq[0], prereq[1]
		graph[pre] = append(graph[pre], course)
		inDegree[course]++
	}

	// Queue starts with all zero in-degree nodes
	queue := []int{}
	for i := 0; i < numCourses; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	processed := 0

	for len(queue) > 0 {
		// Dequeue
		node := queue[0]
		queue = queue[1:]
		processed++

		for _, neighbor := range graph[node] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	// All courses processed means no cycle
	return processed == numCourses
}

// ============================================================================
// APPROACH 3: DFS with Visited Map (Alternative)
// ============================================================================
// Time Complexity:  O(V + E)
// Space Complexity: O(V + E)
//
// SIMPLER VERSION:
// - Uses maps instead of state array
// - More readable but slightly slower
// ============================================================================

// CanFinishMaps detects cycles using visited and path maps.
func CanFinishMaps(numCourses int, prerequisites [][]int) bool {
	graph := make([][]int, numCourses)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, prereq := range prerequisites {
		course, pre := prereq[0], prereq[1]
		graph[pre] = append(graph[pre], course)
	}

	visited := make(map[int]bool)
	path := make(map[int]bool)

	var dfs func(node int) bool
	dfs = func(node int) bool {
		if path[node] {
			return false // Cycle detected
		}
		if visited[node] {
			return true // Already verified safe
		}

		path[node] = true
		for _, neighbor := range graph[node] {
			if !dfs(neighbor) {
				return false
			}
		}
		delete(path, node)

		visited[node] = true
		return true
	}

	for i := 0; i < numCourses; i++ {
		if !dfs(i) {
			return false
		}
	}

	return true
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		numCourses    int
		prerequisites [][]int
		expected      bool
		desc          string
	}{
		{2, [][]int{{1, 0}}, true, "Simple dependency"},
		{2, [][]int{{1, 0}, {0, 1}}, false, "Simple cycle"},
		{4, [][]int{{1, 0}, {2, 0}, {3, 1}, {3, 2}}, true, "Diamond shape"},
		{1, [][]int{}, true, "Single course no prereqs"},
		{3, [][]int{{0, 1}, {0, 2}, {1, 2}}, true, "Chain dependency"},
		{3, [][]int{{0, 1}, {1, 2}, {2, 0}}, false, "Triangular cycle"},
		{5, [][]int{{1, 0}, {2, 1}, {3, 2}, {4, 3}}, true, "Linear chain"},
		{4, [][]int{{1, 0}, {2, 1}, {0, 2}}, false, "3-node cycle in larger graph"},
	}

	fmt.Println("======================================================================")
	fmt.Println("COURSE SCHEDULE - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test DFS approach
	fmt.Println("\nApproach 1: DFS Three-State")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := CanFinishDFS(tc.numCourses, tc.prerequisites)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	// Test BFS approach
	fmt.Println("\nApproach 2: BFS Kahn's Algorithm")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := CanFinishBFS(tc.numCourses, tc.prerequisites)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	// Test Maps approach
	fmt.Println("\nApproach 3: DFS with Maps")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := CanFinishMaps(tc.numCourses, tc.prerequisites)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLES")
	fmt.Println("======================================================================")

	// Example 1
	fmt.Println("\nExample 1:")
	fmt.Println("  numCourses = 4")
	fmt.Println("  prerequisites = [[1,0], [2,0], [3,1], [3,2]]")
	result := CanFinishDFS(4, [][]int{{1, 0}, {2, 0}, {3, 1}, {3, 2}})
	fmt.Printf("  Output: %v\n", result)
	fmt.Println("  Explanation: Take 0 -> 1,2 -> 3")

	// Example 2
	fmt.Println("\nExample 2:")
	fmt.Println("  numCourses = 2")
	fmt.Println("  prerequisites = [[1,0], [0,1]]")
	result = CanFinishDFS(2, [][]int{{1, 0}, {0, 1}})
	fmt.Printf("  Output: %v\n", result)
	fmt.Println("  Explanation: 0 and 1 depend on each other (cycle)")

	fmt.Println("\nAll tests completed!")
}
