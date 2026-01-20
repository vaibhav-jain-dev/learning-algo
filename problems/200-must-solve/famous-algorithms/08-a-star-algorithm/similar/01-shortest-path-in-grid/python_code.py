"""
Shortest Path in Binary Matrix - Python Solution

Find shortest path from top-left to bottom-right in a binary grid with 8-directional movement.

Time Complexity: O(n^2)
Space Complexity: O(n^2)
"""

from typing import List
from collections import deque
import heapq


def shortest_path_binary_matrix_bfs(grid: List[List[int]]) -> int:
    """
    Find shortest path using BFS (standard approach).

    Args:
        grid: n x n binary matrix (0 = clear, 1 = blocked)

    Returns:
        Length of shortest path or -1 if none exists
    """
    if not grid or not grid[0]:
        return -1

    n = len(grid)

    # Check if start or end is blocked
    if grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    if n == 1:
        return 1

    # 8 directions (including diagonals)
    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    queue = deque([(0, 0, 1)])  # (row, col, distance)
    visited = {(0, 0)}

    while queue:
        row, col, dist = queue.popleft()

        for dr, dc in directions:
            nr, nc = row + dr, col + dc

            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0 and (nr, nc) not in visited:
                if nr == n - 1 and nc == n - 1:
                    return dist + 1

                visited.add((nr, nc))
                queue.append((nr, nc, dist + 1))

    return -1


def shortest_path_binary_matrix_astar(grid: List[List[int]]) -> int:
    """
    Find shortest path using A* with Chebyshev distance heuristic.

    Args:
        grid: n x n binary matrix

    Returns:
        Length of shortest path or -1 if none exists
    """
    if not grid or not grid[0]:
        return -1

    n = len(grid)

    if grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    if n == 1:
        return 1

    def heuristic(row: int, col: int) -> int:
        """Chebyshev distance for 8-directional movement"""
        return max(abs(n - 1 - row), abs(n - 1 - col))

    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    # Priority queue: (f_score, g_score, row, col)
    start_h = heuristic(0, 0)
    pq = [(start_h + 1, 1, 0, 0)]
    g_scores = {(0, 0): 1}

    while pq:
        f, g, row, col = heapq.heappop(pq)

        if row == n - 1 and col == n - 1:
            return g

        if g > g_scores.get((row, col), float('inf')):
            continue

        for dr, dc in directions:
            nr, nc = row + dr, col + dc

            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                new_g = g + 1

                if new_g < g_scores.get((nr, nc), float('inf')):
                    g_scores[(nr, nc)] = new_g
                    f = new_g + heuristic(nr, nc)
                    heapq.heappush(pq, (f, new_g, nr, nc))

    return -1


# Test cases
if __name__ == "__main__":
    # Test 1: Diagonal path
    grid1 = [[0, 1], [1, 0]]
    result1 = shortest_path_binary_matrix_bfs(grid1)
    print(f"Test 1 (BFS): {result1}")
    assert result1 == 2, f"Expected 2, got {result1}"

    result1_astar = shortest_path_binary_matrix_astar(grid1)
    print(f"Test 1 (A*): {result1_astar}")
    assert result1_astar == 2

    # Test 2: Longer path
    grid2 = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]
    result2 = shortest_path_binary_matrix_bfs(grid2)
    print(f"Test 2 (BFS): {result2}")
    assert result2 == 4, f"Expected 4, got {result2}"

    # Test 3: Blocked start
    grid3 = [[1, 0, 0], [1, 1, 0], [1, 1, 0]]
    result3 = shortest_path_binary_matrix_bfs(grid3)
    print(f"Test 3 (BFS): {result3}")
    assert result3 == -1, f"Expected -1, got {result3}"

    # Test 4: No path
    grid4 = [[0, 1, 0], [1, 1, 0], [0, 0, 0]]
    result4 = shortest_path_binary_matrix_bfs(grid4)
    print(f"Test 4 (BFS): {result4}")
    # Has a path via diagonals

    # Test 5: Single cell
    grid5 = [[0]]
    result5 = shortest_path_binary_matrix_bfs(grid5)
    print(f"Test 5 (BFS): {result5}")
    assert result5 == 1, f"Expected 1, got {result5}"

    # Test 6: Straight diagonal path
    grid6 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    result6 = shortest_path_binary_matrix_bfs(grid6)
    print(f"Test 6 (BFS): {result6}")
    assert result6 == 3, f"Expected 3, got {result6}"  # Diagonal: (0,0)->(1,1)->(2,2)

    print("\nAll tests passed!")
