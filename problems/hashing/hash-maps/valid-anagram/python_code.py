"""
Valid Anagram

This solution uses a hash map to count character frequencies.
"""

from collections import Counter


def is_anagram(s: str, t: str) -> bool:
    """
    Check if t is an anagram of s.

    Args:
        s: First string
        t: Second string

    Returns:
        True if t is an anagram of s, False otherwise
    """
    if len(s) != len(t):
        return False

    # Count characters in s
    char_count = {}
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1

    # Subtract counts for characters in t
    for char in t:
        if char not in char_count:
            return False
        char_count[char] -= 1
        if char_count[char] < 0:
            return False

    return True


def is_anagram_counter(s: str, t: str) -> bool:
    """
    Solution using Python's Counter.
    """
    return Counter(s) == Counter(t)


def is_anagram_sorting(s: str, t: str) -> bool:
    """
    Sorting approach - O(n log n) time.
    """
    return sorted(s) == sorted(t)


def is_anagram_array(s: str, t: str) -> bool:
    """
    Optimized approach using array for lowercase letters.
    """
    if len(s) != len(t):
        return False

    # Use array of size 26 for a-z
    count = [0] * 26

    for i in range(len(s)):
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1

    return all(c == 0 for c in count)


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (s, t, expected)
        ("anagram", "nagaram", True),
        ("rat", "car", False),
        ("listen", "silent", True),
        ("a", "a", True),
        ("a", "b", False),
        ("", "", True),
        ("ab", "a", False),              # Different lengths
        ("aabb", "abab", True),
        ("aabb", "abba", True),
        ("abc", "cba", True),
        ("abc", "abd", False),
        ("aacc", "ccac", False),         # Same length, different frequencies
        ("pneumonoultramicroscopicsilicovolcanoconiosis",
         "pneumonoultramicroscopicsilicovolcanoconiosis", True),
    ]

    print("=" * 60)
    print("VALID ANAGRAM - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (s, t, expected) in enumerate(test_cases, 1):
        result = is_anagram(s, t)
        passed = result == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        display_s = s if len(s) <= 15 else s[:15] + "..."
        display_t = t if len(t) <= 15 else t[:15] + "..."
        print(f"\nTest {i}: {status}")
        print(f"  s = \"{display_s}\"")
        print(f"  t = \"{display_t}\"")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    examples = [
        ("anagram", "nagaram"),  # True
        ("rat", "car"),          # False
    ]

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)

    for s, t in examples:
        print(f"\nChecking: s = \"{s}\", t = \"{t}\"")
        print("-" * 40)

        if len(s) != len(t):
            print(f"Length mismatch: {len(s)} != {len(t)}")
            print("Result: False")
            continue

        # Count characters in s
        print("\nStep 1: Count characters in s")
        char_count = {}
        for char in s:
            char_count[char] = char_count.get(char, 0) + 1
        print(f"  Character counts: {dict(sorted(char_count.items()))}")

        # Subtract counts for t
        print("\nStep 2: Subtract counts for characters in t")
        is_valid = True
        for i, char in enumerate(t):
            print(f"  Processing t[{i}] = '{char}'", end="")
            if char not in char_count:
                print(f" -> NOT FOUND in s!")
                is_valid = False
                break
            char_count[char] -= 1
            print(f" -> count['{char}'] = {char_count[char]}")
            if char_count[char] < 0:
                print(f"  -> NEGATIVE count! Too many '{char}' in t")
                is_valid = False
                break

        if is_valid:
            print(f"\nFinal counts: {dict(sorted(char_count.items()))}")
            all_zero = all(v == 0 for v in char_count.values())
            print(f"All counts are zero: {all_zero}")

        print(f"\nResult: {is_valid}")


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
