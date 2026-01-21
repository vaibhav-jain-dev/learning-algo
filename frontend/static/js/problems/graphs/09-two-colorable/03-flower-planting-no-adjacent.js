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
            python: `from collections import defaultdict

def gardenNoAdj(n, paths):
    """
    Flower Planting With No Adjacent - Greedy Graph Coloring

    Since each garden has at most 3 neighbors and we have 4 colors,
    we can always find a valid color using greedy approach.

    Time: O(V + E)
    Space: O(V + E)
    """
    # Build adjacency list (gardens are 1-indexed)
    graph = defaultdict(list)
    for x, y in paths:
        graph[x].append(y)
        graph[y].append(x)

    # result[i] = flower type for garden i+1 (1-indexed result)
    result = [0] * n

    for garden in range(1, n + 1):
        # Find colors used by neighbors
        neighbor_colors = set()
        for neighbor in graph[garden]:
            if result[neighbor - 1] != 0:
                neighbor_colors.add(result[neighbor - 1])

        # Pick first available color (1-4)
        for color in range(1, 5):
            if color not in neighbor_colors:
                result[garden - 1] = color
                break

    return result


# Test
if __name__ == "__main__":
    # Test case 1
    print(gardenNoAdj(3, [[1,2],[2,3],[3,1]]))  # [1, 2, 3]

    # Test case 2
    print(gardenNoAdj(4, [[1,2],[3,4]]))  # [1, 2, 1, 2]

    # Test case 3
    print(gardenNoAdj(4, [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]))  # [1, 2, 3, 4]`,
            go: `package main

import "fmt"

// GardenNoAdj assigns flower types to gardens
// Time: O(V+E), Space: O(V+E)
func GardenNoAdj(n int, paths [][]int) []int {
    // Build adjacency list
    graph := make([][]int, n+1)
    for i := range graph {
        graph[i] = []int{}
    }

    for _, p := range paths {
        x, y := p[0], p[1]
        graph[x] = append(graph[x], y)
        graph[y] = append(graph[y], x)
    }

    result := make([]int, n)

    for garden := 1; garden <= n; garden++ {
        // Find colors used by neighbors
        neighborColors := make(map[int]bool)
        for _, neighbor := range graph[garden] {
            if result[neighbor-1] != 0 {
                neighborColors[result[neighbor-1]] = true
            }
        }

        // Pick first available color (1-4)
        for color := 1; color <= 4; color++ {
            if !neighborColors[color] {
                result[garden-1] = color
                break
            }
        }
    }

    return result
}

func main() {
    // Test case 1
    fmt.Println(GardenNoAdj(3, [][]int{{1, 2}, {2, 3}, {3, 1}})) // [1 2 3]

    // Test case 2
    fmt.Println(GardenNoAdj(4, [][]int{{1, 2}, {3, 4}})) // [1 2 1 2]

    // Test case 3
    fmt.Println(GardenNoAdj(4, [][]int{{1, 2}, {2, 3}, {3, 4}, {4, 1}, {1, 3}, {2, 4}})) // [1 2 3 4]
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
