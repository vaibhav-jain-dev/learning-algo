"""
Interweaving Strings - Python Solution

Check if string three can be formed by interweaving strings one and two.
"""

from typing import Dict, Tuple


def interweaving_strings(one: str, two: str, three: str) -> bool:
    """
    Check if three is an interweaving of one and two using DP.

    Args:
        one: First string
        two: Second string
        three: Target string to check

    Returns:
        True if three can be formed by interweaving one and two

    Example:
        >>> interweaving_strings("abc", "def", "adbecf")
        True
    """
    # Quick length check
    if len(one) + len(two) != len(three):
        return False

    # dp[i][j] = can first i chars of one and first j chars of two
    #            form first i+j chars of three?
    dp = [[False] * (len(two) + 1) for _ in range(len(one) + 1)]

    # Base case: empty strings form empty string
    dp[0][0] = True

    # Fill first row (using only chars from two)
    for j in range(1, len(two) + 1):
        dp[0][j] = dp[0][j-1] and two[j-1] == three[j-1]

    # Fill first column (using only chars from one)
    for i in range(1, len(one) + 1):
        dp[i][0] = dp[i-1][0] and one[i-1] == three[i-1]

    # Fill rest of the table
    for i in range(1, len(one) + 1):
        for j in range(1, len(two) + 1):
            k = i + j - 1  # Current position in three

            # Option 1: take from one
            from_one = dp[i-1][j] and one[i-1] == three[k]

            # Option 2: take from two
            from_two = dp[i][j-1] and two[j-1] == three[k]

            dp[i][j] = from_one or from_two

    return dp[len(one)][len(two)]


def interweaving_strings_recursive(one: str, two: str, three: str) -> bool:
    """
    Check using memoized recursion.
    """
    if len(one) + len(two) != len(three):
        return False

    memo: Dict[Tuple[int, int], bool] = {}

    def can_interweave(i: int, j: int) -> bool:
        """Check if one[i:] and two[j:] can form three[i+j:]."""
        k = i + j

        # Base case: all characters matched
        if k == len(three):
            return True

        if (i, j) in memo:
            return memo[(i, j)]

        result = False

        # Try taking from one
        if i < len(one) and one[i] == three[k]:
            result = can_interweave(i + 1, j)

        # Try taking from two
        if not result and j < len(two) and two[j] == three[k]:
            result = can_interweave(i, j + 1)

        memo[(i, j)] = result
        return result

    return can_interweave(0, 0)


def interweaving_strings_space_optimized(one: str, two: str, three: str) -> bool:
    """
    Space-optimized DP using O(min(n, m)) space.
    """
    if len(one) + len(two) != len(three):
        return False

    # Ensure one is the shorter string for space optimization
    if len(one) > len(two):
        one, two = two, one

    # dp[j] = can we form three[0:i+j] using one[0:i] and two[0:j]?
    dp = [False] * (len(two) + 1)
    dp[0] = True

    # Initialize: using only chars from two
    for j in range(1, len(two) + 1):
        dp[j] = dp[j-1] and two[j-1] == three[j-1]

    # Fill row by row
    for i in range(1, len(one) + 1):
        # Update first column (using only chars from one)
        dp[0] = dp[0] and one[i-1] == three[i-1]

        for j in range(1, len(two) + 1):
            k = i + j - 1

            from_one = dp[j] and one[i-1] == three[k]
            from_two = dp[j-1] and two[j-1] == three[k]

            dp[j] = from_one or from_two

    return dp[len(two)]


if __name__ == "__main__":
    # Test case 1
    one1, two1, three1 = "aabcc", "dbbca", "aadbbcbcac"
    print(f"One: '{one1}', Two: '{two1}', Three: '{three1}'")
    print(f"DP:        {interweaving_strings(one1, two1, three1)}")
    print(f"Recursive: {interweaving_strings_recursive(one1, two1, three1)}")
    print(f"Optimized: {interweaving_strings_space_optimized(one1, two1, three1)}")

    # Test case 2
    one2, two2, three2 = "aab", "aac", "aaabac"
    print(f"\nOne: '{one2}', Two: '{two2}', Three: '{three2}'")
    print(f"Result: {interweaving_strings(one2, two2, three2)}")

    # Test case 3
    one3, two3, three3 = "abc", "def", "adbecf"
    print(f"\nOne: '{one3}', Two: '{two3}', Three: '{three3}'")
    print(f"Result: {interweaving_strings(one3, two3, three3)}")

    # Test case 4: Length mismatch
    one4, two4, three4 = "abc", "def", "abcdefg"
    print(f"\nOne: '{one4}', Two: '{two4}', Three: '{three4}'")
    print(f"Result: {interweaving_strings(one4, two4, three4)}")

    # Test case 5: Empty strings
    one5, two5, three5 = "", "abc", "abc"
    print(f"\nOne: '{one5}', Two: '{two5}', Three: '{three5}'")
    print(f"Result: {interweaving_strings(one5, two5, three5)}")
