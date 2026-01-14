"""
KMP Pattern Search Algorithm

The Knuth-Morris-Pratt algorithm efficiently finds all occurrences of a pattern
in a text by utilizing a preprocessing step that builds a failure function (LPS array).

Time Complexity: O(n + m) where n is text length and m is pattern length
Space Complexity: O(m) for the LPS array
"""

from typing import List


def compute_lps(pattern: str) -> List[int]:
    """
    Compute the Longest Proper Prefix which is also Suffix (LPS) array.

    LPS[i] = length of the longest proper prefix of pattern[0..i]
             which is also a suffix of pattern[0..i]

    Args:
        pattern: The pattern string to preprocess

    Returns:
        The LPS array for the pattern
    """
    m = len(pattern)
    lps = [0] * m

    # Length of the previous longest prefix suffix
    length = 0
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                # Use the previous LPS value to avoid redundant comparisons
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
        List of starting indices where pattern is found in text
    """
    if not pattern or not text:
        return []

    n = len(text)
    m = len(pattern)

    if m > n:
        return []

    # Preprocess pattern to get LPS array
    lps = compute_lps(pattern)

    result = []
    i = 0  # Index for text
    j = 0  # Index for pattern

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == m:
            # Pattern found at index i - j
            result.append(i - j)
            # Continue searching for more occurrences
            j = lps[j - 1]
        elif i < n and pattern[j] != text[i]:
            # Mismatch after j matches
            if j != 0:
                # Use LPS to skip characters
                j = lps[j - 1]
            else:
                # No match, move to next character in text
                i += 1

    return result


def kmp_search_first(text: str, pattern: str) -> int:
    """
    Find the first occurrence of pattern in text using KMP algorithm.

    Args:
        text: The text to search in
        pattern: The pattern to search for

    Returns:
        Index of first occurrence, or -1 if not found
    """
    occurrences = kmp_search(text, pattern)
    return occurrences[0] if occurrences else -1


# Test cases
def run_tests():
    print("=" * 60)
    print("KMP Pattern Search Algorithm - Test Cases")
    print("=" * 60)

    # Test Case 1: Multiple occurrences
    text1 = "AABAACAADAABAAABAA"
    pattern1 = "AABA"
    result1 = kmp_search(text1, pattern1)
    print(f"\nTest 1: Find '{pattern1}' in '{text1}'")
    print(f"Result: {result1}")
    print(f"Expected: [0, 9, 13]")
    assert result1 == [0, 9, 13], f"Test 1 failed: {result1}"
    print("PASSED")

    # Test Case 2: Single occurrence
    text2 = "ABABDABACDABABCABAB"
    pattern2 = "ABABCABAB"
    result2 = kmp_search(text2, pattern2)
    print(f"\nTest 2: Find '{pattern2}' in '{text2}'")
    print(f"Result: {result2}")
    print(f"Expected: [10]")
    assert result2 == [10], f"Test 2 failed: {result2}"
    print("PASSED")

    # Test Case 3: Overlapping occurrences
    text3 = "AAAAAA"
    pattern3 = "AAA"
    result3 = kmp_search(text3, pattern3)
    print(f"\nTest 3: Find '{pattern3}' in '{text3}'")
    print(f"Result: {result3}")
    print(f"Expected: [0, 1, 2, 3]")
    assert result3 == [0, 1, 2, 3], f"Test 3 failed: {result3}"
    print("PASSED")

    # Test Case 4: No occurrence
    text4 = "ABCDEF"
    pattern4 = "XYZ"
    result4 = kmp_search(text4, pattern4)
    print(f"\nTest 4: Find '{pattern4}' in '{text4}'")
    print(f"Result: {result4}")
    print(f"Expected: []")
    assert result4 == [], f"Test 4 failed: {result4}"
    print("PASSED")

    # Test Case 5: Pattern at the end
    text5 = "ABCDEFGH"
    pattern5 = "FGH"
    result5 = kmp_search(text5, pattern5)
    print(f"\nTest 5: Find '{pattern5}' in '{text5}'")
    print(f"Result: {result5}")
    print(f"Expected: [5]")
    assert result5 == [5], f"Test 5 failed: {result5}"
    print("PASSED")

    # Test Case 6: Pattern equals text
    text6 = "ABC"
    pattern6 = "ABC"
    result6 = kmp_search(text6, pattern6)
    print(f"\nTest 6: Find '{pattern6}' in '{text6}'")
    print(f"Result: {result6}")
    print(f"Expected: [0]")
    assert result6 == [0], f"Test 6 failed: {result6}"
    print("PASSED")

    # Test Case 7: Empty pattern
    text7 = "ABC"
    pattern7 = ""
    result7 = kmp_search(text7, pattern7)
    print(f"\nTest 7: Find empty pattern in '{text7}'")
    print(f"Result: {result7}")
    print(f"Expected: []")
    assert result7 == [], f"Test 7 failed: {result7}"
    print("PASSED")

    # Test Case 8: LPS array verification
    pattern8 = "AABAACAABAA"
    lps8 = compute_lps(pattern8)
    print(f"\nTest 8: LPS array for '{pattern8}'")
    print(f"Result: {lps8}")
    print(f"Expected: [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5]")
    assert lps8 == [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5], f"Test 8 failed: {lps8}"
    print("PASSED")

    print("\n" + "=" * 60)
    print("All tests passed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
