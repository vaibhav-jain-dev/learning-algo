"""
Binary Tree Level Order Traversal - Python Solutions

Return level order traversal of binary tree (values grouped by level).

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import deque
from typing import List, Optional


class TreeNode:
    """Binary tree node."""

    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: BFS with Level Size Tracking
# ============================================================================
# Time Complexity:  O(N) - visit each node once
# Space Complexity: O(W) - max width of tree (queue size)
#
# WHY THIS IS BEST:
# - Clean and intuitive level-by-level processing
# - Natural BFS pattern
# - Uses queue size to determine level boundaries
# ============================================================================

def level_order_bfs(root: Optional[TreeNode]) -> List[List[int]]:
    """
    Return level order traversal using BFS.

    Key Insight: At start of each level, queue contains exactly
    all nodes at that level. Use queue size to process level.

    Visual:
            3          Level 0: [3]
           / \         Level 1: [9, 20]
          9  20        Level 2: [15, 7]
            /  \
           15   7
    """
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)  # Nodes at current level
        level = []

        # Process all nodes at this level
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            # Enqueue children for next level
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result


# ============================================================================
# APPROACH 2: DFS with Level Parameter
# ============================================================================
# Time Complexity:  O(N)
# Space Complexity: O(H) - height of tree for recursion
#
# WHEN TO USE:
# - Prefer recursive solutions
# - Want to use DFS pattern
# - Tree is very wide but not deep
# ============================================================================

def level_order_dfs(root: Optional[TreeNode]) -> List[List[int]]:
    """
    Return level order traversal using DFS.

    Pass level as parameter, add to appropriate result index.
    """
    result: List[List[int]] = []

    def dfs(node: Optional[TreeNode], level: int) -> None:
        if not node:
            return

        # Ensure result has list for this level
        if level >= len(result):
            result.append([])

        # Add value to appropriate level
        result[level].append(node.val)

        # Recurse to children (left first for left-to-right order)
        dfs(node.left, level + 1)
        dfs(node.right, level + 1)

    dfs(root, 0)
    return result


# ============================================================================
# APPROACH 3: BFS with Level Marker
# ============================================================================
# Time Complexity:  O(N)
# Space Complexity: O(W)
#
# WHEN TO USE:
# - Alternative approach using None as level delimiter
# - Some may find this more intuitive
# ============================================================================

def level_order_marker(root: Optional[TreeNode]) -> List[List[int]]:
    """
    Use None as level delimiter in queue.
    """
    if not root:
        return []

    result = []
    queue = deque([root, None])  # None marks end of level
    current_level = []

    while queue:
        node = queue.popleft()

        if node is None:
            # End of current level
            result.append(current_level)
            current_level = []

            # Add marker for next level (if there are more nodes)
            if queue:
                queue.append(None)
        else:
            current_level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result


# ============================================================================
# VARIATIONS
# ============================================================================

def level_order_bottom(root: Optional[TreeNode]) -> List[List[int]]:
    """Return level order from bottom to top."""
    result = level_order_bfs(root)
    return result[::-1]  # Reverse


def zigzag_level_order(root: Optional[TreeNode]) -> List[List[int]]:
    """Return zigzag level order traversal."""
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level_size = len(queue)
        level = [0] * level_size

        for i in range(level_size):
            node = queue.popleft()

            # Insert based on direction
            idx = i if left_to_right else level_size - 1 - i
            level[idx] = node.val

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)
        left_to_right = not left_to_right

    return result


def right_side_view(root: Optional[TreeNode]) -> List[int]:
    """Return rightmost node at each level."""
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            # Last node at this level
            if i == level_size - 1:
                result.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result


# ============================================================================
# HELPER: Build tree from list
# ============================================================================

def build_tree(values: List[Optional[int]]) -> Optional[TreeNode]:
    """Build tree from level order list (None for missing nodes)."""
    if not values or values[0] is None:
        return None

    root = TreeNode(values[0])
    queue = deque([root])
    i = 1

    while queue and i < len(values):
        node = queue.popleft()

        # Left child
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        # Right child
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

    test_cases = [
        ([3, 9, 20, None, None, 15, 7], [[3], [9, 20], [15, 7]], "Standard tree"),
        ([1], [[1]], "Single node"),
        ([], [], "Empty tree"),
        ([1, 2, 3, 4, 5, 6, 7], [[1], [2, 3], [4, 5, 6, 7]], "Complete binary tree"),
    ]

    approaches = [
        ("BFS Level Size", level_order_bfs),
        ("DFS Recursive", level_order_dfs),
        ("BFS with Marker", level_order_marker),
    ]

    print("=" * 70)
    print("BINARY TREE LEVEL ORDER TRAVERSAL - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)

        for values, expected, desc in test_cases:
            root = build_tree(values)
            result = func(root)

            status = "PASS" if result == expected else "FAIL"
            print(f"  [{status}] {desc}: {result}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    # Variation tests
    print("\n" + "=" * 70)
    print("VARIATIONS")
    print("=" * 70)

    tree = build_tree([3, 9, 20, None, None, 15, 7])

    print(f"\nLevel Order Bottom: {level_order_bottom(tree)}")
    print(f"Zigzag Level Order: {zigzag_level_order(tree)}")
    print(f"Right Side View: {right_side_view(tree)}")

    print("\nAll tests completed!")
