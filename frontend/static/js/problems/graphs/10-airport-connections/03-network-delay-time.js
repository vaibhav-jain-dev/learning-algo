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
        explanation: 'Processing the input data produces the output. For input times=[[2, 1, 1], [2, 3, 1], [3, 4, 1]], n=4, k=2, the result is 2.'
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
            { title: 'Multiple Sources', difficulty: 'Medium', description: 'Send signals from multiple source nodes simultaneously. Find the minimum time for all nodes to receive at least one signal.', whyDifferent: 'Multi-source Dijkstra initializes the priority queue with all sources at distance 0. Each node receives the signal from whichever source reaches it first.', example: 'Sources at nodes 1 and 5. Node 3 is reached by node 1 in 4 time units and node 5 in 2 time units. Signal arrives at time 2.' },
            { title: 'Signal Relay with Delay', difficulty: 'Hard', description: 'Each node takes processing_time[i] to relay the signal before it can propagate to neighbors. Include this in the total time.', whyDifferent: 'Edge weights alone do not determine arrival time. Node processing adds a per-node cost, making the effective edge weight = edge_time + destination_processing_time.', example: 'Edge 1->2 takes 3 time. Node 2 processing takes 2 time. Signal arrives at node 2 at time 3 but is not relayed until time 5.' },
            { title: 'Unreliable Edges', difficulty: 'Hard', description: 'Each edge has a probability of failure. Find the path to each node that maximizes the probability of the signal arriving.', whyDifferent: 'Instead of minimizing sum of weights, you maximize product of probabilities. This requires modified Dijkstra with multiplication and max-heap.', example: 'Path A: prob 0.9 * 0.8 = 0.72. Path B: prob 0.95 * 0.7 = 0.665. Choose Path A.' },
            { title: 'Bidirectional Edges', difficulty: 'Easy', description: 'All connections are bidirectional with the same weight in both directions. Find network delay time.', whyDifferent: 'Each directed edge becomes two edges. The graph has more paths to explore, potentially finding shorter routes through reverse edges.', example: 'Edge [2,1,1] becomes both 2->1 and 1->2 with weight 1. More paths available.' },
            { title: 'Minimum Time to Reach Specific Node', difficulty: 'Easy', description: 'Instead of waiting for all nodes, find the minimum time for the signal to reach a specific target node.', whyDifferent: 'You can stop Dijkstra early when the target node is popped from the priority queue, potentially much faster than computing all distances.', example: 'Send signal from node 1, need it at node 5. Dijkstra pops node 5 at time 7. Answer: 7. No need to compute distances to other nodes.' }
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
