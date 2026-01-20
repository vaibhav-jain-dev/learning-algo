"""
Longest Peak - Python Solution

Find the length of the longest peak in an array.
A peak is strictly increasing then strictly decreasing with at least 3 elements.

Time Complexity: O(n)
Space Complexity: O(1)
"""

def longest_peak(array):
    """
    Find length of longest peak in array.

    Args:
        array: List of integers

    Returns:
        int: Length of longest peak (0 if no valid peak)
    """
    longest_peak_length = 0
    i = 1  # Start from index 1 (need left neighbor)

    while i < len(array) - 1:  # Stop before last (need right neighbor)
        # Check if this is a tip (peak point)
        is_peak = array[i - 1] < array[i] > array[i + 1]

        if not is_peak:
            i += 1
            continue

        # Found a tip, expand left
        left_idx = i - 2
        while left_idx >= 0 and array[left_idx] < array[left_idx + 1]:
            left_idx -= 1

        # Expand right
        right_idx = i + 2
        while right_idx < len(array) and array[right_idx] < array[right_idx - 1]:
            right_idx += 1

        # Calculate peak length
        current_peak_length = right_idx - left_idx - 1
        longest_peak_length = max(longest_peak_length, current_peak_length)

        # Move i to end of current peak to avoid recounting
        i = right_idx

    return longest_peak_length


def longest_peak_simple(array):
    """Alternative approach: check each potential tip."""
    if len(array) < 3:
        return 0

    max_length = 0

    for i in range(1, len(array) - 1):
        # Check if tip
        if array[i - 1] < array[i] > array[i + 1]:
            # Expand and count
            left = i - 1
            right = i + 1

            while left > 0 and array[left - 1] < array[left]:
                left -= 1
            while right < len(array) - 1 and array[right + 1] < array[right]:
                right += 1

            max_length = max(max_length, right - left + 1)

    return max_length


# Test cases
if __name__ == "__main__":
    # Test 1: Multiple peaks
    arr1 = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
    result1 = longest_peak(arr1)
    print(f"Test 1: {result1}")  # Expected: 6

    # Test 2: Simple peak
    arr2 = [1, 3, 2]
    result2 = longest_peak(arr2)
    print(f"Test 2: {result2}")  # Expected: 3

    # Test 3: No peak (only increasing)
    arr3 = [1, 2, 3, 4, 5]
    result3 = longest_peak(arr3)
    print(f"Test 3: {result3}")  # Expected: 0

    # Test 4: No peak (only decreasing)
    arr4 = [5, 4, 3, 2, 1]
    result4 = longest_peak(arr4)
    print(f"Test 4: {result4}")  # Expected: 0

    # Test 5: Plateau breaks peak
    arr5 = [1, 2, 3, 3, 2, 1]
    result5 = longest_peak(arr5)
    print(f"Test 5: {result5}")  # Expected: 0

    # Test 6: Multiple valid peaks
    arr6 = [1, 3, 2, 5, 4, 3, 2, 6, 1]
    result6 = longest_peak(arr6)
    print(f"Test 6: {result6}")  # Expected: 5 (peak [4,3,2,6,1] no, [2,5,4,3,2] = 5)

    # Test 7: Single peak spanning array
    arr7 = [1, 2, 3, 4, 5, 4, 3, 2, 1]
    result7 = longest_peak(arr7)
    print(f"Test 7: {result7}")  # Expected: 9

    # Test 8: Short array
    arr8 = [1, 2]
    result8 = longest_peak(arr8)
    print(f"Test 8: {result8}")  # Expected: 0

    # Test 9: Compare methods
    arr9 = [5, 4, 3, 2, 1, 2, 10, 12, 11, 13, 12]
    result9a = longest_peak(arr9)
    result9b = longest_peak_simple(arr9)
    print(f"\nTest 9 - Comparison:")
    print(f"  Optimized: {result9a}")
    print(f"  Simple: {result9b}")

    print("\nAll tests completed!")
