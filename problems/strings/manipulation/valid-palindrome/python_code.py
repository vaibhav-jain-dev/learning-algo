"""
Valid Palindrome

Check if a string is a valid palindrome considering only alphanumeric characters
and ignoring case.

Multiple approaches implemented:
1. Two Pointers - O(n) time, O(1) space
2. Filter and Compare - O(n) time, O(n) space
3. Using Regular Expressions - O(n) time, O(n) space
"""

import re


def is_palindrome_two_pointers(s: str) -> bool:
    """
    Check if string is palindrome using two pointers.

    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    left = 0
    right = len(s) - 1

    while left < right:
        # Skip non-alphanumeric characters from left
        while left < right and not s[left].isalnum():
            left += 1

        # Skip non-alphanumeric characters from right
        while left < right and not s[right].isalnum():
            right -= 1

        # Compare characters (case-insensitive)
        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True


def is_palindrome_filter(s: str) -> bool:
    """
    Check if string is palindrome by filtering and comparing.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    # Filter to keep only alphanumeric and convert to lowercase
    filtered = ''.join(char.lower() for char in s if char.isalnum())

    # Compare with reverse
    return filtered == filtered[::-1]


def is_palindrome_regex(s: str) -> bool:
    """
    Check if string is palindrome using regex to filter.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    # Remove all non-alphanumeric characters
    filtered = re.sub(r'[^a-zA-Z0-9]', '', s).lower()

    return filtered == filtered[::-1]


def is_palindrome_recursive(s: str) -> bool:
    """
    Check if string is palindrome recursively.

    Time Complexity: O(n)
    Space Complexity: O(n) due to recursion stack and filtered string
    """
    # First filter the string
    filtered = ''.join(char.lower() for char in s if char.isalnum())

    def check(left: int, right: int) -> bool:
        if left >= right:
            return True
        if filtered[left] != filtered[right]:
            return False
        return check(left + 1, right - 1)

    return check(0, len(filtered) - 1)


def is_palindrome_generator(s: str) -> bool:
    """
    Check if string is palindrome using generator for comparison.

    Time Complexity: O(n)
    Space Complexity: O(1) for the comparison, O(n) for filtered list
    """
    # Create generator for alphanumeric chars from both ends
    chars = [c.lower() for c in s if c.isalnum()]

    return all(chars[i] == chars[-(i + 1)] for i in range(len(chars) // 2))


def is_palindrome_half_compare(s: str) -> bool:
    """
    Check palindrome by comparing only first half with reversed second half.

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    filtered = ''.join(char.lower() for char in s if char.isalnum())
    n = len(filtered)

    # Compare first half with reversed second half
    half = n // 2
    first_half = filtered[:half]
    second_half = filtered[n - half:][::-1]

    return first_half == second_half


# Test cases
def run_tests():
    print("=" * 60)
    print("Valid Palindrome - Test Cases")
    print("=" * 60)

    test_cases = [
        ("A man, a plan, a canal: Panama", True),
        ("race a car", False),
        (" ", True),
        ("Was it a car or a cat I saw?", True),
        ("", True),
        ("a", True),
        ("ab", False),
        ("aa", True),
        ("0P", False),
        ("ab_a", True),
        ("Aa", True),
        (".,", True),
        ("Race car", False),  # Note: spaces matter for exact comparison
        ("A Santa at NASA", True),
        ("12321", True),
        ("123456", False),
        ("A1B2B1A", True),
    ]

    methods = [
        ("Two Pointers", is_palindrome_two_pointers),
        ("Filter and Compare", is_palindrome_filter),
        ("Regex Filter", is_palindrome_regex),
        ("Recursive", is_palindrome_recursive),
        ("Generator", is_palindrome_generator),
        ("Half Compare", is_palindrome_half_compare),
    ]

    all_passed = True

    for method_name, method_func in methods:
        print(f"\n--- Testing {method_name} ---")

        for i, (input_str, expected) in enumerate(test_cases, 1):
            result = method_func(input_str)
            passed = result == expected

            display_str = input_str if len(input_str) <= 30 else input_str[:27] + "..."
            print(f"\nTest {i}: \"{display_str}\"")
            print(f"Result: {result}")
            print(f"Expected: {expected}")

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
