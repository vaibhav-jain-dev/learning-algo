"""
Max Area of Island - Python Solutions

Find the maximum area of an island in a 2D grid.
An island is a group of 1's connected 4-directionally.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import deque
from typing import List


# ============================================================================
# APPROACH 1: DFS Recursive
# ============================================================================
# Time Complexity:  O(m * n) - visit each cell once
# Space Complexity: O(m * n) - recursion stack worst case
#
# WHY THIS IS BEST:
# - Clean and intuitive
# - Returns area directly from recursion
# - Natural flood-fill pattern
# ============================================================================

def max_area_of_island_dfs(grid: List[List[int]]) -> int:
    """
    Find max island area using recursive DFS.

    DFS returns the size of the island starting from a cell.
    Track maximum across all islands.
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    max_area = 0

    def dfs(r: int, c: int) -> int:
        """Return area of island starting from (r, c)."""
        # Boundary and water checks
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:
            return 0

        # Mark as visited
        grid[r][c] = 0

        # Count this cell + all connected cells
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                area = dfs(r, c)
                max_area = max(max_area, area)

    return max_area


# ============================================================================
# APPROACH 2: BFS Iterative
# ============================================================================
# Time Complexity:  O(m * n)
# Space Complexity: O(min(m, n)) for queue
#
# WHEN TO USE:
# - Avoid deep recursion
# - Prefer iterative solutions
# ============================================================================

def max_area_of_island_bfs(grid: List[List[int]]) -> int:
    """
    Find max island area using iterative BFS.
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    max_area = 0
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                # BFS to count island area
                area = 0
                queue = deque([(r, c)])
                grid[r][c] = 0  # Mark visited

                while queue:
                    cr, cc = queue.popleft()
                    area += 1

                    for dr, dc in directions:
                        nr, nc = cr + dr, cc + dc
                        if (0 <= nr < rows and 0 <= nc < cols and
                            grid[nr][nc] == 1):
                            grid[nr][nc] = 0
                            queue.append((nr, nc))

                max_area = max(max_area, area)

    return max_area


# ============================================================================
# APPROACH 3: DFS with Stack (Iterative DFS)
# ============================================================================
# Time Complexity:  O(m * n)
# Space Complexity: O(m * n) for stack
#
# VARIANT:
# - Same traversal order as recursive DFS
# - Uses explicit stack
# ============================================================================

def max_area_of_island_stack(grid: List[List[int]]) -> int:
    """
    Find max island area using iterative DFS with stack.
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    max_area = 0
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                area = 0
                stack = [(r, c)]
                grid[r][c] = 0

                while stack:
                    cr, cc = stack.pop()
                    area += 1

                    for dr, dc in directions:
                        nr, nc = cr + dr, cc + dc
                        if (0 <= nr < rows and 0 <= nc < cols and
                            grid[nr][nc] == 1):
                            grid[nr][nc] = 0
                            stack.append((nr, nc))

                max_area = max(max_area, area)

    return max_area


# ============================================================================
# HELPER: Create grid copy for testing
# ============================================================================

def copy_grid(grid: List[List[int]]) -> List[List[int]]:
    return [row[:] for row in grid]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (
            [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
             [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
             [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]],
            6,
            "Complex grid"
        ),
        ([[0, 0, 0, 0, 0, 0, 0, 0]], 0, "All water"),
        ([[1]], 1, "Single cell island"),
        ([[1, 1], [1, 1]], 4, "2x2 island"),
        ([[1, 0], [0, 1]], 1, "Diagonal (not connected)"),
    ]

    approaches = [
        ("DFS Recursive", max_area_of_island_dfs),
        ("BFS Iterative", max_area_of_island_bfs),
        ("DFS with Stack", max_area_of_island_stack),
    ]

    print("=" * 70)
    print("MAX AREA OF ISLAND - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for grid, expected, desc in test_cases:
            result = func(copy_grid(grid))
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE INPUT EXAMPLES")
    print("=" * 70)

    # Example
    print("\nExample:")
    grid = [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1]
    ]
    print("  Grid:")
    for row in grid:
        print(f"    {row}")
    result = max_area_of_island_dfs(copy_grid(grid))
    print(f"\n  Maximum Area: {result}")
    print("  Explanation: Top-left island has area 4, bottom-right has area 4")

    print("\nAll examples completed!")
