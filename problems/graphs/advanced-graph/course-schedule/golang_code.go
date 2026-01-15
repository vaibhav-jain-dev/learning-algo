package main

import (
	"fmt"
	"strings"
)

/*
Course Schedule - Cycle Detection in Directed Graph
LeetCode 207 (Medium)

This problem tests understanding of:
- Graph representation
- Cycle detection in directed graphs
- Topological sorting
- DFS with state tracking

Real-world: Build systems, package managers, task scheduling
*/

// State represents the DFS state of a node
type State int

const (
	WHITE State = iota // Not visited
	GRAY               // Currently visiting (in DFS path)
	BLACK              // Fully visited
)

// canFinishDFS uses DFS with three-color marking
// Time: O(V + E), Space: O(V + E)
func canFinishDFS(numCourses int, prerequisites [][]int) bool {
	// Build adjacency list
	graph := make([][]int, numCourses)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, prereq := range prerequisites {
		course, pre := prereq[0], prereq[1]
		graph[pre] = append(graph[pre], course)
	}

	// State for each node
	state := make([]State, numCourses)

	// DFS function - returns true if cycle found
	var hasCycle func(node int) bool
	hasCycle = func(node int) bool {
		if state[node] == GRAY {
			return true // Cycle detected!
		}
		if state[node] == BLACK {
			return false // Already processed
		}

		state[node] = GRAY

		for _, neighbor := range graph[node] {
			if hasCycle(neighbor) {
				return true
			}
		}

		state[node] = BLACK
		return false
	}

	// Check all nodes (graph might be disconnected)
	for course := 0; course < numCourses; course++ {
		if state[course] == WHITE {
			if hasCycle(course) {
				return false
			}
		}
	}

	return true
}

// canFinish uses BFS with Kahn's algorithm (topological sort)
// Time: O(V + E), Space: O(V + E)
func canFinish(numCourses int, prerequisites [][]int) bool {
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

	// Queue starts with courses that have no prerequisites
	queue := []int{}
	for course := 0; course < numCourses; course++ {
		if inDegree[course] == 0 {
			queue = append(queue, course)
		}
	}

	// Process courses
	coursesTaken := 0

	for len(queue) > 0 {
		course := queue[0]
		queue = queue[1:]
		coursesTaken++

		// "Take" this course - unlock dependent courses
		for _, dependent := range graph[course] {
			inDegree[dependent]--
			if inDegree[dependent] == 0 {
				queue = append(queue, dependent)
			}
		}
	}

	return coursesTaken == numCourses
}

// findOrder returns a valid course order or empty slice if impossible
// This is Course Schedule II
func findOrder(numCourses int, prerequisites [][]int) []int {
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

	queue := []int{}
	for course := 0; course < numCourses; course++ {
		if inDegree[course] == 0 {
			queue = append(queue, course)
		}
	}

	order := []int{}

	for len(queue) > 0 {
		course := queue[0]
		queue = queue[1:]
		order = append(order, course)

		for _, dependent := range graph[course] {
			inDegree[dependent]--
			if inDegree[dependent] == 0 {
				queue = append(queue, dependent)
			}
		}
	}

	if len(order) == numCourses {
		return order
	}
	return []int{} // Cycle exists
}

// canFinishIterative uses iterative DFS with explicit stack
func canFinishIterative(numCourses int, prerequisites [][]int) bool {
	graph := make([][]int, numCourses)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, prereq := range prerequisites {
		course, pre := prereq[0], prereq[1]
		graph[pre] = append(graph[pre], course)
	}

	state := make([]State, numCourses)

	type stackItem struct {
		node int
		idx  int // Current index in neighbors
	}

	for start := 0; start < numCourses; start++ {
		if state[start] != WHITE {
			continue
		}

		stack := []stackItem{{start, 0}}
		state[start] = GRAY

		for len(stack) > 0 {
			top := &stack[len(stack)-1]

			if top.idx >= len(graph[top.node]) {
				// Done with this node
				state[top.node] = BLACK
				stack = stack[:len(stack)-1]
				continue
			}

			neighbor := graph[top.node][top.idx]
			top.idx++

			if state[neighbor] == GRAY {
				return false // Cycle detected
			}
			if state[neighbor] == WHITE {
				state[neighbor] = GRAY
				stack = append(stack, stackItem{neighbor, 0})
			}
		}
	}

	return true
}

func visualizeGraph(numCourses int, prerequisites [][]int) {
	fmt.Printf("\nGraph with %d courses:\n", numCourses)

	if len(prerequisites) == 0 {
		fmt.Println("  No prerequisites")
		return
	}

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

	fmt.Println("  Adjacency List:")
	for pre := 0; pre < numCourses; pre++ {
		if len(graph[pre]) > 0 {
			fmt.Printf("    %d → %v\n", pre, graph[pre])
		}
	}

	fmt.Printf("  In-degrees: %v\n", inDegree)
}

func main() {
	testCases := []struct {
		numCourses    int
		prerequisites [][]int
		expected      bool
	}{
		{2, [][]int{{1, 0}}, true},
		{2, [][]int{{1, 0}, {0, 1}}, false},
		{4, [][]int{{1, 0}, {2, 0}, {3, 1}, {3, 2}}, true},
		{5, [][]int{{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 2}}, false},
		{3, [][]int{}, true},
		{1, [][]int{}, true},
	}

	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("COURSE SCHEDULE - Cycle Detection")
	fmt.Println(strings.Repeat("=", 60))

	for i, tc := range testCases {
		fmt.Println()
		fmt.Println(strings.Repeat("-", 50))
		fmt.Printf("Test %d:\n", i+1)
		fmt.Printf("Courses: %d\n", tc.numCourses)
		fmt.Printf("Prerequisites: %v\n", tc.prerequisites)
		fmt.Printf("Expected: %v\n", tc.expected)

		visualizeGraph(tc.numCourses, tc.prerequisites)

		resultDFS := canFinishDFS(tc.numCourses, tc.prerequisites)
		resultBFS := canFinish(tc.numCourses, tc.prerequisites)
		resultIter := canFinishIterative(tc.numCourses, tc.prerequisites)

		fmt.Println("\nResults:")
		fmt.Printf("  DFS:           %v\n", resultDFS)
		fmt.Printf("  BFS (Kahn's):  %v\n", resultBFS)
		fmt.Printf("  Iterative DFS: %v\n", resultIter)

		order := findOrder(tc.numCourses, tc.prerequisites)
		if len(order) > 0 {
			fmt.Printf("  Valid Order:   %v\n", order)
		} else {
			fmt.Println("  Valid Order:   None (cycle exists)")
		}

		if resultDFS == tc.expected && resultBFS == tc.expected {
			fmt.Println("\n✓ PASSED")
		} else {
			fmt.Println("\n✗ FAILED")
		}
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("All tests completed!")
	fmt.Println(strings.Repeat("=", 60))
}
