"""
Count Distinct Subsequences - Python Solutions

Count the number of distinct subsequences of s that equal t.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from functools import lru_cache


# ============================================================================
# APPROACH 1: Dynamic Programming (2D Table) ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(m × n) - fill entire table
# Space Complexity: O(m × n) - for the DP table
#
# WHY THIS IS BEST:
# - Clear logic for counting subsequences
# - Easy to trace and debug
# - Handles large inputs well
# ============================================================================

def num_distinct(s: str, t: str) -> int:
    """
    Count distinct subsequences using bottom-up DP.

    Key Insight:
    - If s[i-1] == t[j-1]: We can either use this match or skip it
      dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
    - If s[i-1] != t[j-1]: We must skip the current char of s
      dp[i][j] = dp[i-1][j]

    Visual for s="rabbbit", t="rabbit":

             ""  r  a  b  b  i  t
        ""    1  0  0  0  0  0  0
        r     1  1  0  0  0  0  0
        a     1  1  1  0  0  0  0
        b     1  1  1  1  0  0  0
        b     1  1  1  2  1  0  0
        b     1  1  1  3  3  0  0
        i     1  1  1  3  3  3  0
        t     1  1  1  3  3  3  3

    Answer: dp[7][6] = 3
    """
    m, n = len(s), len(t)

    # dp[i][j] = ways to form t[:j] from s[:i]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Empty t can be formed from any prefix of s in exactly 1 way
    for i in range(m + 1):
        dp[i][0] = 1

    # Fill the table using enumerate for Pythonic iteration
    for i, char_s in enumerate(s, start=1):
        for j, char_t in enumerate(t, start=1):
            # Always include ways that don't use s[i-1]
            dp[i][j] = dp[i - 1][j]

            # If characters match, add ways that use this match
            if char_s == char_t:
                dp[i][j] += dp[i - 1][j - 1]

    return dp[m][n]


# ============================================================================
# APPROACH 2: Space-Optimized DP
# ============================================================================
# Time Complexity:  O(m × n)
# Space Complexity: O(n) - only one row needed
#
# WHEN TO USE:
# - Memory is constrained
# - Large input strings
# ============================================================================

def num_distinct_optimized(s: str, t: str) -> int:
    """
    Space-optimized DP using single row.

    Key Insight: Process t from right to left to avoid overwriting
    values we still need.
    """
    n = len(t)

    # dp[j] = ways to form t[:j] from current prefix of s
    dp = [0] * (n + 1)
    dp[0] = 1  # Empty t can always be formed

    for char_s in s:
        # Process right to left to avoid using updated values
        for j in range(min(len(t), n), 0, -1):
            if char_s == t[j - 1]:
                dp[j] += dp[j - 1]

    return dp[n]


# ============================================================================
# APPROACH 3: Recursive with Memoization
# ============================================================================
# Time Complexity:  O(m × n) - each subproblem solved once
# Space Complexity: O(m × n) - cache + recursion stack
#
# WHEN TO USE:
# - More intuitive top-down thinking
# - When you want to explore the decision tree
# ============================================================================

def num_distinct_memo(s: str, t: str) -> int:
    """
    Top-down DP with memoization.

    At each position, we have choices:
    1. Skip current char of s
    2. If chars match, use the match
    """
    @lru_cache(maxsize=None)
    def dp(i: int, j: int) -> int:
        # Successfully matched all of t
        if j < 0:
            return 1

        # Ran out of s but still have t to match
        if i < 0:
            return 0

        # Option 1: Skip current character of s
        result = dp(i - 1, j)

        # Option 2: Use the match if characters are equal
        if s[i] == t[j]:
            result += dp(i - 1, j - 1)

        return result

    return dp(len(s) - 1, len(t) - 1)


# ============================================================================
# EDUCATIONAL: Verbose Version with Explanations
# ============================================================================

def num_distinct_verbose(s: str, t: str) -> int:
    """
    Same algorithm with detailed step printing.
    """
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = 1

    print(f"Finding distinct subsequences of '{t}' in '{s}'")
    print(f"\nDP Table (rows=s, cols=t):")
    print(f"     {'  '.join(['ε'] + list(t))}")

    for i, char_s in enumerate(s, start=1):
        for j, char_t in enumerate(t, start=1):
            dp[i][j] = dp[i - 1][j]
            if char_s == char_t:
                dp[i][j] += dp[i - 1][j - 1]

        # Print current row
        row_prefix = f"{s[i-1] if i > 0 else 'ε':>2}"
        row_values = '  '.join(f"{v}" for v in dp[i])
        print(f"{row_prefix}  {row_values}")

    print(f"\nResult: {dp[m][n]} distinct subsequences")
    return dp[m][n]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (s, t, expected, description)
        ("rabbbit", "rabbit", 3, "Standard case with repeated chars"),
        ("babgbag", "bag", 5, "Multiple paths"),
        ("aaa", "aa", 3, "All same characters"),
        ("abc", "abc", 1, "Exact match"),
        ("abc", "def", 0, "No match possible"),
        ("", "a", 0, "Empty s"),
        ("a", "", 1, "Empty t"),
        ("aabb", "ab", 4, "Four ways to pick ab"),
    ]

    approaches = [
        ("2D DP (Recommended)", num_distinct),
        ("Space-Optimized", num_distinct_optimized),
        ("Memoization", num_distinct_memo),
    ]

    print("=" * 70)
    print("COUNT DISTINCT SUBSEQUENCES - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for s, t, expected, desc in test_cases:
            result = func(s, t)
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: {result} (expected {expected})")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    # Verbose walkthrough
    print("\n" + "=" * 70)
    print("DETAILED WALKTHROUGH")
    print("=" * 70)
    num_distinct_verbose("babgbag", "bag")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    s = "rabbbit"
    t = "rabbit"
    print(f"\nInput: s = '{s}', t = '{t}'")
    print(f"Output: {num_distinct(s, t)}")

    # Sample Input 2
    s = "babgbag"
    t = "bag"
    print(f"\nInput: s = '{s}', t = '{t}'")
    print(f"Output: {num_distinct(s, t)}")
