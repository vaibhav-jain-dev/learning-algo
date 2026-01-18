"""
Serialize and Deserialize BST - Python Solutions

Design an algorithm to serialize and deserialize a BST.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional
from collections import deque
import struct


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: Preorder + Bounds (Optimal for BST)
# ============================================================================
# Time Complexity:  O(n) for both serialize and deserialize
# Space Complexity: O(n) for string, O(h) for recursion
#
# WHY THIS IS OPTIMAL:
# - Most compact representation (no null markers)
# - Uses BST property to reconstruct structure
# - Each node value appears exactly once
# ============================================================================

class Codec:
    """
    Optimal BST serialization using preorder traversal.

    Key insight: BST property allows reconstruction without null markers.
    During deserialization, use bounds to determine valid placement.
    """

    def serialize(self, root: Optional[TreeNode]) -> str:
        """Encode BST to string using preorder traversal."""
        if not root:
            return ""

        result = []

        def preorder(node: Optional[TreeNode]) -> None:
            if not node:
                return
            result.append(str(node.val))
            preorder(node.left)
            preorder(node.right)

        preorder(root)
        return ",".join(result)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        """Decode string to BST using bounds validation."""
        if not data:
            return None

        values = deque(int(x) for x in data.split(","))

        def build(min_val: float, max_val: float) -> Optional[TreeNode]:
            if not values:
                return None

            val = values[0]
            # Check if current value is within valid bounds
            if val < min_val or val > max_val:
                return None

            values.popleft()
            node = TreeNode(val)
            node.left = build(min_val, val)    # Left: values < val
            node.right = build(val, max_val)   # Right: values > val

            return node

        return build(float('-inf'), float('inf'))


# ============================================================================
# APPROACH 2: Postorder Serialization (Alternative)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHY DIFFERENT:
# - Processes values from end to beginning
# - Root is last in postorder, first when reversing
# ============================================================================

class CodecPostorder:
    """
    BST serialization using postorder traversal.

    Process from end of array during deserialization.
    """

    def serialize(self, root: Optional[TreeNode]) -> str:
        """Encode using postorder traversal."""
        if not root:
            return ""

        result = []

        def postorder(node: Optional[TreeNode]) -> None:
            if not node:
                return
            postorder(node.left)
            postorder(node.right)
            result.append(str(node.val))

        postorder(root)
        return ",".join(result)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        """Decode using postorder (process from end)."""
        if not data:
            return None

        values = [int(x) for x in data.split(",")]

        def build(min_val: float, max_val: float) -> Optional[TreeNode]:
            if not values:
                return None

            val = values[-1]
            if val < min_val or val > max_val:
                return None

            values.pop()
            node = TreeNode(val)
            # Build right subtree first (reverse of preorder)
            node.right = build(val, max_val)
            node.left = build(min_val, val)

            return node

        return build(float('-inf'), float('inf'))


# ============================================================================
# APPROACH 3: Level Order (BFS) - Works for General Trees Too
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# NOTE: Less compact for BST (may include "null" markers)
# but useful for general binary trees
# ============================================================================

class CodecLevelOrder:
    """
    BST serialization using level order (BFS) traversal.

    Less compact than preorder for BST, but works for any binary tree.
    """

    def serialize(self, root: Optional[TreeNode]) -> str:
        """Encode using level order traversal."""
        if not root:
            return ""

        result = []
        queue = deque([root])

        while queue:
            node = queue.popleft()

            if node is None:
                result.append("null")
                continue

            result.append(str(node.val))
            queue.append(node.left)
            queue.append(node.right)

        # Trim trailing nulls
        while result and result[-1] == "null":
            result.pop()

        return ",".join(result)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        """Decode using level order."""
        if not data:
            return None

        parts = data.split(",")
        if not parts or parts[0] == "null":
            return None

        root = TreeNode(int(parts[0]))
        queue = deque([root])
        i = 1

        while queue and i < len(parts):
            node = queue.popleft()

            # Left child
            if i < len(parts) and parts[i] != "null":
                node.left = TreeNode(int(parts[i]))
                queue.append(node.left)
            i += 1

            # Right child
            if i < len(parts) and parts[i] != "null":
                node.right = TreeNode(int(parts[i]))
                queue.append(node.right)
            i += 1

        return root


# ============================================================================
# APPROACH 4: Using Python Pickle (Pythonic but not portable)
# ============================================================================

import pickle
import base64


class CodecPickle:
    """
    Uses Python pickle for serialization.

    Very simple but Python-specific and not human-readable.
    """

    def serialize(self, root: Optional[TreeNode]) -> str:
        """Encode using pickle + base64."""
        if not root:
            return ""

        # Extract values using preorder
        values = []

        def preorder(node):
            if node:
                values.append(node.val)
                preorder(node.left)
                preorder(node.right)

        preorder(root)
        return base64.b64encode(pickle.dumps(values)).decode('ascii')

    def deserialize(self, data: str) -> Optional[TreeNode]:
        """Decode pickle data and reconstruct BST."""
        if not data:
            return None

        values = pickle.loads(base64.b64decode(data))
        values = deque(values)

        def build(min_val, max_val):
            if not values or values[0] < min_val or values[0] > max_val:
                return None

            val = values.popleft()
            node = TreeNode(val)
            node.left = build(min_val, val)
            node.right = build(val, max_val)
            return node

        return build(float('-inf'), float('inf'))


# ============================================================================
# APPROACH 5: Binary Format (Compact Storage)
# ============================================================================

class CodecBinary:
    """
    Uses binary encoding for compact storage.

    Good for network transmission or disk storage.
    """

    def serialize_binary(self, root: Optional[TreeNode]) -> bytes:
        """Encode to bytes."""
        if not root:
            return b''

        values = []

        def preorder(node):
            if node:
                values.append(node.val)
                preorder(node.left)
                preorder(node.right)

        preorder(root)
        return struct.pack(f'>{len(values)}i', *values)

    def deserialize_binary(self, data: bytes) -> Optional[TreeNode]:
        """Decode from bytes."""
        if not data:
            return None

        count = len(data) // 4
        values = list(struct.unpack(f'>{count}i', data))
        values = deque(values)

        def build(min_val, max_val):
            if not values or values[0] < min_val or values[0] > max_val:
                return None

            val = values.popleft()
            node = TreeNode(val)
            node.left = build(min_val, val)
            node.right = build(val, max_val)
            return node

        return build(float('-inf'), float('inf'))


# ============================================================================
# HELPER FUNCTIONS
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


def trees_equal(t1: Optional[TreeNode], t2: Optional[TreeNode]) -> bool:
    """Check if two trees are structurally identical."""
    if t1 is None and t2 is None:
        return True
    if t1 is None or t2 is None:
        return False
    return (t1.val == t2.val and
            trees_equal(t1.left, t2.left) and
            trees_equal(t1.right, t2.right))


def inorder_traversal(root: Optional[TreeNode]) -> list[int]:
    """Return values in sorted order."""
    result = []

    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)

    inorder(root)
    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("SERIALIZE AND DESERIALIZE BST - TEST RESULTS")
    print("=" * 70)

    # Build test tree
    #          5
    #         / \
    #        3   7
    #       / \ / \
    #      2  4 6  8
    original = build_bst([5, 3, 7, 2, 4, 6, 8])

    print("\nOriginal BST:")
    print("          5")
    print("         / \\")
    print("        3   7")
    print("       / \\ / \\")
    print("      2  4 6  8")
    print(f"\nInorder: {inorder_traversal(original)}")

    # Test Approach 1: Preorder + Bounds
    print("\n--- Approach 1: Preorder + Bounds (Optimal) ---")
    codec1 = Codec()
    serialized1 = codec1.serialize(original)
    print(f'Serialized: "{serialized1}"')
    deserialized1 = codec1.deserialize(serialized1)
    print(f"Inorder after deserialize: {inorder_traversal(deserialized1)}")
    print(f"Trees equal: {trees_equal(original, deserialized1)}")

    # Test Approach 2: Postorder
    print("\n--- Approach 2: Postorder ---")
    codec2 = CodecPostorder()
    serialized2 = codec2.serialize(original)
    print(f'Serialized: "{serialized2}"')
    deserialized2 = codec2.deserialize(serialized2)
    print(f"Inorder after deserialize: {inorder_traversal(deserialized2)}")
    print(f"Trees equal: {trees_equal(original, deserialized2)}")

    # Test Approach 3: Level Order
    print("\n--- Approach 3: Level Order ---")
    codec3 = CodecLevelOrder()
    serialized3 = codec3.serialize(original)
    print(f'Serialized: "{serialized3}"')
    deserialized3 = codec3.deserialize(serialized3)
    print(f"Inorder after deserialize: {inorder_traversal(deserialized3)}")
    print(f"Trees equal: {trees_equal(original, deserialized3)}")

    # Test Approach 4: Pickle
    print("\n--- Approach 4: Pickle (Python-specific) ---")
    codec4 = CodecPickle()
    serialized4 = codec4.serialize(original)
    print(f"Serialized: {serialized4[:50]}... ({len(serialized4)} chars)")
    deserialized4 = codec4.deserialize(serialized4)
    print(f"Inorder after deserialize: {inorder_traversal(deserialized4)}")
    print(f"Trees equal: {trees_equal(original, deserialized4)}")

    # Test Approach 5: Binary
    print("\n--- Approach 5: Binary Format ---")
    codec5 = CodecBinary()
    serialized5 = codec5.serialize_binary(original)
    print(f"Serialized: {len(serialized5)} bytes")
    deserialized5 = codec5.deserialize_binary(serialized5)
    print(f"Inorder after deserialize: {inorder_traversal(deserialized5)}")
    print(f"Trees equal: {trees_equal(original, deserialized5)}")

    # Compare sizes
    print("\n--- Serialization Size Comparison ---")
    print(f"Preorder (BST-optimal): {len(serialized1)} chars")
    print(f"Postorder:              {len(serialized2)} chars")
    print(f"Level Order:            {len(serialized3)} chars")
    print(f"Pickle + Base64:        {len(serialized4)} chars")
    print(f"Binary:                 {len(serialized5)} bytes")

    # Test edge cases
    print("\n--- Edge Cases ---")

    # Empty tree
    serialized_empty = codec1.serialize(None)
    deserialized_empty = codec1.deserialize(serialized_empty)
    print(f'Empty tree: serialized="{serialized_empty}", deserialized={deserialized_empty}')

    # Single node
    single_node = TreeNode(42)
    serialized_single = codec1.serialize(single_node)
    deserialized_single = codec1.deserialize(serialized_single)
    print(f'Single node: serialized="{serialized_single}", value={deserialized_single.val}')

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
