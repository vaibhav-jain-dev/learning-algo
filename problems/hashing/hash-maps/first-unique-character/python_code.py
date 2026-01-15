"""
First Unique Character in a String

This solution uses a hash map to count character frequencies.
"""

from collections import Counter


def first_uniq_char(s: str) -> int:
    """
    Find the index of the first non-repeating character.

    Args:
        s: Input string

    Returns:
        Index of first unique character, or -1 if none exists
    """
    # Count frequency of each character
    char_count = {}
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1

    # Find first character with count 1
    for i, char in enumerate(s):
        if char_count[char] == 1:
            return i

    return -1


def first_uniq_char_counter(s: str) -> int:
    """
    Alternative solution using Python's Counter.
    """
    count = Counter(s)

    for i, char in enumerate(s):
        if count[char] == 1:
            return i

    return -1


def first_uniq_char_single_pass(s: str) -> int:
    """
    Single pass approach using index tracking.
    Store both count and first occurrence index.
    """
    # Store (count, first_index) for each character
    char_info = {}

    for i, char in enumerate(s):
        if char in char_info:
            char_info[char] = (char_info[char][0] + 1, char_info[char][1])
        else:
            char_info[char] = (1, i)

    # Find character with count 1 and minimum index
    min_index = float('inf')
    for char, (count, index) in char_info.items():
        if count == 1:
            min_index = min(min_index, index)

    return min_index if min_index != float('inf') else -1


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (input, expected_output)
        ("leetcode", 0),           # 'l' is first unique
        ("loveleetcode", 2),       # 'v' is first unique
        ("aabb", -1),              # No unique character
        ("a", 0),                  # Single character
        ("aabbccd", 6),            # 'd' is unique at the end
        ("abcabc", -1),            # All characters repeat
        ("abcdefghijklmnopqrstuvwxyz", 0),  # All unique
        ("aabbccddee", -1),        # All pairs
        ("z", 0),                  # Single char 'z'
        ("dddccdbba", 8),          # 'a' is unique at index 8
    ]

    print("=" * 60)
    print("FIRST UNIQUE CHARACTER - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (s, expected) in enumerate(test_cases, 1):
        result = first_uniq_char(s)
        passed = result == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        display_s = s if len(s) <= 20 else s[:20] + "..."
        print(f"\nTest {i}: {status}")
        print(f"  Input: s = \"{display_s}\"")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")
        if result != -1:
            print(f"  Character at index {result}: '{s[result]}'")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    s = "loveleetcode"

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)
    print(f"Input: s = \"{s}\"")

    # First pass: Count frequencies
    print("\n--- First Pass: Count Character Frequencies ---")
    char_count = {}
    for i, char in enumerate(s):
        char_count[char] = char_count.get(char, 0) + 1
        print(f"  After char '{char}' at index {i}: {dict(char_count)}")

    print(f"\nFinal frequency map: {char_count}")

    # Second pass: Find first unique
    print("\n--- Second Pass: Find First Unique Character ---")
    for i, char in enumerate(s):
        count = char_count[char]
        print(f"  Index {i}: char='{char}', count={count}", end="")
        if count == 1:
            print(f" -> UNIQUE! Return {i}")
            break
        else:
            print(" -> Not unique, continue")


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
