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
            python: `def allPathsFromSourceToTarget(data):
    """
    All Paths From Source to Target

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: DFS explores depth-first, ideal for paths and connectivity

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// AllPathsFromSourceToTarget solves the All Paths From Source to Target problem.
// Time: O(n), Space: O(n)
func AllPathsFromSourceToTarget(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: DFS explores depth-first, ideal for paths and connectivity

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
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
