/**
 * Shortest Path in Binary Grid
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: bfs-astar
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path in Binary Grid',
        difficulty: 'Medium',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm',
        description: 'Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1. A clear path is a path from the top-left cell (0, 0) to the bottom-right cell (n-1, n-1) such that: - All visited cells are 0 - All adjacent cells in the path are 8-directionally connected (they share an edge or corner) The length of a path is the number of visited cells.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
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
        "grid": [
                [
                        0,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[0, 0, 0], [1, 1, 0], [1, 1, 0]], the result is 4.'
    }
        ],
        solutions: {
            python: `def shortestPathInBinaryGrid(data):
    """
    Shortest Path in Binary Grid using A* Algorithm

    Uses Manhattan distance heuristic to prioritize exploration.

    Time: O(n^2 log n) with A*
    Space: O(n^2)
    """
    import heapq

    grid = data["grid"]
    n = len(grid)

    # Check if start or end is blocked
    if grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    # Heuristic: Chebyshev distance (diagonal movement allowed)
    def heuristic(r, c):
        return max(n - 1 - r, n - 1 - c)

    # 8 directions (including diagonals)
    directions = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]

    # A* algorithm: (f_score, g_score, row, col)
    # f_score = g_score + heuristic
    start_h = heuristic(0, 0)
    min_heap = [(1 + start_h, 1, 0, 0)]  # (f, g, row, col)
    visited = [[False] * n for _ in range(n)]
    visited[0][0] = True

    while min_heap:
        f, g, row, col = heapq.heappop(min_heap)

        # Reached destination
        if row == n - 1 and col == n - 1:
            return g

        for dr, dc in directions:
            nr, nc = row + dr, col + dc

            if 0 <= nr < n and 0 <= nc < n and not visited[nr][nc] and grid[nr][nc] == 0:
                visited[nr][nc] = True
                new_g = g + 1
                new_f = new_g + heuristic(nr, nc)
                heapq.heappush(min_heap, (new_f, new_g, nr, nc))

    return -1


# Test
if __name__ == "__main__":
    data = {"grid": [[0,0,0], [1,1,0], [1,1,0]]}
    print(shortestPathInBinaryGrid(data))  # Output: 4`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

type GridState struct {
    f, g, row, col int
}

type GridHeap []GridState

func (h GridHeap) Len() int           { return len(h) }
func (h GridHeap) Less(i, j int) bool { return h[i].f < h[j].f }
func (h GridHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *GridHeap) Push(x interface{}) { *h = append(*h, x.(GridState)) }
func (h *GridHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

// ShortestPathInBinaryGrid uses A* algorithm.
// Time: O(n^2 log n), Space: O(n^2)
func ShortestPathInBinaryGrid(data map[string]interface{}) int {
    gridRaw := data["grid"].([]interface{})
    n := len(gridRaw)

    // Parse grid
    grid := make([][]int, n)
    for i, row := range gridRaw {
        r := row.([]interface{})
        grid[i] = make([]int, len(r))
        for j, v := range r {
            grid[i][j] = int(v.(float64))
        }
    }

    // Check start/end
    if grid[0][0] == 1 || grid[n-1][n-1] == 1 {
        return -1
    }

    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }

    // Chebyshev distance heuristic
    heuristic := func(r, c int) int {
        return max(n-1-r, n-1-c)
    }

    // 8 directions
    directions := [][2]int{{-1,-1}, {-1,0}, {-1,1}, {0,-1}, {0,1}, {1,-1}, {1,0}, {1,1}}

    // A* algorithm
    startH := heuristic(0, 0)
    h := &GridHeap{{1 + startH, 1, 0, 0}}
    heap.Init(h)

    visited := make([][]bool, n)
    for i := range visited {
        visited[i] = make([]bool, n)
    }
    visited[0][0] = true

    for h.Len() > 0 {
        state := heap.Pop(h).(GridState)

        if state.row == n-1 && state.col == n-1 {
            return state.g
        }

        for _, d := range directions {
            nr, nc := state.row+d[0], state.col+d[1]

            if nr >= 0 && nr < n && nc >= 0 && nc < n &&
                !visited[nr][nc] && grid[nr][nc] == 0 {
                visited[nr][nc] = true
                newG := state.g + 1
                newF := newG + heuristic(nr, nc)
                heap.Push(h, GridState{newF, newG, nr, nc})
            }
        }
    }

    return -1
}

func main() {
    data := map[string]interface{}{
        "grid": []interface{}{
            []interface{}{float64(0), float64(0), float64(0)},
            []interface{}{float64(1), float64(1), float64(0)},
            []interface{}{float64(1), float64(1), float64(0)},
        },
    }
    fmt.Println(ShortestPathInBinaryGrid(data)) // 4
}`
        },
        twists: [
            { id: '08-a-star-algorithm/01-shortest-path-in-grid/twist-01-bfs-without-heuristic', name: 'BFS Without Heuristic', difficulty: 'Easy' },
            { id: '08-a-star-algorithm/01-shortest-path-in-grid/twist-02-path-reconstruction', name: 'Path Reconstruction', difficulty: 'Medium' },
            { id: '08-a-star-algorithm/01-shortest-path-in-grid/twist-03-k-shortest-paths', name: 'K Shortest Paths', difficulty: 'Very Hard' },
            { id: '08-a-star-algorithm/01-shortest-path-in-grid/twist-04-dynamic-obstacles', name: 'Dynamic Obstacles', difficulty: 'Hard' },
            { id: '08-a-star-algorithm/01-shortest-path-in-grid/twist-05-minimum-obstacles-to-remove', name: 'Minimum Obstacles to Remove', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid'] = problem;

})();
