"""
Minimum Cost to Connect All Points - Python Solution

Find minimum cost to connect all points using MST algorithms.

Time Complexity: O(n^2 log n)
Space Complexity: O(n^2)
"""

from typing import List
import heapq


def min_cost_connect_points_prim(points: List[List[int]]) -> int:
    """
    Find minimum cost using Prim's algorithm.

    Args:
        points: List of [x, y] coordinates

    Returns:
        Minimum cost to connect all points
    """
    n = len(points)
    if n <= 1:
        return 0

    def manhattan_distance(i: int, j: int) -> int:
        return abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])

    # Start from point 0
    visited = [False] * n
    min_heap = [(0, 0)]  # (cost, point_index)
    total_cost = 0
    edges_added = 0

    while min_heap and edges_added < n:
        cost, current = heapq.heappop(min_heap)

        if visited[current]:
            continue

        visited[current] = True
        total_cost += cost
        edges_added += 1

        # Add edges to unvisited neighbors
        for neighbor in range(n):
            if not visited[neighbor]:
                dist = manhattan_distance(current, neighbor)
                heapq.heappush(min_heap, (dist, neighbor))

    return total_cost


def min_cost_connect_points_kruskal(points: List[List[int]]) -> int:
    """
    Find minimum cost using Kruskal's algorithm with Union-Find.

    Args:
        points: List of [x, y] coordinates

    Returns:
        Minimum cost to connect all points
    """
    n = len(points)
    if n <= 1:
        return 0

    # Generate all edges
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            cost = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
            edges.append((cost, i, j))

    # Sort edges by cost
    edges.sort()

    # Union-Find
    parent = list(range(n))
    rank = [0] * n

    def find(x: int) -> int:
        if parent[x] != x:
            parent[x] = find(parent[x])  # Path compression
        return parent[x]

    def union(x: int, y: int) -> bool:
        px, py = find(x), find(y)
        if px == py:
            return False  # Already connected
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    total_cost = 0
    edges_added = 0

    for cost, u, v in edges:
        if union(u, v):
            total_cost += cost
            edges_added += 1
            if edges_added == n - 1:
                break

    return total_cost


def min_cost_connect_points_optimized_prim(points: List[List[int]]) -> int:
    """
    Optimized Prim's without explicit edge list.

    Args:
        points: List of [x, y] coordinates

    Returns:
        Minimum cost to connect all points
    """
    n = len(points)
    if n <= 1:
        return 0

    # Track minimum distance to MST for each point
    min_dist = [float('inf')] * n
    min_dist[0] = 0
    in_mst = [False] * n
    total_cost = 0

    for _ in range(n):
        # Find minimum distance point not in MST
        min_val = float('inf')
        min_idx = -1
        for i in range(n):
            if not in_mst[i] and min_dist[i] < min_val:
                min_val = min_dist[i]
                min_idx = i

        in_mst[min_idx] = True
        total_cost += min_val

        # Update distances for neighbors
        for j in range(n):
            if not in_mst[j]:
                dist = abs(points[min_idx][0] - points[j][0]) + \
                       abs(points[min_idx][1] - points[j][1])
                min_dist[j] = min(min_dist[j], dist)

    return total_cost


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    points1 = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]
    result1 = min_cost_connect_points_prim(points1)
    print(f"Test 1 (Prim): {result1}")
    assert result1 == 20, f"Expected 20, got {result1}"

    result1_kruskal = min_cost_connect_points_kruskal(points1)
    print(f"Test 1 (Kruskal): {result1_kruskal}")
    assert result1_kruskal == 20

    # Test 2: Three points
    points2 = [[3, 12], [-2, 5], [-4, 1]]
    result2 = min_cost_connect_points_prim(points2)
    print(f"Test 2 (Prim): {result2}")
    assert result2 == 18, f"Expected 18, got {result2}"

    # Test 3: Four points
    points3 = [[0, 0], [1, 1], [1, 0], [-1, 1]]
    result3 = min_cost_connect_points_prim(points3)
    print(f"Test 3 (Prim): {result3}")
    assert result3 == 4, f"Expected 4, got {result3}"

    # Test 4: Single point
    points4 = [[0, 0]]
    result4 = min_cost_connect_points_prim(points4)
    print(f"Test 4 (Prim): {result4}")
    assert result4 == 0, f"Expected 0, got {result4}"

    # Test 5: Two points
    points5 = [[0, 0], [3, 4]]
    result5 = min_cost_connect_points_prim(points5)
    print(f"Test 5 (Prim): {result5}")
    assert result5 == 7, f"Expected 7, got {result5}"

    # Test 6: Optimized Prim
    result6 = min_cost_connect_points_optimized_prim(points1)
    print(f"Test 6 (Optimized Prim): {result6}")
    assert result6 == 20

    print("\nAll tests passed!")
