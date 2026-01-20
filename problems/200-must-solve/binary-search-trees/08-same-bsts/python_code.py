"""
Same BSTs - Python Solution

Determine if two arrays produce the same BST without building the trees.

Time Complexity: O(n^2)
Space Complexity: O(n^2) for subarray approach, O(d) for index approach
"""

from typing import List, Optional


def same_bsts(array_one: List[int], array_two: List[int]) -> bool:
    """
    Check if two arrays produce the same BST without building trees.

    Args:
        array_one: First array of integers
        array_two: Second array of integers

    Returns:
        bool: True if both arrays produce same BST
    """
    # Base case: both empty means same BST
    if len(array_one) == 0 and len(array_two) == 0:
        return True

    # Arrays must have same length
    if len(array_one) != len(array_two):
        return False

    # Root values must match (first element becomes root)
    if array_one[0] != array_two[0]:
        return False

    # Partition arrays into left (smaller) and right (greater or equal) subtrees
    root = array_one[0]

    left_one = [x for x in array_one[1:] if x < root]
    right_one = [x for x in array_one[1:] if x >= root]

    left_two = [x for x in array_two[1:] if x < root]
    right_two = [x for x in array_two[1:] if x >= root]

    # Recursively check both subtrees
    return same_bsts(left_one, left_two) and same_bsts(right_one, right_two)


def same_bsts_optimized(array_one: List[int], array_two: List[int]) -> bool:
    """
    Optimized version using indices instead of creating new arrays.

    Space Complexity: O(d) where d is depth of BST
    """
    return are_same_bsts(
        array_one, array_two,
        0, 0,
        float('-inf'), float('inf')
    )


def are_same_bsts(
    arr1: List[int], arr2: List[int],
    root_idx1: int, root_idx2: int,
    min_val: float, max_val: float
) -> bool:
    """
    Helper function using indices and bounds.

    Args:
        arr1, arr2: Input arrays
        root_idx1, root_idx2: Starting indices to search from
        min_val, max_val: Valid range for values in current subtree
    """
    # Find first valid index in each array (value within bounds)
    idx1 = get_first_valid_idx(arr1, root_idx1, min_val, max_val)
    idx2 = get_first_valid_idx(arr2, root_idx2, min_val, max_val)

    # Both found nothing - same empty subtree
    if idx1 == -1 and idx2 == -1:
        return True

    # Only one found something - different structure
    if idx1 == -1 or idx2 == -1:
        return False

    # Root values must match
    if arr1[idx1] != arr2[idx2]:
        return False

    root_val = arr1[idx1]

    # Recursively check left subtree (values < root)
    left_same = are_same_bsts(
        arr1, arr2,
        idx1 + 1, idx2 + 1,
        min_val, root_val
    )

    # Recursively check right subtree (values >= root)
    right_same = are_same_bsts(
        arr1, arr2,
        idx1 + 1, idx2 + 1,
        root_val, max_val
    )

    return left_same and right_same


def get_first_valid_idx(
    arr: List[int], start_idx: int,
    min_val: float, max_val: float
) -> int:
    """Find first index with value in valid range."""
    for i in range(start_idx, len(arr)):
        if min_val <= arr[i] < max_val:
            return i
    return -1


class BST:
    """BST class for verification purposes."""
    def __init__(self, value: int):
        self.value = value
        self.left: Optional[BST] = None
        self.right: Optional[BST] = None


def build_bst_from_array(arr: List[int]) -> Optional[BST]:
    """Build BST by inserting elements in order."""
    if not arr:
        return None

    root = BST(arr[0])
    for val in arr[1:]:
        insert_into_bst(root, val)
    return root


def insert_into_bst(node: BST, value: int) -> None:
    """Insert value into BST."""
    if value < node.value:
        if node.left is None:
            node.left = BST(value)
        else:
            insert_into_bst(node.left, value)
    else:
        if node.right is None:
            node.right = BST(value)
        else:
            insert_into_bst(node.right, value)


def preorder_traversal(node: Optional[BST]) -> List[int]:
    """Get preorder traversal for comparison."""
    if node is None:
        return []
    return [node.value] + preorder_traversal(node.left) + preorder_traversal(node.right)


# Example usage and test cases
if __name__ == "__main__":
    # Test 1: Same BST
    array1a = [10, 15, 8, 12, 94, 81, 5, 2, 11]
    array1b = [10, 8, 5, 15, 2, 12, 11, 94, 81]
    result1 = same_bsts(array1a, array1b)
    print(f"Test 1: {result1}")  # Expected: True

    # Verify by building actual BSTs
    bst1a = build_bst_from_array(array1a)
    bst1b = build_bst_from_array(array1b)
    print(f"  Verification: {preorder_traversal(bst1a) == preorder_traversal(bst1b)}")

    # Test 2: Different BST
    array2a = [10, 15, 8, 12, 94, 81, 5, 2, 11]
    array2b = [10, 8, 5, 15, 2, 12, 94, 81, 11]
    result2 = same_bsts(array2a, array2b)
    print(f"Test 2: {result2}")  # Expected: False

    # Test 3: Single element
    array3a = [1]
    array3b = [1]
    result3 = same_bsts(array3a, array3b)
    print(f"Test 3 (single element): {result3}")  # Expected: True

    # Test 4: Two elements, same order
    array4a = [5, 3]
    array4b = [5, 3]
    result4 = same_bsts(array4a, array4b)
    print(f"Test 4: {result4}")  # Expected: True

    # Test 5: Two elements, different sides
    array5a = [5, 3]
    array5b = [5, 7]
    result5 = same_bsts(array5a, array5b)
    print(f"Test 5: {result5}")  # Expected: False

    # Test 6: Same elements, different structure
    array6a = [5, 3, 7]
    array6b = [5, 7, 3]
    result6 = same_bsts(array6a, array6b)
    print(f"Test 6: {result6}")  # Expected: True (both children exist)

    # Test 7: Larger example
    array7a = [50, 76, 81, 23, 35, 29, 89, 38, 12]
    array7b = [50, 23, 76, 12, 35, 81, 29, 89, 38]
    result7 = same_bsts(array7a, array7b)
    print(f"Test 7: {result7}")  # Expected: True

    # Verify with actual BST construction
    bst7a = build_bst_from_array(array7a)
    bst7b = build_bst_from_array(array7b)
    print(f"  Verification: {preorder_traversal(bst7a) == preorder_traversal(bst7b)}")

    # Test 8: Compare methods
    print("\n--- Method Comparison ---")
    arrays = [
        ([10, 15, 8, 12, 94, 81, 5, 2, 11], [10, 8, 5, 15, 2, 12, 11, 94, 81]),
        ([10, 15, 8, 12, 94, 81, 5, 2, 11], [10, 8, 5, 15, 2, 12, 94, 81, 11]),
        ([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]),
    ]
    for i, (a, b) in enumerate(arrays, 1):
        basic = same_bsts(a, b)
        optimized = same_bsts_optimized(a, b)
        print(f"Test {i}: basic={basic}, optimized={optimized}, match={basic == optimized}")

    print("\nAll tests completed!")
