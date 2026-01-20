"""
Redundant Connection - Python Solution

Time Complexity: O(n * alpha(n))
Space Complexity: O(n)
"""

from typing import List


class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n + 1))
        self.rank = [0] * (n + 1)

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already connected - this is the redundant edge
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True


def find_redundant_connection(edges: List[List[int]]) -> List[int]:
    """
    Find the edge that creates a cycle.
    """
    n = len(edges)
    uf = UnionFind(n)

    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]

    return []


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {find_redundant_connection([[1,2],[1,3],[2,3]])}")  # Expected: [2,3]
    print(f"Test 2: {find_redundant_connection([[1,2],[2,3],[3,4],[1,4],[1,5]])}")  # Expected: [1,4]
    print("\nAll tests completed!")
