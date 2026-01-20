"""
Repair BST - Python Solution

Two nodes in a BST are swapped by mistake. Find and repair them.
Includes O(1) space Morris Traversal solution.

Time Complexity: O(n)
Space Complexity: O(1) for Morris Traversal, O(h) for recursive/iterative
"""

from typing import Optional, List, Tuple


class TreeNode:
    def __init__(self, val: int = 0):
        self.val = val
        self.left: Optional[TreeNode] = None
        self.right: Optional[TreeNode] = None


def repair_bst_recursive(root: Optional[TreeNode]) -> None:
    """
    Repair BST using recursive inorder traversal.

    Time: O(n), Space: O(h) for recursion stack

    Algorithm:
    1. Track previous node during inorder traversal
    2. Find inversions (prev.val > current.val)
    3. First inversion: first_bad = prev, second_bad = current
    4. Second inversion (if exists): second_bad = current
    5. Swap values of first_bad and second_bad
    """
    first_bad: List[Optional[TreeNode]] = [None]
    second_bad: List[Optional[TreeNode]] = [None]
    prev: List[Optional[TreeNode]] = [None]

    def inorder(node: Optional[TreeNode]) -> None:
        if not node:
            return

        # Traverse left subtree
        inorder(node.left)

        # Process current node - check for inversion
        if prev[0] and prev[0].val > node.val:
            # Found an inversion
            if first_bad[0] is None:
                # First inversion: both nodes are candidates
                first_bad[0] = prev[0]
                second_bad[0] = node
            else:
                # Second inversion: update second_bad only
                second_bad[0] = node

        prev[0] = node

        # Traverse right subtree
        inorder(node.right)

    inorder(root)

    # Swap values of the two bad nodes
    if first_bad[0] and second_bad[0]:
        first_bad[0].val, second_bad[0].val = second_bad[0].val, first_bad[0].val


def repair_bst_iterative(root: Optional[TreeNode]) -> None:
    """
    Repair BST using iterative inorder traversal with explicit stack.

    Time: O(n), Space: O(h) for stack
    """
    stack: List[TreeNode] = []
    current = root
    prev: Optional[TreeNode] = None
    first_bad: Optional[TreeNode] = None
    second_bad: Optional[TreeNode] = None

    while stack or current:
        # Go to leftmost node
        while current:
            stack.append(current)
            current = current.left

        # Process current node
        current = stack.pop()

        # Check for inversion
        if prev and prev.val > current.val:
            if first_bad is None:
                first_bad = prev
                second_bad = current
            else:
                second_bad = current

        prev = current
        current = current.right

    # Swap values
    if first_bad and second_bad:
        first_bad.val, second_bad.val = second_bad.val, first_bad.val


def repair_bst_morris(root: Optional[TreeNode]) -> None:
    """
    Repair BST using Morris Traversal - O(1) space!

    Morris Traversal creates temporary "threads" (links from inorder predecessor
    to current node) to traverse without stack/recursion.

    Time: O(n), Space: O(1)

    Morris Traversal Steps:
    1. If no left child: visit node, go right
    2. If left child exists:
       a. Find inorder predecessor (rightmost node in left subtree)
       b. If predecessor.right is None: create thread, go left
       c. If predecessor.right is current: remove thread, visit node, go right
    """
    current = root
    prev: Optional[TreeNode] = None
    first_bad: Optional[TreeNode] = None
    second_bad: Optional[TreeNode] = None

    while current:
        if current.left is None:
            # No left subtree - visit current node
            if prev and prev.val > current.val:
                if first_bad is None:
                    first_bad = prev
                    second_bad = current
                else:
                    second_bad = current

            prev = current
            current = current.right
        else:
            # Has left subtree - find inorder predecessor
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                # Create thread: predecessor points back to current
                predecessor.right = current
                current = current.left
            else:
                # Thread exists - remove it and visit current
                predecessor.right = None

                # Visit current node (check for inversion)
                if prev and prev.val > current.val:
                    if first_bad is None:
                        first_bad = prev
                        second_bad = current
                    else:
                        second_bad = current

                prev = current
                current = current.right

    # Swap values of the two bad nodes
    if first_bad and second_bad:
        first_bad.val, second_bad.val = second_bad.val, first_bad.val


def get_inorder(root: Optional[TreeNode]) -> List[int]:
    """Helper to get inorder traversal as list."""
    result = []

    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)

    inorder(root)
    return result


def is_valid_bst(root: Optional[TreeNode]) -> bool:
    """Check if tree is a valid BST."""
    values = get_inorder(root)
    for i in range(1, len(values)):
        if values[i] <= values[i-1]:
            return False
    return True


def build_tree_from_list(values: List[Optional[int]]) -> Optional[TreeNode]:
    """Build tree from level-order list."""
    if not values or values[0] is None:
        return None

    root = TreeNode(values[0])
    queue = [root]
    i = 1

    while queue and i < len(values):
        node = queue.pop(0)

        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root


def clone_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    """Create a deep copy of a tree."""
    if not root:
        return None
    new_node = TreeNode(root.val)
    new_node.left = clone_tree(root.left)
    new_node.right = clone_tree(root.right)
    return new_node


# Test cases
if __name__ == "__main__":
    print("=== Repair BST Tests ===\n")

    # Test 1: Adjacent swap (nodes 1 and 3)
    # Original (broken):  1        Correct:    3
    #                    /                    /
    #                   3          ->        1
    #                    \                    \
    #                     2                    2
    print("Test 1: Adjacent swap")
    root1 = TreeNode(1)
    root1.left = TreeNode(3)
    root1.left.right = TreeNode(2)

    print(f"  Before: {get_inorder(root1)}")  # [3, 2, 1] - broken
    print(f"  Is valid BST: {is_valid_bst(root1)}")

    repair_bst_morris(root1)

    print(f"  After:  {get_inorder(root1)}")  # [1, 2, 3] - fixed
    print(f"  Is valid BST: {is_valid_bst(root1)}")
    print()

    # Test 2: Non-adjacent swap (nodes 2 and 3)
    # Original (broken):  3        Correct:    2
    #                    / \                  / \
    #                   1   4      ->        1   4
    #                      /                    /
    #                     2                    3
    print("Test 2: Non-adjacent swap")
    root2 = TreeNode(3)
    root2.left = TreeNode(1)
    root2.right = TreeNode(4)
    root2.right.left = TreeNode(2)

    print(f"  Before: {get_inorder(root2)}")  # [1, 3, 2, 4] - broken
    print(f"  Is valid BST: {is_valid_bst(root2)}")

    repair_bst_morris(root2)

    print(f"  After:  {get_inorder(root2)}")  # [1, 2, 3, 4] - fixed
    print(f"  Is valid BST: {is_valid_bst(root2)}")
    print()

    # Test 3: Larger tree with swap
    #        6                   6
    #      /   \               /   \
    #     2     8    ->       2     8
    #    / \   / \           / \   / \
    #   1   4 7   9         1   4 7   9
    #      / \                 / \
    #     5   3               3   5
    # Nodes 3 and 5 are swapped
    print("Test 3: Larger tree with adjacent-in-inorder swap")
    root3 = TreeNode(6)
    root3.left = TreeNode(2)
    root3.right = TreeNode(8)
    root3.left.left = TreeNode(1)
    root3.left.right = TreeNode(4)
    root3.left.right.left = TreeNode(5)   # Should be 3
    root3.left.right.right = TreeNode(3)  # Should be 5
    root3.right.left = TreeNode(7)
    root3.right.right = TreeNode(9)

    print(f"  Before: {get_inorder(root3)}")
    print(f"  Is valid BST: {is_valid_bst(root3)}")

    repair_bst_morris(root3)

    print(f"  After:  {get_inorder(root3)}")
    print(f"  Is valid BST: {is_valid_bst(root3)}")
    print()

    # Test 4: Compare all three methods
    print("Test 4: Comparing all three methods")

    # Create a broken BST: swap 2 and 6
    #        4                   4
    #      /   \               /   \
    #     6     7    ->       2     7
    #    / \                 / \
    #   1   3               1   3
    def create_broken_tree():
        root = TreeNode(4)
        root.left = TreeNode(6)   # Should be 2
        root.right = TreeNode(7)
        root.left.left = TreeNode(1)
        root.left.right = TreeNode(3)
        return root

    # Test recursive
    root_rec = create_broken_tree()
    print(f"  Broken tree inorder: {get_inorder(root_rec)}")

    root_rec_copy = clone_tree(root_rec)
    repair_bst_recursive(root_rec_copy)
    print(f"  After recursive repair: {get_inorder(root_rec_copy)}, valid: {is_valid_bst(root_rec_copy)}")

    # Test iterative
    root_iter_copy = clone_tree(root_rec)
    repair_bst_iterative(root_iter_copy)
    print(f"  After iterative repair: {get_inorder(root_iter_copy)}, valid: {is_valid_bst(root_iter_copy)}")

    # Test Morris
    root_morris_copy = clone_tree(root_rec)
    repair_bst_morris(root_morris_copy)
    print(f"  After Morris repair:    {get_inorder(root_morris_copy)}, valid: {is_valid_bst(root_morris_copy)}")
    print()

    # Test 5: Root is one of the swapped nodes
    print("Test 5: Root is swapped")
    #        1                   5
    #      /   \               /   \
    #     2     6    ->       2     6
    #          / \               / \
    #         5   7             1   7
    # Root (1) and node 5 are swapped
    root5 = TreeNode(1)
    root5.left = TreeNode(2)
    root5.right = TreeNode(6)
    root5.right.left = TreeNode(5)
    root5.right.right = TreeNode(7)

    print(f"  Before: {get_inorder(root5)}")
    print(f"  Is valid BST: {is_valid_bst(root5)}")

    repair_bst_morris(root5)

    print(f"  After:  {get_inorder(root5)}")
    print(f"  Is valid BST: {is_valid_bst(root5)}")

    print("\nAll tests completed!")
