"""
Kadane's Algorithm - Maximum Subarray Sum - Python Solution

Find the contiguous subarray with the largest sum.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List, Tuple


def max_subarray_sum(nums: List[int]) -> int:
    """
    Find maximum subarray sum using Kadane's Algorithm.

    Args:
        nums: List of integers (may contain negatives)

    Returns:
        Maximum sum of any contiguous subarray
    """
    if not nums:
        return 0

    current_sum = max_sum = nums[0]

    for num in nums[1:]:
        # Either start fresh from current element or extend previous subarray
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)

    return max_sum


def max_subarray_sum_with_indices(nums: List[int]) -> Tuple[int, int, int]:
    """
    Find maximum subarray sum and return the indices.

    Args:
        nums: List of integers

    Returns:
        Tuple of (max_sum, start_index, end_index)
    """
    if not nums:
        return 0, -1, -1

    max_sum = current_sum = nums[0]
    max_start = max_end = 0
    current_start = 0

    for i in range(1, len(nums)):
        if nums[i] > current_sum + nums[i]:
            current_sum = nums[i]
            current_start = i
        else:
            current_sum = current_sum + nums[i]

        if current_sum > max_sum:
            max_sum = current_sum
            max_start = current_start
            max_end = i

    return max_sum, max_start, max_end


def max_subarray_dp(nums: List[int]) -> int:
    """
    DP approach (for understanding) - stores all intermediate sums.

    Args:
        nums: List of integers

    Returns:
        Maximum sum of any contiguous subarray
    """
    if not nums:
        return 0

    n = len(nums)
    # dp[i] = maximum subarray sum ending at index i
    dp = [0] * n
    dp[0] = nums[0]

    for i in range(1, n):
        dp[i] = max(nums[i], dp[i-1] + nums[i])

    return max(dp)


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    nums1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    result1 = max_subarray_sum(nums1)
    print(f"Test 1: {result1}")
    assert result1 == 6, f"Expected 6, got {result1}"

    # Test 1b: With indices
    sum1, start1, end1 = max_subarray_sum_with_indices(nums1)
    print(f"Test 1b: Sum={sum1}, Subarray={nums1[start1:end1+1]}")
    assert sum1 == 6

    # Test 2: Single element
    nums2 = [1]
    result2 = max_subarray_sum(nums2)
    print(f"Test 2: {result2}")
    assert result2 == 1, f"Expected 1, got {result2}"

    # Test 3: All positive
    nums3 = [5, 4, -1, 7, 8]
    result3 = max_subarray_sum(nums3)
    print(f"Test 3: {result3}")
    assert result3 == 23, f"Expected 23, got {result3}"

    # Test 4: All negative
    nums4 = [-3, -2, -5, -1, -4]
    result4 = max_subarray_sum(nums4)
    print(f"Test 4: {result4}")
    assert result4 == -1, f"Expected -1, got {result4}"

    # Test 5: Mixed with larger example
    nums5 = [1, 2, 3, -2, 5]
    result5 = max_subarray_sum(nums5)
    print(f"Test 5: {result5}")
    assert result5 == 9, f"Expected 9, got {result5}"

    # Test 6: DP approach verification
    for nums in [nums1, nums2, nums3, nums4, nums5]:
        assert max_subarray_sum(nums) == max_subarray_dp(nums)
    print("Test 6: DP approach matches Kadane's")

    print("\nAll tests passed!")
