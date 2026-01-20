"""
Possible Bipartition - Python Solutions

Split people into two groups where no one dislikes someone in same group.
"""

from collections import defaultdict, deque
from typing import List


def possible_bipartition(n: int, dislikes: List[List[int]]) -> bool:
    """
    Build dislike graph and check if bipartite.
    """
    graph = defaultdict(list)
    for a, b in dislikes:
        graph[a].append(b)
        graph[b].append(a)

    color = [0] * (n + 1)  # 0 = uncolored, 1/2 = colors

    for person in range(1, n + 1):
        if color[person] != 0:
            continue

        queue = deque([person])
        color[person] = 1

        while queue:
            p = queue.popleft()
            for enemy in graph[p]:
                if color[enemy] == 0:
                    color[enemy] = 3 - color[p]  # Alternate between 1 and 2
                    queue.append(enemy)
                elif color[enemy] == color[p]:
                    return False

    return True


if __name__ == "__main__":
    print(f"Example 1: {possible_bipartition(4, [[1,2],[1,3],[2,4]])} (expected: True)")
    print(f"Example 2: {possible_bipartition(3, [[1,2],[1,3],[2,3]])} (expected: False)")
    print(f"Example 3: {possible_bipartition(5, [[1,2],[2,3],[3,4],[4,5],[1,5]])} (expected: False)")
