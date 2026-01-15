"""
House Robber - Dynamic Programming Solution

Problem: Find the maximum amount of money you can rob from houses
where you cannot rob two adjacent houses.
"""

from typing import List


def rob_dp(nums: List[int]) -> int:
    """
    Solution using full DP array.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    n = len(nums)
    # dp[i] represents max money from first i houses
    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i in range(2, n):
        # Either skip current house or rob it
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])

    return dp[n - 1]


def rob_optimized(nums: List[int]) -> int:
    """
    Space-optimized solution using only two variables.

    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    prev2 = nums[0]  # dp[i-2]
    prev1 = max(nums[0], nums[1])  # dp[i-1]

    for i in range(2, len(nums)):
        current = max(prev1, prev2 + nums[i])
        prev2 = prev1
        prev1 = current

    return prev1


def rob_memo(nums: List[int]) -> int:
    """
    Recursive solution with memoization (top-down DP).

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if not nums:
        return 0

    memo = {}

    def helper(i: int) -> int:
        if i < 0:
            return 0
        if i == 0:
            return nums[0]

        if i in memo:
            return memo[i]

        # Either skip house i or rob it
        memo[i] = max(helper(i - 1), helper(i - 2) + nums[i])
        return memo[i]

    return helper(len(nums) - 1)


# Test cases
def run_tests():
    test_cases = [
        ([1, 2, 3, 1], 4),
        ([2, 7, 9, 3, 1], 12),
        ([2, 1, 1, 2], 4),
        ([1], 1),
        ([1, 2], 2),
        ([2, 1], 2),
        ([1, 2, 3, 4, 5], 9),  # 1 + 3 + 5
        ([5, 3, 4, 11, 2], 16),  # 5 + 11
        ([100, 1, 1, 100], 200),  # 100 + 100
        ([1, 3, 1, 3, 100], 103),  # 3 + 100
    ]

    print("=" * 60)
    print("HOUSE ROBBER - Test Results")
    print("=" * 60)

    for nums, expected in test_cases:
        result_dp = rob_dp(nums)
        result_opt = rob_optimized(nums)
        result_memo = rob_memo(nums)

        status = "PASS" if result_dp == expected else "FAIL"
        print(f"\nnums = {nums}")
        print(f"  Expected: {expected}")
        print(f"  DP Array: {result_dp}")
        print(f"  Optimized: {result_opt}")
        print(f"  Memoized: {result_memo}")
        print(f"  Status: {status}")

        assert result_dp == expected, f"DP failed for {nums}"
        assert result_opt == expected, f"Optimized failed for {nums}"
        assert result_memo == expected, f"Memoized failed for {nums}"

    print("\n" + "=" * 60)
    print("All tests passed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
