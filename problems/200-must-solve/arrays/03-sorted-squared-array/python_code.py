"""
Sorted Squared Array - Python Solutions

Given a sorted array, return a new sorted array of the squares.
The challenge is handling negative numbers efficiently.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Two-Pointer (Fill from End) ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass through array
# Space Complexity: O(n) - for result array
#
# WHY THIS IS BEST:
# - Leverages the sorted property optimally
# - Single pass, no re-sorting needed
# - Most efficient time complexity possible
# - Works beautifully with negative numbers
# ============================================================================

def sorted_squared_array(array: List[int]) -> List[int]:
    """
    Return sorted array of squares using two-pointer technique.

    Key Insight: The largest squared value is ALWAYS at one of the ENDS
    of the sorted array (leftmost negative or rightmost positive).

    How it works:
    1. Two pointers: left at start, right at end
    2. Compare absolute values at both pointers
    3. Place larger squared value at END of result
    4. Move the pointer that had the larger value inward
    5. Fill result array backwards (largest to smallest)

    Visual:
        array = [-7, -3, 1, 9]
                 L        R

        |-7| = 7, |9| = 9
        9 > 7, so result[-1] = 81, move R left

        [-7, -3, 1, 9]     result = [_, _, _, 81]
         L     R

        |-7| = 7, |1| = 1
        7 > 1, so result[-2] = 49, move L right

        ... and so on
    """
    n = len(array)
    result = [0] * n
    left = 0
    right = n - 1

    # Fill from the end (largest values first)
    for i in range(n - 1, -1, -1):
        left_val = abs(array[left])
        right_val = abs(array[right])

        if left_val > right_val:
            result[i] = left_val * left_val
            left += 1
        else:
            result[i] = right_val * right_val
            right -= 1

    return result


# ============================================================================
# APPROACH 2: Square and Sort (Brute Force)
# ============================================================================
# Time Complexity:  O(n log n) - due to sorting
# Space Complexity: O(n) - for result array
#
# WHEN TO USE:
# - When simplicity matters more than optimal performance
# - Quick implementation in interviews if time is short
# - Good starting point before optimizing
#
# WHY IT'S SUBOPTIMAL:
# - Doesn't leverage the fact that input is already sorted
# - O(n log n) vs O(n) for two-pointer approach
# ============================================================================

def sorted_squared_array_simple(array: List[int]) -> List[int]:
    """
    Simple brute force: square all elements and sort.

    How it works:
    1. Square every element in the array
    2. Sort the resulting array

    Visual:
        [-7, -3, 1, 9]
        → [49, 9, 1, 81]  (after squaring)
        → [1, 9, 49, 81]  (after sorting)

    Simple but doesn't use the sorted property of input.
    """
    return sorted([x * x for x in array])


# ============================================================================
# APPROACH 3: Find Split Point + Merge
# ============================================================================
# Time Complexity:  O(n) - find split O(n) + merge O(n)
# Space Complexity: O(n) - for result array
#
# EDUCATIONAL VALUE:
# - Demonstrates merge-sort thinking
# - Useful when input is naturally partitioned
# - Shows alternative O(n) approach
#
# WHY TWO-POINTER IS STILL PREFERRED:
# - This approach is more complex to implement
# - Requires handling edge cases (all positive/negative)
# - Two-pointer is more elegant and less error-prone
# ============================================================================

def sorted_squared_array_merge(array: List[int]) -> List[int]:
    """
    Find where negatives end, then merge two sorted sequences.

    How it works:
    1. Find the split point (where negative numbers end)
    2. Negatives squared (reversed) form one sorted sequence
    3. Positives squared form another sorted sequence
    4. Merge the two sequences

    Visual:
        [-7, -3, 1, 9]

        Split: negatives = [-7, -3], positives = [1, 9]

        Square negatives (iterate backwards): [9, 49]
        Square positives: [1, 81]

        Merge: [1, 9, 49, 81]

    This is like merge sort's merge step!
    """
    n = len(array)
    if n == 0:
        return []

    # Find split point (first non-negative index)
    split = 0
    while split < n and array[split] < 0:
        split += 1

    # Two pointers for merge
    # neg_ptr goes backwards through negatives
    # pos_ptr goes forward through non-negatives
    neg_ptr = split - 1
    pos_ptr = split
    result = []

    # Merge two sorted sequences
    while neg_ptr >= 0 and pos_ptr < n:
        neg_squared = array[neg_ptr] * array[neg_ptr]
        pos_squared = array[pos_ptr] * array[pos_ptr]

        if neg_squared < pos_squared:
            result.append(neg_squared)
            neg_ptr -= 1
        else:
            result.append(pos_squared)
            pos_ptr += 1

    # Add remaining negatives (squared)
    while neg_ptr >= 0:
        result.append(array[neg_ptr] * array[neg_ptr])
        neg_ptr -= 1

    # Add remaining positives (squared)
    while pos_ptr < n:
        result.append(array[pos_ptr] * array[pos_ptr])
        pos_ptr += 1

    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, expected, description)
        ([1, 2, 3, 5, 6, 8, 9], [1, 4, 9, 25, 36, 64, 81], "All positive"),
        ([-5, -4, -3, -2, -1], [1, 4, 9, 16, 25], "All negative"),
        ([-7, -3, 1, 9, 22, 30], [1, 9, 49, 81, 484, 900], "Mixed"),
        ([-4, -2, 0, 1, 3], [0, 1, 4, 9, 16], "With zero"),
        ([-5], [25], "Single negative"),
        ([5], [25], "Single positive"),
        ([-3, -2, -1, 0, 1, 2, 3], [0, 1, 1, 4, 4, 9, 9], "Symmetric"),
        ([-10, -5, 0, 5, 10], [0, 25, 25, 100, 100], "Symmetric with zero"),
    ]

    approaches = [
        ("Two-Pointer (Recommended)", sorted_squared_array),
        ("Square and Sort", sorted_squared_array_simple),
        ("Split + Merge", sorted_squared_array_merge),
    ]

    print("=" * 70)
    print("SORTED SQUARED ARRAY - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, expected, desc in test_cases:
            result = func(array.copy())
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: {result}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    ┌───────────────────────────┬───────────┬──────────┬──────────────────┐
    │         Approach          │   Time    │  Space   │  Recommendation  │
    ├───────────────────────────┼───────────┼──────────┼──────────────────┤
    │ 1. Two-Pointer (Fill End) │   O(n)    │   O(n)   │  ⭐ BEST CHOICE  │
    │ 2. Square and Sort        │ O(n log n)│   O(n)   │  ✓ Simple        │
    │ 3. Split + Merge          │   O(n)    │   O(n)   │  ⚠️ Complex      │
    └───────────────────────────┴───────────┴──────────┴──────────────────┘
    """)


if __name__ == "__main__":
    run_tests()
