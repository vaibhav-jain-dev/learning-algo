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
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[@.a.., ###.#, b.A.B], the result is 8.'
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
            { title: 'Keys with Expiration', difficulty: 'Very Hard', description: 'Each key expires after T moves. If you do not reach the corresponding lock within T moves of picking up the key, you lose it.', whyDifferent: 'The bitmask state must encode not just which keys you have but when you picked each one. State space explodes, requiring careful pruning or different state representation.', example: 'Key a at distance 3 from lock A, T=5. You have 5 moves after picking up a to use it. If lock A is 6 moves away, the key expires.' },
            { title: 'One Key Opens Multiple Locks', difficulty: 'Hard', description: 'There are fewer keys than locks. Each key opens all locks of matching and higher letters (key a opens locks A, B, C, etc.).', whyDifferent: 'The lock-checking logic changes from exact match to range comparison, and the optimal key collection order may differ from the standard problem.', example: 'Key a opens locks A, B, C. Grid has locks B and C but no keys b or c. Picking up a alone suffices.' },
            { title: 'Return the Path', difficulty: 'Medium', description: 'Instead of just the move count, return the actual path (sequence of cells) taken to collect all keys.', whyDifferent: 'You must store parent pointers for each state (row, col, keys) and backtrack from the final state to reconstruct the path.', example: 'Path: (0,0)->(0,1)->(0,2) pick key a ->(1,2)->(2,2) open lock A ->(2,1) pick key b. Return the coordinate sequence.' },
            { title: 'Two Players', difficulty: 'Very Hard', description: 'Two players start at different positions and share keys. Either player picking up a key makes it available to both. Find minimum total moves.', whyDifferent: 'The state space now includes positions of both players plus shared key bitmask. Coordination between players adds a new dimension to the BFS.', example: 'Player 1 near key a, Player 2 near lock A. Player 1 picks up a (1 move), Player 2 opens A (1 move). Total: 2 moves instead of one player doing both.' },
            { title: 'Keys Behind Keys', difficulty: 'Hard', description: 'Some keys are behind locks. You must find the correct order to collect keys, creating dependency chains.', whyDifferent: 'The BFS with bitmask handles this naturally, but understanding why is the twist. The state space exploration automatically resolves dependency ordering.', example: 'Key b is behind lock A, key a is freely accessible. Must get a first, open A, then get b.' }
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
