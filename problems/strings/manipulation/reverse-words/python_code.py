"""
Reverse Words in a String

Given a string s, reverse the order of words.
Handle multiple spaces, leading/trailing spaces.

Multiple approaches implemented:
1. Split, Reverse, Join - O(n) time, O(n) space
2. Two Pointers - O(n) time, O(n) space
3. Stack-Based - O(n) time, O(n) space
"""

from typing import List
from collections import deque


def reverse_words_split(s: str) -> str:
    """
    Reverse words using split, reverse, and join.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    # Split by whitespace (handles multiple spaces)
    words = s.split()
    # Reverse the list and join with single space
    return " ".join(reversed(words))


def reverse_words_two_pointers(s: str) -> str:
    """
    Reverse words using two pointers approach.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    # Convert to list for manipulation (strings are immutable in Python)
    chars = list(s)
    n = len(chars)

    def reverse_section(start: int, end: int):
        """Reverse characters from start to end (inclusive)."""
        while start < end:
            chars[start], chars[end] = chars[end], chars[start]
            start += 1
            end -= 1

    # Step 1: Reverse the entire string
    reverse_section(0, n - 1)

    # Step 2: Reverse each word
    start = 0
    for i in range(n + 1):
        if i == n or chars[i] == ' ':
            if start < i:
                reverse_section(start, i - 1)
            start = i + 1

    # Step 3: Clean up spaces - build result
    result = []
    i = 0
    while i < n:
        # Skip leading spaces
        while i < n and chars[i] == ' ':
            i += 1

        if i >= n:
            break

        # Find word end
        word_start = i
        while i < n and chars[i] != ' ':
            i += 1

        # Add word to result
        if result:
            result.append(' ')
        result.extend(chars[word_start:i])

    return ''.join(result)


def reverse_words_stack(s: str) -> str:
    """
    Reverse words using a stack.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    stack = []
    word = []

    for char in s:
        if char == ' ':
            if word:
                stack.append(''.join(word))
                word = []
        else:
            word.append(char)

    # Don't forget the last word
    if word:
        stack.append(''.join(word))

    # Pop from stack and join
    result = []
    while stack:
        result.append(stack.pop())

    return ' '.join(result)


def reverse_words_deque(s: str) -> str:
    """
    Reverse words using a deque (add words to front).

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    result = deque()
    word = []

    for char in s:
        if char == ' ':
            if word:
                result.appendleft(''.join(word))
                word = []
        else:
            word.append(char)

    if word:
        result.appendleft(''.join(word))

    return ' '.join(result)


def reverse_words_manual(s: str) -> str:
    """
    Manual word extraction without using split().

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    words = []
    i = 0
    n = len(s)

    while i < n:
        # Skip spaces
        while i < n and s[i] == ' ':
            i += 1

        if i >= n:
            break

        # Extract word
        j = i
        while j < n and s[j] != ' ':
            j += 1

        words.append(s[i:j])
        i = j

    # Reverse and join
    return ' '.join(reversed(words))


# Test cases
def run_tests():
    print("=" * 60)
    print("Reverse Words in a String - Test Cases")
    print("=" * 60)

    test_cases = [
        ("the sky is blue", "blue is sky the"),
        ("  hello world  ", "world hello"),
        ("a good   example", "example good a"),
        ("  Bob    Loves  Alice   ", "Alice Loves Bob"),
        ("word", "word"),
        ("  spaces  ", "spaces"),
        ("one two three", "three two one"),
        ("a", "a"),
        ("   a   b   c   ", "c b a"),
    ]

    methods = [
        ("Split/Reverse/Join", reverse_words_split),
        ("Two Pointers", reverse_words_two_pointers),
        ("Stack-Based", reverse_words_stack),
        ("Deque-Based", reverse_words_deque),
        ("Manual Extraction", reverse_words_manual),
    ]

    all_passed = True

    for method_name, method_func in methods:
        print(f"\n--- Testing {method_name} ---")

        for i, (input_str, expected) in enumerate(test_cases, 1):
            result = method_func(input_str)
            passed = result == expected

            print(f"\nTest {i}: \"{input_str}\"")
            print(f"Result: \"{result}\"")
            print(f"Expected: \"{expected}\"")

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
