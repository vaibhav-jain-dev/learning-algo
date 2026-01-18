"""
Sum Root to Leaf Numbers - Python Solutions

Calculate the sum of all root-to-leaf numbers where each path forms a number.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional, List
from collections import deque


class BinaryTree:
    """Binary tree node definition."""

    def __init__(self, value: int) -> None:
        self.value = value
        self.left: Optional[BinaryTree] = None
        self.right: Optional[BinaryTree] = None


# ============================================================================
# APPROACH 1: Recursive DFS (Recommended)
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(h) - recursion stack depth
#
# WHY THIS IS BEST:
# - Clean and concise code
# - Natural tree traversal pattern
# - Easy to understand number building
# ============================================================================


def sum_root_to_leaf(root: Optional[BinaryTree]) -> int:
    """
    Calculate sum of all root-to-leaf numbers.

    Key insight: At each node, new_num = old_num * 10 + node.value

    Visual example:

            4
           / \\
          9   0
         / \\
        5   1

    Numbers: 495, 491, 40
    Answer: 1026
    """

    def dfs(node: Optional[BinaryTree], current_num: int) -> int:
        if node is None:
            return 0

        # Build the number: shift left (multiply by 10) and add digit
        new_num = current_num * 10 + node.value

        # If leaf, return the complete number
        if node.left is None and node.right is None:
            return new_num

        # Sum from both subtrees
        return dfs(node.left, new_num) + dfs(node.right, new_num)

    return dfs(root, 0)


# ============================================================================
# APPROACH 2: Recursive with Explicit Helper (More Readable)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h)
#
# Same as above but with named parameters for clarity.
# ============================================================================


def sum_root_to_leaf_explicit(root: Optional[BinaryTree]) -> int:
    """Calculate sum with explicit parameter names."""

    def helper(node: Optional[BinaryTree], path_number: int = 0) -> int:
        """
        Process a node and return sum of all numbers in its subtree.

        Args:
            node: Current node being processed
            path_number: Number formed by path from root to parent

        Returns:
            Sum of all complete numbers in this subtree
        """
        if node is None:
            return 0

        # Extend the number
        path_number = path_number * 10 + node.value

        # Base case: leaf node
        if not node.left and not node.right:
            return path_number

        # Recursive case: sum from both children
        left_sum = helper(node.left, path_number)
        right_sum = helper(node.right, path_number)

        return left_sum + right_sum

    return helper(root)


# ============================================================================
# APPROACH 3: Iterative with Stack
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) for stack
#
# WHEN TO USE:
# - When recursion depth might cause stack overflow
# - When you prefer explicit stack management
# ============================================================================


def sum_root_to_leaf_iterative(root: Optional[BinaryTree]) -> int:
    """Calculate sum using explicit stack for DFS."""
    if root is None:
        return 0

    total_sum = 0
    # Stack stores (node, current_number) tuples
    stack: List[tuple[BinaryTree, int]] = [(root, 0)]

    while stack:
        node, current_num = stack.pop()
        new_num = current_num * 10 + node.value

        # If leaf, add to total
        if node.left is None and node.right is None:
            total_sum += new_num
            continue

        # Push children (right first so left is processed first)
        if node.right is not None:
            stack.append((node.right, new_num))
        if node.left is not None:
            stack.append((node.left, new_num))

    return total_sum


# ============================================================================
# APPROACH 4: BFS with Queue
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(w) where w is max width of tree
#
# WHEN TO USE:
# - When you want level-by-level processing
# - Good for visualizing the traversal
# ============================================================================


def sum_root_to_leaf_bfs(root: Optional[BinaryTree]) -> int:
    """Calculate sum using BFS traversal."""
    if root is None:
        return 0

    total_sum = 0
    queue: deque[tuple[BinaryTree, int]] = deque([(root, 0)])

    while queue:
        node, current_num = queue.popleft()
        new_num = current_num * 10 + node.value

        # If leaf, add to total
        if node.left is None and node.right is None:
            total_sum += new_num
            continue

        # Enqueue children
        if node.left is not None:
            queue.append((node.left, new_num))
        if node.right is not None:
            queue.append((node.right, new_num))

    return total_sum


# ============================================================================
# APPROACH 5: Using Generator (Pythonic)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h) for generator stack
#
# Demonstrates Python's generator pattern for tree traversal.
# ============================================================================


def sum_root_to_leaf_generator(root: Optional[BinaryTree]) -> int:
    """Calculate sum using generator to yield leaf numbers."""

    def leaf_numbers(node: Optional[BinaryTree], current: int = 0):
        """Generator that yields all complete root-to-leaf numbers."""
        if node is None:
            return

        new_num = current * 10 + node.value

        if node.left is None and node.right is None:
            yield new_num
        else:
            yield from leaf_numbers(node.left, new_num)
            yield from leaf_numbers(node.right, new_num)

    return sum(leaf_numbers(root))


# ============================================================================
# BONUS: Return All Numbers (not just sum)
# ============================================================================


def get_all_numbers(root: Optional[BinaryTree]) -> List[int]:
    """Return all root-to-leaf numbers as a list."""
    numbers: List[int] = []

    def dfs(node: Optional[BinaryTree], current: int) -> None:
        if node is None:
            return

        new_num = current * 10 + node.value

        if node.left is None and node.right is None:
            numbers.append(new_num)
            return

        dfs(node.left, new_num)
        dfs(node.right, new_num)

    dfs(root, 0)
    return numbers


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("SUM ROOT TO LEAF NUMBERS - TEST RESULTS")
    print("=" * 70)

    # Test Case 1: Standard tree
    #    1
    #   / \
    #  2   3
    root1 = BinaryTree(1)
    root1.left = BinaryTree(2)
    root1.right = BinaryTree(3)

    print("\nTest 1: Simple tree (1->2, 1->3)")
    print(f"  Result: {sum_root_to_leaf(root1)}")
    print("  Expected: 25 (12 + 13)")
    print(f"  Numbers: {get_all_numbers(root1)}")

    # Test Case 2: Larger tree
    #        4
    #       / \
    #      9   0
    #     / \
    #    5   1
    root2 = BinaryTree(4)
    root2.left = BinaryTree(9)
    root2.right = BinaryTree(0)
    root2.left.left = BinaryTree(5)
    root2.left.right = BinaryTree(1)

    print("\nTest 2: Tree with multiple levels")
    print(f"  Result: {sum_root_to_leaf(root2)}")
    print("  Expected: 1026 (495 + 491 + 40)")
    print(f"  Numbers: {get_all_numbers(root2)}")

    # Test Case 3: Single node
    root3 = BinaryTree(9)
    print("\nTest 3: Single node")
    print(f"  Result: {sum_root_to_leaf(root3)}")
    print("  Expected: 9")

    # Test Case 4: Zero values
    root4 = BinaryTree(1)
    root4.left = BinaryTree(0)
    print("\nTest 4: With zero (1->0)")
    print(f"  Result: {sum_root_to_leaf(root4)}")
    print("  Expected: 10")

    # Test Case 5: Linear tree
    root5 = BinaryTree(1)
    root5.left = BinaryTree(2)
    root5.left.left = BinaryTree(3)
    print("\nTest 5: Linear tree (1->2->3)")
    print(f"  Result: {sum_root_to_leaf(root5)}")
    print("  Expected: 123")

    # Test Case 6: Empty tree
    print("\nTest 6: Empty tree")
    print(f"  Result: {sum_root_to_leaf(None)}")
    print("  Expected: 0")

    # Compare approaches
    print("\n" + "=" * 70)
    print("COMPARING APPROACHES")
    print("=" * 70)

    approaches = [
        ("Recursive DFS", sum_root_to_leaf),
        ("Explicit Helper", sum_root_to_leaf_explicit),
        ("Iterative Stack", sum_root_to_leaf_iterative),
        ("BFS Queue", sum_root_to_leaf_bfs),
        ("Generator", sum_root_to_leaf_generator),
    ]

    print("\nUsing tree with numbers 495, 491, 40:")
    for name, func in approaches:
        print(f"  {name}: {func(root2)}")


if __name__ == "__main__":
    run_tests()
