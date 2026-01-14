"""
Implement strStr()

Return the index of the first occurrence of needle in haystack, or -1 if not found.

Multiple approaches implemented:
1. Sliding Window (Naive) - O((n-m+1)*m) time
2. Built-in Function - Uses Python's optimized implementation
3. KMP Algorithm - O(n+m) time
"""

from typing import List


def str_str_naive(haystack: str, needle: str) -> int:
    """
    Find first occurrence of needle in haystack using sliding window.

    Time Complexity: O((n-m+1) * m) worst case
    Space Complexity: O(1)
    """
    if not needle:
        return 0

    n = len(haystack)
    m = len(needle)

    if m > n:
        return -1

    for i in range(n - m + 1):
        # Check if needle matches starting at position i
        if haystack[i:i + m] == needle:
            return i

    return -1


def str_str_builtin(haystack: str, needle: str) -> int:
    """
    Find first occurrence using Python's built-in find() method.

    Python's find() is typically implemented using a combination of
    algorithms for optimal performance.
    """
    return haystack.find(needle)


def str_str_kmp(haystack: str, needle: str) -> int:
    """
    Find first occurrence of needle in haystack using KMP algorithm.

    Time Complexity: O(n + m)
    Space Complexity: O(m) for the LPS array
    """
    if not needle:
        return 0

    n = len(haystack)
    m = len(needle)

    if m > n:
        return -1

    # Build LPS (Longest Proper Prefix Suffix) array
    lps = compute_lps(needle)

    i = 0  # Index for haystack
    j = 0  # Index for needle

    while i < n:
        if haystack[i] == needle[j]:
            i += 1
            j += 1

            if j == m:
                return i - j  # Found! Return starting index

        elif j > 0:
            # Mismatch after j matches
            j = lps[j - 1]
        else:
            # No match, move to next character
            i += 1

    return -1


def compute_lps(pattern: str) -> List[int]:
    """
    Compute Longest Proper Prefix Suffix array for KMP algorithm.
    """
    m = len(pattern)
    lps = [0] * m
    length = 0
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1

    return lps


def str_str_two_pointers(haystack: str, needle: str) -> int:
    """
    Find first occurrence using explicit two-pointer approach.

    Time Complexity: O((n-m+1) * m) worst case
    Space Complexity: O(1)
    """
    if not needle:
        return 0

    n = len(haystack)
    m = len(needle)

    if m > n:
        return -1

    for i in range(n - m + 1):
        j = 0
        while j < m and haystack[i + j] == needle[j]:
            j += 1

        if j == m:
            return i

    return -1


# Test cases
def run_tests():
    print("=" * 60)
    print("Implement strStr() - Test Cases")
    print("=" * 60)

    test_cases = [
        ("sadbutsad", "sad", 0),
        ("leetcode", "leeto", -1),
        ("hello", "ll", 2),
        ("aaaaa", "bba", -1),
        ("", "", 0),
        ("", "a", -1),
        ("a", "", 0),
        ("mississippi", "issip", 4),
        ("mississippi", "issipi", -1),
        ("aaa", "aaaa", -1),
        ("abc", "c", 2),
        ("abc", "abc", 0),
        ("abcdef", "def", 3),
        ("AABAACAADAABAAABAA", "AABA", 0),
    ]

    methods = [
        ("Naive Sliding Window", str_str_naive),
        ("Built-in Function", str_str_builtin),
        ("KMP Algorithm", str_str_kmp),
        ("Two Pointers", str_str_two_pointers),
    ]

    all_passed = True

    for method_name, method_func in methods:
        print(f"\n--- Testing {method_name} ---")

        for i, (haystack, needle, expected) in enumerate(test_cases, 1):
            result = method_func(haystack, needle)
            passed = result == expected

            print(f"\nTest {i}: haystack=\"{haystack}\", needle=\"{needle}\"")
            print(f"Result: {result}")
            print(f"Expected: {expected}")

            if passed:
                print("PASSED")
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
