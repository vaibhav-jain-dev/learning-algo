/**
 * Redundant Connection
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Redundant Connection',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'In this problem, a tree is an undirected graph that is connected and has no cycles. Given a graph that started as a tree with n nodes and n edges (one extra edge was added), find and return the edge that can be removed so the resulting graph is a tree.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n * alpha(n))',
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
        explanation: 'Processing the input data produces the output. For input edges=[[1, 2], [1, 3], [2, 3]], the result is [2, 3].'
    }
        ],
        solutions: {
            python: `def findRedundantConnection(edges):
    """
    Redundant Connection using Union-Find

    Find the edge that creates a cycle in the graph.
    The redundant edge is the one that connects two already-connected nodes.

    Time: O(n * alpha(n))
    Space: O(n)
    """
    n = len(edges)

    parent = list(range(n + 1))
    rank = [0] * (n + 1)

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False  # Already connected - this is redundant!

        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    # Process edges, return the first one that creates a cycle
    for u, v in edges:
        if not union(u, v):
            return [u, v]

    return []


# Test
if __name__ == "__main__":
    print(findRedundantConnection([[1,2],[1,3],[2,3]]))  # Output: [2, 3]`,
            go: `package main

import "fmt"

// FindRedundantConnection finds the edge that can be removed.
// Time: O(n * alpha(n)), Space: O(n)
func FindRedundantConnection(edges [][]int) []int {
    n := len(edges)

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
            return false // Already connected
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

    // Process edges
    for _, edge := range edges {
        u, v := edge[0], edge[1]
        if !union(u, v) {
            return []int{u, v}
        }
    }

    return []int{}
}

func main() {
    fmt.Println(FindRedundantConnection([][]int{{1,2},{1,3},{2,3}})) // Output: [2 3]
}`
        },
        twists: [
            { id: '05-union-find/02-redundant-connection/twist-01-redundant-connection-in-directed-graph', name: 'Redundant Connection in Directed Graph', difficulty: 'Hard' },
            { id: '05-union-find/02-redundant-connection/twist-02-multiple-redundant-edges', name: 'Multiple Redundant Edges', difficulty: 'Hard' },
            { id: '05-union-find/02-redundant-connection/twist-03-last-redundant-edge-only', name: 'Last Redundant Edge Only', difficulty: 'Medium' },
            { id: '05-union-find/02-redundant-connection/twist-04-minimum-weight-redundant-edge', name: 'Minimum Weight Redundant Edge', difficulty: 'Hard' },
            { id: '05-union-find/02-redundant-connection/twist-05-dfs-cycle-detection-alternative', name: 'DFS Cycle Detection Alternative', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/02-redundant-connection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/02-redundant-connection'] = problem;

})();
