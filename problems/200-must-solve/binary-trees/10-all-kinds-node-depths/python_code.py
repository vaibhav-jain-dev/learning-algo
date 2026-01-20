"""
All Kinds of Node Depths - Python Solution

Calculate the sum of depths for every node treated as root, then sum all results.

Time Complexity: O(n) with optimized approach
Space Complexity: O(h) for recursion stack
"""


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def all_kinds_of_node_depths(root):
    """
    Calculate sum of all node depths treating each node as root.

    For every pair (ancestor, descendant), this counts their distance.

    Args:
        root: Root of binary tree

    Returns:
        int: Sum of all depths from all possible roots
    """
    return all_node_depths_helper(root, 0)


def all_node_depths_helper(node, depth):
    """
    Recursive helper using depth accumulation.

    At each node, we add:
    1. Sum of depths of this subtree (treating this node as root)
    2. depth * number of nodes in subtree (contribution from ancestors)
    """
    if node is None:
        return 0

    # This calculates sum of depths treating current node as root,
    # plus depth * (subtree size) for ancestor contributions
    return (
        all_node_depths_helper(node.left, depth + 1)
        + all_node_depths_helper(node.right, depth + 1)
        + node_depths(node)  # Standard node depths from this node
    )


def node_depths(node, depth=0):
    """Calculate standard sum of depths from a given root."""
    if node is None:
        return 0
    return depth + node_depths(node.left, depth + 1) + node_depths(node.right, depth + 1)


def all_kinds_of_node_depths_optimized(root):
    """
    Optimized O(n) solution.

    Key insight: Each node at depth d with subtree size s
    contributes to the total in a specific way.
    """
    total = [0]
    get_all_info(root, total)
    return total[0]


def get_all_info(node, total, depth=0):
    """
    Returns (subtree_size, depth_sum_from_node).

    Also accumulates total depths in total[0].
    """
    if node is None:
        return (0, 0)

    left_size, left_depths = get_all_info(node.left, total, depth + 1)
    right_size, right_depths = get_all_info(node.right, total, depth + 1)

    subtree_size = 1 + left_size + right_size
    # Sum of depths treating current node as root
    depths_from_here = left_depths + left_size + right_depths + right_size

    total[0] += depths_from_here

    return (subtree_size, depths_from_here)


class TreeInfo:
    """Helper class to store subtree information."""

    def __init__(self, num_nodes, sum_of_depths, sum_of_all_depths):
        self.num_nodes = num_nodes
        self.sum_of_depths = sum_of_depths  # Standard depths sum from this root
        self.sum_of_all_depths = sum_of_all_depths  # All kinds sum in subtree


def all_kinds_of_node_depths_v2(root):
    """
    Alternative implementation with explicit info tracking.
    """
    return get_tree_info(root).sum_of_all_depths


def get_tree_info(node):
    """Get complete depth information for subtree."""
    if node is None:
        return TreeInfo(0, 0, 0)

    left_info = get_tree_info(node.left)
    right_info = get_tree_info(node.right)

    num_nodes = 1 + left_info.num_nodes + right_info.num_nodes

    # Sum of depths from this node as root
    sum_of_depths = (
        left_info.sum_of_depths
        + left_info.num_nodes
        + right_info.sum_of_depths
        + right_info.num_nodes
    )

    # Sum of all depths in this subtree
    # = depths from this node + all depths in left subtree + all depths in right subtree
    sum_of_all_depths = (
        sum_of_depths + left_info.sum_of_all_depths + right_info.sum_of_all_depths
    )

    return TreeInfo(num_nodes, sum_of_depths, sum_of_all_depths)


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

    # Test 1: Basic approach
    result1 = all_kinds_of_node_depths(root)
    print(f"Test 1 (basic): {result1}")
    # Expected: 26

    # Test 2: Optimized approach
    result2 = all_kinds_of_node_depths_optimized(root)
    print(f"Test 2 (optimized): {result2}")

    # Test 3: V2 approach
    result3 = all_kinds_of_node_depths_v2(root)
    print(f"Test 3 (v2): {result3}")

    # Test 4: Single node
    single = BinaryTree(1)
    result4 = all_kinds_of_node_depths(single)
    print(f"\nTest 4 (single node): {result4}")
    # Expected: 0

    # Test 5: Empty tree
    result5 = all_kinds_of_node_depths(None)
    print(f"Test 5 (empty): {result5}")
    # Expected: 0

    # Test 6: Linear tree (all left)
    linear = BinaryTree(1)
    linear.left = BinaryTree(2)
    linear.left.left = BinaryTree(3)
    result6 = all_kinds_of_node_depths(linear)
    result6_opt = all_kinds_of_node_depths_optimized(linear)
    print(f"\nTest 6 (linear tree): basic={result6}, optimized={result6_opt}")
    # From 1: 0 + 1 + 2 = 3
    # From 2: 0 + 1 = 1
    # From 3: 0 = 0
    # Total = 4

    # Test 7: Complete two-level tree
    #     1
    #    / \
    #   2   3
    two_level = BinaryTree(1)
    two_level.left = BinaryTree(2)
    two_level.right = BinaryTree(3)
    result7 = all_kinds_of_node_depths(two_level)
    print(f"Test 7 (two-level): {result7}")
    # From 1: 0 + 1 + 1 = 2
    # From 2: 0 = 0
    # From 3: 0 = 0
    # Total = 2

    # Verify with simple calculation
    print("\nManual verification for test tree:")
    print(f"  Standard depths from root: {node_depths(root)}")
    print(f"  From node 2: {node_depths(root.left)}")
    print(f"  From node 3: {node_depths(root.right)}")
    print(f"  From node 4: {node_depths(root.left.left)}")

    print("\nAll tests completed!")
