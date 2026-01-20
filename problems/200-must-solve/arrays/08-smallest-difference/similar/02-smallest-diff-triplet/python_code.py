"""
Smallest Difference Triplet - Python Solutions

Given three arrays, find one element from each such that max - min is minimized.
"""

from typing import List


# ============================================================================
# APPROACH 1: Three Pointers ⭐ RECOMMENDED
# ============================================================================

def smallest_diff_triplet(arr1: List[int], arr2: List[int], arr3: List[int]) -> List[int]:
    """Find triplet minimizing max-min using three pointers."""
    arr1.sort()
    arr2.sort()
    arr3.sort()

    i, j, k = 0, 0, 0
    min_range = float("inf")
    result = [arr1[0], arr2[0], arr3[0]]

    while i < len(arr1) and j < len(arr2) and k < len(arr3):
        a, b, c = arr1[i], arr2[j], arr3[k]

        min_val = min(a, b, c)
        max_val = max(a, b, c)
        range_val = max_val - min_val

        if range_val < min_range:
            min_range = range_val
            result = [a, b, c]

        if min_range == 0:
            break

        # Move pointer of minimum element
        if a == min_val:
            i += 1
        elif b == min_val:
            j += 1
        else:
            k += 1

    return result


# ============================================================================
# TEST CASES
# ============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("SMALLEST DIFFERENCE TRIPLET - TEST RESULTS")
    print("=" * 70)

    test_cases = [
        ([1, 4, 5], [10, 20], [14, 19], "Standard case"),
        ([1, 2, 3], [2, 3, 4], [3, 4, 5], "Overlapping"),
        ([5], [5], [5], "All same"),
        ([1, 10, 100], [2, 20, 200], [3, 30, 300], "Spread"),
    ]

    for arr1, arr2, arr3, desc in test_cases:
        result = smallest_diff_triplet(arr1.copy(), arr2.copy(), arr3.copy())
        range_val = max(result) - min(result)
        print(f"\n{desc}:")
        print(f"  arr1={arr1}, arr2={arr2}, arr3={arr3}")
        print(f"  Result: {result} (range={range_val})")

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    arr1 = [1, 4, 5]
    arr2 = [10, 20]
    arr3 = [14, 19]
    print(f"\nInput: arr1={arr1}, arr2={arr2}, arr3={arr3}")
    result = smallest_diff_triplet(arr1, arr2, arr3)
    print(f"Output: {result} (range={max(result) - min(result)})")
