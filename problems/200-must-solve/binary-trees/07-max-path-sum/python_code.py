"""
Max Path Sum in Binary Tree - Python Solution

Find the maximum path sum where path can start and end at any node.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
"""


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def max_path_sum(root):
    """
    Find the maximum path sum in a binary tree.

    Args:
        root: Root of binary tree

    Returns:
        int: Maximum path sum
    """
    max_sum = [float("-inf")]  # Use list to allow modification in nested function
    find_max_path(root, max_sum)
    return max_sum[0]


def find_max_path(node, max_sum):
    """
    Find max path sum while returning max straight path for parent.

    Args:
        node: Current node
        max_sum: List containing the current maximum sum

    Returns:
        int: Maximum "straight" path sum starting at this node
             (can only go left OR right, not both)
    """
    if node is None:
        return 0

    # Get max path sums from children (use 0 if negative - don't include)
    left_max = max(0, find_max_path(node.left, max_sum))
    right_max = max(0, find_max_path(node.right, max_sum))

    # Maximum path sum through this node (could be the answer)
    path_through_node = node.value + left_max + right_max

    # Update global maximum
    max_sum[0] = max(max_sum[0], path_through_node)

    # Return max straight path for parent to use
    # Parent can only connect to one side, so return the better one
    return node.value + max(left_max, right_max)


class TreeInfo:
    """Helper class for alternative implementation."""

    def __init__(self, max_path_sum, max_branch_sum):
        self.max_path_sum = max_path_sum  # Max path sum in subtree
        self.max_branch_sum = max_branch_sum  # Max sum starting at root going down


def max_path_sum_v2(root):
    """
    Alternative implementation using helper class.

    Args:
        root: Root of binary tree

    Returns:
        int: Maximum path sum
    """
    return get_max_path_info(root).max_path_sum


def get_max_path_info(node):
    """Get path sum info for a subtree."""
    if node is None:
        return TreeInfo(float("-inf"), 0)

    left_info = get_max_path_info(node.left)
    right_info = get_max_path_info(node.right)

    # Max branch sum starting at this node
    max_child_branch = max(left_info.max_branch_sum, right_info.max_branch_sum)
    max_branch_sum = max(node.value, node.value + max_child_branch)

    # Max path sum through this node
    max_sum_through = max(max_branch_sum, node.value + left_info.max_branch_sum + right_info.max_branch_sum)

    # Overall max path sum in this subtree
    running_max = max(left_info.max_path_sum, right_info.max_path_sum)
    max_path = max(running_max, max_sum_through)

    return TreeInfo(max_path, max_branch_sum)


# Test cases
if __name__ == "__main__":
    # Build test tree 1:
    #        1
    #      /   \
    #     2     3
    #    / \   / \
    #   4   5 6   7

    root1 = BinaryTree(1)
    root1.left = BinaryTree(2)
    root1.right = BinaryTree(3)
    root1.left.left = BinaryTree(4)
    root1.left.right = BinaryTree(5)
    root1.right.left = BinaryTree(6)
    root1.right.right = BinaryTree(7)

    # Test 1: Main example
    result1 = max_path_sum(root1)
    print(f"Test 1: {result1}")
    # Expected: 18 (path: 5 -> 2 -> 1 -> 3 -> 7)

    # Build test tree 2:
    #       -10
    #       /  \
    #      9   20
    #         /  \
    #        15   7

    root2 = BinaryTree(-10)
    root2.left = BinaryTree(9)
    root2.right = BinaryTree(20)
    root2.right.left = BinaryTree(15)
    root2.right.right = BinaryTree(7)

    # Test 2: Negative root
    result2 = max_path_sum(root2)
    print(f"Test 2: {result2}")
    # Expected: 42 (path: 15 -> 20 -> 7)

    # Test 3: Single node
    single = BinaryTree(5)
    result3 = max_path_sum(single)
    print(f"Test 3 (single node): {result3}")
    # Expected: 5

    # Test 4: All negative values
    all_neg = BinaryTree(-3)
    all_neg.left = BinaryTree(-1)
    all_neg.right = BinaryTree(-2)
    result4 = max_path_sum(all_neg)
    print(f"Test 4 (all negative): {result4}")
    # Expected: -1 (single node -1 is the best)

    # Test 5: Linear tree
    linear = BinaryTree(1)
    linear.left = BinaryTree(2)
    linear.left.left = BinaryTree(3)
    result5 = max_path_sum(linear)
    print(f"Test 5 (linear): {result5}")
    # Expected: 6 (path: 1 -> 2 -> 3)

    # Test 6: Alternative implementation
    result6 = max_path_sum_v2(root1)
    result7 = max_path_sum_v2(root2)
    print(f"\nTest 6 (v2 tree1): {result6}")
    print(f"Test 7 (v2 tree2): {result7}")

    # Test 8: Mixed positive and negative
    mixed = BinaryTree(1)
    mixed.left = BinaryTree(-2)
    mixed.right = BinaryTree(3)
    mixed.left.left = BinaryTree(4)
    mixed.left.right = BinaryTree(5)
    mixed.right.left = BinaryTree(-6)
    mixed.right.right = BinaryTree(2)
    result8 = max_path_sum(mixed)
    print(f"\nTest 8 (mixed): {result8}")
    # Expected: 9 (path: 4 -> -2 -> 5 or just consider 5 -> -2 -> 1 -> 3 -> 2 = 9)

    # Test 9: Path doesn't go through root
    #       1
    #      /
    #    10
    #   /  \
    #  2    3

    not_through_root = BinaryTree(1)
    not_through_root.left = BinaryTree(10)
    not_through_root.left.left = BinaryTree(2)
    not_through_root.left.right = BinaryTree(3)
    result9 = max_path_sum(not_through_root)
    print(f"Test 9 (not through root): {result9}")
    # Expected: 16 (path: 2 -> 10 -> 3 + 1 = 16 or 2 -> 10 -> 3 = 15?)
    # Actually: 1 + 10 + 3 = 14 or 2 + 10 + 3 = 15 ... need to calculate
    # Path: 2 -> 10 -> 3 = 15, but 1 + 10 + max(2,3) = 14
    # The max path: 1 -> 10 -> 3 = 14 or 2 -> 10 -> 1 = 13
    # Wait: Path through 10: left(2) + 10 + right(3) = 15

    print("\nAll tests completed!")
