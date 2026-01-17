"""
Number of Ways to Make Change - Python Solutions

Given coin denominations and a target amount, find the number of ways
to make change using unlimited coins of each denomination.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache


# ============================================================================
# APPROACH 1: Bottom-Up Dynamic Programming
# ============================================================================
# Time Complexity:  O(n * d) where d = number of denominations
# Space Complexity: O(n)
#
# WHY THIS IS BEST:
# - Counts combinations (not permutations) by iterating coins first
# - Clear and intuitive tabulation
# - Optimal time and space for this problem
# ============================================================================

def number_of_ways_to_make_change(n: int, denoms: list[int]) -> int:
    """
    Find number of ways to make target amount using given denominations.

    Key Insight: Iterate coins in outer loop to count combinations, not permutations.

    Recurrence:
        dp[amount] += dp[amount - coin] for each coin

    Visual for n=6, denoms=[1,5]:

        After coin 1: dp = [1, 1, 1, 1, 1, 1, 1]  (only ways using 1s)
        After coin 5: dp = [1, 1, 1, 1, 1, 2, 2]  (add 5 combinations)

        Answer: dp[6] = 2 (six 1s, or one 5 + one 1)
    """
    # dp[i] = number of ways to make amount i
    dp = [0] * (n + 1)
    dp[0] = 1  # One way to make 0: use no coins

    # Iterate coins first to count combinations (not permutations)
    for coin in denoms:
        for amount in range(coin, n + 1):
            dp[amount] += dp[amount - coin]

    return dp[n]


# ============================================================================
# APPROACH 2: Recursive with Memoization
# ============================================================================
# Time Complexity:  O(n * d)
# Space Complexity: O(n * d) for cache + recursion stack
#
# WHEN TO USE:
# - More intuitive top-down thinking
# - When exploring problem structure
# ============================================================================

def number_of_ways_to_make_change_memo(n: int, denoms: list[int]) -> int:
    """
    Top-down DP with memoization using lru_cache.

    More intuitive: "How many ways can I make this amount starting from coin index?"
    """
    @lru_cache(maxsize=None)
    def count(amount: int, coin_idx: int) -> int:
        # Base cases
        if amount == 0:
            return 1
        if amount < 0 or coin_idx >= len(denoms):
            return 0

        # Two choices:
        # 1. Use current coin (stay at same index - can use again)
        # 2. Skip to next coin type
        use_coin = count(amount - denoms[coin_idx], coin_idx)
        skip_coin = count(amount, coin_idx + 1)

        return use_coin + skip_coin

    return count(n, 0)


# ============================================================================
# APPROACH 3: 2D DP Table (Explicit)
# ============================================================================
# Time Complexity:  O(n * d)
# Space Complexity: O(n * d)
#
# WHEN TO USE:
# - Need to understand subproblem structure
# - Debugging and visualization
# ============================================================================

def number_of_ways_to_make_change_2d(n: int, denoms: list[int]) -> int:
    """
    Explicit 2D DP table for clearer visualization.

    dp[i][j] = number of ways to make amount j using first i coin types

    Transition:
        dp[i][j] = dp[i-1][j]           (don't use coin i)
                 + dp[i][j-coin[i]]     (use coin i at least once)
    """
    d = len(denoms)

    # dp[i][j] = ways to make amount j using first i coins
    dp = [[0] * (n + 1) for _ in range(d + 1)]

    # Base case: one way to make 0 with any coins (use none)
    for i in range(d + 1):
        dp[i][0] = 1

    # Fill table
    for i in range(1, d + 1):
        coin = denoms[i - 1]
        for j in range(1, n + 1):
            # Don't use this coin type
            dp[i][j] = dp[i - 1][j]
            # Use this coin (if possible)
            if j >= coin:
                dp[i][j] += dp[i][j - coin]

    return dp[d][n]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (n, denoms, expected, description)
        (6, [1, 5], 2, "Basic case"),
        (10, [1, 5, 10, 25], 4, "Multiple coins"),
        (0, [1, 2, 5], 1, "Zero amount"),
        (7, [2, 4], 0, "Impossible"),
        (25, [1, 5, 10, 25], 13, "Quarter"),
        (4, [1, 2, 3], 4, "Multiple ways"),
        (100, [1, 5, 10, 25], 242, "Large amount"),
    ]

    approaches = [
        ("Bottom-Up DP", number_of_ways_to_make_change),
        ("Memoization", number_of_ways_to_make_change_memo),
        ("2D DP Table", number_of_ways_to_make_change_2d),
    ]

    print("=" * 70)
    print("NUMBER OF WAYS TO MAKE CHANGE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for n, denoms, expected, desc in test_cases:
            result = func(n, denoms)
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

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    n, denoms = 6, [1, 5]
    print(f"\nInput: n = {n}, denoms = {denoms}")
    print(f"Output: {number_of_ways_to_make_change(n, denoms)}")

    # Sample Input 2
    n, denoms = 10, [1, 5, 10, 25]
    print(f"\nInput: n = {n}, denoms = {denoms}")
    print(f"Output: {number_of_ways_to_make_change(n, denoms)}")

    # Sample Input 3
    n, denoms = 0, [1, 2]
    print(f"\nInput: n = {n}, denoms = {denoms}")
    print(f"Output: {number_of_ways_to_make_change(n, denoms)}")
