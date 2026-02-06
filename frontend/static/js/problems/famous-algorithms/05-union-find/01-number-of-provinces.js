/**
 * Number of Provinces
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Provinces',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'There are n cities. A province is a group of directly or indirectly connected cities. Given an n x n matrix isConnected where isConnected[i][j] = 1 if city i and city j are directly connected, return the total number of provinces.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n^2 * alpha(n))',
            space: 'O(n)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "isConnected": [
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        1
                ]
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input isConnected=[[1, 1, 0], [1, 1, 0], [0, 0, 1]], the result is 2.'
    }
        ],
        solutions: {
            python: `def findCircleNum(isConnected):
    """
    Number of Provinces using Union-Find

    A province is a group of connected cities.

    Time: O(n^2 * alpha(n)) where alpha is inverse Ackermann
    Space: O(n)
    """
    n = len(isConnected)

    # Union-Find with path compression and union by rank
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])  # Path compression
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False

        # Union by rank
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    # Process connections
    for i in range(n):
        for j in range(i + 1, n):
            if isConnected[i][j] == 1:
                union(i, j)

    # Count unique provinces (nodes that are their own parent)
    provinces = sum(1 for i in range(n) if find(i) == i)

    return provinces


# Test
if __name__ == "__main__":
    print(findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))  # Output: 2`,
            go: `package main

import "fmt"

// FindCircleNum counts the number of provinces using Union-Find.
// Time: O(n^2 * alpha(n)), Space: O(n)
func FindCircleNum(isConnected [][]int) int {
    n := len(isConnected)

    parent := make([]int, n)
    rank := make([]int, n)
    for i := range parent {
        parent[i] = i
    }

    var find func(x int) int
    find = func(x int) int {
        if parent[x] != x {
            parent[x] = find(parent[x]) // Path compression
        }
        return parent[x]
    }

    union := func(x, y int) {
        px, py := find(x), find(y)
        if px == py {
            return
        }
        // Union by rank
        if rank[px] < rank[py] {
            px, py = py, px
        }
        parent[py] = px
        if rank[px] == rank[py] {
            rank[px]++
        }
    }

    // Process connections
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if isConnected[i][j] == 1 {
                union(i, j)
            }
        }
    }

    // Count unique provinces
    provinces := 0
    for i := 0; i < n; i++ {
        if find(i) == i {
            provinces++
        }
    }

    return provinces
}

func main() {
    fmt.Println(FindCircleNum([][]int{{1,1,0},{1,1,0},{0,0,1}})) // Output: 2
}`
        },
        twists: [
            { id: '05-union-find/01-number-of-provinces/twist-01-dfs-bfs-approach', name: 'DFS/BFS Approach', difficulty: 'Medium' },
            { id: '05-union-find/01-number-of-provinces/twist-02-largest-province-size', name: 'Largest Province Size', difficulty: 'Medium' },
            { id: '05-union-find/01-number-of-provinces/twist-03-province-after-removal', name: 'Province After Removal', difficulty: 'Hard' },
            { id: '05-union-find/01-number-of-provinces/twist-04-online-province-queries', name: 'Online Province Queries', difficulty: 'Medium' },
            { id: '05-union-find/01-number-of-provinces/twist-05-minimum-connections-to-single-province', name: 'Minimum Connections to Single Province', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/01-number-of-provinces', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/01-number-of-provinces'] = problem;

})();
