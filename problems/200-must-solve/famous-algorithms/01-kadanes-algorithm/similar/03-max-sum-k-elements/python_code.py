"""
Maximum Sum with at Least K Elements - Python Solution

Time Complexity: O(n)
Space Complexity: O(n)
"""

from typing import List


def max_sum_at_least_k(nums: List[int], k: int) -> int:
    """
    Find maximum subarray sum with at least k elements.
    """
    n = len(nums)
    if n < k:
        return 0

    # Prefix sums
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]

    # max_prefix[i] = max sum of subarray ending before index i (using Kadane's idea)
    max_prefix = [0] * n
    current = 0
    for i in range(n - k):
        current = max(0, current + nums[i])
        max_prefix[i + 1] = current

    result = float('-inf')

    # For each ending position, consider exactly k elements + optional extension
    for i in range(k - 1, n):
        # Sum of exactly k elements ending at i
        window_sum = prefix[i + 1] - prefix[i - k + 1]
        # Optionally add best prefix ending before window
        if i - k + 1 > 0:
            window_sum += max_prefix[i - k + 1]
        result = max(result, window_sum)

    return result


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {max_sum_at_least_k([1, -2, 3, -1, 5], 2)}")  # Expected: 7
    print(f"Test 2: {max_sum_at_least_k([-1, -2, -3], 2)}")  # Expected: -3
    print(f"Test 3: {max_sum_at_least_k([1, 2, 3, 4, 5], 3)}")  # Expected: 15
    print(f"Test 4: {max_sum_at_least_k([1, 1, 1, 1, 1, 1], 2)}")  # Expected: 6
    print("\nAll tests completed!")
