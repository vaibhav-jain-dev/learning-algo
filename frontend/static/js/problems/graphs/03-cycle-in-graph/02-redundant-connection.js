/**
 * Redundant Connection
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Redundant Connection',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph',
        description: 'In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is given as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph. Return an edge that can be removed so that the resulting',
        problem: 'Detect cycles using DFS with node coloring: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node.',
        complexity: {
            time: 'O(N * alpha(N))',
            space: 'O(N)'
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
        "edges": [
                [
                        1,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        3
                ]
        ]
},
        output: [2, 3],
        explanation: 'Exploring the graph structure, we find the required path or value. For input edges=[[1, 2], [1, 3], [2, 3]], the result is [2, 3].'
    },
    {
        input: {
        "edges": [
                [
                        1,
                        2
                ],
                [
                        2,
                        3
                ],
                [
                        3,
                        4
                ],
                [
                        1,
                        4
                ],
                [
                        1,
                        5
                ]
        ]
},
        output: [1, 4],
        explanation: 'Exploring the graph structure, we find the required path or value. For input edges=[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]], the result is [1, 4].'
    }
        ],
        solutions: {
            python: `def findRedundantConnection(edges):
    """
    Redundant Connection - Union-Find to detect cycle-causing edge.

    Time: O(N * alpha(N)) where alpha is inverse Ackermann (nearly O(N))
    Space: O(N) for parent and rank arrays
    """
    n = len(edges)
    parent = list(range(n + 1))  # Nodes are 1-indexed
    rank = [0] * (n + 1)

    def find(x):
        """Find with path compression"""
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        """Union by rank. Returns False if x and y already connected (cycle)"""
        px, py = find(x), find(y)

        if px == py:
            return False  # Cycle detected!

        # Union by rank
        if rank[px] < rank[py]:
            parent[px] = py
        elif rank[px] > rank[py]:
            parent[py] = px
        else:
            parent[py] = px
            rank[px] += 1

        return True

    # Process edges - first edge that creates a cycle is redundant
    for u, v in edges:
        if not union(u, v):
            return [u, v]

    return []


# Test
if __name__ == "__main__":
    # Example 1
    edges1 = [[1, 2], [1, 3], [2, 3]]
    print(findRedundantConnection(edges1))  # Output: [2, 3]

    # Example 2
    edges2 = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]
    print(findRedundantConnection(edges2))  # Output: [1, 4]`,
            go: `package main

import "fmt"

// findRedundantConnection uses Union-Find to detect the cycle-causing edge.
// Time: O(N * alpha(N)), Space: O(N)
func findRedundantConnection(edges [][]int) []int {
    n := len(edges)
    parent := make([]int, n+1)
    rank := make([]int, n+1)

    // Initialize: each node is its own parent
    for i := range parent {
        parent[i] = i
    }

    // Find with path compression
    var find func(x int) int
    find = func(x int) int {
        if parent[x] != x {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }

    // Union by rank. Returns false if cycle detected
    union := func(x, y int) bool {
        px, py := find(x), find(y)

        if px == py {
            return false // Cycle detected!
        }

        // Union by rank
        if rank[px] < rank[py] {
            parent[px] = py
        } else if rank[px] > rank[py] {
            parent[py] = px
        } else {
            parent[py] = px
            rank[px]++
        }

        return true
    }

    // Process edges - first edge that creates a cycle is redundant
    for _, edge := range edges {
        if !union(edge[0], edge[1]) {
            return edge
        }
    }

    return []int{}
}

func main() {
    // Example 1
    edges1 := [][]int{{1, 2}, {1, 3}, {2, 3}}
    fmt.Println(findRedundantConnection(edges1)) // Output: [2 3]

    // Example 2
    edges2 := [][]int{{1, 2}, {2, 3}, {3, 4}, {1, 4}, {1, 5}}
    fmt.Println(findRedundantConnection(edges2)) // Output: [1 4]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/02-redundant-connection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/02-redundant-connection'] = problem;

})();
