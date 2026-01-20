"""
Sliding Puzzle (8-Puzzle Problem) - Python Solution

Solve the sliding puzzle using minimum moves with BFS or A*.

Time Complexity: O((mn)!)
Space Complexity: O((mn)!)
"""

from typing import List, Tuple
from collections import deque
import heapq


def sliding_puzzle_bfs(board: List[List[int]]) -> int:
    """
    Solve sliding puzzle using BFS.

    Args:
        board: 2x3 board with tiles 0-5

    Returns:
        Minimum moves to solve, or -1 if impossible
    """
    goal = "123450"
    start = "".join(str(tile) for row in board for tile in row)

    if start == goal:
        return 0

    # Neighbors for each position of 0
    neighbors = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4],
        4: [1, 3, 5],
        5: [2, 4]
    }

    queue = deque([(start, 0)])
    visited = {start}

    while queue:
        state, moves = queue.popleft()
        zero_idx = state.index('0')

        for neighbor_idx in neighbors[zero_idx]:
            # Swap 0 with neighbor
            state_list = list(state)
            state_list[zero_idx], state_list[neighbor_idx] = state_list[neighbor_idx], state_list[zero_idx]
            new_state = "".join(state_list)

            if new_state == goal:
                return moves + 1

            if new_state not in visited:
                visited.add(new_state)
                queue.append((new_state, moves + 1))

    return -1


def sliding_puzzle_astar(board: List[List[int]]) -> int:
    """
    Solve sliding puzzle using A* with Manhattan distance heuristic.

    Args:
        board: 2x3 board with tiles 0-5

    Returns:
        Minimum moves to solve, or -1 if impossible
    """
    goal = "123450"
    start = "".join(str(tile) for row in board for tile in row)

    if start == goal:
        return 0

    # Goal positions for each tile
    goal_pos = {
        '1': (0, 0), '2': (0, 1), '3': (0, 2),
        '4': (1, 0), '5': (1, 1), '0': (1, 2)
    }

    def heuristic(state: str) -> int:
        """Sum of Manhattan distances for all tiles"""
        total = 0
        for i, tile in enumerate(state):
            if tile != '0':
                current_row, current_col = i // 3, i % 3
                goal_row, goal_col = goal_pos[tile]
                total += abs(current_row - goal_row) + abs(current_col - goal_col)
        return total

    neighbors = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4],
        4: [1, 3, 5],
        5: [2, 4]
    }

    # Priority queue: (f_score, moves, state)
    pq = [(heuristic(start), 0, start)]
    g_scores = {start: 0}

    while pq:
        f, moves, state = heapq.heappop(pq)

        if state == goal:
            return moves

        if moves > g_scores.get(state, float('inf')):
            continue

        zero_idx = state.index('0')

        for neighbor_idx in neighbors[zero_idx]:
            state_list = list(state)
            state_list[zero_idx], state_list[neighbor_idx] = state_list[neighbor_idx], state_list[zero_idx]
            new_state = "".join(state_list)
            new_moves = moves + 1

            if new_moves < g_scores.get(new_state, float('inf')):
                g_scores[new_state] = new_moves
                f = new_moves + heuristic(new_state)
                heapq.heappush(pq, (f, new_moves, new_state))

    return -1


def solve_puzzle_with_path(board: List[List[int]]) -> Tuple[int, List[str]]:
    """
    Solve puzzle and return the sequence of states.

    Args:
        board: 2x3 board

    Returns:
        Tuple of (moves, path_of_states)
    """
    goal = "123450"
    start = "".join(str(tile) for row in board for tile in row)

    if start == goal:
        return 0, [start]

    neighbors = {
        0: [1, 3], 1: [0, 2, 4], 2: [1, 5],
        3: [0, 4], 4: [1, 3, 5], 5: [2, 4]
    }

    queue = deque([(start, [start])])
    visited = {start}

    while queue:
        state, path = queue.popleft()
        zero_idx = state.index('0')

        for neighbor_idx in neighbors[zero_idx]:
            state_list = list(state)
            state_list[zero_idx], state_list[neighbor_idx] = state_list[neighbor_idx], state_list[zero_idx]
            new_state = "".join(state_list)

            if new_state == goal:
                return len(path), path + [new_state]

            if new_state not in visited:
                visited.add(new_state)
                queue.append((new_state, path + [new_state]))

    return -1, []


# Test cases
if __name__ == "__main__":
    # Test 1: One move
    board1 = [[1, 2, 3], [4, 0, 5]]
    result1 = sliding_puzzle_bfs(board1)
    print(f"Test 1 (BFS): {result1}")
    assert result1 == 1, f"Expected 1, got {result1}"

    result1_astar = sliding_puzzle_astar(board1)
    print(f"Test 1 (A*): {result1_astar}")
    assert result1_astar == 1

    # Test 2: Impossible
    board2 = [[1, 2, 3], [5, 4, 0]]
    result2 = sliding_puzzle_bfs(board2)
    print(f"Test 2 (BFS): {result2}")
    assert result2 == -1, f"Expected -1, got {result2}"

    # Test 3: Multiple moves
    board3 = [[4, 1, 2], [5, 0, 3]]
    result3 = sliding_puzzle_bfs(board3)
    print(f"Test 3 (BFS): {result3}")
    assert result3 == 5, f"Expected 5, got {result3}"

    result3_astar = sliding_puzzle_astar(board3)
    print(f"Test 3 (A*): {result3_astar}")
    assert result3_astar == 5

    # Test 4: Already solved
    board4 = [[1, 2, 3], [4, 5, 0]]
    result4 = sliding_puzzle_bfs(board4)
    print(f"Test 4 (BFS): {result4}")
    assert result4 == 0, f"Expected 0, got {result4}"

    # Test 5: With path
    moves5, path5 = solve_puzzle_with_path([[1, 2, 3], [4, 0, 5]])
    print(f"Test 5: Moves={moves5}, Path length={len(path5)}")

    print("\nAll tests passed!")
