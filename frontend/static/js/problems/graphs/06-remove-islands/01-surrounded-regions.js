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
        explanation: 'Exploring the graph structure, we find the required path or value. For input board=[[\'X\', \'X\', \'X\', \'X\'], [\'X\', \'O\', \'O\', \'X\'], [\'X\', \'X\', \'O\', \'X\'], [\'X\', \'O\', \'X\', \'X\']], the result is [[\'X\', \'X\', \'X\', \'X\'], [\'X\', \'X\', \'X\', \'X\'], [\'X\', \'X\', \'X\', \'X\'], [\'X\', \'O\', \'X\', \'X\']].'
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
            { title: 'Count Surrounded Regions', difficulty: 'Easy', description: 'Instead of capturing surrounded regions, just count how many distinct surrounded regions exist.', whyDifferent: 'You skip the matrix modification and just count. Each new DFS from an interior O that is not border-connected increments a counter.', example: 'Board with 3 groups of Os: 2 are surrounded, 1 touches border. Answer: 2.' },
            { title: 'Surrounded by Single Character', difficulty: 'Medium', description: 'The board has three characters: X, O, and Y. Only capture O regions that are surrounded entirely by X (not Y or border).', whyDifferent: 'Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture, requiring you to check neighbor types during DFS.', example: 'An O group touches Y but not the border. It is NOT captured because Y is not X.' },
            { title: 'Capture with BFS Only', difficulty: 'Medium', description: 'Solve using BFS instead of DFS. Start from all border Os and expand inward.', whyDifferent: 'BFS from border cells naturally marks all safe Os level by level. The remaining Os are surrounded. This reversal of approach avoids deep recursion.', example: 'Same board, but processed with a queue starting from all border O cells simultaneously.' },
            { title: 'Minimum Flips to Surround', difficulty: 'Hard', description: 'Some O regions touch the border through a narrow connection. Find the minimum number of O cells to flip to X to make a specific region surrounded.', whyDifferent: 'This becomes a min-cut problem. You need to find the smallest set of cells whose removal disconnects an O region from the border.', example: 'An O region connects to border through a single O cell. Flip that cell to X and the region becomes surrounded.' },
            { title: 'Partial Capture', difficulty: 'Hard', description: 'Capture O regions that are surrounded on at least 3 sides (top, bottom, left, right borders). A region touching only one border side should be captured.', whyDifferent: 'Instead of binary border/not-border, you track which specific borders a region touches and only spare it if it touches 2 or more border sides.', example: 'An O group touches only the top border. Since it touches only 1 side, it gets captured.' }
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
