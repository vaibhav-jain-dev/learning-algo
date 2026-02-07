/**
 * Path with Maximum Probability
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: dijkstra-modified
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path with Maximum Probability',
        difficulty: 'Medium',
        algorithm: 'dijkstra-modified',
        parent: '11-detect-arbitrage',
        description: 'You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting nodes a and b with a probability of success of traversing that edge succProb[i]. Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability. If there is no path from start to end, return 0.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "n": 3,
        "edges": [
                [
                        0,
                        1
                ],
                [
                        1,
                        2
                ],
                [
                        0,
                        2
                ]
        ],
        "succProb": [
                0.5,
                0.5,
                0.2
        ],
        "start": 0,
        "end": 2
},
        output: 0.25,
        explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
    }
        ],
        solutions: {
            python: `import heapq
from collections import defaultdict

def maxProbability(n, edges, succProb, start, end):
    """
    Path with Maximum Probability - Modified Dijkstra

    Instead of minimizing distance, maximize probability.
    Use a max-heap (negate probabilities for min-heap).

    Time: O(E log V)
    Space: O(V + E)
    """
    # Build adjacency list
    graph = defaultdict(list)
    for i, (a, b) in enumerate(edges):
        prob = succProb[i]
        graph[a].append((b, prob))
        graph[b].append((a, prob))

    # Max probability to reach each node
    max_prob = [0.0] * n
    max_prob[start] = 1.0

    # Max-heap (use negative for max behavior)
    heap = [(-1.0, start)]  # (neg_prob, node)

    while heap:
        neg_prob, node = heapq.heappop(heap)
        prob = -neg_prob

        # Found the end node
        if node == end:
            return prob

        # Skip if we've found a better path already
        if prob < max_prob[node]:
            continue

        for neighbor, edge_prob in graph[node]:
            new_prob = prob * edge_prob

            if new_prob > max_prob[neighbor]:
                max_prob[neighbor] = new_prob
                heapq.heappush(heap, (-new_prob, neighbor))

    return 0.0


# Test
if __name__ == "__main__":
    # Test case 1
    n = 3
    edges = [[0,1],[1,2],[0,2]]
    succProb = [0.5,0.5,0.2]
    start, end = 0, 2
    print(maxProbability(n, edges, succProb, start, end))  # 0.25

    # Test case 2
    n = 3
    edges = [[0,1],[1,2],[0,2]]
    succProb = [0.5,0.5,0.3]
    start, end = 0, 2
    print(maxProbability(n, edges, succProb, start, end))  # 0.3

    # Test case 3: No path
    n = 3
    edges = [[0,1]]
    succProb = [0.5]
    start, end = 0, 2
    print(maxProbability(n, edges, succProb, start, end))  # 0.0`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

type ProbItem struct {
    prob float64
    node int
}

type MaxHeap []ProbItem

func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i].prob > h[j].prob } // Max heap
func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(ProbItem)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

// MaxProbability finds path with maximum success probability
// Uses modified Dijkstra with max-heap
// Time: O(E log V), Space: O(V+E)
func MaxProbability(n int, edges [][]int, succProb []float64, start int, end int) float64 {
    // Build adjacency list
    type Edge struct {
        to   int
        prob float64
    }
    graph := make([][]Edge, n)
    for i := range graph {
        graph[i] = []Edge{}
    }

    for i, e := range edges {
        a, b := e[0], e[1]
        prob := succProb[i]
        graph[a] = append(graph[a], Edge{b, prob})
        graph[b] = append(graph[b], Edge{a, prob})
    }

    // Max probability to reach each node
    maxProb := make([]float64, n)
    maxProb[start] = 1.0

    h := &MaxHeap{{1.0, start}}
    heap.Init(h)

    for h.Len() > 0 {
        item := heap.Pop(h).(ProbItem)
        prob, node := item.prob, item.node

        // Found end node
        if node == end {
            return prob
        }

        // Skip if we've found better path
        if prob < maxProb[node] {
            continue
        }

        for _, edge := range graph[node] {
            newProb := prob * edge.prob

            if newProb > maxProb[edge.to] {
                maxProb[edge.to] = newProb
                heap.Push(h, ProbItem{newProb, edge.to})
            }
        }
    }

    return 0.0
}

func main() {
    // Test case 1
    edges := [][]int{{0, 1}, {1, 2}, {0, 2}}
    succProb := []float64{0.5, 0.5, 0.2}
    fmt.Println(MaxProbability(3, edges, succProb, 0, 2)) // 0.25

    // Test case 2
    succProb2 := []float64{0.5, 0.5, 0.3}
    fmt.Println(MaxProbability(3, edges, succProb2, 0, 2)) // 0.3

    // Test case 3: No path
    edges3 := [][]int{{0, 1}}
    succProb3 := []float64{0.5}
    fmt.Println(MaxProbability(3, edges3, succProb3, 0, 2)) // 0
}`
        },
        twists: [
            { id: '11-detect-arbitrage/02-path-with-max-probability/twist-01-minimum-probability-path', name: 'Minimum Probability Path', difficulty: 'Easy' },
            { id: '11-detect-arbitrage/02-path-with-max-probability/twist-02-path-with-k-edges', name: 'Path with K Edges', difficulty: 'Hard' },
            { id: '11-detect-arbitrage/02-path-with-max-probability/twist-03-probability-with-additive-costs', name: 'Probability with Additive Costs', difficulty: 'Hard' },
            { id: '11-detect-arbitrage/02-path-with-max-probability/twist-04-top-k-paths-by-probability', name: 'Top K Paths by Probability', difficulty: 'Very Hard' },
            { id: '11-detect-arbitrage/02-path-with-max-probability/twist-05-log-transform-approach', name: 'Log-Transform Approach', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/02-path-with-max-probability', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/02-path-with-max-probability'] = problem;

})();
