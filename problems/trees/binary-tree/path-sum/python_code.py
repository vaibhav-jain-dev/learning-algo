"""
Path Sum
========
Check if tree has a root-to-leaf path with given sum.

Time Complexity: O(n)
Space Complexity: O(h) for recursive, O(h) for iterative
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
    def hasPathSum_recursive(self, root: Optional[TreeNode], targetSum: int) -> bool:
        """
        Recursive DFS approach - subtract values along the path.

        Time: O(n), Space: O(h) where h is tree height
        """
        if not root:
            return False

        # Check if leaf node
        if not root.left and not root.right:
            return targetSum == root.val

        # Recurse with reduced target
        remaining = targetSum - root.val
        return (self.hasPathSum_recursive(root.left, remaining) or
                self.hasPathSum_recursive(root.right, remaining))

    def hasPathSum_iterative_stack(self, root: Optional[TreeNode], targetSum: int) -> bool:
        """
        Iterative DFS approach using a stack.

        Time: O(n), Space: O(h)
        """
        if not root:
            return False

        stack = [(root, targetSum)]

        while stack:
            node, remaining = stack.pop()

            # Check if leaf and sum matches
            if not node.left and not node.right:
                if remaining == node.val:
                    return True
                continue

            new_remaining = remaining - node.val

            if node.right:
                stack.append((node.right, new_remaining))
            if node.left:
                stack.append((node.left, new_remaining))

        return False

    def hasPathSum_bfs(self, root: Optional[TreeNode], targetSum: int) -> bool:
        """
        BFS approach using a queue.

        Time: O(n), Space: O(w) where w is max width
        """
        if not root:
            return False

        queue = deque([(root, targetSum)])

        while queue:
            node, remaining = queue.popleft()

            # Check if leaf and sum matches
            if not node.left and not node.right:
                if remaining == node.val:
                    return True
                continue

            new_remaining = remaining - node.val

            if node.left:
                queue.append((node.left, new_remaining))
            if node.right:
                queue.append((node.right, new_remaining))

        return False

    def hasPathSum_accumulate(self, root: Optional[TreeNode], targetSum: int) -> bool:
        """
        Alternative approach - accumulate sum instead of subtracting.

        Time: O(n), Space: O(h)
        """
        def dfs(node: Optional[TreeNode], current_sum: int) -> bool:
            if not node:
                return False

            current_sum += node.val

            # Check if leaf
            if not node.left and not node.right:
                return current_sum == targetSum

            return dfs(node.left, current_sum) or dfs(node.right, current_sum)

        return dfs(root, 0)


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
        # (input_list, target_sum, expected_output)
        ([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1], 22, True),
        ([1, 2, 3], 5, False),
        ([], 0, False),
        ([1, 2], 1, False),  # Root is not a leaf
        ([1], 1, True),  # Single node tree
        ([1, 2, 3], 4, True),  # 1 -> 3 = 4
        ([1, 2, 3], 3, True),  # 1 -> 2 = 3
        ([-2, None, -3], -5, True),  # Negative values
        ([1, -2, -3, 1, 3, -2, None, -1], -1, True),  # Mixed values
    ]

    print("=" * 60)
    print("PATH SUM - TEST RESULTS")
    print("=" * 60)

    for i, (values, target, expected) in enumerate(test_cases, 1):
        root = build_tree(values)

        recursive_result = solution.hasPathSum_recursive(root, target)
        stack_result = solution.hasPathSum_iterative_stack(root, target)
        bfs_result = solution.hasPathSum_bfs(root, target)
        accumulate_result = solution.hasPathSum_accumulate(root, target)

        recursive_pass = recursive_result == expected
        stack_pass = stack_result == expected
        bfs_pass = bfs_result == expected
        accumulate_pass = accumulate_result == expected

        all_pass = recursive_pass and stack_pass and bfs_pass and accumulate_pass
        status = "PASS" if all_pass else "FAIL"

        print(f"\nTest {i}: {status}")
        print(f"  Input:      {values}")
        print(f"  Target:     {target}")
        print(f"  Expected:   {expected}")
        print(f"  Recursive:  {recursive_result} {'OK' if recursive_pass else 'FAIL'}")
        print(f"  Stack:      {stack_result} {'OK' if stack_pass else 'FAIL'}")
        print(f"  BFS:        {bfs_result} {'OK' if bfs_pass else 'FAIL'}")
        print(f"  Accumulate: {accumulate_result} {'OK' if accumulate_pass else 'FAIL'}")

    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
