"""
Level Order Traversal (BFS)
===========================
Return the level order traversal of a binary tree.

Time Complexity: O(n)
Space Complexity: O(w) where w is maximum width of tree
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
    def levelOrder_bfs(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        BFS approach using a queue.

        Time: O(n), Space: O(w) where w is max width
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            current_level = []

            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(current_level)

        return result

    def levelOrder_dfs(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        DFS recursive approach.

        Time: O(n), Space: O(h) for recursion
        """
        result = []

        def dfs(node: Optional[TreeNode], level: int) -> None:
            if not node:
                return

            # Create new level list if needed
            if level >= len(result):
                result.append([])

            # Add current node to its level
            result[level].append(node.val)

            # Process children
            dfs(node.left, level + 1)
            dfs(node.right, level + 1)

        dfs(root, 0)
        return result

    def levelOrder_iterative_no_deque(self, root: Optional[TreeNode]) -> List[List[int]]:
        """
        Iterative approach without deque (using two lists).

        Time: O(n), Space: O(w)
        """
        if not root:
            return []

        result = []
        current_level = [root]

        while current_level:
            level_values = []
            next_level = []

            for node in current_level:
                level_values.append(node.val)
                if node.left:
                    next_level.append(node.left)
                if node.right:
                    next_level.append(node.right)

            result.append(level_values)
            current_level = next_level

        return result


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
        ([3, 9, 20, None, None, 15, 7], [[3], [9, 20], [15, 7]]),
        ([1], [[1]]),
        ([], []),
        ([1, 2, 3, 4, 5, 6, 7], [[1], [2, 3], [4, 5, 6, 7]]),
        ([1, 2, None, 3, None, 4], [[1], [2], [3], [4]]),  # Left-skewed
        ([1, None, 2, None, 3, None, 4], [[1], [2], [3], [4]]),  # Right-skewed
    ]

    print("=" * 60)
    print("LEVEL ORDER TRAVERSAL - TEST RESULTS")
    print("=" * 60)

    for i, (values, expected) in enumerate(test_cases, 1):
        root = build_tree(values)

        bfs_result = solution.levelOrder_bfs(root)
        dfs_result = solution.levelOrder_dfs(root)
        iterative_result = solution.levelOrder_iterative_no_deque(root)

        bfs_pass = bfs_result == expected
        dfs_pass = dfs_result == expected
        iterative_pass = iterative_result == expected

        status = "PASS" if (bfs_pass and dfs_pass and iterative_pass) else "FAIL"

        print(f"\nTest {i}: {status}")
        print(f"  Input:     {values}")
        print(f"  Expected:  {expected}")
        print(f"  BFS:       {bfs_result} {'OK' if bfs_pass else 'FAIL'}")
        print(f"  DFS:       {dfs_result} {'OK' if dfs_pass else 'FAIL'}")
        print(f"  Iterative: {iterative_result} {'OK' if iterative_pass else 'FAIL'}")

    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
