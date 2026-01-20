/*
Is Graph Bipartite? - Go Solutions

Check if graph can be 2-colored (bipartite).
*/

package main

import "fmt"

func isBipartite(graph [][]int) bool {
	n := len(graph)
	color := make([]int, n)
	for i := range color {
		color[i] = -1
	}

	for start := 0; start < n; start++ {
		if color[start] != -1 {
			continue
		}

		queue := []int{start}
		color[start] = 0

		for len(queue) > 0 {
			node := queue[0]
			queue = queue[1:]

			for _, neighbor := range graph[node] {
				if color[neighbor] == -1 {
					color[neighbor] = 1 - color[node]
					queue = append(queue, neighbor)
				} else if color[neighbor] == color[node] {
					return false
				}
			}
		}
	}

	return true
}

func main() {
	graph1 := [][]int{{1, 2, 3}, {0, 2}, {0, 1, 3}, {0, 2}}
	fmt.Printf("Example 1: %v (expected: false)\n", isBipartite(graph1))

	graph2 := [][]int{{1, 3}, {0, 2}, {1, 3}, {0, 2}}
	fmt.Printf("Example 2: %v (expected: true)\n", isBipartite(graph2))
}
