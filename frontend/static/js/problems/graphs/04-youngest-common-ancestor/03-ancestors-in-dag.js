/**
 * All Ancestors of a Node in a DAG
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Ancestors of a Node in a DAG',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor',
        description: 'You are given a positive integer n representing the number of nodes of a Directed Acyclic Graph (DAG). The nodes are numbered from 0 to n - 1 (inclusive). You are also given a 2D integer array edges, where edges[i] = [fromi, toi] denotes that there is a unidirectional edge from fromi to toi in the graph. Return a list answer, where answer[i] is the list of ancestors of the ith node, sorted in ascending order. A node u is an ancestor of another node v if u can reach v via a set of edges.',
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        complexity: {
            time: 'O(N^2 + N * E)',
            space: 'O(N^2)'
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
        "n": 8,
        "edges": [
                [
                        0,
                        3
                ],
                [
                        0,
                        4
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        4
                ],
                [
                        2,
                        7
                ],
                [
                        3,
                        5
                ],
                [
                        3,
                        6
                ],
                [
                        3,
                        7
                ],
                [
                        4,
                        6
                ]
        ]
},
        output: [[], [], [], [0, 1], [0, 2], [0, 1, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=8, edges=[[0, 3], [0, 4], ..., [4, 6]] (length 9), the result is [[], ..., [0, 1, 2, 3]] (length 8).'
    },
    {
        input: {
        "n": 5,
        "edges": [
                [
                        0,
                        1
                ],
                [
                        0,
                        2
                ],
                [
                        0,
                        3
                ],
                [
                        0,
                        4
                ],
                [
                        1,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        1,
                        4
                ],
                [
                        2,
                        3
                ],
                [
                        2,
                        4
                ],
                [
                        3,
                        4
                ]
        ]
},
        output: [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=5, edges=[[0, 1], [0, 2], ..., [3, 4]] (length 10), the result is [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]].'
    }
        ],
        solutions: {
            python: `def getAncestors(n, edges):
    """
    All Ancestors of a Node in a DAG

    Time: O(N^2 + N * E) - DFS from each node
    Space: O(N^2) - storing ancestors for each node

    Approach: Reverse DFS
    - Build adjacency list for the graph
    - For each node, use DFS to find all nodes that can reach it
    - Alternative: Process nodes in topological order
    """
    from collections import defaultdict

    # Build graph (from -> to)
    graph = defaultdict(list)
    for frm, to in edges:
        graph[frm].append(to)

    # ancestors[i] = set of all ancestors of node i
    ancestors = [set() for _ in range(n)]

    def dfs(start, current, visited):
        """DFS to propagate ancestor information"""
        for neighbor in graph[current]:
            if start not in ancestors[neighbor]:
                ancestors[neighbor].add(start)
                dfs(start, neighbor, visited)

    # For each node, find all descendants and mark current as their ancestor
    for node in range(n):
        dfs(node, node, set())

    # Convert sets to sorted lists
    return [sorted(list(anc)) for anc in ancestors]


def allAncestorsOfANodeInADag(data):
    """
    Process input and find all ancestors
    """
    n = data.get('n')
    edges = data.get('edges', [])
    return getAncestors(n, edges)


# Alternative approach using topological sort
def getAncestorsTopological(n, edges):
    """
    Using topological sort for better efficiency
    """
    from collections import defaultdict, deque

    graph = defaultdict(list)
    indegree = [0] * n

    for frm, to in edges:
        graph[frm].append(to)
        indegree[to] += 1

    # Initialize ancestors
    ancestors = [set() for _ in range(n)]

    # Start with nodes having no incoming edges
    queue = deque([i for i in range(n) if indegree[i] == 0])

    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            # Add current node and all its ancestors to neighbor's ancestors
            ancestors[neighbor].add(node)
            ancestors[neighbor].update(ancestors[node])

            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return [sorted(list(anc)) for anc in ancestors]


# Test
if __name__ == "__main__":
    data = {
        "n": 8,
        "edges": [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
    }
    print(allAncestorsOfANodeInADag(data))
    # Expected: [[], [], [], [0,1], [0,2], [0,1,3], [0,1,2,3,4], [0,1,2,3]]`,
            go: `package main

import (
    "fmt"
    "sort"
)

// GetAncestors finds all ancestors for each node in a DAG
// Time: O(N^2 + N * E), Space: O(N^2)
func GetAncestors(n int, edges [][]int) [][]int {
    // Build graph
    graph := make([][]int, n)
    for i := range graph {
        graph[i] = []int{}
    }
    for _, edge := range edges {
        from, to := edge[0], edge[1]
        graph[from] = append(graph[from], to)
    }

    // ancestors[i] = set of all ancestors of node i
    ancestors := make([]map[int]bool, n)
    for i := range ancestors {
        ancestors[i] = make(map[int]bool)
    }

    // DFS to propagate ancestor information
    var dfs func(start, current int)
    dfs = func(start, current int) {
        for _, neighbor := range graph[current] {
            if !ancestors[neighbor][start] {
                ancestors[neighbor][start] = true
                dfs(start, neighbor)
            }
        }
    }

    // For each node, find all descendants
    for node := 0; node < n; node++ {
        dfs(node, node)
    }

    // Convert maps to sorted slices
    result := make([][]int, n)
    for i := 0; i < n; i++ {
        result[i] = make([]int, 0, len(ancestors[i]))
        for anc := range ancestors[i] {
            result[i] = append(result[i], anc)
        }
        sort.Ints(result[i])
    }

    return result
}

// GetAncestorsTopological uses topological sort approach
func GetAncestorsTopological(n int, edges [][]int) [][]int {
    graph := make([][]int, n)
    indegree := make([]int, n)

    for i := range graph {
        graph[i] = []int{}
    }

    for _, edge := range edges {
        from, to := edge[0], edge[1]
        graph[from] = append(graph[from], to)
        indegree[to]++
    }

    ancestors := make([]map[int]bool, n)
    for i := range ancestors {
        ancestors[i] = make(map[int]bool)
    }

    // Start with nodes having no incoming edges
    queue := []int{}
    for i := 0; i < n; i++ {
        if indegree[i] == 0 {
            queue = append(queue, i)
        }
    }

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]

        for _, neighbor := range graph[node] {
            ancestors[neighbor][node] = true
            for anc := range ancestors[node] {
                ancestors[neighbor][anc] = true
            }

            indegree[neighbor]--
            if indegree[neighbor] == 0 {
                queue = append(queue, neighbor)
            }
        }
    }

    result := make([][]int, n)
    for i := 0; i < n; i++ {
        result[i] = make([]int, 0, len(ancestors[i]))
        for anc := range ancestors[i] {
            result[i] = append(result[i], anc)
        }
        sort.Ints(result[i])
    }

    return result
}

func main() {
    n := 8
    edges := [][]int{{0,3},{0,4},{1,3},{2,4},{2,7},{3,5},{3,6},{3,7},{4,6}}

    result := GetAncestors(n, edges)
    fmt.Println(result)
    // Expected: [[] [] [] [0 1] [0 2] [0 1 3] [0 1 2 3 4] [0 1 2 3]]
}`
        },
        twists: [
            { title: 'All Descendants Instead', difficulty: 'Medium', description: 'Instead of finding ancestors of each node, find all descendants of each node in the DAG.', whyDifferent: 'You reverse the direction of propagation. Instead of tracing backward from each node, you trace forward, requiring a different traversal order.', example: 'DAG with edges [0->3,0->4,1->3]. Descendants of 0 are {3,4,5,6,7}, descendants of 1 are {3,5,6,7}.' },
            { title: 'Ancestors in a Tree Only', difficulty: 'Easy', description: 'The graph is guaranteed to be a tree (each node has exactly one parent). Find all ancestors of each node.', whyDifferent: 'In a tree, each node has a unique path to root. You simply walk up the parent chain, making the problem O(N*depth) without needing topological sort.', example: 'Tree with parent=[−1,0,0,1,1]. Ancestors of 3 are [0,1], ancestors of 4 are [0,1].' },
            { title: 'Count Common Ancestors', difficulty: 'Hard', description: 'Given two nodes u and v in the DAG, find the number of common ancestors they share.', whyDifferent: 'You need to compute ancestor sets for two specific nodes and intersect them, rather than computing all ancestors for every node.', example: 'Nodes 5 and 6 in the DAG. Ancestors of 5={0,1,3}, Ancestors of 6={0,1,2,3,4}. Common={0,1,3}, count=3.' },
            { title: 'Nearest Ancestor with Property', difficulty: 'Hard', description: 'Each node has a boolean property. For each node, find its nearest ancestor (in terms of shortest path) that has the property set to true.', whyDifferent: 'You cannot just collect all ancestors. You need BFS on the reverse graph and track distances, stopping at the first ancestor with the property.', example: 'Nodes 0-7, property true for nodes {0, 3}. Nearest true-ancestor of 5 is 3 (distance 1).' },
            { title: 'Transitive Reduction', difficulty: 'Very Hard', description: 'After finding all ancestors, remove redundant edges from the DAG. An edge u->v is redundant if there is another path from u to v.', whyDifferent: 'You use ancestor information to determine edge redundancy, combining set operations with graph structure in a way that tests deep understanding of reachability.', example: 'Edges [0->1, 0->2, 1->2]. Edge 0->2 is redundant because 0->1->2 exists. Remove it.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/03-ancestors-in-dag', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/03-ancestors-in-dag'] = problem;

})();
