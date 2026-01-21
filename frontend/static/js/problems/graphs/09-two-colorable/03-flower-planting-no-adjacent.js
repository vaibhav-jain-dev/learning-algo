/**
 * Flower Planting With No Adjacent
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flower Planting With No Adjacent',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable',
        description: 'You have n gardens, labeled from 1 to n, and paths[i] = [xi, yi] describes a bidirectional path between garden xi and garden yi. In each garden, you want to plant one of 4 types of flowers. All gardens have at most 3 paths coming into or leaving it. Return any valid answer such that for every garden, no two adjacent gardens have the same flower type.',
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
        "n": 3,
        "paths": [
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
                        1
                ]
        ]
},
        output: [1, 2, 3],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=3, paths=[[1, 2], [2, 3], [3, 1]], the result is [1, 2, 3].'
    },
    {
        input: {
        "n": 4,
        "paths": [
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ]
        ]
},
        output: [1, 2, 1, 2],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=4, paths=[[1, 2], [3, 4]], the result is [1, 2, 1, 2].'
    }
        ],
        solutions: {
            python: `def flowerPlantingWithNoAdjacent(data):
    """
    Flower Planting With No Adjacent

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

// FlowerPlantingWithNoAdjacent solves the Flower Planting With No Adjacent problem.
// Time: O(n), Space: O(n)
func FlowerPlantingWithNoAdjacent(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '09-two-colorable/03-flower-planting-no-adjacent', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/03-flower-planting-no-adjacent'] = problem;

})();
