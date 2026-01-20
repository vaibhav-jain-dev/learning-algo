"""
Merge Binary Trees - Python Solution

Merge two binary trees by summing overlapping nodes.

Time Complexity: O(min(n, m))
Space Complexity: O(min(h1, h2)) for recursion stack
"""

from collections import deque


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def merge_binary_trees(tree1, tree2):
    """
    Merge two binary trees by adding values of overlapping nodes.

    Modifies tree1 in-place.

    Args:
        tree1: Root of first binary tree
        tree2: Root of second binary tree

    Returns:
        BinaryTree: Root of merged tree (tree1 modified)
    """
    # Base cases
    if tree1 is None:
        return tree2
    if tree2 is None:
        return tree1

    # Merge values
    tree1.value += tree2.value

    # Recursively merge children
    tree1.left = merge_binary_trees(tree1.left, tree2.left)
    tree1.right = merge_binary_trees(tree1.right, tree2.right)

    return tree1


def merge_binary_trees_new(tree1, tree2):
    """
    Merge two binary trees creating a new tree (non-destructive).

    Args:
        tree1: Root of first binary tree
        tree2: Root of second binary tree

    Returns:
        BinaryTree: Root of new merged tree
    """
    if tree1 is None and tree2 is None:
        return None
    if tree1 is None:
        return copy_tree(tree2)
    if tree2 is None:
        return copy_tree(tree1)

    # Create new node with sum
    merged = BinaryTree(tree1.value + tree2.value)

    # Recursively merge children
    merged.left = merge_binary_trees_new(tree1.left, tree2.left)
    merged.right = merge_binary_trees_new(tree1.right, tree2.right)

    return merged


def copy_tree(node):
    """Create a deep copy of a tree."""
    if node is None:
        return None

    new_node = BinaryTree(node.value)
    new_node.left = copy_tree(node.left)
    new_node.right = copy_tree(node.right)
    return new_node


def merge_binary_trees_iterative(tree1, tree2):
    """
    Iterative approach using a stack.

    Modifies tree1 in-place.

    Args:
        tree1: Root of first binary tree
        tree2: Root of second binary tree

    Returns:
        BinaryTree: Root of merged tree
    """
    if tree1 is None:
        return tree2
    if tree2 is None:
        return tree1

    stack = [(tree1, tree2)]

    while stack:
        node1, node2 = stack.pop()

        # node2 is None means nothing to merge
        if node2 is None:
            continue

        # Add values
        node1.value += node2.value

        # Handle left children
        if node1.left is None:
            node1.left = node2.left
        else:
            stack.append((node1.left, node2.left))

        # Handle right children
        if node1.right is None:
            node1.right = node2.right
        else:
            stack.append((node1.right, node2.right))

    return tree1


def print_tree_level_order(root):
    """Print tree in level order for visualization."""
    if root is None:
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
    # Build Tree 1:
    #      1
    #     / \
    #    3   2
    #   /
    #  5

    tree1 = BinaryTree(1)
    tree1.left = BinaryTree(3)
    tree1.right = BinaryTree(2)
    tree1.left.left = BinaryTree(5)

    # Build Tree 2:
    #      2
    #     / \
    #    1   3
    #     \   \
    #      4   7

    tree2 = BinaryTree(2)
    tree2.left = BinaryTree(1)
    tree2.right = BinaryTree(3)
    tree2.left.right = BinaryTree(4)
    tree2.right.right = BinaryTree(7)

    print("Tree 1:", print_tree_level_order(tree1))
    print("Tree 2:", print_tree_level_order(tree2))

    # Test 1: Create new merged tree (non-destructive)
    merged = merge_binary_trees_new(tree1, tree2)
    print(f"\nTest 1 - Merged (new tree): {print_tree_level_order(merged)}")
    # Expected: [[3], [4, 5], [5, 4, 7]]

    # Rebuild trees for destructive test
    tree1_copy = BinaryTree(1)
    tree1_copy.left = BinaryTree(3)
    tree1_copy.right = BinaryTree(2)
    tree1_copy.left.left = BinaryTree(5)

    tree2_copy = BinaryTree(2)
    tree2_copy.left = BinaryTree(1)
    tree2_copy.right = BinaryTree(3)
    tree2_copy.left.right = BinaryTree(4)
    tree2_copy.right.right = BinaryTree(7)

    # Test 2: In-place merge (recursive)
    result2 = merge_binary_trees(tree1_copy, tree2_copy)
    print(f"Test 2 - Merged (in-place): {print_tree_level_order(result2)}")

    # Test 3: Empty trees
    result3 = merge_binary_trees(None, None)
    print(f"\nTest 3 - Both empty: {result3}")
    # Expected: None

    # Test 4: One empty tree
    single = BinaryTree(5)
    result4 = merge_binary_trees(None, single)
    print(f"Test 4 - One empty: {print_tree_level_order(result4)}")
    # Expected: [[5]]

    # Test 5: Iterative approach
    tree3 = BinaryTree(1)
    tree3.left = BinaryTree(2)
    tree3.right = BinaryTree(3)

    tree4 = BinaryTree(1)
    tree4.left = BinaryTree(2)
    tree4.right = BinaryTree(3)

    result5 = merge_binary_trees_iterative(tree3, tree4)
    print(f"\nTest 5 - Iterative: {print_tree_level_order(result5)}")
    # Expected: [[2], [4, 6]]

    # Test 6: Different depths
    deep = BinaryTree(1)
    deep.left = BinaryTree(2)
    deep.left.left = BinaryTree(3)
    deep.left.left.left = BinaryTree(4)

    shallow = BinaryTree(10)
    shallow.right = BinaryTree(20)

    result6 = merge_binary_trees_new(deep, shallow)
    print(f"\nTest 6 - Different depths: {print_tree_level_order(result6)}")
    # Expected: [[11], [2, 20], [3], [4]]

    print("\nAll tests completed!")
