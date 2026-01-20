"""
Count Number of Peaks - Python Solutions

Count total valid peaks in an array.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


def count_peaks(array: List[int]) -> int:
    """
    Count number of peaks in array.

    A peak is an element strictly greater than both neighbors.
    Edge elements cannot be peaks.

    Time: O(n), Space: O(1)
    """
    if len(array) < 3:
        return 0

    count = 0
    for i in range(1, len(array) - 1):
        if array[i] > array[i - 1] and array[i] > array[i + 1]:
            count += 1

    return count


def count_peaks_pythonic(array: List[int]) -> int:
    """Pythonic one-liner using sum and generator."""
    return sum(
        1 for i in range(1, len(array) - 1)
        if array[i] > array[i - 1] and array[i] > array[i + 1]
    )


def count_peaks_with_indices(array: List[int]) -> tuple[int, List[int]]:
    """Return count and indices of all peaks."""
    if len(array) < 3:
        return 0, []

    peaks = [
        i for i in range(1, len(array) - 1)
        if array[i] > array[i - 1] and array[i] > array[i + 1]
    ]

    return len(peaks), peaks


def run_tests():
    test_cases = [
        ([1, 3, 2, 4, 1, 5, 2], 3, "Standard case"),
        ([1, 2, 3, 4, 5], 0, "No peaks"),
        ([5, 4, 3, 4, 5], 0, "Valley not peak"),
        ([1, 3, 1], 1, "Single peak"),
        ([1, 2], 0, "Too short"),
        ([], 0, "Empty array"),
    ]

    print("=" * 60)
    print("COUNT NUMBER OF PEAKS - TEST RESULTS")
    print("=" * 60)

    for array, expected, desc in test_cases:
        result = count_peaks(array)
        status = "PASS" if result == expected else "FAIL"
        print(f"  {status}: {desc}: {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()

    print("\n--- Sample Input ---")
    array = [1, 3, 2, 4, 1, 5, 2]
    count, indices = count_peaks_with_indices(array)
    print(f"Array: {array}")
    print(f"Peak count: {count}")
    print(f"Peak indices: {indices}")
    print(f"Peak values: {[array[i] for i in indices]}")
