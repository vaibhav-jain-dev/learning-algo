"""
Sorted Squared Array Without Duplicates - Python Solutions

Square elements and return sorted unique values.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Two Pointers with Deduplication ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(n) - for result (worst case all unique)
#
# WHY THIS IS BEST:
# - Optimal time complexity
# - Handles deduplication inline
# - No need for extra set
# ============================================================================

def sorted_squared_unique(array: List[int]) -> List[int]:
    """
    Square and deduplicate using two pointers.

    Key Insight: Build result from largest to smallest, skip duplicates.

    Visual for [-3, -2, -1, 1, 2, 3]:
        L                   R
        -3  -2  -1  1  2  3

        |−3|² = 9, |3|² = 9 → both equal, add 9, move both
        |−2|² = 4, |2|² = 4 → both equal, add 4, move both
        |−1|² = 1, |1|² = 1 → both equal, add 1, move both

        Result (reversed): [1, 4, 9]
    """
    if not array:
        return []

    n = len(array)
    result = []
    left, right = 0, n - 1
    last_added = None

    while left <= right:
        left_sq = array[left] ** 2
        right_sq = array[right] ** 2

        if left_sq > right_sq:
            if last_added is None or left_sq != last_added:
                result.append(left_sq)
                last_added = left_sq
            left += 1
        elif right_sq > left_sq:
            if last_added is None or right_sq != last_added:
                result.append(right_sq)
                last_added = right_sq
            right -= 1
        else:  # left_sq == right_sq
            if last_added is None or left_sq != last_added:
                result.append(left_sq)
                last_added = left_sq
            left += 1
            right -= 1

    # Result is in descending order, reverse it
    return result[::-1]


# ============================================================================
# APPROACH 2: Set-Based Deduplication
# ============================================================================
# Time Complexity:  O(n log n) - due to sorting
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When simplicity is preferred over optimization
# - When input isn't sorted
# ============================================================================

def sorted_squared_unique_set(array: List[int]) -> List[int]:
    """
    Use a set to handle duplicates, then sort.

    Simple but not optimal - O(n log n) due to sorting.
    """
    # Use set comprehension for Pythonic deduplication
    unique_squares = {x ** 2 for x in array}
    return sorted(unique_squares)


# ============================================================================
# APPROACH 3: Two Pointers with Set Check
# ============================================================================
# Time Complexity:  O(n) average
# Space Complexity: O(n)
#
# WHEN TO USE:
# - When you want O(n) but simpler logic than approach 1
# ============================================================================

def sorted_squared_unique_hybrid(array: List[int]) -> List[int]:
    """
    Two pointers to build sorted squares, use set for dedup.
    """
    if not array:
        return []

    n = len(array)
    result = []
    seen = set()
    left, right = 0, n - 1

    while left <= right:
        left_sq = array[left] ** 2
        right_sq = array[right] ** 2

        if left_sq >= right_sq:
            if left_sq not in seen:
                result.append(left_sq)
                seen.add(left_sq)
            left += 1
        else:
            if right_sq not in seen:
                result.append(right_sq)
                seen.add(right_sq)
            right -= 1

    return result[::-1]


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, expected, description)
        ([-3, -2, -1, 1, 2, 3], [1, 4, 9], "Symmetric pairs"),
        ([-5, -3, 0, 2, 3, 5], [0, 4, 9, 25], "With zero"),
        ([1, 2, 3, 4, 5], [1, 4, 9, 16, 25], "All positive"),
        ([-5, -4, -3, -2, -1], [1, 4, 9, 16, 25], "All negative"),
        ([-1, 1], [1], "Single duplicate"),
        ([0], [0], "Single zero"),
        ([], [], "Empty array"),
    ]

    approaches = [
        ("Two Pointers (Recommended)", sorted_squared_unique),
        ("Set-Based", sorted_squared_unique_set),
        ("Hybrid", sorted_squared_unique_hybrid),
    ]

    print("=" * 70)
    print("SORTED SQUARED UNIQUE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, expected, desc in test_cases:
            result = func(array[:])
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: {result}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    array = [-3, -2, -1, 1, 2, 3]
    print(f"\nInput: array = {array}")
    print(f"Output: {sorted_squared_unique(array)}")

    # Sample Input 2
    array = [-5, -3, 0, 2, 3, 5]
    print(f"\nInput: array = {array}")
    print(f"Output: {sorted_squared_unique(array)}")
