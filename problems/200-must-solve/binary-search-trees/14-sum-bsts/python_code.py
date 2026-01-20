"""
Sum BSTs - Python Solution

Find the sum of all BST subtrees in a binary tree.
Uses post-order traversal to validate BSTs and accumulate sums.

Time Complexity: O(n)
Space Complexity: O(h) where h is tree height
"""

from typing import Optional, Tuple, List
import math


class TreeNode:
    def __init__(self, val: int = 0):
        self.val = val
        self.left: Optional[TreeNode] = None
        self.right: Optional[TreeNode] = None


def sum_bsts(root: Optional[TreeNode]) -> int:
    """
    Find the sum of all values in all BST subtrees.

    Uses post-order traversal to determine if each subtree is a valid BST.
    For each node, we track:
    - Whether the subtree rooted here is a valid BST
    - Sum of nodes in this subtree
    - Minimum value in this subtree
    - Maximum value in this subtree

    Args:
        root: Root of the binary tree

    Returns:
        Total sum of all BST subtree sums
    """
    total_sum = [0]  # Use list to allow modification in nested function

    def dfs(node: Optional[TreeNode]) -> Tuple[bool, int, int, int]:
        """
        Post-order traversal that returns (is_bst, sum, min_val, max_val).

        For null nodes: is_bst=True, sum=0, min=+inf, max=-inf
        This allows easy boundary checking.
        """
        if node is None:
            return (True, 0, math.inf, -math.inf)

        # Get info from left and right subtrees (post-order)
        left_is_bst, left_sum, left_min, left_max = dfs(node.left)
        right_is_bst, right_sum, right_min, right_max = dfs(node.right)

        # Calculate current subtree's sum
        current_sum = left_sum + right_sum + node.val

        # Calculate min and max for current subtree
        current_min = min(node.val, left_min, right_min)
        current_max = max(node.val, left_max, right_max)

        # Check if current subtree is a valid BST
        # Conditions:
        # 1. Both children must be BSTs
        # 2. left_max < node.val (all left values less than current)
        # 3. right_min > node.val (all right values greater than current)
        is_bst = (
            left_is_bst and
            right_is_bst and
            left_max < node.val and
            right_min > node.val
        )

        # If this subtree is a BST, add its sum to total
        if is_bst:
            total_sum[0] += current_sum

        return (is_bst, current_sum, current_min, current_max)

    dfs(root)
    return total_sum[0]


def max_sum_bst(root: Optional[TreeNode]) -> int:
    """
    Find the maximum sum among all BST subtrees.

    Similar to sum_bsts but tracks maximum instead of total.
    This is LeetCode 1373.

    Args:
        root: Root of the binary tree

    Returns:
        Maximum sum of any BST subtree (0 if no valid BST with positive sum)
    """
    max_sum = [0]  # At minimum, empty subtree has sum 0

    def dfs(node: Optional[TreeNode]) -> Tuple[bool, int, int, int]:
        if node is None:
            return (True, 0, math.inf, -math.inf)

        left_is_bst, left_sum, left_min, left_max = dfs(node.left)
        right_is_bst, right_sum, right_min, right_max = dfs(node.right)

        current_sum = left_sum + right_sum + node.val
        current_min = min(node.val, left_min, right_min)
        current_max = max(node.val, left_max, right_max)

        is_bst = (
            left_is_bst and
            right_is_bst and
            left_max < node.val and
            right_min > node.val
        )

        if is_bst:
            max_sum[0] = max(max_sum[0], current_sum)

        return (is_bst, current_sum, current_min, current_max)

    dfs(root)
    return max_sum[0]


def count_bst_subtrees(root: Optional[TreeNode]) -> int:
    """
    Count the number of subtrees that are valid BSTs.

    Args:
        root: Root of the binary tree

    Returns:
        Count of BST subtrees
    """
    count = [0]

    def dfs(node: Optional[TreeNode]) -> Tuple[bool, int, int]:
        """Returns (is_bst, min_val, max_val)."""
        if node is None:
            return (True, math.inf, -math.inf)

        left_is_bst, left_min, left_max = dfs(node.left)
        right_is_bst, right_min, right_max = dfs(node.right)

        current_min = min(node.val, left_min, right_min)
        current_max = max(node.val, left_max, right_max)

        is_bst = (
            left_is_bst and
            right_is_bst and
            left_max < node.val and
            right_min > node.val
        )

        if is_bst:
            count[0] += 1

        return (is_bst, current_min, current_max)

    dfs(root)
    return count[0]


def largest_bst_subtree(root: Optional[TreeNode]) -> int:
    """
    Find the size (node count) of the largest BST subtree.
    This is LeetCode 333.

    Args:
        root: Root of the binary tree

    Returns:
        Size of the largest BST subtree
    """
    max_size = [0]

    def dfs(node: Optional[TreeNode]) -> Tuple[bool, int, int, int]:
        """Returns (is_bst, size, min_val, max_val)."""
        if node is None:
            return (True, 0, math.inf, -math.inf)

        left_is_bst, left_size, left_min, left_max = dfs(node.left)
        right_is_bst, right_size, right_min, right_max = dfs(node.right)

        current_size = left_size + right_size + 1
        current_min = min(node.val, left_min, right_min)
        current_max = max(node.val, left_max, right_max)

        is_bst = (
            left_is_bst and
            right_is_bst and
            left_max < node.val and
            right_min > node.val
        )

        if is_bst:
            max_size[0] = max(max_size[0], current_size)

        return (is_bst, current_size, current_min, current_max)

    dfs(root)
    return max_size[0]


def visualize_tree(root: Optional[TreeNode], level: int = 0, prefix: str = "Root: ") -> None:
    """Helper to visualize tree structure."""
    if root is not None:
        print(" " * (level * 4) + prefix + str(root.val))
        if root.left or root.right:
            if root.left:
                visualize_tree(root.left, level + 1, "L--- ")
            else:
                print(" " * ((level + 1) * 4) + "L--- None")
            if root.right:
                visualize_tree(root.right, level + 1, "R--- ")
            else:
                print(" " * ((level + 1) * 4) + "R--- None")


# Test cases
if __name__ == "__main__":
    print("=== Sum BSTs Tests ===\n")

    # Test 1: Mixed tree with some BST subtrees
    #        1
    #       / \
    #      4   3
    #     / \   \
    #    2   4   5
    #           / \
    #          4   6
    print("Test 1: Mixed tree")
    root1 = TreeNode(1)
    root1.left = TreeNode(4)
    root1.right = TreeNode(3)
    root1.left.left = TreeNode(2)
    root1.left.right = TreeNode(4)
    root1.right.right = TreeNode(5)
    root1.right.right.left = TreeNode(4)
    root1.right.right.right = TreeNode(6)

    visualize_tree(root1)
    print()

    result = sum_bsts(root1)
    print(f"Sum of all BST subtree sums: {result}")
    print(f"Count of BST subtrees: {count_bst_subtrees(root1)}")
    print(f"Max BST subtree sum: {max_sum_bst(root1)}")
    print(f"Largest BST subtree size: {largest_bst_subtree(root1)}")
    print()

    # Test 2: Tree where root subtree is not BST
    #        5
    #       / \
    #      4   8
    #     /   / \
    #    3   6   3
    print("Test 2: Root is not BST")
    root2 = TreeNode(5)
    root2.left = TreeNode(4)
    root2.right = TreeNode(8)
    root2.left.left = TreeNode(3)
    root2.right.left = TreeNode(6)
    root2.right.right = TreeNode(3)

    visualize_tree(root2)
    print()

    result = sum_bsts(root2)
    print(f"Sum of all BST subtree sums: {result}")
    print(f"Count of BST subtrees: {count_bst_subtrees(root2)}")
    print()

    # Test 3: Simple tree that's not a BST
    #        1
    #       / \
    #      2   3
    print("Test 3: Simple non-BST")
    root3 = TreeNode(1)
    root3.left = TreeNode(2)
    root3.right = TreeNode(3)

    visualize_tree(root3)
    print()

    result = sum_bsts(root3)
    print(f"Sum of all BST subtree sums: {result}")
    # Only leaves 2 and 3 are BSTs: 2 + 3 = 5
    print()

    # Test 4: Complete valid BST
    #        4
    #       / \
    #      2   6
    #     / \ / \
    #    1  3 5  7
    print("Test 4: Complete valid BST")
    root4 = TreeNode(4)
    root4.left = TreeNode(2)
    root4.right = TreeNode(6)
    root4.left.left = TreeNode(1)
    root4.left.right = TreeNode(3)
    root4.right.left = TreeNode(5)
    root4.right.right = TreeNode(7)

    visualize_tree(root4)
    print()

    result = sum_bsts(root4)
    print(f"Sum of all BST subtree sums: {result}")
    print(f"Count of BST subtrees: {count_bst_subtrees(root4)}")
    # All subtrees are BSTs:
    # Leaves: 1, 3, 5, 7 (sum = 16)
    # Subtree at 2: 1+2+3=6
    # Subtree at 6: 5+6+7=18
    # Subtree at 4 (root): 1+2+3+4+5+6+7=28
    # Total: 16 + 6 + 18 + 28 = 68
    print()

    # Test 5: Single node
    print("Test 5: Single node")
    root5 = TreeNode(42)

    result = sum_bsts(root5)
    print(f"Sum of all BST subtree sums: {result}")  # Should be 42
    print()

    # Test 6: Skewed tree (all left)
    #      5
    #     /
    #    4
    #   /
    #  3
    print("Test 6: Left-skewed tree (valid BST)")
    root6 = TreeNode(5)
    root6.left = TreeNode(4)
    root6.left.left = TreeNode(3)

    visualize_tree(root6)
    print()

    result = sum_bsts(root6)
    print(f"Sum of all BST subtree sums: {result}")
    # Node 3: sum=3
    # Subtree at 4: sum=3+4=7
    # Subtree at 5: sum=3+4+5=12
    # Total: 3 + 7 + 12 = 22
    print(f"Count of BST subtrees: {count_bst_subtrees(root6)}")
    print()

    # Test 7: Tree with negative values
    print("Test 7: Tree with negative values")
    #       0
    #      / \
    #    -3   2
    #    /   / \
    #  -5   1   4
    root7 = TreeNode(0)
    root7.left = TreeNode(-3)
    root7.right = TreeNode(2)
    root7.left.left = TreeNode(-5)
    root7.right.left = TreeNode(1)
    root7.right.right = TreeNode(4)

    visualize_tree(root7)
    print()

    result = sum_bsts(root7)
    print(f"Sum of all BST subtree sums: {result}")
    print(f"Max BST subtree sum: {max_sum_bst(root7)}")
    print(f"Count of BST subtrees: {count_bst_subtrees(root7)}")

    print("\nAll tests completed!")
