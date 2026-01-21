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
            python: `def isGraphBipartite(data):
    """
    Is Graph Bipartite

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

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

// IsGraphBipartite solves the Is Graph Bipartite problem.
// Time: O(n), Space: O(n)
func IsGraphBipartite(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

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
        window.ProblemRenderer.register('graphs', '09-two-colorable/01-is-graph-bipartite', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/01-is-graph-bipartite'] = problem;

})();
