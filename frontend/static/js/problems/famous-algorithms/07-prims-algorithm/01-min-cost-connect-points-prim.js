/**
 * Min Cost to Connect Points (Prim's)
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Cost to Connect Points (Prim\'s)',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Connect all points with minimum cost using Manhattan distance. Use Prim\'s algorithm instead of Kruskal\'s.',
        problem: 'Build a Minimum Spanning Tree by greedily selecting edges. Either sort all edges and add them if they don\'t create a cycle (Kruskal\'s), or grow the tree from a starting node using the cheapest available edge (Prim\'s). This achieves O(n^2 log n) time with O(n) space.',
        complexity: {
            time: 'O(n^2 log n)',
            space: 'O(n)'
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
        "points": [
                [
                        0,
                        0
                ],
                [
                        2,
                        2
                ],
                [
                        3,
                        10
                ],
                [
                        5,
                        2
                ],
                [
                        7,
                        0
                ]
        ]
},
        output: 20,
        explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
    }
        ],
        solutions: {
            python: `def minCostToConnectPointsPrim(data):
    """
    Min Cost to Connect Points using Prim's Algorithm

    Time: O(n^2 log n) with heap, O(n^2) with array
    Space: O(n)
    """
    import heapq

    points = data["points"]
    n = len(points)

    if n <= 1:
        return 0

    def manhattan(i, j):
        return abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])

    # Prim's algorithm using min-heap
    visited = [False] * n
    min_heap = [(0, 0)]  # (cost, node)
    total_cost = 0
    edges_used = 0

    while min_heap and edges_used < n:
        cost, node = heapq.heappop(min_heap)

        if visited[node]:
            continue

        visited[node] = True
        total_cost += cost
        edges_used += 1

        # Add edges to unvisited neighbors
        for neighbor in range(n):
            if not visited[neighbor]:
                dist = manhattan(node, neighbor)
                heapq.heappush(min_heap, (dist, neighbor))

    return total_cost


# Test
if __name__ == "__main__":
    data = {"points": [[0,0], [2,2], [3,10], [5,2], [7,0]]}
    print(minCostToConnectPointsPrim(data))  # Output: 20`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

// Edge represents an edge with cost and destination node
type Edge struct {
    cost, node int
}

// MinHeap implements heap.Interface for edges
type MinHeap []Edge

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i].cost < h[j].cost }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MinHeap) Push(x interface{}) {
    *h = append(*h, x.(Edge))
}

func (h *MinHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

// MinCostToConnectPointsPrim solves using Prim's algorithm.
// Time: O(n^2 log n), Space: O(n)
func MinCostToConnectPointsPrim(data map[string]interface{}) int {
    pointsRaw := data["points"].([]interface{})
    n := len(pointsRaw)

    if n <= 1 {
        return 0
    }

    // Parse points
    points := make([][2]int, n)
    for i, p := range pointsRaw {
        pt := p.([]interface{})
        points[i] = [2]int{int(pt[0].(float64)), int(pt[1].(float64))}
    }

    abs := func(x int) int {
        if x < 0 {
            return -x
        }
        return x
    }

    manhattan := func(i, j int) int {
        return abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1])
    }

    // Prim's algorithm
    visited := make([]bool, n)
    h := &MinHeap{{0, 0}}
    heap.Init(h)

    totalCost := 0
    edgesUsed := 0

    for h.Len() > 0 && edgesUsed < n {
        e := heap.Pop(h).(Edge)

        if visited[e.node] {
            continue
        }

        visited[e.node] = true
        totalCost += e.cost
        edgesUsed++

        for neighbor := 0; neighbor < n; neighbor++ {
            if !visited[neighbor] {
                dist := manhattan(e.node, neighbor)
                heap.Push(h, Edge{dist, neighbor})
            }
        }
    }

    return totalCost
}

func main() {
    data := map[string]interface{}{
        "points": []interface{}{
            []interface{}{float64(0), float64(0)},
            []interface{}{float64(2), float64(2)},
            []interface{}{float64(3), float64(10)},
            []interface{}{float64(5), float64(2)},
            []interface{}{float64(7), float64(0)},
        },
    }
    fmt.Println(MinCostToConnectPointsPrim(data)) // 20
}`
        },
        twists: [
            { id: '07-prims-algorithm/01-min-cost-connect-points-prim/twist-01-o-n-2-prim-without-heap', name: 'O(n^2) Prim Without Heap', difficulty: 'Medium' },
            { id: '07-prims-algorithm/01-min-cost-connect-points-prim/twist-02-connect-points-with-limited-budget', name: 'Connect Points with Limited Budget', difficulty: 'Hard' },
            { id: '07-prims-algorithm/01-min-cost-connect-points-prim/twist-03-chebyshev-distance-mst', name: 'Chebyshev Distance MST', difficulty: 'Medium' },
            { id: '07-prims-algorithm/01-min-cost-connect-points-prim/twist-04-nearest-neighbor-heuristic', name: 'Nearest Neighbor Heuristic', difficulty: 'Easy' },
            { id: '07-prims-algorithm/01-min-cost-connect-points-prim/twist-05-rectilinear-steiner-mst', name: 'Rectilinear Steiner MST', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim'] = problem;

})();
