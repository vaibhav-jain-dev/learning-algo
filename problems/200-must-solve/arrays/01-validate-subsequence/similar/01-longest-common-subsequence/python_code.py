"""
Longest Common Subsequence - Python Solutions

Find the length of the longest common subsequence between two strings.

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
# - Clear visualization of subproblem relationships
# - Easy to understand and debug
# - Can reconstruct the actual LCS if needed
# ============================================================================

def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Find LCS length using bottom-up dynamic programming.

    Key Insight: If characters match, extend previous LCS by 1.
    If not, take the best LCS from either excluding current char.

    Recurrence:
        if text1[i-1] == text2[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    Visual for text1="ace", text2="abcde":

            ""  a  b  c  d  e
        ""   0  0  0  0  0  0
        a    0  1  1  1  1  1
        c    0  1  1  2  2  2
        e    0  1  1  2  2  3

        Answer: dp[3][5] = 3 (LCS = "ace")
    """
    m, n = len(text1), len(text2)

    # dp[i][j] = LCS length for text1[:i] and text2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill the table using enumerate for Pythonic iteration
    for i, char1 in enumerate(text1, start=1):
        for j, char2 in enumerate(text2, start=1):
            if char1 == char2:
                # Characters match - extend LCS
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                # Take best from excluding either character
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]


# ============================================================================
# APPROACH 2: Space-Optimized DP
# ============================================================================
# Time Complexity:  O(m × n)
# Space Complexity: O(min(m, n)) - only two rows needed
#
# WHEN TO USE:
# - Memory is constrained
# - Only need the length, not the actual LCS
# ============================================================================

def longest_common_subsequence_optimized(text1: str, text2: str) -> int:
    """
    Space-optimized DP using only two rows.

    Insight: Each cell only depends on current and previous row.
    We can alternate between two rows to save space.

    Further optimization: Use shorter string for columns.
    """
    # Ensure text2 is the shorter one for space optimization
    if len(text1) < len(text2):
        text1, text2 = text2, text1

    m, n = len(text1), len(text2)

    # Only need two rows
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)

    for i, char1 in enumerate(text1, start=1):
        for j, char2 in enumerate(text2, start=1):
            if char1 == char2:
                curr[j] = prev[j - 1] + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])

        # Swap rows - Pythonic tuple swap
        prev, curr = curr, prev

    return prev[n]


# ============================================================================
# APPROACH 3: Recursive with Memoization
# ============================================================================
# Time Complexity:  O(m × n) - each subproblem solved once
# Space Complexity: O(m × n) - cache + recursion stack
#
# WHEN TO USE:
# - More intuitive top-down thinking
# - When only some subproblems need solving
# ============================================================================

def longest_common_subsequence_memo(text1: str, text2: str) -> int:
    """
    Top-down DP with memoization using lru_cache.

    More intuitive: Start from the end and work backwards.
    """
    @lru_cache(maxsize=None)
    def dp(i: int, j: int) -> int:
        # Base case: empty string
        if i < 0 or j < 0:
            return 0

        # Characters match
        if text1[i] == text2[j]:
            return dp(i - 1, j - 1) + 1

        # Take the better option
        return max(dp(i - 1, j), dp(i, j - 1))

    return dp(len(text1) - 1, len(text2) - 1)


# ============================================================================
# BONUS: Reconstruct the Actual LCS
# ============================================================================

def longest_common_subsequence_with_string(text1: str, text2: str) -> tuple[int, str]:
    """
    Return both length and the actual LCS string.

    Uses backtracking through the DP table.
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill DP table
    for i, char1 in enumerate(text1, start=1):
        for j, char2 in enumerate(text2, start=1):
            if char1 == char2:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Backtrack to find the actual LCS
    lcs = []
    i, j = m, n

    while i > 0 and j > 0:
        if text1[i - 1] == text2[j - 1]:
            lcs.append(text1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    # Reverse since we built it backwards
    return dp[m][n], ''.join(reversed(lcs))


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (text1, text2, expected_length, description)
        ("abcde", "ace", 3, "Standard case"),
        ("abc", "abc", 3, "Identical strings"),
        ("abc", "def", 0, "No common chars"),
        ("oxcpqrsvwf", "shmtulqrypy", 2, "Longer strings"),
        ("", "abc", 0, "Empty string"),
        ("a", "a", 1, "Single char match"),
        ("abcba", "abcbcba", 5, "Palindrome-like"),
    ]

    approaches = [
        ("2D DP (Recommended)", longest_common_subsequence),
        ("Space-Optimized", longest_common_subsequence_optimized),
        ("Memoization", longest_common_subsequence_memo),
    ]

    print("=" * 70)
    print("LONGEST COMMON SUBSEQUENCE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for text1, text2, expected, desc in test_cases:
            result = func(text1, text2)
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: {result} (expected {expected})")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    # Show actual LCS reconstruction
    print("\n" + "=" * 70)
    print("LCS RECONSTRUCTION EXAMPLE")
    print("=" * 70)
    text1, text2 = "abcde", "ace"
    length, lcs = longest_common_subsequence_with_string(text1, text2)
    print(f"\ntext1 = '{text1}'")
    print(f"text2 = '{text2}'")
    print(f"LCS length = {length}")
    print(f"LCS string = '{lcs}'")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    text1 = "abcde"
    text2 = "ace"
    print(f"\nInput: text1 = '{text1}', text2 = '{text2}'")
    print(f"Output: {longest_common_subsequence(text1, text2)}")

    # Sample Input 2
    text1 = "abc"
    text2 = "abc"
    print(f"\nInput: text1 = '{text1}', text2 = '{text2}'")
    print(f"Output: {longest_common_subsequence(text1, text2)}")

    # Sample Input 3
    text1 = "abc"
    text2 = "def"
    print(f"\nInput: text1 = '{text1}', text2 = '{text2}'")
    print(f"Output: {longest_common_subsequence(text1, text2)}")
