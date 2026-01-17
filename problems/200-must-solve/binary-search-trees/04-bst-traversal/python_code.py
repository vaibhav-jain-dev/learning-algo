"""
BST Traversal - Python Solution

Implement in-order, pre-order, and post-order BST traversals.

Time Complexity: O(n)
Space Complexity: O(n) for result, O(d) for call stack
"""

class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def in_order_traverse(tree, array):
    """In-order traversal: Left -> Node -> Right."""
    if tree is not None:
        in_order_traverse(tree.left, array)
        array.append(tree.value)
        in_order_traverse(tree.right, array)
    return array


def pre_order_traverse(tree, array):
    """Pre-order traversal: Node -> Left -> Right."""
    if tree is not None:
        array.append(tree.value)
        pre_order_traverse(tree.left, array)
        pre_order_traverse(tree.right, array)
    return array


def post_order_traverse(tree, array):
    """Post-order traversal: Left -> Right -> Node."""
    if tree is not None:
        post_order_traverse(tree.left, array)
        post_order_traverse(tree.right, array)
        array.append(tree.value)
    return array


def in_order_iterative(tree):
    """Iterative in-order traversal using stack."""
    result = []
    stack = []
    current = tree

    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        result.append(current.value)
        current = current.right

    return result


def pre_order_iterative(tree):
    """Iterative pre-order traversal using stack."""
    if not tree:
        return []

    result = []
    stack = [tree]

    while stack:
        node = stack.pop()
        result.append(node.value)
        # Push right first so left is processed first
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result


def post_order_iterative(tree):
    """Iterative post-order traversal using two stacks."""
    if not tree:
        return []

    result = []
    stack1 = [tree]
    stack2 = []

    while stack1:
        node = stack1.pop()
        stack2.append(node)
        if node.left:
            stack1.append(node.left)
        if node.right:
            stack1.append(node.right)

    while stack2:
        result.append(stack2.pop().value)

    return result


# Test cases
if __name__ == "__main__":
    # Build test tree:
    #        10
    #       /  \
    #      5    15
    #     / \     \
    #    2   5    22
    #   /
    #  1

    root = BST(10)
    root.left = BST(5)
    root.right = BST(15)
    root.left.left = BST(2)
    root.left.right = BST(5)
    root.left.left.left = BST(1)
    root.right.right = BST(22)

    # Test recursive traversals
    print("Recursive Traversals:")
    print(f"In-order:   {in_order_traverse(root, [])}")
    # Expected: [1, 2, 5, 5, 10, 15, 22]

    print(f"Pre-order:  {pre_order_traverse(root, [])}")
    # Expected: [10, 5, 2, 1, 5, 15, 22]

    print(f"Post-order: {post_order_traverse(root, [])}")
    # Expected: [1, 2, 5, 5, 22, 15, 10]

    # Test iterative traversals
    print("\nIterative Traversals:")
    print(f"In-order:   {in_order_iterative(root)}")
    print(f"Pre-order:  {pre_order_iterative(root)}")
    print(f"Post-order: {post_order_iterative(root)}")

    # Test empty tree
    print("\nEmpty tree tests:")
    print(f"In-order of None:   {in_order_traverse(None, [])}")
    print(f"Pre-order of None:  {pre_order_traverse(None, [])}")
    print(f"Post-order of None: {post_order_traverse(None, [])}")

    # Test single node
    single = BST(42)
    print("\nSingle node tests:")
    print(f"In-order:   {in_order_traverse(single, [])}")
    print(f"Pre-order:  {pre_order_traverse(single, [])}")
    print(f"Post-order: {post_order_traverse(single, [])}")

    print("\nAll tests completed!")
