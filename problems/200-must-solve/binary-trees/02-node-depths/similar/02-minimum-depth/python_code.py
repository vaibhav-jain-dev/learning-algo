"""
Minimum Depth of Binary Tree - Python Solutions

Find the minimum depth (shortest path to a leaf) of a binary tree.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional
from collections import deque
import math


class BinaryTree:
    """Binary tree node definition."""

    def __init__(self, value: int) -> None:
        self.value = value
        self.left: Optional[BinaryTree] = None
        self.right: Optional[BinaryTree] = None


# ============================================================================
# APPROACH 1: BFS (Recommended for Min Depth)
# ============================================================================
# Time Complexity:  O(n) worst case, often better
# Space Complexity: O(w) where w is maximum width
#
# WHY THIS IS BEST:
# - Stops as soon as first leaf is found
# - No need to traverse entire tree
# - Most efficient for finding minimum
# ============================================================================


def min_depth(root: Optional[BinaryTree]) -> int:
    """
    Return minimum depth using BFS.

    Key insight: First leaf encountered in BFS is at minimum depth!

    Visual example:

        3
       / \\
      9  20     <- 9 is a leaf at depth 2
        /  \\
       15   7

    Answer: 2 (path: 3 -> 9)
    """
    if root is None:
        return 0

    queue: deque[BinaryTree] = deque([root])
    depth = 0

    while queue:
        depth += 1
        level_size = len(queue)

        for _ in range(level_size):
            node = queue.popleft()

            # Check if it's a leaf - first leaf found is at min depth!
            if node.left is None and node.right is None:
                return depth

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return depth


# ============================================================================
# APPROACH 2: Recursive DFS with Null Check (CAREFUL!)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# CRITICAL: Must handle one-child nodes correctly!
# A node with only one child is NOT a leaf.
# ============================================================================


def min_depth_dfs(root: Optional[BinaryTree]) -> int:
    """
    Return minimum depth using recursive DFS.

    IMPORTANT: A node with only one child is NOT a leaf!
    """
    if root is None:
        return 0

    # If leaf node
    if root.left is None and root.right is None:
        return 1

    # If only right child exists
    if root.left is None:
        return 1 + min_depth_dfs(root.right)

    # If only left child exists
    if root.right is None:
        return 1 + min_depth_dfs(root.left)

    # Both children exist - take minimum
    return 1 + min(min_depth_dfs(root.left), min_depth_dfs(root.right))


# ============================================================================
# APPROACH 3: DFS with Infinity for Missing Children
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# Alternative approach using infinity to handle null children.
# ============================================================================


def min_depth_dfs_inf(root: Optional[BinaryTree]) -> int:
    """DFS approach using infinity for missing children."""
    if root is None:
        return 0

    if root.left is None and root.right is None:
        return 1

    # Use infinity for missing children so they don't affect min
    left = min_depth_dfs_inf(root.left) if root.left else math.inf
    right = min_depth_dfs_inf(root.right) if root.right else math.inf

    return 1 + int(min(left, right))


# ============================================================================
# APPROACH 4: Iterative DFS with Stack
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# WHEN TO USE:
# - When avoiding recursion
# - Must track minimum across all paths
# ============================================================================


def min_depth_iterative(root: Optional[BinaryTree]) -> int:
    """Use stack-based DFS."""
    if root is None:
        return 0

    min_d = float("inf")
    stack: list[tuple[BinaryTree, int]] = [(root, 1)]

    while stack:
        node, depth = stack.pop()

        # Found a leaf
        if node.left is None and node.right is None:
            min_d = min(min_d, depth)
            continue

        # Push children
        if node.right:
            stack.append((node.right, depth + 1))
        if node.left:
            stack.append((node.left, depth + 1))

    return int(min_d)


# ============================================================================
# APPROACH 5: DFS with Early Termination
# ============================================================================
# Time Complexity:  O(n) worst case
# Space Complexity: O(h)
#
# Optimization: Track current minimum and prune branches.
# ============================================================================


def min_depth_optimized(root: Optional[BinaryTree]) -> int:
    """DFS with pruning based on current minimum."""
    if root is None:
        return 0

    current_min = [float("inf")]

    def helper(node: Optional[BinaryTree], depth: int) -> None:
        if node is None:
            return

        # Pruning: no need to go deeper
        if depth >= current_min[0]:
            return

        # Found a leaf
        if node.left is None and node.right is None:
            current_min[0] = depth
            return

        helper(node.left, depth + 1)
        helper(node.right, depth + 1)

    helper(root, 1)
    return int(current_min[0])


# ============================================================================
# WRONG APPROACH (for demonstration)
# ============================================================================


def min_depth_WRONG(root: Optional[BinaryTree]) -> int:
    """
    WRONG approach - DO NOT USE!

    This shows the common mistake of not handling one-child nodes.
    """
    if root is None:
        return 0

    # WRONG: This returns 1 for a node with only one child!
    # Because min(0, something) = 0, then 0 + 1 = 1
    left = min_depth_WRONG(root.left)
    right = min_depth_WRONG(root.right)

    return 1 + min(left, right)  # BUG!


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("MINIMUM DEPTH OF BINARY TREE - TEST RESULTS")
    print("=" * 70)

    # Test Case 1: Standard tree
    #    3
    #   / \
    #  9  20
    #    /  \
    #   15   7
    root1 = BinaryTree(3)
    root1.left = BinaryTree(9)
    root1.right = BinaryTree(20)
    root1.right.left = BinaryTree(15)
    root1.right.right = BinaryTree(7)

    print("\nTest 1: Standard tree (nearest leaf is 9)")
    print(f"  BFS Result:     {min_depth(root1)}")
    print(f"  DFS Result:     {min_depth_dfs(root1)}")
    print("  Expected: 2")

    # Test Case 2: Skewed tree (the tricky case!)
    #    1
    #   /
    #  2
    root2 = BinaryTree(1)
    root2.left = BinaryTree(2)

    print("\nTest 2: Skewed tree (only left child)")
    print(f"  BFS Result:     {min_depth(root2)}")
    print(f"  DFS Result:     {min_depth_dfs(root2)}")
    print(f"  WRONG Approach: {min_depth_WRONG(root2)} (BUG!)")
    print("  Expected: 2 (not 1! Node 1 is not a leaf)")

    # Test Case 3: Long skewed tree
    root3 = BinaryTree(2)
    root3.right = BinaryTree(3)
    root3.right.right = BinaryTree(4)

    print("\nTest 3: Right-skewed tree")
    print(f"  BFS Result: {min_depth(root3)}")
    print("  Expected: 3")

    # Test Case 4: Single node
    root4 = BinaryTree(1)
    print("\nTest 4: Single node")
    print(f"  BFS Result: {min_depth(root4)}")
    print("  Expected: 1")

    # Test Case 5: Empty tree
    print("\nTest 5: Empty tree")
    print(f"  BFS Result: {min_depth(None)}")
    print("  Expected: 0")

    # Test Case 6: Balanced tree
    root6 = BinaryTree(1)
    root6.left = BinaryTree(2)
    root6.right = BinaryTree(3)
    root6.left.left = BinaryTree(4)
    root6.left.right = BinaryTree(5)

    print("\nTest 6: Balanced tree")
    print(f"  BFS Result: {min_depth(root6)}")
    print("  Expected: 2 (leaf 3 at depth 2)")

    # Compare all approaches
    print("\n" + "=" * 70)
    print("COMPARING APPROACHES")
    print("=" * 70)

    approaches = [
        ("BFS", min_depth),
        ("DFS", min_depth_dfs),
        ("DFS (infinity)", min_depth_dfs_inf),
        ("Iterative", min_depth_iterative),
        ("Optimized", min_depth_optimized),
    ]

    print("\nUsing standard tree:")
    for name, func in approaches:
        print(f"  {name}: {func(root1)}")


if __name__ == "__main__":
    run_tests()
