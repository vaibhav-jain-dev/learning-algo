"""
Largest Island (Making A Large Island) - Python Solution

Find the largest island after changing at most one 0 to 1.
Uses DFS for island labeling or Union-Find for efficient connectivity.

Time Complexity: O(n^2) for both approaches
Space Complexity: O(n^2) for island labels or Union-Find structures
"""

from collections import defaultdict
from typing import List


def largest_island_dfs(grid: List[List[int]]) -> int:
    """
    Find largest island after flipping one 0 to 1.
    Uses DFS to label islands and compute sizes.

    Args:
        grid: n x n binary matrix

    Returns:
        Size of largest possible island
    """
    if not grid or not grid[0]:
        return 0

    n = len(grid)
    island_id = 2  # Start from 2 to distinguish from 0 and 1
    island_sizes = {}  # {island_id: size}

    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    def dfs(row: int, col: int, label: int) -> int:
        """DFS to label island cells and count size."""
        if (row < 0 or row >= n or col < 0 or col >= n or
            grid[row][col] != 1):
            return 0

        grid[row][col] = label  # Mark with island ID
        size = 1

        for dr, dc in directions:
            size += dfs(row + dr, col + dc, label)

        return size

    # First pass: Label all islands and compute sizes
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                size = dfs(i, j, island_id)
                island_sizes[island_id] = size
                island_id += 1

    # Edge case: no islands exist
    if not island_sizes:
        return 1  # Can flip one 0 to 1

    # Edge case: grid is all 1s
    max_size = max(island_sizes.values())
    has_zero = False

    # Second pass: Check each 0 cell
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 0:
                has_zero = True
                # Find unique adjacent islands
                adjacent_islands = set()

                for dr, dc in directions:
                    ni, nj = i + dr, j + dc
                    if 0 <= ni < n and 0 <= nj < n and grid[ni][nj] > 1:
                        adjacent_islands.add(grid[ni][nj])

                # Calculate potential island size
                potential_size = 1  # The flipped cell itself
                for island in adjacent_islands:
                    potential_size += island_sizes[island]

                max_size = max(max_size, potential_size)

    # If no zeros, return largest existing island
    return max_size if has_zero else max_size


class UnionFind:
    """Union-Find (Disjoint Set Union) data structure."""

    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.size = [1] * n

    def find(self, x: int) -> int:
        """Find root with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """Union by rank. Returns True if merge happened."""
        px, py = self.find(x), self.find(y)
        if px == py:
            return False

        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px

        self.parent[py] = px
        self.size[px] += self.size[py]

        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1

        return True

    def get_size(self, x: int) -> int:
        """Get size of component containing x."""
        return self.size[self.find(x)]


def largest_island_union_find(grid: List[List[int]]) -> int:
    """
    Find largest island using Union-Find approach.

    Args:
        grid: n x n binary matrix

    Returns:
        Size of largest possible island
    """
    if not grid or not grid[0]:
        return 0

    n = len(grid)
    uf = UnionFind(n * n)

    # Helper to convert 2D coordinates to 1D index
    def index(row: int, col: int) -> int:
        return row * n + col

    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    # First pass: Union adjacent 1s
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                for dr, dc in directions:
                    ni, nj = i + dr, j + dc
                    if 0 <= ni < n and 0 <= nj < n and grid[ni][nj] == 1:
                        uf.union(index(i, j), index(ni, nj))

    # Find max existing island size
    max_size = 0
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                max_size = max(max_size, uf.get_size(index(i, j)))

    # Second pass: Check each 0 cell
    has_zero = False
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 0:
                has_zero = True
                # Find unique adjacent island roots
                adjacent_roots = set()

                for dr, dc in directions:
                    ni, nj = i + dr, j + dc
                    if 0 <= ni < n and 0 <= nj < n and grid[ni][nj] == 1:
                        adjacent_roots.add(uf.find(index(ni, nj)))

                # Calculate potential size
                potential_size = 1  # The flipped cell
                for root in adjacent_roots:
                    potential_size += uf.size[root]

                max_size = max(max_size, potential_size)

    # Handle edge cases
    if max_size == 0:
        return 1  # No islands, flip one 0
    if not has_zero:
        return max_size  # No zeros to flip

    return max_size


# Test cases
if __name__ == "__main__":
    # Test 1: Connect two islands
    grid1 = [
        [1, 0],
        [0, 1]
    ]
    result1 = largest_island_dfs([row[:] for row in grid1])
    print(f"Test 1 (DFS): {result1}")
    print(f"Expected: 3")
    assert result1 == 3

    result1_uf = largest_island_union_find([row[:] for row in grid1])
    print(f"Test 1 (Union-Find): {result1_uf}")
    assert result1_uf == 3

    # Test 2: Expand existing island
    grid2 = [
        [1, 1],
        [1, 0]
    ]
    result2 = largest_island_dfs([row[:] for row in grid2])
    print(f"\nTest 2 (DFS): {result2}")
    print(f"Expected: 4")
    assert result2 == 4

    # Test 3: All 1s
    grid3 = [
        [1, 1],
        [1, 1]
    ]
    result3 = largest_island_dfs([row[:] for row in grid3])
    print(f"\nTest 3 (DFS): {result3}")
    print(f"Expected: 4")
    assert result3 == 4

    # Test 4: Center hole
    grid4 = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ]
    result4 = largest_island_dfs([row[:] for row in grid4])
    print(f"\nTest 4 (DFS): {result4}")
    print(f"Expected: 9")
    assert result4 == 9

    result4_uf = largest_island_union_find([row[:] for row in grid4])
    print(f"Test 4 (Union-Find): {result4_uf}")
    assert result4_uf == 9

    # Test 5: All 0s
    grid5 = [
        [0, 0],
        [0, 0]
    ]
    result5 = largest_island_dfs([row[:] for row in grid5])
    print(f"\nTest 5 (DFS): {result5}")
    print(f"Expected: 1")
    assert result5 == 1

    # Test 6: Multiple separate islands
    grid6 = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1]
    ]
    result6 = largest_island_dfs([row[:] for row in grid6])
    print(f"\nTest 6 (DFS): {result6}")
    print(f"Expected: 3 (connect two adjacent islands)")

    result6_uf = largest_island_union_find([row[:] for row in grid6])
    print(f"Test 6 (Union-Find): {result6_uf}")

    # Test 7: Large connected component
    grid7 = [
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1]
    ]
    result7 = largest_island_dfs([row[:] for row in grid7])
    print(f"\nTest 7 (DFS): {result7}")
    # Flipping center-top or center-bottom 0 connects two 4-cell islands + center

    result7_uf = largest_island_union_find([row[:] for row in grid7])
    print(f"Test 7 (Union-Find): {result7_uf}")

    # Test 8: Single cell
    grid8 = [[0]]
    result8 = largest_island_dfs([row[:] for row in grid8])
    print(f"\nTest 8 (DFS): {result8}")
    print(f"Expected: 1")
    assert result8 == 1

    grid9 = [[1]]
    result9 = largest_island_dfs([row[:] for row in grid9])
    print(f"\nTest 9 (DFS): {result9}")
    print(f"Expected: 1")
    assert result9 == 1

    print("\nAll tests passed!")
