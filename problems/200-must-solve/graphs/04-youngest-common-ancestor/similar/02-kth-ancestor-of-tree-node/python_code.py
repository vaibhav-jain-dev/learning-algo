"""
Kth Ancestor of a Tree Node - Python Solutions

Find the kth ancestor of a node efficiently using Binary Lifting.
Precompute 2^j-th ancestors for efficient query answering.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List
import math


# ============================================================================
# APPROACH 1: Binary Lifting (Optimal)
# ============================================================================
# Time Complexity:  O(n log n) preprocessing, O(log k) per query
# Space Complexity: O(n log n) for ancestor table
#
# WHY THIS IS BEST:
# - Handles large k efficiently
# - Uses binary decomposition of k
# - Precomputation amortizes over many queries
# ============================================================================

class TreeAncestor:
    """
    Binary Lifting solution for kth ancestor queries.

    Key idea: Precompute ancestor[node][j] = 2^j-th ancestor of node
    Any k can be represented as sum of powers of 2.
    """

    def __init__(self, n: int, parent: List[int]):
        """Initialize with binary lifting table."""
        # Number of bits needed (log2(n) + 1)
        self.log = max(1, math.ceil(math.log2(n + 1)))

        # ancestor[node][j] = 2^j-th ancestor of node
        self.ancestor = [[-1] * self.log for _ in range(n)]

        # Base case: 2^0 = 1st ancestor = parent
        for node in range(n):
            self.ancestor[node][0] = parent[node]

        # Fill table: ancestor[node][j] = ancestor[ancestor[node][j-1]][j-1]
        for j in range(1, self.log):
            for node in range(n):
                prev_ancestor = self.ancestor[node][j - 1]
                if prev_ancestor != -1:
                    self.ancestor[node][j] = self.ancestor[prev_ancestor][j - 1]

    def get_kth_ancestor(self, node: int, k: int) -> int:
        """
        Find kth ancestor by jumping through binary representation of k.

        Example: k=5 = 101 in binary = 2^2 + 2^0
        Jump 4 steps, then 1 step.
        """
        for j in range(self.log):
            if k & (1 << j):  # If j-th bit is set
                node = self.ancestor[node][j]
                if node == -1:
                    return -1
        return node


# ============================================================================
# APPROACH 2: Naive Parent Walking (Simple but Slow)
# ============================================================================
# Time Complexity:  O(k) per query
# Space Complexity: O(n) for parent array
#
# EDUCATIONAL VALUE:
# - Shows basic approach
# - Good for understanding problem
# - Too slow for large k
# ============================================================================

class TreeAncestorNaive:
    """Simple parent walking solution."""

    def __init__(self, n: int, parent: List[int]):
        self.parent = parent

    def get_kth_ancestor(self, node: int, k: int) -> int:
        """Walk up k times."""
        current = node
        for _ in range(k):
            if current == -1:
                return -1
            current = self.parent[current]
        return current


# ============================================================================
# APPROACH 3: Binary Lifting with Dictionary (Memory Efficient)
# ============================================================================
# Time Complexity:  O(n log n) preprocessing, O(log k) per query
# Space Complexity: O(n log n) but sparse representation
#
# VARIANT:
# - Uses dictionary for sparse trees
# - Better when many nodes don't have deep ancestors
# ============================================================================

class TreeAncestorSparse:
    """Binary lifting with sparse storage."""

    def __init__(self, n: int, parent: List[int]):
        self.log = max(1, n.bit_length())
        self.ancestor = {}  # (node, j) -> 2^j-th ancestor

        # Base case
        for node in range(n):
            if parent[node] != -1:
                self.ancestor[(node, 0)] = parent[node]

        # Build sparse table
        for j in range(1, self.log):
            for node in range(n):
                prev = self.ancestor.get((node, j - 1))
                if prev is not None:
                    next_anc = self.ancestor.get((prev, j - 1))
                    if next_anc is not None:
                        self.ancestor[(node, j)] = next_anc

    def get_kth_ancestor(self, node: int, k: int) -> int:
        for j in range(self.log):
            if k & (1 << j):
                node = self.ancestor.get((node, j), -1)
                if node == -1:
                    return -1
        return node


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("KTH ANCESTOR OF TREE NODE - TEST RESULTS")
    print("=" * 70)

    # Test case: Tree from example
    # Tree structure:
    #       0
    #      / \
    #     1   2
    #    / \ / \
    #   3  4 5  6
    n = 7
    parent = [-1, 0, 0, 1, 1, 2, 2]

    test_queries = [
        (3, 1, 1, "1st ancestor of 3"),
        (5, 2, 0, "2nd ancestor of 5 (grandparent)"),
        (6, 3, -1, "3rd ancestor of 6 (doesn't exist)"),
        (3, 2, 0, "2nd ancestor of 3"),
        (4, 1, 1, "1st ancestor of 4"),
        (0, 1, -1, "1st ancestor of root"),
    ]

    approaches = [
        ("Binary Lifting", TreeAncestor),
        ("Naive Walking", TreeAncestorNaive),
        ("Sparse Storage", TreeAncestorSparse),
    ]

    for name, AncestorClass in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        ancestor = AncestorClass(n, parent)
        all_passed = True

        for node, k, expected, desc in test_queries:
            result = ancestor.get_kth_ancestor(node, k)
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

    # Example from problem
    print("\nExample:")
    print("  Tree: parent = [-1, 0, 0, 1, 1, 2, 2]")
    print("  Structure:")
    print("        0")
    print("       / \\")
    print("      1   2")
    print("     / \\ / \\")
    print("    3  4 5  6")

    ancestor = TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2])

    print(f"\n  getKthAncestor(3, 1) = {ancestor.get_kth_ancestor(3, 1)}")
    print("    (parent of 3 is 1)")

    print(f"\n  getKthAncestor(5, 2) = {ancestor.get_kth_ancestor(5, 2)}")
    print("    (grandparent of 5 is 0)")

    print(f"\n  getKthAncestor(6, 3) = {ancestor.get_kth_ancestor(6, 3)}")
    print("    (6 only has 2 ancestors, so -1)")

    print("\nAll examples completed!")
