"""
Subarray Sort - Python Solution

Find the smallest subarray that needs to be sorted for entire array to be sorted.

Time Complexity: O(n)
Space Complexity: O(1)
"""

def subarray_sort(array):
    """
    Find indices of smallest subarray to sort.

    Args:
        array: List of integers (at least 2 elements)

    Returns:
        List[int]: [start, end] indices or [-1, -1] if already sorted
    """
    min_out_of_order = float('inf')
    max_out_of_order = float('-inf')

    # Find all out-of-order elements and track min/max
    for i in range(len(array)):
        if is_out_of_order(i, array):
            min_out_of_order = min(min_out_of_order, array[i])
            max_out_of_order = max(max_out_of_order, array[i])

    # If no out-of-order elements, array is sorted
    if min_out_of_order == float('inf'):
        return [-1, -1]

    # Find correct position for min (left boundary)
    left = 0
    while array[left] <= min_out_of_order:
        left += 1

    # Find correct position for max (right boundary)
    right = len(array) - 1
    while array[right] >= max_out_of_order:
        right -= 1

    return [left, right]


def is_out_of_order(i, array):
    """Check if element at index i is out of order."""
    num = array[i]

    if i == 0:
        return num > array[i + 1]
    if i == len(array) - 1:
        return num < array[i - 1]

    return num > array[i + 1] or num < array[i - 1]


def subarray_sort_alt(array):
    """Alternative approach using sorting comparison."""
    sorted_array = sorted(array)

    left = -1
    right = -1

    for i in range(len(array)):
        if array[i] != sorted_array[i]:
            if left == -1:
                left = i
            right = i

    if left == -1:
        return [-1, -1]

    return [left, right]


# Test cases
if __name__ == "__main__":
    # Test 1: Complex case
    arr1 = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]
    result1 = subarray_sort(arr1)
    print(f"Test 1: {result1}")  # Expected: [3, 9]

    # Test 2: Already sorted
    arr2 = [1, 2, 3, 4, 5]
    result2 = subarray_sort(arr2)
    print(f"Test 2: {result2}")  # Expected: [-1, -1]

    # Test 3: Reversed pair
    arr3 = [2, 1]
    result3 = subarray_sort(arr3)
    print(f"Test 3: {result3}")  # Expected: [0, 1]

    # Test 4: All same elements
    arr4 = [5, 5, 5, 5]
    result4 = subarray_sort(arr4)
    print(f"Test 4: {result4}")  # Expected: [-1, -1]

    # Test 5: Completely reversed
    arr5 = [5, 4, 3, 2, 1]
    result5 = subarray_sort(arr5)
    print(f"Test 5: {result5}")  # Expected: [0, 4]

    # Test 6: One element out of place
    arr6 = [1, 2, 3, 5, 4, 6, 7]
    result6 = subarray_sort(arr6)
    print(f"Test 6: {result6}")  # Expected: [3, 4]

    # Test 7: With negative numbers
    arr7 = [-5, -3, 0, -1, 2, 4, 6]
    result7 = subarray_sort(arr7)
    print(f"Test 7: {result7}")

    # Test 8: Compare methods
    arr8 = [1, 3, 2, 2, 2]
    result8a = subarray_sort(arr8)
    result8b = subarray_sort_alt(arr8)
    print(f"\nTest 8 - Comparison:")
    print(f"  O(n) method: {result8a}")
    print(f"  Sort method: {result8b}")

    # Verification for Test 1
    print(f"\nVerification for Test 1:")
    arr_test = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]
    start, end = result1
    sub = arr_test[start:end + 1]
    print(f"  Subarray to sort: {sub}")
    arr_test[start:end + 1] = sorted(sub)
    print(f"  After sorting subarray: {arr_test}")
    print(f"  Is sorted: {arr_test == sorted(arr_test)}")

    print("\nAll tests completed!")
