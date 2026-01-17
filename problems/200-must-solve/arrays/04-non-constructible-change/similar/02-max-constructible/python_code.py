"""
Maximum Constructible Value - Python Solutions

Given coins and a budget of K additional coins (each value 1), find maximum
consecutive range starting from 1 you can construct.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Greedy with Budget ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n log n) - sorting dominates
# Space Complexity: O(1)
# ============================================================================

def max_constructible(coins: List[int], budget: int) -> int:
    """
    Find maximum value reachable with budget of k 1-coins.

    Key Insight: Use 1-coins to fill gaps as we encounter them.
    """
    sorted_coins = sorted(coins)

    reachable = budget  # Start with budget 1-coins gives us [1, budget]

    for coin in sorted_coins:
        if coin > reachable + 1:
            # Gap we can't fill - done
            break
        reachable += coin

    return reachable


# ============================================================================
# APPROACH 2: Binary Search on Answer
# ============================================================================

def max_constructible_binary_search(coins: List[int], budget: int) -> int:
    """Uses binary search on the answer."""
    sorted_coins = sorted(coins)

    def can_construct(target: int) -> bool:
        reachable = budget
        for coin in sorted_coins:
            if coin > reachable + 1:
                break
            reachable += coin
        return reachable >= target

    # Binary search for maximum target
    lo, hi = 1, budget + sum(coins)
    result = 0

    while lo <= hi:
        mid = (lo + hi) // 2
        if can_construct(mid):
            result = mid
            lo = mid + 1
        else:
            hi = mid - 1

    return result


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    test_cases = [
        ([1, 5, 10], 2, 8, "Add two 1s"),
        ([5, 10, 20], 0, 0, "No 1-coins, can't start"),
        ([1, 2, 4], 0, 7, "No budget needed"),
        ([], 5, 5, "Only budget coins"),
        ([3, 7], 2, 2, "Gap too large"),
        ([1, 1, 1, 10], 0, 3, "Multiple 1s"),
    ]

    print("=" * 70)
    print("MAXIMUM CONSTRUCTIBLE VALUE - TEST RESULTS")
    print("=" * 70)

    for coins, budget, expected, desc in test_cases:
        result = max_constructible(coins.copy(), budget)
        status = "✓" if result == expected else "✗"
        print(f"{status} {desc}: coins={coins}, budget={budget} → {result} (expected {expected})")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    coins = [1, 5, 10]
    budget = 2
    print(f"\nInput: coins = {coins}, budget = {budget}")
    print(f"Output: {max_constructible(coins.copy(), budget)}")
