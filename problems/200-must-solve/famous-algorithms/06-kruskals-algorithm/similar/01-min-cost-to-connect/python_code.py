"""
Min Cost to Connect All Points - Python Solution

Time Complexity: O(n^2 log n)
Space Complexity: O(n^2)
"""

from typing import List


class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True


def min_cost_connect_points(points: List[List[int]]) -> int:
    """
    Find minimum cost to connect all points.
    """
    n = len(points)
    if n <= 1:
        return 0

    # Generate all edges with Manhattan distance
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
            edges.append((dist, i, j))

    # Sort by distance
    edges.sort()

    # Kruskal's algorithm
    uf = UnionFind(n)
    total_cost = 0
    edges_used = 0

    for dist, u, v in edges:
        if uf.union(u, v):
            total_cost += dist
            edges_used += 1
            if edges_used == n - 1:
                break

    return total_cost


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {min_cost_connect_points([[0,0],[2,2],[3,10],[5,2],[7,0]])}")  # Expected: 20
    print(f"Test 2: {min_cost_connect_points([[3,12],[-2,5],[-4,1]])}")  # Expected: 18
    print(f"Test 3: {min_cost_connect_points([[0,0]])}")  # Expected: 0
    print("\nAll tests completed!")
