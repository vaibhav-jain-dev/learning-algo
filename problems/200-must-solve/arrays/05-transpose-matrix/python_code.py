"""
Transpose Matrix - Python Solutions

Return the transpose of a 2D matrix.
Element at (i, j) moves to (j, i).

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Direct Construction ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(m × n) - visit each element once
# Space Complexity: O(m × n) - for the output matrix
#
# WHY THIS IS BEST:
# - Simple and intuitive
# - Single pass through all elements
# - Works for any matrix dimensions
# ============================================================================

def transpose_matrix(matrix: List[List[int]]) -> List[List[int]]:
    """
    Return the transpose using direct index swapping.

    Key Insight: Element at (i, j) moves to (j, i)

    How it works:
    1. Original matrix: m rows × n cols
    2. Create result: n rows × m cols
    3. For each position, swap indices: result[j][i] = original[i][j]

    Visual:
        Original (3×2):      Transpose (2×3):
        [[1, 2],             [[1, 3, 5],
         [3, 4],      →       [2, 4, 6]]
         [5, 6]]

        matrix[0][1]=2 → result[1][0]=2
        matrix[2][0]=5 → result[0][2]=5
    """
    if not matrix or not matrix[0]:
        return []

    rows = len(matrix)
    cols = len(matrix[0])

    # Create new matrix with swapped dimensions (cols × rows)
    transposed = [[0] * rows for _ in range(cols)]

    for i in range(rows):
        for j in range(cols):
            transposed[j][i] = matrix[i][j]

    return transposed


# ============================================================================
# APPROACH 2: Column Extraction
# ============================================================================
# Time Complexity:  O(m × n)
# Space Complexity: O(m × n)
#
# INTUITION:
# - Each column of original becomes a row of result
# - Build result row by row
# ============================================================================

def transpose_matrix_column(matrix: List[List[int]]) -> List[List[int]]:
    """
    Build transpose by extracting columns as rows.

    How it works:
    - Column 0 of original → Row 0 of result
    - Column 1 of original → Row 1 of result
    - ... and so on

    Visual:
        Original:              Result:
        [[1, 2],              [[1, 3, 5],  ← column 0
         [3, 4],     →         [2, 4, 6]]  ← column 1
         [5, 6]]
    """
    if not matrix or not matrix[0]:
        return []

    rows = len(matrix)
    cols = len(matrix[0])

    # Build each row of result from column of original
    return [[matrix[i][j] for i in range(rows)] for j in range(cols)]


# ============================================================================
# APPROACH 3: Pythonic Using zip ⭐ MOST ELEGANT IN PYTHON
# ============================================================================
# Time Complexity:  O(m × n)
# Space Complexity: O(m × n)
#
# HOW IT WORKS:
# - zip(*matrix) unpacks rows and groups by position
# - This naturally transposes the matrix!
# ============================================================================

def transpose_matrix_zip(matrix: List[List[int]]) -> List[List[int]]:
    """
    Pythonic one-liner using zip.

    How zip(*matrix) works:
    1. *matrix unpacks: zip([1,2], [3,4], [5,6])
    2. zip groups by position: (1,3,5), (2,4,6)
    3. Convert tuples to lists

    Visual:
        matrix = [[1,2], [3,4], [5,6]]

        *matrix unpacks to: [1,2], [3,4], [5,6]

        zip groups:
          Position 0: (1, 3, 5)  → [1, 3, 5]
          Position 1: (2, 4, 6)  → [2, 4, 6]

        Result: [[1,3,5], [2,4,6]]

    This is the most Pythonic solution!
    """
    return [list(row) for row in zip(*matrix)]


# ============================================================================
# APPROACH 4: In-Place for Square Matrix
# ============================================================================
# Time Complexity:  O(n²)
# Space Complexity: O(1) - truly in-place!
#
# IMPORTANT: Only works for SQUARE matrices (m = n)
# ============================================================================

def transpose_matrix_inplace(matrix: List[List[int]]) -> List[List[int]]:
    """
    In-place transpose for SQUARE matrices only.

    Key Insight: Only swap upper triangle with lower triangle
    to avoid double-swapping.

    Visual for 3×3:
        ┌───┬───┬───┐
        │ X │ S │ S │   X = diagonal (don't touch)
        ├───┼───┼───┤   S = swap with corresponding
        │ s │ X │ S │   s = already swapped (skip)
        ├───┼───┼───┤
        │ s │ s │ X │
        └───┴───┴───┘

        Only swap upper triangle: (0,1), (0,2), (1,2)

    WARNING: Returns the same matrix modified, not a copy!
    """
    n = len(matrix)

    # Verify it's a square matrix
    if n == 0 or len(matrix[0]) != n:
        raise ValueError("In-place transpose only works for square matrices")

    # Swap upper triangle with lower triangle
    for i in range(n):
        for j in range(i + 1, n):  # j starts at i+1 to avoid diagonal and lower
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    return matrix


# ============================================================================
# HELPER FUNCTION
# ============================================================================

def print_matrix(matrix: List[List[int]], name: str = "Matrix") -> None:
    """Helper function to print matrix nicely."""
    print(f"{name}:")
    for row in matrix:
        print(f"  {row}")


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (matrix, description)
        ([[1, 2], [3, 4], [5, 6]], "3×2 matrix"),
        ([[1, 2, 3], [4, 5, 6], [7, 8, 9]], "3×3 square matrix"),
        ([[1, 2, 3]], "1×3 row vector"),
        ([[1], [2], [3]], "3×1 column vector"),
        ([[5]], "1×1 single element"),
        ([[1, 2, 3, 4], [5, 6, 7, 8]], "2×4 matrix"),
    ]

    approaches = [
        ("Direct Construction (Recommended)", transpose_matrix),
        ("Column Extraction", transpose_matrix_column),
        ("Pythonic zip", transpose_matrix_zip),
    ]

    print("=" * 70)
    print("TRANSPOSE MATRIX - TEST RESULTS")
    print("=" * 70)

    for matrix, desc in test_cases:
        print(f"\n{desc}:")
        print_matrix(matrix, "  Original")

        # All approaches should give same result
        results = []
        for name, func in approaches:
            result = func([row[:] for row in matrix])  # Copy to avoid mutation
            results.append((name, result))

        # Show first result
        print_matrix(results[0][1], "  Transposed")

        # Verify all approaches match
        all_match = all(r[1] == results[0][1] for r in results)
        print(f"  All approaches match: {'✓' if all_match else '✗'}")

    # Test in-place for square matrix
    print("\n" + "-" * 50)
    print("In-Place Transpose (Square Matrix Only):")
    square = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print_matrix(square, "  Original")
    transpose_matrix_inplace(square)
    print_matrix(square, "  After in-place transpose")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    ┌──────────────────────────┬─────────┬──────────┬──────────────────┐
    │        Approach          │  Time   │  Space   │  Recommendation  │
    ├──────────────────────────┼─────────┼──────────┼──────────────────┤
    │ 1. Direct Construction   │ O(m×n)  │  O(m×n)  │  ⭐ BEST CHOICE  │
    │ 2. Column Extraction     │ O(m×n)  │  O(m×n)  │  ✓ Alternative   │
    │ 3. Pythonic (zip)        │ O(m×n)  │  O(m×n)  │  ✓ Most elegant  │
    │ 4. In-Place (square)     │ O(n²)   │   O(1)   │  ⚠️ Square only  │
    └──────────────────────────┴─────────┴──────────┴──────────────────┘
    """)


if __name__ == "__main__":
    run_tests()
