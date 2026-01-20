"""
First Duplicate Value - Python Solutions

Find the first integer that appears more than once (minimum index of second occurrence).
Values are between 1 and n where n is array length.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List


# ============================================================================
# APPROACH 1: Hash Set
# ============================================================================
# Time Complexity:  O(n) - single pass through array
# Space Complexity: O(n) - hash set stores seen values
#
# WHY THIS APPROACH:
# - Simple and clear
# - Works for any array (no value constraints)
# - Doesn't mutate input
# ============================================================================

def first_duplicate_value_hash_set(array: List[int]) -> int:
    """
    Find first duplicate using hash set.

    How it works:
    1. Maintain set of seen values
    2. For each value, check if already seen
    3. If yes, return it (first duplicate)
    4. If no, add to set

    Visual:
        array = [2, 1, 5, 2, 3, 3, 4]

        v=2: seen={}, add 2 -> seen={2}
        v=1: seen={2}, add 1 -> seen={2,1}
        v=5: seen={2,1}, add 5 -> seen={2,1,5}
        v=2: 2 in seen! Return 2
    """
    seen = set()

    for value in array:
        if value in seen:
            return value
        seen.add(value)

    return -1


# ============================================================================
# APPROACH 2: Negative Marking (O(1) Space) - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass through array
# Space Complexity: O(1) - no extra space (mutates input)
#
# WHY THIS IS BEST:
# - Optimal space complexity
# - Clever use of array as implicit hash map
# - Demonstrates creative problem-solving
#
# REQUIREMENT: Values must be 1 to n, and mutation is allowed
# ============================================================================

def first_duplicate_value(array: List[int]) -> int:
    """
    Find first duplicate using negative marking technique.

    How it works:
    Since values are 1 to n (array length), we can use indices as markers:
    - For value v, check index abs(v) - 1
    - If value at that index is negative, v is a duplicate
    - Otherwise, negate value at that index to mark v as seen

    Visual:
        array = [2, 1, 5, 2, 3, 3, 4]

        v=2: index=1, array[1]=1 (pos) -> mark: array[1]=-1
             array = [2, -1, 5, 2, 3, 3, 4]

        v=-1 (abs=1): index=0, array[0]=2 (pos) -> mark: array[0]=-2
             array = [-2, -1, 5, 2, 3, 3, 4]

        v=5: index=4, array[4]=3 (pos) -> mark: array[4]=-3
             array = [-2, -1, 5, 2, -3, 3, 4]

        v=2: index=1, array[1]=-1 (NEGATIVE!) -> 2 is duplicate!
        Return 2
    """
    for value in array:
        abs_value = abs(value)
        index = abs_value - 1

        # If value at index is negative, we've seen abs_value before
        if array[index] < 0:
            return abs_value

        # Mark as seen by negating
        array[index] = -array[index]

    return -1


# ============================================================================
# APPROACH 3: Brute Force
# ============================================================================
# Time Complexity:  O(n^2) - for each element, scan rest of array
# Space Complexity: O(1) - no extra space
#
# EDUCATIONAL VALUE:
# - Shows baseline approach
# - Doesn't mutate input
# - Demonstrates why optimization matters
# ============================================================================

def first_duplicate_value_brute_force(array: List[int]) -> int:
    """
    Find first duplicate using brute force.

    How it works:
    1. For each index i, look for same value at index j > i
    2. Track the minimum index of second occurrence
    3. Return corresponding value

    Why it's slow:
        For each element, we potentially scan all remaining elements.
        Worst case: n * (n-1) / 2 comparisons = O(n^2)
    """
    min_second_index = len(array)
    result = -1

    for i in range(len(array)):
        for j in range(i + 1, len(array)):
            if array[i] == array[j] and j < min_second_index:
                min_second_index = j
                result = array[i]
                break  # Found second occurrence for array[i]

    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, expected, description)
        ([2, 1, 5, 2, 3, 3, 4], 2, "Standard case - 2 first"),
        ([2, 1, 5, 3, 3, 2, 4], 3, "3's second occurs before 2's second"),
        ([1, 2, 3, 4, 5], -1, "No duplicates"),
        ([1, 1, 2, 3, 3, 2, 2], 1, "First element duplicated"),
        ([2, 1, 1], 1, "Small array"),
        ([1], -1, "Single element"),
        ([1, 1], 1, "Two same elements"),
        ([1, 2, 3, 4, 5, 5], 5, "Duplicate at end"),
        ([3, 1, 3, 1, 1, 4, 4], 3, "Multiple duplicates"),
    ]

    # Note: Hash set doesn't mutate, so test that separately first
    print("=" * 70)
    print("FIRST DUPLICATE VALUE - TEST RESULTS")
    print("=" * 70)

    print("\nHash Set Approach:")
    print("-" * 50)
    all_passed = True
    for array, expected, desc in test_cases:
        result = first_duplicate_value_hash_set(array.copy())
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False
        print(f"  [{status}] {desc}: {result}")
    if all_passed:
        print("  All tests passed!")

    print("\nNegative Marking (Recommended):")
    print("-" * 50)
    all_passed = True
    for array, expected, desc in test_cases:
        result = first_duplicate_value(array.copy())
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False
        print(f"  [{status}] {desc}: {result}")
    if all_passed:
        print("  All tests passed!")

    print("\nBrute Force:")
    print("-" * 50)
    all_passed = True
    for array, expected, desc in test_cases:
        result = first_duplicate_value_brute_force(array.copy())
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False
        print(f"  [{status}] {desc}: {result}")
    if all_passed:
        print("  All tests passed!")

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    +---------------------+----------+----------+------------------+
    |      Approach       |   Time   |  Space   |  Recommendation  |
    +---------------------+----------+----------+------------------+
    | 1. Hash Set         |   O(n)   |   O(n)   |  Safe choice     |
    | 2. Negative Marking |   O(n)   |   O(1)   |  BEST CHOICE     |
    | 3. Brute Force      |  O(n^2)  |   O(1)   |  Not recommended |
    +---------------------+----------+----------+------------------+

    Note: Negative Marking requires values 1 to n and allows mutation.
    """)


if __name__ == "__main__":
    run_tests()
