"""
Integer Break - Python Solutions

Given n, break it into sum of at least 2 positive integers and maximize the product.
Demonstrates the connection between DP optimization and mathematical insights.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache


# ============================================================================
# APPROACH 1: Bottom-Up Dynamic Programming
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n)
#
# WHY THIS IS STANDARD:
# - Clear recurrence relation
# - Works for any constraint variations
# - Easy to understand the state transitions
# ============================================================================

def integer_break(n: int) -> int:
    """
    Find maximum product by breaking n into at least 2 positive integers.

    Key Insight: dp[i] = max product obtainable by breaking i
    For each i, try all possible first pieces j, then either:
    - Keep (i-j) as is: j * (i-j)
    - Break (i-j) further: j * dp[i-j]

    Visual for n = 10:
        dp[10] = max over j of max(j*(10-j), j*dp[10-j])
        Best: j=3, dp[7]=12 -> 3*12 = 36
        Split: 10 = 3 + 3 + 4
    """
    if n <= 3:
        return n - 1  # Must break: 2=1+1->1, 3=1+2->2

    # dp[i] = max product when breaking i
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 1
    dp[3] = 2

    for i in range(4, n + 1):
        # Try each possible first piece j
        for j in range(1, i):
            # Two choices: keep (i-j) whole OR break it further
            product = max(j * (i - j), j * dp[i - j])
            dp[i] = max(dp[i], product)

    return dp[n]


# ============================================================================
# APPROACH 2: Optimized DP (Only Try 2 and 3)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHY THIS WORKS:
# - Mathematical insight: only 2s and 3s matter
# - 1 is never optimal (kills product)
# - Numbers >= 4 should be broken (4 = 2+2, 5 = 2+3, etc.)
# ============================================================================

def integer_break_optimized_dp(n: int) -> int:
    """
    Optimized DP using mathematical insight: only try 2 and 3.

    Key Insight:
    - Breaking into 1s is always bad (1 * anything = anything)
    - Numbers >= 4 should be broken: 4 = 2*2, 5 = 2*3, etc.
    - Only need to try j = 2 or j = 3
    """
    if n <= 3:
        return n - 1

    dp = [0] * (n + 1)
    # Base cases: these are values when NOT forced to break
    dp[1] = 1
    dp[2] = 2  # 2 itself (when used as part of larger number)
    dp[3] = 3  # 3 itself (when used as part of larger number)

    for i in range(4, n + 1):
        # Only try breaking off 2 or 3
        dp[i] = max(2 * dp[i - 2], 3 * dp[i - 3])

    return dp[n]


# ============================================================================
# APPROACH 3: Mathematical (Greedy with 3s)
# ============================================================================
# Time Complexity:  O(1) or O(log n) for large exponents
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When you understand the math
# - Optimal performance needed
# - Interview "aha" moment solution
# ============================================================================

def integer_break_math(n: int) -> int:
    """
    Pure mathematical solution using the 3s rule.

    Mathematical Insight:
    - The number e (approximately 2.718) maximizes x^(n/x)
    - Since we need integers, 3 is optimal (closest to e)
    - Exception: if remainder is 1, use one less 3 and add a 4 (or two 2s)

    Rules:
    - n % 3 == 0: Use all 3s -> 3^(n/3)
    - n % 3 == 1: One 4 and rest 3s -> 4 * 3^((n-4)/3)
    - n % 3 == 2: One 2 and rest 3s -> 2 * 3^((n-2)/3)
    """
    if n <= 3:
        return n - 1

    quotient, remainder = divmod(n, 3)

    if remainder == 0:
        # All 3s
        return 3 ** quotient
    elif remainder == 1:
        # One 4 (or two 2s) and rest 3s
        # n = 3*q + 1 -> use (q-1) threes and one 4
        return 4 * (3 ** (quotient - 1))
    else:  # remainder == 2
        # One 2 and rest 3s
        return 2 * (3 ** quotient)


# ============================================================================
# APPROACH 4: Memoization (Top-Down)
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - More intuitive recursive thinking
# - When you want to show the recurrence clearly
# ============================================================================

def integer_break_memo(n: int) -> int:
    """
    Top-down DP with memoization.

    Recursive formulation matching the mathematical definition.
    """
    @lru_cache(maxsize=None)
    def dp(num: int) -> int:
        if num <= 3:
            return num  # When used as part, don't force break

        max_product = 0
        for j in range(2, num):
            # Either keep (num-j) or break it
            product = max(j * (num - j), j * dp(num - j))
            max_product = max(max_product, product)

        return max_product

    # Handle edge cases where we MUST break
    if n <= 3:
        return n - 1

    return dp(n)


# ============================================================================
# BONUS: Return the actual split
# ============================================================================

def integer_break_with_split(n: int) -> tuple[int, list[int]]:
    """
    Return (max_product, list_of_parts).

    Uses the mathematical approach to find the optimal split.
    """
    if n <= 3:
        if n == 2:
            return 1, [1, 1]
        return 2, [1, 2]

    quotient, remainder = divmod(n, 3)

    if remainder == 0:
        # All 3s
        return 3 ** quotient, [3] * quotient
    elif remainder == 1:
        # Use (q-1) threes and one 4 (or two 2s)
        product = 4 * (3 ** (quotient - 1))
        parts = [3] * (quotient - 1) + [4]  # or [2, 2] instead of [4]
        return product, parts
    else:  # remainder == 2
        # One 2 and rest 3s
        product = 2 * (3 ** quotient)
        parts = [3] * quotient + [2]
        return product, parts


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (n, expected, description)
        (2, 1, "Minimum case: 1+1"),
        (3, 2, "3 = 1+2"),
        (4, 4, "4 = 2+2"),
        (5, 6, "5 = 2+3"),
        (6, 9, "6 = 3+3"),
        (7, 12, "7 = 3+4"),
        (8, 18, "8 = 2+3+3"),
        (9, 27, "9 = 3+3+3"),
        (10, 36, "10 = 3+3+4"),
        (11, 54, "11 = 3+3+3+2"),
        (12, 81, "12 = 3+3+3+3"),
        (58, 1549681956, "Max constraint"),
    ]

    approaches = [
        ("Bottom-Up DP", integer_break),
        ("Optimized DP", integer_break_optimized_dp),
        ("Mathematical", integer_break_math),
        ("Memoization", integer_break_memo),
    ]

    print("=" * 70)
    print("INTEGER BREAK - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for n, expected, desc in test_cases:
            result = func(n)
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

    # Show splits
    print("\n" + "=" * 70)
    print("OPTIMAL SPLITS")
    print("=" * 70)

    for n in [2, 5, 8, 10, 15]:
        product, parts = integer_break_with_split(n)
        parts_str = " + ".join(map(str, parts))
        product_str = " x ".join(map(str, parts))
        print(f"\nn = {n}")
        print(f"Split: {n} = {parts_str}")
        print(f"Product: {product_str} = {product}")

    # Why 3s are optimal
    print("\n" + "=" * 70)
    print("WHY 3s ARE OPTIMAL - COMPARISON FOR n = 12")
    print("=" * 70)

    comparisons = [
        ([6, 6], "Two 6s"),
        ([4, 4, 4], "Three 4s"),
        ([3, 3, 3, 3], "Four 3s (optimal)"),
        ([2, 2, 2, 2, 2, 2], "Six 2s"),
        ([2, 5, 5], "Mixed"),
    ]

    for parts, desc in comparisons:
        product = 1
        for p in parts:
            product *= p
        parts_str = " + ".join(map(str, parts))
        prod_str = " x ".join(map(str, parts))
        print(f"\n{desc}:")
        print(f"  12 = {parts_str}")
        print(f"  Product: {prod_str} = {product}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    n = 2
    print(f"\nInput: n = {n}")
    print(f"Output: {integer_break(n)}")

    # Sample Input 2
    n = 10
    print(f"\nInput: n = {n}")
    print(f"Output: {integer_break(n)}")
