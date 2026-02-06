/**
 * All Paths From Source to Target
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Paths From Source to Target',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Given a directed acyclic graph (**DAG**) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in **any order**. The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).',
        problem: 'Use Depth-First Search to explore the graph. DFS goes deep before going wide, using a stack (explicit or recursive call stack). Track visited nodes to avoid cycles.',
        complexity: {
            time: 'O(2^N * N)',
            space: 'O(N)'
        },
        hints: [
            'Start from the source node and explore as deep as possible.',
            'Use recursion or an explicit stack for DFS.',
            'Mark nodes as visited before exploring neighbors.',
            'Consider the order of exploration for the desired result.',
            'Handle disconnected components if needed.'
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
                        3
                ],
                [
                        3
                ],
                []
        ]
},
        output: [[0, 1, 3], [0, 2, 3]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input graph=[[1, 2], [3], [3], []], the result is [[0, 1, 3], [0, 2, 3]].'
    },
    {
        input: {
        "graph": [
                [
                        4,
                        3,
                        1
                ],
                [
                        3,
                        2,
                        4
                ],
                [
                        3
                ],
                [
                        4
                ],
                []
        ]
},
        output: [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input graph=[[4, 3, 1], [3, 2, 4], [3], [4], []], the result is [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]].'
    }
        ],
        solutions: {
            python: `def allPathsSourceTarget(graph):
    """
    All Paths From Source to Target - DFS backtracking on a DAG.

    Time: O(2^N * N) - exponential paths possible, each path up to N nodes
    Space: O(N) for recursion depth and current path
    """
    result = []
    target = len(graph) - 1

    def dfs(node, path):
        # If we reached the target, add current path to result
        if node == target:
            result.append(path[:])  # Make a copy of the path
            return

        # Explore all neighbors
        for neighbor in graph[node]:
            path.append(neighbor)
            dfs(neighbor, path)
            path.pop()  # Backtrack

    # Start DFS from node 0
    dfs(0, [0])
    return result


# Test
if __name__ == "__main__":
    # Example 1: graph = [[1,2],[3],[3],[]]
    graph1 = [[1, 2], [3], [3], []]
    print(allPathsSourceTarget(graph1))
    # Output: [[0,1,3], [0,2,3]]

    # Example 2: graph = [[4,3,1],[3,2,4],[3],[4],[]]
    graph2 = [[4, 3, 1], [3, 2, 4], [3], [4], []]
    print(allPathsSourceTarget(graph2))
    # Output: [[0,4], [0,3,4], [0,1,3,4], [0,1,2,3,4], [0,1,4]]`,
            go: `package main

import "fmt"

// allPathsSourceTarget finds all paths from node 0 to node n-1 in a DAG.
// Time: O(2^N * N), Space: O(N)
func allPathsSourceTarget(graph [][]int) [][]int {
    result := [][]int{}
    target := len(graph) - 1

    var dfs func(node int, path []int)
    dfs = func(node int, path []int) {
        // If we reached the target, add current path to result
        if node == target {
            // Make a copy of the path
            pathCopy := make([]int, len(path))
            copy(pathCopy, path)
            result = append(result, pathCopy)
            return
        }

        // Explore all neighbors
        for _, neighbor := range graph[node] {
            path = append(path, neighbor)
            dfs(neighbor, path)
            path = path[:len(path)-1] // Backtrack
        }
    }

    // Start DFS from node 0
    dfs(0, []int{0})
    return result
}

func main() {
    // Example 1
    graph1 := [][]int{{1, 2}, {3}, {3}, {}}
    fmt.Println(allPathsSourceTarget(graph1))
    // Output: [[0 1 3] [0 2 3]]

    // Example 2
    graph2 := [][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}}
    fmt.Println(allPathsSourceTarget(graph2))
    // Output: [[0 4] [0 3 4] [0 1 3 4] [0 1 2 3 4] [0 1 4]]
}`
        },
        twists: [
            {
                title: 'Count Paths Instead of Listing Them',
                difficulty: 'Medium',
                description: 'Instead of returning all paths, just return the total count of paths from source to target. Optimize to avoid materializing each path.',
                whyDifferent: 'When you only need the count, you can use memoization/dynamic programming instead of backtracking. This shifts from exponential space (storing paths) to polynomial space (storing counts per node).',
                example: 'Graph: [[1,2],[3],[3],[]]. All paths: [[0,1,3],[0,2,3]]. Count: 2. With memoization, dp[0]=2, dp[1]=1, dp[2]=1, dp[3]=1.'
            },
            {
                title: 'All Paths in a Graph with Cycles',
                difficulty: 'Hard',
                description: 'Find all simple paths (no repeated nodes) from source to target in a general directed graph that may contain cycles.',
                whyDifferent: 'The original DAG guarantee means no cycles, so no visited tracking is needed. With cycles, you must maintain a visited set in the current path and backtrack it, adding significant complexity.',
                example: 'Graph: 0->1, 1->2, 2->0, 2->3. Paths from 0 to 3: [0,1,2,3]. Without visited tracking, 0->1->2->0->1->... loops forever.'
            },
            {
                title: 'Shortest Path Among All Paths',
                difficulty: 'Medium',
                description: 'Find the shortest path (fewest edges) from source to target. Return the path itself, not just its length.',
                whyDifferent: 'DFS naturally finds all paths but not necessarily the shortest first. This twist pushes you toward BFS, which guarantees shortest path in unweighted graphs. Using DFS for this requires comparing all paths.',
                example: 'Graph: [[1,2],[3],[1,3],[]]. DFS might find [0,1,3] first, but [0,2,3] is same length. BFS finds shortest: [0,1,3] or [0,2,3] (length 3).'
            },
            {
                title: 'All Paths with Weighted Edges and Maximum Weight',
                difficulty: 'Hard',
                description: 'Each edge has a weight. Find all paths from source to target and return the one with maximum total weight.',
                whyDifferent: 'Introduces edge weights, transforming the problem from pure graph traversal to path optimization. You must track cumulative weights during backtracking and compare across all complete paths.',
                example: 'Graph edges: 0->1(w=5), 0->2(w=3), 1->3(w=2), 2->3(w=8). Path [0,1,3] weight=7, [0,2,3] weight=11. Return [0,2,3].'
            },
            {
                title: 'All Paths with BFS (Level-Order)',
                difficulty: 'Medium',
                description: 'Find all paths from source to target using BFS instead of DFS. Paths should be generated in order of increasing length.',
                whyDifferent: 'BFS explores paths by length, producing shorter paths first. The challenge is maintaining partial paths in the queue, which can consume significantly more memory than DFS backtracking.',
                example: 'Graph: [[1,2],[3],[1,3],[]]. BFS order finds paths: [0,1,3] and [0,2,3] (length 3) before any length-4 paths.'
            },
            {
                title: 'Paths from Source to Target in an Undirected Graph',
                difficulty: 'Hard',
                description: 'Find all simple paths in an undirected graph. Since edges are bidirectional, you must avoid revisiting nodes within the same path.',
                whyDifferent: 'Undirected edges create many more potential paths and cycles. The visited tracking per path becomes critical, and the search space explodes compared to the DAG version.',
                example: 'Undirected: 0-1, 1-2, 0-2, 2-3. Paths 0->3: [0,1,2,3], [0,2,3], [0,2,1,...] - but 1 does not reach 3 without 2, so just [0,1,2,3] and [0,2,3].'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/03-all-paths-source-target', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/03-all-paths-source-target'] = problem;

})();
