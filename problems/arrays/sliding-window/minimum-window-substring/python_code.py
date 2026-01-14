"""
Minimum Window Substring

Given two strings s and t, return the minimum window substring of s such that
every character in t (including duplicates) is included in the window.

Time Complexity: O(|s| + |t|)
Space Complexity: O(|s| + |t|)
"""

from collections import Counter, defaultdict


def min_window(s: str, t: str) -> str:
    """
    Find the minimum window substring of s containing all characters of t.

    Args:
        s: Source string to search in
        t: Target string containing required characters

    Returns:
        Minimum window substring, or empty string if not found
    """
    if not s or not t or len(s) < len(t):
        return ""

    # Count frequency of each character in t
    t_count = Counter(t)
    required = len(t_count)  # Number of unique characters in t

    # Window frequency map
    window_count = defaultdict(int)

    # Number of unique chars in current window with required frequency
    formed = 0

    # Result: (window length, left, right)
    result = (float('inf'), 0, 0)

    left = 0

    for right in range(len(s)):
        # Add character from right to window
        char = s[right]
        window_count[char] += 1

        # Check if current character's frequency matches required frequency
        if char in t_count and window_count[char] == t_count[char]:
            formed += 1

        # Try to contract the window until it's no longer valid
        while left <= right and formed == required:
            char = s[left]

            # Update result if this window is smaller
            if right - left + 1 < result[0]:
                result = (right - left + 1, left, right)

            # Remove leftmost character from window
            window_count[char] -= 1
            if char in t_count and window_count[char] < t_count[char]:
                formed -= 1

            left += 1

    return "" if result[0] == float('inf') else s[result[1]:result[2] + 1]


def min_window_simple(s: str, t: str) -> str:
    """
    Simpler but slightly less efficient approach.
    Uses a helper function to check if window is valid.

    Args:
        s: Source string to search in
        t: Target string containing required characters

    Returns:
        Minimum window substring, or empty string if not found
    """
    if not s or not t or len(s) < len(t):
        return ""

    t_count = Counter(t)
    window_count = defaultdict(int)

    def is_valid():
        """Check if current window contains all chars of t."""
        for char, count in t_count.items():
            if window_count[char] < count:
                return False
        return True

    min_len = float('inf')
    min_start = 0
    left = 0

    for right in range(len(s)):
        window_count[s[right]] += 1

        while is_valid():
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_start = left

            window_count[s[left]] -= 1
            left += 1

    return "" if min_len == float('inf') else s[min_start:min_start + min_len]


def run_tests():
    """Run test cases to verify the solution."""

    test_cases = [
        # (s, t, expected)
        ("ADOBECODEBANC", "ABC", "BANC"),
        ("a", "a", "a"),
        ("a", "aa", ""),
        ("cabwefgewcwaefgcf", "cae", "cwae"),
        ("aa", "aa", "aa"),
        ("bba", "ab", "ba"),
        ("abc", "b", "b"),
        ("ab", "b", "b"),
        ("bdab", "ab", "ab"),
        ("aaaaaaaaaaaabbbbbcdd", "abcdd", "abbbbbcdd"),
    ]

    print("Testing Minimum Window Substring")
    print("=" * 60)

    all_passed = True

    for i, (s, t, expected) in enumerate(test_cases, 1):
        result = min_window(s, t)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"Test {i}: {status}")
        print(f"  s = \"{s}\"")
        print(f"  t = \"{t}\"")
        print(f"  Expected: \"{expected}\", Got: \"{result}\"")
        print()

    # Verify simple approach gives same results
    print("Verifying simple approach matches optimized approach...")
    for s, t, expected in test_cases:
        opt_result = min_window(s, t)
        simple_result = min_window_simple(s, t)
        if opt_result != simple_result:
            print(f"  Mismatch! Optimized=\"{opt_result}\", Simple=\"{simple_result}\"")
            all_passed = False
    print("  All approaches give matching results!")
    print()

    if all_passed:
        print("All tests PASSED!")
    else:
        print("Some tests FAILED!")

    return all_passed


if __name__ == "__main__":
    run_tests()
