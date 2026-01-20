"""
All Non-Constructible Values - Python Solutions

Find all values up to a limit that cannot be constructed from given coins.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List, Tuple


# ============================================================================
# APPROACH 1: Greedy Range Building ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n log n + limit)
# Space Complexity: O(k) where k is number of gaps
# ============================================================================

def all_non_constructible(coins: List[int], limit: int) -> List[int]:
    """Find all values <= limit that can't be made."""
    sorted_coins = sorted(coins)

    non_constructible = []
    reachable = 0
    i = 0

    for target in range(1, limit + 1):
        # Add all coins <= reachable+1
        while i < len(sorted_coins) and sorted_coins[i] <= reachable + 1:
            reachable += sorted_coins[i]
            i += 1

        # Check if target is constructible
        if target > reachable:
            non_constructible.append(target)

    return non_constructible


# ============================================================================
# APPROACH 2: Gap Detection (returns ranges)
# ============================================================================

def all_non_constructible_gaps(coins: List[int], limit: int) -> List[Tuple[int, int]]:
    """Returns ranges of non-constructible values."""
    sorted_coins = sorted(coins)

    gaps = []
    reachable = 0

    for coin in sorted_coins:
        if coin > reachable + 1:
            # Gap from reachable+1 to coin-1
            gap_start = reachable + 1
            gap_end = coin - 1
            if gap_end <= limit:
                gaps.append((gap_start, gap_end))
            elif gap_start <= limit:
                gaps.append((gap_start, limit))
        reachable += coin

    # Values after reachable up to limit
    if reachable < limit:
        gaps.append((reachable + 1, limit))

    return gaps


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    test_cases = [
        ([1, 2, 5], 10, [], "All constructible"),
        ([1, 3], 5, [5], "One gap"),
        ([2, 4], 10, [1, 7, 8, 9, 10], "Missing 1"),
        ([1, 5, 10], 20, [7, 8, 9, 17, 18, 19, 20], "Multiple gaps"),
        ([], 5, [1, 2, 3, 4, 5], "No coins"),
    ]

    print("=" * 70)
    print("ALL NON-CONSTRUCTIBLE VALUES - TEST RESULTS")
    print("=" * 70)

    for coins, limit, expected, desc in test_cases:
        result = all_non_constructible(coins.copy(), limit)
        status = "✓" if result == expected else "✗"
        print(f"{status} {desc}: coins={coins}, limit={limit} → {result}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    coins = [1, 2, 5]
    limit = 10
    print(f"\nInput: coins = {coins}, limit = {limit}")
    print(f"Non-constructible: {all_non_constructible(coins.copy(), limit)}")

    coins = [1, 5, 10]
    limit = 20
    print(f"\nInput: coins = {coins}, limit = {limit}")
    print(f"Non-constructible: {all_non_constructible(coins.copy(), limit)}")
    print(f"Gap ranges: {all_non_constructible_gaps(coins.copy(), limit)}")
