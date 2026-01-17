"""
Monotonic Array - Python Solution

Check if array is entirely non-increasing or non-decreasing.

Time Complexity: O(n)
Space Complexity: O(1)
"""

def is_monotonic(array):
    """
    Check if array is monotonic.

    Args:
        array: List of integers

    Returns:
        bool: True if array is monotonic
    """
    if len(array) <= 2:
        return True

    is_non_increasing = True
    is_non_decreasing = True

    for i in range(len(array) - 1):
        if array[i] > array[i + 1]:
            is_non_decreasing = False
        if array[i] < array[i + 1]:
            is_non_increasing = False

    return is_non_increasing or is_non_decreasing


def is_monotonic_direction(array):
    """Alternative: determine direction first, then verify."""
    if len(array) <= 2:
        return True

    # Find first non-equal pair to determine direction
    direction = 0
    for i in range(len(array) - 1):
        if array[i] != array[i + 1]:
            direction = 1 if array[i] < array[i + 1] else -1
            break

    if direction == 0:  # All equal
        return True

    # Verify direction holds throughout
    for i in range(len(array) - 1):
        if direction == 1 and array[i] > array[i + 1]:
            return False
        if direction == -1 and array[i] < array[i + 1]:
            return False

    return True


def is_monotonic_pythonic(array):
    """Pythonic one-liner approach."""
    return (all(array[i] <= array[i + 1] for i in range(len(array) - 1)) or
            all(array[i] >= array[i + 1] for i in range(len(array) - 1)))


# Test cases
if __name__ == "__main__":
    # Test 1: Non-increasing with duplicates
    arr1 = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
    result1 = is_monotonic(arr1)
    print(f"Test 1: {result1}")  # Expected: True

    # Test 2: Non-decreasing with duplicates
    arr2 = [1, 2, 3, 3, 4, 5]
    result2 = is_monotonic(arr2)
    print(f"Test 2: {result2}")  # Expected: True

    # Test 3: Not monotonic
    arr3 = [1, 2, 1]
    result3 = is_monotonic(arr3)
    print(f"Test 3: {result3}")  # Expected: False

    # Test 4: Strictly increasing
    arr4 = [1, 2, 3, 4, 5]
    result4 = is_monotonic(arr4)
    print(f"Test 4: {result4}")  # Expected: True

    # Test 5: Strictly decreasing
    arr5 = [5, 4, 3, 2, 1]
    result5 = is_monotonic(arr5)
    print(f"Test 5: {result5}")  # Expected: True

    # Test 6: All same elements
    arr6 = [7, 7, 7, 7]
    result6 = is_monotonic(arr6)
    print(f"Test 6: {result6}")  # Expected: True

    # Test 7: Empty array
    arr7 = []
    result7 = is_monotonic(arr7)
    print(f"Test 7: {result7}")  # Expected: True

    # Test 8: Single element
    arr8 = [42]
    result8 = is_monotonic(arr8)
    print(f"Test 8: {result8}")  # Expected: True

    # Test 9: Two elements
    arr9 = [1, 2]
    result9 = is_monotonic(arr9)
    print(f"Test 9: {result9}")  # Expected: True

    # Test 10: Comparison of methods
    arr10 = [1, 1, 2, 3, 4, 5, 5, 5, 6]
    print(f"\nTest 10 - Methods comparison:")
    print(f"  Standard: {is_monotonic(arr10)}")
    print(f"  Direction: {is_monotonic_direction(arr10)}")
    print(f"  Pythonic: {is_monotonic_pythonic(arr10)}")

    print("\nAll tests completed!")
