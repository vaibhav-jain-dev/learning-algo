"""
Network Delay via MST - Python Solution

Time Complexity: O(E log V) for MST + O(V) for BFS
Space Complexity: O(V + E)
"""

import heapq
from typing import List, Tuple
from collections import defaultdict, deque


def network_delay_mst(n: int, connections: List[List[int]]) -> Tuple[int, int]:
    """
    Build MST and find maximum depth.

    Returns:
        (MST total weight, maximum depth from node 0)
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v, w in connections:
        graph[u].append((v, w))
        graph[v].append((u, w))

    # Prim's algorithm
    in_mst = [False] * n
    mst_adj = defaultdict(list)  # MST adjacency list
    total_weight = 0

    pq = [(0, 0, -1)]  # (weight, vertex, parent)

    while pq:
        weight, vertex, parent = heapq.heappop(pq)

        if in_mst[vertex]:
            continue

        in_mst[vertex] = True
        total_weight += weight

        if parent != -1:
            mst_adj[parent].append(vertex)
            mst_adj[vertex].append(parent)

        for neighbor, edge_weight in graph[vertex]:
            if not in_mst[neighbor]:
                heapq.heappush(pq, (edge_weight, neighbor, vertex))

    # BFS to find maximum depth from node 0
    depth = [-1] * n
    depth[0] = 0
    queue = deque([0])
    max_depth = 0

    while queue:
        node = queue.popleft()
        for neighbor in mst_adj[node]:
            if depth[neighbor] == -1:
                depth[neighbor] = depth[node] + 1
                max_depth = max(max_depth, depth[neighbor])
                queue.append(neighbor)

    return total_weight, max_depth


# Test cases
if __name__ == "__main__":
    result1 = network_delay_mst(4, [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]])
    print(f"Test 1: MST weight = {result1[0]}, Max depth = {result1[1]}")
    # Expected: MST weight = 7, Max depth = 2

    result2 = network_delay_mst(3, [[0,1,1],[1,2,1]])
    print(f"Test 2: MST weight = {result2[0]}, Max depth = {result2[1]}")
    # Expected: MST weight = 2, Max depth = 2

    print("\nAll tests completed!")
