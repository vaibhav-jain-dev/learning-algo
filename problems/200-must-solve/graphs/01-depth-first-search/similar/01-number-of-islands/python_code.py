"""
Number of Islands - Python Solutions

Given a 2D grid of '1's (land) and '0's (water), count the number of islands.
An island is surrounded by water and formed by connecting adjacent lands.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import deque
from typing import List


# ============================================================================
# APPROACH 1: DFS (Recursive)
# ============================================================================
# Time Complexity:  O(m × n) - visit each cell once
# Space Complexity: O(m × n) - recursion stack in worst case
#
# WHY THIS IS BEST:
# - Clean and intuitive flood-fill pattern
# - Easy to understand and implement
# - Natural recursive structure for exploring connected components
# ============================================================================

def num_islands_dfs(grid: List[List[str]]) -> int:
    """
    Count islands using recursive DFS.

    Key Insight: Each unvisited '1' starts a new island.
    DFS marks all connected '1's as visited, preventing recount.

    Visual for 3x3 grid:

        1 1 0      V V 0     (V = visited)
        1 0 0  ->  V 0 0     One DFS from (0,0) visits all connected land
        0 0 1      0 0 1     Cell (2,2) starts second island

        Answer: 2 islands
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r: int, c: int) -> None:
        """Sink the island by marking all connected land as visited."""
        # Boundary and water checks
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return

        # Mark as visited
        grid[r][c] = '0'

        # Explore all 4 directions
        dfs(r + 1, c)  # down
        dfs(r - 1, c)  # up
        dfs(r, c + 1)  # right
        dfs(r, c - 1)  # left

    # Scan entire grid
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)  # Sink the entire island

    return count


# ============================================================================
# APPROACH 2: BFS (Iterative)
# ============================================================================
# Time Complexity:  O(m × n)
# Space Complexity: O(min(m, n)) - queue size bounded by smaller dimension
#
# WHEN TO USE:
# - Avoid deep recursion (stack overflow risk)
# - Prefer iterative solutions
# - Level-by-level exploration needed
# ============================================================================

def num_islands_bfs(grid: List[List[str]]) -> int:
    """
    Count islands using iterative BFS.

    Uses a queue to explore neighbors level by level.
    Marks cells as visited when added to queue (not when processed).
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    # Direction vectors: down, up, right, left
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1

                # BFS from this cell
                queue = deque([(r, c)])
                grid[r][c] = '0'  # Mark visited

                while queue:
                    cr, cc = queue.popleft()

                    # Explore neighbors
                    for dr, dc in directions:
                        nr, nc = cr + dr, cc + dc
                        if (0 <= nr < rows and 0 <= nc < cols and
                            grid[nr][nc] == '1'):
                            grid[nr][nc] = '0'  # Mark visited
                            queue.append((nr, nc))

    return count


# ============================================================================
# APPROACH 3: Union-Find (Disjoint Set)
# ============================================================================
# Time Complexity:  O(m × n × α(m × n)) where α is inverse Ackermann
# Space Complexity: O(m × n) for parent and rank arrays
#
# WHEN TO USE:
# - Dynamic connectivity queries
# - Need to track component sizes
# - Multiple queries on same data
# ============================================================================

class UnionFind:
    """Disjoint Set data structure with path compression and union by rank."""

    def __init__(self, grid: List[List[str]]):
        rows, cols = len(grid), len(grid[0])
        size = rows * cols

        self.parent = list(range(size))
        self.rank = [0] * size
        self.count = 0

        # Initialize: each land cell is its own component
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    self.count += 1

    def find(self, x: int) -> int:
        """Find root with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> None:
        """Union by rank."""
        root_x, root_y = self.find(x), self.find(y)

        if root_x != root_y:
            if self.rank[root_x] < self.rank[root_y]:
                self.parent[root_x] = root_y
            elif self.rank[root_x] > self.rank[root_y]:
                self.parent[root_y] = root_x
            else:
                self.parent[root_y] = root_x
                self.rank[root_x] += 1
            self.count -= 1


def num_islands_union_find(grid: List[List[str]]) -> int:
    """
    Count islands using Union-Find.

    Connect adjacent land cells, count remaining components.
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    uf = UnionFind(grid)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                idx = r * cols + c

                # Union with right neighbor
                if c + 1 < cols and grid[r][c + 1] == '1':
                    uf.union(idx, idx + 1)

                # Union with bottom neighbor
                if r + 1 < rows and grid[r + 1][c] == '1':
                    uf.union(idx, idx + cols)

    return uf.count


# ============================================================================
# APPROACH 4: DFS with Stack (Iterative DFS)
# ============================================================================
# Time Complexity:  O(m × n)
# Space Complexity: O(m × n) for the stack
#
# WHEN TO USE:
# - Want DFS behavior but iterative
# - Avoid recursion limit issues
# ============================================================================

def num_islands_iterative_dfs(grid: List[List[str]]) -> int:
    """
    Count islands using iterative DFS with explicit stack.

    Same traversal order as recursive DFS but with explicit stack.
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1

                # DFS using stack
                stack = [(r, c)]
                grid[r][c] = '0'

                while stack:
                    cr, cc = stack.pop()

                    for dr, dc in directions:
                        nr, nc = cr + dr, cc + dc
                        if (0 <= nr < rows and 0 <= nc < cols and
                            grid[nr][nc] == '1'):
                            grid[nr][nc] = '0'
                            stack.append((nr, nc))

    return count


# ============================================================================
# HELPER: Create grid from string list
# ============================================================================

def create_grid(strings: List[str]) -> List[List[str]]:
    """Convert list of strings to 2D grid."""
    return [list(s) for s in strings]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (
            ["11110", "11010", "11000", "00000"],
            1,
            "Single large island"
        ),
        (
            ["11000", "11000", "00100", "00011"],
            3,
            "Three separate islands"
        ),
        (["1"], 1, "Single cell island"),
        (["0"], 0, "Single cell water"),
        (
            ["10101", "01010", "10101"],
            8,
            "Checkerboard pattern"
        ),
        (
            ["111", "010", "111"],
            1,
            "Ring island"
        ),
    ]

    approaches = [
        ("DFS Recursive", num_islands_dfs),
        ("BFS Iterative", num_islands_bfs),
        ("Iterative DFS", num_islands_iterative_dfs),
    ]

    # Note: Union-Find modifies grid differently, test separately

    print("=" * 70)
    print("NUMBER OF ISLANDS - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for grid_str, expected, desc in test_cases:
            grid = create_grid(grid_str)
            result = func(grid)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    # Test Union-Find separately
    print("\nUnion-Find:")
    print("-" * 50)
    all_passed = True
    for grid_str, expected, desc in test_cases:
        grid = create_grid(grid_str)
        result = num_islands_union_find(grid)
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

    # Example 1
    print("\nInput Grid 1:")
    grid1_str = ["11110", "11010", "11000", "00000"]
    for row in grid1_str:
        print(f"  {row}")
    grid1 = create_grid(grid1_str)
    print(f"Output: {num_islands_dfs(grid1)} islands")

    # Example 2
    print("\nInput Grid 2:")
    grid2_str = ["11000", "11000", "00100", "00011"]
    for row in grid2_str:
        print(f"  {row}")
    grid2 = create_grid(grid2_str)
    print(f"Output: {num_islands_dfs(grid2)} islands")

    print("\nAll examples completed!")
