/**
 * Possible Bipartition
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Possible Bipartition',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable',
        description: 'We want to split a group of n people into two groups. Given dislikes[i] = [ai, bi] where person ai dislikes person bi, return true if it\'s possible to split everyone into two groups such that no two people who dislike each other are in the same group.',
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
        "dislikes": [
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
                        4
                ]
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=4, dislikes=[[1, 2], [1, 3], [2, 4]], the result is true.'
    },
    {
        input: {
        "n": 3,
        "dislikes": [
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
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=3, dislikes=[[1, 2], [1, 3], [2, 3]], the result is false.'
    }
        ],
        solutions: {
            python: `from collections import defaultdict, deque

def possibleBipartition(n, dislikes):
    """
    Possible Bipartition - Graph Coloring (Bipartite Check)

    Build a graph where edges connect people who dislike each other.
    Check if this graph is bipartite (2-colorable).

    Time: O(V + E)
    Space: O(V + E)
    """
    # Build adjacency list (people are 1-indexed)
    graph = defaultdict(list)
    for a, b in dislikes:
        graph[a].append(b)
        graph[b].append(a)

    color = {}  # person -> color (0 or 1)

    def bfs(start):
        queue = deque([start])
        color[start] = 0

        while queue:
            person = queue.popleft()

            for enemy in graph[person]:
                if enemy not in color:
                    color[enemy] = 1 - color[person]
                    queue.append(enemy)
                elif color[enemy] == color[person]:
                    return False

        return True

    # Check each connected component
    for person in range(1, n + 1):
        if person not in color:
            if not bfs(person):
                return False

    return True


# Test
if __name__ == "__main__":
    # Test case 1: Can partition
    print(possibleBipartition(4, [[1,2],[1,3],[2,4]]))  # True

    # Test case 2: Cannot partition (triangle of dislikes)
    print(possibleBipartition(3, [[1,2],[1,3],[2,3]]))  # False

    # Test case 3: Can partition
    print(possibleBipartition(5, [[1,2],[2,3],[3,4],[4,5],[1,5]]))  # False`,
            go: `package main

import "fmt"

// PossibleBipartition checks if n people can be split into 2 groups
// Time: O(V+E), Space: O(V+E)
func PossibleBipartition(n int, dislikes [][]int) bool {
    // Build adjacency list
    graph := make([][]int, n+1)
    for i := range graph {
        graph[i] = []int{}
    }

    for _, d := range dislikes {
        a, b := d[0], d[1]
        graph[a] = append(graph[a], b)
        graph[b] = append(graph[b], a)
    }

    color := make([]int, n+1)
    for i := range color {
        color[i] = -1 // -1 = uncolored
    }

    bfs := func(start int) bool {
        queue := []int{start}
        color[start] = 0

        for len(queue) > 0 {
            person := queue[0]
            queue = queue[1:]

            for _, enemy := range graph[person] {
                if color[enemy] == -1 {
                    color[enemy] = 1 - color[person]
                    queue = append(queue, enemy)
                } else if color[enemy] == color[person] {
                    return false
                }
            }
        }

        return true
    }

    // Check each connected component
    for person := 1; person <= n; person++ {
        if color[person] == -1 {
            if !bfs(person) {
                return false
            }
        }
    }

    return true
}

func main() {
    // Test case 1: Can partition
    fmt.Println(PossibleBipartition(4, [][]int{{1, 2}, {1, 3}, {2, 4}})) // true

    // Test case 2: Cannot partition
    fmt.Println(PossibleBipartition(3, [][]int{{1, 2}, {1, 3}, {2, 3}})) // false

    // Test case 3
    fmt.Println(PossibleBipartition(5, [][]int{{1, 2}, {2, 3}, {3, 4}, {4, 5}, {1, 5}})) // false
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/02-possible-bipartition', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/02-possible-bipartition'] = problem;

})();
