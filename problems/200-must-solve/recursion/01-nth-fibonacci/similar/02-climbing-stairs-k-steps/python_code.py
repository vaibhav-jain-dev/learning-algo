"""
Climbing Stairs with K Steps - Python Solutions

Given n steps and ability to climb 1 to k steps at a time,
find the number of distinct ways to reach the top.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache
from collections import deque
from typing import List


# ============================================================================
# APPROACH 1: DP with Sliding Window (Optimal)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(k)
#
# WHY THIS IS BEST:
# - O(1) update per step using running sum
# - Space proportional to k, not n
# - Uses deque for efficient sliding window
# ============================================================================

def climb_stairs(n: int, k: int) -> int:
    """
    Compute ways to climb n stairs taking 1 to k steps at a time.

    Uses sliding window with deque for O(n) time and O(k) space.

    Args:
        n: Number of stairs to climb
        k: Maximum steps that can be taken at once

    Returns:
        Number of distinct ways to reach the top

    Examples:
        >>> climb_stairs(4, 2)
        5
        >>> climb_stairs(3, 3)
        4
    """
    if n == 0:
        return 1
    if n == 1:
        return 1

    # Use deque as sliding window of last k values
    window = deque([1], maxlen=k)  # Start with dp[0] = 1
    window_sum = 1

    for i in range(1, n + 1):
        # Current ways = sum of last k values
        curr = window_sum

        # If window is full, subtract the value that will be removed
        if len(window) == k:
            window_sum -= window[0]

        # Add current value to window and sum
        window.append(curr)
        window_sum += curr

    return window[-1]


# ============================================================================
# APPROACH 2: DP with Array and Sliding Sum
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# Cleaner implementation with full array for clarity.
# ============================================================================

def climb_stairs_dp(n: int, k: int) -> int:
    """
    Use DP array with sliding sum optimization.

    Maintains running sum to achieve O(n) time.
    """
    if n == 0:
        return 1

    dp = [0] * (n + 1)
    dp[0] = 1
    window_sum = 1  # Sum of dp[max(0, i-k)..i-1]

    for i in range(1, n + 1):
        dp[i] = window_sum

        # Add current to window sum
        window_sum += dp[i]

        # Remove element falling out of window
        if i >= k:
            window_sum -= dp[i - k]

    return dp[n]


# ============================================================================
# APPROACH 3: Standard DP (For Understanding)
# ============================================================================
# Time Complexity:  O(n * k)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Learning and understanding the problem
# - When k is small and simplicity matters
# ============================================================================

def climb_stairs_simple(n: int, k: int) -> int:
    """
    Standard DP approach - sum last k values for each step.

    Simple but O(n*k) time complexity.
    """
    if n == 0:
        return 1

    dp = [0] * (n + 1)
    dp[0] = 1

    for i in range(1, n + 1):
        # Sum all ways from previous k steps
        for j in range(1, min(k, i) + 1):
            dp[i] += dp[i - j]

    return dp[n]


# ============================================================================
# APPROACH 4: Memoization with lru_cache
# ============================================================================
# Time Complexity:  O(n * k)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Top-down thinking is more intuitive
# - Python's lru_cache makes this elegant
# ============================================================================

def climb_stairs_memo(n: int, k: int) -> int:
    """
    Top-down DP using memoization.

    Uses Python's lru_cache for automatic memoization.
    """
    @lru_cache(maxsize=None)
    def dp(step: int) -> int:
        if step == 0:
            return 1
        if step < 0:
            return 0

        # Sum all ways from previous k steps
        return sum(dp(step - j) for j in range(1, k + 1))

    return dp(n)


# ============================================================================
# APPROACH 5: Space-Optimized with List (Alternative)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(k)
#
# Uses modular arithmetic for circular buffer.
# ============================================================================

def climb_stairs_circular(n: int, k: int) -> int:
    """
    Use circular buffer with modular indexing.

    Similar to Go implementation with fixed-size array.
    """
    if n == 0:
        return 1

    # Circular buffer of size k
    dp = [0] * k
    dp[0] = 1
    window_sum = 1

    for i in range(1, n + 1):
        curr_idx = i % k
        old_val = dp[curr_idx]

        dp[curr_idx] = window_sum

        if i >= k:
            window_sum = window_sum + dp[curr_idx] - old_val
        else:
            window_sum = window_sum + dp[curr_idx]

    return dp[n % k]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests() -> None:
    """Run comprehensive tests for all approaches."""

    test_cases = [
        (4, 2, 5, "n=4, k=2 (classic)"),
        (3, 3, 4, "n=3, k=3 (tribonacci)"),
        (5, 3, 13, "n=5, k=3"),
        (1, 1, 1, "n=1, k=1 (single step)"),
        (0, 2, 1, "n=0 (already at top)"),
        (10, 2, 89, "n=10, k=2 (Fibonacci)"),
        (5, 5, 16, "n=5, k=5 (can jump to top)"),
        (3, 2, 3, "n=3, k=2"),
    ]

    approaches = [
        ("Sliding Window (Optimal)", climb_stairs),
        ("DP with Sliding Sum", climb_stairs_dp),
        ("Standard DP", climb_stairs_simple),
        ("Memoization", climb_stairs_memo),
        ("Circular Buffer", climb_stairs_circular),
    ]

    print("=" * 70)
    print("CLIMBING STAIRS WITH K STEPS - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for n, k, expected, desc in test_cases:
            result = func(n, k)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  [{status}] {desc}: got {result}, expected {expected}")

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("SAMPLE OUTPUT")
    print("=" * 70)

    print("\nInput: n = 4, k = 2")
    print(f"Output: {climb_stairs(4, 2)}")

    print("\nInput: n = 3, k = 3")
    print(f"Output: {climb_stairs(3, 3)}")

    print("\nInput: n = 5, k = 3")
    print(f"Output: {climb_stairs(5, 3)}")
