/**
 * Critical Connections in a Network
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Critical Connections in a Network',
        difficulty: 'Hard',
        algorithm: 'graph-connections',
        parent: '10-airport-connections',
        description: 'There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. A critical connection is a connection that, if removed, will make some servers unable to reach some other server. Return all critical connections in the network in any order.',
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
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
        "n": 4,
        "connections": [
                [
                        0,
                        1
                ],
                [
                        1,
                        2
                ],
                [
                        2,
                        0
                ],
                [
                        1,
                        3
                ]
        ]
},
        output: [[1, 3]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=4, connections=[[0, 1], [1, 2], [2, 0], [1, 3]], the result is [[1, 3]].'
    }
        ],
        solutions: {
            python: `def criticalConnectionsInANetwork(data):
    """
    Critical Connections in a Network

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

// CriticalConnectionsInANetwork solves the Critical Connections in a Network problem.
// Time: O(n), Space: O(n)
func CriticalConnectionsInANetwork(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '10-airport-connections/01-critical-connections', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/01-critical-connections'] = problem;

})();
