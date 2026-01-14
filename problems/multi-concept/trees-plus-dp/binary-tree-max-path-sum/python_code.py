"""
Binary Tree Maximum Path Sum
Combines: Tree Traversal (DFS) + Dynamic Programming
"""

from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def maxPathSum(root: Optional[TreeNode]) -> int:
    """
    Find maximum path sum in binary tree.
    Path can start and end at any node.
    """
    max_sum = float('-inf')

    def dfs(node: Optional[TreeNode]) -> int:
        """
        Returns max path sum that can extend to parent.
        Updates global max for complete paths through node.
        """
        nonlocal max_sum

        if not node:
            return 0

        # Get max path from children (ignore negative paths)
        left_gain = max(0, dfs(node.left))
        right_gain = max(0, dfs(node.right))

        # Path through this node (complete path, cannot extend)
        path_through_node = node.val + left_gain + right_gain
        max_sum = max(max_sum, path_through_node)

        # Return max path that can extend to parent
        return node.val + max(left_gain, right_gain)

    dfs(root)
    return max_sum


def maxPathSum_verbose(root: Optional[TreeNode]) -> int:
    """
    Verbose version with step-by-step output
    """
    max_sum = float('-inf')
    steps = []

    def dfs(node: Optional[TreeNode], depth: int = 0) -> int:
        nonlocal max_sum

        if not node:
            return 0

        indent = "  " * depth

        left_gain = max(0, dfs(node.left, depth + 1))
        right_gain = max(0, dfs(node.right, depth + 1))

        path_through = node.val + left_gain + right_gain
        old_max = max_sum
        max_sum = max(max_sum, path_through)

        extendable = node.val + max(left_gain, right_gain)

        step = f"{indent}Node({node.val}): left_gain={left_gain}, right_gain={right_gain}"
        step += f"\n{indent}  path_through={path_through}, max_sum={max_sum}"
        step += f"\n{indent}  returning extendable={extendable}"
        steps.append(step)

        return extendable

    dfs(root)

    print("\nStep-by-step execution:")
    for step in steps:
        print(step)

    return max_sum


def build_tree(values: List) -> Optional[TreeNode]:
    """Build tree from level-order list"""
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


def tree_to_str(root: Optional[TreeNode], level: int = 0, prefix: str = "Root: ") -> str:
    """Visual tree representation"""
    if not root:
        return ""

    result = " " * (level * 4) + prefix + str(root.val) + "\n"

    if root.left or root.right:
        if root.left:
            result += tree_to_str(root.left, level + 1, "L--- ")
        else:
            result += " " * ((level + 1) * 4) + "L--- null\n"

        if root.right:
            result += tree_to_str(root.right, level + 1, "R--- ")
        else:
            result += " " * ((level + 1) * 4) + "R--- null\n"

    return result


if __name__ == "__main__":
    test_cases = [
        ([1, 2, 3], 6),
        ([-10, 9, 20, None, None, 15, 7], 42),
        ([-3], -3),
        ([2, -1], 2),
        ([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1], 48),
        ([-1, -2, -3], -1),
        ([1, -2, 3], 4),
        ([9, 6, -3, None, None, -6, 2, None, None, 2, None, -6, -6, -6], 16),
    ]

    print("Binary Tree Maximum Path Sum")
    print("=" * 60)

    for i, (values, expected) in enumerate(test_cases):
        root = build_tree(values)

        print(f"\nTest {i + 1}: {values}")
        print(tree_to_str(root))

        result = maxPathSum(root)
        status = "PASS" if result == expected else "FAIL"
        print(f"Max Path Sum: {result} (expected: {expected}) [{status}]")
        print("-" * 40)

    # Detailed example
    print("\n" + "=" * 60)
    print("Detailed execution for [-10, 9, 20, None, None, 15, 7]:")
    print("=" * 60)
    root = build_tree([-10, 9, 20, None, None, 15, 7])
    result = maxPathSum_verbose(root)
    print(f"\nFinal Answer: {result}")
