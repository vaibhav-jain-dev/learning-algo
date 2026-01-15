"""
Word Pattern

This solution uses two hash maps to verify bijection between pattern characters and words.
"""


def word_pattern(pattern: str, s: str) -> bool:
    """
    Check if string s follows the given pattern.

    Args:
        pattern: Pattern string with characters
        s: String with space-separated words

    Returns:
        True if s follows the pattern, False otherwise
    """
    words = s.split()

    # Length check
    if len(pattern) != len(words):
        return False

    # Two maps for bijection
    char_to_word = {}
    word_to_char = {}

    for char, word in zip(pattern, words):
        # Check char -> word mapping
        if char in char_to_word:
            if char_to_word[char] != word:
                return False
        else:
            char_to_word[char] = word

        # Check word -> char mapping
        if word in word_to_char:
            if word_to_char[word] != char:
                return False
        else:
            word_to_char[word] = char

    return True


def word_pattern_zip(pattern: str, s: str) -> bool:
    """
    Concise solution using set and zip.
    Similar to isomorphic strings approach.
    """
    words = s.split()

    if len(pattern) != len(words):
        return False

    # Check bijection using set sizes
    return len(set(zip(pattern, words))) == len(set(pattern)) == len(set(words))


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (pattern, s, expected)
        ("abba", "dog cat cat dog", True),
        ("abba", "dog cat cat fish", False),
        ("aaaa", "dog cat cat dog", False),
        ("abba", "dog dog dog dog", False),
        ("a", "dog", True),
        ("ab", "dog cat", True),
        ("ab", "dog dog", False),           # Different chars map to same word
        ("aa", "dog cat", False),           # Same char maps to different words
        ("abc", "one two three", True),
        ("aaa", "dog dog dog", True),
        ("abcd", "a b c d", True),
        ("", "", True),                     # Empty pattern and string
        ("abc", "a b c d", False),          # Length mismatch
        ("jquery", "jquery", False),        # Length mismatch (6 chars vs 1 word)
    ]

    print("=" * 60)
    print("WORD PATTERN - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (pattern, s, expected) in enumerate(test_cases, 1):
        result = word_pattern(pattern, s)
        passed = result == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        display_s = s if len(s) <= 30 else s[:30] + "..."
        print(f"\nTest {i}: {status}")
        print(f"  Pattern: \"{pattern}\"")
        print(f"  String:  \"{display_s}\"")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    examples = [
        ("abba", "dog cat cat dog"),    # True
        ("abba", "dog cat cat fish"),   # False
    ]

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)

    for pattern, s in examples:
        print(f"\nPattern: \"{pattern}\"")
        print(f"String:  \"{s}\"")
        print("-" * 40)

        words = s.split()
        print(f"Words: {words}")

        if len(pattern) != len(words):
            print(f"Length mismatch: {len(pattern)} != {len(words)}")
            print("Result: False")
            continue

        char_to_word = {}
        word_to_char = {}
        is_valid = True

        for i, (char, word) in enumerate(zip(pattern, words)):
            print(f"\nPosition {i}: '{char}' <-> \"{word}\"")
            print(f"  char_to_word: {char_to_word}")
            print(f"  word_to_char: {word_to_char}")

            # Check char -> word
            if char in char_to_word:
                if char_to_word[char] != word:
                    print(f"  CONFLICT: '{char}' maps to \"{char_to_word[char]}\", not \"{word}\"")
                    is_valid = False
                    break
                print(f"  OK: '{char}' -> \"{word}\" consistent")
            else:
                char_to_word[char] = word
                print(f"  Added: '{char}' -> \"{word}\"")

            # Check word -> char
            if word in word_to_char:
                if word_to_char[word] != char:
                    print(f"  CONFLICT: \"{word}\" maps to '{word_to_char[word]}', not '{char}'")
                    is_valid = False
                    break
                print(f"  OK: \"{word}\" -> '{char}' consistent")
            else:
                word_to_char[word] = char
                print(f"  Added: \"{word}\" -> '{char}'")

        print(f"\nResult: {is_valid}")


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
