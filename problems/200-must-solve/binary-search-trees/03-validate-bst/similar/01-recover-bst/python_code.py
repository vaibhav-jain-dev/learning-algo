"""
Recover Binary Search Tree - Python Solutions

Given a BST where exactly two nodes were swapped, recover the tree.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: Inorder Traversal with Recursion
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(h) - recursion stack depth
#
# WHY THIS WORKS:
# - Inorder traversal of valid BST gives sorted sequence
# - Swapped nodes create inversions (prev > curr)
# - Track first and second swapped nodes during traversal
# ============================================================================

class RecoverBSTRecursive:
    """Recover BST using recursive inorder traversal."""

    def __init__(self):
        self.first: Optional[TreeNode] = None   # First swapped node
        self.second: Optional[TreeNode] = None  # Second swapped node
        self.prev: Optional[TreeNode] = None    # Previous node in inorder

    def recover_tree(self, root: Optional[TreeNode]) -> None:
        """
        Recover the BST by finding and swapping the two incorrect nodes.
        Modifies the tree in-place.
        """
        self.first = None
        self.second = None
        self.prev = None

        # Find the two swapped nodes
        self._inorder(root)

        # Swap their values
        if self.first and self.second:
            self.first.val, self.second.val = self.second.val, self.first.val

    def _inorder(self, node: Optional[TreeNode]) -> None:
        """Inorder traversal to find swapped nodes."""
        if not node:
            return

        # Process left subtree
        self._inorder(node.left)

        # Check for inversion (prev.val > curr.val)
        if self.prev and self.prev.val > node.val:
            # Found an inversion
            if self.first is None:
                # First inversion: first = prev, second = curr
                self.first = self.prev
            # Always update second to current (handles both adjacent and non-adjacent cases)
            self.second = node

        self.prev = node

        # Process right subtree
        self._inorder(node.right)


# ============================================================================
# APPROACH 2: Iterative Inorder with Stack
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(h) - explicit stack
#
# WHY THIS WORKS:
# - Same logic as recursive but with explicit stack
# - Easier to reason about for some developers
# - No risk of stack overflow for very deep trees
# ============================================================================

def recover_tree_iterative(root: Optional[TreeNode]) -> None:
    """
    Recover BST using iterative inorder traversal with stack.
    """
    stack = []
    first: Optional[TreeNode] = None
    second: Optional[TreeNode] = None
    prev: Optional[TreeNode] = None
    current = root

    while stack or current:
        # Go to leftmost node
        while current:
            stack.append(current)
            current = current.left

        # Process current node
        current = stack.pop()

        # Check for inversion
        if prev and prev.val > current.val:
            if first is None:
                first = prev
            second = current

        prev = current
        current = current.right

    # Swap the values of the two incorrect nodes
    if first and second:
        first.val, second.val = second.val, first.val


# ============================================================================
# APPROACH 3: Morris Traversal (O(1) Space)
# ============================================================================
# Time Complexity:  O(n) - each edge traversed at most twice
# Space Complexity: O(1) - no additional data structures
#
# WHY THIS IS OPTIMAL:
# - Constant space by threading the tree
# - Tree structure fully restored after traversal
# - Best for memory-constrained environments
# ============================================================================

def recover_tree_morris(root: Optional[TreeNode]) -> None:
    """
    Recover BST using Morris traversal for O(1) space.

    Morris traversal creates temporary threads to traverse without stack.
    """
    first: Optional[TreeNode] = None
    second: Optional[TreeNode] = None
    prev: Optional[TreeNode] = None
    current = root

    while current:
        if current.left is None:
            # No left subtree - process current and go right
            if prev and prev.val > current.val:
                if first is None:
                    first = prev
                second = current
            prev = current
            current = current.right
        else:
            # Find inorder predecessor
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                # Create thread: predecessor.right -> current
                predecessor.right = current
                current = current.left
            else:
                # Thread exists - we've returned from left subtree
                # Remove thread and process current
                predecessor.right = None

                if prev and prev.val > current.val:
                    if first is None:
                        first = prev
                    second = current

                prev = current
                current = current.right

    # Swap the values of the two incorrect nodes
    if first and second:
        first.val, second.val = second.val, first.val


# ============================================================================
# HELPER: Build tree and utilities for testing
# ============================================================================

def build_tree_from_list(values: list) -> Optional[TreeNode]:
    """Build a binary tree from level-order list representation."""
    if not values or values[0] is None:
        return None

    root = TreeNode(values[0])
    queue = [root]
    i = 1

    while queue and i < len(values):
        node = queue.pop(0)

        # Left child
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        # Right child
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root


def inorder_list(root: Optional[TreeNode]) -> list[int]:
    """Get inorder traversal as list."""
    result = []

    def traverse(node):
        if node:
            traverse(node.left)
            result.append(node.val)
            traverse(node.right)

    traverse(root)
    return result


def is_valid_bst(root: Optional[TreeNode], min_val=float('-inf'), max_val=float('inf')) -> bool:
    """Check if tree is a valid BST."""
    if not root:
        return True
    if not (min_val < root.val < max_val):
        return False
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("RECOVER BINARY SEARCH TREE - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        # (input_values, description)
        ([1, 3, None, None, 2], "Example 1: Swap 1 and 3"),
        ([3, 1, 4, None, None, 2], "Example 2: Swap 2 and 3"),
        ([2, 1], "Two nodes: root and left swapped conceptually"),
        ([5, 3, 9, 1, 8, 7, 10], "Larger tree with 7 and 8 swapped"),
    ]

    for values, description in test_cases:
        print(f"\n{description}")
        print(f"Input (level-order): {values}")

        # Test recursive approach
        root1 = build_tree_from_list(values.copy())
        print(f"Before recovery (inorder): {inorder_list(root1)}")

        solver = RecoverBSTRecursive()
        solver.recover_tree(root1)
        print(f"After recursive recovery:  {inorder_list(root1)}")
        print(f"Is valid BST: {is_valid_bst(root1)}")

        # Test iterative approach
        root2 = build_tree_from_list(values.copy())
        recover_tree_iterative(root2)
        print(f"After iterative recovery:  {inorder_list(root2)}")

        # Test Morris approach
        root3 = build_tree_from_list(values.copy())
        recover_tree_morris(root3)
        print(f"After Morris recovery:     {inorder_list(root3)}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
