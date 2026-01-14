"""
Longest Common Subsequence
Combines: String Processing + 2D Dynamic Programming
"""

def longestCommonSubsequence(text1: str, text2: str) -> int:
    """
    2D DP approach.
    dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1]
    """
    m, n = len(text1), len(text2)

    # dp table with padding
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]


def longestCommonSubsequence_optimized(text1: str, text2: str) -> int:
    """
    Space-optimized version using two rows
    """
    m, n = len(text1), len(text2)

    # Ensure text2 is shorter for space optimization
    if n > m:
        text1, text2 = text2, text1
        m, n = n, m

    prev = [0] * (n + 1)
    curr = [0] * (n + 1)

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                curr[j] = prev[j - 1] + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])
        prev, curr = curr, [0] * (n + 1)

    return prev[n]


def lcs_with_string(text1: str, text2: str) -> tuple:
    """
    Return both length and actual LCS string
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Backtrack to find actual LCS
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

    return dp[m][n], ''.join(reversed(lcs))


def visualize_dp(text1: str, text2: str):
    """
    Visualize DP table
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    print(f"\nDP Table for '{text1}' and '{text2}':")
    print("    ", end="")
    print("  ", end="")
    for c in text2:
        print(f" {c}", end="")
    print()

    print("    ", end="")
    for j in range(n + 1):
        print(f" {dp[0][j]}", end="")
    print()

    for i in range(1, m + 1):
        print(f"  {text1[i-1]} ", end="")
        for j in range(n + 1):
            print(f" {dp[i][j]}", end="")
        print()

    length, lcs = lcs_with_string(text1, text2)
    print(f"\nLCS: '{lcs}' (length: {length})")


# Test cases
if __name__ == "__main__":
    test_cases = [
        ("abcde", "ace", 3),
        ("abc", "abc", 3),
        ("abc", "def", 0),
        ("bl", "yby", 1),
        ("AGGTAB", "GXTXAYB", 4),
        ("oxcpqrsvwf", "shmtulqrypy", 2),
        ("", "abc", 0),
        ("abc", "", 0),
        ("abcdefghij", "acegikmno", 5),
    ]

    print("Longest Common Subsequence")
    print("=" * 60)

    for i, (text1, text2, expected) in enumerate(test_cases):
        result1 = longestCommonSubsequence(text1, text2)
        result2 = longestCommonSubsequence_optimized(text1, text2)
        length, lcs_str = lcs_with_string(text1, text2)

        status = "PASS" if result1 == expected else "FAIL"
        print(f"\nTest {i + 1}: '{text1}' vs '{text2}'")
        print(f"  Length: {result1} (expected: {expected}) [{status}]")
        print(f"  LCS string: '{lcs_str}'")

    # Visualize example
    print("\n" + "=" * 60)
    visualize_dp("abcde", "ace")
    visualize_dp("AGGTAB", "GXTXAYB")
