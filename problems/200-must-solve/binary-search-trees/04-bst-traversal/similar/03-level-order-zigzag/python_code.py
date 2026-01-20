"""
Binary Tree Zigzag Level Order Traversal - Python Solutions

Return zigzag level order traversal (alternating left-to-right and right-to-left).

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional
from collections import deque


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: BFS with Level Reverse
# ============================================================================
# Time Complexity:  O(n) - visit each node once, reversals are O(n) total
# Space Complexity: O(n) - queue and result storage
#
# WHY THIS WORKS:
# - Standard BFS collects levels left-to-right
# - Reverse odd-indexed levels to get right-to-left
# - Simple and easy to understand
# ============================================================================

def zigzag_level_order_reverse(root: Optional[TreeNode]) -> list[list[int]]:
    """
    Zigzag traversal using standard BFS + reverse on odd levels.

    Most straightforward approach - just reverse alternate levels.
    """
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        # Reverse if right-to-left direction
        if not left_to_right:
            level.reverse()

        result.append(level)
        left_to_right = not left_to_right

    return result


# ============================================================================
# APPROACH 2: BFS with Deque Direction Control
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHY THIS IS ELEGANT:
# - No explicit reversal needed
# - Insert at front or back based on direction
# - Deque has O(1) append and appendleft
# ============================================================================

def zigzag_level_order_deque(root: Optional[TreeNode]) -> list[list[int]]:
    """
    Zigzag traversal using deque with direction-aware insertion.

    Uses deque's O(1) appendleft for right-to-left levels.
    """
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level_size = len(queue)
        level = deque()  # Use deque for current level

        for _ in range(level_size):
            node = queue.popleft()

            # Insert based on direction
            if left_to_right:
                level.append(node.val)
            else:
                level.appendleft(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(list(level))
        left_to_right = not left_to_right

    return result


# ============================================================================
# APPROACH 3: Two Stacks Alternating
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHY THIS IS INTERESTING:
# - Uses stack's LIFO property for natural reversal
# - Alternate between two stacks
# - Push children in opposite order based on direction
# ============================================================================

def zigzag_level_order_two_stacks(root: Optional[TreeNode]) -> list[list[int]]:
    """
    Zigzag traversal using two alternating stacks.

    Stack 1: left-to-right (push left then right)
    Stack 2: right-to-left (push right then left)
    """
    if not root:
        return []

    result = []
    current_stack = [root]
    next_stack = []
    left_to_right = True

    while current_stack:
        level = []

        while current_stack:
            node = current_stack.pop()
            level.append(node.val)

            if left_to_right:
                # For next level (right-to-left), push left first
                if node.left:
                    next_stack.append(node.left)
                if node.right:
                    next_stack.append(node.right)
            else:
                # For next level (left-to-right), push right first
                if node.right:
                    next_stack.append(node.right)
                if node.left:
                    next_stack.append(node.left)

        result.append(level)
        current_stack, next_stack = next_stack, current_stack
        left_to_right = not left_to_right

    return result


# ============================================================================
# APPROACH 4: DFS with Level Tracking
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) for result + O(h) for recursion
#
# WHY USE DFS:
# - Alternative to BFS
# - Can be useful if you prefer recursive thinking
# - Insert at correct position based on level parity
# ============================================================================

def zigzag_level_order_dfs(root: Optional[TreeNode]) -> list[list[int]]:
    """
    Zigzag traversal using DFS with level tracking.

    Recursively visit nodes and insert into correct level list.
    """
    result = []

    def dfs(node: Optional[TreeNode], level: int) -> None:
        if not node:
            return

        # Extend result list if needed
        if level >= len(result):
            result.append(deque())

        # Insert based on level parity
        if level % 2 == 0:
            result[level].append(node.val)  # Left to right
        else:
            result[level].appendleft(node.val)  # Right to left

        dfs(node.left, level + 1)
        dfs(node.right, level + 1)

    dfs(root, 0)
    return [list(level) for level in result]


# ============================================================================
# VARIANT: Zigzag with Level Markers
# ============================================================================
# Returns result with level direction markers for debugging
# ============================================================================

def zigzag_with_markers(root: Optional[TreeNode]) -> list[dict]:
    """
    Zigzag traversal that also returns direction markers.

    Useful for debugging or when direction info is needed.
    """
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True
    level_num = 0

    while queue:
        level_size = len(queue)
        level_vals = []

        for _ in range(level_size):
            node = queue.popleft()
            level_vals.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        direction = "L->R" if left_to_right else "R->L"
        if not left_to_right:
            level_vals.reverse()

        result.append({
            "level": level_num,
            "direction": direction,
            "values": level_vals
        })

        left_to_right = not left_to_right
        level_num += 1

    return result


# ============================================================================
# BONUS: Spiral Order (Another Variant)
# ============================================================================
# Similar to zigzag but starts from bottom level
# ============================================================================

def spiral_order_bottom_up(root: Optional[TreeNode]) -> list[list[int]]:
    """
    Bottom-up spiral order traversal.

    Like zigzag but starts from bottom level going up.
    """
    if not root:
        return []

    # First do regular level order
    all_levels = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        all_levels.append(level)

    # Reverse levels and apply zigzag
    result = []
    for i, level in enumerate(reversed(all_levels)):
        if i % 2 == 1:  # Odd index after reversal = originally even from bottom
            level = level[::-1]
        result.append(level)

    return result


# ============================================================================
# HELPER: Build tree from list for testing
# ============================================================================

def build_tree(values: list) -> Optional[TreeNode]:
    """Build binary tree from level-order list."""
    if not values or values[0] is None:
        return None

    root = TreeNode(values[0])
    queue = deque([root])
    i = 1

    while queue and i < len(values):
        node = queue.popleft()

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
    """Run comprehensive tests for zigzag traversal."""

    print("=" * 70)
    print("ZIGZAG LEVEL ORDER TRAVERSAL - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        ([3, 9, 20, None, None, 15, 7], [[3], [20, 9], [15, 7]], "Example 1"),
        ([1, 2, 3, 4, 5, 6, 7], [[1], [3, 2], [4, 5, 6, 7]], "Complete tree"),
        ([1], [[1]], "Single node"),
        ([1, 2, 3, 4, None, None, 5], [[1], [3, 2], [4, 5]], "Partial tree"),
        ([], [], "Empty tree"),
    ]

    for values, expected, description in test_cases:
        print(f"\n{description}")
        print(f"Input: {values}")
        print(f"Expected: {expected}")

        root = build_tree(values)

        # Test all approaches
        result1 = zigzag_level_order_reverse(root)
        result2 = zigzag_level_order_deque(root)
        result3 = zigzag_level_order_two_stacks(root)
        result4 = zigzag_level_order_dfs(root)

        status1 = "PASS" if result1 == expected else f"FAIL: {result1}"
        status2 = "PASS" if result2 == expected else f"FAIL: {result2}"
        status3 = "PASS" if result3 == expected else f"FAIL: {result3}"
        status4 = "PASS" if result4 == expected else f"FAIL: {result4}"

        print(f"  Reverse approach:    {result1} - {status1}")
        print(f"  Deque approach:      {result2} - {status2}")
        print(f"  Two stacks approach: {result3} - {status3}")
        print(f"  DFS approach:        {result4} - {status4}")

    # Test with markers
    print("\n" + "-" * 70)
    print("Zigzag with Direction Markers")
    print("-" * 70)

    root = build_tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    marked = zigzag_with_markers(root)
    for level_info in marked:
        print(f"  Level {level_info['level']} ({level_info['direction']}): {level_info['values']}")

    # Test spiral bottom-up
    print("\n" + "-" * 70)
    print("Spiral Order (Bottom-Up)")
    print("-" * 70)
    root = build_tree([1, 2, 3, 4, 5, 6, 7])
    spiral = spiral_order_bottom_up(root)
    print(f"  Tree: [1, 2, 3, 4, 5, 6, 7]")
    print(f"  Spiral bottom-up: {spiral}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
