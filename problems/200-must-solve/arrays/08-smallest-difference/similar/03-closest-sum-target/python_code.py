"""
Closest Sum to Target - Python Solutions

Find one number from each of two arrays with sum closest to target.
"""

from typing import List
import bisect


# ============================================================================
# APPROACH 1: Two Pointers ⭐ RECOMMENDED
# ============================================================================

def closest_sum_to_target(arr1: List[int], arr2: List[int], target: int) -> List[int]:
    """Find pair from two arrays closest to target using two pointers."""
    arr1.sort()
    arr2.sort()

    i, j = 0, len(arr2) - 1
    min_diff = float("inf")
    result = [arr1[0], arr2[0]]

    while i < len(arr1) and j >= 0:
        current_sum = arr1[i] + arr2[j]
        diff = abs(current_sum - target)

        if diff < min_diff:
            min_diff = diff
            result = [arr1[i], arr2[j]]

        if current_sum == target:
            return result
        elif current_sum < target:
            i += 1
        else:
            j -= 1

    return result


# ============================================================================
# APPROACH 2: Binary Search
# ============================================================================

def closest_sum_binary_search(arr1: List[int], arr2: List[int], target: int) -> List[int]:
    """Use binary search to find closest complement."""
    sorted_arr2 = sorted(arr2)

    min_diff = float("inf")
    result = [arr1[0], arr2[0]]

    for a in arr1:
        complement = target - a

        # Binary search for closest
        idx = bisect.bisect_left(sorted_arr2, complement)

        # Check idx and idx-1
        for i in [idx - 1, idx]:
            if 0 <= i < len(sorted_arr2):
                diff = abs(a + sorted_arr2[i] - target)
                if diff < min_diff:
                    min_diff = diff
                    result = [a, sorted_arr2[i]]

    return result


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("CLOSEST SUM TO TARGET - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        ([1, 3, 5], [2, 4, 6], 8, "Standard case"),
        ([-1, 3, 8], [2, 4, 9], 7, "Exact match"),
        ([1, 2, 3], [4, 5, 6], 100, "Far from target"),
        ([5], [10], 12, "Single elements"),
    ]

    for arr1, arr2, target, desc in test_cases:
        result = closest_sum_to_target(arr1.copy(), arr2.copy(), target)
        total = result[0] + result[1]
        print(f"\n{desc}:")
        print(f"  arr1={arr1}, arr2={arr2}, target={target}")
        print(f"  Result: {result} (sum={total}, diff={abs(total - target)})")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    arr1 = [1, 3, 5]
    arr2 = [2, 4, 6]
    target = 8
    print(f"\nInput: arr1={arr1}, arr2={arr2}, target={target}")
    result = closest_sum_to_target(arr1, arr2, target)
    print(f"Output: {result} (sum={result[0] + result[1]})")
