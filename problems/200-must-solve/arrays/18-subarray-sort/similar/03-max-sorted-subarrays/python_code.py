"""
Maximum Sorted Subarrays (Max Chunks) - Python Solutions
"""

from typing import List


def max_chunks_to_sorted(arr: List[int]) -> int:
    """
    Find max chunks to sort the array independently.

    Key insight: Split at i if max(arr[0..i]) <= min(arr[i+1..n-1])
    Precompute prefix max and suffix min.

    Time: O(n), Space: O(n)
    """
    if not arr:
        return 0

    n = len(arr)

    # Prefix maximum
    prefix_max = [0] * n
    prefix_max[0] = arr[0]
    for i in range(1, n):
        prefix_max[i] = max(prefix_max[i - 1], arr[i])

    # Suffix minimum
    suffix_min = [0] * n
    suffix_min[-1] = arr[-1]
    for i in range(n - 2, -1, -1):
        suffix_min[i] = min(suffix_min[i + 1], arr[i])

    # Count valid split points
    chunks = 1  # At least one chunk
    for i in range(n - 1):
        if prefix_max[i] <= suffix_min[i + 1]:
            chunks += 1

    return chunks


def max_chunks_simple(arr: List[int]) -> int:
    """
    For arr containing 0 to n-1 (permutation):
    Count positions where max(arr[0..i]) == i

    Time: O(n), Space: O(1)
    """
    chunks = 0
    max_so_far = 0

    for i, val in enumerate(arr):
        max_so_far = max(max_so_far, val)
        if max_so_far == i:
            chunks += 1

    return chunks


def run_tests():
    test_cases = [
        ([1, 0, 2, 3, 4], 4, "Multiple chunks"),
        ([4, 3, 2, 1, 0], 1, "Single chunk"),
        ([0, 1, 2, 3, 4], 5, "All separate"),
        ([2, 1, 3, 4, 4], 3, "With duplicates"),
    ]

    print("=" * 60)
    print("MAX CHUNKS TO SORTED - TEST RESULTS")
    print("=" * 60)

    for arr, expected, desc in test_cases:
        result = max_chunks_to_sorted(arr)
        status = "PASS" if result == expected else "FAIL"
        print(f"  {status}: {desc}: {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()
