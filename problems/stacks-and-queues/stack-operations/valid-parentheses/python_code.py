"""
Valid Parentheses

Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.
"""

from typing import List


def is_valid(s: str) -> bool:
    """
    Check if the parentheses in the string are valid and balanced.

    Uses a stack to track opening brackets and ensures each closing bracket
    matches the most recent opening bracket.

    Time Complexity: O(n) where n is the length of the string
    Space Complexity: O(n) in the worst case
    """
    # Mapping of closing brackets to their corresponding opening brackets
    bracket_map = {
        ')': '(',
        '}': '{',
        ']': '['
    }

    # Stack to keep track of opening brackets
    stack = []

    for char in s:
        if char in bracket_map:
            # It's a closing bracket
            # Check if stack is empty or top doesn't match
            if not stack or stack[-1] != bracket_map[char]:
                return False
            stack.pop()
        else:
            # It's an opening bracket, push to stack
            stack.append(char)

    # Valid only if all brackets are matched (stack is empty)
    return len(stack) == 0


def is_valid_alternative(s: str) -> bool:
    """
    Alternative approach using a set for opening brackets.
    """
    opening = {'(', '{', '['}
    matching = {')': '(', '}': '{', ']': '['}

    stack = []

    for char in s:
        if char in opening:
            stack.append(char)
        elif char in matching:
            if not stack or stack.pop() != matching[char]:
                return False

    return not stack


def is_valid_with_details(s: str) -> tuple:
    """
    Extended version that returns validation result and details.
    Useful for debugging and understanding where validation fails.
    """
    bracket_map = {')': '(', '}': '{', ']': '['}
    opening = {'(', '{', '['}

    stack = []  # Stack of (bracket, index) tuples

    for i, char in enumerate(s):
        if char in opening:
            stack.append((char, i))
        elif char in bracket_map:
            if not stack:
                return False, f"Unmatched closing bracket '{char}' at position {i}"
            top_bracket, top_index = stack.pop()
            if top_bracket != bracket_map[char]:
                return False, f"Mismatched brackets: '{top_bracket}' at {top_index} and '{char}' at {i}"

    if stack:
        unmatched = [(b, i) for b, i in stack]
        return False, f"Unmatched opening brackets: {unmatched}"

    return True, "All brackets are valid and balanced"


# Test cases
def run_tests():
    test_cases = [
        # (input, expected_output)
        ("()", True),
        ("()[]{}", True),
        ("(]", False),
        ("([)]", False),
        ("{[]}", True),
        ("", True),  # Empty string is valid
        ("(", False),  # Single opening bracket
        (")", False),  # Single closing bracket
        ("((()))", True),  # Deeply nested
        ("{[()]}", True),  # Mixed nested
        ("({[]})", True),  # Complex valid
        ("([{}])", True),  # Complex valid
        ("((())", False),  # Missing closing
        ("())", False),  # Extra closing
        ("{", False),
        ("}", False),
        ("[(])", False),  # Interleaved incorrect
        ("{{{{{{{{{{[[[[[[[[[[(((((((((())))))))))]]]]]]]]]]}}}}}}}}}}", True),  # Long valid
    ]

    print("Testing is_valid function:")
    print("=" * 60)

    all_passed = True
    for i, (input_str, expected) in enumerate(test_cases, 1):
        result = is_valid(input_str)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False

        display_input = input_str if len(input_str) <= 30 else input_str[:27] + "..."
        print(f"Test {i:2}: is_valid(\"{display_input}\") = {result}, Expected: {expected} [{status}]")

    print("=" * 60)
    print(f"All tests passed: {all_passed}")
    print()

    # Test alternative implementation
    print("Testing is_valid_alternative function:")
    print("=" * 60)

    all_passed_alt = True
    for i, (input_str, expected) in enumerate(test_cases, 1):
        result = is_valid_alternative(input_str)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed_alt = False

        display_input = input_str if len(input_str) <= 30 else input_str[:27] + "..."
        print(f"Test {i:2}: is_valid_alternative(\"{display_input}\") = {result}, Expected: {expected} [{status}]")

    print("=" * 60)
    print(f"All tests passed: {all_passed_alt}")
    print()

    # Demonstrate detailed validation
    print("Testing is_valid_with_details function (showing details):")
    print("=" * 60)

    detail_cases = ["()", "(]", "([)]", "{[]}", "((()", "())"]
    for s in detail_cases:
        valid, message = is_valid_with_details(s)
        print(f"Input: \"{s}\"")
        print(f"  Valid: {valid}")
        print(f"  Details: {message}")
        print()


if __name__ == "__main__":
    run_tests()
