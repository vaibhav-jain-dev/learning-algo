"""
Optimize Water Distribution in a Village - Python Solution

Time Complexity: O((n + E) log(n + E))
Space Complexity: O(n + E)
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


def min_cost_to_supply_water(n: int, wells: List[int], pipes: List[List[int]]) -> int:
    """
    Find minimum cost to supply water to all houses.

    Add virtual node 0 connected to each house with well cost.
    """
    # Create edges: (cost, node1, node2)
    # Virtual node 0 connected to house i with cost wells[i-1]
    edges = []

    for i, cost in enumerate(wells):
        edges.append((cost, 0, i + 1))  # Well at house i+1

    for h1, h2, cost in pipes:
        edges.append((cost, h1, h2))

    # Sort by cost
    edges.sort()

    # Kruskal's algorithm with n+1 nodes (including virtual node)
    uf = UnionFind(n + 1)
    total_cost = 0
    edges_used = 0

    for cost, u, v in edges:
        if uf.union(u, v):
            total_cost += cost
            edges_used += 1
            if edges_used == n:  # n edges needed to connect n+1 nodes
                break

    return total_cost


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {min_cost_to_supply_water(3, [1,2,2], [[1,2,1],[2,3,1]])}")  # Expected: 3
    print(f"Test 2: {min_cost_to_supply_water(2, [1,1], [[1,2,1]])}")  # Expected: 2
    print("\nAll tests completed!")
