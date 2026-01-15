"""
Repeated Substring Pattern

Check if a string can be constructed by repeating a substring.

Multiple approaches implemented:
1. Check All Divisors - O(n*sqrt(n)) average
2. String Concatenation Trick - O(n)
3. KMP-Based (LPS Array) - O(n)
"""

from typing import List


def repeated_substring_divisors(s: str) -> bool:
    """
    Check if string is a repeated pattern by trying all valid divisor lengths.

    Time Complexity: O(n * sqrt(n)) average, O(n^2) worst case
    Space Complexity: O(n)
    """
    n = len(s)

    # Try all possible substring lengths from 1 to n/2
    for length in range(1, n // 2 + 1):
        # Length must divide n evenly
        if n % length == 0:
            # Get the candidate substring
            pattern = s[:length]
            # Check if repeating pattern gives us s
            repetitions = n // length
            if pattern * repetitions == s:
                return True

    return False


def repeated_substring_concatenation(s: str) -> bool:
    """
    Check if string is a repeated pattern using the concatenation trick.

    Key insight: If s is a repeated pattern, s will appear in (s + s)[1:-1]

    Time Complexity: O(n) with efficient string search
    Space Complexity: O(n)
    """
    if len(s) <= 1:
        return False

    # Double the string and remove first and last characters
    doubled = (s + s)[1:-1]

    # Check if original string exists in the modified doubled string
    return s in doubled


def repeated_substring_kmp(s: str) -> bool:
    """
    Check if string is a repeated pattern using KMP's LPS array.

    If the string is a repeated pattern:
    - lps[n-1] > 0 (there's a proper prefix that's also a suffix)
    - n % (n - lps[n-1]) == 0 (the pattern length divides n)

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    n = len(s)
    if n <= 1:
        return False

    # Build LPS array
    lps = compute_lps(s)

    # Get the length of the longest proper prefix which is also suffix
    lps_last = lps[n - 1]

    # Pattern length would be n - lps_last
    pattern_length = n - lps_last

    # String is repeated if:
    # 1. lps_last > 0 (there's a proper prefix = suffix)
    # 2. n is divisible by pattern_length
    return lps_last > 0 and n % pattern_length == 0


def compute_lps(s: str) -> List[int]:
    """
    Compute Longest Proper Prefix Suffix array.
    """
    n = len(s)
    lps = [0] * n
    length = 0
    i = 1

    while i < n:
        if s[i] == s[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1

    return lps


def repeated_substring_optimized_divisors(s: str) -> bool:
    """
    Optimized divisor approach - only check divisors up to sqrt(n).

    Time Complexity: O(n * sqrt(n))
    Space Complexity: O(n)
    """
    n = len(s)

    # Find all divisors of n
    divisors = []
    i = 1
    while i * i <= n:
        if n % i == 0:
            if i != n:  # Don't include n itself
                divisors.append(i)
            if i != n // i and n // i != n:
                divisors.append(n // i)
        i += 1

    # Check each divisor
    for length in sorted(divisors):
        pattern = s[:length]
        if pattern * (n // length) == s:
            return True

    return False


# Test cases
def run_tests():
    print("=" * 60)
    print("Repeated Substring Pattern - Test Cases")
    print("=" * 60)

    test_cases = [
        ("abab", True),
        ("aba", False),
        ("abcabcabcabc", True),
        ("aaa", True),
        ("a", False),
        ("ab", False),
        ("abcabc", True),
        ("ababab", True),
        ("abac", False),
        ("aabaaba", False),
        ("abaababaab", True),
        ("", False),
        ("abcdabcd", True),
        ("abcde", False),
    ]

    methods = [
        ("Check All Divisors", repeated_substring_divisors),
        ("Concatenation Trick", repeated_substring_concatenation),
        ("KMP-Based (LPS)", repeated_substring_kmp),
        ("Optimized Divisors", repeated_substring_optimized_divisors),
    ]

    all_passed = True

    for method_name, method_func in methods:
        print(f"\n--- Testing {method_name} ---")

        for i, (s, expected) in enumerate(test_cases, 1):
            # Handle empty string edge case
            if s == "" and method_name in ["KMP-Based (LPS)", "Concatenation Trick"]:
                result = False
            else:
                result = method_func(s) if s else False

            passed = result == expected

            print(f"\nTest {i}: s = \"{s}\"")
            print(f"Result: {result}")
            print(f"Expected: {expected}")

            if passed:
                print("PASSED")
            else:
                print("FAILED")
                all_passed = False

    # Demonstrate the concatenation trick
    print("\n" + "=" * 60)
    print("Demonstrating Concatenation Trick:")
    print("=" * 60)

    demo_cases = ["abab", "aba", "abcabc"]
    for s in demo_cases:
        doubled = (s + s)[1:-1]
        found = s in doubled
        print(f"\ns = \"{s}\"")
        print(f"(s + s)[1:-1] = \"{doubled}\"")
        print(f"s in doubled = {found}")

    print("\n" + "=" * 60)
    if all_passed:
        print("All tests passed!")
    else:
        print("Some tests failed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
