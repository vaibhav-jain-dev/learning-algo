"""
Dijkstra's Algorithm - Single Source Shortest Path - Python Solution

Find shortest paths from source to all vertices in a weighted graph.

Time Complexity: O((V + E) log V) with binary heap
Space Complexity: O(V + E)
"""

import heapq
from typing import List, Dict, Tuple
from collections import defaultdict


def dijkstra(n: int, edges: List[Tuple[int, int, int]], source: int) -> List[int]:
    """
    Find shortest paths from source to all vertices.

    Args:
        n: Number of vertices (0 to n-1)
        edges: List of (from, to, weight) tuples
        source: Source vertex

    Returns:
        List of shortest distances from source to each vertex
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, w in edges:
        graph[u].append((v, w))

    # Initialize distances
    INF = float('inf')
    dist = [INF] * n
    dist[source] = 0

    # Priority queue: (distance, vertex)
    pq = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)

        # Skip if we've already found a better path
        if d > dist[u]:
            continue

        # Relax all neighbors
        for v, weight in graph[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))

    return dist


def dijkstra_with_path(n: int, edges: List[Tuple[int, int, int]],
                       source: int, target: int) -> Tuple[int, List[int]]:
    """
    Find shortest path from source to target with path reconstruction.

    Returns:
        Tuple of (distance, path) where path is list of vertices
    """
    graph = defaultdict(list)
    for u, v, w in edges:
        graph[u].append((v, w))

    INF = float('inf')
    dist = [INF] * n
    dist[source] = 0
    prev = [-1] * n

    pq = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist[u]:
            continue

        if u == target:
            break

        for v, weight in graph[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                prev[v] = u
                heapq.heappush(pq, (new_dist, v))

    # Reconstruct path
    if dist[target] == INF:
        return -1, []

    path = []
    current = target
    while current != -1:
        path.append(current)
        current = prev[current]
    path.reverse()

    return dist[target], path


def dijkstra_undirected(n: int, edges: List[Tuple[int, int, int]],
                        source: int) -> List[int]:
    """
    Dijkstra's for undirected graphs.
    """
    graph = defaultdict(list)
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w))  # Add reverse edge

    INF = float('inf')
    dist = [INF] * n
    dist[source] = 0

    pq = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist[u]:
            continue

        for v, weight in graph[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))

    return dist


# Test cases
if __name__ == "__main__":
    # Test 1: Basic directed graph
    edges1 = [(0, 1, 4), (0, 2, 1), (1, 3, 1), (2, 1, 2), (2, 3, 5), (3, 4, 3)]
    result1 = dijkstra(5, edges1, 0)
    print(f"Test 1: {result1}")
    assert result1 == [0, 3, 1, 4, 7], f"Expected [0, 3, 1, 4, 7], got {result1}"

    # Test 2: With path reconstruction
    dist2, path2 = dijkstra_with_path(5, edges1, 0, 4)
    print(f"Test 2: Distance={dist2}, Path={path2}")
    assert dist2 == 7, f"Expected distance 7, got {dist2}"
    assert path2 == [0, 2, 1, 3, 4], f"Expected path [0, 2, 1, 3, 4], got {path2}"

    # Test 3: Unreachable vertex
    edges3 = [(0, 1, 1), (1, 2, 1)]
    result3 = dijkstra(4, edges3, 0)
    print(f"Test 3: {result3}")
    assert result3[3] == float('inf'), "Vertex 3 should be unreachable"

    # Test 4: Undirected graph
    edges4 = [(0, 1, 1), (1, 2, 2), (0, 2, 4)]
    result4 = dijkstra_undirected(3, edges4, 0)
    print(f"Test 4: {result4}")
    assert result4 == [0, 1, 3], f"Expected [0, 1, 3], got {result4}"

    # Test 5: Single vertex
    result5 = dijkstra(1, [], 0)
    print(f"Test 5: {result5}")
    assert result5 == [0], f"Expected [0], got {result5}"

    print("\nAll tests passed!")
