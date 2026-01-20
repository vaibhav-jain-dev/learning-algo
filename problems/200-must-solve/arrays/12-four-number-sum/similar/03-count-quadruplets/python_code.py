"""
Count Quadruplets with Sum - Python Solutions

Count quadruplets (different indices) summing to target.
"""

from typing import List
from collections import defaultdict


def count_quadruplets(array: List[int], target: int) -> int:
    """
    Count quadruplets (i<j<k<l) where sum equals target.

    Use hash map to store count of pair sums seen so far.
    Process from right, for each pair (k,l), check complement pairs.

    Time: O(n^2), Space: O(n^2)
    """
    n = len(array)
    if n < 4:
        return 0

    count = 0
    pair_sum_count = defaultdict(int)

    # For each pair (j, k) as middle elements
    for j in range(1, n - 2):
        # Add all pairs (i, j-1) to hash map (pairs ending before j)
        for i in range(j):
            pair_sum_count[array[i] + array[j - 1]] += 1

        # This is wrong - let me reconsider

    # Better approach: for each k
    pair_sum_count = defaultdict(int)

    for k in range(n - 1):
        # Check pairs (k, l) against stored pairs
        for l in range(k + 1, n):
            complement = target - array[k] - array[l]
            count += pair_sum_count[complement]

        # Add pairs (i, k) to hash map for future use
        for i in range(k):
            pair_sum_count[array[i] + array[k]] += 1

    return count


def count_quadruplets_brute(array: List[int], target: int) -> int:
    """Brute force for verification. O(n^4)"""
    n = len(array)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                for l in range(k + 1, n):
                    if array[i] + array[j] + array[k] + array[l] == target:
                        count += 1
    return count


def run_tests():
    test_cases = [
        ([1, 1, 1, 1], 4, 1, "All ones"),
        ([1, 2, 3, 4], 10, 1, "Sequential"),
        ([1, 1, 1, 1, 1], 4, 5, "Five ones"),
    ]

    print("=" * 60)
    print("COUNT QUADRUPLETS - TEST RESULTS")
    print("=" * 60)

    for array, target, expected, desc in test_cases:
        result = count_quadruplets(array, target)
        brute = count_quadruplets_brute(array, target)
        status = "PASS" if result == brute else "FAIL"
        print(f"  {status}: {desc}: got {result}, brute {brute} (expected {expected})")


if __name__ == "__main__":
    run_tests()

    print("\n--- Sample Input ---")
    array = [1, 2, 3, 4, 5]
    target = 10
    print(f"Array: {array}, Target: {target}")
    print(f"Count: {count_quadruplets(array, target)}")
    print(f"Brute: {count_quadruplets_brute(array, target)}")
