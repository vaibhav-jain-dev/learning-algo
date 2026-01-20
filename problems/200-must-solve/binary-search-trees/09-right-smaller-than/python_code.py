"""
Right Smaller Than - Python Solution

For each element, count how many elements to its right are smaller.

Time Complexity: O(n log n) average, O(n^2) worst case
Space Complexity: O(n)
"""

from typing import List, Optional


class SpecialBST:
    """
    Augmented BST node that tracks left subtree size.

    Attributes:
        value: Node value
        left_subtree_size: Count of nodes in left subtree
        left: Left child
        right: Right child
    """
    def __init__(self, value: int):
        self.value = value
        self.left_subtree_size = 0
        self.left: Optional[SpecialBST] = None
        self.right: Optional[SpecialBST] = None


def right_smaller_than(array: List[int]) -> List[int]:
    """
    Count elements smaller than each element to its right.

    Uses augmented BST to efficiently count smaller elements
    by processing array from right to left.

    Args:
        array: Input array of integers

    Returns:
        List[int]: Count of smaller elements to the right for each index
    """
    if not array:
        return []

    result = [0] * len(array)

    # Process from right to left, building BST
    # Last element has no elements to its right
    root = SpecialBST(array[-1])
    result[-1] = 0

    for i in range(len(array) - 2, -1, -1):
        result[i] = insert_and_count(root, array[i])

    return result


def insert_and_count(root: SpecialBST, value: int) -> int:
    """
    Insert value into augmented BST and return count of smaller elements.

    As we traverse:
    - Going left: don't add to count (those values are larger)
    - Going right: add current node's left_subtree_size + 1 (node itself if smaller)

    Args:
        root: Root of BST
        value: Value to insert

    Returns:
        int: Count of elements smaller than value in the tree
    """
    smaller_count = 0
    current = root

    while True:
        if value < current.value:
            # Going left - update current node's left subtree size
            current.left_subtree_size += 1

            if current.left is None:
                current.left = SpecialBST(value)
                break
            else:
                current = current.left
        else:
            # Going right - count all smaller elements
            # (left subtree + current node if strictly smaller)
            smaller_count += current.left_subtree_size
            if value > current.value:
                smaller_count += 1  # Current node is also smaller

            if current.right is None:
                current.right = SpecialBST(value)
                break
            else:
                current = current.right

    return smaller_count


def right_smaller_than_naive(array: List[int]) -> List[int]:
    """
    Naive O(n^2) solution for comparison.

    For each element, count smaller elements to its right.
    """
    result = []
    for i, val in enumerate(array):
        count = sum(1 for j in range(i + 1, len(array)) if array[j] < val)
        result.append(count)
    return result


def right_smaller_than_merge_sort(array: List[int]) -> List[int]:
    """
    Alternative O(n log n) solution using modified merge sort.

    Track original indices and count inversions during merge.
    """
    if not array:
        return []

    n = len(array)
    result = [0] * n

    # Create array of (value, original_index)
    indexed = [(val, i) for i, val in enumerate(array)]

    def merge_sort(arr: List[tuple]) -> List[tuple]:
        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])

        return merge(left, right)

    def merge(left: List[tuple], right: List[tuple]) -> List[tuple]:
        merged = []
        i = j = 0

        while i < len(left) and j < len(right):
            if left[i][0] <= right[j][0]:
                # Left element is not greater than right element
                # Count how many right elements we've already processed
                # (they are smaller and were to the right)
                result[left[i][1]] += j
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1

        # Remaining left elements - all right elements are smaller
        while i < len(left):
            result[left[i][1]] += j
            merged.append(left[i])
            i += 1

        while j < len(right):
            merged.append(right[j])
            j += 1

        return merged

    merge_sort(indexed)
    return result


# Example usage and test cases
if __name__ == "__main__":
    # Test 1: Standard case from problem
    array1 = [8, 5, 11, -1, 3, 4, 2]
    result1 = right_smaller_than(array1)
    expected1 = [5, 4, 4, 0, 1, 1, 0]
    print(f"Test 1: {result1}")
    print(f"Expected: {expected1}")
    print(f"Match: {result1 == expected1}")
    print()

    # Test 2: Ascending order (no smaller to right)
    array2 = [1, 2, 3, 4, 5]
    result2 = right_smaller_than(array2)
    expected2 = [0, 0, 0, 0, 0]
    print(f"Test 2 (ascending): {result2}")
    print(f"Expected: {expected2}")
    print()

    # Test 3: Descending order (maximum inversions)
    array3 = [5, 4, 3, 2, 1]
    result3 = right_smaller_than(array3)
    expected3 = [4, 3, 2, 1, 0]
    print(f"Test 3 (descending): {result3}")
    print(f"Expected: {expected3}")
    print()

    # Test 4: Single element
    array4 = [10]
    result4 = right_smaller_than(array4)
    expected4 = [0]
    print(f"Test 4 (single): {result4}")
    print(f"Expected: {expected4}")
    print()

    # Test 5: Empty array
    array5 = []
    result5 = right_smaller_than(array5)
    expected5 = []
    print(f"Test 5 (empty): {result5}")
    print(f"Expected: {expected5}")
    print()

    # Test 6: With duplicates
    array6 = [5, 5, 5, 5]
    result6 = right_smaller_than(array6)
    expected6 = [0, 0, 0, 0]
    print(f"Test 6 (duplicates): {result6}")
    print(f"Expected: {expected6}")
    print()

    # Test 7: Compare all methods
    array7 = [8, 5, 11, -1, 3, 4, 2]
    print("--- Method Comparison ---")
    bst_result = right_smaller_than(array7)
    naive_result = right_smaller_than_naive(array7)
    merge_result = right_smaller_than_merge_sort(array7)
    print(f"BST method:        {bst_result}")
    print(f"Naive method:      {naive_result}")
    print(f"Merge sort method: {merge_result}")
    print(f"All match: {bst_result == naive_result == merge_result}")

    print("\nAll tests completed!")
