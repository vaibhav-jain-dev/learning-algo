"""
Rabin-Karp String Matching Algorithm

Uses rolling hash for efficient pattern matching.
Average Time Complexity: O(n + m)
Worst Case Time Complexity: O(nm) with many hash collisions
Space Complexity: O(1)
"""

from typing import List


def rabin_karp_search(text: str, pattern: str, d: int = 256, q: int = 101) -> List[int]:
    """
    Find all occurrences of pattern in text using Rabin-Karp algorithm.

    Args:
        text: The text to search in
        pattern: The pattern to search for
        d: Number of characters in the alphabet (default 256 for ASCII)
        q: A prime number for modular arithmetic to avoid overflow

    Returns:
        List of starting indices where pattern is found in text
    """
    if not pattern or not text or len(pattern) > len(text):
        return []

    n = len(text)
    m = len(pattern)
    result = []

    # h = d^(m-1) % q
    # Used to remove the leading digit when rolling the hash
    h = pow(d, m - 1, q)

    # Calculate initial hash values for pattern and first window of text
    pattern_hash = 0
    text_hash = 0

    for i in range(m):
        pattern_hash = (d * pattern_hash + ord(pattern[i])) % q
        text_hash = (d * text_hash + ord(text[i])) % q

    # Slide the pattern over text one by one
    for i in range(n - m + 1):
        # Check if hash values match
        if pattern_hash == text_hash:
            # Verify character by character (handles hash collisions)
            if text[i:i + m] == pattern:
                result.append(i)

        # Calculate hash value for next window
        if i < n - m:
            # Remove leading digit, add trailing digit
            text_hash = (d * (text_hash - ord(text[i]) * h) + ord(text[i + m])) % q

            # Handle negative hash values
            if text_hash < 0:
                text_hash += q

    return result


def rabin_karp_with_prime(text: str, pattern: str) -> List[int]:
    """
    Rabin-Karp with a larger prime for better collision resistance.
    """
    # Using a larger prime reduces collision probability
    return rabin_karp_search(text, pattern, d=256, q=1000000007)


def rabin_karp_multiple_patterns(text: str, patterns: List[str]) -> dict:
    """
    Find all occurrences of multiple patterns in text.

    Args:
        text: The text to search in
        patterns: List of patterns to search for

    Returns:
        Dictionary mapping each pattern to list of occurrence indices
    """
    results = {}
    for pattern in patterns:
        results[pattern] = rabin_karp_search(text, pattern)
    return results


# Test cases
def run_tests():
    print("=" * 60)
    print("Rabin-Karp String Matching Algorithm - Test Cases")
    print("=" * 60)

    # Test Case 1: Multiple occurrences with spaces
    text1 = "GEEKS FOR GEEKS"
    pattern1 = "GEEK"
    result1 = rabin_karp_search(text1, pattern1)
    print(f"\nTest 1: Find '{pattern1}' in '{text1}'")
    print(f"Result: {result1}")
    print(f"Expected: [0, 10]")
    assert result1 == [0, 10], f"Test 1 failed: {result1}"
    print("PASSED")

    # Test Case 2: Overlapping occurrences
    text2 = "AABAACAADAABAABA"
    pattern2 = "AABA"
    result2 = rabin_karp_search(text2, pattern2)
    print(f"\nTest 2: Find '{pattern2}' in '{text2}'")
    print(f"Result: {result2}")
    print(f"Expected: [0, 9, 12]")
    assert result2 == [0, 9, 12], f"Test 2 failed: {result2}"
    print("PASSED")

    # Test Case 3: Pattern not found
    text3 = "abcdefgh"
    pattern3 = "xyz"
    result3 = rabin_karp_search(text3, pattern3)
    print(f"\nTest 3: Find '{pattern3}' in '{text3}'")
    print(f"Result: {result3}")
    print(f"Expected: []")
    assert result3 == [], f"Test 3 failed: {result3}"
    print("PASSED")

    # Test Case 4: Pattern at beginning and end
    text4 = "TEST string TEST"
    pattern4 = "TEST"
    result4 = rabin_karp_search(text4, pattern4)
    print(f"\nTest 4: Find '{pattern4}' in '{text4}'")
    print(f"Result: {result4}")
    print(f"Expected: [0, 12]")
    assert result4 == [0, 12], f"Test 4 failed: {result4}"
    print("PASSED")

    # Test Case 5: Single character pattern
    text5 = "abcabc"
    pattern5 = "a"
    result5 = rabin_karp_search(text5, pattern5)
    print(f"\nTest 5: Find '{pattern5}' in '{text5}'")
    print(f"Result: {result5}")
    print(f"Expected: [0, 3]")
    assert result5 == [0, 3], f"Test 5 failed: {result5}"
    print("PASSED")

    # Test Case 6: Pattern equals text
    text6 = "exact"
    pattern6 = "exact"
    result6 = rabin_karp_search(text6, pattern6)
    print(f"\nTest 6: Find '{pattern6}' in '{text6}'")
    print(f"Result: {result6}")
    print(f"Expected: [0]")
    assert result6 == [0], f"Test 6 failed: {result6}"
    print("PASSED")

    # Test Case 7: Empty pattern
    text7 = "test"
    pattern7 = ""
    result7 = rabin_karp_search(text7, pattern7)
    print(f"\nTest 7: Find empty pattern in '{text7}'")
    print(f"Result: {result7}")
    print(f"Expected: []")
    assert result7 == [], f"Test 7 failed: {result7}"
    print("PASSED")

    # Test Case 8: Pattern longer than text
    text8 = "ab"
    pattern8 = "abcdef"
    result8 = rabin_karp_search(text8, pattern8)
    print(f"\nTest 8: Find '{pattern8}' in '{text8}'")
    print(f"Result: {result8}")
    print(f"Expected: []")
    assert result8 == [], f"Test 8 failed: {result8}"
    print("PASSED")

    # Test Case 9: Repeated pattern (all same characters)
    text9 = "AAAAAA"
    pattern9 = "AA"
    result9 = rabin_karp_search(text9, pattern9)
    print(f"\nTest 9: Find '{pattern9}' in '{text9}'")
    print(f"Result: {result9}")
    print(f"Expected: [0, 1, 2, 3, 4]")
    assert result9 == [0, 1, 2, 3, 4], f"Test 9 failed: {result9}"
    print("PASSED")

    # Test Case 10: Multiple patterns
    text10 = "the quick brown fox jumps over the lazy dog"
    patterns10 = ["the", "fox", "cat"]
    result10 = rabin_karp_multiple_patterns(text10, patterns10)
    print(f"\nTest 10: Find multiple patterns in '{text10}'")
    print(f"Patterns: {patterns10}")
    print(f"Result: {result10}")
    expected10 = {"the": [0, 31], "fox": [16], "cat": []}
    assert result10 == expected10, f"Test 10 failed: {result10}"
    print("PASSED")

    print("\n" + "=" * 60)
    print("All tests passed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
