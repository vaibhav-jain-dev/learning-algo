"""
Range Sum of BST - Python Solution

Calculate the sum of all node values within a given range in a BST.

Time Complexity: O(n) worst case, often O(h + k) with BST pruning
Space Complexity: O(h) for recursion stack
"""

from typing import Optional
from collections import deque


class TreeNode:
    def __init__(self, val: int = 0):
        self.val = val
        self.left: Optional[TreeNode] = None
        self.right: Optional[TreeNode] = None


def range_sum_bst(root: Optional[TreeNode], low: int, high: int) -> int:
    """
    Calculate sum of all nodes with values in range [low, high].

    Uses DFS with BST pruning to skip branches that cannot
    contain values in the range.

    Args:
        root: Root of BST
        low: Lower bound of range (inclusive)
        high: Upper bound of range (inclusive)

    Returns:
        int: Sum of values in range
    """
    if root is None:
        return 0

    # If current value is less than low, only right subtree matters
    if root.val < low:
        return range_sum_bst(root.right, low, high)

    # If current value is greater than high, only left subtree matters
    if root.val > high:
        return range_sum_bst(root.left, low, high)

    # Current value is in range, include it and search both subtrees
    return (root.val +
            range_sum_bst(root.left, low, high) +
            range_sum_bst(root.right, low, high))


def range_sum_bst_iterative(root: Optional[TreeNode], low: int, high: int) -> int:
    """
    Iterative solution using stack with BST pruning.

    Args:
        root: Root of BST
        low: Lower bound of range
        high: Upper bound of range

    Returns:
        int: Sum of values in range
    """
    if root is None:
        return 0

    total = 0
    stack = [root]

    while stack:
        node = stack.pop()

        if node is None:
            continue

        if node.val < low:
            # Only explore right subtree
            stack.append(node.right)
        elif node.val > high:
            # Only explore left subtree
            stack.append(node.left)
        else:
            # Value in range, add it and explore both subtrees
            total += node.val
            stack.append(node.left)
            stack.append(node.right)

    return total


def range_sum_bst_bfs(root: Optional[TreeNode], low: int, high: int) -> int:
    """
    BFS solution using queue with BST pruning.

    Level-order traversal approach.
    """
    if root is None:
        return 0

    total = 0
    queue = deque([root])

    while queue:
        node = queue.popleft()

        if node is None:
            continue

        if node.val < low:
            queue.append(node.right)
        elif node.val > high:
            queue.append(node.left)
        else:
            total += node.val
            queue.append(node.left)
            queue.append(node.right)

    return total


def count_nodes_in_range(root: Optional[TreeNode], low: int, high: int) -> int:
    """
    Count nodes with values in range (related problem).
    """
    if root is None:
        return 0

    if root.val < low:
        return count_nodes_in_range(root.right, low, high)

    if root.val > high:
        return count_nodes_in_range(root.left, low, high)

    return (1 +
            count_nodes_in_range(root.left, low, high) +
            count_nodes_in_range(root.right, low, high))


def build_bst(values: list) -> Optional[TreeNode]:
    """Build BST by inserting values in order."""
    if not values:
        return None

    root = TreeNode(values[0])
    for val in values[1:]:
        insert(root, val)
    return root


def insert(root: TreeNode, val: int) -> None:
    """Insert value into BST."""
    if val < root.val:
        if root.left is None:
            root.left = TreeNode(val)
        else:
            insert(root.left, val)
    else:
        if root.right is None:
            root.right = TreeNode(val)
        else:
            insert(root.right, val)


def print_tree(node: Optional[TreeNode], level: int = 0, prefix: str = "Root: ") -> None:
    """Print tree structure."""
    if node is not None:
        print(" " * (level * 4) + prefix + str(node.val))
        if node.left or node.right:
            if node.left:
                print_tree(node.left, level + 1, "L--- ")
            else:
                print(" " * ((level + 1) * 4) + "L--- None")
            if node.right:
                print_tree(node.right, level + 1, "R--- ")
            else:
                print(" " * ((level + 1) * 4) + "R--- None")


# Example usage and test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    # Build tree:    10
    #              /    \
    #             5      15
    #            / \       \
    #           3   7      18
    root1 = TreeNode(10)
    root1.left = TreeNode(5)
    root1.right = TreeNode(15)
    root1.left.left = TreeNode(3)
    root1.left.right = TreeNode(7)
    root1.right.right = TreeNode(18)

    print("Test 1 Tree:")
    print_tree(root1)
    result1 = range_sum_bst(root1, 7, 15)
    print(f"Range sum [7, 15]: {result1}")  # Expected: 32 (7+10+15)
    print()

    # Test 2: Larger tree
    # Build tree:       10
    #                 /    \
    #                5      15
    #               / \    /  \
    #              3   7  13   18
    #             /   /
    #            1   6
    root2 = TreeNode(10)
    root2.left = TreeNode(5)
    root2.right = TreeNode(15)
    root2.left.left = TreeNode(3)
    root2.left.right = TreeNode(7)
    root2.right.left = TreeNode(13)
    root2.right.right = TreeNode(18)
    root2.left.left.left = TreeNode(1)
    root2.left.right.left = TreeNode(6)

    print("Test 2 Tree:")
    print_tree(root2)
    result2 = range_sum_bst(root2, 6, 10)
    print(f"Range sum [6, 10]: {result2}")  # Expected: 23 (6+7+10)
    print()

    # Test 3: Entire tree in range
    result3 = range_sum_bst(root2, 1, 100)
    print(f"Test 3 - Entire tree [1, 100]: {result3}")  # Expected: 1+3+5+6+7+10+13+15+18=78
    print()

    # Test 4: Single node in range
    result4 = range_sum_bst(root2, 10, 10)
    print(f"Test 4 - Single value [10, 10]: {result4}")  # Expected: 10
    print()

    # Test 5: No nodes in range
    result5 = range_sum_bst(root2, 100, 200)
    print(f"Test 5 - No nodes [100, 200]: {result5}")  # Expected: 0
    print()

    # Test 6: Single node tree
    single = TreeNode(5)
    result6 = range_sum_bst(single, 1, 10)
    print(f"Test 6 - Single node tree [1, 10]: {result6}")  # Expected: 5
    print()

    # Test 7: Compare methods
    print("--- Method Comparison ---")
    recursive = range_sum_bst(root2, 6, 15)
    iterative = range_sum_bst_iterative(root2, 6, 15)
    bfs = range_sum_bst_bfs(root2, 6, 15)
    print(f"Range [6, 15]:")
    print(f"  Recursive: {recursive}")
    print(f"  Iterative: {iterative}")
    print(f"  BFS:       {bfs}")
    print(f"  All match: {recursive == iterative == bfs}")
    print()

    # Test 8: Count nodes in range
    count = count_nodes_in_range(root2, 6, 15)
    print(f"Test 8 - Count nodes in [6, 15]: {count}")  # Expected: 5 (6,7,10,13,15)

    print("\nAll tests completed!")
