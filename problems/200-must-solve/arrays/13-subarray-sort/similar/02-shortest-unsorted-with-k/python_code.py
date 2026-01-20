"""
Shortest Unsorted Continuous Subarray - Python Solutions
"""

from typing import List


def find_unsorted_subarray(nums: List[int]) -> int:
    """
    Find length of shortest subarray that needs sorting.

    1. Find out-of-order elements
    2. Find min/max of those elements
    3. Find correct positions for min/max

    Time: O(n), Space: O(1)
    """
    n = len(nums)
    if n <= 1:
        return 0

    # Find first element from left that's out of order
    left = 0
    while left < n - 1 and nums[left] <= nums[left + 1]:
        left += 1

    if left == n - 1:  # Already sorted
        return 0

    # Find first element from right that's out of order
    right = n - 1
    while right > 0 and nums[right] >= nums[right - 1]:
        right -= 1

    # Find min and max in the unsorted region
    sub_min = min(nums[left:right + 1])
    sub_max = max(nums[left:right + 1])

    # Extend left boundary
    while left > 0 and nums[left - 1] > sub_min:
        left -= 1

    # Extend right boundary
    while right < n - 1 and nums[right + 1] < sub_max:
        right += 1

    return right - left + 1


def find_unsorted_subarray_simple(nums: List[int]) -> int:
    """Compare with sorted version. O(n log n)"""
    sorted_nums = sorted(nums)

    left = 0
    while left < len(nums) and nums[left] == sorted_nums[left]:
        left += 1

    if left == len(nums):
        return 0

    right = len(nums) - 1
    while nums[right] == sorted_nums[right]:
        right -= 1

    return right - left + 1


def run_tests():
    test_cases = [
        ([2, 6, 4, 8, 10, 9, 15], 5, "Standard case"),
        ([1, 2, 3, 4], 0, "Already sorted"),
        ([1, 3, 2, 4], 2, "Small unsorted region"),
        ([2, 1], 2, "Reverse pair"),
    ]

    print("=" * 60)
    print("SHORTEST UNSORTED SUBARRAY - TEST RESULTS")
    print("=" * 60)

    for nums, expected, desc in test_cases:
        result = find_unsorted_subarray(nums)
        status = "PASS" if result == expected else "FAIL"
        print(f"  {status}: {desc}: {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()
