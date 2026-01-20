"""
Coin Change II - Exact Coins - Python Solutions

Given coins, amount, and k, determine if we can make amount using exactly k coins.
Variation of coin change where we must use a specific number of coins.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache


# ============================================================================
# APPROACH 1: 2D Dynamic Programming (Bottom-Up)
# ============================================================================
# Time Complexity:  O(amount * k * len(coins))
# Space Complexity: O(amount * k)
#
# WHY THIS IS BEST:
# - Clear state representation: dp[amt][coins_used]
# - Easy to understand transitions
# - Supports reconstruction of solution
# ============================================================================

def can_make_exact_coins(amount: int, coins: list[int], k: int) -> bool:
    """
    Determine if amount can be made using exactly k coins.

    Key Insight: Need 2D DP - track both amount AND coin count.

    Visual for amount=11, coins=[1,2,5], k=3:
        dp[11][3] = dp[10][2] OR dp[9][2] OR dp[6][2]
        Since dp[10][2] = True (5+5), answer is True
        Solution: 5 + 5 + 1 = 11
    """
    # dp[i][j] = True if we can make amount i using exactly j coins
    dp = [[False] * (k + 1) for _ in range(amount + 1)]

    # Base case: 0 amount with 0 coins is achievable
    dp[0][0] = True

    # Fill the DP table
    for amt in range(1, amount + 1):
        for num_coins in range(1, k + 1):
            for coin in coins:
                if coin <= amt and dp[amt - coin][num_coins - 1]:
                    dp[amt][num_coins] = True
                    break  # Found one way, no need to continue

    return dp[amount][k]


# ============================================================================
# APPROACH 2: 2D DP with Solution Reconstruction
# ============================================================================
# Time Complexity:  O(amount * k * len(coins))
# Space Complexity: O(amount * k)
#
# WHEN TO USE:
# - When you need to return the actual coins used
# - Interview follow-up question
# ============================================================================

def make_exact_coins_with_solution(
    amount: int, coins: list[int], k: int
) -> tuple[bool, list[int]]:
    """
    Return (is_possible, coins_used).

    Tracks which coin led to each reachable state for reconstruction.
    """
    # dp[i][j] = True if we can make amount i using exactly j coins
    dp = [[False] * (k + 1) for _ in range(amount + 1)]
    # parent[i][j] = coin used to reach state (i, j)
    parent = [[(-1, -1, -1)] * (k + 1) for _ in range(amount + 1)]

    dp[0][0] = True

    for amt in range(1, amount + 1):
        for num_coins in range(1, k + 1):
            for coin in coins:
                if coin <= amt and dp[amt - coin][num_coins - 1]:
                    dp[amt][num_coins] = True
                    parent[amt][num_coins] = (amt - coin, num_coins - 1, coin)
                    break

    if not dp[amount][k]:
        return False, []

    # Reconstruct the solution
    result = []
    curr_amt, curr_coins = amount, k
    while curr_coins > 0:
        prev_amt, prev_coins, coin = parent[curr_amt][curr_coins]
        result.append(coin)
        curr_amt, curr_coins = prev_amt, prev_coins

    return True, result


# ============================================================================
# APPROACH 3: Memoization (Top-Down)
# ============================================================================
# Time Complexity:  O(amount * k * len(coins))
# Space Complexity: O(amount * k)
#
# WHEN TO USE:
# - More intuitive recursive thinking
# - When only subset of states are needed
# ============================================================================

def can_make_exact_coins_memo(amount: int, coins: list[int], k: int) -> bool:
    """
    Top-down DP with memoization.

    Recursive formulation: can we reach (remaining_amount, remaining_coins)?
    """
    @lru_cache(maxsize=None)
    def dp(remaining: int, coins_left: int) -> bool:
        # Base cases
        if remaining == 0 and coins_left == 0:
            return True
        if remaining <= 0 or coins_left <= 0:
            return False

        # Try each coin
        for coin in coins:
            if coin <= remaining and dp(remaining - coin, coins_left - 1):
                return True

        return False

    return dp(amount, k)


# ============================================================================
# APPROACH 4: Space-Optimized DP
# ============================================================================
# Time Complexity:  O(amount * k * len(coins))
# Space Complexity: O(amount)
#
# WHEN TO USE:
# - When memory is constrained
# - When only feasibility check needed (no reconstruction)
# ============================================================================

def can_make_exact_coins_optimized(amount: int, coins: list[int], k: int) -> bool:
    """
    Space-optimized using rolling arrays.

    Only keep current and previous coin-count arrays.
    """
    # prev[amt] = True if amt reachable with (j-1) coins
    prev = [False] * (amount + 1)
    prev[0] = True

    for _ in range(k):
        curr = [False] * (amount + 1)
        for amt in range(amount + 1):
            if not prev[amt]:
                continue
            for coin in coins:
                if amt + coin <= amount:
                    curr[amt + coin] = True
        prev = curr

    return prev[amount]


# ============================================================================
# APPROACH 5: Count All Solutions
# ============================================================================
# Time Complexity:  O(amount * k * len(coins))
# Space Complexity: O(amount * k)
#
# WHEN TO USE:
# - When you need to count the number of ways
# ============================================================================

def count_exact_coin_ways(amount: int, coins: list[int], k: int) -> int:
    """
    Count the number of ways to make amount with exactly k coins.

    Note: This counts permutations (order matters) since we can reuse positions.
    """
    # dp[i][j] = number of ways to make amount i using exactly j coins
    dp = [[0] * (k + 1) for _ in range(amount + 1)]
    dp[0][0] = 1

    for amt in range(1, amount + 1):
        for num_coins in range(1, k + 1):
            for coin in coins:
                if coin <= amt:
                    dp[amt][num_coins] += dp[amt - coin][num_coins - 1]

    return dp[amount][k]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (amount, coins, k, expected, description)
        (11, [1, 2, 5], 3, True, "Example 1: 5+5+1"),
        (10, [2, 5], 2, True, "Example 2: 5+5"),
        (7, [2, 4], 3, False, "Example 3: Impossible"),
        (6, [1, 2, 3], 3, True, "Example 4: Multiple solutions"),
        (0, [1, 2], 0, True, "Edge: 0 amount, 0 coins"),
        (5, [1, 2], 0, False, "Edge: positive amount, 0 coins"),
        (0, [1], 1, False, "Edge: 0 amount, 1 coin"),
        (3, [1], 3, True, "All ones: 1+1+1"),
        (4, [2], 2, True, "Single coin: 2+2"),
        (5, [2], 2, False, "Single coin: impossible"),
        (15, [1, 5, 10], 3, True, "10+5=15? No, 5+5+5=15"),
    ]

    approaches = [
        ("2D DP", can_make_exact_coins),
        ("Memoization", can_make_exact_coins_memo),
        ("Space-Optimized", can_make_exact_coins_optimized),
    ]

    print("=" * 70)
    print("COIN CHANGE II (EXACT COINS) - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for amount, coins, k, expected, desc in test_cases:
            result = func(amount, coins, k)
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

    # Show solutions with reconstruction
    print("\n" + "=" * 70)
    print("SOLUTION RECONSTRUCTION")
    print("=" * 70)

    examples = [
        (11, [1, 2, 5], 3),
        (10, [2, 5], 2),
        (6, [1, 2, 3], 3),
    ]

    for amount, coins, k in examples:
        possible, solution = make_exact_coins_with_solution(amount, coins, k)
        print(f"\namount={amount}, coins={coins}, k={k}")
        if possible:
            print(f"Solution: {' + '.join(map(str, solution))} = {sum(solution)}")
        else:
            print("No solution exists")

    # Show counting
    print("\n" + "=" * 70)
    print("COUNTING SOLUTIONS")
    print("=" * 70)

    for amount, coins, k in [(6, [1, 2, 3], 3), (4, [1, 2], 2)]:
        count = count_exact_coin_ways(amount, coins, k)
        print(f"\namount={amount}, coins={coins}, k={k}")
        print(f"Number of ways (permutations): {count}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    amount, coins, k = 11, [1, 2, 5], 3
    print(f"\nInput: amount={amount}, coins={coins}, k={k}")
    print(f"Output: {can_make_exact_coins(amount, coins, k)}")

    # Sample Input 2
    amount, coins, k = 7, [2, 4], 3
    print(f"\nInput: amount={amount}, coins={coins}, k={k}")
    print(f"Output: {can_make_exact_coins(amount, coins, k)}")
