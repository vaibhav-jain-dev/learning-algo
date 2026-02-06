/**
 * Min Cost to Connect All Points
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Cost to Connect All Points',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'Given an array points representing integer coordinates of some points on a 2D-plane, return the minimum cost to make all points connected using Manhattan distance.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n^2 log n)',
            space: 'O(n^2)'
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
        explanation: 'Processing the input data produces the output. For input points=[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]], the result is 20.'
    }
        ],
        solutions: {
            python: `def minCostToConnectAllPoints(data):
    """
    Min Cost to Connect All Points using Kruskal's Algorithm

    Time: O(n^2 log n)
    Space: O(n^2)
    """
    points = data["points"]
    n = len(points)

    if n <= 1:
        return 0

    # Union-Find data structure
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])  # Path compression
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        # Union by rank
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    # Create all edges with Manhattan distance
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
            edges.append((dist, i, j))

    # Sort edges by weight
    edges.sort()

    # Kruskal's algorithm
    total_cost = 0
    edges_used = 0

    for cost, u, v in edges:
        if union(u, v):
            total_cost += cost
            edges_used += 1
            if edges_used == n - 1:
                break

    return total_cost


# Test
if __name__ == "__main__":
    data = {"points": [[0,0], [2,2], [3,10], [5,2], [7,0]]}
    print(minCostToConnectAllPoints(data))  # Output: 20`,
            go: `package main

import (
    "fmt"
    "sort"
)

// MinCostToConnectAllPoints solves the Min Cost to Connect All Points problem.
// Time: O(n^2 log n), Space: O(n^2)
func MinCostToConnectAllPoints(data map[string]interface{}) int {
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

    // Union-Find
    parent := make([]int, n)
    rank := make([]int, n)
    for i := range parent {
        parent[i] = i
    }

    var find func(x int) int
    find = func(x int) int {
        if parent[x] != x {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }

    union := func(x, y int) bool {
        px, py := find(x), find(y)
        if px == py {
            return false
        }
        if rank[px] < rank[py] {
            px, py = py, px
        }
        parent[py] = px
        if rank[px] == rank[py] {
            rank[px]++
        }
        return true
    }

    abs := func(x int) int {
        if x < 0 {
            return -x
        }
        return x
    }

    // Create edges
    type edge struct {
        cost, u, v int
    }
    var edges []edge
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            dist := abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1])
            edges = append(edges, edge{dist, i, j})
        }
    }

    // Sort edges
    sort.Slice(edges, func(i, j int) bool {
        return edges[i].cost < edges[j].cost
    })

    // Kruskal's algorithm
    totalCost := 0
    edgesUsed := 0

    for _, e := range edges {
        if union(e.u, e.v) {
            totalCost += e.cost
            edgesUsed++
            if edgesUsed == n-1 {
                break
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
    fmt.Println(MinCostToConnectAllPoints(data)) // 20
}`
        },
        twists: [
            { id: '06-kruskals-algorithm/01-min-cost-to-connect/twist-01-prim-vs-kruskal-comparison', name: 'Prim vs Kruskal Comparison', difficulty: 'Medium' },
            { id: '06-kruskals-algorithm/01-min-cost-to-connect/twist-02-connect-with-maximum-distance-constraint', name: 'Connect with Maximum Distance Constraint', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/01-min-cost-to-connect/twist-03-euclidean-distance-mst', name: 'Euclidean Distance MST', difficulty: 'Medium' },
            { id: '06-kruskals-algorithm/01-min-cost-to-connect/twist-04-k-clusters', name: 'K Clusters', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/01-min-cost-to-connect/twist-05-steiner-tree-problem', name: 'Steiner Tree Problem', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/01-min-cost-to-connect', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/01-min-cost-to-connect'] = problem;

})();
