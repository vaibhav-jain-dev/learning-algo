"""
Number of Closed Islands - Python Solutions

Count islands (0s) that are completely surrounded by water (1s).
"""

from typing import List


def closed_island(grid: List[List[int]]) -> int:
    """Count closed islands (0-regions not touching boundary)."""
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])

    def dfs(r: int, c: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 0:
            return
        grid[r][c] = 1  # Mark as water
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    # Remove border-connected land
    for r in range(rows):
        dfs(r, 0)
        dfs(r, cols - 1)
    for c in range(cols):
        dfs(0, c)
        dfs(rows - 1, c)

    # Count remaining islands
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 0:
                dfs(r, c)
                count += 1

    return count


if __name__ == "__main__":
    grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
    print(f"Closed islands: {closed_island([r[:] for r in grid])} (expected: 2)")
