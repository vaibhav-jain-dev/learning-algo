"""
Iterative In-Order Traversal (Morris Traversal) - Python Solution

Perform in-order traversal without recursion or stack using Morris Traversal.
This achieves O(1) space complexity by temporarily modifying tree structure.

Time Complexity: O(n)
Space Complexity: O(1) excluding output array
"""


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def iterative_inorder_traversal(tree):
    """
    Morris Traversal for in-order traversal without recursion or stack.

    The key insight is using "threads" - temporary links from a node's
    inorder predecessor back to the node itself. This allows us to
    return to a node after processing its left subtree.

    Args:
        tree: Root of binary tree

    Returns:
        List[int]: In-order traversal of node values
    """
    result = []
    current = tree

    while current is not None:
        if current.left is None:
            # No left child: visit current and go right
            result.append(current.value)
            current = current.right
        else:
            # Has left child: find inorder predecessor
            predecessor = find_predecessor(current)

            if predecessor.right is None:
                # First visit: create thread and go left
                predecessor.right = current
                current = current.left
            else:
                # Second visit (via thread): remove thread, visit, go right
                predecessor.right = None  # Restore tree structure
                result.append(current.value)
                current = current.right

    return result


def find_predecessor(node):
    """
    Find the inorder predecessor of a node.
    The predecessor is the rightmost node in the left subtree,
    but we stop if we hit a thread back to the original node.
    """
    predecessor = node.left

    # Go right until we hit null or a thread back to node
    while predecessor.right is not None and predecessor.right != node:
        predecessor = predecessor.right

    return predecessor


def inorder_with_stack(tree):
    """
    Standard iterative in-order traversal using stack (for comparison).
    Time: O(n), Space: O(h)
    """
    result = []
    stack = []
    current = tree

    while current is not None or stack:
        # Go left as far as possible
        while current is not None:
            stack.append(current)
            current = current.left

        # Process current node
        current = stack.pop()
        result.append(current.value)

        # Go right
        current = current.right

    return result


def inorder_recursive(tree):
    """
    Recursive in-order traversal (for comparison).
    Time: O(n), Space: O(h) for call stack
    """
    result = []

    def traverse(node):
        if node is None:
            return
        traverse(node.left)
        result.append(node.value)
        traverse(node.right)

    traverse(tree)
    return result


def verify_tree_structure(tree, expected_structure):
    """Helper to verify tree wasn't permanently modified."""
    if tree is None and expected_structure is None:
        return True
    if tree is None or expected_structure is None:
        return False
    if tree.value != expected_structure[0]:
        return False

    left_struct = expected_structure[1] if len(expected_structure) > 1 else None
    right_struct = expected_structure[2] if len(expected_structure) > 2 else None

    return (verify_tree_structure(tree.left, left_struct) and
            verify_tree_structure(tree.right, right_struct))


# Test cases
if __name__ == "__main__":
    # Test 1: Balanced tree
    #         4
    #       /   \
    #      2     6
    #     / \   / \
    #    1   3 5   7
    # Expected in-order: [1, 2, 3, 4, 5, 6, 7]

    root1 = BinaryTree(4)
    root1.left = BinaryTree(2)
    root1.right = BinaryTree(6)
    root1.left.left = BinaryTree(1)
    root1.left.right = BinaryTree(3)
    root1.right.left = BinaryTree(5)
    root1.right.right = BinaryTree(7)

    result1 = iterative_inorder_traversal(root1)
    print(f"Test 1 (Morris): {result1}")
    # Verify with recursive
    expected1 = inorder_recursive(root1)
    print(f"Test 1 (Recursive verification): {expected1}")
    print(f"Test 1 Match: {result1 == expected1}")

    # Test 2: Right-skewed tree
    #    1
    #     \
    #      2
    #       \
    #        3
    # Expected: [1, 2, 3]

    root2 = BinaryTree(1)
    root2.right = BinaryTree(2)
    root2.right.right = BinaryTree(3)

    result2 = iterative_inorder_traversal(root2)
    print(f"\nTest 2 (right-skewed): {result2}")
    # Expected: [1, 2, 3]

    # Test 3: Left-skewed tree
    #        3
    #       /
    #      2
    #     /
    #    1
    # Expected: [1, 2, 3]

    root3 = BinaryTree(3)
    root3.left = BinaryTree(2)
    root3.left.left = BinaryTree(1)

    result3 = iterative_inorder_traversal(root3)
    print(f"Test 3 (left-skewed): {result3}")
    # Expected: [1, 2, 3]

    # Test 4: Single node
    root4 = BinaryTree(42)
    result4 = iterative_inorder_traversal(root4)
    print(f"Test 4 (single node): {result4}")
    # Expected: [42]

    # Test 5: Empty tree
    result5 = iterative_inorder_traversal(None)
    print(f"Test 5 (empty): {result5}")
    # Expected: []

    # Test 6: Complex tree
    #         1
    #          \
    #           2
    #          /
    #         3
    # Expected: [1, 3, 2]

    root6 = BinaryTree(1)
    root6.right = BinaryTree(2)
    root6.right.left = BinaryTree(3)

    result6 = iterative_inorder_traversal(root6)
    print(f"Test 6 (zigzag): {result6}")
    # Expected: [1, 3, 2]

    # Test 7: Verify tree structure is restored after Morris traversal
    root7 = BinaryTree(4)
    root7.left = BinaryTree(2)
    root7.right = BinaryTree(6)
    root7.left.left = BinaryTree(1)
    root7.left.right = BinaryTree(3)

    # Store original structure
    original_structure = [4, [2, [1], [3]], [6]]

    # Perform Morris traversal
    _ = iterative_inorder_traversal(root7)

    # Verify structure restored
    is_restored = verify_tree_structure(root7, original_structure)
    print(f"\nTest 7 (structure preserved): {is_restored}")

    # Test 8: Compare all three methods on larger tree
    root8 = BinaryTree(10)
    root8.left = BinaryTree(5)
    root8.right = BinaryTree(15)
    root8.left.left = BinaryTree(3)
    root8.left.right = BinaryTree(7)
    root8.right.left = BinaryTree(12)
    root8.right.right = BinaryTree(20)
    root8.left.left.left = BinaryTree(1)
    root8.left.right.left = BinaryTree(6)
    root8.right.right.right = BinaryTree(25)

    morris_result = iterative_inorder_traversal(root8)
    stack_result = inorder_with_stack(root8)
    recursive_result = inorder_recursive(root8)

    print(f"\nTest 8 (comparison):")
    print(f"  Morris:    {morris_result}")
    print(f"  Stack:     {stack_result}")
    print(f"  Recursive: {recursive_result}")
    print(f"  All match: {morris_result == stack_result == recursive_result}")

    # Test 9: Full binary tree
    #              8
    #           /     \
    #          4       12
    #         / \     /  \
    #        2   6   10   14
    #       /\ / \  / \   / \
    #      1 3 5 7 9 11 13 15

    root9 = BinaryTree(8)
    root9.left = BinaryTree(4)
    root9.right = BinaryTree(12)
    root9.left.left = BinaryTree(2)
    root9.left.right = BinaryTree(6)
    root9.right.left = BinaryTree(10)
    root9.right.right = BinaryTree(14)
    root9.left.left.left = BinaryTree(1)
    root9.left.left.right = BinaryTree(3)
    root9.left.right.left = BinaryTree(5)
    root9.left.right.right = BinaryTree(7)
    root9.right.left.left = BinaryTree(9)
    root9.right.left.right = BinaryTree(11)
    root9.right.right.left = BinaryTree(13)
    root9.right.right.right = BinaryTree(15)

    result9 = iterative_inorder_traversal(root9)
    print(f"\nTest 9 (full tree): {result9}")
    # Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    print("\nAll tests completed!")
