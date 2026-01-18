"""
Target Sum - Python Solutions

Assign + or - to each number to reach target sum.
Count the number of ways to do this.

Key insight: Transform to subset sum problem.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache


# ============================================================================
# APPROACH 1: Subset Sum Transformation (Optimal)
# ============================================================================
# Time Complexity:  O(n * sum)
# Space Complexity: O(sum)
#
# WHY THIS IS BEST:
# - Transforms problem to simpler subset sum counting
# - Optimal space complexity
# - Elegant mathematical insight
# ============================================================================

def find_target_sum_ways(nums: list[int], target: int) -> int:
    """
    Count ways to assign +/- to reach target.

    Mathematical Transformation:
        Let P = sum of positives, N = sum of negatives
        P + N = total_sum
        P - N = target
        Therefore: P = (total_sum + target) / 2

    Problem becomes: count subsets summing to P
    """
    total_sum = sum(nums)

    # Edge cases
    if (total_sum + target) % 2 != 0:
        return 0  # Can't have fractional sum
    if target > total_sum or target < -total_sum:
        return 0  # Impossible to reach

    # Target sum for positive subset
    subset_sum = (total_sum + target) // 2
    if subset_sum < 0:
        return 0

    # Count subsets summing to subset_sum
    # dp[s] = number of ways to get sum s
    dp = [0] * (subset_sum + 1)
    dp[0] = 1  # One way to get sum 0: take nothing

    for num in nums:
        # Iterate backwards to avoid using same number twice
        for s in range(subset_sum, num - 1, -1):
            dp[s] += dp[s - num]

    return dp[subset_sum]


# ============================================================================
# APPROACH 2: 2D DP with Offset (Clearer)
# ============================================================================
# Time Complexity:  O(n * sum)
# Space Complexity: O(n * sum)
#
# WHEN TO USE:
# - More intuitive understanding
# - Easier to debug
# ============================================================================

def find_target_sum_ways_2d(nums: list[int], target: int) -> int:
    """
    Use explicit 2D DP with sum offset for negative values.

    dp[i][s+offset] = ways to reach sum s using first i numbers
    """
    total_sum = sum(nums)

    if target > total_sum or target < -total_sum:
        return 0

    n = len(nums)
    offset = total_sum  # Shift to handle negative indices

    # dp[i][s+offset] = ways to reach sum s using first i numbers
    dp = [[0] * (2 * total_sum + 1) for _ in range(n + 1)]
    dp[0][offset] = 1  # One way to have sum 0 with no numbers

    for i in range(n):
        for s in range(-total_sum, total_sum + 1):
            if dp[i][s + offset] > 0:
                # Add current number (positive)
                dp[i + 1][s + nums[i] + offset] += dp[i][s + offset]
                # Subtract current number (negative)
                dp[i + 1][s - nums[i] + offset] += dp[i][s + offset]

    return dp[n][target + offset]


# ============================================================================
# APPROACH 3: Recursive with Memoization
# ============================================================================
# Time Complexity:  O(n * sum)
# Space Complexity: O(n * sum) for memo + recursion stack
#
# WHEN TO USE:
# - Most intuitive top-down thinking
# - Exploring all +/- choices explicitly
# ============================================================================

def find_target_sum_ways_memo(nums: list[int], target: int) -> int:
    """
    Top-down DP with memoization using lru_cache.

    Explore all +/- choices at each position.
    """
    @lru_cache(maxsize=None)
    def count(idx: int, current_sum: int) -> int:
        # Base case: processed all numbers
        if idx == len(nums):
            return 1 if current_sum == target else 0

        # Two choices: add or subtract current number
        return (count(idx + 1, current_sum + nums[idx]) +
                count(idx + 1, current_sum - nums[idx]))

    return count(0, 0)


# ============================================================================
# BONUS: Enumerate all expressions
# ============================================================================

def find_target_sum_ways_with_expressions(nums: list[int], target: int) -> tuple[int, list[str]]:
    """
    Return all valid expressions that evaluate to target.

    Useful for understanding and debugging.
    """
    results = []
    current = []

    def generate(idx: int, current_sum: int) -> None:
        if idx == len(nums):
            if current_sum == target:
                results.append("".join(current))
            return

        # Try positive
        sign = "+" if idx > 0 else ""
        current.append(f"{sign}{nums[idx]}")
        generate(idx + 1, current_sum + nums[idx])
        current.pop()

        # Try negative
        current.append(f"-{nums[idx]}")
        generate(idx + 1, current_sum - nums[idx])
        current.pop()

    generate(0, 0)
    return len(results), results


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (nums, target, expected, description)
        ([1, 1, 1, 1, 1], 3, 5, "Example 1"),
        ([1], 1, 1, "Example 2"),
        ([1], 2, 0, "Impossible"),
        ([0, 0, 0, 0, 0, 0, 0, 0, 1], 1, 256, "Many zeros"),
        ([1, 2, 1], 0, 2, "Target zero"),
        ([2, 3, 5], 0, 0, "No solution"),
    ]

    approaches = [
        ("Subset Sum", find_target_sum_ways),
        ("2D DP", find_target_sum_ways_2d),
        ("Memoization", find_target_sum_ways_memo),
    ]

    print("=" * 70)
    print("TARGET SUM - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for nums, target, expected, desc in test_cases:
            result = func(nums, target)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    # Show expressions
    print("\n" + "=" * 70)
    print("ALL EXPRESSIONS EXAMPLE")
    print("=" * 70)
    nums = [1, 1, 1, 1, 1]
    target = 3
    count, expressions = find_target_sum_ways_with_expressions(nums, target)
    print(f"\nnums = {nums}, target = {target}")
    print(f"Total ways: {count}")
    print("All expressions:")
    for i, expr in enumerate(expressions, 1):
        print(f"  {i}: {expr} = {target}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    nums = [1, 1, 1, 1, 1]
    target = 3
    print(f"\nInput: nums = {nums}, target = {target}")
    print(f"Output: {find_target_sum_ways(nums, target)}")

    # Sample Input 2
    nums = [1]
    target = 1
    print(f"\nInput: nums = {nums}, target = {target}")
    print(f"Output: {find_target_sum_ways(nums, target)}")
