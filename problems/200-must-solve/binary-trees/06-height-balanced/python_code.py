"""
Height Balanced Binary Tree - Python Solution

Check if a binary tree is height-balanced (height difference of subtrees <= 1 for all nodes).

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
"""


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class TreeInfo:
    """Helper class to store balance status and height."""

    def __init__(self, is_balanced, height):
        self.is_balanced = is_balanced
        self.height = height


def height_balanced_binary_tree(root):
    """
    Check if a binary tree is height-balanced.

    Args:
        root: Root of binary tree

    Returns:
        bool: True if the tree is height-balanced, False otherwise
    """
    return get_tree_info(root).is_balanced


def get_tree_info(node):
    """
    Get balance status and height for a subtree.

    Args:
        node: Root of subtree

    Returns:
        TreeInfo: Contains is_balanced and height
    """
    # Base case: empty tree is balanced with height -1 (or 0 depending on convention)
    if node is None:
        return TreeInfo(True, -1)

    # Get info for left and right subtrees
    left_info = get_tree_info(node.left)
    right_info = get_tree_info(node.right)

    # Check if current node is balanced
    is_balanced = (
        left_info.is_balanced
        and right_info.is_balanced
        and abs(left_info.height - right_info.height) <= 1
    )

    # Height is max of children + 1
    height = max(left_info.height, right_info.height) + 1

    return TreeInfo(is_balanced, height)


def height_balanced_early_exit(root):
    """
    Alternative implementation with early exit optimization.

    Returns -1 for unbalanced subtrees to signal early termination.
    """

    def check_height(node):
        if node is None:
            return 0

        left_height = check_height(node.left)
        if left_height == -1:
            return -1  # Left subtree is unbalanced

        right_height = check_height(node.right)
        if right_height == -1:
            return -1  # Right subtree is unbalanced

        if abs(left_height - right_height) > 1:
            return -1  # Current node is unbalanced

        return max(left_height, right_height) + 1

    return check_height(root) != -1


# Test cases
if __name__ == "__main__":
    # Build balanced test tree:
    #        1
    #      /   \
    #     2     3
    #    / \     \
    #   4   5     6
    #      / \
    #     7   8

    balanced = BinaryTree(1)
    balanced.left = BinaryTree(2)
    balanced.right = BinaryTree(3)
    balanced.left.left = BinaryTree(4)
    balanced.left.right = BinaryTree(5)
    balanced.right.right = BinaryTree(6)
    balanced.left.right.left = BinaryTree(7)
    balanced.left.right.right = BinaryTree(8)

    # Test 1: Balanced tree
    result1 = height_balanced_binary_tree(balanced)
    print(f"Test 1 (balanced tree): {result1}")
    # Expected: True

    # Build unbalanced test tree:
    #        1
    #      /   \
    #     2     3
    #    / \
    #   4   5
    #  /
    # 6

    unbalanced = BinaryTree(1)
    unbalanced.left = BinaryTree(2)
    unbalanced.right = BinaryTree(3)
    unbalanced.left.left = BinaryTree(4)
    unbalanced.left.right = BinaryTree(5)
    unbalanced.left.left.left = BinaryTree(6)

    # Test 2: Unbalanced tree
    result2 = height_balanced_binary_tree(unbalanced)
    print(f"Test 2 (unbalanced tree): {result2}")
    # Expected: False

    # Test 3: Empty tree
    result3 = height_balanced_binary_tree(None)
    print(f"Test 3 (empty tree): {result3}")
    # Expected: True

    # Test 4: Single node
    single = BinaryTree(1)
    result4 = height_balanced_binary_tree(single)
    print(f"Test 4 (single node): {result4}")
    # Expected: True

    # Test 5: Two-level perfect tree
    perfect = BinaryTree(1)
    perfect.left = BinaryTree(2)
    perfect.right = BinaryTree(3)
    result5 = height_balanced_binary_tree(perfect)
    print(f"Test 5 (perfect two-level): {result5}")
    # Expected: True

    # Test 6: Linear tree (worst case)
    linear = BinaryTree(1)
    linear.left = BinaryTree(2)
    linear.left.left = BinaryTree(3)
    result6 = height_balanced_binary_tree(linear)
    print(f"Test 6 (linear tree): {result6}")
    # Expected: False (height diff at root = 2)

    # Test 7: Alternative implementation
    result7 = height_balanced_early_exit(balanced)
    result8 = height_balanced_early_exit(unbalanced)
    print(f"\nTest 7 (early exit - balanced): {result7}")
    print(f"Test 8 (early exit - unbalanced): {result8}")

    # Test 9: Edge case - only right children
    right_only = BinaryTree(1)
    right_only.right = BinaryTree(2)
    result9 = height_balanced_binary_tree(right_only)
    print(f"\nTest 9 (only right child): {result9}")
    # Expected: True (height diff = 1)

    # Test 10: One level deeper on one side (still balanced)
    almost = BinaryTree(1)
    almost.left = BinaryTree(2)
    almost.right = BinaryTree(3)
    almost.left.left = BinaryTree(4)
    result10 = height_balanced_binary_tree(almost)
    print(f"Test 10 (one extra level, still balanced): {result10}")
    # Expected: True

    print("\nAll tests completed!")
