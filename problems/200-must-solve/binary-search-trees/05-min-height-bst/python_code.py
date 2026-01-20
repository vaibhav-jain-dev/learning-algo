"""
Min Height BST - Python Solution

Construct a BST with minimum height from a sorted array.

Time Complexity: O(n)
Space Complexity: O(n) for tree, O(log n) for recursion stack
"""

from typing import List, Optional


class BST:
    def __init__(self, value: int):
        self.value = value
        self.left: Optional[BST] = None
        self.right: Optional[BST] = None


def min_height_bst(array: List[int]) -> Optional[BST]:
    """
    Construct BST with minimum height from sorted array.

    Args:
        array: Sorted array of distinct integers

    Returns:
        BST: Root of the minimum height BST
    """
    return construct_min_height_bst(array, 0, len(array) - 1)


def construct_min_height_bst(array: List[int], left: int, right: int) -> Optional[BST]:
    """
    Helper function using divide and conquer.

    Args:
        array: Sorted array
        left: Left boundary index
        right: Right boundary index

    Returns:
        BST node or None
    """
    # Base case: invalid range
    if left > right:
        return None

    # Find middle element - this becomes the root
    mid = (left + right) // 2
    node = BST(array[mid])

    # Recursively build left and right subtrees
    node.left = construct_min_height_bst(array, left, mid - 1)
    node.right = construct_min_height_bst(array, mid + 1, right)

    return node


def min_height_bst_iterative(array: List[int]) -> Optional[BST]:
    """
    Iterative solution using a stack.

    Simulates recursion with explicit stack.
    """
    if not array:
        return None

    # Stack contains tuples of (node, left, right, is_left_child, parent)
    mid = len(array) // 2
    root = BST(array[mid])

    # Stack: (left_idx, right_idx, parent_node, is_left)
    stack = [
        (0, mid - 1, root, True),      # Left subtree
        (mid + 1, len(array) - 1, root, False)  # Right subtree
    ]

    while stack:
        left, right, parent, is_left = stack.pop()

        if left > right:
            continue

        mid = (left + right) // 2
        node = BST(array[mid])

        if is_left:
            parent.left = node
        else:
            parent.right = node

        # Add children to stack
        stack.append((left, mid - 1, node, True))
        stack.append((mid + 1, right, node, False))

    return root


def get_tree_height(node: Optional[BST]) -> int:
    """Calculate height of BST."""
    if node is None:
        return 0
    return 1 + max(get_tree_height(node.left), get_tree_height(node.right))


def inorder_traversal(node: Optional[BST]) -> List[int]:
    """Get inorder traversal of BST."""
    if node is None:
        return []
    return inorder_traversal(node.left) + [node.value] + inorder_traversal(node.right)


def print_tree(node: Optional[BST], level: int = 0, prefix: str = "Root: ") -> None:
    """Print tree structure."""
    if node is not None:
        print(" " * (level * 4) + prefix + str(node.value))
        if node.left or node.right:
            if node.left:
                print_tree(node.left, level + 1, "L--- ")
            else:
                print(" " * ((level + 1) * 4) + "L--- None")
            if node.right:
                print_tree(node.right, level + 1, "R--- ")
            else:
                print(" " * ((level + 1) * 4) + "R--- None")


# Example usage and test cases
if __name__ == "__main__":
    # Test 1: Standard case from problem
    array1 = [1, 2, 5, 7, 10, 13, 14, 15, 22]
    result1 = min_height_bst(array1)
    print("Test 1: array = [1, 2, 5, 7, 10, 13, 14, 15, 22]")
    print_tree(result1)
    print(f"Height: {get_tree_height(result1)}")  # Expected: 4
    print(f"Inorder: {inorder_traversal(result1)}")  # Should match input
    print()

    # Test 2: Small array
    array2 = [1, 2, 3]
    result2 = min_height_bst(array2)
    print("Test 2: array = [1, 2, 3]")
    print_tree(result2)
    print(f"Height: {get_tree_height(result2)}")  # Expected: 2
    print()

    # Test 3: Single element
    array3 = [5]
    result3 = min_height_bst(array3)
    print("Test 3: array = [5]")
    print_tree(result3)
    print(f"Height: {get_tree_height(result3)}")  # Expected: 1
    print()

    # Test 4: Two elements
    array4 = [1, 2]
    result4 = min_height_bst(array4)
    print("Test 4: array = [1, 2]")
    print_tree(result4)
    print(f"Height: {get_tree_height(result4)}")  # Expected: 2
    print()

    # Test 5: Power of 2 minus 1 elements (perfect binary tree)
    array5 = [1, 2, 3, 4, 5, 6, 7]
    result5 = min_height_bst(array5)
    print("Test 5: array = [1, 2, 3, 4, 5, 6, 7] (perfect tree)")
    print_tree(result5)
    print(f"Height: {get_tree_height(result5)}")  # Expected: 3
    print()

    # Test 6: Compare recursive and iterative
    array6 = [1, 2, 5, 7, 10, 13, 14, 15, 22]
    result6a = min_height_bst(array6)
    result6b = min_height_bst_iterative(array6)
    print("Test 6: Comparing recursive vs iterative")
    print(f"Recursive inorder: {inorder_traversal(result6a)}")
    print(f"Iterative inorder: {inorder_traversal(result6b)}")
    print(f"Heights equal: {get_tree_height(result6a) == get_tree_height(result6b)}")

    print("\nAll tests completed!")
