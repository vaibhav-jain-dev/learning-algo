"""
BST Iterator - Python Solution

Implement an iterator over a BST's inorder traversal.

Time Complexity: O(1) average for next() and hasNext()
Space Complexity: O(h) where h is height of tree
"""

from typing import Optional, List


class TreeNode:
    def __init__(self, val: int = 0):
        self.val = val
        self.left: Optional[TreeNode] = None
        self.right: Optional[TreeNode] = None


class BSTIterator:
    """
    Iterator for inorder traversal of BST.

    Uses controlled recursion with explicit stack to achieve
    O(h) space complexity and O(1) average time for operations.
    """

    def __init__(self, root: Optional[TreeNode]):
        """
        Initialize iterator with BST root.

        Pushes all left children onto stack to prepare for first next().
        """
        self.stack: List[TreeNode] = []
        self._push_left_branch(root)

    def _push_left_branch(self, node: Optional[TreeNode]) -> None:
        """Push node and all its left descendants onto stack."""
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        """
        Return the next smallest number in BST.

        Pops from stack, pushes left branch of right child.
        """
        # Pop the next smallest node
        node = self.stack.pop()

        # If it has a right child, push all left descendants of right child
        if node.right:
            self._push_left_branch(node.right)

        return node.val

    def has_next(self) -> bool:
        """Return True if there are more elements to iterate."""
        return len(self.stack) > 0


class BSTIteratorFlattened:
    """
    Alternative implementation that flattens BST to array.

    Simpler but uses O(n) space.
    """

    def __init__(self, root: Optional[TreeNode]):
        """Initialize by flattening BST to sorted array."""
        self.values: List[int] = []
        self.index = 0
        self._inorder(root)

    def _inorder(self, node: Optional[TreeNode]) -> None:
        """Perform inorder traversal to flatten tree."""
        if node:
            self._inorder(node.left)
            self.values.append(node.val)
            self._inorder(node.right)

    def next(self) -> int:
        """Return next value and advance index."""
        val = self.values[self.index]
        self.index += 1
        return val

    def has_next(self) -> bool:
        """Check if more values exist."""
        return self.index < len(self.values)


class BSTIteratorBidirectional:
    """
    Extended iterator supporting both next() and prev().

    Uses two stacks to enable bidirectional traversal.
    """

    def __init__(self, root: Optional[TreeNode]):
        """Initialize with flattened array for bidirectional support."""
        self.values: List[int] = []
        self.index = -1  # Start before first element
        self._inorder(root)

    def _inorder(self, node: Optional[TreeNode]) -> None:
        if node:
            self._inorder(node.left)
            self.values.append(node.val)
            self._inorder(node.right)

    def next(self) -> int:
        """Move forward and return value."""
        self.index += 1
        return self.values[self.index]

    def prev(self) -> int:
        """Move backward and return value."""
        self.index -= 1
        return self.values[self.index]

    def has_next(self) -> bool:
        """Check if can move forward."""
        return self.index < len(self.values) - 1

    def has_prev(self) -> bool:
        """Check if can move backward."""
        return self.index > 0


def build_tree_from_list(values: List[Optional[int]]) -> Optional[TreeNode]:
    """Build tree from level-order list representation."""
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


# Example usage and test cases
if __name__ == "__main__":
    # Build test tree:
    #        7
    #      /   \
    #     3     15
    #          /  \
    #         9    20

    root = TreeNode(7)
    root.left = TreeNode(3)
    root.right = TreeNode(15)
    root.right.left = TreeNode(9)
    root.right.right = TreeNode(20)

    print("=== BST Iterator (Stack-based) ===")
    iterator = BSTIterator(root)

    print(f"next(): {iterator.next()}")      # Expected: 3
    print(f"next(): {iterator.next()}")      # Expected: 7
    print(f"has_next(): {iterator.has_next()}")  # Expected: True
    print(f"next(): {iterator.next()}")      # Expected: 9
    print(f"has_next(): {iterator.has_next()}")  # Expected: True
    print(f"next(): {iterator.next()}")      # Expected: 15
    print(f"has_next(): {iterator.has_next()}")  # Expected: True
    print(f"next(): {iterator.next()}")      # Expected: 20
    print(f"has_next(): {iterator.has_next()}")  # Expected: False
    print()

    # Test 2: Compare implementations
    print("=== Comparing Implementations ===")
    iterator1 = BSTIterator(root)
    iterator2 = BSTIteratorFlattened(root)

    values1 = []
    values2 = []

    while iterator1.has_next():
        values1.append(iterator1.next())

    while iterator2.has_next():
        values2.append(iterator2.next())

    print(f"Stack-based:     {values1}")
    print(f"Flattened:       {values2}")
    print(f"Results match:   {values1 == values2}")
    print()

    # Test 3: Bidirectional iterator
    print("=== Bidirectional Iterator ===")
    bi_iter = BSTIteratorBidirectional(root)

    print(f"next(): {bi_iter.next()}")    # 3
    print(f"next(): {bi_iter.next()}")    # 7
    print(f"next(): {bi_iter.next()}")    # 9
    print(f"prev(): {bi_iter.prev()}")    # 7
    print(f"prev(): {bi_iter.prev()}")    # 3
    print(f"has_prev(): {bi_iter.has_prev()}")  # False (at start)
    print(f"next(): {bi_iter.next()}")    # 7
    print()

    # Test 4: Larger tree
    print("=== Larger Tree Test ===")
    #        10
    #       /  \
    #      5    15
    #     / \   / \
    #    3   7 12  20

    large_root = TreeNode(10)
    large_root.left = TreeNode(5)
    large_root.right = TreeNode(15)
    large_root.left.left = TreeNode(3)
    large_root.left.right = TreeNode(7)
    large_root.right.left = TreeNode(12)
    large_root.right.right = TreeNode(20)

    large_iter = BSTIterator(large_root)
    all_values = []
    while large_iter.has_next():
        all_values.append(large_iter.next())

    print(f"Inorder traversal: {all_values}")
    print(f"Is sorted: {all_values == sorted(all_values)}")
    print()

    # Test 5: Single node
    print("=== Single Node Test ===")
    single = TreeNode(42)
    single_iter = BSTIterator(single)

    print(f"has_next(): {single_iter.has_next()}")  # True
    print(f"next(): {single_iter.next()}")          # 42
    print(f"has_next(): {single_iter.has_next()}")  # False

    print("\nAll tests completed!")
