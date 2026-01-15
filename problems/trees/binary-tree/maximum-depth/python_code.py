"""
Maximum Depth of Binary Tree
============================
Return the maximum depth (height) of a binary tree.

Time Complexity: O(n)
Space Complexity: O(h) for recursive, O(w) for BFS
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
    def maxDepth_recursive(self, root: Optional[TreeNode]) -> int:
        """
        Recursive DFS approach.

        Time: O(n), Space: O(h) where h is tree height
        """
        if not root:
            return 0

        left_depth = self.maxDepth_recursive(root.left)
        right_depth = self.maxDepth_recursive(root.right)

        return 1 + max(left_depth, right_depth)

    def maxDepth_bfs(self, root: Optional[TreeNode]) -> int:
        """
        Iterative BFS approach using level-order traversal.

        Time: O(n), Space: O(w) where w is max width
        """
        if not root:
            return 0

        depth = 0
        queue = deque([root])

        while queue:
            depth += 1
            level_size = len(queue)

            for _ in range(level_size):
                node = queue.popleft()
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return depth

    def maxDepth_dfs_iterative(self, root: Optional[TreeNode]) -> int:
        """
        Iterative DFS approach using a stack.

        Time: O(n), Space: O(h)
        """
        if not root:
            return 0

        max_depth = 0
        stack = [(root, 1)]  # (node, current_depth)

        while stack:
            node, current_depth = stack.pop()
            max_depth = max(max_depth, current_depth)

            if node.left:
                stack.append((node.left, current_depth + 1))
            if node.right:
                stack.append((node.right, current_depth + 1))

        return max_depth

    def maxDepth_one_liner(self, root: Optional[TreeNode]) -> int:
        """
        One-liner recursive solution.

        Time: O(n), Space: O(h)
        """
        return 0 if not root else 1 + max(
            self.maxDepth_one_liner(root.left),
            self.maxDepth_one_liner(root.right)
        )


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
        ([3, 9, 20, None, None, 15, 7], 3),
        ([1, None, 2], 2),
        ([], 0),
        ([1], 1),
        ([1, 2, 3, 4, 5, 6, 7], 3),
        ([1, 2, None, 3, None, 4, None, 5], 5),  # Left-skewed
        ([1, None, 2, None, 3, None, 4, None, 5], 5),  # Right-skewed
        ([1, 2, 3, 4, None, None, 5, 6, None, None, 7], 4),
    ]

    print("=" * 60)
    print("MAXIMUM DEPTH - TEST RESULTS")
    print("=" * 60)

    for i, (values, expected) in enumerate(test_cases, 1):
        root = build_tree(values)

        recursive_result = solution.maxDepth_recursive(root)
        bfs_result = solution.maxDepth_bfs(root)
        dfs_result = solution.maxDepth_dfs_iterative(root)
        one_liner_result = solution.maxDepth_one_liner(root)

        recursive_pass = recursive_result == expected
        bfs_pass = bfs_result == expected
        dfs_pass = dfs_result == expected
        one_liner_pass = one_liner_result == expected

        all_pass = recursive_pass and bfs_pass and dfs_pass and one_liner_pass
        status = "PASS" if all_pass else "FAIL"

        print(f"\nTest {i}: {status}")
        print(f"  Input:     {values}")
        print(f"  Expected:  {expected}")
        print(f"  Recursive: {recursive_result} {'OK' if recursive_pass else 'FAIL'}")
        print(f"  BFS:       {bfs_result} {'OK' if bfs_pass else 'FAIL'}")
        print(f"  DFS Stack: {dfs_result} {'OK' if dfs_pass else 'FAIL'}")
        print(f"  One-liner: {one_liner_result} {'OK' if one_liner_pass else 'FAIL'}")

    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
