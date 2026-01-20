"""
Minimum Spanning Tree Verification - Python Solution

Time Complexity: O(E log V)
Space Complexity: O(V + E)
"""

import heapq
from typing import List
from collections import defaultdict


def verify_mst(n: int, graph_edges: List[List[int]],
               proposed_edges: List[List[int]]) -> bool:
    """
    Verify if proposed_edges form a valid MST of the graph.
    """
    # Check if proposed tree has n-1 edges
    if len(proposed_edges) != n - 1:
        return False

    # Check if proposed edges are connected (using Union-Find)
    parent = list(range(n))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        parent[find(x)] = find(y)

    proposed_weight = 0
    for u, v, w in proposed_edges:
        if find(u) == find(v):
            return False  # Would create cycle
        union(u, v)
        proposed_weight += w

    # Check all vertices are connected
    root = find(0)
    for i in range(n):
        if find(i) != root:
            return False

    # Compute actual MST weight using Prim's
    graph = defaultdict(list)
    for u, v, w in graph_edges:
        graph[u].append((v, w))
        graph[v].append((u, w))

    in_mst = [False] * n
    mst_weight = 0
    pq = [(0, 0)]

    while pq:
        weight, vertex = heapq.heappop(pq)
        if in_mst[vertex]:
            continue
        in_mst[vertex] = True
        mst_weight += weight

        for neighbor, edge_weight in graph[vertex]:
            if not in_mst[neighbor]:
                heapq.heappush(pq, (edge_weight, neighbor))

    return proposed_weight == mst_weight


# Test cases
if __name__ == "__main__":
    graph = [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]]
    proposed_valid = [[0,1,1],[0,2,2],[1,3,4]]
    proposed_invalid = [[0,1,1],[1,2,3],[1,3,4]]

    print(f"Test 1: {verify_mst(4, graph, proposed_valid)}")  # Expected: True
    print(f"Test 2: {verify_mst(4, graph, proposed_invalid)}")  # Expected: False

    print("\nAll tests completed!")
