"""
Longest Happy Prefix - Python Solution

Time Complexity: O(n)
Space Complexity: O(n)
"""


def longest_prefix(s: str) -> str:
    """
    Find the longest prefix which is also a suffix.
    """
    n = len(s)
    if n <= 1:
        return ""

    # Build LPS array
    lps = [0] * n
    length = 0
    i = 1

    while i < n:
        if s[i] == s[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length != 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1

    return s[:lps[n - 1]]


# Test cases
if __name__ == "__main__":
    print(f"Test 1: '{longest_prefix('level')}'")  # Expected: "l"
    print(f"Test 2: '{longest_prefix('ababab')}'")  # Expected: "abab"
    print(f"Test 3: '{longest_prefix('leetcodeleet')}'")  # Expected: "leet"
    print(f"Test 4: '{longest_prefix('a')}'")  # Expected: ""
    print("\nAll tests completed!")
