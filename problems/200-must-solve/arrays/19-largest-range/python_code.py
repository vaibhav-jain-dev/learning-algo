"""
Largest Range - Python Solution

Find the largest range of consecutive integers in an array.

Time Complexity: O(n)
Space Complexity: O(n)
"""

def largest_range(array):
    """
    Find largest range of consecutive integers.

    Args:
        array: List of integers

    Returns:
        List[int]: [start, end] of largest range
    """
    nums = {}  # num -> visited
    for num in array:
        nums[num] = False

    best_range = []
    longest_length = 0

    for num in array:
        if nums[num]:  # Already visited as part of another range
            continue

        nums[num] = True
        current_length = 1
        left = num - 1
        right = num + 1

        # Expand left
        while left in nums:
            nums[left] = True
            current_length += 1
            left -= 1

        # Expand right
        while right in nums:
            nums[right] = True
            current_length += 1
            right += 1

        if current_length > longest_length:
            longest_length = current_length
            best_range = [left + 1, right - 1]

    return best_range


def largest_range_simple(array):
    """Alternative using set operations."""
    num_set = set(array)
    longest = 0
    best_range = []

    for num in num_set:
        # Only start counting from the beginning of a sequence
        if num - 1 not in num_set:
            current = num
            length = 1

            while current + 1 in num_set:
                current += 1
                length += 1

            if length > longest:
                longest = length
                best_range = [num, current]

    return best_range


# Test cases
if __name__ == "__main__":
    # Test 1: Complex case
    arr1 = [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]
    result1 = largest_range(arr1)
    print(f"Test 1: {result1}")  # Expected: [0, 7]

    # Test 2: Consecutive elements
    arr2 = [4, 2, 1, 3]
    result2 = largest_range(arr2)
    print(f"Test 2: {result2}")  # Expected: [1, 4]

    # Test 3: Multiple ranges
    arr3 = [8, 4, 2, 10, 3, 6, 7, 9, 1]
    result3 = largest_range(arr3)
    print(f"Test 3: {result3}")  # Expected: [6, 10]

    # Test 4: Single element
    arr4 = [5]
    result4 = largest_range(arr4)
    print(f"Test 4: {result4}")  # Expected: [5, 5]

    # Test 5: With duplicates
    arr5 = [1, 1, 2, 2, 3, 3, 4, 4]
    result5 = largest_range(arr5)
    print(f"Test 5: {result5}")  # Expected: [1, 4]

    # Test 6: Negative numbers
    arr6 = [-5, -4, -3, 0, 1, 2, 5, 6, 7, 8]
    result6 = largest_range(arr6)
    print(f"Test 6: {result6}")  # Expected: [5, 8] or [-5, -3]

    # Test 7: Two equal ranges
    arr7 = [1, 2, 3, 10, 11, 12]
    result7 = largest_range(arr7)
    print(f"Test 7: {result7}")  # Expected: [1, 3] or [10, 12]

    # Test 8: Compare methods
    arr8 = [19, 13, 15, 12, 18, 14, 17, 11]
    result8a = largest_range(arr8)
    result8b = largest_range_simple(arr8)
    print(f"\nTest 8 - Comparison:")
    print(f"  Hash map: {result8a}")
    print(f"  Set method: {result8b}")

    # Verification
    print(f"\nVerification for Test 1:")
    start, end = result1
    print(f"  Range: [{start}, {end}]")
    print(f"  Length: {end - start + 1}")
    print(f"  Elements: {list(range(start, end + 1))}")

    print("\nAll tests completed!")
