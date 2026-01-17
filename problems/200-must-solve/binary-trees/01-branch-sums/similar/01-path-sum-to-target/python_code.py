"""
Path Sum to Target - Python Solutions

Find all root-to-leaf paths where the sum equals the target.

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
# APPROACH 1: DFS with Backtracking (Recommended)
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(h) for recursion stack + O(n) for storing paths
#
# WHY THIS IS BEST:
# - Clean recursive structure
# - Natural fit for path problems
# - Backtracking handles path building elegantly
# ============================================================================


def path_sum_to_target(root: Optional[BinaryTree], target: int) -> List[List[int]]:
    """
    Find all root-to-leaf paths that sum to target.

    Uses DFS with backtracking to explore all paths.

    Visual example for target=22:

            5
           / \\
          4   8
         /   / \\
       11   13  4
       / \\     / \\
      7   2   5   1

    Returns: [[5,4,11,2], [5,8,4,5]]
    """
    result: List[List[int]] = []
    current_path: List[int] = []

    def dfs(node: Optional[BinaryTree], remaining: int) -> None:
        if node is None:
            return

        # Add current node to path
        current_path.append(node.value)
        remaining -= node.value

        # Check if it's a leaf and sum matches
        if node.left is None and node.right is None and remaining == 0:
            # Make a copy of the path to store
            result.append(current_path.copy())

        # Explore children
        dfs(node.left, remaining)
        dfs(node.right, remaining)

        # BACKTRACK: remove current node from path
        current_path.pop()

    dfs(root, target)
    return result


# ============================================================================
# APPROACH 2: DFS with Path Passing (Functional Style)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n * h) - creates new path at each level
#
# WHEN TO USE:
# - When you prefer immutable-style programming
# - Cleaner for some, but higher memory usage
# ============================================================================


def path_sum_to_target_functional(
    root: Optional[BinaryTree], target: int
) -> List[List[int]]:
    """
    Find paths using functional style (no mutation).

    Each recursive call gets its own path list.
    """

    def dfs(node: Optional[BinaryTree], remaining: int, path: List[int]) -> List[List[int]]:
        if node is None:
            return []

        # Create new path with current node
        new_path = path + [node.value]
        new_remaining = remaining - node.value

        # Check if leaf with matching sum
        if node.left is None and node.right is None:
            return [new_path] if new_remaining == 0 else []

        # Collect paths from both subtrees
        left_paths = dfs(node.left, new_remaining, new_path)
        right_paths = dfs(node.right, new_remaining, new_path)

        return left_paths + right_paths

    return dfs(root, target, [])


# ============================================================================
# APPROACH 3: Iterative with Stack
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) for stack and path storage
#
# WHEN TO USE:
# - When recursion depth might cause stack overflow
# - When you need explicit control over traversal
# ============================================================================


def path_sum_to_target_iterative(
    root: Optional[BinaryTree], target: int
) -> List[List[int]]:
    """
    Find paths using iterative DFS with explicit stack.

    Each stack item contains: (node, remaining_sum, current_path)
    """
    if root is None:
        return []

    result: List[List[int]] = []
    # Stack: (node, remaining_sum, path_so_far)
    stack: List[tuple[BinaryTree, int, List[int]]] = [(root, target, [])]

    while stack:
        node, remaining, path = stack.pop()

        # Extend path with current node
        new_path = path + [node.value]
        new_remaining = remaining - node.value

        # Check if leaf with matching sum
        if node.left is None and node.right is None:
            if new_remaining == 0:
                result.append(new_path)
            continue

        # Push children (right first so left is processed first)
        if node.right is not None:
            stack.append((node.right, new_remaining, new_path))
        if node.left is not None:
            stack.append((node.left, new_remaining, new_path))

    return result


# ============================================================================
# APPROACH 4: BFS with Queue
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - stores complete paths
#
# WHEN TO USE:
# - When you need level-order processing
# - Less common for this problem type
# ============================================================================


def path_sum_to_target_bfs(
    root: Optional[BinaryTree], target: int
) -> List[List[int]]:
    """
    Find paths using BFS (level-order traversal).

    Queue stores (node, remaining_sum, path).
    """
    if root is None:
        return []

    result: List[List[int]] = []
    queue: deque[tuple[BinaryTree, int, List[int]]] = deque([(root, target, [])])

    while queue:
        node, remaining, path = queue.popleft()

        new_path = path + [node.value]
        new_remaining = remaining - node.value

        # Check if leaf with matching sum
        if node.left is None and node.right is None:
            if new_remaining == 0:
                result.append(new_path)
            continue

        # Add children to queue
        if node.left is not None:
            queue.append((node.left, new_remaining, new_path))
        if node.right is not None:
            queue.append((node.right, new_remaining, new_path))

    return result


# ============================================================================
# HELPER: Build tree from list
# ============================================================================


def build_tree(values: List[Optional[int]]) -> Optional[BinaryTree]:
    """
    Build a binary tree from level-order list.
    None represents missing nodes.
    """
    if not values or values[0] is None:
        return None

    root = BinaryTree(values[0])
    queue = deque([root])
    i = 1

    while queue and i < len(values):
        node = queue.popleft()

        # Left child
        if i < len(values) and values[i] is not None:
            node.left = BinaryTree(values[i])
            queue.append(node.left)
        i += 1

        # Right child
        if i < len(values) and values[i] is not None:
            node.right = BinaryTree(values[i])
            queue.append(node.right)
        i += 1

    return root


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    print("=" * 70)
    print("PATH SUM TO TARGET - TEST RESULTS")
    print("=" * 70)

    # Test Case 1: Standard tree
    #        5
    #       / \
    #      4   8
    #     /   / \
    #   11   13  4
    #   / \     / \
    #  7   2   5   1
    root1 = BinaryTree(5)
    root1.left = BinaryTree(4)
    root1.right = BinaryTree(8)
    root1.left.left = BinaryTree(11)
    root1.right.left = BinaryTree(13)
    root1.right.right = BinaryTree(4)
    root1.left.left.left = BinaryTree(7)
    root1.left.left.right = BinaryTree(2)
    root1.right.right.left = BinaryTree(5)
    root1.right.right.right = BinaryTree(1)

    print("\nTest 1: Tree with target=22")
    result1 = path_sum_to_target(root1, 22)
    print(f"  Result: {result1}")
    print("  Expected: [[5, 4, 11, 2], [5, 8, 4, 5]]")

    # Test Case 2: No valid paths
    root2 = BinaryTree(1)
    root2.left = BinaryTree(2)
    root2.right = BinaryTree(3)

    print("\nTest 2: Tree with target=5 (no match)")
    result2 = path_sum_to_target(root2, 5)
    print(f"  Result: {result2}")
    print("  Expected: []")

    # Test Case 3: Single valid path
    print("\nTest 3: Tree with target=4")
    result3 = path_sum_to_target(root2, 4)
    print(f"  Result: {result3}")
    print("  Expected: [[1, 3]]")

    # Test Case 4: Single node tree
    root4 = BinaryTree(5)
    print("\nTest 4: Single node with target=5")
    result4 = path_sum_to_target(root4, 5)
    print(f"  Result: {result4}")
    print("  Expected: [[5]]")

    # Test Case 5: Empty tree
    print("\nTest 5: Empty tree")
    result5 = path_sum_to_target(None, 0)
    print(f"  Result: {result5}")
    print("  Expected: []")

    # Test Case 6: Negative values
    root6 = BinaryTree(-2)
    root6.right = BinaryTree(-3)
    print("\nTest 6: Negative values with target=-5")
    result6 = path_sum_to_target(root6, -5)
    print(f"  Result: {result6}")
    print("  Expected: [[-2, -3]]")

    # Compare approaches
    print("\n" + "=" * 70)
    print("COMPARING APPROACHES")
    print("=" * 70)

    approaches = [
        ("DFS Backtracking", path_sum_to_target),
        ("Functional Style", path_sum_to_target_functional),
        ("Iterative Stack", path_sum_to_target_iterative),
        ("BFS Queue", path_sum_to_target_bfs),
    ]

    for name, func in approaches:
        print(f"\n{name}:")
        print(f"  {func(root1, 22)}")


if __name__ == "__main__":
    run_tests()
