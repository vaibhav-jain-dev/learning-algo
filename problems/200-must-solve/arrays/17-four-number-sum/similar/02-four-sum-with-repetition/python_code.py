"""
Four Sum with Repetition - Python Solutions

Find quadruplets where elements can be reused.
"""

from typing import List
from collections import defaultdict


def four_sum_with_repetition(array: List[int], target: int) -> List[List[int]]:
    """
    Find all quadruplets summing to target, allowing element repetition.

    Uses hash map of pair sums.
    Time: O(n^2), Space: O(n^2)
    """
    if len(array) < 2:
        return []

    pair_sums = defaultdict(list)
    result = set()

    # Store all pair sums (including same element pairs)
    for i, a in enumerate(array):
        for j, b in enumerate(array):
            pair_sums[a + b].append((a, b))

    # Find complementary pairs
    for pair_sum, pairs in pair_sums.items():
        complement = target - pair_sum
        if complement in pair_sums:
            for a, b in pairs:
                for c, d in pair_sums[complement]:
                    quad = tuple(sorted([a, b, c, d]))
                    result.add(quad)

    return [list(q) for q in result]


def run_tests():
    test_cases = [
        ([1, 2], 6, [[1, 1, 2, 2]], "Simple case"),
        ([2, 3], 10, [[2, 2, 3, 3]], "Another simple"),
        ([1], 4, [[1, 1, 1, 1]], "Single element"),
    ]

    print("=" * 60)
    print("FOUR SUM WITH REPETITION - TEST RESULTS")
    print("=" * 60)

    for array, target, expected, desc in test_cases:
        result = four_sum_with_repetition(array, target)
        result_sorted = sorted([sorted(x) for x in result])
        expected_sorted = sorted([sorted(x) for x in expected])
        status = "PASS" if result_sorted == expected_sorted else "FAIL"
        print(f"  {status}: {desc}: {result}")


if __name__ == "__main__":
    run_tests()
