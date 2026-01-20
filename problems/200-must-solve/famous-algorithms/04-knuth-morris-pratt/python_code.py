"""
Knuth-Morris-Pratt (KMP) Algorithm - String Pattern Matching - Python Solution

Find all occurrences of a pattern in a text string.

Time Complexity: O(n + m)
Space Complexity: O(m)
"""

from typing import List


def build_lps(pattern: str) -> List[int]:
    """
    Build the Longest Proper Prefix which is also Suffix (LPS) array.

    Args:
        pattern: The pattern string

    Returns:
        LPS array where lps[i] = length of longest proper prefix
        which is also suffix for pattern[0..i]
    """
    m = len(pattern)
    lps = [0] * m
    length = 0  # Length of previous longest prefix suffix
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                # Use previously computed LPS value
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

    return lps


def kmp_search(text: str, pattern: str) -> List[int]:
    """
    Find all occurrences of pattern in text using KMP algorithm.

    Args:
        text: The text to search in
        pattern: The pattern to search for

    Returns:
        List of starting indices where pattern is found
    """
    n = len(text)
    m = len(pattern)

    if m == 0:
        return []
    if m > n:
        return []

    # Build LPS array
    lps = build_lps(pattern)

    result = []
    i = 0  # Index for text
    j = 0  # Index for pattern

    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1

            if j == m:
                # Pattern found at index (i - m)
                result.append(i - m)
                # Use LPS to continue searching
                j = lps[j - 1]
        else:
            if j != 0:
                # Use LPS to skip characters
                j = lps[j - 1]
            else:
                i += 1

    return result


def kmp_first_occurrence(text: str, pattern: str) -> int:
    """
    Find the first occurrence of pattern in text.

    Returns:
        Index of first occurrence, or -1 if not found
    """
    result = kmp_search(text, pattern)
    return result[0] if result else -1


def kmp_count_occurrences(text: str, pattern: str) -> int:
    """
    Count total occurrences of pattern in text.
    """
    return len(kmp_search(text, pattern))


# Test cases
if __name__ == "__main__":
    # Test 1: Basic search
    text1 = "ABABDABACDABABCABAB"
    pattern1 = "ABABCABAB"
    result1 = kmp_search(text1, pattern1)
    print(f"Test 1: {result1}")
    assert result1 == [10], f"Expected [10], got {result1}"

    # Test 2: Overlapping occurrences
    text2 = "AAAAAA"
    pattern2 = "AA"
    result2 = kmp_search(text2, pattern2)
    print(f"Test 2: {result2}")
    assert result2 == [0, 1, 2, 3, 4], f"Expected [0,1,2,3,4], got {result2}"

    # Test 3: No match
    text3 = "ABCDEF"
    pattern3 = "XYZ"
    result3 = kmp_search(text3, pattern3)
    print(f"Test 3: {result3}")
    assert result3 == [], f"Expected [], got {result3}"

    # Test 4: Pattern at beginning
    text4 = "ABCABC"
    pattern4 = "ABC"
    result4 = kmp_search(text4, pattern4)
    print(f"Test 4: {result4}")
    assert result4 == [0, 3], f"Expected [0,3], got {result4}"

    # Test 5: LPS array test
    lps5 = build_lps("ABABCABAB")
    print(f"Test 5 (LPS): {lps5}")
    assert lps5 == [0, 0, 1, 2, 0, 1, 2, 3, 4]

    # Test 6: First occurrence
    result6 = kmp_first_occurrence("hello world", "world")
    print(f"Test 6 (First): {result6}")
    assert result6 == 6

    # Test 7: Count occurrences
    result7 = kmp_count_occurrences("abababa", "aba")
    print(f"Test 7 (Count): {result7}")
    assert result7 == 3

    print("\nAll tests passed!")
