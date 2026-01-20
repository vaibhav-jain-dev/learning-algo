"""
Find Kth Largest Value in BST - Python Solution

Find the kth largest value in a Binary Search Tree.

Time Complexity: O(h + k) where h is height
Space Complexity: O(h) for recursion stack
"""

from typing import Optional


class BST:
    def __init__(self, value: int):
        self.value = value
        self.left: Optional[BST] = None
        self.right: Optional[BST] = None


def find_kth_largest_value_in_bst(tree: BST, k: int) -> int:
    """
    Find kth largest value in BST using reverse inorder traversal.

    Args:
        tree: Root of BST
        k: Position of element to find (1-indexed)

    Returns:
        int: The kth largest value
    """
    # Use list to allow modification in nested function
    state = {"count": 0, "result": None}

    def reverse_inorder(node: Optional[BST]) -> None:
        """Traverse right -> node -> left (descending order)."""
        if node is None or state["result"] is not None:
            return

        # Visit right subtree first (larger values)
        reverse_inorder(node.right)

        # Process current node
        if state["result"] is None:
            state["count"] += 1
            if state["count"] == k:
                state["result"] = node.value
                return

        # Visit left subtree (smaller values)
        reverse_inorder(node.left)

    reverse_inorder(tree)
    return state["result"]


def find_kth_largest_iterative(tree: BST, k: int) -> int:
    """
    Iterative solution using stack for reverse inorder.

    Args:
        tree: Root of BST
        k: Position of element to find

    Returns:
        int: The kth largest value
    """
    stack = []
    current = tree
    count = 0

    while stack or current:
        # Go to rightmost node
        while current:
            stack.append(current)
            current = current.right

        # Process node
        current = stack.pop()
        count += 1

        if count == k:
            return current.value

        # Move to left subtree
        current = current.left

    return -1  # Should not reach if k is valid


def find_kth_largest_with_count(tree: BST, k: int) -> int:
    """
    Alternative: Use node count to determine which subtree to search.

    This is O(h) if we augment BST with subtree sizes.
    Without augmentation, we count nodes which is O(n).
    """
    def count_nodes(node: Optional[BST]) -> int:
        if node is None:
            return 0
        return 1 + count_nodes(node.left) + count_nodes(node.right)

    def find_kth(node: BST, k: int) -> int:
        # Count nodes in right subtree
        right_count = count_nodes(node.right)

        if k <= right_count:
            # kth largest is in right subtree
            return find_kth(node.right, k)
        elif k == right_count + 1:
            # Current node is kth largest
            return node.value
        else:
            # kth largest is in left subtree
            return find_kth(node.left, k - right_count - 1)

    return find_kth(tree, k)


# Example usage and test cases
if __name__ == "__main__":
    # Build test tree:
    #        15
    #       /  \
    #      5    20
    #     / \   / \
    #    2   5 17  22
    #   /
    #  1

    root = BST(15)
    root.left = BST(5)
    root.right = BST(20)
    root.left.left = BST(2)
    root.left.right = BST(5)
    root.left.left.left = BST(1)
    root.right.left = BST(17)
    root.right.right = BST(22)

    # Values in descending order: [22, 20, 17, 15, 5, 5, 2, 1]

    # Test 1: k = 3
    result1 = find_kth_largest_value_in_bst(root, 3)
    print(f"Test 1 (k=3): {result1}")  # Expected: 17

    # Test 2: k = 1 (largest)
    result2 = find_kth_largest_value_in_bst(root, 1)
    print(f"Test 2 (k=1): {result2}")  # Expected: 22

    # Test 3: k = 5 (first 5)
    result3 = find_kth_largest_value_in_bst(root, 5)
    print(f"Test 3 (k=5): {result3}")  # Expected: 5

    # Test 4: k = 6 (second 5)
    result4 = find_kth_largest_value_in_bst(root, 6)
    print(f"Test 4 (k=6): {result4}")  # Expected: 5

    # Test 5: k = 8 (smallest)
    result5 = find_kth_largest_value_in_bst(root, 8)
    print(f"Test 5 (k=8): {result5}")  # Expected: 1

    # Test 6: Single node
    single = BST(10)
    result6 = find_kth_largest_value_in_bst(single, 1)
    print(f"Test 6 (single node, k=1): {result6}")  # Expected: 10

    # Test 7: Compare methods
    print("\n--- Method Comparison ---")
    for k in range(1, 9):
        recursive = find_kth_largest_value_in_bst(root, k)
        iterative = find_kth_largest_iterative(root, k)
        with_count = find_kth_largest_with_count(root, k)
        print(f"k={k}: recursive={recursive}, iterative={iterative}, with_count={with_count}")

    print("\nAll tests completed!")
