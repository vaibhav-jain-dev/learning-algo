"""
Spiral Matrix III (Starting Point) - Python Solutions

Start from a cell and visit all cells in spiral order.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Simulation (Recommended)
# ============================================================================
# Time Complexity:  O(max(rows, cols)^2)
# Space Complexity: O(rows * cols) for result
#
# WHY THIS IS BEST:
# - Direct simulation of the problem
# - Easy to understand
# - Handles out-of-bounds naturally
# ============================================================================

def spiral_matrix_iii(rows: int, cols: int, r_start: int, c_start: int) -> List[List[int]]:
    """
    Visit all cells starting from (r_start, c_start) in spiral order.

    Pattern:
    - Walk right, down, left, up in sequence
    - After every 2 direction changes, increase step count
    - Skip cells that are out of bounds

    For a 3x3 grid starting at (1,1):
        Step counts: 1,1,2,2,3,3,4,4,...
        Walk: R(1), D(1), L(2), U(2), R(3), D(3),...
    """
    result = []

    # Directions: right, down, left, up
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    dir_idx = 0

    row, col = r_start, c_start
    steps = 1  # Steps to take in current direction

    while len(result) < rows * cols:
        # Take 2 directions with same step count
        for _ in range(2):
            dr, dc = directions[dir_idx]

            for _ in range(steps):
                # Add if within bounds
                if 0 <= row < rows and 0 <= col < cols:
                    result.append([row, col])

                row += dr
                col += dc

            # Turn clockwise
            dir_idx = (dir_idx + 1) % 4

        # Increase step count after every 2 directions
        steps += 1

    return result


# ============================================================================
# APPROACH 2: Generator-based
# ============================================================================
# Time Complexity:  O(max(rows, cols)^2)
# Space Complexity: O(1) excluding output
#
# WHEN TO USE:
# - Memory efficient iteration
# - When you don't need all results at once
# ============================================================================

def spiral_matrix_iii_generator(rows: int, cols: int, r_start: int, c_start: int):
    """
    Generator version - yields coordinates one by one.
    """
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    dir_idx = 0
    row, col = r_start, c_start
    steps = 1
    count = 0
    total = rows * cols

    while count < total:
        for _ in range(2):
            dr, dc = directions[dir_idx]

            for _ in range(steps):
                if 0 <= row < rows and 0 <= col < cols:
                    yield [row, col]
                    count += 1
                    if count >= total:
                        return

                row += dr
                col += dc

            dir_idx = (dir_idx + 1) % 4

        steps += 1


def spiral_matrix_iii_gen(rows: int, cols: int, r_start: int, c_start: int) -> List[List[int]]:
    """Wrapper to return list from generator."""
    return list(spiral_matrix_iii_generator(rows, cols, r_start, c_start))


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (rows, cols, rStart, cStart, expected_length, description)
        (1, 4, 0, 0, 4, "Single row"),
        (3, 3, 1, 1, 9, "Start from center"),
        (5, 6, 1, 4, 30, "Large grid"),
        (1, 1, 0, 0, 1, "Single cell"),
        (2, 2, 0, 0, 4, "2x2 from corner"),
    ]

    approaches = [
        ("Simulation (Recommended)", spiral_matrix_iii),
        ("Generator-based", spiral_matrix_iii_gen),
    ]

    print("=" * 70)
    print("SPIRAL MATRIX III (STARTING POINT) - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for rows, cols, r_start, c_start, expected_len, desc in test_cases:
            result = func(rows, cols, r_start, c_start)

            # Verify length and all cells are unique and valid
            valid_cells = set((r, c) for r in range(rows) for c in range(cols))
            result_tuples = [tuple(cell) for cell in result]

            passed = (len(result) == expected_len and
                      len(set(result_tuples)) == expected_len and
                      all(tuple(cell) in valid_cells for cell in result))

            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False
            print(f"  {status}: {desc} ({rows}x{cols} from ({r_start},{c_start}))")

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
    rows, cols, r_start, c_start = 1, 4, 0, 0
    print(f"\nInput: rows={rows}, cols={cols}, rStart={r_start}, cStart={c_start}")
    result = spiral_matrix_iii(rows, cols, r_start, c_start)
    print(f"Output: {result}")

    # Sample Input 2
    rows, cols, r_start, c_start = 3, 3, 1, 1
    print(f"\nInput: rows={rows}, cols={cols}, rStart={r_start}, cStart={c_start}")
    result = spiral_matrix_iii(rows, cols, r_start, c_start)
    print(f"Output: {result}")
