"""
Largest BST Subtree - Python Solutions

Find the largest subtree that is a valid BST in a binary tree.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional, NamedTuple
from dataclasses import dataclass


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: Post-order DFS with NamedTuple
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(h) - recursion stack depth
#
# WHY THIS WORKS:
# - Bottom-up: process children before parent
# - Each node returns: (is_bst, min_val, max_val, size)
# - Parent combines children info to determine its own BST status
# ============================================================================

class SubtreeInfo(NamedTuple):
    """Information about a subtree for BST validation."""
    is_bst: bool
    min_val: int
    max_val: int
    size: int


def largest_bst_subtree_tuple(root: Optional[TreeNode]) -> int:
    """
    Find size of largest BST subtree using post-order traversal.

    Returns the size of the largest subtree that is a valid BST.
    """
    max_size = 0

    def postorder(node: Optional[TreeNode]) -> SubtreeInfo:
        nonlocal max_size

        if node is None:
            # Base case: empty tree is a valid BST
            return SubtreeInfo(
                is_bst=True,
                min_val=float('inf'),
                max_val=float('-inf'),
                size=0
            )

        # Get info from left and right subtrees
        left = postorder(node.left)
        right = postorder(node.right)

        # Check if current subtree is a valid BST
        if (left.is_bst and right.is_bst and
            left.max_val < node.val < right.min_val):
            # Current subtree is a valid BST
            size = 1 + left.size + right.size
            max_size = max(max_size, size)

            return SubtreeInfo(
                is_bst=True,
                min_val=min(left.min_val, node.val),
                max_val=max(right.max_val, node.val),
                size=size
            )

        # Current subtree is not a valid BST
        return SubtreeInfo(
            is_bst=False,
            min_val=0,  # Values don't matter for non-BST
            max_val=0,
            size=0
        )

    postorder(root)
    return max_size


# ============================================================================
# APPROACH 2: Using Dataclass for Cleaner Code
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# WHY THIS APPROACH:
# - More readable with explicit field names
# - Mutable default values possible
# - Good for interview settings where clarity matters
# ============================================================================

@dataclass
class NodeInfo:
    """Information about a node's subtree."""
    is_bst: bool = True
    min_val: int = float('inf')
    max_val: int = float('-inf')
    size: int = 0


def largest_bst_subtree_dataclass(root: Optional[TreeNode]) -> int:
    """
    Find size of largest BST subtree using dataclass for state.
    """
    result = [0]  # Use list to allow modification in nested function

    def dfs(node: Optional[TreeNode]) -> NodeInfo:
        if node is None:
            return NodeInfo()

        left = dfs(node.left)
        right = dfs(node.right)

        info = NodeInfo()

        # Check BST property
        if (left.is_bst and right.is_bst and
            left.max_val < node.val < right.min_val):

            info.is_bst = True
            info.size = 1 + left.size + right.size
            info.min_val = left.min_val if node.left else node.val
            info.max_val = right.max_val if node.right else node.val

            result[0] = max(result[0], info.size)
        else:
            info.is_bst = False

        return info

    dfs(root)
    return result[0]


# ============================================================================
# APPROACH 3: Simplified with Sentinel Values
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# WHY THIS IS ELEGANT:
# - Uses special return value (-1) to indicate non-BST
# - Cleaner condition checking
# - Interview-friendly implementation
# ============================================================================

def largest_bst_subtree_simple(root: Optional[TreeNode]) -> int:
    """
    Find largest BST subtree with simplified return values.

    Returns: (size, min_val, max_val) or (-1, 0, 0) if not BST
    """
    max_size = [0]

    def helper(node: Optional[TreeNode]) -> tuple[int, int, int]:
        """
        Returns (size, min_val, max_val) for BST.
        Returns (-1, 0, 0) if subtree is not a BST.
        """
        if node is None:
            return (0, float('inf'), float('-inf'))

        left_size, left_min, left_max = helper(node.left)
        right_size, right_min, right_max = helper(node.right)

        # Check if either subtree is not a BST
        if left_size == -1 or right_size == -1:
            return (-1, 0, 0)

        # Check BST property at current node
        if left_max < node.val < right_min:
            size = 1 + left_size + right_size
            max_size[0] = max(max_size[0], size)

            curr_min = left_min if left_min != float('inf') else node.val
            curr_max = right_max if right_max != float('-inf') else node.val

            return (size, curr_min, curr_max)

        # Not a BST
        return (-1, 0, 0)

    helper(root)
    return max_size[0]


# ============================================================================
# APPROACH 4: Class-based Solution (Interview Style)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# WHY USE A CLASS:
# - Encapsulates state cleanly
# - No need for nonlocal or list hacks
# - Matches typical interview solution style
# ============================================================================

class LargestBSTFinder:
    """Finds the largest BST subtree in a binary tree."""

    def __init__(self):
        self.max_size = 0

    def largest_bst_subtree(self, root: Optional[TreeNode]) -> int:
        """Main method to find largest BST subtree."""
        self.max_size = 0
        self._dfs(root)
        return self.max_size

    def _dfs(self, node: Optional[TreeNode]) -> tuple[bool, int, int, int]:
        """
        DFS helper returning (is_bst, min_val, max_val, size).
        """
        if node is None:
            return (True, float('inf'), float('-inf'), 0)

        left_bst, left_min, left_max, left_size = self._dfs(node.left)
        right_bst, right_min, right_max, right_size = self._dfs(node.right)

        if left_bst and right_bst and left_max < node.val < right_min:
            size = 1 + left_size + right_size
            self.max_size = max(self.max_size, size)

            min_val = min(left_min, node.val)
            max_val = max(right_max, node.val)

            return (True, min_val, max_val, size)

        return (False, 0, 0, 0)


# ============================================================================
# HELPER: Build tree from list for testing
# ============================================================================

def build_tree(values: list) -> Optional[TreeNode]:
    """Build binary tree from level-order list."""
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


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("LARGEST BST SUBTREE - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        ([10, 5, 15, 1, 8, None, 7], 3, "Standard case: BST at node 5"),
        ([2, 1, 3], 3, "Entire tree is BST"),
        ([5, 4, 6, 3, None, None, 7], 7, "Entire tree is BST (size 5)"),
        ([1], 1, "Single node"),
        ([4, 2, 7, 2, 3, 5], 2, "Multiple small BSTs"),
        ([3, 2, 4, None, None, 1], 2, "BST at node 2"),
    ]

    approaches = [
        ("NamedTuple", largest_bst_subtree_tuple),
        ("Dataclass", largest_bst_subtree_dataclass),
        ("Simplified", largest_bst_subtree_simple),
        ("Class-based", lambda r: LargestBSTFinder().largest_bst_subtree(r)),
    ]

    for values, expected, description in test_cases:
        print(f"\n{description}")
        print(f"Input: {values}")
        print(f"Expected: {expected}")

        for name, func in approaches:
            root = build_tree(values.copy())
            result = func(root)
            status = "PASS" if result == expected else f"FAIL (got {result})"
            print(f"  {name}: {result} - {status}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
