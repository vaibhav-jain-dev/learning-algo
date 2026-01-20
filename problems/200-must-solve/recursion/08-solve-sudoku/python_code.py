"""
Solve Sudoku - Python Solution

Solve a 9x9 Sudoku puzzle using backtracking.
"""

from typing import List, Set, Tuple, Optional


def solve_sudoku(board: List[List[int]]) -> List[List[int]]:
    """
    Solve Sudoku puzzle using backtracking.

    Modifies board in-place and returns it.

    Args:
        board: 9x9 grid with 0 representing empty cells

    Returns:
        Solved Sudoku board

    Example:
        >>> board = [[5,3,0,0,7,0,0,0,0], ...]
        >>> solve_sudoku(board)
        [[5,3,4,6,7,8,9,1,2], ...]
    """

    def is_valid(row: int, col: int, num: int) -> bool:
        """Check if placing num at (row, col) is valid."""
        # Check row
        if num in board[row]:
            return False

        # Check column
        for r in range(9):
            if board[r][col] == num:
                return False

        # Check 3x3 box
        box_row, box_col = 3 * (row // 3), 3 * (col // 3)
        for r in range(box_row, box_row + 3):
            for c in range(box_col, box_col + 3):
                if board[r][c] == num:
                    return False

        return True

    def solve() -> bool:
        """Recursively solve the puzzle."""
        # Find next empty cell
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    # Try digits 1-9
                    for num in range(1, 10):
                        if is_valid(row, col, num):
                            board[row][col] = num

                            if solve():
                                return True

                            # Backtrack
                            board[row][col] = 0

                    return False  # No valid digit found

        return True  # All cells filled

    solve()
    return board


def solve_sudoku_optimized(board: List[List[int]]) -> List[List[int]]:
    """
    Solve Sudoku with constraint sets for O(1) validation.
    """
    # Initialize constraint sets
    rows: List[Set[int]] = [set() for _ in range(9)]
    cols: List[Set[int]] = [set() for _ in range(9)]
    boxes: List[Set[int]] = [set() for _ in range(9)]

    # Populate constraints from initial board
    empty_cells: List[Tuple[int, int]] = []

    for r in range(9):
        for c in range(9):
            num = board[r][c]
            if num == 0:
                empty_cells.append((r, c))
            else:
                rows[r].add(num)
                cols[c].add(num)
                boxes[3 * (r // 3) + c // 3].add(num)

    def solve(idx: int) -> bool:
        """Solve starting from empty_cells[idx]."""
        if idx == len(empty_cells):
            return True

        row, col = empty_cells[idx]
        box_idx = 3 * (row // 3) + col // 3

        for num in range(1, 10):
            if num not in rows[row] and num not in cols[col] and num not in boxes[box_idx]:
                # Place number
                board[row][col] = num
                rows[row].add(num)
                cols[col].add(num)
                boxes[box_idx].add(num)

                if solve(idx + 1):
                    return True

                # Backtrack
                board[row][col] = 0
                rows[row].remove(num)
                cols[col].remove(num)
                boxes[box_idx].remove(num)

        return False

    solve(0)
    return board


def print_board(board: List[List[int]]) -> None:
    """Pretty print the Sudoku board."""
    for i, row in enumerate(board):
        if i % 3 == 0 and i != 0:
            print("-" * 21)

        row_str = ""
        for j, num in enumerate(row):
            if j % 3 == 0 and j != 0:
                row_str += "| "
            row_str += f"{num} "
        print(row_str)


if __name__ == "__main__":
    # Test case
    board = [
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7]
    ]

    print("Input board:")
    print_board(board)

    # Make a copy for optimized version
    board_copy = [row[:] for row in board]

    print("\nSolving with basic backtracking...")
    solve_sudoku(board)
    print("\nSolved board:")
    print_board(board)

    print("\n" + "=" * 40)
    print("\nSolving with optimized version...")
    solve_sudoku_optimized(board_copy)
    print("\nSolved board (optimized):")
    print_board(board_copy)
