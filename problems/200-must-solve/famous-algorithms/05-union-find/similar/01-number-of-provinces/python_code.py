"""
Number of Provinces - Python Solution

Time Complexity: O(n^2 * alpha(n))
Space Complexity: O(n)
"""

from typing import List


class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        self.count -= 1


def find_circle_num(is_connected: List[List[int]]) -> int:
    """
    Find the number of provinces (connected components).
    """
    n = len(is_connected)
    uf = UnionFind(n)

    for i in range(n):
        for j in range(i + 1, n):
            if is_connected[i][j] == 1:
                uf.union(i, j)

    return uf.count


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {find_circle_num([[1,1,0],[1,1,0],[0,0,1]])}")  # Expected: 2
    print(f"Test 2: {find_circle_num([[1,0,0],[0,1,0],[0,0,1]])}")  # Expected: 3
    print(f"Test 3: {find_circle_num([[1,1,1],[1,1,1],[1,1,1]])}")  # Expected: 1
    print("\nAll tests completed!")
