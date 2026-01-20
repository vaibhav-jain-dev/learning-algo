"""
Longest Common Subsequence - Python Solution

Find the longest common subsequence of two strings.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
"""

from typing import List


def longest_common_subsequence(str1: str, str2: str) -> List[str]:
    """
    Find the longest common subsequence using bottom-up DP.

    Args:
        str1: First string
        str2: Second string

    Returns:
        List of characters forming the LCS
    """
    if not str1 or not str2:
        return []

    m, n = len(str1), len(str2)

    # Create DP table
    # dp[i][j] = length of LCS for str1[0:i] and str2[0:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill the DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                # Characters match, extend LCS
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                # Take the max from excluding one character
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Backtrack to reconstruct the LCS
    lcs = []
    i, j = m, n

    while i > 0 and j > 0:
        if str1[i - 1] == str2[j - 1]:
            # This character is part of LCS
            lcs.append(str1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            # Move up
            i -= 1
        else:
            # Move left
            j -= 1

    lcs.reverse()
    return lcs


def lcs_length(str1: str, str2: str) -> int:
    """
    Return only the length of LCS (simpler version).

    Args:
        str1: First string
        str2: Second string

    Returns:
        Length of the longest common subsequence
    """
    if not str1 or not str2:
        return 0

    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]


def lcs_length_optimized(str1: str, str2: str) -> int:
    """
    Space-optimized version using only two rows.

    Args:
        str1: First string
        str2: Second string

    Returns:
        Length of the longest common subsequence
    """
    if not str1 or not str2:
        return 0

    # Use the shorter string for columns
    if len(str1) < len(str2):
        str1, str2 = str2, str1

    m, n = len(str1), len(str2)

    prev = [0] * (n + 1)
    curr = [0] * (n + 1)

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                curr[j] = prev[j - 1] + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])

        prev, curr = curr, prev

    return prev[n]


def lcs_recursive(str1: str, str2: str) -> List[str]:
    """
    Top-down recursive approach with memoization.

    Args:
        str1: First string
        str2: Second string

    Returns:
        List of characters forming the LCS
    """
    if not str1 or not str2:
        return []

    memo = {}

    def dp(i: int, j: int) -> int:
        """Returns LCS length for str1[0:i] and str2[0:j]."""
        if i == 0 or j == 0:
            return 0

        if (i, j) in memo:
            return memo[(i, j)]

        if str1[i - 1] == str2[j - 1]:
            result = dp(i - 1, j - 1) + 1
        else:
            result = max(dp(i - 1, j), dp(i, j - 1))

        memo[(i, j)] = result
        return result

    m, n = len(str1), len(str2)
    dp(m, n)  # Fill memo table

    # Backtrack to reconstruct
    lcs = []
    i, j = m, n

    while i > 0 and j > 0:
        if str1[i - 1] == str2[j - 1]:
            lcs.append(str1[i - 1])
            i -= 1
            j -= 1
        elif memo.get((i - 1, j), 0) > memo.get((i, j - 1), 0):
            i -= 1
        else:
            j -= 1

    lcs.reverse()
    return lcs


def all_lcs(str1: str, str2: str) -> List[List[str]]:
    """
    Find all longest common subsequences.

    Args:
        str1: First string
        str2: Second string

    Returns:
        List of all LCS (as character lists)
    """
    if not str1 or not str2:
        return [[]]

    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    def backtrack(i: int, j: int) -> List[List[str]]:
        if i == 0 or j == 0:
            return [[]]

        if str1[i - 1] == str2[j - 1]:
            results = []
            for seq in backtrack(i - 1, j - 1):
                results.append(seq + [str1[i - 1]])
            return results
        else:
            results = []
            if dp[i - 1][j] >= dp[i][j - 1]:
                results.extend(backtrack(i - 1, j))
            if dp[i][j - 1] >= dp[i - 1][j]:
                results.extend(backtrack(i, j - 1))
            # Remove duplicates
            seen = set()
            unique = []
            for seq in results:
                key = tuple(seq)
                if key not in seen:
                    seen.add(key)
                    unique.append(seq)
            return unique

    return backtrack(m, n)


def lcs_string(str1: str, str2: str) -> str:
    """
    Return LCS as a string instead of list.

    Args:
        str1: First string
        str2: Second string

    Returns:
        LCS as a string
    """
    return ''.join(longest_common_subsequence(str1, str2))


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    s1, s2 = "ZXVVYZW", "XKYKZPW"
    result = longest_common_subsequence(s1, s2)
    print(f"Test 1: '{s1}' and '{s2}'")
    print(f"  LCS: {result} (length {len(result)})")
    # Expected: ['X', 'Y', 'Z', 'W'] or equivalent

    # Test 2: Another case
    s1, s2 = "ABCDGH", "AEDFHR"
    result = longest_common_subsequence(s1, s2)
    print(f"\nTest 2: '{s1}' and '{s2}'")
    print(f"  LCS: {result} (length {len(result)})")
    # Expected: ['A', 'D', 'H']

    # Test 3: No common subsequence
    s1, s2 = "ABC", "DEF"
    result = longest_common_subsequence(s1, s2)
    print(f"\nTest 3: '{s1}' and '{s2}'")
    print(f"  LCS: {result} (length {len(result)})")
    # Expected: []

    # Test 4: One empty string
    s1, s2 = "", "ABC"
    result = longest_common_subsequence(s1, s2)
    print(f"\nTest 4: '{s1}' and '{s2}'")
    print(f"  LCS: {result} (length {len(result)})")
    # Expected: []

    # Test 5: Same strings
    s1, s2 = "ABCDE", "ABCDE"
    result = longest_common_subsequence(s1, s2)
    print(f"\nTest 5: '{s1}' and '{s2}'")
    print(f"  LCS: {result} (length {len(result)})")
    # Expected: ['A', 'B', 'C', 'D', 'E']

    # Test 6: Compare all methods
    s1, s2 = "AGGTAB", "GXTXAYB"
    print(f"\nTest 6 - Method comparison for '{s1}' and '{s2}':")
    print(f"  Bottom-up: {longest_common_subsequence(s1, s2)}")
    print(f"  Recursive: {lcs_recursive(s1, s2)}")
    print(f"  Length: {lcs_length(s1, s2)}")
    print(f"  Optimized length: {lcs_length_optimized(s1, s2)}")
    print(f"  As string: '{lcs_string(s1, s2)}'")

    # Test 7: All LCS
    s1, s2 = "ABCBDAB", "BDCAB"
    all_results = all_lcs(s1, s2)
    print(f"\nTest 7 - All LCS for '{s1}' and '{s2}':")
    for seq in all_results:
        print(f"  {''.join(seq)}")

    # Test 8: Lowercase strings
    s1, s2 = "programming", "gaming"
    result = longest_common_subsequence(s1, s2)
    print(f"\nTest 8: '{s1}' and '{s2}'")
    print(f"  LCS: {result} = '{''.join(result)}'")

    print("\nAll tests completed!")
