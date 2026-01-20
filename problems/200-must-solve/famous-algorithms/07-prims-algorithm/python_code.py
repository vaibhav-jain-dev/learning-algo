"""
Prim's Algorithm - Minimum Spanning Tree - Python Solution

Find the minimum spanning tree using Prim's algorithm (greedy vertex-based approach).

Time Complexity: O((V + E) log V)
Space Complexity: O(V + E)
"""

import heapq
from typing import List, Tuple
from collections import defaultdict


def prim_mst(v: int, edges: List[Tuple[int, int, int]]) -> Tuple[List[Tuple[int, int, int]], int]:
    """
    Find minimum spanning tree using Prim's algorithm.

    Args:
        v: Number of vertices (0 to v-1)
        edges: List of (u, v, weight) tuples

    Returns:
        Tuple of (MST edges, total weight)
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, w, weight in edges:
        graph[u].append((w, weight))
        graph[w].append((u, weight))  # Undirected graph

    # Track vertices in MST
    in_mst = [False] * v
    mst_edges = []
    total_weight = 0

    # Priority queue: (weight, vertex, parent)
    # Start from vertex 0
    pq = [(0, 0, -1)]

    while pq and len(mst_edges) < v - 1:
        weight, vertex, parent = heapq.heappop(pq)

        if in_mst[vertex]:
            continue

        in_mst[vertex] = True

        if parent != -1:
            mst_edges.append((parent, vertex, weight))
            total_weight += weight

        # Add all edges to non-MST vertices
        for neighbor, edge_weight in graph[vertex]:
            if not in_mst[neighbor]:
                heapq.heappush(pq, (edge_weight, neighbor, vertex))

    return mst_edges, total_weight


def prim_mst_weight_only(v: int, edges: List[Tuple[int, int, int]]) -> int:
    """
    Return only the total weight of the MST.
    """
    _, total_weight = prim_mst(v, edges)
    return total_weight


def prim_mst_dense(adj_matrix: List[List[int]]) -> int:
    """
    Prim's algorithm for dense graphs using adjacency matrix.
    O(V^2) - better for dense graphs than heap-based approach.
    """
    v = len(adj_matrix)
    INF = float('inf')

    in_mst = [False] * v
    key = [INF] * v  # Minimum weight edge to connect vertex to MST
    key[0] = 0

    total_weight = 0

    for _ in range(v):
        # Find minimum key vertex not in MST
        min_key = INF
        min_vertex = -1
        for i in range(v):
            if not in_mst[i] and key[i] < min_key:
                min_key = key[i]
                min_vertex = i

        if min_vertex == -1:
            break

        in_mst[min_vertex] = True
        total_weight += key[min_vertex]

        # Update keys of adjacent vertices
        for j in range(v):
            if (adj_matrix[min_vertex][j] > 0 and
                    not in_mst[j] and
                    adj_matrix[min_vertex][j] < key[j]):
                key[j] = adj_matrix[min_vertex][j]

    return total_weight


# Test cases
if __name__ == "__main__":
    # Test 1: Basic MST
    edges1 = [(0, 1, 2), (0, 3, 6), (1, 2, 3), (1, 3, 8), (1, 4, 5), (2, 4, 7), (3, 4, 9)]
    mst1, weight1 = prim_mst(5, edges1)
    print(f"Test 1: MST edges = {mst1}, Total weight = {weight1}")
    assert weight1 == 16, f"Expected 16, got {weight1}"

    # Test 2: Simple triangle
    edges2 = [(0, 1, 1), (1, 2, 2), (0, 2, 3)]
    mst2, weight2 = prim_mst(3, edges2)
    print(f"Test 2: MST edges = {mst2}, Total weight = {weight2}")
    assert weight2 == 3, f"Expected 3, got {weight2}"

    # Test 3: Linear graph
    edges3 = [(0, 1, 5), (1, 2, 3), (2, 3, 4)]
    mst3, weight3 = prim_mst(4, edges3)
    print(f"Test 3: MST edges = {mst3}, Total weight = {weight3}")
    assert weight3 == 12, f"Expected 12, got {weight3}"

    # Test 4: Dense graph using adjacency matrix
    adj_matrix = [
        [0, 2, 0, 6, 0],
        [2, 0, 3, 8, 5],
        [0, 3, 0, 0, 7],
        [6, 8, 0, 0, 9],
        [0, 5, 7, 9, 0]
    ]
    weight4 = prim_mst_dense(adj_matrix)
    print(f"Test 4: Dense graph MST weight = {weight4}")
    assert weight4 == 16, f"Expected 16, got {weight4}"

    # Test 5: Compare with Kruskal's result
    edges5 = [(0, 1, 10), (0, 2, 6), (0, 3, 5), (1, 3, 15), (2, 3, 4)]
    mst5, weight5 = prim_mst(4, edges5)
    print(f"Test 5: MST weight = {weight5}")
    assert weight5 == 19, f"Expected 19, got {weight5}"

    print("\nAll tests passed!")
