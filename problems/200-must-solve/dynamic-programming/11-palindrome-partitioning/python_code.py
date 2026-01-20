"""
Palindrome Partitioning Min Cuts - Python Solution

Find the minimum number of cuts needed to partition a string such that
each partition is a palindrome.

Time Complexity: O(n^2)
Space Complexity: O(n^2)
"""

from typing import List, Tuple


def palindrome_partitioning_min_cuts(string: str) -> int:
    """
    Find minimum cuts for palindrome partitioning using bottom-up DP.

    Args:
        string: Input string

    Returns:
        Minimum number of cuts needed
    """
    if not string or len(string) <= 1:
        return 0

    n = len(string)

    # Step 1: Build palindrome table
    # is_palindrome[i][j] = True if string[i:j+1] is a palindrome
    is_palindrome = [[False] * n for _ in range(n)]

    # All single characters are palindromes
    for i in range(n):
        is_palindrome[i][i] = True

    # Check for palindromes of length 2+
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1

            if length == 2:
                is_palindrome[i][j] = (string[i] == string[j])
            else:
                is_palindrome[i][j] = (string[i] == string[j] and
                                       is_palindrome[i + 1][j - 1])

    # Step 2: Build cuts table
    # cuts[i] = minimum cuts for string[0:i+1]
    cuts = [0] * n

    for i in range(n):
        if is_palindrome[0][i]:
            # Entire prefix is palindrome, no cuts needed
            cuts[i] = 0
        else:
            # Start with worst case: cut before every character
            cuts[i] = i

            # Try all positions j where string[j:i+1] is palindrome
            for j in range(1, i + 1):
                if is_palindrome[j][i]:
                    cuts[i] = min(cuts[i], cuts[j - 1] + 1)

    return cuts[n - 1]


def palindrome_partitioning_optimized(string: str) -> int:
    """
    Optimized version that builds palindrome table on the fly.

    Args:
        string: Input string

    Returns:
        Minimum number of cuts needed
    """
    if not string or len(string) <= 1:
        return 0

    n = len(string)

    # cuts[i] = min cuts for string[0:i]
    # cuts[0] = -1 is a sentinel for empty prefix
    cuts = list(range(-1, n))

    # Expand around each center
    for center in range(n):
        # Odd length palindromes
        left, right = center, center
        while left >= 0 and right < n and string[left] == string[right]:
            cuts[right + 1] = min(cuts[right + 1], cuts[left] + 1)
            left -= 1
            right += 1

        # Even length palindromes
        left, right = center, center + 1
        while left >= 0 and right < n and string[left] == string[right]:
            cuts[right + 1] = min(cuts[right + 1], cuts[left] + 1)
            left -= 1
            right += 1

    return cuts[n]


def palindrome_partitioning_recursive(string: str) -> int:
    """
    Top-down recursive approach with memoization.

    Args:
        string: Input string

    Returns:
        Minimum number of cuts needed
    """
    if not string or len(string) <= 1:
        return 0

    n = len(string)

    # Precompute palindrome table
    is_palindrome = [[False] * n for _ in range(n)]
    for i in range(n):
        is_palindrome[i][i] = True
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if length == 2:
                is_palindrome[i][j] = (string[i] == string[j])
            else:
                is_palindrome[i][j] = (string[i] == string[j] and
                                       is_palindrome[i + 1][j - 1])

    memo = {}

    def dp(start: int) -> int:
        """Returns min cuts for string[start:]."""
        if start >= n:
            return -1  # No cut needed for empty string

        if is_palindrome[start][n - 1]:
            return 0  # Remaining string is palindrome

        if start in memo:
            return memo[start]

        result = n - start - 1  # Worst case

        for end in range(start, n):
            if is_palindrome[start][end]:
                result = min(result, 1 + dp(end + 1))

        memo[start] = result
        return result

    return dp(0)


def palindrome_partitioning_with_result(string: str) -> Tuple[int, List[str]]:
    """
    Return both the minimum cuts and one valid partition.

    Args:
        string: Input string

    Returns:
        Tuple of (min_cuts, list of palindrome partitions)
    """
    if not string:
        return (0, [])

    if len(string) == 1:
        return (0, [string])

    n = len(string)

    # Build palindrome table
    is_palindrome = [[False] * n for _ in range(n)]
    for i in range(n):
        is_palindrome[i][i] = True
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if length == 2:
                is_palindrome[i][j] = (string[i] == string[j])
            else:
                is_palindrome[i][j] = (string[i] == string[j] and
                                       is_palindrome[i + 1][j - 1])

    # Build cuts table with backtracking info
    cuts = [0] * n
    cut_points = [-1] * n  # Where the last cut was made

    for i in range(n):
        if is_palindrome[0][i]:
            cuts[i] = 0
            cut_points[i] = -1
        else:
            cuts[i] = i
            cut_points[i] = i - 1

            for j in range(1, i + 1):
                if is_palindrome[j][i] and cuts[j - 1] + 1 < cuts[i]:
                    cuts[i] = cuts[j - 1] + 1
                    cut_points[i] = j - 1

    # Reconstruct partition
    partitions = []
    i = n - 1
    while i >= 0:
        if cut_points[i] == -1:
            partitions.append(string[0:i + 1])
            break
        else:
            partitions.append(string[cut_points[i] + 1:i + 1])
            i = cut_points[i]

    partitions.reverse()

    return (cuts[n - 1], partitions)


def all_palindrome_partitions(string: str) -> List[List[str]]:
    """
    Return all possible palindrome partitions (not just minimum).

    Args:
        string: Input string

    Returns:
        List of all valid partitions
    """
    if not string:
        return [[]]

    n = len(string)
    result = []

    def is_palindrome(s: str) -> bool:
        return s == s[::-1]

    def backtrack(start: int, current: List[str]):
        if start >= n:
            result.append(current[:])
            return

        for end in range(start + 1, n + 1):
            substring = string[start:end]
            if is_palindrome(substring):
                current.append(substring)
                backtrack(end, current)
                current.pop()

    backtrack(0, [])
    return result


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    s1 = "noonabbad"
    result1 = palindrome_partitioning_min_cuts(s1)
    print(f"Test 1: '{s1}'")
    print(f"  Min cuts: {result1}")
    # Expected: 2 ("noon" | "abba" | "d")

    # Test 2: Simple case
    s2 = "aab"
    result2 = palindrome_partitioning_min_cuts(s2)
    print(f"\nTest 2: '{s2}'")
    print(f"  Min cuts: {result2}")
    # Expected: 1 ("aa" | "b")

    # Test 3: Already palindrome
    s3 = "aba"
    result3 = palindrome_partitioning_min_cuts(s3)
    print(f"\nTest 3: '{s3}'")
    print(f"  Min cuts: {result3}")
    # Expected: 0

    # Test 4: All different characters
    s4 = "abcde"
    result4 = palindrome_partitioning_min_cuts(s4)
    print(f"\nTest 4: '{s4}'")
    print(f"  Min cuts: {result4}")
    # Expected: 4

    # Test 5: Single character
    s5 = "a"
    result5 = palindrome_partitioning_min_cuts(s5)
    print(f"\nTest 5: '{s5}'")
    print(f"  Min cuts: {result5}")
    # Expected: 0

    # Test 6: Compare methods
    s6 = "noonabbad"
    print(f"\nTest 6 - Method comparison for '{s6}':")
    print(f"  Standard: {palindrome_partitioning_min_cuts(s6)}")
    print(f"  Optimized: {palindrome_partitioning_optimized(s6)}")
    print(f"  Recursive: {palindrome_partitioning_recursive(s6)}")

    # Test 7: Get actual partition
    s7 = "noonabbad"
    cuts, partition = palindrome_partitioning_with_result(s7)
    print(f"\nTest 7 - With partition for '{s7}':")
    print(f"  Min cuts: {cuts}")
    print(f"  Partition: {partition}")

    # Test 8: All partitions
    s8 = "aab"
    all_parts = all_palindrome_partitions(s8)
    print(f"\nTest 8 - All partitions for '{s8}':")
    for p in all_parts:
        print(f"  {p}")

    # Test 9: Longer palindrome
    s9 = "abacaba"
    result9 = palindrome_partitioning_min_cuts(s9)
    cuts9, partition9 = palindrome_partitioning_with_result(s9)
    print(f"\nTest 9: '{s9}'")
    print(f"  Min cuts: {result9}")
    print(f"  Partition: {partition9}")
    # Expected: 0 (entire string is palindrome)

    print("\nAll tests completed!")
