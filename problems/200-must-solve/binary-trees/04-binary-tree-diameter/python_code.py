"""
Binary Tree Diameter - Python Solution

Find the length of the longest path between any two nodes in a binary tree.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
"""


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def binary_tree_diameter(root):
    """
    Calculate the diameter of a binary tree.

    Args:
        root: Root of binary tree

    Returns:
        int: The diameter (longest path length in edges)
    """
    max_diameter = [0]  # Use list to allow modification in nested function

    def get_height(node):
        """
        Get height of tree while updating max diameter.

        Returns:
            int: Height of the subtree (number of edges from node to deepest leaf)
        """
        if node is None:
            return 0

        left_height = get_height(node.left)
        right_height = get_height(node.right)

        # Diameter through this node is left_height + right_height
        current_diameter = left_height + right_height
        max_diameter[0] = max(max_diameter[0], current_diameter)

        # Return height (edges to deepest leaf) + 1 for current edge
        return 1 + max(left_height, right_height)

    get_height(root)
    return max_diameter[0]


class TreeInfo:
    """Helper class to store diameter and height information."""

    def __init__(self, diameter, height):
        self.diameter = diameter
        self.height = height


def binary_tree_diameter_v2(root):
    """
    Alternative implementation using a helper class.

    Args:
        root: Root of binary tree

    Returns:
        int: The diameter
    """

    def get_tree_info(node):
        if node is None:
            return TreeInfo(0, 0)

        left_info = get_tree_info(node.left)
        right_info = get_tree_info(node.right)

        # Diameter through this node
        longest_path_through_root = left_info.height + right_info.height

        # Maximum diameter is either through this node or in a subtree
        max_diameter_so_far = max(left_info.diameter, right_info.diameter)
        current_diameter = max(longest_path_through_root, max_diameter_so_far)

        # Height of current subtree
        current_height = 1 + max(left_info.height, right_info.height)

        return TreeInfo(current_diameter, current_height)

    return get_tree_info(root).diameter


# Test cases
if __name__ == "__main__":
    # Build test tree:
    #        1
    #      /   \
    #     3     2
    #    / \
    #   7   4
    #  /     \
    # 8       5
    #          \
    #           6

    root = BinaryTree(1)
    root.left = BinaryTree(3)
    root.right = BinaryTree(2)
    root.left.left = BinaryTree(7)
    root.left.right = BinaryTree(4)
    root.left.left.left = BinaryTree(8)
    root.left.right.right = BinaryTree(5)
    root.left.right.right.right = BinaryTree(6)

    # Test 1: Main example
    result1 = binary_tree_diameter(root)
    print(f"Test 1 (main example): {result1}")
    # Expected: 6 (path: 8 -> 7 -> 3 -> 4 -> 5 -> 6)

    # Test 2: Alternative implementation
    result2 = binary_tree_diameter_v2(root)
    print(f"Test 2 (v2 implementation): {result2}")
    # Expected: 6

    # Test 3: Single node (diameter = 0)
    single = BinaryTree(1)
    result3 = binary_tree_diameter(single)
    print(f"Test 3 (single node): {result3}")
    # Expected: 0

    # Test 4: Empty tree
    result4 = binary_tree_diameter(None)
    print(f"Test 4 (empty tree): {result4}")
    # Expected: 0

    # Test 5: Linear tree (left only)
    linear = BinaryTree(1)
    linear.left = BinaryTree(2)
    linear.left.left = BinaryTree(3)
    linear.left.left.left = BinaryTree(4)
    result5 = binary_tree_diameter(linear)
    print(f"Test 5 (linear tree): {result5}")
    # Expected: 3

    # Test 6: Balanced tree
    #       1
    #      / \
    #     2   3
    #    / \
    #   4   5
    balanced = BinaryTree(1)
    balanced.left = BinaryTree(2)
    balanced.right = BinaryTree(3)
    balanced.left.left = BinaryTree(4)
    balanced.left.right = BinaryTree(5)
    result6 = binary_tree_diameter(balanced)
    print(f"Test 6 (balanced tree): {result6}")
    # Expected: 3 (path: 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3)

    # Test 7: Diameter not through root
    #       1
    #      /
    #     2
    #    / \
    #   3   4
    #  /     \
    # 5       6
    not_through_root = BinaryTree(1)
    not_through_root.left = BinaryTree(2)
    not_through_root.left.left = BinaryTree(3)
    not_through_root.left.right = BinaryTree(4)
    not_through_root.left.left.left = BinaryTree(5)
    not_through_root.left.right.right = BinaryTree(6)
    result7 = binary_tree_diameter(not_through_root)
    print(f"Test 7 (diameter not through root): {result7}")
    # Expected: 4 (path: 5 -> 3 -> 2 -> 4 -> 6)

    print("\nAll tests completed!")
