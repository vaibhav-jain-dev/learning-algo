"""
Longest Common Prefix

Find the longest common prefix string amongst an array of strings.

Multiple approaches implemented:
1. Horizontal Scanning - O(S) time
2. Vertical Scanning - O(S) time
3. Binary Search - O(S * log(m)) time
4. Divide and Conquer - O(S) time
"""

from typing import List


def longest_common_prefix_horizontal(strs: List[str]) -> str:
    """
    Find LCP using horizontal scanning.

    Start with first string as prefix, then reduce it for each subsequent string.

    Time Complexity: O(S) where S is sum of all characters
    Space Complexity: O(1)
    """
    if not strs:
        return ""

    prefix = strs[0]

    for i in range(1, len(strs)):
        # Reduce prefix until it matches the current string
        while not strs[i].startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""

    return prefix


def longest_common_prefix_vertical(strs: List[str]) -> str:
    """
    Find LCP using vertical scanning.

    Compare characters at each index across all strings.

    Time Complexity: O(S) where S is sum of all characters
    Space Complexity: O(1)
    """
    if not strs:
        return ""

    # Use first string as reference
    for i in range(len(strs[0])):
        char = strs[0][i]

        # Check this character against all other strings
        for j in range(1, len(strs)):
            # If we've reached end of a string or found mismatch
            if i >= len(strs[j]) or strs[j][i] != char:
                return strs[0][:i]

    return strs[0]


def longest_common_prefix_binary_search(strs: List[str]) -> str:
    """
    Find LCP using binary search on the length.

    Time Complexity: O(S * log(m)) where m is min string length
    Space Complexity: O(1)
    """
    if not strs:
        return ""

    def is_common_prefix(length: int) -> bool:
        """Check if prefix of given length is common to all strings."""
        prefix = strs[0][:length]
        return all(s.startswith(prefix) for s in strs)

    # Find minimum length
    min_len = min(len(s) for s in strs)

    # Binary search for the length of LCP
    low, high = 0, min_len

    while low < high:
        mid = (low + high + 1) // 2  # Bias towards higher

        if is_common_prefix(mid):
            low = mid
        else:
            high = mid - 1

    return strs[0][:low]


def longest_common_prefix_divide_conquer(strs: List[str]) -> str:
    """
    Find LCP using divide and conquer.

    Time Complexity: O(S) where S is sum of all characters
    Space Complexity: O(m * log(n)) for recursion stack
    """
    if not strs:
        return ""

    def common_prefix(str1: str, str2: str) -> str:
        """Find common prefix of two strings."""
        min_len = min(len(str1), len(str2))
        for i in range(min_len):
            if str1[i] != str2[i]:
                return str1[:i]
        return str1[:min_len]

    def lcp_divide(left: int, right: int) -> str:
        """Recursively find LCP of strings from left to right index."""
        if left == right:
            return strs[left]

        mid = (left + right) // 2
        lcp_left = lcp_divide(left, mid)
        lcp_right = lcp_divide(mid + 1, right)

        return common_prefix(lcp_left, lcp_right)

    return lcp_divide(0, len(strs) - 1)


def longest_common_prefix_zip(strs: List[str]) -> str:
    """
    Find LCP using Python's zip function (Pythonic approach).

    Time Complexity: O(S)
    Space Complexity: O(m) where m is min string length
    """
    if not strs:
        return ""

    prefix = []

    # Zip unpacks strings as iterables of characters
    for chars in zip(*strs):
        if len(set(chars)) == 1:
            prefix.append(chars[0])
        else:
            break

    return ''.join(prefix)


def longest_common_prefix_sort(strs: List[str]) -> str:
    """
    Find LCP by sorting and comparing first and last strings.

    After sorting, the common prefix of all strings must be the
    common prefix of the first and last strings.

    Time Complexity: O(n * m * log(n)) for sorting
    Space Complexity: O(1) or O(n) depending on sort implementation
    """
    if not strs:
        return ""

    strs_sorted = sorted(strs)
    first = strs_sorted[0]
    last = strs_sorted[-1]

    prefix = []
    for i in range(min(len(first), len(last))):
        if first[i] == last[i]:
            prefix.append(first[i])
        else:
            break

    return ''.join(prefix)


# Test cases
def run_tests():
    print("=" * 60)
    print("Longest Common Prefix - Test Cases")
    print("=" * 60)

    test_cases = [
        (["flower", "flow", "flight"], "fl"),
        (["dog", "racecar", "car"], ""),
        (["interspecies", "interstellar", "interstate"], "inters"),
        (["a"], "a"),
        ([""], ""),
        (["", "b"], ""),
        (["ab", "a"], "a"),
        (["abc", "abc", "abc"], "abc"),
        (["c", "c"], "c"),
        (["aaa", "aa", "aaa"], "aa"),
        (["prefix", "prefixes", "prefixed"], "prefix"),
    ]

    methods = [
        ("Horizontal Scanning", longest_common_prefix_horizontal),
        ("Vertical Scanning", longest_common_prefix_vertical),
        ("Binary Search", longest_common_prefix_binary_search),
        ("Divide and Conquer", longest_common_prefix_divide_conquer),
        ("Zip (Pythonic)", longest_common_prefix_zip),
        ("Sort Method", longest_common_prefix_sort),
    ]

    all_passed = True

    for method_name, method_func in methods:
        print(f"\n--- Testing {method_name} ---")

        for i, (strs, expected) in enumerate(test_cases, 1):
            result = method_func(strs)
            passed = result == expected

            print(f"\nTest {i}: {strs}")
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
