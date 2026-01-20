"""
Count Distinct Consecutive Ranges - Python Solution

Count the number of distinct consecutive ranges in an array.

Time Complexity: O(n log n)
Space Complexity: O(n)
"""

from typing import List, Tuple


def count_distinct_ranges(nums: List[int]) -> int:
    """
    Count the number of distinct consecutive ranges.

    Args:
        nums: List of distinct integers

    Returns:
        Number of distinct consecutive ranges
    """
    if not nums:
        return 0

    sorted_nums = sorted(set(nums))  # Remove duplicates and sort
    range_count = 1

    for i in range(1, len(sorted_nums)):
        if sorted_nums[i] != sorted_nums[i-1] + 1:
            range_count += 1

    return range_count


def get_all_ranges(nums: List[int]) -> List[Tuple[int, int]]:
    """
    Get all consecutive ranges as (start, end) tuples.

    Args:
        nums: List of distinct integers

    Returns:
        List of (start, end) tuples representing each range
    """
    if not nums:
        return []

    sorted_nums = sorted(set(nums))
    ranges = []
    range_start = sorted_nums[0]

    for i in range(1, len(sorted_nums)):
        if sorted_nums[i] != sorted_nums[i-1] + 1:
            ranges.append((range_start, sorted_nums[i-1]))
            range_start = sorted_nums[i]

    # Add the last range
    ranges.append((range_start, sorted_nums[-1]))

    return ranges


def count_ranges_with_hash_set(nums: List[int]) -> int:
    """
    Count ranges using hash set (alternative approach).

    Args:
        nums: List of integers

    Returns:
        Number of distinct consecutive ranges
    """
    if not nums:
        return 0

    num_set = set(nums)
    range_count = 0

    for num in num_set:
        # Count only range starts (where num - 1 is not in set)
        if num - 1 not in num_set:
            range_count += 1

    return range_count


# Test cases
if __name__ == "__main__":
    # Test 1: Multiple ranges
    nums1 = [1, 2, 3, 5, 6, 8, 10, 11, 12]
    result1 = count_distinct_ranges(nums1)
    print(f"Test 1: {result1}")
    assert result1 == 4, f"Expected 4, got {result1}"

    # Test 2: All separate
    nums2 = [1, 3, 5, 7]
    result2 = count_distinct_ranges(nums2)
    print(f"Test 2: {result2}")
    assert result2 == 4, f"Expected 4, got {result2}"

    # Test 3: Single range
    nums3 = [1, 2, 3, 4, 5]
    result3 = count_distinct_ranges(nums3)
    print(f"Test 3: {result3}")
    assert result3 == 1, f"Expected 1, got {result3}"

    # Test 4: Get actual ranges
    ranges4 = get_all_ranges([1, 2, 3, 5, 6, 8, 10, 11, 12])
    print(f"Test 4: {ranges4}")
    assert ranges4 == [(1, 3), (5, 6), (8, 8), (10, 12)]

    # Test 5: Single element
    nums5 = [42]
    result5 = count_distinct_ranges(nums5)
    print(f"Test 5: {result5}")
    assert result5 == 1, f"Expected 1, got {result5}"

    # Test 6: Hash set approach
    result6 = count_ranges_with_hash_set([1, 2, 3, 5, 6, 8, 10, 11, 12])
    print(f"Test 6: {result6}")
    assert result6 == 4, f"Expected 4, got {result6}"

    # Test 7: Negative numbers
    nums7 = [-5, -4, -3, 0, 1, 2, 5]
    result7 = count_distinct_ranges(nums7)
    print(f"Test 7: {result7}")
    assert result7 == 3, f"Expected 3, got {result7}"

    print("\nAll tests passed!")
