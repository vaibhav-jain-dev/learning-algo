"""
Shortest Path to Get All Keys - Python Solutions

BFS with state = (position, keys_collected_bitmask)
"""

from collections import deque
from typing import List


def shortest_path_all_keys(grid: List[str]) -> int:
    """
    BFS with state tracking collected keys as bitmask.
    """
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    all_keys = 0
    visited = set()

    # Find start and count keys
    for r in range(rows):
        for c in range(cols):
            ch = grid[r][c]
            if ch == '@':
                queue.append((r, c, 0, 0))  # row, col, keys, steps
                visited.add((r, c, 0))
            elif ch.islower():
                all_keys |= (1 << (ord(ch) - ord('a')))

    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    while queue:
        r, c, keys, steps = queue.popleft()

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if 0 <= nr < rows and 0 <= nc < cols:
                ch = grid[nr][nc]

                if ch == '#':  # Wall
                    continue
                if ch.isupper() and not (keys & (1 << (ord(ch) - ord('A')))):
                    continue  # Lock without key

                new_keys = keys
                if ch.islower():
                    new_keys |= (1 << (ord(ch) - ord('a')))

                if new_keys == all_keys:
                    return steps + 1

                if (nr, nc, new_keys) not in visited:
                    visited.add((nr, nc, new_keys))
                    queue.append((nr, nc, new_keys, steps + 1))

    return -1


if __name__ == "__main__":
    grid1 = ["@.a..", "###.#", "b.A.B"]
    print(f"Example 1: {shortest_path_all_keys(grid1)} (expected: 8)")

    grid2 = ["@..aA", "..B#.", "....b"]
    print(f"Example 2: {shortest_path_all_keys(grid2)} (expected: 6)")
