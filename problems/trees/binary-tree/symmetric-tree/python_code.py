"""
Symmetric Tree
==============
Check if a binary tree is symmetric (mirror of itself).

Time Complexity: O(n)
Space Complexity: O(h) for recursive, O(n) for iterative
"""

from typing import Optional, List
from collections import deque


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isSymmetric_recursive(self, root: Optional[TreeNode]) -> bool:
        """
        Recursive approach using mirror check.

        Time: O(n), Space: O(h) where h is tree height
        """
        def isMirror(left: Optional[TreeNode], right: Optional[TreeNode]) -> bool:
            # Both null - symmetric
            if not left and not right:
                return True
            # One null - not symmetric
            if not left or not right:
                return False
            # Check values and mirror subtrees
            return (left.val == right.val and
                    isMirror(left.left, right.right) and
                    isMirror(left.right, right.left))

        if not root:
            return True
        return isMirror(root.left, root.right)

    def isSymmetric_iterative(self, root: Optional[TreeNode]) -> bool:
        """
        Iterative approach using a queue.

        Time: O(n), Space: O(n)
        """
        if not root:
            return True

        queue = deque([(root.left, root.right)])

        while queue:
            left, right = queue.popleft()

            # Both null - continue to next pair
            if not left and not right:
                continue
            # One null or values differ - not symmetric
            if not left or not right or left.val != right.val:
                return False

            # Add children in mirror order
            queue.append((left.left, right.right))
            queue.append((left.right, right.left))

        return True

    def isSymmetric_stack(self, root: Optional[TreeNode]) -> bool:
        """
        Iterative approach using a stack (DFS style).

        Time: O(n), Space: O(h)
        """
        if not root:
            return True

        stack = [(root.left, root.right)]

        while stack:
            left, right = stack.pop()

            if not left and not right:
                continue
            if not left or not right or left.val != right.val:
                return False

            stack.append((left.left, right.right))
            stack.append((left.right, right.left))

        return True


# Helper function to build tree from list
def build_tree(values: List[Optional[int]]) -> Optional[TreeNode]:
    """Build a binary tree from a level-order list representation."""
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


def run_tests():
    """Run test cases for all implementations."""
    solution = Solution()

    test_cases = [
        # (input_list, expected_output)
        ([1, 2, 2, 3, 4, 4, 3], True),
        ([1, 2, 2, None, 3, None, 3], False),
        ([1], True),
        ([1, 2, 2, 2, None, 2], False),
        ([], True),
        ([1, 2, 2], True),
        ([1, 2, 3], False),
        ([1, 2, 2, None, 3, 3, None], True),
        ([5, 4, 4, 3, None, None, 3, 2, None, None, 2], True),
    ]

    print("=" * 60)
    print("SYMMETRIC TREE - TEST RESULTS")
    print("=" * 60)

    for i, (values, expected) in enumerate(test_cases, 1):
        root = build_tree(values)

        recursive_result = solution.isSymmetric_recursive(root)
        iterative_result = solution.isSymmetric_iterative(root)
        stack_result = solution.isSymmetric_stack(root)

        recursive_pass = recursive_result == expected
        iterative_pass = iterative_result == expected
        stack_pass = stack_result == expected

        all_pass = recursive_pass and iterative_pass and stack_pass
        status = "PASS" if all_pass else "FAIL"

        print(f"\nTest {i}: {status}")
        print(f"  Input:     {values}")
        print(f"  Expected:  {expected}")
        print(f"  Recursive: {recursive_result} {'OK' if recursive_pass else 'FAIL'}")
        print(f"  Iterative: {iterative_result} {'OK' if iterative_pass else 'FAIL'}")
        print(f"  Stack:     {stack_result} {'OK' if stack_pass else 'FAIL'}")

    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
