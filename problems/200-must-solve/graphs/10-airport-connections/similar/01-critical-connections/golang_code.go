/*
Critical Connections in a Network - Go Solutions

Find all bridges (critical edges) using Tarjan's algorithm.
*/

package main

import "fmt"

func criticalConnections(n int, connections [][]int) [][]int {
	graph := make([][]int, n)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, conn := range connections {
		a, b := conn[0], conn[1]
		graph[a] = append(graph[a], b)
		graph[b] = append(graph[b], a)
	}

	disc := make([]int, n)
	low := make([]int, n)
	for i := range disc {
		disc[i] = -1
		low[i] = -1
	}
	bridges := [][]int{}
	time := 0

	var dfs func(node, parent int)
	dfs = func(node, parent int) {
		disc[node] = time
		low[node] = time
		time++

		for _, neighbor := range graph[node] {
			if disc[neighbor] == -1 {
				dfs(neighbor, node)
				if low[neighbor] < low[node] {
					low[node] = low[neighbor]
				}
				if low[neighbor] > disc[node] {
					bridges = append(bridges, []int{node, neighbor})
				}
			} else if neighbor != parent {
				if disc[neighbor] < low[node] {
					low[node] = disc[neighbor]
				}
			}
		}
	}

	for i := 0; i < n; i++ {
		if disc[i] == -1 {
			dfs(i, -1)
		}
	}

	return bridges
}

func main() {
	result := criticalConnections(4, [][]int{{0, 1}, {1, 2}, {2, 0}, {1, 3}})
	fmt.Printf("Critical connections: %v (expected: [[1,3]])\n", result)
}
