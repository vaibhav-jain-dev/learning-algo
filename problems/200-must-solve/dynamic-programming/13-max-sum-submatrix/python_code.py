"""
Maximum Sum Submatrix - Python Solution

Find the maximum sum of any size x size submatrix within a matrix.

Time Complexity: O(rows * cols)
Space Complexity: O(rows * cols)
"""

from typing import List, Tuple


def max_sum_submatrix(matrix: List[List[int]], size: int) -> int:
    """
    Find maximum sum of size x size submatrix using prefix sums.

    Args:
        matrix: 2D matrix of integers
        size: Size of the square submatrix

    Returns:
        Maximum sum of any size x size submatrix
    """
    if not matrix or not matrix[0] or size <= 0:
        return 0

    rows = len(matrix)
    cols = len(matrix[0])

    if size > rows or size > cols:
        return 0

    # Build prefix sum matrix
    # prefix[i][j] = sum of all elements in matrix[0:i][0:j]
    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]

    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            prefix[i][j] = (matrix[i - 1][j - 1] +
                           prefix[i - 1][j] +
                           prefix[i][j - 1] -
                           prefix[i - 1][j - 1])

    # Find maximum sum submatrix of given size
    max_sum = float('-inf')

    for r in range(size, rows + 1):
        for c in range(size, cols + 1):
            # Calculate sum of submatrix ending at (r-1, c-1)
            current_sum = (prefix[r][c] -
                          prefix[r - size][c] -
                          prefix[r][c - size] +
                          prefix[r - size][c - size])

            max_sum = max(max_sum, current_sum)

    return max_sum


def max_sum_submatrix_with_position(matrix: List[List[int]], size: int) -> Tuple[int, Tuple[int, int]]:
    """
    Return both maximum sum and the top-left position of the submatrix.

    Args:
        matrix: 2D matrix of integers
        size: Size of the square submatrix

    Returns:
        Tuple of (max_sum, (row, col)) where (row, col) is top-left corner
    """
    if not matrix or not matrix[0] or size <= 0:
        return (0, (-1, -1))

    rows = len(matrix)
    cols = len(matrix[0])

    if size > rows or size > cols:
        return (0, (-1, -1))

    # Build prefix sum matrix
    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]

    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            prefix[i][j] = (matrix[i - 1][j - 1] +
                           prefix[i - 1][j] +
                           prefix[i][j - 1] -
                           prefix[i - 1][j - 1])

    max_sum = float('-inf')
    best_pos = (-1, -1)

    for r in range(size, rows + 1):
        for c in range(size, cols + 1):
            current_sum = (prefix[r][c] -
                          prefix[r - size][c] -
                          prefix[r][c - size] +
                          prefix[r - size][c - size])

            if current_sum > max_sum:
                max_sum = current_sum
                best_pos = (r - size, c - size)

    return (max_sum, best_pos)


def max_sum_submatrix_brute_force(matrix: List[List[int]], size: int) -> int:
    """
    Brute force solution for verification (O(rows * cols * size^2)).

    Args:
        matrix: 2D matrix of integers
        size: Size of the square submatrix

    Returns:
        Maximum sum of any size x size submatrix
    """
    if not matrix or not matrix[0] or size <= 0:
        return 0

    rows = len(matrix)
    cols = len(matrix[0])

    if size > rows or size > cols:
        return 0

    max_sum = float('-inf')

    for r in range(rows - size + 1):
        for c in range(cols - size + 1):
            current_sum = 0
            for i in range(size):
                for j in range(size):
                    current_sum += matrix[r + i][c + j]
            max_sum = max(max_sum, current_sum)

    return max_sum


def max_sum_any_size_submatrix(matrix: List[List[int]]) -> Tuple[int, Tuple[int, int, int, int]]:
    """
    Find maximum sum submatrix of ANY size (Kadane's 2D).

    Args:
        matrix: 2D matrix of integers

    Returns:
        Tuple of (max_sum, (r1, c1, r2, c2)) defining the submatrix
    """
    if not matrix or not matrix[0]:
        return (0, (-1, -1, -1, -1))

    rows = len(matrix)
    cols = len(matrix[0])

    max_sum = float('-inf')
    best_coords = (-1, -1, -1, -1)

    # Fix left column
    for left in range(cols):
        # temp[i] = sum of elements in row i from column left to right
        temp = [0] * rows

        # Expand right column
        for right in range(left, cols):
            # Update temp array
            for i in range(rows):
                temp[i] += matrix[i][right]

            # Apply Kadane's algorithm on temp array
            current_sum = 0
            current_start = 0
            local_max = temp[0]
            local_start = 0
            local_end = 0

            for i in range(rows):
                current_sum += temp[i]

                if current_sum > local_max:
                    local_max = current_sum
                    local_start = current_start
                    local_end = i

                if current_sum < 0:
                    current_sum = 0
                    current_start = i + 1

            if local_max > max_sum:
                max_sum = local_max
                best_coords = (local_start, left, local_end, right)

    return (max_sum, best_coords)


def get_submatrix(matrix: List[List[int]], r1: int, c1: int, r2: int, c2: int) -> List[List[int]]:
    """
    Extract a submatrix from the given coordinates.

    Args:
        matrix: Original matrix
        r1, c1: Top-left corner
        r2, c2: Bottom-right corner

    Returns:
        The extracted submatrix
    """
    return [row[c1:c2 + 1] for row in matrix[r1:r2 + 1]]


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    matrix1 = [
        [5, 3, -1, 5],
        [-7, 3, 7, 4],
        [12, 8, 0, 0],
        [1, -8, -8, 2]
    ]
    size1 = 2
    result1 = max_sum_submatrix(matrix1, size1)
    print(f"Test 1: size={size1}")
    print(f"  Matrix: {matrix1}")
    print(f"  Max sum: {result1}")
    # Expected: 18

    # Test 2: Size 1
    matrix2 = [
        [1, 2],
        [3, 4]
    ]
    size2 = 1
    result2 = max_sum_submatrix(matrix2, size2)
    print(f"\nTest 2: size={size2}")
    print(f"  Matrix: {matrix2}")
    print(f"  Max sum: {result2}")
    # Expected: 4

    # Test 3: 3x3 matrix
    matrix3 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    size3 = 2
    result3 = max_sum_submatrix(matrix3, size3)
    print(f"\nTest 3: size={size3}")
    print(f"  Matrix: {matrix3}")
    print(f"  Max sum: {result3}")
    # Expected: 28 (5+6+8+9)

    # Test 4: All negative
    matrix4 = [
        [-1, -2],
        [-3, -4]
    ]
    size4 = 2
    result4 = max_sum_submatrix(matrix4, size4)
    print(f"\nTest 4: size={size4}")
    print(f"  Matrix: {matrix4}")
    print(f"  Max sum: {result4}")
    # Expected: -10

    # Test 5: With position
    matrix5 = [
        [5, 3, -1, 5],
        [-7, 3, 7, 4],
        [12, 8, 0, 0],
        [1, -8, -8, 2]
    ]
    size5 = 2
    max_sum, pos = max_sum_submatrix_with_position(matrix5, size5)
    print(f"\nTest 5: size={size5}")
    print(f"  Max sum: {max_sum}")
    print(f"  Position (row, col): {pos}")
    submatrix = get_submatrix(matrix5, pos[0], pos[1], pos[0] + size5 - 1, pos[1] + size5 - 1)
    print(f"  Submatrix: {submatrix}")

    # Test 6: Compare with brute force
    matrix6 = [
        [5, 3, -1, 5],
        [-7, 3, 7, 4],
        [12, 8, 0, 0],
        [1, -8, -8, 2]
    ]
    size6 = 2
    print(f"\nTest 6 - Method comparison:")
    print(f"  Prefix sum: {max_sum_submatrix(matrix6, size6)}")
    print(f"  Brute force: {max_sum_submatrix_brute_force(matrix6, size6)}")

    # Test 7: Any size submatrix (Kadane's 2D)
    matrix7 = [
        [1, 2, -1, -4, -20],
        [-8, -3, 4, 2, 1],
        [3, 8, 10, 1, 3],
        [-4, -1, 1, 7, -6]
    ]
    max_sum7, coords7 = max_sum_any_size_submatrix(matrix7)
    print(f"\nTest 7 - Any size submatrix:")
    print(f"  Max sum: {max_sum7}")
    print(f"  Coordinates (r1, c1, r2, c2): {coords7}")
    if coords7[0] >= 0:
        subm = get_submatrix(matrix7, coords7[0], coords7[1], coords7[2], coords7[3])
        print(f"  Submatrix: {subm}")

    # Test 8: Single element matrix
    matrix8 = [[42]]
    size8 = 1
    result8 = max_sum_submatrix(matrix8, size8)
    print(f"\nTest 8: size={size8}")
    print(f"  Matrix: {matrix8}")
    print(f"  Max sum: {result8}")
    # Expected: 42

    print("\nAll tests completed!")
