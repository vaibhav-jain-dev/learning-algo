"""
Longest Palindromic Substring

Given a string s, return the longest palindromic substring in s.

Multiple approaches implemented:
1. Expand Around Center - O(n^2) time, O(1) space
2. Dynamic Programming - O(n^2) time, O(n^2) space
3. Manacher's Algorithm - O(n) time, O(n) space
"""


def longest_palindrome_expand(s: str) -> str:
    """
    Find longest palindromic substring using expand around center approach.

    Time Complexity: O(n^2)
    Space Complexity: O(1)
    """
    if not s or len(s) < 1:
        return ""

    start = 0
    max_length = 1

    def expand_around_center(left: int, right: int) -> int:
        """Expand around center and return length of palindrome."""
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1

    for i in range(len(s)):
        # Odd length palindromes (single character center)
        len1 = expand_around_center(i, i)
        # Even length palindromes (between two characters)
        len2 = expand_around_center(i, i + 1)

        length = max(len1, len2)

        if length > max_length:
            max_length = length
            # Calculate starting index
            start = i - (length - 1) // 2

    return s[start:start + max_length]


def longest_palindrome_dp(s: str) -> str:
    """
    Find longest palindromic substring using dynamic programming.

    dp[i][j] = True if s[i:j+1] is a palindrome

    Time Complexity: O(n^2)
    Space Complexity: O(n^2)
    """
    n = len(s)
    if n < 2:
        return s

    # dp[i][j] represents whether s[i:j+1] is a palindrome
    dp = [[False] * n for _ in range(n)]

    start = 0
    max_length = 1

    # All single characters are palindromes
    for i in range(n):
        dp[i][i] = True

    # Check for length 2 palindromes
    for i in range(n - 1):
        if s[i] == s[i + 1]:
            dp[i][i + 1] = True
            start = i
            max_length = 2

    # Check for lengths > 2
    for length in range(3, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1

            # Check if s[i:j+1] is palindrome
            # It is palindrome if s[i] == s[j] and s[i+1:j] is palindrome
            if s[i] == s[j] and dp[i + 1][j - 1]:
                dp[i][j] = True
                if length > max_length:
                    start = i
                    max_length = length

    return s[start:start + max_length]


def longest_palindrome_manacher(s: str) -> str:
    """
    Find longest palindromic substring using Manacher's algorithm.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if not s:
        return ""

    # Transform string: "abc" -> "^#a#b#c#$"
    # ^ and $ are sentinels to avoid bounds checking
    t = "^#" + "#".join(s) + "#$"
    n = len(t)

    # p[i] = radius of palindrome centered at i in transformed string
    p = [0] * n

    center = 0  # Center of rightmost palindrome
    right = 0  # Right edge of rightmost palindrome

    for i in range(1, n - 1):
        # Mirror position
        mirror = 2 * center - i

        if i < right:
            p[i] = min(right - i, p[mirror])

        # Try to expand palindrome centered at i
        while t[i + p[i] + 1] == t[i - p[i] - 1]:
            p[i] += 1

        # Update center and right edge if palindrome at i expands past right
        if i + p[i] > right:
            center = i
            right = i + p[i]

    # Find the maximum element in p
    max_len = max(p)
    center_index = p.index(max_len)

    # Extract the palindrome from original string
    start = (center_index - max_len) // 2
    return s[start:start + max_len]


# Test cases
def run_tests():
    print("=" * 60)
    print("Longest Palindromic Substring - Test Cases")
    print("=" * 60)

    test_cases = [
        ("babad", ["bab", "aba"]),  # Multiple valid answers
        ("cbbd", ["bb"]),
        ("a", ["a"]),
        ("racecar", ["racecar"]),
        ("", [""]),
        ("ac", ["a", "c"]),
        ("abcba", ["abcba"]),
        ("abaaba", ["abaaba"]),
        ("forgeeksskeegfor", ["geeksskeeg"]),
        ("abacdfgdcaba", ["aba"]),
    ]

    methods = [
        ("Expand Around Center", longest_palindrome_expand),
        ("Dynamic Programming", longest_palindrome_dp),
        ("Manacher's Algorithm", longest_palindrome_manacher),
    ]

    all_passed = True

    for method_name, method_func in methods:
        print(f"\n--- Testing {method_name} ---")

        for i, (input_str, expected_list) in enumerate(test_cases, 1):
            result = method_func(input_str)
            passed = result in expected_list

            print(f"\nTest {i}: s = \"{input_str}\"")
            print(f"Result: \"{result}\"")
            print(f"Expected (one of): {expected_list}")

            if passed:
                print("PASSED")
            else:
                # Verify the result is actually a palindrome and has correct length
                is_palindrome = result == result[::-1]
                expected_len = len(expected_list[0])
                has_correct_len = len(result) == expected_len

                if is_palindrome and has_correct_len:
                    print("PASSED (valid alternative answer)")
                else:
                    print("FAILED")
                    all_passed = False

    print("\n" + "=" * 60)
    if all_passed:
        print("All tests passed!")
    else:
        print("Some tests failed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
