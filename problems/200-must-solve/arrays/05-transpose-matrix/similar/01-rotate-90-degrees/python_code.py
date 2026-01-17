"""
Rotate Matrix 90 Degrees Clockwise - Python Solutions

Rotate an n x n matrix 90 degrees clockwise in-place.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Transpose + Reverse (RECOMMENDED)
# ============================================================================
# Time Complexity:  O(n^2) - visit each element twice
# Space Complexity: O(1) - in-place modification
#
# WHY THIS IS BEST:
# - Simple and intuitive two-step process
# - Easy to remember: "Transpose then Reverse"
# - Each step is a well-understood operation
# ============================================================================

def rotate_90_clockwise(matrix: List[List[int]]) -> None:
    """
    Rotate matrix 90 degrees clockwise using transpose + reverse.

    Key Insight: 90 CW rotation = Transpose + Reverse each row

    Mathematical proof:
    - Transpose: (i, j) -> (j, i)
    - Reverse row j: (j, i) -> (j, n-1-i)
    - Combined: (i, j) -> (j, n-1-i) = 90 degrees clockwise!

    Visual:
        Original:        Transpose:       Reverse rows:
        [1, 2, 3]        [1, 4, 7]        [7, 4, 1]
        [4, 5, 6]   ->   [2, 5, 8]   ->   [8, 5, 2]
        [7, 8, 9]        [3, 6, 9]        [9, 6, 3]
    """
    n = len(matrix)

    # Step 1: Transpose (swap across main diagonal)
    # Only iterate upper triangle to avoid double-swapping
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Step 2: Reverse each row
    for row in matrix:
        row.reverse()  # In-place reversal


# ============================================================================
# APPROACH 2: Four-Way Swap (Layer by Layer)
# ============================================================================
# Time Complexity:  O(n^2) - each element visited once
# Space Complexity: O(1) - only one temp variable
#
# INTUITION:
# - Process matrix layer by layer (like an onion)
# - For each position, rotate 4 elements at once
# ============================================================================

def rotate_90_clockwise_layers(matrix: List[List[int]]) -> None:
    """
    Rotate using layer-by-layer four-way swap.

    Process:
    1. Start from outermost layer, work inward
    2. For each layer, rotate 4 elements at a time in a cycle
    3. Move: top->right, right->bottom, bottom->left, left->top

    Visual for 4x4 matrix:
        Layer 0 (outer):     Layer 1 (inner):
        +---+---+---+---+    +---+---+---+---+
        | * | * | * | * |    |   |   |   |   |
        +---+---+---+---+    +---+---+---+---+
        | * |   |   | * |    |   | * | * |   |
        +---+---+---+---+    +---+---+---+---+
        | * |   |   | * |    |   | * | * |   |
        +---+---+---+---+    +---+---+---+---+
        | * | * | * | * |    |   |   |   |   |
        +---+---+---+---+    +---+---+---+---+

    Four-way swap for position i in layer:
        top_left     -> top_right
        top_right    -> bottom_right
        bottom_right -> bottom_left
        bottom_left  -> top_left
    """
    n = len(matrix)

    # Process each layer from outside to inside
    for layer in range(n // 2):
        first = layer
        last = n - 1 - layer

        for i in range(first, last):
            offset = i - first

            # Save top element
            top = matrix[first][i]

            # Move left to top
            matrix[first][i] = matrix[last - offset][first]

            # Move bottom to left
            matrix[last - offset][first] = matrix[last][last - offset]

            # Move right to bottom
            matrix[last][last - offset] = matrix[i][last]

            # Move top to right
            matrix[i][last] = top


# ============================================================================
# APPROACH 3: Pythonic One-Liner (Not In-Place)
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n^2) - creates new matrix
#
# NOTE: This is NOT in-place, but useful for understanding
# ============================================================================

def rotate_90_clockwise_pythonic(matrix: List[List[int]]) -> List[List[int]]:
    """
    Rotate using Python's zip (creates new matrix).

    How it works:
    1. zip(*matrix) transposes the matrix
    2. [::-1] on each row reverses it

    Note: This creates a new matrix, not in-place!
    """
    # Transpose with zip, then reverse each row
    return [list(row)[::-1] for row in zip(*matrix)]


# ============================================================================
# APPROACH 4: Rotate Counter-Clockwise (90 CCW)
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(1)
#
# BONUS: Reverse first, then transpose = 90 degrees counter-clockwise
# ============================================================================

def rotate_90_counter_clockwise(matrix: List[List[int]]) -> None:
    """
    Rotate 90 degrees counter-clockwise (bonus approach).

    Key Insight: 90 CCW = Reverse each row + Transpose

    Alternatively: 90 CCW = Transpose + Reverse each column
    """
    n = len(matrix)

    # Step 1: Reverse each row
    for row in matrix:
        row.reverse()

    # Step 2: Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def print_matrix(matrix: List[List[int]], name: str = "Matrix") -> None:
    """Helper to print matrix in a readable format."""
    print(f"{name}:")
    for row in matrix:
        print(f"  {row}")


def copy_matrix(matrix: List[List[int]]) -> List[List[int]]:
    """Create a deep copy of a matrix."""
    return [row[:] for row in matrix]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (matrix, description)
        ([[1, 2, 3], [4, 5, 6], [7, 8, 9]], "3x3 matrix"),
        ([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], "4x4 matrix"),
        ([[1, 2], [3, 4]], "2x2 matrix"),
        ([[5]], "1x1 matrix"),
        ([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15],
          [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]], "5x5 matrix"),
    ]

    expected_results = [
        [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
        [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]],
        [[3, 1], [4, 2]],
        [[5]],
        [[21, 16, 11, 6, 1], [22, 17, 12, 7, 2], [23, 18, 13, 8, 3],
         [24, 19, 14, 9, 4], [25, 20, 15, 10, 5]],
    ]

    approaches = [
        ("Transpose + Reverse (Recommended)", rotate_90_clockwise),
        ("Four-Way Swap (Layers)", rotate_90_clockwise_layers),
    ]

    print("=" * 70)
    print("ROTATE MATRIX 90 DEGREES CLOCKWISE - TEST RESULTS")
    print("=" * 70)

    for (matrix, desc), expected in zip(test_cases, expected_results):
        print(f"\n{desc}:")
        print_matrix(matrix, "  Original")
        print_matrix(expected, "  Expected")

        all_passed = True
        for name, func in approaches:
            test_matrix = copy_matrix(matrix)
            func(test_matrix)
            passed = test_matrix == expected
            if not passed:
                all_passed = False
            status = "PASS" if passed else "FAIL"
            print(f"    {name}: {status}")

        # Test Pythonic approach
        pythonic_result = rotate_90_clockwise_pythonic(matrix)
        pythonic_passed = pythonic_result == expected
        print(f"    Pythonic (creates new): {'PASS' if pythonic_passed else 'FAIL'}")

    # Test counter-clockwise rotation
    print("\n" + "-" * 50)
    print("COUNTER-CLOCKWISE ROTATION TEST:")
    print("-" * 50)
    ccw_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print_matrix(ccw_matrix, "  Original")
    rotate_90_counter_clockwise(ccw_matrix)
    print_matrix(ccw_matrix, "  After 90 CCW")
    print("  Expected: [[3, 6, 9], [2, 5, 8], [1, 4, 7]]")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    +---------------------------+---------+----------+-------------------+
    |        Approach           |  Time   |  Space   |   Recommendation  |
    +---------------------------+---------+----------+-------------------+
    | 1. Transpose + Reverse    |  O(n^2) |   O(1)   |  BEST CHOICE      |
    | 2. Four-Way Swap          |  O(n^2) |   O(1)   |  Good alternative |
    | 3. Pythonic (zip)         |  O(n^2) |   O(n^2) |  Not in-place     |
    +---------------------------+---------+----------+-------------------+
    """)


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print("\nSample Input 1:")
    print_matrix(matrix1, "  Input")
    rotate_90_clockwise(matrix1)
    print_matrix(matrix1, "  Output (90 CW)")

    # Sample Input 2
    matrix2 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    print("\nSample Input 2:")
    print_matrix(matrix2, "  Input")
    rotate_90_clockwise(matrix2)
    print_matrix(matrix2, "  Output (90 CW)")
