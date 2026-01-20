"""
Reveal Minesweeper - Python Solution

Implement the click/reveal functionality for Minesweeper using recursive flood fill.
"""

from typing import List, Tuple


def reveal_minesweeper(board: List[List[str]], click: List[int]) -> List[List[str]]:
    """
    Update the Minesweeper board after a click.

    Args:
        board: 2D grid with 'M' (mine), 'E' (empty), 'B' (blank revealed),
               '1'-'8' (adjacent mine count), 'X' (revealed mine)
        click: [row, col] position of click

    Returns:
        Updated board after revealing cells

    Example:
        >>> board = [['E','E','E'],['E','E','E'],['E','E','E']]
        >>> reveal_minesweeper(board, [1, 1])
        [['B','B','B'],['B','B','B'],['B','B','B']]
    """
    rows, cols = len(board), len(board[0])
    row, col = click

    # Direction vectors for 8 neighbors
    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    def count_adjacent_mines(r: int, c: int) -> int:
        """Count mines in 8-directional neighbors."""
        count = 0
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                if board[nr][nc] == 'M':
                    count += 1
        return count

    def reveal(r: int, c: int) -> None:
        """Recursively reveal cells starting from (r, c)."""
        # Out of bounds
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return

        # Only reveal unrevealed empty cells
        if board[r][c] != 'E':
            return

        # Count adjacent mines
        mine_count = count_adjacent_mines(r, c)

        if mine_count > 0:
            # Has adjacent mines - show count and stop
            board[r][c] = str(mine_count)
        else:
            # No adjacent mines - mark as blank and flood fill
            board[r][c] = 'B'
            for dr, dc in directions:
                reveal(r + dr, c + dc)

    # Handle mine click - game over
    if board[row][col] == 'M':
        board[row][col] = 'X'
        return board

    # Reveal from clicked position
    reveal(row, col)
    return board


def reveal_minesweeper_bfs(board: List[List[str]], click: List[int]) -> List[List[str]]:
    """
    BFS iterative solution using a queue.
    Avoids deep recursion for large boards.
    """
    from collections import deque

    rows, cols = len(board), len(board[0])
    row, col = click

    directions = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]

    def count_mines(r: int, c: int) -> int:
        count = 0
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] == 'M':
                count += 1
        return count

    # Handle mine
    if board[row][col] == 'M':
        board[row][col] = 'X'
        return board

    # BFS flood fill
    queue = deque([(row, col)])

    while queue:
        r, c = queue.popleft()

        if board[r][c] != 'E':
            continue

        mine_count = count_mines(r, c)

        if mine_count > 0:
            board[r][c] = str(mine_count)
        else:
            board[r][c] = 'B'
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] == 'E':
                    queue.append((nr, nc))

    return board


def print_board(board: List[List[str]]) -> None:
    """Pretty print the Minesweeper board."""
    for row in board:
        print(' '.join(row))
    print()


if __name__ == "__main__":
    # Test case 1: Click triggers flood fill
    print("Test 1: Flood fill around a mine")
    print("-" * 40)
    board1 = [
        ['E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'M', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E']
    ]
    print("Before click at [3, 0]:")
    print_board(board1)

    reveal_minesweeper(board1, [3, 0])
    print("After:")
    print_board(board1)

    # Test case 2: Click on mine
    print("Test 2: Click on mine (game over)")
    print("-" * 40)
    board2 = [
        ['E', 'E', 'E'],
        ['E', 'M', 'E'],
        ['E', 'E', 'E']
    ]
    print("Before click at [1, 1]:")
    print_board(board2)

    reveal_minesweeper(board2, [1, 1])
    print("After:")
    print_board(board2)

    # Test case 3: No mines - entire board revealed
    print("Test 3: No mines - full reveal")
    print("-" * 40)
    board3 = [
        ['E', 'E', 'E'],
        ['E', 'E', 'E'],
        ['E', 'E', 'E']
    ]
    print("Before click at [1, 1]:")
    print_board(board3)

    reveal_minesweeper(board3, [1, 1])
    print("After:")
    print_board(board3)

    # Test case 4: Click adjacent to mine
    print("Test 4: Click on cell adjacent to mine")
    print("-" * 40)
    board4 = [
        ['E', 'E', 'E'],
        ['E', 'M', 'E'],
        ['E', 'E', 'E']
    ]
    print("Before click at [0, 0]:")
    print_board(board4)

    reveal_minesweeper(board4, [0, 0])
    print("After:")
    print_board(board4)

    # Test case 5: BFS version comparison
    print("Test 5: BFS version")
    print("-" * 40)
    board5 = [
        ['E', 'E', 'E', 'E'],
        ['E', 'E', 'M', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E']
    ]
    print("Before click at [3, 0] using BFS:")
    print_board(board5)

    reveal_minesweeper_bfs(board5, [3, 0])
    print("After:")
    print_board(board5)

    print("All tests completed!")
