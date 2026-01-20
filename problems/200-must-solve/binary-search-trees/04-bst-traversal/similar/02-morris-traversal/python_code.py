"""
Morris Traversal - Python Solutions

Implement Morris Traversal for O(1) space inorder and preorder traversals.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional, Generator


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# MORRIS INORDER TRAVERSAL
# ============================================================================
# Time Complexity:  O(n) - each edge traversed at most twice
# Space Complexity: O(1) - no stack or recursion
#
# HOW IT WORKS:
# 1. If no left child: output current, go right
# 2. If left child exists:
#    - Find inorder predecessor (rightmost in left subtree)
#    - If predecessor.right is null: create thread to current, go left
#    - If predecessor.right is current: remove thread, output current, go right
# ============================================================================

def morris_inorder(root: Optional[TreeNode]) -> list[int]:
    """
    Morris inorder traversal: O(n) time, O(1) space.

    Creates temporary threads to navigate back up the tree.
    Tree structure is restored after traversal.
    """
    result = []
    current = root

    while current:
        if current.left is None:
            # No left subtree: output current and go right
            result.append(current.val)
            current = current.right
        else:
            # Find inorder predecessor (rightmost node in left subtree)
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                # Create thread: predecessor points back to current
                predecessor.right = current
                current = current.left
            else:
                # Thread exists: we've returned from left subtree
                # Remove thread, output current, go right
                predecessor.right = None
                result.append(current.val)
                current = current.right

    return result


# ============================================================================
# MORRIS PREORDER TRAVERSAL
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# KEY DIFFERENCE FROM INORDER:
# - Output current BEFORE going left (when creating thread)
# - Output current when no left child exists
# ============================================================================

def morris_preorder(root: Optional[TreeNode]) -> list[int]:
    """
    Morris preorder traversal: O(n) time, O(1) space.

    Output happens:
    1. When creating a thread (before going left)
    2. When there's no left child (before going right)
    """
    result = []
    current = root

    while current:
        if current.left is None:
            # No left subtree: output current and go right
            result.append(current.val)
            current = current.right
        else:
            # Find inorder predecessor
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                # Create thread and OUTPUT before going left
                result.append(current.val)
                predecessor.right = current
                current = current.left
            else:
                # Thread exists: we've returned, just remove and go right
                predecessor.right = None
                current = current.right

    return result


# ============================================================================
# MORRIS TRAVERSAL AS GENERATOR (Memory Efficient)
# ============================================================================
# Why use generators:
# - Yields values one at a time
# - Can stop early if needed
# - True O(1) auxiliary space (no result list)
# ============================================================================

def morris_inorder_generator(root: Optional[TreeNode]) -> Generator[int, None, None]:
    """
    Morris inorder as generator - yields values one at a time.

    Use when you want to process values on-the-fly without storing all results.
    """
    current = root

    while current:
        if current.left is None:
            yield current.val
            current = current.right
        else:
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                predecessor.right = current
                current = current.left
            else:
                predecessor.right = None
                yield current.val
                current = current.right


def morris_preorder_generator(root: Optional[TreeNode]) -> Generator[int, None, None]:
    """
    Morris preorder as generator - yields values one at a time.
    """
    current = root

    while current:
        if current.left is None:
            yield current.val
            current = current.right
        else:
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                yield current.val
                predecessor.right = current
                current = current.left
            else:
                predecessor.right = None
                current = current.right


# ============================================================================
# MORRIS TRAVERSAL WITH CALLBACK (Functional Style)
# ============================================================================
# Why use callback:
# - Flexible processing of each node
# - Can count, sum, find, etc. without storing results
# ============================================================================

def morris_inorder_with_callback(
    root: Optional[TreeNode],
    callback: callable
) -> None:
    """
    Morris inorder with callback function.

    Args:
        root: Root of the tree
        callback: Function to call for each node value
    """
    current = root

    while current:
        if current.left is None:
            callback(current.val)
            current = current.right
        else:
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                predecessor.right = current
                current = current.left
            else:
                predecessor.right = None
                callback(current.val)
                current = current.right


# ============================================================================
# PRACTICAL APPLICATION: Find kth Smallest in BST using Morris
# ============================================================================
# Time: O(n) worst case, O(k) average
# Space: O(1)
# ============================================================================

def kth_smallest_morris(root: Optional[TreeNode], k: int) -> int:
    """
    Find kth smallest element in BST using Morris traversal.

    This is O(1) space compared to O(h) for stack-based approach.
    """
    current = root
    count = 0

    while current:
        if current.left is None:
            count += 1
            if count == k:
                return current.val
            current = current.right
        else:
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                predecessor.right = current
                current = current.left
            else:
                predecessor.right = None
                count += 1
                if count == k:
                    return current.val
                current = current.right

    return -1  # k is larger than tree size


# ============================================================================
# PRACTICAL APPLICATION: Validate BST using Morris
# ============================================================================
# Time: O(n)
# Space: O(1)
# ============================================================================

def is_valid_bst_morris(root: Optional[TreeNode]) -> bool:
    """
    Validate BST using Morris traversal.

    Inorder traversal should produce strictly increasing sequence.
    """
    current = root
    prev_val = float('-inf')

    while current:
        if current.left is None:
            if current.val <= prev_val:
                return False
            prev_val = current.val
            current = current.right
        else:
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                predecessor.right = current
                current = current.left
            else:
                predecessor.right = None
                if current.val <= prev_val:
                    return False
                prev_val = current.val
                current = current.right

    return True


# ============================================================================
# HELPER: Build tree from list for testing
# ============================================================================

def build_tree(values: list) -> Optional[TreeNode]:
    """Build binary tree from level-order list."""
    if not values or values[0] is None:
        return None

    from collections import deque

    root = TreeNode(values[0])
    queue = deque([root])
    i = 1

    while queue and i < len(values):
        node = queue.popleft()

        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root


def tree_to_list(root: Optional[TreeNode]) -> list:
    """Convert tree back to level-order list for verification."""
    if not root:
        return []

    from collections import deque

    result = []
    queue = deque([root])

    while queue:
        node = queue.popleft()
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)

    # Remove trailing Nones
    while result and result[-1] is None:
        result.pop()

    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for Morris traversal."""

    print("=" * 70)
    print("MORRIS TRAVERSAL - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        ([4, 2, 6, 1, 3, 5, 7], "Complete BST"),
        ([1, 2, 3, 4, 5, None, 6], "General tree"),
        ([1], "Single node"),
        ([1, 2, None, 3, None, 4], "Left-skewed"),
        ([1, None, 2, None, 3, None, 4], "Right-skewed"),
    ]

    for values, description in test_cases:
        print(f"\n{description}")
        print(f"Tree (level-order): {values}")

        root = build_tree(values)

        # Morris Inorder
        inorder = morris_inorder(root)
        print(f"  Morris Inorder:  {inorder}")

        # Verify tree is restored
        restored = tree_to_list(root)
        tree_ok = "OK" if restored == values else f"MODIFIED: {restored}"
        print(f"  Tree restored: {tree_ok}")

        # Morris Preorder
        root = build_tree(values)  # Rebuild for safety
        preorder = morris_preorder(root)
        print(f"  Morris Preorder: {preorder}")

        # Test generators
        root = build_tree(values)
        gen_inorder = list(morris_inorder_generator(root))
        print(f"  Generator Inorder:  {gen_inorder}")

        root = build_tree(values)
        gen_preorder = list(morris_preorder_generator(root))
        print(f"  Generator Preorder: {gen_preorder}")

        # Test callback
        root = build_tree(values)
        collected = []
        morris_inorder_with_callback(root, lambda x: collected.append(x))
        print(f"  Callback Inorder:   {collected}")

    # Test practical applications
    print("\n" + "-" * 70)
    print("Practical Applications")
    print("-" * 70)

    # kth smallest
    bst = build_tree([5, 3, 7, 2, 4, 6, 8])
    print(f"\nBST: [5, 3, 7, 2, 4, 6, 8]")
    for k in range(1, 8):
        result = kth_smallest_morris(bst, k)
        print(f"  {k}th smallest: {result}")

    # Validate BST
    print("\nBST Validation:")
    valid_bst = build_tree([4, 2, 6, 1, 3, 5, 7])
    print(f"  [4, 2, 6, 1, 3, 5, 7] is valid BST: {is_valid_bst_morris(valid_bst)}")

    invalid_bst = build_tree([4, 2, 6, 1, 8, 5, 7])  # 8 > 4 in left subtree
    print(f"  [4, 2, 6, 1, 8, 5, 7] is valid BST: {is_valid_bst_morris(invalid_bst)}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
