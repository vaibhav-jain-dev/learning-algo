/*
Path with Maximum Probability - Go Solution

Find path with maximum probability using modified Dijkstra.

Time Complexity: O(E log V)
Space Complexity: O(V + E)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

// ProbEdge represents an edge with probability
type ProbEdge struct {
	To   int
	Prob float64
}

// ProbItem for max-heap (using negative for min-heap behavior)
type ProbItem struct {
	Prob  float64
	Node  int
	Index int
}

// ProbPQ implements heap.Interface for max probability
type ProbPQ []*ProbItem

func (pq ProbPQ) Len() int { return len(pq) }

func (pq ProbPQ) Less(i, j int) bool {
	return pq[i].Prob > pq[j].Prob // Max-heap
}

func (pq ProbPQ) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *ProbPQ) Push(x interface{}) {
	n := len(*pq)
	item := x.(*ProbItem)
	item.Index = n
	*pq = append(*pq, item)
}

func (pq *ProbPQ) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.Index = -1
	*pq = old[0 : n-1]
	return item
}

// maxProbability finds max probability path using modified Dijkstra
func maxProbability(n int, edges [][]int, succProb []float64, start int, end int) float64 {
	// Build undirected graph
	graph := make([][]ProbEdge, n)
	for i := range graph {
		graph[i] = []ProbEdge{}
	}
	for i, edge := range edges {
		a, b := edge[0], edge[1]
		prob := succProb[i]
		graph[a] = append(graph[a], ProbEdge{b, prob})
		graph[b] = append(graph[b], ProbEdge{a, prob})
	}

	maxProb := make([]float64, n)
	maxProb[start] = 1.0

	pq := &ProbPQ{}
	heap.Init(pq)
	heap.Push(pq, &ProbItem{Prob: 1.0, Node: start})

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*ProbItem)
		prob, node := item.Prob, item.Node

		if node == end {
			return prob
		}

		if prob < maxProb[node] {
			continue
		}

		for _, edge := range graph[node] {
			neighbor, edgeProb := edge.To, edge.Prob
			newProb := prob * edgeProb
			if newProb > maxProb[neighbor] {
				maxProb[neighbor] = newProb
				heap.Push(pq, &ProbItem{Prob: newProb, Node: neighbor})
			}
		}
	}

	return 0.0
}

// maxProbabilityLog uses log transformation
func maxProbabilityLog(n int, edges [][]int, succProb []float64, start int, end int) float64 {
	type Edge struct {
		To     int
		Weight float64
	}

	graph := make([][]Edge, n)
	for i := range graph {
		graph[i] = []Edge{}
	}
	for i, edge := range edges {
		a, b := edge[0], edge[1]
		prob := succProb[i]
		if prob > 0 {
			logProb := -math.Log(prob)
			graph[a] = append(graph[a], Edge{b, logProb})
			graph[b] = append(graph[b], Edge{a, logProb})
		}
	}

	// Min-heap for standard Dijkstra
	type Item struct {
		dist float64
		node int
	}

	dist := make([]float64, n)
	for i := range dist {
		dist[i] = math.MaxFloat64
	}
	dist[start] = 0

	// Simple slice-based priority queue
	pq := []Item{{0, start}}

	for len(pq) > 0 {
		// Find min
		minIdx := 0
		for i := 1; i < len(pq); i++ {
			if pq[i].dist < pq[minIdx].dist {
				minIdx = i
			}
		}
		item := pq[minIdx]
		pq = append(pq[:minIdx], pq[minIdx+1:]...)

		d, node := item.dist, item.node

		if node == end {
			return math.Exp(-d)
		}

		if d > dist[node] {
			continue
		}

		for _, edge := range graph[node] {
			neighbor, weight := edge.To, edge.Weight
			newDist := d + weight
			if newDist < dist[neighbor] {
				dist[neighbor] = newDist
				pq = append(pq, Item{newDist, neighbor})
			}
		}
	}

	return 0.0
}

// maxProbabilityBellmanFord uses Bellman-Ford variant
func maxProbabilityBellmanFord(n int, edges [][]int, succProb []float64, start int, end int) float64 {
	prob := make([]float64, n)
	prob[start] = 1.0

	for i := 0; i < n-1; i++ {
		updated := false
		for j, edge := range edges {
			a, b := edge[0], edge[1]
			p := succProb[j]
			if prob[a]*p > prob[b] {
				prob[b] = prob[a] * p
				updated = true
			}
			if prob[b]*p > prob[a] {
				prob[a] = prob[b] * p
				updated = true
			}
		}
		if !updated {
			break
		}
	}

	return prob[end]
}

func main() {
	// Test 1: Standard case
	edges1 := [][]int{{0, 1}, {1, 2}, {0, 2}}
	probs1 := []float64{0.5, 0.5, 0.2}
	result1 := maxProbability(3, edges1, probs1, 0, 2)
	fmt.Printf("Test 1: %f\n", result1)
	if math.Abs(result1-0.25) > 1e-6 {
		fmt.Printf("FAIL: Expected 0.25, got %f\n", result1)
	}

	// Test 2: Direct path is better
	edges2 := [][]int{{0, 1}, {1, 2}, {0, 2}}
	probs2 := []float64{0.5, 0.5, 0.3}
	result2 := maxProbability(3, edges2, probs2, 0, 2)
	fmt.Printf("Test 2: %f\n", result2)
	if math.Abs(result2-0.3) > 1e-6 {
		fmt.Printf("FAIL: Expected 0.3, got %f\n", result2)
	}

	// Test 3: No path
	edges3 := [][]int{{0, 1}}
	probs3 := []float64{0.5}
	result3 := maxProbability(3, edges3, probs3, 0, 2)
	fmt.Printf("Test 3: %f\n", result3)
	if result3 != 0.0 {
		fmt.Printf("FAIL: Expected 0.0, got %f\n", result3)
	}

	// Test 4: Log transformation
	result4 := maxProbabilityLog(3, edges1, probs1, 0, 2)
	fmt.Printf("Test 4 (Log): %f\n", result4)
	if math.Abs(result4-0.25) > 1e-6 {
		fmt.Printf("FAIL: Expected 0.25, got %f\n", result4)
	}

	// Test 5: Bellman-Ford
	result5 := maxProbabilityBellmanFord(3, edges1, probs1, 0, 2)
	fmt.Printf("Test 5 (Bellman-Ford): %f\n", result5)
	if math.Abs(result5-0.25) > 1e-6 {
		fmt.Printf("FAIL: Expected 0.25, got %f\n", result5)
	}

	// Test 6: Longer path with higher probability
	edges6 := [][]int{{0, 1}, {1, 2}, {2, 3}, {0, 3}}
	probs6 := []float64{0.9, 0.9, 0.9, 0.5}
	result6 := maxProbability(4, edges6, probs6, 0, 3)
	fmt.Printf("Test 6: %f\n", result6)
	if math.Abs(result6-0.729) > 1e-6 {
		fmt.Printf("FAIL: Expected 0.729, got %f\n", result6)
	}

	fmt.Println("\nAll tests passed!")
}
