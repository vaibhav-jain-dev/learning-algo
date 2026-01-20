"""
Walls and Gates - Python Solutions

Fill empty rooms with distance to nearest gate using multi-source BFS.
"""

from collections import deque
from typing import List

INF = 2147483647


def walls_and_gates(rooms: List[List[int]]) -> None:
    """
    Multi-source BFS from all gates to fill distances.
    """
    if not rooms or not rooms[0]:
        return

    rows, cols = len(rooms), len(rooms[0])
    queue = deque()

    # Add all gates to queue
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:
                queue.append((r, c))

    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    # BFS
    while queue:
        r, c = queue.popleft()
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if (0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF):
                rooms[nr][nc] = rooms[r][c] + 1
                queue.append((nr, nc))


if __name__ == "__main__":
    rooms = [
        [INF, -1, 0, INF],
        [INF, INF, INF, -1],
        [INF, -1, INF, -1],
        [0, -1, INF, INF]
    ]
    walls_and_gates(rooms)
    print("Result:")
    for row in rooms:
        print(row)
