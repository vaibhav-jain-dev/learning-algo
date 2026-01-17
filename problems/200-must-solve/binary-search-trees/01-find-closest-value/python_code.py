"""
Find Closest Value in BST - Python Solution

Find the value in a BST closest to a given target.

Time Complexity: O(log n) average, O(n) worst case
Space Complexity: O(1) iterative
"""

class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def find_closest_value_in_bst(tree, target):
    """
    Find closest value to target in BST.

    Args:
        tree: Root of BST
        target: Target value

    Returns:
        int: Closest value in BST to target
    """
    return find_closest_helper(tree, target, tree.value)


def find_closest_helper(tree, target, closest):
    """Helper function for recursive approach."""
    if tree is None:
        return closest

    if abs(target - closest) > abs(target - tree.value):
        closest = tree.value

    if target < tree.value:
        return find_closest_helper(tree.left, target, closest)
    elif target > tree.value:
        return find_closest_helper(tree.right, target, closest)
    else:
        return closest  # Exact match


def find_closest_value_iterative(tree, target):
    """Iterative solution with O(1) space."""
    closest = tree.value
    current = tree

    while current is not None:
        if abs(target - closest) > abs(target - current.value):
            closest = current.value

        if target < current.value:
            current = current.left
        elif target > current.value:
            current = current.right
        else:
            break  # Exact match

    return closest


def build_bst(values):
    """Helper to build BST from list of values."""
    if not values:
        return None

    root = BST(values[0])
    for val in values[1:]:
        insert(root, val)
    return root


def insert(tree, value):
    """Insert value into BST."""
    if value < tree.value:
        if tree.left is None:
            tree.left = BST(value)
        else:
            insert(tree.left, value)
    else:
        if tree.right is None:
            tree.right = BST(value)
        else:
            insert(tree.right, value)


# Test cases
if __name__ == "__main__":
    # Build test tree:
    #        10
    #       /  \
    #      5    15
    #     / \   / \
    #    2   5 13  22
    #   /       \
    #  1         14

    root = BST(10)
    root.left = BST(5)
    root.right = BST(15)
    root.left.left = BST(2)
    root.left.right = BST(5)
    root.left.left.left = BST(1)
    root.right.left = BST(13)
    root.right.right = BST(22)
    root.right.left.right = BST(14)

    # Test 1: Target between nodes
    result1 = find_closest_value_in_bst(root, 12)
    print(f"Test 1 (target=12): {result1}")  # Expected: 13

    # Test 2: Target at node
    result2 = find_closest_value_in_bst(root, 10)
    print(f"Test 2 (target=10): {result2}")  # Expected: 10

    # Test 3: Target at leaf
    result3 = find_closest_value_in_bst(root, 14)
    print(f"Test 3 (target=14): {result3}")  # Expected: 14

    # Test 4: Target less than all
    result4 = find_closest_value_in_bst(root, 0)
    print(f"Test 4 (target=0): {result4}")  # Expected: 1

    # Test 5: Target greater than all
    result5 = find_closest_value_in_bst(root, 100)
    print(f"Test 5 (target=100): {result5}")  # Expected: 22

    # Test 6: Compare iterative vs recursive
    result6a = find_closest_value_in_bst(root, 4)
    result6b = find_closest_value_iterative(root, 4)
    print(f"\nTest 6 (target=4):")
    print(f"  Recursive: {result6a}")
    print(f"  Iterative: {result6b}")
    # Expected: 5

    # Test 7: Simple BST
    simple_bst = build_bst([5, 3, 7, 2, 4, 6, 8])
    result7 = find_closest_value_in_bst(simple_bst, 4.5)
    print(f"\nTest 7 (target=4.5): {result7}")  # Expected: 4 or 5

    print("\nAll tests completed!")
