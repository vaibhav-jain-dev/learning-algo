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
        explanation: 'Processing the input data produces the output. For input n=4, flights=[[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], src=0, dst=3, k=1, the result is 700.'
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
            {
                title: 'When Dijkstra Greedy Fails Here',
                difficulty: 'Hard',
                description: 'Standard Dijkstra\'s can give wrong answers for this problem. Construct an example where the cheapest path to dst has more stops than a more expensive path, and explain why the "skip if already visited" optimization must be modified.',
                whyDifferent: 'In standard Dijkstra\'s, once a node is finalized, it is never revisited. But with a stop limit, a more expensive path with fewer stops may be the only valid path. The visited check must account for stops remaining.',
                example: 'n=4, flights=[[0,1,1],[0,2,5],[1,2,1],[2,3,1]], src=0, dst=3, k=1. Dijkstra finalizes node 2 via 0->1->2 (cost=2, stops=2). But k=1 means max 1 stop, so valid path is 0->2->3 (cost=6, stops=1).'
            },
            {
                title: 'Alternative: Bellman-Ford Approach',
                difficulty: 'Medium',
                description: 'Solve this problem using Bellman-Ford with exactly K+1 relaxation rounds instead of modified Dijkstra\'s. Compare the implementations. Why does Bellman-Ford naturally handle the stop constraint?',
                whyDifferent: 'Bellman-Ford\'s i-th round finds shortest paths using at most i edges. Running K+1 rounds directly encodes the stop constraint without any modification to the visited logic.',
                example: 'n=4, k=1: run 2 rounds of Bellman-Ford. Round 1: direct flights from src. Round 2: extend by one more flight. Natural K-stop enforcement without complex state tracking.'
            },
            {
                title: 'Proof: Why State Must Include Stops',
                difficulty: 'Hard',
                description: 'Prove that the state space for this problem must include (node, stops_used) rather than just (node). Show that without stops in the state, the algorithm can produce incorrect results even with the modified visited check.',
                whyDifferent: 'Forces formal reasoning about state space design. The standard Dijkstra state (node, distance) is insufficient because two paths to the same node with different stop counts represent fundamentally different states.',
                example: 'Node X reached via 2 stops (cost 10) and 4 stops (cost 5). If K=3, only the 2-stop path can continue. The cheaper 4-stop path is useless despite lower cost.'
            },
            {
                title: 'Amortized Analysis of Modified Dijkstra',
                difficulty: 'Very Hard',
                description: 'The time complexity is O(E*K) rather than O((V+E) log V). Explain why the stop constraint causes nodes to be processed up to K times, and analyze the amortized cost per node extraction.',
                whyDifferent: 'Standard Dijkstra processes each node once. The stop constraint means the same node can be extracted with different stop counts. The K factor in complexity comes from this re-processing, not from edge relaxation.',
                example: 'With K=5 and a hub node connected to everything, that hub could be extracted up to 5 times from the heap, once for each possible stop count from 1 to 5.'
            },
            {
                title: 'Conceptual Trap: K=0 Edge Case',
                difficulty: 'Easy',
                description: 'What happens when k=0? You can take at most 0 stops, meaning only direct flights from src to dst are valid. Trace through the algorithm with k=0 and verify it handles this correctly.',
                whyDifferent: 'With k=0, the priority queue immediately limits exploration depth. Many implementations have off-by-one errors here: is k the number of stops (intermediate nodes) or the number of flights?',
                example: 'n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=0. Only direct flight 0->2 is valid. Answer: 500, not 200 (which would need 1 stop).'
            },
            {
                title: 'Space-Time Tradeoff: DP Table vs Heap',
                difficulty: 'Medium',
                description: 'Compare the modified Dijkstra approach (heap-based) with a 2D DP approach where dp[i][v] = cheapest cost to reach v using at most i flights. Analyze memory usage and when each approach is better.',
                whyDifferent: 'The DP approach uses O(N*K) space but has predictable access patterns. The heap approach uses less space on sparse graphs but has unpredictable memory allocation. Forces analysis of when each is preferable.',
                example: 'N=10000, K=100, E=20000. DP table: 10000*100 = 1M entries. Heap approach: at most E*K = 2M entries but typically much less. For sparse graphs with small K, heap wins; for dense graphs, DP may be simpler.'
            }
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
