"""
Binary Tree Maximum Path Sum - Python Solutions

Find the maximum path sum in a binary tree where path can start and end anywhere.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional, Tuple, List
from dataclasses import dataclass
import math


class BinaryTree:
    """Binary tree node definition."""

    def __init__(self, value: int) -> None:
        self.value = value
        self.left: Optional[BinaryTree] = None
        self.right: Optional[BinaryTree] = None


# ============================================================================
# APPROACH 1: Post-Order DFS with Global Max (Recommended)
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(h) - recursion stack depth
#
# WHY THIS IS BEST:
# - Single pass through tree
# - Clean handling of negative values
# - Separates "extendable path" from "complete path"
# ============================================================================


def max_path_sum(root: Optional[BinaryTree]) -> int:
    """
    Find the maximum path sum in the tree.

    Key insight: At each node, track:
    1. Max path that can extend to parent (return value)
    2. Max path through this node (update global max)

    Visual example:

           -10
           /  \\
          9    20
              /  \\
             15   7

    Answer: 42 (path: 15 -> 20 -> 7)
    """
    if root is None:
        return 0

    max_sum = [float("-inf")]  # Use list for mutability in closure

    def max_gain(node: Optional[BinaryTree]) -> int:
        if node is None:
            return 0

        # Get max gain from children (ignore negative paths)
        left_gain = max(0, max_gain(node.left))
        right_gain = max(0, max_gain(node.right))

        # Calculate path through current node (potential answer)
        path_through_node = node.value + left_gain + right_gain

        # Update global maximum
        max_sum[0] = max(max_sum[0], path_through_node)

        # Return max gain to parent (can only extend one direction)
        return node.value + max(left_gain, right_gain)

    max_gain(root)
    return int(max_sum[0])


# ============================================================================
# APPROACH 2: DFS Returning Tuple (No Global State)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# WHEN TO USE:
# - When you want to avoid global/closure state
# - More explicit about what's being tracked
# ============================================================================


@dataclass
class PathInfo:
    """Holds DFS result for each subtree."""

    max_gain: int  # Max path sum that can extend upward
    max_path: int  # Max path sum in this subtree


def max_path_sum_no_global(root: Optional[BinaryTree]) -> int:
    """Find max path sum without using global state."""
    if root is None:
        return 0

    def dfs(node: Optional[BinaryTree]) -> PathInfo:
        if node is None:
            return PathInfo(max_gain=0, max_path=float("-inf"))

        left = dfs(node.left)
        right = dfs(node.right)

        # Max gain that can extend upward (ignore negative)
        left_gain = max(0, left.max_gain)
        right_gain = max(0, right.max_gain)

        # Path through current node
        path_through = node.value + left_gain + right_gain

        # Max path in any subtree or through this node
        max_path = max(path_through, left.max_path, right.max_path)

        # Max extendable gain
        max_gain = node.value + max(left_gain, right_gain)

        return PathInfo(max_gain=max_gain, max_path=max_path)

    return int(dfs(root).max_path)


# ============================================================================
# APPROACH 3: Using Tuple Returns (Functional Style)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# More Pythonic using tuple unpacking.
# ============================================================================


def max_path_sum_tuple(root: Optional[BinaryTree]) -> int:
    """Find max path sum using tuple returns."""
    if root is None:
        return 0

    def dfs(node: Optional[BinaryTree]) -> Tuple[int, int]:
        """Returns (max_gain_to_parent, max_path_in_subtree)."""
        if node is None:
            return 0, float("-inf")

        left_gain, left_max = dfs(node.left)
        right_gain, right_max = dfs(node.right)

        # Ignore negative gains
        left_gain = max(0, left_gain)
        right_gain = max(0, right_gain)

        # Path through current node
        path_through = node.value + left_gain + right_gain

        # Best path in subtree
        subtree_max = max(path_through, left_max, right_max)

        # Extendable gain
        extendable = node.value + max(left_gain, right_gain)

        return extendable, subtree_max

    _, result = dfs(root)
    return int(result)


# ============================================================================
# APPROACH 4: Iterative Post-Order
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When recursion depth is a concern
# - More complex but avoids stack overflow
# ============================================================================


def max_path_sum_iterative(root: Optional[BinaryTree]) -> int:
    """Find max path sum using iterative post-order traversal."""
    if root is None:
        return 0

    # Build post-order sequence using two stacks
    stack1: List[BinaryTree] = [root]
    stack2: List[BinaryTree] = []

    while stack1:
        node = stack1.pop()
        stack2.append(node)

        if node.left:
            stack1.append(node.left)
        if node.right:
            stack1.append(node.right)

    # Store max gain for each node
    gains: dict[BinaryTree, int] = {}
    max_sum = float("-inf")

    # Process in post-order (children before parent)
    while stack2:
        node = stack2.pop()

        left_gain = max(0, gains.get(node.left, 0))
        right_gain = max(0, gains.get(node.right, 0))

        # Path through current node
        path_through = node.value + left_gain + right_gain
        max_sum = max(max_sum, path_through)

        # Store gain for parent
        gains[node] = node.value + max(left_gain, right_gain)

    return int(max_sum)


# ============================================================================
# BONUS: Find the Actual Path
# ============================================================================


@dataclass
class PathResult:
    """Contains both sum and actual path."""

    sum: int
    path: List[int]


def max_path_sum_with_path(root: Optional[BinaryTree]) -> PathResult:
    """Return both the max sum and the actual path nodes."""
    if root is None:
        return PathResult(sum=0, path=[])

    max_result = PathResult(sum=float("-inf"), path=[])

    def dfs(node: Optional[BinaryTree]) -> Tuple[int, List[int]]:
        """Returns (max_gain, path_to_this_point)."""
        nonlocal max_result

        if node is None:
            return 0, []

        left_gain, left_path = dfs(node.left)
        right_gain, right_path = dfs(node.right)

        # Use left/right only if positive
        use_left = left_gain > 0
        use_right = right_gain > 0

        # Calculate path through this node
        path_sum = node.value
        if use_left:
            path_sum += left_gain
        if use_right:
            path_sum += right_gain

        # Update max result
        if path_sum > max_result.sum:
            full_path = []
            if use_left:
                full_path.extend(left_path)
            full_path.append(node.value)
            if use_right:
                full_path.extend(right_path)
            max_result = PathResult(sum=path_sum, path=full_path)

        # Return best extendable path
        if not use_left and not use_right:
            return node.value, [node.value]
        elif use_left and left_gain >= right_gain:
            return node.value + left_gain, left_path + [node.value]
        elif use_right:
            return node.value + right_gain, [node.value] + right_path
        return node.value, [node.value]

    dfs(root)
    return max_result


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("BINARY TREE MAXIMUM PATH SUM - TEST RESULTS")
    print("=" * 70)

    # Test Case 1: Standard tree
    #    1
    #   / \
    #  2   3
    root1 = BinaryTree(1)
    root1.left = BinaryTree(2)
    root1.right = BinaryTree(3)

    print("\nTest 1: Simple tree (1->2, 1->3)")
    print(f"  Result: {max_path_sum(root1)}")
    print("  Expected: 6 (path: 2->1->3)")

    # Test Case 2: Tree with negative root
    #       -10
    #       /  \
    #      9    20
    #          /  \
    #         15   7
    root2 = BinaryTree(-10)
    root2.left = BinaryTree(9)
    root2.right = BinaryTree(20)
    root2.right.left = BinaryTree(15)
    root2.right.right = BinaryTree(7)

    print("\nTest 2: Tree with negative root")
    print(f"  Result: {max_path_sum(root2)}")
    print("  Expected: 42 (path: 15->20->7)")

    # Test Case 3: Single negative node
    root3 = BinaryTree(-3)
    print("\nTest 3: Single negative node")
    print(f"  Result: {max_path_sum(root3)}")
    print("  Expected: -3")

    # Test Case 4: All negative values
    root4 = BinaryTree(-2)
    root4.left = BinaryTree(-1)
    print("\nTest 4: All negative values")
    print(f"  Result: {max_path_sum(root4)}")
    print("  Expected: -1")

    # Test Case 5: Linear tree
    root5 = BinaryTree(1)
    root5.left = BinaryTree(2)
    root5.left.left = BinaryTree(3)
    print("\nTest 5: Linear tree (1->2->3)")
    print(f"  Result: {max_path_sum(root5)}")
    print("  Expected: 6")

    # Compare approaches
    print("\n" + "=" * 70)
    print("COMPARING APPROACHES")
    print("=" * 70)

    approaches = [
        ("Global Max", max_path_sum),
        ("No Global (Dataclass)", max_path_sum_no_global),
        ("Tuple Returns", max_path_sum_tuple),
        ("Iterative", max_path_sum_iterative),
    ]

    print("\nUsing tree with negative root (-10):")
    for name, func in approaches:
        print(f"  {name}: {func(root2)}")

    # Test with path tracking
    print("\n" + "=" * 70)
    print("PATH TRACKING")
    print("=" * 70)
    result = max_path_sum_with_path(root2)
    print(f"\nMax sum: {result.sum}")
    print(f"Path: {result.path}")


if __name__ == "__main__":
    run_tests()
