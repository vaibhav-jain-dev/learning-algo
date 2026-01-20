"""
Invert Binary Tree - Python Solution

Swap every left node with its corresponding right node in a binary tree.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack, O(n) for iterative with queue
"""

from collections import deque


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def invert_binary_tree(root):
    """
    Invert a binary tree by swapping left and right children recursively.

    Args:
        root: Root of binary tree

    Returns:
        BinaryTree: Root of inverted tree
    """
    if root is None:
        return None

    # Swap left and right children
    root.left, root.right = root.right, root.left

    # Recursively invert subtrees
    invert_binary_tree(root.left)
    invert_binary_tree(root.right)

    return root


def invert_binary_tree_iterative(root):
    """
    Iterative approach using BFS with a queue.

    Args:
        root: Root of binary tree

    Returns:
        BinaryTree: Root of inverted tree
    """
    if root is None:
        return None

    queue = deque([root])

    while queue:
        node = queue.popleft()

        # Swap children
        node.left, node.right = node.right, node.left

        # Add children to queue for processing
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)

    return root


def print_tree_inorder(node, result=None):
    """Helper function to print tree in-order for verification."""
    if result is None:
        result = []
    if node:
        print_tree_inorder(node.left, result)
        result.append(node.value)
        print_tree_inorder(node.right, result)
    return result


def print_tree_level_order(root):
    """Helper function to print tree level by level."""
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level = []
        level_size = len(queue)
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.value)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)

    return result


# Test cases
if __name__ == "__main__":
    # Build test tree:
    #        1
    #      /   \
    #     2     3
    #    / \   / \
    #   4   5 6   7
    #  / \
    # 8   9

    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    root.left.left = BinaryTree(4)
    root.left.right = BinaryTree(5)
    root.right.left = BinaryTree(6)
    root.right.right = BinaryTree(7)
    root.left.left.left = BinaryTree(8)
    root.left.left.right = BinaryTree(9)

    print("Original tree (level order):")
    print(print_tree_level_order(root))
    # Expected: [[1], [2, 3], [4, 5, 6, 7], [8, 9]]

    # Test 1: Recursive inversion
    invert_binary_tree(root)
    print("\nAfter inversion (level order):")
    print(print_tree_level_order(root))
    # Expected: [[1], [3, 2], [7, 6, 5, 4], [9, 8]]

    # Test 2: Invert back using iterative
    invert_binary_tree_iterative(root)
    print("\nAfter second inversion (back to original):")
    print(print_tree_level_order(root))

    # Test 3: Single node
    single = BinaryTree(5)
    invert_binary_tree(single)
    print(f"\nSingle node: {print_tree_level_order(single)}")
    # Expected: [[5]]

    # Test 4: Empty tree
    result = invert_binary_tree(None)
    print(f"Empty tree: {result}")
    # Expected: None

    # Test 5: Two-level tree
    small = BinaryTree(1)
    small.left = BinaryTree(2)
    small.right = BinaryTree(3)
    print(f"\nSmall tree before: {print_tree_level_order(small)}")
    invert_binary_tree(small)
    print(f"Small tree after: {print_tree_level_order(small)}")
    # Expected: [[1], [3, 2]]

    print("\nAll tests completed!")
