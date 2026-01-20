"""
Block Matrix Transpose - Python Solutions

Transpose a matrix where elements are blocks (sub-matrices) instead of scalars.
"""

from typing import List


# ============================================================================
# APPROACH 1: Block-wise Transpose ⭐ RECOMMENDED
# ============================================================================

def block_transpose(matrix: List[List[int]], block_size: int) -> List[List[int]]:
    """Transpose matrix treating block_size x block_size as atomic units."""
    if not matrix:
        return []

    rows, cols = len(matrix), len(matrix[0])

    # Result: swap dimensions
    result = [[0] * rows for _ in range(cols)]

    # Process each block
    for bi in range(0, rows, block_size):
        for bj in range(0, cols, block_size):
            # Transpose this block to position (bj, bi)
            for i in range(block_size):
                for j in range(block_size):
                    if bi + i < rows and bj + j < cols:
                        result[bj + j][bi + i] = matrix[bi + i][bj + j]

    return result


# ============================================================================
# APPROACH 2: Using List Comprehension
# ============================================================================

def block_transpose_pythonic(matrix: List[List[int]], block_size: int) -> List[List[int]]:
    """More Pythonic version using zip."""
    if not matrix:
        return []

    # For block_size=1, this is just regular transpose
    if block_size == 1:
        return [list(row) for row in zip(*matrix)]

    return block_transpose(matrix, block_size)


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("BLOCK MATRIX TRANSPOSE - TEST RESULTS")
    print("=" * 70)

    # 4x4 matrix with 2x2 blocks
    matrix = [
        [1, 2, 5, 6],
        [3, 4, 7, 8],
        [9, 10, 13, 14],
        [11, 12, 15, 16],
    ]

    print("\nInput (4x4 with 2x2 blocks):")
    for row in matrix:
        print(f"  {row}")

    result = block_transpose(matrix, 2)

    print("\nBlock transpose result:")
    for row in result:
        print(f"  {row}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print("\nInput (3x3):")
    for row in matrix:
        print(f"  {row}")
    print("\nBlock transpose (block=1):")
    for row in block_transpose(matrix, 1):
        print(f"  {row}")
