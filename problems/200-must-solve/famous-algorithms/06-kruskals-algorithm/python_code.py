"""
Kruskal's Algorithm - Minimum Spanning Tree - Python Solution

Find the minimum spanning tree of a connected, undirected, weighted graph.

Time Complexity: O(E log E)
Space Complexity: O(V)
"""

from typing import List, Tuple


class UnionFind:
    """Union-Find with path compression and union by rank."""

    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already connected

        if self.rank[root_x] < self.rank[root_y]:
            root_x, root_y = root_y, root_x

        self.parent[root_y] = root_x

        if self.rank[root_x] == self.rank[root_y]:
            self.rank[root_x] += 1

        return True


def kruskal_mst(v: int, edges: List[Tuple[int, int, int]]) -> Tuple[List[Tuple[int, int, int]], int]:
    """
    Find minimum spanning tree using Kruskal's algorithm.

    Args:
        v: Number of vertices (0 to v-1)
        edges: List of (u, v, weight) tuples

    Returns:
        Tuple of (MST edges, total weight)
    """
    # Sort edges by weight
    sorted_edges = sorted(edges, key=lambda x: x[2])

    uf = UnionFind(v)
    mst = []
    total_weight = 0

    for u, w, weight in sorted_edges:
        if uf.union(u, w):
            mst.append((u, w, weight))
            total_weight += weight

            # MST has exactly V-1 edges
            if len(mst) == v - 1:
                break

    return mst, total_weight


def min_spanning_tree_weight(v: int, edges: List[Tuple[int, int, int]]) -> int:
    """
    Return only the total weight of the MST.
    """
    _, total_weight = kruskal_mst(v, edges)
    return total_weight


def is_connected(v: int, edges: List[Tuple[int, int, int]]) -> bool:
    """
    Check if the graph is connected (MST exists).
    """
    mst, _ = kruskal_mst(v, edges)
    return len(mst) == v - 1


# Test cases
if __name__ == "__main__":
    # Test 1: Basic MST
    edges1 = [(0, 1, 10), (0, 2, 6), (0, 3, 5), (1, 3, 15), (2, 3, 4)]
    mst1, weight1 = kruskal_mst(4, edges1)
    print(f"Test 1: MST edges = {mst1}, Total weight = {weight1}")
    assert weight1 == 19, f"Expected 19, got {weight1}"

    # Test 2: Simple triangle
    edges2 = [(0, 1, 1), (1, 2, 2), (0, 2, 3)]
    mst2, weight2 = kruskal_mst(3, edges2)
    print(f"Test 2: MST edges = {mst2}, Total weight = {weight2}")
    assert weight2 == 3, f"Expected 3, got {weight2}"

    # Test 3: Linear graph
    edges3 = [(0, 1, 5), (1, 2, 3), (2, 3, 4)]
    mst3, weight3 = kruskal_mst(4, edges3)
    print(f"Test 3: MST edges = {mst3}, Total weight = {weight3}")
    assert weight3 == 12, f"Expected 12, got {weight3}"

    # Test 4: Two vertices
    edges4 = [(0, 1, 7)]
    mst4, weight4 = kruskal_mst(2, edges4)
    print(f"Test 4: MST edges = {mst4}, Total weight = {weight4}")
    assert weight4 == 7, f"Expected 7, got {weight4}"

    # Test 5: Complete graph K4
    edges5 = [(0, 1, 1), (0, 2, 2), (0, 3, 3), (1, 2, 4), (1, 3, 5), (2, 3, 6)]
    mst5, weight5 = kruskal_mst(4, edges5)
    print(f"Test 5: MST edges = {mst5}, Total weight = {weight5}")
    assert weight5 == 6, f"Expected 6, got {weight5}"  # 1 + 2 + 3

    print("\nAll tests passed!")
