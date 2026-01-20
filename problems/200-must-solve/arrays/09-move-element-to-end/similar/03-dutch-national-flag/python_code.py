"""
Dutch National Flag (3-Way Partition) - Python Solutions

Partition array into three sections: < pivot, == pivot, > pivot.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Three-Pointer (Dutch National Flag) - Recommended
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - in-place
#
# WHY THIS IS BEST:
# - Single pass through array
# - In-place, constant extra space
# - Elegant handling of three categories
# ============================================================================

def dutch_national_flag(array: List[int], pivot: int) -> List[int]:
    """
    Partition array into three sections: < pivot, == pivot, > pivot.

    Uses three pointers:
    - low: boundary for "less than" section
    - mid: current element being examined
    - high: boundary for "greater than" section

    Invariants at all times:
    - array[0..low-1] < pivot
    - array[low..mid-1] == pivot
    - array[mid..high] unprocessed
    - array[high+1..n-1] > pivot

    Visual for [2, 0, 1, 2, 1, 0], pivot=1:

        Step by step:
        [2,0,1,2,1,0] -> swap 2 with 0 at high
        [0,0,1,2,1,2] -> 0<1, swap with low, advance
        [0,0,1,2,1,2] -> 0<1, swap with low, advance
        [0,0,1,2,1,2] -> 1==1, just advance mid
        [0,0,1,1,2,2] -> 2>1, swap with high
        [0,0,1,1,2,2] -> 1==1, advance mid
        Done!
    """
    low, mid, high = 0, 0, len(array) - 1

    while mid <= high:
        if array[mid] < pivot:
            # Element belongs in "less than" section
            array[low], array[mid] = array[mid], array[low]
            low += 1
            mid += 1
        elif array[mid] == pivot:
            # Element is in correct section
            mid += 1
        else:  # array[mid] > pivot
            # Element belongs in "greater than" section
            array[mid], array[high] = array[high], array[mid]
            high -= 1
            # Don't increment mid - need to examine swapped element

    return array


# ============================================================================
# APPROACH 2: Two-Pass Partition
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - Easier to understand
# - When code clarity is priority
# ============================================================================

def dutch_flag_two_pass(array: List[int], pivot: int) -> List[int]:
    """
    Two-pass approach:
    1. First pass: partition into {< pivot} and {>= pivot}
    2. Second pass: partition {>= pivot} into {== pivot} and {> pivot}
    """
    # First pass: move all elements < pivot to front
    write_idx = 0
    for i, val in enumerate(array):
        if val < pivot:
            array[write_idx], array[i] = array[i], array[write_idx]
            write_idx += 1

    # Second pass: from write_idx, move elements == pivot to front of remaining
    equal_idx = write_idx
    for i in range(write_idx, len(array)):
        if array[i] == pivot:
            array[equal_idx], array[i] = array[i], array[equal_idx]
            equal_idx += 1

    return array


# ============================================================================
# APPROACH 3: Count and Place
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When values are simple (like 0, 1, 2)
# - When counting is intuitive for the problem
# ============================================================================

def dutch_flag_count(array: List[int], pivot: int) -> List[int]:
    """
    Count elements in each category, then fill array.

    Note: This loses the original non-pivot elements' identity,
    only use when exact values don't matter.
    """
    less_count = sum(1 for x in array if x < pivot)
    equal_count = sum(1 for x in array if x == pivot)
    greater_count = len(array) - less_count - equal_count

    # Store actual values for reconstruction
    less_vals = [x for x in array if x < pivot]
    greater_vals = [x for x in array if x > pivot]

    # Fill array
    idx = 0
    for val in less_vals:
        array[idx] = val
        idx += 1
    for _ in range(equal_count):
        array[idx] = pivot
        idx += 1
    for val in greater_vals:
        array[idx] = val
        idx += 1

    return array


# ============================================================================
# SPECIAL CASE: Sort Colors (LeetCode 75)
# ============================================================================

def sort_colors(nums: List[int]) -> List[int]:
    """
    Classic "Sort Colors" problem where array contains only 0, 1, 2.
    This is Dutch National Flag with pivot=1.
    """
    return dutch_national_flag(nums, 1)


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    def is_valid_partition(arr: List[int], pivot: int) -> bool:
        """Check if array is properly partitioned."""
        less_ended = False
        equal_ended = False
        for x in arr:
            if x < pivot:
                if less_ended:
                    return False
            elif x == pivot:
                less_ended = True
                if equal_ended:
                    return False
            else:  # x > pivot
                less_ended = True
                equal_ended = True
        return True

    test_cases = [
        # (array, pivot, description)
        ([2, 0, 1, 2, 1, 0], 1, "Standard case"),
        ([1, 4, 2, 5, 3, 6], 3, "Mixed values"),
        ([3, 3, 3, 3], 3, "All equal to pivot"),
        ([1, 2, 3], 5, "All less than pivot"),
        ([5, 6, 7], 3, "All greater than pivot"),
        ([], 1, "Empty array"),
        ([1], 1, "Single element equals pivot"),
        ([2, 1, 0], 1, "Small array"),
        ([0, 0, 1, 1, 2, 2], 1, "Already sorted"),
    ]

    approaches = [
        ("Three-Pointer (DNF)", dutch_national_flag),
        ("Two-Pass Partition", dutch_flag_two_pass),
        ("Count and Place", dutch_flag_count),
    ]

    print("=" * 70)
    print("DUTCH NATIONAL FLAG (3-WAY PARTITION) - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, pivot, desc in test_cases:
            result = func(array.copy(), pivot)
            valid = is_valid_partition(result, pivot)
            status = "PASS" if valid else "FAIL"
            if not valid:
                all_passed = False
            print(f"  {status}: {desc} (pivot={pivot}) -> {result}")

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
    array = [2, 0, 1, 2, 1, 0]
    pivot = 1
    print(f"\nInput: array = {array}, pivot = {pivot}")
    result = dutch_national_flag(array.copy(), pivot)
    print(f"Output: {result}")

    # Sample Input 2
    array = [1, 4, 2, 5, 3, 6]
    pivot = 3
    print(f"\nInput: array = {array}, pivot = {pivot}")
    result = dutch_national_flag(array.copy(), pivot)
    print(f"Output: {result}")

    # Sample Input 3 (Sort Colors)
    print("\n--- Sort Colors (LeetCode 75) ---")
    nums = [2, 0, 2, 1, 1, 0]
    print(f"Input: nums = {nums}")
    result = sort_colors(nums.copy())
    print(f"Output: {result}")
