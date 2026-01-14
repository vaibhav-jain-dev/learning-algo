"""
Print All Subsequences of a String

This module demonstrates multiple approaches to generate all subsequences:
1. Recursive include/exclude approach
2. Iterative bit manipulation approach
3. Iterative building approach
"""

from typing import List


def subsequences_recursive(s: str) -> List[str]:
    """
    Generate all subsequences using recursion.

    Time Complexity: O(n * 2^n)
    Space Complexity: O(n) for recursion stack

    Args:
        s: Input string

    Returns:
        List of all subsequences
    """
    result = []

    def generate(index: int, current: str):
        # Base case: processed all characters
        if index == len(s):
            result.append(current)
            return

        # Choice 1: Exclude current character
        generate(index + 1, current)

        # Choice 2: Include current character
        generate(index + 1, current + s[index])

    generate(0, "")
    return result


def subsequences_bit_manipulation(s: str) -> List[str]:
    """
    Generate all subsequences using bit manipulation.

    Time Complexity: O(n * 2^n)
    Space Complexity: O(1) excluding output

    The idea: For n characters, use numbers 0 to 2^n - 1.
    Each bit position determines if the corresponding character is included.
    """
    n = len(s)
    result = []

    # Iterate through all possible subsets (0 to 2^n - 1)
    for mask in range(1 << n):  # 1 << n equals 2^n
        subsequence = ""

        # Check each bit
        for i in range(n):
            # If bit i is set, include character i
            if mask & (1 << i):
                subsequence += s[i]

        result.append(subsequence)

    return result


def subsequences_iterative(s: str) -> List[str]:
    """
    Generate all subsequences iteratively by building up.

    Time Complexity: O(n * 2^n)
    Space Complexity: O(2^n) for storing results

    The idea: Start with [""], then for each character,
    duplicate existing subsequences and append the new character.
    """
    result = [""]  # Start with empty subsequence

    for char in s:
        # For each existing subsequence, create a new one with current char
        new_subsequences = [sub + char for sub in result]
        result.extend(new_subsequences)

    return result


def subsequences_with_trace(s: str) -> List[str]:
    """
    Generate all subsequences with detailed trace output.
    """
    result = []

    def generate(index: int, current: str, depth: int):
        indent = "  " * depth

        # Base case
        if index == len(s):
            print(f"{indent}LEAF: Added '{current}' to result")
            result.append(current)
            return

        char = s[index]
        print(f"{indent}At index {index}, char='{char}', current='{current}'")

        # Exclude current character
        print(f"{indent}  Branch 1: EXCLUDE '{char}'")
        generate(index + 1, current, depth + 1)

        # Include current character
        print(f"{indent}  Branch 2: INCLUDE '{char}'")
        generate(index + 1, current + char, depth + 1)

    print(f"Generating subsequences of '{s}':")
    print("-" * 50)
    generate(0, "", 0)

    return result


def print_subsequences_formatted(s: str, subsequences: List[str]):
    """Print subsequences in a formatted manner."""
    print(f"\nSubsequences of '{s}' ({len(subsequences)} total):")
    print("-" * 40)

    # Group by length
    by_length = {}
    for sub in subsequences:
        length = len(sub)
        if length not in by_length:
            by_length[length] = []
        by_length[length].append(sub)

    for length in sorted(by_length.keys()):
        subs = by_length[length]
        label = "empty" if length == 0 else f"length {length}"
        print(f"  {label}: {subs}")


def test_subsequences():
    """Run comprehensive tests for all subsequence implementations."""

    print("=" * 70)
    print("PRINT ALL SUBSEQUENCES OF A STRING")
    print("=" * 70)

    # Test basic functionality
    print("\n1. Basic Test - String 'abc':")
    print("-" * 50)
    test_str = "abc"

    recursive_result = subsequences_recursive(test_str)
    bit_result = subsequences_bit_manipulation(test_str)
    iterative_result = subsequences_iterative(test_str)

    print(f"   Recursive:  {sorted(recursive_result)}")
    print(f"   Bit manip:  {sorted(bit_result)}")
    print(f"   Iterative:  {sorted(iterative_result)}")

    # Verify all methods produce the same result
    all_same = (sorted(recursive_result) == sorted(bit_result) == sorted(iterative_result))
    print(f"\n   All methods produce same result: {all_same}")
    print(f"   Total count: {len(recursive_result)} (expected: {2 ** len(test_str)})")

    # Test with trace
    print("\n2. Recursive Trace for 'ab':")
    print("-" * 50)
    trace_result = subsequences_with_trace("ab")
    print(f"\n   Result: {trace_result}")

    # Test various inputs
    print("\n3. Test Various Inputs:")
    print("-" * 50)
    test_cases = ["a", "ab", "abc", "xy", ""]

    for s in test_cases:
        result = subsequences_recursive(s)
        expected_count = 2 ** len(s)
        status = "PASS" if len(result) == expected_count else "FAIL"
        print(f"   '{s}': {len(result)} subsequences (expected: {expected_count}) [{status}]")

    # Formatted output
    print("\n4. Formatted Output for 'abcd':")
    print("-" * 50)
    result = subsequences_recursive("abcd")
    print_subsequences_formatted("abcd", result)

    # Demonstrate bit manipulation visually
    print("\n5. Bit Manipulation Visualization for 'abc':")
    print("-" * 50)
    s = "abc"
    n = len(s)
    print(f"   String: '{s}' (length {n})")
    print(f"   Number of subsequences: 2^{n} = {2**n}")
    print()
    print("   Mask | Binary |  Chars Selected  | Subsequence")
    print("   -----|--------|------------------|------------")

    for mask in range(1 << n):
        binary = format(mask, f'0{n}b')
        chars = [s[i] if (mask & (1 << i)) else '-' for i in range(n)]
        subseq = ''.join(s[i] for i in range(n) if (mask & (1 << i)))
        print(f"    {mask:3d} |  {binary}   |       {' '.join(chars)}        |    \"{subseq}\"")

    # Performance comparison for longer string
    print("\n6. Count Verification:")
    print("-" * 50)
    for length in range(1, 11):
        s = 'a' * length
        result = subsequences_recursive(s)
        # For repeated chars, we still have 2^n total (with duplicates)
        expected = 2 ** length
        status = "PASS" if len(result) == expected else "FAIL"
        print(f"   Length {length:2d}: {len(result):5d} subsequences [{status}]")

    # Non-contiguous subsequences example
    print("\n7. Non-contiguous Subsequences (Subsequence vs Substring):")
    print("-" * 50)
    s = "abc"
    result = subsequences_recursive(s)

    print(f"   String: '{s}'")
    print(f"   Substrings (contiguous): ['', 'a', 'b', 'c', 'ab', 'bc', 'abc']")
    print(f"   Subsequences (all): {sorted(result, key=lambda x: (len(x), x))}")
    print(f"\n   Note: 'ac' is a subsequence but NOT a substring!")
    print(f"   'ac' maintains order (a comes before c) but skips 'b'")

    print("\n" + "=" * 70)
    print("ALL TESTS COMPLETED!")
    print("=" * 70)


if __name__ == "__main__":
    test_subsequences()
