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
        explanation: 'Processing the input data produces the output. For input n=3, edges=[[0, 1], [1, 2], [0, 2]], succProb=[0.5, 0.5, 0.2], start=0, end=2, the result is 0.25.'
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
            { title: 'Minimum Probability Path', difficulty: 'Easy', description: 'Find the path with the minimum success probability (most risky path) from start to end.', whyDifferent: 'You swap max-heap for min-heap and track minimum probability instead of maximum. The relaxation condition flips to update when new probability is lower.', example: 'Paths: 0.25 and 0.04. Most risky path has probability 0.04. Return 0.04.' },
            { title: 'Path with K Edges', difficulty: 'Hard', description: 'Find the maximum probability path using exactly K edges from start to end.', whyDifferent: 'You need matrix exponentiation on the probability adjacency matrix, or K-limited BFS/Bellman-Ford variant. Standard Dijkstra cannot enforce exact edge count.', example: 'With K=2, must take exactly 2 edges. Direct edge (probability 0.9) is invalid. Path through intermediate node (0.5 * 0.8 = 0.4) is valid.' },
            { title: 'Probability with Additive Costs', difficulty: 'Hard', description: 'Each edge has both a probability and a monetary cost. Find the path that maximizes probability subject to total cost <= budget.', whyDifferent: 'This is a constrained optimization problem. Standard Dijkstra cannot handle two metrics. You need state (node, remaining_budget) with probability tracking.', example: 'Path A: probability 0.8, cost 50. Path B: probability 0.6, cost 20. Budget=30. Must take Path B.' },
            { title: 'Top K Paths by Probability', difficulty: 'Very Hard', description: 'Return the K highest-probability distinct paths from start to end.', whyDifferent: 'Dijkstra finds one best path. Finding K best paths requires Yen algorithm or modified Dijkstra that allows nodes to be visited multiple times.', example: 'Top 3 paths: 0.25 (path A), 0.2 (path B), 0.15 (path C). Return [0.25, 0.2, 0.15] with their paths.' },
            { title: 'Log-Transform Approach', difficulty: 'Medium', description: 'Solve using log-transformed weights and standard shortest path instead of modified Dijkstra with products.', whyDifferent: 'Taking -log(probability) converts products to sums and maximization to minimization. You can then use standard Dijkstra without modification.', example: 'Probability 0.5 becomes -log(0.5) = 0.693. Minimize sum of logs, then convert back: e^(-sum) = max probability.' }
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
