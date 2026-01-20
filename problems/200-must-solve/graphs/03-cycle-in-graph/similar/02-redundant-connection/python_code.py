"""
Redundant Connection - Python Solutions

Find the edge that creates a cycle in an undirected graph.
The graph started as a tree with one extra edge added.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Union-Find with Path Compression and Union by Rank
# ============================================================================
# Time Complexity:  O(n * alpha(n)) where alpha is inverse Ackermann ~ O(n)
# Space Complexity: O(n) for parent and rank arrays
#
# WHY THIS IS BEST:
# - Nearly constant time per operation
# - Elegantly detects cycles by checking if nodes already connected
# - Standard approach for dynamic connectivity problems
# ============================================================================

class UnionFind:
    """Disjoint Set with path compression and union by rank."""

    def __init__(self, n: int):
        self.parent = list(range(n + 1))  # 1-indexed
        self.rank = [0] * (n + 1)

    def find(self, x: int) -> int:
        """Find root with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """
        Union two sets. Returns False if already in same set (cycle).
        """
        root_x, root_y = self.find(x), self.find(y)

        if root_x == root_y:
            return False  # Already connected - cycle!

        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        return True


def find_redundant_connection(edges: List[List[int]]) -> List[int]:
    """
    Find the edge that creates a cycle using Union-Find.

    Key insight: Process edges in order. The first edge where both
    endpoints are already in the same component creates the cycle.
    Since we want the last such edge, we return the most recent one.
    """
    n = len(edges)
    uf = UnionFind(n)

    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]

    return []  # Should never reach here given problem constraints


# ============================================================================
# APPROACH 2: DFS Cycle Detection (Educational)
# ============================================================================
# Time Complexity:  O(n^2) - DFS for each edge
# Space Complexity: O(n) for adjacency list and visited set
#
# EDUCATIONAL VALUE:
# - Shows how to detect cycles using DFS
# - Builds graph incrementally and checks connectivity
# ============================================================================

def find_redundant_connection_dfs(edges: List[List[int]]) -> List[int]:
    """
    Find redundant edge using DFS to check if path exists.

    For each edge, check if the two nodes are already connected
    before adding the edge. If connected, adding this edge creates a cycle.
    """
    from collections import defaultdict

    graph = defaultdict(set)

    def has_path(source: int, target: int, visited: set) -> bool:
        """Check if path exists from source to target using DFS."""
        if source == target:
            return True

        visited.add(source)
        for neighbor in graph[source]:
            if neighbor not in visited:
                if has_path(neighbor, target, visited):
                    return True
        return False

    for u, v in edges:
        # Check if u and v are already connected
        if graph[u] and graph[v] and has_path(u, v, set()):
            return [u, v]

        # Add edge to graph
        graph[u].add(v)
        graph[v].add(u)

    return []


# ============================================================================
# APPROACH 3: Union-Find (Simpler Implementation)
# ============================================================================
# Time Complexity:  O(n * alpha(n))
# Space Complexity: O(n)
#
# SIMPLER VERSION:
# - No rank optimization (still practical for small n)
# - More readable code
# ============================================================================

def find_redundant_connection_simple(edges: List[List[int]]) -> List[int]:
    """
    Simplified Union-Find without rank optimization.
    """
    n = len(edges)
    parent = list(range(n + 1))

    def find(x: int) -> int:
        if parent[x] != x:
            parent[x] = find(parent[x])  # Path compression
        return parent[x]

    def union(x: int, y: int) -> bool:
        root_x, root_y = find(x), find(y)
        if root_x == root_y:
            return False
        parent[root_x] = root_y
        return True

    for u, v in edges:
        if not union(u, v):
            return [u, v]

    return []


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([[1, 2], [1, 3], [2, 3]], [2, 3], "Triangle"),
        ([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]], [1, 4], "Square with tail"),
        ([[1, 2], [2, 3], [1, 3]], [1, 3], "Simple triangle"),
        ([[1, 2], [1, 3], [1, 4], [3, 4]], [3, 4], "Star with extra edge"),
        ([[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]], [1, 5], "Pentagon"),
    ]

    approaches = [
        ("Union-Find Optimized", find_redundant_connection),
        ("DFS Approach", find_redundant_connection_dfs),
        ("Union-Find Simple", find_redundant_connection_simple),
    ]

    print("=" * 70)
    print("REDUNDANT CONNECTION - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for edges, expected, desc in test_cases:
            result = func([e[:] for e in edges])  # Copy to avoid mutation
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE INPUT EXAMPLES")
    print("=" * 70)

    # Example 1
    print("\nExample 1:")
    edges1 = [[1, 2], [1, 3], [2, 3]]
    print(f"  Input: edges = {edges1}")
    result = find_redundant_connection(edges1)
    print(f"  Output: {result}")
    print("  Explanation: Removing [2,3] leaves a valid tree: 1-2, 1-3")

    # Example 2
    print("\nExample 2:")
    edges2 = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]
    print(f"  Input: edges = {edges2}")
    result = find_redundant_connection(edges2)
    print(f"  Output: {result}")
    print("  Explanation: Removing [1,4] leaves a valid tree")

    print("\nAll examples completed!")
