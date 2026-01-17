"""
Validate BST - Python Solution

Check if a binary tree is a valid Binary Search Tree.

Time Complexity: O(n)
Space Complexity: O(d) where d is tree depth
"""

class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def validate_bst(tree):
    """
    Validate if tree is a valid BST.

    Args:
        tree: Root of the tree

    Returns:
        bool: True if valid BST
    """
    return validate_bst_helper(tree, float('-inf'), float('inf'))


def validate_bst_helper(tree, min_value, max_value):
    """Helper with range constraints."""
    if tree is None:
        return True

    # Check if current node is within valid range
    if tree.value < min_value or tree.value >= max_value:
        return False

    # Validate left and right subtrees with updated constraints
    left_valid = validate_bst_helper(tree.left, min_value, tree.value)
    right_valid = validate_bst_helper(tree.right, tree.value, max_value)

    return left_valid and right_valid


def validate_bst_inorder(tree):
    """Alternative: Check if inorder traversal is sorted."""
    prev = [float('-inf')]  # Use list to allow modification in nested function

    def inorder(node):
        if node is None:
            return True

        # Visit left
        if not inorder(node.left):
            return False

        # Check current node
        if node.value < prev[0]:
            return False
        prev[0] = node.value

        # Visit right
        return inorder(node.right)

    return inorder(tree)


# Test cases
if __name__ == "__main__":
    # Test 1: Valid BST
    #        10
    #       /  \
    #      5    15
    #     / \   / \
    #    2   5 13  22
    #   /       \
    #  1         14

    root1 = BST(10)
    root1.left = BST(5)
    root1.right = BST(15)
    root1.left.left = BST(2)
    root1.left.right = BST(5)
    root1.left.left.left = BST(1)
    root1.right.left = BST(13)
    root1.right.right = BST(22)
    root1.right.left.right = BST(14)

    result1 = validate_bst(root1)
    print(f"Test 1 (valid BST): {result1}")  # Expected: True

    # Test 2: Invalid BST (right child = 10)
    root2 = BST(10)
    root2.left = BST(5)
    root2.right = BST(15)
    root2.right.left = BST(10)  # Invalid: should be > 10

    result2 = validate_bst(root2)
    print(f"Test 2 (invalid - right child = 10): {result2}")  # Expected: False

    # Test 3: Invalid BST (value in wrong subtree)
    root3 = BST(10)
    root3.left = BST(5)
    root3.right = BST(15)
    root3.left.right = BST(11)  # Invalid: 11 > 10 but in left subtree

    result3 = validate_bst(root3)
    print(f"Test 3 (invalid - 11 in left subtree): {result3}")  # Expected: False

    # Test 4: Single node (valid)
    root4 = BST(5)
    result4 = validate_bst(root4)
    print(f"Test 4 (single node): {result4}")  # Expected: True

    # Test 5: None (valid)
    result5 = validate_bst(None)
    print(f"Test 5 (None): {result5}")  # Expected: True

    # Test 6: Two nodes valid
    root6 = BST(10)
    root6.left = BST(5)
    result6 = validate_bst(root6)
    print(f"Test 6 (two nodes valid): {result6}")  # Expected: True

    # Test 7: Two nodes invalid
    root7 = BST(10)
    root7.left = BST(15)  # Invalid: left should be < 10
    result7 = validate_bst(root7)
    print(f"Test 7 (two nodes invalid): {result7}")  # Expected: False

    # Test 8: Compare methods
    print("\n--- Method Comparison ---")
    print(f"Range method on valid BST: {validate_bst(root1)}")
    print(f"Inorder method on valid BST: {validate_bst_inorder(root1)}")
    print(f"Range method on invalid BST: {validate_bst(root2)}")
    print(f"Inorder method on invalid BST: {validate_bst_inorder(root2)}")

    print("\nAll tests completed!")
