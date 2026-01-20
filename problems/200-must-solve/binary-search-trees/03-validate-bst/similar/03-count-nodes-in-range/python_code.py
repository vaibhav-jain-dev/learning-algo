"""
Count Nodes in Range (Range Sum BST Variant) - Python Solutions

Count nodes and sum values within a given range in a BST.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: Recursive DFS with Pruning
# ============================================================================
# Time Complexity:  O(n) worst case, O(log n + k) average where k = nodes in range
# Space Complexity: O(h) - recursion stack depth
#
# WHY THIS WORKS:
# - Uses BST property to prune unnecessary subtrees
# - If node < low: skip left subtree (all values < low)
# - If node > high: skip right subtree (all values > high)
# ============================================================================

def count_nodes_in_range(root: Optional[TreeNode], low: int, high: int) -> int:
    """
    Count nodes with values in [low, high] range.

    Uses BST property to efficiently prune search space.
    """
    if root is None:
        return 0

    count = 0

    # Count current node if in range
    if low <= root.val <= high:
        count = 1

    # Only explore left if there could be values >= low
    if root.val > low:
        count += count_nodes_in_range(root.left, low, high)

    # Only explore right if there could be values <= high
    if root.val < high:
        count += count_nodes_in_range(root.right, low, high)

    return count


def range_sum_bst(root: Optional[TreeNode], low: int, high: int) -> int:
    """
    Sum of values of nodes in [low, high] range.

    Same pruning strategy as count, but accumulates sum instead.
    """
    if root is None:
        return 0

    total = 0

    # Add current value if in range
    if low <= root.val <= high:
        total = root.val

    # Only explore left if there could be values >= low
    if root.val > low:
        total += range_sum_bst(root.left, low, high)

    # Only explore right if there could be values <= high
    if root.val < high:
        total += range_sum_bst(root.right, low, high)

    return total


# ============================================================================
# APPROACH 2: Combined Count and Sum in One Pass
# ============================================================================
# Time Complexity:  O(n) worst case, O(log n + k) average
# Space Complexity: O(h)
#
# WHY COMBINE:
# - Often need both count and sum
# - Single traversal is more efficient
# - Returns tuple (count, sum)
# ============================================================================

def count_and_sum_in_range(root: Optional[TreeNode], low: int, high: int) -> tuple[int, int]:
    """
    Return both count and sum of nodes in [low, high] range.

    Returns: (count, sum)
    """
    if root is None:
        return (0, 0)

    count, total = 0, 0

    # Include current node if in range
    if low <= root.val <= high:
        count = 1
        total = root.val

    # Explore left subtree if needed
    if root.val > low:
        left_count, left_sum = count_and_sum_in_range(root.left, low, high)
        count += left_count
        total += left_sum

    # Explore right subtree if needed
    if root.val < high:
        right_count, right_sum = count_and_sum_in_range(root.right, low, high)
        count += right_count
        total += right_sum

    return (count, total)


# ============================================================================
# APPROACH 3: Iterative with Stack (No Recursion)
# ============================================================================
# Time Complexity:  O(n) worst case, O(log n + k) average
# Space Complexity: O(h) - explicit stack
#
# WHY ITERATIVE:
# - Avoids recursion limit for very deep trees
# - More explicit control over traversal
# - Some interviewers prefer iterative solutions
# ============================================================================

def count_nodes_in_range_iterative(root: Optional[TreeNode], low: int, high: int) -> int:
    """
    Count nodes in range using iterative approach with stack.
    """
    if root is None:
        return 0

    count = 0
    stack = [root]

    while stack:
        node = stack.pop()

        if node is None:
            continue

        # Count if in range
        if low <= node.val <= high:
            count += 1

        # Add children with pruning
        if node.val > low and node.left:
            stack.append(node.left)
        if node.val < high and node.right:
            stack.append(node.right)

    return count


def range_sum_iterative(root: Optional[TreeNode], low: int, high: int) -> int:
    """
    Sum values in range using iterative approach with stack.
    """
    if root is None:
        return 0

    total = 0
    stack = [root]

    while stack:
        node = stack.pop()

        if node is None:
            continue

        # Add value if in range
        if low <= node.val <= high:
            total += node.val

        # Add children with pruning
        if node.val > low and node.left:
            stack.append(node.left)
        if node.val < high and node.right:
            stack.append(node.right)

    return total


# ============================================================================
# APPROACH 4: Collect Nodes in Range (Extended Problem)
# ============================================================================
# Time Complexity:  O(n) worst case, O(log n + k) average
# Space Complexity: O(k) for result list + O(h) for recursion
#
# WHY THIS VARIATION:
# - Sometimes need the actual nodes/values, not just count
# - Returns sorted list (inorder traversal)
# ============================================================================

def get_nodes_in_range(root: Optional[TreeNode], low: int, high: int) -> list[int]:
    """
    Return list of all values in [low, high] range, sorted.

    Uses inorder traversal to maintain sorted order.
    """
    result = []

    def inorder(node: Optional[TreeNode]) -> None:
        if node is None:
            return

        # Visit left if there could be values >= low
        if node.val > low:
            inorder(node.left)

        # Add current if in range
        if low <= node.val <= high:
            result.append(node.val)

        # Visit right if there could be values <= high
        if node.val < high:
            inorder(node.right)

    inorder(root)
    return result


# ============================================================================
# APPROACH 5: Using Generator (Memory Efficient)
# ============================================================================
# Time Complexity:  O(n) worst case
# Space Complexity: O(h) for recursion, values yielded one at a time
#
# WHY GENERATORS:
# - Memory efficient for large results
# - Can stop early if only need first k values
# - Pythonic approach
# ============================================================================

def nodes_in_range_generator(root: Optional[TreeNode], low: int, high: int):
    """
    Generator yielding values in range [low, high] in sorted order.
    """
    if root is None:
        return

    # Yield from left if there could be values >= low
    if root.val > low:
        yield from nodes_in_range_generator(root.left, low, high)

    # Yield current if in range
    if low <= root.val <= high:
        yield root.val

    # Yield from right if there could be values <= high
    if root.val < high:
        yield from nodes_in_range_generator(root.right, low, high)


# ============================================================================
# HELPER: Build BST from list for testing
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
    print("COUNT NODES IN RANGE - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        # (values, low, high, expected_count, expected_sum, description)
        ([10, 5, 15, 3, 7, None, 18], 7, 15, 3, 32, "Example 1"),
        ([10, 5, 15, 3, 7, 13, 18, 1, None, 6], 6, 10, 3, 23, "Example 2"),
        ([10, 5, 15, 3, 7, None, 18], 1, 20, 6, 58, "Full tree range"),
        ([10, 5, 15, 3, 7, None, 18], 10, 10, 1, 10, "Single value range"),
        ([10, 5, 15, 3, 7, None, 18], 100, 200, 0, 0, "Range outside tree"),
        ([10], 5, 15, 1, 10, "Single node in range"),
        ([10], 15, 20, 0, 0, "Single node out of range"),
    ]

    for values, low, high, exp_count, exp_sum, desc in test_cases:
        print(f"\n{desc}")
        print(f"Tree: {values}, Range: [{low}, {high}]")
        print(f"Expected: Count={exp_count}, Sum={exp_sum}")

        root = build_tree(values)

        # Test recursive count
        count = count_nodes_in_range(root, low, high)
        print(f"  Recursive count:    {count} {'PASS' if count == exp_count else 'FAIL'}")

        # Test recursive sum
        total = range_sum_bst(root, low, high)
        print(f"  Recursive sum:      {total} {'PASS' if total == exp_sum else 'FAIL'}")

        # Test combined
        c, s = count_and_sum_in_range(root, low, high)
        print(f"  Combined (c, s):    ({c}, {s})")

        # Test iterative count
        count_iter = count_nodes_in_range_iterative(root, low, high)
        print(f"  Iterative count:    {count_iter}")

        # Test iterative sum
        sum_iter = range_sum_iterative(root, low, high)
        print(f"  Iterative sum:      {sum_iter}")

        # Test get nodes
        nodes = get_nodes_in_range(root, low, high)
        print(f"  Nodes in range:     {nodes}")

        # Test generator
        gen_list = list(nodes_in_range_generator(root, low, high))
        print(f"  Generator result:   {gen_list}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
