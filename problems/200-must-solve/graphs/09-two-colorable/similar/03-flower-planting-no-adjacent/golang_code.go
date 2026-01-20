/*
Flower Planting With No Adjacent - Go Solutions

Assign 4 flower types to gardens such that no adjacent gardens have same flower.
*/

package main

import "fmt"

func gardenNoAdj(n int, paths [][]int) []int {
	graph := make([][]int, n+1)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, p := range paths {
		a, b := p[0], p[1]
		graph[a] = append(graph[a], b)
		graph[b] = append(graph[b], a)
	}

	result := make([]int, n)

	for garden := 1; garden <= n; garden++ {
		used := make(map[int]bool)
		for _, neighbor := range graph[garden] {
			if result[neighbor-1] != 0 {
				used[result[neighbor-1]] = true
			}
		}

		for color := 1; color <= 4; color++ {
			if !used[color] {
				result[garden-1] = color
				break
			}
		}
	}

	return result
}

func main() {
	fmt.Printf("Example 1: %v\n", gardenNoAdj(3, [][]int{{1, 2}, {2, 3}, {3, 1}}))
	fmt.Printf("Example 2: %v\n", gardenNoAdj(4, [][]int{{1, 2}, {3, 4}}))
}
