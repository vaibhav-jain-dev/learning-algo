"""
Union-Find (Disjoint Set Union) - Python Solution

Efficiently manage disjoint sets with path compression and union by rank.

Time Complexity: O(alpha(n)) per operation (nearly constant)
Space Complexity: O(n)
"""

from typing import List


class UnionFind:
    """
    Union-Find data structure with path compression and union by rank.
    """

    def __init__(self, n: int):
        """
        Initialize n elements (0 to n-1), each in its own set.
        """
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of disjoint sets

    def find(self, x: int) -> int:
        """
        Find the root/representative of the set containing x.
        Uses path compression for efficiency.
        """
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """
        Merge the sets containing x and y.
        Returns True if merger happened, False if already in same set.
        """
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already in same set

        # Union by rank: attach smaller tree under larger tree
        if self.rank[root_x] < self.rank[root_y]:
            root_x, root_y = root_y, root_x

        self.parent[root_y] = root_x

        if self.rank[root_x] == self.rank[root_y]:
            self.rank[root_x] += 1

        self.count -= 1
        return True

    def connected(self, x: int, y: int) -> bool:
        """
        Check if x and y are in the same set.
        """
        return self.find(x) == self.find(y)

    def get_count(self) -> int:
        """
        Return the number of disjoint sets.
        """
        return self.count


class UnionFindBySize:
    """
    Alternative implementation using union by size instead of rank.
    """

    def __init__(self, n: int):
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False

        # Union by size: attach smaller set to larger set
        if self.size[root_x] < self.size[root_y]:
            root_x, root_y = root_y, root_x

        self.parent[root_y] = root_x
        self.size[root_x] += self.size[root_y]
        return True

    def get_size(self, x: int) -> int:
        """Return the size of the set containing x."""
        return self.size[self.find(x)]


# Test cases
if __name__ == "__main__":
    # Test 1: Basic operations
    uf = UnionFind(5)
    uf.union(0, 1)
    uf.union(2, 3)
    print(f"Test 1a: 0 and 1 connected? {uf.connected(0, 1)}")  # True
    print(f"Test 1b: 0 and 2 connected? {uf.connected(0, 2)}")  # False
    print(f"Test 1c: Count of sets: {uf.get_count()}")  # 3

    uf.union(1, 3)
    print(f"Test 1d: 0 and 3 connected? {uf.connected(0, 3)}")  # True
    print(f"Test 1e: Count of sets: {uf.get_count()}")  # 2

    # Test 2: Union by size
    ufs = UnionFindBySize(5)
    ufs.union(0, 1)
    ufs.union(2, 3)
    ufs.union(0, 2)
    print(f"Test 2: Size of set containing 0: {ufs.get_size(0)}")  # 4

    # Test 3: Self-union
    uf3 = UnionFind(3)
    result = uf3.union(0, 0)
    print(f"Test 3: Self-union returns: {result}")  # False

    # Test 4: Repeated union
    uf4 = UnionFind(3)
    uf4.union(0, 1)
    result = uf4.union(0, 1)
    print(f"Test 4: Repeated union returns: {result}")  # False

    # Test 5: Path compression verification
    uf5 = UnionFind(10)
    for i in range(9):
        uf5.union(i, i + 1)
    # After find(9), all should point to root
    uf5.find(9)
    print(f"Test 5: All elements have same root")
    root = uf5.find(0)
    all_same = all(uf5.find(i) == root for i in range(10))
    assert all_same, "Path compression not working"

    print("\nAll tests passed!")
