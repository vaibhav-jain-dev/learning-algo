"""
Two Sum Closest in BST - Python Solutions

Given a BST and target, find two nodes whose sum is closest to target.

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
# APPROACH 1: Inorder Traversal + Two Pointers
# ============================================================================
# Time Complexity:  O(n) - traverse tree + two pointer scan
# Space Complexity: O(n) - store all values in sorted array
#
# WHY THIS WORKS:
# - Inorder traversal gives sorted array
# - Two pointers efficiently find closest pair sum
# - Standard and intuitive approach
# ============================================================================

def two_sum_closest_inorder(root: Optional[TreeNode], target: int) -> list[int]:
    """
    Find two values with sum closest to target using inorder + two pointers.

    Steps:
    1. Get sorted values via inorder traversal
    2. Use two pointers from both ends
    3. Track closest pair as we narrow the search
    """
    # Get sorted values via inorder traversal
    values = []

    def inorder(node: Optional[TreeNode]) -> None:
        if not node:
            return
        inorder(node.left)
        values.append(node.val)
        inorder(node.right)

    inorder(root)

    # Two pointer approach on sorted array
    left, right = 0, len(values) - 1
    closest_pair = [values[left], values[right]]
    closest_diff = float('inf')

    while left < right:
        current_sum = values[left] + values[right]
        current_diff = abs(current_sum - target)

        # Update closest if this pair is better
        if current_diff < closest_diff:
            closest_diff = current_diff
            closest_pair = [values[left], values[right]]

        # Exact match found
        if current_sum == target:
            return closest_pair

        # Adjust pointers based on sum comparison
        if current_sum < target:
            left += 1
        else:
            right -= 1

    return closest_pair


# ============================================================================
# APPROACH 2: BST Iterators (Space Optimized)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h) - only stack space for iterators
#
# WHY THIS IS OPTIMAL FOR LARGE TREES:
# - Doesn't store entire sorted array
# - Uses two stacks as forward and backward iterators
# - More memory efficient for large BSTs
# ============================================================================

def two_sum_closest_iterators(root: Optional[TreeNode], target: int) -> list[int]:
    """
    Find two values using BST iterators for space efficiency.

    Uses two stacks:
    - Forward stack: iterates smallest to largest
    - Backward stack: iterates largest to smallest
    """
    if not root:
        return []

    # Forward iterator (smallest to largest)
    forward_stack = []
    # Backward iterator (largest to smallest)
    backward_stack = []

    def push_left(node: Optional[TreeNode]) -> None:
        """Push all left children for forward iterator."""
        while node:
            forward_stack.append(node)
            node = node.left

    def push_right(node: Optional[TreeNode]) -> None:
        """Push all right children for backward iterator."""
        while node:
            backward_stack.append(node)
            node = node.right

    def next_smallest() -> int:
        """Get next smallest value."""
        node = forward_stack.pop()
        val = node.val
        push_left(node.right)
        return val

    def next_largest() -> int:
        """Get next largest value."""
        node = backward_stack.pop()
        val = node.val
        push_right(node.left)
        return val

    # Initialize iterators
    push_left(root)
    push_right(root)

    # Get initial values
    small = next_smallest()
    large = next_largest()

    closest_pair = [small, large]
    closest_diff = float('inf')

    # Two pointer style iteration
    while small < large:
        current_sum = small + large
        current_diff = abs(current_sum - target)

        if current_diff < closest_diff:
            closest_diff = current_diff
            closest_pair = [small, large]

        if current_sum == target:
            return closest_pair

        if current_sum < target:
            if forward_stack:
                small = next_smallest()
            else:
                break
        else:
            if backward_stack:
                large = next_largest()
            else:
                break

    return closest_pair


# ============================================================================
# APPROACH 3: Generator-based Iterators (Pythonic)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h) for generator stack
#
# PYTHONIC APPROACH:
# - Uses generators for clean iteration
# - Lazy evaluation
# ============================================================================

def two_sum_closest_generators(root: Optional[TreeNode], target: int) -> list[int]:
    """
    Find two values using generator-based iterators.

    Clean Pythonic approach using yield from.
    """
    def inorder_forward(node: Optional[TreeNode]):
        """Generate values in ascending order."""
        if not node:
            return
        yield from inorder_forward(node.left)
        yield node.val
        yield from inorder_forward(node.right)

    def inorder_backward(node: Optional[TreeNode]):
        """Generate values in descending order."""
        if not node:
            return
        yield from inorder_backward(node.right)
        yield node.val
        yield from inorder_backward(node.left)

    # Convert to lists since we need random access
    # (generators don't support two-pointer well)
    values = list(inorder_forward(root))

    left, right = 0, len(values) - 1
    closest_pair = [values[left], values[right]]
    closest_diff = float('inf')

    while left < right:
        current_sum = values[left] + values[right]
        current_diff = abs(current_sum - target)

        if current_diff < closest_diff:
            closest_diff = current_diff
            closest_pair = [values[left], values[right]]

        if current_sum == target:
            return closest_pair
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return closest_pair


# ============================================================================
# APPROACH 4: Brute Force with Early Termination
# ============================================================================
# Time Complexity:  O(n^2) worst case
# Space Complexity: O(n) for storing values
#
# WHEN TO USE:
# - Very small trees
# - When simplicity is preferred
# ============================================================================

def two_sum_closest_brute_force(root: Optional[TreeNode], target: int) -> list[int]:
    """
    Check all pairs with early termination on exact match.
    """
    # Collect all values
    values = []

    def collect(node: Optional[TreeNode]) -> None:
        if not node:
            return
        values.append(node.val)
        collect(node.left)
        collect(node.right)

    collect(root)

    if len(values) < 2:
        return []

    closest_pair = [values[0], values[1]]
    closest_diff = abs(values[0] + values[1] - target)

    # Check all pairs
    for i in range(len(values)):
        for j in range(i + 1, len(values)):
            current_sum = values[i] + values[j]
            current_diff = abs(current_sum - target)

            if current_diff < closest_diff:
                closest_diff = current_diff
                closest_pair = [values[i], values[j]]

            # Early termination on exact match
            if current_diff == 0:
                return closest_pair

    return closest_pair


# ============================================================================
# APPROACH 5: Two Sum Exact (Hash Set) - Related Problem
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) for hash set
#
# NOTE: This finds EXACT sum match, not closest
# ============================================================================

def two_sum_exact(root: Optional[TreeNode], target: int) -> tuple[bool, list[int]]:
    """
    Find two values that sum exactly to target (if exists).

    Returns (found, [val1, val2]) or (False, [])
    """
    seen = set()

    def traverse(node: Optional[TreeNode]) -> tuple[bool, list[int]]:
        if not node:
            return False, []

        complement = target - node.val
        if complement in seen:
            return True, [complement, node.val]

        seen.add(node.val)

        found, pair = traverse(node.left)
        if found:
            return True, pair

        return traverse(node.right)

    return traverse(root)


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
    print("TWO SUM CLOSEST IN BST - TEST RESULTS")
    print("=" * 70)

    approaches = [
        ("Inorder + Two Pointers", two_sum_closest_inorder),
        ("BST Iterators", two_sum_closest_iterators),
        ("Generator-based", two_sum_closest_generators),
        ("Brute Force", two_sum_closest_brute_force),
    ]

    # Test case 1: Standard BST
    #          10
    #         /  \
    #        5    15
    #       / \   / \
    #      2   7 12  20
    root1 = build_bst([10, 5, 15, 2, 7, 12, 20])

    print("\nTest 1: BST [10, 5, 15, 2, 7, 12, 20], target = 22")
    print("Inorder sorted: [2, 5, 7, 10, 12, 15, 20]")
    print("Expected pairs with sum=22: [2,20], [7,15], [10,12]")

    for name, func in approaches:
        pair = func(root1, 22)
        print(f"  {name}: {pair} (sum={sum(pair)})")

    # Test case 2: Target not exactly achievable
    print("\nTest 2: Same BST, target = 18")
    print("Possible sums: 7+12=19, 5+12=17, 7+10=17")
    print("Closest would be 7+12=19 or 5+12=17 (both diff=1)")

    for name, func in approaches:
        pair = func(root1, 18)
        diff = abs(sum(pair) - 18)
        print(f"  {name}: {pair} (sum={sum(pair)}, diff={diff})")

    # Test case 3: Small tree
    print("\nTest 3: BST [5, 3, 7], target = 10")
    root3 = build_bst([5, 3, 7])
    for name, func in approaches:
        pair = func(root3, 10)
        print(f"  {name}: {pair} (sum={sum(pair)})")

    # Test case 4: Two nodes only
    print("\nTest 4: BST [1, 3], target = 5")
    root4 = build_bst([1, 3])
    for name, func in approaches:
        pair = func(root4, 5)
        diff = abs(sum(pair) - 5)
        print(f"  {name}: {pair} (sum={sum(pair)}, diff={diff})")

    # Test exact sum
    print("\n" + "=" * 70)
    print("BONUS: Two Sum Exact (find if exact sum exists)")
    print("=" * 70)

    found, pair = two_sum_exact(root1, 22)
    if found:
        print(f"\nTarget 22: Found exact pair {pair}")

    found, pair = two_sum_exact(root1, 100)
    if not found:
        print("Target 100: No exact pair found")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
