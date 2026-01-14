"""
Longest Increasing Subsequence (LIS) - Dynamic Programming Solution

Problem: Find the length of the longest strictly increasing subsequence.
"""

from typing import List
import bisect


def length_of_lis_dp(nums: List[int]) -> int:
    """
    Standard DP solution - O(n^2).

    Time Complexity: O(n^2)
    Space Complexity: O(n)
    """
    if not nums:
        return 0

    n = len(nums)
    # dp[i] = length of LIS ending at index i
    dp = [1] * n  # Each element alone is a subsequence of length 1

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)


def length_of_lis_binary_search(nums: List[int]) -> int:
    """
    Binary search solution - O(n log n).

    Maintains an array where tails[i] is the smallest tail
    of all increasing subsequences of length i+1.

    Time Complexity: O(n log n)
    Space Complexity: O(n)
    """
    if not nums:
        return 0

    tails = []

    for num in nums:
        # Find the first position where tails[pos] >= num
        pos = bisect.bisect_left(tails, num)

        if pos == len(tails):
            # num is larger than all tails, extend the longest subsequence
            tails.append(num)
        else:
            # Replace to maintain smallest possible tail
            tails[pos] = num

    return len(tails)


def length_of_lis_memo(nums: List[int]) -> int:
    """
    Top-down DP with memoization.

    Time Complexity: O(n^2)
    Space Complexity: O(n)
    """
    if not nums:
        return 0

    n = len(nums)
    memo = {}

    def helper(idx: int) -> int:
        """Returns LIS length ending at idx."""
        if idx in memo:
            return memo[idx]

        max_len = 1  # At minimum, the element itself
        for j in range(idx):
            if nums[j] < nums[idx]:
                max_len = max(max_len, helper(j) + 1)

        memo[idx] = max_len
        return max_len

    # Find LIS ending at each position and return the maximum
    return max(helper(i) for i in range(n))


def get_lis_sequence(nums: List[int]) -> List[int]:
    """
    Returns one of the actual LIS sequences (not just length).

    Time Complexity: O(n^2)
    Space Complexity: O(n)
    """
    if not nums:
        return []

    n = len(nums)
    dp = [1] * n
    parent = [-1] * n  # Track the previous element in LIS

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j

    # Find the index with maximum LIS length
    max_length = max(dp)
    max_idx = dp.index(max_length)

    # Reconstruct the sequence
    sequence = []
    idx = max_idx
    while idx != -1:
        sequence.append(nums[idx])
        idx = parent[idx]

    return sequence[::-1]


# Test cases
def run_tests():
    test_cases = [
        ([10, 9, 2, 5, 3, 7, 101, 18], 4),
        ([0, 1, 0, 3, 2, 3], 4),
        ([7, 7, 7, 7, 7, 7, 7], 1),
        ([1, 3, 6, 7, 9, 4, 10, 5, 6], 6),
        ([1], 1),
        ([1, 2], 2),
        ([2, 1], 1),
        ([1, 2, 3, 4, 5], 5),
        ([5, 4, 3, 2, 1], 1),
        ([3, 10, 2, 1, 20], 3),
    ]

    print("=" * 60)
    print("LONGEST INCREASING SUBSEQUENCE - Test Results")
    print("=" * 60)

    for nums, expected in test_cases:
        result_dp = length_of_lis_dp(nums)
        result_bs = length_of_lis_binary_search(nums)
        result_memo = length_of_lis_memo(nums)
        lis_seq = get_lis_sequence(nums)

        status = "PASS" if result_dp == expected else "FAIL"
        print(f"\nnums = {nums}")
        print(f"  Expected:      {expected}")
        print(f"  DP O(n^2):     {result_dp}")
        print(f"  Binary Search: {result_bs}")
        print(f"  Memoized:      {result_memo}")
        print(f"  One LIS:       {lis_seq}")
        print(f"  Status:        {status}")

        assert result_dp == expected, f"DP failed for {nums}"
        assert result_bs == expected, f"Binary search failed for {nums}"
        assert result_memo == expected, f"Memoized failed for {nums}"

    print("\n" + "=" * 60)
    print("All tests passed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
