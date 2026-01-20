/*
Parallel Courses - Go Solution

Time Complexity: O(V + E)
Space Complexity: O(V + E)
*/

package main

import "fmt"

func minimumSemesters(n int, relations [][]int) int {
	graph := make([][]int, n+1)
	for i := range graph {
		graph[i] = []int{}
	}
	inDegree := make([]int, n+1)

	for _, rel := range relations {
		prev, next := rel[0], rel[1]
		graph[prev] = append(graph[prev], next)
		inDegree[next]++
	}

	queue := []int{}
	for i := 1; i <= n; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	semesters := 0
	completed := 0

	for len(queue) > 0 {
		semesters++
		size := len(queue)
		for i := 0; i < size; i++ {
			course := queue[0]
			queue = queue[1:]
			completed++

			for _, neighbor := range graph[course] {
				inDegree[neighbor]--
				if inDegree[neighbor] == 0 {
					queue = append(queue, neighbor)
				}
			}
		}
	}

	if completed == n {
		return semesters
	}
	return -1
}

func main() {
	fmt.Printf("Test 1: %d\n", minimumSemesters(3, [][]int{{1, 3}, {2, 3}}))          // Expected: 2
	fmt.Printf("Test 2: %d\n", minimumSemesters(3, [][]int{{1, 2}, {2, 3}, {3, 1}}))  // Expected: -1
	fmt.Printf("Test 3: %d\n", minimumSemesters(4, [][]int{{1, 2}, {1, 3}, {2, 4}, {3, 4}})) // Expected: 3
	fmt.Println("\nAll tests completed!")
}
