/**
 * Network Delay Time
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: dijkstra
 */
(function() {
    'use strict';

    const problem = {
        name: 'Network Delay Time',
        difficulty: 'Medium',
        algorithm: 'dijkstra',
        parent: '10-airport-connections',
        description: 'You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.',
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
    Network Delay Time - Dijkstra's Algorithm

    Find shortest path from source k to all nodes.
    Return the maximum of all shortest paths (time for all to receive signal).

    Time: O(E log V)
    Space: O(V + E)
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))

    # Dijkstra's algorithm
    dist = {k: 0}
    min_heap = [(0, k)]  # (distance, node)

    while min_heap:
        d, node = heapq.heappop(min_heap)

        # Skip if we've already found a shorter path
        if d > dist.get(node, float('inf')):
            continue

        for neighbor, weight in graph[node]:
            new_dist = d + weight
            if new_dist < dist.get(neighbor, float('inf')):
                dist[neighbor] = new_dist
                heapq.heappush(min_heap, (new_dist, neighbor))

    # Check if all nodes are reachable
    if len(dist) != n:
        return -1

    return max(dist.values())


# Test
if __name__ == "__main__":
    # Test case 1
    times = [[2,1,1],[2,3,1],[3,4,1]]
    n = 4
    k = 2
    print(networkDelayTime(times, n, k))  # 2

    # Test case 2
    times = [[1,2,1]]
    n = 2
    k = 1
    print(networkDelayTime(times, n, k))  # 1

    # Test case 3: Unreachable node
    times = [[1,2,1]]
    n = 2
    k = 2
    print(networkDelayTime(times, n, k))  # -1`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

type Item struct {
    dist, node int
}

type PriorityQueue []Item

func (pq PriorityQueue) Len() int            { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool  { return pq[i].dist < pq[j].dist }
func (pq PriorityQueue) Swap(i, j int)       { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PriorityQueue) Push(x interface{}) { *pq = append(*pq, x.(Item)) }
func (pq *PriorityQueue) Pop() interface{} {
    old := *pq
    n := len(old)
    x := old[n-1]
    *pq = old[0 : n-1]
    return x
}

// NetworkDelayTime finds time for all nodes to receive signal
// Uses Dijkstra's algorithm
// Time: O(E log V), Space: O(V+E)
func NetworkDelayTime(times [][]int, n int, k int) int {
    // Build adjacency list
    graph := make(map[int][][2]int)
    for _, t := range times {
        u, v, w := t[0], t[1], t[2]
        graph[u] = append(graph[u], [2]int{v, w})
    }

    // Dijkstra's algorithm
    dist := make(map[int]int)
    dist[k] = 0

    pq := &PriorityQueue{{0, k}}
    heap.Init(pq)

    for pq.Len() > 0 {
        item := heap.Pop(pq).(Item)
        d, node := item.dist, item.node

        // Skip if we've already found a shorter path
        if existingDist, exists := dist[node]; exists && d > existingDist {
            continue
        }

        for _, edge := range graph[node] {
            neighbor, weight := edge[0], edge[1]
            newDist := d + weight

            if existingDist, exists := dist[neighbor]; !exists || newDist < existingDist {
                dist[neighbor] = newDist
                heap.Push(pq, Item{newDist, neighbor})
            }
        }
    }

    // Check if all nodes are reachable
    if len(dist) != n {
        return -1
    }

    // Find maximum distance
    maxDist := 0
    for _, d := range dist {
        if d > maxDist {
            maxDist = d
        }
    }

    return maxDist
}

func main() {
    // Test case 1
    times := [][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}
    fmt.Println(NetworkDelayTime(times, 4, 2)) // 2

    // Test case 2
    times = [][]int{{1, 2, 1}}
    fmt.Println(NetworkDelayTime(times, 2, 1)) // 1

    // Test case 3: Unreachable
    fmt.Println(NetworkDelayTime(times, 2, 2)) // -1
}`
        },
        twists: [
            { id: '10-airport-connections/03-network-delay-time/twist-01-multiple-sources', name: 'Multiple Sources', difficulty: 'Medium' },
            { id: '10-airport-connections/03-network-delay-time/twist-02-signal-relay-with-delay', name: 'Signal Relay with Delay', difficulty: 'Hard' },
            { id: '10-airport-connections/03-network-delay-time/twist-03-unreliable-edges', name: 'Unreliable Edges', difficulty: 'Hard' },
            { id: '10-airport-connections/03-network-delay-time/twist-04-bidirectional-edges', name: 'Bidirectional Edges', difficulty: 'Easy' },
            { id: '10-airport-connections/03-network-delay-time/twist-05-minimum-time-to-reach-specific-node', name: 'Minimum Time to Reach Specific Node', difficulty: 'Easy' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/03-network-delay-time', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/03-network-delay-time'] = problem;

})();
