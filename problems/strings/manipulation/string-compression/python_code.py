"""
String Compression

Compress a character array in-place by replacing consecutive repeating
characters with the character followed by the count (if count > 1).

Multiple approaches implemented:
1. Two Pointers (In-Place) - O(n) time, O(1) space
2. Simple (Non In-Place) - O(n) time, O(n) space
"""

from typing import List


def compress_in_place(chars: List[str]) -> int:
    """
    Compress character array in-place using two pointers.

    Time Complexity: O(n)
    Space Complexity: O(1) - modifies array in place
    """
    if not chars:
        return 0

    n = len(chars)
    write = 0  # Position to write compressed data
    read = 0  # Position to read from

    while read < n:
        current_char = chars[read]
        count = 0

        # Count consecutive occurrences
        while read < n and chars[read] == current_char:
            read += 1
            count += 1

        # Write the character
        chars[write] = current_char
        write += 1

        # Write the count if > 1
        if count > 1:
            # Convert count to string and write each digit
            count_str = str(count)
            for digit in count_str:
                chars[write] = digit
                write += 1

    return write


def compress_simple(chars: List[str]) -> int:
    """
    Compress character array using extra space (simpler to understand).

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if not chars:
        return 0

    result = []
    i = 0
    n = len(chars)

    while i < n:
        current_char = chars[i]
        count = 0

        # Count consecutive occurrences
        while i < n and chars[i] == current_char:
            i += 1
            count += 1

        # Add character to result
        result.append(current_char)

        # Add count if > 1
        if count > 1:
            result.extend(list(str(count)))

    # Copy result back to chars
    for i, char in enumerate(result):
        chars[i] = char

    return len(result)


def compress_recursive(chars: List[str], start: int = 0, write: int = 0) -> int:
    """
    Compress character array recursively.

    Time Complexity: O(n)
    Space Complexity: O(n) due to recursion stack
    """
    n = len(chars)

    if start >= n:
        return write

    current_char = chars[start]
    count = 0
    read = start

    # Count consecutive occurrences
    while read < n and chars[read] == current_char:
        read += 1
        count += 1

    # Write the character
    chars[write] = current_char
    write += 1

    # Write the count if > 1
    if count > 1:
        for digit in str(count):
            chars[write] = digit
            write += 1

    return compress_recursive(chars, read, write)


def compress_to_string(s: str) -> str:
    """
    Compress a string and return the compressed string.
    (Helper function for testing and demonstration)

    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if not s:
        return ""

    result = []
    i = 0
    n = len(s)

    while i < n:
        current_char = s[i]
        count = 0

        while i < n and s[i] == current_char:
            i += 1
            count += 1

        result.append(current_char)
        if count > 1:
            result.append(str(count))

    return ''.join(result)


def decompress_string(compressed: str) -> str:
    """
    Decompress a compressed string back to original.
    (Helper function for verification)
    """
    result = []
    i = 0
    n = len(compressed)

    while i < n:
        char = compressed[i]
        i += 1

        # Parse the count (if any)
        count_str = ""
        while i < n and compressed[i].isdigit():
            count_str += compressed[i]
            i += 1

        count = int(count_str) if count_str else 1
        result.append(char * count)

    return ''.join(result)


# Test cases
def run_tests():
    print("=" * 60)
    print("String Compression - Test Cases")
    print("=" * 60)

    test_cases = [
        (["a", "a", "b", "b", "c", "c", "c"], 6, ["a", "2", "b", "2", "c", "3"]),
        (["a"], 1, ["a"]),
        (["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"], 4, ["a", "b", "1", "2"]),
        (["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"], 3, ["a", "1", "6"]),
        (["a", "b", "c"], 3, ["a", "b", "c"]),
        (["a", "a", "a", "b", "b", "a", "a"], 6, ["a", "3", "b", "2", "a", "2"]),
    ]

    methods = [
        ("Two Pointers (In-Place)", compress_in_place),
        ("Simple (Extra Space)", compress_simple),
        ("Recursive", compress_recursive),
    ]

    all_passed = True

    for method_name, method_func in methods:
        print(f"\n--- Testing {method_name} ---")

        for i, (chars_input, expected_len, expected_chars) in enumerate(test_cases, 1):
            # Make a copy since we modify in place
            chars = chars_input.copy()
            original = ''.join(chars_input)

            result_len = method_func(chars)
            result_chars = chars[:result_len]

            passed = result_len == expected_len and result_chars == expected_chars

            print(f"\nTest {i}: {chars_input}")
            print(f"Result length: {result_len}, chars: {result_chars}")
            print(f"Expected length: {expected_len}, chars: {expected_chars}")

            if passed:
                print("PASSED")
            else:
                print("FAILED")
                all_passed = False

    # Demonstrate string compression
    print("\n" + "=" * 60)
    print("String Compression Demonstration")
    print("=" * 60)

    demo_strings = ["aabbbcccc", "abcd", "aaaaaaaaaa", "aabbcc"]
    for s in demo_strings:
        compressed = compress_to_string(s)
        decompressed = decompress_string(compressed)
        print(f"\nOriginal: '{s}' (len={len(s)})")
        print(f"Compressed: '{compressed}' (len={len(compressed)})")
        print(f"Decompressed: '{decompressed}'")
        print(f"Compression ratio: {len(compressed)/len(s):.2f}")

    print("\n" + "=" * 60)
    if all_passed:
        print("All tests passed!")
    else:
        print("Some tests failed!")
    print("=" * 60)


if __name__ == "__main__":
    # Fix the typo in the test
    all_passed = True
    run_tests()
