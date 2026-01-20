"""
Connecting Cities With Minimum Cost - Python Solution

Time Complexity: O(E log E)
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
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True


def minimum_cost(n: int, connections: List[List[int]]) -> int:
    """
    Find minimum cost to connect all cities.
    """
    # Sort by cost
    connections.sort(key=lambda x: x[2])

    uf = UnionFind(n)
    total_cost = 0
    edges_used = 0

    for city1, city2, cost in connections:
        if uf.union(city1, city2):
            total_cost += cost
            edges_used += 1
            if edges_used == n - 1:
                return total_cost

    return -1  # Not all cities can be connected


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {minimum_cost(3, [[1,2,5],[1,3,6],[2,3,1]])}")  # Expected: 6
    print(f"Test 2: {minimum_cost(4, [[1,2,3],[3,4,4]])}")  # Expected: -1
    print(f"Test 3: {minimum_cost(4, [[1,2,1],[1,3,2],[3,4,3],[2,4,4]])}")  # Expected: 6
    print("\nAll tests completed!")
