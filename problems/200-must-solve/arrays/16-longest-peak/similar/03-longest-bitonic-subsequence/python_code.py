"""
Longest Bitonic Subsequence - Python Solutions

Find longest subsequence that first increases then decreases.
"""

from typing import List


def longest_bitonic_subsequence(array: List[int]) -> int:
    """
    Find length of longest bitonic subsequence.

    Strategy:
    1. Compute LIS ending at each index (from left)
    2. Compute LDS starting at each index (from right)
    3. For each index, bitonic length = LIS[i] + LDS[i] - 1

    Time: O(n^2), Space: O(n)
    """
    if not array:
        return 0

    n = len(array)

    # LIS ending at each index
    lis = [1] * n
    for i in range(1, n):
        for j in range(i):
            if array[i] > array[j]:
                lis[i] = max(lis[i], lis[j] + 1)

    # LDS starting at each index (compute from right)
    lds = [1] * n
    for i in range(n - 2, -1, -1):
        for j in range(i + 1, n):
            if array[i] > array[j]:
                lds[i] = max(lds[i], lds[j] + 1)

    # Find maximum bitonic length
    max_len = 0
    for i in range(n):
        max_len = max(max_len, lis[i] + lds[i] - 1)

    return max_len


def longest_bitonic_with_sequence(array: List[int]) -> tuple[int, List[int]]:
    """Return length and one valid bitonic subsequence."""
    if not array:
        return 0, []

    n = len(array)

    # LIS with parent tracking
    lis = [1] * n
    lis_parent = [-1] * n
    for i in range(1, n):
        for j in range(i):
            if array[i] > array[j] and lis[j] + 1 > lis[i]:
                lis[i] = lis[j] + 1
                lis_parent[i] = j

    # LDS with parent tracking
    lds = [1] * n
    lds_child = [-1] * n
    for i in range(n - 2, -1, -1):
        for j in range(i + 1, n):
            if array[i] > array[j] and lds[j] + 1 > lds[i]:
                lds[i] = lds[j] + 1
                lds_child[i] = j

    # Find peak index
    max_len = 0
    peak_idx = 0
    for i in range(n):
        if lis[i] + lds[i] - 1 > max_len:
            max_len = lis[i] + lds[i] - 1
            peak_idx = i

    # Reconstruct sequence
    # Increasing part (backtrack from peak)
    inc_part = []
    idx = peak_idx
    while idx != -1:
        inc_part.append(array[idx])
        idx = lis_parent[idx]
    inc_part.reverse()

    # Decreasing part (forward from peak)
    dec_part = []
    idx = lds_child[peak_idx]
    while idx != -1:
        dec_part.append(array[idx])
        idx = lds_child[idx]

    return max_len, inc_part + dec_part


def run_tests():
    test_cases = [
        ([1, 11, 2, 10, 4, 5, 2, 1], 6, "Standard case"),
        ([1, 2, 3, 4, 5], 5, "Only increasing"),
        ([5, 4, 3, 2, 1], 5, "Only decreasing"),
        ([1, 3, 2], 3, "Simple bitonic"),
        ([1], 1, "Single element"),
    ]

    print("=" * 60)
    print("LONGEST BITONIC SUBSEQUENCE - TEST RESULTS")
    print("=" * 60)

    for array, expected, desc in test_cases:
        result = longest_bitonic_subsequence(array)
        status = "PASS" if result == expected else "FAIL"
        print(f"  {status}: {desc}: {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()

    print("\n--- Sample Input ---")
    array = [1, 11, 2, 10, 4, 5, 2, 1]
    length, seq = longest_bitonic_with_sequence(array)
    print(f"Array: {array}")
    print(f"Longest bitonic length: {length}")
    print(f"One valid subsequence: {seq}")
