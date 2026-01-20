"""
Making A Large Island - Python Solutions

Find the largest island after changing at most one 0 to 1.
"""

from typing import List


def largest_island(grid: List[List[int]]) -> int:
    """
    Find largest possible island by flipping one 0 to 1.

    Strategy:
    1. Label each island with unique ID, store sizes
    2. For each 0, sum unique adjacent island sizes + 1
    3. Return maximum
    """
    n = len(grid)
    if n == 0:
        return 0

    # Direction vectors
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    # Step 1: Label islands and calculate sizes
    island_id = 2  # Start from 2 (0=water, 1=unprocessed land)
    island_size = {}

    def dfs(r: int, c: int, island_id: int) -> int:
        """Label island and return its size."""
        if r < 0 or r >= n or c < 0 or c >= n or grid[r][c] != 1:
            return 0

        grid[r][c] = island_id
        size = 1

        for dr, dc in directions:
            size += dfs(r + dr, c + dc, island_id)

        return size

    for r in range(n):
        for c in range(n):
            if grid[r][c] == 1:
                size = dfs(r, c, island_id)
                island_size[island_id] = size
                island_id += 1

    # Handle case where entire grid is 1s
    if not island_size:
        return 1 if n == 1 else 0

    max_size = max(island_size.values())

    # Step 2: For each 0, calculate potential island size
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 0:
                # Find unique adjacent islands
                adjacent_islands = set()
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1:
                        adjacent_islands.add(grid[nr][nc])

                # Sum sizes + 1 for the flipped cell
                new_size = 1 + sum(island_size[iid] for iid in adjacent_islands)
                max_size = max(max_size, new_size)

    return max_size


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    test_cases = [
        ([[1, 0], [0, 1]], 3, "Connect diagonal"),
        ([[1, 1], [1, 0]], 4, "Fill corner"),
        ([[1, 1], [1, 1]], 4, "Already full"),
        ([[0, 0], [0, 0]], 1, "All water"),
        ([[1]], 1, "Single cell"),
    ]

    print("=" * 60)
    print("MAKING A LARGE ISLAND - TEST RESULTS")
    print("=" * 60)

    for grid, expected, desc in test_cases:
        g = [row[:] for row in grid]
        result = largest_island(g)
        status = "PASS" if result == expected else "FAIL"
        print(f"[{status}] {desc}: got {result}, expected {expected}")


if __name__ == "__main__":
    run_tests()
