/**
 * Surrounded Regions
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Surrounded Regions',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Given an m x n matrix board containing \'X\' and \'O\', capture all regions that are 4-directionally surrounded by \'X\'. A region is captured by flipping all \'O\'s into \'X\'s in that surrounded region.',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(M * N) time with O(M * N) space.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
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
        "board": [
                [
                        "X",
                        "X",
                        "X",
                        "X"
                ],
                [
                        "X",
                        "O",
                        "O",
                        "X"
                ],
                [
                        "X",
                        "X",
                        "O",
                        "X"
                ],
                [
                        "X",
                        "O",
                        "X",
                        "X"
                ]
        ]
},
        output: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]],
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    }
        ],
        solutions: {
            python: `def solve(board):
    """
    Surrounded Regions

    Time: O(M * N) - visit each cell at most twice
    Space: O(M * N) - recursion stack in worst case

    Approach:
    1. Mark all 'O's connected to border as safe (use temporary marker 'T')
    2. Convert remaining 'O's to 'X' (these are surrounded)
    3. Convert 'T' back to 'O' (these touch border)

    Key insight: Instead of finding surrounded regions,
    find regions that are NOT surrounded (touch border)
    """
    if not board or not board[0]:
        return board

    m, n = len(board), len(board[0])

    def dfs(i, j):
        """Mark 'O' cells connected to border as 'T' (temporary safe)"""
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != 'O':
            return

        board[i][j] = 'T'  # Mark as safe

        # Explore all 4 directions
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    # Step 1: Mark all 'O's connected to border
    # Check first and last column
    for i in range(m):
        dfs(i, 0)
        dfs(i, n - 1)

    # Check first and last row
    for j in range(n):
        dfs(0, j)
        dfs(m - 1, j)

    # Step 2 & 3: Process the board
    for i in range(m):
        for j in range(n):
            if board[i][j] == 'O':
                board[i][j] = 'X'  # Surrounded, capture it
            elif board[i][j] == 'T':
                board[i][j] = 'O'  # Restore safe cells

    return board


def surroundedRegions(data):
    """Process input data"""
    board = data.get('board', [])
    # Make a copy since we modify in place
    board_copy = [row[:] for row in board]
    return solve(board_copy)


# Test
if __name__ == "__main__":
    board = [
        ["X","X","X","X"],
        ["X","O","O","X"],
        ["X","X","O","X"],
        ["X","O","X","X"]
    ]
    result = solve(board)
    for row in result:
        print(row)
    # Expected:
    # ['X','X','X','X']
    # ['X','X','X','X']
    # ['X','X','X','X']
    # ['X','O','X','X']`,
            go: `package main

import "fmt"

// Solve captures surrounded regions in the board
// Time: O(M * N), Space: O(M * N)
func Solve(board [][]byte) {
    if len(board) == 0 || len(board[0]) == 0 {
        return
    }

    m, n := len(board), len(board[0])

    // DFS to mark 'O' cells connected to border as 'T'
    var dfs func(i, j int)
    dfs = func(i, j int) {
        if i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O' {
            return
        }

        board[i][j] = 'T' // Mark as safe

        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    }

    // Mark all 'O's connected to border
    for i := 0; i < m; i++ {
        dfs(i, 0)
        dfs(i, n-1)
    }
    for j := 0; j < n; j++ {
        dfs(0, j)
        dfs(m-1, j)
    }

    // Process the board
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if board[i][j] == 'O' {
                board[i][j] = 'X' // Capture surrounded
            } else if board[i][j] == 'T' {
                board[i][j] = 'O' // Restore safe
            }
        }
    }
}

// SolveStrings works with string slices for easier testing
func SolveStrings(board [][]string) [][]string {
    if len(board) == 0 || len(board[0]) == 0 {
        return board
    }

    m, n := len(board), len(board[0])

    var dfs func(i, j int)
    dfs = func(i, j int) {
        if i < 0 || i >= m || j < 0 || j >= n || board[i][j] != "O" {
            return
        }

        board[i][j] = "T"
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    }

    for i := 0; i < m; i++ {
        dfs(i, 0)
        dfs(i, n-1)
    }
    for j := 0; j < n; j++ {
        dfs(0, j)
        dfs(m-1, j)
    }

    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if board[i][j] == "O" {
                board[i][j] = "X"
            } else if board[i][j] == "T" {
                board[i][j] = "O"
            }
        }
    }

    return board
}

func main() {
    board := [][]string{
        {"X", "X", "X", "X"},
        {"X", "O", "O", "X"},
        {"X", "X", "O", "X"},
        {"X", "O", "X", "X"},
    }

    result := SolveStrings(board)
    for _, row := range result {
        fmt.Println(row)
    }
    // Expected:
    // [X X X X]
    // [X X X X]
    // [X X X X]
    // [X O X X]
}`
        },
        twists: [
            { id: '06-remove-islands/01-surrounded-regions/twist-01-count-surrounded-regions', name: 'Count Surrounded Regions', difficulty: 'Easy' },
            { id: '06-remove-islands/01-surrounded-regions/twist-02-surrounded-by-single-character', name: 'Surrounded by Single Character', difficulty: 'Medium' },
            { id: '06-remove-islands/01-surrounded-regions/twist-03-capture-with-bfs-only', name: 'Capture with BFS Only', difficulty: 'Medium' },
            { id: '06-remove-islands/01-surrounded-regions/twist-04-minimum-flips-to-surround', name: 'Minimum Flips to Surround', difficulty: 'Hard' },
            { id: '06-remove-islands/01-surrounded-regions/twist-05-partial-capture', name: 'Partial Capture', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions'] = problem;

})();
