"""
Branch Sums - Python Solution

Calculate the sum of each branch (root to leaf path) in a binary tree.

Time Complexity: O(n)
Space Complexity: O(n) for result, O(h) for call stack
"""

class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def branch_sums(root):
    """
    Calculate branch sums from leftmost to rightmost.

    Args:
        root: Root of binary tree

    Returns:
        List[int]: List of branch sums in left-to-right order
    """
    sums = []
    calculate_branch_sums(root, 0, sums)
    return sums


def calculate_branch_sums(node, running_sum, sums):
    """Helper function to calculate branch sums recursively."""
    if node is None:
        return

    new_running_sum = running_sum + node.value

    # If leaf node, add sum to result
    if node.left is None and node.right is None:
        sums.append(new_running_sum)
        return

    # Recurse on children (left first for correct order)
    calculate_branch_sums(node.left, new_running_sum, sums)
    calculate_branch_sums(node.right, new_running_sum, sums)


def branch_sums_iterative(root):
    """Iterative approach using stack."""
    if root is None:
        return []

    sums = []
    # Stack contains (node, running_sum) tuples
    stack = [(root, 0)]

    while stack:
        node, running_sum = stack.pop()
        new_sum = running_sum + node.value

        # Leaf node
        if node.left is None and node.right is None:
            sums.append(new_sum)
        else:
            # Add right first so left is processed first (LIFO)
            if node.right:
                stack.append((node.right, new_sum))
            if node.left:
                stack.append((node.left, new_sum))

    return sums


# Test cases
if __name__ == "__main__":
    # Build test tree:
    #        1
    #      /   \
    #     2     3
    #    / \   / \
    #   4   5 6   7
    #  / \   \
    # 8   9  10

    root = BinaryTree(1)
    root.left = BinaryTree(2)
    root.right = BinaryTree(3)
    root.left.left = BinaryTree(4)
    root.left.right = BinaryTree(5)
    root.right.left = BinaryTree(6)
    root.right.right = BinaryTree(7)
    root.left.left.left = BinaryTree(8)
    root.left.left.right = BinaryTree(9)
    root.left.right.right = BinaryTree(10)

    # Test 1: Standard tree
    result1 = branch_sums(root)
    print(f"Test 1: {result1}")
    # Expected: [15, 16, 18, 10, 11]

    # Test 2: Iterative approach
    result2 = branch_sums_iterative(root)
    print(f"Test 2 (iterative): {result2}")

    # Test 3: Single node
    single = BinaryTree(5)
    result3 = branch_sums(single)
    print(f"Test 3 (single node): {result3}")
    # Expected: [5]

    # Test 4: Linear tree (all left)
    linear = BinaryTree(1)
    linear.left = BinaryTree(2)
    linear.left.left = BinaryTree(3)
    result4 = branch_sums(linear)
    print(f"Test 4 (linear left): {result4}")
    # Expected: [6]

    # Test 5: Complete small tree
    small = BinaryTree(1)
    small.left = BinaryTree(2)
    small.right = BinaryTree(3)
    result5 = branch_sums(small)
    print(f"Test 5 (small tree): {result5}")
    # Expected: [3, 4]

    # Test 6: Empty tree
    result6 = branch_sums(None)
    print(f"Test 6 (empty): {result6}")
    # Expected: []

    # Test 7: Verify sums
    print("\nVerification of Test 1:")
    print(f"  1+2+4+8 = {1+2+4+8}")
    print(f"  1+2+4+9 = {1+2+4+9}")
    print(f"  1+2+5+10 = {1+2+5+10}")
    print(f"  1+3+6 = {1+3+6}")
    print(f"  1+3+7 = {1+3+7}")

    print("\nAll tests completed!")
