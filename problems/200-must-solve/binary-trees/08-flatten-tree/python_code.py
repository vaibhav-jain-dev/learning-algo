"""
Flatten Binary Tree - Python Solution

Flatten a binary tree into a doubly linked list following in-order traversal.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
"""


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def flatten_binary_tree(root):
    """
    Flatten a binary tree into a doubly linked list (in-order).

    Args:
        root: Root of binary tree

    Returns:
        BinaryTree: The leftmost node of the flattened structure
    """
    if root is None:
        return None

    leftmost, _ = flatten_tree_helper(root)
    return leftmost


def flatten_tree_helper(node):
    """
    Helper function that returns (leftmost, rightmost) nodes of flattened subtree.

    Args:
        node: Current node

    Returns:
        tuple: (leftmost_node, rightmost_node) in the flattened structure
    """
    # Base case: leaf node
    if node.left is None and node.right is None:
        return (node, node)

    # Process left subtree
    if node.left is not None:
        left_leftmost, left_rightmost = flatten_tree_helper(node.left)

        # Connect left subtree's rightmost to current node
        left_rightmost.right = node
        node.left = left_rightmost
    else:
        left_leftmost = node

    # Process right subtree
    if node.right is not None:
        right_leftmost, right_rightmost = flatten_tree_helper(node.right)

        # Connect current node to right subtree's leftmost
        node.right = right_leftmost
        right_leftmost.left = node
    else:
        right_rightmost = node

    return (left_leftmost, right_rightmost)


def flatten_binary_tree_iterative(root):
    """
    Iterative approach using in-order traversal with stack.

    Args:
        root: Root of binary tree

    Returns:
        BinaryTree: The leftmost node of the flattened structure
    """
    if root is None:
        return None

    # In-order traversal to get nodes in order
    nodes = []
    stack = []
    current = root

    while current or stack:
        while current:
            stack.append(current)
            current = current.left

        current = stack.pop()
        nodes.append(current)
        current = current.right

    # Connect nodes as doubly linked list
    for i in range(len(nodes)):
        if i > 0:
            nodes[i].left = nodes[i - 1]
        else:
            nodes[i].left = None

        if i < len(nodes) - 1:
            nodes[i].right = nodes[i + 1]
        else:
            nodes[i].right = None

    return nodes[0] if nodes else None


def print_flattened_tree(head):
    """Print the flattened tree as a doubly linked list."""
    values = []
    current = head
    while current:
        values.append(current.value)
        current = current.right
    return values


def verify_doubly_linked(head):
    """Verify the structure is a valid doubly linked list."""
    if head is None:
        return True

    current = head
    prev = None

    while current:
        if current.left != prev:
            return False
        prev = current
        current = current.right

    return True


# Test cases
if __name__ == "__main__":
    # Build test tree:
    #        1
    #      /   \
    #     2     3
    #    / \   /
    #   4   5 6

    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    root.left.left = BinaryTree(4)
    root.left.right = BinaryTree(5)
    root.right.left = BinaryTree(6)

    # Test 1: Recursive approach
    result1 = flatten_binary_tree(root)
    print(f"Test 1 - Flattened (recursive): {print_flattened_tree(result1)}")
    print(f"Is valid doubly linked: {verify_doubly_linked(result1)}")
    # Expected: [4, 2, 5, 1, 6, 3]

    # Build another tree for iterative test
    root2 = BinaryTree(1)
    root2.left = BinaryTree(2)
    root2.right = BinaryTree(3)
    root2.left.left = BinaryTree(4)
    root2.left.right = BinaryTree(5)
    root2.right.left = BinaryTree(6)

    # Test 2: Iterative approach
    result2 = flatten_binary_tree_iterative(root2)
    print(f"\nTest 2 - Flattened (iterative): {print_flattened_tree(result2)}")
    print(f"Is valid doubly linked: {verify_doubly_linked(result2)}")
    # Expected: [4, 2, 5, 1, 6, 3]

    # Test 3: Single node
    single = BinaryTree(42)
    result3 = flatten_binary_tree(single)
    print(f"\nTest 3 - Single node: {print_flattened_tree(result3)}")
    # Expected: [42]

    # Test 4: Empty tree
    result4 = flatten_binary_tree(None)
    print(f"Test 4 - Empty tree: {result4}")
    # Expected: None

    # Test 5: Left-only tree
    left_only = BinaryTree(1)
    left_only.left = BinaryTree(2)
    left_only.left.left = BinaryTree(3)
    result5 = flatten_binary_tree(left_only)
    print(f"\nTest 5 - Left-only: {print_flattened_tree(result5)}")
    # Expected: [3, 2, 1]

    # Test 6: Right-only tree
    right_only = BinaryTree(1)
    right_only.right = BinaryTree(2)
    right_only.right.right = BinaryTree(3)
    result6 = flatten_binary_tree(right_only)
    print(f"Test 6 - Right-only: {print_flattened_tree(result6)}")
    # Expected: [1, 2, 3]

    # Test 7: Complete binary tree
    #        1
    #      /   \
    #     2     3
    #    / \   / \
    #   4   5 6   7

    complete = BinaryTree(1)
    complete.left = BinaryTree(2)
    complete.right = BinaryTree(3)
    complete.left.left = BinaryTree(4)
    complete.left.right = BinaryTree(5)
    complete.right.left = BinaryTree(6)
    complete.right.right = BinaryTree(7)

    result7 = flatten_binary_tree(complete)
    print(f"\nTest 7 - Complete tree: {print_flattened_tree(result7)}")
    print(f"Is valid doubly linked: {verify_doubly_linked(result7)}")
    # Expected: [4, 2, 5, 1, 6, 3, 7]

    print("\nAll tests completed!")
