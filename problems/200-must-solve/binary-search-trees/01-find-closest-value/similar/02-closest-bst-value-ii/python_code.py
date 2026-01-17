"""
Closest BST Value II (Inorder Predecessor & Successor) - Python Solutions

Given a BST and a target value, find the inorder predecessor and successor.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional
import math


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: Single Pass Traversal (Iterative)
# ============================================================================
# Time Complexity:  O(h) where h is the height of the tree
# Space Complexity: O(1) - only using constant extra space
#
# WHY THIS IS OPTIMAL:
# - Uses BST property to navigate directly to answer
# - No need for full tree traversal
# - Updates predecessor/successor as we traverse
# ============================================================================

def find_predecessor_successor(root: Optional[TreeNode], target: float) -> tuple[int, int]:
    """
    Find both predecessor and successor in one pass.

    Key insight:
    - When current < target: current could be predecessor, go right
    - When current > target: current could be successor, go left
    - When current == target: predecessor is in left subtree (rightmost),
      successor is in right subtree (leftmost)
    """
    predecessor = None
    successor = None
    current = root

    while current:
        if current.val < target:
            # Current is less than target - could be predecessor
            predecessor = current.val
            current = current.right  # Look for larger values still < target
        elif current.val > target:
            # Current is greater than target - could be successor
            successor = current.val
            current = current.left  # Look for smaller values still > target
        else:
            # Found exact match - need to find actual pred/succ
            # Predecessor: rightmost in left subtree
            if current.left:
                pred = current.left
                while pred.right:
                    pred = pred.right
                predecessor = pred.val

            # Successor: leftmost in right subtree
            if current.right:
                succ = current.right
                while succ.left:
                    succ = succ.left
                successor = succ.val
            break

    # Return results (-1 if not found)
    return (predecessor if predecessor is not None else -1,
            successor if successor is not None else -1)


# ============================================================================
# APPROACH 2: Separate Functions (Clean Separation)
# ============================================================================
# Time Complexity:  O(h) for each function
# Space Complexity: O(1) iterative
#
# WHY THIS APPROACH:
# - Clean separation of concerns
# - Each function is simple and focused
# - Easy to test independently
# ============================================================================

def find_predecessor(root: Optional[TreeNode], target: float) -> int:
    """Find the largest value less than target."""
    predecessor = None
    current = root

    while current:
        if current.val < target:
            predecessor = current  # Candidate found
            current = current.right
        else:
            current = current.left

    return predecessor.val if predecessor else -1


def find_successor(root: Optional[TreeNode], target: float) -> int:
    """Find the smallest value greater than target."""
    successor = None
    current = root

    while current:
        if current.val > target:
            successor = current  # Candidate found
            current = current.left
        else:
            current = current.right

    return successor.val if successor else -1


def find_predecessor_successor_separate(root: Optional[TreeNode], target: float) -> tuple[int, int]:
    """Find both using separate functions."""
    return find_predecessor(root, target), find_successor(root, target)


# ============================================================================
# APPROACH 3: Recursive Implementation
# ============================================================================
# Time Complexity:  O(h)
# Space Complexity: O(h) due to recursion stack
#
# WHEN TO USE:
# - When recursive style is preferred
# - Tree is not extremely deep
# ============================================================================

def find_predecessor_successor_recursive(root: Optional[TreeNode], target: float) -> tuple[int, int]:
    """
    Recursive implementation using closures.

    Uses nested functions to track predecessor and successor
    through recursive calls.
    """
    result = {'pred': None, 'succ': None}

    def find_pred(node: Optional[TreeNode]) -> None:
        if not node:
            return

        if node.val < target:
            result['pred'] = node.val
            find_pred(node.right)
        else:
            find_pred(node.left)

    def find_succ(node: Optional[TreeNode]) -> None:
        if not node:
            return

        if node.val > target:
            result['succ'] = node.val
            find_succ(node.left)
        else:
            find_succ(node.right)

    find_pred(root)
    find_succ(root)

    return (result['pred'] if result['pred'] is not None else -1,
            result['succ'] if result['succ'] is not None else -1)


# ============================================================================
# APPROACH 4: Inorder Traversal with Array
# ============================================================================
# Time Complexity:  O(n) - visit all nodes
# Space Complexity: O(n) - store all values
#
# WHEN TO USE:
# - When you need full sorted order for other operations
# - Simpler to understand and debug
# - When tree is small
# ============================================================================

def find_predecessor_successor_inorder(root: Optional[TreeNode], target: float) -> tuple[int, int]:
    """
    Use inorder traversal to get sorted array, then search.

    Simple but less efficient - O(n) time and space.
    """
    # Get sorted array via inorder traversal
    values = []

    def inorder(node: Optional[TreeNode]) -> None:
        if not node:
            return
        inorder(node.left)
        values.append(node.val)
        inorder(node.right)

    inorder(root)

    # Find predecessor and successor in sorted array
    predecessor = -1
    successor = -1

    for val in values:
        if val < target:
            predecessor = val  # Keep updating - last one is largest < target
        elif val > target and successor == -1:
            successor = val  # First one > target is smallest
            break

    return predecessor, successor


# ============================================================================
# APPROACH 5: Generator-based (Pythonic)
# ============================================================================
# Time Complexity:  O(h) for finding, O(n) worst case
# Space Complexity: O(h) for stack
#
# PYTHONIC APPROACH:
# - Uses generators for lazy evaluation
# - Clean iterator interface
# - Can be extended for other operations
# ============================================================================

def inorder_generator(root: Optional[TreeNode]):
    """Generate values in inorder (ascending) sequence."""
    if not root:
        return

    yield from inorder_generator(root.left)
    yield root.val
    yield from inorder_generator(root.right)


def reverse_inorder_generator(root: Optional[TreeNode]):
    """Generate values in reverse inorder (descending) sequence."""
    if not root:
        return

    yield from reverse_inorder_generator(root.right)
    yield root.val
    yield from reverse_inorder_generator(root.left)


def find_predecessor_successor_generator(root: Optional[TreeNode], target: float) -> tuple[int, int]:
    """
    Use generators for finding predecessor and successor.

    Lazy evaluation - stops as soon as values are found.
    """
    # Find predecessor: largest value < target
    predecessor = -1
    for val in reverse_inorder_generator(root):
        if val < target:
            predecessor = val
            break

    # Find successor: smallest value > target
    successor = -1
    for val in inorder_generator(root):
        if val > target:
            successor = val
            break

    return predecessor, successor


# ============================================================================
# BONUS: Find Closest with Both Neighbors
# ============================================================================

from dataclasses import dataclass


@dataclass
class ClosestResult:
    """Result containing predecessor, successor, and closest value."""
    predecessor: int
    successor: int
    closest: int


def find_closest_with_neighbors(root: Optional[TreeNode], target: float) -> ClosestResult:
    """
    Find predecessor, successor, AND the closest value to target.

    Useful when you need to compare options or pick the best.
    """
    if not root:
        return ClosestResult(-1, -1, -1)

    result = ClosestResult(
        predecessor=-1,
        successor=-1,
        closest=root.val
    )

    current = root
    min_diff = abs(target - root.val)

    while current:
        # Update closest if current is closer
        curr_diff = abs(target - current.val)
        if curr_diff < min_diff:
            min_diff = curr_diff
            result.closest = current.val

        if current.val < target:
            result.predecessor = current.val
            current = current.right
        elif current.val > target:
            result.successor = current.val
            current = current.left
        else:
            # Exact match
            result.closest = current.val

            # Find predecessor in left subtree
            if current.left:
                pred = current.left
                while pred.right:
                    pred = pred.right
                result.predecessor = pred.val

            # Find successor in right subtree
            if current.right:
                succ = current.right
                while succ.left:
                    succ = succ.left
                result.successor = succ.val
            break

    return result


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
    print("CLOSEST BST VALUE II (PREDECESSOR & SUCCESSOR) - TEST RESULTS")
    print("=" * 70)

    #        5
    #       / \
    #      3   7
    #     / \ / \
    #    2  4 6  8
    root = build_bst([5, 3, 7, 2, 4, 6, 8])

    test_cases = [
        (4.0, 3, 5, "Target exists in tree"),
        (4.5, 4, 5, "Target between two nodes"),
        (1.0, -1, 2, "Target smaller than all"),
        (9.0, 8, -1, "Target larger than all"),
        (5.0, 4, 6, "Target is root"),
        (2.5, 2, 3, "Target in left subtree"),
        (7.5, 7, 8, "Target in right subtree"),
    ]

    approaches = [
        ("Single Pass", find_predecessor_successor),
        ("Separate Functions", find_predecessor_successor_separate),
        ("Recursive", find_predecessor_successor_recursive),
        ("Inorder Array", find_predecessor_successor_inorder),
        ("Generator-based", find_predecessor_successor_generator),
    ]

    print("\nUsing BST: [5, 3, 7, 2, 4, 6, 8]")
    print("        5")
    print("       / \\")
    print("      3   7")
    print("     / \\ / \\")
    print("    2  4 6  8")

    for target, exp_pred, exp_succ, desc in test_cases:
        print(f"\n--- Test: {desc} (target = {target}) ---")
        print(f"Expected: pred={exp_pred}, succ={exp_succ}")

        for name, func in approaches:
            pred, succ = func(root, target)
            status = "pass" if (pred == exp_pred and succ == exp_succ) else "FAIL"
            print(f"  {name}: pred={pred}, succ={succ} [{status}]")

    # Bonus: Show closest with neighbors
    print("\n" + "=" * 70)
    print("BONUS: Find Closest with Both Neighbors")
    print("=" * 70)

    target = 4.3
    result = find_closest_with_neighbors(root, target)
    print(f"\nTarget: {target}")
    print(f"Predecessor: {result.predecessor}")
    print(f"Successor:   {result.successor}")
    print(f"Closest:     {result.closest}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
