"""
Spiral Matrix Transpose - Python Solutions

Read matrix in spiral order and write back in spiral order of transposed dimensions.
"""

from typing import List


# ============================================================================
# APPROACH 1: Spiral Read + Write ⭐ RECOMMENDED
# ============================================================================

def spiral_transpose(matrix: List[List[int]]) -> List[List[int]]:
    """Read in spiral, write in spiral to transposed shape."""
    if not matrix:
        return []

    m, n = len(matrix), len(matrix[0])

    # Read spiral order
    spiral = spiral_order(matrix)

    # Create transposed result (n x m)
    result = [[0] * m for _ in range(n)]

    # Write in spiral order
    write_spiral_order(result, spiral)

    return result


def spiral_order(matrix: List[List[int]]) -> List[int]:
    """Read matrix in spiral order."""
    if not matrix:
        return []

    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1

        # Down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1

        # Left
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1

        # Up
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result


def write_spiral_order(matrix: List[List[int]], values: List[int]) -> None:
    """Write values in spiral order to matrix."""
    if not matrix:
        return

    idx = 0
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right and idx < len(values):
        for col in range(left, right + 1):
            if idx < len(values):
                matrix[top][col] = values[idx]
                idx += 1
        top += 1

        for row in range(top, bottom + 1):
            if idx < len(values):
                matrix[row][right] = values[idx]
                idx += 1
        right -= 1

        if top <= bottom:
            for col in range(right, left - 1, -1):
                if idx < len(values):
                    matrix[bottom][col] = values[idx]
                    idx += 1
            bottom -= 1

        if left <= right:
            for row in range(bottom, top - 1, -1):
                if idx < len(values):
                    matrix[row][left] = values[idx]
                    idx += 1
            left += 1


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("SPIRAL MATRIX TRANSPOSE - TEST RESULTS")
    print("=" * 70)

    matrix = [[1, 2, 3], [4, 5, 6]]

    print("\nInput (2x3):")
    for row in matrix:
        print(f"  {row}")

    result = spiral_transpose(matrix)

    print("\nOutput (3x2 spiral transpose):")
    for row in result:
        print(f"  {row}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    print("\nInput (3x4):")
    for row in matrix:
        print(f"  {row}")
    print(f"Spiral order: {spiral_order(matrix)}")
    print("\nSpiral transpose (4x3):")
    for row in spiral_transpose(matrix):
        print(f"  {row}")
