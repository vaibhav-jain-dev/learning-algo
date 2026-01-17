"""
Minimum Window Subsequence - Python Solutions

Find the minimum contiguous substring of s1 containing s2 as a subsequence.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""


# ============================================================================
# APPROACH 1: Two Pointers (Forward + Backward) ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(m × n) - for each start, scan up to n chars
# Space Complexity: O(1) - only pointers and result string
#
# WHY THIS IS BEST:
# - Intuitive and easy to understand
# - Optimal for most cases
# - No extra space needed
# ============================================================================

def min_window(s1: str, s2: str) -> str:
    """
    Find minimum window using two-pointer technique.

    Key Insight: Two-phase approach for each potential window:
    1. Forward pass: Find where s2 ends in s1
    2. Backward pass: Find where s2 begins (minimizes window)

    Visual for s1="abcdebdde", s2="bde":

        Forward phase (find end of subsequence):
        s1: a b c d e b d d e
               ^     ^       (b matches)
                   ^         (d matches)
                     ^       (e matches) → end at index 4

        Backward phase (shrink window):
        s1: a b c d e
                 ← ← ←       (e at 4, d at 3, b at 1)
              ^       ^      Window: [1, 4] = "bcde"

    Then continue searching for shorter windows...
    """
    m, n = len(s1), len(s2)
    min_len = float('inf')
    result = ""

    i = 0  # Pointer in s1

    while i < m:
        j = 0  # Pointer in s2

        # Forward pass: Find where s2 ends as subsequence in s1
        while i < m and j < n:
            if s1[i] == s2[j]:
                j += 1
            i += 1

        # If we didn't match all of s2, no more windows possible
        if j < n:
            break

        # Found a window ending at i-1
        end = i - 1

        # Backward pass: Shrink the window
        j = n - 1
        while j >= 0:
            if s1[end] == s2[j]:
                j -= 1
            end -= 1

        # Window starts at end + 1
        start = end + 1
        window_len = i - start

        # Update result if this window is smaller
        if window_len < min_len:
            min_len = window_len
            result = s1[start:i]

        # Move to next potential window
        i = start + 1

    return result


# ============================================================================
# APPROACH 2: Dynamic Programming
# ============================================================================
# Time Complexity:  O(m × n)
# Space Complexity: O(m × n)
#
# WHEN TO USE:
# - When you need to understand all possible windows
# - Good for variations of the problem
# ============================================================================

def min_window_dp(s1: str, s2: str) -> str:
    """
    DP approach tracking window start positions.

    dp[i][j] = starting index of minimum window ending at s1[i-1]
               that contains s2[:j] as subsequence.
               -1 if no such window exists.

    Recurrence:
    - If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]
    - Else: dp[i][j] = dp[i-1][j]
    """
    m, n = len(s1), len(s2)

    # dp[i][j] = start index of window ending at i-1 containing s2[:j]
    dp = [[-1] * (n + 1) for _ in range(m + 1)]

    # Empty s2 can be matched starting at any position
    for i in range(m + 1):
        dp[i][0] = i

    # Fill the DP table
    for i, char1 in enumerate(s1, start=1):
        for j, char2 in enumerate(s2, start=1):
            if char1 == char2:
                # Extend the previous match
                dp[i][j] = dp[i - 1][j - 1]
            else:
                # Keep the previous window start
                dp[i][j] = dp[i - 1][j]

    # Find the minimum window
    min_len = float('inf')
    result = ""

    for i in range(1, m + 1):
        if dp[i][n] != -1:
            start = dp[i][n]
            window_len = i - start
            if window_len < min_len:
                min_len = window_len
                result = s1[start:i]

    return result


# ============================================================================
# APPROACH 3: Optimized with Next Character Index
# ============================================================================
# Time Complexity:  O(m × n) worst case, often better in practice
# Space Complexity: O(m × 26) for the next array
#
# WHEN TO USE:
# - When s1 is very long
# - When s2 has repeated characters
# ============================================================================

def min_window_optimized(s1: str, s2: str) -> str:
    """
    Optimized approach using precomputed next character positions.

    Precompute: next[i][c] = next position of character c at or after index i
    This allows O(1) jumps instead of linear scanning.
    """
    m, n = len(s1), len(s2)

    # Precompute next occurrence of each character
    # next_char[i][c] = next index >= i where character c appears
    next_char = [[m] * 26 for _ in range(m + 1)]

    # Fill from right to left
    for i in range(m - 1, -1, -1):
        # Copy previous row
        for c in range(26):
            next_char[i][c] = next_char[i + 1][c]
        # Update current character
        char_idx = ord(s1[i]) - ord('a')
        next_char[i][char_idx] = i

    min_len = float('inf')
    result = ""

    # Try each starting position
    for start in range(m):
        pos = start

        # Match each character of s2 using jump table
        matched = True
        for char in s2:
            char_idx = ord(char) - ord('a')
            pos = next_char[pos][char_idx]
            if pos == m:
                matched = False
                break
            pos += 1

        if matched:
            window_len = pos - start
            if window_len < min_len:
                min_len = window_len
                result = s1[start:pos]

    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (s1, s2, expected, description)
        ("abcdebdde", "bde", "bcde", "Standard case"),
        ("abcdef", "ace", "abcde", "Full window needed"),
        ("abc", "abc", "abc", "Exact match"),
        ("abc", "d", "", "No match"),
        ("aaa", "aa", "aa", "Repeated chars"),
        ("fgrqsqsnodwmxzkzxwqegkndaa", "fnok", "fgrqsqsnodwmxzkzxwqegkn", "Long string"),
        ("cnhczmccqouqadqtmjjzl", "mm", "mccqouqadqtm", "Two same chars"),
    ]

    approaches = [
        ("Two Pointers (Recommended)", min_window),
        ("Dynamic Programming", min_window_dp),
        ("Optimized with Jump Table", min_window_optimized),
    ]

    print("=" * 70)
    print("MINIMUM WINDOW SUBSEQUENCE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for s1, s2, expected, desc in test_cases:
            result = func(s1, s2)
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: '{result}' (expected '{expected}')")

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
    s1 = "abcdebdde"
    s2 = "bde"
    print(f"\nInput: s1 = '{s1}', s2 = '{s2}'")
    print(f"Output: '{min_window(s1, s2)}'")

    # Sample Input 2
    s1 = "jmeqksfrsdcmsiwvaovztaqenprpvnbstl"
    s2 = "u"
    print(f"\nInput: s1 = '{s1}', s2 = '{s2}'")
    print(f"Output: '{min_window(s1, s2)}'")

    # Sample Input 3
    s1 = "abcdef"
    s2 = "ace"
    print(f"\nInput: s1 = '{s1}', s2 = '{s2}'")
    print(f"Output: '{min_window(s1, s2)}'")
