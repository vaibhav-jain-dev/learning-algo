/**
 * Cheapest Flights Within K Stops
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: bellman-ford-dijkstra
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cheapest Flights Within K Stops',
        difficulty: 'Medium',
        algorithm: 'bellman-ford-dijkstra',
        parent: '11-detect-arbitrage',
        description: 'There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(K * E)',
            space: 'O(V)'
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
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    }
        ],
        solutions: {
            python: `def findCheapestPrice(n, flights, src, dst, k):
    """
    Cheapest Flights Within K Stops - Bellman-Ford Variant

    Run Bellman-Ford for exactly k+1 iterations (k stops = k+1 edges).
    Use a copy of distances to avoid using updates from same iteration.

    Time: O(K * E)
    Space: O(V)
    """
    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0

    # Relax edges k+1 times (k stops = k+1 edges maximum)
    for _ in range(k + 1):
        # Make a copy to avoid using updates from same iteration
        temp = dist.copy()

        for u, v, price in flights:
            if dist[u] != INF and dist[u] + price < temp[v]:
                temp[v] = dist[u] + price

        dist = temp

    return dist[dst] if dist[dst] != INF else -1


def findCheapestPriceBFS(n, flights, src, dst, k):
    """Alternative: BFS with pruning."""
    from collections import defaultdict, deque

    graph = defaultdict(list)
    for u, v, price in flights:
        graph[u].append((v, price))

    # BFS: (node, cost, stops)
    queue = deque([(src, 0, 0)])
    min_cost = [float('inf')] * n
    min_cost[src] = 0

    while queue:
        node, cost, stops = queue.popleft()

        if stops > k:
            continue

        for neighbor, price in graph[node]:
            new_cost = cost + price

            # Only explore if this path is potentially better
            if new_cost < min_cost[neighbor]:
                min_cost[neighbor] = new_cost
                queue.append((neighbor, new_cost, stops + 1))

    return min_cost[dst] if min_cost[dst] != float('inf') else -1


# Test
if __name__ == "__main__":
    # Test case 1
    n = 4
    flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
    src, dst, k = 0, 3, 1
    print(findCheapestPrice(n, flights, src, dst, k))  # 700

    # Test case 2: k=0 means direct flight only
    print(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0))  # 500`,
            go: `package main

import "fmt"

const INF = 1 << 30

// FindCheapestPrice finds cheapest flight with at most k stops
// Uses Bellman-Ford variant
// Time: O(K*E), Space: O(V)
func FindCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
    dist := make([]int, n)
    for i := range dist {
        dist[i] = INF
    }
    dist[src] = 0

    // Relax edges k+1 times
    for i := 0; i <= k; i++ {
        // Copy to avoid using updates from same iteration
        temp := make([]int, n)
        copy(temp, dist)

        for _, f := range flights {
            u, v, price := f[0], f[1], f[2]
            if dist[u] != INF && dist[u]+price < temp[v] {
                temp[v] = dist[u] + price
            }
        }

        dist = temp
    }

    if dist[dst] == INF {
        return -1
    }
    return dist[dst]
}

// FindCheapestPriceBFS uses BFS approach
func FindCheapestPriceBFS(n int, flights [][]int, src int, dst int, k int) int {
    graph := make(map[int][][2]int)
    for _, f := range flights {
        u, v, price := f[0], f[1], f[2]
        graph[u] = append(graph[u], [2]int{v, price})
    }

    type State struct {
        node, cost, stops int
    }

    queue := []State{{src, 0, 0}}
    minCost := make([]int, n)
    for i := range minCost {
        minCost[i] = INF
    }
    minCost[src] = 0

    for len(queue) > 0 {
        curr := queue[0]
        queue = queue[1:]

        if curr.stops > k {
            continue
        }

        for _, edge := range graph[curr.node] {
            neighbor, price := edge[0], edge[1]
            newCost := curr.cost + price

            if newCost < minCost[neighbor] {
                minCost[neighbor] = newCost
                queue = append(queue, State{neighbor, newCost, curr.stops + 1})
            }
        }
    }

    if minCost[dst] == INF {
        return -1
    }
    return minCost[dst]
}

func main() {
    // Test case 1
    n := 4
    flights := [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}
    fmt.Println(FindCheapestPrice(n, flights, 0, 3, 1)) // 700

    // Test case 2
    flights2 := [][]int{{0, 1, 100}, {1, 2, 100}, {0, 2, 500}}
    fmt.Println(FindCheapestPrice(3, flights2, 0, 2, 0)) // 500
}`
        },
        twists: [
            { id: '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-01-exactly-k-stops', name: 'Exactly K Stops', difficulty: 'Medium' },
            { id: '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-02-all-cheapest-paths', name: 'All Cheapest Paths', difficulty: 'Hard' },
            { id: '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-03-return-the-route', name: 'Return the Route', difficulty: 'Medium' },
            { id: '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-04-multiple-destinations', name: 'Multiple Destinations', difficulty: 'Medium' },
            { id: '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-05-bidirectional-flights', name: 'Bidirectional Flights', difficulty: 'Easy' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/01-cheapest-flights-k-stops', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/01-cheapest-flights-k-stops'] = problem;

})();
