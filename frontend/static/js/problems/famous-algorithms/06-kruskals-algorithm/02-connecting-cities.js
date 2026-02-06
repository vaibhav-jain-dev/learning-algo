/**
 * Connecting Cities With Minimum Cost
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Connecting Cities With Minimum Cost',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'There are n cities numbered from 1 to n. You are given connections where connections[i] = [city1, city2, cost] represents a bidirectional road. Return the minimum cost to connect all cities, or -1 if impossible.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(E log E)',
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
        "n": 3,
        "connections": [
                [
                        1,
                        2,
                        5
                ],
                [
                        1,
                        3,
                        6
                ],
                [
                        2,
                        3,
                        1
                ]
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input n=3, connections=[[1, 2, 5], [1, 3, 6], [2, 3, 1]], the result is 6.'
    }
        ],
        solutions: {
            python: `def connectingCitiesWithMinimumCost(data):
    """
    Connecting Cities With Minimum Cost using Kruskal's Algorithm

    Time: O(E log E)
    Space: O(n)
    """
    n = data["n"]
    connections = data["connections"]

    if n <= 1:
        return 0

    # Union-Find data structure
    parent = list(range(n + 1))  # Cities are 1-indexed
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

    # Sort connections by cost
    connections.sort(key=lambda x: x[2])

    # Kruskal's algorithm
    total_cost = 0
    edges_used = 0

    for city1, city2, cost in connections:
        if union(city1, city2):
            total_cost += cost
            edges_used += 1
            if edges_used == n - 1:
                break

    # Check if all cities are connected
    return total_cost if edges_used == n - 1 else -1


# Test
if __name__ == "__main__":
    data = {"n": 3, "connections": [[1,2,5], [1,3,6], [2,3,1]]}
    print(connectingCitiesWithMinimumCost(data))  # Output: 6`,
            go: `package main

import (
    "fmt"
    "sort"
)

// ConnectingCitiesWithMinimumCost solves the Connecting Cities problem.
// Time: O(E log E), Space: O(n)
func ConnectingCitiesWithMinimumCost(data map[string]interface{}) int {
    n := int(data["n"].(float64))
    connectionsRaw := data["connections"].([]interface{})

    if n <= 1 {
        return 0
    }

    // Parse connections
    type connection struct {
        city1, city2, cost int
    }
    connections := make([]connection, len(connectionsRaw))
    for i, c := range connectionsRaw {
        conn := c.([]interface{})
        connections[i] = connection{
            int(conn[0].(float64)),
            int(conn[1].(float64)),
            int(conn[2].(float64)),
        }
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

    // Sort by cost
    sort.Slice(connections, func(i, j int) bool {
        return connections[i].cost < connections[j].cost
    })

    // Kruskal's algorithm
    totalCost := 0
    edgesUsed := 0

    for _, conn := range connections {
        if union(conn.city1, conn.city2) {
            totalCost += conn.cost
            edgesUsed++
            if edgesUsed == n-1 {
                break
            }
        }
    }

    if edgesUsed == n-1 {
        return totalCost
    }
    return -1
}

func main() {
    data := map[string]interface{}{
        "n": float64(3),
        "connections": []interface{}{
            []interface{}{float64(1), float64(2), float64(5)},
            []interface{}{float64(1), float64(3), float64(6)},
            []interface{}{float64(2), float64(3), float64(1)},
        },
    }
    fmt.Println(ConnectingCitiesWithMinimumCost(data)) // 6
}`
        },
        twists: [
            { id: '06-kruskals-algorithm/02-connecting-cities/twist-01-return-mst-edges', name: 'Return MST Edges', difficulty: 'Easy' },
            { id: '06-kruskals-algorithm/02-connecting-cities/twist-02-minimum-cost-to-add-one-more-city', name: 'Minimum Cost to Add One More City', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/02-connecting-cities/twist-03-disconnected-components-count', name: 'Disconnected Components Count', difficulty: 'Medium' },
            { id: '06-kruskals-algorithm/02-connecting-cities/twist-04-budget-constraint', name: 'Budget Constraint', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/02-connecting-cities/twist-05-bidirectional-vs-directed', name: 'Bidirectional vs Directed', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities'] = problem;

})();
