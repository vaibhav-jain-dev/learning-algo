"""
Topological Sort - DAG Ordering - Python Solution

Find a valid topological ordering of vertices in a DAG.

Time Complexity: O(V + E)
Space Complexity: O(V + E)
"""

from typing import List
from collections import deque, defaultdict


def topological_sort_kahn(n: int, edges: List[List[int]]) -> List[int]:
    """
    Topological sort using Kahn's Algorithm (BFS).

    Args:
        n: Number of vertices (0 to n-1)
        edges: List of [from, to] pairs

    Returns:
        List of vertices in topological order, or empty if cycle exists
    """
    # Build adjacency list and calculate in-degrees
    graph = defaultdict(list)
    in_degree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    # Initialize queue with all nodes having in-degree 0
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If not all nodes are processed, cycle exists
    return result if len(result) == n else []


def topological_sort_dfs(n: int, edges: List[List[int]]) -> List[int]:
    """
    Topological sort using DFS.

    Uses 3-state coloring for cycle detection:
    0 = unvisited, 1 = visiting (in current path), 2 = visited
    """
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)

    color = [0] * n  # 0: white, 1: gray, 2: black
    result = []
    has_cycle = False

    def dfs(node: int):
        nonlocal has_cycle

        if has_cycle:
            return

        color[node] = 1  # Mark as visiting

        for neighbor in graph[node]:
            if color[neighbor] == 1:  # Back edge -> cycle
                has_cycle = True
                return
            if color[neighbor] == 0:
                dfs(neighbor)

        color[node] = 2  # Mark as visited
        result.append(node)  # Add to result after all descendants

    for i in range(n):
        if color[i] == 0:
            dfs(i)
            if has_cycle:
                return []

    result.reverse()  # Reverse to get correct order
    return result


def is_valid_topological_order(n: int, edges: List[List[int]],
                               order: List[int]) -> bool:
    """
    Verify if the given order is a valid topological ordering.
    """
    if len(order) != n:
        return False

    position = {node: i for i, node in enumerate(order)}

    for u, v in edges:
        if position[u] > position[v]:
            return False

    return True


# Test cases
if __name__ == "__main__":
    # Test 1: Basic DAG
    edges1 = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]
    result1_kahn = topological_sort_kahn(6, edges1)
    result1_dfs = topological_sort_dfs(6, edges1)
    print(f"Test 1 (Kahn): {result1_kahn}")
    print(f"Test 1 (DFS):  {result1_dfs}")
    assert is_valid_topological_order(6, edges1, result1_kahn)
    assert is_valid_topological_order(6, edges1, result1_dfs)

    # Test 2: Cycle detection
    edges2 = [[1, 0], [0, 1]]
    result2 = topological_sort_kahn(2, edges2)
    print(f"Test 2 (Cycle): {result2}")
    assert result2 == [], "Should detect cycle"

    # Test 3: Linear chain
    edges3 = [[0, 1], [1, 2], [2, 3]]
    result3 = topological_sort_kahn(4, edges3)
    print(f"Test 3 (Linear): {result3}")
    assert result3 == [0, 1, 2, 3]

    # Test 4: No edges
    result4 = topological_sort_kahn(3, [])
    print(f"Test 4 (No edges): {result4}")
    assert len(result4) == 3

    # Test 5: Single node
    result5 = topological_sort_kahn(1, [])
    print(f"Test 5 (Single): {result5}")
    assert result5 == [0]

    print("\nAll tests passed!")
