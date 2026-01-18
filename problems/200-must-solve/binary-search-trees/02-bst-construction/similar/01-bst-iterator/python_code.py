"""
BST Iterator - Python Solutions

Implement an iterator over a BST that returns elements in sorted order.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional, Iterator
from collections import deque


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: Stack-Based (Controlled Recursion) - OPTIMAL
# ============================================================================
# Time Complexity:  O(1) amortized for next(), O(1) for hasNext()
# Space Complexity: O(h) where h is tree height
#
# WHY THIS IS OPTIMAL:
# - Each node is pushed and popped exactly once across all calls
# - Space is proportional to height, not total nodes
# - Simulates recursion using explicit stack
# ============================================================================

class BSTIterator:
    """
    Stack-based BST iterator for O(h) space complexity.

    Key insight: We maintain a stack representing the current path
    from some ancestor to the leftmost unvisited node.
    """

    def __init__(self, root: Optional[TreeNode]):
        """Initialize iterator with root and push leftmost path."""
        self.stack = []
        self._push_left_path(root)

    def _push_left_path(self, node: Optional[TreeNode]) -> None:
        """Push all left children starting from node."""
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        """
        Return the next smallest number.

        Pop top (smallest current), then push leftmost path
        of its right subtree (next candidates).
        """
        node = self.stack.pop()

        # If there's a right subtree, push its leftmost path
        if node.right:
            self._push_left_path(node.right)

        return node.val

    def hasNext(self) -> bool:
        """Return True if there are more elements."""
        return len(self.stack) > 0


# ============================================================================
# APPROACH 2: Precomputed Array (Simple but More Space)
# ============================================================================
# Time Complexity:  O(n) for construction, O(1) for operations
# Space Complexity: O(n) to store all values
#
# WHEN TO USE:
# - Simplicity is preferred
# - Memory is not a concern
# ============================================================================

class BSTIteratorArray:
    """
    Array-based BST iterator storing all values upfront.

    Simple but uses O(n) space.
    """

    def __init__(self, root: Optional[TreeNode]):
        """Initialize with precomputed inorder traversal."""
        self.values = []
        self.index = 0
        self._inorder(root)

    def _inorder(self, node: Optional[TreeNode]) -> None:
        """Perform inorder traversal and store values."""
        if not node:
            return
        self._inorder(node.left)
        self.values.append(node.val)
        self._inorder(node.right)

    def next(self) -> int:
        """Return the next smallest number."""
        val = self.values[self.index]
        self.index += 1
        return val

    def hasNext(self) -> bool:
        """Return True if there are more elements."""
        return self.index < len(self.values)


# ============================================================================
# APPROACH 3: Generator-Based (Pythonic)
# ============================================================================
# Time Complexity:  O(1) amortized per operation
# Space Complexity: O(h) for generator stack frames
#
# PYTHONIC APPROACH:
# - Uses Python generator for clean iteration
# - Natural fit for iterator pattern
# - Lazy evaluation
# ============================================================================

class BSTIteratorGenerator:
    """
    Generator-based BST iterator - most Pythonic approach.

    Uses yield from for clean recursive generation.
    """

    def __init__(self, root: Optional[TreeNode]):
        """Initialize with a generator over the tree."""
        self._generator = self._inorder_generator(root)
        self._next_value = None
        self._has_next = True
        self._advance()

    def _inorder_generator(self, node: Optional[TreeNode]) -> Iterator[int]:
        """Generate values in inorder using yield."""
        if node:
            yield from self._inorder_generator(node.left)
            yield node.val
            yield from self._inorder_generator(node.right)

    def _advance(self) -> None:
        """Advance to next value."""
        try:
            self._next_value = next(self._generator)
        except StopIteration:
            self._has_next = False

    def next(self) -> int:
        """Return the next smallest number."""
        val = self._next_value
        self._advance()
        return val

    def hasNext(self) -> bool:
        """Return True if there are more elements."""
        return self._has_next


# ============================================================================
# APPROACH 4: Python Iterator Protocol (Most Idiomatic)
# ============================================================================
# Implements Python's iterator protocol (__iter__, __next__)
# allowing use in for loops and other Python constructs
# ============================================================================

class BSTIteratorPythonic:
    """
    Fully Pythonic BST iterator implementing iterator protocol.

    Can be used in for loops: for val in iterator: ...
    """

    def __init__(self, root: Optional[TreeNode]):
        """Initialize with stack-based approach."""
        self.stack = []
        self._push_left_path(root)

    def _push_left_path(self, node: Optional[TreeNode]) -> None:
        """Push all left children."""
        while node:
            self.stack.append(node)
            node = node.left

    def __iter__(self):
        """Return self as iterator."""
        return self

    def __next__(self) -> int:
        """Return next value or raise StopIteration."""
        if not self.stack:
            raise StopIteration

        node = self.stack.pop()
        if node.right:
            self._push_left_path(node.right)

        return node.val

    # Also provide next() and hasNext() for compatibility
    def next(self) -> int:
        """Return the next smallest number."""
        return self.__next__()

    def hasNext(self) -> bool:
        """Return True if there are more elements."""
        return len(self.stack) > 0


# ============================================================================
# APPROACH 5: Bidirectional Iterator
# ============================================================================
# Supports both forward and backward iteration
# ============================================================================

class BSTIteratorBidirectional:
    """
    Bidirectional BST iterator supporting both directions.

    Useful for problems needing predecessor and successor.
    """

    def __init__(self, root: Optional[TreeNode]):
        """Initialize with all values stored."""
        self.values = []
        self.index = -1  # Before first element
        self._inorder(root)

    def _inorder(self, node: Optional[TreeNode]) -> None:
        """Perform inorder traversal."""
        if not node:
            return
        self._inorder(node.left)
        self.values.append(node.val)
        self._inorder(node.right)

    def next(self) -> int:
        """Return next value (moving forward)."""
        self.index += 1
        return self.values[self.index]

    def prev(self) -> int:
        """Return previous value (moving backward)."""
        self.index -= 1
        return self.values[self.index]

    def hasNext(self) -> bool:
        """Return True if can move forward."""
        return self.index < len(self.values) - 1

    def hasPrev(self) -> bool:
        """Return True if can move backward."""
        return self.index > 0

    def peek(self) -> Optional[int]:
        """Return current value without moving."""
        if 0 <= self.index < len(self.values):
            return self.values[self.index]
        return None


# ============================================================================
# HELPER: Build BST from array (for testing)
# ============================================================================

def build_bst(values: list[int]) -> Optional[TreeNode]:
    """Build a BST from a list of values."""
    if not values:
        return None

    root = TreeNode(values[0])

    for val in values[1:]:
        insert_bst(root, val)

    return root


def insert_bst(root: TreeNode, val: int) -> None:
    """Insert a value into BST."""
    current = root
    while True:
        if val < current.val:
            if current.left is None:
                current.left = TreeNode(val)
                return
            current = current.left
        else:
            if current.right is None:
                current.right = TreeNode(val)
                return
            current = current.right


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("BST ITERATOR - TEST RESULTS")
    print("=" * 70)

    # Build test tree
    #          7
    #         / \
    #        3   15
    #           /  \
    #          9    20
    root = build_bst([7, 3, 15, 9, 20])

    print("\nTest Tree:")
    print("          7")
    print("         / \\")
    print("        3   15")
    print("           /  \\")
    print("          9    20")
    print("\nExpected inorder: [3, 7, 9, 15, 20]")

    # Test Approach 1: Stack-based
    print("\n--- Approach 1: Stack-Based (Optimal) ---")
    iter1 = BSTIterator(root)
    result = []
    while iter1.hasNext():
        result.append(iter1.next())
    print(f"Iteration: {result}")

    # Test Approach 2: Array-based
    print("\n--- Approach 2: Array-Based ---")
    iter2 = BSTIteratorArray(root)
    result = []
    while iter2.hasNext():
        result.append(iter2.next())
    print(f"Iteration: {result}")

    # Test Approach 3: Generator-based
    print("\n--- Approach 3: Generator-Based ---")
    iter3 = BSTIteratorGenerator(root)
    result = []
    while iter3.hasNext():
        result.append(iter3.next())
    print(f"Iteration: {result}")

    # Test Approach 4: Pythonic (for loop compatible)
    print("\n--- Approach 4: Pythonic (for loop) ---")
    iter4 = BSTIteratorPythonic(root)
    result = list(iter4)  # Can use in list() or for loop!
    print(f"Iteration: {result}")

    # Test Approach 5: Bidirectional
    print("\n--- Approach 5: Bidirectional ---")
    iter5 = BSTIteratorBidirectional(root)
    forward = []
    while iter5.hasNext():
        forward.append(iter5.next())
    print(f"Forward:  {forward}")

    backward = []
    while iter5.hasPrev():
        backward.append(iter5.prev())
    print(f"Backward: {backward}")

    # Test operations sequence matching problem description
    print("\n--- Operations Sequence (from problem) ---")
    iterator = BSTIterator(root)
    print(f"next():    {iterator.next()} (expected 3)")
    print(f"next():    {iterator.next()} (expected 7)")
    print(f"hasNext(): {iterator.hasNext()} (expected True)")
    print(f"next():    {iterator.next()} (expected 9)")
    print(f"hasNext(): {iterator.hasNext()} (expected True)")
    print(f"next():    {iterator.next()} (expected 15)")
    print(f"hasNext(): {iterator.hasNext()} (expected True)")
    print(f"next():    {iterator.next()} (expected 20)")
    print(f"hasNext(): {iterator.hasNext()} (expected False)")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
