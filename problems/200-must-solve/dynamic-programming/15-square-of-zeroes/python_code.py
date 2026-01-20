"""
Square of Zeroes - Python Solution

Determine if a matrix contains a square whose borders are all 0s.

Time Complexity: O(n^3)
Space Complexity: O(n^2)
"""

from typing import List, Tuple, Optional


def square_of_zeroes(matrix: List[List[int]]) -> bool:
    """
    Check if matrix contains a square with borders of all 0s.

    Args:
        matrix: Square matrix of 0s and 1s

    Returns:
        True if such a square exists, False otherwise
    """
    if not matrix or not matrix[0]:
        return False

    n = len(matrix)

    # Precompute consecutive 0s below and to the right
    # below[i][j] = count of consecutive 0s from (i,j) going down
    # right[i][j] = count of consecutive 0s from (i,j) going right
    below = [[0] * n for _ in range(n)]
    right = [[0] * n for _ in range(n)]

    # Fill from bottom-right to top-left
    for i in range(n - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if matrix[i][j] == 0:
                below[i][j] = 1 + (below[i + 1][j] if i + 1 < n else 0)
                right[i][j] = 1 + (right[i][j + 1] if j + 1 < n else 0)

    # Check all possible squares
    for r in range(n):
        for c in range(n):
            if matrix[r][c] != 0:
                continue

            # Try all possible square sizes
            max_size = min(n - r, n - c)

            for size in range(1, max_size + 1):
                # Check if square of this size has borders of all 0s
                if has_square_of_zeroes(below, right, r, c, size):
                    return True

    return False


def has_square_of_zeroes(below: List[List[int]], right: List[List[int]],
                         r: int, c: int, size: int) -> bool:
    """
    Check if square starting at (r,c) of given size has borders of all 0s.

    Args:
        below: Precomputed consecutive 0s going down
        right: Precomputed consecutive 0s going right
        r, c: Top-left corner
        size: Size of the square

    Returns:
        True if borders are all 0s
    """
    # Check top row: need 'size' consecutive 0s going right from (r, c)
    top_row = right[r][c] >= size

    # Check left column: need 'size' consecutive 0s going down from (r, c)
    left_col = below[r][c] >= size

    # Check bottom row: need 'size' consecutive 0s going right from (r+size-1, c)
    bottom_row = right[r + size - 1][c] >= size

    # Check right column: need 'size' consecutive 0s going down from (r, c+size-1)
    right_col = below[r][c + size - 1] >= size

    return top_row and left_col and bottom_row and right_col


def square_of_zeroes_brute_force(matrix: List[List[int]]) -> bool:
    """
    Brute force solution for verification.

    Args:
        matrix: Square matrix of 0s and 1s

    Returns:
        True if such a square exists, False otherwise
    """
    if not matrix or not matrix[0]:
        return False

    n = len(matrix)

    for r in range(n):
        for c in range(n):
            if matrix[r][c] != 0:
                continue

            max_size = min(n - r, n - c)

            for size in range(1, max_size + 1):
                if is_square_of_zeroes(matrix, r, c, size):
                    return True

    return False


def is_square_of_zeroes(matrix: List[List[int]], r: int, c: int, size: int) -> bool:
    """Check borders by iterating through each cell."""
    # Top row
    for j in range(c, c + size):
        if matrix[r][j] != 0:
            return False

    # Bottom row
    for j in range(c, c + size):
        if matrix[r + size - 1][j] != 0:
            return False

    # Left column
    for i in range(r, r + size):
        if matrix[i][c] != 0:
            return False

    # Right column
    for i in range(r, r + size):
        if matrix[i][c + size - 1] != 0:
            return False

    return True


def largest_square_of_zeroes(matrix: List[List[int]]) -> int:
    """
    Return the size of the largest square with borders of all 0s.

    Args:
        matrix: Square matrix of 0s and 1s

    Returns:
        Size of the largest valid square (0 if none exists)
    """
    if not matrix or not matrix[0]:
        return 0

    n = len(matrix)

    # Precompute consecutive 0s
    below = [[0] * n for _ in range(n)]
    right = [[0] * n for _ in range(n)]

    for i in range(n - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if matrix[i][j] == 0:
                below[i][j] = 1 + (below[i + 1][j] if i + 1 < n else 0)
                right[i][j] = 1 + (right[i][j + 1] if j + 1 < n else 0)

    max_size = 0

    for r in range(n):
        for c in range(n):
            if matrix[r][c] != 0:
                continue

            possible_size = min(n - r, n - c)

            for size in range(possible_size, max_size, -1):
                if has_square_of_zeroes(below, right, r, c, size):
                    max_size = size
                    break

    return max_size


def find_square_of_zeroes(matrix: List[List[int]]) -> Optional[Tuple[int, int, int]]:
    """
    Find the position and size of a square with borders of all 0s.

    Args:
        matrix: Square matrix of 0s and 1s

    Returns:
        Tuple (row, col, size) of a valid square, or None if none exists
    """
    if not matrix or not matrix[0]:
        return None

    n = len(matrix)

    below = [[0] * n for _ in range(n)]
    right = [[0] * n for _ in range(n)]

    for i in range(n - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if matrix[i][j] == 0:
                below[i][j] = 1 + (below[i + 1][j] if i + 1 < n else 0)
                right[i][j] = 1 + (right[i][j + 1] if j + 1 < n else 0)

    for r in range(n):
        for c in range(n):
            if matrix[r][c] != 0:
                continue

            max_size = min(n - r, n - c)

            for size in range(1, max_size + 1):
                if has_square_of_zeroes(below, right, r, c, size):
                    return (r, c, size)

    return None


def find_largest_square_of_zeroes(matrix: List[List[int]]) -> Optional[Tuple[int, int, int]]:
    """
    Find the position and size of the largest square with borders of all 0s.

    Args:
        matrix: Square matrix of 0s and 1s

    Returns:
        Tuple (row, col, size) of the largest valid square, or None
    """
    if not matrix or not matrix[0]:
        return None

    n = len(matrix)

    below = [[0] * n for _ in range(n)]
    right = [[0] * n for _ in range(n)]

    for i in range(n - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if matrix[i][j] == 0:
                below[i][j] = 1 + (below[i + 1][j] if i + 1 < n else 0)
                right[i][j] = 1 + (right[i][j + 1] if j + 1 < n else 0)

    max_size = 0
    best_pos = None

    for r in range(n):
        for c in range(n):
            if matrix[r][c] != 0:
                continue

            possible_size = min(n - r, n - c)

            for size in range(possible_size, max_size, -1):
                if has_square_of_zeroes(below, right, r, c, size):
                    max_size = size
                    best_pos = (r, c, size)
                    break

    return best_pos


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case with large square
    matrix1 = [
        [1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 1]
    ]
    result1 = square_of_zeroes(matrix1)
    print("Test 1:")
    for row in matrix1:
        print(f"  {row}")
    print(f"  Has square of zeroes: {result1}")
    # Expected: True

    # Test 2: Single 0 as square
    matrix2 = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]
    result2 = square_of_zeroes(matrix2)
    print("\nTest 2:")
    for row in matrix2:
        print(f"  {row}")
    print(f"  Has square of zeroes: {result2}")
    # Expected: True (single 0)

    # Test 3: No zeroes
    matrix3 = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
    result3 = square_of_zeroes(matrix3)
    print("\nTest 3:")
    for row in matrix3:
        print(f"  {row}")
    print(f"  Has square of zeroes: {result3}")
    # Expected: False

    # Test 4: All zeroes
    matrix4 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    result4 = square_of_zeroes(matrix4)
    print("\nTest 4:")
    for row in matrix4:
        print(f"  {row}")
    print(f"  Has square of zeroes: {result4}")
    # Expected: True

    # Test 5: Compare with brute force
    matrix5 = [
        [1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 1]
    ]
    print("\nTest 5 - Method comparison:")
    print(f"  Optimized: {square_of_zeroes(matrix5)}")
    print(f"  Brute force: {square_of_zeroes_brute_force(matrix5)}")

    # Test 6: Find largest square
    matrix6 = [
        [1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 1]
    ]
    largest = largest_square_of_zeroes(matrix6)
    pos = find_largest_square_of_zeroes(matrix6)
    print(f"\nTest 6 - Largest square:")
    print(f"  Largest size: {largest}")
    print(f"  Position (row, col, size): {pos}")

    # Test 7: Find any square
    matrix7 = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]
    square = find_square_of_zeroes(matrix7)
    print(f"\nTest 7 - Find square:")
    print(f"  Found at: {square}")

    # Test 8: 2x2 square
    matrix8 = [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1]
    ]
    result8 = square_of_zeroes(matrix8)
    print("\nTest 8:")
    for row in matrix8:
        print(f"  {row}")
    print(f"  Has square of zeroes: {result8}")
    # Expected: True (2x2 in top-left)

    print("\nAll tests completed!")
