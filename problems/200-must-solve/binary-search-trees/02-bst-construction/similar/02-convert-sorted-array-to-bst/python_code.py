"""
Convert Sorted Array to BST - Python Solutions

Given a sorted array, create a height-balanced BST.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional
from collections import deque


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


class ListNode:
    """Definition for a linked list node."""
    def __init__(self, val: int = 0, next: 'ListNode' = None):
        self.val = val
        self.next = next


# ============================================================================
# APPROACH 1: Recursive Divide and Conquer (Standard)
# ============================================================================
# Time Complexity:  O(n) - each element processed once
# Space Complexity: O(log n) - recursion stack depth for balanced tree
#
# WHY THIS IS OPTIMAL:
# - Natural recursive structure matches the problem
# - Middle element as root ensures balance
# - Clean and easy to understand
# ============================================================================

def sorted_array_to_bst(nums: list[int]) -> Optional[TreeNode]:
    """
    Convert sorted array to height-balanced BST.

    Key insight: Pick middle element as root, recurse on halves.
    This ensures both subtrees have roughly equal nodes.
    """
    def build(left: int, right: int) -> Optional[TreeNode]:
        if left > right:
            return None

        # Choose middle element as root (left middle for even length)
        mid = (left + right) // 2

        node = TreeNode(nums[mid])
        node.left = build(left, mid - 1)
        node.right = build(mid + 1, right)

        return node

    return build(0, len(nums) - 1)


# ============================================================================
# APPROACH 2: Recursive with Slicing (More Pythonic but Less Efficient)
# ============================================================================
# Time Complexity:  O(n log n) due to slicing
# Space Complexity: O(n log n) due to sliced arrays
#
# NOTE: Less efficient but more readable
# Good for understanding, not for production
# ============================================================================

def sorted_array_to_bst_slice(nums: list[int]) -> Optional[TreeNode]:
    """
    Convert sorted array using Python slicing.

    More readable but creates new arrays at each level.
    """
    if not nums:
        return None

    mid = len(nums) // 2

    node = TreeNode(nums[mid])
    node.left = sorted_array_to_bst_slice(nums[:mid])
    node.right = sorted_array_to_bst_slice(nums[mid + 1:])

    return node


# ============================================================================
# APPROACH 3: Iterative with Stack
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) for stack
#
# WHEN TO USE:
# - Deep trees (avoid recursion limit)
# - When recursion is restricted
# ============================================================================

def sorted_array_to_bst_iterative(nums: list[int]) -> Optional[TreeNode]:
    """
    Convert sorted array using iterative approach with stack.

    Simulates recursion using explicit stack.
    """
    if not nums:
        return None

    # Stack stores: (node, left_idx, right_idx, is_left_child)
    mid = len(nums) // 2
    root = TreeNode(nums[mid])

    # Each tuple: (parent_node, left_idx, right_idx, is_left_child_of_parent)
    stack = [
        (root, 0, mid - 1, True),        # Left subtree
        (root, mid + 1, len(nums) - 1, False)  # Right subtree
    ]

    while stack:
        parent, left, right, is_left = stack.pop()

        if left > right:
            continue

        m = (left + right) // 2
        child = TreeNode(nums[m])

        if is_left:
            parent.left = child
        else:
            parent.right = child

        # Push children ranges
        stack.append((child, left, m - 1, True))
        stack.append((child, m + 1, right, False))

    return root


# ============================================================================
# APPROACH 4: Iterative with Queue (BFS-style construction)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) for queue
#
# ALTERNATIVE ITERATIVE:
# - Uses queue instead of stack
# - Level-order construction
# ============================================================================

def sorted_array_to_bst_queue(nums: list[int]) -> Optional[TreeNode]:
    """
    Convert sorted array using queue for BFS-style construction.
    """
    if not nums:
        return None

    mid = len(nums) // 2
    root = TreeNode(nums[mid])

    # Queue stores: (node, left_idx, right_idx, is_left_child)
    queue = deque([
        (root, 0, mid - 1, True),
        (root, mid + 1, len(nums) - 1, False)
    ])

    while queue:
        parent, left, right, is_left = queue.popleft()

        if left > right:
            continue

        m = (left + right) // 2
        child = TreeNode(nums[m])

        if is_left:
            parent.left = child
        else:
            parent.right = child

        queue.append((child, left, m - 1, True))
        queue.append((child, m + 1, right, False))

    return root


# ============================================================================
# APPROACH 5: From Sorted Linked List (Related Problem)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(log n) for recursion
#
# KEY INSIGHT:
# - Use inorder traversal order
# - Advance linked list pointer as we build
# - Closure captures mutable state
# ============================================================================

def sorted_list_to_bst(head: Optional[ListNode]) -> Optional[TreeNode]:
    """
    Convert sorted linked list to BST.

    Uses inorder simulation: build left, create node, build right.
    The list pointer advances through the list in sorted order.
    """
    # Count nodes
    length = 0
    current = head
    while current:
        length += 1
        current = current.next

    # Use list to hold mutable reference (Python closure workaround)
    current_node = [head]

    def build(left: int, right: int) -> Optional[TreeNode]:
        if left > right:
            return None

        mid = (left + right) // 2

        # Build left subtree first (inorder traversal)
        left_child = build(left, mid - 1)

        # Create node with current list value
        node = TreeNode(current_node[0].val)
        current_node[0] = current_node[0].next

        # Build right subtree
        node.left = left_child
        node.right = build(mid + 1, right)

        return node

    return build(0, length - 1)


# ============================================================================
# APPROACH 6: Using Random Middle (Creates Different Valid Trees)
# ============================================================================

import random

def sorted_array_to_bst_random(nums: list[int]) -> Optional[TreeNode]:
    """
    Creates different valid balanced BSTs by randomizing middle selection.

    For arrays with even length, randomly choose left or right middle.
    """
    def build(left: int, right: int) -> Optional[TreeNode]:
        if left > right:
            return None

        # Randomly choose left or right middle for even-length ranges
        if (right - left) % 2 == 1:  # Even number of elements
            mid = (left + right) // 2 + random.randint(0, 1)
        else:
            mid = (left + right) // 2

        node = TreeNode(nums[mid])
        node.left = build(left, mid - 1)
        node.right = build(mid + 1, right)

        return node

    return build(0, len(nums) - 1)


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_height(root: Optional[TreeNode]) -> int:
    """Get the height of the tree."""
    if not root:
        return 0
    return 1 + max(get_height(root.left), get_height(root.right))


def is_balanced(root: Optional[TreeNode]) -> bool:
    """Check if tree is height-balanced."""
    if not root:
        return True

    left_height = get_height(root.left)
    right_height = get_height(root.right)

    if abs(left_height - right_height) > 1:
        return False

    return is_balanced(root.left) and is_balanced(root.right)


def inorder_traversal(root: Optional[TreeNode]) -> list[int]:
    """Return values in sorted order."""
    result = []

    def inorder(node: Optional[TreeNode]) -> None:
        if not node:
            return
        inorder(node.left)
        result.append(node.val)
        inorder(node.right)

    inorder(root)
    return result


def print_tree(root: Optional[TreeNode], prefix: str = "", is_left: bool = True) -> None:
    """Print tree structure."""
    if not root:
        return

    if root.right:
        print_tree(root.right, prefix + ("    " if is_left else "|   "), False)

    print(prefix + ("\\-- " if is_left else "/-- ") + str(root.val))

    if root.left:
        print_tree(root.left, prefix + ("|   " if is_left else "    "), True)


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("CONVERT SORTED ARRAY TO BST - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        [-10, -3, 0, 5, 9],
        [1, 3],
        [1, 2, 3, 4, 5, 6, 7],
        [1],
        [1, 2, 3, 4, 5],
    ]

    for i, nums in enumerate(test_cases):
        print(f"\n--- Test {i + 1}: nums = {nums} ---")

        # Approach 1: Recursive
        tree1 = sorted_array_to_bst(nums)
        print("\nApproach 1 (Recursive):")
        print_tree(tree1, "", False)
        print(f"Height: {get_height(tree1)}, Balanced: {is_balanced(tree1)}")
        print(f"Inorder: {inorder_traversal(tree1)}")

        # Approach 2: Slicing
        tree2 = sorted_array_to_bst_slice(nums)
        print("\nApproach 2 (Slicing - same result):")
        print(f"Height: {get_height(tree2)}, Balanced: {is_balanced(tree2)}")

        # Approach 3: Iterative
        tree3 = sorted_array_to_bst_iterative(nums)
        print("\nApproach 3 (Iterative):")
        print_tree(tree3, "", False)
        print(f"Height: {get_height(tree3)}, Balanced: {is_balanced(tree3)}")

    # Test sorted linked list to BST
    print("\n" + "=" * 70)
    print("BONUS: Sorted Linked List to BST")
    print("=" * 70)

    # Create linked list: -10 -> -3 -> 0 -> 5 -> 9
    head = ListNode(-10)
    head.next = ListNode(-3)
    head.next.next = ListNode(0)
    head.next.next.next = ListNode(5)
    head.next.next.next.next = ListNode(9)

    print("\nLinked list: -10 -> -3 -> 0 -> 5 -> 9")
    tree_from_list = sorted_list_to_bst(head)
    print("Resulting BST:")
    print_tree(tree_from_list, "", False)
    print(f"Height: {get_height(tree_from_list)}, Balanced: {is_balanced(tree_from_list)}")
    print(f"Inorder: {inorder_traversal(tree_from_list)}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
