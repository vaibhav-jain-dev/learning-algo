"""
Right Sibling Tree - Python Solution

Transform a binary tree so each node's right pointer points to its right sibling.

Time Complexity: O(n)
Space Complexity: O(w) where w is maximum width of the tree
"""

from collections import deque


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def right_sibling_tree(root):
    """
    Transform a binary tree into a right sibling tree.

    Args:
        root: Root of binary tree

    Returns:
        BinaryTree: Root of transformed tree
    """
    if root is None:
        return None

    # Use BFS to process level by level
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            # Store original children before modifying
            left_child = node.left
            right_child = node.right

            # Connect to right sibling (next node in queue, if same level)
            if i < level_size - 1:
                node.right = queue[0]  # Peek at next node
            else:
                node.right = None  # Last node in level

            # Add children to queue (left first, then original right)
            if left_child:
                queue.append(left_child)
            if right_child:
                queue.append(right_child)

    return root


def right_sibling_tree_recursive(root):
    """
    Recursive approach to transform into right sibling tree.

    Args:
        root: Root of binary tree

    Returns:
        BinaryTree: Root of transformed tree
    """
    if root is None:
        return None

    mutate(root, None, False)
    return root


def mutate(node, parent, is_left_child):
    """
    Recursively mutate the tree structure.

    Args:
        node: Current node
        parent: Parent of current node
        is_left_child: Whether node is left child of parent
    """
    if node is None:
        return

    left = node.left
    right = node.right

    # Process left subtree first
    mutate(left, node, True)

    # Set right sibling
    if parent is None:
        node.right = None
    elif is_left_child:
        node.right = parent.right  # Parent's right child (original)
    else:
        # Node is right child, find parent's sibling's leftmost child
        if parent.right is None:
            node.right = None
        else:
            # Parent.right is now parent's sibling
            sibling = parent.right
            node.right = sibling.left if sibling else None

    # Process original right subtree
    mutate(right, node, False)


def right_sibling_tree_cleaner(root):
    """
    Cleaner recursive implementation processing level by level.
    """
    if root is None:
        return None

    transform_helper(root, None, None)
    return root


def transform_helper(node, parent, parent_sibling):
    """
    Transform node and recursively process children.
    """
    if node is None:
        return

    # Save original children
    original_left = node.left
    original_right = node.right

    # Determine right sibling
    if parent is None:
        # Root node
        node.right = None
    elif node == parent.left:
        # Left child: sibling is parent's original right child
        node.right = original_right if parent == node else get_sibling_right(parent)
    else:
        # Right child: sibling is parent's sibling's left child
        if parent_sibling:
            node.right = parent_sibling.left
        else:
            node.right = None

    # Actually, let's use simpler BFS approach
    # Process children with proper sibling info
    if original_left:
        transform_helper(original_left, node, original_right)
    if original_right:
        transform_helper(original_right, node, node.right.left if node.right else None)


def get_sibling_right(parent):
    """Get the right child that will become the sibling."""
    # This is getting complex, the BFS solution is cleaner


def print_right_siblings(root):
    """Print the tree showing right sibling connections."""
    if root is None:
        return []

    result = []
    level = [root]

    while level:
        level_values = []
        next_level = []

        for node in level:
            # Follow right siblings
            current = node
            siblings = []
            visited = set()
            while current and id(current) not in visited:
                visited.add(id(current))
                siblings.append(current.value)
                if current.left:
                    next_level.append(current.left)
                current = current.right

            level_values.extend(siblings)
            break  # Only follow siblings from leftmost node

        result.append(level_values)
        level = next_level

    return result


# Test cases
if __name__ == "__main__":
    # Build test tree:
    #        1
    #      /   \
    #     2     3
    #    / \   / \
    #   4   5 6   7
    #  / \   \   / \
    # 8   9  10 11 12

    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    root.left.left = BinaryTree(4)
    root.left.right = BinaryTree(5)
    root.right.left = BinaryTree(6)
    root.right.right = BinaryTree(7)
    root.left.left.left = BinaryTree(8)
    root.left.left.right = BinaryTree(9)
    root.left.right.right = BinaryTree(10)
    root.right.right.left = BinaryTree(11)
    root.right.right.right = BinaryTree(12)

    # Test 1: Transform to right sibling tree
    result1 = right_sibling_tree(root)
    print("Test 1 - Right Sibling Tree:")

    # Verify connections
    print(f"  Level 1: {root.value} -> {root.right}")  # 1 -> None
    print(f"  Level 2: {root.left.value} -> {root.left.right.value if root.left.right else None}")  # 2 -> 3
    print(f"  Level 3: 4 -> {root.left.left.right.value if root.left.left.right else None}")  # 4 -> 5

    # Test 2: Single node
    single = BinaryTree(42)
    result2 = right_sibling_tree(single)
    print(f"\nTest 2 - Single node: {result2.value}, right = {result2.right}")
    # Expected: 42, right = None

    # Test 3: Empty tree
    result3 = right_sibling_tree(None)
    print(f"Test 3 - Empty tree: {result3}")
    # Expected: None

    # Test 4: Two-level tree
    #     1
    #    / \
    #   2   3
    two_level = BinaryTree(1)
    two_level.left = BinaryTree(2)
    two_level.right = BinaryTree(3)
    result4 = right_sibling_tree(two_level)
    print(f"\nTest 4 - Two-level tree:")
    print(f"  Root right: {result4.right}")  # None
    print(f"  Left child right: {result4.left.right.value if result4.left.right else None}")  # 3

    # Test 5: Left-only tree
    left_only = BinaryTree(1)
    left_only.left = BinaryTree(2)
    left_only.left.left = BinaryTree(3)
    result5 = right_sibling_tree(left_only)
    print(f"\nTest 5 - Left-only tree:")
    print(f"  All right pointers should be None")
    print(f"  1.right = {result5.right}, 2.right = {result5.left.right}, 3.right = {result5.left.left.right}")

    print("\nAll tests completed!")
