"""
Climbing Stairs - Dynamic Programming Solution

Problem: Count the number of distinct ways to climb n stairs,
where you can take either 1 or 2 steps at a time.
"""

from typing import List


def climb_stairs_dp(n: int) -> int:
    """
    Solution using full DP array.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if n <= 2:
        return n

    # dp[i] represents the number of ways to reach step i
    dp = [0] * (n + 1)
    dp[1] = 1  # One way to reach step 1
    dp[2] = 2  # Two ways to reach step 2: (1+1) or (2)

    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


def climb_stairs_optimized(n: int) -> int:
    """
    Space-optimized solution using only two variables.

    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if n <= 2:
        return n

    prev2 = 1  # Ways to reach step 1
    prev1 = 2  # Ways to reach step 2

    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1


def climb_stairs_recursive_memo(n: int) -> int:
    """
    Recursive solution with memoization (top-down DP).

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    memo = {}

    def helper(step: int) -> int:
        if step <= 2:
            return step

        if step in memo:
            return memo[step]

        memo[step] = helper(step - 1) + helper(step - 2)
        return memo[step]

    return helper(n)


# Test cases
def run_tests():
    test_cases = [
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 5),
        (5, 8),
        (10, 89),
        (20, 10946),
        (45, 1836311903),
    ]

    print("=" * 60)
    print("CLIMBING STAIRS - Test Results")
    print("=" * 60)

    for n, expected in test_cases:
        result_dp = climb_stairs_dp(n)
        result_opt = climb_stairs_optimized(n)
        result_memo = climb_stairs_recursive_memo(n)

        status = "PASS" if result_dp == expected else "FAIL"
        print(f"\nn = {n}")
        print(f"  Expected: {expected}")
        print(f"  DP Array: {result_dp}")
        print(f"  Optimized: {result_opt}")
        print(f"  Memoized: {result_memo}")
        print(f"  Status: {status}")

        assert result_dp == expected, f"DP failed for n={n}"
        assert result_opt == expected, f"Optimized failed for n={n}"
        assert result_memo == expected, f"Memoized failed for n={n}"

    print("\n" + "=" * 60)
    print("All tests passed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
