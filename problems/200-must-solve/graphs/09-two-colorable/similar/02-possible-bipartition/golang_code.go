/*
Possible Bipartition - Go Solutions

Split people into two groups where no one dislikes someone in same group.
*/

package main

import "fmt"

func possibleBipartition(n int, dislikes [][]int) bool {
	graph := make([][]int, n+1)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, d := range dislikes {
		a, b := d[0], d[1]
		graph[a] = append(graph[a], b)
		graph[b] = append(graph[b], a)
	}

	color := make([]int, n+1)

	for person := 1; person <= n; person++ {
		if color[person] != 0 {
			continue
		}

		queue := []int{person}
		color[person] = 1

		for len(queue) > 0 {
			p := queue[0]
			queue = queue[1:]

			for _, enemy := range graph[p] {
				if color[enemy] == 0 {
					color[enemy] = 3 - color[p]
					queue = append(queue, enemy)
				} else if color[enemy] == color[p] {
					return false
				}
			}
		}
	}

	return true
}

func main() {
	fmt.Printf("Example 1: %v (expected: true)\n", possibleBipartition(4, [][]int{{1, 2}, {1, 3}, {2, 4}}))
	fmt.Printf("Example 2: %v (expected: false)\n", possibleBipartition(3, [][]int{{1, 2}, {1, 3}, {2, 3}}))
}
