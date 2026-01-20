"""
Iterative Tree Traversal - Python Solutions

Implement inorder, preorder, and postorder traversals iteratively using stacks.

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
# INORDER TRAVERSAL (Left -> Node -> Right)
# ============================================================================

def inorder_iterative(root: Optional[TreeNode]) -> list[int]:
    """
    Iterative inorder traversal using stack.

    Algorithm:
    1. Push all left children onto stack
    2. Pop node, add to result
    3. Go to right child and repeat

    Time: O(n), Space: O(h)
    """
    result = []
    stack = []
    current = root

    while current or stack:
        # Go to leftmost node
        while current:
            stack.append(current)
            current = current.left

        # Process current node
        current = stack.pop()
        result.append(current.val)

        # Move to right subtree
        current = current.right

    return result


# ============================================================================
# PREORDER TRAVERSAL (Node -> Left -> Right)
# ============================================================================

def preorder_iterative(root: Optional[TreeNode]) -> list[int]:
    """
    Iterative preorder traversal using stack.

    Algorithm:
    1. Pop node from stack, add to result
    2. Push right child then left child (so left is processed first)

    Time: O(n), Space: O(h)
    """
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        # Push right first so left is popped first
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result


def preorder_iterative_v2(root: Optional[TreeNode]) -> list[int]:
    """
    Alternative preorder using same pattern as inorder.

    This version mirrors the inorder structure more closely.
    """
    result = []
    stack = []
    current = root

    while current or stack:
        while current:
            result.append(current.val)  # Process before going left
            stack.append(current)
            current = current.left

        current = stack.pop()
        current = current.right

    return result


# ============================================================================
# POSTORDER TRAVERSAL (Left -> Right -> Node)
# ============================================================================

def postorder_iterative_two_stacks(root: Optional[TreeNode]) -> list[int]:
    """
    Iterative postorder using two stacks.

    Algorithm:
    1. Stack1: Process nodes (push to stack2)
    2. Stack2: Collects nodes in reverse postorder
    3. Pop all from stack2 for result

    Time: O(n), Space: O(n)
    """
    if not root:
        return []

    stack1 = [root]
    stack2 = []

    # Process nodes: root -> right -> left (reverse postorder)
    while stack1:
        node = stack1.pop()
        stack2.append(node)

        if node.left:
            stack1.append(node.left)
        if node.right:
            stack1.append(node.right)

    # Pop from stack2 to get postorder
    result = []
    while stack2:
        result.append(stack2.pop().val)

    return result


def postorder_iterative_reverse(root: Optional[TreeNode]) -> list[int]:
    """
    Iterative postorder using modified preorder + reverse.

    Do Node -> Right -> Left traversal, then reverse to get Left -> Right -> Node

    Time: O(n), Space: O(n)
    """
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        # Push left first so right is popped first (reverse of normal preorder)
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)

    # Reverse to get postorder
    return result[::-1]


def postorder_iterative_one_stack(root: Optional[TreeNode]) -> list[int]:
    """
    Iterative postorder with single stack and previous pointer.

    This is the most space-efficient iterative postorder.

    Algorithm:
    - Track the previously visited node
    - If coming from left child, try to go right
    - If coming from right child (or no children), process current

    Time: O(n), Space: O(h)
    """
    if not root:
        return []

    result = []
    stack = []
    current = root
    prev = None

    while current or stack:
        # Go to leftmost
        while current:
            stack.append(current)
            current = current.left

        current = stack[-1]

        # If right child exists and we haven't visited it yet
        if current.right and current.right != prev:
            current = current.right
        else:
            # Process current node
            result.append(current.val)
            prev = current
            stack.pop()
            current = None  # Important: don't go left again

    return result


# ============================================================================
# UNIFIED APPROACH: Single Function for All Traversals
# ============================================================================

def tree_traversal_iterative(root: Optional[TreeNode], order: str = "inorder") -> list[int]:
    """
    Unified iterative traversal function.

    Args:
        root: Root of the tree
        order: "inorder", "preorder", or "postorder"

    Returns:
        List of values in specified order
    """
    if not root:
        return []

    if order == "inorder":
        return inorder_iterative(root)
    elif order == "preorder":
        return preorder_iterative(root)
    elif order == "postorder":
        return postorder_iterative_one_stack(root)
    else:
        raise ValueError(f"Unknown order: {order}")


# ============================================================================
# BONUS: Level Order (BFS) Traversal
# ============================================================================

def level_order_iterative(root: Optional[TreeNode]) -> list[list[int]]:
    """
    Level order traversal using queue (BFS).

    Returns list of lists, one for each level.

    Time: O(n), Space: O(w) where w is max width
    """
    if not root:
        return []

    result = []
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
    """Run comprehensive tests for all traversal methods."""

    print("=" * 70)
    print("ITERATIVE TREE TRAVERSAL - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        ([1, None, 2, 3], "Simple tree"),
        ([1, 2, 3, 4, 5, None, 6], "Complete-ish tree"),
        ([1], "Single node"),
        ([1, 2, None, 3, None, 4], "Left-skewed"),
        ([1, None, 2, None, 3, None, 4], "Right-skewed"),
    ]

    for values, description in test_cases:
        print(f"\n{description}")
        print(f"Tree (level-order): {values}")

        root = build_tree(values)

        # Inorder
        inorder = inorder_iterative(root)
        print(f"  Inorder:   {inorder}")

        # Preorder
        preorder1 = preorder_iterative(root)
        preorder2 = preorder_iterative_v2(root)
        print(f"  Preorder:  {preorder1}")
        print(f"  Preorder (v2): {preorder2}")

        # Postorder - all methods
        post_two = postorder_iterative_two_stacks(root)
        post_rev = postorder_iterative_reverse(root)
        post_one = postorder_iterative_one_stack(root)
        print(f"  Postorder (2 stacks): {post_two}")
        print(f"  Postorder (reverse):  {post_rev}")
        print(f"  Postorder (1 stack):  {post_one}")

        # Level order
        level = level_order_iterative(root)
        print(f"  Level order: {level}")

        # Verify all postorder methods give same result
        assert post_two == post_rev == post_one, "Postorder methods should match!"

    # Test empty tree
    print("\nEmpty tree:")
    empty = build_tree([])
    print(f"  Inorder:   {inorder_iterative(empty)}")
    print(f"  Preorder:  {preorder_iterative(empty)}")
    print(f"  Postorder: {postorder_iterative_one_stack(empty)}")

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
