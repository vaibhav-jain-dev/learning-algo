"""
Repeated Substring Pattern - Python Solution

Time Complexity: O(n)
Space Complexity: O(n)
"""


def repeated_substring_pattern(s: str) -> bool:
    """
    Check if string can be constructed from repeated substring.
    """
    n = len(s)
    if n <= 1:
        return False

    # Build LPS array
    lps = [0] * n
    length = 0
    i = 1

    while i < n:
        if s[i] == s[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length != 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1

    # Check if string can be formed by repeating a pattern
    pattern_len = n - lps[n - 1]
    return lps[n - 1] > 0 and n % pattern_len == 0


def repeated_substring_pattern_simple(s: str) -> bool:
    """
    Alternative: concatenate s+s and search for s in middle.
    """
    return s in (s + s)[1:-1]


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {repeated_substring_pattern('abab')}")  # Expected: True
    print(f"Test 2: {repeated_substring_pattern('aba')}")  # Expected: False
    print(f"Test 3: {repeated_substring_pattern('abcabcabcabc')}")  # Expected: True
    print(f"Test 4: {repeated_substring_pattern('a')}")  # Expected: False
    print("\nAll tests completed!")
