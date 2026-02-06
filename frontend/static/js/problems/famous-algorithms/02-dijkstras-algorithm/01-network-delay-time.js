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
        explanation: 'Processing the input data produces the output. For input times=[[2, 1, 1], [2, 3, 1], [3, 4, 1]], n=4, k=2, the result is 2.'
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
            {
                title: 'Negative Weight Edge Added',
                difficulty: 'Hard',
                description: 'What if some network links have negative delay (time travel shortcuts)? Dijkstra\'s will fail. Modify the solution to handle negative edge weights correctly. What algorithm would you use instead?',
                whyDifferent: 'Dijkstra\'s greedy assumption breaks with negative edges. You need Bellman-Ford which relaxes all edges V-1 times, or detect negative cycles that would make the delay unbounded.',
                example: 'times=[[1,2,5],[2,3,-3],[1,3,4]], n=3, k=1. Dijkstra might finalize node 3 with dist=4 (direct), missing path 1->2->3 with dist=5+(-3)=2.'
            },
            {
                title: 'Output Prediction: Disconnected Graph',
                difficulty: 'Medium',
                description: 'Predict the output when the graph is disconnected: times=[[1,2,1],[3,4,1]], n=4, k=1. Trace through Dijkstra\'s and explain why the answer is -1. What is the minimum number of edges to add to make all nodes reachable?',
                whyDifferent: 'Forces thinking about graph connectivity, not just shortest paths. The algorithm\'s termination condition and how unreachable nodes manifest as infinity in the distance array.',
                example: 'From node 1: dist[1]=0, dist[2]=1, dist[3]=inf, dist[4]=inf. Max dist = inf, so return -1. Adding edge [2,3,x] would connect the components.'
            },
            {
                title: 'Space-Time Tradeoff: Bidirectional Dijkstra',
                difficulty: 'Hard',
                description: 'Instead of running Dijkstra from source k, run it simultaneously from k forward and from all nodes backward. When the searches meet, you have the answer. Analyze the space-time tradeoff.',
                whyDifferent: 'Bidirectional search explores roughly half the graph in each direction, potentially reducing explored nodes from V to 2*sqrt(V). But for network delay (all-nodes reachable), the benefit is limited since we need ALL distances.',
                example: 'For network delay specifically, bidirectional is not helpful since we need max(all distances). But for single-pair shortest path, it can reduce search space significantly.'
            },
            {
                title: 'Online Variant: Edges Arrive Dynamically',
                difficulty: 'Very Hard',
                description: 'Network links are added one at a time. After each addition, report the current network delay time. Can you update the answer incrementally without re-running Dijkstra from scratch?',
                whyDifferent: 'Static Dijkstra\'s recomputes everything. The dynamic version requires understanding which distances could potentially improve when a new edge (u,v,w) is added: only nodes reachable through v whose current distance exceeds dist[u]+w.',
                example: 'Initial: times=[[1,2,5]], n=3, k=1. Delay=-1 (node 3 unreachable). Add [2,3,1]: now delay=6. Add [1,3,4]: delay might decrease to 4 if shorter path exists.'
            },
            {
                title: 'Conceptual Trap: Multiple Edges Between Nodes',
                difficulty: 'Medium',
                description: 'What if there are multiple flights between the same pair of nodes with different times? Does Dijkstra\'s handle this correctly without modification? What about self-loops?',
                whyDifferent: 'Some implementations assume unique edges between node pairs. Multiple edges are handled naturally by the adjacency list, but self-loops (times=[[1,1,5]]) add unnecessary heap entries. Forces careful analysis of edge cases.',
                example: 'times=[[1,2,10],[1,2,5],[2,3,1]], n=3, k=1. Both edges 1->2 are in adjacency list. Dijkstra correctly finds dist[2]=5 via the cheaper edge. Self-loop [1,1,5] is harmless but wasteful.'
            },
            {
                title: 'Approximation: Limited Heap Size',
                difficulty: 'Hard',
                description: 'What if memory is limited and you can only keep K entries in the priority queue? Design an approximation that gives correct answers when possible and bounded error otherwise. When does this limitation cause incorrect results?',
                whyDifferent: 'Standard Dijkstra\'s may push O(E) entries to the heap. With limited heap size, you must decide which entries to discard, potentially losing optimal paths. Forces thinking about which approximation guarantees are achievable.',
                example: 'Dense graph with 1M edges but heap limited to 1000 entries. Must prioritize which candidates to keep. Evicting the highest-distance entry is a reasonable heuristic but may miss paths through high-intermediate-cost nodes.'
            }
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
