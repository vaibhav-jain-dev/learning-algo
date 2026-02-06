/**
 * Max Area of Island
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Area of Island',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'You are given an m x n binary matrix grid. An island is a group of 1\'s (representing land) connected 4-directionally (horizontal or vertical). You may assume all four edges of the grid are surrounded by water. The area of an island is the number of cells with a value 1 in the island. Return the maximum area of an island in grid. If there is no island, return 0.',
        problem: 'Use DFS or BFS to explore each island. When you find a land cell (1), start a flood fill to count all connected land cells. Mark cells as visited by setting them to 0 (water) to avoid counting twice. Track the maximum area found across all islands. Time complexity is O(m*n) as each cell is visited at most once.',
        hints: [
            'Iterate through every cell in the grid. When you find a 1, that\'s the start of an island.',
            'Use DFS: from each land cell, recursively explore all 4 neighbors (up, down, left, right).',
            'Mark visited cells by changing 1 to 0 - this prevents revisiting and acts as your visited set.',
            'Each DFS call returns the area of the connected component. Sum 1 (current cell) + areas of valid neighbors.',
            'Track the maximum area found. Don\'t forget edge cases: empty grid returns 0.'
        ],
        complexity: {
            time: 'O(M × N)',
            space: 'O(M × N)'
        },
        examples: [
            {
                input: { grid: [[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]] },
                output: 5,
                explanation: 'The island forms a plus shape with 5 connected 1s. DFS from any 1 will visit all 5 cells.'
            },
            {
                input: { grid: [[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]] },
                output: 4,
                explanation: 'Two separate 2x2 islands, each with area 4. Maximum is 4.'
            },
            {
                input: { grid: [[0,0,0,0]] },
                output: 0,
                explanation: 'No land cells, so maximum island area is 0.'
            }
        ],
        solutions: {
            python: `def maxAreaOfIsland(grid: list[list[int]]) -> int:
    """
    Find the maximum area of an island in a binary grid.
    Uses DFS to explore each island and count its area.

    Time: O(m * n) - visit each cell at most once
    Space: O(m * n) - recursion stack in worst case
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    max_area = 0

    def dfs(r: int, c: int) -> int:
        # Base case: out of bounds or water
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
            return 0

        # Mark as visited by setting to 0
        grid[r][c] = 0

        # Count this cell + all connected cells
        area = 1
        area += dfs(r + 1, c)  # down
        area += dfs(r - 1, c)  # up
        area += dfs(r, c + 1)  # right
        area += dfs(r, c - 1)  # left

        return area

    # Check each cell
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                max_area = max(max_area, dfs(r, c))

    return max_area


# BFS alternative
from collections import deque

def maxAreaOfIslandBFS(grid: list[list[int]]) -> int:
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    max_area = 0
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                area = 0
                queue = deque([(r, c)])
                grid[r][c] = 0

                while queue:
                    cr, cc = queue.popleft()
                    area += 1

                    for dr, dc in directions:
                        nr, nc = cr + dr, cc + dc
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                            grid[nr][nc] = 0
                            queue.append((nr, nc))

                max_area = max(max_area, area)

    return max_area


# Test
print(maxAreaOfIsland([[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]]))  # 5
print(maxAreaOfIsland([[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]))  # 4`,
            go: `package main

import "fmt"

// maxAreaOfIsland finds the maximum area of an island in a binary grid.
// Uses DFS to explore each island and count its area.
// Time: O(m * n), Space: O(m * n) for recursion stack
func maxAreaOfIsland(grid [][]int) int {
    if len(grid) == 0 || len(grid[0]) == 0 {
        return 0
    }

    rows, cols := len(grid), len(grid[0])
    maxArea := 0

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        // Base case: out of bounds or water
        if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == 0 {
            return 0
        }

        // Mark as visited
        grid[r][c] = 0

        // Count this cell + all connected cells
        area := 1
        area += dfs(r+1, c) // down
        area += dfs(r-1, c) // up
        area += dfs(r, c+1) // right
        area += dfs(r, c-1) // left

        return area
    }

    // Check each cell
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                area := dfs(r, c)
                if area > maxArea {
                    maxArea = area
                }
            }
        }
    }

    return maxArea
}

// BFS alternative using queue
func maxAreaOfIslandBFS(grid [][]int) int {
    if len(grid) == 0 {
        return 0
    }

    rows, cols := len(grid), len(grid[0])
    maxArea := 0
    directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                area := 0
                queue := [][2]int{{r, c}}
                grid[r][c] = 0

                for len(queue) > 0 {
                    curr := queue[0]
                    queue = queue[1:]
                    area++

                    for _, d := range directions {
                        nr, nc := curr[0]+d[0], curr[1]+d[1]
                        if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                            grid[nr][nc] = 0
                            queue = append(queue, [2]int{nr, nc})
                        }
                    }
                }

                if area > maxArea {
                    maxArea = area
                }
            }
        }
    }

    return maxArea
}

func main() {
    grid1 := [][]int{{0,0,1,0,0},{0,1,1,1,0},{0,0,1,0,0}}
    fmt.Println(maxAreaOfIsland(grid1)) // 5

    grid2 := [][]int{{1,1,0,0},{1,1,0,0},{0,0,1,1},{0,0,1,1}}
    fmt.Println(maxAreaOfIsland(grid2)) // 4
}`
        },
        twists: [
            { title: 'Count All Islands', difficulty: 'Easy', description: 'Instead of finding the maximum area, count the total number of distinct islands.', whyDifferent: 'You no longer track area per island, just increment a counter each time you start a new DFS from an unvisited land cell. The traversal simplifies.', example: 'Grid [[1,1,0],[0,0,1],[1,0,1]]. Three distinct islands, answer is 3.' },
            { title: 'Top K Island Areas', difficulty: 'Medium', description: 'Return the areas of the K largest islands in descending order.', whyDifferent: 'You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.', example: 'Islands with areas [5, 2, 8, 1, 3], K=3. Return [8, 5, 3].' },
            { title: 'Island Shapes as Signatures', difficulty: 'Hard', description: 'Two islands are considered the same shape if one can be translated to match the other. Count distinct island shapes.', whyDifferent: 'You must normalize island coordinates relative to their top-left corner and store shape signatures in a set. The flood fill is just the first step.', example: 'Grid has three L-shaped islands and two single cells. Distinct shapes: 2 (L-shape and dot).' },
            { title: 'Max Area with Diagonal Connections', difficulty: 'Medium', description: 'Land cells are connected in 8 directions (including diagonals). Find the maximum island area.', whyDifferent: 'Expanding from 4 to 8 neighbors merges previously separate islands. The DFS direction array doubles in size and component boundaries change fundamentally.', example: 'Grid [[1,0],[0,1]]. With 4-dir: max area 1. With 8-dir: max area 2 (diagonal connection).' },
            { title: 'Iterative DFS Only', difficulty: 'Medium', description: 'Solve the problem using an explicit stack instead of recursion. The grid can be up to 1000x1000.', whyDifferent: 'Large grids cause stack overflow with recursive DFS. You must convert to iterative DFS with an explicit stack, changing the code structure significantly.', example: 'A 1000x1000 grid filled with 1s. Recursive DFS fails with stack overflow, but iterative handles it.' }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/01-max-area-of-island', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/01-max-area-of-island'] = problem;

})();
