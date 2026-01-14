"""
Group Anagrams

Given an array of strings, group the anagrams together.

Multiple approaches implemented:
1. Sorted String as Key - O(n * k * log(k)) time
2. Character Count as Key - O(n * k) time
"""

from typing import List
from collections import defaultdict


def group_anagrams_sorted(strs: List[str]) -> List[List[str]]:
    """
    Group anagrams using sorted string as key.

    Time Complexity: O(n * k * log(k)) where n = len(strs), k = max string length
    Space Complexity: O(n * k)
    """
    anagram_map = defaultdict(list)

    for s in strs:
        # Sort the string to create the key
        key = ''.join(sorted(s))
        anagram_map[key].append(s)

    return list(anagram_map.values())


def group_anagrams_count(strs: List[str]) -> List[List[str]]:
    """
    Group anagrams using character count as key.

    Time Complexity: O(n * k) where n = len(strs), k = max string length
    Space Complexity: O(n * k)
    """
    anagram_map = defaultdict(list)

    for s in strs:
        # Count characters (assuming lowercase English letters)
        count = [0] * 26
        for char in s:
            count[ord(char) - ord('a')] += 1

        # Use tuple of counts as key (lists aren't hashable)
        key = tuple(count)
        anagram_map[key].append(s)

    return list(anagram_map.values())


def group_anagrams_prime(strs: List[str]) -> List[List[str]]:
    """
    Group anagrams using prime number multiplication.

    Each letter maps to a prime number. The product is unique for anagrams.
    Note: This can cause integer overflow for long strings.

    Time Complexity: O(n * k)
    Space Complexity: O(n * k)
    """
    # First 26 prime numbers for a-z
    primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
              43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101]

    anagram_map = defaultdict(list)

    for s in strs:
        # Calculate prime product
        product = 1
        for char in s:
            product *= primes[ord(char) - ord('a')]

        anagram_map[product].append(s)

    return list(anagram_map.values())


def group_anagrams_frozenset(strs: List[str]) -> List[List[str]]:
    """
    Group anagrams using frozenset of (char, count) pairs.

    Time Complexity: O(n * k)
    Space Complexity: O(n * k)
    """
    anagram_map = defaultdict(list)

    for s in strs:
        # Count characters
        count = {}
        for char in s:
            count[char] = count.get(char, 0) + 1

        # Use frozenset of items as key
        key = frozenset(count.items())
        anagram_map[key].append(s)

    return list(anagram_map.values())


def are_anagrams(s1: str, s2: str) -> bool:
    """Helper function to check if two strings are anagrams."""
    return sorted(s1) == sorted(s2)


def validate_groups(groups: List[List[str]], original: List[str]) -> bool:
    """
    Validate that:
    1. All strings from original are in exactly one group
    2. All strings in each group are anagrams of each other
    """
    # Check all strings are present
    all_strings = []
    for group in groups:
        all_strings.extend(group)

    if sorted(all_strings) != sorted(original):
        return False

    # Check each group contains anagrams
    for group in groups:
        if len(group) > 1:
            for i in range(1, len(group)):
                if not are_anagrams(group[0], group[i]):
                    return False

    return True


# Test cases
def run_tests():
    print("=" * 60)
    print("Group Anagrams - Test Cases")
    print("=" * 60)

    test_cases = [
        ["eat", "tea", "tan", "ate", "nat", "bat"],
        [""],
        ["a"],
        ["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"],
        ["abc", "bca", "cab", "xyz", "zyx", "yxz"],
        ["", ""],
        ["ab", "ba", "abc", "cba", "bac"],
    ]

    methods = [
        ("Sorted String Key", group_anagrams_sorted),
        ("Character Count Key", group_anagrams_count),
        ("Prime Product Key", group_anagrams_prime),
        ("Frozenset Key", group_anagrams_frozenset),
    ]

    all_passed = True

    for method_name, method_func in methods:
        print(f"\n--- Testing {method_name} ---")

        for i, strs in enumerate(test_cases, 1):
            result = method_func(strs.copy())  # Copy to avoid mutation
            valid = validate_groups(result, strs)

            print(f"\nTest {i}: {strs}")
            print(f"Result: {result}")

            if valid:
                print("PASSED (valid grouping)")
            else:
                print("FAILED (invalid grouping)")
                all_passed = False

    # Additional demonstration
    print("\n" + "=" * 60)
    print("Demonstration - Character Count Key Generation")
    print("=" * 60)

    demo_words = ["eat", "tea", "ate"]
    print(f"\nWords: {demo_words}")
    for word in demo_words:
        count = [0] * 26
        for char in word:
            count[ord(char) - ord('a')] += 1
        # Show only non-zero counts
        non_zero = [(chr(i + ord('a')), c) for i, c in enumerate(count) if c > 0]
        print(f"'{word}' -> {non_zero}")

    print("\n" + "=" * 60)
    if all_passed:
        print("All tests passed!")
    else:
        print("Some tests failed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
