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
