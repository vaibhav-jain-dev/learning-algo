"""
Shortest Path in Binary Matrix - Python Solutions

Find shortest path from top-left to bottom-right in a grid
with 8-directional movement.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import deque
from heapq import heappush, heappop
from typing import List


# ============================================================================
# APPROACH 1: BFS (Standard)
# ============================================================================
# Time Complexity:  O(N^2) - visit each cell at most once
# Space Complexity: O(N^2) - for visited tracking and queue
#
# WHY THIS IS BEST:
# - BFS guarantees shortest path in unweighted graph
# - Simple and intuitive implementation
# - Standard grid traversal pattern
# ============================================================================

def shortest_path_bfs(grid: List[List[int]]) -> int:
    """
    Find shortest path using BFS.

    Key Insight: BFS explores cells in order of distance from source.
    First time we reach destination is guaranteed to be shortest path.

    8 directions: up, down, left, right, and 4 diagonals.
    """
    n = len(grid)
    if n == 0 or grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    if n == 1:
        return 1

    # 8 directions: including diagonals
    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    # BFS queue: (row, col)
    queue = deque([(0, 0)])
    grid[0][0] = 1  # Mark visited by setting to 1
    path_length = 1

    while queue:
        # Process all cells at current distance
        for _ in range(len(queue)):
            r, c = queue.popleft()

            # Check all 8 neighbors
            for dr, dc in directions:
                nr, nc = r + dr, c + dc

                # Skip invalid or blocked cells
                if not (0 <= nr < n and 0 <= nc < n) or grid[nr][nc] == 1:
                    continue

                # Check if reached destination
                if nr == n - 1 and nc == n - 1:
                    return path_length + 1

                # Mark visited and add to queue
                grid[nr][nc] = 1
                queue.append((nr, nc))

        path_length += 1

    return -1  # No path found


# ============================================================================
# APPROACH 2: BFS with Separate Visited Set (Non-destructive)
# ============================================================================
# Time Complexity:  O(N^2)
# Space Complexity: O(N^2)
#
# WHEN TO USE:
# - Don't want to modify original grid
# - Need to run multiple queries on same grid
# ============================================================================

def shortest_path_bfs_clean(grid: List[List[int]]) -> int:
    """Find path without modifying grid."""
    n = len(grid)
    if n == 0 or grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    if n == 1:
        return 1

    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    # Use separate visited set
    visited = set()
    visited.add((0, 0))

    queue = deque([(0, 0)])
    path_length = 1

    while queue:
        for _ in range(len(queue)):
            r, c = queue.popleft()

            for dr, dc in directions:
                nr, nc = r + dr, c + dc

                if not (0 <= nr < n and 0 <= nc < n):
                    continue
                if grid[nr][nc] == 1 or (nr, nc) in visited:
                    continue

                if nr == n - 1 and nc == n - 1:
                    return path_length + 1

                visited.add((nr, nc))
                queue.append((nr, nc))

        path_length += 1

    return -1


# ============================================================================
# APPROACH 3: A* Search with Chebyshev Heuristic
# ============================================================================
# Time Complexity:  O(N^2 log N) - priority queue operations
# Space Complexity: O(N^2)
#
# WHEN TO USE:
# - Large grids where BFS is slow
# - Want to explore promising paths first
# ============================================================================

def shortest_path_astar(grid: List[List[int]]) -> int:
    """
    Use A* search with Chebyshev distance heuristic.

    Chebyshev distance is appropriate for 8-directional movement
    (diagonal moves count as 1, same as orthogonal).
    """
    n = len(grid)
    if n == 0 or grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    if n == 1:
        return 1

    def heuristic(r: int, c: int) -> int:
        """Chebyshev distance to destination."""
        return max(n - 1 - r, n - 1 - c)

    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    # Priority queue: (priority, distance, row, col)
    # priority = distance + heuristic
    pq = [(1 + heuristic(0, 0), 1, 0, 0)]
    dist = {(0, 0): 1}

    while pq:
        _, d, r, c = heappop(pq)

        # Skip if we've found a shorter path
        if d > dist.get((r, c), float('inf')):
            continue

        # Check if reached destination
        if r == n - 1 and c == n - 1:
            return d

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if not (0 <= nr < n and 0 <= nc < n) or grid[nr][nc] == 1:
                continue

            new_dist = d + 1
            if new_dist < dist.get((nr, nc), float('inf')):
                dist[(nr, nc)] = new_dist
                heappush(pq, (new_dist + heuristic(nr, nc), new_dist, nr, nc))

    return -1


# ============================================================================
# APPROACH 4: Bidirectional BFS
# ============================================================================
# Time Complexity:  O(N^2)
# Space Complexity: O(N^2)
#
# WHEN TO USE:
# - Very large grids
# - Want to reduce search space
# ============================================================================

def shortest_path_bidirectional(grid: List[List[int]]) -> int:
    """
    Search from both start and end simultaneously.

    Meet in the middle to reduce search space.
    """
    n = len(grid)
    if n == 0 or grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    if n == 1:
        return 1

    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    # Two frontiers and visited sets
    start_queue = deque([(0, 0)])
    end_queue = deque([(n-1, n-1)])

    start_visited = {(0, 0): 1}  # cell -> distance from start
    end_visited = {(n-1, n-1): 1}  # cell -> distance from end

    while start_queue and end_queue:
        # Expand smaller frontier
        if len(start_queue) <= len(end_queue):
            for _ in range(len(start_queue)):
                r, c = start_queue.popleft()
                curr_dist = start_visited[(r, c)]

                for dr, dc in directions:
                    nr, nc = r + dr, c + dc

                    if not (0 <= nr < n and 0 <= nc < n) or grid[nr][nc] == 1:
                        continue

                    if (nr, nc) in start_visited:
                        continue

                    # Check if meets end frontier
                    if (nr, nc) in end_visited:
                        return curr_dist + end_visited[(nr, nc)]

                    start_visited[(nr, nc)] = curr_dist + 1
                    start_queue.append((nr, nc))
        else:
            for _ in range(len(end_queue)):
                r, c = end_queue.popleft()
                curr_dist = end_visited[(r, c)]

                for dr, dc in directions:
                    nr, nc = r + dr, c + dc

                    if not (0 <= nr < n and 0 <= nc < n) or grid[nr][nc] == 1:
                        continue

                    if (nr, nc) in end_visited:
                        continue

                    # Check if meets start frontier
                    if (nr, nc) in start_visited:
                        return curr_dist + start_visited[(nr, nc)]

                    end_visited[(nr, nc)] = curr_dist + 1
                    end_queue.append((nr, nc))

    return -1


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([[0, 1], [1, 0]], 2, "2x2 diagonal path"),
        ([[0, 0, 0], [1, 1, 0], [1, 1, 0]], 4, "3x3 around obstacles"),
        ([[1, 0, 0], [1, 1, 0], [1, 1, 0]], -1, "Starting cell blocked"),
        ([[0, 0, 0], [0, 1, 0], [0, 0, 0]], 3, "3x3 with center blocked"),
        ([[0]], 1, "Single cell"),
        ([
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0]
        ], 5, "4x4 maze"),
    ]

    approaches = [
        ("BFS (Non-destructive)", shortest_path_bfs_clean),
        ("A* Search", shortest_path_astar),
        ("Bidirectional BFS", shortest_path_bidirectional),
    ]

    print("=" * 70)
    print("SHORTEST PATH IN BINARY MATRIX - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)

        for grid, expected, desc in test_cases:
            result = func([row[:] for row in grid])  # Copy grid
            status = "PASS" if result == expected else "FAIL"
            print(f"  [{status}] {desc}: got {result}, expected {expected}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("DETAILED EXAMPLE")
    print("=" * 70)

    grid = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]
    print("\nGrid:")
    for row in grid:
        print(f"  {row}")
    print(f"\nShortest path: {shortest_path_bfs_clean(grid)} cells")
    print("Path: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2)")

    print("\nAll tests completed!")
