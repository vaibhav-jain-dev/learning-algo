"""
Smallest Difference - Python Solutions

Find pair from two arrays with smallest absolute difference.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List
import bisect


# ============================================================================
# APPROACH 1: Sort + Two Pointers ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n log n + m log m) - sorting dominates
# Space Complexity: O(1) - excluding sort space
#
# WHY THIS IS BEST:
# - Optimal time complexity for this problem
# - Simple logic: move pointer of smaller value
# - Early exit if exact match found
# ============================================================================

def smallest_difference(array_one: List[int], array_two: List[int]) -> List[int]:
    """
    Find pair with smallest absolute difference using two pointers.

    Key Insight: If arrays are sorted, we can skip pairs intelligently.
    - If arr1[i] < arr2[j]: Move i (makes arr1 value larger, closer to arr2[j])
    - If arr1[i] > arr2[j]: Move j (makes arr2 value larger, closer to arr1[i])
    - If equal: Perfect match! Return immediately.

    How it works:
    1. Sort both arrays
    2. Use two pointers, one per array
    3. Track best difference found
    4. Move pointer of smaller element to reduce difference

    Visual:
        arr1: [3, 10, 28]  arr2: [15, 26]
               i                  j

        3 < 15 → move i
        10 < 15 → move i
        28 > 15 → move j
        28 > 26 → move j
        j ends → return [28, 26] (diff=2)
    """
    array_one.sort()
    array_two.sort()

    i, j = 0, 0
    smallest = float('inf')
    result = []

    while i < len(array_one) and j < len(array_two):
        first = array_one[i]
        second = array_two[j]
        current_diff = abs(first - second)

        # Update best if this is smaller
        if current_diff < smallest:
            smallest = current_diff
            result = [first, second]

        # Optimal case: exact match (difference = 0)
        if first == second:
            return [first, second]

        # Move pointer of smaller element to try to reduce difference
        if first < second:
            i += 1
        else:
            j += 1

    return result


# ============================================================================
# APPROACH 2: Brute Force
# ============================================================================
# Time Complexity:  O(n × m) - check all pairs
# Space Complexity: O(1)
#
# WHEN TO USE:
# - Arrays are very small
# - Need to verify two-pointer solution
# - No sorting allowed
# ============================================================================

def smallest_difference_brute(array_one: List[int], array_two: List[int]) -> List[int]:
    """
    Find pair with smallest difference by checking all pairs.

    Simple but slow: O(n × m) time.

    How it works:
    - For each element in arr1
    - Check against every element in arr2
    - Track the pair with minimum difference
    """
    smallest = float('inf')
    result = []

    for num1 in array_one:
        for num2 in array_two:
            diff = abs(num1 - num2)
            if diff < smallest:
                smallest = diff
                result = [num1, num2]

            # Early exit if perfect match
            if diff == 0:
                return [num1, num2]

    return result


# ============================================================================
# APPROACH 3: Binary Search
# ============================================================================
# Time Complexity:  O(n log m) assuming n < m
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When one array is much larger than the other
# - When one array is already sorted
# ============================================================================

def smallest_difference_binary_search(array_one: List[int], array_two: List[int]) -> List[int]:
    """
    Use binary search to find closest element for each in smaller array.

    Useful when one array is much larger than the other.

    How it works:
    1. Sort the larger array
    2. For each element in smaller array:
       - Binary search for insertion position
       - Check neighbors for closest match
    3. Return best pair found
    """
    # Sort the second array for binary search
    array_two_sorted = sorted(array_two)

    smallest = float('inf')
    result = []

    for num1 in array_one:
        # Find insertion position
        pos = bisect.bisect_left(array_two_sorted, num1)

        # Check element at position and before it
        candidates = []
        if pos < len(array_two_sorted):
            candidates.append(array_two_sorted[pos])
        if pos > 0:
            candidates.append(array_two_sorted[pos - 1])

        for num2 in candidates:
            diff = abs(num1 - num2)
            if diff < smallest:
                smallest = diff
                result = [num1, num2]

            if diff == 0:
                return [num1, num2]

    return result


# ============================================================================
# EDUCATIONAL: Detailed Walkthrough
# ============================================================================

def smallest_difference_explained(array_one: List[int], array_two: List[int]) -> List[int]:
    """
    Same algorithm with detailed step-by-step explanation.
    """
    print(f"Input:")
    print(f"  arrayOne = {array_one}")
    print(f"  arrayTwo = {array_two}")

    array_one_sorted = sorted(array_one)
    array_two_sorted = sorted(array_two)

    print(f"\nAfter sorting:")
    print(f"  arrayOne = {array_one_sorted}")
    print(f"  arrayTwo = {array_two_sorted}")

    i, j = 0, 0
    smallest = float('inf')
    result = []

    print(f"\nTwo-pointer traversal:")

    while i < len(array_one_sorted) and j < len(array_two_sorted):
        first = array_one_sorted[i]
        second = array_two_sorted[j]
        current_diff = abs(first - second)

        print(f"  i={i}, j={j}: arr1[{i}]={first}, arr2[{j}]={second}, diff={current_diff}")

        if current_diff < smallest:
            smallest = current_diff
            result = [first, second]
            print(f"    → New best! pair={result}, diff={smallest}")

        if first == second:
            print(f"  Perfect match found! Returning {result}")
            return result

        if first < second:
            print(f"    {first} < {second}, move i")
            i += 1
        else:
            print(f"    {first} > {second}, move j")
            j += 1

    print(f"\nFinal result: {result} with diff = {smallest}")
    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array_one, array_two, expected_diff, description)
        ([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17], 2, "Standard case"),
        ([10, 1000], [1001, 11], 1, "Close large numbers"),
        ([1, 3, 5, 7], [2, 4, 5, 8], 0, "Exact match exists"),
        ([-10, -5, 0, 5], [-8, -3, 2, 7], 2, "Negative numbers"),
        ([1], [100], 99, "Single elements"),
        ([10, 5, 40, 79, 90], [7, 62, 25, 80, 12], 1, "Medium case"),
    ]

    approaches = [
        ("Sort + Two Pointers (Recommended)", smallest_difference),
        ("Brute Force", smallest_difference_brute),
        ("Binary Search", smallest_difference_binary_search),
    ]

    print("=" * 70)
    print("SMALLEST DIFFERENCE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for arr1, arr2, expected_diff, desc in test_cases:
            result = func(arr1.copy(), arr2.copy())
            actual_diff = abs(result[0] - result[1])
            status = "✓" if actual_diff == expected_diff else "✗"
            if actual_diff != expected_diff:
                all_passed = False
            print(f"  {status} {desc}: {result} (diff={actual_diff})")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    print("\n" + "=" * 70)
    print("DETAILED WALKTHROUGH")
    print("=" * 70)
    print()
    smallest_difference_explained([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17])

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    ┌─────────────────────────┬──────────────────┬──────────┬──────────────────┐
    │       Approach          │       Time       │  Space   │  Recommendation  │
    ├─────────────────────────┼──────────────────┼──────────┼──────────────────┤
    │ 1. Sort + Two Pointers  │ O(n log n+m log m)│   O(1)  │  ⭐ BEST CHOICE  │
    │ 2. Brute Force          │     O(n × m)     │   O(1)   │  ⚠️ Slow         │
    │ 3. Binary Search        │ O(n log m)       │   O(1)   │  ✓ When n << m   │
    └─────────────────────────┴──────────────────┴──────────┴──────────────────┘

    Where: n = len(arrayOne), m = len(arrayTwo)
    """)


if __name__ == "__main__":
    run_tests()
