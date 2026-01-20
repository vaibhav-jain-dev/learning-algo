"""
Anti-Spiral Traverse - Python Solutions

Traverse matrix in anti-spiral order (counterclockwise from center).

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Center-Out Counterclockwise (Recommended)
# ============================================================================
# Time Complexity:  O(m * n)
# Space Complexity: O(m * n)
#
# WHY THIS IS BEST:
# - Clear counterclockwise pattern
# - Handles non-square matrices
# ============================================================================

def anti_spiral_traverse(matrix: List[List[int]]) -> List[int]:
    """
    Traverse matrix in anti-spiral order (counterclockwise from center).

    Directions: left, down, right, up (counterclockwise)
    Pattern: Start from center, expand outward with increasing steps.

    For 3x3: center at (1,1)
    Steps: L1, D1, R2, U2, L3, U3, R4, D4...
    """
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    result = []

    # Find center
    center_row = rows // 2
    center_col = cols // 2

    # Counterclockwise directions: left, down, right, up
    directions = [(0, -1), (1, 0), (0, 1), (-1, 0)]
    dir_idx = 0

    row, col = center_row, center_col
    steps = 1

    # Track visited to handle non-square matrices
    visited = set()

    while len(result) < rows * cols:
        for _ in range(2):  # Two directions per step count
            dr, dc = directions[dir_idx]

            for _ in range(steps):
                if 0 <= row < rows and 0 <= col < cols and (row, col) not in visited:
                    result.append(matrix[row][col])
                    visited.add((row, col))

                row += dr
                col += dc

            dir_idx = (dir_idx + 1) % 4

        steps += 1

        # Safety check to prevent infinite loop
        if steps > rows + cols:
            break

    return result


# ============================================================================
# APPROACH 2: Reverse of Spiral Traverse
# ============================================================================
# Time Complexity:  O(m * n)
# Space Complexity: O(m * n)
#
# WHEN TO USE:
# - When you want anti-spiral from outside-in
# - Simpler implementation
# ============================================================================

def anti_spiral_reverse(matrix: List[List[int]]) -> List[int]:
    """
    Alternative: Regular spiral traverse, then reverse.

    This gives counterclockwise from inside-out effect
    by reversing clockwise outside-in.
    """
    if not matrix or not matrix[0]:
        return []

    result = []
    rows, cols = len(matrix), len(matrix[0])

    top, bottom = 0, rows - 1
    left, right = 0, cols - 1

    while top <= bottom and left <= right:
        # Left column (top to bottom) - counterclockwise starts going down
        for row in range(top, bottom + 1):
            result.append(matrix[row][left])
        left += 1

        # Bottom row (left to right)
        if left <= right:
            for col in range(left, right + 1):
                result.append(matrix[bottom][col])
            bottom -= 1

        # Right column (bottom to top)
        if top <= bottom:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][right])
            right -= 1

        # Top row (right to left)
        if left <= right:
            for col in range(right, left - 1, -1):
                result.append(matrix[top][col])
            top += 1

    return result


# ============================================================================
# APPROACH 3: Simple Reversed Clockwise
# ============================================================================

def spiral_clockwise(matrix: List[List[int]]) -> List[int]:
    """Standard clockwise spiral for comparison."""
    if not matrix or not matrix[0]:
        return []

    result = []
    rows, cols = len(matrix), len(matrix[0])
    top, bottom, left, right = 0, rows - 1, 0, cols - 1

    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1

        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1

        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1

        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result


def anti_spiral_simple(matrix: List[List[int]]) -> List[int]:
    """Anti-spiral as reversed clockwise spiral."""
    return spiral_clockwise(matrix)[::-1]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 9, "3x3 matrix"),
        ([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], 12, "3x4 matrix"),
        ([[1]], 1, "1x1 matrix"),
        ([[1, 2], [3, 4]], 4, "2x2 matrix"),
        ([[1, 2, 3]], 3, "Single row"),
        ([[1], [2], [3]], 3, "Single column"),
    ]

    approaches = [
        ("Center-Out Counterclockwise", anti_spiral_traverse),
        ("Counterclockwise Outside-In", anti_spiral_reverse),
        ("Reversed Clockwise", anti_spiral_simple),
    ]

    print("=" * 70)
    print("ANTI-SPIRAL TRAVERSE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for matrix, expected_len, desc in test_cases:
            result = func(matrix)
            # Check length and all elements present
            flat = [val for row in matrix for val in row]
            passed = len(result) == expected_len and sorted(result) == sorted(flat)

            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False
            print(f"  {status}: {desc}: {result[:5]}..." if len(result) > 5 else f"  {status}: {desc}: {result}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print(f"\nInput: {matrix}")
    print(f"Anti-spiral (center-out): {anti_spiral_traverse(matrix)}")
    print(f"Anti-spiral (outside-in): {anti_spiral_reverse(matrix)}")
