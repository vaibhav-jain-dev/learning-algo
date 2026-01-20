"""
Minimum Passes of Matrix - Python Solution

Find minimum passes to convert all negatives to positives using adjacent positives.

Time Complexity: O(n * m) where n is rows and m is columns
Space Complexity: O(n * m) for the queue
"""

from typing import List
from collections import deque


def minimum_passes_of_matrix(matrix: List[List[int]]) -> int:
    """
    Find minimum passes to convert all negative integers to positive.

    Uses multi-source BFS starting from all positive integers.

    Args:
        matrix: 2D array of integers

    Returns:
        Minimum number of passes, or -1 if impossible
    """
    if not matrix or not matrix[0]:
        return 0

    rows, cols = len(matrix), len(matrix[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # Initialize queue with all positive positions and count negatives
    queue = deque()
    negative_count = 0

    for row in range(rows):
        for col in range(cols):
            if matrix[row][col] > 0:
                queue.append((row, col))
            elif matrix[row][col] < 0:
                negative_count += 1

    # If no negatives, no passes needed
    if negative_count == 0:
        return 0

    passes = 0

    # BFS level by level
    while queue and negative_count > 0:
        # Process all cells at current level
        level_size = len(queue)
        converted_any = False

        for _ in range(level_size):
            row, col = queue.popleft()

            # Check all adjacent cells
            for dr, dc in directions:
                new_row, new_col = row + dr, col + dc

                if (0 <= new_row < rows and
                    0 <= new_col < cols and
                    matrix[new_row][new_col] < 0):
                    # Convert negative to positive
                    matrix[new_row][new_col] = abs(matrix[new_row][new_col])
                    negative_count -= 1
                    queue.append((new_row, new_col))
                    converted_any = True

        if converted_any:
            passes += 1

    # If negatives remain, conversion is impossible
    return passes if negative_count == 0 else -1


def minimum_passes_alternative(matrix: List[List[int]]) -> int:
    """
    Alternative implementation using two queues for clearer level separation.

    Args:
        matrix: 2D array of integers

    Returns:
        Minimum number of passes, or -1 if impossible
    """
    if not matrix or not matrix[0]:
        return 0

    rows, cols = len(matrix), len(matrix[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    current_queue = deque()
    negative_count = 0

    # Initialize
    for row in range(rows):
        for col in range(cols):
            if matrix[row][col] > 0:
                current_queue.append((row, col))
            elif matrix[row][col] < 0:
                negative_count += 1

    if negative_count == 0:
        return 0

    passes = 0

    while current_queue:
        next_queue = deque()

        while current_queue:
            row, col = current_queue.popleft()

            for dr, dc in directions:
                new_row, new_col = row + dr, col + dc

                if (0 <= new_row < rows and
                    0 <= new_col < cols and
                    matrix[new_row][new_col] < 0):
                    matrix[new_row][new_col] *= -1
                    negative_count -= 1
                    next_queue.append((new_row, new_col))

        if next_queue:
            passes += 1
            current_queue = next_queue

    return passes if negative_count == 0 else -1


def minimum_passes_with_copy(matrix: List[List[int]]) -> int:
    """
    Version that doesn't modify the input matrix.

    Args:
        matrix: 2D array of integers

    Returns:
        Minimum number of passes, or -1 if impossible
    """
    if not matrix or not matrix[0]:
        return 0

    rows, cols = len(matrix), len(matrix[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # Create a copy of the matrix
    matrix_copy = [row[:] for row in matrix]

    queue = deque()
    negative_positions = set()

    for row in range(rows):
        for col in range(cols):
            if matrix_copy[row][col] > 0:
                queue.append((row, col))
            elif matrix_copy[row][col] < 0:
                negative_positions.add((row, col))

    if not negative_positions:
        return 0

    passes = 0

    while queue and negative_positions:
        level_size = len(queue)
        converted = []

        for _ in range(level_size):
            row, col = queue.popleft()

            for dr, dc in directions:
                new_row, new_col = row + dr, col + dc

                if (new_row, new_col) in negative_positions:
                    negative_positions.remove((new_row, new_col))
                    matrix_copy[new_row][new_col] = abs(matrix_copy[new_row][new_col])
                    converted.append((new_row, new_col))

        if converted:
            passes += 1
            for pos in converted:
                queue.append(pos)

    return passes if not negative_positions else -1


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    matrix1 = [
        [0, -1, -3, 2, 0],
        [1, -2, -5, -1, -3],
        [3, 0, 0, -4, -1]
    ]
    result1 = minimum_passes_of_matrix([row[:] for row in matrix1])
    print(f"Test 1: {result1}")  # Expected: 3
    assert result1 == 3

    # Test 2: Impossible case
    matrix2 = [
        [1, 0, 0, -2, -3],
        [-4, -5, -6, -2, -1],
        [0, 0, 0, 0, -1],
        [1, 2, 3, 0, -2]
    ]
    result2 = minimum_passes_of_matrix([row[:] for row in matrix2])
    print(f"Test 2 (Impossible): {result2}")  # Expected: -1
    assert result2 == -1

    # Test 3: No negatives
    matrix3 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    result3 = minimum_passes_of_matrix([row[:] for row in matrix3])
    print(f"Test 3 (No negatives): {result3}")  # Expected: 0
    assert result3 == 0

    # Test 4: All negatives except one corner
    matrix4 = [
        [1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]
    result4 = minimum_passes_of_matrix([row[:] for row in matrix4])
    print(f"Test 4 (Corner spread): {result4}")  # Expected: 4
    assert result4 == 4

    # Test 5: Single cell positive
    matrix5 = [[5]]
    result5 = minimum_passes_of_matrix([row[:] for row in matrix5])
    print(f"Test 5 (Single positive): {result5}")  # Expected: 0
    assert result5 == 0

    # Test 6: Single cell negative
    matrix6 = [[-5]]
    result6 = minimum_passes_of_matrix([row[:] for row in matrix6])
    print(f"Test 6 (Single negative): {result6}")  # Expected: -1
    assert result6 == -1

    # Test 7: Zeros blocking
    matrix7 = [
        [1, 0, -1],
        [0, 0, 0],
        [-1, 0, 1]
    ]
    result7 = minimum_passes_of_matrix([row[:] for row in matrix7])
    print(f"Test 7 (Zeros blocking): {result7}")  # Expected: -1
    assert result7 == -1

    # Test alternative implementation
    print("\n--- Testing Alternative Implementation ---")
    matrix_test = [
        [0, -1, -3, 2, 0],
        [1, -2, -5, -1, -3],
        [3, 0, 0, -4, -1]
    ]
    result_alt = minimum_passes_alternative([row[:] for row in matrix_test])
    print(f"Alternative Test: {result_alt}")  # Expected: 3
    assert result_alt == 3

    print("\nAll tests passed!")
