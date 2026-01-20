"""
Maximum Sum Circular Subarray - Python Solution

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


def max_subarray_sum_circular(nums: List[int]) -> int:
    """
    Find maximum subarray sum in a circular array.

    Two cases:
    1. Max subarray is non-circular (standard Kadane's)
    2. Max subarray wraps around (total - min subarray)
    """
    if not nums:
        return 0

    total = 0
    max_sum = nums[0]
    min_sum = nums[0]
    current_max = 0
    current_min = 0

    for num in nums:
        # Standard Kadane's for max
        current_max = max(num, current_max + num)
        max_sum = max(max_sum, current_max)

        # Modified Kadane's for min
        current_min = min(num, current_min + num)
        min_sum = min(min_sum, current_min)

        total += num

    # If all elements are negative, max_sum is the answer
    # (circular case would give 0 which is invalid)
    if max_sum < 0:
        return max_sum

    return max(max_sum, total - min_sum)


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {max_subarray_sum_circular([1, -2, 3, -2])}")  # Expected: 3
    print(f"Test 2: {max_subarray_sum_circular([5, -3, 5])}")  # Expected: 10
    print(f"Test 3: {max_subarray_sum_circular([-3, -2, -1])}")  # Expected: -1
    print(f"Test 4: {max_subarray_sum_circular([3, -1, 2, -1])}")  # Expected: 4
    print("\nAll tests completed!")
