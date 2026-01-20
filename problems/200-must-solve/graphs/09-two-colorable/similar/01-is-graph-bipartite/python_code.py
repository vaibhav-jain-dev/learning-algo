"""
Is Graph Bipartite? - Python Solutions

Check if graph can be 2-colored (bipartite).
"""

from collections import deque
from typing import List


def is_bipartite_bfs(graph: List[List[int]]) -> bool:
    """
    BFS approach: Try to 2-color the graph.
    """
    n = len(graph)
    color = [-1] * n  # -1 = uncolored, 0/1 = colors

    for start in range(n):
        if color[start] != -1:
            continue

        queue = deque([start])
        color[start] = 0

        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False

    return True


def is_bipartite_dfs(graph: List[List[int]]) -> bool:
    """
    DFS approach: Recursively try to 2-color.
    """
    n = len(graph)
    color = [-1] * n

    def dfs(node: int, c: int) -> bool:
        color[node] = c
        for neighbor in graph[node]:
            if color[neighbor] == -1:
                if not dfs(neighbor, 1 - c):
                    return False
            elif color[neighbor] == c:
                return False
        return True

    for i in range(n):
        if color[i] == -1:
            if not dfs(i, 0):
                return False

    return True


if __name__ == "__main__":
    graph1 = [[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]
    print(f"Example 1: {is_bipartite_bfs(graph1)} (expected: False)")

    graph2 = [[1, 3], [0, 2], [1, 3], [0, 2]]
    print(f"Example 2: {is_bipartite_bfs(graph2)} (expected: True)")
