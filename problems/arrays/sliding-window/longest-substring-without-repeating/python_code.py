"""
Longest Substring Without Repeating Characters

Given a string s, find the length of the longest substring without
repeating characters.

Time Complexity: O(n)
Space Complexity: O(min(m, n)) where m is the character set size
"""


def length_of_longest_substring(s: str) -> int:
    """
    Find length of longest substring without repeating characters.
    Uses optimized sliding window with HashMap.

    Args:
        s: Input string

    Returns:
        Length of the longest substring without repeating characters
    """
    if not s:
        return 0

    # Map character to its last seen index
    char_index = {}
    max_length = 0
    left = 0

    for right, char in enumerate(s):
        # If character was seen and is within current window
        if char in char_index and char_index[char] >= left:
            # Move left pointer to position after the previous occurrence
            left = char_index[char] + 1

        # Update the last seen index of current character
        char_index[char] = right

        # Update maximum length
        max_length = max(max_length, right - left + 1)

    return max_length


def length_of_longest_substring_set(s: str) -> int:
    """
    Alternative approach using HashSet.
    When duplicate found, shrink window from left one by one.

    Args:
        s: Input string

    Returns:
        Length of the longest substring without repeating characters
    """
    if not s:
        return 0

    char_set = set()
    max_length = 0
    left = 0

    for right in range(len(s)):
        # Shrink window until no duplicate
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1

        # Add current character to set
        char_set.add(s[right])

        # Update maximum length
        max_length = max(max_length, right - left + 1)

    return max_length


def find_longest_substring(s: str) -> str:
    """
    Find and return the actual longest substring (not just length).

    Args:
        s: Input string

    Returns:
        The longest substring without repeating characters
    """
    if not s:
        return ""

    char_index = {}
    max_length = 0
    max_start = 0
    left = 0

    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1

        char_index[char] = right

        current_length = right - left + 1
        if current_length > max_length:
            max_length = current_length
            max_start = left

    return s[max_start:max_start + max_length]


def run_tests():
    """Run test cases to verify the solution."""

    test_cases = [
        # (input, expected_length)
        ("abcabcbb", 3),
        ("bbbbb", 1),
        ("pwwkew", 3),
        ("", 0),
        (" ", 1),
        ("au", 2),
        ("aab", 2),
        ("dvdf", 3),
        ("abcdef", 6),
        ("abba", 2),
        ("tmmzuxt", 5),
    ]

    print("Testing Longest Substring Without Repeating Characters")
    print("=" * 60)

    all_passed = True

    for i, (s, expected) in enumerate(test_cases, 1):
        result = length_of_longest_substring(s)
        status = "PASS" if result == expected else "FAIL"

        if result != expected:
            all_passed = False

        print(f"Test {i}: {status}")
        print(f"  Input: \"{s}\"")
        print(f"  Expected: {expected}, Got: {result}")

        # Also show the actual substring found
        if s:
            substring = find_longest_substring(s)
            print(f"  Longest substring: \"{substring}\"")
        print()

    # Verify both approaches give same results
    print("Verifying HashSet approach matches HashMap approach...")
    for s, expected in test_cases:
        map_result = length_of_longest_substring(s)
        set_result = length_of_longest_substring_set(s)
        if map_result != set_result:
            print(f"  Mismatch for \"{s}\"! Map={map_result}, Set={set_result}")
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
