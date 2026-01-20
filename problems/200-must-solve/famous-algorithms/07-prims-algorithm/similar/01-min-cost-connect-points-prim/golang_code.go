/*
Min Cost to Connect Points (Prim's Approach) - Go Solution

Time Complexity: O(n^2)
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"math"
)

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func minCostConnectPoints(points [][]int) int {
	n := len(points)
	if n <= 1 {
		return 0
	}

	inMST := make([]bool, n)
	minCost := make([]int, n)
	for i := range minCost {
		minCost[i] = math.MaxInt32
	}
	minCost[0] = 0

	totalCost := 0

	for i := 0; i < n; i++ {
		// Find vertex with minimum cost not in MST
		minVal := math.MaxInt32
		u := -1
		for j := 0; j < n; j++ {
			if !inMST[j] && minCost[j] < minVal {
				minVal = minCost[j]
				u = j
			}
		}

		if u == -1 {
			break
		}

		inMST[u] = true
		totalCost += minCost[u]

		// Update costs of adjacent vertices
		for v := 0; v < n; v++ {
			if !inMST[v] {
				dist := abs(points[u][0]-points[v][0]) + abs(points[u][1]-points[v][1])
				if dist < minCost[v] {
					minCost[v] = dist
				}
			}
		}
	}

	return totalCost
}

func main() {
	fmt.Printf("Test 1: %d\n", minCostConnectPoints([][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}})) // Expected: 20
	fmt.Printf("Test 2: %d\n", minCostConnectPoints([][]int{{3, 12}, {-2, 5}, {-4, 1}}))              // Expected: 18
	fmt.Printf("Test 3: %d\n", minCostConnectPoints([][]int{{0, 0}}))                                 // Expected: 0
	fmt.Println("\nAll tests completed!")
}
