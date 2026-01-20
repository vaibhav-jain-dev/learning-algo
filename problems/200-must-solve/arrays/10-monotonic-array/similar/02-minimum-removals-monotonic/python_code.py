"""
Minimum Removals for Monotonic Array - Python Solutions

Find minimum elements to remove to make array monotonic.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List
import bisect


# ============================================================================
# APPROACH 1: O(n^2) DP (Straightforward)
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n)
#
# WHY THIS IS GOOD:
# - Easy to understand
# - Works for all cases
# - Good for interviews to explain
# ============================================================================

def min_removals_for_monotonic(array: List[int]) -> int:
    """
    Find minimum removals to make array monotonic.

    Strategy: Find longest monotonic subsequence (LMS), return n - LMS.

    We find both:
    - Longest Non-Decreasing Subsequence (LNDS)
    - Longest Non-Increasing Subsequence (LNIS)
    And take the maximum.

    Visual for [1, 3, 2, 4, 5, 3]:
        LNDS = 4 ([1, 2, 4, 5])
        LNIS = 3 ([3, 3] wait, need [3, 2] from different positions)
        Actually LNIS = 2 ([3, 3] or [3, 2])
        Answer = 6 - 4 = 2
    """
    if len(array) <= 1:
        return 0

    n = len(array)

    # Find LNDS (Longest Non-Decreasing Subsequence)
    dp_inc = [1] * n
    for i in range(1, n):
        for j in range(i):
            if array[i] >= array[j]:
                dp_inc[i] = max(dp_inc[i], dp_inc[j] + 1)

    # Find LNIS (Longest Non-Increasing Subsequence)
    dp_dec = [1] * n
    for i in range(1, n):
        for j in range(i):
            if array[i] <= array[j]:
                dp_dec[i] = max(dp_dec[i], dp_dec[j] + 1)

    longest_monotonic = max(max(dp_inc), max(dp_dec))
    return n - longest_monotonic


# ============================================================================
# APPROACH 2: O(n log n) Binary Search
# ============================================================================
# Time Complexity:  O(n log n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Large arrays
# - Performance critical
# ============================================================================

def min_removals_optimized(array: List[int]) -> int:
    """
    Optimized solution using binary search (patience sorting).

    For LNDS: Use bisect_right for non-decreasing (allows equals)
    For LNIS: Negate values and use same technique
    """
    if len(array) <= 1:
        return 0

    def longest_non_decreasing(arr: List[int]) -> int:
        """Find LNDS using binary search."""
        tails = []
        for num in arr:
            # bisect_right for non-decreasing (allows equals)
            pos = bisect.bisect_right(tails, num)
            if pos == len(tails):
                tails.append(num)
            else:
                tails[pos] = num
        return len(tails)

    def longest_non_increasing(arr: List[int]) -> int:
        """Find LNIS by negating and finding LNDS."""
        return longest_non_decreasing([-x for x in arr])

    lnds = longest_non_decreasing(array)
    lnis = longest_non_increasing(array)

    return len(array) - max(lnds, lnis)


# ============================================================================
# APPROACH 3: Clean DP with enumerate
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When you want more Pythonic code
# - For better readability
# ============================================================================

def min_removals_pythonic(array: List[int]) -> int:
    """
    More Pythonic version using enumerate and comprehensions.
    """
    if len(array) <= 1:
        return 0

    n = len(array)

    # LNDS using comprehension
    dp_inc = [1] * n
    for i, val in enumerate(array):
        if i > 0:
            dp_inc[i] = 1 + max(
                (dp_inc[j] for j, prev in enumerate(array[:i]) if val >= prev),
                default=0
            )

    # LNIS using comprehension
    dp_dec = [1] * n
    for i, val in enumerate(array):
        if i > 0:
            dp_dec[i] = 1 + max(
                (dp_dec[j] for j, prev in enumerate(array[:i]) if val <= prev),
                default=0
            )

    return n - max(max(dp_inc), max(dp_dec))


# ============================================================================
# BONUS: Return the elements to remove
# ============================================================================

def get_elements_to_remove(array: List[int]) -> tuple[int, List[int], List[int]]:
    """
    Return (min_removals, elements_to_keep, elements_to_remove).
    """
    if len(array) <= 1:
        return 0, array.copy(), []

    n = len(array)

    # Find LNDS with backtracking
    dp = [1] * n
    parent = [-1] * n

    for i in range(1, n):
        for j in range(i):
            if array[i] >= array[j] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j

    # Find end of longest subsequence
    max_len = max(dp)
    end_idx = dp.index(max_len)

    # Backtrack to find subsequence
    keep_indices = []
    idx = end_idx
    while idx != -1:
        keep_indices.append(idx)
        idx = parent[idx]
    keep_indices.reverse()

    keep_set = set(keep_indices)
    to_keep = [array[i] for i in keep_indices]
    to_remove = [array[i] for i in range(n) if i not in keep_set]

    return n - max_len, to_keep, to_remove


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, expected, description)
        ([1, 3, 2, 4, 5, 3], 2, "Standard case"),
        ([5, 4, 3, 2, 1], 0, "Already decreasing"),
        ([1, 2, 3, 4, 5], 0, "Already increasing"),
        ([1, 2, 1, 2, 1], 2, "Zigzag pattern"),
        ([1], 0, "Single element"),
        ([], 0, "Empty array"),
        ([1, 1, 1, 1], 0, "All equal"),
        ([3, 1, 2, 4], 1, "One removal needed"),
    ]

    approaches = [
        ("O(n^2) DP", min_removals_for_monotonic),
        ("O(n log n) Binary Search", min_removals_optimized),
        ("Pythonic DP", min_removals_pythonic),
    ]

    print("=" * 70)
    print("MINIMUM REMOVALS FOR MONOTONIC - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, expected, desc in test_cases:
            result = func(array)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  {status}: {desc}: {result} (expected {expected})")

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
    array = [1, 3, 2, 4, 5, 3]
    print(f"\nInput: array = {array}")
    result = min_removals_for_monotonic(array)
    removals, keep, remove = get_elements_to_remove(array)
    print(f"Minimum removals: {result}")
    print(f"Keep: {keep}")
    print(f"Remove: {remove}")

    # Sample Input 2
    array = [5, 4, 3, 2, 1]
    print(f"\nInput: array = {array}")
    result = min_removals_for_monotonic(array)
    print(f"Minimum removals: {result}")

    # Sample Input 3
    array = [1, 2, 1, 2, 1]
    print(f"\nInput: array = {array}")
    result = min_removals_for_monotonic(array)
    removals, keep, remove = get_elements_to_remove(array)
    print(f"Minimum removals: {result}")
    print(f"Keep: {keep}")
    print(f"Remove: {remove}")
