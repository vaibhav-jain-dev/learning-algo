"""
Inorder Traversal of Binary Tree
================================
Implement both iterative and recursive inorder traversal.

Time Complexity: O(n) for all approaches
Space Complexity: O(h) for recursive/iterative, O(1) for Morris
"""

from typing import Optional, List


class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def inorderTraversal_recursive(self, root: Optional[TreeNode]) -> List[int]:
        """
        Recursive inorder traversal.

        Time: O(n), Space: O(h) where h is tree height
        """
        result = []

        def inorder(node: Optional[TreeNode]) -> None:
            if not node:
                return
            inorder(node.left)      # Visit left subtree
            result.append(node.val)  # Visit root
            inorder(node.right)     # Visit right subtree

        inorder(root)
        return result

    def inorderTraversal_iterative(self, root: Optional[TreeNode]) -> List[int]:
        """
        Iterative inorder traversal using a stack.

        Time: O(n), Space: O(h)
        """
        result = []
        stack = []
        current = root

        while current or stack:
            # Go to the leftmost node
            while current:
                stack.append(current)
                current = current.left

            # Process current node
            current = stack.pop()
            result.append(current.val)

            # Move to right subtree
            current = current.right

        return result

    def inorderTraversal_morris(self, root: Optional[TreeNode]) -> List[int]:
        """
        Morris Traversal - O(1) space complexity.

        Uses threaded binary tree concept.
        Time: O(n), Space: O(1)
        """
        result = []
        current = root

        while current:
            if not current.left:
                # No left subtree, visit current and go right
                result.append(current.val)
                current = current.right
            else:
                # Find inorder predecessor
                predecessor = current.left
                while predecessor.right and predecessor.right != current:
                    predecessor = predecessor.right

                if not predecessor.right:
                    # Make current the right child of its predecessor
                    predecessor.right = current
                    current = current.left
                else:
                    # Revert the changes (remove thread)
                    predecessor.right = None
                    result.append(current.val)
                    current = current.right

        return result


# Helper function to build tree from list
def build_tree(values: List[Optional[int]]) -> Optional[TreeNode]:
    """Build a binary tree from a level-order list representation."""
    if not values or values[0] is None:
        return None

    root = TreeNode(values[0])
    queue = [root]
    i = 1

    while queue and i < len(values):
        node = queue.pop(0)

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
    """Run test cases for all three implementations."""
    solution = Solution()

    test_cases = [
        # (input_list, expected_output)
        ([1, None, 2, 3], [1, 3, 2]),
        ([], []),
        ([1], [1]),
        ([1, 2, 3, 4, 5], [4, 2, 5, 1, 3]),
        ([1, 2, 3, None, None, 4, 5], [2, 1, 4, 3, 5]),
        ([5, 3, 7, 2, 4, 6, 8], [2, 3, 4, 5, 6, 7, 8]),  # BST
    ]

    print("=" * 60)
    print("INORDER TRAVERSAL - TEST RESULTS")
    print("=" * 60)

    for i, (values, expected) in enumerate(test_cases, 1):
        root = build_tree(values)

        recursive_result = solution.inorderTraversal_recursive(root)
        iterative_result = solution.inorderTraversal_iterative(root)

        # Rebuild tree for Morris (it modifies the tree temporarily)
        root = build_tree(values)
        morris_result = solution.inorderTraversal_morris(root)

        recursive_pass = recursive_result == expected
        iterative_pass = iterative_result == expected
        morris_pass = morris_result == expected

        status = "PASS" if (recursive_pass and iterative_pass and morris_pass) else "FAIL"

        print(f"\nTest {i}: {status}")
        print(f"  Input:     {values}")
        print(f"  Expected:  {expected}")
        print(f"  Recursive: {recursive_result} {'OK' if recursive_pass else 'FAIL'}")
        print(f"  Iterative: {iterative_result} {'OK' if iterative_pass else 'FAIL'}")
        print(f"  Morris:    {morris_result} {'OK' if morris_pass else 'FAIL'}")

    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
