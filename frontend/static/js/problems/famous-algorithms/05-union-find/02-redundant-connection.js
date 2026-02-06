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
            { title: 'Redundant Connection in Directed Graph', difficulty: 'Hard', description: 'In a directed graph that started as a rooted tree with one extra edge, find the edge that can be removed to restore the tree.', whyDifferent: 'Directed edges create two possible cases: a node with two parents, or a cycle. Requires handling both scenarios with different logic.', example: 'For edges [[1,2],[1,3],[2,3]], node 3 has two parents (1 and 2). Removing [2,3] restores the tree.' },
            { title: 'Multiple Redundant Edges', difficulty: 'Hard', description: 'If k extra edges were added to the tree (not just one), find all k redundant edges.', whyDifferent: 'After finding the first cycle-creating edge, the graph may still have additional redundant edges, requiring continued processing with Union-Find.', example: 'For a tree with 2 extra edges, process all edges and collect every edge where union returns false (both endpoints already connected).' },
            { title: 'Last Redundant Edge Only', difficulty: 'Medium', description: 'If multiple edges create cycles, return the one that appears last in the input (the original problem specification).', whyDifferent: 'Emphasizes the ordering constraint -- among all cycle-creating edges, the last one in the input array is the answer, not necessarily the first one detected.', example: 'For edges [[1,2],[2,3],[3,1],[1,4]], both [3,1] and potentially others create cycles. Return [3,1] since it appears last among redundant edges.' },
            { title: 'Minimum Weight Redundant Edge', difficulty: 'Hard', description: 'Edges have weights. Among all edges that could be removed to restore a tree, find the one with minimum weight.', whyDifferent: 'Cannot simply return the first cycle-creating edge. Must identify all edges in the cycle, then return the minimum-weight one from that cycle.', example: 'For weighted edges [[1,2,5],[2,3,1],[3,1,3]], the cycle is 1-2-3-1. Removing edge [2,3,1] (weight 1) is cheapest.' },
            { title: 'DFS Cycle Detection Alternative', difficulty: 'Medium', description: 'Solve the redundant connection problem using DFS cycle detection instead of Union-Find.', whyDifferent: 'Uses a fundamentally different approach -- build the graph incrementally and detect cycles via DFS back-edge detection rather than disjoint set operations.', example: 'Add edges one by one. Before adding each edge, run DFS/BFS to check if the endpoints are already connected. If so, that edge is redundant.' }
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
