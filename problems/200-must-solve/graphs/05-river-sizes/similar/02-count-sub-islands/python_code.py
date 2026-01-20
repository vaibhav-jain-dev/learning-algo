"""
Count Sub Islands - Python Solutions

Count islands in grid2 that are completely contained within islands in grid1.
"""

from typing import List


def count_sub_islands(grid1: List[List[int]], grid2: List[List[int]]) -> int:
    """
    Count sub-islands using DFS.

    An island in grid2 is a sub-island if ALL its cells are 1 in grid1.
    """
    if not grid1 or not grid2:
        return 0

    rows, cols = len(grid1), len(grid1[0])

    def dfs(r: int, c: int) -> bool:
        """
        Explore island in grid2, return True if it's a sub-island.
        """
        if r < 0 or r >= rows or c < 0 or c >= cols or grid2[r][c] != 1:
            return True

        # Mark as visited
        grid2[r][c] = 0

        # Check if this cell is also land in grid1
        is_sub = grid1[r][c] == 1

        # Continue DFS - must check ALL cells even if is_sub is False
        # Use & to ensure all branches are explored
        is_sub = dfs(r + 1, c) and is_sub
        is_sub = dfs(r - 1, c) and is_sub
        is_sub = dfs(r, c + 1) and is_sub
        is_sub = dfs(r, c - 1) and is_sub

        return is_sub

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid2[r][c] == 1:
                if dfs(r, c):
                    count += 1

    return count


def count_sub_islands_preprocess(grid1: List[List[int]], grid2: List[List[int]]) -> int:
    """
    Alternative: First remove non-sub-islands, then count remaining.

    Pre-process: For any cell where grid2[r][c]=1 but grid1[r][c]=0,
    that entire island in grid2 cannot be a sub-island. Remove it.
    """
    if not grid1 or not grid2:
        return 0

    rows, cols = len(grid1), len(grid1[0])

    def sink_island(r: int, c: int) -> None:
        """Remove an island from grid2."""
        if r < 0 or r >= rows or c < 0 or c >= cols or grid2[r][c] != 1:
            return
        grid2[r][c] = 0
        sink_island(r + 1, c)
        sink_island(r - 1, c)
        sink_island(r, c + 1)
        sink_island(r, c - 1)

    # Remove all islands in grid2 that have cells where grid1 is water
    for r in range(rows):
        for c in range(cols):
            if grid2[r][c] == 1 and grid1[r][c] == 0:
                sink_island(r, c)

    # Now count remaining islands in grid2
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid2[r][c] == 1:
                sink_island(r, c)
                count += 1

    return count


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    test_cases = [
        (
            [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]],
            [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]],
            3,
            "Example 1"
        ),
        (
            [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]],
            [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]],
            2,
            "Example 2"
        ),
    ]

    print("=" * 60)
    print("COUNT SUB ISLANDS - TEST RESULTS")
    print("=" * 60)

    for grid1, grid2, expected, desc in test_cases:
        # Copy grids since they're modified
        g1 = [row[:] for row in grid1]
        g2 = [row[:] for row in grid2]
        result = count_sub_islands(g1, g2)
        status = "PASS" if result == expected else "FAIL"
        print(f"[{status}] {desc}: got {result}, expected {expected}")


if __name__ == "__main__":
    run_tests()
