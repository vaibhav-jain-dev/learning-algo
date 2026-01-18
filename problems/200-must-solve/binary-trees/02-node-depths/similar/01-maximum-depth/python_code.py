"""
Maximum Depth of Binary Tree - Python Solutions

Find the maximum depth (height) of a binary tree.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional
from collections import deque


class BinaryTree:
    """Binary tree node definition."""

    def __init__(self, value: int) -> None:
        self.value = value
        self.left: Optional[BinaryTree] = None
        self.right: Optional[BinaryTree] = None


# ============================================================================
# APPROACH 1: Recursive DFS (Recommended)
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(h) - recursion stack depth
#
# WHY THIS IS BEST:
# - Simplest and most elegant solution
# - Natural recursive tree structure
# - Easy to understand and maintain
# ============================================================================


def max_depth(root: Optional[BinaryTree]) -> int:
    """
    Return the maximum depth of the binary tree.

    Key insight: depth = 1 + max(left_depth, right_depth)

    Visual example:

        3
       / \\
      9  20
        /  \\
       15   7

    Answer: 3
    """
    if root is None:
        return 0

    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)

    return 1 + max(left_depth, right_depth)


# ============================================================================
# APPROACH 2: One-Liner Recursive (Pythonic)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# Same logic, condensed to one line.
# ============================================================================


def max_depth_oneliner(root: Optional[BinaryTree]) -> int:
    """One-liner version using conditional expression."""
    return 0 if root is None else 1 + max(
        max_depth_oneliner(root.left),
        max_depth_oneliner(root.right)
    )


# ============================================================================
# APPROACH 3: BFS Level Counting
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(w) where w is maximum width of tree
#
# WHEN TO USE:
# - When you want to avoid recursion
# - When you need level-order traversal anyway
# ============================================================================


def max_depth_bfs(root: Optional[BinaryTree]) -> int:
    """Use BFS to count levels."""
    if root is None:
        return 0

    depth = 0
    queue: deque[BinaryTree] = deque([root])

    while queue:
        depth += 1
        level_size = len(queue)

        # Process all nodes at current level
        for _ in range(level_size):
            node = queue.popleft()

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return depth


# ============================================================================
# APPROACH 4: Iterative DFS with Stack
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h) for stack
#
# WHEN TO USE:
# - Deep trees where recursion might cause stack overflow
# - When you prefer explicit stack management
# ============================================================================


def max_depth_iterative(root: Optional[BinaryTree]) -> int:
    """Use explicit stack for DFS."""
    if root is None:
        return 0

    max_d = 0
    # Stack stores (node, depth) tuples
    stack: list[tuple[BinaryTree, int]] = [(root, 1)]

    while stack:
        node, depth = stack.pop()
        max_d = max(max_d, depth)

        if node.right:
            stack.append((node.right, depth + 1))
        if node.left:
            stack.append((node.left, depth + 1))

    return max_d


# ============================================================================
# APPROACH 5: Using Reduce (Functional Style)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# Demonstrates functional programming approach.
# ============================================================================

from functools import reduce


def max_depth_reduce(root: Optional[BinaryTree]) -> int:
    """Functional approach using reduce (for demonstration)."""
    if root is None:
        return 0

    # Get all leaf depths using generator
    def leaf_depths(node: BinaryTree, depth: int = 1):
        if node.left is None and node.right is None:
            yield depth
        if node.left:
            yield from leaf_depths(node.left, depth + 1)
        if node.right:
            yield from leaf_depths(node.right, depth + 1)

    return max(leaf_depths(root))


# ============================================================================
# BONUS: Get Depth of Specific Node
# ============================================================================


def get_node_depth(root: Optional[BinaryTree], target: int) -> int:
    """
    Return the depth of a node with the given value.
    Returns -1 if node not found.
    """

    def find(node: Optional[BinaryTree], depth: int) -> int:
        if node is None:
            return -1
        if node.value == target:
            return depth

        left_result = find(node.left, depth + 1)
        if left_result != -1:
            return left_result
        return find(node.right, depth + 1)

    return find(root, 0)


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("MAXIMUM DEPTH OF BINARY TREE - TEST RESULTS")
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

    print("\nTest 1: Standard tree")
    print(f"  Result: {max_depth(root1)}")
    print("  Expected: 3")

    # Test Case 2: Skewed tree
    root2 = BinaryTree(1)
    root2.right = BinaryTree(2)

    print("\nTest 2: Skewed tree (1->2)")
    print(f"  Result: {max_depth(root2)}")
    print("  Expected: 2")

    # Test Case 3: Single node
    root3 = BinaryTree(1)
    print("\nTest 3: Single node")
    print(f"  Result: {max_depth(root3)}")
    print("  Expected: 1")

    # Test Case 4: Empty tree
    print("\nTest 4: Empty tree")
    print(f"  Result: {max_depth(None)}")
    print("  Expected: 0")

    # Test Case 5: Deep linear tree
    root5 = BinaryTree(1)
    root5.left = BinaryTree(2)
    root5.left.left = BinaryTree(3)
    root5.left.left.left = BinaryTree(4)
    print("\nTest 5: Linear tree (depth 4)")
    print(f"  Result: {max_depth(root5)}")
    print("  Expected: 4")

    # Compare approaches
    print("\n" + "=" * 70)
    print("COMPARING APPROACHES")
    print("=" * 70)

    approaches = [
        ("Recursive DFS", max_depth),
        ("One-Liner", max_depth_oneliner),
        ("BFS", max_depth_bfs),
        ("Iterative DFS", max_depth_iterative),
        ("Reduce (Functional)", max_depth_reduce),
    ]

    print("\nUsing standard tree:")
    for name, func in approaches:
        print(f"  {name}: {func(root1)}")

    # Test GetNodeDepth
    print("\n" + "=" * 70)
    print("GET NODE DEPTH")
    print("=" * 70)
    print(f"\nDepth of node 15: {get_node_depth(root1, 15)} (expected: 2)")
    print(f"Depth of node 3:  {get_node_depth(root1, 3)} (expected: 0)")
    print(f"Depth of node 99: {get_node_depth(root1, 99)} (expected: -1)")


if __name__ == "__main__":
    run_tests()
