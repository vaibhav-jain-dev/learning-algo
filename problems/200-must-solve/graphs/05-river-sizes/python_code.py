"""
River Sizes - Python Solution

Find the sizes of all rivers in a matrix where 1s represent water.

Time Complexity: O(n * m) where n is rows and m is columns
Space Complexity: O(n * m) for the visited set
"""

from typing import List
from collections import deque


def river_sizes(matrix: List[List[int]]) -> List[int]:
    """
    Find all river sizes using DFS.

    Args:
        matrix: 2D array of 0s (land) and 1s (water)

    Returns:
        List of river sizes in no particular order
    """
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    visited = [[False] * cols for _ in range(rows)]
    sizes = []

    for row in range(rows):
        for col in range(cols):
            if not visited[row][col] and matrix[row][col] == 1:
                size = explore_river_dfs(matrix, visited, row, col)
                sizes.append(size)

    return sizes


def explore_river_dfs(
    matrix: List[List[int]],
    visited: List[List[bool]],
    start_row: int,
    start_col: int
) -> int:
    """
    Explore a river using DFS and return its size.

    Args:
        matrix: The input matrix
        visited: Visited tracking matrix
        start_row: Starting row position
        start_col: Starting column position

    Returns:
        Size of the river
    """
    rows, cols = len(matrix), len(matrix[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right

    stack = [(start_row, start_col)]
    size = 0

    while stack:
        row, col = stack.pop()

        if visited[row][col]:
            continue

        visited[row][col] = True
        size += 1

        # Explore neighbors
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            if (0 <= new_row < rows and
                0 <= new_col < cols and
                not visited[new_row][new_col] and
                matrix[new_row][new_col] == 1):
                stack.append((new_row, new_col))

    return size


def river_sizes_bfs(matrix: List[List[int]]) -> List[int]:
    """
    Find all river sizes using BFS.

    Args:
        matrix: 2D array of 0s (land) and 1s (water)

    Returns:
        List of river sizes in no particular order
    """
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    visited = [[False] * cols for _ in range(rows)]
    sizes = []
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for row in range(rows):
        for col in range(cols):
            if not visited[row][col] and matrix[row][col] == 1:
                # BFS from this cell
                size = 0
                queue = deque([(row, col)])
                visited[row][col] = True

                while queue:
                    curr_row, curr_col = queue.popleft()
                    size += 1

                    for dr, dc in directions:
                        new_row, new_col = curr_row + dr, curr_col + dc
                        if (0 <= new_row < rows and
                            0 <= new_col < cols and
                            not visited[new_row][new_col] and
                            matrix[new_row][new_col] == 1):
                            visited[new_row][new_col] = True
                            queue.append((new_row, new_col))

                sizes.append(size)

    return sizes


def river_sizes_recursive(matrix: List[List[int]]) -> List[int]:
    """
    Find all river sizes using recursive DFS.

    Args:
        matrix: 2D array of 0s (land) and 1s (water)

    Returns:
        List of river sizes in no particular order
    """
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    visited = [[False] * cols for _ in range(rows)]
    sizes = []

    def dfs(row: int, col: int) -> int:
        """Recursive DFS to explore river and return size."""
        if (row < 0 or row >= rows or
            col < 0 or col >= cols or
            visited[row][col] or
            matrix[row][col] == 0):
            return 0

        visited[row][col] = True
        size = 1

        # Explore all four directions
        size += dfs(row - 1, col)  # up
        size += dfs(row + 1, col)  # down
        size += dfs(row, col - 1)  # left
        size += dfs(row, col + 1)  # right

        return size

    for row in range(rows):
        for col in range(cols):
            if not visited[row][col] and matrix[row][col] == 1:
                sizes.append(dfs(row, col))

    return sizes


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    matrix1 = [
        [1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0]
    ]
    result1 = sorted(river_sizes(matrix1))
    print(f"Test 1 (DFS): {result1}")  # Expected: [1, 2, 2, 2, 5]
    assert result1 == [1, 2, 2, 2, 5]

    # Test 2: All connected
    matrix2 = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
    result2 = river_sizes(matrix2)
    print(f"Test 2 (All connected): {result2}")  # Expected: [9]
    assert result2 == [9]

    # Test 3: No rivers
    matrix3 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    result3 = river_sizes(matrix3)
    print(f"Test 3 (No rivers): {result3}")  # Expected: []
    assert result3 == []

    # Test 4: Each cell is a separate river
    matrix4 = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]
    ]
    result4 = sorted(river_sizes(matrix4))
    print(f"Test 4 (Separate rivers): {result4}")  # Expected: [1, 1, 1, 1, 1]
    assert result4 == [1, 1, 1, 1, 1]

    # Test 5: Empty matrix
    result5 = river_sizes([])
    print(f"Test 5 (Empty): {result5}")  # Expected: []
    assert result5 == []

    # Test 6: Single cell with river
    result6 = river_sizes([[1]])
    print(f"Test 6 (Single river cell): {result6}")  # Expected: [1]
    assert result6 == [1]

    # Test 7: Single cell without river
    result7 = river_sizes([[0]])
    print(f"Test 7 (Single land cell): {result7}")  # Expected: []
    assert result7 == []

    # Test BFS version
    print("\n--- Testing BFS Version ---")
    result_bfs = sorted(river_sizes_bfs(matrix1))
    print(f"BFS Test: {result_bfs}")  # Expected: [1, 2, 2, 2, 5]
    assert result_bfs == [1, 2, 2, 2, 5]

    # Test recursive version
    print("\n--- Testing Recursive Version ---")
    result_rec = sorted(river_sizes_recursive(matrix1))
    print(f"Recursive Test: {result_rec}")  # Expected: [1, 2, 2, 2, 5]
    assert result_rec == [1, 2, 2, 2, 5]

    print("\nAll tests passed!")
