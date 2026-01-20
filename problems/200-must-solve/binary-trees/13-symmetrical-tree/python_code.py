"""
Symmetrical Tree - Python Solution

Check if a binary tree is symmetric (mirror of itself).

Time Complexity: O(n)
Space Complexity: O(h) for recursive, O(n) for iterative
"""

from collections import deque


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def symmetrical_tree(root):
    """
    Check if a binary tree is symmetric.

    Args:
        root: Root of binary tree

    Returns:
        bool: True if tree is symmetric
    """
    if root is None:
        return True

    return is_mirror(root.left, root.right)


def is_mirror(left, right):
    """
    Check if two subtrees are mirror images of each other.

    Args:
        left: Root of left subtree
        right: Root of right subtree

    Returns:
        bool: True if subtrees are mirrors
    """
    # Both null - symmetric
    if left is None and right is None:
        return True

    # One null, one not - not symmetric
    if left is None or right is None:
        return False

    # Values must match, and children must be mirrored
    return (
        left.value == right.value
        and is_mirror(left.left, right.right)
        and is_mirror(left.right, right.left)
    )


def symmetrical_tree_iterative(root):
    """
    Iterative approach using a queue.

    Args:
        root: Root of binary tree

    Returns:
        bool: True if tree is symmetric
    """
    if root is None:
        return True

    queue = deque([(root.left, root.right)])

    while queue:
        left, right = queue.popleft()

        # Both null - continue checking other pairs
        if left is None and right is None:
            continue

        # One null or values differ - not symmetric
        if left is None or right is None:
            return False

        if left.value != right.value:
            return False

        # Add children in mirrored order
        queue.append((left.left, right.right))
        queue.append((left.right, right.left))

    return True


def symmetrical_tree_level_check(root):
    """
    Alternative: Check if each level forms a palindrome.

    Args:
        root: Root of binary tree

    Returns:
        bool: True if tree is symmetric
    """
    if root is None:
        return True

    queue = deque([root])

    while queue:
        level_size = len(queue)
        level_values = []

        for _ in range(level_size):
            node = queue.popleft()

            if node is None:
                level_values.append(None)
            else:
                level_values.append(node.value)
                queue.append(node.left)
                queue.append(node.right)

        # Check if level is palindrome
        if level_values != level_values[::-1]:
            return False

        # Check if all None (we're done)
        if all(v is None for v in level_values):
            break

    return True


# Test cases
if __name__ == "__main__":
    # Build symmetric tree:
    #        1
    #      /   \
    #     2     2
    #    / \   / \
    #   3   4 4   3

    symmetric = BinaryTree(1)
    symmetric.left = BinaryTree(2)
    symmetric.right = BinaryTree(2)
    symmetric.left.left = BinaryTree(3)
    symmetric.left.right = BinaryTree(4)
    symmetric.right.left = BinaryTree(4)
    symmetric.right.right = BinaryTree(3)

    # Test 1: Symmetric tree (recursive)
    result1 = symmetrical_tree(symmetric)
    print(f"Test 1 (symmetric tree, recursive): {result1}")
    # Expected: True

    # Test 2: Symmetric tree (iterative)
    result2 = symmetrical_tree_iterative(symmetric)
    print(f"Test 2 (symmetric tree, iterative): {result2}")
    # Expected: True

    # Build non-symmetric tree:
    #        1
    #      /   \
    #     2     2
    #      \     \
    #       3     3

    non_symmetric = BinaryTree(1)
    non_symmetric.left = BinaryTree(2)
    non_symmetric.right = BinaryTree(2)
    non_symmetric.left.right = BinaryTree(3)
    non_symmetric.right.right = BinaryTree(3)

    # Test 3: Non-symmetric tree
    result3 = symmetrical_tree(non_symmetric)
    print(f"\nTest 3 (non-symmetric tree): {result3}")
    # Expected: False

    # Test 4: Single node
    single = BinaryTree(1)
    result4 = symmetrical_tree(single)
    print(f"\nTest 4 (single node): {result4}")
    # Expected: True

    # Test 5: Empty tree
    result5 = symmetrical_tree(None)
    print(f"Test 5 (empty tree): {result5}")
    # Expected: True

    # Test 6: Two-level symmetric
    two_level = BinaryTree(1)
    two_level.left = BinaryTree(2)
    two_level.right = BinaryTree(2)
    result6 = symmetrical_tree(two_level)
    print(f"\nTest 6 (two-level symmetric): {result6}")
    # Expected: True

    # Test 7: Different values
    diff_values = BinaryTree(1)
    diff_values.left = BinaryTree(2)
    diff_values.right = BinaryTree(3)
    result7 = symmetrical_tree(diff_values)
    print(f"Test 7 (different values): {result7}")
    # Expected: False

    # Test 8: Level check approach
    result8 = symmetrical_tree_level_check(symmetric)
    result9 = symmetrical_tree_level_check(non_symmetric)
    print(f"\nTest 8 (level check - symmetric): {result8}")
    print(f"Test 9 (level check - non-symmetric): {result9}")

    # Test 10: Deeper symmetric tree
    #          1
    #        /   \
    #       2     2
    #      / \   / \
    #     3   4 4   3
    #    /         \
    #   5           5

    deeper = BinaryTree(1)
    deeper.left = BinaryTree(2)
    deeper.right = BinaryTree(2)
    deeper.left.left = BinaryTree(3)
    deeper.left.right = BinaryTree(4)
    deeper.right.left = BinaryTree(4)
    deeper.right.right = BinaryTree(3)
    deeper.left.left.left = BinaryTree(5)
    deeper.right.right.right = BinaryTree(5)

    result10 = symmetrical_tree(deeper)
    print(f"\nTest 10 (deeper symmetric): {result10}")
    # Expected: True

    # Test 11: Only left subtree
    left_only = BinaryTree(1)
    left_only.left = BinaryTree(2)
    result11 = symmetrical_tree(left_only)
    print(f"Test 11 (only left subtree): {result11}")
    # Expected: False

    print("\nAll tests completed!")
