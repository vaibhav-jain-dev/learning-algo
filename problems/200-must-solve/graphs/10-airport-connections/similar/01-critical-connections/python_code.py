"""
Critical Connections in a Network - Python Solutions

Find all bridges (critical edges) in an undirected graph using Tarjan's algorithm.
"""

from collections import defaultdict
from typing import List


def critical_connections(n: int, connections: List[List[int]]) -> List[List[int]]:
    """
    Find bridges using Tarjan's algorithm.

    A bridge exists if low[v] > disc[u] for edge u-v.
    """
    graph = defaultdict(list)
    for a, b in connections:
        graph[a].append(b)
        graph[b].append(a)

    disc = [-1] * n  # Discovery time
    low = [-1] * n   # Lowest reachable discovery time
    bridges = []
    time = [0]

    def dfs(node: int, parent: int) -> None:
        disc[node] = low[node] = time[0]
        time[0] += 1

        for neighbor in graph[node]:
            if disc[neighbor] == -1:  # Not visited
                dfs(neighbor, node)
                low[node] = min(low[node], low[neighbor])

                # Bridge condition
                if low[neighbor] > disc[node]:
                    bridges.append([node, neighbor])
            elif neighbor != parent:
                low[node] = min(low[node], disc[neighbor])

    # Handle disconnected components
    for i in range(n):
        if disc[i] == -1:
            dfs(i, -1)

    return bridges


if __name__ == "__main__":
    result = critical_connections(4, [[0,1],[1,2],[2,0],[1,3]])
    print(f"Critical connections: {result} (expected: [[1,3]])")

    result2 = critical_connections(5, [[0,1],[1,2],[2,3],[3,0],[2,4]])
    print(f"Example 2: {result2} (expected: [[2,4]])")
