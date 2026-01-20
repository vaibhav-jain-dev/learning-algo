"""
Surrounded Regions - Python Solutions

Capture all 'O' regions that are completely surrounded by 'X'.
"""

from typing import List


def solve(board: List[List[str]]) -> None:
    """
    Capture surrounded regions by modifying board in-place.

    Strategy:
    1. Mark all 'O's connected to border as safe
    2. Flip remaining 'O's to 'X'
    3. Restore safe cells back to 'O'
    """
    if not board or not board[0]:
        return

    rows, cols = len(board), len(board[0])

    def dfs(r: int, c: int) -> None:
        """Mark 'O' as safe by changing to '#'."""
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != 'O':
            return
        board[r][c] = '#'  # Mark as safe
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    # Step 1: Mark border-connected 'O's as safe
    for r in range(rows):
        dfs(r, 0)
        dfs(r, cols - 1)
    for c in range(cols):
        dfs(0, c)
        dfs(rows - 1, c)

    # Step 2 & 3: Flip 'O' to 'X', restore '#' to 'O'
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == 'O':
                board[r][c] = 'X'
            elif board[r][c] == '#':
                board[r][c] = 'O'


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    test_cases = [
        (
            [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]],
            [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]],
            "Standard case"
        ),
        (
            [["X"]],
            [["X"]],
            "Single X"
        ),
        (
            [["O","O"],["O","O"]],
            [["O","O"],["O","O"]],
            "All O (all on border)"
        ),
    ]

    print("=" * 60)
    print("SURROUNDED REGIONS - TEST RESULTS")
    print("=" * 60)

    for board, expected, desc in test_cases:
        b = [row[:] for row in board]
        solve(b)
        status = "PASS" if b == expected else "FAIL"
        print(f"[{status}] {desc}")


if __name__ == "__main__":
    run_tests()
