"""
Lowest Common Ancestor of a Binary Tree - Python Solutions

Find the lowest common ancestor of two nodes in a binary tree.
LCA is the deepest node that has both p and q as descendants.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import Optional, List
from collections import deque


class TreeNode:
    """Definition for a binary tree node."""

    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right


# ============================================================================
# APPROACH 1: Recursive DFS
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(h) - recursion stack, h is tree height
#
# WHY THIS IS BEST:
# - Elegant single-pass solution
# - Returns as soon as LCA is found
# - Easy to understand and implement
# ============================================================================

def lowest_common_ancestor_recursive(
    root: Optional[TreeNode],
    p: TreeNode,
    q: TreeNode
) -> Optional[TreeNode]:
    """
    Find LCA using recursive DFS.

    Key insight: The LCA is the node where:
    1. p and q are in different subtrees, OR
    2. The node itself is p or q and the other is in a subtree

    Returns the node if found (p, q, or LCA), None otherwise.
    """
    if not root or root == p or root == q:
        return root

    # Search both subtrees
    left = lowest_common_ancestor_recursive(root.left, p, q)
    right = lowest_common_ancestor_recursive(root.right, p, q)

    # If both subtrees return non-null, this node is LCA
    if left and right:
        return root

    # Return whichever is non-null (or None if both null)
    return left if left else right


# ============================================================================
# APPROACH 2: Iterative with Parent Pointers
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) for parent dictionary
#
# WHEN TO USE:
# - Need to handle multiple LCA queries
# - Prefer iterative over recursive
# - Tree is already built with parent pointers
# ============================================================================

def lowest_common_ancestor_parent(
    root: Optional[TreeNode],
    p: TreeNode,
    q: TreeNode
) -> Optional[TreeNode]:
    """
    Find LCA using parent pointers.

    1. Build parent map via BFS/DFS
    2. Get all ancestors of p
    3. Walk up from q until hitting p's ancestor
    """
    if not root:
        return None

    # Build parent pointers using BFS
    parent = {root: None}
    stack = [root]

    while p not in parent or q not in parent:
        node = stack.pop()
        if node.left:
            parent[node.left] = node
            stack.append(node.left)
        if node.right:
            parent[node.right] = node
            stack.append(node.right)

    # Build ancestor set for p
    ancestors = set()
    while p:
        ancestors.add(p)
        p = parent[p]

    # Walk up from q until we hit an ancestor of p
    while q not in ancestors:
        q = parent[q]

    return q


# ============================================================================
# APPROACH 3: Iterative without Parent Pointers
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# MORE COMPLEX:
# - Simulates recursion with explicit stack
# - Tracks state for each node
# ============================================================================

def lowest_common_ancestor_iterative(
    root: Optional[TreeNode],
    p: TreeNode,
    q: TreeNode
) -> Optional[TreeNode]:
    """
    Find LCA using iterative post-order traversal.

    Uses stack to simulate recursion with state tracking.
    """
    if not root:
        return None

    stack = [root]
    parent = {root: None}

    # Find both p and q, building parent map
    while p not in parent or q not in parent:
        node = stack[-1]

        if node.left and node.left not in parent:
            parent[node.left] = node
            stack.append(node.left)
        elif node.right and node.right not in parent:
            parent[node.right] = node
            stack.append(node.right)
        else:
            stack.pop()

    # Find ancestors of p
    ancestors = set()
    current = p
    while current:
        ancestors.add(current)
        current = parent[current]

    # Find first ancestor of q that's also ancestor of p
    current = q
    while current not in ancestors:
        current = parent[current]

    return current


# ============================================================================
# HELPER: Build tree from list
# ============================================================================

def build_tree(values: List[Optional[int]]) -> Optional[TreeNode]:
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


def find_node(root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
    """Find node with given value in tree."""
    if not root:
        return None
    if root.val == val:
        return root
    return find_node(root.left, val) or find_node(root.right, val)


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4], 5, 1, 3, "Different subtrees"),
        ([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4], 5, 4, 5, "One is ancestor"),
        ([1, 2], 1, 2, 1, "Root is ancestor"),
        ([1, 2, 3], 2, 3, 1, "Siblings"),
        ([1, 2, 3, 4, 5], 4, 5, 2, "Children of same parent"),
    ]

    approaches = [
        ("Recursive DFS", lowest_common_ancestor_recursive),
        ("Parent Pointers", lowest_common_ancestor_parent),
        ("Iterative", lowest_common_ancestor_iterative),
    ]

    print("=" * 70)
    print("LOWEST COMMON ANCESTOR - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for tree_vals, p_val, q_val, expected_val, desc in test_cases:
            root = build_tree(tree_vals)
            p = find_node(root, p_val)
            q = find_node(root, q_val)
            result = func(root, p, q)
            result_val = result.val if result else None
            status = "PASS" if result_val == expected_val else "FAIL"
            if result_val != expected_val:
                all_passed = False
            print(f"  [{status}] {desc}: got {result_val}, expected {expected_val}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE INPUT EXAMPLES")
    print("=" * 70)

    # Example 1
    print("\nExample 1:")
    tree = build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4])
    p = find_node(tree, 5)
    q = find_node(tree, 1)
    print(f"  Tree: [3,5,1,6,2,0,8,null,null,7,4]")
    print(f"  p = 5, q = 1")
    result = lowest_common_ancestor_recursive(tree, p, q)
    print(f"  Output: {result.val}")
    print("  Explanation: LCA of 5 and 1 is 3")

    # Example 2
    print("\nExample 2:")
    tree = build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4])
    p = find_node(tree, 5)
    q = find_node(tree, 4)
    print(f"  Tree: [3,5,1,6,2,0,8,null,null,7,4]")
    print(f"  p = 5, q = 4")
    result = lowest_common_ancestor_recursive(tree, p, q)
    print(f"  Output: {result.val}")
    print("  Explanation: 5 is ancestor of 4, so LCA is 5")

    print("\nAll examples completed!")
