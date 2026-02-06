/**
 * Critical Connections in a Network
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Critical Connections in a Network',
        difficulty: 'Hard',
        algorithm: 'graph-connections',
        parent: '10-airport-connections',
        description: 'There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. A critical connection is a connection that, if removed, will make some servers unable to reach some other server. Return all critical connections in the network in any order.',
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        hints: [
            'Think about how to traverse all connected cells from a starting point.',
            'Use DFS or BFS to explore all 4-directional neighbors.',
            'Mark cells as visited to avoid counting them twice.',
            'Track the metric you need (area, count) during traversal.',
            'Consider edge cases: empty grid, all water, all land.'
        ],
        examples: [
    {
        input: {
        "n": 4,
        "connections": [
                [
                        0,
                        1
                ],
                [
                        1,
                        2
                ],
                [
                        2,
                        0
                ],
                [
                        1,
                        3
                ]
        ]
},
        output: [[1, 3]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=4, connections=[[0, 1], [1, 2], [2, 0], [1, 3]], the result is [[1, 3]].'
    }
        ],
        solutions: {
            python: `from collections import defaultdict

def criticalConnections(n, connections):
    """
    Critical Connections - Tarjan's Algorithm for Bridges

    An edge is a bridge (critical connection) if removing it
    disconnects the graph. Use DFS with discovery times and
    low-link values to find bridges.

    Time: O(V + E)
    Space: O(V + E)
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v in connections:
        graph[u].append(v)
        graph[v].append(u)

    # Discovery time and low-link values
    disc = [-1] * n
    low = [-1] * n
    bridges = []
    time = [0]  # Use list to allow modification in nested function

    def dfs(node, parent):
        disc[node] = low[node] = time[0]
        time[0] += 1

        for neighbor in graph[node]:
            if disc[neighbor] == -1:  # Not visited
                dfs(neighbor, node)
                low[node] = min(low[node], low[neighbor])

                # If low[neighbor] > disc[node], edge is a bridge
                if low[neighbor] > disc[node]:
                    bridges.append([node, neighbor])

            elif neighbor != parent:  # Back edge (not parent)
                low[node] = min(low[node], disc[neighbor])

    # Start DFS from node 0
    dfs(0, -1)

    return bridges


# Test
if __name__ == "__main__":
    # Test case 1
    n = 4
    connections = [[0,1],[1,2],[2,0],[1,3]]
    print(criticalConnections(n, connections))  # [[1, 3]]

    # Test case 2
    n = 2
    connections = [[0,1]]
    print(criticalConnections(n, connections))  # [[0, 1]]`,
            go: `package main

import "fmt"

// CriticalConnections finds all bridge edges in undirected graph
// Uses Tarjan's algorithm
// Time: O(V+E), Space: O(V+E)
func CriticalConnections(n int, connections [][]int) [][]int {
    // Build adjacency list
    graph := make([][]int, n)
    for i := range graph {
        graph[i] = []int{}
    }

    for _, conn := range connections {
        u, v := conn[0], conn[1]
        graph[u] = append(graph[u], v)
        graph[v] = append(graph[v], u)
    }

    disc := make([]int, n)  // Discovery time
    low := make([]int, n)   // Low-link value
    for i := range disc {
        disc[i] = -1
    }

    bridges := [][]int{}
    time := 0

    var dfs func(node, parent int)
    dfs = func(node, parent int) {
        disc[node] = time
        low[node] = time
        time++

        for _, neighbor := range graph[node] {
            if disc[neighbor] == -1 { // Not visited
                dfs(neighbor, node)
                low[node] = min(low[node], low[neighbor])

                // Bridge condition
                if low[neighbor] > disc[node] {
                    bridges = append(bridges, []int{node, neighbor})
                }
            } else if neighbor != parent { // Back edge
                low[node] = min(low[node], disc[neighbor])
            }
        }
    }

    dfs(0, -1)

    return bridges
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func main() {
    // Test case 1
    n := 4
    connections := [][]int{{0, 1}, {1, 2}, {2, 0}, {1, 3}}
    fmt.Println(CriticalConnections(n, connections)) // [[1 3]]

    // Test case 2
    n = 2
    connections = [][]int{{0, 1}}
    fmt.Println(CriticalConnections(n, connections)) // [[0 1]]
}`
        },
        twists: [
            { id: '10-airport-connections/01-critical-connections/twist-01-critical-nodes-instead', name: 'Critical Nodes Instead', difficulty: 'Hard' },
            { id: '10-airport-connections/01-critical-connections/twist-02-bridge-edge-count-only', name: 'Bridge Edge Count Only', difficulty: 'Easy' },
            { id: '10-airport-connections/01-critical-connections/twist-03-make-all-edges-non-critical', name: 'Make All Edges Non-Critical', difficulty: 'Very Hard' },
            { id: '10-airport-connections/01-critical-connections/twist-04-weighted-critical-connections', name: 'Weighted Critical Connections', difficulty: 'Hard' },
            { id: '10-airport-connections/01-critical-connections/twist-05-directed-critical-connections', name: 'Directed Critical Connections', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/01-critical-connections', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/01-critical-connections'] = problem;

})();
