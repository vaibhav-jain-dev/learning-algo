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
            { title: 'Return MST Edges', difficulty: 'Easy', description: 'Instead of returning just the total cost, return the list of edges that form the minimum spanning tree.', whyDifferent: 'Requires storing which edges were accepted during Kruskal\'s algorithm, not just accumulating the cost, adding bookkeeping to the union-find process.', example: 'For connections [[1,2,5],[1,3,6],[2,3,1]], return [[2,3,1],[1,2,5]] as the MST edges with total cost 6.' },
            { title: 'Minimum Cost to Add One More City', difficulty: 'Hard', description: 'After connecting all cities optimally, a new city is added with given connection costs. Find the minimum additional cost to connect it to the existing network.', whyDifferent: 'Only needs the cheapest single edge from the new city to any existing city (since the network is already connected), but understanding why is the insight.', example: 'After building MST for cities 1-3, city 4 arrives with connections to each. Just pick the cheapest connection to any existing city.' },
            { title: 'Disconnected Components Count', difficulty: 'Medium', description: 'If not all cities can be connected, return the number of disconnected groups instead of -1.', whyDifferent: 'Changes the output from a failure indicator to useful information -- count the remaining distinct Union-Find roots after processing all edges.', example: 'For 5 cities where only {1,2,3} and {4,5} are internally connected, return 2 groups instead of -1.' },
            { title: 'Budget Constraint', difficulty: 'Hard', description: 'You have a fixed budget B. Find the maximum number of cities that can be connected (in one component) within the budget.', whyDifferent: 'Cannot simply build the MST -- must decide which subset of edges to include under a budget constraint, potentially a variant of the prize-collecting MST problem.', example: 'With budget 10 and connections [[1,2,5],[1,3,6],[2,3,1]], you can connect cities 2,3 (cost 1) then 1,2 (cost 5) for total 6, connecting all 3 cities.' },
            { title: 'Bidirectional vs Directed', difficulty: 'Medium', description: 'If connections are directed (one-way roads), find the minimum cost to ensure all cities are reachable from city 1.', whyDifferent: 'Directed edges break the symmetry of MST -- you need a minimum spanning arborescence (Edmonds/Chu-Liu algorithm) instead of Kruskal\'s.', example: 'Directed edge [1,2,5] means road from city 1 to 2. Must ensure every city is reachable from city 1 via directed paths.' }
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
