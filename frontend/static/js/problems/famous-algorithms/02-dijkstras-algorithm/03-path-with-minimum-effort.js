/**
 * Path With Minimum Effort
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path With Minimum Effort',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'You are given a 2D array of heights representing a map. You need to travel from the top-left cell (0, 0) to the bottom-right cell (rows-1, cols-1). The **effort** of a path is the maximum absolute difference in heights between two consecutive cells. Return the minimum effort required to travel from the top-left to the bottom-right.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(M * N * log(M * N))',
            space: 'O(M * N)'
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
        "heights": [
                [
                        1,
                        2,
                        2
                ],
                [
                        3,
                        8,
                        2
                ],
                [
                        5,
                        3,
                        5
                ]
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input heights=[[1, 2, 2], [3, 8, 2], [5, 3, 5]], the result is 2.'
    }
        ],
        solutions: {
            python: `import heapq

def minimumEffortPath(heights):
    """
    Path With Minimum Effort using Modified Dijkstra's

    The effort is the maximum absolute difference in heights
    between consecutive cells along the path.

    Time: O(M * N * log(M * N))
    Space: O(M * N)
    """
    if not heights or not heights[0]:
        return 0

    rows, cols = len(heights), len(heights[0])

    # effort[i][j] = minimum effort to reach cell (i, j)
    effort = [[float('inf')] * cols for _ in range(rows)]
    effort[0][0] = 0

    # Min-heap: (effort, row, col)
    heap = [(0, 0, 0)]

    # Directions: up, down, left, right
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while heap:
        curr_effort, row, col = heapq.heappop(heap)

        # Reached destination
        if row == rows - 1 and col == cols - 1:
            return curr_effort

        # Skip if we've found a better path
        if curr_effort > effort[row][col]:
            continue

        # Explore neighbors
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc

            if 0 <= new_row < rows and 0 <= new_col < cols:
                # Effort is max of current effort and edge difference
                diff = abs(heights[new_row][new_col] - heights[row][col])
                new_effort = max(curr_effort, diff)

                if new_effort < effort[new_row][new_col]:
                    effort[new_row][new_col] = new_effort
                    heapq.heappush(heap, (new_effort, new_row, new_col))

    return effort[rows - 1][cols - 1]


# Test
if __name__ == "__main__":
    heights = [[1,2,2],[3,8,2],[5,3,5]]
    print(minimumEffortPath(heights))  # Output: 2`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

// EffortItem represents a cell with effort to reach it
type EffortItem struct {
    effort, row, col int
}

// EffortPQ implements heap.Interface
type EffortPQ []EffortItem

func (pq EffortPQ) Len() int           { return len(pq) }
func (pq EffortPQ) Less(i, j int) bool { return pq[i].effort < pq[j].effort }
func (pq EffortPQ) Swap(i, j int)      { pq[i], pq[j] = pq[j], pq[i] }
func (pq *EffortPQ) Push(x interface{}) { *pq = append(*pq, x.(EffortItem)) }
func (pq *EffortPQ) Pop() interface{} {
    old := *pq
    n := len(old)
    item := old[n-1]
    *pq = old[0 : n-1]
    return item
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

// MinimumEffortPath finds path with minimum effort.
// Time: O(M * N * log(M * N)), Space: O(M * N)
func MinimumEffortPath(heights [][]int) int {
    if len(heights) == 0 || len(heights[0]) == 0 {
        return 0
    }

    rows, cols := len(heights), len(heights[0])

    // Effort to reach each cell
    effort := make([][]int, rows)
    for i := range effort {
        effort[i] = make([]int, cols)
        for j := range effort[i] {
            effort[i][j] = 1 << 30
        }
    }
    effort[0][0] = 0

    // Directions
    dirs := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

    // Min-heap
    pq := &EffortPQ{{0, 0, 0}}
    heap.Init(pq)

    for pq.Len() > 0 {
        item := heap.Pop(pq).(EffortItem)
        currEffort, row, col := item.effort, item.row, item.col

        if row == rows-1 && col == cols-1 {
            return currEffort
        }

        if currEffort > effort[row][col] {
            continue
        }

        for _, d := range dirs {
            newRow, newCol := row+d[0], col+d[1]
            if newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols {
                diff := abs(heights[newRow][newCol] - heights[row][col])
                newEffort := max(currEffort, diff)
                if newEffort < effort[newRow][newCol] {
                    effort[newRow][newCol] = newEffort
                    heap.Push(pq, EffortItem{newEffort, newRow, newCol})
                }
            }
        }
    }

    return effort[rows-1][cols-1]
}

func main() {
    heights := [][]int{{1,2,2},{3,8,2},{5,3,5}}
    fmt.Println(MinimumEffortPath(heights)) // Output: 2
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/03-path-with-minimum-effort', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/03-path-with-minimum-effort'] = problem;

})();
