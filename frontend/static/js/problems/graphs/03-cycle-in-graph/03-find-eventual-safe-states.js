/**
 * Find Eventual Safe States
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Eventual Safe States',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph',
        description: 'There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i]. A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a terminal node (or another safe node). Return an array containing all the safe nodes of .',
        problem: 'Detect cycles using DFS with node coloring: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        hints: [
            'Use three states: unvisited, in-progress, completed.',
            'A back edge to an in-progress node indicates a cycle.',
            'For undirected graphs, track parent to avoid false positives.',
            'Consider using Union-Find as an alternative approach.',
            'DFS naturally handles cycle detection with recursion stack.'
        ],
        examples: [
    {
        input: {
        "graph": [
                [
                        1,
                        2
                ],
                [
                        2,
                        3
                ],
                [
                        5
                ],
                [
                        0
                ],
                [
                        5
                ],
                [],
                []
        ]
},
        output: [2, 4, 5, 6],
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "graph": [
                [
                        1,
                        2,
                        3,
                        4
                ],
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ],
                [
                        0,
                        4
                ],
                []
        ]
},
        output: [4],
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `def eventualSafeNodes(graph):
    """
    Find Eventual Safe States - DFS with coloring to find nodes not in cycles.

    A safe node is one that doesn't lead to a cycle (all paths end at terminal).

    Time: O(V + E) where V is nodes, E is edges
    Space: O(V) for color array and recursion stack
    """
    n = len(graph)
    # Colors: 0 = white (unvisited), 1 = gray (visiting), 2 = black (safe)
    color = [0] * n

    def dfs(node):
        """Returns True if node is safe (not part of or leading to a cycle)"""
        if color[node] == 1:  # Gray - in current path, cycle found
            return False
        if color[node] == 2:  # Black - already confirmed safe
            return True

        # Mark as visiting (gray)
        color[node] = 1

        # Check all neighbors
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False  # Neighbor leads to cycle

        # All paths from this node are safe
        color[node] = 2  # Mark as safe (black)
        return True

    # Find all safe nodes
    result = []
    for i in range(n):
        if dfs(i):
            result.append(i)

    return result


# Test
if __name__ == "__main__":
    # Example 1
    graph1 = [[1, 2], [2, 3], [5], [0], [5], [], []]
    print(eventualSafeNodes(graph1))  # Output: [2, 4, 5, 6]

    # Example 2
    graph2 = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]
    print(eventualSafeNodes(graph2))  # Output: [4]`,
            go: `package main

import "fmt"

// eventualSafeNodes finds all safe nodes using DFS with coloring.
// Time: O(V + E), Space: O(V)
func eventualSafeNodes(graph [][]int) []int {
    n := len(graph)
    // Colors: 0 = white (unvisited), 1 = gray (visiting), 2 = black (safe)
    color := make([]int, n)

    var dfs func(node int) bool
    dfs = func(node int) bool {
        if color[node] == 1 { // Gray - cycle found
            return false
        }
        if color[node] == 2 { // Black - already safe
            return true
        }

        // Mark as visiting (gray)
        color[node] = 1

        // Check all neighbors
        for _, neighbor := range graph[node] {
            if !dfs(neighbor) {
                return false // Neighbor leads to cycle
            }
        }

        // All paths from this node are safe
        color[node] = 2 // Mark as safe (black)
        return true
    }

    // Find all safe nodes
    result := []int{}
    for i := 0; i < n; i++ {
        if dfs(i) {
            result = append(result, i)
        }
    }

    return result
}

func main() {
    // Example 1
    graph1 := [][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}}
    fmt.Println(eventualSafeNodes(graph1)) // Output: [2 4 5 6]

    // Example 2
    graph2 := [][]int{{1, 2, 3, 4}, {1, 2}, {3, 4}, {0, 4}, {}}
    fmt.Println(eventualSafeNodes(graph2)) // Output: [4]
}`
        },
        twists: [
            { id: '03-cycle-in-graph/03-find-eventual-safe-states/twist-01-find-eventual-safe-states-using-reverse-graph-bfs', name: 'Find Eventual Safe States Using Reverse Graph BFS', difficulty: 'Medium' },
            { id: '03-cycle-in-graph/03-find-eventual-safe-states/twist-02-find-unsafe-states-and-the-cycles-they-belong-to', name: 'Find Unsafe States and the Cycles They Belong To', difficulty: 'Hard' },
            { id: '03-cycle-in-graph/03-find-eventual-safe-states/twist-03-safe-states-in-an-undirected-graph', name: 'Safe States in an Undirected Graph', difficulty: 'Hard' },
            { id: '03-cycle-in-graph/03-find-eventual-safe-states/twist-04-safe-states-with-time-varying-edges', name: 'Safe States with Time-Varying Edges', difficulty: 'Very Hard' },
            { id: '03-cycle-in-graph/03-find-eventual-safe-states/twist-05-output-prediction-which-nodes-are-safe', name: 'Output Prediction: Which Nodes are Safe?', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/03-find-eventual-safe-states', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/03-find-eventual-safe-states'] = problem;

})();
