/**
 * Is Graph Bipartite
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Is Graph Bipartite',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable',
        description: 'Given an undirected graph, return true if and only if it is bipartite. A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B. The graph is given as an adjacency list where graph[i] is a list of nodes connected to node i.',
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
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
        "graph": [
                [
                        1,
                        2,
                        3
                ],
                [
                        0,
                        2
                ],
                [
                        0,
                        1,
                        3
                ],
                [
                        0,
                        2
                ]
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]], the result is false.'
    },
    {
        input: {
        "graph": [
                [
                        1,
                        3
                ],
                [
                        0,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        0,
                        2
                ]
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 3], [0, 2], [1, 3], [0, 2]], the result is true.'
    }
        ],
        solutions: {
            python: `from collections import deque

def isBipartite(graph):
    """
    Is Graph Bipartite - Graph Coloring with BFS

    Try to 2-color the graph. If we can assign colors such that
    no adjacent nodes have the same color, the graph is bipartite.

    Time: O(V + E)
    Space: O(V)
    """
    n = len(graph)
    color = [-1] * n  # -1 = uncolored, 0 or 1 = color

    # Handle disconnected components
    for start in range(n):
        if color[start] != -1:
            continue

        # BFS from this node
        queue = deque([start])
        color[start] = 0

        while queue:
            node = queue.popleft()

            for neighbor in graph[node]:
                if color[neighbor] == -1:
                    # Color with opposite color
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    # Same color as current node - not bipartite
                    return False

    return True


def isBipartiteDFS(graph):
    """Alternative DFS solution."""
    n = len(graph)
    color = [-1] * n

    def dfs(node, c):
        color[node] = c
        for neighbor in graph[node]:
            if color[neighbor] == -1:
                if not dfs(neighbor, 1 - c):
                    return False
            elif color[neighbor] == c:
                return False
        return True

    for i in range(n):
        if color[i] == -1:
            if not dfs(i, 0):
                return False

    return True


# Test
if __name__ == "__main__":
    # Test case 1: Not bipartite
    graph1 = [[1,2,3],[0,2],[0,1,3],[0,2]]
    print(isBipartite(graph1))  # False

    # Test case 2: Bipartite
    graph2 = [[1,3],[0,2],[1,3],[0,2]]
    print(isBipartite(graph2))  # True`,
            go: `package main

import "fmt"

// IsBipartite checks if graph can be 2-colored
// Time: O(V+E), Space: O(V)
func IsBipartite(graph [][]int) bool {
    n := len(graph)
    color := make([]int, n)
    for i := range color {
        color[i] = -1 // -1 = uncolored
    }

    // Handle disconnected components
    for start := 0; start < n; start++ {
        if color[start] != -1 {
            continue
        }

        // BFS from this node
        queue := []int{start}
        color[start] = 0

        for len(queue) > 0 {
            node := queue[0]
            queue = queue[1:]

            for _, neighbor := range graph[node] {
                if color[neighbor] == -1 {
                    // Color with opposite color
                    color[neighbor] = 1 - color[node]
                    queue = append(queue, neighbor)
                } else if color[neighbor] == color[node] {
                    // Same color - not bipartite
                    return false
                }
            }
        }
    }

    return true
}

// IsBipartiteDFS uses DFS for graph coloring
func IsBipartiteDFS(graph [][]int) bool {
    n := len(graph)
    color := make([]int, n)
    for i := range color {
        color[i] = -1
    }

    var dfs func(node, c int) bool
    dfs = func(node, c int) bool {
        color[node] = c
        for _, neighbor := range graph[node] {
            if color[neighbor] == -1 {
                if !dfs(neighbor, 1-c) {
                    return false
                }
            } else if color[neighbor] == c {
                return false
            }
        }
        return true
    }

    for i := 0; i < n; i++ {
        if color[i] == -1 {
            if !dfs(i, 0) {
                return false
            }
        }
    }

    return true
}

func main() {
    // Test case 1: Not bipartite
    graph1 := [][]int{{1, 2, 3}, {0, 2}, {0, 1, 3}, {0, 2}}
    fmt.Println(IsBipartite(graph1)) // false

    // Test case 2: Bipartite
    graph2 := [][]int{{1, 3}, {0, 2}, {1, 3}, {0, 2}}
    fmt.Println(IsBipartite(graph2)) // true
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/01-is-graph-bipartite', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/01-is-graph-bipartite'] = problem;

})();
