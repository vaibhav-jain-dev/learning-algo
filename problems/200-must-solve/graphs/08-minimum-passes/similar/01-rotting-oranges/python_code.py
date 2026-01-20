"""
Rotting Oranges - Python Solutions

Find minimum minutes for all oranges to rot using multi-source BFS.
"""

from collections import deque
from typing import List


def oranges_rotting(grid: List[List[int]]) -> int:
    """
    Multi-source BFS from all rotten oranges.
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0

    # Initialize: add all rotten oranges, count fresh
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    if fresh == 0:
        return 0

    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    minutes = 0

    # BFS level by level
    while queue and fresh > 0:
        minutes += 1
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))

    return minutes if fresh == 0 else -1


if __name__ == "__main__":
    grid1 = [[2,1,1],[1,1,0],[0,1,1]]
    print(f"Example 1: {oranges_rotting([r[:] for r in grid1])} (expected: 4)")

    grid2 = [[2,1,1],[0,1,1],[1,0,1]]
    print(f"Example 2: {oranges_rotting([r[:] for r in grid2])} (expected: -1)")

    grid3 = [[0,2]]
    print(f"Example 3: {oranges_rotting([r[:] for r in grid3])} (expected: 0)")
