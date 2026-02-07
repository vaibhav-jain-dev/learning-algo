/**
 * Network Delay Time
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Network Delay Time',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'You have a network of n nodes, labeled from 1 to n. You are given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. Return the minimum time it takes for all the n nodes to receive the signal sent from node k. Return -1 if not all nodes can receive the signal.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O((V + E) log V)',
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
        "times": [
                [
                        2,
                        1,
                        1
                ],
                [
                        2,
                        3,
                        1
                ],
                [
                        3,
                        4,
                        1
                ]
        ],
        "n": 4,
        "k": 2
},
        output: 2,
        explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
    }
        ],
        solutions: {
            python: `import heapq
from collections import defaultdict

def networkDelayTime(times, n, k):
    """
    Network Delay Time using Dijkstra's Algorithm

    Time: O((V + E) log V)
    Space: O(V + E)
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))

    # Distance array, initialized to infinity
    dist = {i: float('inf') for i in range(1, n + 1)}
    dist[k] = 0

    # Min-heap: (distance, node)
    heap = [(0, k)]

    while heap:
        d, node = heapq.heappop(heap)

        # Skip if we've found a better path
        if d > dist[node]:
            continue

        # Explore neighbors
        for neighbor, weight in graph[node]:
            new_dist = d + weight
            if new_dist < dist[neighbor]:
                dist[neighbor] = new_dist
                heapq.heappush(heap, (new_dist, neighbor))

    # Find max distance (time for all nodes to receive signal)
    max_dist = max(dist.values())

    return max_dist if max_dist != float('inf') else -1


# Test
if __name__ == "__main__":
    times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]]
    print(networkDelayTime(times, 4, 2))  # Output: 2`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

// Item represents a node with its distance
type Item struct {
    node, dist int
}

// PriorityQueue implements heap.Interface
type PriorityQueue []Item

func (pq PriorityQueue) Len() int           { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i].dist < pq[j].dist }
func (pq PriorityQueue) Swap(i, j int)      { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PriorityQueue) Push(x interface{}) { *pq = append(*pq, x.(Item)) }
func (pq *PriorityQueue) Pop() interface{} {
    old := *pq
    n := len(old)
    item := old[n-1]
    *pq = old[0 : n-1]
    return item
}

// NetworkDelayTime finds minimum time for all nodes to receive signal.
// Time: O((V + E) log V), Space: O(V + E)
func NetworkDelayTime(times [][]int, n int, k int) int {
    // Build adjacency list
    graph := make(map[int][][2]int)
    for _, t := range times {
        u, v, w := t[0], t[1], t[2]
        graph[u] = append(graph[u], [2]int{v, w})
    }

    // Distance map
    dist := make(map[int]int)
    for i := 1; i <= n; i++ {
        dist[i] = 1 << 30 // infinity
    }
    dist[k] = 0

    // Min-heap
    pq := &PriorityQueue{{k, 0}}
    heap.Init(pq)

    for pq.Len() > 0 {
        item := heap.Pop(pq).(Item)
        d, node := item.dist, item.node

        if d > dist[node] {
            continue
        }

        for _, edge := range graph[node] {
            neighbor, weight := edge[0], edge[1]
            newDist := d + weight
            if newDist < dist[neighbor] {
                dist[neighbor] = newDist
                heap.Push(pq, Item{neighbor, newDist})
            }
        }
    }

    maxDist := 0
    for i := 1; i <= n; i++ {
        if dist[i] > maxDist {
            maxDist = dist[i]
        }
    }

    if maxDist == 1<<30 {
        return -1
    }
    return maxDist
}

func main() {
    times := [][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}
    fmt.Println(NetworkDelayTime(times, 4, 2)) // Output: 2
}`
        },
        twists: [
            { id: '02-dijkstras-algorithm/01-network-delay-time/twist-01-negative-weight-edge-added', name: 'Negative Weight Edge Added', difficulty: 'Hard' },
            { id: '02-dijkstras-algorithm/01-network-delay-time/twist-02-output-prediction-disconnected-graph', name: 'Output Prediction: Disconnected Graph', difficulty: 'Medium' },
            { id: '02-dijkstras-algorithm/01-network-delay-time/twist-03-space-time-tradeoff-bidirectional-dijkstra', name: 'Space-Time Tradeoff: Bidirectional Dijkstra', difficulty: 'Hard' },
            { id: '02-dijkstras-algorithm/01-network-delay-time/twist-04-online-variant-edges-arrive-dynamically', name: 'Online Variant: Edges Arrive Dynamically', difficulty: 'Very Hard' },
            { id: '02-dijkstras-algorithm/01-network-delay-time/twist-05-conceptual-trap-multiple-edges-between-nodes', name: 'Conceptual Trap: Multiple Edges Between Nodes', difficulty: 'Medium' },
            { id: '02-dijkstras-algorithm/01-network-delay-time/twist-06-approximation-limited-heap-size', name: 'Approximation: Limited Heap Size', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/01-network-delay-time', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/01-network-delay-time'] = problem;

})();
