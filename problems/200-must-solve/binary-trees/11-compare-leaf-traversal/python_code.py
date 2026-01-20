"""
Compare Leaf Traversal - Python Solution

Compare the left-to-right leaf sequences of two binary trees.

Time Complexity: O(n + m)
Space Complexity: O(h1 + h2) for optimal stack approach
"""


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def compare_leaf_traversal(tree1, tree2):
    """
    Compare leaf traversals of two binary trees.

    Args:
        tree1: Root of first binary tree
        tree2: Root of second binary tree

    Returns:
        bool: True if leaf traversals are identical
    """
    # Use iterators to compare leaves one by one
    stack1 = [tree1] if tree1 else []
    stack2 = [tree2] if tree2 else []

    while stack1 and stack2:
        leaf1 = get_next_leaf(stack1)
        leaf2 = get_next_leaf(stack2)

        # Both exhausted at same time
        if leaf1 is None and leaf2 is None:
            return True

        # One exhausted before other, or values differ
        if leaf1 is None or leaf2 is None:
            return False

        if leaf1.value != leaf2.value:
            return False

    # Check if both stacks are empty
    return len(stack1) == 0 and len(stack2) == 0


def get_next_leaf(stack):
    """
    Advance stack to next leaf and return it.

    Uses pre-order traversal to maintain left-to-right order.

    Args:
        stack: Traversal stack

    Returns:
        BinaryTree: Next leaf node, or None if no more leaves
    """
    while stack:
        node = stack.pop()

        # Check if leaf
        if node.left is None and node.right is None:
            return node

        # Add children (right first so left is processed first)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return None


def compare_leaf_traversal_simple(tree1, tree2):
    """
    Simple approach: collect leaves and compare lists.

    Args:
        tree1: Root of first binary tree
        tree2: Root of second binary tree

    Returns:
        bool: True if leaf traversals are identical
    """
    leaves1 = get_leaves(tree1)
    leaves2 = get_leaves(tree2)

    return leaves1 == leaves2


def get_leaves(node):
    """Collect all leaf values in left-to-right order."""
    if node is None:
        return []

    leaves = []
    collect_leaves(node, leaves)
    return leaves


def collect_leaves(node, leaves):
    """Helper to collect leaves recursively."""
    if node is None:
        return

    # If leaf, add to list
    if node.left is None and node.right is None:
        leaves.append(node.value)
        return

    # Recurse left then right
    collect_leaves(node.left, leaves)
    collect_leaves(node.right, leaves)


# Test cases
if __name__ == "__main__":
    # Build Tree 1:
    #        1
    #      /   \
    #     2     3
    #    / \     \
    #   4   5     6
    #      / \
    #     7   8

    tree1 = BinaryTree(1)
    tree1.left = BinaryTree(2)
    tree1.right = BinaryTree(3)
    tree1.left.left = BinaryTree(4)
    tree1.left.right = BinaryTree(5)
    tree1.right.right = BinaryTree(6)
    tree1.left.right.left = BinaryTree(7)
    tree1.left.right.right = BinaryTree(8)

    # Build Tree 2 (same leaves, different structure):
    #        1
    #      /   \
    #     2     3
    #    / \   /
    #   4   7 8
    #        \
    #         5
    #          \
    #           6

    tree2 = BinaryTree(1)
    tree2.left = BinaryTree(2)
    tree2.right = BinaryTree(3)
    tree2.left.left = BinaryTree(4)
    tree2.left.right = BinaryTree(7)
    tree2.right.left = BinaryTree(8)
    tree2.left.right.right = BinaryTree(5)
    tree2.left.right.right.right = BinaryTree(6)

    print("Tree 1 leaves:", get_leaves(tree1))
    print("Tree 2 leaves:", get_leaves(tree2))

    # Test 1: Same leaf traversal
    result1 = compare_leaf_traversal(tree1, tree2)
    print(f"\nTest 1 (same leaves): {result1}")
    # Expected: True

    # Test 2: Simple approach
    result2 = compare_leaf_traversal_simple(tree1, tree2)
    print(f"Test 2 (simple approach): {result2}")

    # Test 3: Different leaves
    tree3 = BinaryTree(1)
    tree3.left = BinaryTree(2)
    tree3.right = BinaryTree(3)

    tree4 = BinaryTree(1)
    tree4.left = BinaryTree(3)
    tree4.right = BinaryTree(2)

    print(f"\nTree 3 leaves: {get_leaves(tree3)}")  # [2, 3]
    print(f"Tree 4 leaves: {get_leaves(tree4)}")  # [3, 2]

    result3 = compare_leaf_traversal(tree3, tree4)
    print(f"Test 3 (different order): {result3}")
    # Expected: False

    # Test 4: Same single node trees
    single1 = BinaryTree(5)
    single2 = BinaryTree(5)
    result4 = compare_leaf_traversal(single1, single2)
    print(f"\nTest 4 (same single nodes): {result4}")
    # Expected: True

    # Test 5: Different single node trees
    single3 = BinaryTree(5)
    single4 = BinaryTree(6)
    result5 = compare_leaf_traversal(single3, single4)
    print(f"Test 5 (different single nodes): {result5}")
    # Expected: False

    # Test 6: Empty trees
    result6 = compare_leaf_traversal(None, None)
    print(f"\nTest 6 (both empty): {result6}")
    # Expected: True

    # Test 7: One empty, one not
    result7 = compare_leaf_traversal(tree1, None)
    print(f"Test 7 (one empty): {result7}")
    # Expected: False

    # Test 8: Different number of leaves
    tree5 = BinaryTree(1)
    tree5.left = BinaryTree(2)
    tree5.right = BinaryTree(3)
    tree5.left.left = BinaryTree(4)  # Extra leaf

    result8 = compare_leaf_traversal(tree3, tree5)
    print(f"\nTest 8 (different leaf count): {result8}")
    print(f"  Tree 3 leaves: {get_leaves(tree3)}")
    print(f"  Tree 5 leaves: {get_leaves(tree5)}")
    # Expected: False

    print("\nAll tests completed!")
