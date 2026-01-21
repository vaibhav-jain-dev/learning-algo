/**
 * Find Eventual Safe States
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Eventual Safe States',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph',
        description: 'There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i]. A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a terminal node (or another safe node). Return an array containing all the safe nodes of ',
        problem: 'Detect cycles using DFS with node coloring: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
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
        "graph": [
                [
                        1,
                        2
                ],
                [
                        2,
                        3
                ],
                [
                        5
                ],
                [
                        0
                ],
                [
                        5
                ],
                [],
                []
        ]
},
        output: [2, 4, 5, 6],
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 2], [2, 3], ..., []] (length 7), the result is [2, 4, 5, 6].'
    },
    {
        input: {
        "graph": [
                [
                        1,
                        2,
                        3,
                        4
                ],
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ],
                [
                        0,
                        4
                ],
                []
        ]
},
        output: [4],
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []], the result is [4].'
    }
        ],
        solutions: {
            python: `def findEventualSafeStates(data):
    """
    Find Eventual Safe States

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

// FindEventualSafeStates solves the Find Eventual Safe States problem.
// Time: O(n), Space: O(n)
func FindEventualSafeStates(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/03-find-eventual-safe-states', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/03-find-eventual-safe-states'] = problem;

})();
