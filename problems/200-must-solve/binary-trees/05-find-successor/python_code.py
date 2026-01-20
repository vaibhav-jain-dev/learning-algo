"""
Find Successor - Python Solution

Find the in-order successor of a node in a binary tree with parent pointers.

Time Complexity: O(h) where h is the height of the tree
Space Complexity: O(1)
"""


class BinaryTree:
    def __init__(self, value, parent=None):
        self.value = value
        self.left = None
        self.right = None
        self.parent = parent


def find_successor(tree, node):
    """
    Find the in-order successor of a given node.

    Args:
        tree: Root of the binary tree (not used but included for API consistency)
        node: The target node to find successor for

    Returns:
        BinaryTree: The in-order successor node, or None if none exists
    """
    if node is None:
        return None

    # Case 1: Node has a right subtree
    # Successor is the leftmost node in the right subtree
    if node.right is not None:
        return get_leftmost_child(node.right)

    # Case 2: Node has no right subtree
    # Go up until we find a node that is a left child of its parent
    return get_rightmost_parent(node)


def get_leftmost_child(node):
    """Get the leftmost node in a subtree."""
    current = node
    while current.left is not None:
        current = current.left
    return current


def get_rightmost_parent(node):
    """
    Go up the tree until we find a parent where node is in left subtree.

    That parent is the successor.
    """
    current = node
    while current.parent is not None and current.parent.right == current:
        current = current.parent
    return current.parent


def inorder_traversal(node, result=None):
    """Helper to get in-order traversal for verification."""
    if result is None:
        result = []
    if node:
        inorder_traversal(node.left, result)
        result.append(node.value)
        inorder_traversal(node.right, result)
    return result


# Test cases
if __name__ == "__main__":
    # Build test tree with parent pointers:
    #        1
    #      /   \
    #     2     3
    #    / \
    #   4   5
    #  /
    # 6

    root = BinaryTree(1)
    root.left = BinaryTree(2, parent=root)
    root.right = BinaryTree(3, parent=root)
    root.left.left = BinaryTree(4, parent=root.left)
    root.left.right = BinaryTree(5, parent=root.left)
    root.left.left.left = BinaryTree(6, parent=root.left.left)

    # Show in-order traversal
    print("In-order traversal:", inorder_traversal(root))
    # Expected: [6, 4, 2, 5, 1, 3]

    # Test 1: Successor of node 5 (should be 1)
    node_5 = root.left.right
    result1 = find_successor(root, node_5)
    print(f"\nTest 1 - Successor of 5: {result1.value if result1 else None}")
    # Expected: 1

    # Test 2: Successor of node 6 (should be 4)
    node_6 = root.left.left.left
    result2 = find_successor(root, node_6)
    print(f"Test 2 - Successor of 6: {result2.value if result2 else None}")
    # Expected: 4

    # Test 3: Successor of node 4 (should be 2)
    node_4 = root.left.left
    result3 = find_successor(root, node_4)
    print(f"Test 3 - Successor of 4: {result3.value if result3 else None}")
    # Expected: 2

    # Test 4: Successor of node 2 (should be 5)
    node_2 = root.left
    result4 = find_successor(root, node_2)
    print(f"Test 4 - Successor of 2: {result4.value if result4 else None}")
    # Expected: 5

    # Test 5: Successor of node 1 (should be 3)
    result5 = find_successor(root, root)
    print(f"Test 5 - Successor of 1: {result5.value if result5 else None}")
    # Expected: 3

    # Test 6: Successor of node 3 (should be None - last in traversal)
    node_3 = root.right
    result6 = find_successor(root, node_3)
    print(f"Test 6 - Successor of 3: {result6.value if result6 else None}")
    # Expected: None

    # Test 7: Single node tree
    single = BinaryTree(42)
    result7 = find_successor(single, single)
    print(f"\nTest 7 - Single node successor: {result7.value if result7 else None}")
    # Expected: None

    # Test 8: Complete binary tree
    #      10
    #     /  \
    #    5   15
    #   / \  / \
    #  3  7 12 20

    complete = BinaryTree(10)
    complete.left = BinaryTree(5, parent=complete)
    complete.right = BinaryTree(15, parent=complete)
    complete.left.left = BinaryTree(3, parent=complete.left)
    complete.left.right = BinaryTree(7, parent=complete.left)
    complete.right.left = BinaryTree(12, parent=complete.right)
    complete.right.right = BinaryTree(20, parent=complete.right)

    print("\nComplete tree in-order:", inorder_traversal(complete))
    # Expected: [3, 5, 7, 10, 12, 15, 20]

    # Successor of 7 should be 10
    result8 = find_successor(complete, complete.left.right)
    print(f"Test 8 - Successor of 7: {result8.value if result8 else None}")
    # Expected: 10

    # Successor of 10 should be 12
    result9 = find_successor(complete, complete)
    print(f"Test 9 - Successor of 10: {result9.value if result9 else None}")
    # Expected: 12

    print("\nAll tests completed!")
