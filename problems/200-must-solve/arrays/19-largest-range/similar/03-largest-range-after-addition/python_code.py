"""
Largest Range After K Additions - Python Solution

Find the largest consecutive range possible after adding at most k elements.

Time Complexity: O(n log n)
Space Complexity: O(n)
"""

from typing import List


def largest_range_after_addition(nums: List[int], k: int) -> int:
    """
    Find largest consecutive range possible after adding k elements.

    Args:
        nums: List of integers
        k: Maximum number of elements to add

    Returns:
        Length of largest possible consecutive range
    """
    if not nums:
        return k  # Can add k consecutive elements

    # Sort and remove duplicates
    sorted_nums = sorted(set(nums))
    n = len(sorted_nums)

    if n == 1:
        return 1 + k  # Single element plus k additions

    max_length = 0
    left = 0

    for right in range(n):
        # Calculate how many elements need to be added to make range consecutive
        # Range from sorted_nums[left] to sorted_nums[right]
        # Total elements needed = sorted_nums[right] - sorted_nums[left] + 1
        # Elements we have = right - left + 1
        # Additions needed = Total - Have
        while left <= right:
            total_needed = sorted_nums[right] - sorted_nums[left] + 1
            have = right - left + 1
            additions_needed = total_needed - have

            if additions_needed <= k:
                break
            left += 1

        # Current range length with additions
        current_length = sorted_nums[right] - sorted_nums[left] + 1
        max_length = max(max_length, current_length)

    # Also consider extending beyond the array bounds
    # We can add k elements before the minimum or after the maximum
    # This gives us at most: len(sorted_nums) + k consecutive elements
    max_length = max(max_length, min(sorted_nums[-1] - sorted_nums[0] + 1, n + k))

    return max_length


def largest_range_after_addition_v2(nums: List[int], k: int) -> int:
    """
    Alternative implementation with clearer logic.

    Args:
        nums: List of integers
        k: Maximum number of elements to add

    Returns:
        Length of largest possible consecutive range
    """
    if not nums:
        return k

    sorted_nums = sorted(set(nums))
    n = len(sorted_nums)

    max_length = 1
    left = 0

    for right in range(n):
        # Shrink window if too many gaps
        while sorted_nums[right] - sorted_nums[left] > (right - left) + k:
            left += 1

        # The consecutive range would be from sorted_nums[left] to sorted_nums[right]
        # Plus up to k additional elements
        range_size = sorted_nums[right] - sorted_nums[left] + 1

        # But we can't exceed our available elements plus k additions
        max_possible = (right - left + 1) + k
        actual_length = min(range_size, max_possible)

        max_length = max(max_length, actual_length)

    return max_length


# Test cases
if __name__ == "__main__":
    # Test 1: Simple gap fill
    nums1 = [1, 2, 4, 5, 8]
    result1 = largest_range_after_addition(nums1, 1)
    print(f"Test 1: {result1}")
    assert result1 == 5, f"Expected 5, got {result1}"

    # Test 2: Multiple gaps
    nums2 = [1, 3, 5, 7]
    result2 = largest_range_after_addition(nums2, 1)
    print(f"Test 2: {result2}")
    assert result2 == 3, f"Expected 3, got {result2}"

    # Test 3: k = 0
    nums3 = [1, 2, 3, 5, 6]
    result3 = largest_range_after_addition(nums3, 0)
    print(f"Test 3: {result3}")
    assert result3 == 3, f"Expected 3, got {result3}"

    # Test 4: Large k
    nums4 = [1, 10, 20]
    result4 = largest_range_after_addition(nums4, 5)
    print(f"Test 4: {result4}")
    assert result4 == 6, f"Expected 6, got {result4}"  # [1,2,3,4,5,6] or [10,11,12,13,14,15]

    # Test 5: Already consecutive
    nums5 = [1, 2, 3, 4, 5]
    result5 = largest_range_after_addition(nums5, 2)
    print(f"Test 5: {result5}")
    assert result5 == 7, f"Expected 7, got {result5}"

    # Test 6: Single element
    nums6 = [5]
    result6 = largest_range_after_addition(nums6, 3)
    print(f"Test 6: {result6}")
    assert result6 == 4, f"Expected 4, got {result6}"

    # Test 7: Empty array
    nums7 = []
    result7 = largest_range_after_addition(nums7, 3)
    print(f"Test 7: {result7}")
    assert result7 == 3, f"Expected 3, got {result7}"

    print("\nAll tests passed!")
