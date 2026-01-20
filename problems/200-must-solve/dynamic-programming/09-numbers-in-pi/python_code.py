"""
Numbers in Pi - Python Solution

Find the minimum number of spaces needed to split Pi string into numbers
that all exist in the given list.

Time Complexity: O(n^2 * m) where n is length of pi, m is max number length
Space Complexity: O(n + k) where k is total characters in numbers list
"""

from typing import List, Optional


def numbers_in_pi(pi: str, numbers: List[str]) -> int:
    """
    Find minimum spaces to split pi into valid numbers using bottom-up DP.

    Args:
        pi: String of digits
        numbers: List of valid number strings

    Returns:
        Minimum number of spaces needed, or -1 if impossible
    """
    if not pi:
        return 0 if not numbers else -1

    # Create a set for O(1) lookup
    number_set = set(numbers)

    n = len(pi)

    # dp[i] = minimum numbers needed to split pi[i:]
    # We use float('inf') to indicate impossible
    dp = [float('inf')] * (n + 1)
    dp[n] = 0  # Base case: empty string needs 0 numbers

    # Fill DP table from right to left
    for i in range(n - 1, -1, -1):
        # Try all possible prefixes starting at i
        for j in range(i, n):
            prefix = pi[i:j + 1]

            if prefix in number_set:
                # If this prefix is valid and rest can be split
                if dp[j + 1] != float('inf'):
                    dp[i] = min(dp[i], dp[j + 1] + 1)

    # dp[0] is the number of segments; spaces = segments - 1
    if dp[0] == float('inf'):
        return -1

    return dp[0] - 1


def numbers_in_pi_recursive(pi: str, numbers: List[str]) -> int:
    """
    Top-down recursive approach with memoization.

    Args:
        pi: String of digits
        numbers: List of valid number strings

    Returns:
        Minimum number of spaces needed, or -1 if impossible
    """
    if not pi:
        return 0 if not numbers else -1

    number_set = set(numbers)
    n = len(pi)
    memo = {}

    def dp(i: int) -> int:
        """Returns minimum numbers needed to split pi[i:]."""
        if i == n:
            return 0

        if i in memo:
            return memo[i]

        result = float('inf')

        for j in range(i, n):
            prefix = pi[i:j + 1]

            if prefix in number_set:
                rest = dp(j + 1)
                if rest != float('inf'):
                    result = min(result, rest + 1)

        memo[i] = result
        return result

    result = dp(0)

    if result == float('inf'):
        return -1

    return result - 1


def numbers_in_pi_with_splits(pi: str, numbers: List[str]) -> tuple:
    """
    Return both the minimum spaces and one valid split.

    Args:
        pi: String of digits
        numbers: List of valid number strings

    Returns:
        Tuple of (min_spaces, list_of_numbers) or (-1, []) if impossible
    """
    if not pi:
        return (0, []) if not numbers else (-1, [])

    number_set = set(numbers)
    n = len(pi)

    # dp[i] = (min_numbers, next_split_end) for pi[i:]
    dp = [None] * (n + 1)
    dp[n] = (0, -1)

    for i in range(n - 1, -1, -1):
        best = float('inf')
        best_j = -1

        for j in range(i, n):
            prefix = pi[i:j + 1]

            if prefix in number_set:
                if dp[j + 1] is not None and dp[j + 1][0] != float('inf'):
                    if dp[j + 1][0] + 1 < best:
                        best = dp[j + 1][0] + 1
                        best_j = j + 1

        if best != float('inf'):
            dp[i] = (best, best_j)

    if dp[0] is None:
        return (-1, [])

    # Reconstruct the split
    splits = []
    i = 0
    while i < n:
        next_i = dp[i][1]
        splits.append(pi[i:next_i])
        i = next_i

    return (dp[0][0] - 1, splits)


def numbers_in_pi_all_solutions(pi: str, numbers: List[str]) -> List[List[str]]:
    """
    Return all valid ways to split pi with minimum spaces.

    Args:
        pi: String of digits
        numbers: List of valid number strings

    Returns:
        List of all optimal splits (each split is a list of number strings)
    """
    if not pi:
        return [[]] if not numbers else []

    number_set = set(numbers)
    n = len(pi)

    # First pass: compute minimum numbers needed
    dp = [float('inf')] * (n + 1)
    dp[n] = 0

    for i in range(n - 1, -1, -1):
        for j in range(i, n):
            prefix = pi[i:j + 1]
            if prefix in number_set and dp[j + 1] != float('inf'):
                dp[i] = min(dp[i], dp[j + 1] + 1)

    if dp[0] == float('inf'):
        return []

    # Second pass: collect all solutions with minimum splits
    def collect(i: int, current: List[str]) -> List[List[str]]:
        if i == n:
            return [current[:]]

        results = []
        for j in range(i, n):
            prefix = pi[i:j + 1]
            if prefix in number_set:
                expected = dp[i] - 1
                if dp[j + 1] == expected:
                    current.append(prefix)
                    results.extend(collect(j + 1, current))
                    current.pop()

        return results

    return collect(0, [])


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    pi1 = "3141592653589793238462643383279"
    nums1 = ["314159265358979323846", "26433", "8", "3279",
             "314159265", "35897932384626433832", "79"]
    result1 = numbers_in_pi(pi1, nums1)
    print(f"Test 1: pi = '{pi1[:20]}...'")
    print(f"  Result: {result1}")
    # Expected: 2

    # Test 2: Simple case
    pi2 = "314159"
    nums2 = ["314", "159", "3141", "59"]
    result2 = numbers_in_pi(pi2, nums2)
    print(f"\nTest 2: pi = '{pi2}'")
    print(f"  Numbers: {nums2}")
    print(f"  Result: {result2}")
    # Expected: 1

    # Test 3: Sequential split
    pi3 = "123456"
    nums3 = ["12", "34", "56"]
    result3 = numbers_in_pi(pi3, nums3)
    print(f"\nTest 3: pi = '{pi3}'")
    print(f"  Numbers: {nums3}")
    print(f"  Result: {result3}")
    # Expected: 2

    # Test 4: Impossible
    pi4 = "12345"
    nums4 = ["12", "56"]
    result4 = numbers_in_pi(pi4, nums4)
    print(f"\nTest 4: pi = '{pi4}'")
    print(f"  Numbers: {nums4}")
    print(f"  Result: {result4}")
    # Expected: -1

    # Test 5: Single number
    pi5 = "12345"
    nums5 = ["12345"]
    result5 = numbers_in_pi(pi5, nums5)
    print(f"\nTest 5: pi = '{pi5}'")
    print(f"  Numbers: {nums5}")
    print(f"  Result: {result5}")
    # Expected: 0

    # Test 6: Compare methods
    pi6 = "314159"
    nums6 = ["314", "159", "3141", "59"]
    print(f"\nTest 6 - Method comparison for '{pi6}':")
    print(f"  Bottom-up: {numbers_in_pi(pi6, nums6)}")
    print(f"  Recursive: {numbers_in_pi_recursive(pi6, nums6)}")

    # Test 7: Get actual splits
    pi7 = "314159"
    nums7 = ["314", "159", "3141", "59"]
    spaces, splits = numbers_in_pi_with_splits(pi7, nums7)
    print(f"\nTest 7 - With splits for '{pi7}':")
    print(f"  Min spaces: {spaces}")
    print(f"  Split: {splits}")

    # Test 8: All solutions
    pi8 = "314159"
    nums8 = ["314", "159", "3141", "59"]
    all_sols = numbers_in_pi_all_solutions(pi8, nums8)
    print(f"\nTest 8 - All solutions for '{pi8}':")
    for sol in all_sols:
        print(f"  {sol}")

    # Test 9: Empty input
    pi9 = ""
    nums9 = ["12"]
    result9 = numbers_in_pi(pi9, nums9)
    print(f"\nTest 9: pi = '' (empty)")
    print(f"  Result: {result9}")
    # Expected: 0

    print("\nAll tests completed!")
