"""
Levenshtein Distance (Edit Distance) - Python Solution

Find the minimum number of operations (insert, delete, replace) to transform
one string into another.

Time Complexity: O(m * n)
Space Complexity: O(m * n), optimized to O(min(m, n))
"""


def levenshtein_distance(str1: str, str2: str) -> int:
    """
    Calculate the Levenshtein distance using bottom-up DP.

    Args:
        str1: Source string
        str2: Target string

    Returns:
        int: Minimum edit operations needed
    """
    m, n = len(str1), len(str2)

    # Create DP table
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases: transforming empty string
    for i in range(m + 1):
        dp[i][0] = i  # Delete all characters from str1
    for j in range(n + 1):
        dp[0][j] = j  # Insert all characters to empty str1

    # Fill the DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                # Characters match, no operation needed
                dp[i][j] = dp[i - 1][j - 1]
            else:
                # Take minimum of three operations
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # Delete from str1
                    dp[i][j - 1],      # Insert into str1
                    dp[i - 1][j - 1]   # Replace in str1
                )

    return dp[m][n]


def levenshtein_distance_optimized(str1: str, str2: str) -> int:
    """
    Space-optimized version using only two rows.

    Args:
        str1: Source string
        str2: Target string

    Returns:
        int: Minimum edit operations needed
    """
    # Ensure str2 is the shorter string for space optimization
    if len(str1) < len(str2):
        str1, str2 = str2, str1

    m, n = len(str1), len(str2)

    # Only need two rows
    prev = list(range(n + 1))
    curr = [0] * (n + 1)

    for i in range(1, m + 1):
        curr[0] = i  # Base case for current row

        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                curr[j] = prev[j - 1]
            else:
                curr[j] = 1 + min(prev[j], curr[j - 1], prev[j - 1])

        # Swap rows
        prev, curr = curr, prev

    return prev[n]


def levenshtein_distance_recursive(str1: str, str2: str) -> int:
    """
    Top-down recursive approach with memoization.

    Args:
        str1: Source string
        str2: Target string

    Returns:
        int: Minimum edit operations needed
    """
    memo = {}

    def dp(i: int, j: int) -> int:
        """Helper function to compute edit distance for str1[0:i] and str2[0:j]."""
        # Base cases
        if i == 0:
            return j  # Insert all remaining characters
        if j == 0:
            return i  # Delete all remaining characters

        if (i, j) in memo:
            return memo[(i, j)]

        if str1[i - 1] == str2[j - 1]:
            result = dp(i - 1, j - 1)
        else:
            result = 1 + min(
                dp(i - 1, j),      # Delete
                dp(i, j - 1),      # Insert
                dp(i - 1, j - 1)   # Replace
            )

        memo[(i, j)] = result
        return result

    return dp(len(str1), len(str2))


def get_edit_operations(str1: str, str2: str) -> list:
    """
    Return the actual sequence of edit operations.

    Args:
        str1: Source string
        str2: Target string

    Returns:
        list: List of tuples describing operations
    """
    m, n = len(str1), len(str2)

    # Build DP table
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])

    # Backtrack to find operations
    operations = []
    i, j = m, n

    while i > 0 or j > 0:
        if i > 0 and j > 0 and str1[i - 1] == str2[j - 1]:
            i -= 1
            j -= 1
        elif i > 0 and j > 0 and dp[i][j] == dp[i - 1][j - 1] + 1:
            operations.append(('replace', i - 1, str1[i - 1], str2[j - 1]))
            i -= 1
            j -= 1
        elif j > 0 and dp[i][j] == dp[i][j - 1] + 1:
            operations.append(('insert', i, str2[j - 1]))
            j -= 1
        else:
            operations.append(('delete', i - 1, str1[i - 1]))
            i -= 1

    return list(reversed(operations))


# Test cases
if __name__ == "__main__":
    # Test 1: Basic case
    s1, s2 = "abc", "yabd"
    result = levenshtein_distance(s1, s2)
    print(f"Test 1: '{s1}' -> '{s2}' = {result}")  # Expected: 2

    # Test 2: Classic example
    s1, s2 = "horse", "ros"
    result = levenshtein_distance(s1, s2)
    print(f"Test 2: '{s1}' -> '{s2}' = {result}")  # Expected: 3

    # Test 3: Empty string
    s1, s2 = "", "abc"
    result = levenshtein_distance(s1, s2)
    print(f"Test 3: '{s1}' -> '{s2}' = {result}")  # Expected: 3

    # Test 4: Same strings
    s1, s2 = "hello", "hello"
    result = levenshtein_distance(s1, s2)
    print(f"Test 4: '{s1}' -> '{s2}' = {result}")  # Expected: 0

    # Test 5: Completely different
    s1, s2 = "abc", "xyz"
    result = levenshtein_distance(s1, s2)
    print(f"Test 5: '{s1}' -> '{s2}' = {result}")  # Expected: 3

    # Test 6: Compare all methods
    s1, s2 = "intention", "execution"
    print(f"\nTest 6 - Method comparison for '{s1}' -> '{s2}':")
    print(f"  Bottom-up: {levenshtein_distance(s1, s2)}")
    print(f"  Optimized: {levenshtein_distance_optimized(s1, s2)}")
    print(f"  Recursive: {levenshtein_distance_recursive(s1, s2)}")

    # Test 7: Get actual operations
    s1, s2 = "cat", "cut"
    ops = get_edit_operations(s1, s2)
    print(f"\nTest 7 - Operations for '{s1}' -> '{s2}':")
    for op in ops:
        print(f"  {op}")

    # Test 8: Longer example with operations
    s1, s2 = "saturday", "sunday"
    distance = levenshtein_distance(s1, s2)
    ops = get_edit_operations(s1, s2)
    print(f"\nTest 8 - '{s1}' -> '{s2}':")
    print(f"  Distance: {distance}")
    print(f"  Operations: {ops}")

    print("\nAll tests completed!")
