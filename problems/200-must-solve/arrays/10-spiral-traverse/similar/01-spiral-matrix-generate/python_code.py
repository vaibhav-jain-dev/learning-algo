"""
Spiral Matrix II (Generate) - Python Solutions

Generate an n x n matrix filled with elements 1 to n^2 in spiral order.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Layer-by-Layer (Recommended)
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(1) extra (O(n^2) for result)
#
# WHY THIS IS BEST:
# - Same pattern as spiral traverse
# - Easy to understand
# - Handles all cases cleanly
# ============================================================================

def generate_spiral_matrix(n: int) -> List[List[int]]:
    """
    Generate n x n matrix with values 1 to n^2 in spiral order.

    Uses boundary tracking:
    - top, bottom: row boundaries
    - left, right: column boundaries
    Shrink boundaries after completing each direction.

    For n=3:
        Fill right: [1,2,3] top row
        Fill down:  [4,5] right column
        Fill left:  [6,7] bottom row
        Fill up:    [8] left column
        Fill center: [9]
    """
    matrix = [[0] * n for _ in range(n)]

    top, bottom = 0, n - 1
    left, right = 0, n - 1
    num = 1

    while top <= bottom and left <= right:
        # Fill top row (left to right)
        for col in range(left, right + 1):
            matrix[top][col] = num
            num += 1
        top += 1

        # Fill right column (top to bottom)
        for row in range(top, bottom + 1):
            matrix[row][right] = num
            num += 1
        right -= 1

        # Fill bottom row (right to left)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                matrix[bottom][col] = num
                num += 1
            bottom -= 1

        # Fill left column (bottom to top)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                matrix[row][left] = num
                num += 1
            left += 1

    return matrix


# ============================================================================
# APPROACH 2: Direction Vectors
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(1) extra
#
# WHEN TO USE:
# - More flexible for different spiral patterns
# - Easier to modify for variations
# ============================================================================

def generate_spiral_direction(n: int) -> List[List[int]]:
    """
    Generate spiral matrix using direction vectors.

    Directions: right, down, left, up (repeating)
    Change direction when hitting boundary or filled cell.
    """
    matrix = [[0] * n for _ in range(n)]

    # Direction vectors: (row_delta, col_delta)
    # Order: right, down, left, up
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    dir_idx = 0

    row, col = 0, 0

    for num in range(1, n * n + 1):
        matrix[row][col] = num

        # Calculate next position
        next_row = row + directions[dir_idx][0]
        next_col = col + directions[dir_idx][1]

        # Check if we need to change direction
        if (next_row < 0 or next_row >= n or
            next_col < 0 or next_col >= n or
            matrix[next_row][next_col] != 0):
            # Change direction (clockwise)
            dir_idx = (dir_idx + 1) % 4
            next_row = row + directions[dir_idx][0]
            next_col = col + directions[dir_idx][1]

        row, col = next_row, next_col

    return matrix


# ============================================================================
# APPROACH 3: Recursive Layer Filling
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n) recursion stack
#
# WHEN TO USE:
# - When recursive thinking is clearer
# - For educational purposes
# ============================================================================

def generate_spiral_recursive(n: int) -> List[List[int]]:
    """
    Generate spiral matrix recursively by filling layers.
    """
    matrix = [[0] * n for _ in range(n)]

    def fill_layer(top: int, bottom: int, left: int, right: int, start: int) -> int:
        """Fill one layer of the spiral, return next number to use."""
        if top > bottom or left > right:
            return start

        num = start

        # Top row
        for col in range(left, right + 1):
            matrix[top][col] = num
            num += 1

        # Right column
        for row in range(top + 1, bottom + 1):
            matrix[row][right] = num
            num += 1

        # Bottom row (if exists)
        if top < bottom:
            for col in range(right - 1, left - 1, -1):
                matrix[bottom][col] = num
                num += 1

        # Left column (if exists)
        if left < right:
            for row in range(bottom - 1, top, -1):
                matrix[row][left] = num
                num += 1

        # Recurse to inner layer
        return fill_layer(top + 1, bottom - 1, left + 1, right - 1, num)

    fill_layer(0, n - 1, 0, n - 1, 1)
    return matrix


# ============================================================================
# HELPER: Print matrix nicely
# ============================================================================

def print_matrix(matrix: List[List[int]]) -> None:
    """Print matrix in a formatted way."""
    if not matrix:
        print("[]")
        return

    max_width = max(len(str(val)) for row in matrix for val in row)
    for row in matrix:
        print("[" + ", ".join(str(val).rjust(max_width) for val in row) + "]")


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (n, description)
        (1, "1x1 matrix"),
        (2, "2x2 matrix"),
        (3, "3x3 matrix"),
        (4, "4x4 matrix"),
        (5, "5x5 matrix"),
    ]

    approaches = [
        ("Layer-by-Layer (Recommended)", generate_spiral_matrix),
        ("Direction Vectors", generate_spiral_direction),
        ("Recursive", generate_spiral_recursive),
    ]

    print("=" * 70)
    print("SPIRAL MATRIX II (GENERATE) - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for n, desc in test_cases:
            result = func(n)

            # Verify: should contain 1 to n^2
            flat = [val for row in result for val in row]
            expected_flat = list(range(1, n * n + 1))

            # Check spiral property by comparing with reference
            reference = generate_spiral_matrix(n)
            passed = (result == reference and sorted(flat) == expected_flat)

            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False

            print(f"  {status}: {desc}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    n = 3
    print(f"\nInput: n = {n}")
    result = generate_spiral_matrix(n)
    print("Output:")
    print_matrix(result)

    # Sample Input 2
    n = 4
    print(f"\nInput: n = {n}")
    result = generate_spiral_matrix(n)
    print("Output:")
    print_matrix(result)

    # Sample Input 3
    n = 1
    print(f"\nInput: n = {n}")
    result = generate_spiral_matrix(n)
    print("Output:")
    print_matrix(result)
