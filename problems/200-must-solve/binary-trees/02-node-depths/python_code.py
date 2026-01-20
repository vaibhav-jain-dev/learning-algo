"""
Node Depths - Python Solution

Calculate the sum of all node depths in a binary tree.

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree
"""

from __future__ import annotations
from typing import Optional
from collections import deque


class BinaryTree:
    """Binary tree node with value and left/right children."""

    def __init__(self, value: int) -> None:
        self.value = value
        self.left: Optional[BinaryTree] = None
        self.right: Optional[BinaryTree] = None


def node_depths(root: Optional[BinaryTree], depth: int = 0) -> int:
    """
    Calculate sum of all node depths using recursion.

    Args:
        root: Root node of the binary tree
        depth: Current depth (default 0 for root)

    Returns:
        Sum of all node depths in the tree
    """
    if root is None:
        return 0

    return depth + node_depths(root.left, depth + 1) + node_depths(root.right, depth + 1)


def node_depths_iterative_dfs(root: Optional[BinaryTree]) -> int:
    """
    Calculate sum of all node depths using iterative DFS with stack.

    Args:
        root: Root node of the binary tree

    Returns:
        Sum of all node depths in the tree
    """
    if root is None:
        return 0

    total_depth = 0
    stack = [(root, 0)]  # (node, depth) pairs

    while stack:
        node, depth = stack.pop()
        total_depth += depth

        if node.left is not None:
            stack.append((node.left, depth + 1))
        if node.right is not None:
            stack.append((node.right, depth + 1))

    return total_depth


def node_depths_iterative_bfs(root: Optional[BinaryTree]) -> int:
    """
    Calculate sum of all node depths using iterative BFS with queue.

    Args:
        root: Root node of the binary tree

    Returns:
        Sum of all node depths in the tree
    """
    if root is None:
        return 0

    total_depth = 0
    queue = deque([(root, 0)])  # (node, depth) pairs

    while queue:
        node, depth = queue.popleft()
        total_depth += depth

        if node.left is not None:
            queue.append((node.left, depth + 1))
        if node.right is not None:
            queue.append((node.right, depth + 1))

    return total_depth


def build_tree_from_list(values: list[Optional[int]]) -> Optional[BinaryTree]:
    """
    Build a binary tree from a level-order list representation.

    Args:
        values: List of values in level order, None for missing nodes

    Returns:
        Root of the constructed binary tree
    """
    if not values or values[0] is None:
        return None

    root = BinaryTree(values[0])
    queue = deque([root])
    idx = 1

    while queue and idx < len(values):
        node = queue.popleft()

        if idx < len(values) and values[idx] is not None:
            node.left = BinaryTree(values[idx])
            queue.append(node.left)
        idx += 1

        if idx < len(values) and values[idx] is not None:
            node.right = BinaryTree(values[idx])
            queue.append(node.right)
        idx += 1

    return root


# Test cases
if __name__ == "__main__":
    # Test 1: Example tree from problem
    #         1
    #        / \
    #       2   3
    #      / \ / \
    #     4  5 6  7
    #    / \
    #   8   9
    root1 = BinaryTree(1)
    root1.left = BinaryTree(2)
    root1.right = BinaryTree(3)
    root1.left.left = BinaryTree(4)
    root1.left.right = BinaryTree(5)
    root1.right.left = BinaryTree(6)
    root1.right.right = BinaryTree(7)
    root1.left.left.left = BinaryTree(8)
    root1.left.left.right = BinaryTree(9)

    result1_recursive = node_depths(root1)
    result1_dfs = node_depths_iterative_dfs(root1)
    result1_bfs = node_depths_iterative_bfs(root1)
    print(f"Test 1 (Recursive): {result1_recursive}")  # Expected: 16
    print(f"Test 1 (DFS): {result1_dfs}")  # Expected: 16
    print(f"Test 1 (BFS): {result1_bfs}")  # Expected: 16
    assert result1_recursive == 16
    assert result1_dfs == 16
    assert result1_bfs == 16

    # Test 2: Linear tree (left-skewed)
    #     1
    #    /
    #   2
    #  /
    # 3
    root2 = BinaryTree(1)
    root2.left = BinaryTree(2)
    root2.left.left = BinaryTree(3)

    result2 = node_depths(root2)
    print(f"Test 2 (Linear tree): {result2}")  # Expected: 0 + 1 + 2 = 3
    assert result2 == 3

    # Test 3: Single node
    root3 = BinaryTree(1)
    result3 = node_depths(root3)
    print(f"Test 3 (Single node): {result3}")  # Expected: 0
    assert result3 == 0

    # Test 4: Empty tree
    result4 = node_depths(None)
    print(f"Test 4 (Empty tree): {result4}")  # Expected: 0
    assert result4 == 0

    # Test 5: Perfect binary tree with 3 levels
    #       1
    #      / \
    #     2   3
    #    /\ / \
    #   4 5 6  7
    root5 = build_tree_from_list([1, 2, 3, 4, 5, 6, 7])
    result5 = node_depths(root5)
    print(f"Test 5 (Perfect binary tree): {result5}")  # Expected: 0 + 1 + 1 + 2 + 2 + 2 + 2 = 10
    assert result5 == 10

    # Test 6: Right-skewed tree
    root6 = BinaryTree(1)
    root6.right = BinaryTree(2)
    root6.right.right = BinaryTree(3)
    root6.right.right.right = BinaryTree(4)

    result6 = node_depths(root6)
    print(f"Test 6 (Right-skewed): {result6}")  # Expected: 0 + 1 + 2 + 3 = 6
    assert result6 == 6

    print("\nAll tests passed!")
