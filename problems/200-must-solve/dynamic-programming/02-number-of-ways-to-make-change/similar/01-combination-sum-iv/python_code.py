"""
Combination Sum IV - Python Solutions

Count permutations that add up to target (order matters).

Key difference from Coin Change: iterate amounts first, then nums.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache


# ============================================================================
# APPROACH 1: Bottom-Up Dynamic Programming
# ============================================================================
# Time Complexity:  O(target * n)
# Space Complexity: O(target)
#
# WHY THIS IS BEST:
# - Simple iterative approach
# - Clear and efficient
# - Easy to understand the counting logic
# ============================================================================

def combination_sum4(nums: list[int], target: int) -> int:
    """
    Count permutations that sum to target.

    Key Insight: Order matters! Iterate amounts first, then nums.
    This counts (1,2) and (2,1) as different combinations.

    Recurrence:
        dp[amount] = sum of dp[amount - num] for all valid nums

    Visual for nums=[1,2,3], target=4:
        dp[0] = 1
        dp[1] = dp[0] = 1
        dp[2] = dp[1] + dp[0] = 2
        dp[3] = dp[2] + dp[1] + dp[0] = 4
        dp[4] = dp[3] + dp[2] + dp[1] = 7
    """
    # dp[i] = number of permutations that sum to i
    dp = [0] * (target + 1)
    dp[0] = 1  # One way to make 0: use nothing

    # Iterate amounts first (outer loop) for permutations
    for amount in range(1, target + 1):
        # Try each number as the LAST number in the sequence
        for num in nums:
            if amount >= num:
                dp[amount] += dp[amount - num]

    return dp[target]


# ============================================================================
# APPROACH 2: Top-Down with Memoization
# ============================================================================
# Time Complexity:  O(target * n)
# Space Complexity: O(target) for memo + recursion stack
#
# WHEN TO USE:
# - More intuitive recursive thinking
# - When only some subproblems are needed
# ============================================================================

def combination_sum4_memo(nums: list[int], target: int) -> int:
    """
    Top-down DP with memoization using lru_cache.

    Think recursively: "How many ways to reach target?"
    Try each number as the last element.
    """
    @lru_cache(maxsize=None)
    def count(remaining: int) -> int:
        # Base cases
        if remaining == 0:
            return 1
        if remaining < 0:
            return 0

        # Try each number
        total = 0
        for num in nums:
            total += count(remaining - num)

        return total

    return count(target)


# ============================================================================
# APPROACH 3: With Enumeration (for small targets)
# ============================================================================
# Time Complexity:  O(result) where result is the answer
# Space Complexity: O(target) for recursion depth
#
# WHEN TO USE:
# - Need to actually generate all permutations
# - Target and result are small enough
# ============================================================================

def combination_sum4_with_enumeration(nums: list[int], target: int) -> tuple[int, list[list[int]]]:
    """
    Return count and all actual permutations.

    Useful for understanding and debugging.
    """
    results = []
    current = []

    def generate(remaining: int) -> None:
        if remaining == 0:
            results.append(current[:])
            return
        if remaining < 0:
            return

        for num in nums:
            current.append(num)
            generate(remaining - num)
            current.pop()

    generate(target)
    return len(results), results


# ============================================================================
# HELPER: Compare with Coin Change (Combinations)
# ============================================================================

def coin_change_ways(coins: list[int], target: int) -> int:
    """
    Count combinations (order doesn't matter).

    Compare: Iterate coins first for combinations.
    """
    dp = [0] * (target + 1)
    dp[0] = 1

    # Iterate coins first (outer loop) for combinations
    for coin in coins:
        for amount in range(coin, target + 1):
            dp[amount] += dp[amount - coin]

    return dp[target]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (nums, target, expected, description)
        ([1, 2, 3], 4, 7, "Example 1"),
        ([9], 3, 0, "Example 2 - impossible"),
        ([1, 2], 4, 5, "Two numbers"),
        ([1], 5, 1, "Single number"),
        ([2, 3, 5], 8, 6, "Different numbers"),
        ([1, 2, 3], 0, 1, "Target 0"),
    ]

    approaches = [
        ("Bottom-Up DP", combination_sum4),
        ("Top-Down Memo", combination_sum4_memo),
    ]

    print("=" * 70)
    print("COMBINATION SUM IV - TEST RESULTS")
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

    # Compare with Coin Change
    print("\n" + "=" * 70)
    print("COMPARISON: Permutations vs Combinations")
    print("=" * 70)
    nums = [1, 2, 3]
    target = 4
    perms = combination_sum4(nums, target)
    combs = coin_change_ways(nums, target)
    print(f"\nnums = {nums}, target = {target}")
    print(f"Combination Sum IV (permutations): {perms}")
    print(f"Coin Change Ways (combinations):   {combs}")

    # Show all permutations
    print("\n" + "=" * 70)
    print("ALL PERMUTATIONS EXAMPLE")
    print("=" * 70)
    count, all_perms = combination_sum4_with_enumeration([1, 2, 3], 4)
    print(f"\nnums = [1, 2, 3], target = 4")
    print(f"Total permutations: {count}")
    print("All sequences:")
    for i, perm in enumerate(all_perms, 1):
        print(f"  {i}: {perm}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    nums = [1, 2, 3]
    target = 4
    print(f"\nInput: nums = {nums}, target = {target}")
    print(f"Output: {combination_sum4(nums, target)}")

    # Sample Input 2
    nums = [9]
    target = 3
    print(f"\nInput: nums = {nums}, target = {target}")
    print(f"Output: {combination_sum4(nums, target)}")
