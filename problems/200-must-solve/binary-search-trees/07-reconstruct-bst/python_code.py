"""
Reconstruct BST - Python Solution

Reconstruct a BST from its preorder traversal.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
"""

from typing import List, Optional


class BST:
    def __init__(self, value: int):
        self.value = value
        self.left: Optional[BST] = None
        self.right: Optional[BST] = None


def reconstruct_bst(preorder_values: List[int]) -> Optional[BST]:
    """
    Reconstruct BST from preorder traversal using bounds.

    Args:
        preorder_values: Preorder traversal of BST

    Returns:
        BST: Root of reconstructed BST
    """
    if not preorder_values:
        return None

    # Index pointer to track current position in preorder
    idx = [0]

    def build_tree(min_val: float, max_val: float) -> Optional[BST]:
        """Build tree recursively with bounds."""
        # Base case: all elements processed
        if idx[0] >= len(preorder_values):
            return None

        current_val = preorder_values[idx[0]]

        # If current value is out of bounds, it belongs to different subtree
        if current_val < min_val or current_val >= max_val:
            return None

        # Create node and advance index
        node = BST(current_val)
        idx[0] += 1

        # Build left subtree (values must be < current)
        node.left = build_tree(min_val, current_val)

        # Build right subtree (values must be >= current)
        node.right = build_tree(current_val, max_val)

        return node

    return build_tree(float('-inf'), float('inf'))


def reconstruct_bst_naive(preorder_values: List[int]) -> Optional[BST]:
    """
    Naive approach: Find split point for each subtree.

    Time Complexity: O(n^2) in worst case
    """
    if not preorder_values:
        return None

    root_val = preorder_values[0]
    root = BST(root_val)

    # Find first element greater than root (start of right subtree)
    right_start = len(preorder_values)
    for i, val in enumerate(preorder_values[1:], 1):
        if val >= root_val:
            right_start = i
            break

    # Recursively build subtrees
    root.left = reconstruct_bst_naive(preorder_values[1:right_start])
    root.right = reconstruct_bst_naive(preorder_values[right_start:])

    return root


def preorder_traversal(node: Optional[BST]) -> List[int]:
    """Get preorder traversal of BST."""
    if node is None:
        return []
    return [node.value] + preorder_traversal(node.left) + preorder_traversal(node.right)


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
    preorder1 = [10, 4, 2, 1, 5, 17, 19, 18]
    result1 = reconstruct_bst(preorder1)
    print("Test 1: preorder = [10, 4, 2, 1, 5, 17, 19, 18]")
    print_tree(result1)
    print(f"Reconstructed preorder: {preorder_traversal(result1)}")
    print(f"Inorder (should be sorted): {inorder_traversal(result1)}")
    print()

    # Test 2: Balanced tree
    preorder2 = [5, 3, 1, 4, 7, 6, 8]
    result2 = reconstruct_bst(preorder2)
    print("Test 2: preorder = [5, 3, 1, 4, 7, 6, 8]")
    print_tree(result2)
    print(f"Reconstructed preorder: {preorder_traversal(result2)}")
    print()

    # Test 3: Single node
    preorder3 = [10]
    result3 = reconstruct_bst(preorder3)
    print("Test 3: preorder = [10]")
    print_tree(result3)
    print()

    # Test 4: Left skewed tree
    preorder4 = [5, 4, 3, 2, 1]
    result4 = reconstruct_bst(preorder4)
    print("Test 4: preorder = [5, 4, 3, 2, 1] (left skewed)")
    print_tree(result4)
    print()

    # Test 5: Right skewed tree
    preorder5 = [1, 2, 3, 4, 5]
    result5 = reconstruct_bst(preorder5)
    print("Test 5: preorder = [1, 2, 3, 4, 5] (right skewed)")
    print_tree(result5)
    print()

    # Test 6: Two nodes
    preorder6 = [2, 1]
    result6 = reconstruct_bst(preorder6)
    print("Test 6: preorder = [2, 1]")
    print_tree(result6)
    print()

    # Test 7: Compare optimal vs naive
    preorder7 = [10, 4, 2, 1, 5, 17, 19, 18]
    result7a = reconstruct_bst(preorder7)
    result7b = reconstruct_bst_naive(preorder7)
    print("Test 7: Comparing optimal vs naive")
    print(f"Optimal preorder:  {preorder_traversal(result7a)}")
    print(f"Naive preorder:    {preorder_traversal(result7b)}")
    print(f"Match: {preorder_traversal(result7a) == preorder_traversal(result7b)}")

    print("\nAll tests completed!")
