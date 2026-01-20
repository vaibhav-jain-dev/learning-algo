"""
Remove Islands - Python Solution

Remove all 1s that are not connected to the border of the matrix.

Time Complexity: O(n * m) where n is rows and m is columns
Space Complexity: O(n * m) for the recursion stack in worst case
"""

from typing import List
from collections import deque


def remove_islands(matrix: List[List[int]]) -> List[List[int]]:
    """
    Remove all islands (1s not connected to border) from the matrix.

    Uses iterative DFS to mark border-connected 1s, then removes unmarked 1s.

    Args:
        matrix: 2D array of 0s and 1s

    Returns:
        Modified matrix with islands removed
    """
    if not matrix or not matrix[0]:
        return matrix

    rows, cols = len(matrix), len(matrix[0])

    # Mark all border-connected 1s with value 2
    # Process all border cells
    for row in range(rows):
        # First column
        if matrix[row][0] == 1:
            mark_border_connected(matrix, row, 0)
        # Last column
        if matrix[row][cols - 1] == 1:
            mark_border_connected(matrix, row, cols - 1)

    for col in range(cols):
        # First row
        if matrix[0][col] == 1:
            mark_border_connected(matrix, 0, col)
        # Last row
        if matrix[rows - 1][col] == 1:
            mark_border_connected(matrix, rows - 1, col)

    # Convert: 1 -> 0 (islands), 2 -> 1 (border-connected)
    for row in range(rows):
        for col in range(cols):
            if matrix[row][col] == 1:
                matrix[row][col] = 0  # Island - remove
            elif matrix[row][col] == 2:
                matrix[row][col] = 1  # Border-connected - restore

    return matrix


def mark_border_connected(matrix: List[List[int]], start_row: int, start_col: int) -> None:
    """
    Mark all 1s connected to the starting cell with value 2 using iterative DFS.

    Args:
        matrix: The input matrix
        start_row: Starting row position
        start_col: Starting column position
    """
    rows, cols = len(matrix), len(matrix[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    stack = [(start_row, start_col)]

    while stack:
        row, col = stack.pop()

        if matrix[row][col] != 1:
            continue

        matrix[row][col] = 2  # Mark as border-connected

        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            if (0 <= new_row < rows and
                0 <= new_col < cols and
                matrix[new_row][new_col] == 1):
                stack.append((new_row, new_col))


def remove_islands_bfs(matrix: List[List[int]]) -> List[List[int]]:
    """
    Remove all islands using BFS approach.

    Args:
        matrix: 2D array of 0s and 1s

    Returns:
        Modified matrix with islands removed
    """
    if not matrix or not matrix[0]:
        return matrix

    rows, cols = len(matrix), len(matrix[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # Collect all border 1s and add to queue
    queue = deque()

    for row in range(rows):
        if matrix[row][0] == 1:
            queue.append((row, 0))
            matrix[row][0] = 2
        if matrix[row][cols - 1] == 1:
            queue.append((row, cols - 1))
            matrix[row][cols - 1] = 2

    for col in range(1, cols - 1):
        if matrix[0][col] == 1:
            queue.append((0, col))
            matrix[0][col] = 2
        if matrix[rows - 1][col] == 1:
            queue.append((rows - 1, col))
            matrix[rows - 1][col] = 2

    # BFS to mark all border-connected 1s
    while queue:
        row, col = queue.popleft()

        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            if (0 <= new_row < rows and
                0 <= new_col < cols and
                matrix[new_row][new_col] == 1):
                matrix[new_row][new_col] = 2
                queue.append((new_row, new_col))

    # Convert: 1 -> 0 (islands), 2 -> 1 (border-connected)
    for row in range(rows):
        for col in range(cols):
            if matrix[row][col] == 1:
                matrix[row][col] = 0
            elif matrix[row][col] == 2:
                matrix[row][col] = 1

    return matrix


def remove_islands_with_visited(matrix: List[List[int]]) -> List[List[int]]:
    """
    Remove islands using a separate visited matrix instead of modifying values.

    Args:
        matrix: 2D array of 0s and 1s

    Returns:
        Modified matrix with islands removed
    """
    if not matrix or not matrix[0]:
        return matrix

    rows, cols = len(matrix), len(matrix[0])
    connected_to_border = [[False] * cols for _ in range(rows)]
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    def dfs(row: int, col: int) -> None:
        """Recursive DFS to mark border-connected cells."""
        if (row < 0 or row >= rows or
            col < 0 or col >= cols or
            connected_to_border[row][col] or
            matrix[row][col] == 0):
            return

        connected_to_border[row][col] = True
        for dr, dc in directions:
            dfs(row + dr, col + dc)

    # Mark all cells connected to border
    for row in range(rows):
        dfs(row, 0)
        dfs(row, cols - 1)
    for col in range(cols):
        dfs(0, col)
        dfs(rows - 1, col)

    # Remove islands
    for row in range(rows):
        for col in range(cols):
            if matrix[row][col] == 1 and not connected_to_border[row][col]:
                matrix[row][col] = 0

    return matrix


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    matrix1 = [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1]
    ]
    expected1 = [
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1]
    ]
    result1 = remove_islands(matrix1)
    print(f"Test 1 (DFS):")
    for row in result1:
        print(f"  {row}")
    assert result1 == expected1

    # Test 2: No islands (all border-connected)
    matrix2 = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]
    expected2 = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]
    result2 = remove_islands(matrix2)
    print(f"\nTest 2 (No islands): {result2 == expected2}")
    assert result2 == expected2

    # Test 3: All islands
    matrix3 = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ]
    expected3 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    result3 = remove_islands(matrix3)
    print(f"Test 3 (All islands): {result3 == expected3}")
    assert result3 == expected3

    # Test 4: Empty matrix
    matrix4 = []
    result4 = remove_islands(matrix4)
    print(f"Test 4 (Empty): {result4 == []}")
    assert result4 == []

    # Test 5: Single row
    matrix5 = [[1, 0, 1, 0, 1]]
    expected5 = [[1, 0, 1, 0, 1]]
    result5 = remove_islands(matrix5)
    print(f"Test 5 (Single row): {result5 == expected5}")
    assert result5 == expected5

    # Test BFS version
    print("\n--- Testing BFS Version ---")
    matrix6 = [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1]
    ]
    result6 = remove_islands_bfs(matrix6)
    print(f"BFS Test: {result6 == expected1}")
    assert result6 == expected1

    print("\nAll tests passed!")
