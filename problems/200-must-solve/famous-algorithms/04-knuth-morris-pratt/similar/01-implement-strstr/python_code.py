"""
Implement strStr() - Python Solution

Time Complexity: O(n + m)
Space Complexity: O(m)
"""


def str_str(haystack: str, needle: str) -> int:
    """
    Find first occurrence of needle in haystack using KMP.
    """
    if not needle:
        return 0

    m = len(needle)
    n = len(haystack)

    if m > n:
        return -1

    # Build LPS array
    lps = [0] * m
    length = 0
    i = 1

    while i < m:
        if needle[i] == needle[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length != 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1

    # Search
    i = j = 0
    while i < n:
        if haystack[i] == needle[j]:
            i += 1
            j += 1
            if j == m:
                return i - m
        elif j != 0:
            j = lps[j - 1]
        else:
            i += 1

    return -1


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {str_str('sadbutsad', 'sad')}")  # Expected: 0
    print(f"Test 2: {str_str('leetcode', 'leeto')}")  # Expected: -1
    print(f"Test 3: {str_str('hello', 'llo')}")  # Expected: 2
    print(f"Test 4: {str_str('', '')}")  # Expected: 0
    print("\nAll tests completed!")
