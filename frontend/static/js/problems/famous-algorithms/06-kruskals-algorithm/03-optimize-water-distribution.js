/**
 * Optimize Water Distribution in a Village
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Optimize Water Distribution in a Village',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'There are n houses. For each house, you can either build a well inside it (costs wells[i]) or lay a pipe from another house (costs given in pipes). Return the minimum cost to supply water to all houses.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O((n + E) log(n + E))',
            space: 'O(n + E)'
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
        "wells": [
                1,
                2,
                2
        ],
        "pipes": [
                [
                        1,
                        2,
                        1
                ],
                [
                        2,
                        3,
                        1
                ]
        ]
},
        output: 3,
        explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
    }
        ],
        solutions: {
            python: `def optimizeWaterDistributionInAVillage(data):
    """
    Optimize Water Distribution in a Village using Kruskal's Algorithm

    Key insight: Add a virtual node 0 representing the water source.
    Connect node 0 to each house i with edge cost = wells[i-1].
    Then find MST of this augmented graph.

    Time: O((n + E) log(n + E))
    Space: O(n + E)
    """
    n = data["n"]
    wells = data["wells"]
    pipes = data["pipes"]

    # Union-Find data structure
    parent = list(range(n + 1))  # 0 is virtual node, houses are 1 to n
    rank = [0] * (n + 1)

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    # Create edges: virtual node 0 connects to each house
    edges = []
    for i in range(n):
        edges.append((wells[i], 0, i + 1))  # (cost, from, to)

    # Add pipe edges
    for house1, house2, cost in pipes:
        edges.append((cost, house1, house2))

    # Sort edges by cost
    edges.sort()

    # Kruskal's algorithm
    total_cost = 0
    edges_used = 0

    for cost, u, v in edges:
        if union(u, v):
            total_cost += cost
            edges_used += 1
            if edges_used == n:  # Need n edges to connect n+1 nodes
                break

    return total_cost


# Test
if __name__ == "__main__":
    data = {"n": 3, "wells": [1, 2, 2], "pipes": [[1, 2, 1], [2, 3, 1]]}
    print(optimizeWaterDistributionInAVillage(data))  # Output: 3`,
            go: `package main

import (
    "fmt"
    "sort"
)

// OptimizeWaterDistributionInAVillage solves the water distribution problem.
// Uses Kruskal's with a virtual node for wells.
// Time: O((n + E) log(n + E)), Space: O(n + E)
func OptimizeWaterDistributionInAVillage(data map[string]interface{}) int {
    n := int(data["n"].(float64))
    wellsRaw := data["wells"].([]interface{})
    pipesRaw := data["pipes"].([]interface{})

    // Parse wells
    wells := make([]int, len(wellsRaw))
    for i, w := range wellsRaw {
        wells[i] = int(w.(float64))
    }

    // Union-Find
    parent := make([]int, n+1)
    rank := make([]int, n+1)
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

    // Create edges
    type edge struct {
        cost, u, v int
    }
    var edges []edge

    // Virtual node 0 connects to each house
    for i := 0; i < n; i++ {
        edges = append(edges, edge{wells[i], 0, i + 1})
    }

    // Add pipe edges
    for _, p := range pipesRaw {
        pipe := p.([]interface{})
        edges = append(edges, edge{
            int(pipe[2].(float64)),
            int(pipe[0].(float64)),
            int(pipe[1].(float64)),
        })
    }

    // Sort by cost
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
            if edgesUsed == n {
                break
            }
        }
    }

    return totalCost
}

func main() {
    data := map[string]interface{}{
        "n": float64(3),
        "wells": []interface{}{float64(1), float64(2), float64(2)},
        "pipes": []interface{}{
            []interface{}{float64(1), float64(2), float64(1)},
            []interface{}{float64(2), float64(3), float64(1)},
        },
    }
    fmt.Println(OptimizeWaterDistributionInAVillage(data)) // 3
}`
        },
        twists: [
            { id: '06-kruskals-algorithm/03-optimize-water-distribution/twist-01-multiple-water-sources', name: 'Multiple Water Sources', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/03-optimize-water-distribution/twist-02-maximum-flow-capacity', name: 'Maximum Flow Capacity', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/03-optimize-water-distribution/twist-03-maintenance-cost-over-time', name: 'Maintenance Cost Over Time', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/03-optimize-water-distribution/twist-04-no-virtual-node-approach', name: 'No Virtual Node Approach', difficulty: 'Medium' },
            { id: '06-kruskals-algorithm/03-optimize-water-distribution/twist-05-phased-construction', name: 'Phased Construction', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/03-optimize-water-distribution', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/03-optimize-water-distribution'] = problem;

})();
