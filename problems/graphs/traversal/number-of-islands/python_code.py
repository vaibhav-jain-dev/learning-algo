"""
Number of Islands

Given a 2D grid map of '1's (land) and '0's (water), count the number of islands.
"""

from collections import deque
from typing import List


def num_islands_dfs(grid: List[List[str]]) -> int:
    """
    Count number of islands using DFS.

    Args:
        grid: 2D grid of '1's and '0's

    Returns:
        Number of islands
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r: int, c: int):
        # Check bounds and if it's water
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return

        # Mark as visited by changing to '0'
        grid[r][c] = '0'

        # Explore all 4 directions
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)

    return count


def num_islands_bfs(grid: List[List[str]]) -> int:
    """
    Count number of islands using BFS.

    Args:
        grid: 2D grid of '1's and '0's

    Returns:
        Number of islands
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    def bfs(start_r: int, start_c: int):
        queue = deque([(start_r, start_c)])
        grid[start_r][start_c] = '0'

        while queue:
            r, c = queue.popleft()

            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                    grid[nr][nc] = '0'
                    queue.append((nr, nc))

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                bfs(r, c)

    return count


class UnionFind:
    """Union-Find data structure for counting connected components."""

    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = 0

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x: int, y: int):
        px, py = self.find(x), self.find(y)
        if px == py:
            return

        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1

        self.count -= 1

    def set_count(self, c: int):
        self.count = c


def num_islands_union_find(grid: List[List[str]]) -> int:
    """
    Count number of islands using Union-Find.

    Args:
        grid: 2D grid of '1's and '0's

    Returns:
        Number of islands
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    uf = UnionFind(rows * cols)

    # Count initial land cells
    land_count = sum(1 for r in range(rows) for c in range(cols) if grid[r][c] == '1')
    uf.set_count(land_count)

    def get_index(r: int, c: int) -> int:
        return r * cols + c

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                # Only need to check right and down to avoid duplicate unions
                if c + 1 < cols and grid[r][c + 1] == '1':
                    uf.union(get_index(r, c), get_index(r, c + 1))
                if r + 1 < rows and grid[r + 1][c] == '1':
                    uf.union(get_index(r, c), get_index(r + 1, c))

    return uf.count


def run_tests():
    """Run test cases for Number of Islands."""
    print("=" * 60)
    print("NUMBER OF ISLANDS TESTS")
    print("=" * 60)

    # Test 1: Single island
    print("\nTest 1: Single island")
    grid1 = [
        ["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "0", "0", "0"]
    ]
    # Make a copy for each method
    grid1_copy = [row[:] for row in grid1]
    result = num_islands_dfs(grid1_copy)
    print(f"Grid: {grid1}")
    print(f"Number of islands (DFS): {result}")
    assert result == 1, f"Expected 1, got {result}"
    print("PASSED")

    # Test 2: Three islands
    print("\nTest 2: Three islands")
    grid2 = [
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"]
    ]
    grid2_copy = [row[:] for row in grid2]
    result = num_islands_bfs(grid2_copy)
    print(f"Grid: {grid2}")
    print(f"Number of islands (BFS): {result}")
    assert result == 3, f"Expected 3, got {result}"
    print("PASSED")

    # Test 3: Isolated cells
    print("\nTest 3: Isolated cells (checkerboard pattern)")
    grid3 = [
        ["1", "0", "1", "0", "1"],
        ["0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1"]
    ]
    grid3_copy = [row[:] for row in grid3]
    result = num_islands_union_find(grid3_copy)
    print(f"Grid: {grid3}")
    print(f"Number of islands (Union-Find): {result}")
    assert result == 8, f"Expected 8, got {result}"
    print("PASSED")

    # Test 4: All water
    print("\nTest 4: All water")
    grid4 = [
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"]
    ]
    grid4_copy = [row[:] for row in grid4]
    result = num_islands_dfs(grid4_copy)
    print(f"Grid: {grid4}")
    print(f"Number of islands: {result}")
    assert result == 0, f"Expected 0, got {result}"
    print("PASSED")

    # Test 5: All land
    print("\nTest 5: All land")
    grid5 = [
        ["1", "1", "1"],
        ["1", "1", "1"],
        ["1", "1", "1"]
    ]
    grid5_copy = [row[:] for row in grid5]
    result = num_islands_dfs(grid5_copy)
    print(f"Grid: {grid5}")
    print(f"Number of islands: {result}")
    assert result == 1, f"Expected 1, got {result}"
    print("PASSED")

    # Test 6: Single cell land
    print("\nTest 6: Single cell land")
    grid6 = [["1"]]
    grid6_copy = [row[:] for row in grid6]
    result = num_islands_dfs(grid6_copy)
    print(f"Grid: {grid6}")
    print(f"Number of islands: {result}")
    assert result == 1, f"Expected 1, got {result}"
    print("PASSED")

    # Test 7: Single cell water
    print("\nTest 7: Single cell water")
    grid7 = [["0"]]
    grid7_copy = [row[:] for row in grid7]
    result = num_islands_dfs(grid7_copy)
    print(f"Grid: {grid7}")
    print(f"Number of islands: {result}")
    assert result == 0, f"Expected 0, got {result}"
    print("PASSED")

    # Test 8: L-shaped island
    print("\nTest 8: L-shaped island")
    grid8 = [
        ["1", "0", "0"],
        ["1", "0", "0"],
        ["1", "1", "1"]
    ]
    grid8_copy = [row[:] for row in grid8]
    result = num_islands_dfs(grid8_copy)
    print(f"Grid: {grid8}")
    print(f"Number of islands: {result}")
    assert result == 1, f"Expected 1, got {result}"
    print("PASSED")

    # Test 9: Empty grid
    print("\nTest 9: Empty grid")
    grid9 = []
    result = num_islands_dfs(grid9)
    print(f"Grid: []")
    print(f"Number of islands: {result}")
    assert result == 0, f"Expected 0, got {result}"
    print("PASSED")

    # Test 10: Horizontal strip
    print("\nTest 10: Horizontal strip")
    grid10 = [["1", "1", "1", "1", "1"]]
    grid10_copy = [row[:] for row in grid10]
    result = num_islands_dfs(grid10_copy)
    print(f"Grid: {grid10}")
    print(f"Number of islands: {result}")
    assert result == 1, f"Expected 1, got {result}"
    print("PASSED")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
