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
            python: `def redundantConnection(data):
    """
    Redundant Connection

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

// RedundantConnection solves the Redundant Connection problem.
// Time: O(n), Space: O(n)
func RedundantConnection(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/02-redundant-connection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/02-redundant-connection'] = problem;

})();
