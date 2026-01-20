"""
Minimum Coins to Add - Python Solutions

Given coins and a target, find minimum coins to add to make all values 1 to target.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Greedy with Gap Analysis ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n log n) - sorting dominates
# Space Complexity: O(1) - in-place sorting
#
# WHY THIS IS BEST:
# - Greedy approach is provably optimal
# - Uses same insight as non-constructible change
# ============================================================================

def min_coins_to_add(coins: List[int], target: int) -> int:
    """
    Find minimum coins needed to construct all values up to target.

    Key Insight: If we can make [1, reachable], and next coin > reachable+1,
    we need to add (reachable+1) to extend our range to [1, 2*reachable+1].

    Visual for coins=[1,3], target=6:

        Initial: coins=[1,3], reachable=0, coins_to_add=0

        Process 1: 1 <= reachable+1? Yes → reachable=1
        Process 3: 3 <= reachable+1? No (3>2) → Add 2, reachable=3
        Process 3: 3 <= reachable+1? Yes → reachable=6

        reachable(6) >= target(6)? Yes → Done!
        Answer: 1 coin added
    """
    coins.sort()

    reachable = 0  # Can construct [1, reachable]
    coins_added = 0
    i = 0

    while reachable < target:
        if i < len(coins) and coins[i] <= reachable + 1:
            # Coin extends our range
            reachable += coins[i]
            i += 1
        else:
            # Gap exists - add coin of value reachable+1
            coins_added += 1
            reachable = 2 * reachable + 1  # reachable + (reachable+1)

    return coins_added


# ============================================================================
# APPROACH 2: Pythonic with enumerate
# ============================================================================

def min_coins_to_add_pythonic(coins: List[int], target: int) -> int:
    """Pythonic version using cleaner iteration."""
    sorted_coins = sorted(coins)

    reachable = 0
    coins_added = 0
    coin_iter = iter(sorted_coins)
    current_coin = next(coin_iter, None)

    while reachable < target:
        if current_coin is not None and current_coin <= reachable + 1:
            reachable += current_coin
            current_coin = next(coin_iter, None)
        else:
            coins_added += 1
            reachable = 2 * reachable + 1

    return coins_added


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    test_cases = [
        ([1, 3], 6, 1, "Add 2 to reach 6"),
        ([1, 5, 10], 20, 2, "Multiple gaps"),
        ([1, 2, 5], 10, 0, "No coins needed"),
        ([], 7, 3, "Empty coins: add 1,2,4"),
        ([1], 1, 0, "Already sufficient"),
        ([2, 4, 8], 15, 3, "Missing 1"),
        ([1, 1, 1], 3, 0, "Duplicates"),
    ]

    print("=" * 70)
    print("MINIMUM COINS TO ADD - TEST RESULTS")
    print("=" * 70)

    for coins, target, expected, desc in test_cases:
        result = min_coins_to_add(coins.copy(), target)
        status = "✓" if result == expected else "✗"
        print(f"{status} {desc}: coins={coins}, target={target} → {result} (expected {expected})")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    coins = [1, 3]
    target = 6
    print(f"\nInput: coins = {coins}, target = {target}")
    print(f"Output: {min_coins_to_add(coins.copy(), target)}")

    # Sample Input 2
    coins = [1, 5, 10]
    target = 20
    print(f"\nInput: coins = {coins}, target = {target}")
    print(f"Output: {min_coins_to_add(coins.copy(), target)}")
