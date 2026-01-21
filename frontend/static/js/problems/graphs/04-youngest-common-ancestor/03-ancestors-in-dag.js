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
            python: `def allAncestorsOfANodeInADag(data):
    """
    All Ancestors of a Node in a DAG

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

// AllAncestorsOfANodeInADag solves the All Ancestors of a Node in a DAG problem.
// Time: O(n), Space: O(n)
func AllAncestorsOfANodeInADag(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/03-ancestors-in-dag', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/03-ancestors-in-dag'] = problem;

})();
