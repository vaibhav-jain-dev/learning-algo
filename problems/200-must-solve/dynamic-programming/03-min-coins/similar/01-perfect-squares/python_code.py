"""
Perfect Squares - Python Solutions

Find minimum perfect squares that sum to n.
This is Coin Change with squares as coins.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

import math
from collections import deque
from functools import lru_cache


# ============================================================================
# APPROACH 1: Bottom-Up Dynamic Programming
# ============================================================================
# Time Complexity:  O(n * sqrt(n))
# Space Complexity: O(n)
#
# WHY THIS IS BEST:
# - Straightforward coin change adaptation
# - Easy to understand and implement
# - Good for general use
# ============================================================================

def num_squares(n: int) -> int:
    """
    Find minimum perfect squares summing to n.

    Key Insight: This is Coin Change where coins are perfect squares.

    Visual for n = 12:
        Squares: [1, 4, 9]
        dp[12] = min(dp[11]+1, dp[8]+1, dp[3]+1) = min(4, 3, 4) = 3
        Answer: 12 = 4 + 4 + 4
    """
    # dp[i] = minimum squares needed to sum to i
    dp = [float('inf')] * (n + 1)
    dp[0] = 0

    # Fill DP table
    for i in range(1, n + 1):
        # Try each perfect square <= i
        j = 1
        while j * j <= i:
            dp[i] = min(dp[i], dp[i - j * j] + 1)
            j += 1

    return dp[n]


# ============================================================================
# APPROACH 2: BFS (Level-by-Level)
# ============================================================================
# Time Complexity:  O(n * sqrt(n))
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When you want to think of it as shortest path
# - BFS naturally finds minimum depth (minimum squares)
# ============================================================================

def num_squares_bfs(n: int) -> int:
    """
    Use BFS to find minimum squares.

    Each level represents adding one more square.
    First time we reach 0, we have the answer.
    """
    if n == 0:
        return 0

    # Precompute squares
    squares = [i * i for i in range(1, int(math.sqrt(n)) + 1)]

    # BFS
    visited = {n}
    queue = deque([n])
    level = 0

    while queue:
        level += 1
        for _ in range(len(queue)):
            curr = queue.popleft()

            for sq in squares:
                next_val = curr - sq
                if next_val == 0:
                    return level
                if next_val > 0 and next_val not in visited:
                    visited.add(next_val)
                    queue.append(next_val)

    return level


# ============================================================================
# APPROACH 3: Mathematical (Lagrange's Four Square Theorem)
# ============================================================================
# Time Complexity:  O(sqrt(n))
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When optimal performance is needed
# - Relies on number theory knowledge
# ============================================================================

def num_squares_math(n: int) -> int:
    """
    Use Lagrange's Four Square Theorem.

    Key theorems:
    1. Every positive integer is sum of at most 4 squares
    2. n is sum of 3 squares iff n is NOT of form 4^a(8b+7)
    3. Check if it's 1 square, then 2 squares, else 3 or 4
    """
    def is_square(num: int) -> bool:
        sqrt = int(math.sqrt(num))
        return sqrt * sqrt == num

    # Check if n itself is a perfect square
    if is_square(n):
        return 1

    # Check if n is of form 4^a(8b+7) - then answer is 4
    temp = n
    while temp % 4 == 0:
        temp //= 4
    if temp % 8 == 7:
        return 4

    # Check if sum of two squares
    for i in range(1, int(math.sqrt(n)) + 1):
        if is_square(n - i * i):
            return 2

    return 3


# ============================================================================
# APPROACH 4: Top-Down with Memoization
# ============================================================================
# Time Complexity:  O(n * sqrt(n))
# Space Complexity: O(n)
#
# WHEN TO USE:
# - More intuitive recursive thinking
# - When you want automatic memoization
# ============================================================================

def num_squares_memo(n: int) -> int:
    """
    Top-down DP with memoization using lru_cache.
    """
    @lru_cache(maxsize=None)
    def dp(remaining: int) -> int:
        if remaining == 0:
            return 0

        min_squares = float('inf')
        j = 1
        while j * j <= remaining:
            min_squares = min(min_squares, dp(remaining - j * j) + 1)
            j += 1

        return min_squares

    return dp(n)


# ============================================================================
# BONUS: Find the actual squares
# ============================================================================

def num_squares_with_decomposition(n: int) -> tuple[int, list[int]]:
    """
    Return minimum squares and the actual squares used.

    Uses bottom-up DP with parent tracking.
    """
    # dp[i] = minimum squares needed for i
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    # parent[i] = which square was used to reach i optimally
    parent = [0] * (n + 1)

    for i in range(1, n + 1):
        j = 1
        while j * j <= i:
            sq = j * j
            if dp[i - sq] + 1 < dp[i]:
                dp[i] = dp[i - sq] + 1
                parent[i] = sq
            j += 1

    # Reconstruct the squares
    squares = []
    curr = n
    while curr > 0:
        squares.append(parent[curr])
        curr -= parent[curr]

    return dp[n], squares


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (n, expected, description)
        (12, 3, "Example 1: 4+4+4"),
        (13, 2, "Example 2: 4+9"),
        (1, 1, "Perfect square itself"),
        (2, 2, "1+1"),
        (4, 1, "Perfect square 4"),
        (7, 4, "4+1+1+1 (Legendre form)"),
        (100, 1, "10^2"),
        (99, 3, "81+9+9"),
    ]

    approaches = [
        ("Bottom-Up DP", num_squares),
        ("BFS", num_squares_bfs),
        ("Mathematical", num_squares_math),
        ("Memoization", num_squares_memo),
    ]

    print("=" * 70)
    print("PERFECT SQUARES - TEST RESULTS")
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

    # Show decomposition
    print("\n" + "=" * 70)
    print("DECOMPOSITION EXAMPLES")
    print("=" * 70)
    for n in [12, 13, 99]:
        count, squares = num_squares_with_decomposition(n)
        print(f"\nn = {n}: {count} squares")
        print(f"Squares: {squares}")
        print(f"Verification: {' + '.join(map(str, squares))} = {sum(squares)}")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    n = 12
    print(f"\nInput: n = {n}")
    print(f"Output: {num_squares(n)}")

    # Sample Input 2
    n = 13
    print(f"\nInput: n = {n}")
    print(f"Output: {num_squares(n)}")
