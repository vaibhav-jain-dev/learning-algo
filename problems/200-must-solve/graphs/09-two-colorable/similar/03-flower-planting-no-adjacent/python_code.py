"""
Flower Planting With No Adjacent - Python Solutions

Assign 4 flower types to gardens such that no adjacent gardens have same flower.
"""

from collections import defaultdict
from typing import List


def garden_no_adj(n: int, paths: List[List[int]]) -> List[int]:
    """
    Greedy coloring: With max degree 3 and 4 colors, always possible.
    """
    graph = defaultdict(list)
    for a, b in paths:
        graph[a].append(b)
        graph[b].append(a)

    result = [0] * n

    for garden in range(1, n + 1):
        # Find colors used by neighbors
        used = set()
        for neighbor in graph[garden]:
            if result[neighbor - 1] != 0:
                used.add(result[neighbor - 1])

        # Pick first available color (1-4)
        for color in range(1, 5):
            if color not in used:
                result[garden - 1] = color
                break

    return result


if __name__ == "__main__":
    print(f"Example 1: {garden_no_adj(3, [[1,2],[2,3],[3,1]])}")
    print(f"Example 2: {garden_no_adj(4, [[1,2],[3,4]])}")
    print(f"Example 3: {garden_no_adj(4, [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]])}")
