"""
Non-Constructible Change - Python Solutions

Find the minimum amount of change that cannot be created from given coins.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Greedy with Sorting ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n log n) - dominated by sorting
# Space Complexity: O(1) - in-place sorting (or O(n) for sorted())
#
# WHY THIS IS BEST:
# - Elegant single-pass solution after sorting
# - No DP table or recursion needed
# - Optimal time complexity for this problem
# ============================================================================

def non_constructible_change(coins: List[int]) -> int:
    """
    Find minimum change that cannot be created using greedy approach.

    Key Insight:
    If you can make all values from 1 to N, and the next coin C ≤ N+1,
    then you can make all values from 1 to (N + C).

    If the next coin C > N+1, you cannot make N+1 (there's a gap).

    How it works:
    1. Sort coins ascending (process small coins first)
    2. Track current_change = max value we can make
    3. For each coin:
       - If coin > current_change + 1 → gap found, return current_change + 1
       - Else extend range: current_change += coin
    4. Return current_change + 1 (next value after our range)

    Visual:
        coins = [1, 1, 2, 5] (sorted)

        Start: current_change = 0
        Coin 1: 1 ≤ 1? YES → current_change = 1 (can make 1-1)
        Coin 1: 1 ≤ 2? YES → current_change = 2 (can make 1-2)
        Coin 2: 2 ≤ 3? YES → current_change = 4 (can make 1-4)
        Coin 5: 5 ≤ 5? YES → current_change = 9 (can make 1-9)
        Return: 10
    """
    if not coins:
        return 1

    coins.sort()
    current_change = 0

    for coin in coins:
        # If current coin is larger than current_change + 1,
        # we cannot make current_change + 1 (there's a gap!)
        if coin > current_change + 1:
            return current_change + 1

        # We can extend our range by adding this coin
        current_change += coin

    # We can make all values from 1 to current_change
    # So the answer is current_change + 1
    return current_change + 1


# ============================================================================
# APPROACH 2: Dynamic Programming (Subset Sum)
# ============================================================================
# Time Complexity:  O(n * S) where S is sum of all coins
# Space Complexity: O(S) for the DP array
#
# WHEN TO USE:
# - When you need to track WHICH amounts are constructible
# - Educational to understand subset sum connection
#
# WHY GREEDY IS BETTER:
# - DP uses O(S) space where S can be huge
# - DP is O(n*S) vs O(n log n) for greedy
# ============================================================================

def non_constructible_change_dp(coins: List[int]) -> int:
    """
    Find minimum non-constructible change using dynamic programming.

    This is the subset sum approach - less efficient but educational.

    How it works:
    1. Create boolean array dp where dp[i] = can we make amount i?
    2. dp[0] = True (we can always make 0 with no coins)
    3. For each coin, update dp from high to low (avoid using coin twice)
    4. Find smallest positive i where dp[i] is False

    Visual:
        coins = [1, 2, 5]
        max_sum = 8

        Initial: dp = [T, F, F, F, F, F, F, F, F]  (indices 0-8)

        After coin 1: dp = [T, T, F, F, F, F, F, F, F]
        After coin 2: dp = [T, T, T, T, F, F, F, F, F]
        After coin 5: dp = [T, T, T, T, F, T, T, T, T]

        First False at index 4 → return 4
    """
    if not coins:
        return 1

    total = sum(coins)
    dp = [False] * (total + 2)
    dp[0] = True

    for coin in coins:
        # Process from high to low to avoid using same coin twice
        for amount in range(total, coin - 1, -1):
            if dp[amount - coin]:
                dp[amount] = True

    # Find smallest positive amount we cannot make
    for i in range(1, total + 2):
        if not dp[i]:
            return i

    return total + 1


# ============================================================================
# APPROACH 3: Brute Force (Educational Only)
# ============================================================================
# Time Complexity:  O(2^n) - all subsets
# Space Complexity: O(n) - recursion depth
#
# DON'T USE THIS:
# - Only for understanding why greedy is better
# - Impractical for n > 20
# ============================================================================

def non_constructible_change_brute_force(coins: List[int]) -> int:
    """
    Find minimum non-constructible change by trying all subsets.

    This is exponential and should NOT be used in practice.
    Included only to show why greedy approach is superior.
    """
    if not coins:
        return 1

    n = len(coins)
    achievable = set([0])

    # Try all 2^n subsets
    for mask in range(1, 1 << n):
        subset_sum = 0
        for i in range(n):
            if mask & (1 << i):
                subset_sum += coins[i]
        achievable.add(subset_sum)

    # Find smallest positive integer not in achievable
    result = 1
    while result in achievable:
        result += 1

    return result


# ============================================================================
# EDUCATIONAL: Detailed Walkthrough
# ============================================================================

def non_constructible_change_explained(coins: List[int]) -> int:
    """
    Same algorithm with detailed step-by-step explanation.
    """
    print(f"Input coins: {coins}")

    if not coins:
        print("Empty array → return 1")
        return 1

    coins_sorted = sorted(coins)
    print(f"After sorting: {coins_sorted}")

    current_change = 0
    print(f"\nStarting with current_change = 0")
    print("(This means we can make amounts from 1 to 0, i.e., nothing yet)\n")

    for coin in coins_sorted:
        print(f"Processing coin: {coin}")
        print(f"  Check: Is {coin} > {current_change} + 1 = {current_change + 1}?")

        if coin > current_change + 1:
            print(f"  YES! Coin {coin} is too big!")
            print(f"  We cannot make {current_change + 1}")
            print(f"  → Answer: {current_change + 1}")
            return current_change + 1

        print(f"  NO, {coin} ≤ {current_change + 1}")
        current_change += coin
        print(f"  Extend range: current_change = {current_change}")
        print(f"  We can now make all amounts from 1 to {current_change}\n")

    result = current_change + 1
    print(f"Processed all coins!")
    print(f"Can make 1 to {current_change}")
    print(f"→ Answer: {result} (first amount we cannot make)")
    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (coins, expected, description)
        ([5, 7, 1, 1, 2, 3, 22], 20, "Example from problem"),
        ([1, 1, 1, 1, 1], 6, "All ones"),
        ([1, 5, 1, 1, 1, 10, 15, 20, 100], 55, "Mixed coins"),
        ([], 1, "Empty array"),
        ([2, 3, 5], 1, "No coin of value 1"),
        ([1], 2, "Single coin"),
        ([1, 2, 4], 8, "Powers of 2"),
        ([1, 2, 3, 4, 5], 16, "Consecutive coins"),
        ([1, 1, 2, 3, 5, 8, 13], 34, "Fibonacci-like"),
    ]

    approaches = [
        ("Greedy + Sort (Recommended)", non_constructible_change),
        ("Dynamic Programming", non_constructible_change_dp),
        ("Brute Force", non_constructible_change_brute_force),
    ]

    print("=" * 70)
    print("NON-CONSTRUCTIBLE CHANGE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for coins, expected, desc in test_cases:
            result = func(coins.copy())
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: {result}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    print("\n" + "=" * 70)
    print("DETAILED WALKTHROUGH")
    print("=" * 70)
    print()
    non_constructible_change_explained([5, 7, 1, 1, 2, 3, 22])

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    ┌────────────────────────┬───────────┬──────────┬──────────────────┐
    │       Approach         │   Time    │  Space   │  Recommendation  │
    ├────────────────────────┼───────────┼──────────┼──────────────────┤
    │ 1. Greedy + Sort       │ O(n log n)│   O(1)   │  ⭐ BEST CHOICE  │
    │ 2. Dynamic Programming │  O(n * S) │   O(S)   │  ⚠️ Overkill     │
    │ 3. Brute Force         │   O(2^n)  │   O(n)   │  ✗ Don't use     │
    └────────────────────────┴───────────┴──────────┴──────────────────┘

    Where: n = number of coins, S = sum of all coin values
    """)


if __name__ == "__main__":
    run_tests()
