"""
Find the Duplicate Number - Python Solution

Find the duplicate number using Floyd's cycle detection.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def find_duplicate(nums: List[int]) -> int:
    """
    Find the duplicate number using Floyd's algorithm.

    Args:
        nums: Array with n+1 integers in range [1, n]

    Returns:
        The duplicate number
    """
    # Phase 1: Find intersection point
    slow = nums[0]
    fast = nums[0]

    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break

    # Phase 2: Find entrance to cycle (duplicate)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    return slow


def find_duplicate_binary_search(nums: List[int]) -> int:
    """
    Alternative: Binary search on value range.

    Args:
        nums: Array with n+1 integers in range [1, n]

    Returns:
        The duplicate number
    """
    left, right = 1, len(nums) - 1

    while left < right:
        mid = (left + right) // 2

        # Count numbers <= mid
        count = sum(1 for num in nums if num <= mid)

        # If count > mid, duplicate is in [left, mid]
        if count > mid:
            right = mid
        else:
            left = mid + 1

    return left


def find_duplicate_negative_marking(nums: List[int]) -> int:
    """
    Alternative: Negative marking (modifies array).

    Args:
        nums: Array with n+1 integers in range [1, n]

    Returns:
        The duplicate number
    """
    # Note: This modifies the array
    nums = nums.copy()  # To avoid modifying input

    for num in nums:
        idx = abs(num)
        if nums[idx] < 0:
            return idx
        nums[idx] = -nums[idx]

    return -1


def find_all_duplicates(nums: List[int]) -> List[int]:
    """
    Bonus: Find all duplicates when multiple can exist.

    Args:
        nums: Array with integers in range [1, n]

    Returns:
        List of all duplicate numbers
    """
    nums = nums.copy()
    duplicates = []

    for num in nums:
        idx = abs(num)
        if nums[idx] < 0:
            duplicates.append(idx)
        else:
            nums[idx] = -nums[idx]

    return duplicates


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    nums1 = [1, 3, 4, 2, 2]
    result1 = find_duplicate(nums1)
    print(f"Test 1: {result1}")
    assert result1 == 2, f"Expected 2, got {result1}"

    # Test 2: Another case
    nums2 = [3, 1, 3, 4, 2]
    result2 = find_duplicate(nums2)
    print(f"Test 2: {result2}")
    assert result2 == 3, f"Expected 3, got {result2}"

    # Test 3: Minimal case
    nums3 = [1, 1]
    result3 = find_duplicate(nums3)
    print(f"Test 3: {result3}")
    assert result3 == 1, f"Expected 1, got {result3}"

    # Test 4: Duplicate at end
    nums4 = [2, 2, 2, 2, 2]
    result4 = find_duplicate(nums4)
    print(f"Test 4: {result4}")
    assert result4 == 2, f"Expected 2, got {result4}"

    # Test 5: Binary search approach
    result5 = find_duplicate_binary_search([1, 3, 4, 2, 2])
    print(f"Test 5 (Binary Search): {result5}")
    assert result5 == 2

    # Test 6: Negative marking
    result6 = find_duplicate_negative_marking([1, 3, 4, 2, 2])
    print(f"Test 6 (Negative Marking): {result6}")
    assert result6 == 2

    # Test 7: Find all duplicates
    nums7 = [4, 3, 2, 7, 8, 2, 3, 1]
    result7 = find_all_duplicates(nums7)
    print(f"Test 7 (All Duplicates): {result7}")
    assert set(result7) == {2, 3}

    print("\nAll tests passed!")
