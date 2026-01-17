"""
Move Element To End - Python Solution

Move all instances of a target value to the end of the array in-place.
Uses two-pointer technique.

Time Complexity: O(n)
Space Complexity: O(1)
"""

def move_element_to_end(array, to_move):
    """
    Move all instances of to_move to the end of array in-place.

    Args:
        array: List of integers
        to_move: Value to move to the end

    Returns:
        List[int]: Modified array with target values at end
    """
    left = 0
    right = len(array) - 1

    while left < right:
        # Move right pointer until it points to non-target
        while left < right and array[right] == to_move:
            right -= 1

        # If left points to target, swap with right
        if array[left] == to_move:
            array[left], array[right] = array[right], array[left]

        left += 1

    return array


def move_element_to_end_alt(array, to_move):
    """Alternative approach using write pointer."""
    write_idx = 0

    # First pass: move non-target elements to front
    for i in range(len(array)):
        if array[i] != to_move:
            array[write_idx] = array[i]
            write_idx += 1

    # Fill remaining positions with target
    while write_idx < len(array):
        array[write_idx] = to_move
        write_idx += 1

    return array


def move_element_preserve_order(array, to_move):
    """Preserve relative order of non-target elements."""
    write_idx = 0

    # Move non-target elements forward, preserving order
    for i in range(len(array)):
        if array[i] != to_move:
            array[write_idx] = array[i]
            write_idx += 1

    # Fill rest with target
    for i in range(write_idx, len(array)):
        array[i] = to_move

    return array


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    arr1 = [2, 1, 2, 2, 2, 3, 4, 2]
    result1 = move_element_to_end(arr1, 2)
    print(f"Test 1: {result1}")
    # Verify: all 2s at end
    assert result1[-5:].count(2) == 5

    # Test 2: Target not at edges
    arr2 = [1, 2, 3, 4, 5]
    result2 = move_element_to_end(arr2, 3)
    print(f"Test 2: {result2}")

    # Test 3: All elements are target
    arr3 = [2, 2, 2, 2]
    result3 = move_element_to_end(arr3, 2)
    print(f"Test 3: {result3}")

    # Test 4: No target elements
    arr4 = [1, 3, 5, 7]
    result4 = move_element_to_end(arr4, 2)
    print(f"Test 4: {result4}")

    # Test 5: Empty array
    arr5 = []
    result5 = move_element_to_end(arr5, 5)
    print(f"Test 5: {result5}")

    # Test 6: Single element
    arr6 = [5]
    result6 = move_element_to_end(arr6, 5)
    print(f"Test 6: {result6}")

    # Test 7: Order-preserving version
    arr7 = [2, 1, 2, 3, 2, 4]
    result7 = move_element_preserve_order(arr7.copy(), 2)
    print(f"Test 7 (order preserved): {result7}")
    # Expected: [1, 3, 4, 2, 2, 2]

    print("\nAll tests completed!")
