/*
All Paths From Source to Target - Go Solutions

Given a directed acyclic graph (DAG), find all paths from node 0 to node n-1.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: DFS with Backtracking
// ============================================================================
// Time Complexity:  O(2^N × N) - potentially 2^N paths, each of length N
// Space Complexity: O(N) - recursion depth and current path
//
// WHY THIS IS BEST:
// - Natural fit for path enumeration problems
// - Efficient memory with backtracking (reuse path slice)
// - Clean recursive structure
// ============================================================================

// AllPathsDFS finds all paths using DFS with backtracking.
//
// Key Insight: Explore each path completely, backtrack when done.
// Since it's a DAG, no cycle detection needed.
//
// Visual for graph = [[1,2],[3],[3],[]]:
//
//	    0
//	   / \
//	  1   2     All paths: [0,1,3] and [0,2,3]
//	   \ /
//	    3
func AllPathsDFS(graph [][]int) [][]int {
	target := len(graph) - 1
	result := [][]int{}
	path := []int{0} // Start at node 0

	var dfs func(node int)
	dfs = func(node int) {
		// Reached target - save current path
		if node == target {
			// Must copy path since we'll modify it
			pathCopy := make([]int, len(path))
			copy(pathCopy, path)
			result = append(result, pathCopy)
			return
		}

		// Explore all neighbors
		for _, next := range graph[node] {
			path = append(path, next)
			dfs(next)
			path = path[:len(path)-1] // Backtrack
		}
	}

	dfs(0)
	return result
}

// ============================================================================
// APPROACH 2: BFS with Path Tracking
// ============================================================================
// Time Complexity:  O(2^N × N)
// Space Complexity: O(2^N × N) - stores all partial paths in queue
//
// WHEN TO USE:
// - Prefer iterative solutions
// - Want level-by-level exploration
// - Don't mind higher memory usage
// ============================================================================

// AllPathsBFS finds all paths using BFS.
func AllPathsBFS(graph [][]int) [][]int {
	target := len(graph) - 1
	result := [][]int{}

	// Queue stores partial paths
	queue := [][]int{{0}}

	for len(queue) > 0 {
		// Dequeue current path
		path := queue[0]
		queue = queue[1:]

		lastNode := path[len(path)-1]

		// Reached target
		if lastNode == target {
			result = append(result, path)
			continue
		}

		// Extend path with each neighbor
		for _, next := range graph[lastNode] {
			// Create new path (copy + extend)
			newPath := make([]int, len(path)+1)
			copy(newPath, path)
			newPath[len(path)] = next
			queue = append(queue, newPath)
		}
	}

	return result
}

// ============================================================================
// APPROACH 3: DFS with Path Copy (Functional Style)
// ============================================================================
// Time Complexity:  O(2^N × N)
// Space Complexity: O(2^N × N) - creates new path for each branch
//
// WHEN TO USE:
// - Prefer immutable approach
// - Code clarity over memory efficiency
// ============================================================================

// AllPathsFunctional uses functional-style DFS without mutation.
func AllPathsFunctional(graph [][]int) [][]int {
	target := len(graph) - 1

	var dfs func(node int, path []int) [][]int
	dfs = func(node int, path []int) [][]int {
		// Add current node to path
		newPath := append([]int{}, path...)
		newPath = append(newPath, node)

		// Reached target
		if node == target {
			return [][]int{newPath}
		}

		// Collect all paths through neighbors
		result := [][]int{}
		for _, next := range graph[node] {
			paths := dfs(next, newPath)
			result = append(result, paths...)
		}

		return result
	}

	return dfs(0, []int{})
}

// ============================================================================
// APPROACH 4: Dynamic Programming (Bottom-Up)
// ============================================================================
// Time Complexity:  O(2^N × N)
// Space Complexity: O(2^N × N) for storing paths from each node
//
// WHEN TO USE:
// - Want to cache paths from intermediate nodes
// - Graph has overlapping subpaths
// ============================================================================

// AllPathsDP uses dynamic programming (memoization).
func AllPathsDP(graph [][]int) [][]int {
	n := len(graph)
	target := n - 1

	// memo[i] = all paths from node i to target
	memo := make([][][]int, n)

	var dp func(node int) [][]int
	dp = func(node int) [][]int {
		// Check memo
		if memo[node] != nil {
			return memo[node]
		}

		// Base case: at target
		if node == target {
			memo[node] = [][]int{{target}}
			return memo[node]
		}

		// Build paths through all neighbors
		paths := [][]int{}
		for _, next := range graph[node] {
			// Get all paths from neighbor to target
			subPaths := dp(next)

			// Prepend current node to each path
			for _, subPath := range subPaths {
				newPath := make([]int, len(subPath)+1)
				newPath[0] = node
				copy(newPath[1:], subPath)
				paths = append(paths, newPath)
			}
		}

		memo[node] = paths
		return paths
	}

	return dp(0)
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		graph    [][]int
		expected [][]int
		desc     string
	}{
		{
			[][]int{{1, 2}, {3}, {3}, {}},
			[][]int{{0, 1, 3}, {0, 2, 3}},
			"Simple diamond graph",
		},
		{
			[][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}},
			[][]int{{0, 4}, {0, 3, 4}, {0, 1, 3, 4}, {0, 1, 2, 3, 4}, {0, 1, 4}},
			"Complex DAG",
		},
		{
			[][]int{{1}, {}},
			[][]int{{0, 1}},
			"Two nodes",
		},
		{
			[][]int{{1, 2, 3}, {2, 3}, {3}, {}},
			[][]int{{0, 1, 2, 3}, {0, 1, 3}, {0, 2, 3}, {0, 3}},
			"Multiple paths with branching",
		},
	}

	approaches := []struct {
		name string
		fn   func([][]int) [][]int
	}{
		{"DFS Backtracking", AllPathsDFS},
		{"BFS Path Tracking", AllPathsBFS},
		{"Functional DFS", AllPathsFunctional},
		{"Dynamic Programming", AllPathsDP},
	}

	fmt.Println("======================================================================")
	fmt.Println("ALL PATHS FROM SOURCE TO TARGET - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")

		for _, tc := range testCases {
			result := approach.fn(tc.graph)

			// Check if number of paths match
			status := "PASS"
			if len(result) != len(tc.expected) {
				status = "FAIL"
			}

			fmt.Printf("  [%s] %s: found %d paths (expected %d)\n",
				status, tc.desc, len(result), len(tc.expected))
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("DETAILED EXAMPLE")
	fmt.Println("======================================================================")

	// Detailed example
	graph := [][]int{{1, 2}, {3}, {3}, {}}
	fmt.Println("\nInput: graph = [[1,2],[3],[3],[]]")
	fmt.Println("\nGraph structure:")
	fmt.Println("  Node 0 -> [1, 2]")
	fmt.Println("  Node 1 -> [3]")
	fmt.Println("  Node 2 -> [3]")
	fmt.Println("  Node 3 -> [] (target)")

	paths := AllPathsDFS(graph)
	fmt.Printf("\nAll paths from 0 to 3: %v\n", paths)

	fmt.Println("\nPath exploration:")
	fmt.Println("  0 -> 1 -> 3 (found!)")
	fmt.Println("  0 -> 2 -> 3 (found!)")

	// Complex example
	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEX EXAMPLE")
	fmt.Println("======================================================================")

	graph2 := [][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}}
	fmt.Println("\nInput: graph = [[4,3,1],[3,2,4],[3],[4],[]]")
	paths2 := AllPathsDFS(graph2)
	fmt.Printf("All paths from 0 to 4: %v\n", paths2)
	fmt.Printf("Total: %d paths\n", len(paths2))

	fmt.Println("\nAll tests completed!")
}
