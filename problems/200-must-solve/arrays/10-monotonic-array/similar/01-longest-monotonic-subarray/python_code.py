"""
Longest Monotonic Subarray - Python Solutions

Find the length of the longest contiguous monotonic subarray.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Single Pass (Recommended)
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - constant extra space
#
# WHY THIS IS BEST:
# - Single pass through array
# - Tracks both increasing and decreasing simultaneously
# - Simple and efficient
# ============================================================================

def longest_monotonic_subarray(array: List[int]) -> int:
    """
    Find length of longest contiguous monotonic subarray.

    Tracks both non-decreasing and non-increasing sequences at each position.
    When direction changes, one resets while other may continue.

    Visual for [1, 4, 3, 2, 5, 6, 7]:

        idx: 0  1  2  3  4  5  6
        val: 1  4  3  2  5  6  7
        inc: 1  2  1  1  2  3  4  (non-decreasing length)
        dec: 1  1  2  3  1  1  1  (non-increasing length)
        max: 1  2  2  3  3  3  4

        Answer: 4 (subarray [2, 5, 6, 7])
    """
    if not array:
        return 0

    max_len = 1
    inc_len = 1  # Length of non-decreasing ending at current
    dec_len = 1  # Length of non-increasing ending at current

    for i in range(1, len(array)):
        if array[i] >= array[i - 1]:
            inc_len += 1
        else:
            inc_len = 1

        if array[i] <= array[i - 1]:
            dec_len += 1
        else:
            dec_len = 1

        max_len = max(max_len, inc_len, dec_len)

    return max_len


# ============================================================================
# APPROACH 2: Two Separate Passes
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - Clearer separation of concerns
# - Easier to debug
# ============================================================================

def longest_monotonic_two_pass(array: List[int]) -> int:
    """
    Find longest monotonic using two separate passes.

    First finds longest non-decreasing, then longest non-increasing.
    """
    if not array:
        return 0

    # Find longest non-decreasing
    max_inc = 1
    curr_inc = 1
    for i in range(1, len(array)):
        if array[i] >= array[i - 1]:
            curr_inc += 1
            max_inc = max(max_inc, curr_inc)
        else:
            curr_inc = 1

    # Find longest non-increasing
    max_dec = 1
    curr_dec = 1
    for i in range(1, len(array)):
        if array[i] <= array[i - 1]:
            curr_dec += 1
            max_dec = max(max_dec, curr_dec)
        else:
            curr_dec = 1

    return max(max_inc, max_dec)


# ============================================================================
# APPROACH 3: DP with Arrays (For visualization/debugging)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - stores all lengths
#
# WHEN TO USE:
# - Need to see full state at each position
# - Debugging or educational purposes
# ============================================================================

def longest_monotonic_dp(array: List[int]) -> tuple[int, int, int]:
    """
    DP approach that stores all intermediate values.

    Returns (max_length, start_index, end_index) of longest monotonic subarray.
    """
    if not array:
        return 0, -1, -1

    n = len(array)
    inc = [1] * n  # Non-decreasing length ending at i
    dec = [1] * n  # Non-increasing length ending at i

    for i in range(1, n):
        if array[i] >= array[i - 1]:
            inc[i] = inc[i - 1] + 1
        if array[i] <= array[i - 1]:
            dec[i] = dec[i - 1] + 1

    # Find maximum and its position
    max_len = 1
    end_idx = 0
    is_increasing = True

    for i in range(n):
        if inc[i] > max_len:
            max_len = inc[i]
            end_idx = i
            is_increasing = True
        if dec[i] > max_len:
            max_len = dec[i]
            end_idx = i
            is_increasing = False

    start_idx = end_idx - max_len + 1
    return max_len, start_idx, end_idx


# ============================================================================
# BONUS: Get the actual subarray
# ============================================================================

def get_longest_monotonic_subarray(array: List[int]) -> List[int]:
    """
    Return the actual longest monotonic subarray.
    """
    max_len, start, end = longest_monotonic_dp(array)
    if start == -1:
        return []
    return array[start:end + 1]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, expected_length, description)
        ([1, 4, 3, 2, 5, 6, 7], 4, "Standard case"),
        ([5, 4, 3, 2, 1], 5, "All decreasing"),
        ([1, 2, 3, 4, 5], 5, "All increasing"),
        ([1, 2, 2, 3, 1], 4, "With equal elements"),
        ([1], 1, "Single element"),
        ([], 0, "Empty array"),
        ([1, 3, 2, 4, 3, 5], 2, "Alternating"),
        ([5, 5, 5, 5], 4, "All equal"),
        ([1, 2, 1, 2, 1], 2, "Zigzag"),
    ]

    approaches = [
        ("Single Pass (Recommended)", longest_monotonic_subarray),
        ("Two Passes", longest_monotonic_two_pass),
        ("DP Array", lambda arr: longest_monotonic_dp(arr)[0]),
    ]

    print("=" * 70)
    print("LONGEST MONOTONIC SUBARRAY - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, expected, desc in test_cases:
            result = func(array)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  {status}: {desc}: {result} (expected {expected})")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    array = [1, 4, 3, 2, 5, 6, 7]
    print(f"\nInput: array = {array}")
    result = longest_monotonic_subarray(array)
    subarray = get_longest_monotonic_subarray(array)
    print(f"Output: {result}")
    print(f"Subarray: {subarray}")

    # Sample Input 2
    array = [5, 4, 3, 2, 1]
    print(f"\nInput: array = {array}")
    result = longest_monotonic_subarray(array)
    subarray = get_longest_monotonic_subarray(array)
    print(f"Output: {result}")
    print(f"Subarray: {subarray}")

    # Sample Input 3
    array = [1, 2, 2, 3, 1]
    print(f"\nInput: array = {array}")
    result = longest_monotonic_subarray(array)
    subarray = get_longest_monotonic_subarray(array)
    print(f"Output: {result}")
    print(f"Subarray: {subarray}")
