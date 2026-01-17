"""
K Closest Values in BST - Python Solutions

Given a BST, target, and k, find k values closest to the target.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional
import heapq
from collections import deque


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: Inorder Traversal + Max Heap
# ============================================================================
# Time Complexity:  O(n log k) - traverse all nodes, heap ops are log k
# Space Complexity: O(k + h) - heap size k, recursion depth h
#
# WHY THIS WORKS:
# - Traverse entire BST
# - Maintain max heap of size k (by distance)
# - When heap full and current is closer, replace max
# ============================================================================

def k_closest_values_heap(root: Optional[TreeNode], target: float, k: int) -> list[int]:
    """
    Find k closest values using max heap approach.

    Python's heapq is a min heap, so we negate distances for max heap behavior.
    Each heap element is (-distance, value).
    """
    max_heap = []  # Elements: (-distance, value)

    def inorder(node: Optional[TreeNode]) -> None:
        if not node:
            return

        inorder(node.left)

        # Process current node
        dist = abs(node.val - target)

        if len(max_heap) < k:
            # Heap not full, add directly
            heapq.heappush(max_heap, (-dist, node.val))
        elif dist < -max_heap[0][0]:
            # Current is closer than the farthest in heap
            heapq.heapreplace(max_heap, (-dist, node.val))

        inorder(node.right)

    inorder(root)

    # Extract values from heap
    return [val for _, val in max_heap]


# ============================================================================
# APPROACH 2: Inorder + Two Pointers
# ============================================================================
# Time Complexity:  O(n + k) - inorder O(n), two pointers O(k)
# Space Complexity: O(n) - store all values in array
#
# WHY THIS WORKS:
# - Inorder traversal gives sorted array
# - Binary search finds starting point
# - Expand outward to find k closest
# ============================================================================

def k_closest_values_two_pointers(root: Optional[TreeNode], target: float, k: int) -> list[int]:
    """
    Find k closest values using inorder traversal and two pointers.

    Steps:
    1. Get sorted values via inorder traversal
    2. Binary search to find closest starting point
    3. Expand outward using two pointers
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

    if not values:
        return []

    # Binary search to find position closest to target
    left = binary_search_closest(values, target)
    right = left + 1
    result = []

    # Expand outward from closest position
    while len(result) < k:
        if left < 0:
            # Only right side available
            result.append(values[right])
            right += 1
        elif right >= len(values):
            # Only left side available
            result.append(values[left])
            left -= 1
        else:
            # Both sides available, pick closer one
            left_dist = abs(target - values[left])
            right_dist = abs(target - values[right])

            if left_dist <= right_dist:
                result.append(values[left])
                left -= 1
            else:
                result.append(values[right])
                right += 1

    return result


def binary_search_closest(values: list[int], target: float) -> int:
    """Find index of value closest to or just less than target."""
    left, right = 0, len(values) - 1

    while left < right:
        mid = left + (right - left + 1) // 2
        if values[mid] <= target:
            left = mid
        else:
            right = mid - 1

    return left


# ============================================================================
# APPROACH 3: Optimized with Sliding Window (Early Termination)
# ============================================================================
# Time Complexity:  O(k + h) average case - can skip many nodes
# Space Complexity: O(k + h) - result array + recursion stack
#
# WHY THIS IS OPTIMAL:
# - Uses BST property to navigate efficiently
# - Once we have k values and are moving away from target, we can stop
# - Best when k << n
# ============================================================================

def k_closest_values_optimized(root: Optional[TreeNode], target: float, k: int) -> list[int]:
    """
    Find k closest values using sliding window with early termination.

    Key insight: In sorted (inorder) order, once our window of k elements
    starts moving away from target, we can stop.
    """
    result = deque(maxlen=k)  # Acts as sliding window

    def inorder(node: Optional[TreeNode]) -> bool:
        """Returns True if we should stop traversal."""
        if not node:
            return False

        # Process left subtree
        if inorder(node.left):
            return True

        # Process current node
        if len(result) < k:
            result.append(node.val)
        else:
            # Check if current is closer than leftmost (farthest) in window
            curr_dist = abs(node.val - target)
            first_dist = abs(result[0] - target)

            if curr_dist < first_dist:
                # Slide window: remove leftmost, add current
                result.popleft()
                result.append(node.val)
            else:
                # Current is farther, and all future nodes will be even farther
                # (since inorder gives sorted values)
                return True  # Early termination

        # Process right subtree
        return inorder(node.right)

    inorder(root)
    return list(result)


# ============================================================================
# APPROACH 4: Using BST Iterator (Stack-based)
# ============================================================================
# Time Complexity:  O(log n + k) for finding k elements
# Space Complexity: O(h) - stack depth
#
# MOST OPTIMAL FOR LARGE n, SMALL k:
# - Use two stacks: one for predecessors, one for successors
# - Initialize by finding closest position
# - Expand outward by popping from appropriate stack
# ============================================================================

def k_closest_values_iterator(root: Optional[TreeNode], target: float, k: int) -> list[int]:
    """
    Find k closest using two BST iterators (predecessor and successor).

    This is optimal when k << n as we don't need to traverse entire tree.
    """
    # Stack for values <= target (predecessors)
    pred_stack = []
    # Stack for values > target (successors)
    succ_stack = []

    # Initialize stacks by traversing to target
    node = root
    while node:
        if node.val <= target:
            pred_stack.append(node)
            node = node.right
        else:
            succ_stack.append(node)
            node = node.left

    result = []

    def get_predecessor() -> Optional[int]:
        """Get next smaller value."""
        if not pred_stack:
            return None

        node = pred_stack.pop()
        val = node.val

        # Add all right children of left subtree
        node = node.left
        while node:
            pred_stack.append(node)
            node = node.right

        return val

    def get_successor() -> Optional[int]:
        """Get next larger value."""
        if not succ_stack:
            return None

        node = succ_stack.pop()
        val = node.val

        # Add all left children of right subtree
        node = node.right
        while node:
            succ_stack.append(node)
            node = node.left

        return val

    # Get first predecessor and successor
    pred = get_predecessor()
    succ = get_successor()

    # Pick k closest values
    while len(result) < k:
        if pred is None:
            result.append(succ)
            succ = get_successor()
        elif succ is None:
            result.append(pred)
            pred = get_predecessor()
        elif target - pred <= succ - target:
            result.append(pred)
            pred = get_predecessor()
        else:
            result.append(succ)
            succ = get_successor()

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
    print("K CLOSEST VALUES IN BST - TEST RESULTS")
    print("=" * 70)

    approaches = [
        ("Max Heap", k_closest_values_heap),
        ("Two Pointers", k_closest_values_two_pointers),
        ("Optimized (Sliding Window)", k_closest_values_optimized),
        ("BST Iterator", k_closest_values_iterator),
    ]

    # Test case 1: Standard case
    #       4
    #      / \
    #     2   5
    #    / \
    #   1   3
    root1 = build_bst([4, 2, 5, 1, 3])

    print("\nTest 1: Standard BST")
    print("BST: [4, 2, 5, 1, 3], target = 3.7, k = 2")
    print("Expected closest values: [3, 4] (any order)")
    for name, func in approaches:
        result = func(root1, 3.7, 2)
        print(f"  {name}: {sorted(result)}")

    # Test case 2: Single node
    root2 = TreeNode(1)

    print("\nTest 2: Single node")
    print("BST: [1], target = 0.0, k = 1")
    print("Expected: [1]")
    for name, func in approaches:
        result = func(root2, 0.0, 1)
        print(f"  {name}: {result}")

    # Test case 3: Larger BST
    root3 = build_bst([8, 4, 12, 2, 6, 10, 14])

    print("\nTest 3: Larger BST")
    print("BST: [8, 4, 12, 2, 6, 10, 14], target = 6.5, k = 4")
    print("Expected: [6, 8, 4, 10] (any order)")
    for name, func in approaches:
        result = func(root3, 6.5, 4)
        print(f"  {name}: {sorted(result)}")

    # Test case 4: Target equals a node value
    print("\nTest 4: Target equals node value")
    print("BST: [4, 2, 5, 1, 3], target = 3.0, k = 3")
    print("Expected: [3, 2, 4] (any order)")
    for name, func in approaches:
        result = func(root1, 3.0, 3)
        print(f"  {name}: {sorted(result)}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
