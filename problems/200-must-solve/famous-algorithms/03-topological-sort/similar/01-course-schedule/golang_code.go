/*
Course Schedule - Go Solution

Time Complexity: O(V + E)
Space Complexity: O(V + E)
*/

package main

import "fmt"

func canFinish(numCourses int, prerequisites [][]int) bool {
	graph := make([][]int, numCourses)
	for i := range graph {
		graph[i] = []int{}
	}
	inDegree := make([]int, numCourses)

	for _, prereq := range prerequisites {
		course, pre := prereq[0], prereq[1]
		graph[pre] = append(graph[pre], course)
		inDegree[course]++
	}

	queue := []int{}
	for i := 0; i < numCourses; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	count := 0
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		count++

		for _, neighbor := range graph[node] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	return count == numCourses
}

func findOrder(numCourses int, prerequisites [][]int) []int {
	graph := make([][]int, numCourses)
	for i := range graph {
		graph[i] = []int{}
	}
	inDegree := make([]int, numCourses)

	for _, prereq := range prerequisites {
		course, pre := prereq[0], prereq[1]
		graph[pre] = append(graph[pre], course)
		inDegree[course]++
	}

	queue := []int{}
	for i := 0; i < numCourses; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	result := []int{}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		result = append(result, node)

		for _, neighbor := range graph[node] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	if len(result) != numCourses {
		return []int{}
	}
	return result
}

func main() {
	fmt.Printf("Test 1: %v\n", canFinish(2, [][]int{{1, 0}}))           // Expected: true
	fmt.Printf("Test 2: %v\n", canFinish(2, [][]int{{1, 0}, {0, 1}}))   // Expected: false
	fmt.Printf("Test 3: %v\n", findOrder(4, [][]int{{1, 0}, {2, 0}, {3, 1}, {3, 2}})) // Expected: [0,1,2,3] or [0,2,1,3]
	fmt.Println("\nAll tests completed!")
}
