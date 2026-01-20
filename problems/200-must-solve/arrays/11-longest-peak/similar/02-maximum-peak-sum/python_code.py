"""
Maximum Peak Sum - Python Solutions

Find the peak with maximum sum of elements.
"""

from typing import List


def max_peak_sum(array: List[int]) -> int:
    """
    Find peak with maximum sum.

    1. Identify tips (element > both neighbors)
    2. Expand from each tip to find full peak
    3. Calculate sum, track maximum

    Time: O(n), Space: O(1)
    """
    if len(array) < 3:
        return 0

    max_sum = 0
    i = 1

    while i < len(array) - 1:
        # Check if this is a tip
        is_tip = array[i] > array[i - 1] and array[i] > array[i + 1]

        if not is_tip:
            i += 1
            continue

        # Expand left while strictly increasing
        left = i - 1
        while left > 0 and array[left] > array[left - 1]:
            left -= 1

        # Expand right while strictly decreasing
        right = i + 1
        while right < len(array) - 1 and array[right] > array[right + 1]:
            right += 1

        # Calculate peak sum
        peak_sum = sum(array[left:right + 1])
        max_sum = max(max_sum, peak_sum)

        # Skip to end of current peak
        i = right

        i += 1

    return max_sum


def max_peak_sum_with_details(array: List[int]) -> tuple[int, List[int]]:
    """Return max sum and the actual peak elements."""
    if len(array) < 3:
        return 0, []

    max_sum = 0
    best_peak = []
    i = 1

    while i < len(array) - 1:
        is_tip = array[i] > array[i - 1] and array[i] > array[i + 1]

        if not is_tip:
            i += 1
            continue

        left = i - 1
        while left > 0 and array[left] > array[left - 1]:
            left -= 1

        right = i + 1
        while right < len(array) - 1 and array[right] > array[right + 1]:
            right += 1

        peak = array[left:right + 1]
        peak_sum = sum(peak)

        if peak_sum > max_sum:
            max_sum = peak_sum
            best_peak = peak

        i = right + 1

    return max_sum, best_peak


def run_tests():
    test_cases = [
        ([1, 10, 2, 100, 50, 1], 153, "Two peaks"),
        ([1, 3, 2], 6, "Single peak"),
        ([1, 2, 3, 4, 5], 0, "No peak"),
        ([5, 4, 3, 2, 1], 0, "No peak"),
        ([1, 5, 1, 5, 1], 7, "Multiple equal peaks"),
    ]

    print("=" * 60)
    print("MAXIMUM PEAK SUM - TEST RESULTS")
    print("=" * 60)

    for array, expected, desc in test_cases:
        result = max_peak_sum(array)
        status = "PASS" if result == expected else "FAIL"
        print(f"  {status}: {desc}: {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()

    print("\n--- Sample Input ---")
    array = [1, 10, 2, 100, 50, 1]
    max_s, peak = max_peak_sum_with_details(array)
    print(f"Array: {array}")
    print(f"Maximum peak sum: {max_s}")
    print(f"Peak elements: {peak}")
