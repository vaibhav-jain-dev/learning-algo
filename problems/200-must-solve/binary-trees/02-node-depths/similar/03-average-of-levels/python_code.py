"""
Average of Levels in Binary Tree - Python Solutions

Given a binary tree, return the average value of nodes on each level.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional
from collections import deque, defaultdict


class BinaryTree:
    """Binary tree node definition."""

    def __init__(self, value: int) -> None:
        self.value = value
        self.left: Optional[BinaryTree] = None
        self.right: Optional[BinaryTree] = None


# ============================================================================
# APPROACH 1: BFS with Level Tracking (Recommended)
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(w) - where w is max width of tree
#
# WHY THIS IS BEST:
# - Natural fit for level-order processing
# - Easy to track level boundaries using queue size
# - Simple running sum calculation per level
# ============================================================================


def average_of_levels(root: Optional[BinaryTree]) -> list[float]:
    """
    Return the average value of nodes on each level.

    Key insight: Use BFS and track level boundaries with queue size.

    Visual example:

        3
       / \
      9  20
        /  \
       15   7

    Level 0: [3]     -> avg = 3.0
    Level 1: [9, 20] -> avg = 14.5
    Level 2: [15, 7] -> avg = 11.0

    Answer: [3.0, 14.5, 11.0]
    """
    if root is None:
        return []

    result: list[float] = []
    queue: deque[BinaryTree] = deque([root])

    while queue:
        level_size = len(queue)
        level_sum = 0

        # Process all nodes at current level
        for _ in range(level_size):
            node = queue.popleft()
            level_sum += node.value

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        # Calculate and store average for this level
        result.append(level_sum / level_size)

    return result


# ============================================================================
# APPROACH 2: DFS with Level Mapping
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(h) for recursion + O(n) for level storage
#
# WHEN TO USE:
# - When you prefer recursive solutions
# - When tree is deep but narrow (BFS would use less space)
# ============================================================================


def average_of_levels_dfs(root: Optional[BinaryTree]) -> list[float]:
    """
    Use DFS to collect nodes by level, then calculate averages.
    """
    if root is None:
        return []

    # level_data[level] = (sum, count)
    level_data: dict[int, list[int]] = defaultdict(lambda: [0, 0])

    def dfs(node: Optional[BinaryTree], level: int) -> None:
        if node is None:
            return

        level_data[level][0] += node.value  # sum
        level_data[level][1] += 1  # count

        dfs(node.left, level + 1)
        dfs(node.right, level + 1)

    dfs(root, 0)

    # Calculate averages in level order
    result = []
    level = 0
    while level in level_data:
        total, count = level_data[level]
        result.append(total / count)
        level += 1

    return result


# ============================================================================
# APPROACH 3: BFS with Two Lists (Alternative)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(w)
#
# Alternative implementation using list swapping instead of queue size.
# ============================================================================


def average_of_levels_two_lists(root: Optional[BinaryTree]) -> list[float]:
    """
    Use two lists to track current and next level nodes.
    """
    if root is None:
        return []

    result: list[float] = []
    current_level = [root]

    while current_level:
        level_sum = sum(node.value for node in current_level)
        result.append(level_sum / len(current_level))

        # Build next level
        next_level = []
        for node in current_level:
            if node.left:
                next_level.append(node.left)
            if node.right:
                next_level.append(node.right)

        current_level = next_level

    return result


# ============================================================================
# APPROACH 4: Using Level Order Traversal Result
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# First collect all levels, then calculate averages.
# ============================================================================


def average_of_levels_collect_first(root: Optional[BinaryTree]) -> list[float]:
    """
    Collect all levels first, then calculate averages.
    More readable but uses more space.
    """
    if root is None:
        return []

    # Collect all levels
    levels: list[list[int]] = []
    queue: deque[BinaryTree] = deque([root])

    while queue:
        level_size = len(queue)
        current_level = []

        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.value)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        levels.append(current_level)

    # Calculate averages
    return [sum(level) / len(level) for level in levels]


# ============================================================================
# BONUS: Get Level Sums (Related Problem)
# ============================================================================


def level_sums(root: Optional[BinaryTree]) -> list[int]:
    """
    Return the sum of nodes at each level.
    Similar approach, just return sums instead of averages.
    """
    if root is None:
        return []

    result: list[int] = []
    queue: deque[BinaryTree] = deque([root])

    while queue:
        level_size = len(queue)
        level_sum = 0

        for _ in range(level_size):
            node = queue.popleft()
            level_sum += node.value

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level_sum)

    return result


# ============================================================================
# BONUS: Maximum Level Sum (Related Problem - LeetCode 1161)
# ============================================================================


def max_level_sum(root: Optional[BinaryTree]) -> int:
    """
    Return the smallest level with maximum sum (1-indexed).
    """
    if root is None:
        return 0

    sums = level_sums(root)
    max_sum = max(sums)

    # Return 1-indexed level
    return sums.index(max_sum) + 1


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("AVERAGE OF LEVELS IN BINARY TREE - TEST RESULTS")
    print("=" * 70)

    # Test Case 1: Standard tree
    #    3
    #   / \
    #  9  20
    #    /  \
    #   15   7
    root1 = BinaryTree(3)
    root1.left = BinaryTree(9)
    root1.right = BinaryTree(20)
    root1.right.left = BinaryTree(15)
    root1.right.right = BinaryTree(7)

    print("\nTest 1: Standard tree")
    print("       3")
    print("      / \\")
    print("     9  20")
    print("       /  \\")
    print("      15   7")
    print(f"  Result: {average_of_levels(root1)}")
    print("  Expected: [3.0, 14.5, 11.0]")

    # Test Case 2: Complete binary tree
    #      1
    #     / \
    #    2   3
    #   / \   \
    #  4   5   6
    root2 = BinaryTree(1)
    root2.left = BinaryTree(2)
    root2.right = BinaryTree(3)
    root2.left.left = BinaryTree(4)
    root2.left.right = BinaryTree(5)
    root2.right.right = BinaryTree(6)

    print("\nTest 2: Tree with 6 nodes")
    print(f"  Result: {average_of_levels(root2)}")
    print("  Expected: [1.0, 2.5, 5.0]")

    # Test Case 3: Single node
    root3 = BinaryTree(42)
    print("\nTest 3: Single node (value=42)")
    print(f"  Result: {average_of_levels(root3)}")
    print("  Expected: [42.0]")

    # Test Case 4: Skewed tree (left)
    root4 = BinaryTree(1)
    root4.left = BinaryTree(2)
    root4.left.left = BinaryTree(3)

    print("\nTest 4: Left skewed tree (1->2->3)")
    print(f"  Result: {average_of_levels(root4)}")
    print("  Expected: [1.0, 2.0, 3.0]")

    # Test Case 5: Empty tree
    print("\nTest 5: Empty tree")
    print(f"  Result: {average_of_levels(None)}")
    print("  Expected: []")

    # Test Case 6: Tree with negative values
    root6 = BinaryTree(-1)
    root6.left = BinaryTree(-2)
    root6.right = BinaryTree(3)

    print("\nTest 6: Tree with negative values")
    print(f"  Result: {average_of_levels(root6)}")
    print("  Expected: [-1.0, 0.5]")

    # Compare approaches
    print("\n" + "=" * 70)
    print("COMPARING APPROACHES")
    print("=" * 70)

    approaches = [
        ("BFS Level Tracking", average_of_levels),
        ("DFS with Mapping", average_of_levels_dfs),
        ("Two Lists", average_of_levels_two_lists),
        ("Collect First", average_of_levels_collect_first),
    ]

    print("\nUsing standard tree (Test 1):")
    for name, func in approaches:
        print(f"  {name}: {func(root1)}")

    # Test bonus functions
    print("\n" + "=" * 70)
    print("BONUS: LEVEL SUMS")
    print("=" * 70)
    print(f"\nLevel sums for Test 1: {level_sums(root1)}")
    print("Expected: [3, 29, 22]")
    print(f"Max level sum at level: {max_level_sum(root1)}")
    print("Expected: 2 (level with sum 29)")


if __name__ == "__main__":
    run_tests()
