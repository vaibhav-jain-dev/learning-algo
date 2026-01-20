"""
Number of Enclaves - Python Solutions

Count land cells that cannot reach the boundary.
"""

from typing import List


def num_enclaves(grid: List[List[int]]) -> int:
    """
    Count enclave cells (land cells that can't reach border).
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])

    def dfs(r: int, c: int) -> None:
        """Sink land connected to border."""
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:
            return
        grid[r][c] = 0
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    # Remove all land connected to border
    for r in range(rows):
        dfs(r, 0)
        dfs(r, cols - 1)
    for c in range(cols):
        dfs(0, c)
        dfs(rows - 1, c)

    # Count remaining land (enclaves)
    return sum(sum(row) for row in grid)


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    grid1 = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
    print(f"Example 1: {num_enclaves([r[:] for r in grid1])} (expected: 3)")

    grid2 = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
    print(f"Example 2: {num_enclaves([r[:] for r in grid2])} (expected: 0)")
