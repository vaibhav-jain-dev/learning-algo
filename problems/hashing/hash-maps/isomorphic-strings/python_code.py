"""
Isomorphic Strings

This solution uses two hash maps to verify one-to-one character mapping.
"""


def is_isomorphic(s: str, t: str) -> bool:
    """
    Check if two strings are isomorphic.

    Args:
        s: First string
        t: Second string

    Returns:
        True if strings are isomorphic, False otherwise
    """
    if len(s) != len(t):
        return False

    # Two maps for bidirectional mapping
    s_to_t = {}
    t_to_s = {}

    for char_s, char_t in zip(s, t):
        # Check s -> t mapping
        if char_s in s_to_t:
            if s_to_t[char_s] != char_t:
                return False
        else:
            s_to_t[char_s] = char_t

        # Check t -> s mapping
        if char_t in t_to_s:
            if t_to_s[char_t] != char_s:
                return False
        else:
            t_to_s[char_t] = char_s

    return True


def is_isomorphic_transform(s: str, t: str) -> bool:
    """
    Alternative approach: Transform strings to a canonical form.
    Map each character to its first occurrence index.
    """
    def transform(string: str) -> list:
        mapping = {}
        result = []
        for char in string:
            if char not in mapping:
                mapping[char] = len(mapping)
            result.append(mapping[char])
        return result

    return transform(s) == transform(t)


def is_isomorphic_zip(s: str, t: str) -> bool:
    """
    Concise solution using set and zip.
    Two strings are isomorphic if:
    1. Number of unique character pairs == unique chars in s == unique chars in t
    """
    return len(set(zip(s, t))) == len(set(s)) == len(set(t))


def run_tests():
    """Run test cases to verify the solution."""
    test_cases = [
        # (s, t, expected)
        ("egg", "add", True),           # e->a, g->d
        ("foo", "bar", False),          # o maps to both a and r
        ("paper", "title", True),       # Valid one-to-one mapping
        ("badc", "baba", False),        # b and d both map to b
        ("a", "b", True),               # Single char
        ("ab", "aa", False),            # a and b both map to a
        ("", "", True),                 # Empty strings
        ("abcdefg", "hijklmn", True),   # All different chars
        ("aaa", "bbb", True),           # Same char repeated
        ("abc", "abc", True),           # Identical strings
        ("13", "42", True),             # Numbers
        ("ab", "ca", True),             # Simple valid mapping
    ]

    print("=" * 60)
    print("ISOMORPHIC STRINGS - Test Results")
    print("=" * 60)

    all_passed = True
    for i, (s, t, expected) in enumerate(test_cases, 1):
        result = is_isomorphic(s, t)
        passed = result == expected
        status = "PASS" if passed else "FAIL"

        if not passed:
            all_passed = False

        print(f"\nTest {i}: {status}")
        print(f"  Input: s = \"{s}\", t = \"{t}\"")
        print(f"  Output: {result}")
        print(f"  Expected: {expected}")

    print("\n" + "=" * 60)
    print(f"Overall: {'ALL TESTS PASSED' if all_passed else 'SOME TESTS FAILED'}")
    print("=" * 60)


def demonstrate_approach():
    """Demonstrate how the algorithm works step by step."""
    examples = [
        ("egg", "add"),      # True case
        ("foo", "bar"),      # False case
    ]

    print("\n" + "=" * 60)
    print("STEP-BY-STEP DEMONSTRATION")
    print("=" * 60)

    for s, t in examples:
        print(f"\nChecking: s = \"{s}\", t = \"{t}\"")
        print("-" * 40)

        s_to_t = {}
        t_to_s = {}
        is_valid = True

        for i, (char_s, char_t) in enumerate(zip(s, t)):
            print(f"\nPosition {i}: '{char_s}' <-> '{char_t}'")
            print(f"  Current s_to_t: {s_to_t}")
            print(f"  Current t_to_s: {t_to_s}")

            # Check s -> t
            if char_s in s_to_t:
                if s_to_t[char_s] != char_t:
                    print(f"  CONFLICT: '{char_s}' already maps to '{s_to_t[char_s]}', not '{char_t}'")
                    is_valid = False
                    break
                else:
                    print(f"  OK: '{char_s}' -> '{char_t}' consistent")
            else:
                s_to_t[char_s] = char_t
                print(f"  Added: '{char_s}' -> '{char_t}'")

            # Check t -> s
            if char_t in t_to_s:
                if t_to_s[char_t] != char_s:
                    print(f"  CONFLICT: '{char_t}' already maps to '{t_to_s[char_t]}', not '{char_s}'")
                    is_valid = False
                    break
                else:
                    print(f"  OK: '{char_t}' -> '{char_s}' consistent")
            else:
                t_to_s[char_t] = char_s
                print(f"  Added: '{char_t}' -> '{char_s}'")

        print(f"\nResult: {'Isomorphic' if is_valid else 'Not Isomorphic'}")


if __name__ == "__main__":
    run_tests()
    demonstrate_approach()
