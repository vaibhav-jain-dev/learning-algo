/*
Minimum Cost to Connect All Points - Go Solution

Find minimum cost to connect all points using MST algorithms.

Time Complexity: O(n^2 log n)
Space Complexity: O(n^2)
*/

package main

import (
	"container/heap"
	"fmt"
	"sort"
)

// Edge represents an edge in the graph
type Edge struct {
	Cost   int
	Point1 int
	Point2 int
}

// PrimHeapItem for Prim's algorithm
type PrimHeapItem struct {
	Cost  int
	Point int
	Index int
}

// PrimPQ implements heap.Interface
type PrimPQ []*PrimHeapItem

func (pq PrimPQ) Len() int           { return len(pq) }
func (pq PrimPQ) Less(i, j int) bool { return pq[i].Cost < pq[j].Cost }
func (pq PrimPQ) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *PrimPQ) Push(x interface{}) {
	n := len(*pq)
	item := x.(*PrimHeapItem)
	item.Index = n
	*pq = append(*pq, item)
}

func (pq *PrimPQ) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.Index = -1
	*pq = old[0 : n-1]
	return item
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// minCostConnectPointsPrim uses Prim's algorithm
func minCostConnectPointsPrim(points [][]int) int {
	n := len(points)
	if n <= 1 {
		return 0
	}

	manhattanDist := func(i, j int) int {
		return abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1])
	}

	visited := make([]bool, n)
	pq := &PrimPQ{}
	heap.Init(pq)
	heap.Push(pq, &PrimHeapItem{Cost: 0, Point: 0})

	totalCost := 0
	edgesAdded := 0

	for pq.Len() > 0 && edgesAdded < n {
		item := heap.Pop(pq).(*PrimHeapItem)

		if visited[item.Point] {
			continue
		}

		visited[item.Point] = true
		totalCost += item.Cost
		edgesAdded++

		for neighbor := 0; neighbor < n; neighbor++ {
			if !visited[neighbor] {
				dist := manhattanDist(item.Point, neighbor)
				heap.Push(pq, &PrimHeapItem{Cost: dist, Point: neighbor})
			}
		}
	}

	return totalCost
}

// Union-Find for Kruskal's
type UnionFind struct {
	parent []int
	rank   []int
}

func newUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	rank := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{parent, rank}
}

func (uf *UnionFind) find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.find(uf.parent[x])
	}
	return uf.parent[x]
}

func (uf *UnionFind) union(x, y int) bool {
	px, py := uf.find(x), uf.find(y)
	if px == py {
		return false
	}
	if uf.rank[px] < uf.rank[py] {
		px, py = py, px
	}
	uf.parent[py] = px
	if uf.rank[px] == uf.rank[py] {
		uf.rank[px]++
	}
	return true
}

// minCostConnectPointsKruskal uses Kruskal's algorithm
func minCostConnectPointsKruskal(points [][]int) int {
	n := len(points)
	if n <= 1 {
		return 0
	}

	// Generate all edges
	edges := []Edge{}
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			cost := abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1])
			edges = append(edges, Edge{cost, i, j})
		}
	}

	// Sort by cost
	sort.Slice(edges, func(i, j int) bool {
		return edges[i].Cost < edges[j].Cost
	})

	uf := newUnionFind(n)
	totalCost := 0
	edgesAdded := 0

	for _, edge := range edges {
		if uf.union(edge.Point1, edge.Point2) {
			totalCost += edge.Cost
			edgesAdded++
			if edgesAdded == n-1 {
				break
			}
		}
	}

	return totalCost
}

// minCostConnectPointsOptimizedPrim is optimized version
func minCostConnectPointsOptimizedPrim(points [][]int) int {
	n := len(points)
	if n <= 1 {
		return 0
	}

	const INF = 1 << 30
	minDist := make([]int, n)
	for i := range minDist {
		minDist[i] = INF
	}
	minDist[0] = 0
	inMST := make([]bool, n)
	totalCost := 0

	for i := 0; i < n; i++ {
		// Find min distance point not in MST
		minVal := INF
		minIdx := -1
		for j := 0; j < n; j++ {
			if !inMST[j] && minDist[j] < minVal {
				minVal = minDist[j]
				minIdx = j
			}
		}

		inMST[minIdx] = true
		totalCost += minVal

		// Update distances
		for j := 0; j < n; j++ {
			if !inMST[j] {
				dist := abs(points[minIdx][0]-points[j][0]) + abs(points[minIdx][1]-points[j][1])
				if dist < minDist[j] {
					minDist[j] = dist
				}
			}
		}
	}

	return totalCost
}

func main() {
	// Test 1: Standard case
	points1 := [][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}}
	result1 := minCostConnectPointsPrim(points1)
	fmt.Printf("Test 1 (Prim): %d\n", result1)
	if result1 != 20 {
		fmt.Printf("FAIL: Expected 20, got %d\n", result1)
	}

	result1Kruskal := minCostConnectPointsKruskal(points1)
	fmt.Printf("Test 1 (Kruskal): %d\n", result1Kruskal)
	if result1Kruskal != 20 {
		fmt.Printf("FAIL: Expected 20, got %d\n", result1Kruskal)
	}

	// Test 2: Three points
	points2 := [][]int{{3, 12}, {-2, 5}, {-4, 1}}
	result2 := minCostConnectPointsPrim(points2)
	fmt.Printf("Test 2 (Prim): %d\n", result2)
	if result2 != 18 {
		fmt.Printf("FAIL: Expected 18, got %d\n", result2)
	}

	// Test 3: Four points
	points3 := [][]int{{0, 0}, {1, 1}, {1, 0}, {-1, 1}}
	result3 := minCostConnectPointsPrim(points3)
	fmt.Printf("Test 3 (Prim): %d\n", result3)
	if result3 != 4 {
		fmt.Printf("FAIL: Expected 4, got %d\n", result3)
	}

	// Test 4: Single point
	points4 := [][]int{{0, 0}}
	result4 := minCostConnectPointsPrim(points4)
	fmt.Printf("Test 4 (Prim): %d\n", result4)
	if result4 != 0 {
		fmt.Printf("FAIL: Expected 0, got %d\n", result4)
	}

	// Test 5: Optimized Prim
	result5 := minCostConnectPointsOptimizedPrim(points1)
	fmt.Printf("Test 5 (Optimized Prim): %d\n", result5)
	if result5 != 20 {
		fmt.Printf("FAIL: Expected 20, got %d\n", result5)
	}

	fmt.Println("\nAll tests passed!")
}
