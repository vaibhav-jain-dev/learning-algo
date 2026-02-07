/**
 * Cheapest Flights Within K Stops
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cheapest Flights Within K Stops',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w. Given all the cities and flights, find the cheapest price from src to dst with at most k stops.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(E * K)',
            space: 'O(N * K)'
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
        "n": 4,
        "flights": [
                [
                        0,
                        1,
                        100
                ],
                [
                        1,
                        2,
                        100
                ],
                [
                        2,
                        0,
                        100
                ],
                [
                        1,
                        3,
                        600
                ],
                [
                        2,
                        3,
                        200
                ]
        ],
        "src": 0,
        "dst": 3,
        "k": 1
},
        output: 700,
        explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
    }
        ],
        solutions: {
            python: `import heapq
from collections import defaultdict

def findCheapestPrice(n, flights, src, dst, k):
    """
    Cheapest Flights Within K Stops using Modified Dijkstra's

    Time: O(E * K)
    Space: O(N * K)
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, price in flights:
        graph[u].append((v, price))

    # Min-heap: (cost, stops, node)
    heap = [(0, 0, src)]

    # Track minimum stops to reach each node
    # We might visit a node multiple times with different stops
    visited = {}  # node -> min stops used to reach it

    while heap:
        cost, stops, node = heapq.heappop(heap)

        # Found destination
        if node == dst:
            return cost

        # Skip if we've used too many stops
        if stops > k:
            continue

        # Skip if we've visited this node with fewer stops
        if node in visited and visited[node] <= stops:
            continue
        visited[node] = stops

        # Explore neighbors
        for neighbor, price in graph[node]:
            heapq.heappush(heap, (cost + price, stops + 1, neighbor))

    return -1


# Test
if __name__ == "__main__":
    flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
    print(findCheapestPrice(4, flights, 0, 3, 1))  # Output: 700`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

// FlightItem represents state in priority queue
type FlightItem struct {
    cost, stops, node int
}

// FlightPQ implements heap.Interface
type FlightPQ []FlightItem

func (pq FlightPQ) Len() int           { return len(pq) }
func (pq FlightPQ) Less(i, j int) bool { return pq[i].cost < pq[j].cost }
func (pq FlightPQ) Swap(i, j int)      { pq[i], pq[j] = pq[j], pq[i] }
func (pq *FlightPQ) Push(x interface{}) { *pq = append(*pq, x.(FlightItem)) }
func (pq *FlightPQ) Pop() interface{} {
    old := *pq
    n := len(old)
    item := old[n-1]
    *pq = old[0 : n-1]
    return item
}

// FindCheapestPrice finds cheapest flight with at most k stops.
// Time: O(E * K), Space: O(N * K)
func FindCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
    // Build adjacency list
    graph := make(map[int][][2]int)
    for _, f := range flights {
        u, v, price := f[0], f[1], f[2]
        graph[u] = append(graph[u], [2]int{v, price})
    }

    // Min-heap
    pq := &FlightPQ{{0, 0, src}}
    heap.Init(pq)

    // Track min stops to reach each node
    visited := make(map[int]int)

    for pq.Len() > 0 {
        item := heap.Pop(pq).(FlightItem)
        cost, stops, node := item.cost, item.stops, item.node

        if node == dst {
            return cost
        }

        if stops > k {
            continue
        }

        if prevStops, ok := visited[node]; ok && prevStops <= stops {
            continue
        }
        visited[node] = stops

        for _, edge := range graph[node] {
            neighbor, price := edge[0], edge[1]
            heap.Push(pq, FlightItem{cost + price, stops + 1, neighbor})
        }
    }

    return -1
}

func main() {
    flights := [][]int{{0,1,100},{1,2,100},{2,0,100},{1,3,600},{2,3,200}}
    fmt.Println(FindCheapestPrice(4, flights, 0, 3, 1)) // Output: 700
}`
        },
        twists: [
            { id: '02-dijkstras-algorithm/02-cheapest-flights/twist-01-when-dijkstra-greedy-fails-here', name: 'When Dijkstra Greedy Fails Here', difficulty: 'Hard' },
            { id: '02-dijkstras-algorithm/02-cheapest-flights/twist-02-alternative-bellman-ford-approach', name: 'Alternative: Bellman-Ford Approach', difficulty: 'Medium' },
            { id: '02-dijkstras-algorithm/02-cheapest-flights/twist-03-proof-why-state-must-include-stops', name: 'Proof: Why State Must Include Stops', difficulty: 'Hard' },
            { id: '02-dijkstras-algorithm/02-cheapest-flights/twist-04-amortized-analysis-of-modified-dijkstra', name: 'Amortized Analysis of Modified Dijkstra', difficulty: 'Very Hard' },
            { id: '02-dijkstras-algorithm/02-cheapest-flights/twist-05-conceptual-trap-k-0-edge-case', name: 'Conceptual Trap: K=0 Edge Case', difficulty: 'Easy' },
            { id: '02-dijkstras-algorithm/02-cheapest-flights/twist-06-space-time-tradeoff-dp-table-vs-heap', name: 'Space-Time Tradeoff: DP Table vs Heap', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/02-cheapest-flights', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/02-cheapest-flights'] = problem;

})();
