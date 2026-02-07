/**
 * Shortest Path to Get All Keys
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path to Get All Keys',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '08-minimum-passes',
        description: 'You are given an m x n grid grid where: - \'.\' is an empty cell - \'#\' is a wall - \'@\' is the starting point - Lowercase letters represent keys - Uppercase letters are locks that require the matching key Return the minimum number of moves to get all keys. If impossible, return -1.',
        problem: 'Use breadth-first search to explore nodes level by level. This ensures the shortest path is found first in unweighted scenarios. Use a queue to manage the frontier. This achieves O(M * N * 2^K) time with O(M * N * 2^K) space.',
        complexity: {
            time: 'O(M * N * 2^K)',
            space: 'O(M * N * 2^K)'
        },
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ],
        examples: [
    {
        input: {
        "grid": [
                "@.a..",
                "###.#",
                "b.A.B"
        ]
},
        output: 8,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    }
        ],
        solutions: {
            python: `from collections import deque

def shortestPathAllKeys(grid):
    """
    Shortest Path to Get All Keys - BFS with state

    State = (row, col, keys_collected)
    Use bitmask to track which keys we have.

    Time: O(M * N * 2^K) where K = number of keys
    Space: O(M * N * 2^K)
    """
    if not grid:
        return -1

    rows, cols = len(grid), len(grid[0])

    # Find start position and count keys
    start_r, start_c = 0, 0
    total_keys = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '@':
                start_r, start_c = r, c
            elif 'a' <= grid[r][c] <= 'f':
                total_keys += 1

    # All keys collected bitmask
    all_keys = (1 << total_keys) - 1

    # BFS: (row, col, keys_bitmask)
    queue = deque([(start_r, start_c, 0, 0)])  # r, c, keys, steps
    visited = set()
    visited.add((start_r, start_c, 0))

    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    while queue:
        r, c, keys, steps = queue.popleft()

        # Check if we have all keys
        if keys == all_keys:
            return steps

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if not (0 <= nr < rows and 0 <= nc < cols):
                continue

            cell = grid[nr][nc]

            # Wall - cannot pass
            if cell == '#':
                continue

            # Lock - need corresponding key
            if 'A' <= cell <= 'F':
                key_needed = 1 << (ord(cell) - ord('A'))
                if not (keys & key_needed):
                    continue

            # Calculate new keys if we pick up a key
            new_keys = keys
            if 'a' <= cell <= 'f':
                new_keys |= (1 << (ord(cell) - ord('a')))

            state = (nr, nc, new_keys)
            if state not in visited:
                visited.add(state)
                queue.append((nr, nc, new_keys, steps + 1))

    return -1


# Test
if __name__ == "__main__":
    grid1 = ["@.a..", "###.#", "b.A.B"]
    print(shortestPathAllKeys(grid1))  # 8

    grid2 = ["@..aA", "..B#.", "....b"]
    print(shortestPathAllKeys(grid2))  # 6`,
            go: `package main

import "fmt"

type State struct {
    row, col, keys int
}

// ShortestPathAllKeys finds minimum moves to collect all keys
// Time: O(M*N*2^K), Space: O(M*N*2^K)
func ShortestPathAllKeys(grid []string) int {
    if len(grid) == 0 {
        return -1
    }

    rows, cols := len(grid), len(grid[0])

    // Find start position and count keys
    startR, startC := 0, 0
    totalKeys := 0

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == '@' {
                startR, startC = r, c
            } else if grid[r][c] >= 'a' && grid[r][c] <= 'f' {
                totalKeys++
            }
        }
    }

    // All keys collected bitmask
    allKeys := (1 << totalKeys) - 1

    // BFS queue: row, col, keys, steps
    type QueueItem struct {
        r, c, keys, steps int
    }
    queue := []QueueItem{{startR, startC, 0, 0}}
    visited := make(map[State]bool)
    visited[State{startR, startC, 0}] = true

    directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    for len(queue) > 0 {
        item := queue[0]
        queue = queue[1:]
        r, c, keys, steps := item.r, item.c, item.keys, item.steps

        // Check if we have all keys
        if keys == allKeys {
            return steps
        }

        for _, d := range directions {
            nr, nc := r+d[0], c+d[1]

            if nr < 0 || nr >= rows || nc < 0 || nc >= cols {
                continue
            }

            cell := grid[nr][nc]

            // Wall
            if cell == '#' {
                continue
            }

            // Lock - need corresponding key
            if cell >= 'A' && cell <= 'F' {
                keyNeeded := 1 << (cell - 'A')
                if keys&keyNeeded == 0 {
                    continue
                }
            }

            // Pick up key if present
            newKeys := keys
            if cell >= 'a' && cell <= 'f' {
                newKeys |= (1 << (cell - 'a'))
            }

            state := State{nr, nc, newKeys}
            if !visited[state] {
                visited[state] = true
                queue = append(queue, QueueItem{nr, nc, newKeys, steps + 1})
            }
        }
    }

    return -1
}

func main() {
    grid1 := []string{"@.a..", "###.#", "b.A.B"}
    fmt.Println(ShortestPathAllKeys(grid1)) // 8

    grid2 := []string{"@..aA", "..B#.", "....b"}
    fmt.Println(ShortestPathAllKeys(grid2)) // 6
}`
        },
        twists: [
            { id: '08-minimum-passes/03-shortest-path-all-keys/twist-01-keys-with-expiration', name: 'Keys with Expiration', difficulty: 'Very Hard' },
            { id: '08-minimum-passes/03-shortest-path-all-keys/twist-02-one-key-opens-multiple-locks', name: 'One Key Opens Multiple Locks', difficulty: 'Hard' },
            { id: '08-minimum-passes/03-shortest-path-all-keys/twist-03-return-the-path', name: 'Return the Path', difficulty: 'Medium' },
            { id: '08-minimum-passes/03-shortest-path-all-keys/twist-04-two-players', name: 'Two Players', difficulty: 'Very Hard' },
            { id: '08-minimum-passes/03-shortest-path-all-keys/twist-05-keys-behind-keys', name: 'Keys Behind Keys', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/03-shortest-path-all-keys', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/03-shortest-path-all-keys'] = problem;

})();
