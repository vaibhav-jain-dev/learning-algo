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
            { title: 'DFS/BFS Approach', difficulty: 'Medium', description: 'Solve the number of provinces problem using DFS or BFS graph traversal instead of Union-Find.', whyDifferent: 'Uses a completely different paradigm -- connected component counting via traversal rather than disjoint set merging, with visited arrays instead of parent arrays.', example: 'Start DFS from each unvisited node, marking all reachable nodes. Each DFS initiation counts as one province.' },
            { title: 'Largest Province Size', difficulty: 'Medium', description: 'Instead of counting provinces, find the size of the largest province (most cities in a single connected group).', whyDifferent: 'Requires tracking component sizes during union operations, maintaining a size array that updates when sets merge.', example: 'For 5 cities in 2 provinces of sizes 3 and 2, return 3 as the largest province size.' },
            { title: 'Province After Removal', difficulty: 'Hard', description: 'For each city, compute how many provinces would exist if that city and all its connections were removed.', whyDifferent: 'Removing a node can split components, which Union-Find cannot handle directly. Requires rebuilding the UF structure n times or using articulation point analysis.', example: 'If city 0 connects two otherwise separate groups, removing it increases the province count by 1.' },
            { title: 'Online Province Queries', difficulty: 'Medium', description: 'Connections are added one at a time. After each new connection, report the current number of provinces.', whyDifferent: 'Naturally fits Union-Find with a decreasing counter, but emphasizes the incremental/online nature of the algorithm vs. a batch processing approach.', example: 'Start: 4 provinces. Add (0,1): 3. Add (2,3): 2. Add (1,2): 1. Report count after each addition.' },
            { title: 'Minimum Connections to Single Province', difficulty: 'Medium', description: 'Find the minimum number of new connections needed to merge all provinces into one.', whyDifferent: 'The answer is simply (number of provinces - 1), but understanding why requires recognizing that each new connection can merge at most two provinces.', example: 'For 4 provinces, minimum 3 new connections are needed: connect province 1 to 2, then to 3, then to 4.' }
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
